import { Renderer, makeSolidTexture, makeCircleTexture, solidFrame, loadTexture } from "./gl.js";
import { Camera, screenProjection } from "./camera.js";
import { Input } from "./input.js";
import { createR12, tickR12, stepWeather } from "./state.js";
import { BUILDING_TYPES, placeBuilding, canAfford, currentDecor, currentDeathPop, currentDeathHap, ruinSpriteFor, tryStartUpgrade, stepConstructions, stepProduction, stepSolarProduction, stepWindProduction, stepGrowth, stepConsumption, stepStormDamage, nextUpgrade, upgradeUnlocked, tooCloseToTurret, stepTurretAim, costTagSprite } from "./buildings.js";
import { spawnCar, stepCars, CARMAKER_SCHEDULE } from "./cars.js";
import { createSemaphore, stepSemaphores } from "./semaphores.js";
import { createAtmosphere, stepAtmosphere } from "./atmosphere.js";
import { spawnPedestrian, stepPedestrians } from "./pedestrians.js";
import {
  stepBalloonSpawner, stepBalloons, stepLoot, collectLoot,
  spawnConstructionBalloon, stepConstructionBalloons, stepConstructionBoxes, ALERT_DURATION,
} from "./balloons.js";
import { stepCoinSpawner, stepCoins, collectCoin } from "./coins.js";
import { stepSmokeSpawner, stepSmoke, SMOKE_FRAME_COUNT, SMOKE_LIFE } from "./smoke.js";
import { stepThreatSpawner, stepThreats, stepBombs, stepExplosions, EXPLOSION_FRAME_COUNT, stepAerSmoke, AER_SMOKE_FRAME_COUNT, AER_SMOKE_LIFE, stepDebris } from "./threats.js";
import { stepTurretFire, stepProjectiles, fireTurretManual, stepSmoko, SMOKO_LIFE } from "./projectiles.js";
import { save, load } from "./save.js";
import { loadFont, drawText } from "./font.js";

const canvas = document.getElementById("view");
const hud = document.getElementById("hud");

// Schermata di caricamento (index.html #loading): il gioco e' diventato
// pesante lato asset (atlas per-room + font bitmap, tutti fetchati prima
// del primo frame, vedi gli "await fetch"/loadTexture/loadFont piu' sotto),
// quindi copriamo quell'attesa con logo + sfondo nero invece di uno schermo
// bianco/vuoto. "show" fa partire subito la dissolvenza in entrata del
// logo; "hide" (chiamata da hideLoading(), sotto, al primo frame disegnato)
// fa la dissolvenza in uscita dell'intera overlay.
const loading = document.getElementById("loading");
loading.classList.add("show");
let loadingHidden = false;
function hideLoading() {
  if (loadingHidden) return;
  loadingHidden = true;
  loading.classList.add("hide");
  loading.addEventListener("transitionend", () => loading.remove(), { once: true });
}

const r = new Renderer(canvas);
const gl = r.gl;
const white = makeSolidTexture(gl);
// Cerchio morbido per l'animazione "bolla" delle monete raccolte (vedi
// coinPops/collectCoinAt() piu' sotto) — nessun asset dell'originale la
// prevede (nessun sistema di particelle in questo motore, STUDIO.md), e'
// puramente nostra.
const bubbleTex = makeCircleTexture(gl, 64);
const cam = new Camera();
const input = new Input(canvas);

// Zoom vero solo su mobile. Un puntatore "coarse" (dito, niente hover fine)
// e' il segnale che il browser stesso da' per un device touch — piu'
// affidabile di un controllo sulla larghezza schermo (un desktop con
// finestra stretta non e' un telefono) o sullo user agent (facile da
// falsificare, e comunque scoraggiato). Su desktop lo zoom resta fermo a un
// rapporto 1 texel : 1 pixel fisico (vedi `pixelPerfectZoom()` sotto): niente
// rotella, niente bottoni zoom+/- in UI, solo l'interfaccia com'e' disegnata,
// pixel per pixel — la richiesta era esplicitamente "zero zoom" su desktop.
const isMobile = matchMedia("(pointer: coarse)").matches;

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
// Ignorati del tutto su desktop, dove lo zoom non si muove mai (vedi sopra).
cam.minZoom = 0.5;
// Finche' non tocchi niente la camera inquadra tutta la room, e si riadatta
// se lo schermo cambia (rotazione del telefono). Su desktop non si tocca
// comunque mai (niente zoom interattivo), quindi resta sempre "come se non
// avessi ancora toccato niente".
let userMoved = false;

/** zoom = quanti pixel di mondo per pixel di schermo FISICO (camera.js):
 * per avere 1 texel dell'atlas = 1 pixel del display serve zoom == dpr,
 * non zoom == 1 (che darebbe 1 texel per pixel CSS, sgranato su schermi
 * hidpi dove un pixel CSS ne copre dpr^2 fisici). */
function pixelPerfectZoom() {
  return Math.min(window.devicePixelRatio || 1, 2);
}

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
// `frameIdx` (default 0): quasi tutti gli sprite del motore sono statici,
// una sola posa (STUDIO.md, "nessun sistema di image_speed") — ma alcuni
// (le svolte delle auto, game/src/cars.js) sono davvero multi-frame
// nell'originale e ora vengono animati per davvero, non piu' fermi al
// primo frame: vedi stepCars() e il suo uso qui sotto. L'atlas li
// impacchetta gia' tutti (tools/23_atlas.py itera `s["frames"]` per
// intero), semplicemente prima non venivano mai letti oltre il primo.
function frameFor(sprName, frameIdx = 0) {
  const frames = atlas.sprites[sprName];
  if (!frames || !frames.length) return null;
  const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
  return { tex: pageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1,
           w: f.w, h: f.h, ox: f.ox, oy: f.oy };
}
// Alberi (STUDIO.md §5.3, src/objects/albe|albe2|albe3/Create.gml): a
// Create l'originale sceglie a dado uno sprite finale diverso per istanza
// (in albe, se nessun dado va a buon fine resta il default "a1" della
// room); qui e' 131 volte lo stesso identico albero altrimenti — la
// tavola di probabilita' sotto e' la stessa, decisa una volta al
// caricamento della scena invece che alla nascita dell'istanza (nessuna
// differenza visibile: gli alberi non nascono mai a runtime in questa
// room, sono tutti gia' in scena da match_easy.scene.json).
const dice = (n) => Math.random() < 1 / n;
function treeVariant(obj) {
  if (obj === "albe") {                              // [C] albe/Create.gml
    if (dice(5)) return dice(2) ? "a2" : "a5";
    if (dice(2)) return dice(2) ? "a3" : "a4";
    return null;                                       // resta "a1", il default
  }
  if (obj === "albe2") return dice(2) ? (dice(2) ? "a21" : "a22") : (dice(2) ? "a23" : "a24");
  if (obj === "albe3") return dice(2) ? (dice(2) ? "a31" : "a32") : (dice(2) ? "a33" : "a34");
  return null;
}
for (const it of staticWorld) {
  const v = treeVariant(it.obj);
  if (v) it.spr = v;
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
// [I] depth: la room dichiara -5000 (data/objects.json: sempre in primissimo
// piano, davanti persino agli edifici — cosi' com'era nell'originale, mai
// letto/cambiato a runtime). Qui invece il rombo viola, quando appare sotto
// hover, resta appena sopra il piano stradale (`air2`, depth -1, STUDIO.md
// §5.2) e sotto a tutto il resto — alberi/auto/edifici sono depth 0 nella
// room, quindi ordinati per `-y` da effDepth() sopra, e la y minima in
// `match_easy` e' 17 (effDepth -17): -2 sta sempre fra i due, mai sopra un
// edificio o un albero, ma sempre sopra la strada sotto di lui.
const PLACEHOLDER_DEPTH = -2;
for (const p of placeholders) { p.id = `ph_${p.x}_${p.y}`; p.consumed = false; p.depth = PLACEHOLDER_DEPTH; }
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

// `honda_facile_1`/`honda_facile_2` sono anche loro gia' istanze vere nella
// room (STUDIO.md §5.3 "veicoli_target"): nell'originale non stanno ferme,
// guidano avanti e indietro lungo un percorso fisso finche' l'olio non
// finisce (game/src/cars.js). Tolte da staticWorld — altrimenti resterebbero
// due comparse immobili sotto alle auto vere che si muovono sopra di loro —
// e sostituite dalle istanze simulate in `cars` piu' sotto.
for (const name of ["honda_facile_1", "honda_facile_2"]) {
  const idx = staticWorld.findIndex((it) => it.obj === name);
  if (idx >= 0) staticWorld.splice(idx, 1);
}

// Semafori (game/src/semaphores.js, STUDIO.md): `object8` ("se", il palo —
// mai rinominato dall'autore originale) resta in staticWorld com'e', un
// oggetto di mondo fermo come un albero; il tappo colorato che lampeggia
// (`object37` nel decompilato) e' un figlio creato al suo Create, quindi
// qui ne creiamo uno per ogni palo gia' in scena — le 48 istanze di
// match_easy — invece di uno per staticWorld com'era per i cambi di sprite
// degli alberi, perche' questo ha bisogno di continuare ad avanzare ad ogni
// frame (stepSemaphores() piu' sotto), non solo di uno sprite scelto una
// volta.
const semaphores = staticWorld.filter((it) => it.obj === "object8").map((it) => createSemaphore(it.x, it.y));

/** @type {ReturnType<typeof placeBuilding>[]} */
let buildings = [];
let decorEntities = [];      // ornamenti (permanenti a fine cantiere, o transitori durante)
// I ruderi (game/src/buildings.js, ruinSpriteFor()): quando la vita di un
// edificio finito arriva a 0, l'originale non lo rimuove — lo sostituisce
// con un oggetto "ruin*" permanente (STUDIO.md, "il rudere") che nessuno
// strumento nel motore puo' rimuovere (la ruspa/`selec==11` non e' mai stata
// ricostruita). Array a parte invece che dentro `buildings`: un rudere non
// simula piu' niente (nessuna produzione/crescita/mira/fulmine), e' decoro
// inerte come `decorEntities` — vedi destroyBuilding() sotto.
let ruins = [];
// I lotti "extra" occupati da un edificio multi-tile (oggi solo `eolico`,
// buildings.js `def.multiTile`) — [C] `impavent` uccide ogni placeholder che
// la sua maschera copre, non solo quello toccato (vedi placeAt() sotto): qui
// non c'e' niente da disegnare li' (nessun edificio/rudere), solo un
// placeholder che deve restare bloccato per sempre. Nessun array a parte
// servirebbe se il salvataggio potesse derivarli da `buildings`/`ruins`, ma
// per definizione questi lotti non hanno nessuna delle due cose sopra —
// persistito a parte in save.js, altrimenti un ciclo salva/carica li
// libererebbe di nuovo (STUDIO.md non lo segnalava perche' e' un problema
// nuovo, nato con questo edificio).
let blockedSlots = [];
// Auto decorative gia' in marcia da subito, come nella room originale
// (phaseT parte da 0 = fase "giorno" in PHASES piu' sotto, quindi mai
// notte alla nascita: nessun tint fanali sulle due iniziali).
let cars = [spawnCar("honda_facile_1", false), spawnCar("honda_facile_2", false)];
// `carmaker` (game/src/cars.js, CARMAKER_SCHEDULE): non e' un edificio ne'
// un'istanza di scena, e' un timer che r12 avvia incondizionatamente in
// ogni room — ogni 60s di gioco arriva un'altra auto (honda3..honda9),
// finche' non sono comparse tutte e sette. `carmakerT` e' lo stesso
// cronometro, `carmakerIdx` il prossimo tipo ancora da far comparire.
let carmakerT = 0, carmakerIdx = 0;
// Nuvole e uccelli (game/src/atmosphere.js): stesso timer di r12/Alarm_0.gml,
// puramente decorativi (non incidono su niente in r12).
const atmo = createAtmosphere();
// Pedoni (game/src/pedestrians.js): un "pplo" per ogni salto di livello di
// una casa (vedi spawnDecor() piu' sotto) — vuoto all'avvio, match_easy
// parte senza nessuna casa gia' costruita.
let pedestrians = [];
// Mongolfiere (game/src/balloons.js): `balloons`/`loot` sono le mongolfiere
// di risorse/spia e le casse che lasciano cadere (r12/Alarm_1.gml, ogni 5s);
// `constructionBalloons`/`constructionBoxes` sono il pacco che ogni `casa`/
// `industria` piazzata si porta dietro (placeholder/Mouse_LeftReleased.gml),
// spawnate una alla volta da placeAt() piu' sotto, non da un timer.
let balloons = [];
let loot = [];
let constructionBalloons = [];
let constructionBoxes = [];
// I pulsanti blu delle monete (game/src/coins.js): una per `casa` felice e
// con corrente, ogni 3000 tick — vedi stepCoinSpawner() piu' sotto.
let coins = [];
// Le "bolle" che animano la raccolta di una moneta (nostre, non
// dell'originale — vedi bubbleTex sopra): { x, y, t }, spawnate da
// collectCoinAt() piu' sotto e disegnate/scartate nel loop principale.
let coinPops = [];
const COIN_POP_LIFE = 0.4;
// Il fumo decorativo delle centrali (game/src/smoke.js): una o due ciminiere
// per `industria` in piedi, mai in cantiere — vedi stepSmokeSpawner() piu'
// sotto.
let smoke = [];
// Minacce vere (game/src/threats.js): `threats` sono aerei/bombardieri/
// zeppelin, fatti nascere da stepThreatSpawner (r12/Alarm_4|5|6.gml) ogni
// volta che una mongolfiera spia viene ignorata abbastanza a lungo da
// "riuscire" (balloons.js). `bombs`/`explosions` sono quello che lasciano
// cadere in volo.
let threats = [];
let bombs = [];
let explosions = [];
// Scia di fumo di aerei/bombardieri (game/src/threats.js, spawnAerSmoke/
// stepAerSmoke) — mai gli zeppelin, [C] nessun Alarm_6 su dirig.
let aerSmoke = [];
// Pezzi di fusoliera che bombar stacca entrando in stato piro
// (game/src/threats.js, spawnDebris/stepDebris) — mai air/dirig.
let debris = [];
// Il fuoco vero delle torrette (game/src/projectiles.js): stepTurretFire
// crea i colpi (dalla punta del cannone, quando una minaccia vera e' entro
// portata), stepProjectiles li fa volare e colpire.
let projectiles = [];
// Sbuffi di fumo di scia (game/src/projectiles.js, spawnSmoko/stepSmoko):
// la scia del razzo in volo + il singolo sbuffo alla bocca del gatling —
// non il fumo delle centrali (quello e' `smoke`, game/src/smoke.js).
let trails = [];
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
  // `parco` non ha un decoro fisso per livello come gli altri tre: il suo
  // e' uno scatter casuale di alberi/lampioni (vedi spawnParcoScatter() e
  // il commento su BUILDING_TYPES.parco in buildings.js) — intercettato
  // qui, allo stesso punto in cui stepConstructions() segnala "cantiere
  // finito", invece che dentro buildings.js che non sa niente di alberi o
  // lampioni.
  if (building.type === "parco") { spawnParcoScatter(building); return; }
  // Un decoro e' di solito solo un nome di sprite (dx/dy/lit di default
  // vanno bene per tutti); `grattacielo` (buildings.js) passa invece
  // `{spr, fadeTicks}` per le finestre notturne, ognuna con la propria
  // velocita' di dissolvenza (vedi addDecor()/stepLights() sotto).
  addDecor(building, decorSprites.map((d) =>
    typeof d === "string" ? { spr: d, dx: 0, dy: 0 } : { spr: d.spr, dx: 0, dy: 0, fadeTicks: d.fadeTicks }));
  // [C] casa1|2|3/Create.gml: l'ultima riga crea un "pplo" (STUDIO.md) alla
  // posizione della casa — un abitante per ogni salto di livello, non uno
  // per casa: una casa a livello 3 ne ha lasciati indietro due, mai
  // rimossi (nemmeno casaN/Destroy.gml li tocca — sopravvivono alla casa).
  // [C] villa1/Create.gml: stesso `action_create_object(pplo, 0, 0)` di
  // casa, ma una volta sola (villa e' un solo livello, questo "salto" e'
  // anche l'unico) — altri se ne aggiungono poi durante la crescita
  // (`g.pedestrianDice`, stepGrowth() in buildings.js).
  if (building.type === "casa" || building.type === "villa") pedestrians.push(spawnPedestrian(building.x, building.y));
}

