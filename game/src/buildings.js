// Edifici come dati, non come codice (STUDIO.md §7.3): la catena di
// cantiere di `chies` (upcrc12/upcrc23, decompilati da
// src/objects/upcrc12|upcrc23/Alarm_0.gml) e' una tabella di frame e
// durate, letta da un'unica macchina a stati in buildingSystem.js.
//
// [C] = valori letti nel codice decompilato (sprite, costi, soglie,
// durate in tick a 60fps convertite in secondi). Il costo di piazzamento
// e' l'unico numero inferito [I]: non esiste un `Create` che lo dichiari
// (lo sceglie il menu a ruota `cre1..cre4` che non abbiamo ancora
// ricostruito), quindi riuso la soglia di denaro che l'originale controlla
// per aprire quel menu (`placeholder/Mouse_LeftPressed.gml`, selec 6).

const TICK = 1 / 60; // le durate degli alarm nell'originale sono in tick a room_speed=60

export const BUILDING_TYPES = {
  chies: {
    label: "Chiesa",
    placeCost: { mon: 5000 },                    // [I] sotto la dote iniziale (5500): la ruota reale apriva a 6000
    baseSprite: "crc", baseLife: 1000,             // [C] chies/Create.gml
    upgrades: [
      {                                            // livello 1 -> 2, upcrc12
        atPop: 500,                                // [C] chies/Step.gml: r12.pop >= 500
        cost: { mon: 5000, oil: 3000 },            // [C] upcrc12/Mouse_LeftPressed.gml
        finalSprite: "crc4", lifeBonus: 500,        // [C] upcrc12/Alarm_0.gml, tic==12
        decor: ["crc2l"],                           // sprite del figlio "cddvd2" che sostituisce "cddvd"
        steps: [                                    // [C] upcrc12/Mouse_LeftPressed.gml + Alarm_0.gml
          { spr: "ce11", dur: 60 },                  // sprite messo subito all'avvio del cantiere
          { spr: "ce12", dur: 60 }, { spr: "ce13", dur: 60 }, { spr: "ce14", dur: 60 },
          { spr: "ce15", dur: 60 }, { spr: "ce16", dur: 60 }, { spr: "ce17", dur: 800 },
          { spr: "ce18", dur: 30 }, { spr: "ce19", dur: 30 }, { spr: "ce20", dur: 30 },
          { spr: "ce21", dur: 30 }, { spr: "ce22", dur: 30 }, { spr: "ce23", dur: 30 },
        ],
      },
      {                                            // livello 2 -> 3, upcrc23
        atPop: 1500,                                // [C] chies/Step.gml: r12.pop >= 1500
        cost: { mon: 15000, oil: 9000 },            // [C] upcrc23/Mouse_LeftPressed.gml
        finalSprite: "crc5", lifeBonus: 500,        // [C] upcrc23/Alarm_0.gml, tic==16
        decor: ["crc3l", "crc3l2", "crc3l3", "crc3l4", "crc3l5"],  // sostituiscono "cddvd2"
        steps: [                                    // [C] upcrc23/Mouse_LeftPressed.gml + Alarm_0.gml
          { spr: "ci21", dur: 60 },                  // sprite messo subito all'avvio del cantiere
          { spr: "ci22", dur: 60 }, { spr: "ci23", dur: 60 }, { spr: "ci24", dur: 60 },
          { spr: "ci25", dur: 60 }, { spr: "ci26", dur: 60 }, { spr: "ci27", dur: 60 },
          { spr: "ci28", dur: 60 }, { spr: "ci29", dur: 2000 }, { spr: "ci30", dur: 30 },
          { spr: "ci31", dur: 30 }, { spr: "ci32", dur: 30 }, { spr: "ci33", dur: 30 },
          { spr: "ci34", dur: 30 }, { spr: "ci35", dur: 30 }, { spr: "ci36", dur: 30 },
          { spr: "ci37", dur: 30 },
        ],
      },
    ],
  },
};

let nextId = 1;

/** Piazza un edificio nuovo, livello 1, sul posto di un placeholder. */
export function placeBuilding(type, x, y, depth) {
  const def = BUILDING_TYPES[type];
  return {
    id: nextId++, type, x, y, depth,
    level: 1, life: def.baseLife, spr: def.baseSprite,
    construction: null,        // { upgradeIndex, stepIndex, t }
  };
}

export function canAfford(r12, cost) {
  for (const k in cost) if ((r12[k] ?? 0) < cost[k]) return false;
  return true;
}

function pay(r12, cost) {
  for (const k in cost) r12[k] -= cost[k];
}

/** Il potenziamento che l'edificio potrebbe iniziare ora, se lo tocchi. */
export function nextUpgrade(b) {
  const def = BUILDING_TYPES[b.type];
  return def.upgrades[b.level - 1] ?? null;
}

export function upgradeUnlocked(b, r12) {
  const up = nextUpgrade(b);
  return up ? r12.pop >= up.atPop : false;
}

/**
 * Tocco su un edificio: se un potenziamento e' sbloccato (soglia pop) e i
 * costi sono coperti, avvia il cantiere. Restituisce un messaggio per la
 * HUD — null se ha avviato il cantiere, altrimenti il motivo per cui no.
 */
export function tryStartUpgrade(b, r12) {
  if (b.construction) return "cantiere gia' in corso";
  const up = nextUpgrade(b);
  if (!up) return "livello massimo";
  if (r12.pop < up.atPop) return `serve popolazione ${up.atPop} (ora ${r12.pop.toFixed(0)})`;
  if (!canAfford(r12, up.cost)) {
    const need = Object.entries(up.cost).map(([k, v]) => `${v} ${k}`).join(", ");
    return `serve ${need}`;
  }
  pay(r12, up.cost);
  b.construction = { upgradeIndex: b.level - 1, stepIndex: 0, t: 0 };
  b.spr = "empty";
  return null;
}

/** Avanza tutti i cantieri in corso di `dt` secondi. `onDecor` riceve i nomi sprite da spawnare. */
export function stepConstructions(buildings, dt, onDecor) {
  for (const b of buildings) {
    const c = b.construction;
    if (!c) continue;
    const up = BUILDING_TYPES[b.type].upgrades[c.upgradeIndex];
    c.t += dt;
    const cur = up.steps[c.stepIndex];
    if (c.t < cur.dur * TICK) { b.spr = cur.spr; continue; }
    c.t = 0;
    c.stepIndex++;
    if (c.stepIndex < up.steps.length) {
      b.spr = up.steps[c.stepIndex].spr;
    } else {
      b.level++;
      b.life += up.lifeBonus;
      b.spr = up.finalSprite;
      b.construction = null;
      onDecor?.(b, up.decor);
    }
  }
}
