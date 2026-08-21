// La base volante di `match` (`r120`, sprite "baa12") — [C] r12/Create.gml,
// ramo `match` (flag 736==0). Tutto decoro STATICO (nessuno step per
// frame: r120 non si muove mai nel decompilato, a differenza del nome
// "base volante" che suggerirebbe — resta ferma dove nasce), quindi entra
// in `staticWorld` com'e', stesso trattamento di ogni albero/auto gia' in
// scena. Estratto in un modulo a parte (invece di restare inline in
// main.js) perche' title.js (lo sfondo sfocato della title screen, STUDIO.md)
// ne ha bisogno anch'esso, sulla stessa `match.scene.json`.
import { COIN_DEPTH } from "./coins.js";
import { canAfford } from "./buildings.js";
import { spawnCar, R32_MAGHENE_SCHEDULE, R22_MAGHENE_SCHEDULE } from "./cars.js";

const FARO1 = { x: 616, y: 1100 };
const FARO2 = { x: 1655, y: 1111 };
const FARO3 = { x: 2556, y: 1208 };   // [C] dockersig1/Alarm_4.gml: action_create_object(faro3, 2556, 1208)

export function applyMatchPlatform(staticWorld, { interactive = false } = {}) {
  // Le 56 istanze statiche "albe" della room (quelle A TERRA) vengono
  // uccise incondizionatamente su questo ramo — sostituite dalle 14 sotto,
  // appese alla piattaforma invece che al terreno.
  for (let i = staticWorld.length - 1; i >= 0; i--) {
    if (staticWorld[i].obj === "albe") staticWorld.splice(i, 1);
  }
  const R120_X = 1170, R120_Y = 346;
  staticWorld.push({ obj: "r120", x: R120_X, y: R120_Y, depth: 1, spr: "baa12" });
  // [C] r12/Create.gml, `with (r120) { instance_create(x+dx, y+dy, albe) }`
  // — 14 offset letti uno per uno, nessun pattern regolare.
  const R120_TREES = [
    [282, 794], [439, 783], [379, 748], [518, 750], [565, 700], [463, 695],
    [538, 646], [637, 609], [699, 556], [758, 524], [816, 559], [724, 617],
    [672, 659], [739, 651],
  ];
  for (const [dx, dy] of R120_TREES) {
    staticWorld.push({ obj: "albe", x: R120_X + dx, y: R120_Y + dy, depth: 0, spr: "a1" });
  }
  // [C] stesso Create.gml, DOPO che `action_set_relative` torna a 0:
  // posizioni ASSOLUTE nella room, indipendenti da r120 (moto/fari/mudr2
  // sono scenografia fissa della mappa, non agganciata alla piattaforma).
  const R120_FIXED = [
    { obj: "moto11", x: 1951, y: 858, spr: "motor11", depth: 0 },
    { obj: "moto11", x: 1632, y: 1037, spr: "motor11", depth: 0 },
    { obj: "moto11", x: 656, y: 1231, spr: "motor11", depth: 0 },
    { obj: "moto12", x: 198, y: 217, spr: "motor12", depth: 0 },
    { obj: "moto12", x: 514, y: 34, spr: "motor12", depth: 0 },
    { obj: "moto13", x: 44, y: 876, spr: "motor13", depth: 0 },
    { obj: "moto13", x: 1015, y: 1142, spr: "motor13", depth: 0 },
    { obj: "mudr2", x: 769, y: 845, spr: "moor12", depth: -1055 },   // [C] mudr2/_object.json: depth fisso, non -y
  ];
  for (const it of R120_FIXED) staticWorld.push(it);
  // `faro1`/`faro2` restano fuori da qui SOLO quando `interactive` (main.js,
  // la partita vera su `match`): la catena di potenziamento sotto
  // (createFaroState()/faroDecor()) li ridisegna lei stessa ad ogni frame,
  // sprite compreso, perche' possono cambiare a runtime (f1b -> f1 -> tolti
  // del tutto a piattaforma espansa) — cosa che una entry statica pushata
  // una volta sola qui non potrebbe mai fare. Lo sfondo sfumato della title
  // screen (game/src/title.js, `interactive` di default false) non ha
  // bisogno di nessuna di queste due cose: i fari restano decorazione pura,
  // sempre spenti, esattamente come prima.
  if (!interactive) {
    staticWorld.push({ obj: "faro1", x: FARO1.x, y: FARO1.y, spr: "f1b", depth: 0 });
    staticWorld.push({ obj: "faro2", x: FARO2.x, y: FARO2.y, spr: "f2b", depth: 0 });
  }
}


