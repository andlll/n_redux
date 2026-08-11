import { Renderer, makeSolidTexture, solidFrame, loadTexture } from "./gl.js";
import { Camera, screenProjection } from "./camera.js";
import { Input } from "./input.js";
import { createR12, tickR12, stepWeather } from "./state.js";
import { BUILDING_TYPES, placeBuilding, canAfford, currentDecor, currentDeathPop, tryStartUpgrade, stepConstructions, stepProduction, stepGrowth, stepConsumption, stepStormDamage, nextUpgrade, upgradeUnlocked } from "./buildings.js";
import { save, load } from "./save.js";
import { loadFont, drawText } from "./font.js";

const canvas = document.getElementById("view");
const hud = document.getElementById("hud");
const r = new Renderer(canvas);
const gl = r.gl;
const white = makeSolidTexture(gl);
const cam = new Camera();
const input = new Input(canvas);

// ---------------------------------------------------------------- scena
const scene = await fetch("./data/match_easy.scene.json").then((x) => x.json());
cam.bounds = { left: 0, top: 0, right: scene.width, bottom: scene.height };
cam.x = scene.width / 2;
cam.y = scene.height / 2;
// minZoom = quanto ci si puo' avvicinare: sotto 0.5 gli sprite (disegnati
// alla risoluzione nativa dell'atlas) si vedono sgranati, ingranditi oltre
// il loro dettaglio reale. maxZoom invece si ricalcola ad ogni resize() in
// base a quanto serve per inquadrare tutta la room (vedi sotto): non ha
// senso lasciar allontanare lo zoom molto oltre "si vede tutta la mappa".
cam.minZoom = 0.5;
// Finche' non tocchi niente la camera inquadra tutta la room, e si riadatta
// se lo schermo cambia (rotazione del telefono).
let userMoved = false;

// Ordinamento dichiarato una volta sola. Nell'originale ogni edificio/albero
// si auto-assegnava `depth = -y` nel proprio Create (STUDIO.md §5.3, e
// confermato dal decompilato di impaind0to1f/Create.gml: `depth = -y - 2`)
// — la stessa istanza dichiarata a `depth: 0` nella room diventava quindi
// dinamicamente "-y" a runtime. I livelli fissi (ambiente/UI: air2 -1,
// aura -10, placeholder -5000, pu1 -9998, ...) restano quelli scritti nella
// room, perche' il loro codice non tocca mai `depth`.
//
// Qui replichiamo la stessa regola: le istanze "di mondo" (`depth === 0`
// nella room — edifici, alberi, decoro/impalcature che creiamo noi a
// runtime) si ordinano per `-y`; tutto il resto mantiene il suo depth
// fisso. Senza questo, `air2` (il livello di terreno/strade, depth -1,
// STUDIO.md §5.2 lo definiva erroneamente "atmosferico": e' in realta'
// opaco su tutta la mappa) finiva sopra ENTRAMBI gli edifici e gli alberi,
// perche' -1 sta "davanti" a 0 nella nostra convenzione (piu' basso =
// disegnato dopo = piu' vicino alla camera) — il bug dietro sia al mancato
// ordinamento assonometrico sia a "vedo solo le luci di chies" (il suo
// unico figlio a depth -1, il bagliore delle finestre, restava sopra
// `air2` per il solo caso fortuito della y, la chiesa stessa no).
function effDepth(it) {
  return it.depth === 0 ? -it.y : it.depth;
}
const sortWorld = (a, b) => effDepth(b) - effDepth(a);
const staticWorld = scene.instances.slice().sort(sortWorld);

// colore stabile per nome oggetto, finche' non abbiamo gli atlas veri
function colorFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  const hue = ((h % 360) + 360) % 360;
  const f = (n) => {
    const k = (n + hue / 30) % 12;
    const c = 0.55 - 0.35 * Math.max(-1, Math.min(Math.min(k - 3, 9 - k), 1));
    return Math.round(c * 255);
  };
  return (f(0) << 16) | (f(8) << 8) | f(4);
}
for (const it of staticWorld) it._c = colorFor(it.obj);

// ---------------------------------------------------------------- atlas
// Le pagine sono reimpacchettate per room da tools/23_atlas.py + 24_blit.py:
// quelle originali di GameMaker sparpagliavano 13 sprite su 12 pagine.
// L'atlas include anche gli sprite di gameplay (edifici, cantieri: vedi
// GAMEPLAY_SPRITES in 23_atlas.py) che non stanno ferme in nessuna room
// perche' e' il giocatore a farle comparire.
const atlas = await fetch("./data/match_easy.atlas.json").then((x) => x.json());
const pageTex = await Promise.all(
  atlas.pages.map((p) => loadTexture(gl, "./assets/" + p.file))
);
function frameFor(sprName) {
  const frames = atlas.sprites[sprName];
  if (!frames || !frames.length) return null;
  const f = frames[0];
  return { tex: pageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1,
           w: f.w, h: f.h, ox: f.ox, oy: f.oy };
}
for (const it of staticWorld) it._f = frameFor(it.spr);
const missingArt = staticWorld.filter((it) => !it._f).length;

