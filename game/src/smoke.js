// Il fumo decorativo delle centrali (`industria`) — [C] industria1|2|3/
// Alarm_3|4.gml + smoke_ind|smoke_ind_2/Create|Step|Alarm_0.gml. Dichiarato
// come gap esplicito in STUDIO.md ("il fumo decorativo, puramente visivo,
// non e' ancora portato") finche' non e' stato chiesto esplicitamente.
//
// L'originale sceglie a dado, UNA sola volta a Create, quale ciminiera usare
// (`xi`, 1..4 per industria1, 1..2 per industria2) fra un piccolo set di
// offset fissi, e la sceglie insieme allo sprite stesso dell'edificio
// (industria1/Create.gml: lo stesso dado decide sprite+xi insieme).
// game/src/buildings.js non riproduce quel dado — ogni livello ha un unico
// `finalSprite` fisso (i11/i21/i31, la variante "1" del decompilato, vedi il
// commento su GAMEPLAY_SPRITES in tools/23_atlas.py) — quindi qui si usano
// gli offset che l'originale userebbe per QUELLA variante specifica (xi==1
// per industria1, il ramo "else" di industria2/Create.gml per industria2,
// l'unica ciminiera di industria3, che non ha dado di variante).
const TICK = 1 / 60;
const SMOKE_PERIOD = 20 * TICK;      // [C] action_set_alarm(20, N): riarmo regolare, tutte le ciminiere
export const SMOKE_LIFE = 69 * TICK; // [C] smoke_ind|smoke_ind_2/Create.gml: action_set_alarm(69, 0)
const SMOKE_GROWTH = 3;              // [C] Step.gml: xsca += 0.05/tick = 3/s a 60fps
// [C] cc1|cc2|cc3 (data/sprites.json) hanno davvero 70 frame ciascuno, e
// `action_sprite_set(cc2, 0, 1)` a Create arma image_speed=1: sull'istanza
// gira per davvero l'animazione intera (un fumo che si arriccia/dissolve
// disegnato frame per frame), non un singolo fotogramma statico solo
// ingrandito da xsca — i due effetti sono indipendenti e si sommano, un
// tick a testa combacia quasi esattamente con i 69 tick di vita.
export const SMOKE_FRAME_COUNT = 70;
// [C] action_set_motion(70, 1.3): direzione 70° (quasi verticale, un filo
// a destra), velocita' 1.3 px/tick = 78 px/s. GameMaker: y cresce verso il
// basso, direzione antioraria da +x — "su" e' quindi vy negativa.
const SMOKE_DIR = (70 * Math.PI) / 180;
const SMOKE_VX = 1.3 * 60 * Math.cos(SMOKE_DIR);
const SMOKE_VY = -1.3 * 60 * Math.sin(SMOKE_DIR);

// `smoke` (parametro di stepSmokeSpawner()/stepSmoke() sotto, bridges.js/
// stepCargoShips()): un Pool riusabile (game/src/pool.js), non piu' un
// array semplice — vedi il commento li' sul perche' (ottimizzazione
// mobile: niente allocazione/GC per ogni sbuffo).

// { dx, dy, family, firstDelay } — family e' l'offset di profondita' fisso
// dell'oggetto originale (smoke_ind: depth = -y-150, smoke_ind_2: -y-200),
// firstDelay il primo riarmo (letto da industriaN/Create.gml, diverso dai
// successivi che sono sempre 20 — stesso schema di COIN_FIRST_DELAY in
// buildings.js).
const CHIMNEYS = {
  1: [{ dx: -19, dy: -110, family: 150, firstDelay: 60 }],                 // [C] industria1/Alarm_3.gml, xi==1
  2: [
    { dx: 2, dy: -89, family: 150, firstDelay: 60 },                      // [C] industria2/Alarm_3.gml, xi==1
    { dx: -20, dy: -111, family: 150, firstDelay: 73 },                   // [C] industria2/Alarm_4.gml, xi==1
  ],
  3: [
    { dx: 7, dy: -181, family: 200, firstDelay: 60 },                     // [C] industria3/Alarm_3.gml (smoke_ind_2)
    { dx: -21, dy: -373, family: 150, firstDelay: 73 },                   // [C] industria3/Alarm_4.gml (smoke_ind)
  ],
};

/** [C] smoke_ind|smoke_ind_2/Create.gml: 50% resta "cc1" (il default
 * dell'oggetto), 25% "cc2", 25% "cc3". */
function puffSprite() {
  const d = Math.random();
  return d < 0.5 ? "cc1" : d < 0.75 ? "cc2" : "cc3";
}

/**
 * Il "regista" del fumo — una ciminiera per elemento di CHIMNEYS, timer
 * indipendenti per edificio (azzerati al salto di livello, come `b.coinT`
 * in buildings.js: qui direttamente sull'istanza invece che tramite
 * stepConstructions(), non serve toccare quel file per un effetto
 * puramente estetico).
 */
export function stepSmokeSpawner(buildings, smoke, dt, r12) {
  for (const b of buildings) {
    if (b.type !== "industria" || b.construction) continue;
    const chimneys = CHIMNEYS[b.level];
    if (!chimneys) continue;
    if (b._smokeLevel !== b.level) {
      b._smokeLevel = b.level;
      b._smokeT = chimneys.map(() => 0);
      b._smokeNext = chimneys.map((c) => c.firstDelay * TICK);
    }
    for (let i = 0; i < chimneys.length; i++) {
      b._smokeT[i] += dt;
      while (b._smokeT[i] >= b._smokeNext[i]) {
        b._smokeT[i] -= b._smokeNext[i];
        b._smokeNext[i] = SMOKE_PERIOD;
        if (r12.oil <= 0) continue;          // [C] with(r12) oil>0 — niente fumo a olio esaurito
        if (Math.random() < 0.25) continue;  // [C] action_if_dice(4): 1/4 si autodistrugge appena nata
        const ch = chimneys[i];
        const p = smoke.spawn();
        p.x = b.x + ch.dx; p.y = b.y + ch.dy; p.family = ch.family;
        p.spr = puffSprite(); p.scale = 1; p.t = 0;
      }
    }
  }
}

/** Avanza posizione/crescita di ogni sbuffo, scartando quelli a fine vita —
 * [C] Step.gml (moto+scala) + Alarm_0.gml (autodistruzione dopo 69 tick).
 * Le collisioni con la scenografia che nell'originale la interrompono prima
 * (smoke_ind/Collision_*.gml) non sono riprodotte: senza un sistema di
 * collisione generico per il decoro sarebbero codice morto per un
 * dettaglio invisibile alla scala di un frame. */
// [I] `SMOKE_LIFE` esportata cosi' che main.js possa calcolare una
// dissolvenza in alpha verso la fine della vita di ogni sbuffo (stesso
// principio di `_alpha`/LIGHT_FADE per il decoro luce): l'originale lo fa
// sparire di scatto ad `action_kill_object` (Alarm_0.gml), qui e' un fade
// out, coerente col resto del motore che gia' preferisce dissolvenze a
// sparizioni istantanee.
export function stepSmoke(smoke, dt) {
  const arr = smoke.active;
  for (let i = arr.length - 1; i >= 0; i--) {
    const p = arr[i];
    p.t += dt;
    if (p.t >= SMOKE_LIFE) { smoke.release(i); continue; }
    p.x += SMOKE_VX * dt;
    p.y += SMOKE_VY * dt;
    p.scale += SMOKE_GROWTH * dt;
  }
}
