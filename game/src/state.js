// Lo stato di partita: l'equivalente del singleton `r12` dell'originale.
// Nell'originale viveva dentro un'istanza con `with (r12) { ... }` sparso
// ovunque; qui e' un oggetto semplice, letto e scritto direttamente, gia'
// pronto per essere serializzato (STUDIO.md §5.6 e §7.1: la serializzazione
// esplicita va decisa dal giorno uno, non aggiunta dopo).
//
// I valori iniziali sono presi da `r12/Create.gml` decompilato (ramo
// match_easy, cioe' quando l'originale valutava `action_if_number(736,1,0)`
// vero). [C] = letto nel codice. Tutto cio' che e' simulazione nel tempo
// (§6 "Cosa non so ancora": le regole vere dell'economia non sono note) e'
// marcato [I]: plausibile, da rivedere quando studieremo gli edifici reali.

import { BUILDING_TYPES, DEBUG_INFINITE_RESOURCES } from "./buildings.js";

export function createR12() {
  return {
    oil: 5000,        // [C] r12/Create.gml, ramo match_easy
    mon: 5500,         // [C]
    // [TEST] DEBUG_INFINITE_RESOURCES sopra: il valore genuino, tracciato a
    // parte da clampR12() — inutile finche' il flag e' spento (resta uguale
    // a oil/mon).
    oilReal: 5000, monReal: 5500,
    pop: 0,             // [C]
    ele: 200,           // [C]
    time: 2914,         // [C] orologio di gioco, non il ciclo giorno/notte visivo — l'ANNO (vedi stepCalendar sotto)
    // [C] repre/Create.gml: NON e' un campo di r12 nel decompilato — vive su
    // `repre` (l'oggetto che disegna la barra risorse), una variabile locale
    // chiamata anch'essa "mon" (STUDIO.md: "confusa col nome della variabile
    // denaro di r12 — stesso nome, oggetti diversi"). Qui vive comunque su
    // r12 (l'unico stato "orologio" del motore, come `time` sopra) ma con un
    // nome che non collide con `mon` (i soldi) — `month`, 1..12.
    month: 1,
    hap: 600,           // [C] 400 base + 200 del ramo match_easy
    crys: 0, storm: 0, stormT: 0, stormeasy: 0, biotech: 0, autocore: 0,
    allerta: 0, selec: 0,
    // [C] pu1/Create.gml: contatore caccia (`air`, non bombar/dirig)
    // abbattuti — incrementato da air/Destroy.gml, letto da pu1/Step.gml
    // per sbloccare `stella1`/il Monumento (BUILDING_TYPES.monum, > 49).
    // Vive qui invece che su `pu1` (che in questo motore non e' mai
    // un'istanza vera, STUDIO.md §5.4) per lo stesso motivo di onda/bombn/
    // diron sopra.
    distrutti: 0,
    // [C] r12/Create.gml: onda/ondan/arma partono a 0, spy a 0 (si sblocca
    // dopo 29000 tick, r12/Alarm_8.gml) — usati dalle mongolfiere di
    // risorse/spia, game/src/balloons.js. `arma` resta dichiarato per
    // fedelta' alla forma di r12 ma non e' piu' letto/scritto da niente:
    // nell'originale arma solo la PRIMA volta gli alarm 4/5/6 (le ondate di
    // minacce, game/src/threats.js), che qui girano fin dall'inizio senza
    // quella cerimonia (STUDIO.md "le minacce vere").
    onda: 0, ondan: 0, arma: 0, spy: 0,
    // [C] r12/Create.gml: bombolo/bombus/bombn (-> bombardiere ogni 4a
    // spia riuscita) e dirox/diro/diron (-> zeppelin ogni 10a) partono
    // tutti a 0 — game/src/threats.js "le minacce vere".
    bombolo: 0, bombus: 0, bombn: 0, dirox: 0, diro: 0, diron: 0,
    // [C] r12/Create.gml: `wewe` — non "inquinamento" come ipotizzato in un
    // primo momento (STUDIO.md), e' il PESO della piattaforma volante su
    // `match` (l'autore: "più la piattaforma pesa più consuma petrolio").
    // Parte gia' a 100 (il peso della piattaforma vuota), sale di un valore
    // fisso alla nascita di ogni edificio che lo scrive (BUILDING_TYPES,
    // campo `wewe` per livello — non tutti i tipi lo fanno: chies/parco/
    // monum/grattacielo non pesano nulla nel decompilato), non scende mai
    // (nessun Destroy.gml lo tocca). Letto da stepWeather() sotto, SOLO
    // quando si gioca su `match` (non `match_easy`, dove la base e' a terra
    // — vedi il commento su wewOilDrain()).
    wewe: 100,
    // [C] repre/Create.gml: quattro prestiti indipendenti, mesi di rata
    // residui (0 = nessun prestito attivo di quel taglio) — vedi LOANS/
    // stepCalendar()/loanActive() sotto.
    loanUno: 0, loanDue: 0, loanTre: 0, loanQuattro: 0,
  };
}

