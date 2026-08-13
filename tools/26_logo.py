"""Ritaglia uno sprite statico (non un font, non una room) dalle texture page
originali per usarlo nella UI in-canvas — oggi solo il logo Mount Fuji
Software (sprite "mount_logo", src/objects/fujilogo), per la schermata di
caricamento.

Come 25_font.py: un solo ritaglio rettangolare, nessun impacchettamento,
quindi il piano di copia e' un blit diretto in 24_blit.py riusando lo
stesso formato di blitplan.json.

Uso: python3 tools/26_logo.py <nome_sprite>   (default: mount_logo)
"""
import os, json, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.environ.get("NIMBUS_ARCHIVE", ROOT)

spr_name = sys.argv[1] if len(sys.argv) > 1 else "mount_logo"

sprites = json.load(open(os.path.join(ROOT, "data", "sprites.json"), encoding="utf-8"))
textures = json.load(open(os.path.join(ROOT, "data", "textures.json"), encoding="utf-8"))
page_by_id = {t["id"]: t for t in textures}

spr = next((s for s in sprites if s["name"] == spr_name), None)
if not spr:
    sys.exit("sprite non trovato: %s" % spr_name)
fr = spr["frames"][0]
page = page_by_id[fr["tex"]]
out_file = "%s.png" % spr_name

plan = {
    "srcDir": os.path.join(ARCHIVE, "assets", "textures"),
    "dstDir": os.path.join(ROOT, "game", "assets"),
    "pages": [{"file": out_file, "w": fr["w"], "h": fr["h"]}],
    "blits": [{"src": page["file"], "sx": fr["x"], "sy": fr["y"],
               "w": fr["w"], "h": fr["h"], "dst": 0, "dx": 0, "dy": 0}],
}

os.makedirs(os.path.join(ROOT, "game", "data"), exist_ok=True)
json.dump(plan, open(os.path.join(ROOT, "game", "data", "%s.blitplan.json" % spr_name),
                     "w", encoding="utf-8"), separators=(",", ":"))
print("%s: %dx%d, pagina sorgente %s" % (spr_name, fr["w"], fr["h"], page["file"]))
