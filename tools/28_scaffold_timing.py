"""Tempi delle impalcature (impa*) ricavati dal decompilato.

Simula la catena di ogni edificio (oggetto "r" + "f" + toppers + gru, vedi
gmsim.py) e scrive game/src/scaffoldTiming.js: per ogni voce di
BUILDING_TYPES (`tipo.construct` / `tipo.upgradeN`) la timeline vera di
sprite dell'impalcatura posteriore (r) e anteriore (f), quando nascono
topper e gru, quando compare l'edificio finito e il consumo di denaro.
game/src/buildings.js la applica ai `steps` scritti a mano
(applyScaffoldTiming()): il decompilato e' la fonte, non i numeri a mano.

Uso:  python tools/28_scaffold_timing.py
"""
import os, json, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmsim import simulate

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "game", "src", "scaffoldTiming.js")

# voce del porting -> oggetto "r" dell'originale
KEYS = {
    "industria.construct": "impaind0to1r", "industria.upgrade0": "impaind1to2r", "industria.upgrade1": "impaind2to3r",
    "casa.construct": "impa0to1r", "casa.upgrade0": "impa1to2r", "casa.upgrade1": "impa2to3r",
    "missile.construct": "impamissr", "solare.construct": "impasolr", "parco.construct": "imparcr",
    "club.construct": "impaclubr", "villa.construct": "impavil_r", "gatling.construct": "impagatlingr",
    "laser.construct": "impalaser_r",
    "palazzo.construct": "impa4r", "palazzo.upgrade0": "impa5r",
    "palazzoRd.construct": "impa4rd", "palazzoRd.upgrade0": "impa5rd",
    "museo.construct": "IMPAMEDIA_R", "museoRd.construct": "IMPAMEDIA_RD",
    "monum.construct": "impaMONUr", "banca.construct": "impaBANKr",
}
# catene della ruspa che NON sono "la catena normale col primo passo accorciato"
RUSPA_KEYS = {"parco.construct": "imparcor_demo"}

NOT_BUILDING = ("tops", "gru", "updeath", "ruin", "placeholder", "impa", "IMPA", "death", "mediadeath", "casa4death", "parcdeath")


def collapse(tl):
    out = []
    for t, alts in tl:
        alts = sorted(alts)
        if out and out[-1][1] == alts:
            continue
        out.append([t, alts])
    return out


def timing(obj, ruspa=False):
    sim, root = simulate(obj)
    kill = [t for (t, k, _) in root.log if k == "kill"]
    f = next((i for i in sim.insts if i.parent is root and i.obj.lower().endswith(("f", "f_demo", "fd", "fd_demo", "_f"))), None)
    spawns = [(i.obj, t, d) for i in sim.insts for (t, k, d) in i.log if k == "spawn"]
    top = next(((t, d) for (n, t, d) in spawns if d[0].startswith("tops")), None)
    cr = [(t, d) for (n, t, d) in spawns if d[0] in ("gru", "grubig")]
    if ruspa:   # catena della ruspa: nessun edificio nuovo, "muore" quello vecchio e resta un lotto
        rev = next((t for (n, t, d) in spawns if d[0].endswith("death") or d[0] == "placeholder"), None)
    else:
        rev = next((t for (n, t, d) in spawns if not d[0].startswith(NOT_BUILDING)), None)
    drains = [t for (t, k, d) in root.log if k == "r12" and d[0] == "mon"]
    mon = [d[1] for (t, k, d) in root.log if k == "r12" and d[0] == "mon"]
    out = {
        "src": obj,
        "r": collapse([(t, a) for (t, k, a) in root.log if k == "sprite"]),
        "end": kill[0] if kill else None,
        "front": collapse([(t, a) for (t, k, a) in f.log if k == "sprite"]) if f else None,
        "frontEnd": next((t for (t, k, _) in f.log if k == "kill"), None) if f else None,
        "topper": {"t": top[0], "dx": int(top[1][1]), "dy": int(top[1][2])} if top else None,
        "cranes": {"t": cr[0][0], "at": sorted([int(d[1]), int(d[2])] for (t, d) in cr)} if cr else None,
        "revealT": rev,
        "drain": {"mon": -int(mon[0]), "first": drains[0], "every": drains[1] - drains[0]} if len(drains) > 1 else None,
    }
    return out


def main():
    data = {k: timing(o) for k, o in KEYS.items()}
    ruspa = {k: timing(o, ruspa=True) for k, o in RUSPA_KEYS.items()}
    for k in ruspa:
        data[k]["ruspa"] = ruspa[k]
    body = "{\n" + ",\n".join(f" {json.dumps(k)}: {json.dumps(v, separators=(',', ':'), ensure_ascii=False)}" for k, v in data.items()) + "\n}"
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write("// GENERATO da tools/28_scaffold_timing.py dal decompilato — non modificare a mano.\n")
        fh.write("// Per ogni voce di BUILDING_TYPES: timeline di sprite dell'impalcatura posteriore\n")
        fh.write("// `r` e anteriore `front` ([tick, [alternative]]), fine di entrambe, nascita di\n")
        fh.write("// topper/gru, comparsa dell'edificio (`revealT`) e consumo di denaro. Applicato da\n")
        fh.write("// applyScaffoldTiming() in buildings.js.\n")
        fh.write("export const SCAFFOLD_TIMING = " + body + ";\n")
    print("scritto", OUT, len(data), "voci")


if __name__ == "__main__":
    main()
