// Il fuoco vero delle torrette — src/objects/red_ball (missile) + yellow_pro
// (gatling) + laserone|laserone_retro (laser), piu' rol_avant/rol_diet/
// gat_avant_des/gat_diet_des (i lampi di sparo, puramente cosmetici — tutti
// riportati come lo stesso "esplo"/"fica" gia' usato per le esplosioni
// vere, solo piu' piccolo: STUDIO.md "il lanciarazzi" aveva gia' scelto
// questa semplificazione per missile, qui estesa alle altre due torrette
// per lo stesso motivo — nessuno sprite di lampo separato da importare).
//
// [C] rocket_launcher/Step.gml: quando una minaccia vera (`nemici_target`
// — air/bombar/dirig, non le mongolfiere) entra nel raggio di fuoco vero
// (`aim.fireRange` per tipo, buildings.js) E il cannone non e' in
// "ricarica", parte un colpo. Il dettaglio piu' facile da leggere male:
// **il colpo non punta alla minaccia che ha fatto scattare lo sparo** —
// punta a `instance_nearest(x, y, veicoli_target)`, lo stesso bersaglio
// gia' inseguito dal cannone (STUDIO.md "il lanciarazzi", `b.aimAngle`,
// buildings.js) — se una mongolfiera innocua e' piu' vicina della minaccia
// vera che ha innescato lo sparo, il colpo vola verso QUELLA, non verso il
// bombardiere. Fedele all'originale per tutte e tre le torrette, non un
// bug di questa riscrittura: nessuno dei tre oggetti-proiettile menziona
// `nemici_target` al proprio Create.
//
// Le tre torrette non sono varianti dello stesso cannone: `WEAPONS` sotto
// tiene i dati che le differenziano (raggio, ricarica, munizioni, la forma
// del colpo) mentre `fireFrom()` e' l'unico posto che li interpreta,
// condiviso da fuoco automatico (stepTurretFire) e manuale al tap
// (fireTurretManual, solo missile/laser — gatlinggun/Mouse_LeftPressed.gml
// non spara affatto al tocco, vedi buildings.js).
//
// [I] = semplificato deliberatamente, dettagliato punto per punto sotto.

import { BUILDING_TYPES } from "./buildings.js";
import { spawnExplosion } from "./threats.js";
import { BALLOON_TYPES, spawnLoot } from "./balloons.js";

const TICK = 1 / 60;
const MUZZLE_FLASH_SCALE = 0.4;        // [C] rol_avant|rol_diet|gat_avant_des|gat_diet_des/Create.gml: tutti 0.4

// [C] rocket_launcher/Step.gml: lo stesso arco di 22.5° gia' usato per gli
// sprite di mira (buildings.js, TURRET_SPRITE_TABLES) ha anche un punto di
// sparo diverso per ogni direzione — la punta del cannone, non il centro
// dell'edificio. Sedici offset scritti a mano nel decompilato (qui presi
// dal ramo automatico di Step.gml — non dal fuoco manuale al tap,
// Mouse_LeftPressed.gml: usa una tabella a 4 vie piu' rozza e ridondante,
// non replicata — vedi fireTurretManual() sotto).
const MISSILE_MUZZLE = [
  { max: 22.5, dx: 46, dy: -125 }, { max: 45, dx: 27, dy: -129 }, { max: 67.5, dx: 6, dy: -128 },
  { max: 90, dx: -15, dy: -127 }, { max: 112.5, dx: -34, dy: -119 }, { max: 135, dx: -46, dy: -107 },
  { max: 157.5, dx: -55, dy: -91 }, { max: 180, dx: -51, dy: -79 }, { max: 202.5, dx: -44, dy: -81 },
  { max: 225, dx: -30, dy: -73 }, { max: 247.5, dx: -11, dy: -68 }, { max: 270, dx: 9, dy: -68 },
  { max: 292.5, dx: 29, dy: -75 }, { max: 315, dx: 43, dy: -82 }, { max: 337.5, dx: 64, dy: -96 },
  { max: 360, dx: 60, dy: -111 },
];

