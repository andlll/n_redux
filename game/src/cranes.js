// Le gru transitorie di cantiere (`gru`, sprite di default "gru1" —
// src/objects/gru) create durante il piazzamento/potenziamento di quasi
// ogni edificio (BUILDING_TYPES in buildings.js, gli step con `spawn: [{spr:
// "gru1", ...}, ...]` a 4-5 angoli). [Bug corretto, segnalato dall'autore:
// "molte gru non si montano, si crea solo la base ma non i pezzi sopra"]
// main.js trattava ogni spawn "gru1" come un decoro FERMO — un solo sprite
// per tutta la durata del cantiere, mai sostituito. **[C]** `gru/Create.gml`
// + `Alarm_0..6`: la gru vera si MONTA (gru1 -> gru2 -> gru3, sempre piu'
// alta), fa comparire un braccio in cima ("grutop", offset (0,0) — nato
// dalla gru stessa) per ~600 tic, poi si SMONTA (gru3 -> gru2 -> gru1) e
// sparisce da sola — indipendentemente dal resto del cantiere, che di
// solito dura molto di piu'. Stesso principio di game/src/scaffold.js (il
// sotto-sistema gemello per il grattacielo): stato per-istanza avanzato ogni
// frame, appiattito in voci di disegno da main.js.
const TICK = 1 / 60;

// [C] gru/Create.gml: arma alarm(100,0). Alarm_0(t=100): sprite=gru2, arma
// alarm(100,1). Alarm_1(t=200): sprite=gru3, arma alarm(100,2). Alarm_2
// (t=300): crea "grutop" (offset 0,0), arma alarm(600,3). Alarm_3(t=900):
// arma alarm(40,4). Alarm_4(t=940): sprite=gru2, arma alarm(40,5). Alarm_5
// (t=980): sprite=gru1, arma alarm(40,6). Alarm_6(t=1020): kill.
const T_GRU2_UP = 100 * TICK;
const T_GRU3 = 200 * TICK;
const T_GRUTOP_SPAWN = 300 * TICK;
const T_GRU2_DOWN = 900 * TICK;
const T_GRU1_DOWN = 940 * TICK;   // [C] Alarm_4 (sprite=gru2) scatta qui — vedi sotto
const T_DIE = 980 * TICK + 40 * TICK;   // [C] Alarm_5(t=980, sprite=gru1) + 40 = Alarm_6(kill), 1020 tic totali

// [C] grutop/Create.gml: `action_set_alarm(600, 1)`, Alarm_1: `action_kill_
// object()` — vive esattamente 600 tic dalla propria nascita (t=300..900
// del genitore, la stessa finestra in cui la gru resta ferma su "gru3").
const GRUTOP_LIFE = 600 * TICK;
// [I] Il braccio vero (`grutop/Alarm_0..7`) oscilla fra due famiglie di
// sprite speculari (gto*/gtao*, "sette" = a meta' corsa) con un dado ad ogni
// alarm e tempi 28..52 tic — semplificato qui in un ciclo fisso a tre pose
// (neutro "gt0" -> braccio "gto"/"gtao" -> "gto7"/"gtao7" -> neutro...),
// lato scelto a dado ad ogni giro invece che dalla catena di branch esatta:
// stesso effetto visivo (un braccio che oscilla avanti e indietro), non la
// stessa sequenza di stati.
const GRUTOP_STEP = 50 * TICK;

function makeCrane(dx, dy) {
  return { dx, dy, t: 0, spr: "gru1", grutop: null, dead: false };
}

function makeGrutop() {
  return { t: 0, age: 0, next: GRUTOP_STEP, phase: 0, side: Math.random() < 0.5, spr: "gt0" };
}

function stepGrutop(g, dt) {
  g.t += dt;
  while (g.t >= g.next) {
    g.t -= g.next;
    g.next = GRUTOP_STEP;
    if (g.phase === 0) { g.side = Math.random() < 0.5; g.spr = g.side ? "gto" : "gtao"; g.phase = 1; }
    else if (g.phase === 1) { g.spr = g.side ? "gto7" : "gtao7"; g.phase = 2; }
    else { g.spr = "gt0"; g.phase = 0; }
  }
}

function stepCrane(c, dt) {
  if (c.dead) return;
  c.t += dt;
  if (c.t >= T_DIE) { c.dead = true; c.grutop = null; return; }
  c.spr = c.t < T_GRU2_UP ? "gru1" : c.t < T_GRU3 ? "gru2" : c.t < T_GRU2_DOWN ? "gru3" : c.t < T_GRU1_DOWN ? "gru2" : "gru1";
  if (!c.grutop && c.t >= T_GRUTOP_SPAWN && c.t - dt < T_GRUTOP_SPAWN) c.grutop = makeGrutop();
  if (c.grutop) {
    c.grutop.age += dt;
    if (c.grutop.age >= GRUTOP_LIFE) c.grutop = null;
    else stepGrutop(c.grutop, dt);
  }
}

/** Aggiunge una nuova gru al cantiere di `building` — chiamata da main.js al
 * posto di un decoro fermo, per ogni spawn `{spr:"gru1", dx, dy}` di
 * BUILDING_TYPES (buildings.js). */
export function addCrane(building, dx, dy) {
  if (!building._cranes) building._cranes = [];
  building._cranes.push(makeCrane(dx, dy));
}

/** Avanza tutte le gru di tutti gli edifici in cantiere — chiamata una
 * volta per frame da main.js, insieme a stepConstructions()/
 * stepGrattacieloScaffold(). Le gru gia' morte (`dead`) restano
 * nell'array finche' il cantiere non finisce (removeTransientDecor in
 * main.js le toglie insieme al resto del decoro transitorio): risparmia un
 * filtro ad ogni frame per un array che al piu' ha 5 elementi. */
export function stepCranes(buildings, dt) {
  for (const b of buildings) {
    if (!b.construction || !b._cranes) continue;
    for (const c of b._cranes) stepCrane(c, dt);
  }
}

/** Appiattisce le gru vive di un edificio in voci pronte per il disegno
 * (`{x,y,depth,spr}`) — stesso principio di scaffoldParts() (game/src/
 * scaffold.js). Il corpo della gru segue la normale `-y` di ogni decoro
 * (nessun offset: [C] gru/_object.json, `depth = -y`); il braccio
 * (`grutop`) salta -260 in piu' (**[C]** `grutop/Create.gml: depth = -y -
 * 260`) per restare sempre davanti al corpo che lo regge. */
export function craneParts(b) {
  if (!b._cranes) return [];
  const out = [];
  for (const c of b._cranes) {
    if (c.dead) continue;
    const y = b.y + c.dy;
    out.push({ x: b.x + c.dx, y, depth: -y, spr: c.spr });
    if (c.grutop) out.push({ x: b.x + c.dx, y, depth: -y - 260, spr: c.grutop.spr });
  }
  return out;
}
