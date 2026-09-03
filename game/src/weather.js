// La pioggia vera del temporale (src/objects/rainlauncher — r12/Alarm_2.gml,
// game/src/state.js): su `match` accompagna il temporale VERO (`r12.storm`),
// su `match_easy` e' l'UNICO effetto del temporale cosmetico (`r12.
// stormeasy`) — nessun fulmine, nessun banner "in arrivo" li' (game/src/
// state.js, stepWeather()).
//
// [C] `rainlauncher/Create.gml` (raw/gml/gml_Object_rainlauncher_Create_0.gml),
// letto riga per riga:
//   part_type_shape(partRain, 3)                   // pt_shape_line: una gocciolina-linea
//   part_type_size(partRain, 0.2, 0.3, 0, 0)        // scala 0.2-0.3, niente crescita/wiggle
//   part_type_color2(partRain, 8421376, 16777215)   // grigio (0x808080) -> bianco sulla vita
//   part_type_alpha2(partRain, 0.5, 0.1)            // alpha 0.5 -> 0.1 sulla vita
//   part_type_gravity(partRain, 0.1, 240)           // <- il vero "vento": vedi sotto
//   part_type_speed(partRain, 0.5, 0.5, 0, 0)       // spinta di lancio iniziale, minuscola
//   part_type_direction(partRain, 210, 290, 0, 1)   // direzione di lancio iniziale, randomizzata
//   part_type_orientation(partRain, 240, 240, 0, 0, 0)  // sprite ruotato a 240° fisso, per tutta la vita
//   part_type_life(partRain, 360, 380)              // 360-380 tick (~6s)
//   part_emitter_region(partRain_sys, partRain_emit, -400, 5500, -300, -300, 3, 0)
//                                                    // striscia orizzontale ("linea") FISSA sopra la room
//   part_emitter_stream(partRain_sys, partRain_emit, partRain, 15)  // 15 particelle/tick
//
// **La causa vera di entrambi i difetti segnalati dall'autore** ("le gocce
// non coprono tutto lo screen size", "la direzione e' irrealistica"):
//
// 1) `part_type_gravity` NON e' gravita' verticale — e' un'accelerazione
// COSTANTE applicata OGNI TICK in una direzione FISSA (240°, giu'-a-sinistra:
// vento che soffia da destra). La spinta di lancio iniziale (`part_type_
// speed`, 0.5 px/tick) e' minuscola al confronto: dopo appena ~5 tick (0.1s,
// l'1-2% di una vita di 6s) il contributo accumulato dalla gravita' supera
// gia' la spinta di partenza, e da li' in poi ogni goccia cade
// sostanzialmente ALLA STESSA identica inclinazione di 240° per il resto
// della sua vita — non un ventaglio ampio di traiettorie diverse (210-290°
// e' uno spread di 80°!), ma un campo di gocce quasi parallele, appena
// "sporcate" da una manciata di tick iniziali. **[Bug corretto]** Una prima
// lettura di questo file aveva sbagliato esattamente questo: applicava la
// gravita' come un semplice "+giu'" (solo su `vy`, mai su `vx`) — le gocce
// lanciate vicino a 210° (quasi orizzontali) restavano quasi orizzontali per
// l'intera vita invece di raddrizzarsi verso l'inclinazione comune, e quelle
// vicino a 290° (quasi verticali) non venivano mai spinte lateralmente: uno
// spread di traiettorie visibilmente incoerente, non pioggia vera. Corretto
// sotto: la gravita' e' ora un vettore vero (RAIN_GRAVITY_X/Y, in direzione
// RAIN_GRAVITY_DIR = 240° [C]) che agisce su `vx` E `vy` insieme e domina
// rapidamente la direzione iniziale — proprio come nell'originale.
//
// 2) L'originale emette su una striscia FISSA in coordinate di room
// (-400..5500): la room del gioco originale non aveva una camera libera
// come questa (pan/zoom veri, game/src/camera.js), quindi quella striscia
// copriva comunque l'intera vista perche' la vista nativa non usciva mai da
// li'. Qui la camera SI sposta/zooma (`cam.x/y/zoom`): una striscia fissa
// sull'intera `scene` (spesso molto piu' larga/alta della sola parte
// inquadrata in un dato istante) lasciava quasi sempre l'area VISIBILE poco
// o per niente coperta. **[Bug corretto]** La striscia di emissione ora
// segue la camera invece della scena: `spawnDrop()` prende i bordi del
// mondo attualmente INQUADRATO (stesso `cam.x/y ± cam.worldW/worldH / 2`
// gia' usato da main.js per il culling di `frameList()`), con un margine
// abbastanza ampio da coprire anche la deriva orizzontale che il vento
// imprime durante la vita della goccia (altrimenti il bordo sopravento —
// qui destra, essendo il vento verso sinistra — resterebbe visibilmente piu'
// scarso). Densita' invariata (900 gocce/s, [C] 15/tick a 60fps): non scala
// con la larghezza inquadrata, esattamente come l'originale (una striscia
// di larghezza fissa, densita' per-area costante) — zoomare fuori mostra la
// stessa pioggia "diluita" su piu' schermo, coerente con un'intensita' di
// pioggia vera e propria, non un numero di gocce a schermo tenuto costante
// ad ogni zoom.
import { Pool } from "./pool.js";

