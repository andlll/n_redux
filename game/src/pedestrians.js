// Pedoni ("omini neri", sprite q1..q10) — src/objects/pplo, mai letto
// finora (STUDIO.md non lo cita). Ogni `casa1|2|3/Create.gml` ne crea uno
// alla propria posizione nell'ultima riga: non un evento per casa, uno per
// SALTO di livello — una casa arrivata al livello 3 ne ha lasciati indietro
// due, mai distrutti (nemmeno `casaN/Destroy.gml` li tocca: sopravvivono
// alla casa che li ha creati). Qui lo stesso aggancio vive in main.js,
// dentro `spawnDecor()`, allo stesso punto in cui stepConstructions()
// segnala "livello finito".
//
// Puramente estetico (nessuna regola di gioco li legge), quindi alleggerito
// su richiesta: cammina piano in una delle quattro diagonali, cambia
// direzione a caso ogni tanto — [C], la stessa tavola di probabilita' di
// pplo/Create.gml e Alarm_0.gml — ma senza la fisica di collisione vera
// contro `chies`/`pepazzittecollider` (`action_bounce`, STUDIO.md): resta
// semplicemente entro un raggio fisso dalla propria casa, [I] la stessa
// idea ("non si allontana troppo da dove e' nato") senza la mappa dei
// collider.

const TICK = 1 / 60;
const SPEED = 0.5 * 60;             // [C] pplo/Create.gml: action_set_motion(_, 0.5) — px/tick -> px/s
const HOME_RADIUS = 140;            // [I] sostituisce i rimbalzi contro i collider veri

// [C] pplo/Create.gml + Alarm_0.gml: quattro diagonali, ognuna 25%.
const DIRECTIONS = [30, 330, 150, 210].map((d) => (d * Math.PI) / 180);
// [C] idem: quattro durate possibili prima di ricambiare direzione, ognuna 25%.
const REDIRECT_DURS = [36, 58, 73, 83].map((t) => t * TICK);
// [C] pplo/Create.gml: la cascata di dadi per lo sprite equivale a "meta'
// delle volte resta 'q1' (il default), l'altra meta' un pick uniforme fra
// queste 8 (compresa 'q1' di nuovo)" — stessa distribuzione finale
// (9/16 q1, 1/16 ciascuna delle altre 7), molto meno codice.
const SPRITES = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q10"];

function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

export function spawnPedestrian(x, y) {
  return {
    homeX: x, homeY: y, x, y, t: 0,
    dir: pick(DIRECTIONS), redirectAt: pick(REDIRECT_DURS),
    spr: Math.random() < 0.5 ? "q1" : pick(SPRITES),
    depth: -y,
  };
}

export function stepPedestrians(list, dt) {
  for (const p of list) {
    p.t += dt;
    if (p.t >= p.redirectAt) {
      p.t = 0;
      p.dir = pick(DIRECTIONS);
      p.redirectAt = pick(REDIRECT_DURS);
    }
    p.x += Math.cos(p.dir) * SPEED * dt;
    p.y -= Math.sin(p.dir) * SPEED * dt;
    p.x = Math.max(p.homeX - HOME_RADIUS, Math.min(p.homeX + HOME_RADIUS, p.x));
    p.y = Math.max(p.homeY - HOME_RADIUS, Math.min(p.homeY + HOME_RADIUS, p.y));
    // [C] pplo/Step.gml: depth = -y, ricalcolato ogni Step perche' si muove.
    p.depth = -p.y;
  }
}