// [C] gatlinggun/Step.gml: due canne, due proiettili per scarica — offset
// letti dalle coordinate di `instance_create(..., yellow_pro)` (non da
// quelle dei lampi `gat_avant_des`/`gat_diet_des`, che per una direzione
// — max180 — non coincidono esattamente con quelle del proiettile: [C]
// fedele a un'incongruenza gia' presente nel decompilato stesso).
const GATLING_MUZZLE = [
  { max: 22.5, dx1: 127, dy1: -123, dx2: 128, dy2: -155 },
  { max: 45, dx1: 124, dy1: -153, dx2: 106, dy2: -182 },
  { max: 67.5, dx1: 109, dy1: -184, dx2: 69, dy2: -202 },
  { max: 90, dx1: 74, dy1: -201, dx2: 26, dy2: -211 },
  { max: 112.5, dx1: 25, dy1: -213, dx2: -27, dy2: -213 },
  { max: 135, dx1: -25, dy1: -210, dx2: -75, dy2: -198 },
  { max: 157.5, dx1: -68, dy1: -169, dx2: -107, dy2: -175 },
  { max: 180, dx1: -104, dy1: -180, dx2: -125, dy2: -180 },
  { max: 202.5, dx1: -125, dy1: -157, dx2: -127, dy2: -122 },
  { max: 225, dx1: -128, dy1: -130, dx2: -107, dy2: -100 },
  { max: 247.5, dx1: -107, dy1: -105, dx2: -72, dy2: -81 },
  { max: 270, dx1: -74, dy1: -84, dx2: -27, dy2: -72 },
  { max: 292.5, dx1: -31, dy1: -74, dx2: 21, dy2: -76 },
  { max: 315, dx1: 19, dy1: -78, dx2: 68, dy2: -87 },
  { max: 337.5, dx1: 72, dy1: -76, dx2: 108, dy2: -95 },
  { max: 360, dx1: 104, dy1: -95, dx2: 126, dy2: -125 },
];

// [C] lasergun/Step.gml: un solo punto di sparo per direzione (`laserone`/
// `laserone_retro` — stesso sprite "lasere", solo l'offset cambia: qui non
// serve distinguerli, vedi il "beam" sotto).
const LASER_MUZZLE = [
  { max: 22.5, dx: 81, dy: -321 }, { max: 45, dx: 65, dy: -335 }, { max: 67.5, dx: 38, dy: -344 },
  { max: 90, dx: 9, dy: -354 }, { max: 112.5, dx: -23, dy: -355 }, { max: 135, dx: -49, dy: -343 },
  { max: 157.5, dx: -70, dy: -331 }, { max: 180, dx: -80, dy: -315 }, { max: 202.5, dx: -77, dy: -298 },
  { max: 225, dx: -65, dy: -283 }, { max: 247.5, dx: -42, dy: -268 }, { max: 270, dx: -6, dy: -266 },
  { max: 292.5, dx: 22, dy: -267 }, { max: 315, dx: 52, dy: -273 }, { max: 337.5, dx: 73, dy: -288 },
  { max: 360, dx: 82, dy: -302 },
];

function bucketFor(table, angleDeg) {
  const a = ((angleDeg % 360) + 360) % 360;
  for (const o of table) if (a <= o.max) return o;
  return table[table.length - 1];
}