// `state.drops` sotto: un Pool riusabile (game/src/pool.js), non un array
// semplice — a 900 gocce/s (sotto) e' di gran lunga il flusso di particelle
// piu' pesante del motore, vedi il commento in pool.js sul perche'.
const RAIN_SPAWN_PERIOD = 1 / 900;         // 900 gocce/s — [C] 15 particelle/tick a 60fps, densita' nativa
const RAIN_LIFE = 2.4;                     // [I] tetto di sicurezza — la rimozione vera e' "uscita dall'area inquadrata" sotto, la vita nativa (360-380 tick, ~6s) non viene quasi mai raggiunta prima di uscire dallo schermo
const RAIN_DIR_MIN = 210, RAIN_DIR_MAX = 290;  // [C] part_type_direction: range di lancio iniziale
const RAIN_SPEED = 250;                    // px/s di spinta iniziale — [I] volutamente piccola rispetto alla gravita' sotto, stessa proporzione nativa (0.5 contro 0.1/tick: la spinta iniziale e' quasi subito sovrastata)
const RAIN_GRAVITY_DIR = 240;              // [C] part_type_gravity(partRain, 0.1, 240): la vera direzione di caduta, non "giu' e basta"
const RAIN_GRAVITY = 2000;                 // px/s^2 in RAIN_GRAVITY_DIR — [I] abbastanza forte da sovrastare la spinta iniziale entro una piccola frazione della vita, come nell'originale
const RAIN_GRAV_RAD = (RAIN_GRAVITY_DIR * Math.PI) / 180;
const RAIN_GRAVITY_X = Math.cos(RAIN_GRAV_RAD) * RAIN_GRAVITY;    // negativo: vento verso sinistra
const RAIN_GRAVITY_Y = -Math.sin(RAIN_GRAV_RAD) * RAIN_GRAVITY;   // positivo: verso il basso (Y schermo)
const RAIN_LEN = 30;                        // lunghezza della goccia (quad sottile)
const RAIN_WIDE = 3.5;
const RAIN_MARGIN = 600;                    // oltre i bordi della camera — abbastanza da coprire anche la deriva orizzontale del vento durante la vita di una goccia (vedi sopra)
// [I] Azzurro spento con contrasto sufficiente sulla tavolozza chiara del
// motore (grigi/pastello): nessun colore letto dal decompilato (part_
// type_color2 nativo non riproducibile 1:1). Alpha costante per tutta la
// vita della goccia — niente dissolvenza (a differenza di fumo/scintille,
// una goccia di pioggia non "sfuma": cade e sparisce quando esce dai bordi
// o scade, non prima).
const RAIN_TINT = 0x4a6a82;
const RAIN_ALPHA = 0.55;

export function createWeatherState() {
  return { spawnT: 0, drops: new Pool() };
}

/** Nasce appena sopra il bordo SUPERIORE dell'area attualmente inquadrata
 * dalla camera, distribuita su tutta la sua larghezza (+ margine, vedi il
 * commento in cima al file) — mai sulla scena intera. Direzione di lancio
 * randomizzata ([C] part_type_direction 210-290°) — quasi subito sovrastata
 * dalla gravita' vera (RAIN_GRAVITY_X/Y sopra, applicata in stepRain()
 * sotto), esattamente come nell'originale. `vx`/`vy` sono la velocita' VERA
 * (px/s, spazio schermo — y positiva verso il basso), letta direttamente da
 * rainDropAngle() per orientare il quad — nessuna ricostruzione
 * trigonometrica separata per il disegno. */
