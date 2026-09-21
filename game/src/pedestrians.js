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
//
// [Nuova funzionalita', richiesta dall'autore: "ottimizziamoli al massimo,
// sono la parte che pesa di piu' pur essendo solo estetici" + "evitiamo che
// scappino dallo sprite della piattaforma"] Due ritocchi, entrambi a costo
// pressoche' zero (mai un vero sistema di collisione, sproporzionato per un
// dettaglio decorativo):
// 1. Le quattro diagonali sono SEMPRE le stesse quattro — `Math.cos`/`Math.
//    sin` di un angolo che puo' assumere solo 4 valori non ha bisogno di
//    essere ricalcolato ad ogni pedone ad ogni frame: DIR_VECTORS sotto li
//    precalcola UNA sola volta al caricamento del modulo, stepPedestrians()
//    poi legge solo `p.vx`/`p.vy` (una moltiplicazione, zero trigonometria a
//    runtime) invece di `Math.cos(p.dir)`/`Math.sin(p.dir)` per ognuno.
// 2. `bounds` (opzionale, il bounding box dei lotti edificabili veri —
//    calcolato una volta sola al mount, main.js) e' un secondo clamp oltre
//    a HOME_RADIUS: non traccia la sagoma reale (irregolare) della
//    piattaforma — servirebbe la stessa mappa di collider mai ricostruita
//    (`pepazzittecollider`, commento sopra) per quello — ma impedisce la
//    fuga vera e propria oltre il bordo, l'unico difetto visibile
//    segnalato, con lo stesso costo di HOME_RADIUS (due confronti in piu'
//    per asse, nessuna allocazione).

const TICK = 1 / 60;
const SPEED = 0.5 * 60;             // [C] pplo/Create.gml: action_set_motion(_, 0.5) — px/tick -> px/s
const HOME_RADIUS = 140;            // [I] sostituisce i rimbalzi contro i collider veri

// [C] pplo/Create.gml + Alarm_0.gml: quattro diagonali, ognuna 25%. `vy` gia'
// col segno invertito (GameMaker: y cresce verso il basso, quindi vy =
// -speed*sin(dir)) cosi' stepPedestrians() sotto si limita a sommare, mai
// piu' un meno da ricordare a runtime.
const DIR_VECTORS = [30, 330, 150, 210].map((d) => {
  const r = (d * Math.PI) / 180;
  return { vx: Math.cos(r) * SPEED, vy: -Math.sin(r) * SPEED };
});
// [C] idem: quattro durate possibili prima di ricambiare direzione, ognuna 25%.
const REDIRECT_DURS = [36, 58, 73, 83].map((t) => t * TICK);
// [C] pplo/Create.gml: la cascata di dadi per lo sprite equivale a "meta'
// delle volte resta 'q1' (il default), l'altra meta' un pick uniforme fra
// queste 8 (compresa 'q1' di nuovo)" — stessa distribuzione finale
// (9/16 q1, 1/16 ciascuna delle altre 7), molto meno codice.
const SPRITES = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q10"];

function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

export function spawnPedestrian(x, y) {
  const v = pick(DIR_VECTORS);
  return {
    homeX: x, homeY: y, x, y, t: 0,
    vx: v.vx, vy: v.vy, redirectAt: pick(REDIRECT_DURS),
    spr: Math.random() < 0.5 ? "q1" : pick(SPRITES),
    depth: -y,
    // `_f` (il frame dell'atlas per `spr`, mai cambiato dopo la nascita):
    // main.js lo pesca/mette in cache qui sopra la prima volta che serve,
    // stessa idea di `staticWorld[i]._f`/healMissingArt() li' — uno sprite
    // fisso non ha bisogno di essere rifetchato ad ogni frame.
    _f: null,
  };
}

/** `bounds` (opzionale): `{left, right, top, bottom}`, il bounding box dei
 * lotti edificabili veri (main.js, calcolato una volta al mount da
 * `placeholders`) — un secondo clamp oltre a HOME_RADIUS, vedi il commento
 * in cima al file. */
export function stepPedestrians(list, dt, bounds) {
  for (const p of list) {
    p.t += dt;
    if (p.t >= p.redirectAt) {
      p.t = 0;
      const v = pick(DIR_VECTORS);
      p.vx = v.vx; p.vy = v.vy;
      p.redirectAt = pick(REDIRECT_DURS);
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.x = Math.max(p.homeX - HOME_RADIUS, Math.min(p.homeX + HOME_RADIUS, p.x));
    p.y = Math.max(p.homeY - HOME_RADIUS, Math.min(p.homeY + HOME_RADIUS, p.y));
    if (bounds) {
      p.x = Math.max(bounds.left, Math.min(bounds.right, p.x));
      p.y = Math.max(bounds.top, Math.min(bounds.bottom, p.y));
    }
    // [C] pplo/Step.gml: depth = -y, ricalcolato ogni Step perche' si muove.
    p.depth = -p.y;
  }
}