// Font bitmap reale della barra risorse (tools/25_font.py). [C]
// src/objects/repre/DrawGUI.gml: action_font(gotham_mini, 0) — un font
// dedicato, non lo stesso usato altrove rimpicciolito (era l'ipotesi
// iniziale, sbagliata: "gotham_mid" non e' piu' usato in questo file da
// quando il bottone di test di chies e' sparito, STUDIO.md §9).
const fontMini = await loadFont(gl, "gotham_mini");

// -------------------------------------------------------- piazzabili e edifici
// I `placeholder` della room sono "gli spazi vuoti dove il giocatore piazza
// gli edifici" (STUDIO.md §6, confermato dall'autore). Nell'originale
// diventano un edificio vero al tocco, tramite una ruota di scelta
// (`cre1..cre4`) che non abbiamo ancora ricostruito: qui la sostituisce un
// selettore a bottoni (vedi `uiButtons` piu' sotto) per gli edifici di cui
// abbiamo ricostruito la catena di piazzamento — `industria` e `casa`.
// `chies` non e' fra questi: e' l'edificio principale, unico e
// preesistente a centro mappa (STUDIO.md §9), non un tipo che il
// giocatore piazza.
const placeholders = staticWorld.filter((it) => it.obj === "placeholder");
for (const p of placeholders) { p.id = `ph_${p.x}_${p.y}`; p.consumed = false; }
const placeholderById = new Map(placeholders.map((p) => [p.id, p]));

// `chies` e' gia' un'istanza vera nella room (src/rooms/match_easy.json:
// un solo `chies` a (851,513), STUDIO.md §5.3), non nasce da un
// placeholder. Va tolta da `staticWorld` (altrimenti sarebbe disegnata due
// volte) e diventa la prima entita' di `buildings`, cosi' la sua catena di
// potenziamento vera (upcrc12/upcrc23) resta raggiungibile toccandola,
// esattamente come per gli edifici piazzati dal giocatore.
const chiesIndex = staticWorld.findIndex((it) => it.obj === "chies");
const chiesScene = chiesIndex >= 0 ? staticWorld.splice(chiesIndex, 1)[0] : null;

// `pu1` e' anche lei gia' un'istanza vera nella room ([C] src/rooms/
// match_easy.json, sprite "p1" = la stessa casetta del bottone "casa" qui
// sotto, a depth -9998 = sempre in primo piano). Nell'originale e' un
// pannello invisibile che genera i propri figli/bottoni via codice
// (src/objects/pu1/Create.gml — STUDIO.md §5.4): quello che si vede a
// schermo non e' mai lei stessa, sono i figli. Qui i suoi figli sono
// ricostruiti come UI vera in spazio schermo (vedi `uiButtons` piu' sotto),
// quindi l'istanza originale nel mondo va tolta — altrimenti resta un
// secondo bottone "casa" fantasma, disegnato come sprite di mondo invece
// che UI, proprio sopra a quello vero (segnalato dall'autore: "doppia
// casetta").
const pu1Index = staticWorld.findIndex((it) => it.obj === "pu1");
if (pu1Index >= 0) staticWorld.splice(pu1Index, 1);

/** @type {ReturnType<typeof placeBuilding>[]} */
let buildings = [];
let decorEntities = [];      // ornamenti (permanenti a fine cantiere, o transitori durante)
let r12 = createR12();
let selectedType = "casa";   // scelto dal selettore in basso a sinistra

// Il decoro (`cddvd`/`cddvd2`/`cddvd3*`, `di*`) non si accumula: ogni salto
// di livello uccide il decoro precedente e ne crea uno nuovo (`with (cddvd)
// { action_kill_object(); }` dentro upcrc12/upcrc23, stesso schema per
// industria). Qui equivale a rimpiazzare tutte le entita' decoro di
// quell'edificio, incluso il decoro transitorio (gru/macerie) di un
// cantiere in corso.
function spawnDecor(building, decorSprites) {
  decorEntities = decorEntities.filter((d) => d.buildingId !== building.id);
  addDecor(building, decorSprites.map((spr) => ({ spr, dx: 0, dy: 0 })));
}

/** Decoro transitorio (gru/macerie durante un cantiere): si aggiunge senza
 * rimpiazzare, e sparisce quando `spawnDecor` sostituisce tutto a fine
 * cantiere (STUDIO.md §9: la traccia "f" degli impa* non e' ricostruita,
 * questo e' quanto resta della sua parte scenografica). */
function addDecor(building, spawns) {
  for (const { spr, dx, dy } of spawns) {
    decorEntities.push({
      obj: "decor", buildingId: building.id,
      // Stesso depth "di mondo" (0) dell'edificio, non depth-1: sotto
      // effDepth() sopra un depth fisso -1 varrebbe come livello ambiente
      // (stesso bug di air2), invece il bagliore deve seguire la y vera
      // del suo edificio (incluso l'offset dx/dy delle gru/macerie ai
      // corner) per restare correttamente intercalato con gli altri
      // edifici/alberi. A parita' di depth+y, l'ordine di inserimento in
      // `dynamic` (building poi decor, sempre) decide chi vince — lo stesso
      // meccanismo con cui il pareggio si risolveva prima.
      x: building.x + dx, y: building.y + dy, depth: 0,
      spr, _f: frameFor(spr),
    });
  }
}

