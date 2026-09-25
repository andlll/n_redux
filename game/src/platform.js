// La base volante di `match` (`r120`, sprite "baa12") — [C] r12/Create.gml,
// ramo `match` (flag 736==0). La piattaforma vera e i suoi alberi sono
// STATICI (nessuno step per frame: r120 non si muove mai nel decompilato,
// a differenza del nome "base volante" che suggerirebbe), quindi entrano
// in `staticWorld` com'e', stesso trattamento di ogni albero gia' in scena.
// **[C] `moto11`/`moto12`/`moto13` NON sono statici** (letto qui solo dopo
// una domanda diretta dell'autore, prima erano finiti tra i fissi per
// errore): ogni istanza lampeggia fra invisibile e lo sprite vero ogni 2
// tick (Step/Alarm_0/Alarm_1) — sprite "motorNN", letteralmente una ventola
// vista di taglio, la stessa che compare gia' disegnata (ferma) dentro
// "baa12". Sparse com'e' l'unica animazione che l'originale usa per dare
// l'illusione che le turbine girino, non un vero sprite a piu' frame.
// blinkMotorVisible()/r120MotorDecor() sotto, chiamate ad ogni frame da
// main.js/title.js invece di restare pushate una volta sola qui. Estratto
// in un modulo a parte (invece di restare inline in main.js) perche'
// title.js (lo sfondo sfocato della title screen, STUDIO.md) ne ha bisogno
// anch'esso, sulla stessa `match.scene.json`.
import { canAfford } from "./buildings.js";
import { spawnCar, R32_MAGHENE_SCHEDULE, R22_MAGHENE_SCHEDULE, NIGHT_TINT } from "./cars.js";
import {
  createBridgeState, stepBridge, bridgeDeckFrame, bridgeOverVisible, bridgeGapOpen,
  BRIDGE_DES_CONFIG, BRIDGE_SIN_CONFIG, BRIDGE_DES2_CONFIG,
  maybeSpawnShip, stepCargoShips, clickShip,
} from "./bridges.js";

export const FARO1 = { x: 616, y: 1100 };
export const FARO2 = { x: 1655, y: 1111 };
export const FARO3 = { x: 2556, y: 1208 };   // [C] dockersig1/Alarm_4.gml: action_create_object(faro3, 2556, 1208)

// [C] src/objects/placeholder/Create.gml + Collision_r12|r120|r22|r220|r32|
// r320.gml: su `match` (736==0) ogni placeholder nasce con `act=0`
// (Mouse_LeftPressed/LeftReleased non fanno NULLA finche' resta cosi', vedi
// isPlaceholderActive() sotto) e diventa `act=1` SOLO quando la sua maschera
// tocca per davvero uno di questi sei oggetti — quindi solo quando la
// piattaforma sotto di lui esiste gia'. Su `match_easy` (736!=0) lo stesso
// Create.gml lo attiva subito, incondizionatamente: nessun gate la',
// STUDIO.md/isPlaceholderActive() sotto lo riflette con `platformState ===
// null` (creato solo per `match`, main.js). Rettangoli invece della vera
// maschera pixel-perfect del decompilato: i placeholder sono piccoli
// rispetto a questi sprite, l'approssimazione non cambia mai l'esito.
// [C] r12/Create.gml: `action_create_object(r120, 1170, 346)` e' preceduto da
// `action_set_relative(1)` (e seguito da `action_set_relative(0)`) — quella
// coppia (1170, 346) e' un offset RELATIVO alla posizione della stessa
// istanza r12 (x=-19,y=-179 nella room, src/rooms/match.json), non una
// coordinata assoluta: la posizione vera di r120 e' quindi (-19+1170,
// -179+346) = (1151, 167). Perso alla prima lettura (il flag sta due righe
// sopra la create, facile da saltare) — segnalato dall'autore ("vedo la
// piattaforma tagliata con cose a destra che volano": pali/rotori/base del
// faro restano alle loro coordinate assolute vere, mentre r120/baa12
// disegnato 19px a destra e 179px piu' in basso del dovuto non li copriva
// piu' allineati).
const R12_RECT = { x: -19, y: -179, w: 1170, h: 1558 };      // r12/baa11
const R120_RECT = { x: -19 + 1170, y: -179 + 346, w: 1112, h: 1092 };     // r120/baa12
const R32_RECT = { x: -16, y: 1141, w: 1616, h: 953 };       // r32/baa31
const R320_RECT = { x: 1600, y: 1141, w: 1600, h: 952 };     // r320/baa32
const R22_RECT = { x: 1374, y: -64, w: 1236, h: 1242 };      // r22/baa21
const R220_RECT = { x: 2610, y: 161, w: 1223, h: 1333 };     // r220/baa22

function inRect(x, y, r) {
  return x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
}

/** [C] placeholder/Create.gml + Collision_*.gml (commento sopra): vero se
 * questo lotto sta gia' su un pezzo di piattaforma esistente — sempre per
 * r12/r120 (la base di partenza), solo se tier1/tier2 sono gia' "expanded"
 * per r32/r320 risp. r22/r220. `platformState` nullo (match_easy, o
 * l'anteprima sfocata della title screen) equivale a "nessun gate", come
 * l'originale su quella room. */
export function isPlaceholderActive(x, y, platformState) {
  if (!platformState) return true;
  if (inRect(x, y, R12_RECT) || inRect(x, y, R120_RECT)) return true;
  if (platformState.tier1.stage === "expanded" && (inRect(x, y, R32_RECT) || inRect(x, y, R320_RECT))) return true;
  if (platformState.tier2.stage === "expanded" && (inRect(x, y, R22_RECT) || inRect(x, y, R220_RECT))) return true;
  return false;
}