// ------------------------------------------------------------------
// Catena fari -> seconda E terza piattaforma — **[C]** ricostruita
// leggendo `faro1/Step.gml` -> `upfaro1/Mouse_LeftPressed.gml` ->
// `wavesig1/Mouse_LeftReleased.gml` -> `farolux/Create.gml` -> `dockersig1/
// Mouse_LeftPressed.gml` + `Alarm_4.gml`, e la catena gemella di livello 3
// (`faro3` -> `upfaro3` -> `wavesig3` -> `farolux3` -> `dockersig3`).
// `state.tier1`/`state.tier2` sono le due catene, stessa forma:
//
//  1. `chies.level>=2` (tier1) / `>=3` E tier1 gia' espanso (tier2) ->
//     compare il segnale verde sul faro.
//  2. tap, -2000 mon (tier1) / -5000 mon (tier2) -> il faro si accende
//     (f1b->f1 / f3b->f3) e compare il segnale successivo.
//  3. tap sul segnale **solo di notte**, -20 crys (tier1) / -50 crys
//     (tier2) -> accende DAVVERO i fari (overlay "f1lux") e fa comparire
//     il segnale di attracco.
//  4. tap sul segnale di attracco, -5000 mon -9000 oil (tier1, ~14s/840
//     tick) o -15000 mon -27000 oil (tier2, ~10s/600 tick) -> arriva la
//     piattaforma vera: `r32` (tier1, con `faro3` gia' sopra) o `r22`/
//     `r220` (tier2), con la loro scenografia fissa e il traffico
//     periodico proprio ("maghene", sotto).
//
// [C] Anche il volo vero di `monviolo` (nasce fuori scena, vola a 30°,
// dopo 3600 tick o all'uscita dalla mappa lascia cadere `barviola`,
// STUDIO.md) e il traffico periodico di entrambe le piattaforme nuove
// (`maghene`: honda21..25(+a/b) su r32, honda31..34(+a/b) su r22, game/src/
// cars.js) — gap dichiarati nella prima versione di questo file, chiusi
// qui. [I] uscita anticipata dalla mappa per monviolo: il decompilato lo
// lascia volare oltre il bordo fino allo scadere naturale, lasciando
// spesso cadere `barviola` ben fuori dall'area giocabile — qui si ferma al
// bordo invece, cosi' il gettone resta sempre raggiungibile.
const SIGN_DEPTH = -9001;                 // [C] wavesig1|dockersig1|dockersig3/_object.json: depth = -9001, come upsign
const TIER1_BUILD_SECONDS = 840 / 60;     // [C] dockersig1/Alarm_4: 840 tick dopo il tap (60 tick/s, STUDIO.md)
const TIER2_BUILD_SECONDS = 600 / 60;     // [C] dockersig3/Alarm_4: 600 tick dopo il tap
const BARVIOLA_PERIOD = 300 / 60;         // [C] r12/Alarm_1: si ripete ogni 300 tick
const BARVIOLA_CHANCE = 1 / 18;           // [C] stesso Alarm_1: action_if_dice(18)
const MONVIOLO_LIFE_SECONDS = 3600 / 60;  // [C] monviolo/Alarm_6: scadenza naturale
const MONVIOLO_DIR = 30;                  // [C] monviolo/Create.gml: action_set_motion(30, ...)
const SCENE_WIDTH = 3900;                 // [C] match.json width — bordo destro della mappa

