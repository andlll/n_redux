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

const FARO1 = { x: 616, y: 1100 };
const FARO2 = { x: 1655, y: 1111 };

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
// Catena fari -> seconda piattaforma — **[C]** ricostruita leggendo
// `faro1/Step.gml` -> `upfaro1/Mouse_LeftPressed.gml` -> `wavesig1/
// Mouse_LeftReleased.gml` -> `farolux/Create.gml` -> `dockersig1/
// Mouse_LeftPressed.gml` + `Alarm_4.gml`. Sequenza:
//
//  1. `chies.level>=2` -> compare il segnale verde `upfaro1` su `faro1`.
//  2. tap, -2000 mon -> `faro1` si accende (f1b -> f1) e compare il
//     segnale `wavesig1`.
//  3. tap su `wavesig1` **solo di notte**, -20 crys -> accende DAVVERO i
//     due fari (overlay "f1lux" su faro1 E faro2) e fa comparire il
//     segnale di attracco `dockersig1`.
//  4. tap su `dockersig1`, -5000 mon -9000 oil -> ~14s di attracco (840
//     tick, STUDIO.md sul room_speed — stesso passo deciso per il ciclo
//     giorno/notte), poi la piattaforma vera e propria: `faro1`/`faro2`/
//     i fasci spariscono, arriva `r32` (base "baa31") con `faro3` (mai
//     acceso in questo giro — sarebbe la catena livello 3, terza
//     piattaforma, fuori scopo qui) e la sua scenografia fissa.
//
// [I] Non portato (dichiarato, non un errore): la raccolta cristalli vera
// (`monviolo` che vola e poi lascia cadere `barviola`, STUDIO.md) — qui
// `barviola` compare direttamente a intervalli, stessa cadenza media
// (r12/Alarm_1: ogni 300 tick, 1/18) ma senza il volo. Il traffico
// periodico di `r32` (`maghene`, r22/Alarm_4: nuove auto honda3x ogni
// 8750 tick) e la terza piattaforma (`faro3`/`dockersig3` -> `r22`/`r220`)
// restano fuori da questo giro.
const SIGN_DEPTH = -9001;                 // [C] wavesig1|dockersig1/_object.json: depth = -9001, come upsign
const DOCKER_BUILD_SECONDS = 840 / 60;    // [C] dockersig1/Alarm_4: 840 tick dopo il tap (STUDIO.md, 60 tick/s)
const BARVIOLA_PERIOD = 300 / 60;         // [C] r12/Alarm_1: si ripete ogni 300 tick
const BARVIOLA_CHANCE = 1 / 18;           // [C] stesso Alarm_1: action_if_dice(18)

/** Stato della catena — persistito nel salvataggio (main.js/save.js) */
export function createFaroState() {
  return { stage: "locked", dockerT: 0, barviolaT: 0 };
}

/** Avanza timer e sblocchi — chiamata una volta per frame da main.js,
 * insieme al resto della simulazione (stepCoinSpawner() e affini). */
export function stepFaroChain(state, r12, coins, dt, chiesLevel) {
  if (state.stage === "locked" && chiesLevel >= 2) state.stage = "buttonShown";
  if (state.stage === "expanding") {
    state.dockerT += dt;
    if (state.dockerT >= DOCKER_BUILD_SECONDS) state.stage = "expanded";
  }
  state.barviolaT += dt;
  while (state.barviolaT >= BARVIOLA_PERIOD) {
    state.barviolaT -= BARVIOLA_PERIOD;
    if (Math.random() < BARVIOLA_CHANCE) {
      coins.push({
        buildingId: null, depth: COIN_DEPTH, t: 0, auto: false,
        kind: "crys", spr: "monviola_bar", amount: 1 + Math.floor(Math.random() * 3),
        x: FARO1.x + Math.random() * 1400 - 200, y: FARO1.y + Math.random() * 900 - 500,
      });
    }
  }
}