function placeAt(placeholder, type) {
  const def = BUILDING_TYPES[type];
  if (!canAfford(r12, def.placeCost)) {
    return `serve ${def.placeCost.mon} mon (hai ${r12.mon.toFixed(0)})`;
  }
  for (const k in def.placeCost) r12[k] -= def.placeCost[k];
  placeholder.consumed = true;
  // depth 0, NON placeholder.depth (-5000): quel numero e' il livello fisso
  // "sempre in primo piano" del segnaposto vuoto (STUDIO.md, cosi' si vede
  // sempre sopra il terreno), non un depth di mondo da ereditare. Un
  // edificio vero e' un oggetto "di mondo" come chies o gli alberi: deve
  // ordinarsi per la propria y (vedi effDepth() sopra), non restare per
  // sempre incollato davanti a tutto il resto della mappa.
  const b = placeBuilding(type, placeholder.x, placeholder.y, 0);
  buildings.push(b);
  if (b.level >= 1) spawnDecor(b, currentDecor(b));   // industria: arriva a fine cantiere, casa idem
  return null;
}

/** Aggiunge `chies` a `buildings` a partita nuova (nessun salvataggio): non
 * costa niente e non consuma un placeholder, e' gia' li' (STUDIO.md §9). */
function seedChies() {
  if (!chiesScene) return;
  const b = placeBuilding("chies", chiesScene.x, chiesScene.y, chiesScene.depth);
  buildings.push(b);
  spawnDecor(b, currentDecor(b));
}

/**
 * Un edificio la cui vita e' scesa a 0 (oggi solo per fulmine, STUDIO.md
 * §9 "le tempeste non sono cosmetiche in match"). Nell'originale resterebbe
 * un rudere (`ruin1`/`ruin2`/`ruin3`) riparabile solo con lo strumento
 * ruspa/bulldozer (`selec==11`, mai ricostruito, STUDIO.md §9 "GUI vera") —
 * un vicolo cieco per chi gioca senza quello strumento. Qui la rimozione e'
 * immediata e il placeholder torna libero: una semplificazione dichiarata,
 * non il comportamento vero. Applica il bilancio pop del livello a cui e'
 * morto (`currentDeathPop`, letto da chiesX/industriaX/casaX/Destroy.gml —
 * industria tocca `hap`, non ancora tracciato in nessun'altra parte del
 * gioco: per coerenza resta fuori anche qui, vedi STUDIO.md).
 */
function destroyBuilding(b) {
  r12.pop += currentDeathPop(b);
  decorEntities = decorEntities.filter((d) => d.buildingId !== b.id);
  const ph = placeholders.find((p) => p.x === b.x && p.y === b.y);
  if (ph) ph.consumed = false;
  buildings = buildings.filter((x) => x !== b);
  if (picked?.obj === "building" && picked.ref === b) picked = null;
}

// -------------------------------------------------------------- salvataggio
// Serializzazione esplicita fin da subito (STUDIO.md §5.6/§7.1): lo stato
// che conta e' gia' dati semplici, quindi non c'e' uno snapshot binario da
// imitare, solo JSON. Stessi nomi di slot dell'originale ("nimsav_eas" per
// la mappa facile).
//
// NON e' piu' automatico: il gioco e' ancora in sviluppo attivo, e un
// autoload silenzioso al boot fa ripartire ogni sessione di test da uno
// stato vecchio (edifici/decoro/depth di una build precedente), mascherando
// esattamente le modifiche che si sta cercando di verificare — "vedo
// sempre la versione vecchia" a ogni ricarica. Ogni caricamento della
// pagina e' quindi una partita nuova, come il primissimo avvio. S/L restano
// per salvare/ricaricare a mano DENTRO la stessa sessione di test, se
// serve, ma non sopravvivono piu' da soli a un refresh.
function doSave() { save(scene.name, r12, buildings); }
function doLoad() {
  const data = load(scene.name);
  if (!data) return false;
  r12 = data.r12;
  buildings = data.buildings;
  decorEntities = [];
  const usedIds = new Set();
  for (const b of buildings) {
    // ricostruisce quale placeholder e' occupato dalla posizione salvata
    const ph = placeholders.find((p) => !usedIds.has(p.id) && p.x === b.x && p.y === b.y);
    if (ph) { ph.consumed = true; usedIds.add(ph.id); }
    if (b.level >= 1) spawnDecor(b, currentDecor(b));
  }
  return true;
}
seedChies();

window.addEventListener("keydown", (e) => {
  if (e.key === "s" || e.key === "S") { doSave(); message = "partita salvata"; messageT = 3; }
  if (e.key === "l" || e.key === "L") {
    const ok = doLoad();
    if (ok) picked = null;   // il riferimento selezionato apparteneva allo stato precedente
    message = ok ? "partita caricata" : "nessun salvataggio";
    messageT = 3;
  }
});

