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

# [Bug corretto, segnalato dall'autore: "c'e' un pixel vuoto fra due sprite
# della piattaforma, quasi a tutti i livelli di zoom"] Il PAD di 2px riservato
# da 23_atlas.py fra un frame e l'altro (`pack()`, "margine anti-bleeding")
# evita che il campionamento LINEAR (game/src/gl.js, MIN/MAG_FILTER ovunque)
# faccia trapelare i pixel di uno sprite VICINO nell'atlas dentro un altro —
# ma quel margine restava trasparente (pagine di destinazione inizializzate a
# (0,0,0,0) sopra), quindi il bordo di OGNI frame sfuma comunque verso il
# trasparente non appena il filtro bilineare campiona anche solo mezzo texel
# oltre il proprio UV — cosa che l'ingrandimento (qualunque zoom diverso da
# 1:1 a schermo, quindi "quasi tutti") rende visibile come una striscia
# vuota. Riprodotto: due sprite adiacenti in world space ma di frame diversi
# nell'atlas (`baa11`/`baa12`, la piattaforma — game/src/platform.js) hanno
# ciascuno il proprio bordo che sfuma verso il trasparente, mostrando lo
# sfondo attraverso la cucitura anche se i due quad combaciano esattamente a
# livello geometrico. Estrusione di 1px (meta' del margine di 2px, mai
# abbastanza da toccare il frame vicino — garantito dal `+PAD` di
# 23_atlas.py su ogni cella): duplica il bordo vero di ciascun frame nel
# margine adiacente, cosi' il filtro bilineare sfuma verso una COPIA dello
# stesso colore/alpha invece che verso il trasparente.
EXTRUDE = 1

for b in plan["blits"]:
    region = src[b["src"]].crop((b["sx"], b["sy"], b["sx"] + b["w"], b["sy"] + b["h"]))
    dst[b["dst"]].paste(region, (b["dx"], b["dy"]))

for b in plan["blits"]:
    w, h, dx, dy = b["w"], b["h"], b["dx"], b["dy"]
    page = dst[b["dst"]]
    pw, ph = page.size
    region = src[b["src"]].crop((b["sx"], b["sy"], b["sx"] + w, b["sy"] + h))
    left, top = dx - EXTRUDE >= 0, dy - EXTRUDE >= 0
    right, bottom = dx + w + EXTRUDE <= pw, dy + h + EXTRUDE <= ph
    if left: page.paste(region.crop((0, 0, 1, h)), (dx - 1, dy))
    if right: page.paste(region.crop((w - 1, 0, w, h)), (dx + w, dy))
    if top: page.paste(region.crop((0, 0, w, 1)), (dx, dy - 1))
    if bottom: page.paste(region.crop((0, h - 1, w, h)), (dx, dy + h))
    if left and top: page.paste(region.crop((0, 0, 1, 1)), (dx - 1, dy - 1))
    if right and top: page.paste(region.crop((w - 1, 0, w, 1)), (dx + w, dy - 1))
    if left and bottom: page.paste(region.crop((0, h - 1, 1, h)), (dx - 1, dy + h))
    if right and bottom: page.paste(region.crop((w - 1, h - 1, w, h)), (dx + w, dy + h))

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
