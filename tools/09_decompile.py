import sys, os, json, re, traceback
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin
from gmcode import CodeDB
from gmdecomp import Decompiler

ROOT = r"C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\_extract"
OUT = os.path.join(ROOT, "out")
DW = DataWin(os.path.join(ROOT, "cab", "data.win")); DW.load_strings()
C = CodeDB(DW)

objnames = {int(k): v for k, v in json.load(open(os.path.join(OUT, "object_names.json"), encoding="utf-8")).items()}
REPO = os.path.join(os.path.dirname(ROOT), "NIMBUS-source")

def load(*cands):
    for c in cands:
        if os.path.exists(c):
            return json.load(open(c, encoding="utf-8"))
    raise FileNotFoundError(cands[0])

sprnames = {s["index"]: s["name"] for s in load(os.path.join(OUT, "sprites", "_index.json"),
                                                os.path.join(REPO, "data", "sprites.json"))}
roomnames = {r["index"]: r["name"] for r in load(os.path.join(OUT, "rooms.json"),
                                                 os.path.join(REPO, "data", "rooms.json"))}
fontnames = {f["index"]: f["name"] for f in load(os.path.join(OUT, "fonts.json"),
                                                 os.path.join(REPO, "data", "fonts.json"))}
D = Decompiler(C, objects=objnames, sprites=sprnames, rooms=roomnames, fonts=fontnames)

gml_dir = os.path.join(OUT, "gml")
asm_dir = os.path.join(OUT, "asm")
os.makedirs(gml_dir, exist_ok=True)
os.makedirs(asm_dir, exist_ok=True)

def safe(n):
    return re.sub(r'[^A-Za-z0-9_.\-]', "_", n)

ok = fail = flat = 0
errors = []
index = []
for e in C.code:
    name = e["name"]
    fn = safe(name)
    # disassembly (always)
    try:
        ins = C.decode(e["addr"], e["length"])
        lines = ["// %s  locals=%d args=%d len=%d" % (name, e["locals"], e["args"], e["length"])]
        lv = C.locals.get(name) or []
        if lv:
            lines.append("// locals: " + ", ".join(str(x) for x in lv))
        for i in ins:
            lines.append("%08X: %s" % (i.addr - e["addr"], C.text(i)))
        open(os.path.join(asm_dir, fn + ".asm"), "w", encoding="utf-8").write("\n".join(lines))
    except Exception as ex:
        errors.append((name, "asm", repr(ex)))
    # decompile
    try:
        src = D.decompile(e)
        hdr = "/// %s\n" % name
        lv = [x for x in (C.locals.get(name) or []) if x not in ("arguments",)]
        if lv:
            hdr += "// locals: " + ", ".join(lv) + "\n"
        open(os.path.join(gml_dir, fn + ".gml"), "w", encoding="utf-8").write(hdr + src + "\n")
        if "flat listing (fallback)" in src:
            flat += 1
        ok += 1
        index.append({"name": name, "gml": fn + ".gml", "len": e["length"],
                      "args": e["args"], "unstructured": "flat listing (fallback)" in src})
    except Exception as ex:
        fail += 1
        errors.append((name, "gml", traceback.format_exc(limit=2)))

json.dump(index, open(os.path.join(OUT, "code_index.json"), "w", encoding="utf-8"), indent=1)
print("decompiled ok:", ok, " failed:", fail, " with goto fallback:", flat)
if errors:
    with open(os.path.join(OUT, "decompile_errors.txt"), "w", encoding="utf-8") as f:
        for n, k, m in errors:
            f.write("%s [%s]\n%s\n\n" % (n, k, m))
    print("errors written:", len(errors))
