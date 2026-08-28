"""Pre-renderizza la citta' statica dietro il menu principale (game/src/
title.js) in UNA sola immagine, invece di tenere l'intero atlas di `match`
(56 pagine, ~800 MB decompressi in GPU) solo per disegnare edifici/strade/
alberi che non cambiano mai a schermo.

[Decisione dell'autore: "citta' statica ma oggetti volanti e bombardamento
funzionanti"] title.js gia' separava concettualmente lo sfondo in due parti
— `worldStatic` (edifici/strade/alberi/piattaforma, mai animato) e
`dynamic` (auto, aerei/bombardieri/zeppelin, nuvole/uccelli, bombe/
esplosioni/detriti/fumo, semafori, turbine che lampeggiano, finestre che si
accendono di notte — vedi il commento su `dynamic`, li'). Qui si ricompone
SOLO `worldStatic` in un'unica immagine grande abbastanza da coprire tutta
l'area che la camera puo' mai inquadrare (deriva CAM_DRIFT intorno a
CAM_CENTER, STESSI numeri di title.js, piu' un margine per viewport larghi)
— title.js la disegna poi come un singolo quad in spazio mondo, sotto lo
stesso layer dinamico di sempre, cosi' auto/aerei/bombe restano vivi sopra
una citta' ferma.

Nessuna dipendenza dal sistema di atlas per-room (tools/23_atlas.py): legge
direttamente `data/sprites.json`/`data/textures.json` (le stesse fonti) e
ritaglia dalle texture page originali (`assets/textures/page_NNN.png`),
component per componente, con la STESSA formula di posizionamento del
motore (`ox = origin_x - frame.render_x`, `game/src/gl.js` Renderer.draw():
disegna con l'angolo in alto a sinistra a `(x - ox, y - oy)`).

Replica a mano (senza importare JS) la stessa costruzione di `worldStatic`
che game/src/title.js fa a runtime — filtri, `applyMatchPlatform()`
(game/src/platform.js) e `LIT_LOTS` (le case/ville gia' finite aggiunte
alla citta' sfumata, entrambi COPIATI qui 1:1 dai due file: se uno dei due
cambia, questo script va aggiornato in coppia, stesso principio di
tools/23_atlas.py/GAMEPLAY_SPRITES che documenta gia' un rischio analogo).

Uso: python3 tools/29_title_bg.py
"""
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.environ.get("NIMBUS_ARCHIVE", ROOT)
TEX_DIR = os.path.join(ARCHIVE, "assets", "textures")
OUT_PATH = os.path.join(ROOT, "game", "assets", "title_city.webp")

sprites = json.load(open(os.path.join(ROOT, "data", "sprites.json"), encoding="utf-8"))
textures = json.load(open(os.path.join(ROOT, "data", "textures.json"), encoding="utf-8"))
scene = json.load(open(os.path.join(ROOT, "game", "data", "match.scene.json"), encoding="utf-8"))

spr_by_name = {s["name"]: s for s in sprites}
page_by_id = {t["id"]: t for t in textures}
inst_by_obj = {it["obj"]: it for it in scene["instances"]}

# ------------------------------------------------ worldStatic (title.js)
# Stessi 4 filtri di title.js: placeholder (mai mostrato senza input di
# piazzamento), ni/nifast (nuvole finte ferme — l'atmosfera vera e' dinamica,
# atmosphere.js/atmo.clouds, non serve qui), aura/baura (residuo GML per un
# overlay giorno/notte mai riprodotto).
DROP_OBJS = {"placeholder", "ni", "nifast", "aura", "baura"}
static = [dict(it) for it in scene["instances"] if it["obj"] not in DROP_OBJS]
# honda1/honda2 (le due auto "gia' in marcia"): sostituite a runtime dalla
# simulazione vera (cars.js) — via anche qui, mai statiche.
static = [it for it in static if it["obj"] not in ("honda1", "honda2")]

# ------------------------------------------- applyMatchPlatform() (platform.js)
# Replica 1:1 della funzione JS con `interactive=False` (lo sfondo del menu
# non e' mai una partita vera): r120/baa12 (la base volante, creata via
# codice — mai un'istanza statica della room), le sue 14 alberature appese
# (al posto delle 56 "albe" a terra, rimosse), il piccolo decoro fisso
# "mudr2", e i due fari SEMPRE spenti (f1b/f2b — la catena vera che li
# accende esiste solo nella partita giocata, mai qui).
static = [it for it in static if it["obj"] != "albe"]
r12 = inst_by_obj["r12"]
R120_X, R120_Y = r12["x"] + 1170, r12["y"] + 346
static.append({"obj": "r120", "x": R120_X, "y": R120_Y, "depth": 1, "spr": "baa12"})
R120_TREES = [
    (282, 794), (439, 783), (379, 748), (518, 750), (565, 700), (463, 695),
    (538, 646), (637, 609), (699, 556), (758, 524), (816, 559), (724, 617),
    (672, 659), (739, 651),
]
for dx, dy in R120_TREES:
    static.append({"obj": "albe", "x": R120_X + dx, "y": R120_Y + dy, "depth": 0, "spr": "a1"})