// `canAfford()`/DEBUG_INFINITE_RESOURCES (buildings.js): stesso interruttore
// di test gia' usato da ogni altro costo del motore — senza, questa catena
// sarebbe l'unica a restare bloccata dietro risorse vere durante un test.
export function clickFaroButton(state, r12) {
  if (state.stage !== "buttonShown") return null;
  if (!canAfford(r12, { mon: 2000 })) return `serve 2000 mon (hai ${r12.mon.toFixed(0)})`;
  r12.mon -= 2000;
  state.stage = "wavesigShown";
  return "faro potenziato — cerca il segnale di notte";
}

export function clickWaveSignal(state, r12, isNight) {
  if (state.stage !== "wavesigShown") return null;
  if (!isNight) return "il segnale si attiva solo di notte";
  if (!canAfford(r12, { crys: 20 })) return `servono 20 cristalli (hai ${r12.crys})`;
  r12.crys -= 20;
  state.stage = "lit";
  return "fari accesi";
}

export function clickDockerSignal(state, r12) {
  if (state.stage !== "lit") return null;
  if (!canAfford(r12, { mon: 5000, oil: 9000 })) {
    return r12.mon < 5000 ? `serve 5000 mon (hai ${r12.mon.toFixed(0)})` : `serve 9000 oil (hai ${r12.oil.toFixed(0)})`;
  }
  r12.mon -= 5000;
  r12.oil -= 9000;
  state.stage = "expanding";
  state.dockerT = 0;
  return "attracco in corso...";
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
 * attivo in quell'evento). Chiamata solo a piattaforma gia' espansa. */
export function r32Decor() {
  const out = [
    { obj: "decor", x: R32_X, y: R32_Y, depth: 1, spr: "baa31" },
    { obj: "decor", x: 2556, y: 1208, depth: 0, spr: "f3b" },
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

/** Le entry dinamiche (fari + segnali cliccabili) da aggiungere ogni
 * frame al layer `dynamic` di main.js, insieme al resto (monete/upsign). */
export function faroDecor(state) {
  if (state.stage === "expanded") return r32Decor();
  const out = [];
  const faro1Spr = state.stage === "locked" || state.stage === "buttonShown" ? "f1b" : "f1";
  out.push({ obj: "decor", x: FARO1.x, y: FARO1.y, depth: 0, spr: faro1Spr });
  out.push({ obj: "decor", x: FARO2.x, y: FARO2.y, depth: 0, spr: "f2b" });
  if (state.stage === "buttonShown") {
    out.push({ obj: "faroButton", x: FARO1.x, y: FARO1.y - 60, depth: SIGN_DEPTH, spr: "upico" });
  }
  if (state.stage === "wavesigShown") {
    out.push({ obj: "faroWaveSignal", x: FARO1.x, y: FARO1.y - 60, depth: SIGN_DEPTH, spr: "wavesin" });
  }
  if (state.stage === "lit" || state.stage === "expanding") {
    out.push({ obj: "decor", x: FARO1.x, y: FARO1.y, depth: -FARO1.y - 1, spr: "f1lux" });
    out.push({ obj: "decor", x: FARO2.x, y: FARO2.y, depth: -FARO2.y - 1, spr: "f1lux" });
  }
  if (state.stage === "lit") {
    out.push({ obj: "faroDockerSignal", x: FARO1.x, y: FARO1.y + 100, depth: SIGN_DEPTH, spr: "bridgesin" });
  }
  if (state.stage === "expanding") {
    // n_cluster1 — [C] dockersig1/Alarm_0..3|5: una nuvola di 5 ogni volta
    // che l'alarm scatta durante l'attracco. [I] qui una singola nuvola
    // decorativa che deriva per tutta la durata, non 25+ istanze vere.
    const k = Math.min(1, state.dockerT / DOCKER_BUILD_SECONDS);
    out.push({ obj: "decor", x: 5000 - k * 2600, y: 1000, depth: -7000, spr: "nimbuscluster1" });
  }
  return out;
}
