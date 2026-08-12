// I pulsanti blu delle monete — src/objects/sold1..18 (casa1|2|3/Alarm_4.gml).
//
// Una nota precedente in buildings.js liquidava questa regola come "una
// sommossa che non capiamo ancora bene": leggeva `action_if_variable(hap,
// pop, 4)` come "hap == pop" e la lasciava fuori. Sbagliata su due punti:
// l'operatore 4 e' ">=" (stessa lettura gia' usata per `chies/Step.gml:
// pop>=500`), e la condizione vera e' la CONGIUNZIONE di due controlli
// annidati — `r12.hap>=r12.pop` e poi, solo se vero, `r12.ele>0` (operatore
// 2 = ">", stessa forma di `industria3/Alarm_2.gml: oil>0`, gia' portata
// come `production` in buildings.js). Non e' una punizione, e' una
// RICOMPENSA: una casa felice (la felicita' ha raggiunto la popolazione) e
// con corrente fa comparire, ogni 3000 tick (il primo controllo a 600, gia'
// impostato da stepConstructions() in buildings.js a ogni salto di
// livello), una moneta cliccabile — sprite "soldico", un pin blu con due
// pile di monete (STUDIO.md).
//
// Il valore dipende da livello e stadio di crescita (`ava`, 0..5):
// 20*((livello-1)*6 + ava + 1) — 20/40/.../120 a livello 1 (sold1..6),
// 140..240 a livello 2 (sold7..12), 260..360 a livello 3 (sold13..18),
// letti direttamente da "mon = mon + N" di ciascun sold* nel decompilato
// (una progressione lineare pulita, non serve una tabella).
//
// [C] sold*/Create.gml: SOLO se esiste una `chies` di livello 3, la moneta
// diventa "soldfade" (stessa icona, ma con una dissolvenza vera a 20 frame,
// `image_speed` reale come le svolte delle auto — STUDIO.md) e si
// autoriscuote da sola dopo 20 tick. Senza una chies di livello 3 resta
// "soldico", ferma, finche' il giocatore non la tocca — puo' quindi
// accumularsi se ignorata a lungo, fedele al decompilato (nessun controllo
// "ce n'e' gia' una" prima di crearne un'altra).
//
// [I] non portato: `action_effect(1, 0, -50, 1, 16744448, 0)` (una scintilla
// arancione alla raccolta) — nessun sistema di particelle esiste ancora in
// questo motore, stesso gap gia' dichiarato per il fumo di industria.

const TICK = 1 / 60;
const COIN_PERIOD = 3000 * TICK;    // [C] casa1|2|3/Alarm_4.gml: action_set_alarm(3000, 4), riarmato ad ogni scatto
const COIN_AUTO_LIFE = 20 * TICK;   // [C] sold1../Alarm_0.gml: action_set_alarm(20, 0)
export const COIN_DEPTH = -9000;    // [C] sold1../_object.json: depth = -9000, sempre in primo piano su tutto

function maxChiesLevel(buildings) {
  let lvl = 0;
  for (const b of buildings) if (b.type === "chies") lvl = Math.max(lvl, b.level);
  return lvl;
}

/**
 * Il "regista" delle monete — [C] casa1|2|3/Alarm_4.gml. `b.coinT`/
 * `b.coinNext` vivono sull'istanza (azzerati da stepConstructions() in
 * buildings.js a ogni salto di livello, come `b.ava`/`b.makee`): qui si
 * avanzano e, ogni volta che il timer scatta, si valuta la condizione —
 * il riarmo a `COIN_PERIOD` e' incondizionato, esattamente come
 * `action_set_alarm(3000, 4)` in cima all'Alarm_4 originale, PRIMA dei
 * controlli che decidono se generare la moneta.
 */
export function stepCoinSpawner(buildings, coins, dt, r12) {
  const chiesLv3 = maxChiesLevel(buildings) >= 3;
  for (const b of buildings) {
    if (b.type !== "casa" || b.level < 1) continue;
    b.coinT = (b.coinT ?? 0) + dt;
    while (b.coinT >= (b.coinNext ?? COIN_PERIOD)) {
      b.coinT -= b.coinNext ?? COIN_PERIOD;
      b.coinNext = COIN_PERIOD;
      if (r12.hap < r12.pop) continue;    // [C] action_if_variable(hap, pop, 4): "hap >= pop"
      if (r12.ele <= 0) continue;         // [C] action_if_variable(ele, 0, 2): "ele > 0"
      const amount = 20 * ((b.level - 1) * 6 + (b.ava ?? 0) + 1);
      coins.push({
        buildingId: b.id, x: b.x, y: b.y, depth: COIN_DEPTH, amount, t: 0,
        spr: chiesLv3 ? "soldfade" : "soldico", auto: chiesLv3,
      });
    }
  }
}

/** Solo le monete "auto" (chies a livello 3) si riscuotono da sole a fine
 * dissolvenza — le altre restano finche' non vengono toccate (vedi sopra). */
export function stepCoins(coins, dt, r12) {
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i];
    if (!c.auto) continue;
    c.t += dt;
    if (c.t >= COIN_AUTO_LIFE) {
      r12.mon += c.amount;   // [C] sold*/Alarm_0.gml
      coins.splice(i, 1);
    }
  }
}

/** [C] sold1..18/Mouse_MouseEnter.gml: assegna i mon e rimuove la moneta —
 * stesso schema di collectLoot() in balloons.js (un tap la riscuote, non un
 * hover: STUDIO.md §7 "input touch-first"). */
export function collectCoin(coins, item, r12) {
  r12.mon += item.amount;
  const idx = coins.indexOf(item);
  if (idx >= 0) coins.splice(idx, 1);
}
