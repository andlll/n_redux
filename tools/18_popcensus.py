import sys, os, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin
from gmcode import CodeDB, DTYPE

ROOT = r"C:\Users\andli\OneDrive\Desktop\software\mount fuji\nimbus\_extract"
DW = DataWin(os.path.join(ROOT, "cab", "data.win")); DW.load_strings()
C = CodeDB(DW)

cnt = collections.Counter()
affected = set()
for e in C.code:
    for i in C.decode(e["addr"], e["length"]):
        if i.op == 0x45:
            key = (DTYPE.get(i.t1, i.t1), DTYPE.get(i.t2, i.t2), i.vartype or "normal")
            cnt[key] += 1
            if i.t1 != 5:
                affected.add(e["name"])
print("combinazioni di pop (tipo1, tipo2, vartype):")
for k, v in cnt.most_common():
    flag = "   <-- indirizzo prima del valore" if k[0] != "v" else ""
    print("   %-28s %7d%s" % (str(k), v, flag))
print()
print("blocchi di codice coinvolti dal bug: %d / %d" % (len(affected), len(C.code)))
