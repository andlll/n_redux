// Nuvole e uccelli — pura decorazione di sfondo, mai letta da nessuna
// regola di gioco (STUDIO.md, r12/Alarm_0.gml: parent "None", non fanno
// parte del gruppo "notte_target" che il ciclo giorno/notte ricolora — qui
// prendono comunque la stessa tinta ambientale di tutto il resto del
// mondo, la stessa semplificazione gia' scelta per l'intero motore, vedi
// main.js). Essendo *solo* estetica, questa e' la versione alleggerita:
// stessa sostanza (nascono a un ritmo fisso, vanno in diagonale, spariscono
// da sole dopo un tot) senza una macchina a stati per ogni singolo dettaglio
// dell'originale (autodistruzione immediata a meta' delle nuvole appena
// nate, due alarm separati per lo sbattito d'ali, ...).
//
// [C] = letto nel decompilato. [I] = semplificato deliberatamente.

const TICK = 1 / 60;
const DIR = (30 * Math.PI) / 180;     // [C] ni/nifast/birb: action_set_motion(30, ...), sempre la stessa diagonale
const COS30 = Math.cos(DIR), SIN30 = Math.sin(DIR);

function dice(n) { return Math.random() < 1 / n; }

function drift(it, dt) {
  it.t += dt;
  const pxPerSec = it.spd * 60;       // "speed" e' px/tick a room_speed 60
  it.x += COS30 * pxPerSec * dt;
  it.y -= SIN30 * pxPerSec * dt;
}

// [C] r12/Alarm_0.gml, ramo match_easy: 4 nuvole possono nascere ogni 140
// tick (~2.3s) appena fuori dai bordi della mappa, se non sta piovendo.
const CLOUD_SPAWNS = [
  { x: -350, y: 38 }, { x: -450, y: 526 }, { x: 470, y: 982 }, { x: -210, y: 1132 },
];
const CHECK_PERIOD = 140 * TICK;
const CLOUD_LIFE = 1200 * TICK;       // [C] ni/Create.gml: action_set_alarm(1200, 0) poi kill
const CLOUD_SPRITES = ["n1", "n2", "n3"];

function spawnClouds(atmo) {
  for (const p of CLOUD_SPAWNS) {
    if (dice(2)) continue;   // [C] ni/Create.gml: meta' delle nuvole create si autodistrugge all'istante
    atmo.clouds.push({
      x: p.x, y: p.y, t: 0,
      spd: dice(2) ? 7 : 4,                                        // [C] ni/Create.gml
      // [C] ni/Create.gml: -3990 (davanti a tutto) o 20 (dietro il terreno).
      // -3990 gia' basta da solo: 328 oggetti in tutto il decompilato usano
      // `depth = -y` (alberi, pali, edifici, veicoli, pedoni...) e la room
      // piu' grande (`match`) e' alta 2090px, quindi -y non scende mai sotto
      // -2090 — una nuvola "alta" e' quindi GIA' sempre davanti a qualunque
      // cosa stia a terra. [I] Spostato comunque a -6000 (margine extra,
      // richiesto dall'autore dopo aver visto una nuvola "bassa" coprire
      // alberi/pali sulla piattaforma appena tornata visibile): resta sotto
      // (meno davanti di) -7000/-9000+ — `nimbuscluster1`, monete/upsign,
      // fumo dei fucili — che devono restare sopra le nuvole per design.
      depth: dice(2) ? -6000 : 20,
      spr: CLOUD_SPRITES[(Math.random() * CLOUD_SPRITES.length) | 0],  // [I] pick uniforme fra le 3 varianti
    });
  }
}

