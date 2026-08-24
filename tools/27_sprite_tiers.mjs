// Genera tools/sprite_tiers.json: quali sprite di GAMEPLAY_SPRITES
// (tools/23_atlas.py) servono SUBITO all'avvio di una partita (edifici a
// livello 1, HUD, decoro sempre visibile) contro quali arrivano solo dopo
// (potenziamenti di livello 2+, combattimento, la catena fari->seconda/
// terza piattaforma — tutta roba che il giocatore sblocca solo dopo
// minuti di partita). 23_atlas.py lo legge per impacchettare le pagine
// "core" per prime e quelle "deferred" dopo (game/src/assets.js le
// scarica in background una volta che la partita e' gia' interattiva).
//
// Il confine vero fra "livello 1" e "livello 2+" vive gia', come dato
// strutturato, in BUILDING_TYPES (game/src/buildings.js): ogni voce ha
// `baseSprite`/`baseDecor`/`construct` (livello 0->1, sempre disponibile
// da subito) e `upgrades: [...]` (livello 2+, sbloccato solo a soglie di
// popolazione/denaro raggiunte giocando). Questo script cammina quella
// stessa struttura invece di riscrivere a mano l'elenco: se in futuro
// buildings.js cambia (un nuovo edificio, un nuovo potenziamento), questo
// file lo segue automaticamente al prossimo run.
import { BUILDING_TYPES } from "../game/src/buildings.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function walk(node, path, out, deferredOut, deferredKeys) {
  if (node == null) return;
  if (typeof node === "string") {
    (path.some((k) => deferredKeys.has(k)) ? deferredOut : out).add(node);
    return;
  }
  if (Array.isArray(node)) { for (const v of node) walk(v, path, out, deferredOut, deferredKeys); return; }
  if (typeof node === "object") { for (const [k, v] of Object.entries(node)) walk(v, [...path, k], out, deferredOut, deferredKeys); }
}

// Oltre al confine livello-1/potenziamenti, un secondo taglio sullo
// stesso livello 1: un edificio che costa piu' della dote iniziale (5500
// mon, game/src/state.js) o sbloccato solo da un traguardo (le tre
// stelle — monum/banca/grattacielo, sempre dietro `unlocked()` in
// main.js/STAR_BUILDINGS, mai nel pannello base) non e' realisticamente
// costruibile nei primi minuti comunque: il suo sprite finale/cantiere
// puo' restare deferred anche al livello 1, non solo ai potenziamenti.
// L'ICONA nel pannello di costruzione (OTHER_BUILDINGS in main.js — es.
// "p4"/"p4ss" per eolico) resta invece sempre visibile da subito: e' un
// gruppo diverso (GAMEPLAY_SPRITES.gui, sempre core, vedi sotto), non
// tocca da qui.
const AAB_INITIAL_MONEY = 5500;
const STAR_TYPES = new Set(["monum", "banca", "grattacielo"]);
function affordableEarly(def) {
  if (!def.placeCost) return true;   // niente costo (es. chies, gia' in piedi) -> sempre core
  return (def.placeCost.mon ?? 0) <= AAB_INITIAL_MONEY;
}

const buildingsCore = new Set(), buildingsDeferred = new Set();
for (const [type, def] of Object.entries(BUILDING_TYPES)) {
  if (STAR_TYPES.has(type) || !affordableEarly(def)) {
    // Intero edificio (livello 1 incluso) deferred: troppo caro/troppo
    // lontano da un traguardo per essere raggiunto nei primi minuti.
    walk(def, [], buildingsDeferred, buildingsDeferred, new Set());
  } else {
    walk(def, [], buildingsCore, buildingsDeferred, new Set(["upgrades"]));
  }
}
// Uno sprite riusato sia da una costruzione core sia da un potenziamento/
// edificio deferred (es. le impalcature ir1x/if1x, condivise da
// industria/casa/missile/...) resta "core": serve gia' dal primo
// edificio economico piazzato, molto prima che qualunque potenziamento o
// edificio costoso sia raggiungibile.
for (const s of buildingsCore) buildingsDeferred.delete(s);

// [Bug corretto] `tutorial.scene.json` piazza 1 istanza `ruin1` + 3
// istanze `ruin2` fin dall'inizio (game/src/tutorial.js,
// extractRuinLots()) — ma extractRuinLots() sceglie a runtime una delle 4
// varianti a dado del proprio RUIN_POOL (["ru11","ru12","ru13","ru14"]
// per ruin1, ["ru21","ru22","ru23","ru24"] per ruin2, RUIN_POOL non
// esportato — stesso schema a dado di `albe`/casa/villa, letto qui a
// mano), non solo quella che risulta essere lo sprite di default nella
// scena. tools/23_atlas.py forza gia' a "core" qualunque sprite letto
// letteralmente da scene.json (`tier_of()`, scene_sprites) — ma quello
// copre solo la variante di default ("ru11"/"ru21"), non le altre tre che
// lo stesso rudere GIA' IN PIEDI puo' mostrare. "ru21".."ru24" in piu'
// ricadono anche dentro `BUILDING_TYPES.casa.upgrades[0].ruin` (il rudere
// del livello 2 di `casa`, un potenziamento vero) — senza questa aggiunta
// esplicita sarebbero rimasti "deferred" per quella via, e un rudere
// visibile fin dal primo secondo del tutorial sarebbe apparso vuoto
// finche' la sua pagina "deferred" non fosse arrivata in background.
const RUIN_POOL_SPRITES = ["ru11", "ru12", "ru13", "ru14", "ru21", "ru22", "ru23", "ru24"];
for (const s of RUIN_POOL_SPRITES) { buildingsCore.add(s); buildingsDeferred.delete(s); }

// GAMEPLAY_SPRITES-level: quali GRUPPI del file Python sono interamente
// "servono da subito" o "arrivano dopo" — buildings.buildings resta
// l'unico gruppo diviso sprite-per-sprite (sopra), perche' e' l'unico che
// mescola livello 1 e livelli avanzati nella stessa lista piatta.
const CORE_GROUPS = ["gui", "trees", "cars", "semaphores", "atmosphere", "pedestrians", "coins", "smoke", "platform", "tutorial"];
const DEFERRED_GROUPS = ["cars2", "bridges", "threats", "projectiles", "platform2"];
// balloons: SOLO monvo (l'unica risorsa "sempre creata, nessun dado" —
// game/src/balloons.js) piu' il pacco di cantiere (creato ad OGNI
// edificio piazzato, dal primo della tutorial in poi) sono core; le altre
// risorse sono tutte a dado/soglia (chies.level>=2) e la spia sblocca solo
// dopo ~8 minuti di partita (r12/Alarm... in game/src/balloons.js).
const BALLOON_CORE = new Set(["monv", "monv_bar", "mon_bild", "mon_bild_empty", "mon_bild_box", "mon_bbild", "mon_bbild_empty", "mon_bbild_box"]);

const manifest = {
  coreGroups: CORE_GROUPS,
  deferredGroups: DEFERRED_GROUPS,
  balloonCore: [...BALLOON_CORE],
  buildingsDeferred: [...buildingsDeferred].sort(),
};

const outPath = path.join(__dirname, "sprite_tiers.json");
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
console.log(`sprite_tiers.json: ${buildingsCore.size} sprite "buildings" core, ${buildingsDeferred.size} deferred`);
console.log("scritto in", outPath);
