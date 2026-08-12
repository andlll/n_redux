// Le minacce vere — src/objects/air|bombar|dirig (nemici_target) + le bombe
// che sganciano (bomba1 -> bomba2) e l'esplosione (esplo). Mai lette finora
// perche' dipendevano da contatori di `r12` che restavano sempre a zero
// (STUDIO.md, "cosa manca": "da dove arrivano davvero le minacce vere...
// dipendono da contatori che nessun oggetto incrementa") — quel "nessun
// oggetto" era `monspi`, letto solo dopo (game/src/balloons.js, "le
// mongolfiere"): ogni volta che una mongolfiera spia porta a termine il suo
// giro (ignorata, non esiste ancora un modo per fermarla) alza tre
// contatori indipendenti, ognuno il proprio tipo di minaccia:
//
//  - `onda`/`ondan` -> `air` (caccia, comune, veloce) — [C] r12/Alarm_4.gml
//  - `bombolo`/`bombus`/`bombn` -> `bombar` (bombardiere, ogni 4a spia
//    riuscita) — [C] r12/Alarm_5.gml
//  - `dirox`/`diro`/`diron` -> `dirig` (zeppelin, ogni 10a spia riuscita,
//    il piu' raro e il piu' lento) — [C] r12/Alarm_6.gml
//
// Ognuno di questi tre contatori "attivi" (ondan/bombn/diron) decade nel
// tempo mentre fa nascere il proprio nemico, uno alla volta — un'ondata
// non e' un evento istantaneo, e' uno stillicidio che si esaurisce da
// solo. I contatori "totali" (onda/bombus/diro) non decadono mai: ogni
// spia ignorata in piu' rende le ondate SUCCESSIVE piu' lunghe, non solo
// quella attuale — la progressione che il giocatore chiedeva.
//
// [C] = letto nel decompilato. [I] = semplificato deliberatamente
// (dettagliato punto per punto sotto). Stesso stile leggero di
// atmosphere.js/balloons.js: dati invece di una macchina a stati per
// oggetto.

const TICK = 1 / 60;
const DIR = (30 * Math.PI) / 180;   // [C] la stessa diagonale di mongolfiere/nuvole/uccelli
const COS30 = Math.cos(DIR), SIN30 = Math.sin(DIR);
const STORM_CHECK = 57 * TICK;      // [C] air|bombar|dirig/Alarm_5.gml: si riarmano tutti a 57 tick

function dice(n) { return Math.random() < 1 / n; }
function rand(a, b) { return a + Math.random() * (b - a); }

// [C] air/Create.gml: tre dice(3) indipendenti e successivi, ognuno
// sovrascrive col/sprite se va a buon fine — non un pick a 4 vie uniforme
// (l'ultimo che va a buon fine vince), replicato cosi' com'e' invece di
// precalcolare la distribuzione risultante (8/27 verde di default, 4/27
// rosso, 6/27 verde scuro, 9/27 blu).
function pickAirSpr() {
  let spr = "fighterspr";
  if (dice(3)) spr = "figros";
  if (dice(3)) spr = "figgg";
  if (dice(3)) spr = "figb";
  return spr;
}

// [I] Posizione di nascita: stesso adattamento gia' scelto per le
// mongolfiere (STUDIO.md "le mongolfiere") — l'originale userebbe il range
// piu' grande scritto per `match` (`action_if_number(162, 0, 0)` falso),
// qui sempre il ramo "mappa facile" perche' e' l'unica room di questo
// motore.
export const THREAT_TYPES = {
  air: {
    label: "caccia",
    spawnX: -170, spawnY: [380, 1620],       // [C] r12/Alarm_4.gml
    life: 3000,                               // [C] air/Create.gml: action_set_alarm(3000, 1)
    bombEvery: 40, bombChance: 2,             // [C] air/Alarm_0.gml: ogni 40 tick, dado 1/2 — solo se "desto" (vedi spawn)
    stormDice: 68,                            // [C] air/Alarm_5.gml
    explodeOnExpire: true,                    // [C] air/Alarm_1.gml: crea "esplo" anche a fine vita naturale
  },
  bombar: {
    label: "bombardiere",
    spawnX: -170, spawnY: [380, 1620],       // [C] r12/Alarm_5.gml
    life: 6000,                               // [C] bombar/Create.gml: action_set_alarm(6000, 1)
    bombEvery: 25, bombChance: 2,             // [C] bombar/Alarm_0.gml
    stormDice: 68,                            // [C] bombar/Alarm_5.gml
    explodeOnExpire: true,                    // [C] bombar/Alarm_1.gml
  },
  dirig: {
    label: "zeppelin",
    spawnX: -1000, spawnY: [900, 2120],      // [C] r12/Alarm_6.gml
    life: 10000,                              // [C] dirig/Create.gml: action_set_alarm(10000, 1)
    bombEvery: 30,                            // [C] dirig/Alarm_0.gml: due bombe indipendenti, offset fissi
    bombOffsets: [{ dx: -20, dy: -5, chance: 2 }, { dx: 20, dy: 5, chance: 2 }],
    stormDice: 68,                            // [C] dirig/Alarm_5.gml
    explodeOnExpire: false,                   // [C] dirig/Alarm_1.gml: solo action_kill_object(), nessun "esplo"
  },
};

