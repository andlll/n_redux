// I pulsanti blu delle monete — src/objects/sold1..18 (casa1|2|3/Alarm_4.gml,
// villa1/Alarm_4.gml — vedi la seconda meta' di stepCoinSpawner() sotto).
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
// [C] casa4s|d/Alarm_4.gml (palazzo, entrambi gli assi) + casa5ss|dd/
// Alarm_4.gml (il suo secondo livello): STESSA condizione/formula di casa,
// solo un periodo diverso (1600 tic, non 3000) e sprite "sold19..30" invece
// di "sold1..18" — mai letti finora (un gap non dichiarato: il palazzo
// finito non regalava mai monete). La formula sopra generalizza pulita
// anche qui, usando il "livello globale" del decompilato invece di
// `b.level` (che qui riparte da 1 per palazzo, non da 4): sold19 (`ava`0,
// livello reale 4) = 20*((4-1)*6+0+1) = 380, esattamente il valore letto —
// `b.level+3` sotto e' quella correzione, verificata su tutti e 12 gli
// sprite (sold19..30, 380..600 a passi di 20).
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
const PALAZZO_COIN_PERIOD = 1600 * TICK;   // [C] casa4s|d/casa5ss|dd/Alarm_4.gml: action_set_alarm(1600, 4)
const COIN_AUTO_LIFE = 20 * TICK;   // [C] sold1../Alarm_0.gml: action_set_alarm(20, 0)
export const COIN_DEPTH = -9000;    // [C] sold1../_object.json: depth = -9000, sempre in primo piano su tutto

function maxChiesLevel(buildings) {
  let lvl = 0;
  for (const b of buildings) if (b.type === "chies") lvl = Math.max(lvl, b.level);
  return lvl;
}

/**
 * Il "regista" delle monete — [C] casa1|2|3/Alarm_4.gml + villa1/Alarm_4.gml.
 * `b.coinT`/`b.coinNext` vivono sull'istanza (azzerati da
 * stepConstructions() in buildings.js a ogni salto di livello, come
 * `b.ava`/`b.makee`): qui si avanzano e, ogni volta che il timer scatta, si
 * valuta la condizione — il riarmo a `COIN_PERIOD` e' incondizionato,
 * esattamente come `action_set_alarm(3000, 4)` in cima a entrambi gli Alarm_4
 * originali, PRIMA dei controlli che decidono se generare la moneta.
 */
export function stepCoinSpawner(buildings, coins, dt, r12) {
  const chiesLv3 = maxChiesLevel(buildings) >= 3;
  for (const b of buildings) {
    const isPalazzo = b.type === "palazzo" || b.type === "palazzoRd";
    if (b.level < 1 || (b.type !== "casa" && b.type !== "villa" && !isPalazzo)) continue;
    const period = isPalazzo ? PALAZZO_COIN_PERIOD : COIN_PERIOD;
    b.coinT = (b.coinT ?? 0) + dt;
    while (b.coinT >= (b.coinNext ?? period)) {
      b.coinT -= b.coinNext ?? period;
      b.coinNext = period;
      if (b.type === "casa" || isPalazzo) {
        if (r12.hap < r12.pop) continue;    // [C] action_if_variable(hap, pop, 4): "hap >= pop"
        if (r12.ele <= 0) continue;         // [C] action_if_variable(ele, 0, 2): "ele > 0"
        // [C] palazzo e' "livello 4/5" nella numerazione globale del
        // decompilato (casa4s/casa5ss) anche se qui `b.level` riparte da 1
        // per il suo primo livello — vedi il commento sopra la funzione.
        const effLevel = isPalazzo ? b.level + 3 : b.level;
        const amount = 20 * ((effLevel - 1) * 6 + (b.ava ?? 0) + 1);
        coins.push({
          buildingId: b.id, x: b.x, y: b.y, depth: COIN_DEPTH, amount, kind: "mon", t: 0,
          spr: chiesLv3 ? "soldfade" : "soldico", auto: chiesLv3,
        });
        continue;
      }
      // villa: STESSA forma (hap/ele, poi un premio in base ad `ava`), ma
      // [C] villa1/Alarm_4.gml legge `action_if_variable(hap, pop + 100, 4)`
      // — una soglia PIU' ALTA di casa (hap >= pop, senza offset), non lo
      // stesso controllo riusato.
      if (r12.hap < r12.pop + 100) continue;
      if (r12.ele <= 0) continue;
      const ava = b.ava ?? 0;
      if (ava === 0) {
        // [C] villa1/Alarm_4.gml, ava==0: crea "soldbio" — stessa famiglia
        // "sold*" (depth/hitbox/raccolta) ma NON assegna mon: incrementa
        // r12.biotech (mai scritto altrove nel motore finora — [?] il suo
        // scopo reale resta ignoto, STUDIO.md). `soldbio` non ha ne'
        // Create.gml ne' Alarm_0.gml propri nel decompilato: a differenza
        // di sold1..5 non diventa mai "soldfade" e non si autoriscuote mai,
        // nemmeno con chies di livello 3 — resta "soldico" finche' non
        // viene toccata, sempre `auto: false`.
        coins.push({ buildingId: b.id, x: b.x, y: b.y, depth: COIN_DEPTH, amount: 1,
          kind: "biotech", t: 0, spr: "soldico", auto: false });
        continue;
      }
      // [C] villa1/Alarm_4.gml, ava 1..4 -> sold2..sold5 (40/60/80/100 mon,
      // le stesse istanze condivise con casa sopra, stesso valore fisso);
      // ava>=5 (crescita completa) -> sold1 (20 mon), la PIU' BASSA delle
      // sei — non la continuazione della progressione (sold6, 120 mon,
      // come farebbe la formula di casa): letto cosi' come sta nel
      // decompilato, non "raddrizzato".
      const amount = ava >= 5 ? 20 : [40, 60, 80, 100][ava - 1];
      coins.push({ buildingId: b.id, x: b.x, y: b.y, depth: COIN_DEPTH, amount, kind: "mon",
        t: 0, spr: chiesLv3 ? "soldfade" : "soldico", auto: chiesLv3 });
    }
  }
}

/** Solo le monete "auto" (chies a livello 3, mai per villa/ava==0 — vedi
 * sopra) si riscuotono da sole a fine dissolvenza — le altre restano finche'
 * non vengono toccate. */
export function stepCoins(coins, dt, r12) {
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i];
    if (!c.auto) continue;
    c.t += dt;
    if (c.t >= COIN_AUTO_LIFE) {
      r12[c.kind] += c.amount;   // [C] sold*/Alarm_0.gml (sempre "mon" qui: solo i casi "auto" arrivano)
      coins.splice(i, 1);
    }
  }
}

/** [C] sold1..18|soldbio/Mouse_MouseEnter.gml: assegna la risorsa giusta
 * (`kind`: "mon" per sold1..18, "biotech" per soldbio — vedi sopra) e
 * rimuove la moneta. A differenza di collectLoot() in balloons.js (sempre un
 * tap, mai un hover: STUDIO.md §7 "input touch-first"), qui il nome del
 * Create originale non mentiva: game/src/main.js raccoglie davvero al
 * passaggio del mouse (hover, niente click — restava tedioso doverci
 * cliccare sopra una per una), con il tap come unico gesto possibile su
 * touch (dove un vero hover non esiste). */
export function collectCoin(coins, item, r12) {
  r12[item.kind] += item.amount;
  const idx = coins.indexOf(item);
  if (idx >= 0) coins.splice(idx, 1);
}
