// Automobili decorative come dati, stesso approccio di buildings.js
// (STUDIO.md §7.3): honda_facile_1/2 sono le uniche due gia' istanziate in
// match_easy.scene.json (STUDIO.md §5.3 "veicoli_target" — famiglia che
// raggruppa i veicoli decorativi). Nell'originale non stanno ferme: guidano
// lungo un percorso fisso a spezzate, cambiando direzione/velocita'/sprite
// a orari precisi scanditi da una catena di alarm (src/objects/
// honda_facile_1|2), poi si tolgono di mezzo e — se c'e' ancora olio — ne
// riparte una identica dal punto di partenza. Qui la stessa catena e' una
// tabella `schedule` (tick assoluti da Create, come nell'originale) letta
// da un'unica stepCars(), invece di un oggetto/evento per fase.
//
// [C] = letto nel decompilato. Le direzioni sono gradi GameMaker
// (action_set_motion): 0=destra, 90=su, aumentano in senso antiorario —
// la stessa convenzione usata sotto per integrare la posizione.

const TICK = 1 / 60;

export const CAR_TYPES = {
  // [C] honda_facile_1/Create.gml arma SOLO alarm[0] (durata di vita, 900
  // tick): gli Alarm_1..6 dell'oggetto esistono nel decompilato ma non
  // vengono mai armati da nessun evento — codice morto nell'originale
  // stesso (stesso pattern di altri alarm mai innescati, STUDIO.md §9 "im1r
  // ..im4r"). Risultato: questa non svolta mai, guida dritta a velocita'
  // costante per tutta la sua vita.
  honda_facile_1: {
    spawn: { x: 1321, y: 924 },           // [C] posizione sia iniziale (room) sia di rientro (Alarm_0)
    life: 900,                             // [C] action_set_alarm(900, 0) in Create
    spr: "p_as",                           // [C] sprite di default (_object.json), mai cambiato
    initial: { dir: 150, spd: 3 },         // [C] action_set_motion(150, 3) in Create
    schedule: [],
  },
  // [C] honda_facile_2/Create.gml arma sia alarm[0] (275) sia alarm[1]
  // (294): la catena vera, sette fasi che accelerano/decelerano e svoltano
  // fra le direzioni 30 e 150 prima di rientrare. `at` sono i tick assoluti
  // dalla nascita (non relativi alla fase precedente) esattamente come li
  // arma il decompilato — vedi lo sviluppo passo-passo in STUDIO.md.
  honda_facile_2: {
    spawn: { x: 126, y: 1098 },            // [C] posizione iniziale e di rientro (Alarm_6)
    life: 812,                             // [C] 352 + 460 (action_set_alarm(460, 6) nell'ultima fase)
    spr: "c_ad",                           // [C] sprite di default (_object.json)
    initial: { dir: 30, spd: 3 },          // [C] action_set_motion(30, 3) in Create
    schedule: [
      { at: 275, dir: 30, spd: 2, spr: "c_ad_as" },   // [C] Alarm_0
      { at: 294, dir: 150, spd: 2 },                   // [C] Alarm_1 (armato da Create, non da Alarm_0)
      { at: 313, dir: 150, spd: 3, spr: "c_as" },      // [C] Alarm_2 (275+38)
      { at: 314, dir: 150, spd: 2, spr: "c_as_ad" },   // [C] Alarm_3 (313+1)
      { at: 333, dir: 30, spd: 2 },                     // [C] Alarm_4 (313+20)
      { at: 352, dir: 30, spd: 3, spr: "c_ad" },        // [C] Alarm_5 (314+38)
    ],
  },
};

// [C] entrambe: `action_sprite_color(16366009, 1)` in Create, solo se e'
// notte nell'istante esatto in cui l'istanza nasce (non viene mai
// riaggiornato durante la vita del veicolo, nemmeno attraversando
// giorno/notte) — una tinta blu lunare, applicata una tantum. GameMaker
// codifica i colori come R + G*256 + B*65536 (byte order opposto al nostro
// 0xRRGGBB), quindi 16366009 non e' 0x16366009: va scomposto e
// riimpacchettato, non letto direttamente come esadecimale.
const NIGHT_TINT = (() => {
  const v = 16366009, r = v & 0xff, g = (v >> 8) & 0xff, b = (v >> 16) & 0xff;
  return (r << 16) | (g << 8) | b;                    // 0xb9b9f9
})();

function makeCar(type, night) {
  const def = CAR_TYPES[type];
  return {
    type, x: def.spawn.x, y: def.spawn.y,
    dir: def.initial.dir, spd: def.initial.spd, spr: def.spr,
    t: 0, schedIdx: 0, depth: -def.spawn.y - 2,
    tint: night ? NIGHT_TINT : 0xffffff,
  };
}

export function spawnCar(type, night) {
  return makeCar(type, night);
}

/**
 * Avanza tutte le auto di `dt` secondi: applica le fasi di `schedule` che
 * sono state superate, integra la posizione dalla direzione/velocita'
 * corrente (stessa formula di GameMaker per action_set_motion: hspeed =
 * speed*cos(dir), vspeed = -speed*sin(dir), `speed` in px/tick), e a fine
 * vita la ricrea da capo se c'e' ancora olio (altrimenti sparisce per
 * sempre — [C] `with (r12) { oil > 0 }` prima di ricreare, poi
 * `action_kill_object()` comunque).
 */
export function stepCars(cars, dt, r12, night) {
  for (let i = cars.length - 1; i >= 0; i--) {
    const c = cars[i];
    const def = CAR_TYPES[c.type];
    c.t += dt;
    while (c.schedIdx < def.schedule.length && c.t >= def.schedule[c.schedIdx].at * TICK) {
      const step = def.schedule[c.schedIdx++];
      c.dir = step.dir; c.spd = step.spd;
      if (step.spr) c.spr = step.spr;
    }
    const rad = (c.dir * Math.PI) / 180;
    const pxPerSec = c.spd * 60;   // "speed" e' px/tick a room_speed 60
    c.x += Math.cos(rad) * pxPerSec * dt;
    c.y -= Math.sin(rad) * pxPerSec * dt;
    // [C] honda_facile_1|2/Step.gml: depth = -y - 2, ricalcolato ogni Step
    // perche' l'auto si muove (a differenza di edifici/alberi, fermi dopo
    // Create) — il "-2" la fa passare sempre davanti a loro a parita' di y.
    c.depth = -c.y - 2;
    if (c.t >= def.life * TICK) {
      cars.splice(i, 1);
      if (r12.oil > 0) cars.push(makeCar(c.type, night));
    }
  }
}