export function applyMatchPlatform(staticWorld, { interactive = false } = {}) {
  // Le 56 istanze statiche "albe" della room (quelle A TERRA) vengono
  // uccise incondizionatamente su questo ramo — sostituite dalle 14 sotto,
  // appese alla piattaforma invece che al terreno.
  for (let i = staticWorld.length - 1; i >= 0; i--) {
    if (staticWorld[i].obj === "albe") staticWorld.splice(i, 1);
  }
  // [C] r12/_object.json: l'istanza `r12` DELLA ROOM (`src/rooms/match.json`,
  // x=-19,y=-179) porta lo sprite di default "baa11" (1170x1558), stesso
  // depth=1 di r120 — e' la meta' SINISTRA della piattaforma. Questa entry
  // NON va pushata qui: `r12` e' gia' un'istanza vera in `match.scene.json`
  // (risolta dalla pipeline di scena, tools/22_scene.py, con `spr: "baa11"`
  // gia' scritto) — sta in `staticWorld` fin dall'inizio, PRIMA che questa
  // funzione venga chiamata. Pusharla di nuovo qui la duplicava soltanto
  // (due istanze identiche sovrapposte, innocuo ma inutile) — il vero bug
  // che faceva sembrare mancante meta' piattaforma era altrove: vedi il
  // commento su r120 subito sotto.
  // [C] r12/Create.gml: `action_create_object(r120, 1170, 346)` e' RELATIVO
  // alla posizione di r12 stesso (x=-19,y=-179 su `match` — vedi il
  // commento su R120_RECT piu' sopra): la posizione vera e' (-19+1170,
  // -179+346). **[I]** letta qui dall'istanza `r12` VERA di `staticWorld`
  // (gia' un'istanza reale della room, risolta da tools/22_scene.py —
  // stesso principio del commento sopra) invece di un numero fisso: la
  // room "tutorial" (game/src/tutorial.js) riusa lo stesso r12/baa11 ma a
  // una posizione leggermente diversa (-17,-179, non -19,-179) — un
  // valore fisso copiato da `match` avrebbe disallineato r120 li' di 2px.
  const r12Instance = staticWorld.find((it) => it.obj === "r12");
  const R120_X = (r12Instance?.x ?? -19) + 1170, R120_Y = (r12Instance?.y ?? -179) + 346;
  // [Bug corretto, main.js] questa `push()` (a differenza di `r12` sopra)
  // aggiunge un'istanza NUOVA a `staticWorld`, dopo che main.js ha gia'
  // calcolato `_f` (il frame dell'atlas) per tutto cio' che c'era prima —
  // senza un secondo giro in main.js dopo questa chiamata, r120/baa12 non
  // aveva mai un `_f` e il ciclo di disegno la scartava in silenzio: non e'
  // MAI comparsa a schermo, in nessuna build. Non un problema di posizione
  // o di sprite mancante (`segnalato dall'autore, "è baa12"` — aveva
  // ragione: la texture era sempre quella giusta).
  staticWorld.push({ obj: "r120", x: R120_X, y: R120_Y, depth: 1, spr: "baa12" });
  // [C] r12/Create.gml, `with (r120) { instance_create(x+dx, y+dy, albe) }`
  // — 14 offset letti uno per uno, nessun pattern regolare.
  const R120_TREES = [
    [282, 794], [439, 783], [379, 748], [518, 750], [565, 700], [463, 695],
    [538, 646], [637, 609], [699, 556], [758, 524], [816, 559], [724, 617],
    [672, 659], [739, 651],
  ];
  for (const [dx, dy] of R120_TREES) {
    staticWorld.push({ obj: "albe", x: R120_X + dx, y: R120_Y + dy, depth: 0, spr: "a1" });
  }
  // [C] stesso Create.gml, DOPO che `action_set_relative` torna a 0:
  // posizione ASSOLUTA nella room, indipendente da r120 (mudr2 e'
  // scenografia fissa della mappa, non agganciata alla piattaforma).
  // moto11/12/13 (le "turbine", vedi sopra) NON stanno qui: sono decoro
  // dinamico, vedi r120MotorDecor() piu' sotto.
  staticWorld.push({ obj: "mudr2", x: 769, y: 845, spr: "moor12", depth: -1055 });   // [C] mudr2/_object.json: depth fisso, non -y
  // `faro1`/`faro2` restano fuori da qui SOLO quando `interactive` (main.js,
  // la partita vera su `match`): la catena di potenziamento sotto
  // (createFaroState()/faroDecor()) li ridisegna lei stessa ad ogni frame,
  // sprite compreso, perche' possono cambiare a runtime (f1b -> f1 -> tolti
  // del tutto a piattaforma espansa) — cosa che una entry statica pushata
  // una volta sola qui non potrebbe mai fare. Lo sfondo sfumato della title
  // screen (game/src/title.js, `interactive` di default false) non ha
  // bisogno di nessuna di queste due cose: i fari restano decorazione pura,
  // sempre spenti, esattamente come prima.
  if (!interactive) {
    staticWorld.push({ obj: "faro1", x: FARO1.x, y: FARO1.y, spr: "f1b", depth: 0 });
    staticWorld.push({ obj: "faro2", x: FARO2.x, y: FARO2.y, spr: "f2b", depth: 0 });
  }
}

// [C] moto11/12/13/2 — Step.gml + Alarm_0/Alarm_1, IDENTICI su tutti e
// quattro (moto2 e' lo stesso oggetto, riusato su r32/r22): Create arma
// alarm(2,0); Alarm_0 -> sprite "empty2" (invisibile), arma alarm(2,1);
// Alarm_1 -> sprite vero, arma alarm(2,0). Visibile nei tick pari di ogni
// coppia (0-1 visibile, 2-3 invisibile, ...), partendo visibile perche' lo
// sprite di default (_object.json) e' gia' quello vero, non "empty2". [I]
// qui sincronizzato su un solo orologio globale (`t`, secondi) invece che
// sul proprio istante di Create — un lampeggio a regime non ha una fase
// percepibile, la differenza sarebbe invisibile a schermo.
function blinkMotorVisible(t) {
  return Math.floor((t * 60) / 2) % 2 === 0;
}

