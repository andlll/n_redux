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
  return { clouds: [], birds: [], t: 0 };
}

/** `raining` = r12.storm (STUDIO.md, state.js): [C] r12/Alarm_0.gml non fa
 * nascere nuvole quando sta piovendo (le nidark della tempesta le
 * sostituiscono — non ricostruite, STUDIO.md "le tempeste diventano
 * reali"); gli uccelli invece non dipendono dal meteo, volano comunque. */
export function stepAtmosphere(atmo, dt, raining) {
  atmo.t += dt;
  while (atmo.t >= CHECK_PERIOD) {
    atmo.t -= CHECK_PERIOD;
    if (!raining) spawnClouds(atmo);
    spawnBirds(atmo);
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
