"""Bytecode-15 -> GML decompiler (structured, with goto/label fallback)."""
from gmcode import PUSHES, GOTO

BINOPS = {0x08: "*", 0x09: "/", 0x0A: "div", 0x0B: "%", 0x0C: "+", 0x0D: "-",
          0x0E: "&", 0x0F: "|", 0x10: "^", 0x13: "<<", 0x14: ">>"}
INSTNAME = {-1: "self", -2: "other", -3: "all", -4: "noone", -5: "global",
            -6: "builtin", -7: "local", -9: "stacktop", -16: "static"}


class E:
    """expression node -> just a string plus a precedence hint"""
    __slots__ = ("s", "prec")

    def __init__(self, s, prec=99):
        self.s = s
        self.prec = prec

    def p(self, need):
        return "(" + self.s + ")" if self.prec < need else self.s

    def __str__(self):
        return self.s


def num(v):
    if isinstance(v, float):
        if v == int(v) and abs(v) < 1e15:
            return str(int(v))
        return repr(v)
    return str(v)


class Block:
    def __init__(self, start):
        self.start = start
        self.instrs = []
        self.stmts = []        # list of (indent-less) strings
        self.term = None       # ('b',t) ('bt',t,cond) ('bf',t,cond) ('ret',) ('exit',)
                               # ('pushenv',t,expr) ('popenv',t) ('fall',)
        self.next = None