// [Bug corretto] I quattro oggetti "turbina" non sono intercambiabili quanto
// il commento sopra lascia intendere: letti singolarmente (src/objects/
// moto11|moto12|moto13|moto2), SOLO moto12/moto13 fanno `depth = -y` nel
// proprio Create — moto11 e moto2 non toccano mai `depth`, restano fermi al
// valore fisso di `_object.json` (0 per moto11, 3 per moto2, data/
// objects.json). Prima qui tutti e quattro finivano con `depth: 0`, che
// main.js/effDepth() reinterpreta come "ordina per -y" (la stessa
// convenzione usata per edifici/alberi, che quello SI lo fanno davvero nel
// proprio Create) — per moto11 questo faceva dipendere il suo ordinamento
// dalla propria y invece di restare fisso, sovrapponendosi in modo
// incoerente al ponte levatoio (bridge_des/bridge_sin, depth FISSO -990/
// -1010: STUDIO.md/bridges.js) a seconda di dove capitava sulla
// piattaforma — segnalato dall'autore ("il rotore della piattaforma
// principale si sovrappone al ponte dell'espansione"), riprodotto
// visivamente (motor11 a (1632,1037): -y = -1037, "davanti" al ponte a
// -990 invece che dietro, un caso su tre — gli altri due motor11 di
// R120_MOTORS a y=858/1231 no/si' per lo stesso motivo, incoerente). depth
// 0 vero (fisso, non -y) non e' rappresentabile alla lettera qui (collide
// con lo stesso sentinel "0" che main.js usa per "-y"):
// MOTOR11_FIXED_DEPTH e' l'equivalente pratico, un filo sotto zero — resta
// sempre dietro al ponte/alla piattaforma (entrambi ben oltre -900) e
// sempre davanti a qualunque oggetto "di mondo" ordinato per -y (ogni y > 0
// della mappa da' un -y piu' negativo di questo). moto12/moto13 restano
// invariati (depth:0, -y vero, gia' corretto).
const MOTOR11_FIXED_DEPTH = -0.01;
// [Bug corretto in un primo momento, poi RIVISTO — vedi i due commenti
// sotto (MOTO2A_FIXED_DEPTH/MOTO2_FIXED_DEPTH)] Un commit precedente
// leggeva qui "moto2 fedele al decompilato, depth fisso 3, ma quel 3 perde
// sempre il confronto con le auto (-y-N, tipicamente -1000..-3000) quindi
// la turbina resta sempre sotto qualunque macchina" e ne concludeva che
// andasse reso dinamico (`return 0`, -y vero) come motor12/motor13. Letto
// pero' oggetto per oggetto (sotto), NESSUna delle due istanze reali di
// sprite "motor2" nel gioco (`moto2a` su r32, `moto2` su r22) e' in realta'
// lo stesso oggetto di moto12/moto13: entrambe restano fisse per davvero
// nel decompilato, il "3"/"−1242" non era un bug ma lo strato fisso della
// piattaforma (coerente con `baa21`/`baa22`/`moor21` accanto, tutti fissi).
// Il vero caso dinamico e' SOLO `moto12` (sprite "motor12", R32_MOTORS
// sotto) e `moto13` — motor11 resta invece fisso ma con la stessa
// convenzione "0 = dinamico" di main.js, da cui MOTOR11_FIXED_DEPTH sopra.
function motorDepth(spr) {
  if (spr === "motor11") return MOTOR11_FIXED_DEPTH;
  return 0;   // motor12/motor13: depth = -y vero (l'unico caso dinamico vero)
}
// [Bug corretto, segnalato dall'autore: "il reattore verticale su un palo
// che nasce con la prima espansione (quella in basso) ha la depth
// sbagliata, una villa gli finisce sopra"] **[C]** `dockersig1/Alarm_4.gml`
// (il trigger che crea l'intera scenografia della prima espansione, sopra
// nel commento su r32Decor()) NON crea `moto2` per le due "turbine" a
// (-32,1997)/(1659,1996) come un commento precedente assumeva — crea
// `moto2a`, un oggetto DIVERSO (stesso sprite "motor2", Step/Alarm_0/Alarm_1
// quasi identici — l'unica vera differenza e' che `moto2a/Step_0.gml` si
// autodistrugge quando `r12.oil<=0`, mai riprodotto qui, un gap [I] minore)
// il cui default in `_object.json` e' `depth: -1242`, non 3 — mai
// riassegnato nemmeno li' (letto riga per riga, nessuna delle sue tre
// azioni tocca `depth`). Un "return 0" dinamico (-y vero) le faceva ordinare
// per la LORO PROPRIA y (1996/1997, molto a valle sulla piattaforma) invece
// del fisso vero — quasi identico al -1241 di "baa31"/"baa32" stessi (lo
// stesso "strato" della piattaforma), NON il -1997/-1996 dinamico
// attribuito qui in precedenza: una villa piazzata fra circa y=1242 e
// y=1997 (una fetta ampia dell'area costruibile di questa espansione,
// R32_RECT sopra) si ordinava quindi nel modo sbagliato contro di lei.
// `MOTO2A_FIXED_DEPTH` sotto riproduce il vero fisso; l'entry con
// `spr:"motor2"` di R32_MOTORS (sotto) lo marca con `fixedDepth` invece di
// passare per `motorDepth()`.
const MOTO2A_FIXED_DEPTH = -1242;
// [Bug corretto, segnalato dall'autore con screenshot: "la turbina da
// mettere in dinamico -y e' quella di espansione 1 (moto12, sopra il
// semaforo/incrocio a (607,1839): gia' corretta), non quella di
// espansione 2 — quella deve restare sullo sfondo"] **[C]** il `moto2`
// VERO (non `moto2a` sopra) e' quello che `dockersig3/Alarm_4.gml` crea
// due volte per la seconda espansione, r22 — letto riga per riga (Create/
// Alarm_0/Alarm_1/Step.gml, oggetto `moto2` in `src/objects/moto2/`):
// NESSUno dei suoi eventi tocca mai `depth`, esattamente come `moto2a`,
// resta fermo al fisso di `_object.json`, che per lui e' `3` (non -1242:
// un oggetto diverso, un default diverso) — lo stesso "3" gia' scartato
// come bug qui sotto in un commit precedente (si scambiava per un
// difetto quello che nel gioco vero e' semplicemente lo strato fisso
// della piattaforma: coerente con `baa21`/`baa22` stessi, appena sopra in
// r22Decor(), depth FISSO 4, e `moor21`, depth FISSO 2 — lo stesso ordine
// di grandezza di `3`, non la scala -y delle auto). Un "return 0" dinamico
// (lo stesso errore gia' corretto sopra per `moto2a`) faceva ordinare le
// due istanze di R22_MOTORS per la LORO PROPRIA y (908/1223) invece del
// fisso vero — la stessa famiglia di bug, sull'altra piattaforma.
// `MOTO2_FIXED_DEPTH` riproduce il vero fisso; le entry di R22_MOTORS
// (sotto) lo marcano con `fixedDepth` invece di passare per
// `motorDepth()` — quella funzione ora gestisce solo `motor11` (fisso) e
// il vero dinamico `motor12`/`motor13` (R120_MOTORS sopra, il `moto12`
// di R32_MOTORS sotto).
const MOTO2_FIXED_DEPTH = 3;

// [C] r12/Create.gml, posizioni assolute (STUDIO.md sopra).
const R120_MOTORS = [
  { x: 1951, y: 858, spr: "motor11" },
  { x: 1632, y: 1037, spr: "motor11" },
  { x: 656, y: 1231, spr: "motor11" },
  { x: 198, y: 217, spr: "motor12" },
  { x: 514, y: 34, spr: "motor12" },
  { x: 44, y: 876, spr: "motor13" },
  { x: 1015, y: 1142, spr: "motor13" },
];

/** Le "turbine" di r120 — chiamata ogni frame da main.js/title.js (`t` =
 * secondi trascorsi, un cronometro qualunque va bene, vedi sopra). */
export function r120MotorDecor(t) {
  if (!blinkMotorVisible(t)) return [];
  return R120_MOTORS.map((m) => ({ obj: "decor", x: m.x, y: m.y, depth: motorDepth(m.spr), spr: m.spr }));
}