/** [C] air/Create.gml: meta' delle volte nasce "in prima fila" (depth
 * -3990, sgancia bombe davvero — `desto`), l'altra meta' piu' piccola e
 * dietro (depth 2, scala 0.75) e non bombarda mai: puro traffico aereo di
 * sfondo. bombar/dirig sono sempre "in prima fila". */
export function spawnThreat(type) {
  const def = THREAT_TYPES[type];
  const front = type !== "air" || dice(2);
  return {
    type, x: def.spawnX, y: rand(def.spawnY[0], def.spawnY[1]),
    spd: type === "dirig" ? 2 : type === "bombar" ? (dice(2) ? 8 : 6) : (dice(2) ? 16 : 13),  // [C]
    depth: front ? -3990 : 2, scale: front ? 1 : 0.75, desto: front,
    spr: type === "air" ? pickAirSpr() : type === "bombar" ? "bomberspr" : "dirspr",
    t: 0, bombT: 0, stormT: 0,
  };
}

function spawnBomb(x, y) {
  // [C] bomba1/Create.gml: action_set_motion(280, 8) — continua a cadere
  // per conto suo, non segue l'aereo che l'ha sganciata.
  return { x, y, t: 0, spr: "bomb" };
}

const BOMB_LIFE = 30 * TICK;          // [C] bomba1/Alarm_0.gml: action_set_alarm(30, 0)
const BOMB_SPEED = 8;                  // [C]
const BOMB_DIR = (280 * Math.PI) / 180;
const BOMB_COS = Math.cos(BOMB_DIR), BOMB_SIN = Math.sin(BOMB_DIR);
const BLAST_DAMAGE = 100;              // [C] bomba2/Collision_*.gml: life += -100, uguale per ogni edificio colpito
// [I] Raggio del colpo diretto: l'originale e' vera collisione fisica fra
// la maschera di bomba2 (2 tick di vita, un lampo) e quella di CIASCUN
// edificio colpito — un handler diverso per tipo (chies/casaN/industriaN/
// club1/villa1/monum/banca1/...), tutti identici (-100 vita). Senza un
// sistema di collisione vero (STUDIO.md, "pepazzittecollider" mai
// ricostruito — stessa scelta gia' fatta per `tooCloseToTurret()`, STUDIO.md
// "il lanciarazzi") qui e' una distanza minima, tarata sulle dimensioni
// tipiche di un edificio finito in questo motore.
const BLAST_RADIUS = 150;

const EXPLOSION_LIFE = 60 * TICK;      // [C] esplo/Create.gml: action_set_alarm(60, 0)

function spawnExplosion(x, y) {
  return { x, y, t: 0, spr: "fica" };
}

/**
 * Avanza aerei/bombardieri/zeppelin: volano lungo la stessa diagonale
 * (velocita' propria per tipo), rischiano un fulmine durante una tempesta
 * vera (stesso schema di balloons.js/buildings.js), sganciano bombe ad
 * intervalli (`bombOffsets` per dirig, singola posizione per air/bombar —
 * solo se `desto`, i caccia "di sfondo" non bombardano mai), e alla fine
 * della loro vita naturale spariscono (con un lampo per air/bombar, in
 * silenzio per dirig — [C] la stessa asimmetria del decompilato).
 *
 * [I] Non modella "piro" (lo stato "colpito, sto precipitando"): richiede
 * vita/danno su un nemico, che a sua volta richiede il fuoco vero del
 * lanciarazzi — non ancora ricostruito (STUDIO.md "il lanciarazzi": la
 * mira e' vera, il fuoco resta un gap dichiarato). Finche' niente puo'
 * abbattere un aereo, quel ramo di codice originale non scatterebbe
 * comunque.
 */
export function stepThreats(threats, bombs, explosions, dt, r12) {
  for (let i = threats.length - 1; i >= 0; i--) {
    const th = threats[i];
    const def = THREAT_TYPES[th.type];
    th.t += dt;
    const pxPerSec = th.spd * 60;
    th.x += COS30 * pxPerSec * dt;
    th.y -= SIN30 * pxPerSec * dt;

    let struck = false;
    if (r12.storm) {
      th.stormT += dt;
      while (th.stormT >= STORM_CHECK) {
        th.stormT -= STORM_CHECK;
        if (dice(def.stormDice)) { struck = true; break; }
      }
    }
    if (struck) {
      threats.splice(i, 1);
      explosions.push(spawnExplosion(th.x, th.y));   // [C] Alarm_5.gml crea sempre "esplo" prima di uccidersi
      continue;
    }

    if (th.desto) {
      th.bombT += dt;
      const period = def.bombEvery * TICK;
      while (th.bombT >= period) {
        th.bombT -= period;
        if (def.bombOffsets) {
          for (const o of def.bombOffsets) if (dice(o.chance)) bombs.push(spawnBomb(th.x + o.dx, th.y + o.dy));
        } else if (dice(def.bombChance)) {
          bombs.push(spawnBomb(th.x, th.y));
        }
      }
    }

    if (th.t >= def.life * TICK) {
      threats.splice(i, 1);
      if (def.explodeOnExpire) explosions.push(spawnExplosion(th.x, th.y));
    }
  }
}

