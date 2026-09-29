"""Mini-simulatore a eventi del sottoinsieme di GML decompilato usato dalle
impalcature (impa*): esegue Create/Alarm_N di un oggetto (e di quelli che
crea fra gli impa*/tops*/gru*) e registra cambi di sprite, creazioni,
distruzioni e consumi di r12. Usato da 28_scaffold_timing.py.

Copre solo cio' che serve: action_sprite_set/sprite_index, action_set_alarm/
alarm[], tic/phase, dado (action_if_dice: le alternative di sprite diventano
un insieme), `with (r12)`, creazione/distruzione. Non e' un interprete GML
generale.
"""
import re, os, json, heapq, itertools, copy

_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OBJ = os.path.join(_ROOT, 'src', 'objects')
SPR = json.load(open(os.path.join(_ROOT, 'data', 'sprites.json'), encoding='utf-8'))
SPR_BY_INDEX = {s['index']: s['name'] for s in SPR}

def load(obj, ev):
    p = f'{OBJ}/{obj}/{ev}.gml'
    return open(p).read() if os.path.exists(p) else None

# ---------------------------------------------------------------- parser
class N:  # nodo
    def __init__(s, kind, text='', body=None, els=None):
        s.kind, s.text, s.body, s.els = kind, text, body or [], els

def parse(src):
    lines = [l.strip() for l in src.split('\n')]
    lines = [l for l in lines if l and not l.startswith('///') and not l.startswith('// locals')]
    pos = 0
    def block():
        nonlocal pos
        out = []
        while pos < len(lines):
            l = lines[pos]
            if l == '}':
                pos += 1
                return out
            if l.startswith('} else {'):
                return out  # handled by caller
            if re.match(r'^(if \(.*\)|with \(.*\)|while \(.*\)) \{$', l):
                pos += 1
                body = block()
                els = None
                if pos < len(lines) and lines[pos] == '} else {':
                    pos += 1
                    els = block()
                kind = 'if' if l.startswith('if') else 'with' if l.startswith('with') else 'while'
                out.append(N(kind, l, body, els))
                continue
            pos += 1
            out.append(N('stmt', l))
        return out
    return block()

# ---------------------------------------------------------------- simulatore
class Inst:
    _ids = itertools.count(1)
    def __init__(s, obj, t, parent=None):
        s.obj, s.id, s.t0, s.parent = obj, next(Inst._ids), t, parent
        s.vars = {}
        s.alarm = {}      # j -> (fire_time, token)
        s.alive = True
        s.sprite = None
        s.rel = 0
        s.log = []        # (t, kind, data)

ENV = {
    'aura': {'night': 0, 'dawn': 0},
    'r12': {'mon': 10**6, 'ele': 10**4, 'oil': 10**5, 'pop': 100, 'hap': 200},
}