// ------------------------------------------------------------------
// Catena fari -> seconda E terza piattaforma — **[C]** ricostruita
// leggendo `faro1/Step.gml` -> `upfaro1/Mouse_LeftPressed.gml` ->
// `wavesig1/Mouse_LeftReleased.gml` -> `farolux/Create.gml` -> `dockersig1/
// Mouse_LeftPressed.gml` + `Alarm_4.gml`, e la catena gemella di livello 3
// (`faro3` -> `upfaro3` -> `wavesig3` -> `farolux3` -> `dockersig3`).
// `state.tier1`/`state.tier2` sono le due catene, stessa forma:
//
//  1. `chies.level>=2` (tier1) / `>=3` E tier1 gia' espanso (tier2) ->
//     compare il segnale verde sul faro.
//  2. tap, -2000 mon (tier1) / -5000 mon (tier2) -> il faro si accende
//     (f1b->f1 / f3b->f3) e compare il segnale successivo.
//  3. tap sul segnale **solo di notte**, -20 crys (tier1) / -50 crys
//     (tier2) -> accende DAVVERO i fari (overlay "f1lux") e fa comparire
//     il segnale di attracco.
//  4. tap sul segnale di attracco, -5000 mon -9000 oil (tier1, ~14s/840
//     tick) o -15000 mon -27000 oil (tier2, ~10s/600 tick) -> arriva la
//     piattaforma vera: `r32` (tier1, con `faro3` gia' sopra) o `r22`/
//     `r220` (tier2), con la loro scenografia fissa e il traffico
//     periodico proprio ("maghene", sotto).
//
// [C] Anche il volo vero di `monviolo` (nasce fuori scena, vola a 30°, dopo
// 3600 tick o all'uscita dalla mappa lascia cadere `barviola`, STUDIO.md) e
// il traffico periodico di entrambe le piattaforme nuove (`maghene`:
// honda21..25(+a/b) su r32, honda31..34(+a/b) su r22, game/src/cars.js) —
// gap dichiarati nella prima versione di questo file, chiusi qui.
//
// [Decisione dell'autore: "anche questo monviolo va abbattuto, non e'
// decorativo — altrimenti come prendi le gemme?"] Una versione precedente
// lo teneva puramente decorativo (fedele al decompilato: "nessun evento
// Mouse", vedi la nota rimossa da faroDecor() piu' sotto), con le gemme
// raccolte solo a scadenza naturale/uscita mappa — l'autore lo vuole invece
// un vero bersaglio delle torrette, come l'ALTRO `monviolo` (quello del
// dado ogni 300 tick sotto `chies.level>=2`, balloons.js/
// stepBalloonSpawner()): stessi identici numeri letti dal decompilato per
// entrambi (vita 3600 tick, velocita' 6..10, direzione 30°, loot 1..3
// cristalli) — quasi certamente lo STESSO oggetto dell'originale, apparso
// due volte in questo porting perche' ricostruito in due sessioni diverse
// senza accorgersene. `spawnMonviolo()` sotto ora produce la stessa forma
// di `spawnBalloon("monviolo")` (balloons.js) cosi' puo' entrare nello
// STESSO array condiviso (`balloons`, main.js) ed ereditare gratis tutto
// cio' che quell'array gia' sa fare per ogni mongolfiera — mira/fuoco delle
// torrette (stepTurretAim/fireTurretManual/stepProjectiles), danno da
// fulmine, scadenza naturale con lo stesso drop di cristalli
// (stepBalloons(), balloons.js) — invece di reimplementare la stessa
// logica una seconda volta qui. Il vecchio fix "si ferma al bordo mappa
// cosi' il gettone resta raggiungibile" non serve piu' per lo stesso
// motivo per cui non serve all'ALTRO monviolo: la maggior parte muore
// prima, abbattuta da una torretta ben prima di arrivare li'.
const SIGN_DEPTH = -9001;                 // [C] wavesig1|dockersig1|dockersig3/_object.json: depth = -9001, come upsign
const TIER1_BUILD_SECONDS = 840 / 60;     // [C] dockersig1/Alarm_4: 840 tick dopo il tap (60 tick/s, STUDIO.md)
const TIER2_BUILD_SECONDS = 600 / 60;     // [C] dockersig3/Alarm_4: 600 tick dopo il tap
const BARVIOLA_PERIOD = 300 / 60;         // [C] r12/Alarm_1: si ripete ogni 300 tick
const BARVIOLA_CHANCE = 1 / 18;           // [C] stesso Alarm_1: action_if_dice(18)
const MONVIOLO_DIR = 30;                  // [C] monviolo/Create.gml: action_set_motion(30, ...)

// [Bug corretto] "Manca completamente l'animazione con le nuvole quando
// viene aggiunta un'espansione della piattaforma" (segnalato dall'autore).
// **[C]** `dockersig1|dockersig3/Mouse_LeftPressed.gml` + `Alarm_0|1|2|3|5`:
// al tap che avvia l'attracco (e di nuovo ad ogni alarm elencato sotto) 5
// istanze di `n_cluster1` nascono in colonna verticale a x=5000 — fuori
// mappa a destra, match.json e' largo 3900 — a y assoluta -1000/0/1000/2000/
// 3000 (i `action_set_relative(0)` immediatamente prima di ciascuna
// `action_create_object` lo confermano: coordinate ASSOLUTE, non relative a
// dockersig1 nonostante le coppie `action_set_relative(1)/(0)` ridondanti
// intorno — un artefatto del decompilato drag&drop, STUDIO.md). **[C]**
// `n_cluster1/Create.gml`: si sposta poi di (0,-3000) RELATIVO alla propria
// nascita (stavolta un vero relative — resta `action_set_relative(1)`
// attivo per quella singola azione), tinta 16366009 (NIGHT_TINT, game/src/
// cars.js — stessa costante gia' letta per le auto) SOLO se e' notte
// nell'istante esatto della nascita, poi vola a direzione 210°/velocita' 7
// px/tic (giu'-a-sinistra) per 1200 tic (20s) e si autodistrugge
// (`Alarm_0`). Le 5 y assolute meno lo shift di 3000 dànno una colonna che
// va da y=-4000 a y=0.
const CLOUD_WAVE_Y = [-1000, 0, 1000, 2000, 3000].map((y) => y - 3000);   // [C]: -4000..0
const CLOUD_SPAWN_X = 5000;                // [C] fuori mappa a destra (match.json e' largo 3900)
const CLOUD_DIR = 210;                     // [C] n_cluster1/Create.gml: action_set_motion(210, 7)
const CLOUD_SPEED = 7;                     // [C] stesso Create.gml, px/tic
const CLOUD_LIFE_SECONDS = 1200 / 60;      // [C] n_cluster1/Create.gml: action_set_alarm(1200, 0) -> Alarm_0 uccide
// [C] dockersig1/Mouse_LeftPressed.gml arma alarm(40,0)/alarm(80,1)/
// alarm(120,2)/alarm(160,3)/alarm(200,5) — CIASCUNO crea un'altra ondata di
// 5 nuvole identica a quella del tap (0 qui sotto rappresenta il tap
// stesso, t=0). dockersig3 arma solo i primi quattro (40/80/120/160,
// nessun alarm(200,5) — letto cosi' com'e', un'ondata in meno della catena
// gemella).
const CLOUD_WAVE_TICKS_TIER1 = [0, 40, 80, 120, 160, 200];
const CLOUD_WAVE_TICKS_TIER2 = [0, 40, 80, 120, 160];

/** Stato della catena — persistito nel salvataggio (main.js/save.js).
 * `bridgeDes`/`bridgeSin` (game/src/bridges.js) non esistono davvero prima
 * che `r32` nasca, ma crearli subito e limitarsi a non farli avanzare
 * (vedi stepFaroChain sotto) e' piu' semplice che ricrearli al volo
 * appena tier1 diventa "expanded". Stesso principio per `bridgeDes2`/tier2.
 * [C] bridge_sin/Create.gml: il primo ciclo dura 2400 tick, non 3600 come
 * gli altri due (letto cosi' com'e'). */
export function createFaroState() {
  return {
    tier1: { stage: "locked", dockerT: 0, cloudWaveIdx: 0 },
    tier2: { stage: "locked", dockerT: 0, cloudWaveIdx: 0 },
    barviolaT: 0,
    r32TrafficT: 0, r32MagheneIdx: 0,
    r22TrafficT: 0, r22MagheneIdx: 0,
    bridgeDes: createBridgeState(3600),
    bridgeSin: createBridgeState(2400),
    bridgeDes2: createBridgeState(3600),
    ships: [],
    clusterClouds: [],   // n_cluster1 — le nuvole dell'animazione di espansione (sotto)
  };
}

// [C] monviolo/Create.gml: nasce fuori scena a sinistra (x=-170), y
// casuale nella fascia 380..3120 della room (piu' ampia di quella generica
// SPAWN_Y di balloons.js, tarata invece per l'altezza di `match_easy` —
// questo spawner vive solo su `match`, la mappa grande, vedi stepFaroChain()
// sotto), velocita' 6..10 px/tick, direzione 30° fissa (MONVIOLO_DIR).
// Stessa FORMA di balloons.js/spawnBalloon("monviolo") — `type`/`cos`/`sin`/
// `spr`/`depth`/`stormT`, non solo x/y/spd/t — cosi' l'istanza puo' entrare
// diretta nell'array condiviso `balloons` (main.js) invece che nel proprio
// `state.monviolos` ormai rimosso: vedi il commento sopra SIGN_DEPTH, in
// cima al file, per il perche'.
function spawnMonviolo() {
  const rad = (MONVIOLO_DIR * Math.PI) / 180;
  return {
    type: "monviolo", x: -170, y: 380 + Math.random() * (3120 - 380),
    spd: 6 + Math.random() * 4, t: 0, stormT: 0,
    spr: "monviola", depth: -3990,   // [C] monviolo/Create.gml: depth fisso, stesso valore di spawnBalloon()
    cos: Math.cos(rad), sin: Math.sin(rad),
  };
}