// [Nuova funzionalita', gap chiuso: STUDIO.md, "nifast"] Le nuvole veloci
// esclusive di `match` (mai `match_easy`) — **[C]** `nifast/Create.gml`,
// riletto riga per riga a confronto con `ni` sopra (STUDIO.md ha il diff
// completo):
//  1. STESSE 4 posizioni fisse di spawn di `r12/Alarm_0.gml` (il ramo
//     opposto a `CLOUD_SPAWNS`, mai le stesse coordinate).
//  2. Meta' delle nuvole si autodistrugge all'istante come `ni` (stesso
//     `dice(2)`), ma valutato PRIMA di piazzare sprite/moto invece che
//     dopo — nessuna differenza visibile, stesso identico risultato.
//  3. Velocita' NEGATIVA, 8-14 (contro 4 o 7 di `ni`): GameMaker applica
//     una `action_set_motion` a velocita' negativa nella direzione
//     OPPOSTA alla stessa magnitudine — qui la stessa diagonale di
//     `COS30`/`SIN30` (DIR sopra) ma capovolta, un semplice `spd`
//     negativo essendo `drift()` gia' lineare in `spd`. Da qui il nome
//     "fast" (8-14 contro 4-7) e la direzione contraria.
//  4. Uno scarto di posizione RELATIVO applicato una sola volta allo
//     spawn (+100..300 x, ±100 y) prima che la moto abbia effetto — MAI
//     esattamente sul punto nominale sopra.
//  5. Sprite: SEMPRE `n2` all'inizio (mai `n1`, a differenza di `ni` che
//     lo mantiene come sprite di default meta' delle volte —
//     data/sprites.json/`_object.json`: "n1" e' il default dell'oggetto,
//     mai assegnato esplicitamente qui), poi 50% di passare a `n3`.
const NIFAST_SPAWNS = [
  { x: 940, y: -305 }, { x: 1735, y: -298 }, { x: 2200, y: 82 }, { x: 2450, y: 700 },
];
function spawnFastClouds(atmo) {
  for (const p of NIFAST_SPAWNS) {
    if (dice(2)) continue;   // [C] nifast/Create.gml
    atmo.clouds.push({
      x: p.x + 100 + Math.random() * 200, y: p.y + Math.random() * 200 - 100, t: 0,   // [C] il salto relativo allo spawn
      spd: -(8 + Math.random() * 6),                                           // [C] irandom_range(-8, -14)
      depth: 20,   // [C] nifast/Create.gml: "depth = -3990; depth = 20;" — la prima e' sempre sovrascritta, mai -3990 per davvero
      spr: dice(2) ? "n3" : "n2",
    });
  }
}

// [Bug corretto, segnalato dall'autore: "durante il temporale comparivano
// una marea di nuvole in più"] **[C]** `nidark`/`nidark_slow` (src/objects,
// letti da `r12` nei rami storm/stormeasy — STUDIO.md §1 "ni significa
// nuvola... nidark (nuvole di tempesta)", §9 "le nuvole scure/pioggia
// cosmetiche (nidark_slow, rainlauncher)"): esistono per davvero, sprite
// "n1d"/"n2d"/"n3d" — campionati pixel per pixel, stessa identica sagoma
// delle "n1"/"n2"/"n3" chiare ma tinta grigio scuro invece che bianca
// (invisibile sul cielo chiaro di giorno) — mai impacchettate ne' disegnate
// finora (tools/23_atlas.py). Il testo GML di Create/Alarm di `nidark` non
// e' pero' recuperabile da qui (nessun sorgente decompilato nella pipeline
// di estrazione, solo l'esistenza dell'oggetto/lo sprite): **[I]** stesso
// schema di spawnClouds() sopra (stesse 4 posizioni/lo stesso raggio di
// velocita'), ma SENZA il dice(2) che dimezza le nuvole chiare (ogni check
// ne nascono 4, non ~2) e a META' del CHECK_PERIOD (ogni ~1.15s invece di
// ~2.3s) — un cielo di tempesta visibilmente piu' affollato di nuvole
// scure, coerente con "una marea in piu'" invece di un semplice uno-a-uno
// con le chiare.
const DARK_CLOUD_CHECK_PERIOD = CHECK_PERIOD / 2;
const DARK_CLOUD_SPRITES = ["n1d", "n2d", "n3d"];

function spawnDarkClouds(atmo) {
  for (const p of CLOUD_SPAWNS) {
    atmo.clouds.push({
      x: p.x, y: p.y, t: 0,
      spd: dice(2) ? 7 : 4,
      depth: dice(2) ? -6000 : 20,
      spr: DARK_CLOUD_SPRITES[(Math.random() * DARK_CLOUD_SPRITES.length) | 0],
    });
  }
}

