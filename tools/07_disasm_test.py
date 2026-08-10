import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin
from gmcode import CodeDB
from _paths import EXTRACT, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")

ROOT = EXTRACT
DW = DataWin(os.path.join(ROOT, "cab", "data.win")); DW.load_strings()
C = CodeDB(DW)
print("code entries:", len(C.code), " vars:", len(C.variables), " funcs:", len(C.functions),
      " locals tables:", len(C.locals))

bad = 0
for e in C.code:
    try:
        ins = C.decode(e["addr"], e["length"])
        if any(i.name.startswith("op") for i in ins):
            bad += 1
    except Exception as ex:
        bad += 1
print("entries with unknown opcodes / errors:", bad)

for want in ("gml_Script_script0", "gml_Object_fr_tuto1_Create_0", "gml_Object_freccia_tutorial_Step_0"):
    e = [x for x in C.code if x["name"] == want][0]
    print("\n===== %s (locals=%d args=%d len=%d)" % (e["name"], e["locals"], e["args"], e["length"]))
    print("locals:", C.locals.get(e["name"]))
    for i in C.decode(e["addr"], e["length"])[:60]:
        print("  %06X: %s" % (i.addr - e["addr"], C.text(i)))