// [C] get_loan1..4/Mouse_LeftPressed.gml: quattro tagli fissi, tutti a 36
// rate mensili (repre/Alarm_0.gml, lo stesso alarm del calendario — vedi
// stepCalendar() sotto). `payment` e' letto diretto dal decompilato, non
// ricalcolato da `amount`: 36*840=30240 (25000), 36*1680=60480 (50000),
// 36*3333=119988 invece di 120000 esatto (100000 — l'originale stesso
// arrotonda per difetto), 36*8400=302400 (250000) — tutti la stessa
// proporzione (~1.21x, "20% interest rate" mostrato dal pannello
// `loanscr`), tranne il terzo che ci si avvicina per arrotondamento.
export const LOANS = [
  { key: "loanUno", amount: 25000, payment: 840 },
  { key: "loanDue", amount: 50000, payment: 1680 },
  { key: "loanTre", amount: 100000, payment: 3333 },
  { key: "loanQuattro", amount: 250000, payment: 8400 },
];
const LOAN_MONTHS = 36;

/** [C] bankbuttoner/Mouse_LeftPressed.gml: il pannello prestiti si apre
 * solo se NESSUN prestito e' gia' attivo — `bankbuttoner.loaned` nel
 * decompilato, qui derivato dai quattro contatori invece di uno stato a
 * parte che potrebbe disallinearsi. */
export function loanActive(r12) {
  return LOANS.some((l) => (r12[l.key] ?? 0) > 0);
}

/** [C] get_loanN/Mouse_LeftPressed.gml: accredita subito l'importo e arma
 * 36 mesi di rata. */
export function takeLoan(r12, index) {
  const l = LOANS[index];
  r12.mon += l.amount;
  r12[l.key] = LOAN_MONTHS;
}

/**
 * Tetto dell'olio: nell'originale sale quando la chiesa (`chies`) raggiunge
 * livello 2/3/4 — 20000/30000/50000 — letto identico da `r12/Step.gml`.
 * [C] Fedele: e' l'unica regola di cap che il codice dichiara esplicitamente.
 */
export function oilCap(buildings) {
  let maxLevel = 0;
  for (const b of buildings) if (b.type === "chies") maxLevel = Math.max(maxLevel, b.level);
  if (maxLevel >= 4) return 50000;
  if (maxLevel >= 3) return 30000;
  if (maxLevel >= 2) return 20000;
  return Infinity;
}

/**
 * [I] Simulazione economica placeholder per i tipi di cui NON conosciamo
 * ancora la regola vera (STUDIO.md §6): un ciclo plausibile e reversibile
 * solo per rendere il gioco giocabile mentre si studia il resto, applicato
 * solo agli edifici il cui tipo non dichiari una simulazione reale in
 * buildings.js (`production`: industria, industria1|2|3/Alarm_2.gml;
 * `growth`: casa, casa1/Alarm_2.gml; `solarProduction`: solare,
 * sooool/Alarm_4.gml). Escluderli evita di contare due volte lo stesso
 * olio/popolazione gia' simulati per davvero altrove.
 */
export function tickR12(r12, dt, buildings) {
  const guessed = buildings.filter((b) => {
    const def = BUILDING_TYPES[b.type];
    return !def.production && !def.growth && !def.solarProduction;
  });
  const n = guessed.length;
  if (n > 0) {
    r12.oil -= 0.3 * n * dt;                    // consumo: piu' edifici, piu' olio bruciato
    r12.pop += (1.5 + 0.4 * n) * dt;             // crescita: base + un contributo per edificio
  }
  r12.mon += (2 + 0.08 * r12.pop) * dt;          // entrate: base + tassazione sulla popolazione
  clampR12(r12, buildings);
}

// [TEST] DEBUG_INFINITE_RESOURCES: l'ultimo mon/oil "usabile" impostato da
// clampR12() alla chiamata precedente — serve solo a misurare quanto la
// simulazione VERA ha spostato mon/oil da allora (produzione/consumo/costi/
// wewe, tutti gia' calcolati PRIMA che clampR12() giri), cosi' quel delta
// genuino si accumula su r12.monReal/oilReal invece che sul valore gonfiato.
let _lastMon = null, _lastOil = null;

