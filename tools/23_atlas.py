"""Reimpacchetta gli sprite di una room in atlas stretti.

GameMaker impacchettava tutti i 1376 sprite insieme, quindi i pochi sprite di
una room finiscono sparpagliati su decine di pagine: riusarle vorrebbe dire
tenere in VRAM centinaia di MB per disegnarne una manciata.

Qui si prende solo cio' che serve e lo si reimpacchetta. Questo script decide
*dove* va ogni frame ed emette un piano di copia; il blit vero lo fa
24_blit.ps1 con GDI+, che e' veloce e non richiede installare niente.
"""
import os, json, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Le texture page stanno nel repo: niente dipendenze da cartelle locali.
ARCHIVE = os.environ.get("NIMBUS_ARCHIVE", ROOT)

PAGE = int(os.environ.get("ATLAS_PAGE", "2048"))
PAD = 2                                  # margine anti-bleeding fra i frame

room_name = sys.argv[1] if len(sys.argv) > 1 else "match_easy"

sprites = json.load(open(os.path.join(ROOT, "data", "sprites.json"), encoding="utf-8"))
textures = json.load(open(os.path.join(ROOT, "data", "textures.json"), encoding="utf-8"))
scene = json.load(open(os.path.join(ROOT, "game", "data", room_name + ".scene.json"), encoding="utf-8"))

spr_by_name = {s["name"]: s for s in sprites}
page_by_id = {t["id"]: t for t in textures}

# Sprite che non stanno mai ferme in una room ma servono a runtime perche' il
# giocatore le fa comparire (edifici piazzati, cantieri di potenziamento...).
# 23_atlas.py impacchetta solo cio' che vede nella room statica: queste sono
# elencate a mano, per famiglia di gameplay, cosi' l'atlas resta "solo cio'
# che serve" anche per roba creata a runtime.
GAMEPLAY_SPRITES = {
    "buildings": [
        # chies: chiesa, l'edificio guida per il ciclo piazzamento -> potenziamento.
        "crc", "crc4", "crc5",                                    # livello 1/2/3
        "ce11", "ce12", "ce13", "ce14", "ce15", "ce16", "ce17",    # cantiere 1->2
        "ce18", "ce19", "ce20", "ce21", "ce22", "ce23",
        "ci21", "ci22", "ci23", "ci24", "ci25", "ci26", "ci27",    # cantiere 2->3
        "ci28", "ci29", "ci30", "ci31", "ci32", "ci33", "ci34", "ci35", "ci36", "ci37",
        "crcl", "crc2l", "crc3l", "crc3l2", "crc3l3", "crc3l4", "crc3l5",  # decoro cddvd*
        "gru1", "gr21",                                           # gru/rubble cantiere
        # industria: secondo edificio, catena impaind0to1r/1to2r/2to3r
        # (src/objects/impaind*, STUDIO.md §5.5/§7.3/§9 "impa* come dati").
        "i11", "i21", "i31",                                      # livello 1/2/3 (variante 1)
        "i11l", "i11ll",                                          # decoro livello 1
        "i21l", "i21b", "i21c",                                   # decoro livello 2
        "i31a1", "i31a2", "i31a3", "i31l1l",                      # decoro livello 3
        "ir11", "ir12", "ir13", "ir14", "ir15", "ir16",           # cantiere: fondamenta, fase 1
        "ir21", "ir22", "ir23", "ir24", "ir25", "ir26",           # fase 2
        "ir31", "ir32", "ir33", "ir34", "ir35", "ir36",           # fase 3
        "ir41", "ir42", "ir43", "ir44", "ir45", "ir46",           # fase 4
        # casa: terzo edificio, tre livelli (casa1/2/3), 20 varianti
        # sprite+decoro a dado per livello (src/objects/casa1|2|3/Create.gml,
        # STUDIO.md §9). Il cantiere riusa gli sprite ir1x/2x/3x/4x gia'
        # presenti per industria (stessi sprite, oggetti impa* diversi).
        "c111", "c112", "c113", "c114", "c121", "c122", "c123", "c124", "c131", "c132", "c133", "c134", "c141", "c142", "c143", "c144", "c151", "c152", "c153", "c154",  # casa1
        "c111l", "c112l", "c113l", "c114l", "c121l", "c122l", "c123l", "c124l", "c131l", "c132l", "c133l", "c134l", "c141l", "c142l", "c143l", "c144l", "c151l", "c152l", "c153l", "c154l",  # decoro casa1
        "c211", "c212", "c213", "c214", "c221", "c222", "c223", "c224", "c231", "c232", "c233", "c234", "c241", "c242", "c243", "c244", "c251", "c252", "c253", "c254",  # casa2
        "c211l", "c212l", "c213l", "c214l", "c221l", "c222l", "c223l", "c224l", "c231l", "c232l", "c233l", "c234l", "c241l", "c242l", "c243l", "c244l", "c251l", "c252l", "c253l", "c254l",  # decoro casa2
        "c311", "c312", "c313", "c314", "c321", "c322", "c323", "c324", "c331", "c332", "c333", "c334", "c341", "c342", "c343", "c344", "c351", "c352", "c353", "c354",  # casa3
        "c311l", "c312l", "c313l", "c314l", "c321l", "c322l", "c323l", "c324l", "c331l", "c332l", "c333l", "c334l", "c341l", "c342l", "c343l", "c344l", "c351l", "c352l", "c353l", "c354l",  # decoro casa3
    ],
    # GUI vera (STUDIO.md §9 "GUI vera"): la barra risorse e' un'unica
    # immagine con le icone gia' disegnate dentro (src/objects/repre/
    # DrawGUI.gml: action_draw_sprite(icone_oriz, ...) + i numeri col font
    # bitmap "gotham_mini" a offset fissi), non quattro icone separate come
    # avevamo indovinato. I bottoni edificio (src/objects/pu1|pu2) hanno
    # ciascuno due sprite, normale e "selezionato" (px / pxss), cambiate a
    # mano nello Step in base a r12.selec — non e' un tint, sono disegni
    # diversi.
    "gui": [
        "icone_oriz",          # sfondo barra risorse (repre/DrawGUI.gml)
        "p1", "p1ss",          # bottone casa (pu1, selec==1)
        "p2", "p2ss",          # bottone industria (pu2, selec==2)
    ],
}
EXTRA_SPRITES = sorted({s for group in GAMEPLAY_SPRITES.values() for s in group})

