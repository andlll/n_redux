import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin
from gmcode import CodeDB
from _paths import EXTRACT, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")

ROOT = EXTRACT
DW = DataWin(os.path.join(ROOT, "cab", "data.win")); DW.load_strings()
C = CodeDB(DW)
fs = sorted(C.functions, key=lambda f: -f["occurrences"])
for f in fs:
    print("%-34s %d" % (f["name"], f["occurrences"]))
json.dump(fs, open(os.path.join(ROOT, "out", "functions.json"), "w"), indent=1)