/** Decoro transitorio (gru/macerie durante un cantiere): si aggiunge senza
 * rimpiazzare, e sparisce quando `spawnDecor` sostituisce tutto a fine
 * cantiere (STUDIO.md §9: la traccia "f" degli impa* non e' ricostruita,
 * questo e' quanto resta della sua parte scenografica).
 *
 * I decori "luce" (bagliore finestre: crcl/c111l/i11l/... — STUDIO.md §5.3
 * "notte_target") sono lo stesso oggetto ma con un depth piu' vicino di 1
 * rispetto al proprio edificio (`-y - 1` contro `-y`, esattamente come
 * cddvd/d111/di11b/Create.gml: `depth = -y - 1`): "saltano" davanti a lui
 * nell'ordine di disegno invece di restare alla pari, e — vedi
 * `stepLights()`/il ciclo di disegno piu' sotto — davanti anche alla tinta
 * giorno/notte, che li spegnerebbe altrimenti invece di farli accendere.
 *
 * `lit: false` (usato per gli alberi/i pali dei lampioni dello scatter di
 * parco, vedi sotto) disattiva tutto questo: resta un decoro qualunque,
 * fermo alla y del suo edificio come un albero vero, tinto dal ciclo
 * giorno/notte come qualunque altro oggetto di mondo. */
function addDecor(building, spawns) {
  for (const { spr, dx, dy, lit = true, fadeTicks } of spawns) {
    const y = building.y + dy;
    decorEntities.push({
      obj: "decor", buildingId: building.id,
      x: building.x + dx, y, depth: lit ? -y - 1 : -y,
      spr, _f: frameFor(spr),
      // `fadeTicks` (grattacielo, buildings.js): dissolvenza propria invece
      // della LIGHT_FADE condivisa da tutti gli altri decori — vedi stepLights().
      ...(lit ? { _selfLit: true, _lightT: 0, _fadeTicks: fadeTicks } : {}),   // parte spento, come "empty" in originale (Create.gml)
    });
  }
}

// [C] parco/Create.gml: 7 posizioni fisse intorno al parco: ognuna, a dado
// (1/`dice`), puo' diventare un albero o un lampione — mai entrambi, mai
// garantito. `dice` e' la probabilita' che lo slot generi QUALCOSA; quale
// dei due (albero o lampione) e' poi un secondo dado 50/50, sempre uguale
// per ogni slot nel decompilato.
const PARCO_SLOTS = [
  { dice: 4, dx: 0, dy: 0 }, { dice: 2, dx: 40, dy: 10 }, { dice: 3, dx: -40, dy: 10 },
  { dice: 4, dx: 5, dy: -30 }, { dice: 2, dx: -7, dy: 40 }, { dice: 4, dx: 70, dy: 21 },
  { dice: 3, dx: -80, dy: 7 },
];
/** Il decoro vero di `parco` (STUDIO.md, vedi BUILDING_TYPES.parco in
 * buildings.js): alberi (stessa tavola a dado di treeVariant("albe") sopra,
 * niente luce) e lampioni — corpo fermo ("l1", non illuminato, tinto dal
 * ciclo giorno/notte come il palo che e') + la luce vera e propria ("l1l",
 * `lit: true` — [C] lampioncino/Create.gml: `action_create_object(lampla,
 * 0, 0)`, lo stesso oggetto "luce" gia' generico da addDecor()/
 * stepLights() per i bagliori degli edifici, qui applicato a un lampione
 * invece che a una finestra). Entrambi condividono `buildingId`: quando il
 * parco muore (o viene ricostruito), spawnDecor() sopra li ripulisce tutti
 * insieme come un decoro qualunque. */
function spawnParcoScatter(building) {
  for (const slot of PARCO_SLOTS) {
    if (!dice(slot.dice)) continue;
    if (dice(2)) {
      addDecor(building, [{ spr: treeVariant("albe") ?? "a1", dx: slot.dx, dy: slot.dy, lit: false }]);
    } else {
      addDecor(building, [
        { spr: "l1", dx: slot.dx, dy: slot.dy, lit: false },
        { spr: "l1l", dx: slot.dx, dy: slot.dy, lit: true },
      ]);
    }
  }
}

/**
 * `eolico` (buildings.js, `def.multiTile`) e' l'unico edificio che occupa
 * PIU' di un placeholder — vedi il commento su `BUILDING_TYPES.eolico` in
 * buildings.js per il perche'. Cerca fra i placeholder ancora liberi quelli
 * entro `radius` da quello toccato (il piu' vicino per primo) e ne
 * restituisce `count` in tutto (quello toccato incluso) — `null` se non ce
 * ne sono abbastanza vicini. [I] Approssimazione dichiarata di una vera
 * maschera di collisione (STUDIO.md, "pepazzittecollider" mai ricostruito).
 */
function findPlacementCluster(tapped, count, radius) {
  const r2 = radius * radius;
  const near = placeholders
    .filter((p) => p !== tapped && !p.consumed && (p.x - tapped.x) ** 2 + (p.y - tapped.y) ** 2 <= r2)
    .sort((a, b) => ((a.x - tapped.x) ** 2 + (a.y - tapped.y) ** 2) - ((b.x - tapped.x) ** 2 + (b.y - tapped.y) ** 2));
  if (near.length < count - 1) return null;
  return [tapped, ...near.slice(0, count - 1)];
}