/** Clamp letti da `r12/Step.gml`: [C] tutti tranne il tetto dinamico dell'olio. */
export function clampR12(r12, buildings) {
  // [TEST] Va PRIMA dei clamp veri sotto: a questo punto r12.mon/r12.oil
  // portano gia' tutta l'attivita' economica del giro (chiamate da un tap
  // — placeAt/tryStartUpgrade/tryRuspaRebuild — o dal ciclo principale —
  // tickR12/stepConsumption/stepProduction/...), non ancora i clamp veri
  // qui sotto (ne' il rialzo del debug, che va dopo quelli — vedi sotto).
  r12.oil = Math.min(oilCap(buildings), Math.max(0, r12.oil));   // [C] oil>=0, [C] tetto per livello chies
  r12.crys = Math.min(99, r12.crys);                              // [C]
  r12.ele = Math.min(9999, Math.max(-100, r12.ele));              // [C]
  r12.mon = Math.min(999999, r12.mon);                            // [C]
  r12.pop = Math.max(0, r12.pop);                                 // [C]
  if (DEBUG_INFINITE_RESOURCES) {
    // A questo punto r12.mon/r12.oil sono i valori VERI di questo giro, gia'
    // passati dai clamp reali sopra (compreso il tetto per livello chies
    // dell'olio) — il delta da quanto valevano l'ultima volta che questa
    // funzione e' girata (`_lastMon`/`_lastOil`, sotto rialzati insieme al
    // rialzo del debug) si accumula su r12.monReal/oilReal invece che sul
    // valore che sta per essere gonfiato.
    if (_lastMon == null) { _lastMon = r12.mon; _lastOil = r12.oil; }
    r12.monReal += r12.mon - _lastMon;
    r12.oilReal += r12.oil - _lastOil;
    // Lo stesso tetto di mon appena applicato sopra e' gia' un "infinito"
    // pratico (nessun costo del motore si avvicina a 999999); l'olio non ha
    // un tetto fisso equivalente (`oilCap()` dipende dal livello di chies,
    // Infinity finche' resta sotto 2), quindi qui un pavimento dedicato.
    r12.mon = 999999;
    r12.oil = Math.max(r12.oil, 500000);
    _lastMon = r12.mon; _lastOil = r12.oil;
  }
}

// [C] repre/Alarm_0.gml: `action_set_alarm(300,0)`, riarmato ad ogni scatto
// — il mese avanza ogni 300 tick (5s), da 1 a 12 e poi torna a 1 (operatore
// 1 = "<": mese < 12 -> +1, altrimenti torna a 1). [C] r12/Alarm_3.gml:
// `action_set_alarm(3600,3)` — l'anno (`time`) avanza di 1 ogni 3600 tick
// (60s) — 12 mesi x 300 tick = 3600 tick: le due alarm dell'originale sono
// indipendenti (oggetti diversi) ma restano sincronizzate da sole finche'
// partono insieme, esattamente come qui.
const MONTH_PERIOD = 5;    // 300 tick / 60
const YEAR_PERIOD = 60;    // 3600 tick / 60

/** Avanza il calendario mostrato in barra risorse (main.js, accanto
 * all'orologio) e le rate dei prestiti (LOANS sopra) — [C] repre/
 * Alarm_0.gml le fa scattare insieme, stessa alarm: qui stesso timer. */
export function stepCalendar(r12, dt) {
  r12.monthT = (r12.monthT ?? 0) + dt;
  while (r12.monthT >= MONTH_PERIOD) {
    r12.monthT -= MONTH_PERIOD;
    r12.month = r12.month < 12 ? r12.month + 1 : 1;
    for (const l of LOANS) {
      if ((r12[l.key] ?? 0) !== 0) { r12[l.key] -= 1; r12.mon -= l.payment; }
    }
  }
  r12.yearT = (r12.yearT ?? 0) + dt;
  while (r12.yearT >= YEAR_PERIOD) {
    r12.yearT -= YEAR_PERIOD;
    r12.time += 1;
  }
}

