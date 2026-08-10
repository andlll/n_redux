import os, re, collections
from _paths import REPO_DIR

REPO = REPO_DIR
gml = os.path.join(REPO, "raw", "gml")

BUILTIN = set("""x y depth image_angle image_xscale image_yscale image_index image_speed
sprite_index visible solid persistent alarm direction speed hspeed vspeed gravity
friction mouse_x mouse_y view_xview view_yview view_wview view_hview view_wport
view_hport os_type application_surface""".split())

# variabili lette/scritte "dentro r12" (sia nei suoi eventi, sia via with(r12)/r12.)
own = collections.Counter()
for fn in os.listdir(gml):
    if "_r12_" not in fn:
        continue
    for m in re.finditer(r"^\s*(\w+)(\[[^\]]*\])?\s*=", open(os.path.join(gml, fn), encoding="utf-8").read(), re.M):
        if m.group(1) not in BUILTIN:
            own[m.group(1)] += 1

ext = collections.Counter()
for fn in os.listdir(gml):
    t = open(os.path.join(gml, fn), encoding="utf-8").read()
    for m in re.finditer(r"r12\.(\w+)", t):
        ext[m.group(1)] += 1
    for blk in re.finditer(r"with \(r12\) \{(.*?)\n\}", t, re.S):
        for m in re.finditer(r"\b(\w+)\b", blk.group(1)):
            if m.group(1) not in BUILTIN and not m.group(1).startswith(("action_", "__b__")):
                ext[m.group(1)] += 0
print("STATO DENTRO r12 (assegnazioni nei suoi eventi)")
for k, v in own.most_common(40):
    print("   %-18s %d" % (k, v))
print()
print("CAMPI DI r12 LETTI DA ALTRI OGGETTI")
for k, v in ext.most_common(25):
    if v:
        print("   %-18s %d" % (k, v))