// Un colpo per tipo di torretta — letto da fireFrom()/stepTurretFire()/
// fireTurretManual() sotto, mai dal chiamante (main.js resta ignaro di
// queste differenze, come per BUILDING_TYPES).
// Danno per colpo contro una minaccia vera (air/bombar/dirig — mai le
// mongolfiere, sempre un solo colpo a prescindere dall'arma, invariato).
// [C] letto dai `Collision_*` di ciascun oggetto-colpo contro air(77)/
// bombar(78)/dirig(85) — mappati per indice tramite data/objects.json,
// non nomi scelti qui. Contro `threats.js` (`th.life`, ora una vita vera:
// STUDIO.md, "lo stato piro" corregge una lettura precedente sbagliata —
// l'operatore 3 di `action_if_variable` e' "<=", non "!=").
const DAMAGE = {
  missile: 1,                              // [C] red_ball/Collision_77|78|85.gml: uniforme sui tre tipi
  gatling: 0.07,                           // [C] yellow_pro/Collision_77|78|85.gml: uniforme, per proiettile (due a scarica)
  laser: { air: 2, bombar: 3, dirig: 2 },  // [C] laserone/Collision_77|78|85.gml: diverso per tipo, non uniforme
};

const WEAPONS = {
  // [C] red_ball/Create|Alarm_1.gml.
  missile: {
    kind: "projectile", muzzle: MISSILE_MUZZLE,
    cooldown: 40 * TICK,                 // [C] action_set_alarm(40, 6) -> Alarm_6 rimette launching = 1
    speed: 50, life: 120 * TICK, spr: "redb", damage: DAMAGE.missile,
    // [C] red_ball/Alarm_0.gml: action_create_object(smoko, 0, 0), poi si
    // riarma da solo ogni 2 tick per tutta la vita del razzo (~120 tick) —
    // una vera scia di fumo, non un singolo sbuffo alla bocca (quello e'
    // gatling, `muzzleSmoke` sopra/sotto). Vedi spawnSmoko()/stepSmoko().
    trailPeriod: 2 * TICK,
    // [I] Nessuna maschera vera (STUDIO.md, "pepazzittecollider" mai
    // ricostruito — stessa scelta di BLAST_RADIUS/TURRET_MIN_DIST altrove):
    // un raggio fisso, abbastanza piccolo da sembrare un colpo mirato invece
    // di un'esplosione ad area, abbastanza grande da connettere in modo
    // affidabile con la simulazione a passi discreti (dt fino a 50ms, il
    // razzo fa fino a ~150px a passo).
    hitRadius: 120,
  },
  // [C] yellow_pro/Create|Alarm_1.gml: due proiettili per scarica (uno a
  // canna, GATLING_MUZZLE sopra), ognuno costa 3 mon a nascere — [C] fedele,
  // `r12.mon -= 3` incondizionato, senza controllo `canAfford` prima (a
  // differenza di ogni acquisto/potenziamento nel motore): il fuoco
  // automatico puo' davvero portare `mon` sotto zero con abbastanza minacce
  // vicine, esattamente come nel decompilato. Ogni proiettile nasce anche
  // con un fumo (`smoko`, un solo sbuffo alla bocca — non una scia, vedi
  // `muzzleSmoke` sotto: [C] `yellow_pro/Create.gml` lo crea una volta
  // sola, a differenza del razzo che lo riarma di continuo in volo).
  gatling: {
    kind: "projectile", twin: true, muzzle: GATLING_MUZZLE,
    cooldown: 50 * TICK,                 // [I] vedi buildings.js: il vero riarmo di `launching` e' un piccolo stato
    // (spra/amove/Alarm_9|11) non riprodotto — 50 tick e' quando `spra`
    // torna a 0 (Alarm_9) e la mira/il prossimo sparo vero tornano
    // possibili, il numero piu' difendibile come "ricarica effettiva".
    speed: 60, life: 50 * TICK, spr: "gatmissse", damage: DAMAGE.gatling,
    hitRadius: 70,                       // [I] proiettile piccolo, stessa logica di missile.hitRadius sopra
    ammoCost: { mon: 3 },                // per proiettile, non per scarica
    muzzleSmoke: true,                    // [C] yellow_pro/Create.gml: action_create_object(smoko, 0, 0)
  },
  // [C] lasergun/Step.gml: costa energia, non denaro, e QUESTA sì e'
  // gated (`with(r12) if (ele>=200) break`) — a differenza di gatling non
  // spara affatto se l'energia non basta. Nessun proiettile vero: `laserone`
  // non si muove mai (resta alla punta del cannone, ruotato verso il
  // bersaglio) — nel gioco originale e' il suo SPRITE, un fascio disegnato
  // lungo, a raggiungere il bersaglio lontano; il nostro renderer
  // (game/src/gl.js) non supporta la rotazione di uno sprite (mai servita
  // finora: ogni sprite direzionale del motore e' gia' un fotogramma
  // separato per direzione, non uno ruotato a runtime), quindi il fascio
  // vero e proprio non si disegna. [I] Sostituito con un colpo secco e
  // istantaneo (hitscan): tutte le minacce vere entro `aim.fireRange`
  // vengono danneggiate in un colpo solo (vedi fireFrom sotto — [C] fedele
  // nello spirito, non alla lettera: `laserone`/`laserone_retro` non
  // uccidono mai se stessi contro `bombar`, quindi tecnicamente
  // trafiggono solo lui e non air/dirig, che invece lo fermano — una
  // distinzione che richiederebbe una vera geometria di collisione lungo
  // il fascio, non solo un raggio dal cannone: qui semplificata a "colpisce
  // tutto cio' che e' in portata"), con un lampo alla bocca del cannone e
  // un'esplosione su ciascun bersaglio effettivamente distrutto — non
  // garantito al primo colpo, il danno per tipo (DAMAGE.laser sopra) non
  // sempre basta da solo (air si', bombar/dirig no).
  laser: {
    kind: "beam", muzzle: LASER_MUZZLE,
    cooldown: 85 * TICK,                  // [C] launching=2, action_set_alarm(85, 1) -> Alarm_1 rimette launching = 0
    ammoCost: { ele: 200 }, ammoGate: true,
  },
};