// ------------------------------------------------- ciclo giorno/notte
// Nell'originale: 8 alarm che ricoloravano ~24 gruppi di oggetti uno per uno.
// Qui: una fase, un colore, applicato a tutto dal fragment shader.
const PHASES = [
  { name: "giorno", rgb: [1.00, 1.00, 1.00], dur: 14 },
  { name: "tramonto", rgb: [1.00, 0.82, 0.62], dur: 5 },
  { name: "notte", rgb: [0.45, 0.52, 0.82], dur: 12 },
  { name: "alba", rgb: [0.92, 0.80, 0.78], dur: 5 },
];
let phaseT = 0;
function phaseIndexAt(t) {
  const total = PHASES.reduce((s, p) => s + p.dur, 0);
  let u = t % total;
  let i = 0;
  while (u > PHASES[i].dur) { u -= PHASES[i].dur; i = (i + 1) % PHASES.length; }
  return { i, u };
}
function ambientAt(t) {
  const { i, u } = phaseIndexAt(t);
  const a = PHASES[i], b = PHASES[(i + 1) % PHASES.length];
  const k = Math.min(1, u / a.dur);
  const s = k * k * (3 - 2 * k);                    // smoothstep
  return {
    rgb: a.rgb.map((v, j) => v + (b.rgb[j] - v) * s),
    label: k < 0.75 ? a.name : a.name + " → " + b.name,
  };
}
// [C] casa1/Alarm_3.gml: `aura.night` — booleano secco, a differenza della
// tinta ambientale che sfuma. Usa la stessa fase di ambientAt() (nessuno
// smoothstep: qui serve un confine netto, com'era nell'originale).
function isNight(t) {
  return PHASES[phaseIndexAt(t).i].name === "notte";
}

// ---------------------------------------------------------------- input
input.onDrag = (dx, dy) => { userMoved = true; cam.panByScreen(dx, dy); };
// Il fattore si applica a `targetZoom`, non a `zoom` (che insegue con un
// filo di ritardo, vedi Camera.update()): cosi' una rotellata mentre lo
// zoom sta ancora animando accumula sul bersaglio invece di "strappare"
// indietro dal valore corrente, ancora a meta' strada.
input.onZoom = (f, ax, ay) => { userMoved = true; cam.setZoom(cam.targetZoom * f, ax, ay); };
let picked = null;
let message = "";
let messageT = 0;
let uiButtons = [];   // { x, y, w, h, type }, ricalcolati ad ogni frame dal disegno del selettore

// [C] placeholder/Mouse_LeftReleased.gml: `r12.selec` e' il vero selettore
// di modalita' piazzamento nell'originale (1 = casa, 2 = industria, ...).
const SELEC_BY_TYPE = { casa: 1, industria: 2 };

// Il pannello originale non e' un'unica barra: e' tre righe ALTERNATE,
// mai tutte visibili insieme. [C] `pu1.menoo` (0/1/2) decide quale, letto
// riga per riga da ogni bottone figlio nel proprio Step.gml (`with (pu1) {
// if (menoo==N) break }` poi `action_move_to(...)` sulla posizione vera, o
// fuori schermo altrimenti):
//   - menoo 0 "casa": handbutton, buildbutton (la gru: apre menoo 1),
//     eyebutton (l'occhio: apre menoo 2) — quello che si vede all'avvio.
//   - menoo 1 "edifici": pu1..pu7 e affini (i piazzabili) + backobutton in
//     fondo per tornare a menoo 0. E' la riga che si apre toccando la gru.
//   - menoo 2 "vista": eyebutton1/2/3, zoom_plus/zoom_minus + backobutton.
//     Si apre toccando l'occhio.
// Una versione precedente mostrava tutti i bottoni sempre, su due righe
// fisse — comodo ma non e' cosi' che il menu era organizzato davvero
// (segnalato dall'autore). Qui replichiamo la stessa struttura a tre righe.
let menoo = 0;

// I piazzabili del menu (menoo 1) che non sono in BUILDING_TYPES
// (buildings.js): letti da src/objects/pu3|pu4prov|pu5prov|pu6|pu7|pudj|
// pusolare|pugatling|puvillone|pumediat (sprite normale/selezionato, e il
// `selec` con cui ciascuno riconosce di essere quello scelto) incrociati
// con src/objects/placeholder/Mouse_LeftReleased.gml per i costi reali,
// dove quel file li dichiara esplicitamente (`cost: null` altrove — non un
// valore a caso, proprio "non letto"). Sono famiglie impa* non ancora
// lette (STUDIO.md "cosa manca"), quindi qui sono un segnaposto statico —
// selezionabili ed evidenziati come casa/industria, ma toccare un
// placeholder con uno di questi scelto mostra un messaggio invece di
// costruire (vedi sotto). L'originale li affianca in ordine diverso
// (STUDIO.md §9: pu7 e' unlocked a parte, pu4prov/pu5prov condividono uno
// slot con altri quattro bottoni mutuamente esclusivi non tracciati qui):
// l'ordine qui e' solo "tutti visibili, uno per slot", non quello esatto.
const OTHER_BUILDINGS = [
  { type: "parco", selec: 7, spr: "p7", sprSel: "p7ss", label: "Parco", cost: 500 },
  { type: "missile", selec: 3, spr: "p3", sprSel: "p3ss", label: "Lanciamissili", cost: 5000 },
  { type: "eolico", selec: 4, spr: "p4", sprSel: "p4ss", label: "Pala eolica", cost: null },
  { type: "laser", selec: 5, spr: "p5", sprSel: "p5ss", label: "Laser", cost: 20000 },
  { type: "grattacielo", selec: 6, spr: "p6", sprSel: "p6ss", label: "Grattacielo", cost: null },
  { type: "club", selec: 60, spr: "pdj", sprSel: "pdjss", label: "Club", cost: 3500 },
  { type: "solare", selec: 61, spr: "psolare", sprSel: "psolaress", label: "Pannelli solari", cost: 1000 },
  { type: "gatling", selec: 62, spr: "pgatling", sprSel: "pgatlingss", label: "Mitragliatrice", cost: 10000 },
  { type: "villa", selec: 63, spr: "pvilla", sprSel: "pvillass", label: "Villa", cost: 7500 },
  { type: "museo", selec: 70, spr: "pmuseo", sprSel: "pmuseoss", label: "Museo", cost: null },
  // [C] STUDIO.md "cosa manca": lo strumento vero di demolizione/
  // riparazione (selec==11), mai ricostruito — la distruzione oggi e'
  // immediata (destroyBuilding()) invece di passare da questo strumento.
  { type: "ruspa", selec: 11, spr: "ru", sprSel: "russ", label: "Ruspa", cost: null },
];
for (const b of OTHER_BUILDINGS) SELEC_BY_TYPE[b.type] = b.selec;
const BUILDING_LABEL = Object.fromEntries(OTHER_BUILDINGS.map((b) => [b.type, b.label]));