/** Stato della catena — persistito nel salvataggio (main.js/save.js). */
export function createFaroState() {
  return {
    tier1: { stage: "locked", dockerT: 0 },
    tier2: { stage: "locked", dockerT: 0 },
    barviolaT: 0,
    monviolos: [],
    r32TrafficT: 0, r32MagheneIdx: 0,
    r22TrafficT: 0, r22MagheneIdx: 0,
  };
}

// [C] monviolo/Create.gml: nasce fuori scena a sinistra (x=-170), y
// casuale nella fascia 380..3120 della room, velocita' 6..10 px/tick.
function spawnMonviolo() {
  return { x: -170, y: 380 + Math.random() * (3120 - 380), spd: 6 + Math.random() * 4, t: 0 };
}

/** Avanza timer, sblocchi, traffico e voli — chiamata una volta per frame
 * da main.js, insieme al resto della simulazione (stepCoinSpawner() e
 * affini). `cars` e' l'array condiviso di main.js (game/src/cars.js),
 * `night` la stessa `isNight(phaseT)` gia' usata per tingere le auto vere. */
export function stepFaroChain(state, r12, coins, cars, dt, chiesLevel, night) {
  // --- tier 1: chies.level>=2 -> ... -> r32 ---
  if (state.tier1.stage === "locked" && chiesLevel >= 2) state.tier1.stage = "buttonShown";
  if (state.tier1.stage === "expanding") {
    state.tier1.dockerT += dt;
    if (state.tier1.dockerT >= TIER1_BUILD_SECONDS) {
      state.tier1.stage = "expanded";
      cars.push(spawnCar("honda21", night));   // [C] r32/Create.gml
    }
  }
  if (state.tier1.stage === "expanded") {
    state.r32TrafficT += dt;
    while (state.r32MagheneIdx < R32_MAGHENE_SCHEDULE.length && state.r32TrafficT >= R32_MAGHENE_SCHEDULE[state.r32MagheneIdx].at) {
      cars.push(spawnCar(R32_MAGHENE_SCHEDULE[state.r32MagheneIdx].type, night));
      state.r32MagheneIdx++;
    }
  }

  // --- tier 2: chies.level>=3 E tier1 gia' espanso -> ... -> r22 ---
  if (state.tier2.stage === "locked" && state.tier1.stage === "expanded" && chiesLevel >= 3) state.tier2.stage = "buttonShown";
  if (state.tier2.stage === "expanding") {
    state.tier2.dockerT += dt;
    if (state.tier2.dockerT >= TIER2_BUILD_SECONDS) {
      state.tier2.stage = "expanded";
      cars.push(spawnCar("honda31", night));   // [C] r22/Create.gml
    }
  }
  if (state.tier2.stage === "expanded") {
    state.r22TrafficT += dt;
    while (state.r22MagheneIdx < R22_MAGHENE_SCHEDULE.length && state.r22TrafficT >= R22_MAGHENE_SCHEDULE[state.r22MagheneIdx].at) {
      cars.push(spawnCar(R22_MAGHENE_SCHEDULE[state.r22MagheneIdx].type, night));
      state.r22MagheneIdx++;
    }
  }

  // --- monviolo -> barviola (cristalli) ---
  state.barviolaT += dt;
  while (state.barviolaT >= BARVIOLA_PERIOD) {
    state.barviolaT -= BARVIOLA_PERIOD;
    if (Math.random() < BARVIOLA_CHANCE) state.monviolos.push(spawnMonviolo());
  }
  const rad = (MONVIOLO_DIR * Math.PI) / 180;
  for (let i = state.monviolos.length - 1; i >= 0; i--) {
    const m = state.monviolos[i];
    m.t += dt;
    const pxPerSec = m.spd * 60;   // "speed" e' px/tick a room_speed 60, STUDIO.md/cars.js
    m.x += Math.cos(rad) * pxPerSec * dt;
    m.y -= Math.sin(rad) * pxPerSec * dt;
    if (m.t >= MONVIOLO_LIFE_SECONDS || m.x > SCENE_WIDTH + 100) {
      state.monviolos.splice(i, 1);
      coins.push({
        buildingId: null, depth: COIN_DEPTH, t: 0, auto: false,
        kind: "crys", spr: "monviola_bar", amount: 1 + Math.floor(Math.random() * 3),
        x: m.x, y: m.y,
      });
    }
  }
}

