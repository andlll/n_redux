"""Quanto codice e' davvero unico, e quanti oggetti sono varianti dello stesso comportamento."""
import os, re, json, hashlib, collections
from _paths import REPO_DIR

REPO = REPO_DIR
gml = os.path.join(REPO, "raw", "gml")

def norm(t):
    # via l'header col nome, cosi' due eventi identici di oggetti diversi collidono
    t = "\n".join(l for l in t.splitlines() if not l.startswith("///"))
    return re.sub(r"\s+", " ", t).strip()

bodies = collections.defaultdict(list)
for fn in os.listdir(gml):
    t = norm(open(os.path.join(gml, fn), encoding="utf-8").read())
    bodies[hashlib.md5(t.encode()).hexdigest()].append((fn, len(t)))

tot = sum(len(v) for v in bodies.values())
print("blocchi di codice: %d   corpi UNICI: %d   (%.0f%% e' duplicato)"
      % (tot, len(bodies), 100 * (1 - len(bodies) / tot)))

big = sorted(bodies.values(), key=lambda v: -len(v) * v[0][1])[:8]
print("\ni cloni piu' costosi (n copie x peso):")
for v in big:
    print("   %3d copie x %5d char   es. %s" % (len(v), v[0][1], v[0][0][:60]))

# --- oggetti: firma = insieme dei corpi dei suoi eventi -------------------
objs = os.path.join(REPO, "src", "objects")
sig = collections.defaultdict(list)
for o in os.listdir(objs):
    d = os.path.join(objs, o)
    if not os.path.isdir(d):
        continue
    s = []
    for f in sorted(os.listdir(d)):
        if f.endswith(".gml"):
            t = norm(open(os.path.join(d, f), encoding="utf-8").read())
            s.append((f, hashlib.md5(t.encode()).hexdigest()))
    sig[tuple(s)].append(o)

print("\noggetti: %d   comportamenti DISTINTI: %d" % (len(os.listdir(objs)), len(sig)))
print("\nle famiglie piu' grandi (stessi eventi, stesso codice identico):")
for k, v in sorted(sig.items(), key=lambda kv: -len(kv[1]))[:10]:
    ev = ", ".join(f for f, _ in k) or "(nessun evento)"
    print("   %3d oggetti  [%s]" % (len(v), ev[:70]))
    print("        %s" % ", ".join(sorted(v)[:9]))

# --- sprite: famiglie per prefisso ---------------------------------------
spr = json.load(open(os.path.join(REPO, "data", "sprites.json"), encoding="utf-8"))
fam = collections.Counter(re.sub(r"[\d_]+$", "", s["name"]) or s["name"] for s in spr)
print("\nsprite: %d   prefissi distinti: %d" % (len(spr), len(fam)))
print("   famiglie piu' numerose:", fam.most_common(8))