input.onTap = (sx, sy) => {
  // il selettore edificio vive in spazio schermo, sopra la mappa: un tocco
  // che lo colpisce non deve raggiungere il mondo sotto.
  for (const btn of uiButtons) {
    if (sx >= btn.x && sx <= btn.x + btn.w && sy >= btn.y && sy <= btn.y + btn.h) {
      if (btn.kind === "menu") menoo = btn.menoo;                      // gru/occhio/indietro
      else if (btn.kind === "deselect") { selectedType = null; r12.selec = 0; }  // handbutton
      else if (btn.kind === "zoom") {                                  // zoom+/zoom-
        userMoved = true;
        cam.setZoom(cam.targetZoom * btn.zoom, canvas.clientWidth / 2, canvas.clientHeight / 2);
      } else if (btn.kind === "building") {                            // casa/industria/...
        selectedType = btn.type;
        r12.selec = SELEC_BY_TYPE[btn.type] ?? 0;
      } else {
        message = `${btn.label}: non ancora ricostruito`;
        messageT = 3;
      }
      return;
    }
  }
  const w = cam.screenToWorld(sx, sy);
  picked = null;
  // frameList e' ricostruita ad ogni frame di disegno: e' la stessa lista,
  // gia' ordinata top-most-last, che serve per il picking. Due passate: la
  // prima considera solo cio' che e' davvero interattivo (placeholder,
  // edifici — inclusa chies, ora che vive li' anche lei), a prescindere
  // dal depth; la seconda, di fallback, e' il vecchio picking "per z-order"
  // usato solo per ispezionare la scena nell'HUD di debug. Senza la prima
  // passata `air2` (il terreno/strade sull'intera mappa, depth -1,
  // `mask_sprite: null` nel decompilato: non ha MAI ricevuto click
  // nell'originale) coprirebbe chies (depth 0, per y) e la renderebbe
  // intoccabile.
  for (const it of frameList) {
    if (it.obj !== "placeholder" && it.obj !== "building") continue;
    const x0 = it.x - it._f.ox, y0 = it.y - it._f.oy;
    if (w.x >= x0 && w.x <= x0 + it._f.w && w.y >= y0 && w.y <= y0 + it._f.h) {
      if (!picked || it.depth < picked.depth) picked = it;
    }
  }
  if (!picked) for (let i = frameList.length - 1; i >= 0; i--) {
    const it = frameList[i];
    // il decoro (cddvd*) e l'impalcatura di cantiere sono puramente visivi:
    // nell'originale non avevano eventi Mouse propri, quindi qui non devono
    // "rubare" il tocco.
    if (!it._f || it.obj === "decor" || it.obj === "scaffold") continue;
    const x0 = it.x - it._f.ox, y0 = it.y - it._f.oy;
    if (w.x >= x0 && w.x <= x0 + it._f.w && w.y >= y0 && w.y <= y0 + it._f.h) {
      picked = it;
      break;
    }
  }
  if (!picked) return;
  message = ""; messageT = 0;
  if (picked.obj === "placeholder" && !picked.consumed) {
    const def = selectedType ? BUILDING_TYPES[selectedType] : null;
    if (!selectedType) {
      // [C] handbutton/Mouse_LeftPressed.gml: `r12.selec = 0`, nessun
      // edificio armato — la modalita' di default prima di aprire il menu.
      message = "nessun edificio selezionato — apri il menu con la gru";
    } else if (!def) {
      // Uno degli `OTHER_BUILDINGS` sopra: nel menu, ma non in
      // BUILDING_TYPES — nessuna catena di piazzamento ricostruita.
      message = `${BUILDING_LABEL[selectedType] ?? selectedType}: non ancora ricostruito`;
    } else {
      const err = placeAt(picked, selectedType);
      message = err ?? `${def.label.toLowerCase()} piazzata (-${def.placeCost.mon} mon)`;
    }
    messageT = 3;
  } else if (picked.obj === "building") {
    const err = tryStartUpgrade(picked.ref, r12);
    message = err ?? "cantiere avviato";
    messageT = 3;
  }
};

