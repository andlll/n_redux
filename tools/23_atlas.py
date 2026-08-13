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
        # traccia "f": impalcatura in sovraimpressione, sempre davanti a
        # "r" ([C] impaind0to1f/Create.gml: depth = -y - 2). Stessa sagoma
        # di ir1x..4x come reticolo invece che struttura piena (STUDIO.md
        # §9, buildings.js frontSprFor()) — un cantiere senza questa traccia
        # e' solo la fondamenta che cambia, senza nessuna impalcatura
        # davanti (segnalato dall'autore).
        "if11", "if12", "if13", "if14", "if15", "if16",
        "if21", "if22", "if23", "if24", "if25", "if26",
        "if31", "if32", "if33", "if34", "if35", "if36",
        "if41", "if42", "if43", "if44", "if45", "if46",
        "im2f", "im4f",   # coperchio a gru di fine cantiere (upgrades[i].cap)
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
        # parco: quarto edificio, un solo livello, 8 varianti a dado
        # (src/objects/parco/Create.gml). Il cantiere riusa gli stessi
        # sprite ir1x/if1x di industria/casa (gia' elencati sopra). Il suo
        # "decoro" e' uno scatter di alberi (sprite gia' in "trees" sotto)
        # e lampioni — corpo "l1" + luce "l1l", lo stesso oggetto
        # lampioncino/lampla che altrimenti non comparirebbe mai in
        # match_easy (nessuna istanza sua nella room, STUDIO.md).
        "par1", "par2", "par3", "par4", "par5", "par6", "par7", "par8",
        "l1", "l1l",
        # missile: primo edificio DIFENSIVO (src/objects/rocket_launcher,
        # cantiere impamissr/impamissf — game/src/buildings.js). Il cantiere
        # riusa ir1x/ir2x/if1x/if2x gia' presenti sopra (nessuno sprite di
        # cantiere in piu' da aggiungere). "toppers" e' il topper di gru
        # transitorio (impamissf/Alarm_0.gml tic==5, oggetto "tops2");
        # "lrn1".."lrn16" sono i 16 sprite di mira del cannone
        # (rocket_launcher/Step.gml, `sprite_index` risolti per indice —
        # non nomi scelti qui, letti da data/sprites.json).
        "rl_as", "toppers",
        "lrn1", "lrn2", "lrn3", "lrn4", "lrn5", "lrn6", "lrn7", "lrn8",
        "lrn9", "lrn10", "lrn11", "lrn12", "lrn13", "lrn14", "lrn15", "lrn16",
        # solare: pannelli solari, un solo livello (nessun upXX lo referenzia
        # nel decompilato — sooool/Create.gml non arma nessun "upo" reale,
        # game/src/buildings.js). Il cantiere (impasolr/impasolf) riusa gli
        # stessi ir1x/if1x/"toppers" gia' elencati sopra, nessuno sprite di
        # cantiere in piu' — "sool" e' il solo sprite finale nuovo.
        "sool",
        # club: settimo edificio, un solo livello (impaclubr/impaclubf, che
        # riusano gli stessi ir1x/if1x/"toppers" di sopra). A differenza di
        # missile/solare l'edificio finito ha 4 varianti a dado (club1/
        # Create.gml) col proprio decoro luce abbinato — "club11".."club14"
        # (sprite finale) e "club11i".."club14i" (decoro, oggetti originali
        # clublite1..4) sono le uniche otto nuove.
        "club11", "club12", "club13", "club14",
        "club11i", "club12i", "club13i", "club14i",
        # villa: ottavo edificio, un solo livello (impavil_r/impavil_f, che
        # riusano gli stessi ir1x/if1x/"toppers" di sopra). Come club, 12
        # varianti a dado (villa1/Create.gml — non equiprobabili, vedi
        # game/src/buildings.js pickVariant()) col proprio decoro abbinato:
        # "vil1".."vil12" (sprite finale) e "vil1l".."vil12l" (decoro,
        # oggetti originali dvil1..12) sono le 24 nuove.
        "vil1", "vil2", "vil3", "vil4", "vil5", "vil6",
        "vil7", "vil8", "vil9", "vil10", "vil11", "vil12",
        "vil1l", "vil2l", "vil3l", "vil4l", "vil5l", "vil6l",
        "vil7l", "vil8l", "vil9l", "vil10l", "vil11l", "vil12l",
        # gatling: nono edificio, seconda torretta (src/objects/gatlinggun,
        # cantiere impagatlingr/impagatlingf — riusano gli stessi ir1x/if1x/
        # "toppers" di sopra, nessuno sprite di cantiere in piu'). "nm1a"..
        # "nm16a" sono i 16 sprite di mira del cannone (gatlinggun/Step.gml,
        # sprite_index risolti per indice come "lrn1".."lrn16" sopra) — solo
        # le pose "a": le "b" (nm1b..nm16b) sono la posa di rinculo dopo lo
        # sparo, non riprodotta (game/src/buildings.js).
        "nm1a", "nm2a", "nm3a", "nm4a", "nm5a", "nm6a", "nm7a", "nm8a",
        "nm9a", "nm10a", "nm11a", "nm12a", "nm13a", "nm14a", "nm15a", "nm16a",
        # laser: decimo edificio, terza torretta (src/objects/lasergun,
        # cantiere impalaser_r/impalaser_f — riusano ir1x/if1x/"toppers"/
        # "gr21" di sopra, nessuno sprite di cantiere in piu'). "lan1"..
        # "lan16" sono i 16 sprite di mira, stesso schema di "lrn"/"nm".
        "lan1", "lan2", "lan3", "lan4", "lan5", "lan6", "lan7", "lan8",
        "lan9", "lan10", "lan11", "lan12", "lan13", "lan14", "lan15", "lan16",
    ],
    # GUI vera (STUDIO.md §9 "GUI vera"): la barra risorse e' un'unica
    # immagine con le icone gia' disegnate dentro (src/objects/repre/
    # DrawGUI.gml: action_draw_sprite(icone_oriz, ...) + i numeri col font
    # bitmap "gotham_mini" a offset fissi), non quattro icone separate come
    # avevamo indovinato. I bottoni edificio (src/objects/pu1|pu2|...) hanno
    # ciascuno due sprite, normale e "selezionato" (px / pxss), cambiate a
    # mano nello Step in base a r12.selec — non e' un tint, sono disegni
    # diversi.
    "gui": [
        "icone_oriz",          # sfondo barra risorse (repre/DrawGUI.gml)
        "p1", "p1ss",          # bottone casa (pu1, selec==1) — piazzabile
        "p2", "p2ss",          # bottone industria (pu2, selec==2) — piazzabile
        # Gli altri bottoni edificio del menu originale (src/objects/pu3|
        # pu4prov|pu5prov|pu6|pu7|pudj|pusolare|pugatling|puvillone|
        # pumediat): STUDIO.md "cosa manca" li elenca come famiglie impa*
        # non ancora lette. Mostrati come segnaposto statici nel menu
        # (STUDIO.md §9) — tap mostra "non ancora ricostruito", non
        # piazzano niente.
        "p3", "p3ss", "p4", "p4ss", "p5", "p5ss", "p6", "p6ss", "p7", "p7ss",
        "pdj", "pdjss", "psolare", "psolaress", "pgatling", "pgatlingss",
        "pvilla", "pvillass", "pmuseo", "pmuseoss",
        "ru", "russ",           # puruspa (bulldozer/ripara, selec==11, mai ricostruito)
        "reset",                # pureset
        # Gli altri bottoni del pannello (src/objects/handbutton|buildbutton|
        # eyebutton|eyebutton1|2|3|backobutton): nell'originale aprivano/
        # chiudevano le righe del menu (STUDIO.md §9 "menoo", tre pannelli
        # alternati mai ricostruiti) — qui sono una seconda riga sempre
        # visibile, segnaposto tranne lo zoom (gia' funzionante altrimenti).
        "handee", "groo", "eyeee", "eyee1", "eyee2", "eyee3", "baccc",
        "zoomplus", "zoomminus",
    ],
    # Alberi (src/objects/albe|albe2|albe3/Create.gml, STUDIO.md): a Create
    # l'originale sceglie a dado uno sprite finale diverso per istanza fra
    # queste varianti. Per "albe" il default della room ("a1") resta uno dei
    # possibili esiti e arriva gia' incluso (e' lo sprite con cui le 131
    # istanze compaiono in match_easy.scene.json) — ma "albe2"/"albe3" non
    # hanno NESSUNA istanza in questa room (nascono solo a runtime da una
    # meccanica di diffusione non ricostruita, STUDIO.md), quindi il loro
    # "default" ("a21"/"a31") non finisce mai nell'atlas per quella via:
    # va elencato qui esplicitamente come gli altri, non dato per scontato.
    "trees": [
        "a2", "a3", "a4", "a5",             # albe: varianti alternative ad "a1" (default in room)
        "a21", "a22", "a23", "a24",         # albe2: le 4 varianti possibili
        "a31", "a32", "a33", "a34",         # albe3: le 4 varianti possibili
    ],
    # Automobili decorative (src/objects/honda_facile_1|2/honda3..9,
    # STUDIO.md §5.3 "veicoli_target"). honda_facile_1/2 sono le uniche due
    # presenti in match_easy.scene.json da subito; honda3..9 non ci sono
    # ancora quando la room carica — arrivano col tempo, un tipo alla volta
    # ogni 60s, fatte comparire da `carmaker` (creato incondizionatamente
    # da `r12/Create.gml` in ogni room, non solo `match`: CARMAKER_SCHEDULE
    # in game/src/cars.js). Ogni honda3..9 ha 4-6 sprite di "posa" (usato
    # solo il primo frame, vedi cars.js) piu' 4-5 transizioni multi-frame
    # (svolta/accelerazione, es. "g_bs_as" — 38 frame, ne pacchettiamo
    # comunque solo il primo: nessun sistema di image_speed nel motore).
    # honda_facile_1 non cambia mai sprite (la sua catena di alarm che lo
    # farebbe non e' armata da Create — vedi game/src/cars.js), quindi le
    # uniche sprite di honda_facile_1/2 in piu' da impacchettare sono
    # quelle di honda_facile_2.
    "cars": [
        "c_ad_as", "c_as", "c_as_ad",       # honda_facile_2: fasi accelerazione/svolta/decelerazione
        "g_bs", "g_bs_as", "g_as", "g_as_bs",                       # honda3 (e honda8 riusa "g_bs")
        "p_bd", "p_bd_ad", "p_ad",                                   # honda4
        "c_bs", "c_bs_as",                                           # honda5 (c_as/c_as_ad gia' sopra)
        "v_bs", "v_bs_as", "v_as", "v_as_ad", "v_ad", "v_ad_bd", "v_bd", "v_bd_ad",  # honda6
        "r_bd", "r_bd_bs", "r_bs", "r_bs_as", "r_as", "r_as_ad", "r_ad", "r_ad_bd",  # honda7
        "g_bs_bd", "g_bd", "g_bd_ad", "g_ad", "g_ad_as",             # honda8
        "p_as_ad", "p_ad_bd", "p_bd_bs", "p_bs", "p_bs_as",          # honda9 (p_as/p_ad gia' sopra)
    ],
    # Luci (STUDIO.md §5.3 "notte_target", cddvd/d1NN/di11b — le "luci" che
    # non funzionavano): l'originale anima la transizione con uno sprite "x"
    # dedicato, un frame per tick (es. "crclx", 200 frame per 200 tick —
    # verificato: e' una semplice dissolvenza in alpha dello stesso disegno,
    # non un effetto diverso frame per frame — bbox che si restringe verso i
    # frame finali solo perche' GameMaker ritaglia i margini trasparenti).
    # Impacchettare 200 frame di uno sprite grande quanto l'intero edificio
    # (crclx da solo: ~300 MB di VRAM decompressa) per riprodurre una
    # dissolvenza costerebbe piu' dell'intero atlas attuale per un identico
    # identico risultato visivo a un'interpolazione di alpha sullo sprite
    # fermo gia' impacchettato (crcl/crc2l/... — vedi "buildings" sopra):
    # game/src/main.js anima la transizione cosi', niente sprite "x" da
    # aggiungere qui.
    # Semafori (src/objects/object8|object37, STUDIO.md — "se" = semaforo,
    # mai rinominato dall'autore originale, da cui il nome generico
    # "object8"/"object37" nel decompilato). Il palo ("se") e' gia'
    # nell'atlas: e' lo sprite con cui le 48 istanze compaiono in
    # match_easy.scene.json. Questi sono solo i tre tappi colorati che il
    # figlio (`object37`) sceglie a dado ad ogni lampeggio.
    "semaphores": ["se2", "se3", "se4"],
    # Nuvole e uccelli (src/objects/ni|nifast|birb|birbcluster, creati da
    # r12/Alarm_0.gml — STUDIO.md, game/src/atmosphere.js): nessuna istanza
    # nella room, nascono e muoiono dinamicamente, quindi vanno elencati
    # qui come per le altre famiglie mai piazzate staticamente.
    "atmosphere": ["n1", "n2", "n3", "brb1", "brb2"],
    # Pedoni ("omini neri", src/objects/pplo — STUDIO.md, game/src/
    # pedestrians.js): un abitante per ogni salto di livello di una casa,
    # mai piazzato nella room. "q8"/"q9" non esistono nella tavola a dado
    # dell'originale (salta da q7 a q10): non e' un refuso qui, e' fedele.
    "pedestrians": ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q10"],
    # Mongolfiere (src/objects/monvo|monvo_giga|monbo|mongo|monviolo|monspi,
    # mon_bil|mon_box, src/objects/aincom — game/src/balloons.js). Nessuna
    # istanza nella room: nascono a intervalli (risorse/spia) o quando un
    # edificio viene piazzato (pacco di cantiere), stesso schema di
    # atmosphere.js/pedestrians.js sopra.
    "balloons": [
        "monv", "monv_bar",                 # monvo: verde, petrolio
        "monv_giga", "monv_giga_bar",       # monvo_giga: verde gigante
        "monss", "monss_bar",               # monbo: blu, denaro
        "mong", "mong_bar",                 # mongo: giallo/oliva, energia
        "monviola", "monviola_bar",         # monviolo: viola, cristalli
        "monr",                             # monspi: rossa, spia (nessun loot)
        "mon_bild", "mon_bild_empty", "mon_bild_box",   # pacco di cantiere (casa/industria)
        "ainco",                            # avviso "ATTACK INCOMING" (spia riuscita)
    ],
    # Le minacce vere (src/objects/air|bombar|dirig, bomba1/bomba2, esplo —
    # game/src/threats.js). Nessuna istanza nella room: nascono quando le
    # mongolfiere spia vengono ignorate abbastanza a lungo da "riuscire"
    # (STUDIO.md "le minacce vere"). "figros"/"figgg"/"figb" sono le
    # varianti a dado di "air" (fighterspr e' il default, gia' incluso).
    "threats": [
        "fighterspr", "figros", "figgg", "figb",   # air
        "bomberspr",                                # bombar
        "dirspr",                                    # dirig
        "bomb", "fica",                              # bomba1/bomba2, esplo
    ],
    # Il fuoco vero delle torrette (src/objects/red_ball/yellow_pro,
    # game/src/projectiles.js — il laser non ha un proiettile vero, e' un
    # colpo istantaneo). "fica" (il lampo di sparo per tutte e tre, scala
    # 0.4) e' gia' in "threats" sopra, nessuno sprite in piu' da aggiungere
    # per quello. "c1"/"c2"/"c3" sono il fumo di scia (src/objects/smoko,
    # spawnSmoko() in projectiles.js) — NON gli stessi "cc1"/"cc2"/"cc3"
    # del fumo delle centrali qui sotto (sprite diversi, per coincidenza
    # nomi quasi uguali: verificato in data/sprites.json, dimensioni
    # diverse, 96x96 contro 38x35).
    "projectiles": ["redb", "gatmissse", "c1", "c2", "c3"],
    # I pulsanti blu delle monete (src/objects/sold1..18, game/src/coins.js)
    # e il segnale verde di potenziamento (src/objects/upsign12|23|upcrc12|
    # 23|upind12|23 — tutti la stessa icona "upico", game/src/main.js
    # renderUpgradeSign()). "soldico" e' il pin statico (nessun chies di
    # livello 3), "soldfade" la stessa icona con la dissolvenza a 20 frame
    # usata quando invece si autoriscuote.
    "coins": ["soldico", "soldfade", "upico"],
    # Il fumo decorativo delle centrali (src/objects/smoke_ind|smoke_ind_2,
    # game/src/smoke.js): un solo sbuffo per famiglia ("cc1" il default,
    # "cc2"/"cc3" le due varianti a dado di Create.gml — non serve
    # distinguere smoke_ind da smoke_ind_2, condividono lo stesso sprite).
    "smoke": ["cc1", "cc2", "cc3"],
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
