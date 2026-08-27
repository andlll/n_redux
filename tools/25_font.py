"""Ritaglia un font bitmap dell'originale per usarlo nella UI in-canvas.

GameMaker impacchetta ogni font come un'unica pagina di glifi dentro le
texture page generali (`data/fonts.json` da' i rettangoli). A differenza
di 23_atlas.py qui non c'e' da reimpacchettare niente: e' un solo
ritaglio rettangolare, quindi il piano di copia e' un blit diretto in
24_blit.py riusando lo stesso formato di `blitplan.json`.

Uso: python3 tools/25_font.py <nome_font>   (default: gotham_mid)
"""
import os, json, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.environ.get("NIMBUS_ARCHIVE", ROOT)

font_name = sys.argv[1] if len(sys.argv) > 1 else "gotham_mid"

fonts = json.load(open(os.path.join(ROOT, "data", "fonts.json"), encoding="utf-8"))
textures = json.load(open(os.path.join(ROOT, "data", "textures.json"), encoding="utf-8"))
page_by_id = {t["id"]: t for t in textures}

font = next((f for f in fonts if f["name"] == font_name), None)
if not font:
    sys.exit("font non trovato: %s (disponibili: %s)" % (font_name, [f["name"] for f in fonts]))

tex = font["texture"]
page = page_by_id[tex["tex"]]
out_file = "font_%s.webp" % font_name

glyphs = {}
for g in font["glyphs"]:
    glyphs[g["char"]] = {
        "u0": round(g["x"] / tex["w"], 6), "v0": round(g["y"] / tex["h"], 6),
        "u1": round((g["x"] + g["w"]) / tex["w"], 6), "v1": round((g["y"] + g["h"]) / tex["h"], 6),
        "w": g["w"], "h": g["h"], "shift": g["shift"], "offset": g["offset"],
    }

out = {
    "name": font_name, "emSize": font["em_size"], "file": out_file,
    "w": tex["w"], "h": tex["h"], "glyphs": glyphs,
}

plan = {
    "srcDir": os.path.join(ARCHIVE, "assets", "textures"),
    "dstDir": os.path.join(ROOT, "game", "assets"),
    "pages": [{"file": out_file, "w": tex["w"], "h": tex["h"]}],
    "blits": [{"src": page["file"], "sx": tex["x"], "sy": tex["y"],
               "w": tex["w"], "h": tex["h"], "dst": 0, "dx": 0, "dy": 0}],
}

os.makedirs(os.path.join(ROOT, "game", "data"), exist_ok=True)
json.dump(out, open(os.path.join(ROOT, "game", "data", "font_%s.json" % font_name),
                    "w", encoding="utf-8"), separators=(",", ":"))
json.dump(plan, open(os.path.join(ROOT, "game", "data", "font_%s.blitplan.json" % font_name),
                     "w", encoding="utf-8"), separators=(",", ":"))
print("font %s: %d glifi, pagina %dx%d" % (font_name, len(glyphs), tex["w"], tex["h"]))
