// Le mongolfiere — src/objects/monvo|monvo_giga|monbo|mongo|monviolo (risorse),
// monspi (spia) e mon_bil|mon_bbil (pacco di cantiere), mai lette finora
// (STUDIO.md non le cita). Tre famiglie distinte che condividono solo la
// stessa diagonale di volo (direzione 30°, la stessa di nuvole/uccelli in
// atmosphere.js) e la stessa idea "nasce fuori mappa, vola, se ne va".
//
// 1) Risorse: monvo (verde, petrolio), monvo_giga (verde gigante, molto piu'
//    petrolio), monbo (blu/petrolio, sprite "monss", denaro), mongo
//    (giallo/oliva, energia), monviolo (viola, cristalli). Non sono cliccabili
//    (nessun evento Mouse nel decompilato): volano per 3600 tick (60s) e alla
//    fine — o se colpite da un fulmine durante una tempesta, STUDIO.md "le
//    tempeste diventano reali" — lasciano cadere una cassa di risorse
//    (bar-us/-bluss/-gia/-viola/-us_giga), quella si' cliccabile (tap invece
//    di Mouse_MouseEnter, coerente con l'input touch-first di tutto il resto
//    del motore — STUDIO.md §7), per 700 tick prima di sparire da sola.
// 2) Spia: monspi (rossa). Stessa diagonale, nessun loot: dopo 750 tick
//    "riferisce" — alza r12.onda/ondan e fa comparire un avviso ATTACK
//    INCOMING (src/objects/aincom) — invece di sparire e basta. Sbloccata
//    solo dopo ~8 minuti di partita (r12/Create.gml: action_set_alarm(29000,8)
//    arma r12.spy). Se colpita da un fulmine prima di allora non succede
//    niente (nessun Destroy nel decompilato, a differenza delle risorse).
//    `recogn` (lo stesso ruolo ma un aereo da ricognizione, non una
//    mongolfiera — sprite "reconspr") esiste nel decompilato con la stessa
//    logica ma resta fuori: non e' una mongolfiera, e' un gap dichiarato.
// 3) Pacco di cantiere: mon_bil/mon_bbil (src/objects/placeholder/
//    Mouse_LeftReleased.gml). Non nasce a intervalli: un edificio piazzato
//    ne fa comparire una, che vola verso il cantiere per 225 tick portando
//    una cassa, la sgancia (mon_box, cade e sparisce), poi si svuota e
//    fluttua via verso l'alto (una vera action_set_gravity(90, 0.1):
//    l'originale la fa "alleggerire" e accelerare verso l'alto una volta
//    consegnato il pacco) per altri 1000 tick prima di sparire. Solo
//    `mon_bil` e' cablata qui: e' quella che l'originale usa per `casa`
//    (selec==1) e `industria` (selec==2), gli unici due tipi piazzabili dal
//    giocatore che la creano — `parco` (selec==7) non crea nessun pallone
//    nel decompilato, `mon_bbil` serve solo a tipi non ancora ricostruiti
//    (banca, laser — STUDIO.md).
//
// [C] = letto nel decompilato. [I] = semplificato deliberatamente (dettagliato
// punto per punto sotto).

const TICK = 1 / 60;
const DIR = (30 * Math.PI) / 180;              // [C] action_set_motion(30, ...) per tutta la famiglia risorse/spia
const COS30 = Math.cos(DIR), SIN30 = Math.sin(DIR);
const STORM_CHECK = 57 * TICK;                 // [C] Alarm_5: action_set_alarm(57, 5)

function dice(n) { return Math.random() < 1 / n; }

// --------------------------------------------------------- risorse + spia
// [C] posizione di nascita: irandom_range(380, 3120) nel decompilato, ma
// quel range e' tarato per `match` (3900x2090) — qui usiamo lo stesso range
// piu' piccolo che l'originale stesso usa per il ramo "mappa facile" di
// monspi/recogn (action_if_number(162, 0, 0), 380..1620), esteso per analogia
// anche alle risorse: match_easy e' alta 1086px, 380..1620 e' il range reale
// piu' vicino a quella dimensione fra i due scritti a mano nel decompilato.
const SPAWN_Y = [380, 1620];
const SPAWN_X = -170;                          // [C] action_create_object(mon*, -170, ...)