/** Confronta per identita' logica: gli edifici sono incapsulati in un
 * wrapper nuovo ad ogni frame (lo sprite cambia durante il cantiere),
 * quindi il confronto va fatto sull'entita' vera (`ref`), non sul wrapper. */
function isPicked(it) {
  if (!picked) return false;
  if (it === picked) return true;
  return it.obj === "building" && picked.obj === "building" && it.ref === picked.ref;
}

// ---------------------------------------------------------------- loop
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w; canvas.height = h;
  }
  cam.resize(canvas.clientWidth, canvas.clientHeight);
  if (canvas.clientWidth > 0) {
    const fitZoom = Math.max(scene.width / cam.viewW, scene.height / cam.viewH);
    // Non ha senso allontanarsi molto oltre "si vede tutta la mappa": un
    // margine per respirare, non lo zoom libero di prima (arrivava a 8,
    // ben oltre i bordi della room — da li' i bordi "strappati" invece di
    // un margine pulito, vedi sotto).
    cam.maxZoom = fitZoom * 1.3;
    if (!userMoved) {
      cam.setZoomImmediate(fitZoom);
      cam.x = scene.width / 2;
      cam.y = scene.height / 2;
    }
  }
  cam.clamp();
}

let frameList = staticWorld;   // lista dell'ultimo frame disegnato, usata anche dal picking
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  phaseT += dt;
  resize();
  cam.update(dt);

  // --- simulazione: cantieri, economia, meteo
  stepConstructions(buildings, dt, r12, spawnDecor, addDecor);
  stepProduction(buildings, dt, r12);
  stepGrowth(buildings, dt, r12);
  stepConsumption(buildings, dt, r12, isNight(phaseT));
  stepWeather(r12, dt);
  stepStormDamage(buildings, dt, r12);
  for (const b of buildings) if (!b.construction && b.life <= 0) destroyBuilding(b);
  tickR12(r12, dt, buildings);
  if (messageT > 0) messageT -= dt;

  // --- lista di disegno di questo frame: mondo statico (placeholder consumati
  // esclusi) + edifici (sprite ricalcolato: cambia durante il cantiere) + decoro
  const dynamic = [];
  for (const b of buildings) {
    dynamic.push({ obj: "building", ref: b, x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr) });
    // Impalcatura in sovraimpressione + coperchio di fine cantiere (vedi
    // buildings.js): stessa x/y/depth dell'edificio, spinti sopra di lui
    // dall'ordine di inserimento (a parita' di depth+y l'array mantiene
    // l'ordine con cui e' stato costruito, STUDIO.md sopra su sortWorld).
    if (b.frontSpr) dynamic.push({ obj: "scaffold", x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.frontSpr) });
    if (b.capSpr) dynamic.push({ obj: "scaffold", x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.capSpr) });
  }
  for (const d of decorEntities) dynamic.push(d);
  // Il decoro (bagliore delle finestre) si accende solo di notte (STUDIO.md
  // §5.3 "notte_target": 231 oggetti reagiscono al ciclo giorno/notte
  // accendendo le luci di notte) — finora restava sempre acceso, quindi
  // visibile pure in pieno giorno.
  const night = isNight(phaseT);
  frameList = staticWorld.filter((it) => !(it.obj === "placeholder" && it.consumed))
    .concat(dynamic).filter((it) => night || it.obj !== "decor").sort(sortWorld);

  // [C] src/objects/placeholder/Create.gml + Mouse_MouseEnter/Leave.gml: il
  // placeholder nasce con sprite "empty" (invisibile) e diventa "phold" (il
  // rombo viola) solo sotto al puntatore, tornando invisibile appena lo
  // lascia — non e' mai visibile stabilmente come lo era nella build
  // precedente (segnalato dall'autore). Il tocco per costruire resta
  // valido ovunque (picking sotto usa sempre `frameList`, indipendente da
  // questo flag): solo il disegno lo rispetta, piu' sotto.
  let hoveredPh = null;
  if (input.hover) {
    const w = cam.screenToWorld(input.hover.x, input.hover.y);
    for (const p of placeholders) {
      if (p.consumed) continue;
      const x0 = p.x - p._f.ox, y0 = p.y - p._f.oy;
      if (w.x >= x0 && w.x <= x0 + p._f.w && w.y >= y0 && w.y <= y0 + p._f.h) { hoveredPh = p; break; }
    }
  }
  for (const p of placeholders) p._hovered = p === hoveredPh;

  r.beginFrame(canvas.width, canvas.height);
  const amb = ambientAt(phaseT);

  // --- layer mondo: segue la camera, tinto dal ciclo giorno/notte
  r.setAmbient(amb.rgb[0], amb.rgb[1], amb.rgb[2]);
  r.setProjection(cam.projection());
  let drawn = 0;
  const vw = cam.worldW, vh = cam.worldH;
  const l = cam.x - vw / 2, t = cam.y - vh / 2, rr = l + vw, bb = t + vh;
  for (const it of frameList) {
    if (it.obj === "placeholder" && !it._hovered) continue;
    const f = it._f;
    if (f) {
      const x0 = it.x - f.ox, y0 = it.y - f.oy;
      if (x0 > rr || y0 > bb || x0 + f.w < l || y0 + f.h < t) continue;
      const tint = isPicked(it) ? 0xbfe0ff : 0xffffff;
      r.draw(f, it.x, it.y, 1, tint, 1);
    } else {
      // istanze senza sprite: controller invisibili, li mostro come marcatori
      const s = 24;
      if (it.x > rr + s || it.y > bb + s || it.x < l - s || it.y < t - s) continue;
      r.draw(solidFrame(white, s, s), it.x - s / 2, it.y - s / 2, 1, it._c, 0.35);
    }
    drawn++;
  }
  r.flush();

  // --- layer GUI: spazio schermo, dimensione costante, nessuna tinta
  r.setAmbient(1, 1, 1);
  r.setProjection(screenProjection(canvas.clientWidth, canvas.clientHeight));

  // Fuori dai confini della room: vignetta piena invece dei bordi
  // "strappati" del terreno quando lo zoom indietro supera la mappa (il
  // terreno non e' disegnato per essere visto da fuori dai suoi bordi). Non
  // ho trovato un oggetto originale dedicato: l'originale aveva un limite
  // minimo di zoom esplicito apposta per non mostrare mai la mappa intera
  // su `match` (STUDIO.md §2), quindi il problema a monte non si poneva
  // mai. Qui ricreiamo l'effetto (vignetta) invece del vincolo che lo
  // evitava.
  //
  // Bianca, non nera: le icone della UI (bottoni edificio, testo risorse)
  // sono nere, e con zoom-out sufficiente la vignetta arriva a toccarle —
  // nero su nero, illeggibile. Decisione presa insieme (segnalato
  // dall'autore): il bianco resta leggibile sotto qualunque icona/testo
  // scuro in ogni condizione di zoom o fase giorno/notte, senza bisogno di
  // asset o logica in piu'.
  {
    const b = cam.bounds;
    const p0 = cam.worldToScreen(b.left, b.top);
    const p1 = cam.worldToScreen(b.right, b.bottom);
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (p0.y > 0) r.draw(solidFrame(white, cw, p0.y), 0, 0, 1, 0xffffff, 1);
    if (p1.y < ch) r.draw(solidFrame(white, cw, ch - p1.y), 0, p1.y, 1, 0xffffff, 1);
    if (p0.x > 0) r.draw(solidFrame(white, p0.x, ch), 0, 0, 1, 0xffffff, 1);
    if (p1.x < cw) r.draw(solidFrame(white, cw - p1.x, ch), p1.x, 0, 1, 0xffffff, 1);
  }

  // Barra risorse vera (STUDIO.md §9 "GUI vera"). [C] src/objects/repre/
  // DrawGUI.gml: e' un `DrawGUI`, quindi le coordinate sono gia' spazio
  // schermo assoluto — nessuna proiezione da rifare. Un'unica immagine con
  // le icone gia' dentro (`icone_oriz`), non quattro icone separate come
  // nella prima versione: la prima ipotesi era sbagliata. I numeri usano
  // "gotham_mini" — un font diverso da quello del resto della UI, non lo
  // stesso rimpicciolito — ai quattro offset letti nel decompilato: pop 30,
  // olio 142, energia 228, denaro 340, tutti a y=30 (+ `global.upp`, un
  // offset di sicurezza per notch/status-bar non ancora identificato: qui
  // trattato come 0). Colore nero come lo stato "non hover" dell'originale
  // (`action_color(0)`); lo stato hover (testo bianco, sfondo
  // `icone_orizz_hc`) non e' riprodotto — nessun concetto di hover nel
  // nostro input touch-first (STUDIO.md §7).
  const barFrame = frameFor("icone_oriz");
  if (barFrame) r.draw(barFrame, 0, 20, 1, 0xffffff, 1);
  const stats = [[Math.round(r12.pop), 30], [Math.round(r12.oil), 142],
                 [Math.round(r12.ele), 228], [Math.round(r12.mon), 340]];
  for (const [value, x] of stats) drawText(r, fontMini, String(value), x, 30, 1, 0x000000, 1);

  // Selettore edificio: sostituisce la ruota di scelta `cre1..cre4` non
  // ancora ricostruita (STUDIO.md §6/§9), e replica la struttura a tre
  // righe alternate del pannello originale (`menoo`, vedi sopra) invece di
  // mostrarle tutte insieme. `pu1`/`pu2`/... hanno due sprite, normale e
  // "selezionato" (`pX`/`pXss`, scambiati in base a `r12.selec` — non e'
  // un tint, sono disegni diversi). Nell'originale erano ancorati a x fissi
  // (`action_move_to`/`N*global.sca`); qui si accodano da sinistra usando
  // la larghezza vera di ciascuno sprite (`GAP` px fra l'uno e l'altro).
  // `chies` non ha un bottone: non e' un tipo piazzabile (vedi sopra).
  uiButtons = [];
  const baseY = canvas.clientHeight;
  const GAP = 4;
  let rx = 0;
  const row = menoo === 1
    // menoo 1 "edifici" ([C] pu1/Create.gml li crea tutti insieme): i due
    // veri (casa/industria) + il resto del menu, segnaposto (vedi sopra).
    ? [
        { kind: "building", type: "casa", spr: "p1", sprSel: "p1ss" },
        { kind: "building", type: "industria", spr: "p2", sprSel: "p2ss" },
        ...OTHER_BUILDINGS.map((b) => ({ kind: "building", type: b.type, spr: b.spr, sprSel: b.sprSel })),
        { kind: "menu", menoo: 0, spr: "baccc", label: "Indietro" },
      ]
    : menoo === 2
    // menoo 2 "vista" ([C] eyebutton1/2/3 + zoom_plus/zoom_minus): le tre
    // non ricostruite restano segnaposto, zoom+/- richiamano cam.setZoom.
    ? [
        { kind: "info", spr: "eyee1", label: "Vista 1" },
        { kind: "info", spr: "eyee2", label: "Vista 2" },
        { kind: "info", spr: "eyee3", label: "Vista 3" },
        { kind: "zoom", spr: "zoomplus", label: "Zoom +", zoom: 0.8 },
        { kind: "zoom", spr: "zoomminus", label: "Zoom -", zoom: 1.25 },
        { kind: "menu", menoo: 0, spr: "baccc", label: "Indietro" },
      ]
    // menoo 0 "casa" ([C] handbutton/buildbutton/eyebutton): la riga di
    // partenza. handbutton deseleziona (r12.selec=0); gru e occhio aprono
    // le altre due righe.
    : [
        { kind: "deselect", spr: "handee", label: "Deseleziona" },
        { kind: "menu", menoo: 1, spr: "groo", label: "Menu edifici" },
        { kind: "menu", menoo: 2, spr: "eyeee", label: "Menu vista" },
      ];
  for (const b of row) {
    const spr = b.kind === "building" && selectedType === b.type ? b.sprSel : b.spr;
    const f = frameFor(spr);
    if (!f) continue;
    r.draw(f, rx, baseY, 1, 0xffffff, 1);
    uiButtons.push({ x: rx, y: baseY - f.h, w: f.w, h: f.h, ...b });
    rx += f.w + GAP;
  }
  r.flush();

  // --- HUD testuale di debug: numeri e stato dettagliato per lo sviluppo,
  // sovrapposto in DOM. La barra sopra e' la UI "vera", in canvas.
  let status = "";
  if (picked?.obj === "building") {
    const b = picked.ref;
    const up = nextUpgrade(b);
    status = `${BUILDING_TYPES[b.type].label} livello ${b.level}  vita ${b.life}`;
    const g = BUILDING_TYPES[b.type].growth?.[b.level - 1];
    if (b.construction) status += `  [cantiere in corso]`;
    else if (up) {
      if (upgradeUnlocked(b, r12)) {
        status += `  potenziamento pronto (${Object.entries(up.cost).map(([k, v]) => v + " " + k).join(", ")})`;
      } else if (up.atMakee != null) {
        status += `  prossimo potenziamento a ${up.atMakee} cicli di produzione (ora ${b.makee ?? 0})`;
      } else if (up.atAva != null) {
        status += `  prossimo potenziamento a crescita completa (${b.ava ?? 0}/${up.atAva})`;
      } else {
        status += `  prossimo potenziamento a pop ${up.atPop}`;
      }
    } else if (g) {
      status += (b.ava ?? 0) >= g.maxAva ? `  crescita completa` : `  crescita ${b.ava ?? 0}/${g.maxAva}`;
    }
  } else if (picked?.obj === "placeholder") {
    const def = selectedType ? BUILDING_TYPES[selectedType] : null;
    status = picked.consumed ? "occupato"
      : !selectedType ? "vuoto — nessun edificio selezionato"
      : def ? `vuoto — tocca per costruire ${def.label.toLowerCase()} (${def.placeCost.mon} mon)`
      : `vuoto — ${BUILDING_LABEL[selectedType] ?? selectedType} non ancora ricostruito`;
  } else if (picked) {
    status = `${picked.obj}${picked.spr ? " [" + picked.spr + "]" : ""}`;
  }

  hud.textContent =
    `${scene.name}  ${scene.width}x${scene.height}\n` +
    `istanze ${frameList.length}  disegnate ${drawn}  drawcall ${r.drawCalls}\n` +
    `atlas ${atlas.pages.length} pagine  senza sprite ${missingArt}\n` +
    `zoom ${cam.zoom.toFixed(2)}  camera ${cam.x.toFixed(0)},${cam.y.toFixed(0)}\n` +
    `fase ${amb.label}  edifici ${buildings.length}` +
    (r12.storm ? `  ⛈ tempesta (${r12.stormT.toFixed(0)}s)\n` : `\n`) +
    (status ? status + "\n" : "") +
    (messageT > 0 ? message + "\n" : "") +
    `trascina, rotella/pinch, tap — [S] salva [L] carica`;

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// aggancio di debug, comodo per ispezionare senza aspettare il ciclo
window.__nimbus = {
  cam, scene, get world() { return frameList; }, get buildings() { return buildings; }, get r12() { return r12; },
  get uiButtons() { return uiButtons; },
  setPhase: (t) => { phaseT = t; },
  phases: PHASES,
  save: doSave, load: doLoad,
};
