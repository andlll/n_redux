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
    depthOffset: 2,                        // [C] honda_facile_1/Step.gml: depth = -y - 2
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
    depthOffset: 2,                        // [C] honda_facile_2/Step.gml: depth = -y - 2
    schedule: [
      { at: 275, dir: 30, spd: 2, spr: "c_ad_as" },   // [C] Alarm_0
      { at: 294, dir: 150, spd: 2 },                   // [C] Alarm_1 (armato da Create, non da Alarm_0)
      { at: 313, dir: 150, spd: 3, spr: "c_as" },      // [C] Alarm_2 (275+38)
      { at: 314, dir: 150, spd: 2, spr: "c_as_ad" },   // [C] Alarm_3 (313+1)
      { at: 333, dir: 30, spd: 2 },                     // [C] Alarm_4 (313+20)
      { at: 352, dir: 30, spd: 3, spr: "c_ad" },        // [C] Alarm_5 (314+38)
    ],
  },

  // honda3..honda9: le auto che `carmaker` fa arrivare col tempo (vedi
  // CARMAKER_SCHEDULE piu' sotto) — non ci sono dall'inizio come
  // honda_facile_1/2, compaiono una alla volta ogni 60s di gioco. Stesso
  // schema di honda_facile_2 (catena di alarm -> tabella `schedule`), ma
  // depth `-y - 16` (**[C]** honda3..9/Step.gml, contro `-y - 2` di
  // honda_facile_1/2: passano davanti a tutto anche piu' decisamente) e un
  // dettaglio in piu' letto in ogni Create.gml: `action_if_number(736, 1,
  // 0)` (vero per match_easy, STUDIO.md/state.js) sposta l'istanza appena
  // nata di (+21,-26) — un aggiustamento relativo, non assoluto — rispetto
  // al punto passato da chi la crea. Le coordinate qui sotto lo includono
  // gia', non sono quelle scritte a mano in Alarm_*.gml/carmaker.
  //
  // Sprite multi-frame (es. "g_bs_as", 38 frame) durante le fasi di
  // svolta/accelerazione: qui si usa sempre il primo frame, come per ogni
  // altro sprite del motore (nessun sistema di image_speed) — [I] una
  // posa fissa invece dell'animazione, coerente con com'e' trattato il
  // resto (varianti di costruzione, sprite degli edifici, ...).
  honda3: {
    spawn: { x: 1863, y: 604 },            // [C] carmaker/Alarm_0.gml (1842,630) + il nudge (+21,-26)
    life: 713,                              // [C] 633 + 80 (Alarm_5 arma alarm(80,6))
    spr: "g_bs",                            // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },          // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,                        // [C] honda3/Step.gml: depth = -y - 16
    schedule: [
      { at: 200, dir: 210, spd: 2, spr: "g_bs_as" },  // [C] Alarm_0
      { at: 219, dir: 150, spd: 2 },                   // [C] Alarm_1 (armato da Create)
      { at: 238, dir: 150, spd: 3, spr: "g_as" },      // [C] Alarm_2 (200+38)
      { at: 595, dir: 150, spd: 2, spr: "g_as_bs" },   // [C] Alarm_3 (238+357)
      { at: 614, dir: 210, spd: 2 },                    // [C] Alarm_4 (238+376)
      { at: 633, dir: 210, spd: 3, spr: "g_bs" },       // [C] Alarm_5 (595+38)
    ],
  },
  // [C] honda4/Alarm_4..6 non sono mai armati (Alarm_3 uccide/ricrea
  // sempre prima che possano scattare) — stesso "codice morto" di
  // honda_facile_1, catena piu' corta delle altre honda. Nota anche
  // l'unica discrepanza fra le honda: `carmaker` la crea la prima volta a
  // (62,526), ma la ricrea lei stessa (Alarm_3) a (72,528) — 10px piu' in
  // la, un disallineamento gia' presente nel decompilato originale (mai
  // corretto dall'autore), qui riprodotto con `firstSpawn` invece di
  // "aggiustarlo".
  honda4: {
    firstSpawn: { x: 83, y: 500 },          // [C] carmaker/Alarm_0.gml (62,526) + nudge
    spawn: { x: 93, y: 502 },               // [C] honda4/Alarm_3.gml (72,528) + nudge
    life: 378,                              // [C] 318 + 60 (Alarm_2 arma alarm(60,3))
    spr: "p_bd",                            // [C] sprite di default (_object.json)
    initial: { dir: 330, spd: 3 },          // [C] action_set_motion(330, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 280, dir: 330, spd: 2, spr: "p_bd_ad" },  // [C] Alarm_0
      { at: 299, dir: 30, spd: 2 },                    // [C] Alarm_1 (armato da Create)
      { at: 318, dir: 30, spd: 3, spr: "p_ad" },       // [C] Alarm_2 (280+38)
    ],
  },
  honda5: {
    spawn: { x: 1568, y: 491 },             // [C] carmaker/Alarm_0.gml (1547,517) + nudge
    life: 542,                               // [C] 504 + 38 (Alarm_9 arma alarm(38,11))
    spr: "c_bs",                             // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },           // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 180, dir: 210, spd: 2, spr: "c_bs_as" },  // [C] Alarm_0
      { at: 199, dir: 150, spd: 2 },                   // [C] Alarm_1
      { at: 218, dir: 150, spd: 3, spr: "c_as" },      // [C] Alarm_2 (180+38)
      { at: 288, dir: 150, spd: 2, spr: "c_as_ad" },   // [C] Alarm_3 (218+70)
      { at: 307, dir: 30, spd: 2 },                     // [C] Alarm_4 (218+89)
      { at: 326, dir: 30, spd: 3, spr: "c_ad" },        // [C] Alarm_5 (288+38)
      { at: 396, dir: 30, spd: 2, spr: "c_ad_as" },     // [C] Alarm_6 (326+70)
      { at: 415, dir: 150, spd: 2 },                     // [C] Alarm_7 (326+89)
      { at: 434, dir: 150, spd: 3, spr: "c_as" },        // [C] Alarm_8 (396+38)
      { at: 504, dir: 150, spd: 2, spr: "c_as_ad" },     // [C] Alarm_9 (434+70)
      { at: 523, dir: 30, spd: 2 },                       // [C] Alarm_10 (434+89)
    ],
  },
  honda6: {
    spawn: { x: 1877, y: 617 },             // [C] carmaker/Alarm_0.gml (1856,643) + nudge
    life: 762,                               // [C] 724 + 38 (Alarm_9 arma alarm(38,11))
    spr: "v_bs",                             // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },           // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 190, dir: 210, spd: 2, spr: "v_bs_as" },  // [C] Alarm_0
      { at: 209, dir: 150, spd: 2 },                   // [C] Alarm_1
      { at: 228, dir: 150, spd: 3, spr: "v_as" },      // [C] Alarm_2 (190+38)
      { at: 498, dir: 150, spd: 2, spr: "v_as_ad" },   // [C] Alarm_3 (228+270)
      { at: 517, dir: 30, spd: 2 },                     // [C] Alarm_4 (228+289)
      { at: 536, dir: 30, spd: 3, spr: "v_ad" },        // [C] Alarm_5 (498+38)
      { at: 616, dir: 30, spd: 2, spr: "v_ad_bd" },     // [C] Alarm_6 (536+80)
      { at: 635, dir: 330, spd: 2 },                     // [C] Alarm_7 (536+99)
      { at: 654, dir: 330, spd: 3, spr: "v_bd" },        // [C] Alarm_8 (616+38)
      { at: 724, dir: 330, spd: 2, spr: "v_bd_ad" },     // [C] Alarm_9 (654+70)
      { at: 743, dir: 210, spd: 2 },                      // [C] Alarm_10 (654+89)
    ],
  },
  honda7: {
    spawn: { x: 880, y: 38 },               // [C] carmaker/Alarm_0.gml (859,64) + nudge
    life: 1072,                              // [C] 1034 + 38 (Alarm_9 arma alarm(38,11))
    spr: "r_bd",                             // [C] sprite di default (_object.json)
    initial: { dir: 330, spd: 3 },           // [C] action_set_motion(330, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 270, dir: 330, spd: 2, spr: "r_bd_bs" },  // [C] Alarm_0
      { at: 289, dir: 210, spd: 2 },                   // [C] Alarm_1
      { at: 308, dir: 210, spd: 3, spr: "r_bs" },      // [C] Alarm_2 (270+38)
      { at: 498, dir: 210, spd: 2, spr: "r_bs_as" },   // [C] Alarm_3 (308+190)
      { at: 517, dir: 150, spd: 2 },                    // [C] Alarm_4 (308+209)
      { at: 536, dir: 150, spd: 3, spr: "r_as" },       // [C] Alarm_5 (498+38)
      { at: 806, dir: 150, spd: 2, spr: "r_as_ad" },    // [C] Alarm_6 (536+270)
      { at: 825, dir: 30, spd: 2 },                      // [C] Alarm_7 (536+289)
      { at: 844, dir: 30, spd: 3, spr: "r_ad" },         // [C] Alarm_8 (806+38)
      { at: 1034, dir: 30, spd: 2, spr: "r_ad_bd" },     // [C] Alarm_9 (844+190)
      { at: 1053, dir: 330, spd: 2 },                     // [C] Alarm_10 (844+209)
    ],
  },
  honda8: {
    spawn: { x: 274, y: 377 },              // [C] carmaker/Alarm_0.gml (253,403) + nudge
    life: 662,                               // [C] 624 + 38 (Alarm_9 arma alarm(38,11))
    spr: "g_bs",                             // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },           // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 60, dir: 210, spd: 2, spr: "g_bs_bd" },   // [C] Alarm_0
      { at: 79, dir: 330, spd: 2 },                    // [C] Alarm_1
      { at: 98, dir: 330, spd: 3, spr: "g_bd" },       // [C] Alarm_2 (60+38)
      { at: 288, dir: 330, spd: 2, spr: "g_bd_ad" },   // [C] Alarm_3 (98+190)
      { at: 307, dir: 30, spd: 2 },                     // [C] Alarm_4 (98+209)
      { at: 326, dir: 30, spd: 3, spr: "g_ad" },        // [C] Alarm_5 (288+38)
      { at: 396, dir: 30, spd: 2, spr: "g_ad_as" },     // [C] Alarm_6 (326+70)
      { at: 415, dir: 150, spd: 2 },                     // [C] Alarm_7 (326+89)
      { at: 434, dir: 150, spd: 3, spr: "g_as" },        // [C] Alarm_8 (396+38)
      { at: 624, dir: 150, spd: 2, spr: "g_as_bs" },     // [C] Alarm_9 (434+190)
      { at: 643, dir: 210, spd: 2 },                      // [C] Alarm_10 (434+209)
    ],
  },
  honda9: {
    spawn: { x: 1319, y: 919 },             // [C] carmaker/Alarm_0.gml (1298,945) + nudge
    life: 1266,                              // [C] 1228 + 38 (Alarm_9 arma alarm(38,11))
    spr: "p_as",                             // [C] sprite di default (_object.json)
    initial: { dir: 150, spd: 3 },           // [C] action_set_motion(150, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 367, dir: 150, spd: 2, spr: "p_as_ad" },  // [C] Alarm_0
      { at: 386, dir: 30, spd: 2 },                    // [C] Alarm_1
      { at: 405, dir: 30, spd: 3, spr: "p_ad" },       // [C] Alarm_2 (367+38)
      { at: 595, dir: 30, spd: 2, spr: "p_ad_bd" },    // [C] Alarm_3 (405+190)
      { at: 614, dir: 330, spd: 2 },                    // [C] Alarm_4 (405+209)
      { at: 633, dir: 330, spd: 3, spr: "p_bd" },       // [C] Alarm_5 (595+38)
      { at: 1000, dir: 330, spd: 2, spr: "p_bd_bs" },   // [C] Alarm_6 (633+367)
      { at: 1019, dir: 210, spd: 2 },                    // [C] Alarm_7 (633+386)
      { at: 1038, dir: 210, spd: 3, spr: "p_bs" },       // [C] Alarm_8 (1000+38)
      { at: 1228, dir: 210, spd: 2, spr: "p_bs_as" },    // [C] Alarm_9 (1038+190)
      { at: 1247, dir: 150, spd: 2 },                     // [C] Alarm_10 (1038+209)
    ],
  },
};

