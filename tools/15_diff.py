import sys, os, json, struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlib import DataWin, Reader
from _paths import EXTRACT, WORK, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")

ROOT = WORK

def names(path):
    DW = DataWin(path); DW.load_strings()
    d = DW.d
    out = {}
    for chunk in ("SPRT", "OBJT", "ROOM"):
        ns = []
        for p in DW.ptr_list(chunk):
            ns.append(DW.s(struct.unpack_from("<I", d, p)[0]))
        out[chunk] = set(ns)
    return out

a = names(os.path.join(ROOT, "_extract", "cab", "data.win"))     # exe (2020)
b = names(os.path.join(ROOT, "_extract", "apk", "game.droid"))   # apk (2019)

for k in ("SPRT", "OBJT", "ROOM"):
    only_apk = sorted(b[k] - a[k])
    print("%s: exe=%d apk=%d   solo-nell-APK=%d" % (k, len(a[k]), len(b[k]), len(only_apk)))
    if only_apk:
        print("   ", only_apk[:40])
