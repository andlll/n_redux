// La title screen — [C] src/rooms/title.json: tre bottoni (`standma`/
// "Match", `easma`/"Match Facile", `me3`/"Tutorial") + un banner laterale
// (`gogirrra`). Lo sfondo NON e' piu' `eddaie` (il logo animato del
// decompilato, 193 sottoimmagini — pesante da impacchettare e, detto
// dall'autore, "fa un po' cagare"): al suo posto un vero ritaglio di
// `match` (la mappa difficile, non `match_easy`) che gira per davvero
// dietro il menu — auto, aerei/dirigibili, semafori, ciclo giorno/notte —
// sfumato con lo stesso `PauseBlur` (game/src/gl.js) gia' usato per il
// menu di pausa in game/src/main.js. Nessuna combattimento: nessuna
// torretta esiste qui, quindi aerei/dirigibili volano/sganciano bombe
// (che detonano a vuoto, `buildings: []`) senza che nulla li abbatta —
// esattamente "vivi ma non in guerra", come richiesto.
//
// Schermata montata da game/src/app.js (SPA, un solo index.html/link):
// export mountTitle(ctx) invece di uno script a livello di modulo — canvas,
// Renderer, Input, PauseBlur e la texture bianca condivisa arrivano gia'
// pronti in `ctx` (creati una sola volta per l'intera sessione, non ad ogni
// visita del menu). navigate()/dispose() sostituiscono `location.href` e lo
// scaricamento naturale della pagina: dispose() ferma il loop e stacca tutto
// cio' che questo modulo ha registrato da solo (listener di resize, timer,
// nodo DOM del messaggio), cosi' rientrare nel menu piu' volte nella stessa
// sessione non accumula loop/listener fantasma.
import { solidFrame } from "./gl.js";
import { loadFromFile } from "./save.js";
import { Camera, screenProjection } from "./camera.js";
import { loadRoomAtlas } from "./assets.js";
import { applyMatchPlatform, r120MotorDecor } from "./platform.js";
import { spawnCar, stepCars } from "./cars.js";
import { createAtmosphere, stepAtmosphere } from "./atmosphere.js";
import { createSemaphore, stepSemaphores } from "./semaphores.js";
import {
  stepThreatSpawner, stepThreats, stepBombs, stepExplosions, EXPLOSION_FRAME_COUNT,
  stepAerSmoke, AER_SMOKE_FRAME_COUNT, stepDebris,
} from "./threats.js";

const TICK = 1 / 60;

