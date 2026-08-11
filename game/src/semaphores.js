// Semafori come dati (STUDIO.md, stesso approccio di cars.js): l'oggetto
// "se" (il palo, `object8` nel decompilato — mai rinominato dall'autore
// originale, da cui il nome generico) crea un figlio `object37` che lampeggia
// a caso fra tre tappi colorati (giallo "se2", verde "se3", rosso "se4") con
// vuoti fra un colore e l'altro — non un vero ciclo rosso-giallo-verde
// sequenziale, un semaforo scelto a dado ad ogni cambio, come nel
// decompilato.
//
// A differenza delle luci di finestre/lampioni (main.js, stepLights()) non
// c'e' nessuna dissolvenza qui: l'originale (object37/Alarm_0.gml) passa da
// un colore a "empty" di scatto, e non dipende da notte/elettricita' — un
// semaforo e' acceso sempre, giorno e notte.
//
// [C] = letto nel decompilato (object8/object37).

const TICK = 1 / 60;
const BLANK_DUR = 13 * TICK;   // [C] object37/Alarm_0.gml: action_set_alarm(13, 3/4)

function dice(n) {
  return Math.random() < 1 / n;
}

/** [C] object37/Alarm_3.gml: dice(2) -> dice(2): se2/se4 (25% ciascuno), altrimenti se3 (50%). */
function pickColor() {
  if (dice(2)) return dice(2) ? "se2" : "se4";
  return "se3";
}

/** [C] object37/Alarm_4.gml: dice(2) -> dice(2): 80/109 tick, altrimenti 74 tick. */
function pickLitDuration() {
  if (dice(2)) return (dice(2) ? 80 : 109) * TICK;
  return 74 * TICK;
}

/** [C] object37/Create.gml: dice(4) sceglie quanto aspetta prima di accendersi
 * la prima volta (1/4 delle volte 30 tick, altrimenti 308) — da li' in poi
 * ogni ciclo usa sempre gli stessi 13 tick di vuoto (BLANK_DUR). */
export function createSemaphore(x, y) {
  return {
    x, y, depth: -y - 1,          // [C] object37/Create.gml: depth = -y - 1, davanti al palo
    t: 0, dur: (dice(4) ? 30 : 308) * TICK,
    spr: null,                     // null = "empty", nessun tappo colorato acceso
  };
}

export function stepSemaphores(list, dt) {
  for (const s of list) {
    s.t += dt;
    if (s.t < s.dur) continue;
    s.t = 0;
    if (s.spr) { s.spr = null; s.dur = BLANK_DUR; }
    else { s.spr = pickColor(); s.dur = pickLitDuration(); }
  }
}