// n_cluster1 — vedi il blocco di commento su CLOUD_WAVE_Y sopra.
function spawnCloudWave(clusterClouds, night) {
  for (const y of CLOUD_WAVE_Y) {
    clusterClouds.push({ x: CLOUD_SPAWN_X, y, t: 0, tint: night ? NIGHT_TINT : 0xffffff });
  }
}

const CLOUD_RAD = (CLOUD_DIR * Math.PI) / 180;
const CLOUD_PX_PER_SEC = CLOUD_SPEED * 60;
// Direzione unica e fissa per ogni nuvola (stesso principio del fix pedoni/
// auto/aerei/navi: niente trigonometria per frame per una direzione che non
// cambia mai) — precalcolata una volta sola invece che ad ogni nuvola ad
// ogni frame.
const CLOUD_VX = Math.cos(CLOUD_RAD) * CLOUD_PX_PER_SEC;
const CLOUD_VY = -Math.sin(CLOUD_RAD) * CLOUD_PX_PER_SEC;

/** Fa partire le ondate ancora dovute (in base a `dockerT`, gia' avanzato
 * da chi chiama) e avanza/scarta le nuvole gia' in volo — chiamata per
 * ENTRAMBE le catene (tier1/tier2 condividono lo stesso array
 * `state.clusterClouds`, STUDIO.md: due espansioni non sono mai
 * "expanding" insieme, ma le nuvole di una possono restare in volo fino a
 * 20s dopo che l'altra e' gia' partita). */
function stepClusterClouds(tier, waveTicks, clusterClouds, night) {
  if (tier.stage === "expanding") {
    while (tier.cloudWaveIdx < waveTicks.length && tier.dockerT * 60 >= waveTicks[tier.cloudWaveIdx]) {
      spawnCloudWave(clusterClouds, night);
      tier.cloudWaveIdx++;
    }
  }
}

function advanceClouds(clusterClouds, dt) {
  for (let i = clusterClouds.length - 1; i >= 0; i--) {
    const c = clusterClouds[i];
    c.t += dt;
    if (c.t >= CLOUD_LIFE_SECONDS) { clusterClouds.splice(i, 1); continue; }
    c.x += CLOUD_VX * dt;
    c.y += CLOUD_VY * dt;
  }
}

/** Avanza timer, sblocchi, traffico e voli — chiamata una volta per frame
 * da main.js, insieme al resto della simulazione (stepCoinSpawner() e
 * affini). `cars`/`smoke` sono gli array condivisi di main.js (game/src/
 * cars.js, game/src/smoke.js), `night` la stessa `isNight(phaseT)` gia'
 * usata per tingere le auto vere. `balloons` (main.js, game/src/balloons.js)
 * e' l'array condiviso di mongolfiere in volo — qui solo per farci entrare
 * `monviolo` appena nato (vedi il blocco sotto): il resto del suo ciclo di
 * vita (movimento, fulmine, scadenza+drop) lo avanza gia' stepBalloons()
 * altrove in main.js, un frame dopo, non serve rifarlo qui. */
export function stepFaroChain(state, r12, balloons, cars, smoke, dt, chiesLevel, night) {
  // --- tier 1: chies.level>=2 -> ... -> r32 ---
  if (state.tier1.stage === "locked" && chiesLevel >= 2) state.tier1.stage = "buttonShown";
  if (state.tier1.stage === "expanding") {
    state.tier1.dockerT += dt;
    stepClusterClouds(state.tier1, CLOUD_WAVE_TICKS_TIER1, state.clusterClouds, night);
    if (state.tier1.dockerT >= TIER1_BUILD_SECONDS) {
      state.tier1.stage = "expanded";
      cars.push(spawnCar("honda21", night));   // [C] r32/Create.gml
    }
  }
  if (state.tier1.stage === "expanded") {
    state.r32TrafficT += dt;
    while (state.r32MagheneIdx < R32_MAGHENE_SCHEDULE.length && state.r32TrafficT >= R32_MAGHENE_SCHEDULE[state.r32MagheneIdx].at) {
      cars.push(spawnCar(R32_MAGHENE_SCHEDULE[state.r32MagheneIdx].type, night));
      state.r32MagheneIdx++;
    }
  }

  // --- tier 2: chies.level>=3 E tier1 gia' espanso -> ... -> r22 ---
  if (state.tier2.stage === "locked" && state.tier1.stage === "expanded" && chiesLevel >= 3) state.tier2.stage = "buttonShown";
  if (state.tier2.stage === "expanding") {
    state.tier2.dockerT += dt;
    stepClusterClouds(state.tier2, CLOUD_WAVE_TICKS_TIER2, state.clusterClouds, night);
    if (state.tier2.dockerT >= TIER2_BUILD_SECONDS) {
      state.tier2.stage = "expanded";
      cars.push(spawnCar("honda31", night));   // [C] r22/Create.gml
      // [Nuova funzionalita', richiesta dall'autore: "dopo aver costruito
      // l'ultima espansione la risorsa gemma non serve piu': ... la risorsa
      // gemma sparisce azzerandosi"] Stessa logica gia' applicata alle
      // mongolfiere viola qui sotto (bridgesDone, stepBalloonSpawner() in
      // balloons.js) — `crys` non serve a nient'altro nel motore (solo i due
      // segnali d'onda della catena fari->ponti, gia' accesi da un pezzo a
      // questo punto). Azzerata una tantum proprio qui, alla vera fine della
      // catena (non prima: un giocatore che arriva con delle gemme in tasca
      // non deve vederle sparire un istante prima del dovuto). L'icona
      // stessa (drawUiRow()/mobileResKinds, main.js) e' gia' condizionata a
      // `r12.crys > 0`: azzerarla la nasconde da sola, nessun'altra modifica
      // serve li'.
      r12.crys = 0;
    }
  }
  if (state.tier2.stage === "expanded") {
    state.r22TrafficT += dt;
    while (state.r22MagheneIdx < R22_MAGHENE_SCHEDULE.length && state.r22TrafficT >= R22_MAGHENE_SCHEDULE[state.r22MagheneIdx].at) {
      cars.push(spawnCar(R22_MAGHENE_SCHEDULE[state.r22MagheneIdx].type, night));
      state.r22MagheneIdx++;
    }
  }

  // --- ponti levatoi (game/src/bridges.js): bridge_des/bridge_sin vivono
  // su r32 (tier1), bridge_des2 (con la nave) su r22 (tier2) — [C]
  // dockersig1|3/Alarm_4.gml, la stessa piattaforma che li crea.
  if (state.tier1.stage === "expanded") {
    stepBridge(state.bridgeDes, dt, cars, night, BRIDGE_DES_CONFIG);
    stepBridge(state.bridgeSin, dt, cars, night, BRIDGE_SIN_CONFIG);
  }
  if (state.tier2.stage === "expanded") {
    stepBridge(state.bridgeDes2, dt, cars, night, BRIDGE_DES2_CONFIG, () => {
      const ship = maybeSpawnShip(4500, 2170);   // [C] bridge_des2/Alarm_2.gml
      if (ship) state.ships.push(ship);
    });
  }
  stepCargoShips(state.ships, smoke, dt);

  // n_cluster1 — le nuvole restano in volo fino a 20s indipendentemente
  // dallo stage (STUDIO.md sopra su stepClusterClouds), quindi avanzano
  // sempre, non solo mentre "expanding".
  advanceClouds(state.clusterClouds, dt);

  // --- monviolo -> barviola (cristalli) ---
  // [Decisione dell'autore, vedi il commento sopra SIGN_DEPTH] Nasce qui
  // (stesso dado/timer di prima, indipendente dal livello di chies) ma vive
  // subito dopo nell'array CONDIVISO `balloons` — stessa mongolfiera vera
  // di balloons.js/BALLOON_TYPES.monviolo, quindi mira/fuoco delle torrette,
  // fulmine e scadenza naturale (con lo stesso drop di 1..3 cristalli) sono
  // gia' tutti gestiti altrove (stepTurretAim/stepProjectiles/stepBalloons,
  // main.js): nessun ciclo di movimento/scadenza da tenere qui.
  // [Bug corretto, segnalato dall'autore: "a piattaforma finale costruita
  // le mongolfiere viola dovrebbero smettere di passare"] **[C]** `r12/
  // Alarm_1.gml`, il ramo vero di monviolo: `action_if_number(160, 0, 0)`
  // — 160 e' l'indice oggetto di `r220` (data/objects.json), operatore 0
  // ("=="): `instance_count(r220) == 0`. Il dado 1/18 di monviolo (qui sotto
  // come sopra) non gira affatto una volta che `r220` esiste, cioe' a
  // tier2 espanso — esattamente lo stesso gate "bridgesDone" gia' applicato
  // al secondo spawner di monviolo (balloons.js/stepBalloonSpawner(), la
  // sessione precedente che aveva scoperto questo stesso oggetto una
  // seconda volta, vedi il commento sopra SIGN_DEPTH): QUESTO spawner era
  // rimasto scoperto, mongolfiere viola continuavano a nascere da qui anche
  // a catena completa.
  const bridgesDone = state.tier1.stage === "expanded" && state.tier2.stage === "expanded";
  state.barviolaT += dt;
  while (state.barviolaT >= BARVIOLA_PERIOD) {
    state.barviolaT -= BARVIOLA_PERIOD;
    if (!bridgesDone && Math.random() < BARVIOLA_CHANCE) balloons.push(spawnMonviolo());
  }
}