// [C] r12/Alarm_0.gml: dice(12) un uccello isolato, dice(36) uno stormo di
// 9 (birbcluster/Create.gml, offset fissi — una formazione stretta, non
// nove posizioni indipendenti), stessa cadenza delle nuvole.
const BIRD_FLOCK_OFFSETS = [
  [0, 0], [2, 16], [27, 14], [12, 29], [12, 29], [36, 27], [44, 23], [31, 35], [63, 9],
];
const BIRD_LIFE = 4000 * TICK;         // [C] birb/Create.gml: action_set_alarm(4000, 0) poi kill
const BIRD_FLAP = 30 * TICK;           // [I] un solo ciclo invece dei due alarm (24/60 tick) dell'originale

function makeBird(x, y) {
  return { x, y, t: 0, spd: 2, depth: -3990, spr: "brb1" };   // [C] birb/Create.gml: action_set_motion(30, 2)
}

function spawnBirds(atmo) {
  if (dice(12)) atmo.birds.push(makeBird(Math.random() * 6000 - 3000, 2500));
  if (dice(36)) {
    const bx = Math.random() * 6000 - 3000, by = 2500;
    for (const [dx, dy] of BIRD_FLOCK_OFFSETS) atmo.birds.push(makeBird(bx + dx, by + dy));
  }
}

export function createAtmosphere() {
  return { clouds: [], birds: [], t: 0, darkT: 0 };
}

/** `raining` = r12.storm||r12.stormeasy (STUDIO.md, state.js): [C] r12/
 * Alarm_0.gml non fa nascere le nuvole chiare quando sta piovendo — le
 * "nidark" scure della tempesta le sostituiscono (spawnDarkClouds() sopra),
 * a un ritmo piu' fitto (DARK_CLOUD_CHECK_PERIOD, sopra); gli uccelli invece
 * non dipendono dal meteo, volano comunque.
 * `fastClouds` [Nuova funzionalita', gap chiuso: STUDIO.md, "nifast"]: **[C]**
 * r12/Alarm_0.gml sceglie fra `ni`/`nifast` con la stessa variabile 736 gia'
 * nota altrove (STUDIO.md) per distinguere `match`/`match_easy` — falso
 * (`ni`, CLOUD_SPAWNS sopra) solo su `match_easy`. `main.js`/`title.js`
 * (sotto) passano `scene.name !== "match_easy"`: **[I]** include anche
 * `tutorial`, che nel decompilato condivide lo stesso ramo di `match` per
 * altri effetti identici (STUDIO.md, il nudge di `honda3`) — mai verificato
 * pero' un `r12/Alarm_0.gml` PROPRIO di `tutorial` (nessun estratto
 * disponibile, STUDIO.md), un'inferenza per analogia, non una lettura
 * diretta. `title.js` la passa sempre `true`: lo sfondo del menu raffigura
 * `match`, mai `match_easy`. */
export function stepAtmosphere(atmo, dt, raining, fastClouds = false) {
  atmo.t += dt;
  while (atmo.t >= CHECK_PERIOD) {
    atmo.t -= CHECK_PERIOD;
    if (!raining) { if (fastClouds) spawnFastClouds(atmo); else spawnClouds(atmo); }
    spawnBirds(atmo);
  }
  if (raining) {
    atmo.darkT += dt;
    while (atmo.darkT >= DARK_CLOUD_CHECK_PERIOD) {
      atmo.darkT -= DARK_CLOUD_CHECK_PERIOD;
      spawnDarkClouds(atmo);
    }
  } else {
    atmo.darkT = 0;
  }
  for (const list of [atmo.clouds, atmo.birds]) {
    for (let i = list.length - 1; i >= 0; i--) {
      drift(list[i], dt);
    }
  }
  atmo.clouds = atmo.clouds.filter((c) => c.t < CLOUD_LIFE);
  atmo.birds = atmo.birds.filter((b) => {
    if (b.t >= BIRD_LIFE) return false;
    b.spr = Math.floor(b.t / BIRD_FLAP) % 2 ? "brb2" : "brb1";   // [I] sbattito d'ali semplificato
    return true;
  });
}