# ---------------------------------------------------------------- raccolta
rects = []                               # frame da sistemare
used = sorted({i["spr"] for i in scene["instances"] if "spr" in i} | set(EXTRA_SPRITES))
for name in used:
    s = spr_by_name.get(name)
    if not s:
        continue
    for fi, fr in enumerate(s["frames"]):
        if "tex" not in fr or fr["w"] <= 0 or fr["h"] <= 0:
            continue
        rects.append({
            "spr": name, "frame": fi,
            "src": fr["tex"], "sx": fr["x"], "sy": fr["y"],
            "w": fr["w"], "h": fr["h"],
            "ox": s["origin_x"] - fr["render_x"],
            "oy": s["origin_y"] - fr["render_y"],
        })

if not rects:
    sys.exit("nessun frame da impacchettare per %s" % room_name)

# ------------------------------------------------------- packer a scaffali
# Semplice ma efficace su sprite di altezze simili: si ordina per altezza
# decrescente e si riempiono righe successive.
rects.sort(key=lambda r: (-r["h"], -r["w"]))
pages = []                               # ogni pagina: {shelfY, shelfH, cursorX}
for r in rects:
    w, h = r["w"] + PAD, r["h"] + PAD
    if w > PAGE or h > PAGE:
        sys.exit("frame piu' grande della pagina: %s %dx%d" % (r["spr"], r["w"], r["h"]))
    placed = False
    for pi, p in enumerate(pages):
        # prova gli scaffali esistenti
        for sh in p["shelves"]:
            if sh["h"] >= h and sh["x"] + w <= PAGE:
                r["dst"], r["dx"], r["dy"] = pi, sh["x"], sh["y"]
                sh["x"] += w
                placed = True
                break
        if placed:
            break
        # nuovo scaffale in fondo alla pagina
        if p["bottom"] + h <= PAGE:
            sh = {"y": p["bottom"], "x": w, "h": h}
            p["shelves"].append(sh)
            p["bottom"] += h
            r["dst"], r["dx"], r["dy"] = pi, 0, sh["y"]
            placed = True
            break
    if not placed:
        pages.append({"shelves": [{"y": 0, "x": r["w"] + PAD, "h": h}], "bottom": h})
        r["dst"], r["dx"], r["dy"] = len(pages) - 1, 0, 0

# altezza reale di ogni pagina, arrotondata a potenza di due
def pow2(v):
    n = 1
    while n < v:
        n *= 2
    return n

heights = [pow2(p["bottom"]) for p in pages]

# ---------------------------------------------------------------- output
atlas = {"room": room_name, "pages": [], "sprites": {}}
for pi, h in enumerate(heights):
    atlas["pages"].append({"file": "%s_%d.png" % (room_name, pi), "w": PAGE, "h": h})

by_sprite = {}
for r in rects:
    ph = heights[r["dst"]]
    by_sprite.setdefault(r["spr"], []).append((r["frame"], {
        "p": r["dst"],
        "u0": round(r["dx"] / PAGE, 6), "v0": round(r["dy"] / ph, 6),
        "u1": round((r["dx"] + r["w"]) / PAGE, 6), "v1": round((r["dy"] + r["h"]) / ph, 6),
        "w": r["w"], "h": r["h"], "ox": r["ox"], "oy": r["oy"],
    }))
for name, lst in by_sprite.items():
    atlas["sprites"][name] = [f for _, f in sorted(lst)]

plan = {
    "srcDir": os.path.join(ARCHIVE, "assets", "textures"),
    "dstDir": os.path.join(ROOT, "game", "assets"),
    "pages": [{"file": p["file"], "w": p["w"], "h": p["h"]} for p in atlas["pages"]],
    "blits": [{"src": page_by_id[r["src"]]["file"], "sx": r["sx"], "sy": r["sy"],
               "w": r["w"], "h": r["h"], "dst": r["dst"], "dx": r["dx"], "dy": r["dy"]}
              for r in rects],
}

os.makedirs(os.path.join(ROOT, "game", "data"), exist_ok=True)
json.dump(atlas, open(os.path.join(ROOT, "game", "data", room_name + ".atlas.json"),
                      "w", encoding="utf-8"), separators=(",", ":"))
json.dump(plan, open(os.path.join(ROOT, "game", "data", room_name + ".blitplan.json"),
                     "w", encoding="utf-8"), separators=(",", ":"))

vram = sum(PAGE * h * 4 for h in heights)
srcpages = len({r["src"] for r in rects})
print("%s: %d sprite, %d frame" % (room_name, len(by_sprite), len(rects)))
print("   prima:  %d pagine originali, %.0f MB VRAM"
      % (srcpages, sum(page_by_id[p]["w"] * page_by_id[p]["h"] * 4
                       for p in {r["src"] for r in rects}) / 1e6))
print("   dopo:   %d pagine %dx%s, %.0f MB VRAM"
      % (len(heights), PAGE, heights, vram / 1e6))
