"""Estrae le luci delle finestre come singole (piccolissime) sotto-immagini,
invece di un'unica dissolvenza in alpha sull'intera sagoma.

L'originale non anima una dissolvenza: cddvd/d111/eccetera (Step.gml)
passano per una sequenza di sprite multi-frame (crclx/cNNNx, 58-200 frame,
letti al contrario per l'accensione) in cui le finestre si accendono UNA
ALLA VOLTA, non tutte insieme (verificato visivamente confrontando i frame,
non solo dal nome). Qui lo stesso effetto senza duplicare gli sprite interi
(che a piena risoluzione pesano centinaia di MB decompressi, STUDIO.md):
confrontando due frame consecutivi si trova la piccola regione di pixel che
e' appena diventata opaca — una finestra — e la si ritaglia direttamente
dalla texture page originale (nessun pixel nuovo, solo un ritaglio piu'
piccolo dello stesso disegno). Il risultato (`data/lights.json`) e' letto
da 23_atlas.py per impacchettare quei ritagli nell'atlas come sprite a se'
stanti, e da game/src/main.js per accenderli in sequenza invece che con
un'unica dissolvenza.
"""
import json, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.environ.get("NIMBUS_ARCHIVE", ROOT)

sprites = json.load(open(os.path.join(ROOT, "data/sprites.json"), encoding="utf-8"))
by_name = {s["name"]: s for s in sprites if isinstance(s, dict)}

_page_cache = {}
def load_page(tex):
    if tex not in _page_cache:
        _page_cache[tex] = np.array(
            Image.open(os.path.join(ARCHIVE, "assets/textures", f"page_{tex:03d}.png")).convert("RGBA")
        )
    return _page_cache[tex]

def load_frame_canvas(spr, idx):
    fr = spr["frames"][idx]
    page = load_page(fr["tex"])
    crop = page[fr["y"]:fr["y"] + fr["h"], fr["x"]:fr["x"] + fr["w"]]
    canvas = np.zeros((spr["height"], spr["width"], 4), dtype=np.uint8)
    ry, rx = fr["render_y"], fr["render_x"]
    canvas[ry:ry + fr["h"], rx:rx + fr["w"]] = crop
    return canvas

ALPHA_THRESH = 140
MIN_BLOB_PX = 6

def analyze(anim_name):
    """Una finestra per blob di pixel appena apparso, dal frame piu' vecchio
    (indice frame_count-1, quasi buio) al piu' nuovo (indice 0, tutto acceso).
    `t` e' il tempo normalizzato (0..1) in cui quella finestra si accende."""
    spr = by_name[anim_name]
    F = spr["frame_count"]
    ox, oy = spr["origin_x"], spr["origin_y"]
    last_fr = spr["frames"][0]   # il frame finale copre sempre tutte le finestre: fonte dei ritagli
    prev_mask = None
    lights = []
    for i in range(F - 1, -1, -1):
        canvas = load_frame_canvas(spr, i)
        mask = canvas[:, :, 3] > ALPHA_THRESH
        new = mask if prev_mask is None else (mask & ~prev_mask)
        if new.any():
            labeled, n = ndimage.label(new)
            for lbl in range(1, n + 1):
                ys, xs = np.where(labeled == lbl)
                if len(xs) < MIN_BLOB_PX:
                    continue
                bx0, bx1 = int(xs.min()), int(xs.max()) + 1
                by0, by1 = int(ys.min()), int(ys.max()) + 1
                t = (F - 1 - i) / max(1, F - 1)
                lights.append({
                    "dx": round((bx0 + bx1) / 2 - ox, 1),
                    "dy": round((by0 + by1) / 2 - oy, 1),
                    "t": round(t, 3),
                    "tex": last_fr["tex"],
                    "sx": last_fr["x"] + (bx0 - last_fr["render_x"]),
                    "sy": last_fr["y"] + (by0 - last_fr["render_y"]),
                    "sw": bx1 - bx0,
                    "sh": by1 - by0,
                })
        prev_mask = mask
    lights.sort(key=lambda l: l["t"])
    return lights

# base (il decoro gia' usato in game/src/buildings.js) -> nome dello sprite animato
TARGETS = {}
TARGETS["crcl"] = "crclx"
TARGETS["crc2l"] = "crc2x"
TARGETS["crc3l"] = "crc3x"
TARGETS["i11l"] = "i11x"
for lvl in (1, 2, 3):
    for a in (1, 2, 3, 4, 5):
        for b in (1, 2, 3, 4):
            TARGETS[f"c{lvl}{a}{b}l"] = f"c{lvl}{a}{b}x"

def main():
    out = {}
    runtime = {}
    total_windows = 0
    for base, anim in TARGETS.items():
        if anim not in by_name:
            print(f"salto {base}: {anim} non trovato", file=sys.stderr)
            continue
        lights = analyze(anim)
        for i, l in enumerate(lights):
            l["spr"] = f"{base}_w{i}"
        out[base] = lights
        # copia "di gioco": solo cio' che game/src/main.js legge davvero
        # (niente ritagli in pixel, quelli servono solo a 23_atlas.py).
        runtime[base] = [{"spr": l["spr"], "dx": l["dx"], "dy": l["dy"], "t": l["t"]} for l in lights]
        total_windows += len(lights)
    dst = os.path.join(ROOT, "data", "lights.json")
    json.dump(out, open(dst, "w", encoding="utf-8"), separators=(",", ":"))
    game_dst = os.path.join(ROOT, "game", "data", "lights.json")
    os.makedirs(os.path.dirname(game_dst), exist_ok=True)
    json.dump(runtime, open(game_dst, "w", encoding="utf-8"), separators=(",", ":"))
    print(f"{len(out)} decori, {total_windows} finestre totali -> {dst} + {game_dst}")

if __name__ == "__main__":
    main()
