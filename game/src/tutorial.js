// Tutorial ("me3" in title screen, room "tutorial" — mai portato finora,
// STUDIO.md). [C] tutorial_square/DrawGUI.gml: 34 messaggi in inglese (mai
// tradotti nel decompilato stesso), un balloon di testo fisso in basso.
// L'avanzamento e' un misto di due meccanismi, entrambi letti dal
// decompilato: **[C]** 8 fasi hanno una condizione di gioco vera
// (tutorial_square/Step.gml, stepTutorialAuto() sotto); tutte le altre
// avanzano solo al tocco del bottone "avanti" (tutorial_thumb) — **[Bug
// corretto]** una prima lettura di `action_if_variable(phase, 33, 1)`
// (tutorial_thumb/Mouse_LeftPressed.gml) l'aveva letta come "phase==33"
// (operatore 0): l'operatore vero e' 1 = "!=" (STUDIO.md, la stessa
// famiglia di errore gia' presa e corretta due volte altrove in questo
// progetto per gli operatori 3/4) — quindi il ramo "vero" e' `phase!=33`
// (avanza), non `phase==33`. Il click avanza per davvero `phase+0.5` nel
// decompilato (un residuo che richiederebbe due tocchi per fase, dato che
// DrawGUI confronta `phase` per uguaglianza esatta con un intero — un frame
// "vuoto" ogni tocco su due): **[I]** qui avanza di 1 intero per tocco,
// niente fase vuota — un dettaglio cosmetico, non l'esito finale (comunque
// "il prossimo messaggio ad ogni tocco").
export const TUTORIAL_TEXTS = [
  "Damn! It looks like they destroyed half of the city! As new mayor you must rebuild it before they come back!",
  "First off, you should demolish those ruins, so that we can build new houses there.",
  "Select the scraper shaped button then click on the ruins to delete them!",
  "When you're about to delete a ruin the cost of the operation appears over it!",
  "Building and deleting cost money, of course. You also have to pay for the scaffoldings while the operation is going!",
  "We collect money by taxing the citizens. You can collect taxes by hoovering with the mouse over those blue icons!",
  "When you collect taxes you can see your money amount going up. The top bar gives you in general the amount of resources you own.",
  "The bottom bar instead is the Actions Bar. Use the hand button to select items",
  "The button next to it is the Build button. Now select it and then select the house button, the first one!",
  "Now build five houses in five empty spots! We need to boost the population in those times of war!",
  "When a house is completed immediately the population grows, but also the energy consumption! Houses' population keeps growing over time",
  "To provide energy to the city we use power plants. If the energy drops below zero, our citizens will stop paying taxes!",
  "Now build a power plant in an empty spot! Remember that energy consumption depends on population, so it will grow continuously",
  "We also need to provide some clean air and amusement to them, and to do so you can build parks",
  "Notice that the more the population and power plants grow the more they will need parks!",
  "Also notice that at night buildings consume much more energy!",
  "Now build a park in an empty spot. Remember that parks are cheap and fast to build but very expensive in manteinance!",
  "If you have enough parks you will see an happy face next to the resources count, otherwise yes, they will stop paying taxes!",
  "The defense of the city is another crucial point. As you can see we use massive artillery to keep the city safe!",
  "Build a rocket launcher in an empty spot. Remember that you can't build them too close at it would be too dangerous!",
  "We use weapons also to gather resources from our enemy, that carry them in those huge balloons you see flying above us!",
  "Yes, I know what you are thinking and yes, NIMBUS grew stealing oil to foreign nations, but what can you do?",
  "When a balloon is aproaching, click to the closest weapon to destroy it, then quickly collect the resource falling from the sky!",
  "Green balloons are the ones carrying oil. They are the most common ones!",
  "Power plants and the city's engines burn oil to run. The more the city weights the more consumes oil!",
  "So remember not to build unnecessary stuff or too many power plants or the city will fall to the ground!",
  "Yellow balloons carry batteries for energy and blue ones carry money deposits.",
  "Red balloons are sent by the enemy to spy on us, so you absolutely have to destroy them!",
  "If you don't do it they will call reinforcements and you will experience an attack like the one you saw before!",
  "I think they will not stop until we build something very big to demonstrate them we belong here!",
  "In some time your city will become bigger and it will be difficult to control it all in a glance!",
  "You can use the view buttons to quickly see the new zones you'll build and to zoom in and out!",
  "You can also use the right mouse button to move the view and the mouse wheel for the zoom controls! On mobile, swipe with your finger to move the view of the map.",
  "Well, it looks like you know how to know how to move around now! Good luck with your own NIMBUS platform!",
];

