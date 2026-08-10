import sys, os, zipfile, json, datetime
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

ROOT = WORK
APK = os.path.join(ROOT, "NIMBUS Android Edition.apk")
DST = os.path.join(ROOT, "_extract", "apk")
os.makedirs(DST, exist_ok=True)
tgt = os.path.join(DST, "game.droid")
if not os.path.exists(tgt):
    with zipfile.ZipFile(APK) as z:
        with z.open("assets/game.droid") as f, open(tgt, "wb") as o:
            while True:
                b = f.read(1 << 20)
                if not b:
                    break
                o.write(b)
print("game.droid", os.path.getsize(tgt))

from gmlib import DataWin
from _paths import EXTRACT, WORK, need
need(EXTRACT, "la cartella di lavoro dell'estrazione")
DW = DataWin(tgt)
DW.load_strings()
g = DW.gen8()
g["timestamp_utc"] = str(datetime.datetime.utcfromtimestamp(g["timestamp"]))
print(json.dumps(g, indent=1, ensure_ascii=False))
for n in ("SPRT", "OBJT", "ROOM", "CODE", "TXTR", "SOND", "FONT", "SCPT"):
    if n in DW.chunks:
        print("%-5s %d" % (n, len(DW.ptr_list(n))))