export const BALLOON_TYPES = {
  monvo: {          // [C] verde — sempre creata, nessun dado (src/objects/monvo)
    spr: "monv", life: 3600, speedMin: 3, speedMax: 7, stormDice: 68,
    loot: { spr: "monv_bar", key: "oil", amount: () => 700 },            // [C] barus/Mouse_MouseEnter.gml
  },
  monvo_giga: {     // [C] verde gigante — dado 1/15, solo se chies.level>=2
    spr: "monv_giga", life: 3600, speedMin: 5, speedMax: 9, stormDice: 97,
    loot: { spr: "monv_giga_bar", key: "oil", amount: () => 2300 },      // [C] barus_giga/Mouse_MouseEnter.gml
  },
  monbo: {          // [C] blu (sprite "monss") — dado 1/13
    spr: "monss", life: 3600, speedMin: 3, speedMax: 7, stormDice: 68,
    loot: { spr: "monss_bar", key: "mon", amount: () => 700 },           // [C] barbluss/Mouse_MouseEnter.gml
  },
  mongo: {          // [C] giallo/oliva — dado 1/10
    spr: "mong", life: 3600, speedMin: 3, speedMax: 7, stormDice: 68,
    loot: { spr: "mong_bar", key: "ele", amount: () => 1100 },           // [C] bargia/Mouse_MouseEnter.gml
  },
  monviolo: {       // [C] viola — dado 1/18, solo se chies.level>=2
    spr: "monviola", life: 3600, speedMin: 6, speedMax: 10, stormDice: 190,
    loot: { spr: "monviola_bar", key: "crys", amount: () => 1 + ((Math.random() * 3) | 0) },  // [C] irandom_range(1,3)
  },
  monspi: {         // [C] rossa — spia, nessun loot (vedi sopra)
    spr: "monr", life: 750, speedMin: 4, speedMax: 7, stormDice: 68,
    isSpy: true,
  },
};

const LOOT_LIFE = 700 * TICK;                  // [C] bar*/Alarm_0.gml: action_set_alarm(700, 0)
const LOOT_FALL_SPEED = 4;                     // [C] bar*/Create.gml: action_move("010000000", 4)
export const ALERT_DURATION = 4;               // [C] aincom/Create.gml: action_set_alarm(240, 0), 240 tick = 4s

const SPAWN_PERIOD = 300 * TICK;               // [C] r12/Alarm_1.gml: action_set_alarm(300, 1)
const SPY_UNLOCK_T = 29000 * TICK;             // [C] r12/Create.gml: action_set_alarm(29000, 8) -> spy = 1
const ONDAN_DECAY_PERIOD = 60 * TICK;          // [C] r12/Alarm_4.gml: action_set_alarm(60, 4)
const ONDAN_DECAY = 0.5;                       // [C] ondan = ondan + -0.5

function maxChiesLevel(buildings) {
  let lvl = 0;
  for (const b of buildings) if (b.type === "chies") lvl = Math.max(lvl, b.level);
  return lvl;
}

export function spawnBalloon(type) {
  const def = BALLOON_TYPES[type];
  return {
    type, x: SPAWN_X, y: SPAWN_Y[0] + Math.random() * (SPAWN_Y[1] - SPAWN_Y[0]),
    spd: def.speedMin + Math.random() * (def.speedMax - def.speedMin),
    t: 0, stormT: 0, spr: def.spr, depth: -3990,   // [C] Create.gml: depth = -3990 (fisso, sempre davanti al mondo)
  };
}

function spawnLoot(lootDef, x, y) {
  return { spr: lootDef.spr, key: lootDef.key, amount: lootDef.amount(), x, y, t: 0, depth: -4000 };
}

/**
 * Il "regista" delle mongolfiere di risorse/spia — equivalente di
 * `r12/Alarm_1.gml` (ogni 300 tick) + il timer che sblocca `r12.spy` dopo
 * 29000 tick (`r12/Create.gml` Alarm_8) + il decadimento di `r12.ondan`
 * (`r12/Alarm_4.gml`, -0.5 ogni 60 tick finche' resta positivo).
 *
 * [I] L'originale arma il decadimento solo dopo la prima "arma = 1" (la
 * prima mongolfiera spia che completa la sua missione, src/objects/r12/
 * Step.gml + Alarm_4.gml): qui decade incondizionatamente ogni volta che
 * ondan > 0, saltando la cerimonia di armamento — stesso risultato,
 * `ondan` scende comunque a 0 non appena l'ultima "ondata" e' abbastanza
 * vecchia, senza bisogno di simulare gli alarm 4/5/6 di r12 (5/6 pilotano
 * un'ondata di bombardieri non ancora ricostruita, STUDIO.md).
 *
 * [I] Il gate `action_if_number(160, 0, 0)` che nel decompilato precede
 * `monviolo` non e' riprodotto (un flag globale non identificato, STUDIO.md
 * "cosa non so ancora"): qui `monviolo` dipende solo dal livello di chies,
 * come `monvo_giga` che nello stesso Alarm_1 non ha nessun gate simile.
 *
 * [I] Il ramo raro `r12.hap == r12.pop` (dado 1/17 invece di 1/2 per la
 * spia) resta letto ma non puo' mai scattare per davvero: `hap` non e'
 * aggiornato da nessuna parte del motore (STUDIO.md, stesso gap gia'
 * dichiarato per casa/industria) — la spia usa quindi sempre il dado 1/2,
 * esattamente come l'originale finisce per fare per lo stesso motivo.
 */