// `canAfford()`/DEBUG_INFINITE_RESOURCES (buildings.js): stesso interruttore
// di test gia' usato da ogni altro costo del motore — senza, questa catena
// sarebbe l'unica a restare bloccata dietro risorse vere durante un test.
export function clickFaroButton(state, r12) {
  if (state.tier1.stage !== "buttonShown") return null;
  if (!canAfford(r12, { mon: 2000 })) return `need 2000 mon (have ${r12.mon.toFixed(0)})`;
  r12.mon -= 2000;
  state.tier1.stage = "wavesigShown";
  return "beacon upgraded — look for the signal at night";
}

export function clickWaveSignal(state, r12, isNight) {
  if (state.tier1.stage !== "wavesigShown") return null;
  if (!isNight) return "the signal only activates at night";
  if (!canAfford(r12, { crys: 20 })) return `need 20 crystals (have ${r12.crys})`;
  r12.crys -= 20;
  state.tier1.stage = "lit";
  return "beacons lit";
}

export function clickDockerSignal(state, r12) {
  if (state.tier1.stage !== "lit") return null;
  if (!canAfford(r12, { mon: 5000, oil: 9000 })) {
    return r12.mon < 5000 ? `need 5000 mon (have ${r12.mon.toFixed(0)})` : `need 9000 oil (have ${r12.oil.toFixed(0)})`;
  }
  r12.mon -= 5000;
  r12.oil -= 9000;
  state.tier1.stage = "expanding";
  state.tier1.dockerT = 0;
  return "docking in progress...";
}

export function clickFaro3Button(state, r12) {
  if (state.tier2.stage !== "buttonShown") return null;
  if (!canAfford(r12, { mon: 5000 })) return `need 5000 mon (have ${r12.mon.toFixed(0)})`;
  r12.mon -= 5000;
  state.tier2.stage = "wavesigShown";
  return "third beacon upgraded — look for the signal at night";
}

export function clickWaveSignal3(state, r12, isNight) {
  if (state.tier2.stage !== "wavesigShown") return null;
  if (!isNight) return "the signal only activates at night";
  if (!canAfford(r12, { crys: 50 })) return `need 50 crystals (have ${r12.crys})`;
  r12.crys -= 50;
  state.tier2.stage = "lit";
  return "beacon lit";
}

export function clickDockerSignal3(state, r12) {
  if (state.tier2.stage !== "lit") return null;
  if (!canAfford(r12, { mon: 15000, oil: 27000 })) {
    return r12.mon < 15000 ? `need 15000 mon (have ${r12.mon.toFixed(0)})` : `need 27000 oil (have ${r12.oil.toFixed(0)})`;
  }
  r12.mon -= 15000;
  r12.oil -= 27000;
  state.tier2.stage = "expanding";
  state.tier2.dockerT = 0;
  return "docking in progress... (third platform)";
}

// [C] r32/Create.gml + r320/Create.gml (relativo a r32, offset 1616,0):
// r320 NON e' un controller invisibile — [C] _object.json: `visible: 1`,
// sprite proprio "baa32", `depth: -1241` — un secondo pezzo di piattaforma
// disegnato dal runtime GameMaker come ogni altra istanza, mancava nella
// prima versione di questo file (solo i pali `object8` venivano portati).
const R32_X = -16, R32_Y = 1141;
const R320_X = R32_X + 1616, R320_Y = R32_Y + 0;
const R32_POLES = [
  [181, 416], [429, 559], [478, 531], [530, 559], [478, 596],
  [778, 414], [678, 703], [728, 673], [1223, 441], [1371, 415],
  // r320 (r32.x+1616, r32.y+0)
  [1616 + 453, 585], [1616 + 551, 585], [1616 + 802, 440], [1616 + 850, 413],
  [1616 + 1001, 556], [1616 + 1051, 528], [1616 + 1051, 583], [1616 + 1099, 556],
];

// [C] dockersig1/Alarm_4.gml: `moto2a` (x2, NON `moto2` — vedi
// MOTO2A_FIXED_DEPTH sopra) + `moto12` (x1) — stesso oggetto lampeggiante
// di R120_MOTORS sopra (stesso sprite/Step/Alarm_0/Alarm_1 di moto11/12/13,
// solo il nome/il depth di default cambiano), non decoro fisso.
const R32_MOTORS = [
  { x: -32, y: 1997, spr: "motor2", fixedDepth: MOTO2A_FIXED_DEPTH },
  { x: 1659, y: 1996, spr: "motor2", fixedDepth: MOTO2A_FIXED_DEPTH },
  { x: 607, y: 1839, spr: "motor12" },
];

/** Tutte le entry di scenografia FISSA della seconda piattaforma — [C]
 * dockersig1/Alarm_4.gml, posizioni assolute (nessun `action_set_relative`
 * attivo in quell'evento). Chiamata solo a tier1 gia' espanso; `t` =
 * secondi, per il lampeggio delle "turbine" (blinkMotorVisible() sopra).
 * `state` = platformState intero, per l'animazione dei due ponti veri
 * (game/src/bridges.js) al posto degli sprite fissi "bridr1"/"bridl1". */
