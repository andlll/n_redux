// Il fuoco vero del lanciarazzi — src/objects/red_ball (il razzo) +
// rol_avant/rol_diet (il lampo di sparo, puramente cosmetico). Completa
// STUDIO.md "il lanciarazzi": la mira era gia' vera (buildings.js,
// stepTurretAim), il fuoco era un gap dichiarato perche' non esisteva
// ancora nessuna `nemici_target` da colpire (STUDIO.md "le minacce vere").
//
// [C] rocket_launcher/Step.gml: quando una minaccia vera (`nemici_target`
// — air/bombar/dirig, non le mongolfiere) entra entro 250px E il cannone
// non e' in "ricarica" (`launching`, 40 tick di cooldown fra uno sparo e
// l'altro), parte un razzo. Il dettaglio piu' facile da leggere male:
// **il razzo non punta alla minaccia che ha fatto scattare lo sparo** —
// punta a `instance_nearest(x, y, veicoli_target)`, lo stesso bersaglio
// gia' inseguito dal cannone (STUDIO.md "il lanciarazzi", `b.aimAngle`,
// buildings.js) — se una mongolfiera innocua e' piu' vicina della minaccia
// vera che ha innescato lo sparo, il razzo vola verso QUELLA, non verso il
// bombardiere. Fedele all'originale, non un bug di questa riscrittura:
// `red_ball/Create.gml` non menziona affatto `nemici_target`.
//
// [I] = semplificato deliberatamente, dettagliato punto per punto sotto.

import { BUILDING_TYPES } from "./buildings.js";
import { spawnExplosion, spawnDeathEffect } from "./threats.js";
import { BALLOON_TYPES, spawnLoot } from "./balloons.js";

const TICK = 1 / 60;
const FIRE_RANGE = 250;                // [C] rocket_launcher/Step.gml: distance_to_object(nemici_target) < 250
const FIRE_COOLDOWN = 40 * TICK;       // [C] action_set_alarm(40, 6) -> Alarm_6 rimette launching = 1
const PROJECTILE_SPEED = 50;           // [C] red_ball/Create.gml: action_move_point(..., 50)
const PROJECTILE_LIFE = 120 * TICK;    // [C] red_ball/Alarm_1.gml: action_set_alarm(120, 1)
// [I] Nessuna maschera vera (STUDIO.md, "pepazzittecollider" mai
// ricostruito — stessa scelta di BLAST_RADIUS/TURRET_MIN_DIST altrove):
// un raggio fisso, abbastanza piccolo da sembrare un colpo mirato invece
// di un'esplosione ad area, abbastanza grande da connettere in modo
// affidabile con la simulazione a passi discreti (dt fino a 50ms, il
// razzo fa fino a ~150px a passo).
const HIT_RADIUS = 120;
const MUZZLE_FLASH_SCALE = 0.4;        // [C] rol_avant|rol_diet/Create.gml: action_sprite_transform(0.4, 0.4, 0, 0)

// [C] rocket_launcher/Step.gml: lo stesso arco di 22.5° gia' usato per gli
// sprite di mira (buildings.js, TURRET_DIRECTIONS) ha anche un punto di
// sparo diverso per ogni direzione — la punta del cannone, non il centro
// dell'edificio. Sedici offset scritti a mano nel decompilato (qui presi
// dal ramo automatico di Step.gml — non dal fuoco manuale al tap,
// Mouse_LeftPressed.gml, mai ricostruito: usa una tabella a 4 vie piu'
// rozza, ridondante con questa, STUDIO.md "cosa manca").
const MUZZLE_OFFSETS = [
  { max: 22.5, dx: 46, dy: -125 }, { max: 45, dx: 27, dy: -129 }, { max: 67.5, dx: 6, dy: -128 },
  { max: 90, dx: -15, dy: -127 }, { max: 112.5, dx: -34, dy: -119 }, { max: 135, dx: -46, dy: -107 },
  { max: 157.5, dx: -55, dy: -91 }, { max: 180, dx: -51, dy: -79 }, { max: 202.5, dx: -44, dy: -81 },
  { max: 225, dx: -30, dy: -73 }, { max: 247.5, dx: -11, dy: -68 }, { max: 270, dx: 9, dy: -68 },
  { max: 292.5, dx: 29, dy: -75 }, { max: 315, dx: 43, dy: -82 }, { max: 337.5, dx: 64, dy: -96 },
  { max: 360, dx: 60, dy: -111 },
];
function muzzleOffsetFor(angleDeg) {
  const a = ((angleDeg % 360) + 360) % 360;
  for (const o of MUZZLE_OFFSETS) if (a <= o.max) return o;
  return MUZZLE_OFFSETS[MUZZLE_OFFSETS.length - 1];
}

