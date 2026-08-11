"""Blit degli atlas per room: versione Python/Pillow di 24_blit.ps1.

24_blit.ps1 usa PowerShell + GDI+ (System.Drawing), quindi gira solo su
Windows. Per un sito statico il build deve poter girare ovunque (CI Linux
inclusa), quindi questo tool fa lo stesso lavoro leggendo lo stesso
blitplan.json emesso da 23_atlas.py, con l'unica dipendenza esterna del
repo: Pillow (`pip install pillow`).
"""
import os, json, sys

try:
    from PIL import Image
except ImportError:
    sys.exit("manca Pillow: pip install pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
room_name = sys.argv[1] if len(sys.argv) > 1 else "match_easy"

plan_path = os.path.join(ROOT, "game", "data", room_name + ".blitplan.json")
if not os.path.exists(plan_path):
    sys.exit("manca %s: gira prima tools/23_atlas.py %s" % (plan_path, room_name))
plan = json.load(open(plan_path, encoding="utf-8"))

os.makedirs(plan["dstDir"], exist_ok=True)

# pagine sorgente caricate una sola volta
src = {}
for b in plan["blits"]:
    if b["src"] not in src:
        p = os.path.join(plan["srcDir"], b["src"])
        if not os.path.exists(p):
            sys.exit("pagina sorgente mancante: %s" % p)
        src[b["src"]] = Image.open(p).convert("RGBA")

# pagine di destinazione, trasparenti
dst = [Image.new("RGBA", (p["w"], p["h"]), (0, 0, 0, 0)) for p in plan["pages"]]

for b in plan["blits"]:
    region = src[b["src"]].crop((b["sx"], b["sy"], b["sx"] + b["w"], b["sy"] + b["h"]))
    dst[b["dst"]].paste(region, (b["dx"], b["dy"]))

total = 0
for page, im in zip(plan["pages"], dst):
    out = os.path.join(plan["dstDir"], page["file"])
    im.save(out, "PNG")
    total += os.path.getsize(out)

print("%s: %d pagine scritte, %.1f MB su disco" % (room_name, len(dst), total / 1e6))