/** Le bombe sganciate: cadono per conto proprio (direzione/velocita' fisse,
 * non seguono chi le ha sganciate) e detonano dopo mezzo secondo, colpendo
 * l'edificio finito piu' vicino entro il raggio del colpo diretto (non in
 * cantiere: [C] nessun Collision_impa* nel decompilato, solo sugli
 * edifici finiti). */
export function stepBombs(bombs, explosions, buildings, dt, r12) {
  for (let i = bombs.length - 1; i >= 0; i--) {
    const b = bombs[i];
    b.t += dt;
    b.x += BOMB_COS * BOMB_SPEED * 60 * dt;
    b.y -= BOMB_SIN * BOMB_SPEED * 60 * dt;
    if (b.t < BOMB_LIFE) continue;
    bombs.splice(i, 1);
    explosions.push(spawnExplosion(b.x, b.y));   // [C] bomba1/Alarm_0.gml: action_create_object(esplo, 0, 0)
    let nearest = null, nearestD2 = BLAST_RADIUS * BLAST_RADIUS;
    for (const bld of buildings) {
      if (bld.construction) continue;
      const dx = bld.x - b.x, dy = bld.y - b.y, d2 = dx * dx + dy * dy;
      if (d2 < nearestD2) { nearestD2 = d2; nearest = bld; }
    }
    if (nearest) nearest.life = Math.max(0, nearest.life - BLAST_DAMAGE);   // [C] bomba2/Collision_*.gml
  }
}

export function stepExplosions(explosions, dt) {
  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].t += dt;
    if (explosions[i].t >= EXPLOSION_LIFE) explosions.splice(i, 1);
  }
}

// -------------------------------------------------------- il regista delle ondate
// [C] r12/Alarm_4|5|6.gml: tre timer indipendenti, ognuno riarma se
// stesso e — solo se il proprio contatore "attivo" e' positivo — lo fa
// scendere e fa nascere un nemico. Nell'originale i tre alarm restano
// SPENTI finche' `r12.arma` non diventa 1 la prima volta (la prima spia
// che porta a termine il suo giro, `r12/Step.gml`); da li' in poi si
// riarmano da soli per sempre. [I] Qui girano fin dall'inizio senza quella
// cerimonia: prima della prima spia riuscita i tre contatori sono comunque
// zero, quindi non fanno nascere niente — stesso risultato osservabile,
// stessa semplificazione gia' scelta per `ondan` in balloons.js
// (`stepBalloonSpawner`, che pero' NON decade piu' `ondan` da solo: lo fa
// SOLO qui, dove decadere vuol dire anche far nascere l'`air` che quel
// decadimento rappresenta — prima erano due punti diversi che leggevano
// la stessa variabile con effetti diversi, ora e' uno solo).
const AIR_PERIOD = 60 * TICK, AIR_DECAY = 0.5;         // [C] r12/Alarm_4.gml
const BOMBAR_PERIOD = 200 * TICK, BOMBAR_DECAY = 0.5;   // [C] r12/Alarm_5.gml
const DIRIG_PERIOD = 600 * TICK, DIRIG_DECAY = 1;        // [C] r12/Alarm_6.gml

export function stepThreatSpawner(r12, threats, dt) {
  r12.airSpawnT = (r12.airSpawnT ?? 0) + dt;
  while (r12.airSpawnT >= AIR_PERIOD) {
    r12.airSpawnT -= AIR_PERIOD;
    if ((r12.ondan ?? 0) > 0) { r12.ondan -= AIR_DECAY; threats.push(spawnThreat("air")); }
  }
  r12.bombarSpawnT = (r12.bombarSpawnT ?? 0) + dt;
  while (r12.bombarSpawnT >= BOMBAR_PERIOD) {
    r12.bombarSpawnT -= BOMBAR_PERIOD;
    if ((r12.bombn ?? 0) > 0) { r12.bombn -= BOMBAR_DECAY; threats.push(spawnThreat("bombar")); }
  }
  r12.dirigSpawnT = (r12.dirigSpawnT ?? 0) + dt;
  while (r12.dirigSpawnT >= DIRIG_PERIOD) {
    r12.dirigSpawnT -= DIRIG_PERIOD;
    if ((r12.diron ?? 0) > 0) { r12.diron -= DIRIG_DECAY; threats.push(spawnThreat("dirig")); }
  }
}
