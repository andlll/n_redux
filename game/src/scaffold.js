// L'impalcatura/gru rotanti del grattacielo (`m3cant`, BUILDING_TYPES.grattacielo
// in buildings.js) — [C] impa31r|f -> impa32r|f -> impa33r|f (tre pannelli di
// impalcatura, ognuno spawnato dal precedente a meta' della propria crescita)
// + impa3gru -> impa3gru1/impa3gru2 (una gru fissa che ne spawna due rotanti).
// STUDIO.md, "gap dichiarato — cantiere/gru non ricostruiti": un intero
// sotto-sistema di scenografia SENZA alcun effetto sul costo/tempo del vero
// cantiere (letti entrambi direttamente da `m3cant`, mai da questi oggetti) —
// qui portato perche' esplicitamente richiesto, non perche' cambi la
// simulazione.
//
// [I] L'originale fa anche una cosa strana all'ULTIMO pannello (`impa33f|r`):
// 2400 tick dopo aver finito di crescere arma un timer che lo smonta da solo
// (`demos=1`, Alarm_1) — nessun altro pezzo della catena lo segue mai (solo
// impa33 arma quel timer), quindi sarebbe un'impalcatura smontata solo a
// meta'. Trattato come rumore del decompilato (quasi certamente codice di
// debug/test mai ripulito): qui l'intera impalcatura/gru sparisce insieme,
// alla vera fine del cantiere (stesso schema gia' in uso per gru/topper di
// ogni altro edificio, main.js: onSpawn/onFinish di stepConstructions()) —
// non e' un onFinish separato: stepGrattacieloScaffold() sotto controlla da
// solo `b.construction` ad ogni chiamata.
const TICK = 1 / 60;

const PANEL_PERIOD = 24 * TICK;              // [C] tutti gli Alarm_0 dei pannelli si riarmano a 24 tick
const PANEL_INIT_F = 240 * TICK;              // [C] impa31f|32f|33f/Create.gml: alarm[0] = 240
const PANEL_INIT_R = 226 * TICK;              // [C] impa31r|32r|33r/Create.gml: alarm[0] = 226 (sempre 14 tick prima di "f")
// [C] impa31f/Alarm_0.gml + impa32f/Alarm_0.gml: lo spawn del pannello
// successivo scatta a `phase==18` — un numero fisso, non legato al totale di
// frame del pannello (17 per L1, 25 per L2: L2 spawna L3 a meta' della
// propria crescita, non alla fine). Stesso istante per entrambi perche'
// condividono lo stesso `initialDelay`/`period`.
const CHILD_SPAWN_T = PANEL_INIT_F + 17 * PANEL_PERIOD;   // 648 tick (~10.8s)

const OSC_STEP = 10 * TICK;                   // [C] impa3gru1|2/Alarm_0.gml: passo fra due pose vicine
const OSC_PAUSE = 120 * TICK;                 // [C] pausa a ciascun estremo dell'oscillazione

function growthFrames(prefix, count, suffix) {
  // [C] i risultati di ogni Alarm_0 CONTANO ALL'INDIETRO (phase 1 -> sprite
  // piu' alto, phase N -> sprite "01"): letto cosi' com'e' dal decompilato,
  // non e' un errore di verso.
  const out = [];
  for (let i = count; i >= 1; i--) out.push(`${prefix}${String(i).padStart(2, "0")}${suffix}`);
  return out;
}
const L1F_FRAMES = growthFrames("i31", 17, "f");
const L1R_FRAMES = growthFrames("i31", 17, "r");
const L2F_FRAMES = growthFrames("i32", 25, "f");
const L2R_FRAMES = growthFrames("i32", 25, "r");
const L3F_FRAMES = growthFrames("i33", 18, "f");
const L3R_FRAMES = growthFrames("i33", 18, "r");

const GRU1_FRAMES = ["grum311", "grum312", "grum313", "grum314", "grum315", "grum316"];
const GRU2_FRAMES = ["grum321", "grum322", "grum323", "grum324", "grum325", "grum326"];

/** Un pannello d'impalcatura: cresce per `frames.length` passi poi resta fermo
 * sull'ultimo. [C] `frameIdx` corrisponde a `phase-1`; il frame N-esimo
 * appare a `init + N*period` (Alarm_0 si riarma sempre alla stessa cadenza,
 * mai un'eccezione in nessuno dei tre pannelli). */