// [C] smoko/Create.gml: nessun moto, nessuna crescita (a differenza di
// smoke_ind/smoke.js) — nasce, aspetta 36 tick (Alarm_0: action_kill_
// object), sparisce di scatto. Sprite a dado tra c1 (25%, il default
// dell'oggetto)/c2 (25%)/c3 (50%, l'ultimo dei due `action_if_dice(2)`
// vince sempre perche' sovrascrive il primo) — proporzioni diverse da
// quelle di smoke_ind (50/25/25) nonostante siano gli stessi tre sprite,
// letto cosi' come sta. Depth **[C]** -9000 fisso (data/objects.json:
// `smoko`, stessa quota dei pulsanti blu delle monete, coins.js) — sempre
// in primo piano, ma senza `_selfLit`: e' un residuo di sparo/scia, non un
// simbolo dell'interfaccia come le monete, quindi si scurisce di notte
// come qualunque altro decoro (STUDIO.md, coins/upsign).
const SMOKO_LIFE = 36 * TICK;
const SMOKO_DEPTH = -9000;
function spawnSmoko(x, y) {
  const d = Math.random();
  const spr = d < 0.5 ? "c3" : d < 0.75 ? "c2" : "c1";
  return { x, y, t: 0, spr, depth: SMOKO_DEPTH };
}

/** Avanza/scarta gli sbuffi di fumo di scia (missile/gatling — vedi
 * spawnSmoko sopra). Array separato da quello del fumo delle centrali
 * (game/src/smoke.js): stesso principio, meccanica diversa (statico,
 * niente moto ne' crescita), condividerlo avrebbe voluto dire rendere
 * quella funzione piu' complicata per un caso che non le appartiene. */
export function stepSmoko(trails, dt) {
  for (let i = trails.length - 1; i >= 0; i--) {
    trails[i].t += dt;
    if (trails[i].t >= SMOKO_LIFE) trails.splice(i, 1);
  }
}

function spawnProjectile(x, y, angleDeg, weapon) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x, y, vx: Math.cos(rad) * weapon.speed, vy: -Math.sin(rad) * weapon.speed,
    t: 0, spr: weapon.spr, life: weapon.life, hitRadius: weapon.hitRadius,
    damage: weapon.damage, trailT: 0, trailPeriod: weapon.trailPeriod,
  };
}