export function stepBalloonSpawner(r12, balloons, dt, buildings) {
  r12.spyT = (r12.spyT ?? 0) + dt;
  if (!r12.spy && r12.spyT >= SPY_UNLOCK_T) r12.spy = 1;   // [C]

  if ((r12.ondan ?? 0) > 0) {
    r12.ondanDecayT = (r12.ondanDecayT ?? 0) + dt;
    while (r12.ondanDecayT >= ONDAN_DECAY_PERIOD) {
      r12.ondanDecayT -= ONDAN_DECAY_PERIOD;
      r12.ondan = Math.max(0, r12.ondan - ONDAN_DECAY);   // [C]
    }
  }

  r12.balloonSpawnT = (r12.balloonSpawnT ?? 0) + dt;
  while (r12.balloonSpawnT >= SPAWN_PERIOD) {
    r12.balloonSpawnT -= SPAWN_PERIOD;
    if ((r12.ondan ?? 0) > 0) continue;   // [C] if (!(ondan > 0)) — un'ondata attiva sospende tutte le nascite

    balloons.push(spawnBalloon("monvo"));                          // [C] sempre
    if (dice(10)) balloons.push(spawnBalloon("mongo"));            // [C]
    if (dice(13)) balloons.push(spawnBalloon("monbo"));            // [C]

    const chiesLevel = maxChiesLevel(buildings);
    if (chiesLevel >= 3 && dice(2)) balloons.push(spawnBalloon("monvo"));   // [C]
    if (chiesLevel >= 2) {
      if (dice(18)) balloons.push(spawnBalloon("monviolo"));       // [C] (gate 160 semplificato, vedi sopra)
      if (dice(15)) balloons.push(spawnBalloon("monvo_giga"));     // [C]
    }
    if (r12.spy) {
      const rare = r12.hap === r12.pop;                            // [C] (mai vero in pratica, vedi sopra)
      if (rare ? dice(17) : dice(2)) balloons.push(spawnBalloon("monspi"));  // [C]
    }
  }
}

/**
 * Avanza tutte le mongolfiere di risorse/spia: volano lungo la stessa
 * diagonale (COS30/SIN30), rischiano un fulmine durante una tempesta vera
 * (STUDIO.md "le tempeste diventano reali", stesso schema di
 * `stepStormDamage` in buildings.js), e a fine vita lasciano una cassa di
 * risorse — anche se la fine e' un fulmine: nel decompilato `action_kill_
 * object()` fa comunque scattare il Destroy che crea la cassa. La sola
 * eccezione e' la spia: nessun Destroy nel decompilato, quindi un fulmine la
 * cancella senza conseguenze, mentre arrivare in fondo alla propria vita
 * (750 tick) e' la sua VERA riuscita — alza `r12.onda`/`ondan` e innesca
 * l'avviso (`r12.alertT`, disegnato in main.js come il banner "ATTACK
 * INCOMING" di src/objects/aincom).
 */
export function stepBalloons(balloons, loot, dt, r12) {
  for (let i = balloons.length - 1; i >= 0; i--) {
    const b = balloons[i];
    const def = BALLOON_TYPES[b.type];
    b.t += dt;
    const pxPerSec = b.spd * 60;
    b.x += COS30 * pxPerSec * dt;
    b.y -= SIN30 * pxPerSec * dt;

    let struck = false;
    if (r12.storm) {
      b.stormT += dt;
      while (b.stormT >= STORM_CHECK) {
        b.stormT -= STORM_CHECK;
        if (dice(def.stormDice)) { struck = true; break; }
      }
    }

    if (struck) {
      balloons.splice(i, 1);
      if (def.loot) loot.push(spawnLoot(def.loot, b.x, b.y));   // [C] Destroy.gml scatta comunque
      continue;
    }
    if (b.t >= def.life * TICK) {
      balloons.splice(i, 1);
      if (def.isSpy) {
        r12.onda = (r12.onda ?? 0) + 1;         // [C] monspi/Alarm_0.gml
        r12.ondan = r12.onda;                    // [C]
        r12.alertT = ALERT_DURATION;             // [C] action_create_object(aincom, ...)
      } else if (def.loot) {
        loot.push(spawnLoot(def.loot, b.x, b.y));   // [C] Alarm_6.gml -> kill -> Destroy.gml
      }
    }
  }
}

