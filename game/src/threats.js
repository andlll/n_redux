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
// rosso, 6/27 verde scuro, 9/27 blu). `col` (0..3) e' salvato sull'istanza
// perche' Step.gml lo rilegge per scegliere lo sprite "in fiamme" giusto
// quando l'aereo entra in stato piro (vedi PIRO_AIR_SPRITE sotto).
function pickAirSpr() {
  let spr = "fighterspr", col = 0;
  if (dice(3)) { spr = "figros"; col = 1; }
  if (dice(3)) { spr = "figgg"; col = 2; }
  if (dice(3)) { spr = "figb"; col = 3; }
  return { spr, col };
}

// [C] air/Step.gml: sprite_index 256..259, risolti per indice come i 16
// sprite di mira delle torrette (data/sprites.json) — non scelti qui.
const PIRO_AIR_SPRITE = { 0: "verde_pic", 1: "rosso_pic", 2: "giallo_pic", 3: "blu_pic" };

// [I] Posizione di nascita: stesso adattamento gia' scelto per le
// mongolfiere (STUDIO.md "le mongolfiere") — l'originale userebbe il range
// piu' grande scritto per `match` (`action_if_number(162, 0, 0)` falso),
// qui sempre il ramo "mappa facile" perche' e' l'unica room di questo
// motore.
//
// `life`/`piro` sono il pezzo aggiunto in un giro successivo (STUDIO.md
// "lo stato piro"): **[C]** ogni tipo nasce con una vita vera (`life` in
// Create.gml — non un contatore morto: letto con l'operatore "<=", non
// "!=" come una lettura precedente aveva capito, STUDIO.md corregge
// quell'errore) che il fuoco vero (game/src/projectiles.js) scala colpo
// per colpo. Quando arriva a 0 o sotto, `Step.gml` decide — a dado per
// `air`, sempre per `bombar`/`dirig` — se il velivolo esplode sul colpo o
// entra in stato "piro": precipita per conto suo (direzione/velocita'
// proprie, non piu' la diagonale di pattugliamento), smette di bombardare,
// cambia sprite, e muore per davvero solo dopo un timer breve indipendente
// (che RIARMA lo stesso Alarm_1 della scadenza naturale con un tempo molto
// piu' corto — la vecchia scadenza lunga viene di fatto scavalcata).
export const THREAT_TYPES = {
  air: {
    label: "caccia",
    spawnX: -170, spawnY: [380, 1620],       // [C] r12/Alarm_4.gml
    maxAge: 3000,                             // [C] air/Create.gml: action_set_alarm(3000, 1)
    maxLife: 2,                               // [C] air/Create.gml: life = 2
    bombEvery: 40, bombChance: 2,             // [C] air/Alarm_0.gml: ogni 40 tick, dado 1/2 — solo se "desto" (vedi spawn)
    stormDice: 68,                            // [C] air/Alarm_5.gml
    smokeTrail: true,                         // [C] air/Alarm_6.gml + Step.gml: vedi spawnAerSmoke()/stepThreats() sotto
    // [C] air/Step.gml: solo 1/2 delle volte che la vita finisce entra in
    // piro (l'altra meta' esplode sul colpo, come se non avesse questo
    // stato) — dado 300°/12 (quasi verticale, in picchiata veloce), 30 tick
    // (0.5s) prima della morte vera, con un lampo all'ingresso.
    piro: { chance: 0.5, dir: 300, speed: 12, life: 30 * TICK, entryBurst: true },
  },
  bombar: {
    label: "bombardiere",
    spawnX: -170, spawnY: [380, 1620],       // [C] r12/Alarm_5.gml
    maxAge: 6000,                             // [C] bombar/Create.gml: action_set_alarm(6000, 1)
    maxLife: 3.5,                             // [C] bombar/Create.gml: life = 3.5
    bombEvery: 25, bombChance: 2,             // [C] bombar/Alarm_0.gml
    stormDice: 68,                            // [C] bombar/Alarm_5.gml
    smokeTrail: true,                         // [C] bombar/Alarm_6.gml: stessa scia di air
    // [C] bombar/Step.gml: SEMPRE piro quando la vita finisce (nessun
    // dado) — direzione 10°/velocita' 7 (una planata quasi orizzontale,
    // molto piu' lenta della picchiata di air), 20 tick prima della morte
    // vera. Stacca anche due o quattro pezzi di fusoliera (vedi
    // BOMBAR_DEBRIS sotto), con un lampo all'ingresso.
    piro: { chance: 1, dir: 10, speed: 7, life: 20 * TICK, entryBurst: true, debris: true },
  },
  dirig: {
    label: "zeppelin",
    spawnX: -1000, spawnY: [900, 2120],      // [C] r12/Alarm_6.gml
    maxAge: 10000,                            // [C] dirig/Create.gml: action_set_alarm(10000, 1)
    maxLife: 10,                              // [C] dirig/Create.gml: life = 10 (il piu' resistente dei tre)
    bombEvery: 30,                            // [C] dirig/Alarm_0.gml: due bombe indipendenti, offset fissi
    bombOffsets: [{ dx: -20, dy: -5, chance: 2 }, { dx: 20, dy: 5, chance: 2 }],
    stormDice: 68,                            // [C] dirig/Alarm_5.gml
    // [C] nessun Alarm_6/smoko_aer in dirig: a differenza di air/bombar lo
    // zeppelin non lascia nessuna scia.
    // [C] dirig/Step.gml: SEMPRE piro, nessun lampo all'ingresso (a
    // differenza di air/bombar) — deriva quasi fermo (direzione -18°,
    // velocita' 1.5) per 85 tick, il piu' lungo dei tre, mentre 5 dadi
    // indipendenti (1/45 a testa, OGNI frame) sparpagliano esplosioni
    // intorno a se' — lo stesso schema a raggiera di dirig/Destroy.gml
    // (spawnDeathEffect sotto), qui pero' distribuito nel tempo invece che
    // tutto insieme.
    piro: { chance: 1, dir: -18, speed: 1.5, life: 85 * TICK, entryBurst: false, continuousBurst: true },
  },
};