function makePanel(frames, init, defaultSpr, dx, dy, depthOffset) {
  return { frames, t: 0, frameIdx: 0, init, spr: defaultSpr ?? frames[0], dx, dy, depthOffset };
}
function stepPanel(p, dt) {
  p.t += dt;
  while (p.frameIdx < p.frames.length && p.t >= p.init + p.frameIdx * PANEL_PERIOD) {
    p.spr = p.frames[p.frameIdx];
    p.frameIdx++;
  }
}

/** [C] impa3gru/Alarm_0.gml: 5 passi da 60 tick (dopo un ritardo iniziale di
 * 260) che spawnano impa3gru1 al 4° passo e impa3gru2 al 5°, poi si fermano
 * per sempre sull'ultimo sprite — a differenza dei pannelli sopra, qui lo
 * spawn e' letteralmente nello stesso branch che disegna quel frame, non un
 * controllo separato. */
function stepGru0(g, dt, spawnGru1, spawnGru2) {
  if (g.done) return;
  g.t += dt;
  while (!g.done && g.t >= g.next) {
    g.t -= g.next;
    if (g.phase === 1) { g.spr = "impm32"; g.phase = 2; g.next = 60 * TICK; }
    else if (g.phase === 2) { g.spr = "impm33"; g.phase = 3; g.next = 60 * TICK; }
    else if (g.phase === 3) { g.spr = "impm34"; g.phase = 4; g.next = 60 * TICK; }
    else if (g.phase === 4) { g.spr = "impm35"; g.phase = 5; g.next = 60 * TICK; spawnGru1(); }
    else { g.spr = "impm36"; g.done = true; spawnGru2(); }
  }
}

/** [C] impa3gru1|2/Alarm_0.gml, transcritto passo per passo (stato
 * `phase`/`rota`): oscilla per sempre fra le 6 pose (`frames[0..5]`), 4 passi
 * da 10 tick avanti/indietro fra le pose intermedie, una pausa di 120 tick a
 * ciascun estremo — l'unica animazione di questo gap senza una vera fine
 * (nessun Destroy in nessuno dei due oggetti nel decompilato). */
function stepOscillator(p, dt) {
  p.t += dt;
  while (p.t >= p.next) {
    p.t -= p.next;
    const F = p.frames;
    if (p.rota === 0) {
      if (p.phase === 1) { p.phase = 2; p.spr = F[1]; p.next = OSC_STEP; }
      else if (p.phase === 2) { p.phase = 3; p.spr = F[2]; p.next = OSC_STEP; }
      else if (p.phase === 3) { p.phase = 4; p.spr = F[3]; p.next = OSC_STEP; }
      else if (p.phase === 4) { p.phase = 5; p.spr = F[4]; p.next = OSC_STEP; }
      else { p.spr = F[5]; p.next = OSC_PAUSE; p.rota = 1; }
    } else {
      if (p.phase === 1) { p.spr = F[0]; p.next = OSC_PAUSE; p.rota = 0; }
      else if (p.phase === 2) { p.phase = 1; p.spr = F[1]; p.next = OSC_STEP; }
      else if (p.phase === 3) { p.phase = 2; p.spr = F[2]; p.next = OSC_STEP; }
      else if (p.phase === 4) { p.phase = 3; p.spr = F[3]; p.next = OSC_STEP; }
      else { p.phase = 4; p.spr = F[4]; p.next = OSC_PAUSE; }
    }
  }
}

function makeOscillator(frames, initialDelay, dx, dy, depthOffset) {
  return { frames, phase: 1, rota: 0, spr: frames[0], t: 0, next: initialDelay, dx, dy, depthOffset };
}

/** [C] `m3cant/Create.gml`: crea `impa31f` a offset relativo (2, 0). Ogni
 * altro pezzo della catena e' offset relativo dal suo genitore (STUDIO.md
 * sopra) — qui gia' appiattito in offset assoluti da `b.x`/`b.y`, cosi'
 * stepGrattacieloScaffold() non deve tenere una gerarchia di posizioni. */
function makeScaffold() {
  return {
    l1f: makePanel(L1F_FRAMES, PANEL_INIT_F, "i3118f", 2, 0, 0),
    l1r: makePanel(L1R_FRAMES, PANEL_INIT_R, undefined, 2, 0, 2),
    l2f: null, l2r: null, l3f: null, l3r: null,
    gru0: null, gru1: null, gru2: null,
  };
}