// [C] r12/Alarm_2.gml, ramo `match` (non `match_easy`): ogni 60 tick, un
// dado 1 su 800 fa iniziare una tempesta; dura 1800 o 2100 tick (meta' e
// meta', r12/Alarm_7.gml la spegne). Su `match_easy` l'originale usa invece
// `stormeasy`, che non ha alcun effetto di gioco — solo nuvole/pioggia
// cosmetiche (STUDIO.md §9: "le tempeste sono cosmetiche in match_easy").
// Simuliamo comunque la regola vera di `storm` perche' e' quella che il
// danno da fulmine di industria/casa legge davvero, ed e' quella che conta
// su `match`, la mappa difficile — non ha senso lasciarla ferma in attesa
// di quella room quando costa cosi' poco tenerla viva fin da ora.
const STORM_CHECK = 1;                  // [C] 60 tick
const STORM_DICE = 800;                  // [C]
const STORM_DURATIONS = [30, 35];        // [C] 1800/2100 tick, dado 50/50

/**
 * [C] r12/Alarm_2.gml: il drenaggio di `oil` dovuto al peso (`wewe`) della
 * piattaforma — letto cosi' com'e', comprese due soglie che si SOVRAPPONGONO
 * invece di essere fasce pulite: `wewe<=100` (-2) e `wewe<=200` (-3) sono
 * due controlli INDIPENDENTI, non un else-if — a `wewe===100` (il valore di
 * partenza, prima che qualunque edificio sia mai stato costruito) scattano
 * ENTRAMBI, per un totale di -5, uguale al totale della fascia 201-300. Da
 * 101 a 200 invece scatta solo il secondo (-3): il peso "vuoto" della sola
 * piattaforma drena piu' del peso subito dopo. Non e' un refuso di questa
 * porting: e' quello che il decompilato dice, verificato riga per riga con
 * gli operatori (3="<=", 2=">") gia' confermati altrove in questo progetto.
 */
function wewOilDrain(wewe) {
  let loss = 0;
  if (wewe <= 100) loss += 2;
  if (wewe <= 200) loss += 3;
  if (wewe > 200 && wewe <= 300) loss += 5;
  if (wewe > 300 && wewe <= 400) loss += 7;
  if (wewe > 400 && wewe <= 500) loss += 9;
  if (wewe > 500 && wewe <= 700) loss += 12;
  if (wewe > 700 && wewe <= 1000) loss += 15;
  if (wewe > 1000 && wewe <= 1500) loss += 23;
  if (wewe > 1500 && wewe <= 2000) loss += 30;
  if (wewe > 2000 && wewe <= 3000) loss += 50;
  if (wewe > 3000) loss += 80;
  return loss;
}

/**
 * `isMatch`: **[C]** `r12/Alarm_2.gml` legge sia il drenaggio da `wewe` sia
 * l'innesco della tempesta VERA dietro lo stesso flag (`action_if_number(
 * 736,0,0)` — 0 su `match`, diverso da 0 su `match_easy`, dove scatta invece
 * il ramo cosmetico `stormeasy`, mai letto qui). L'autore: il peso vale solo
 * per la piattaforma volante di `match` — su `match_easy` la base e' a
 * terra, una citta' "normale" che non deve reggersi in volo. A differenza
 * della tempesta (gia' simulata "vera" anche su `match_easy` per una scelta
 * dichiarata altrove, STUDIO.md: costava poco tenerla pronta per `match`),
 * qui la distinzione per room e' voluta: `main.js` passa `scene.name ===
 * "match"`, oggi sempre `false` (il motore carica solo `match_easy`) — il
 * codice resta comunque corretto e pronto per quando quella room esistera'.
 */
export function stepWeather(r12, dt, isMatch) {
  if (r12.storm) {
    r12.stormT -= dt;
    if (r12.stormT <= 0) { r12.storm = 0; r12.stormT = 0; }
  }
  r12.stormCheckT = (r12.stormCheckT ?? 0) + dt;
  while (r12.stormCheckT >= STORM_CHECK) {
    r12.stormCheckT -= STORM_CHECK;
    // [C] nel decompilato il drenaggio da `wewe` e' incondizionato ad ogni
    // scatto dell'alarm, tempesta attiva o no (non e' innestato dentro il
    // ramo `storm==0` che segue) — applicato qui fuori dal ramo storm,
    // niente `return` anticipato come prima (quello fermava anche questo
    // conteggio mentre una tempesta era attiva, un bug di questa porting).
    if (isMatch) r12.oil -= wewOilDrain(r12.wewe ?? 0);
    if (!r12.storm && Math.random() < 1 / STORM_DICE) {
      r12.storm = 1;
      r12.stormT = STORM_DURATIONS[(Math.random() * STORM_DURATIONS.length) | 0];
    }
  }
}