static.append({"obj": "mudr2", "x": 769, "y": 845, "depth": -1055, "spr": "moor12"})
FARO1, FARO2 = {"x": 616, "y": 1100}, {"x": 1655, "y": 1111}
static.append({"obj": "faro1", "x": FARO1["x"], "y": FARO1["y"], "depth": 0, "spr": "f1b"})
static.append({"obj": "faro2", "x": FARO2["x"], "y": FARO2["y"], "depth": 0, "spr": "f2b"})

# --------------------------------------------------------- LIT_LOTS (title.js)
# Solo la meta' "sempre accesa" (l'edificio base): la seconda meta' — il
# decoro finestre, `_selfLit`, con la propria dissolvenza giorno/notte — resta
# un layer dinamico separato in title.js, disegnato ogni frame SOPRA questa
# immagine (stesso motivo delle turbine che lampeggiano: qualcosa che varia
# nel tempo non puo' finire cotto in un'immagine ferma).
LIT_LOTS = [
    (1375, 451, "vil6"), (2253, 452, "c211"), (2053, 453, "vil7"), (1275, 508, "c111"),
    (1475, 509, "vil8"), (2154, 509, "c112"), (1175, 565, "vil1"), (1375, 566, "c121"),
    (2253, 568, "vil9"), (1624, 595, "c131"), (1075, 623, "vil4"), (1274, 624, "c141"),
    (1524, 652, "vil10"), (1722, 653, "c151"), (976, 681, "vil5"), (1175, 682, "c122"),
]
for x, y, spr in LIT_LOTS:
    static.append({"obj": "decor", "x": x, "y": y, "depth": -y, "spr": spr})

# ---------------------------------------------------------------- ordinamento
# effDepth()/sortWorld() di title.js: depth 0 -> ordina per -y (davanti chi
# sta piu' in basso), qualunque altro depth e' gia' assoluto.
def eff_depth(it):
    return -it["y"] if it["depth"] == 0 else it["depth"]

# sortWorld() disegna la lista IN ORDINE: il piu' negativo (chi sta piu' in
# alto/lontano) va disegnato PER PRIMO, il meno negativo (chi sta piu' in
# basso/vicino) per ULTIMO, cosi' finisce sopra — `reverse=True` con questa
# chiave ordina dal piu' alto (fondo) al piu' basso (fronte), stesso ordine
# di disegno del motore.
static.sort(key=eff_depth, reverse=True)

# ------------------------------------------------------------------ area di bake
# Stessi CAM_CENTER/CAM_DRIFT di title.js (la deriva della camera intorno
# alla base volante) + un margine per la meta' del viewport a zoom fisso 1.6
# (title.js: `camWorld.minZoom = camWorld.maxZoom = 1.6`) — abbastanza largo
# da coprire una finestra desktop fino a ~2600x1500 CSS px senza mai
# scoprire un bordo dell'immagine, con margine extra per sicurezza.
CAM_CENTER = (1450, 750)
CAM_DRIFT = (420, 90)
BAKE_X0, BAKE_X1 = 200, 2700
BAKE_Y0, BAKE_Y1 = 180, 1320
W, H = BAKE_X1 - BAKE_X0, BAKE_Y1 - BAKE_Y0

canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
page_cache = {}

def page_image(tex_id):
    if tex_id not in page_cache:
        page_cache[tex_id] = Image.open(os.path.join(TEX_DIR, page_by_id[tex_id]["file"])).convert("RGBA")
    return page_cache[tex_id]

drawn, skipped = 0, 0
for it in static:
    spr_name = it.get("spr")
    s = spr_by_name.get(spr_name) if spr_name else None
    if not s or not s.get("frames"):
        skipped += 1
        continue
    fr = s["frames"][0]
    if "tex" not in fr or fr["w"] <= 0 or fr["h"] <= 0:
        skipped += 1
        continue
    ox = s["origin_x"] - fr["render_x"]
    oy = s["origin_y"] - fr["render_y"]
    dst_x = round(it["x"] - ox - BAKE_X0)
    dst_y = round(it["y"] - oy - BAKE_Y0)
    if dst_x + fr["w"] < 0 or dst_y + fr["h"] < 0 or dst_x > W or dst_y > H:
        continue   # completamente fuori dall'area di bake, non serve nemmeno ritagliare
    page = page_image(fr["tex"])
    crop = page.crop((fr["x"], fr["y"], fr["x"] + fr["w"], fr["y"] + fr["h"]))
    canvas.alpha_composite(crop, (dst_x, dst_y))
    drawn += 1

os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
canvas.save(OUT_PATH, "WEBP", quality=88, method=6)
size_kb = os.path.getsize(OUT_PATH) / 1024
print("title_city.webp: %dx%d, %d sprite disegnati (%d saltati senza frame), %.0f KB su disco"
      % (W, H, drawn, skipped, size_kb))