function placeAt(placeholder, type) {
  const def = BUILDING_TYPES[type];
  // [C] placeholder/Mouse_LeftReleased.gml, selec==3: il piazzamento vero e
  // proprio richiede anche `close==0` (nessun'altra torretta troppo vicina,
  // STUDIO.md "le mongolfiere" -> tooCloseToTurret()) — controllato PRIMA
  // del costo, come nel decompilato (il blocco intero e' innestato dentro
  // quel controllo, non dopo aver gia' scalato i mon).
  if (def.turret && tooCloseToTurret(buildings, placeholder.x, placeholder.y)) {
    return "troppo vicino a un'altra torretta di difesa";
  }
  // [C] placeholder/Mouse_LeftReleased.gml, ramo selec==71 (monum): scala
  // 20000 mon senza controllare prima `mon>=20000`, a differenza di OGNI
  // altro ramo di quel file — `def.noAffordCheck` riproduce esattamente
  // questa asimmetria (buildings.js, BUILDING_TYPES.monum) invece di
  // "correggerla" silenziosamente: puo' davvero portare mon sotto zero.
  if (!def.noAffordCheck && !canAfford(r12, def.placeCost)) {
    return `serve ${def.placeCost.mon} mon (hai ${r12.mon.toFixed(0)})`;
  }
  // [C] eoliplacer/Alarm_1.gml controlla `places>=4` DOPO aver gia' verificato
  // i mon (stesso ordine qui) — a differenza dell'originale (fallisce in
  // silenzio, vedi buildings.js) restituisce sempre un messaggio chiaro.
  let cluster = [placeholder];
  if (def.multiTile) {
    cluster = findPlacementCluster(placeholder, def.multiTile.count, def.multiTile.radius);
    if (!cluster) return `serve un'area libera di almeno ${def.multiTile.count} lotti vicini`;
  }
  for (const k in def.placeCost) r12[k] -= def.placeCost[k];
  // [C] `impavent`, una volta nato, uccide con la propria maschera ogni
  // placeholder che copre (Collision_placeholder.gml) — qui equivale a
  // consumare TUTTI i lotti del cluster, non solo quello toccato: gli altri
  // restano bloccati per sempre (nessun edificio/rudere li occupa, spariscono
  // e basta, fedele all'originale). Registrati in `blockedSlots` (solo quelli
  // EXTRA, non il placeholder toccato: quello lo rioccupa gia' `buildings`)
  // cosi' un salvataggio/caricamento non li libera di nuovo — vedi doLoad().
  for (const ph of cluster) {
    ph.consumed = true;
    if (ph !== placeholder) blockedSlots.push({ x: ph.x, y: ph.y });
  }
  // depth 0, NON placeholder.depth (-5000): quel numero e' il livello fisso
  // "sempre in primo piano" del segnaposto vuoto (STUDIO.md, cosi' si vede
  // sempre sopra il terreno), non un depth di mondo da ereditare. Un
  // edificio vero e' un oggetto "di mondo" come chies o gli alberi: deve
  // ordinarsi per la propria y (vedi effDepth() sopra), non restare per
  // sempre incollato davanti a tutto il resto della mappa. `def.fixedDepth`
  // (parco, buildings.js — [I] segnalato dall'autore) e' l'eccezione: bassa
  // scenografia piatta, non un edificio solido, resta sempre "in fondo"
  // invece di competere per -y con cio' che le passa sopra.
  const b = placeBuilding(type, placeholder.x, placeholder.y, def.fixedDepth ?? 0);
  buildings.push(b);
  if (b.level >= 1) spawnDecor(b, currentDecor(b));   // industria: arriva a fine cantiere, casa idem
  // [C] placeholder/Mouse_LeftReleased.gml: selec==1 (casa), selec==2
  // (industria), selec==3 (missile), selec==60 (club), selec==61 (solare),
  // selec==62 (gatling) e selec==63 (villa) creano `mon_bil` — i sette
  // tipi piazzabili dal giocatore che lo fanno finora (`parco`, selec==7,
  // non crea nessun pallone nel decompilato — game/src/balloons.js, in
  // cima al file). `laser` (selec==5) crea invece `mon_bbil`, la variante
  // piu' grande mai cablata (STUDIO.md/balloons.js: "serve solo a tipi non
  // ancora ricostruiti") — riusa `mon_bil` come gli altri, stesso pallone
  // piu' piccolo del dovuto invece di un secondo sprite/oggetto solo per
  // questo. `eolico` (selec==4) crea `mon_bil` anche lui — [C]
  // eoliplacer/Alarm_1.gml, ramo selec==4.
  if (type === "casa" || type === "industria" || type === "missile" || type === "solare"
    || type === "club" || type === "villa" || type === "gatling" || type === "laser" || type === "eolico"
    || type === "monum" || type === "banca") {
    constructionBalloons.push(spawnConstructionBalloon(placeholder.x, placeholder.y));
  }
  return null;
}

// ---------------------------------------------------- piazzamento a trascinamento
// `palazzo`/`museo` (buildings.js, `def.diagonalPlacement`) sono gli unici
// edifici con una logica di piazzamento DAVVERO diversa da ogni altro tipo
// (eolico incluso: quello resta un tocco singolo, solo con un raggio di
// ricerca piu' largo) — **[C]** src/objects/placeholder/Mouse_LeftPressed.gml
// (rami selec==6 "palazzo", selec==70 "museo"): il tocco su un lotto libero
// (l'origine) crea quattro sonde `cre1..cre4` ai suoi quattro vicini
// diagonali, agli stessi offset (ox,oy) del placeholder stesso —
// game/data/match_easy.scene.json, ogni istanza dichiara "ox":99,"oy":57,
// non un numero a caso. Ogni sonda che trova li' un placeholder ancora
// libero arma una direzione (`dir1..dir4`, src/objects/dir1..4); il
// giocatore conferma trascinando il tocco fin sopra a una di quelle
// direzioni e RILASCIANDO — src/objects/dir1/Mouse_LeftReleased.gml:
// `arm = 1` al rilascio, non alla pressione — a differenza di ogni edificio
// a un lotto solo, che nasce gia' al tocco (placeholder/Mouse_LeftReleased,
// un solo evento). Se il rilascio non cade su nessuna delle direzioni
// armate, il gesto si annulla senza costo — [C]
// placeholder/Mouse_GlobalLeftReleased.gml, ramo `making==1`.
//
// **[C]** src/objects/placeholder/Collision_dir1..4.gml, lette riga per
// riga: le quattro direzioni si accoppiano in due assi opposti (dir1+dir3,
// dir2+dir4 — non dir1+dir2). Per ENTRAMBI gli assi l'edificio vero nasce
// sempre sul lotto con la y maggiore (piu' vicino alla camera) fra origine
// e vicino scelto — l'altro lotto della coppia resta bloccato per sempre
// (src/objects/dirdel, spawnato esattamente sulla posizione dell'altro
// lotto in tutti e 4 i rami: stessa sorte dei lotti extra di `eolico`,
// `blockedSlots`). L'asse (dir1/dir3 contro dir2/dir4) decide solo quale
// famiglia di sprite di cantiere/varianti finali usare (`impa4r`/
// `IMPAMEDIA_R` contro `impa4rd`/`IMPAMEDIA_RD` — materializzato in un
// secondo tipo concreto in buildings.js, `resolvePlacement()` sotto).
const DIAGONAL_DIRS = [
  { dx: 99, dy: 57, axis: "r" },
  { dx: 99, dy: -57, axis: "rd" },
  { dx: -99, dy: -57, axis: "r" },
  { dx: -99, dy: 57, axis: "rd" },
];
// px di tolleranza sulla spaziatura reale della griglia: misurata su
// match_easy.scene.json i placeholder vicini distano davvero ~(100,58), non
// esattamente (99,57) — stessa scelta "tarata, non esatta" gia' fatta per
// EOLICO_RADIUS/TURRET_MIN_DIST.
const DIAGONAL_TOLERANCE = 20;
// [C] placeholder/Mouse_LeftPressed.gml, rami selec==6/70: `action_sprite_color(255, 1)`
// — 255 e' la costante GameMaker `c_red` (0x0000FF nel suo ordine BGR), non
// bianco. Stesso schema di ricomposizione gia' usato in cars.js (NIGHT_TINT):
// R=255&0xff, G=(255>>8)&0xff=0, B=(255>>16)&0xff=0 -> 0xff0000.
const ARMED_TINT = 0xff0000;

/** I placeholder ancora liberi nei quattro vicini diagonali di `origin`, uno per direzione al massimo. */
function findDiagonalTargets(origin) {
  const targets = [];
  for (const d of DIAGONAL_DIRS) {
    const tx = origin.x + d.dx, ty = origin.y + d.dy;
    const ph = placeholders.find((p) => p !== origin && !p.consumed
      && Math.abs(p.x - tx) <= DIAGONAL_TOLERANCE && Math.abs(p.y - ty) <= DIAGONAL_TOLERANCE);
    if (ph) targets.push({ placeholder: ph, axis: d.axis });
  }
  return targets;
}

/**
 * Arma un gesto di piazzamento a trascinamento su `origin` (chiamata da
 * `input.onPointerDown`, non `onTap`: vedi il commento sopra). Restituisce
 * un messaggio d'errore se il piazzamento non puo' nemmeno cominciare (mon
 * insufficienti — controllato PRIMA di armare, come l'originale — o nessun
 * lotto libero in nessuna delle quattro direzioni), altrimenti arma
 * `armedPlacement` e torna `null`.
 */
function armPlacement(origin, type) {
  const def = BUILDING_TYPES[type];
  if (!canAfford(r12, def.placeCost)) {
    return `serve ${def.placeCost.mon} mon (hai ${r12.mon.toFixed(0)})`;
  }
  const targets = findDiagonalTargets(origin);
  // [I] l'originale arma comunque (crea cre1..cre4 a vuoto) anche con zero
  // lotti liberi vicini, lasciando il giocatore trascinare per niente: qui,
  // come gia' scelto per eolico, un messaggio chiaro subito invece di un
  // gesto che puo' solo fallire.
  if (targets.length === 0) return "serve un lotto libero adiacente in diagonale";
  armedPlacement = { type, origin, targets };
  origin._armed = true;
  return null;
}

/** Annulla un gesto armato senza costruire nulla e senza costo — [C] placeholder/Mouse_GlobalLeftReleased.gml. */
function cancelPlacement() {
  if (!armedPlacement) return;
  armedPlacement.origin._armed = false;
  armedPlacement = null;
}

/**
 * Rilascio del puntatore mentre un gesto e' armato (`input.onPointerUp`):
 * se cade su una delle direzioni valide, costruisce davvero; altrimenti
 * annulla. [C] Collision_dir1..4.gml: l'edificio nasce sul lotto con la y
 * maggiore fra origine e vicino, l'altro resta bloccato per sempre.
 */