function spawnProjectile(x, y, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x, y, vx: Math.cos(rad) * PROJECTILE_SPEED, vy: -Math.sin(rad) * PROJECTILE_SPEED, t: 0, spr: "redb" };
}

/** Fa davvero partire un razzo dalla punta del cannone (scelta da
 * `b.aimAngle`) verso `b.aimTarget`, piu' il lampo di sparo cosmetico —
 * il nucleo comune a fuoco automatico (stepTurretFire, sotto) e fuoco
 * manuale al tap (fireTurretManual, sotto): stessa punta, stesso bersaglio,
 * stesso ricalcolo della direzione dalla posizione di nascita del razzo
 * ([C] `red_ball/Create.gml`: `action_move_point(...)` non eredita
 * l'angolo del cannone cosi' com'e'). Non azzera `b.fireT`: la ricarica
 * resta a carico di chi chiama, cosi' i due percorsi possono condividerla
 * o meno secondo le proprie regole. */
function fireFrom(b, projectiles, explosions) {
  const off = muzzleOffsetFor(b.aimAngle);
  const mx = b.x + off.dx, my = b.y + off.dy;
  const target = b.aimTarget;
  const fireAngle = (Math.atan2(-(target.y - my), target.x - mx) * 180) / Math.PI;
  projectiles.push(spawnProjectile(mx, my, fireAngle));
  explosions.push(spawnExplosion(mx, my, MUZZLE_FLASH_SCALE));   // [C] rol_avant/rol_diet
}

/**
 * Fa sparare le torrette (oggi solo `missile`, tramite `def.aim`): per
 * ognuna, cerca se una minaccia vera e' entro 250px, e se il cannone non
 * e' in ricarica fa partire un razzo verso il bersaglio gia' inseguito
 * (fireFrom sopra).
 */
export function stepTurretFire(buildings, threats, dt, projectiles, explosions) {
  for (const b of buildings) {
    if (b.construction || !BUILDING_TYPES[b.type]?.aim) continue;
    b.fireT = (b.fireT ?? 0) + dt;
    if (b.fireT < FIRE_COOLDOWN || b.aimAngle == null) continue;
    let inRange = false;
    const r2 = FIRE_RANGE * FIRE_RANGE;
    for (const th of threats) {
      const dx = th.x - b.x, dy = th.y - b.y;
      if (dx * dx + dy * dy < r2) { inRange = true; break; }
    }
    if (!inRange) continue;
    b.fireT = 0;
    fireFrom(b, projectiles, explosions);
  }
}