// `canAfford()`/DEBUG_INFINITE_RESOURCES (buildings.js): stesso interruttore
// di test gia' usato da ogni altro costo del motore — senza, questa catena
// sarebbe l'unica a restare bloccata dietro risorse vere durante un test.
export function clickFaroButton(state, r12) {
  if (state.tier1.stage !== "buttonShown") return null;
  if (!canAfford(r12, { mon: 2000 })) return `serve 2000 mon (hai ${r12.mon.toFixed(0)})`;
  r12.mon -= 2000;
  state.tier1.stage = "wavesigShown";
  return "faro potenziato — cerca il segnale di notte";
}

export function clickWaveSignal(state, r12, isNight) {
  if (state.tier1.stage !== "wavesigShown") return null;
  if (!isNight) return "il segnale si attiva solo di notte";
  if (!canAfford(r12, { crys: 20 })) return `servono 20 cristalli (hai ${r12.crys})`;
  r12.crys -= 20;
  state.tier1.stage = "lit";
  return "fari accesi";
}

export function clickDockerSignal(state, r12) {
  if (state.tier1.stage !== "lit") return null;
  if (!canAfford(r12, { mon: 5000, oil: 9000 })) {
    return r12.mon < 5000 ? `serve 5000 mon (hai ${r12.mon.toFixed(0)})` : `serve 9000 oil (hai ${r12.oil.toFixed(0)})`;
  }
  r12.mon -= 5000;
  r12.oil -= 9000;
  state.tier1.stage = "expanding";
  state.tier1.dockerT = 0;
  return "attracco in corso...";
}

export function clickFaro3Button(state, r12) {
  if (state.tier2.stage !== "buttonShown") return null;
  if (!canAfford(r12, { mon: 5000 })) return `serve 5000 mon (hai ${r12.mon.toFixed(0)})`;
  r12.mon -= 5000;
  state.tier2.stage = "wavesigShown";
  return "terzo faro potenziato — cerca il segnale di notte";
}

export function clickWaveSignal3(state, r12, isNight) {
  if (state.tier2.stage !== "wavesigShown") return null;
  if (!isNight) return "il segnale si attiva solo di notte";
  if (!canAfford(r12, { crys: 50 })) return `servono 50 cristalli (hai ${r12.crys})`;
  r12.crys -= 50;
  state.tier2.stage = "lit";
  return "faro acceso";
}

export function clickDockerSignal3(state, r12) {
  if (state.tier2.stage !== "lit") return null;
  if (!canAfford(r12, { mon: 15000, oil: 27000 })) {
    return r12.mon < 15000 ? `serve 15000 mon (hai ${r12.mon.toFixed(0)})` : `serve 27000 oil (hai ${r12.oil.toFixed(0)})`;
  }
  r12.mon -= 15000;
  r12.oil -= 27000;
  state.tier2.stage = "expanding";
  state.tier2.dockerT = 0;
  return "attracco in corso... (terza piattaforma)";
}