// [C] freccia_tutorial/EndStep.gml: la tabella fase -> bersaglio del
// decompilato punta a coordinate fisse del layout GameMaker originale, gia'
// diverso dal selettore ricostruito in main.js (STUDIO.md, "ricostruita
// come UI vera in spazio schermo") — il resolver vero (fase -> bottone
// VERO in `uiButtons`, per kind/type) vive li' invece che come dati qui,
// perche' ha bisogno di `uiButtons`/`menoo`/`cam` a runtime.

// [C] ruin1/ruin2 (istanze piazzate direttamente in tutorial.json, non
// create da destroyBuilding() — STUDIO.md, "un rudere non ha nessun ramo
// Mouse_LeftPressed": quel gap riguarda i ruderi da battaglia, un oggetto
// diverso. ruin1/ruin2 hanno invece un proprio Mouse_LeftPressed/MouseEnter
// dedicato: sotto ruspa (r12.selec===11) mostrano un cartellino costo
// all'hover e, al tocco con fondi sufficienti, avviano un cantiere vero
// (impacasa1r/impacasa2r nel decompilato — qui lo stesso
// BUILDING_TYPES.casa gia' esistente, con `construction.rebuilding=true`
// per il primo passo accorciato, STUDIO.md/buildings.js
// ruspaFirstStepDur). ruin1 -> casa livello 1 (500 mon), ruin2 -> casa
// livello 2 (2000 mon, salta dritto al livello 1->2).
const RUIN_POOL = {
  ruin1: { level: 1, cost: 500, sprites: ["ru11", "ru12", "ru13", "ru14"] },
  ruin2: { level: 2, cost: 2000, sprites: ["ru21", "ru22", "ru23", "ru24"] },
};

export function extractRuinLots(scene) {
  const lots = [];
  let nextId = 1;
  for (const it of scene.instances) {
    const pool = RUIN_POOL[it.obj];
    if (!pool) continue;
    const spr = pool.sprites[(Math.random() * pool.sprites.length) | 0];
    lots.push({ id: nextId++, x: it.x, y: it.y, depth: -it.y, level: pool.level, cost: pool.cost, spr, _f: null });
  }
  return lots;
}

/** Avvia il cantiere di ricostruzione su un lotto-rudere (main.js chiama
 * placeBuilding()/push su buildings, questa funzione decide solo con quale
 * `construction` iniziale — vedi il commento sopra). */
export function ruinRebuildConstruction(level) {
  return level === 1
    ? { upgradeIndex: -1, stepIndex: 0, t: 0, rebuilding: true }
    : { upgradeIndex: 0, stepIndex: 0, t: 0, rebuilding: true };
}

export function createTutorialState(scene) {
  const count = (name) => scene.instances.filter((it) => it.obj === name).length;
  const airTut2 = scene.instances.find((it) => it.obj === "air_tut2");
  const casa3 = scene.instances.find((it) => it.obj === "casa3");
  return {
    phase: 0,
    // [C] tutorial_square/Create.gml: tutpar/tutind/tutrl — la "soglia"
    // e' quanti esistono GIA' all'avvio, non un numero fisso: contati qui
    // dalla stessa room invece di scriverli a mano, stesso risultato
    // (4 parco, 2 industria1, 2 rocket_launcher in tutorial.json).
    tutpar: count("parco"),
    tutind: count("industria1"),
    tutrl: count("rocket_launcher"),
    // [C] tutorial_thumb/Mouse_LeftPressed.gml, fase 4: `instance_create
    // (casa3.x, casa3.y, sold13)` — la prima `casa3` della room, presa qui
    // una volta sola invece di ricercarla ad ogni tocco.
    practiceCoinPos: casa3 ? { x: casa3.x, y: casa3.y } : { x: 0, y: 0 },
    practiceCoinSpawned: false,
    coinCollected: false,
    // Cutscene iniziale di bombardamento (air_tut1/air_tut2 — vedi
    // createCutscene()/stepCutscene() sotto per la deviazione concordata
    // sull'esito): l'HUD del tutorial (freccia/balloon/bottone, uccisi
    // dalla cutscene nel decompilato) resta nascosto finche' `cutscene`
    // non e' null.
    cutscene: airTut2 ? createCutscene(airTut2.x, airTut2.y) : null,
    arrowFrame: 0,
  };
}