function spawnDrop(d, camLeft, camRight, camTop) {
  const dirRad = ((RAIN_DIR_MIN + Math.random() * (RAIN_DIR_MAX - RAIN_DIR_MIN)) * Math.PI) / 180;
  d.x = camLeft - RAIN_MARGIN + Math.random() * (camRight - camLeft + RAIN_MARGIN * 2);
  d.y = camTop - RAIN_MARGIN;
  d.vx = Math.cos(dirRad) * RAIN_SPEED;
  d.vy = -Math.sin(dirRad) * RAIN_SPEED;
  d.t = 0;
}

/** `raining`: true se un temporale (vero o cosmetico) e' attivo in questo
 * istante — chi chiama passa `r12.storm || r12.stormeasy` (main.js). Uno
 * stop e' sempre immediato (**[C]** r12/Alarm_7.gml: `with(rainlauncher)
 * action_kill_object()` distrugge l'intero sistema particellare nativo di
 * colpo, non lo lascia esaurirsi da solo) — qui svuota `drops` di scatto
 * appena `raining` torna false, stesso comportamento.
 *
 * `camLeft/camRight/camTop/camBottom`: i bordi del mondo attualmente
 * inquadrato dalla camera (main.js: `cam.x/y ± cam.worldW/worldH / 2`,
 * stesso calcolo gia' usato li' per il culling di `frameList()`) — la
 * striscia di emissione e la rimozione delle gocce seguono questi bordi
 * invece della scena intera, vedi il commento in cima al file. */
export function stepRain(state, dt, raining, camLeft, camRight, camTop, camBottom) {
  if (!raining) {
    if (state.drops.active.length) state.drops.clear();
    state.spawnT = 0;
    return;
  }
  state.spawnT += dt;
  while (state.spawnT >= RAIN_SPAWN_PERIOD) {
    state.spawnT -= RAIN_SPAWN_PERIOD;
    spawnDrop(state.drops.spawn(), camLeft, camRight, camTop);
  }
  const drops = state.drops.active;
  for (let i = drops.length - 1; i >= 0; i--) {
    const d = drops[i];
    d.t += dt;
    // [Bug corretto, segnalato dall'autore: "la direzione e' irrealistica"]
    // Vettore vero (RAIN_GRAVITY_X/Y sopra: componenti di un'accelerazione
    // in RAIN_GRAVITY_DIR), non piu' solo verticale — vedi il commento in
    // cima al file ([C] part_type_gravity(partRain, 0.1, 240) e'
    // un'accelerazione a 240°, non "giu' e basta").
    d.vx += RAIN_GRAVITY_X * dt;
    d.vy += RAIN_GRAVITY_Y * dt;
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    // Rimozione per uscita dall'area inquadrata (margine RAIN_MARGIN in
    // ogni direzione), non piu' legata alla sola scena intera — vedi il
    // commento in cima al file ("le gocce non coprono tutto lo screen
    // size"): una goccia che la camera ha gia' superato (sopra/sotto/di
    // lato) va tolta subito, continuare ad avanzarla fuori vista sarebbe
    // spreco puro. `d.t >= RAIN_LIFE` resta come tetto di sicurezza.
    if (d.t >= RAIN_LIFE
      || d.y > camBottom + RAIN_MARGIN
      || d.x < camLeft - RAIN_MARGIN * 2
      || d.x > camRight + RAIN_MARGIN * 2) {
      state.drops.release(i);
    }
  }
}

/** Angolo (gradi, stessa convenzione di drawRotated() in main.js: 0° =
 * verticale verso il basso, positivo in senso orario) della velocita' VERA
 * di questa goccia in questo istante — cambia frame per frame nei primi
 * istanti di vita, poi converge rapidamente verso l'inclinazione dominata
 * dalla gravita' (RAIN_GRAVITY_DIR = 240°, [C]) e ci resta per il resto
 * della caduta, esattamente come una goccia vera spinta dal vento. */
export function rainDropAngle(d) {
  return (Math.atan2(d.vx, d.vy) * 180) / Math.PI;
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