// [C] dirig/Step.gml (durante il piro) E dirig/Destroy.gml (alla morte
// vera, qualunque sia la causa — STUDIO.md, vedi spawnDeathEffect sotto):
// stessi 5 offset per entrambi, non una coincidenza.
const DIRIG_BURST_OFFSETS = [[0, 0], [90, -30], [-90, 30], [-120, 40], [120, -40]];

// [C] bombar/Step.gml, ramo piro: due pezzi di fusoliera (dado 1/2, sprite
// finale "bomb_p1") o quattro (l'altro ramo, "bomb_p2") — ognuno un
// oggetto a parte (rot11/12/21..24) con la propria direzione/velocita'/vita
// fissa, letto da ciascun Create.gml, non un pattern unico riparametrizzato.
// [C] rot11|12|21|22|23|24/Create.gml: sprite "bomb_rNN" (uno a uno gli
// stessi nomi dell'oggetto — non un caso, il progetto originale nomina
// spesso lo sprite come l'oggetto).
const BOMBAR_DEBRIS = [
  { finalSpr: "bomb_p1", pieces: [
    { dx: 70, dy: 40, dir: 8, spd: 20, life: 20 * TICK, spr: "bomb_r11" },
    { dx: -70, dy: -40, dir: 130, spd: 11, life: 50 * TICK, spr: "bomb_r12" },
  ] },
  { finalSpr: "bomb_p2", pieces: [
    { dx: -70, dy: -40, dir: 130, spd: 28, life: 13 * TICK, spr: "bomb_r21" },
    { dx: 70, dy: 40, dir: 10, spd: 12, life: 6 * TICK, spr: "bomb_r22" },
    { dx: -170, dy: 100, dir: 170, spd: 40, life: 3 * TICK, spr: "bomb_r23" },
    { dx: -170, dy: 100, dir: 223, spd: 22, life: 9 * TICK, spr: "bomb_r24" },
  ] },
];
// [C] rot*/Alarm_0.gml: ognuno crea un'esplosione e si distrugge — qui
// basta un timer, niente oggetto per pezzo.
function spawnDebris(x, y, dir, spd, life, spr) {
  const rad = (dir * Math.PI) / 180;
  return { x, y, vx: Math.cos(rad) * spd * 60, vy: -Math.sin(rad) * spd * 60, t: 0, life, spr };
}
export function stepDebris(debris, explosions, dt) {
  for (let i = debris.length - 1; i >= 0; i--) {
    const d = debris[i];
    d.t += dt;
    d.x += d.vx * dt;
    d.y += d.vy * dt;
    if (d.t >= d.life) { debris.splice(i, 1); explosions.push(spawnExplosion(d.x, d.y)); }
  }
}