/** Le casse di risorse lasciate cadere: cadono (stessa velocita' per tutte
 * e cinque, [C] bar-us/-bluss/-gia/-viola Create.gml) e spariscono da sole
 * se non raccolte in tempo — raccoglierle e' un tap, non un hover
 * (STUDIO.md §7). */
export function stepLoot(loot, dt) {
  for (let i = loot.length - 1; i >= 0; i--) {
    const l = loot[i];
    l.t += dt;
    l.y += LOOT_FALL_SPEED * 60 * dt;
    if (l.t >= LOOT_LIFE) loot.splice(i, 1);
  }
}

/** [C] bar-us/-bluss/-gia/-viola Mouse_MouseEnter.gml: assegna la risorsa e rimuove la cassa. */
export function collectLoot(loot, item, r12) {
  r12[item.key] = (r12[item.key] ?? 0) + item.amount;
  const idx = loot.indexOf(item);
  if (idx >= 0) loot.splice(idx, 1);
}

// --------------------------------------------------------- pacco di cantiere
// [C] src/objects/placeholder/Mouse_LeftReleased.gml: action_set_relative(1)
// poi action_create_object(mon_bil, -1559, 680) — posizione RELATIVA al
// placeholder appena occupato, non assoluta.
const CONSTRUCTION_OFFSET = { dx: -1559, dy: 680 };
const CONSTRUCTION_SPEED = 8;                    // [C] mon_bil/Create.gml: action_set_motion(30, 8)
const CONSTRUCTION_CARRY = 225 * TICK;           // [C] action_set_alarm(225, 0)
const CONSTRUCTION_LIFE = CONSTRUCTION_CARRY + 1000 * TICK;   // [C] Alarm_0 arma Alarm_1 a +1000
const CONSTRUCTION_GRAVITY = 0.1;                // [C] action_set_gravity(90, 0.1): dopo lo sgancio "alleggerisce"

const BOX_FALL_SPEED = 1;                        // [C] mon_box/Create.gml: action_move("010000000", 1)
const BOX_LIFE = 120 * TICK;                     // [C] mon_box/Alarm_0.gml: action_set_alarm(120, 0)

/** Solo `mon_bil` (vedi commento in cima al file): il pallone che consegna
 * `casa`/`industria` appena piazzate. */
export function spawnConstructionBalloon(targetX, targetY) {
  return {
    x: targetX + CONSTRUCTION_OFFSET.dx, y: targetY + CONSTRUCTION_OFFSET.dy,
    vx: COS30 * CONSTRUCTION_SPEED, vy: -SIN30 * CONSTRUCTION_SPEED,
    t: 0, dropped: false, spr: "mon_bild", depth: -3000,   // [C] _object.json: depth = -3000, mai ricalcolato
  };
}

function spawnConstructionBox(x, y) {
  return { x, y, t: 0, spr: "mon_bild_box", depth: -y - 200 };   // [C] mon_box/Step.gml: depth = -y - 200
}

/** Avanza i palloni di cantiere: 225 tick a volo dritto portando la cassa,
 * poi la sgancia (spawna `mon_box`, separato — vedi sotto) e fluttua via
 * verso l'alto accelerando (la gravita' vera dell'originale, non un
 * placeholder) finche' non sparisce. */
export function stepConstructionBalloons(list, boxes, dt) {
  for (let i = list.length - 1; i >= 0; i--) {
    const m = list[i];
    m.t += dt;
    if (!m.dropped && m.t >= CONSTRUCTION_CARRY) {
      m.dropped = true;
      m.spr = "mon_bild_empty";                 // [C] action_sprite_set(mon_bild_empty, 0, 1)
      boxes.push(spawnConstructionBox(m.x, m.y));
    }
    if (m.dropped) m.vy -= CONSTRUCTION_GRAVITY * 60 * dt;   // [C] gravita' applicata un tick alla volta
    m.x += m.vx * 60 * dt;
    m.y += m.vy * 60 * dt;
    if (m.t >= CONSTRUCTION_LIFE) list.splice(i, 1);
  }
}

/** La cassa sganciata: cade a terra, recalcola il proprio depth ogni Step
 * come nel decompilato (per finire dietro/davanti agli edifici in base a
 * dove arriva), poi sparisce (senza lo sbuffo di fumo `smoko` — puramente
 * cosmetico, stesso gap gia' dichiarato per il fumo di industria,
 * STUDIO.md). */
export function stepConstructionBoxes(boxes, dt) {
  for (let i = boxes.length - 1; i >= 0; i--) {
    const bx = boxes[i];
    bx.t += dt;
    bx.y += BOX_FALL_SPEED * 60 * dt;
    bx.depth = -bx.y - 200;
    if (bx.t >= BOX_LIFE) boxes.splice(i, 1);
  }
}