/**
 * Sparo manuale al tap — [C] rocket_launcher/Mouse_LeftPressed.gml: un
 * tocco sul cannone, se non e' in ricarica (`launching==1` nell'originale)
 * e ha un bersaglio entro 400px IN QUESTO ISTANTE, fa partire un razzo
 * contro di lui — lo stesso `veicoli_target` piu' vicino che il cannone
 * insegue di continuo (`b.aimAngle`/`b.aimTarget`, calcolati ogni frame da
 * stepTurretAim() in buildings.js). Il controllo di portata e' rifatto qui
 * (non solo ereditato da `aimTarget`) perche' l'originale lo rivaluta anche
 * lui al tocco (`distance_to_object(veicoli_target) < 400`, non un
 * confronto con l'ultima direzione disegnata) — `aimTarget` da solo
 * potrebbe restare quello di un bersaglio ormai fuori portata: [C]
 * `rocket_launcher/Step.gml`, se nessun veicolo e' piu' entro 400px lo
 * sprite (e quindi `aimTarget`, calcolato dallo stesso identico
 * controllo) semplicemente non si aggiorna piu', restando agganciato
 * all'ultimo bersaglio anche quando e' ormai lontanissimo. Ritorna true se
 * e' partito un colpo (per il messaggio in main.js), false se il cannone
 * e' in ricarica o non ha nessun bersaglio in portata adesso.
 *
 * [I] L'originale sceglierebbe qui la punta del cannone da una tabella a
 * parte, piu' rozza (4 vie invece dei 16 archi di TURRET_DIRECTIONS/
 * MUZZLE_OFFSETS gia' usati per mira e fuoco automatico) — non replicata:
 * sparerebbe da un punto diverso da quello a cui il giocatore vede gia'
 * puntare il cannone, un disallineamento che sembrerebbe un difetto
 * piuttosto che fedelta' al decompilato. Lo sparo manuale riusa la stessa
 * punta fine e lo stesso bersaglio del fuoco automatico, e ne condivide
 * anche la ricarica (`b.fireT`/FIRE_COOLDOWN) — nell'originale i due
 * sparano dalla stessa unica variabile `launching`, quindi si contendono
 * gia' la stessa ricarica, non se ne sommano due indipendenti.
 */
export function fireTurretManual(b, projectiles, explosions) {
  if (b.aimAngle == null || !b.aimTarget) return false;
  const range = BUILDING_TYPES[b.type]?.aim?.range;
  if (range != null) {
    const dx = b.aimTarget.x - b.x, dy = b.aimTarget.y - b.y;
    if (dx * dx + dy * dy > range * range) return false;
  }
  if ((b.fireT ?? 0) < FIRE_COOLDOWN) return false;
  b.fireT = 0;
  fireFrom(b, projectiles, explosions);
  return true;
}

/**
 * Avanza i razzi in volo: linea retta (nessun inseguimento, l'originale
 * punta una volta sola al Create e basta), collisione contro mongolfiere
 * E minacce vere insieme (lo stesso oggetto `red_ball` ha un handler per
 * ciascuna — `veicoli_target` e `nemici_target`), un solo bersaglio per
 * razzo. [I] Un solo colpo distrugge sempre il bersaglio: nel decompilato
 * `monvo_giga`/`monviolo`/`air`/`bombar`/`dirig` hanno un contatore `life`
 * che sembrerebbe richiedere piu' colpi, ma il controllo che lo legge e'
 * `life != 0` (non `== 0`): dopo il primo colpo `life` e' quasi sempre
 * ancora diverso da zero, quindi muoiono comunque al primo colpo — la
 * "vita" e' di fatto un contatore morto nel gioco originale stesso, non
 * solo qui.
 *
 * Colpire una mongolfiera di risorse fa cadere comunque la sua cassa
 * ([C] monvo|monvo_giga|monbo|mongo|monviolo/Destroy.gml scatta a
 * prescindere da come muore, stessa logica gia' usata per il fulmine in
 * balloons.js/stepBalloons()); colpire una spia la fa sparire senza che
 * riferisca mai (nessun Destroy.gml su monspi) — il modo per fermarla
 * prima che "riesca", chiesto insieme alle minacce vere.
 */
export function stepProjectiles(projectiles, balloons, threats, loot, explosions, dt) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.t += dt;
    p.x += p.vx * 60 * dt;
    p.y += p.vy * 60 * dt;

    let hit = null, hitList = null, hitIdx = -1, hd2 = HIT_RADIUS * HIT_RADIUS;
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
      hitList.splice(hitIdx, 1);
      if (hitList === balloons) {
        explosions.push(spawnExplosion(hit.x, hit.y));
        const def = BALLOON_TYPES[hit.type];
        if (def.loot) loot.push(spawnLoot(def.loot, hit.x, hit.y));
      } else {
        explosions.push(...spawnDeathEffect(hit.type, hit.x, hit.y));
      }
      continue;
    }
    if (p.t >= PROJECTILE_LIFE) projectiles.splice(i, 1);
  }
}
