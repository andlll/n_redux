// I fuochi d'artificio sopra `chies` a Gennaio (src/objects/fireworker,
// creato da chies/Create.gml: `action_create_object(fireworker, 0, -400)`,
// offset RELATIVO a chies — quindi 400px sopra la sua testa, per tutta la
// partita, in QUALUNQUE room: `chies` esiste sempre e la creazione non e'
// gated su nessun flag di room). **[C]** fireworker non ha uno sprite
// proprio (solo 4 Alarm che richiamano `action_effect(3, dx, dy, ...)` —
// l'effetto "fuoco d'artificio" NATIVO di GameMaker, kind 3 = ef_firework):
// ognuno dei 4 lanciatori riarma se stesso ogni 60 tick (1s), sfalsati
// all'inizio (20/50/76/90 tick), ma l'esplosione vera scatta solo se
// `repre.mon` (STUDIO.md/state.js: la variabile "mon" del controller barra
// risorse e' il MESE del calendario, 1..12 — NON i soldi, nome in comune
// con r12.mon per puro caso, gia' un punto di confusione noto in questo
// progetto) vale 1, cioe' Gennaio. Le altre due condizioni lette nel
// decompilato (`action_if_number(644,0,2)`/`action_if_number(8,0,0)`) non
// sono mai state identificate con certezza (nessun altro punto del
// progetto le ha ancora decodificate) — **[I]** trattate qui come sempre
// vere durante una partita normale, dato che l'autore stesso descrive il
// comportamento osservato nell'originale come "fuochi d'artificio sopra
// chies a Gennaio", senza altre condizioni.
//
// Ogni lanciatore ha un offset relativo fisso da chies e un colore proprio
// (**[C]** `action_effect` impacchetta il colore R+G*256+B*65536, la stessa
// convenzione BGR gia' letta altrove in questo progetto — es. NIGHT_TINT,
// cars.js): decodificati una volta sola qui invece che a runtime.
import { Pool } from "./pool.js";

const LAUNCHERS = [
  { dx: -60, dy: 0, tint: 0xff8000, initialDelay: 20 / 60 },    // arancione
  { dx: 50, dy: 20, tint: 0x00ff40, initialDelay: 50 / 60 },    // verde
  { dx: -10, dy: -40, tint: 0xff0000, initialDelay: 76 / 60 },  // rosso
  { dx: 30, dy: -60, tint: 0x0080c0, initialDelay: 90 / 60 },   // azzurro
];
const LAUNCHER_PERIOD = 1;   // [C] 60 tick, ogni Alarm riarma se stesso
const OFFSET_Y = -400;       // [C] chies/Create.gml: action_create_object(fireworker, 0, -400)

// L'effetto nativo `ef_firework` di GameMaker non e' portabile 1:1 (nessun
// motore particellare nativo qui): **[I]** una scarica di scintille
// colorate a raggiera con gravita' e dissolvenza, la stessa idea visiva di
// un burst di fuochi d'artificio, disegnata con quad a tinta unita
// (solidFrame, gia' la tecnica usata altrove nel motore per flash/scie)
// invece di uno sprite dedicato.
const SPARK_COUNT = 24;
const SPARK_LIFE = [0.7, 1.2];
const SPARK_SPEED = [260, 480];
const SPARK_GRAVITY = 260;
const SPARK_SIZE = 7;
export const FIREWORK_DEPTH = -4000;   // stessa quota di esplosioni/fuoco vero (threats.js/projectiles.js)

// `sparks` (state.sparks sotto): un Pool riusabile (game/src/pool.js), non
// un array semplice — un burst crea 24 scintille in un colpo solo, fino a
// 4 volte/s con tutti e 4 i lanciatori attivi: abbastanza da valere lo
// stesso riciclo gia' fatto per il fumo/la pioggia, vedi il commento in
// pool.js.
function spawnBurst(x, y, tint, sparks) {
  for (let i = 0; i < SPARK_COUNT; i++) {
    const a = (i / SPARK_COUNT) * Math.PI * 2 + Math.random() * 0.3;
    const spd = SPARK_SPEED[0] + Math.random() * (SPARK_SPEED[1] - SPARK_SPEED[0]);
    const s = sparks.spawn();
    s.x = x; s.y = y; s.vx = Math.cos(a) * spd; s.vy = Math.sin(a) * spd;
    s.t = 0; s.life = SPARK_LIFE[0] + Math.random() * (SPARK_LIFE[1] - SPARK_LIFE[0]);
    s.tint = tint;
  }
}

/** `chiesX`/`chiesY`: posizione di `chies` in questa room (fissa per tutta
 * la partita — main.js la legge una sola volta dall'istanza seminata). */
export function createFireworksState(chiesX, chiesY) {
  return {
    x: chiesX, y: chiesY + OFFSET_Y,
    timers: LAUNCHERS.map((l) => l.initialDelay),
    sparks: new Pool(),
  };
}

/** `active`: true solo a Gennaio (`r12.month === 1`, main.js) — i timer dei
 * 4 lanciatori avanzano SEMPRE anche fuori stagione (fedele: nel
 * decompilato i 4 Alarm si riarmano comunque, il controllo che li rende
 * innocui e' dentro ciascuno di essi), cosi' il primo scoppio a Gennaio non
 * riparte sempre dallo stesso conto alla rovescia pieno. */
export function stepFireworks(state, dt, active) {
  for (let i = 0; i < LAUNCHERS.length; i++) {
    state.timers[i] -= dt;
    while (state.timers[i] <= 0) {
      state.timers[i] += LAUNCHER_PERIOD;
      if (active) {
        const l = LAUNCHERS[i];
        spawnBurst(state.x + l.dx, state.y + l.dy, l.tint, state.sparks);
      }
    }
  }
  const sparks = state.sparks.active;
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.t += dt;
    if (s.t >= s.life) { state.sparks.release(i); continue; }
    s.vy += SPARK_GRAVITY * dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
  }
}

export { SPARK_SIZE as FIREWORK_SPARK_SIZE };
