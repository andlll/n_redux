// La pioggia vera del temporale (src/objects/rainlauncher — r12/Alarm_2.gml,
// game/src/state.js): su `match` accompagna il temporale VERO (`r12.storm`),
// su `match_easy` e' l'UNICO effetto del temporale cosmetico (`r12.
// stormeasy`) — nessun fulmine, nessun banner "in arrivo" li' (game/src/
// state.js, stepWeather()).
//
// [C] `rainlauncher/Create.gml` usa il sistema particellare NATIVO di
// GameMaker (`part_type_shape` "linea", `part_emitter_stream` 15
// particelle/tick, vita 360-380 tick, gravita' 0.1@240°, direzione
// 210-290°, dimensione/colore/alpha interpolati sulla vita) — nessun
// equivalente diretto in un batch renderer fatto a mano come questo (niente
// GPU particle system, niente migliaia di quad extra per frame senza
// impattare il framerate). **[I]** Qui una goccia e' un quad sottile
// (solidFrame, come i flash/overlay gia' altrove nel motore — nessuno
// sprite dedicato necessario), stessa idea di fondo (cade obliqua,
// accelera, sfuma), ma a una densita' molto piu' bassa (le 900
// particelle/secondo native sarebbero insostenibili qui) — resta comunque
// riconoscibile come pioggia senza pesare sul framerate.

const RAIN_SPAWN_PERIOD = 1 / 90;         // ~90 gocce/s — [I] densita' ridotta, vedi sopra
const RAIN_LIFE = 1.3;                     // [I] non i 360-380 tick (6s) nativi: qui la caduta e' molto piu' veloce (vedi RAIN_SPEED)
const RAIN_DIR = (245 * Math.PI) / 180;    // [I] a meta' del range 210-290° dell'originale
const RAIN_SPEED = 900;                     // px/s iniziale — [I] tarata per attraversare lo schermo in ~1s, non i 0.5px/tick quasi fermi nativi (li' e' la gravita' a fare il lavoro sui 6s di vita)
const RAIN_GRAVITY = 500;                   // px/s^2 aggiuntivi verso il basso — [I]
const RAIN_LEN = 30;                        // lunghezza della goccia (quad sottile)
const RAIN_WIDE = 3.5;
const RAIN_MARGIN = 250;                    // oltre i bordi scena, cosi' non "nasce" visibilmente in vista
// [I] Azzurro spento con contrasto sufficiente sulla tavolozza chiara del
// motore (grigi/pastello): nessun colore letto dal decompilato (part_
// type_color2 nativo non riproducibile 1:1). Alpha costante per tutta la
// vita della goccia — niente dissolvenza (a differenza di fumo/scintille,
// una goccia di pioggia non "sfuma": cade e sparisce quando esce dai bordi
// o scade, non prima).
const RAIN_TINT = 0x4a6a82;
const RAIN_ALPHA = 0.55;
const RAIN_COS = Math.cos(RAIN_DIR), RAIN_SIN = Math.sin(RAIN_DIR);

export function createWeatherState() {
  return { spawnT: 0, drops: [] };
}

function spawnDrop(sceneWidth) {
  return {
    x: Math.random() * (sceneWidth + RAIN_MARGIN * 2) - RAIN_MARGIN,
    y: -RAIN_MARGIN,
    vy0: 0,
    t: 0,
  };
}

/** `raining`: true se un temporale (vero o cosmetico) e' attivo in questo
 * istante — chi chiama passa `r12.storm || r12.stormeasy` (main.js). Uno
 * stop e' sempre immediato (**[C]** r12/Alarm_7.gml: `with(rainlauncher)
 * action_kill_object()` distrugge l'intero sistema particellare nativo di
 * colpo, non lo lascia esaurirsi da solo) — qui svuota `drops` di scatto
 * appena `raining` torna false, stesso comportamento. */
export function stepRain(state, dt, raining, sceneWidth, sceneHeight) {
  if (!raining) {
    if (state.drops.length) state.drops.length = 0;
    state.spawnT = 0;
    return;
  }
  state.spawnT += dt;
  while (state.spawnT >= RAIN_SPAWN_PERIOD) {
    state.spawnT -= RAIN_SPAWN_PERIOD;
    state.drops.push(spawnDrop(sceneWidth));
  }
  for (let i = state.drops.length - 1; i >= 0; i--) {
    const d = state.drops[i];
    d.t += dt;
    d.vy0 += RAIN_GRAVITY * dt;
    d.x += RAIN_COS * RAIN_SPEED * dt;
    d.y += (-RAIN_SIN * RAIN_SPEED + d.vy0) * dt;
    if (d.t >= RAIN_LIFE || d.y > sceneHeight + RAIN_MARGIN) state.drops.splice(i, 1);
  }
}

// [I] Depth: **[C]** l'originale userebbe `part_system_depth(partRain_sys,
// -1200)` — sopra alla maggior parte della scenografia di terra ma sotto ai
// flash/effetti in primissimo piano (esplosioni/lampi, -4000). Le gocce non
// passano pero' dal ciclo di disegno ordinato per depth di main.js (hanno
// bisogno di una rotazione, che quel ciclo non applica — drawRotated()
// invece si') — vengono percio' disegnate a parte, sempre sopra al resto
// del mondo gia' ordinato: l'effetto pratico (pioggia sempre ben visibile,
// mai nascosta da un edificio) resta lo stesso.
export { RAIN_LEN as RAIN_STREAK_LENGTH, RAIN_WIDE as RAIN_STREAK_WIDTH, RAIN_TINT, RAIN_ALPHA };