function canFireAmmo(weapon, r12) {
  if (!weapon.ammoGate || !weapon.ammoCost) return true;
  for (const k in weapon.ammoCost) if ((r12[k] ?? 0) < weapon.ammoCost[k]) return false;
  return true;
}
function payAmmo(weapon, r12) {
  if (!weapon.ammoCost) return;
  for (const k in weapon.ammoCost) r12[k] -= weapon.ammoCost[k];
}

/** Fa davvero partire un colpo dalla punta del cannone (scelta da
 * `b.aimAngle`, `weapon.muzzle`) — il nucleo comune a fuoco automatico
 * (stepTurretFire, sotto) e fuoco manuale al tap (fireTurretManual,
 * sotto). Non tocca `b.fireT` ne' verifica munizioni/portata: quello resta
 * a carico di chi chiama, cosi' i due percorsi possono applicare le
 * proprie regole (stepTurretFire gia' sa che una minaccia vera e' in
 * portata, fireTurretManual no). `trails` riceve gli sbuffi di fumo di
 * scia (spawnSmoko sopra) quando l'arma ne crea uno alla bocca. */
function fireFrom(b, weapon, projectiles, explosions, r12, threats, trails) {
  if (weapon.kind === "beam") {
    const off = bucketFor(weapon.muzzle, b.aimAngle);
    const mx = b.x + off.dx, my = b.y + off.dy;
    payAmmo(weapon, r12);
    explosions.push(spawnExplosion(mx, my, MUZZLE_FLASH_SCALE));
    // [C] il fascio non si ferma al primo bersaglio (vedi il commento su
    // WEAPONS.laser sopra): TUTTE le minacce vere entro `aim.fireRange`
    // vengono danneggiate, non solo la piu' vicina — ma solo danneggiate:
    // se la vita non basta a portarle a 0 restano in volo, la vera morte
    // (con l'eventuale stato piro) la decide threats.js/stepThreats() al
    // prossimo frame, non qui.
    const fireRange = BUILDING_TYPES[b.type].aim.fireRange;
    const r2 = fireRange * fireRange;
    for (const th of threats) {
      const dx = th.x - b.x, dy = th.y - b.y;
      if (dx * dx + dy * dy > r2) continue;
      th.life -= DAMAGE.laser[th.type];
    }
    return;
  }
  const off = bucketFor(weapon.muzzle, b.aimAngle);
  const barrels = weapon.twin ? [[off.dx1, off.dy1], [off.dx2, off.dy2]] : [[off.dx, off.dy]];
  const target = b.aimTarget;
  for (const [dx, dy] of barrels) {
    const mx = b.x + dx, my = b.y + dy;
    const fireAngle = (Math.atan2(-(target.y - my), target.x - mx) * 180) / Math.PI;
    projectiles.push(spawnProjectile(mx, my, fireAngle, weapon));
    explosions.push(spawnExplosion(mx, my, MUZZLE_FLASH_SCALE));
    if (weapon.muzzleSmoke) trails.push(spawnSmoko(mx, my));
    payAmmo(weapon, r12);
  }
}

/**
 * Fa sparare le torrette (missile/gatling/laser, tramite `def.aim`): per
 * ognuna, cerca se una minaccia vera e' entro `aim.fireRange`, e se il
 * cannone non e' in ricarica (ne' — solo per laser — a corto di energia)
 * fa partire un colpo verso il bersaglio gia' inseguito (fireFrom sopra).
 */
