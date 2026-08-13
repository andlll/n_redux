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

import { BUILDING_TYPES } from "./buildings.js";

export function createR12() {
  return {
    oil: 5000,        // [C] r12/Create.gml, ramo match_easy
    mon: 5500,         // [C]
    pop: 0,             // [C]
    ele: 200,           // [C]
    time: 2914,         // [C] orologio di gioco, non il ciclo giorno/notte visivo
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
  };
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

/** Clamp letti da `r12/Step.gml`: [C] tutti tranne il tetto dinamico dell'olio. */
export function clampR12(r12, buildings) {
  r12.oil = Math.min(oilCap(buildings), Math.max(0, r12.oil));   // [C] oil>=0, [C] tetto per livello chies
  r12.crys = Math.min(99, r12.crys);                              // [C]
  r12.ele = Math.min(9999, Math.max(-100, r12.ele));              // [C]
  r12.mon = Math.min(999999, r12.mon);                            // [C]
  r12.pop = Math.max(0, r12.pop);                                 // [C]
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