function r32Decor(state, t) {
  const out = [
    { obj: "decor", x: R32_X, y: R32_Y, depth: -1241, spr: "baa31" },     // [C] r32/_object.json
    { obj: "decor", x: R320_X, y: R320_Y, depth: -1241, spr: "baa32" },   // [C] r320/_object.json
    // [Bug corretto, segnalato dall'autore con screenshot: non e' la
    // turbina lampeggiante (moto12, gia' corretta sopra) il problema, e'
    // il "palo"/pilone che la regge sotto — il grosso sprite statico
    // "robbobase" (423x374, fan+pilone+base in un solo frame, la sagoma
    // che si vede nello screenshot) su cui moto12 lampeggia sovrapposto.
    // **[C]** `robbobaseobj/Create.gml` assegna `depth = -y - 320`, NON il
    // default `depth: 0` di `_object.json` (mai usato: sempre riassegnato
    // in Create) — un `depth: 0` qui viene pero' riletto da main.js/
    // effDepth() come sentinella "-y vero" (STUDIO.md sopra), cioe' -1720
    // invece del vero -2040: 320 troppo ALTO (main.js/effDepth: piu' alto
    // = disegnato prima = piu' lontano dalla camera), quindi il pilone
    // veniva disegnato troppo presto/lontano — qualunque oggetto di mondo
    // nella fascia fra -1720 e -2040 (auto, villa, decoro) ci finiva
    // erroneamente davanti invece che dietro come nel gioco vero.
    { obj: "decor", x: 565, y: 1720, depth: -1720 - 320, spr: "robbobase" },
    { obj: "decor", x: -16, y: 1153, depth: -1009, spr: "moor31" },
    { obj: "decor", x: 1302, y: 1150, depth: -1990, spr: "moor32" },
    { obj: "decor", x: 2513, y: 1268, depth: -1352, spr: "moor33" },
    { obj: "decor", x: 2027, y: 1105, depth: -1213, spr: "moor34" },
    // bridge_des (208,807) + bridge_sin (1375,788) — [C] bridge_des|sin/
    // Create.gml: l'impalcato animato (6 frame, bridges.js) e la balaustra
    // "over" (visibile solo a ponte chiuso), stessa posizione dell'oggetto
    // principale ("over" e' creato relativo, offset 0,0).
    { obj: "decor", x: 208, y: 807, depth: -990, spr: "bridr1mo", frame: Math.round(bridgeDeckFrame(state.bridgeDes)) },
    { obj: "decor", x: 1375, y: 788, depth: -1010, spr: "brid1mo", frame: Math.round(bridgeDeckFrame(state.bridgeSin)) },
  ];
  if (bridgeOverVisible(state.bridgeDes)) out.push({ obj: "decor", x: 208, y: 807, depth: -1240, spr: "bridr1over" });
  if (bridgeOverVisible(state.bridgeSin)) out.push({ obj: "decor", x: 1375, y: 788, depth: -1240, spr: "bridl1over" });
  for (const [dx, dy] of R32_POLES) out.push({ obj: "decor", x: R32_X + dx, y: R32_Y + dy, depth: 0, spr: "se" });
  if (blinkMotorVisible(t)) {
    for (const m of R32_MOTORS) out.push({ obj: "decor", x: m.x, y: m.y, depth: m.fixedDepth ?? motorDepth(m.spr), spr: m.spr });
  }
  return out;
}

// [C] r22/Create.gml + r220/Create.gml (relativo a r22, offset 1236,225):
// stesso schema di r32/r320 sopra — r220 ha anche lei `visible: 1` e uno
// sprite proprio ("baa22", `depth: 4`), non solo i pali dei semafori.
const R22_X = 1374, R22_Y = -64;
const R220_X = R22_X + 1236, R220_Y = R22_Y + 225;
const R220_POLES = [[40, 463], [140, 405], [130, 750], [192, 779]].map(([dx, dy]) => [1236 + dx, 225 + dy]);
// [C] dockersig3/Alarm_4.gml: `moto2` x2, stesso oggetto lampeggiante —
// vedi MOTO2_FIXED_DEPTH sopra: `moto2`, non `moto2a`, ma stesso principio
// (depth fisso mai riassegnato, non -y).
const R22_MOTORS = [
  { x: 2183, y: 908, spr: "motor2", fixedDepth: MOTO2_FIXED_DEPTH },
  { x: 2729, y: 1223, spr: "motor2", fixedDepth: MOTO2_FIXED_DEPTH },
];

/** Scenografia fissa della terza piattaforma — [C] dockersig3/Alarm_4.gml,
 * posizioni assolute. Chiamata solo a tier2 gia' espanso. `state` =
 * platformState intero: bridge_des2 (2363,783) e' l'unico ponte a due
 * battenti — a piattaforma aperta l'impalcato animato sparisce del tutto
 * e restano visibili solo le due meta' sollevate ("bridr1_sin"/
 * "bridr1_des", bridges.js/bridgeGapOpen()), non un semplice frame fermo. */
function r22Decor(state, t) {
  const bd2 = state.bridgeDes2;
  const out = [
    { obj: "decor", x: R22_X, y: R22_Y, depth: 4, spr: "baa21" },     // [C] r22/_object.json
    { obj: "decor", x: R220_X, y: R220_Y, depth: 4, spr: "baa22" },   // [C] r220/_object.json
    { obj: "decor", x: 1853, y: 263, depth: 2, spr: "moor21" },      // mudr21 — [C] _object.json: depth fisso
  ];
  if (bridgeGapOpen(bd2)) {
    out.push({ obj: "decor", x: 2363, y: 783, depth: -1100, spr: "bridr1_sin" });
    out.push({ obj: "decor", x: 2363, y: 783, depth: -1100, spr: "bridr1_des" });
  } else {
    out.push({ obj: "decor", x: 2363, y: 783, depth: -990, spr: "bridr1mo", frame: Math.round(bridgeDeckFrame(bd2)) });
  }
  if (bridgeOverVisible(bd2)) out.push({ obj: "decor", x: 2363, y: 783, depth: -1240, spr: "bridr1over" });
  for (const [dx, dy] of R220_POLES) out.push({ obj: "decor", x: R22_X + dx, y: R22_Y + dy, depth: 0, spr: "se" });
  if (blinkMotorVisible(t)) {
    for (const m of R22_MOTORS) out.push({ obj: "decor", x: m.x, y: m.y, depth: m.fixedDepth ?? motorDepth(m.spr), spr: m.spr });
  }
  // La nave cargo (game/src/bridges.js) — cliccabile solo se non gia'
  // presa e non "cargo3" (mai raccoglibile, [C] preso=2 dalla nascita).
  for (const s of state.ships) {
    const clickable = !s.taken;
    out.push({
      obj: clickable ? "cargoShip" : "decor", ref: s, x: s.x, y: s.y, depth: -s.y,
      spr: s.taken ? s.sprV : s.sprP,
    });
  }
  return out;
}

/** Fari/segnali della catena di tier1 (`faro1`/`faro2`), o la scenografia
 * di `r32` una volta espansa. */