export function stepTurretFire(buildings, threats, dt, projectiles, explosions, r12, trails) {
  for (const b of buildings) {
    const weapon = WEAPONS[b.type];
    if (b.construction || !weapon) continue;
    b.fireT = (b.fireT ?? 0) + dt;
    if (b.fireT < weapon.cooldown || b.aimAngle == null) continue;
    if (weapon.kind !== "beam" && !b.aimTarget) continue;
    const fireRange = BUILDING_TYPES[b.type].aim.fireRange;
    let inRange = false;
    const r2 = fireRange * fireRange;
    for (const th of threats) {
      const dx = th.x - b.x, dy = th.y - b.y;
      if (dx * dx + dy * dy < r2) { inRange = true; break; }
    }
    if (!inRange || !canFireAmmo(weapon, r12)) continue;
    b.fireT = 0;
    fireFrom(b, weapon, projectiles, explosions, r12, threats, trails);
  }
}

/**
 * Sparo manuale al tap — [C] rocket_launcher|lasergun/Mouse_LeftPressed.gml
 * (gatlinggun non ne ha uno vero, vedi buildings.js): un tocco sul cannone,
 * se non e' in ricarica e ha un bersaglio entro `aim.range` IN QUESTO
 * ISTANTE, fa partire un colpo — lo stesso `veicoli_target` piu' vicino che
 * il cannone insegue di continuo (`b.aimAngle`/`b.aimTarget`, calcolati
 * ogni frame da stepTurretAim() in buildings.js). Il controllo di portata
 * e' rifatto qui (non solo ereditato da `aimTarget`) perche' l'originale lo
 * rivaluta anche lui al tocco (`distance_to_object(veicoli_target) <
 * aim.range`, non un confronto con l'ultima direzione disegnata) —
 * `aimTarget` da solo potrebbe restare quello di un bersaglio ormai fuori
 * portata: [C] `rocket_launcher|lasergun/Step.gml`, se nessun veicolo e'
 * piu' in portata lo sprite (e quindi `aimTarget`, calcolato dallo stesso
 * identico controllo) semplicemente non si aggiorna piu', restando
 * agganciato all'ultimo bersaglio anche quando e' ormai lontanissimo.
 *
 * A differenza del fuoco automatico non richiede affatto una minaccia vera
 * in portata (missile/laser sparano comunque verso il veicolo inseguito,
 * colpendo una minaccia vera solo se la trovano per strada — [C] fedele,
 * nessuno dei tre oggetti-colpo controlla mai `nemici_target` al proprio
 * Create): per il laser (hitscan, fireFrom sopra) questo vuol dire che
 * distrugge una minaccia vera solo se ce n'e' gia' una entro `aim.fireRange`
 * in quel preciso istante, altrimenti il colpo parte comunque (lampo +
 * costo + ricarica) senza colpire nulla.
 *
 * Ritorna true se e' partito un colpo (per il messaggio in main.js), false
 * se il cannone non supporta il fuoco manuale (`BUILDING_TYPES[type].
 * manualFire`), e' in ricarica, non ha nessun bersaglio in portata adesso,
 * o (solo laser) l'energia non basta.
 */
export function fireTurretManual(b, projectiles, explosions, r12, threats, trails) {
  const weapon = WEAPONS[b.type];
  if (!weapon || !BUILDING_TYPES[b.type]?.manualFire) return false;
  if (b.aimAngle == null || !b.aimTarget) return false;
  const range = BUILDING_TYPES[b.type]?.aim?.range;
  if (range != null) {
    const dx = b.aimTarget.x - b.x, dy = b.aimTarget.y - b.y;
    if (dx * dx + dy * dy > range * range) return false;
  }
  if ((b.fireT ?? 0) < weapon.cooldown || !canFireAmmo(weapon, r12)) return false;
  b.fireT = 0;
  fireFrom(b, weapon, projectiles, explosions, r12, threats, trails);
  return true;
}