// [C] smoko_aer/Create|Step|Alarm_0.gml: riusa gli stessi sprite "cc2"/
// "cc3" del fumo delle centrali (smoke.js) — MAI "cc1" (a differenza di
// smoke_ind, qui il dado sceglie solo fra le due varianti), animazione a
// frame vera come loro (70 frame, image_speed di default), ma ferma sul
// posto (nessun moto: smoko_aer non insegue l'aereo che l'ha creata,
// resta dov'e' nata) e con una crescita diversa — parte da scala 2 (il
// doppio del fumo delle centrali) e cresce piu' in fretta (+0.2/tick =
// 12/s contro 3/s). depth **[C]** -4000 fisso (data/objects.json), la
// stessa quota delle esplosioni/del fuoco vero, non -9000 come il fumo di
// scia dei proiettili (game/src/projectiles.js, spawnSmoko) — diversa
// famiglia di oggetto nel decompilato, diversa quota.
export const AER_SMOKE_FRAME_COUNT = 70;
const AER_SMOKE_PERIOD = 8 * TICK;    // [C] air|bombar/Alarm_6.gml: si riarma ogni 8 tick
export const AER_SMOKE_LIFE = 36 * TICK; // [C] smoko_aer/Create.gml: action_set_alarm(36, 0). Esportata per la
// dissolvenza in alpha calcolata da main.js — [I] fade out invece di
// sparire di scatto ad `action_kill_object`, stesso trattamento di
// smoke.js/SMOKE_LIFE e projectiles.js/SMOKO_LIFE.
const AER_SMOKE_GROWTH = 12;          // [C] Step.gml: xsca += 0.2/tick = 12/s a 60fps
function spawnAerSmoke(x, y) {
  return { x, y, t: 0, spr: Math.random() < 0.5 ? "cc2" : "cc3", scale: 2, depth: -4000 };
}

/** [C] air/Create.gml: meta' delle volte nasce "in prima fila" (depth
 * -3990, sgancia bombe davvero — `desto`), l'altra meta' piu' piccola e
 * dietro (depth 2, scala 0.75) e non bombarda mai: puro traffico aereo di
 * sfondo. bombar/dirig sono sempre "in prima fila". */
export function spawnThreat(type) {
  const def = THREAT_TYPES[type];
  const front = type !== "air" || dice(2);
  const air = type === "air" ? pickAirSpr() : null;
  return {
    type, x: def.spawnX, y: rand(def.spawnY[0], def.spawnY[1]),
    spd: type === "dirig" ? 2 : type === "bombar" ? (dice(2) ? 8 : 6) : (dice(2) ? 16 : 13),  // [C]
    depth: front ? -3990 : 2, scale: front ? 1 : 0.75, desto: front,
    spr: air ? air.spr : type === "bombar" ? "bomberspr" : "dirspr",
    col: air ? air.col : 0,
    life: def.maxLife, piro: false, pyroT: 0,
    t: 0, bombT: 0, stormT: 0, smokeT: 0,
  };
}