function faro1Decor(state) {
  const out = [];
  const faro1Spr = state.tier1.stage === "locked" || state.tier1.stage === "buttonShown" ? "f1b" : "f1";
  out.push({ obj: "decor", x: FARO1.x, y: FARO1.y, depth: 0, spr: faro1Spr });
  out.push({ obj: "decor", x: FARO2.x, y: FARO2.y, depth: 0, spr: "f2b" });
  if (state.tier1.stage === "buttonShown") {
    out.push({ obj: "faroButton", x: FARO1.x, y: FARO1.y - 60, depth: SIGN_DEPTH, spr: "upico" });
  }
  if (state.tier1.stage === "wavesigShown") {
    out.push({ obj: "faroWaveSignal", x: FARO1.x, y: FARO1.y - 60, depth: SIGN_DEPTH, spr: "wavesin" });
  }
  if (state.tier1.stage === "lit" || state.tier1.stage === "expanding") {
    out.push({ obj: "decor", x: FARO1.x, y: FARO1.y, depth: -FARO1.y - 1, spr: "f1lux" });
    out.push({ obj: "decor", x: FARO2.x, y: FARO2.y, depth: -FARO2.y - 1, spr: "f1lux" });
  }
  if (state.tier1.stage === "lit") {
    out.push({ obj: "faroDockerSignal", x: FARO1.x, y: FARO1.y + 100, depth: SIGN_DEPTH, spr: "bridgesin" });
  }
  return out;
}

/** Fari/segnali della catena di tier2 (`faro3`), o la scenografia di `r22`
 * una volta espansa — [C] `faro3` non esiste finche' `dockersig1` non lo
 * crea (Alarm_4.gml): chiamata solo quando tier1 e' gia' "expanded". */
function faro3Decor(state, t) {
  if (state.tier2.stage === "expanded") return r22Decor(state, t);
  const out = [];
  const faro3Spr = state.tier2.stage === "locked" || state.tier2.stage === "buttonShown" ? "f3b" : "f3";
  out.push({ obj: "decor", x: FARO3.x, y: FARO3.y, depth: 0, spr: faro3Spr });
  if (state.tier2.stage === "buttonShown") {
    out.push({ obj: "faro3Button", x: FARO3.x, y: FARO3.y - 60, depth: SIGN_DEPTH, spr: "upico" });
  }
  if (state.tier2.stage === "wavesigShown") {
    out.push({ obj: "faro3WaveSignal", x: FARO3.x, y: FARO3.y - 60, depth: SIGN_DEPTH, spr: "wavesin" });
  }
  if (state.tier2.stage === "lit" || state.tier2.stage === "expanding") {
    out.push({ obj: "decor", x: FARO3.x, y: FARO3.y, depth: -FARO3.y - 1, spr: "f1lux" });
  }
  if (state.tier2.stage === "lit") {
    out.push({ obj: "faro3DockerSignal", x: FARO3.x, y: FARO3.y + 100, depth: SIGN_DEPTH, spr: "bridgesin" });
  }
  return out;
}

/** Le entry dinamiche (fari, segnali cliccabili, piattaforme espanse,
 * monviolo in volo) da aggiungere ogni frame al layer `dynamic` di
 * main.js, insieme al resto (monete/upsign). `t` = secondi trascorsi, solo
 * per il lampeggio delle "turbine" (blinkMotorVisible() sopra). */
export function faroDecor(state, t) {
  const out = state.tier1.stage === "expanded" ? r32Decor(state, t) : faro1Decor(state);
  if (state.tier1.stage === "expanded") out.push(...faro3Decor(state, t));
  // monviolo: non piu' qui — vive nell'array condiviso `balloons` (main.js),
  // gia' disegnato da li' come ogni altra mongolfiera in volo (stesso
  // depth fisso -3990, coerente col resto della famiglia). Vedi il
  // commento sopra SIGN_DEPTH per il perche' del cambio.
  // n_cluster1 — depth FISSO -7000 (STUDIO.md sopra su CLOUD_WAVE_Y: [C]
  // n_cluster1/_object.json, mai riassegnato), non -y: restano sempre in
  // primissimo piano sopra tutta la scenografia della piattaforma,
  // esattamente come nel decompilato.
  for (const c of state.clusterClouds) {
    out.push({ obj: "decor", x: c.x, y: c.y, depth: -7000, spr: "nimbuscluster1", _tint: c.tint });
  }
  return out;
}

// [Nuova funzionalita', richiesta dall'autore: "aumentiamo il range di
// spawn a seconda delle piattaforme costruite, sarebbe una cattiveria uno
// spawn a destra della piattaforma principale quando l'utente non ha
// possibilita' di prendere quelle mongolfiere, in particolare per gli
// attacchi"] game/src/balloons.js (mongolfiere di risorse/spia) e
// game/src/threats.js (le minacce vere: air/bombar/dirig) fanno nascere i
// propri bersagli fuori mappa a sinistra con una Y a dado in una fascia
// fissa, poi volano SEMPRE alla stessa diagonale di 30° (mai ricalcolata,
// STUDIO.md gia' lo osservava per entrambi i moduli) — quindi salgono di
// `dx * tan(30°)` per ogni `dx` percorso verso destra. La fascia Y di
// nascita di entrambi i moduli era tarata sull'altezza di `match_easy`
// (STUDIO.md), quindi troppo stretta per la piattaforma di `match` (molto
// piu' larga, e ancora di piu' una volta espansa): un bersaglio nasceva
// gia' troppo IN ALTO per avere abbastanza margine di salita residuo prima
// di uscire dal soffitto della mappa (y<0) quando arrivava all'altezza
// della piattaforma espansa — la piattaforma principale/`match_easy`
// restavano coperte, ma nessun bersaglio sopravviveva abbastanza a lungo
// da farsi vedere (ne' da colpire) vicino alle espansioni, per quanto un
// giocatore ci costruisse sopra delle difese.
//
// Qui si restituisce quanto ALZARE il tetto della fascia Y di nascita di
// ENTRAMBI i moduli (sommato al loro stesso massimo base, invariato) in
// base a quale piattaforma esiste GIA' — cosi' i bersagli nati nella parte
// piu' bassa della fascia allargata hanno abbastanza budget di salita per
// restare in quota fino a raggiungere anche l'area appena sbloccata, senza
// toccare la fascia "base" (gia' giusta per la sola piattaforma
// principale/`match_easy`, invariata quando nessuna espansione esiste
// ancora). Margine di conti, per `dx` fra lo spawn (`SPAWN_X = -170` in
// balloons.js/threats.js/air|bombar, il piu' comune dei due) e il bordo
// destro vero di ciascuna piattaforma (r32+r320 = R320_X+1600 = 3200,
// r22+r220 = R220_X+1223 = 3833, entrambe sopra):
//   tier1: dx = 3200-(-170) = 3370 -> salita = 3370*tan(30°) ≈ 1946px
//          (contro l'attuale tetto di 1620 — mancano ~326px) -> +450 di
//          margine e' comodamente sopra la soglia minima.
//   tier2: dx = 3833-(-170) = 4003 -> salita ≈ 2311px -> +750 di margine.
// Un bonus in PIXEL, non ricalcolato per ogni possibile spawnX diverso
// (`dirig`, threats.js, nasce da x=-1000 non -170): un'approssimazione
// dichiarata, non serve una precisione al pixel per un bilanciamento —
// vedi il commento sui chiamanti in balloons.js/threats.js.
export function spawnReachBonusY(platformState) {
  if (!platformState) return 0;
  if (platformState.tier2.stage === "expanded") return 750;
  if (platformState.tier1.stage === "expanded") return 450;
  return 0;
}