function resolvePlacement(sx, sy) {
  if (!armedPlacement) return;
  const { type, origin, targets } = armedPlacement;
  const w = cam.screenToWorld(sx, sy);
  const hit = targets.find((t) => inFrameDiamond(w.x, w.y, t.placeholder.x, t.placeholder.y, t.placeholder._f));
  if (!hit) {
    cancelPlacement();
    message = "piazzamento annullato";
    messageT = 3;
    return;
  }
  const def = BUILDING_TYPES[type];
  const neighbor = hit.placeholder;
  const buildSite = neighbor.y > origin.y ? neighbor : origin;
  const blockedSite = buildSite === neighbor ? origin : neighbor;
  origin._armed = false;
  for (const k in def.placeCost) r12[k] -= def.placeCost[k];
  buildSite.consumed = true;
  blockedSite.consumed = true;
  blockedSlots.push({ x: blockedSite.x, y: blockedSite.y });
  // L'asse (dir1/dir3 "r" contro dir2/dir4 "rd", vedi il commento su
  // DIAGONAL_DIRS sopra) sceglie una catena di cantiere/varianti
  // interamente diversa (sprite orientati, famiglia c4xx "dispari" contro
  // "pari" — buildings.js, BUILDING_TYPES.palazzoRd/museoRd): invece di far
  // portare l'asse ad ogni funzione di buildings.js (currentDecor,
  // ruinSpriteFor, stepGrowth, ...) il tipo concreto e' gia' quello giusto,
  // esattamente come ogni altro tipo — palazzoRd/museoRd non compaiono nel
  // menu (OTHER_BUILDINGS), solo qui.
  const concreteType = hit.axis === "rd" ? `${type}Rd` : type;
  const b = placeBuilding(concreteType, buildSite.x, buildSite.y, 0);
  buildings.push(b);
  if (b.level >= 1) spawnDecor(b, currentDecor(b));
  constructionBalloons.push(spawnConstructionBalloon(buildSite.x, buildSite.y));
  armedPlacement = null;
  message = `${def.label.toLowerCase()} piazzato (-${def.placeCost.mon} mon)`;
  messageT = 3;
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
 * Un edificio la cui vita e' scesa a 0 (fulmine in tempesta, o una bomba
 * sganciata da una minaccia vera — game/src/threats.js, stepBombs). [C]
 * l'originale non lo rimuove: lo sostituisce con un rudere permanente
 * (`ruinSpriteFor()`, game/src/buildings.js — sceglie fra `ruin1`/`ruin2`/
 * `ruin3`/`ruinsol`/`ruinc1..3` in base a tipo e livello, con lo stesso dado
 * uniforme del decompilato dove ne ha piu' di uno) che nessuno strumento nel
 * motore puo' rimuovere: la ruspa/bulldozer (`selec==11`, l'unico modo per
 * ripararlo nell'originale, pagando) non e' mai stata ricostruita — un
 * vicolo cieco fedele, non piu' la rimozione immediata con placeholder
 * libero di una versione precedente di questo motore. `parco` e' l'unica
 * eccezione: **[C]** `parco/Step.gml` non legge mai `life`, quindi non fa
 * NIENTE quando (nella pratica, quasi mai: `life: 9999`) succede —
 * `ruinSpriteFor()` torna `null` e questa funzione si ferma subito, prima di
 * toccare pop/hap/`buildings`, esattamente come l'originale non farebbe
 * niente. Per tutti gli altri applica il bilancio pop (`currentDeathPop`) e
 * hap (`currentDeathHap`, industria/parco — STUDIO.md "i pulsanti blu delle
 * monete") del livello a cui e' morto, letti da chiesX/industriaX/casaX/
 * parco/Destroy.gml.
 */
function destroyBuilding(b) {
  const spr = ruinSpriteFor(b);
  if (!spr) return;
  r12.pop += currentDeathPop(b);
  r12.hap += currentDeathHap(b);
  decorEntities = decorEntities.filter((d) => d.buildingId !== b.id);
  buildings = buildings.filter((x) => x !== b);
  coins = coins.filter((c) => c.buildingId !== b.id);
  if (picked?.obj === "building" && picked.ref === b) picked = null;
  ruins.push({ obj: "decor", x: b.x, y: b.y, depth: -b.y, spr, _f: frameFor(spr) });
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
function doSave() { save(scene.name, r12, buildings, ruins, blockedSlots); }
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
  // Ruderi (destroyBuilding() sopra): `_f`/`obj` non sono salvati (derivati,
  // save.js), vanno ricalcolati qui — stesso principio di `_f` sugli edifici
  // caricati. Occupano un placeholder anche loro (nessuna ruspa per
  // liberarli): stesso ciclo `usedIds` di sopra, cosi' un edificio e un
  // rudere non litigano mai per lo stesso slot.
  ruins = (data.ruins ?? []).map((ru) => ({ obj: "decor", x: ru.x, y: ru.y, depth: -ru.y, spr: ru.spr, _f: frameFor(ru.spr) }));
  for (const ru of ruins) {
    const ph = placeholders.find((p) => !usedIds.has(p.id) && p.x === ru.x && p.y === ru.y);
    if (ph) { ph.consumed = true; usedIds.add(ph.id); }
  }
  // Lotti "extra" di un edificio multi-tile (placeAt() sopra, oggi solo
  // `eolico`): niente da disegnare, solo un placeholder che deve restare
  // bloccato — stesso ciclo `usedIds` di sopra.
  blockedSlots = (data.blockedSlots ?? []).map((s) => ({ x: s.x, y: s.y }));
  for (const s of blockedSlots) {
    const ph = placeholders.find((p) => !usedIds.has(p.id) && p.x === s.x && p.y === s.y);
    if (ph) { ph.consumed = true; usedIds.add(ph.id); }
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
// Qui: una fase, un colore, moltiplicato per ogni sprite nel ciclo di
// disegno (non piu' un uniform di shader globale, vedi sotto su
// `stepLights()`/mulTint(): i decori "luce" devono poter saltarlo).
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
// [C] sooool/Alarm_4.gml: `aura.dawn` — lo stesso confine netto di isNight()
// sopra, per la produzione elettrica di `solare` (stepSolarProduction()).
function isDawn(t) {
  return PHASES[phaseIndexAt(t).i].name === "alba";
}

// --------------------------------------------------------------- luci
// Le "luci" (bagliore finestre di chies/casa/industria, aggiunte da
// addDecor() come decori con `_selfLit: true`) non funzionavano per due
// motivi, entrambi da src/objects/cddvd|d111|di11b (STUDIO.md §5.3
// "notte_target"), studiati insieme:
//  1. Restavano sempre alla stessa tinta del resto del mondo: di notte la
//     tinta ambientale (`PHASES` sopra) le scuriva tanto quanto tutto il
//     resto, invece di restare accese sopra al buio — un bagliore che si
//     spegne insieme alla luce ambientale non serve a niente. L'originale
//     risolveva lo stesso problema con un depth piu' vicino di 1 rispetto
//     al proprio edificio (`addDecor()` sopra, `depth = -y - 1`) per
//     "saltare" davanti a qualunque cosa scurisse la scena; qui l'analogo
//     e' saltare la moltiplicazione per la tinta ambientale nel ciclo di
//     disegno (vedi mulTint() e il layer mondo piu' sotto) — stesso
//     effetto, un filtro colorato che i decori luce attraversano intatti
//     invece di esserne oscurati.
//  2. Comparivano/sparivano di scatto: l'originale anima la transizione con
//     uno sprite dedicato (es. "crclx", un frame per tick, giocato
//     all'indietro per accendersi/in avanti per spegnersi — vedi
//     tools/23_atlas.py per perche' non lo impacchettiamo pixel per pixel:
//     e' una dissolvenza in alpha dello stesso disegno, non un effetto
//     diverso frame per frame). Qui la stessa dissolvenza e' un fade in
//     alpha sullo sprite fermo gia' caricato, con la stessa durata
//     (200 tick, cddvd/Step.gml — la piu' comune fra i vari decori).
const TICK = 1 / 60;              // room_speed dell'originale, stessa unita' di buildings.js
const LIGHT_FADE = 200 * TICK;
const UPSIGN_DEPTH = -9001;        // [C] upsign12/_object.json: depth = -9001
function stepLights(entities, dt, night, r12) {
  // [C] cddvd/Step.gml: sotto questa soglia di elettricita' la luce non si
  // accende (o si spegne di colpo se lo era gia', "bout" nel decompilato —
  // qui la stessa soglia, ma il fade la spegne comunque con una dissolvenza
  // invece che di scatto: una semplificazione [I], non cambia il succo).
  const lit = night && r12.ele > 3;
  for (const d of entities) {
    if (!d._selfLit) continue;
    // `_fadeTicks` (grattacielo, buildings.js/addDecor()): `0` e' il fanale
    // rosso in cima ("m3rd"), che nel decompilato scatta di colpo invece di
    // dissolversi — nessun'altra luce del motore lo fa, quindi resta un
    // caso a parte invece di una LIGHT_FADE di durata zero (divisione per
    // zero). Le altre finestre (m3l1..9) hanno ognuna la propria durata;
    // tutto il resto del motore lascia `_fadeTicks` undefined e riusa LIGHT_FADE.
    if (d._fadeTicks === 0) { d._alpha = lit ? 1 : 0; continue; }
    const fade = d._fadeTicks != null ? d._fadeTicks * TICK : LIGHT_FADE;
    d._lightT = Math.max(0, Math.min(fade, d._lightT + (lit ? dt : -dt)));
    d._alpha = d._lightT / fade;
  }
}

// [I] I tre tipi di fumo (centrali/smoke.js, scia missile-gatling/
// projectiles.js, scia aerei/threats.js) muoiono tutti di scatto
// nell'originale (`action_kill_object` a fine vita) — qui invece si
// dissolvono: alpha piena fino a SMOKE_FADE_FRAC di vita rimasta, poi un
// fade lineare fino a 0 esattamente quando l'oggetto verrebbe comunque
// scartato (stepSmoke()/stepSmoko()/stepAerSmoke()), cosi' non serve
// allungarne la vita per vedere la dissolvenza.
const SMOKE_FADE_FRAC = 0.35;
function fadeAlpha(t, life) {
  const remaining = (life - t) / life;
  return Math.max(0, Math.min(1, remaining / SMOKE_FADE_FRAC));
}

/** Moltiplica una tinta 0xRRGGBB per una tinta ambientale [r,g,b] in 0..1. */
function mulTint(base, rgb) {
  const r = Math.round(((base >> 16) & 255) * rgb[0]);
  const g = Math.round(((base >> 8) & 255) * rgb[1]);
  const b = Math.round((base & 255) * rgb[2]);
  return (r << 16) | (g << 8) | b;
}

/** Test punto-in-rettangolo sul bounding box di un frame (sprite/w/h/ox/oy)
 * — l'hit test "leggero" usato per la maggior parte degli oggetti cliccabili. */
function inFrameRect(wx, wy, x, y, f) {
  const x0 = x - f.ox, y0 = y - f.oy;
  return wx >= x0 && wx <= x0 + f.w && wy >= y0 && wy <= y0 + f.h;
}

/** Test punto-in-rombo, centrato sul bounding box di un frame: i placeholder
 * sono disegnati come sprite romboidali ("phold", il rombo viola —
 * Mouse_MouseEnter.gml originale), non rettangolari — un tocco/hover nei
 * quattro angoli vuoti del bounding box (fuori dal rombo vero) non deve
 * colpirli. Il decompilato usa la maschera di collisione precisa dello
 * sprite (`mask_sprite`), non il suo bbox: qui approssimata con un rombo
 * invece di un rettangolo pieno — molto piu' fedele alla sagoma vera per un
 * costo quasi identico (un confronto in piu' rispetto all'AABB). */
function inFrameDiamond(wx, wy, x, y, f) {
  const x0 = x - f.ox, y0 = y - f.oy;
  const cx = x0 + f.w / 2, cy = y0 + f.h / 2;
  const hw = f.w / 2, hh = f.h / 2;
  if (hw <= 0 || hh <= 0) return false;
  return Math.abs(wx - cx) / hw + Math.abs(wy - cy) / hh <= 1;
}

// ---------------------------------------------------------------- input
// [C] src/objects/placeholder/Mouse_LeftPressed.gml (rami selec==6/70):
// `scroller2.goer = 0` ferma lo scorrimento della camera per tutta la durata
// del gesto di piazzamento a trascinamento — qui basta ignorare `onDrag`
// finche' `armedPlacement` e' vivo, invece di introdurre un vero stato
// "scrolling disabilitato" nella camera.
input.onDrag = (dx, dy) => { if (armedPlacement) return; userMoved = true; cam.panByScreen(dx, dy); };
// Piazzamento a trascinamento (palazzo/museo, armPlacement()/resolvePlacement()
// sopra): arma alla PRESSIONE (non al tocco — `onTap` scatta solo al
// rilascio, e qui l'origine e il lotto diagonale distano ~100px, ben oltre
// la soglia di tap: `onTap` non vedrebbe mai questo gesto come tale). Un
// tocco che comincia sopra la UI (bottoni del selettore) non deve armare
// niente sotto di essa — stesso spirito di `uiHitTest` per il pan.
input.onPointerDown = (sx, sy) => {
  if (armedPlacement) return;
  for (const btn of uiButtons) {
    if (sx >= btn.x && sx <= btn.x + btn.w && sy >= btn.y && sy <= btn.y + btn.h) return;
  }
  const def = selectedType ? BUILDING_TYPES[selectedType] : null;
  if (!def?.diagonalPlacement) return;
  const w = cam.screenToWorld(sx, sy);
  const ph = placeholders.find((p) => !p.consumed && inFrameDiamond(w.x, w.y, p.x, p.y, p._f));
  if (!ph) return;
  const err = armPlacement(ph, selectedType);
  message = err ?? "trascina verso un lotto libero adiacente";
  messageT = 3;
};
input.onPointerUp = (sx, sy) => resolvePlacement(sx, sy);
// Il fattore si applica a `targetZoom`, non a `zoom` (che insegue con un
// filo di ritardo, vedi Camera.update()): cosi' una rotellata mentre lo
// zoom sta ancora animando accumula sul bersaglio invece di "strappare"
// indietro dal valore corrente, ancora a meta' strada.
// Su desktop `input.onZoom` resta `null` (Input fa gia' `this.onZoom?.()`,
// nessuna chiamata a vuoto): rotella e pinch — quest'ultimo comunque mai
// generato da un mouse — non toccano piu' la camera, che resta fissa al
// suo zoom pixel-perfect impostato in resize().
if (isMobile) {
  input.onZoom = (f, ax, ay) => { userMoved = true; cam.setZoom(cam.targetZoom * f, ax, ay); };
}
// Selettore edificio scorrevole: su schermi stretti in portrait la riga di
// bottoni (fino a 13 nel menu "edifici", vedi OTHER_BUILDINGS piu' sotto) e'
// piu' larga dello schermo — senza scroll, quelli oltre il bordo destro non
// sono ne' visibili ne' toccabili (segnalato dall'autore). `uiRowBounds` e'
// la sagoma della riga corrente (ricalcolata ad ogni frame dal disegno,
// piu' sotto), usata da `input.uiHitTest` per capire se un gesto e' iniziato
// sopra la UI invece che sulla mappa: solo allora scorre `uiScrollX` invece
// di far partire un pan di camera. Solo su mobile: su desktop la riga sta
// gia' intera nella finestra (STUDIO.md "zero zoom"), niente da scorrere.
let uiScrollX = 0;
let uiRowBounds = null;
if (isMobile) {
  input.uiHitTest = (sx, sy) => !!uiRowBounds
    && sx >= uiRowBounds.x0 && sx <= uiRowBounds.x1
    && sy >= uiRowBounds.y0 && sy <= uiRowBounds.y1;
  input.onUIDrag = (dx) => { uiScrollX -= dx; };
}
let picked = null;
let message = "";
let messageT = 0;
// Gesto di piazzamento a trascinamento in corso (palazzo/museo, buildings.js
// `def.diagonalPlacement`) — vedi armPlacement()/resolvePlacement() sotto.
// null quando nessun gesto e' armato (il caso comune, per ogni altro tipo).
let armedPlacement = null;   // { type, origin, targets: [{placeholder, axis}] }
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

// I piazzabili del menu (menoo 1) che casa/industria non coprono da sole:
// letti da src/objects/pu3|pu4prov|pu5prov|pu6|pu7|pudj|pusolare|pugatling|
// puvillone|pumediat (sprite normale/selezionato, e il `selec` con cui
// ciascuno riconosce di essere quello scelto) incrociati con
// src/objects/placeholder/Mouse_LeftReleased.gml per i costi reali, dove
// quel file li dichiara esplicitamente (`cost: null` altrove — non un
// valore a caso, proprio "non letto"). Alcuni (parco/missile/solare/club/
// villa/gatling/laser/eolico, via BUILDING_TYPES in buildings.js) sono
// ormai piazzabili per davvero;
// gli altri restano un segnaposto statico — selezionabili ed evidenziati
// come qualunque tipo vero, ma toccare un placeholder con uno di questi
// ancora senza `BUILDING_TYPES[type]` mostra un messaggio invece di
// costruire (vedi `def` sotto, in `input.onTap`). Questo array resta
// comunque la fonte unica di sprite/selec/costo per il bottone, vero o
// segnaposto che sia — non toglierne una riga quando il tipo diventa
// implementato. L'originale li affianca in ordine diverso (STUDIO.md §9:
// pu7 e' unlocked a parte, pu4prov/pu5prov condividono uno slot con altri
// quattro bottoni mutuamente esclusivi non tracciati qui): l'ordine qui e'
// solo "tutti visibili, uno per slot", non quello esatto.
const OTHER_BUILDINGS = [
  { type: "parco", selec: 7, spr: "p7", sprSel: "p7ss", label: "Parco", cost: 500 },
  { type: "missile", selec: 3, spr: "p3", sprSel: "p3ss", label: "Lanciamissili", cost: 5000 },
  { type: "eolico", selec: 4, spr: "p4", sprSel: "p4ss", label: "Pala eolica", cost: 50000 },   // ora vero, BUILDING_TYPES.eolico
  { type: "laser", selec: 5, spr: "p5", sprSel: "p5ss", label: "Laser", cost: 20000 },
  // "Grattacielo" era il nome (mai verificato) di una versione precedente
  // di questa riga: **[C]** src/objects/level2palazz (il popup "livello 2
  // sbloccato" agganciato a `pu6/Mouse_MouseEnter.gml`, stesso schema di
  // level2club/level2gatling/level2sol per club/gatling/solare) chiama
  // l'edificio "palazz[o]" — vedi il commento su BUILDING_TYPES.palazzo.
  // Il nome "Grattacielo" e' finito altrove: e' l'etichetta scelta ora per
  // `BUILDING_TYPES.grattacielo` (STAR_BUILDINGS sotto, la terza stella),
  // un edificio completamente diverso da questo — nessuna relazione se non
  // l'omonimia mai risolta a suo tempo.
  { type: "palazzo", selec: 6, spr: "p6", sprSel: "p6ss", label: "Palazzo", cost: 6000 },   // ora vero, BUILDING_TYPES.palazzo — piazzamento a trascinamento, vedi armPlacement()
  { type: "club", selec: 60, spr: "pdj", sprSel: "pdjss", label: "Club", cost: 3500 },   // ora vero, BUILDING_TYPES.club
  { type: "solare", selec: 61, spr: "psolare", sprSel: "psolaress", label: "Pannelli solari", cost: 1000 },
  { type: "gatling", selec: 62, spr: "pgatling", sprSel: "pgatlingss", label: "Mitragliatrice", cost: 10000 },
  { type: "villa", selec: 63, spr: "pvilla", sprSel: "pvillass", label: "Villa", cost: 7500 },
  { type: "museo", selec: 70, spr: "pmuseo", sprSel: "pmuseoss", label: "Museo", cost: 35000 },   // ora vero, BUILDING_TYPES.museo — piazzamento a trascinamento, vedi armPlacement()
  // [C] STUDIO.md "cosa manca": lo strumento vero di demolizione/
  // riparazione (selec==11), mai ricostruito — la distruzione oggi e'
  // immediata (destroyBuilding()) invece di passare da questo strumento.
  { type: "ruspa", selec: 11, spr: "ru", sprSel: "russ", label: "Ruspa", cost: null },
];
for (const b of OTHER_BUILDINGS) SELEC_BY_TYPE[b.type] = b.selec;
const BUILDING_LABEL = Object.fromEntries(OTHER_BUILDINGS.map((b) => [b.type, b.label]));

// Edifici "stella" (STUDIO.md, "monumento"/"banca"): ricompense di
// traguardo, MAI un bottone statico come il resto del menu — [C] `stella1`/
// `stella2` (src/objects) non stanno nella room, ne' nel pannello: sono
// create al volo da `pu1/Step.gml` solo al superamento di una soglia (mai
// prima), ancorate a un offset fisso sopra `pu1` invece che dentro la riga
// scorrevole. **[I]** Qui, per riuso diretto dell'infrastruttura di
// `OTHER_BUILDINGS`/`uiButtons` gia' esistente, compaiono/scompaiono nella
// STESSA riga scorrevole invece di fluttuare a parte — stesso risultato
// osservabile (appaiono solo a soglia raggiunta), non lo stesso layout a
// pixel. `unlocked()` legge `pu1/Step.gml` riga per riga (operatori 2=">",
// 4=">=", gia' stabiliti nel resto del progetto): monum a `distrutti>49`
// (aerei abbattuti, STUDIO.md/state.js), banca a `chies.level>1 &&
// pop>=3000`. Restano nascosti una volta gia' costruiti — [I]:
// nell'originale un flag "gia' assegnato" mai identificato con certezza
// ottiene lo stesso risultato (il bottone non ricompare per un secondo
// esemplare), qui basta controllare se esiste gia' un edificio di quel
// tipo.
const STAR_BUILDINGS = [
  {
    type: "monum", selec: 71, spr: "sta1", sprSel: "sta1s", label: "Monumento", cost: 20000,
    unlocked: () => (r12.distrutti ?? 0) > 49 && !buildings.some((b) => b.type === "monum"),
  },
  {
    type: "banca", selec: 72, spr: "sta2", sprSel: "sta2s", label: "Banca", cost: 0,
    unlocked: () => {
      const chies = buildings.find((b) => b.type === "chies");
      return !!chies && chies.level > 1 && r12.pop >= 3000 && !buildings.some((b) => b.type === "banca");
    },
  },
  // Terza stella: `grattacielo` (buildings.js — corregge la conclusione
  // precedente che la scambiava per un secondo sblocco di eolico, vedi il
  // commento su BUILDING_TYPES.grattacielo). **[C]** `banca1_light/
  // Create.gml` arma `stella3` alla PRIMA banca costruita (dietro due flag
  // "run once", stesso idioma di `distrutti` per il monumento) — non una
  // soglia a parte come le prime due stelle: `unlocked()` qui legge
  // semplicemente "esiste gia' una banca".
  {
    type: "grattacielo", selec: 82, spr: "sta3", sprSel: "sta3s", label: "Grattacielo", cost: 200000,
    unlocked: () => buildings.some((b) => b.type === "banca") && !buildings.some((b) => b.type === "grattacielo"),
  },
];
for (const b of STAR_BUILDINGS) { SELEC_BY_TYPE[b.type] = b.selec; BUILDING_LABEL[b.type] = b.label; }

/** Raccoglie una moneta e fa partire la sua "bolla" (coinPops sopra) —
 * unico punto d'ingresso condiviso da input.onTap (tap/click, sotto) e
 * dalla raccolta automatica al passaggio del mouse (stepCoinHover() nel
 * loop principale), cosi' entrambi i gesti danno la stessa risposta
 * visiva. */
function collectCoinAt(item) {
  coinPops.push({ x: item.x, y: item.y, t: 0 });
  collectCoin(coins, item, r12);
}

input.onTap = (sx, sy) => {
  // Un gesto di piazzamento a trascinamento e' gia' stato armato da
  // `input.onPointerDown` per lo stesso tocco (vedi sopra): il rilascio lo
  // risolve gia' `input.onPointerUp` (resolvePlacement()), che scatta
  // comunque anche quando questo tap viene ignorato — nessuna doppia
  // gestione dello stesso rilascio.
  if (armedPlacement) return;
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
  // edifici — inclusa chies, ora che vive li' anche lei — e le casse di
  // risorse lasciate cadere dalle mongolfiere), a prescindere dal depth; la
  // seconda, di fallback, e' il vecchio picking "per z-order" usato solo
  // per ispezionare la scena nell'HUD di debug. Senza la prima passata
  // `air2` (il terreno/strade sull'intera mappa, depth -1, `mask_sprite:
  // null` nel decompilato: non ha MAI ricevuto click nell'originale)
  // coprirebbe chies (depth 0, per y) e la renderebbe intoccabile.
  //
  // Le casse (obj: "loot") e le monete (obj: "coin") sono qui invece che nel
  // fallback perche' nell'originale si raccolgono al passaggio del mouse
  // (bar*/sold*/Mouse_MouseEnter.gml), non con un click — un tap va quindi
  // trattato come il gesto piu' "sicuro" possibile, non come l'ultima
  // risorsa dopo aver controllato tutto il resto per z-order. "upsign" (il
  // segnale verde di potenziamento, pushato piu' sotto insieme agli altri
  // edifici) e' qui per lo stesso motivo di "building": va intercettato a
  // prescindere dal depth, non solo per z-order — e vince comunque contro
  // l'edificio sotto di lui perche' il suo depth (UPSIGN_DEPTH, sempre in
  // primo piano) e' piu' negativo.
  for (const it of frameList) {
    if (it.obj !== "placeholder" && it.obj !== "building" && it.obj !== "loot"
      && it.obj !== "coin" && it.obj !== "upsign") continue;
    // placeholder: maschera romboidale (inFrameDiamond sopra), non l'AABB —
    // stessa ragione della raccolta hover piu' sotto. Tutto il resto
    // (edifici, casse, monete, segnale di potenziamento) resta sul
    // bounding box rettangolare, piu' leggero e gia' fedele alla loro sagoma.
    const hit = it.obj === "placeholder"
      ? inFrameDiamond(w.x, w.y, it.x, it.y, it._f)
      : inFrameRect(w.x, w.y, it.x, it.y, it._f);
    if (hit && (!picked || it.depth < picked.depth)) picked = it;
  }
  if (!picked) for (let i = frameList.length - 1; i >= 0; i--) {
    const it = frameList[i];
    // il decoro (cddvd*), l'impalcatura di cantiere, le auto (honda_facile_1/2),
    // i tappi dei semafori, nuvole/uccelli e i pedoni sono puramente
    // visivi: nell'originale non avevano eventi Mouse propri (i pedoni
    // solo eventi Collision, non replicati — vedi pedestrians.js), quindi
    // qui non devono "rubare" il tocco.
    if (!it._f || it.obj === "decor" || it.obj === "scaffold" || it.obj === "car"
      || it.obj === "semaphore" || it.obj === "cloud" || it.obj === "bird" || it.obj === "pedestrian") continue;
    // stessa distinzione rombo/rettangolo della prima passata sopra — un
    // placeholder che arriva fin qui (nessun oggetto interattivo colpito
    // nella prima passata) deve comunque rispettare la sua sagoma vera, non
    // il bbox pieno.
    const hit = it.obj === "placeholder"
      ? inFrameDiamond(w.x, w.y, it.x, it.y, it._f)
      : inFrameRect(w.x, w.y, it.x, it.y, it._f);
    if (hit) {
      picked = it;
      break;
    }
  }
  if (!picked) return;
  // palazzo/museo: `input.onPointerDown`, per questo stesso tocco, ha gia'
  // provato ad armare il piazzamento (armPlacement()) e ha gia' mostrato un
  // messaggio — riuscito ("trascina verso...", ma allora `armedPlacement`
  // e' vivo e la guardia in cima a questa funzione e' gia' uscita) o
  // fallito (mon insufficienti/nessun lotto adiacente: qui sotto,
  // `armedPlacement` e' rimasto `null`). In entrambi i casi il messaggio
  // gia' mostrato e' quello giusto: non va sovrascritto col reset generico
  // sotto, e placeAt() (a un lotto solo) non va comunque chiamato.
  if (picked.obj === "placeholder" && !picked.consumed && BUILDING_TYPES[selectedType]?.diagonalPlacement) return;
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
    const b = picked.ref;
    // [C] rocket_launcher|lasergun/Mouse_LeftPressed.gml (`manualFire` in
    // buildings.js — gatlinggun non ne ha uno vero): un tocco su una
    // torretta finita non apre un cantiere (nessuna delle tre ha
    // potenziamenti — tryStartUpgrade ci direbbe solo "livello massimo") —
    // fa partire un colpo contro il bersaglio che il cannone sta gia'
    // inseguendo (game/src/projectiles.js, fireTurretManual()). Sotto
    // cantiere invece resta tryStartUpgrade come per qualunque edificio
    // (che gia' risponderebbe da solo "cantiere gia' in corso").
    if (!b.construction && BUILDING_TYPES[b.type]?.manualFire) {
      const fired = fireTurretManual(b, projectiles, explosions, r12, threats, trails);
      message = fired ? "fuoco!"
        : !b.aimTarget ? "nessun bersaglio in portata"
        : b.type === "laser" && r12.ele < 200 ? "energia insufficiente"
        : "cannone in ricarica";
    } else {
      const err = tryStartUpgrade(b, r12);
      message = err ?? "cantiere avviato";
    }
    messageT = 3;
  } else if (picked.obj === "loot") {
    const item = picked.ref;
    collectLoot(loot, item, r12);
    message = `+${item.amount} ${item.key}`;
    messageT = 3;
    picked = null;   // raccolta, non c'e' piu' niente da tenere selezionato
  } else if (picked.obj === "coin") {
    const item = picked.ref;
    collectCoinAt(item);
    message = `+${item.amount} ${item.kind ?? "mon"}`;
    messageT = 3;
    picked = null;
  } else if (picked.obj === "upsign") {
    // [C] upsign12|23/Mouse_LeftPressed.gml: la stessa cosa che "building"
    // gia' fa tap-ovunque-sull'edificio (tryStartUpgrade gia' controlla
    // soglia e costo) — qui e' solo il bersaglio VISIBILE e prioritario
    // quando il potenziamento e' davvero pronto.
    const err = tryStartUpgrade(picked.ref, r12);
    message = err ?? "cantiere avviato";
    messageT = 3;
    picked = null;
  }
};

// ---------------------------------------------------------------- loop
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w; canvas.height = h;
  }
  cam.resize(canvas.clientWidth, canvas.clientHeight);
  if (!isMobile) {
    // Desktop: zero zoom, solo pixel-perfect — lo zoom non insegue mai un
    // "fit to screen" frazionario (che sfumerebbe gli sprite), resta fisso
    // al rapporto texel:pixel esatto per tutta la sessione.
    cam.minZoom = cam.maxZoom = pixelPerfectZoom();
    cam.setZoomImmediate(cam.minZoom);
  } else if (canvas.clientWidth > 0) {
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
  // Math.max(0, ...): il timestamp di requestAnimationFrame puo' precedere
  // di poco l'ultimo `last` (performance.now() catturato prima di registrare
  // il callback) — soprattutto al primissimo frame, o con WebGL software —
  // un dt negativo qui si propagherebbe a tutti i timer (c.frame incluso,
  // rendendo frameFor() con un indice negativo e un array out-of-bounds).
  const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
  last = now;
  phaseT += dt;
  resize();
  cam.update(dt);
  const night = isNight(phaseT);
  const dawn = isDawn(phaseT);

  // --- simulazione: cantieri, economia, meteo, traffico, luci
  stepConstructions(buildings, dt, r12, spawnDecor, addDecor);
  stepProduction(buildings, dt, r12);
  stepSolarProduction(buildings, dt, r12, night, dawn);
  stepWindProduction(buildings, dt, r12);
  // Fumo delle centrali (game/src/smoke.js): dopo stepProduction(), cosi'
  // "oil>0" gia' rispecchia il consumo di questo frame, come per le monete
  // blu sotto (stesso ordine gia' scelto per stepCoinSpawner()).
  stepSmokeSpawner(buildings, smoke, dt, r12);
  stepSmoke(smoke, dt);
  stepGrowth(buildings, dt, r12, (b) => pedestrians.push(spawnPedestrian(b.x, b.y)));
  stepConsumption(buildings, dt, r12, night);
  stepWeather(r12, dt, scene.name === "match");
  stepStormDamage(buildings, dt, r12);
  tickR12(r12, dt, buildings);
  stepCars(cars, dt, r12, night);
  carmakerT += dt;
  while (carmakerIdx < CARMAKER_SCHEDULE.length && carmakerT >= CARMAKER_SCHEDULE[carmakerIdx].at) {
    cars.push(spawnCar(CARMAKER_SCHEDULE[carmakerIdx].type, night));
    carmakerIdx++;
  }
  stepLights(decorEntities, dt, night, r12);
  stepSemaphores(semaphores, dt);
  stepAtmosphere(atmo, dt, !!r12.storm);
  stepPedestrians(pedestrians, dt);
  // Mongolfiere (game/src/balloons.js): risorse/spia a intervalli regolari
  // (stepBalloonSpawner, equivalente di r12/Alarm_1.gml) + il pacco di
  // cantiere che casa/industria si porta dietro (spawnato da placeAt(),
  // solo avanzato qui).
  stepBalloonSpawner(r12, balloons, dt, buildings);
  stepBalloons(balloons, loot, dt, r12);
  stepLoot(loot, dt);
  // I pulsanti blu delle monete (game/src/coins.js): casa1|2|3/Alarm_4.gml,
  // dopo che stepConstructions() sopra ha gia' avanzato ava/hap di questo frame.
  stepCoinSpawner(buildings, coins, dt, r12);
  stepCoins(coins, dt, r12);
  // Raccolta al passaggio del mouse — [C] sold*/soldbio/Mouse_MouseEnter.gml
  // usa davvero un hover, non un click (coins.js, collectCoin() sopra il tap
  // esplicito per touch/desktop): un vero hover pero' esiste solo col mouse
  // fermo, non trascinando col dito (`hoverPointerType`, game/src/input.js) —
  // altrimenti panoramicare la mappa col dito raccoglierebbe monete di
  // striscio, un gesto che l'originale non prevede su touch.
  if (input.hover && input.hoverPointerType === "mouse") {
    const hw = cam.screenToWorld(input.hover.x, input.hover.y);
    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      const f = frameFor(c.spr);
      if (!f) continue;
      const x0 = c.x - f.ox, y0 = c.y - f.oy;
      if (hw.x >= x0 && hw.x <= x0 + f.w && hw.y >= y0 && hw.y <= y0 + f.h) collectCoinAt(c);
    }
  }
  for (let i = coinPops.length - 1; i >= 0; i--) {
    coinPops[i].t += dt;
    if (coinPops[i].t >= COIN_POP_LIFE) coinPops.splice(i, 1);
  }
  stepConstructionBalloons(constructionBalloons, constructionBoxes, dt);
  stepConstructionBoxes(constructionBoxes, dt);
  // Minacce vere (game/src/threats.js): il regista fa nascere aerei/
  // bombardieri/zeppelin man mano che le spie ignorate si accumulano
  // (contatori alzati in stepBalloons() sopra), poi ognuno vola, bombarda,
  // e sparisce da solo.
  stepThreatSpawner(r12, threats, dt);
  stepThreats(threats, bombs, explosions, dt, r12, aerSmoke, debris);
  stepAerSmoke(aerSmoke, dt);
  stepDebris(debris, explosions, dt);
  stepBombs(bombs, explosions, buildings, dt, r12);
  stepExplosions(explosions, dt);
  // Unico controllo per tutte le fonti di danno di questo frame (fulmini,
  // STUDIO.md "le tempeste diventano reali" + bombe appena sganciate sopra).
  for (const b of buildings) if (!b.construction && b.life <= 0) destroyBuilding(b);
  if (r12.alertT > 0) r12.alertT -= dt;
  // Torrette (game/src/buildings.js, stepTurretAim): inseguono l'oggetto
  // volante piu' vicino fra le mongolfiere di risorse/spia (`balloons`,
  // game/src/balloons.js — non il pacco di cantiere ne' le casse/avanzi) e
  // le minacce vere (`threats`: aerei/bombardieri/zeppelin, game/src/
  // threats.js) — [I] non piu' le auto decorative (`cars`): non sono
  // oggetti volanti, vedi il commento su stepTurretAim() in buildings.js.
  stepTurretAim(buildings, balloons, threats);
  // Il fuoco vero (game/src/projectiles.js): dopo la mira, cosi' spara
  // gia' nella direzione appena calcolata (b.aimAngle).
  stepTurretFire(buildings, threats, dt, projectiles, explosions, r12, trails);
  stepProjectiles(projectiles, balloons, threats, loot, explosions, trails, dt);
  stepSmoko(trails, dt);
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
    // Il segnale verde di potenziamento (obj: "upsign") — [C] upsign12|23/
    // upcrc12|23/upind12|23, tutti la stessa icona "upico" (un pin verde
    // con una freccia in su): compare quando il potenziamento e' davvero
    // sbloccato (stessa soglia gia' letta da tryStartUpgrade()) e nessun
    // cantiere e' gia' in corso. Depth -9001, un filo piu' avanti delle
    // monete blu (-9000): [C] upsign12/_object.json, sempre in primo piano.
    if (!b.construction && upgradeUnlocked(b, r12)) {
      // `_selfLit`: come le luci delle finestre (stepLights() sopra), un
      // segnale simbolico dell'interfaccia — deve restare leggibile anche di
      // notte, non scurirsi con la tinta ambientale come un edificio vero.
      dynamic.push({ obj: "upsign", ref: b, x: b.x, y: b.y, depth: UPSIGN_DEPTH, _f: frameFor("upico"), _selfLit: true });
    }
  }
  for (const d of decorEntities) dynamic.push(d);
  // Ruderi (destroyBuilding() sopra): niente da avanzare ogni frame (non si
  // muovono, non cambiano sprite) — solo da disegnare, come il resto del
  // decoro permanente.
  for (const ru of ruins) dynamic.push(ru);
  // Auto decorative (game/src/cars.js): x/y/sprite/frame gia' avanzati da
  // stepCars() sopra — `c.frame` anima per davvero le svolte (STUDIO.md
  // "le auto sterzano davvero"), frameFor() lo ritaglia da solo sull'ultimo
  // frame disponibile per gli sprite a posa singola.
  for (const c of cars) {
    dynamic.push({ obj: "car", x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr, Math.floor(c.frame)), _tint: c.tint });
  }
  // Semafori (game/src/semaphores.js): il palo ("se") e' gia' in
  // staticWorld, qui va solo il tappo colorato quando e' acceso — `spr`
  // resta `null` durante i vuoti fra un colore e l'altro, niente da
  // disegnare in quei frame (a differenza delle luci fisse non c'e'
  // nessuna dissolvenza da animare, l'originale passa a "empty" di
  // scatto). `_selfLit` come le altre luci: un semaforo e' acceso anche
  // di giorno, non deve scurirsi con la tinta ambientale.
  for (const s of semaphores) {
    if (!s.spr) continue;
    dynamic.push({ obj: "semaphore", x: s.x, y: s.y, depth: s.depth, _f: frameFor(s.spr), _selfLit: true });
  }
  // Nuvole e uccelli (game/src/atmosphere.js): x/y spesso ben fuori dai
  // confini della room (nascono appena fuori mappa, gli uccelli molto piu'
  // sotto) — il filtro di frustum culling nel ciclo di disegno piu' sotto
  // li scarta gia' da solo quando non sono in vista, niente da fare qui.
  // Fumo delle centrali (game/src/smoke.js): stessa formula di depth
  // dell'originale (`depth = -y - 150/-200`, smoke_ind/smoke_ind_2 — vedi
  // CHIMNEYS in smoke.js), ricalcolata qui perche' il fumo si sposta (a
  // differenza di monete/segnali, fissi sul loro edificio). L'animazione a
  // 70 frame di cc1/cc2/cc3 gira per davvero (frameIdx), oltre e non invece
  // dell'ingrandimento uniforme (_scale) — vedi smoke.js.
  for (const p of smoke) {
    const frameIdx = Math.min(SMOKE_FRAME_COUNT - 1, Math.floor(p.t / TICK));
    dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: -p.y - p.family, _f: frameFor(p.spr, frameIdx), _scale: p.scale, _alpha: fadeAlpha(p.t, SMOKE_LIFE) });
  }
  for (const c of atmo.clouds) dynamic.push({ obj: "cloud", x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr) });
  for (const b of atmo.birds) dynamic.push({ obj: "bird", x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr) });
  // Pedoni (game/src/pedestrians.js): x/y/depth gia' avanzati da
  // stepPedestrians() sopra.
  for (const p of pedestrians) dynamic.push({ obj: "pedestrian", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr) });
  // Mongolfiere (game/src/balloons.js): risorse/spia + le casse che
  // lasciano cadere (obj: "loot", l'unica cliccabile — vedi picking sotto)
  // + il pacco di cantiere di casa/industria.
  for (const b of balloons) dynamic.push({ obj: "balloon", x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr) });
  for (const l of loot) dynamic.push({ obj: "loot", ref: l, x: l.x, y: l.y, depth: l.depth, _f: frameFor(l.spr) });
  // Le monete (game/src/coins.js): "soldfade" anima per davvero (20 frame,
  // stesso schema delle svolte delle auto — frameFor legge il frame vero
  // invece di restare fermo al primo), "soldico" e' statica (un solo frame).
  for (const c of coins) {
    const frameIdx = c.auto ? Math.min(19, Math.floor(c.t / TICK)) : 0;
    // `_selfLit`: stesso motivo di "upsign" sopra — un pulsante simbolico
    // dell'interfaccia, non un oggetto di mondo, deve restare visibile
    // anche di notte invece di scurirsi con la tinta ambientale.
    dynamic.push({ obj: "coin", ref: c, x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr, frameIdx), _selfLit: true });
  }
  for (const m of constructionBalloons) dynamic.push({ obj: "balloon", x: m.x, y: m.y, depth: m.depth, _f: frameFor(m.spr) });
  for (const bx of constructionBoxes) dynamic.push({ obj: "decor", x: bx.x, y: bx.y, depth: bx.depth, _f: frameFor(bx.spr) });
  // Minacce vere (game/src/threats.js): nessuna e' cliccabile (nessun
  // evento Mouse nel decompilato), quindi "decor" come il pacco di
  // cantiere — non devono "rubare" il tap. `_scale` (solo per i caccia
  // "di sfondo", STUDIO.md "le minacce vere") e' la stessa `scale` gia'
  // supportata dal renderer per la GUI, qui riusata per la prima volta nel
  // mondo.
  for (const th of threats) dynamic.push({ obj: "decor", x: th.x, y: th.y, depth: th.depth, _f: frameFor(th.spr), _scale: th.scale });
  for (const bm of bombs) dynamic.push({ obj: "decor", x: bm.x, y: bm.y, depth: -bm.y, _f: frameFor(bm.spr) });
  // Pezzi di fusoliera del bombardiere abbattuto (game/src/threats.js,
  // spawnDebris): puramente cosmetici come le bombe, stessa regola di depth.
  for (const d of debris) dynamic.push({ obj: "decor", x: d.x, y: d.y, depth: -d.y, _f: frameFor(d.spr) });
  // Esplosioni (game/src/threats.js): "fica" ha 60 frame veri, uno stop-motion
  // da animare con ex.t (EXPLOSION_FRAME_COUNT) invece del solo frame 0 statico.
  for (const ex of explosions) {
    const frameIdx = Math.min(EXPLOSION_FRAME_COUNT - 1, Math.floor(ex.t / TICK));
    dynamic.push({ obj: "decor", x: ex.x, y: ex.y, depth: -4000, _f: frameFor(ex.spr, frameIdx), _scale: ex.scale });
  }
  // Il fuoco vero (game/src/projectiles.js): i razzi del lanciarazzi.
  for (const p of projectiles) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: -4000, _f: frameFor(p.spr) });
  // Fumo di scia (game/src/projectiles.js, spawnSmoko): depth -9000 fisso
  // come le monete blu ([C] smoko/_object.json), ma senza `_selfLit` — un
  // residuo di sparo, non un simbolo dell'interfaccia, si scurisce di
  // notte come qualunque altro decoro.
  for (const p of trails) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr), _alpha: fadeAlpha(p.t, SMOKO_LIFE) });
  // Scia di fumo degli aerei (game/src/threats.js, spawnAerSmoke): stessa
  // animazione a 70 frame vera di smoke.js (cc2/cc3), ferma sul posto e in
  // crescita (_scale) — a differenza della scia dei proiettili sopra.
  for (const p of aerSmoke) {
    const frameIdx = Math.min(AER_SMOKE_FRAME_COUNT - 1, Math.floor(p.t / TICK));
    dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr, frameIdx), _scale: p.scale, _alpha: fadeAlpha(p.t, AER_SMOKE_LIFE) });
  }
  // Il decoro luce (bagliore delle finestre, STUDIO.md §5.3 "notte_target")
  // non va piu' filtrato qui: `stepLights()` sopra gli tiene un'alpha
  // (`_alpha`, 0 di giorno) che il ciclo di disegno rispetta da solo — a
  // differenza di un filtro binario, cosi' la dissolvenza resta visibile
  // durante la transizione invece di sparire di scatto a meta' fade.
  frameList = staticWorld.filter((it) => !(it.obj === "placeholder" && it.consumed))
    .concat(dynamic).sort(sortWorld);

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
      if (inFrameDiamond(w.x, w.y, p.x, p.y, p._f)) { hoveredPh = p; break; }
    }
  }
  for (const p of placeholders) p._hovered = p === hoveredPh;

  r.beginFrame(canvas.width, canvas.height);
  const amb = ambientAt(phaseT);

  // --- layer mondo: segue la camera. La tinta giorno/notte e' moltiplicata
  // qui in JS invece che nello shader (u_ambient resta a [1,1,1,1], mai
  // toccato) perche' deve poter essere SALTATA per i decori luce
  // (`_selfLit`, vedi stepLights() sopra): sono l'unica cosa nel mondo che
  // deve restare alla propria luminosita' vera invece di scurirsi con tutto
  // il resto — altrimenti "si accendono" ma restano scure quanto la notte
  // intorno, indistinguibili (il bug segnalato: "le luci non funzionano").
  r.setProjection(cam.projection());
  let drawn = 0;
  const vw = cam.worldW, vh = cam.worldH;
  const l = cam.x - vw / 2, t = cam.y - vh / 2, rr = l + vw, bb = t + vh;
  for (const it of frameList) {
    if (it.obj === "placeholder" && !it._hovered && !it._armed) continue;
    const f = it._f;
    // Istanze senza sprite (`missingArt` sopra): nel decompilato sono
    // esattamente questo, non "arte persa" — controller/collisori invisibili
    // by design (`pepazzittecollider`: sprite:null, visible:0, STUDIO.md "27
    // istanze in match_easy, mai piu' ricostruite: fanno rimbalzare i
    // pedoni"; `scroller`/`scroller2`/`scriptfucker`: idem). Un tempo
    // disegnate come quadratino colorato semitrasparente per "vederle" in
    // sviluppo — ma quel marcatore restava visibile a QUALUNQUE giocatore,
    // sparsi per la mappa come se fossero un edificio/zona segnaposto
    // (segnalato dall'autore: "i rettangolini rossi intorno alla citta'").
    // `missingArt` in HUD resta il modo giusto per uno sviluppatore di sapere
    // quanti sono — un conteggio testuale, non qualcosa che finisce davanti
    // agli occhi di chi gioca soltanto.
    if (!f) continue;
    const x0 = it.x - f.ox, y0 = it.y - f.oy;
    if (x0 > rr || y0 > bb || x0 + f.w < l || y0 + f.h < t) continue;
    const base = (it.obj === "placeholder" && it._armed) ? ARMED_TINT : (it._tint ?? 0xffffff);
    const tint = it._selfLit ? base : mulTint(base, amb.rgb);
    r.draw(f, it.x, it.y, it._scale ?? 1, tint, it._alpha ?? 1);
    drawn++;
  }
  // Le "bolle" di raccolta moneta (coinPops sopra): un cerchio azzurro che
  // cresce e sfuma sul punto della moneta appena presa, in primo piano come
  // le monete stesse — niente tinta ambientale, per lo stesso motivo di
  // `_selfLit` qui sopra.
  for (const p of coinPops) {
    const k = p.t / COIN_POP_LIFE;
    const size = 20 + k * 46;
    r.draw(solidFrame(bubbleTex, size, size), p.x - size / 2, p.y - size / 2, 1, 0x4fc3f7, (1 - k) * 0.85);
  }
  // Linguetta di prezzo sul segnale di potenziamento (upsign) al passaggio
  // del mouse — [C] upsign12|23|45s|45d/Mouse_MouseEnter.gml, vedi
  // costTagSprite() in buildings.js. Solo mouse (come la raccolta monete
  // sopra): il touch non ha un vero hover senza contatto.
  if (input.hover && input.hoverPointerType === "mouse") {
    const hw = cam.screenToWorld(input.hover.x, input.hover.y);
    const upicoFrame = frameFor("upico");
    if (upicoFrame) for (const b of buildings) {
      if (b.construction || !upgradeUnlocked(b, r12)) continue;
      if (!inFrameRect(hw.x, hw.y, b.x, b.y, upicoFrame)) continue;
      const tagFrame = frameFor(costTagSprite(b.type, b.level - 1));
      if (tagFrame) {
        const scale = 0.5;
        // [C] upsign12/Mouse_MouseEnter.gml: offset -50 dal segnale — qui
        // dal bordo superiore vero dell'icona "upico" (`upicoFrame.oy`,
        // l'origine e' quasi in basso al centro), non da un numero fisso
        // scollegato dalla sua altezza reale.
        r.draw(tagFrame, b.x - (tagFrame.w * scale) / 2, b.y - upicoFrame.oy - 15, scale, 0xffffff, 1);
      }
      break;
    }
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
  // UI_MARGIN: risorse e bottoni non toccano piu' i bordi dello schermo —
  // da soli sarebbero sotto una status bar/notch su mobile o letteralmente
  // il primo pixel della finestra su desktop, non "dentro l'interfaccia"
  // come richiesto. Coordinate sempre arrotondate all'intero: un offset
  // frazionario (es. 8.3px) farebbe ricampionare lo sprite fra due pixel
  // fisici invece di allinearlo esattamente a uno solo — non piu'
  // "pixel perfect" nonostante lo zoom fisso di cui sopra.
  const UI_MARGIN = 8;
  const barFrame = frameFor("icone_oriz");
  const barX = UI_MARGIN, barY = UI_MARGIN;
  if (barFrame) r.draw(barFrame, barX, barY, 1, 0xffffff, 1);
  const stats = [[Math.round(r12.pop), 30], [Math.round(r12.oil), 142],
                 [Math.round(r12.ele), 228], [Math.round(r12.mon), 340]];
  for (const [value, x] of stats) drawText(r, fontMini, String(value), barX + x, barY + 10, 1, 0x000000, 1);

  // Selettore edificio: sostituisce la ruota di scelta `cre1..cre4` non
  // ancora ricostruita (STUDIO.md §6/§9), e replica la struttura a tre
  // righe alternate del pannello originale (`menoo`, vedi sopra) invece di
  // mostrarle tutte insieme. `pu1`/`pu2`/... hanno due sprite, normale e
  // "selezionato" (`pX`/`pXss`, scambiati in base a `r12.selec` — non e'
  // un tint, sono disegni diversi). Nell'originale erano ancorati a x fissi
  // (`action_move_to`/`N*global.sca`); qui si accodano da sinistra usando
  // la larghezza vera di ciascuno sprite (`GAP` px fra l'uno e l'altro).
  // `chies` non ha un bottone: non e' un tipo piazzabile (vedi sopra).
  // UI_SCALE: su mobile i bottoni sono piu' piccoli per far stare piu'
  // scroll orizzontale a schermo (STUDIO.md scorrevolezza qui sotto) — 0.6
  // e' il punto in cui ~13 bottoni (il menu "edifici" al completo) stanno
  // in 4-5 schermate di scroll su un telefono stretto (~360-430px)
  // restando comunque sopra i ~44px minimi comunemente raccomandati per un
  // tocco. Su desktop niente vincolo di tocco/scroll, ma alla dimensione
  // vera dello sprite (1) la barra risultava sproporzionata — [I] 0.7 a
  // richiesta, un compromesso fra leggibilita' e ingombro, non letto da
  // nessuna parte nel decompilato (`global.sca` scala l'intera UI
  // originale in un modo che non abbiamo ricostruito, STUDIO.md).
  const UI_SCALE = isMobile ? 0.6 : 0.7;
  const baseY = Math.round(canvas.clientHeight - UI_MARGIN);
  // I "tasti costruzione" (menoo 1: casa/industria/...) sono adiacenti,
  // GAP 0 — ogni sprite porta gia' con se' la propria base rettangolare
  // nera fino al bordo del proprio frame (bbox ritagliato sui pixel
  // opachi, tools/23_atlas.py): un GAP positivo apriva una fessura
  // trasparente fra una base e l'altra, spezzando quella che nell'originale
  // e' una sola barra nera continua sotto tutti i bottoni. Le altre due
  // righe (menoo 0/2: mano/gru/occhio, vista/zoom) non sono bottoni di
  // costruzione e restano staccate come prima.
  const GAP = menoo === 1 ? 0 : (isMobile ? 3 : 4);
  const row = menoo === 1
    // menoo 1 "edifici" ([C] pu1/Create.gml li crea tutti insieme): i due
    // veri (casa/industria) + il resto del menu, segnaposto (vedi sopra).
    ? [
        { kind: "building", type: "casa", spr: "p1", sprSel: "p1ss" },
        { kind: "building", type: "industria", spr: "p2", sprSel: "p2ss" },
        ...OTHER_BUILDINGS.map((b) => ({ kind: "building", type: b.type, spr: b.spr, sprSel: b.sprSel })),
        ...STAR_BUILDINGS.filter((b) => b.unlocked()).map((b) => ({ kind: "building", type: b.type, spr: b.spr, sprSel: b.sprSel })),
        { kind: "menu", menoo: 0, spr: "baccc", label: "Indietro" },
      ]
    : menoo === 2
    // menoo 2 "vista" ([C] eyebutton1/2/3 + zoom_plus/zoom_minus): le tre
    // non ricostruite restano segnaposto, zoom+/- richiamano cam.setZoom —
    // ma solo su mobile: su desktop lo zoom e' fisso (vedi isMobile sopra),
    // due bottoni per un'azione che non fa niente sarebbero solo confusione.
    ? [
        { kind: "info", spr: "eyee1", label: "Vista 1" },
        { kind: "info", spr: "eyee2", label: "Vista 2" },
        { kind: "info", spr: "eyee3", label: "Vista 3" },
        ...(isMobile ? [
          { kind: "zoom", spr: "zoomplus", label: "Zoom +", zoom: 0.8 },
          { kind: "zoom", spr: "zoomminus", label: "Zoom -", zoom: 1.25 },
        ] : []),
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
  // Prima passata, solo misure: serve la larghezza totale della riga PRIMA
  // di disegnare, per sapere quanto scroll orizzontale ha senso concedere
  // (uiScrollX va sempre bloccato all'intervallo [0, maxScroll] di QUESTA
  // riga, che cambia ad ogni `menoo` — una riga corta non deve poter
  // scorrere via lo scroll accumulato su una riga lunga vista prima).
  const frames = row.map((b) => frameFor(b.kind === "building" && selectedType === b.type ? b.sprSel : b.spr));
  let rowWidth = 0;
  for (const f of frames) if (f) rowWidth += f.w * UI_SCALE + GAP;
  if (rowWidth > 0) rowWidth -= GAP;
  const visibleW = Math.max(0, canvas.clientWidth - UI_MARGIN * 2);
  const maxScroll = Math.max(0, rowWidth - visibleW);
  uiScrollX = Math.min(Math.max(uiScrollX, 0), maxScroll);

  uiButtons = [];
  let rx = UI_MARGIN - uiScrollX;
  let rowTop = baseY;
  for (let i = 0; i < row.length; i++) {
    const b = row[i], f = frames[i];
    if (!f) continue;
    const w = f.w * UI_SCALE, h = f.h * UI_SCALE;
    // Bottoni scrollati fuori dai due lati non vengono ne' disegnati ne'
    // resi toccabili — stesso principio del culling gia' usato altrove nel
    // motore, qui serve anche a non lasciare hitbox "fantasma" fuori
    // schermo che intercetterebbero un tap sulla mappa sottostante.
    if (rx + w >= 0 && rx <= canvas.clientWidth) {
      r.draw(f, rx, baseY, UI_SCALE, 0xffffff, 1);
      uiButtons.push({ x: rx, y: baseY - h, w, h, ...b });
      rowTop = Math.min(rowTop, baseY - h);
    }
    rx += w + GAP;
  }
  // Banda di trascinamento per lo scroll: tutta la larghezza schermo, dal
  // bordo superiore della riga fino in fondo — non solo i pixel dei
  // bottoni, cosi' anche un dito che parte fra due bottoni o dopo l'ultimo
  // (schermo non del tutto riempito) scorre la riga invece di spostare la
  // mappa sotto. Nulla da intercettare se la riga sta gia' tutta a schermo.
  uiRowBounds = (isMobile && maxScroll > 0)
    ? { x0: 0, y0: rowTop, x1: canvas.clientWidth, y1: canvas.clientHeight }
    : null;

  // Linguetta di prezzo sui bottoni edificio al passaggio del mouse — [C]
  // pu1..pumediat/Mouse_MouseEnter.gml, vedi costTagSprite() in
  // buildings.js. Solo mouse (come la raccolta monete/il segnale di
  // potenziamento sotto): il touch non ha un vero hover senza contatto,
  // e qui coprirebbe comunque il bottone col dito.
  if (input.hover && input.hoverPointerType === "mouse") {
    const hb = uiButtons.find((btn) => btn.kind === "building"
      && input.hover.x >= btn.x && input.hover.x <= btn.x + btn.w
      && input.hover.y >= btn.y && input.hover.y <= btn.y + btn.h);
    const tagFrame = hb && frameFor(costTagSprite(hb.type, null));
    if (tagFrame) {
      r.draw(tagFrame, hb.x + hb.w / 2 - (tagFrame.w * UI_SCALE) / 2, hb.y - 8, UI_SCALE, 0xffffff, 1);
    }
  }

  // Avviso "ATTACK INCOMING" (src/objects/aincom, game/src/balloons.js): una
  // mongolfiera spia ha completato il suo giro. [C] aincom/Create.gml +
  // Alarm_1/2.gml: lampeggia (mostra/nasconde ogni 30 tick = 0.5s) per 240
  // tick (4s) al centro della view — qui al centro dello schermo, coerente
  // col resto della GUI in spazio schermo (STUDIO.md §7.3 "L'interfaccia va
  // in uno spazio schermo separato").
  if (r12.alertT > 0) {
    const ainco = frameFor("ainco");
    // r.draw ancora sull'origine dello sprite (data/sprites.json: "ainco" ha
    // origin ~(w/2, h/2), gia' centrato — a differenza di "icone_oriz" sopra,
    // che ha origine in alto a sinistra), quindi il centro schermo e' gia'
    // il punto giusto da passare, non il suo angolo in alto a sinistra.
    if (ainco && Math.floor((ALERT_DURATION - r12.alertT) / 0.5) % 2 === 0) {
      r.draw(ainco, canvas.clientWidth / 2, canvas.clientHeight / 2, 1, 0xffffff, 1);
    }
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

  hideLoading();

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// aggancio di debug, comodo per ispezionare senza aspettare il ciclo
window.__nimbus = {
  cam, scene, get world() { return frameList; }, get buildings() { return buildings; }, get r12() { return r12; },
  get uiButtons() { return uiButtons; }, get cars() { return cars; }, semaphores, isMobile,
  get uiScrollX() { return uiScrollX; }, setUiScrollX: (x) => { uiScrollX = x; },
  get carmakerT() { return carmakerT; }, setCarmakerT: (t) => { carmakerT = t; },
  atmo, get pedestrians() { return pedestrians; },
  get balloons() { return balloons; }, get loot() { return loot; }, get coins() { return coins; },
  get coinPops() { return coinPops; },
  get constructionBalloons() { return constructionBalloons; }, get constructionBoxes() { return constructionBoxes; },
  get threats() { return threats; }, get bombs() { return bombs; }, get explosions() { return explosions; },
  get projectiles() { return projectiles; }, get smoke() { return smoke; }, get trails() { return trails; },
  get aerSmoke() { return aerSmoke; }, get debris() { return debris; }, get ruins() { return ruins; },
  get blockedSlots() { return blockedSlots; }, get placeholders() { return placeholders; },
  setPhase: (t) => { phaseT = t; },
  phases: PHASES,
  save: doSave, load: doLoad,
};