// [C] r32/Create.gml + r320/Create.gml (relativo a r32, offset 1616,0):
// solo i pali dei semafori (`object8`) — nessuno sprite proprio, sono
// controller invisibili nel decompilato (STUDIO.md).
const R32_X = -16, R32_Y = 1141;
const R32_POLES = [
  [181, 416], [429, 559], [478, 531], [530, 559], [478, 596],
  [778, 414], [678, 703], [728, 673], [1223, 441], [1371, 415],
  // r320 (r32.x+1616, r32.y+0)
  [1616 + 453, 585], [1616 + 551, 585], [1616 + 802, 440], [1616 + 850, 413],
  [1616 + 1001, 556], [1616 + 1051, 528], [1616 + 1051, 583], [1616 + 1099, 556],
];

/** Tutte le entry di scenografia FISSA della seconda piattaforma — [C]
 * dockersig1/Alarm_4.gml, posizioni assolute (nessun `action_set_relative`
 * attivo in quell'evento). Chiamata solo a tier1 gia' espanso. */
function r32Decor() {
  const out = [
    { obj: "decor", x: R32_X, y: R32_Y, depth: 1, spr: "baa31" },
    { obj: "decor", x: 565, y: 1720, depth: 0, spr: "robbobase" },
    { obj: "decor", x: -16, y: 1153, depth: -1009, spr: "moor31" },
    { obj: "decor", x: 1302, y: 1150, depth: -1990, spr: "moor32" },
    { obj: "decor", x: 2513, y: 1268, depth: -1352, spr: "moor33" },
    { obj: "decor", x: 2027, y: 1105, depth: -1213, spr: "moor34" },
    { obj: "decor", x: 208, y: 807, depth: -990, spr: "bridr1" },
    { obj: "decor", x: 1375, y: 788, depth: -1010, spr: "bridl1" },
    { obj: "decor", x: -32, y: 1997, depth: 0, spr: "motor2" },
    { obj: "decor", x: 1659, y: 1996, depth: 0, spr: "motor2" },
    { obj: "decor", x: 607, y: 1839, spr: "motor12", depth: 0 },
  ];
  for (const [dx, dy] of R32_POLES) out.push({ obj: "decor", x: R32_X + dx, y: R32_Y + dy, depth: 0, spr: "se" });
  return out;
}

// [C] r22/Create.gml + r220/Create.gml (relativo a r22, offset 1236,225):
// stesso schema di r32/r320 sopra.
const R22_X = 1374, R22_Y = -64;
const R220_POLES = [[40, 463], [140, 405], [130, 750], [192, 779]].map(([dx, dy]) => [1236 + dx, 225 + dy]);

/** Scenografia fissa della terza piattaforma — [C] dockersig3/Alarm_4.gml,
 * posizioni assolute. Chiamata solo a tier2 gia' espanso. */
function r22Decor() {
  const out = [
    { obj: "decor", x: R22_X, y: R22_Y, depth: 1, spr: "baa21" },
    { obj: "decor", x: 1853, y: 263, depth: 2, spr: "moor21" },      // mudr21 — [C] _object.json: depth fisso
    { obj: "decor", x: 2363, y: 783, depth: -990, spr: "bridr1" },   // bridge_des2 — [C] _object.json: depth fisso
    { obj: "decor", x: 2183, y: 908, depth: 0, spr: "motor2" },
    { obj: "decor", x: 2729, y: 1223, depth: 0, spr: "motor2" },
  ];
  for (const [dx, dy] of R220_POLES) out.push({ obj: "decor", x: R22_X + dx, y: R22_Y + dy, depth: 0, spr: "se" });
  return out;
}

/** Fari/segnali della catena di tier1 (`faro1`/`faro2`), o la scenografia
 * di `r32` una volta espansa. */