/** Avanza/scarta gli sbuffi di scia degli aerei (spawnAerSmoke sopra) —
 * array separato dalla scia dei proiettili (game/src/projectiles.js,
 * stepSmoko): stessa idea, ma questi crescono nel tempo e animano 70 frame
 * veri, quelli restano un unico fotogramma fermo. */
export function stepAerSmoke(trails, dt) {
  for (let i = trails.length - 1; i >= 0; i--) {
    const p = trails[i];
    p.t += dt;
    if (p.t >= AER_SMOKE_LIFE) { trails.splice(i, 1); continue; }
    p.scale += AER_SMOKE_GROWTH * dt;
  }
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
const EXPLOSION_SCALE = 1.4;           // [C] esplo/Create.gml: action_sprite_transform(1.4, 1.4, 0, 0)
// [C] data/sprites.json: "fica" ha davvero 60 frame, uno a uno quanto dura
// l'oggetto (image_speed di default = 1, mai toccato dal codice — stesso
// schema gia' visto per "soldfade"/coins.js e cc1|cc2|cc3/smoke.js): uno
// stop-motion vero dell'esplosione, non un fotogramma statico. Main.js lo
// anima da `ex.t` allo stesso modo.
export const EXPLOSION_FRAME_COUNT = 60;

/** [C] esplo/Create.gml. `scale` di default 1.4 (l'esplosione vera); i
 * lampi di sparo del lanciarazzi (game/src/projectiles.js) passano 0.4
 * (rol_avant/rol_diet/Create.gml: action_sprite_transform(0.4, 0.4, 0, 0)) —
 * stesso sprite "fica" (con la sua stessa animazione a 60 frame), solo
 * piu' piccolo. */
export function spawnExplosion(x, y, scale = EXPLOSION_SCALE) {
  return { x, y, t: 0, spr: "fica", scale };
}

/** [C] dirig/Destroy.gml: 5 esplosioni a raggiera invece di una sola (uno
 * zeppelin e' grande) — GameMaker lo scatta in automatico ad OGNI morte
 * dell'istanza, qualunque sia la causa (fulmine, morte vera a fine piro,
 * scadenza naturale), in aggiunta a quello che il codice che ha chiesto la
 * morte crea gia' per conto suo (STUDIO.md, "lo stato piro"). air/bombar/
 * monspi/le mongolfiere non hanno un Destroy.gml proprio: quella singola
 * esplosione che il colpo diretto crea comunque gia' gli basta. */
export function spawnDeathEffect(type, x, y) {
  if (type !== "dirig") return [spawnExplosion(x, y)];
  return DIRIG_BURST_OFFSETS.map(([dx, dy]) => spawnExplosion(x + dx, y + dy));
}

/**
 * Avanza aerei/bombardieri/zeppelin: volano lungo la stessa diagonale
 * (velocita' propria per tipo), rischiano un fulmine durante una tempesta
 * vera (stesso schema di balloons.js/buildings.js — bypassa del tutto vita
 * e piro, uccisione immediata), sganciano bombe ad intervalli (`bombOffsets`
 * per dirig, singola posizione per air/bombar — solo se `desto`, i caccia
 * "di sfondo" non bombardano mai) finche' sono sani, e quando la vita vera
 * (`th.life`, scalata dal fuoco vero — game/src/projectiles.js) arriva a 0
 * o sotto decidono se esplodere sul colpo o precipitare (vedi
 * `THREAT_TYPES[...].piro` sopra per i numeri di ciascun tipo). Mentre
 * precipitano non bombardano piu' e seguono la propria traiettoria di
 * caduta invece della diagonale di pattugliamento, finche' un timer breve
 * indipendente non li spegne per davvero.
 *
 * `trails` riceve la scia di fumo (spawnAerSmoke sopra), `debris` i pezzi
 * di fusoliera che bombar stacca entrando in piro (spawnDebris sopra).
 */
export function stepThreats(threats, bombs, explosions, dt, r12, trails, debris) {
  for (let i = threats.length - 1; i >= 0; i--) {
    const th = threats[i];
    const def = THREAT_TYPES[th.type];

    th.t += dt;
    if (th.piro) {
      // [C] Step.gml, ramo piro: la diagonale di pattugliamento lascia il
      // posto alla traiettoria di caduta (direzione/velocita' proprie del
      // tipo, non piu' quelle di volo).
      const rad = (def.piro.dir * Math.PI) / 180;
      const pxPerSec = def.piro.speed * 60;
      th.x += Math.cos(rad) * pxPerSec * dt;
      th.y -= Math.sin(rad) * pxPerSec * dt;
    } else {
      const pxPerSec = th.spd * 60;
      th.x += COS30 * pxPerSec * dt;
      th.y -= SIN30 * pxPerSec * dt;
    }

    if (def.smokeTrail) {
      th.smokeT += dt;
      while (th.smokeT >= AER_SMOKE_PERIOD) { th.smokeT -= AER_SMOKE_PERIOD; trails.push(spawnAerSmoke(th.x, th.y)); }
    }

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
      // [C] Alarm_5.gml crea sempre un "esplo" prima di uccidersi — poi
      // Destroy.gml (dirig soltanto) ci aggiunge la raggiera.
      explosions.push(spawnExplosion(th.x, th.y));
      if (th.type === "dirig") explosions.push(...spawnDeathEffect("dirig", th.x, th.y));
      continue;
    }

    if (th.piro) {
      th.pyroT += dt;
      if (def.piro.continuousBurst) {
        for (const [dx, dy] of DIRIG_BURST_OFFSETS) if (dice(45)) explosions.push(spawnExplosion(th.x + dx, th.y + dy));
      }
      if (th.pyroT >= def.piro.life) {
        threats.splice(i, 1);
        explosions.push(...spawnDeathEffect(th.type, th.x, th.y));
      }
      continue;   // [C] niente bombe ne' controllo di scadenza naturale mentre precipita
    }

    if (th.life <= 0) {
      if (Math.random() < def.piro.chance) {
        th.piro = true; th.pyroT = 0; th.desto = false;
        if (def.piro.entryBurst) explosions.push(spawnExplosion(th.x, th.y));
        if (def.piro.debris) {
          // bombar: lo sprite finale dipende da quale dei due set di
          // detriti esce (vedi BOMBAR_DEBRIS sopra), non e' fisso come per
          // air/dirig.
          const set = BOMBAR_DEBRIS[dice(2) ? 0 : 1];
          th.spr = set.finalSpr;
          for (const p of set.pieces) debris.push(spawnDebris(th.x + p.dx, th.y + p.dy, p.dir, p.spd, p.life, p.spr));
        } else {
          th.spr = th.type === "air" ? PIRO_AIR_SPRITE[th.col] : "dirspr_distrutto";
        }
      } else {
        // [I] solo `air` puo' arrivare qui (chance < 1): esplode sul colpo
        // senza passare per il piro, come se non avesse questo stato.
        threats.splice(i, 1);
        explosions.push(...spawnDeathEffect(th.type, th.x, th.y));
      }
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

    if (th.t >= def.maxAge * TICK) {
      threats.splice(i, 1);
      // [C] Alarm_1.gml e' lo stesso evento raggiunto per scadenza naturale
      // O per il timer breve del piro — stesso effetto in entrambi i casi,
      // spawnDeathEffect() gia' distingue da solo air/bombar (un esplo) da
      // dirig (la raggiera di Destroy.gml).
      explosions.push(...spawnDeathEffect(th.type, th.x, th.y));
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