export async function mountTitle(ctx) {
  const { gl, r, canvas, input, pauseBlur, white, navigate, hideLoading } = ctx;
  let stopped = false;
  const SOLID = solidFrame(white, 1, 1);

  // ---------------------------------------------------------------- title UI
  const scene = await fetch("./data/title.scene.json").then((x) => x.json());
  const { atlas, pageTex } = await loadRoomAtlas(gl, "title");
  function frameFor(sprName, frameIdx = 0) {
    const frames = atlas.sprites[sprName];
    if (!frames || !frames.length) return null;
    const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
    if (!pageTex[f.p]) return null;
    return { tex: pageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1, w: f.w, h: f.h, ox: f.ox, oy: f.oy };
  }

  const BUTTONS = scene.instances.filter((it) => ["standma", "easma", "me3"].includes(it.obj));
  for (const b of BUTTONS) b._f = frameFor(b.spr);
  // [FIX] `gogirrra` (logo NIMBUS, spr `logigogi`) veniva disegnato alla
  // posizione della scena originale (x=1235, y=543) — lo stesso punto su cui
  // e' centrata camUI: finiva quindi sovrapposto al bottone centrale
  // ("Match Facile"/`easma`, anch'esso a y=543). Segnalato dall'autore: il
  // logo deve stare in basso a destra della schermata, senza toccare i
  // bottoni. BANNER.x/y vengono ricalcolati in positionBanner() (sotto),
  // ancorati all'angolo in basso a destra della viewport reale di camUI
  // invece che a un punto fisso della scena — l'unico modo che regge anche
  // quando resize() cambia camUI.worldW/worldH col variare dell'aspect ratio.
  const BANNER = scene.instances.find((it) => it.obj === "gogirrra");
  BANNER._f = frameFor(BANNER.spr);
  const BANNER_MARGIN = 24;
  function positionBanner() {
    const f = BANNER._f;
    if (!f) return;
    const rightEdge = camUI.x + camUI.worldW / 2 - BANNER_MARGIN;
    const bottomEdge = camUI.y + camUI.worldH / 2 - BANNER_MARGIN;
    BANNER.x = rightEdge - f.w + f.ox;
    BANNER.y = bottomEdge - f.h + f.oy;
  }

  const camUI = new Camera();
  camUI.bounds = { left: 0, top: 0, right: scene.width, bottom: scene.height };
  camUI.x = 1235; camUI.y = 543;

  // ------------------------------------------------------------- sfondo: match
  const mScene = await fetch("./data/match.scene.json").then((x) => x.json());
  const { atlas: mAtlas, pageTex: mPageTex } = await loadRoomAtlas(gl, "match");
  // [Bug corretto, segnalato dall'autore: "appena avvio match il sito si
  // refresha tornando alla schermata logo e poi al menu", su mobile] Qui
  // c'era un `prefetchRoomAtlas(gl, "match_easy")` — [I] richiesto
  // dall'autore ("caricare gli asset in modo furbo"): mentre il giocatore
  // guarda ancora il menu, scaricare gia' in background l'atlas di
  // `match_easy` (il bottone in evidenza), cosi' fosse gia' calda la cache
  // se lo sceglieva davvero. Il problema: la riga SOPRA ha gia' caricato
  // l'intero atlas di `match` (~50 pagine da 2048x2048, ~800 MB non
  // compressi in GPU, STUDIO.md/assets.js) solo per lo sfondo sfumato dietro
  // il menu — prefetchare ANCHE `match_easy` (un secondo atlas quasi
  // altrettanto grande) voleva dire tenere in memoria GPU, gia' stando fermi
  // sul menu, la somma di entrambi: su mobile (budget per-tab molto piu'
  // stretto che su desktop) questo da solo poteva bastare a far terminare la
  // pagina, con l'effetto — riavvio silenzioso del sistema operativo,
  // ripartenza da index.html — di un "refresh" del sito proprio nel momento
  // in cui si tocca "Match" (assets.js ha il fix parallelo sul PICCO di
  // memoria durante il caricamento di un singolo atlas; qui il problema era
  // lo STATO STAZIONARIO: due atlas interi tenuti insieme senza motivo).
  // Tolto: `match_easy` si carica ora solo quando il giocatore lo sceglie
  // davvero (mountMatch(), main.js) — un filo di attesa in piu' alla
  // scelta, invece di un rischio di crash mentre si e' ancora nel menu.
  function mFrameFor(sprName, frameIdx = 0) {
    const frames = mAtlas.sprites[sprName];
    if (!frames || !frames.length) return null;
    const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
    if (!mPageTex[f.p]) return null;
    return { tex: mPageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1, w: f.w, h: f.h, ox: f.ox, oy: f.oy };
  }

  // [C] stessa variante a dado di main.js (albe/albe2/albe3/Create.gml): un
  // solo giro, una volta al caricamento della scena — vedi il commento li'.
  function dice(n) { return Math.random() < 1 / n; }
  function treeVariant(obj) {
    if (obj === "albe") { if (dice(5)) return dice(2) ? "a2" : "a5"; if (dice(2)) return dice(2) ? "a3" : "a4"; return null; }
    return null;
  }
  // [I] `placeholder` (il rombo viola "phold", STUDIO.md main.js) resta
  // nascosto finche' non e' sotto hover nel gioco vero: qui non c'e' nessun
  // input di piazzamento, quindi va tolto invece di restare sempre acceso a
  // coprire mezza mappa (172 istanze su `match`).
  // [Bug corretto] Le nuvole ("ni"/"nifast") piazzate nella room — stesso
  // motivo del filtro in main.js: nel decompilato nessuna delle due resta
  // mai ferma (si mettono in moto da sole al proprio Create, la stessa
  // diagonale gia' simulata qui sotto da atmo/stepAtmosphere), quindi non
  // vanno disegnate come decoro fisso — il cielo sfumato dietro il menu ha
  // gia' il proprio generatore dinamico (atmo.clouds, sotto).
  const worldStatic = mScene.instances.filter((it) => it.obj !== "placeholder" && it.obj !== "ni" && it.obj !== "nifast");
  applyMatchPlatform(worldStatic);   // la base volante — STUDIO.md, game/src/platform.js
  // honda1/honda2 (le due auto "gia' in marcia" di `match`, game/src/cars.js)
  // sostituite dalle istanze simulate sotto — stesso motivo della rimozione
  // in main.js.
  for (let i = worldStatic.length - 1; i >= 0; i--) {
    if (worldStatic[i].obj === "honda1" || worldStatic[i].obj === "honda2") worldStatic.splice(i, 1);
  }
  for (const it of worldStatic) {
    const v = treeVariant(it.obj);
    if (v) it.spr = v;
    it._f = mFrameFor(it.spr);
  }
  const semaphorePoles = worldStatic.filter((it) => it.obj === "object8");
  const semaphores = semaphorePoles.map((it) => createSemaphore(it.x, it.y));

  // ------------------------------------------------------- edifici illuminati
  // `worldStatic` non contiene NESSUN edificio giocatore (`casa`/`villa`/...):
  // in `match` quei lotti nascono come semplici `placeholder` (tolti sopra) e
  // vengono costruiti solo a runtime da chi gioca — qui non c'e' nessuna
  // partita simulata che li piazzi, quindi lo sfondo sfumato restava una
  // citta' di sole strade/alberi, gia' vuota prima ancora del blur (segnalato
  // dall'autore). Occupiamo un sottoinsieme dei lotti liberi con qualche
  // `villa`/`casa` gia' finita, ognuna con la propria coppia sprite+finestre
  // (`vilNl`/`cNNNl`, le stesse che il gioco vero disegna a fine cantiere —
  // STUDIO.md, buildings.js "Finestre notturne") cosi' la citta' sfumata ha
  // davvero delle luci accese di notte invece di restare buia e vuota.
  const LIT_LOTS = [
    { x: 1375, y: 451, spr: "vil6" }, { x: 2253, y: 452, spr: "c211" },
    { x: 2053, y: 453, spr: "vil7" }, { x: 1275, y: 508, spr: "c111" },
    { x: 1475, y: 509, spr: "vil8" }, { x: 2154, y: 509, spr: "c112" },
    { x: 1175, y: 565, spr: "vil1" }, { x: 1375, y: 566, spr: "c121" },
    { x: 2253, y: 568, spr: "vil9" }, { x: 1624, y: 595, spr: "c131" },
    { x: 1075, y: 623, spr: "vil4" }, { x: 1274, y: 624, spr: "c141" },
    { x: 1524, y: 652, spr: "vil10" }, { x: 1722, y: 653, spr: "c151" },
    { x: 976, y: 681, spr: "vil5" }, { x: 1175, y: 682, spr: "c122" },
  ];
  // [I] Stesso fade in/out di stepLights() (main.js), ma senza la soglia
  // `r12.ele > 3`: qui non c'e' nessuna economia simulata da cui leggerla, e
  // una citta' decorativa ha sempre corrente a sufficienza.
  const LIGHT_FADE_SEC = 3;
  const buildingLights = [];
  for (const lot of LIT_LOTS) {
    worldStatic.push({ obj: "decor", x: lot.x, y: lot.y, depth: -lot.y, _f: mFrameFor(lot.spr) });
    const light = {
      obj: "decor", x: lot.x, y: lot.y, depth: -lot.y - 1, _f: mFrameFor(lot.spr + "l"),
      _selfLit: true, _lightT: 0, _alpha: 0,
    };
    worldStatic.push(light);
    buildingLights.push(light);
  }
  function stepBuildingLights(dt, night) {
    for (const light of buildingLights) {
      light._lightT = Math.max(0, Math.min(LIGHT_FADE_SEC, light._lightT + (night ? dt : -dt)));
      light._alpha = light._lightT / LIGHT_FADE_SEC;
    }
  }

  function effDepth(it) { return it.depth === 0 ? -it.y : it.depth; }
  const sortWorld = (a, b) => effDepth(b) - effDepth(a);

  const camWorld = new Camera();
  camWorld.bounds = { left: 0, top: 0, right: mScene.width, bottom: mScene.height };
  camWorld.minZoom = camWorld.maxZoom = 1.6;
  camWorld.setZoomImmediate(1.6);
  // Un ritaglio intorno a r120 (la base volante, STUDIO.md): si vede sia la
  // citta' sopra sia la turbina/i piloni sotto — la stessa inquadratura del
  // primo screenshot di verifica di r120. Deriva leggermente nel tempo (vedi
  // updateCamera() sotto), non fermo ne' agganciato all'input.
  const CAM_CENTER = { x: 1450, y: 750 };
  const CAM_DRIFT = { x: 420, y: 90 };
  const CAM_PERIOD = 42;   // secondi per un giro completo della deriva

  // ------------------------------------------------------------- simulazione
  let cars = [spawnCar("honda1", false), spawnCar("honda2", false)];
  let atmo = createAtmosphere();
  let threats = [], bombs = [], explosions = [], aerSmoke = [], debris = [];
  // Stub minimo di r12: solo i campi che stepThreatSpawner/stepThreats
  // leggono davvero. `ondan`/`bombn`/`diron` vengono rialimentati piu' sotto
  // (updateThreats()) invece di lasciarli decadere a zero come farebbe la
  // vera partita — qui non c'e' nessuna spia che li fa salire, quindi la
  // "rifornitura" e' la stessa scelta [I] gia' presa altrove in questo
  // motore quando manca il sistema a monte (STUDIO.md).
  const fakeR12 = { ondan: 0, bombn: 0, diron: 0, storm: 0, distrutti: 0 };

  // [C] PHASES/ambientAt() di main.js, stesso schema — [I] accelerato: un
  // giro giorno/notte completo ogni 36 minuti veri sarebbe invisibile su una
  // title screen, qui dura CYCLE_SECONDS.
  const PHASES = [
    { name: "giorno", rgb: [1.00, 1.00, 1.00], dur: 14 }, { name: "alba", rgb: [1.00, 0.82, 0.62], dur: 5 },
    { name: "notte", rgb: [0.45, 0.52, 0.82], dur: 12 }, { name: "alba", rgb: [0.92, 0.80, 0.78], dur: 5 },
  ];
  const CYCLE_SECONDS = 50;
  const PHASE_TOTAL = PHASES.reduce((s, p) => s + p.dur, 0);
  function phaseAt(tSec) {
    let u = (tSec / CYCLE_SECONDS) * PHASE_TOTAL % PHASE_TOTAL;
    let i = 0;
    while (u > PHASES[i].dur) { u -= PHASES[i].dur; i = (i + 1) % PHASES.length; }
    return { i, u };
  }
  function ambientAt(tSec) {
    const { i, u } = phaseAt(tSec);
    const k = u / PHASES[i].dur;
    const a = PHASES[i].rgb, b = PHASES[(i + 1) % PHASES.length].rgb;
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
  }
  function isNightAt(tSec) { return PHASES[phaseAt(tSec).i].name === "notte"; }
  // [C] main.js, mulTint(): la tinta ambientale resta per-istanza (non un
  // uniform globale) cosi' i decori "luce" (`_selfLit`, sopra) possono
  // saltarla — altrimenti si "accenderebbero" ma restando scuri quanto la
  // notte intorno, indistinguibili.
  function mulTint(base, rgb) {
    const r = Math.round(((base >> 16) & 255) * rgb[0]);
    const g = Math.round(((base >> 8) & 255) * rgb[1]);
    const b = Math.round((base & 255) * rgb[2]);
    return (r << 16) | (g << 8) | b;
  }

  function updateThreats(dt) {
    // Mantiene un rifornimento costante cosi' aerei/bombardieri/dirigibili
    // continuano ad arrivare per tutto il tempo che il menu resta a schermo,
    // invece di esaurirsi dopo le prime ondate come farebbe r12 vero senza
    // spie a rialimentarli.
    fakeR12.ondan = 3; fakeR12.bombn = 1; fakeR12.diron = 1;
    stepThreatSpawner(fakeR12, threats, dt);
    stepThreats(threats, bombs, explosions, dt, fakeR12, aerSmoke, debris);
    stepBombs(bombs, explosions, [], dt, fakeR12);
    stepExplosions(explosions, dt);
    stepAerSmoke(aerSmoke, dt);
    stepDebris(debris, explosions, dt);
  }

  // ---------------------------------------------------------------- resize
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    camUI.resize(canvas.clientWidth, canvas.clientHeight);
    const fitZoom = 1086 / camUI.viewH;
    camUI.minZoom = camUI.maxZoom = fitZoom * 1.08;
    camUI.setZoomImmediate(camUI.minZoom);
    positionBanner();
    camWorld.resize(canvas.clientWidth, canvas.clientHeight);
  }
  window.addEventListener("resize", resize);
  resize();

  // ---------------------------------------------------------------- input
  function hitButton(b, wx, wy) {
    const f = b._f;
    if (!f) return false;
    return wx >= b.x - f.ox && wx <= b.x - f.ox + f.w && wy >= b.y - f.oy && wy <= b.y - f.oy + f.h;
  }
  let message = "", messageT = 0, fadeT = 0, navigateTo = null;
  const FADE_DUR = 0.5;
  input.onTap = (sx, sy) => {
    if (navigateTo) return;
    const w = camUI.screenToWorld(sx, sy);
    for (const b of BUTTONS) {
      if (!hitButton(b, w.x, w.y)) continue;
      if (b.obj === "standma") { navigateTo = { room: "match", autoload: true }; fadeT = 0; }
      else if (b.obj === "easma") { navigateTo = { room: "match_easy", autoload: true }; fadeT = 0; }
      // [I] niente autoload: il tutorial riparte sempre da zero (nessun
      // salvataggio da riprendere), STUDIO.md/tutorial.js.
      else { navigateTo = { room: "tutorial", autoload: false }; fadeT = 0; }
      break;
    }
  };

  // ---------------------------------------------------------------- loop
  // [I] Il mondo sfocato dietro il menu non ha bisogno di aggiornarsi a 60fps
  // quanto i bottoni: la pipeline di blur — una `copyTexImage2D` a piena
  // risoluzione + 4 passate gaussiane, PauseBlur, game/src/gl.js — ha un
  // costo che varia MOLTO da dispositivo a dispositivo (misurato ~37ms/frame,
  // 18fps totali, su rendering software senza vera GPU; una GPU vera, mobile
  // inclusa, e' tipicamente molto piu' veloce). Un intervallo fisso tarato
  // sul caso peggiore restava inutilmente lento — e visibilmente "scattoso"
  // (auto/aerei continuano ad avanzare ogni frame in JS, ma lo sfondo sfumato
  // si aggiorna solo ogni BG_INTERVAL: piu' l'intervallo e' largo, piu' il
  // salto fra un aggiornamento e il successivo si vede, segnalato
  // dall'autore) — anche su dispositivi capaci di aggiornare molto piu'
  // spesso senza appesantirsi. BG_INTERVAL ora si ADATTA al costo vero
  // misurato ogni volta (`costEMA`, una media mobile per non rincorrere
  // rumore frame-per-frame): tenuto abbastanza largo da restare sotto
  // BUDGET_FRAC della durata dell'intervallo stesso (il blur non deve mai
  // occupare piu' di una frazione fissa del tempo, qualunque sia la sua
  // durata vera), quindi si stringe da solo su hardware veloce (fino al
  // limite di un vero refresh ad ogni frame, MIN_INTERVAL) e si allarga da
  // solo su hardware lento (fino a MAX_INTERVAL, lo stesso 1/6 di prima —
  // mai piu' pesante di quanto fosse gia').
  const MIN_INTERVAL = 1 / 60;
  const MAX_INTERVAL = 1 / 6;
  const BUDGET_FRAC = 0.25;   // il blur occupa al piu' 1/4 del proprio intervallo
  let BG_INTERVAL = MAX_INTERVAL;
  let costEMA = null;
  let bgT = BG_INTERVAL;   // forza un aggiornamento al primissimo frame
  let blurTex = null;

  let last = performance.now();
  let elapsed = 0;
  function frame(now) {
    if (stopped) return;
    // Stesso principio applicato a game/src/main.js (segnalato dall'autore:
    // "su desktop non riesco ad avviare match, rimane fermo in caricamento
    // con schermo nero") — un errore qui dentro (requestAnimationFrame, mai
    // coperto dal try/catch di app.js/navigate(), gia' concluso col successo
    // del mount) fermerebbe il ciclo in silenzio, stavolta sul MENU: se
    // capitasse mentre l'utente e' gia' nel mezzo del fade verso "match"
    // (`navigateTo`/`fadeT` sotto) resterebbe bloccato a meta' fade per
    // sempre, con la stessa identica UX "sembra si sia bloccato". Loggato e
    // ritentato dallo stesso menu invece di restare morto in silenzio.
    try {
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
    last = now;
    elapsed += dt;

    if (navigateTo) {
      fadeT += dt;
      if (fadeT >= FADE_DUR) { navigate("match", navigateTo); return; }
    }
    if (messageT > 0) messageT -= dt;

    stepCars(cars, dt, { oil: 1 }, false);   // { oil: 1 }: sempre "c'e' ancora olio", rinasce sempre
    stepAtmosphere(atmo, dt, false);
    stepSemaphores(semaphores, dt);
    stepBuildingLights(dt, isNightAt(elapsed));
    updateThreats(dt);

    camWorld.x = CAM_CENTER.x + Math.sin((elapsed / CAM_PERIOD) * Math.PI * 2) * CAM_DRIFT.x;
    camWorld.y = CAM_CENTER.y + Math.cos((elapsed / CAM_PERIOD) * Math.PI * 2) * CAM_DRIFT.y;

    r.beginFrame(canvas.width, canvas.height);
    bgT += dt;
    if (bgT >= BG_INTERVAL || !blurTex) {
      bgT = 0;
      const bgStart = performance.now();
      // --- layer mondo (sfumato dopo) ---
      // [C] main.js: u_ambient resta neutro, la tinta e' applicata per
      // istanza sotto (mulTint()) cosi' i decori "luce" (buildingLights,
      // sopra) possono restare alla propria luminosita' vera invece di
      // scurirsi insieme al resto della scena.
      const amb = ambientAt(elapsed);
      r.setAmbient(1, 1, 1);
      r.setProjection(camWorld.projection());
      const dynamic = [];
      for (const s of semaphores) if (s.spr) dynamic.push({ obj: "decor", x: s.x, y: s.y, depth: s.depth, _f: mFrameFor(s.spr) });
      // Le "turbine" di r120 (game/src/platform.js): un lampeggio, non
      // erano mai state statiche — vedi il commento su blinkMotorVisible() li'.
      for (const it of r120MotorDecor(elapsed)) dynamic.push({ obj: "decor", x: it.x, y: it.y, depth: it.depth, _f: mFrameFor(it.spr) });
      for (const c of atmo.clouds) dynamic.push({ obj: "decor", x: c.x, y: c.y, depth: c.depth, _f: mFrameFor(c.spr) });
      for (const b of atmo.birds) dynamic.push({ obj: "decor", x: b.x, y: b.y, depth: b.depth, _f: mFrameFor(b.spr) });
      for (const c of cars) dynamic.push({ obj: "decor", x: c.x, y: c.y, depth: c.depth, _f: mFrameFor(c.spr, Math.floor(c.frame)), _tint: c.tint });
      for (const th of threats) dynamic.push({ obj: "decor", x: th.x, y: th.y, depth: th.depth, _f: mFrameFor(th.spr), _scale: th.scale });
      for (const bm of bombs) dynamic.push({ obj: "decor", x: bm.x, y: bm.y, depth: -bm.y, _f: mFrameFor(bm.spr) });
      for (const d of debris) dynamic.push({ obj: "decor", x: d.x, y: d.y, depth: -d.y, _f: mFrameFor(d.spr) });
      for (const ex of explosions) {
        const fi = Math.min(EXPLOSION_FRAME_COUNT - 1, Math.floor(ex.t / TICK));
        dynamic.push({ obj: "decor", x: ex.x, y: ex.y, depth: -4000, _f: mFrameFor(ex.spr, fi), _scale: ex.scale });
      }
      for (const p of aerSmoke) {
        const fi = Math.min(AER_SMOKE_FRAME_COUNT - 1, Math.floor(p.t / TICK));
        dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: mFrameFor(p.spr, fi), _scale: p.scale });
      }
      // [I] Guarisce gli sprite di `worldStatic` ancora `null` perche' la
      // loro pagina "deferred" (game/src/assets.js, tools/23_atlas.py
      // `corePages`) non era ancora arrivata quando `_f` e' stato
      // calcolato una volta sola (il ciclo subito dopo `applyMatchPlatform`
      // sopra, e i due `push()` di LIT_LOTS) — a differenza degli sprite
      // "dynamic" qui sopra (mFrameFor() richiamato di nuovo ad ogni
      // aggiornamento, si aggiornano gia' da soli), questi non verrebbero
      // mai piu' ritentati altrimenti. Costo trascurabile: gia' dentro il
      // ramo "aggiorna ogni BG_INTERVAL", non ogni frame.
      for (const it of worldStatic) if (!it._f) it._f = mFrameFor(it.spr);
      const frameList = worldStatic.concat(dynamic).sort(sortWorld);
      const vw = camWorld.worldW, vh = camWorld.worldH;
      const l = camWorld.x - vw / 2, t = camWorld.y - vh / 2, rt = l + vw, bt = t + vh;
      for (const it of frameList) {
        const f = it._f;
        if (!f) continue;
        const x0 = it.x - f.ox, y0 = it.y - f.oy;
        if (x0 > rt || y0 > bt || x0 + f.w < l || y0 + f.h < t) continue;
        const base = it._tint ?? 0xffffff;
        const tint = it._selfLit ? base : mulTint(base, amb);
        r.draw(f, it.x, it.y, it._scale ?? 1, tint, it._alpha ?? 1);
      }
      r.flush();
      // PauseBlur (game/src/gl.js) — stesso identico effetto del menu di
      // pausa in game/src/main.js. `pingB` (la texture restituita) resta
      // valida in GPU finche' `blurScreen()` non viene richiamato di nuovo,
      // motivo per cui i frame saltati sopra possono continuare a ridisegnarla.
      blurTex = pauseBlur.blurScreen(canvas.width, canvas.height);
      // Adatta BG_INTERVAL al costo vero appena misurato (commento sopra):
      // media mobile esponenziale (peso 0.3 al nuovo campione) per non
      // rincorrere un singolo frame rumoroso, poi si sceglie l'intervallo che
      // tiene quel costo entro BUDGET_FRAC di se stesso.
      const cost = performance.now() - bgStart;
      costEMA = costEMA === null ? cost : costEMA + (cost - costEMA) * 0.3;
      BG_INTERVAL = Math.min(MAX_INTERVAL, Math.max(MIN_INTERVAL, (costEMA / 1000) / BUDGET_FRAC));
    }

    r.setAmbient(1, 1, 1);
    r.setProjection(screenProjection(canvas.clientWidth, canvas.clientHeight));
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    // v0/v1 scambiati: copyTexImage2D cattura dal framebuffer di default,
    // origine in basso a sinistra — stesso motivo di drawPauseOverlay() in
    // main.js.
    r.draw({ tex: blurTex, u0: 0, v0: 1, u1: 1, v1: 0, w: cw, h: ch, ox: 0, oy: 0 }, 0, 0, 1, 0xffffff, 1);
    r.draw(solidFrame(SOLID.tex, cw, ch), 0, 0, 1, 0x000000, 0.35);
    r.flush();

    r.setProjection(camUI.projection());
    if (BANNER._f) r.draw(BANNER._f, BANNER.x, BANNER.y, 1, 0xffffff, 1);
    for (const b of BUTTONS) if (b._f) r.draw(b._f, b.x, b.y, 1, 0xffffff, 1);
    if (fadeT > 0) {
      const k = Math.min(1, fadeT / FADE_DUR);
      const hw = camUI.worldW / 2, hh = camUI.worldH / 2;
      r.drawQuad(SOLID, { x: camUI.x - hw, y: camUI.y - hh }, { x: camUI.x + hw, y: camUI.y - hh },
        { x: camUI.x + hw, y: camUI.y + hh }, { x: camUI.x - hw, y: camUI.y + hh }, 0x000000, k);
    }
    r.flush();

    hideLoading();

    requestAnimationFrame(frame);
    } catch (err) {
      console.error("nimbus: errore nel ciclo di frame del menu, ricarico il menu", err);
      stopped = true;
      navigate("menu");
    }
  }
  requestAnimationFrame(frame);

  const msgEl = document.createElement("div");
  msgEl.style.cssText = "position:fixed;left:0;right:0;bottom:10%;text-align:center;" +
    "font:16px/1.4 ui-monospace,monospace;color:#fff;text-shadow:0 1px 3px #000;" +
    "pointer-events:none;transition:opacity 0.3s ease;opacity:0;";
  document.body.appendChild(msgEl);
  const msgInterval = setInterval(() => {
    msgEl.textContent = message;
    msgEl.style.opacity = messageT > 0 ? "1" : "0";
  }, 100);

  // [Nuova funzionalita', richiesta dall'autore: "aggiungere una funzione
  // carica partita nel menu principale, in modo da proseguire nel file
  // salvato"] Nessuno sprite del menu originale copre questo caso (i tre
  // bottoni `BUTTONS` sopra vengono dalla room decompilata `title.json` —
  // STUDIO.md, nessun quarto bottone "carica" e' mai esistito li'): un vero
  // elemento HTML invece, stesso principio gia' scelto per `msgEl` sopra e
  // per la scritta "loading" delle schermate di caricamento (index.html) —
  // niente sprite da disegnare, un bottone vero e accessibile a costo zero.
  // Il caricamento vero e proprio (dialog di sistema, save.js/
  // loadFromFile()) e' fuori dal layer WebGL apposta: main.js non sa ancora
  // quale room montare finche' il file scelto non rivela `data.scene`.
  const loadFileBtn = document.createElement("button");
  loadFileBtn.textContent = "Carica partita";
  loadFileBtn.style.cssText = "position:fixed;left:24px;bottom:24px;z-index:5;" +
    "font:700 14px/1 system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;" +
    "letter-spacing:0.08em;text-transform:uppercase;color:#fff;" +
    "background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.35);border-radius:6px;" +
    "padding:10px 16px;cursor:pointer;";
  let loadingFile = false;
  loadFileBtn.addEventListener("click", async () => {
    // `navigateTo` (sotto, gia' usato da input.onTap): stessa guardia contro
    // un secondo tap/click mentre il fade verso "match" e' gia' in corso.
    // `loadingFile` in piu': il dialog di sistema e' async (l'utente puo'
    // restarci sopra qualche secondo), un secondo click prima che risponda
    // non deve aprirne un secondo.
    if (navigateTo || loadingFile) return;
    loadingFile = true;
    loadFileBtn.disabled = true;
    try {
      const result = await loadFromFile();
      // `null`: dialog annullato dall'utente O file non valido (save.js non
      // distingue i due casi) — silenzioso in entrambi, coerente con
      // "annullare un dialog non e' un errore da segnalare".
      if (result) {
        navigateTo = {
          room: result.data.scene ?? "match_easy", autoload: false,
          loadedData: result.data, fileHandle: result.handle,
        };
        fadeT = 0;
      }
    } catch (err) {
      console.error("nimbus: caricamento da file fallito", err);
      message = "caricamento da file fallito"; messageT = 3;
    } finally {
      loadingFile = false;
      loadFileBtn.disabled = false;
    }
  });
  document.body.appendChild(loadFileBtn);

  return {
    dispose() {
      stopped = true;
      window.removeEventListener("resize", resize);
      clearInterval(msgInterval);
      msgEl.remove();
      loadFileBtn.remove();
    },
  };
}