// [C] r12/Create.gml: `action_create_object(carmaker, 0, 0)`, incondizionato
// — carmaker esiste in OGNI room (non solo `match`), quindi anche in
// match_easy. carmaker/Create.gml arma un alarm ogni 3600 tick (60s) che
// fa comparire un tipo nuovo alla volta (carmaker/Alarm_0.gml, `made` da 2
// a 8): qui la stessa progressione come tabella, letta da main.js invece
// che simulare l'oggetto controller stesso.
export const CARMAKER_SCHEDULE = [
  { at: 3600, type: "honda3" },
  { at: 7200, type: "honda4" },
  { at: 10800, type: "honda5" },
  { at: 14400, type: "honda6" },
  { at: 18000, type: "honda7" },
  { at: 21600, type: "honda8" },
  { at: 25200, type: "honda9" },
].map((e) => ({ ...e, at: e.at * TICK }));   // tick -> secondi, comodo per confrontarlo con un cronometro in secondi

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

function makeCar(type, night, pos) {
  const def = CAR_TYPES[type];
  const p = pos ?? def.spawn;
  return {
    type, x: p.x, y: p.y,
    dir: def.initial.dir, spd: def.initial.spd, spr: def.spr,
    t: 0, schedIdx: 0, depth: -p.y - def.depthOffset,
    tint: night ? NIGHT_TINT : 0xffffff,
  };
}

/** Prima comparsa di un'auto (a inizio partita per honda_facile_1/2, o
 * quando `carmaker` la fa arrivare per honda3..9): usa `firstSpawn` se il
 * tipo lo dichiara (solo honda4, vedi sopra), altrimenti la stessa
 * posizione dei rientri successivi. */
export function spawnCar(type, night) {
  const def = CAR_TYPES[type];
  return makeCar(type, night, def.firstSpawn ?? def.spawn);
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
    // [C] .../Step.gml: depth = -y - N, ricalcolato ogni Step perche' l'auto
    // si muove (a differenza di edifici/alberi, fermi dopo Create) — N e'
    // 2 per honda_facile_1/2, 16 per honda3..9 (def.depthOffset), sempre
    // abbastanza da passare davanti a tutto il resto a parita' di y.
    c.depth = -c.y - def.depthOffset;
    if (c.t >= def.life * TICK) {
      cars.splice(i, 1);
      if (r12.oil > 0) cars.push(makeCar(c.type, night));
    }
  }
}