function faro1Decor(state) {
  const out = [];
  const faro1Spr = state.tier1.stage === "locked" || state.tier1.stage === "buttonShown" ? "f1b" : "f1";
  out.push({ obj: "decor", x: FARO1.x, y: FARO1.y, depth: 0, spr: faro1Spr });
  out.push({ obj: "decor", x: FARO2.x, y: FARO2.y, depth: 0, spr: "f2b" });
  if (state.tier1.stage === "buttonShown") {
    out.push({ obj: "faroButton", x: FARO1.x, y: FARO1.y - 60, depth: SIGN_DEPTH, spr: "upico" });
  }
  if (state.tier1.stage === "wavesigShown") {
    out.push({ obj: "faroWaveSignal", x: FARO1.x, y: FARO1.y - 60, depth: SIGN_DEPTH, spr: "wavesin" });
  }
  if (state.tier1.stage === "lit" || state.tier1.stage === "expanding") {
    out.push({ obj: "decor", x: FARO1.x, y: FARO1.y, depth: -FARO1.y - 1, spr: "f1lux" });
    out.push({ obj: "decor", x: FARO2.x, y: FARO2.y, depth: -FARO2.y - 1, spr: "f1lux" });
  }
  if (state.tier1.stage === "lit") {
    out.push({ obj: "faroDockerSignal", x: FARO1.x, y: FARO1.y + 100, depth: SIGN_DEPTH, spr: "bridgesin" });
  }
  if (state.tier1.stage === "expanding") {
    const k = Math.min(1, state.tier1.dockerT / TIER1_BUILD_SECONDS);
    out.push({ obj: "decor", x: 5000 - k * 2600, y: 1000, depth: -7000, spr: "nimbuscluster1" });
  }
  return out;
}

/** Fari/segnali della catena di tier2 (`faro3`), o la scenografia di `r22`
 * una volta espansa — [C] `faro3` non esiste finche' `dockersig1` non lo
 * crea (Alarm_4.gml): chiamata solo quando tier1 e' gia' "expanded". */
function faro3Decor(state) {
  if (state.tier2.stage === "expanded") return r22Decor();
  const out = [];
  const faro3Spr = state.tier2.stage === "locked" || state.tier2.stage === "buttonShown" ? "f3b" : "f3";
  out.push({ obj: "decor", x: FARO3.x, y: FARO3.y, depth: 0, spr: faro3Spr });
  if (state.tier2.stage === "buttonShown") {
    out.push({ obj: "faro3Button", x: FARO3.x, y: FARO3.y - 60, depth: SIGN_DEPTH, spr: "upico" });
  }
  if (state.tier2.stage === "wavesigShown") {
    out.push({ obj: "faro3WaveSignal", x: FARO3.x, y: FARO3.y - 60, depth: SIGN_DEPTH, spr: "wavesin" });
  }
  if (state.tier2.stage === "lit" || state.tier2.stage === "expanding") {
    out.push({ obj: "decor", x: FARO3.x, y: FARO3.y, depth: -FARO3.y - 1, spr: "f1lux" });
  }
  if (state.tier2.stage === "lit") {
    out.push({ obj: "faro3DockerSignal", x: FARO3.x, y: FARO3.y + 100, depth: SIGN_DEPTH, spr: "bridgesin" });
  }
  if (state.tier2.stage === "expanding") {
    const k = Math.min(1, state.tier2.dockerT / TIER2_BUILD_SECONDS);
    out.push({ obj: "decor", x: 5000 - k * 2600, y: 1000, depth: -7000, spr: "nimbuscluster1" });
  }
  return out;
}

/** Le entry dinamiche (fari, segnali cliccabili, piattaforme espanse,
 * monviolo in volo) da aggiungere ogni frame al layer `dynamic` di
 * main.js, insieme al resto (monete/upsign). */
export function faroDecor(state) {
  const out = state.tier1.stage === "expanded" ? r32Decor() : faro1Decor(state);
  if (state.tier1.stage === "expanded") out.push(...faro3Decor(state));
  // monviolo — [C] nessun evento Mouse nel decompilato: solo decorazione,
  // stesso trattamento delle nuvole/uccelli in atmosphere.js.
  for (const m of state.monviolos) out.push({ obj: "decor", x: m.x, y: m.y, depth: -m.y, spr: "monviola" });
  return out;
}
