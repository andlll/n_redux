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
    crys: 0, storm: 0, stormeasy: 0, biotech: 0, autocore: 0,
    allerta: 0, selec: 0,
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
 * `growth`: casa, casa1/Alarm_2.gml). Escluderli evita di contare due volte
 * lo stesso olio/popolazione gia' simulati per davvero altrove.
 */
export function tickR12(r12, dt, buildings) {
  const guessed = buildings.filter((b) => {
    const def = BUILDING_TYPES[b.type];
    return !def.production && !def.growth;
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