class Sim:
    def __init__(s, room_easy=False):
        s.t = 0
        s.q = []
        s.seq = itertools.count()
        s.insts = []
        s.tok = itertools.count()
        s.room_easy = room_easy
        s.warn = set()

    def create(s, obj, parent=None):
        i = Inst(obj, s.t, parent)
        s.insts.append(i)
        i.log.append((s.t, 'create', obj))
        src = load(obj, 'Create')
        if src:
            s.run(i, parse(src))
        return i

    def set_alarm(s, i, j, n):
        tok = next(s.tok)
        i.alarm[j] = (s.t + n, tok)
        heapq.heappush(s.q, (s.t + n, next(s.seq), i, j, tok))

    def cond_num(s, args):
        # action_if_number(obj, count, op): conteggio istanze di `obj`; 736 = marcatore room
        o, k, op = args
        if o == 736:
            count = 1 if s.room_easy else 0
        else:
            s.warn.add(f'if_number({o})'); count = 0
        return s.cmp(count, k, op)

    @staticmethod
    def cmp(a, b, op):
        return {0: a == b, 1: a < b, 2: a > b, 3: a <= b, 4: a >= b}[op]

    def run(s, i, nodes, env_obj=None):
        """Esegue nodi; ritorna 'exit' se exit, 'break' se break."""
        b = False
        pending_alts = None
        idx = 0
        while idx < len(nodes):
            n = nodes[idx]; idx += 1
            if not i.alive and env_obj is None:
                return 'exit'
            if n.kind == 'stmt':
                r = s.stmt(i, n.text, env_obj)
                if isinstance(r, tuple) and r[0] == 'cond':
                    b = r[1]
                elif r == 'exit':
                    return 'exit'
                elif r == 'break':
                    return 'break'
            elif n.kind == 'with':
                m = re.match(r'with \((\w+)\) \{', n.text)
                tgt = m.group(1)
                if s.contains_break(n.body):
                    # test su un altro oggetto: valuta la condizione contro ENV
                    b = s.eval_with_test(i, tgt, n.body)
                else:
                    s.with_effects(i, tgt, n.body)
            elif n.kind == 'if':
                m = re.match(r'if \((.*)\) \{', n.text)
                c = m.group(1)
                if c == '__b__': val = b
                elif c == '!__b__': val = not b
                else:
                    val = s.eval_expr(i, c)
                # dice? gestita in stmt come cond speciale
                if isinstance(val, str) and val == 'dice':
                    r = s.run_dice(i, n, env_obj)
                    if r: return r
                    continue
                branch = n.body if val else (n.els or [])
                r = s.run(i, branch, env_obj)
                if r in ('exit', 'break'):
                    return r
        return None

    def contains_break(self, nodes):
        for n in nodes:
            if n.kind == 'stmt' and n.text == 'break;': return True
            if n.kind in ('if', 'with') and (self.contains_break(n.body) or (n.els and self.contains_break(n.els))): return True
        return False

    def eval_with_test(s, i, tgt, body):
        env = ENV.get(tgt, {})
        b = False
        for n in body:
            if n.kind == 'stmt':
                m = re.match(r'__b__ = action_if_variable\((\w+), (-?[\d.]+), (\d)\);', n.text)
                if m:
                    v = env.get(m.group(1), None)
                    if v is None:
                        s.warn.add(f'with({tgt}).{m.group(1)}'); v = 0
                    b = s.cmp(v, float(m.group(2)), int(m.group(3)))
        return b

    def with_effects(s, i, tgt, body):
        for n in body:
            if n.kind == 'stmt':
                m = re.match(r'(\w+) = (\w+) \+ (-?[\d.]+);', n.text)
                if m and tgt == 'r12':
                    i.log.append((s.t, 'r12', (m.group(1), float(m.group(3)))))
                elif n.text in ('action_kill_object();', 'instance_destroy();'):
                    i.log.append((s.t, 'kill_other', tgt))
                elif n.text.startswith('alarm[') or n.text.startswith('action_set_alarm') or n.text.startswith('demos') or n.text.startswith('over ='):
                    i.log.append((s.t, 'with_set', (tgt, n.text)))
            elif n.kind in ('if', 'with'):
                pass

    def eval_expr(s, i, c):
        m = re.match(r'(\w+) (==|>=|<=|<|>) (-?[\d.]+)', c)
        if m:
            v = i.vars.get(m.group(1), 0); k = float(m.group(3))
            return {'==': v == k, '>=': v >= k, '<=': v <= k, '<': v < k, '>': v > k}[m.group(2)]
        if c.startswith('os_is_paused') or c.startswith('os_'):
            return False
        s.warn.add('expr:' + c)
        return False

    def run_dice(s, i, n, env_obj):
        """Ramo dice: se entrambi i rami impostano solo sprite -> unione alternativa."""
        sprites_a = s.collect_sprites(n.body)
        sprites_b = s.collect_sprites(n.els or [])
        only_sprites = s.only_sprites(n.body) and s.only_sprites(n.els or [])
        if only_sprites and (sprites_a or sprites_b):
            alts = sorted(set(sprites_a) | set(sprites_b))
            # se l'else e' vuoto, "nessun cambio" e' un'alternativa
            keep = not n.els
            s.set_sprite(i, alts, keep_previous=keep)
            return None
        # effetti non solo-sprite: esegui il ramo then (annota)
        i.log.append((s.t, 'dice_effect', n.text))
        return s.run(i, n.body, env_obj)

    def only_sprites(s, nodes):
        for n in nodes:
            if n.kind == 'stmt':
                if not (n.text.startswith('action_sprite_set') or n.text.startswith('action_set_relative') or re.match(r'__b__ = action_if_dice', n.text)):
                    return False
            elif n.kind == 'if':
                if not (s.only_sprites(n.body) and s.only_sprites(n.els or [])): return False
            else:
                return False
        return True

    def collect_sprites(s, nodes):
        out = []
        for n in nodes:
            if n.kind == 'stmt':
                m = re.match(r'action_sprite_set\((\w+),', n.text)
                if m: out.append(m.group(1))
            elif n.kind == 'if':
                out += s.collect_sprites(n.body) + s.collect_sprites(n.els or [])
        return out

    def set_sprite(s, i, alts, keep_previous=False):
        alts = list(alts)
        if keep_previous and i.sprite:
            alts = sorted(set(alts) | set(i.sprite))
        i.sprite = alts
        i.log.append((s.t, 'sprite', tuple(alts)))

    def stmt(s, i, t, env_obj):
        if t.startswith('action_set_relative'):
            i.rel = int(re.search(r'\((\d)\)', t).group(1)); return
        m = re.match(r'__b__ = action_if_variable\((\w+), (-?[\d.]+), (\d)\);', t)
        if m:
            v = i.vars.get(m.group(1), 0)
            return ('cond', s.cmp(v, float(m.group(2)), int(m.group(3))))
        if re.match(r'__b__ = action_if_dice\((\d+)\);', t):
            return ('cond', 'dice')
        m = re.match(r'__b__ = action_if_number\((\d+), (-?\d+), (\d)\);', t)
        if m:
            return ('cond', s.cond_num([int(m.group(1)), int(m.group(2)), int(m.group(3))]))
        m = re.match(r'action_sprite_set\((\w+),', t)
        if m:
            s.set_sprite(i, [m.group(1)]); return
        m = re.match(r'sprite_index = (\d+);', t)
        if m:
            s.set_sprite(i, [SPR_BY_INDEX.get(int(m.group(1)), '#' + m.group(1))]); return
        m = re.match(r'action_set_alarm\((-?\d+), (\d+)\);', t)
        if m:
            n, j = int(m.group(1)), int(m.group(2))
            if i.rel and j in i.alarm:
                n += max(0, i.alarm[j][0] - s.t)
            if n < 0: i.alarm.pop(j, None)
            else: s.set_alarm(i, j, n)
            return
        m = re.match(r'alarm\[(\d+)\] = (-?\d+);', t)
        if m:
            n, j = int(m.group(2)), int(m.group(1))
            if n < 0: i.alarm.pop(j, None)
            else: s.set_alarm(i, j, n)
            return
        m = re.match(r'(\w+) = (\w+) \+ (-?[\d.]+);', t)
        if m:
            i.vars[m.group(1)] = i.vars.get(m.group(2), 0) + float(m.group(3)); return
        m = re.match(r'(\w+) = (-?[\d.]+);', t)
        if m:
            i.vars[m.group(1)] = float(m.group(2)); return
        m = re.match(r'action_create_object\((\w+), (-?[\d.]+), (-?[\d.]+)\);', t)
        if m:
            i.log.append((s.t, 'spawn', (m.group(1), float(m.group(2)), float(m.group(3)))))
            if os.path.isdir(f'{OBJ}/{m.group(1)}') and (m.group(1).startswith('impa') or m.group(1).startswith('IMPA') or m.group(1).startswith('tops') or m.group(1).startswith('gru')):
                c = s.create(m.group(1), parent=i); return
            return
        m = re.match(r'instance_create\((.*), (.*), (\w+)\);', t)
        if m:
            i.log.append((s.t, 'spawn', (m.group(3), m.group(1), m.group(2))))
            if os.path.isdir(f'{OBJ}/{m.group(3)}') and m.group(3).startswith(('impa', 'IMPA', 'tops', 'gru')):
                s.create(m.group(3), parent=i)
            return
        if t in ('action_kill_object();', 'instance_destroy();'):
            i.alive = False; i.log.append((s.t, 'kill', None)); return 'exit'
        if t == 'exit;':
            return 'exit'
        if t == 'break;':
            return 'break'
        # ignora: depth, colore, trasformazioni, motion...
        return

    def fire(s, i, j):
        src = load(i.obj, f'Alarm_{j}')
        i.log.append((s.t, 'alarm', j))
        if src:
            s.run(i, parse(src))

    def run_until(s, tmax):
        while s.q:
            t, _, i, j, tok = heapq.heappop(s.q)
            if t > tmax: break
            if not i.alive: continue
            cur = i.alarm.get(j)
            if not cur or cur[1] != tok: continue
            s.t = t
            del i.alarm[j]
            s.fire(i, j)

def simulate(obj, tmax=20000, easy=False):
    Inst._ids = itertools.count(1)
    sim = Sim(room_easy=easy)
    root = sim.create(obj)
    sim.run_until(tmax)
    return sim, root
