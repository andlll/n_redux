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

# WebP invece di PNG: la stessa identica pipeline, un solo formato di
# output diverso. Verificato pagina per pagina (assets/match_easy_35.png e
# altre, confrontate a occhio zoomate 3x sulle sagome ad alto contrasto,
# righe/ringhiere nere su bianco — il caso peggiore per artefatti di
# compressione con perdita): a qualita' 90 nessuna differenza visibile,
# ~120 MB -> ~66 MB sull'intero set di atlas (55%, misurato).
# `method=4`, non 6: misurato su una pagina reale (match_easy, ~1 MB), method
# 6 guadagna solo un ulteriore ~2% (0.969 contro 0.990 MB) mettendoci quasi
# 7 volte piu' a lungo (9.5s contro 1.4s) — su ~230 pagine in tutta la
# pipeline la differenza e' minuti di CI per un risparmio che si perde nel
# rumore. Font e logo restano LOSSLESS (method=6 li' non costa nulla, sono
# poche pagine piccole): gia' piccoli di per se' (poco da guadagnare con la
# perdita) e font.js li campiona con filtro NEAREST apposta per bordi netti
# (STUDIO.md/font.js) — un glifo leggermente sfocato dalla compressione con
# perdita sarebbe visibile in un modo che un atlas di sprite non e'.
LOSSLESS_PREFIXES = ("font_", "mount_logo")
total = 0
for page, im in zip(plan["pages"], dst):
    out = os.path.join(plan["dstDir"], page["file"])
    if page["file"].startswith(LOSSLESS_PREFIXES):
        im.save(out, "WEBP", lossless=True, method=6)
    else:
        im.save(out, "WEBP", quality=90, method=4)
    total += os.path.getsize(out)

print("%s: %d pagine scritte, %.1f MB su disco" % (room_name, len(dst), total / 1e6))