// [C] tutorial_square/Step.gml: le 8 condizioni di gioco vero. `ctx` = {
// r12, buildings }. Il conteggio per tipo/livello legge `buildings` (solo
// cio' che il giocatore ha costruito DURANTE il tutorial: nessuna `casa1`
// preesiste nella room — le case gia' in piedi sono tutte casa2/casa3,
// STUDIO.md — quindi non serve distinguere "storico" da "istantaneo" come
// invece servirebbe per un edificio che puo' retrocedere di livello).
export function stepTutorialAuto(state, ctx) {
  const { r12, buildings } = ctx;
  const builtAtLevel = (type, level) => buildings.filter((b) => b.type === type && b.level === level).length;
  if (state.phase === 2 && r12.selec === 11) state.phase = 3;
  else if (state.phase === 5 && state.coinCollected) state.phase = 6;
  else if (state.phase === 7 && r12.selec === 0) state.phase = 8;
  else if (state.phase === 8 && r12.selec === 1) state.phase = 9;
  else if (state.phase === 9 && builtAtLevel("casa", 1) >= 5) state.phase = 10;
  else if (state.phase === 12 && builtAtLevel("industria", 1) > state.tutind) state.phase = 13;
  else if (state.phase === 16 && builtAtLevel("parco", 1) > state.tutpar) state.phase = 17;
  else if (state.phase === 19 && builtAtLevel("missile", 1) > state.tutrl) state.phase = 20;
}

// Fasi in cui il balloon/freccia restano nascosti perche' l'avanzamento e'
// automatico (il giocatore deve AGIRE, non toccare "avanti" — [C]
// tutorial_thumb/Step.gml, le stesse 8 fasi elencate li' come "nascosto").
export const HIDE_ADVANCE_BUTTON = new Set([2, 5, 7, 8, 9, 12, 16, 19]);

export const LAST_PHASE = TUTORIAL_TEXTS.length - 1;   // 33

// ---------------------------------------------------------- intro cutscene
// [C] air_tut2 (istanza in tutorial.json, x=363,y=219) al Create: crea 2
// `air_tut1` (aerei, offset relativo +300,+200 / -300,+220 dalla propria
// posizione), 6 `tut_sf` (sfondo "macerie", tassello 1000x564, griglia
// 2x3 a coordinate ASSOLUTE — non relative ad air_tut2), e uccide subito
// tutorial_square/freccia_tutorial/tutorial_thumb (l'HUD del tutorial
// sparisce per la durata della cutscene). air_tut2 stesso e' un terzo
// "aereo" (sprite tuto_bomb) in moto. **[I]** Qui la cutscene dura 240 tick
// (4s, Alarm_1 del decompilato — il momento in cui l'originale uccide
// aerei/sfondo e fa comparire l'overlay nero `blacker1`): l'overlay
// (schermata di game over del gioco base, mai implementata altrove,
// STUDIO.md §6) e' SALTATO di proposito (deviazione concordata) — l'HUD
// del tutorial torna visibile subito dopo, invece di restare bloccati su
// quell'overlay per sempre come farebbe l'originale (nessun codice lo
// ricrea, STUDIO.md "intro tutorial").
const CUTSCENE_DURATION = 4;   // secondi — [C] air_tut2/Alarm_1: 240 tick
const TUT_SF_OFFSETS = [
  { dx: 0, dy: 0 }, { dx: 0, dy: -1128 }, { dx: 2000, dy: -1128 },
  { dx: 0, dy: 1128 }, { dx: 2000, dy: 1128 }, { dx: 2000, dy: 0 },
];

function moveDeg(dir, speed) {
  const rad = (dir * Math.PI) / 180;
  return { vx: Math.cos(rad) * speed * 60, vy: -Math.sin(rad) * speed * 60 };   // px/tick -> px/s (TICK=1/60)
}

export function createCutscene(airTut2X, airTut2Y) {
  const rnd = () => 1 + Math.random() * 2;   // [C] irandom_range(1,3)
  const planes = [
    { x: airTut2X + 300, y: airTut2Y + 200, spr: Math.random() < 0.5 ? "tuto_fig2" : "tuto_fig1", ...moveDeg(rnd(), 30) },
    { x: airTut2X - 300, y: airTut2Y + 220, spr: Math.random() < 0.5 ? "tuto_fig2" : "tuto_fig1", ...moveDeg(rnd(), 30) },
    { x: airTut2X, y: airTut2Y, spr: "tuto_bomb", ...moveDeg(1, 30) },
  ];
  const tiles = TUT_SF_OFFSETS.map((o) => ({ x: o.dx, y: o.dy, spr: "tuto_sfondo" }));
  return { t: 0, planes, tiles };
}

/** Ritorna `true` quando la cutscene e' finita (main.js smette di
 * disegnarla e riporta l'HUD del tutorial). */
export function stepCutscene(cutscene, dt) {
  cutscene.t += dt;
  for (const p of cutscene.planes) { p.x += p.vx * dt; p.y += p.vy * dt; }
  return cutscene.t >= CUTSCENE_DURATION;
}