/**
 * Avanza i proiettili in volo (missile/gatling, mai il laser: colpo
 * istantaneo, non genera un proiettile — vedi fireFrom sopra): linea retta
 * (nessun inseguimento, l'originale punta una volta sola al Create e
 * basta), collisione contro mongolfiere E minacce vere insieme (lo stesso
 * oggetto red_ball/yellow_pro ha un handler per ciascuna — `veicoli_target`
 * e `nemici_target`), un solo bersaglio per proiettile. `p.life`/
 * `p.hitRadius` vengono dal tipo di arma che l'ha sparato (WEAPONS sopra),
 * non piu' una costante unica per tutti i proiettili.
 *
 * Contro una minaccia vera il proiettile si consuma comunque (un solo
 * bersaglio a botta) ma non la distrugge da solo: applica `p.damage` a
 * `hit.life` e basta — la vita e' vera (STUDIO.md, "lo stato piro" —
 * corregge una lettura precedente di questo stesso file, che leggeva
 * l'operatore 3 di `action_if_variable` come "!=" invece di "<=" e
 * concludeva che un solo colpo bastasse sempre), e decidere se/come muore
 * (esplosione sul colpo o stato piro) e' compito di threats.js/
 * stepThreats(), valutato ogni frame sulla vita accumulata, non qui.
 *
 * Colpire una mongolfiera di risorse fa cadere comunque la sua cassa
 * ([C] monvo|monvo_giga|monbo|mongo|monviolo/Destroy.gml scatta a
 * prescindere da come muore, stessa logica gia' usata per il fulmine in
 * balloons.js/stepBalloons()); colpire una spia la fa sparire senza che
 * riferisca mai (nessun Destroy.gml su monspi) — il modo per fermarla
 * prima che "riesca", chiesto insieme alle minacce vere. Queste due
 * famiglie (mongolfiere/spie), a differenza delle minacce vere, restano
 * un solo colpo = distrutte: [C] fedele, i loro `Collision_*` non toccano
 * mai `life`, controllano solo `desto` prima di uccidere sul colpo.
 *
 * `trails` riceve la scia di fumo del razzo in volo (`p.trailPeriod`,
 * missile soltanto — vedi WEAPONS.missile/spawnSmoko sopra): un puff ogni
 * 2 tick per tutta la vita del proiettile, come [C] `red_ball/Alarm_0.gml`
 * si riarma da solo. Il gatling non ha `trailPeriod` (un solo sbuffo alla
 * bocca, gia' creato una volta in fireFrom), quindi qui non fa nulla per
 * lui.
 */
export function stepProjectiles(projectiles, balloons, threats, loot, explosions, trails, dt) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.t += dt;
    p.x += p.vx * 60 * dt;
    p.y += p.vy * 60 * dt;
    if (p.trailPeriod) {
      p.trailT += dt;
      while (p.trailT >= p.trailPeriod) { p.trailT -= p.trailPeriod; trails.push(spawnSmoko(p.x, p.y)); }
    }

    let hit = null, hitList = null, hitIdx = -1, hd2 = p.hitRadius * p.hitRadius;
    for (let j = 0; j < balloons.length; j++) {
      const b = balloons[j], dx = b.x - p.x, dy = b.y - p.y, d2 = dx * dx + dy * dy;
      if (d2 < hd2) { hd2 = d2; hit = b; hitList = balloons; hitIdx = j; }
    }
    for (let j = 0; j < threats.length; j++) {
      const th = threats[j], dx = th.x - p.x, dy = th.y - p.y, d2 = dx * dx + dy * dy;
      if (d2 < hd2) { hd2 = d2; hit = th; hitList = threats; hitIdx = j; }
    }

    if (hit) {
      projectiles.splice(i, 1);
      if (hitList === balloons) {
        hitList.splice(hitIdx, 1);
        explosions.push(spawnExplosion(hit.x, hit.y));
        const def = BALLOON_TYPES[hit.type];
        if (def.loot) loot.push(spawnLoot(def.loot, hit.x, hit.y));
      } else {
        // minaccia vera: solo danno, non e' detto che muoia al primo
        // colpo (missile si', gatling no — DAMAGE sopra) — la vera morte
        // (con l'eventuale stato piro) la decide threats.js/stepThreats()
        // al prossimo frame, non qui.
        hit.life -= p.damage;
      }
      continue;
    }
    if (p.t >= p.life) projectiles.splice(i, 1);
  }
}