class Decompiler:
    def __init__(self, cdb, objects=None, sprites=None, rooms=None, fonts=None):
        self.c = cdb
        self.objects = objects or {}
        self.sprites = sprites or {}
        self.rooms = rooms or {}
        self.fonts = fonts or {}

    # ---------------------------------------------------------- helpers
    # function name -> {arg index: asset kind}
    ASSET_ARGS = {
        "action_sprite_set": {0: "sprite"},
        "action_draw_sprite": {0: "sprite"},
        "draw_sprite": {0: "sprite"},
        "draw_sprite_ext": {0: "sprite"},
        "action_create_object": {0: "object"},
        "action_create_object_motion": {0: "object"},
        "action_change_object": {0: "object"},
        "instance_create": {2: "object"},
        "instance_nearest": {2: "object"},
        "instance_number": {0: "object"},
        "instance_destroy": {0: "object"},
        "distance_to_object": {0: "object"},
        "action_another_room": {0: "room"},
        "action_font": {0: "font"},
        "draw_set_font": {0: "font"},
    }

    def objname(self, i):
        return self.objects.get(i, "obj%d" % i)

    def asset_arg(self, fn, k, a):
        kind = self.ASSET_ARGS.get(fn, {}).get(k)
        if kind and a.s.isdigit():
            table = {"sprite": self.sprites, "object": self.objects,
                     "room": self.rooms, "font": self.fonts}[kind]
            nm = table.get(int(a.s))
            if nm:
                return nm
        return a.s

    def varname(self, ins, stack):
        """build a variable access expression, consuming stack as needed"""
        name = ins.ref
        vt = ins.vartype
        idx = None
        inst = None
        if vt == "array":
            idx = stack.pop() if stack else E("?")
            inst = stack.pop() if stack else E("?")
        elif vt in ("stacktop", "instance"):
            inst = stack.pop() if stack else E("?")
        pre = ""
        if inst is not None:
            t = inst.s
            if t in ("-1", "self"):
                pre = ""
            elif t == "-2":
                pre = "other."
            elif t == "-5":
                pre = "global."
            elif t == "-7":
                pre = ""
            elif t.lstrip("-").isdigit() and int(t) >= 0:
                pre = self.objname(int(t)) + "."
            else:
                pre = inst.p(2) + "."
        else:
            it = ins.inst
            if it is not None:
                if it == -5:
                    pre = "global."
                elif it == -2:
                    pre = "other."
                elif it == -7 or it == -1 or it == -6:
                    pre = ""
                elif it >= 0:
                    pre = self.objname(it) + "."
        s = pre + str(name)
        if idx is not None:
            s += "[" + idx.s + "]"
        return E(s)

    # ---------------------------------------------------------- blocks
    def build_blocks(self, ins):
        leaders = {ins[0].addr} if ins else set()
        byaddr = {i.addr: i for i in ins}
        for k, i in enumerate(ins):
            if i.op in GOTO:
                leaders.add(i.jump)
                if k + 1 < len(ins):
                    leaders.add(ins[k + 1].addr)
            elif i.op in (0x9C, 0x9D):
                if k + 1 < len(ins):
                    leaders.add(ins[k + 1].addr)
        leaders = sorted(a for a in leaders if a in byaddr)
        blocks = []
        for n, a in enumerate(leaders):
            b = Block(a)
            end = leaders[n + 1] if n + 1 < len(leaders) else None
            for i in ins:
                if i.addr >= a and (end is None or i.addr < end):
                    b.instrs.append(i)
            blocks.append(b)
        bymap = {b.start: b for b in blocks}
        for n, b in enumerate(blocks):
            b.next = blocks[n + 1].start if n + 1 < len(blocks) else None
        return blocks, bymap

    # ---------------------------------------------------------- stack sim
    def run_block(self, b, stack):
        st = b.stmts
        for i in b.instrs:
            op = i.op
            if op == 0x07:                      # conv
                continue
            if op in PUSHES:
                if i.ref is not None:
                    stack.append(self.varname(i, stack))
                elif isinstance(i.val, str):
                    stack.append(E('"%s"' % i.val.replace("\\", "\\\\").replace('"', '\\"')))
                elif isinstance(i.val, bool):
                    stack.append(E("true" if i.val else "false"))
                else:
                    stack.append(E(num(i.val)))
                continue
            if op == 0x45:                      # pop
                if i.t1 == 0x0f:                # swap variant
                    if len(stack) >= 2:
                        stack[-1], stack[-2] = stack[-2], stack[-1]
                    continue
                vt = i.vartype
                # Se Type1 non e' Variable, l'indirizzo (istanza/indice) e' stato
                # messo sullo stack PRIMA del valore: e' il caso delle assegnazioni
                # composte (x += y), dove un `dup` riusa l'indirizzo per la lettura.
                addr_first = (i.t1 != 5)
                if vt == "array":
                    if addr_first:
                        val = stack.pop() if stack else E("?")
                        idx = stack.pop() if stack else E("?")
                        inst = stack.pop() if stack else E("?")
                    else:
                        idx = stack.pop() if stack else E("?")
                        inst = stack.pop() if stack else E("?")
                        val = stack.pop() if stack else E("?")
                    pre = ""
                    t = inst.s
                    if t in ("-1", "self", "-7"):
                        pre = ""
                    elif t == "-5":
                        pre = "global."
                    elif t == "-2":
                        pre = "other."
                    elif t.lstrip("-").isdigit() and int(t) >= 0:
                        pre = self.objname(int(t)) + "."
                    else:
                        pre = inst.p(2) + "."
                    st.append("%s%s[%s] = %s;" % (pre, i.ref, idx.s, val.s))
                elif vt in ("stacktop", "instance"):
                    if addr_first:
                        val = stack.pop() if stack else E("?")
                        inst = stack.pop() if stack else E("?")
                    else:
                        inst = stack.pop() if stack else E("?")
                        val = stack.pop() if stack else E("?")
                    st.append("%s.%s = %s;" % (inst.p(2), i.ref, val.s))
                else:
                    val = stack.pop() if stack else E("?")
                    tgt = self.varname(i, stack)
                    st.append("%s = %s;" % (tgt.s, val.s))
                continue
            if op in BINOPS:
                b2 = stack.pop() if stack else E("?")
                a2 = stack.pop() if stack else E("?")
                o = BINOPS[op]
                prec = 5 if o in "*/%" or o == "div" else 4
                if o in ("&", "|", "^", "<<", ">>"):
                    prec = 3
                stack.append(E("%s %s %s" % (a2.p(prec), o, b2.p(prec + 1)), prec))
                continue
            if op == 0x15:                      # cmp
                b2 = stack.pop() if stack else E("?")
                a2 = stack.pop() if stack else E("?")
                stack.append(E("%s %s %s" % (a2.p(3), i.cmp, b2.p(3)), 2))
                continue
            if op == 0x11:                      # neg
                a2 = stack.pop() if stack else E("?")
                stack.append(E("-" + a2.p(6), 6))
                continue
            if op == 0x12:                      # not
                a2 = stack.pop() if stack else E("?")
                stack.append(E("!" + a2.p(6), 6))
                continue
            if op == 0x86:                      # dup
                n = (i.val or 0) + 1
                if len(stack) >= n:
                    stack.extend(stack[-n:])
                continue
            if op == 0x9E:                      # popz
                if stack:
                    v = stack.pop()
                    if v.s.endswith(")") and "(" in v.s:
                        st.append(v.s + ";")
                continue
            if op == 0xD9:                      # call
                args = [(stack.pop() if stack else E("?")) for _ in range(i.argc)]
                stack.append(E("%s(%s)" % (i.ref, ", ".join(
                    self.asset_arg(i.ref, k, a) for k, a in enumerate(args))), 90))
                continue
            if op == 0x99:                      # callv
                fn = stack.pop() if stack else E("?")
                args = [(stack.pop() if stack else E("?")) for _ in range(i.argc)]
                stack.append(E("%s(%s)" % (fn.p(90), ", ".join(a.s for a in args)), 90))
                continue
            if op == 0xFF:                      # break / special
                continue
            if op == 0x9C:                      # ret
                v = stack.pop() if stack else E("")
                b.term = ("ret", v.s)
                return stack
            if op == 0x9D:
                b.term = ("exit",)
                return stack
            if op == 0xB6:
                b.term = ("b", i.jump); return stack
            if op == 0xB7:
                b.term = ("bt", i.jump, (stack.pop() if stack else E("?")).s); return stack
            if op == 0xB8:
                b.term = ("bf", i.jump, (stack.pop() if stack else E("?")).s); return stack
            if op == 0xBA:
                b.term = ("pushenv", i.jump, (stack.pop() if stack else E("?")).s); return stack
            if op == 0xBB:
                b.term = ("popenv", i.jump); return stack
        b.term = ("fall",)
        return stack

    # ------------------------------------------------------------- helpers
    @staticmethod
    def tindex(blocks, addr):
        """block index for an address; len(blocks) for a jump past the end"""
        for k, b in enumerate(blocks):
            if b.start == addr:
                return k
        if blocks:
            last = blocks[-1]
            end = last.instrs[-1].addr + last.instrs[-1].size if last.instrs else last.start
            if addr >= end:
                return len(blocks)
        return None

    def eff(self, blocks, i):
        """skip forward over empty glue blocks (bare popenv / bare goto)"""
        seen = set()
        while i is not None and 0 <= i < len(blocks) and i not in seen:
            seen.add(i)
            b = blocks[i]
            if b.stmts:
                break
            t = b.term
            if t and t[0] == "popenv":
                i += 1
                continue
            if t and t[0] == "b":
                j = self.tindex(blocks, t[1])
                if j is not None and j > i:
                    i = j
                    continue
            break
        return i

    def exit_targets(self, blocks, ti):
        """indices of the trailing 'exit-with' popenv blocks after a with-loop"""
        out = set()
        j = ti + 1
        while j < len(blocks) and not blocks[j].stmts:
            t = blocks[j].term
            if t and t[0] == "popenv":
                out.add(j)
                j += 1
                continue
            if t and t[0] == "b":
                j += 1
                continue
            break
        return out

    # ------------------------------------------------------------- structure
    def structure(self, blocks, lo, hi, out, ind, follow=None, brk=(), cont=None):
        pad = "    " * ind
        n = lo
        while n < hi:
            b = blocks[n]
            for s in b.stmts:
                out.append(pad + s)
            t = b.term
            if t is None or t[0] == "fall":
                n += 1
                continue
            if t[0] == "exit":
                if not (ind == 0 and n + 1 >= hi):
                    out.append(pad + "exit;")
                n += 1
                continue
            if t[0] == "ret":
                out.append(pad + "return %s;" % t[1])
                n += 1
                continue

            tgt = t[1]
            ti = self.tindex(blocks, tgt)

            # ---------------------------------------------------- with()
            if t[0] == "pushenv":
                endi = min(ti if ti is not None else hi, hi)
                inst = t[2]
                if inst.lstrip("-").isdigit() and int(inst) >= 0:
                    inst = self.objname(int(inst))
                out.append(pad + "with (%s) {" % inst)
                self.structure(blocks, n + 1, endi, out, ind + 1,
                               follow=endi, brk=self.exit_targets(blocks, endi), cont=None)
                out.append(pad + "}")
                n = max(endi, n + 1)
                continue
            if t[0] == "popenv":
                n += 1
                continue

            # ---------------------------------------------------- if / while
            if t[0] in ("bt", "bf"):
                cond = t[2] if t[0] == "bf" else self.negate(t[2])
                if ti is None or ti > hi:
                    out.append(pad + "if (!(%s)) goto L%X;" % (cond, tgt))
                    n += 1
                    continue
                if ti <= n:
                    out.append(pad + "// do-while: repeat from L%X while !(%s)" % (tgt, cond))
                    n += 1
                    continue
                prev = blocks[ti - 1] if 0 <= ti - 1 < len(blocks) else None
                # while loop
                if (prev is not None and prev.term and prev.term[0] == "b"
                        and prev.term[1] == b.start and ti - 1 > n):
                    out.append(pad + "while (%s) {" % cond)
                    self.structure(blocks, n + 1, ti - 1, out, ind + 1,
                                   follow=ti - 1, brk={ti}, cont=n)
                    out.append(pad + "}")
                    n = ti
                    continue
                # if / else
                els = None
                if prev is not None and ti - 1 >= n + 1 and prev.term and prev.term[0] == "b":
                    ei = self.tindex(blocks, prev.term[1])
                    if ei is not None and ti < ei <= hi:
                        els = ei
                out.append(pad + "if (%s) {" % cond)
                self.structure(blocks, n + 1, ti, out, ind + 1,
                               follow=(els if els else ti), brk=brk, cont=cont)
                if els:
                    out.append(pad + "} else {")
                    self.structure(blocks, ti, els, out, ind + 1, follow=els, brk=brk, cont=cont)
                    out.append(pad + "}")
                    n = els
                else:
                    out.append(pad + "}")
                    n = ti
                continue

            # ---------------------------------------------------- goto
            if t[0] == "b":
                if ti is None:
                    out.append(pad + "goto L%X;" % tgt)
                elif ti in brk:
                    out.append(pad + "break;")
                elif cont is not None and ti == cont:
                    out.append(pad + "continue;")
                elif (ti == n + 1 or ti == follow or ti == hi
                      or self.eff(blocks, ti) == self.eff(blocks, n + 1)
                      or (follow is not None and self.eff(blocks, ti) == self.eff(blocks, follow))):
                    pass
                else:
                    out.append(pad + "goto L%X;" % tgt)
                n += 1
                continue
            n += 1

    @staticmethod
    def negate(c):
        for a, b in ((" == ", " != "), (" != ", " == "), (" <= ", " > "),
                     (" >= ", " < "), (" < ", " >= "), (" > ", " <= ")):
            if a in c and c.count(a) == 1:
                return c.replace(a, b)
        if c.startswith("!"):
            return c[1:]
        return "!(" + c + ")"

    # ---------------------------------------------------------- entry
    def decompile(self, entry):
        ins = self.c.decode(entry["addr"], entry["length"])
        if not ins:
            return ""
        blocks, bymap = self.build_blocks(ins)
        stack = []
        for b in blocks:
            stack = self.run_block(b, stack)
            if b.term and b.term[0] in ("ret", "exit", "b"):
                stack = []
        # collect goto targets so we can emit labels
        out = []
        self.structure(blocks, 0, len(blocks), out, 0)
        text = "\n".join(out)
        # add labels for any goto we emitted
        needed = set()
        for line in out:
            if "goto L" in line:
                needed.add(line.split("goto L")[1].rstrip(";").strip())
        if needed:
            out2 = []
            starts = {("%X" % b.start): b for b in blocks}
            # re-render flat with labels
            out2.append("// note: unstructured control flow - labels emitted")
            for b in blocks:
                lbl = "%X" % b.start
                if lbl in needed:
                    out2.append("L%s:" % lbl)
                for s in b.stmts:
                    out2.append("    " + s)
                t = b.term
                if t and t[0] == "bf":
                    out2.append("    if (!(%s)) goto L%X;" % (t[2], t[1]))
                elif t and t[0] == "bt":
                    out2.append("    if (%s) goto L%X;" % (t[2], t[1]))
                elif t and t[0] == "b":
                    out2.append("    goto L%X;" % t[1])
                elif t and t[0] == "ret":
                    out2.append("    return %s;" % t[1])
                elif t and t[0] == "exit":
                    out2.append("    exit;")
                elif t and t[0] == "pushenv":
                    out2.append("    with (%s) { // until L%X" % (t[2], t[1]))
                elif t and t[0] == "popenv":
                    out2.append("    } // endwith -> L%X" % t[1])
            return text + "\n\n/* ---- flat listing (fallback) ----\n" + "\n".join(out2) + "\n*/"
        return text