function stepScaffold(s, dt) {
  stepPanel(s.l1f, dt);
  stepPanel(s.l1r, dt);
  if (!s.l2f && s.l1f.t >= CHILD_SPAWN_T) {
    // [C] impa31f/Alarm_0.gml, phase==18: crea impa32f (offset -24,-268) e
    // impa3gru (offset 1,-257) nello stesso istante — nessuno dei due esiste
    // prima d'ora.
    s.l2f = makePanel(L2F_FRAMES, PANEL_INIT_F, undefined, s.l1f.dx - 24, s.l1f.dy - 268, -271);
    s.l2r = makePanel(L2R_FRAMES, PANEL_INIT_R, undefined, s.l1f.dx - 24, s.l1f.dy - 268, -265);
    s.gru0 = { spr: "impm31", t: 0, phase: 1, next: 260 * TICK, done: false, dx: s.l1f.dx + 1, dy: s.l1f.dy - 257, depthOffset: -258 };
  }
  if (s.l2f) {
    stepPanel(s.l2f, dt);
    stepPanel(s.l2r, dt);
    if (!s.l3f && s.l2f.t >= CHILD_SPAWN_T) {
      // [C] impa32f/Alarm_0.gml, phase==18: crea impa33f (offset 67,-72).
      s.l3f = makePanel(L3F_FRAMES, PANEL_INIT_F, undefined, s.l2f.dx + 67, s.l2f.dy - 72, -341);
      s.l3r = makePanel(L3R_FRAMES, PANEL_INIT_R, undefined, s.l2f.dx + 67, s.l2f.dy - 72, -339);
    }
  }
  if (s.l3f) { stepPanel(s.l3f, dt); stepPanel(s.l3r, dt); }
  if (s.gru0) {
    stepGru0(s.gru0, dt,
      () => { s.gru1 = makeOscillator(GRU1_FRAMES, 10 * TICK, s.gru0.dx + 94, s.gru0.dy - 554, -831); },
      () => { s.gru2 = makeOscillator(GRU2_FRAMES, 20 * TICK, s.gru0.dx + 145, s.gru0.dy - 809, -1088); });
  }
  if (s.gru1) stepOscillator(s.gru1, dt);
  if (s.gru2) stepOscillator(s.gru2, dt);
}

/** Chiamata ogni frame da main.js, subito dopo stepConstructions(): crea lo
 * stato scaffolding quando un grattacielo entra in cantiere, lo avanza finche'
 * il cantiere e' in corso, lo dimentica alla vera fine (`b.construction`
 * torna `null`, stesso momento in cui gru/topper transitori di ogni altro
 * edificio spariscono — STUDIO.md sopra spiega perche' non serve un
 * `onFinish` dedicato). */
export function stepGrattacieloScaffold(buildings, dt) {
  for (const b of buildings) {
    if (b.type !== "grattacielo") continue;
    if (b.construction) {
      if (!b._scaffold) b._scaffold = makeScaffold();
      stepScaffold(b._scaffold, dt);
    } else if (b._scaffold) {
      b._scaffold = null;
    }
  }
}

/** Appiattisce lo stato scaffolding di un edificio in voci pronte per il
 * disegno (`{x,y,depth,spr}`) — main.js le trasforma poi nello stesso
 * `{obj:"decor", ...}` di ogni altro decoro, cosi' prendono gratis lo stesso
 * scurimento notturno che l'originale applica con `action_sprite_color`
 * (STUDIO.md sopra) senza bisogno di `_selfLit`. */
export function scaffoldParts(b) {
  const s = b._scaffold;
  if (!s) return [];
  const parts = [s.l1f, s.l1r];
  if (s.l2f) parts.push(s.l2f, s.l2r);
  if (s.l3f) parts.push(s.l3f, s.l3r);
  if (s.gru0) parts.push(s.gru0);
  if (s.gru1) parts.push(s.gru1);
  if (s.gru2) parts.push(s.gru2);
  return parts.map((p) => ({ x: b.x + p.dx, y: b.y + p.dy, depth: -(b.y + p.dy) + p.depthOffset, spr: p.spr }));
}
