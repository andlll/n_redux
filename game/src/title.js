// La title screen — [C] src/rooms/title.json: tre bottoni (`standma`/
// "Match", `easma`/"Match Facile", `me3`/"Tutorial") + un banner laterale
// (`gogirrra`) — **[Richiesto dall'autore]** ridotto al solo marchio
// mtFUJI SOFTWARE come watermark statico in basso a destra (subFrameRight()/
// logoMark, sotto): "NIMBUS"/"Mount Fuji, 2019" del vecchio raster sono
// stati sostituiti da un vero titolo HTML in alto ("NIMBUS"/"REDUX", verso
// la fine del file). Lo sfondo NON e' piu' `eddaie` (il logo animato del
// decompilato, 193 sottoimmagini — pesante da impacchettare e, detto
// dall'autore, "fa un po' cagare"): al suo posto un ritaglio di `match` (la
// mappa difficile, non `match_easy`) dietro il menu — auto, aerei/
// dirigibili, semafori, ciclo giorno/notte — sfumato con lo stesso
// `PauseBlur` (game/src/gl.js) gia' usato per il menu di pausa in
// game/src/main.js. Nessun combattimento: nessuna torretta esiste qui,
// quindi aerei/dirigibili volano/sganciano bombe (che detonano a vuoto,
// `buildings: []`) senza che nulla li abbatta — esattamente "vivi ma non in
// guerra", come richiesto.
//
// [Decisione dell'autore: "citta' statica ma oggetti volanti e
// bombardamento funzionanti"] La citta'/piattaforma (edifici, strade,
// alberi — mai animata di suo, STUDIO.md: solo il ciclo giorno/notte la
// tinge) NON e' piu' ricomposta ogni frame da centinaia di sprite
// dell'intero atlas di `match` (56 pagine, ~800 MB decompressi in GPU solo
// per uno sfondo che non cambia mai forma): `tools/29_title_bg.py` la
// pre-renderizza offline in UN'unica immagine (`assets/title_city.webp`,
// CITY_RECT sotto — poche centinaia di KB), caricata qui come una texture
// qualunque (`loadTexture()`, non un intero atlas-room) e disegnata come un
// solo quad in spazio mondo, PRIMA del layer `dynamic` di sempre — che
// resta vivo e identico: auto, aerei/bombardieri/zeppelin, bombe/esplosioni/
// detriti/fumo, nuvole/uccelli, semafori, le turbine che lampeggiano, le
// finestre che si accendono di notte. L'atlas "title" (sotto) ora
// impacchetta anche questi sprite dinamici (tools/23_atlas.py,
// TITLE_DYNAMIC_SPRITES) — piccolo e mirato, non l'intero catalogo
// GAMEPLAY_SPRITES che serve solo alla partita vera.
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
import { solidFrame, loadTexture } from "./gl.js";
import { loadFromFile } from "./save.js";
import { Camera, screenProjection } from "./camera.js";
import { loadRoomAtlas } from "./assets.js";
import { r120MotorDecor } from "./platform.js";
import { spawnCar, stepCars } from "./cars.js";
import { createAtmosphere, stepAtmosphere } from "./atmosphere.js";
import { createSemaphore, stepSemaphores } from "./semaphores.js";
import {
  stepThreatSpawner, stepThreats, stepBombs, stepExplosions, EXPLOSION_FRAME_COUNT,
  stepAerSmoke, AER_SMOKE_FRAME_COUNT, stepDebris,
} from "./threats.js";

const TICK = 1 / 60;

export async function mountTitle(ctx) {
  const { gl, r, canvas, input, pauseBlur, white, navigate, hideLoading, reportProgress } = ctx;
  let stopped = false;
  const SOLID = solidFrame(white, 1, 1);

  // ---------------------------------------------------------------- title UI
  const scene = await fetch("./data/title.scene.json").then((x) => x.json());
  // Un solo atlas ("title", sotto) copre ormai sia i bottoni/banner sia
  // l'intero layer dinamico dello sfondo (auto/aerei/bombe/nuvole/semafori/
  // turbine/finestre — vedi il commento in cima al file): la citta' ferma
  // non passa piu' da qui, e' un'unica texture caricata poco sotto
  // (`cityBg`). Non c'e' quindi piu' bisogno di una seconda fase "loading
  // city" separata (`reportProgress()` restava scomoda a due cifre diverse
  // per un errore di somma gia' corretto altrove, app.js) — un solo
  // progresso onesto per l'unico atlas rimasto.
  const { atlas, pageTex } = await loadRoomAtlas(gl, "title", {
    onProgress: (loaded, total) => reportProgress("title", loaded, total, "loading interface"),
  });
  function frameFor(sprName, frameIdx = 0) {
    const frames = atlas.sprites[sprName];
    if (!frames || !frames.length) return null;
    const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
    if (!pageTex[f.p]) return null;
    return { tex: pageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1, w: f.w, h: f.h, ox: f.ox, oy: f.oy };
  }

  const BUTTONS = scene.instances.filter((it) => ["standma", "easma", "me3"].includes(it.obj));
  for (const b of BUTTONS) b._f = frameFor(b.spr);
  // [Richiesto dall'autore: "rimuovi lo sprite con NIMBUS/Mount Fuji
  // Software, 2019 e il logo, tieni solo il logo come watermark statico in
  // basso a destra"] `gogirrra` (spr `logigogi`, 530x96) e' un unico raster
  // con TUTTO il vecchio banner insieme — "NIMBUS" grande, "Mount Fuji,
  // 2019" piu' piccolo, poi il marchio vero (il cubo isometrico + "mtFUJI
  // SOFTWARE") a destra. Campionato pixel per pixel (colonna per colonna,
  // dove l'alpha torna a zero): il marchio da solo occupa esattamente gli
  // ultimi 80px del frame (x locale 450..530), stessa altezza intera — un
  // solo sotto-ritaglio (subFrameRight() sotto) invece di un secondo sprite
  // da impacchettare, riusando la STESSA pagina/texture gia' in atlas. Il
  // testo "NIMBUS"/"Mount Fuji, 2019" del vecchio banner non viene piu'
  // disegnato: "NIMBUS"/"REDUX" tornano sotto come testo HTML vero, in alto
  // al centro (vedi piu' sotto).
  const LOGO_MARK_X0 = 450;   // [C] campionato pixel per pixel sul raster di logigogi
  /** Ritaglia `f` da `pxFromLeft` (in pixel, spazio del frame originale) fino
   * al bordo destro, stessa altezza intera — nuova origine in alto a
   * sinistra (ox=0/oy=0): un ritaglio non ha piu' l'ancoraggio del frame
   * originale, il chiamante posiziona il quad dal proprio angolo. */
  function subFrameRight(f, pxFromLeft) {
    const frac = pxFromLeft / f.w;
    return {
      tex: f.tex, v0: f.v0, v1: f.v1,
      u0: f.u0 + (f.u1 - f.u0) * frac, u1: f.u1,
      w: f.w - pxFromLeft, h: f.h, ox: 0, oy: 0,
    };
  }
  const bannerFrame = frameFor("logigogi");
  const logoMark = bannerFrame ? subFrameRight(bannerFrame, LOGO_MARK_X0) : null;
  const logoPos = { x: 0, y: 0 };
  const LOGO_MARGIN = 24;
  // Stesso principio di prima (FIX originale sul banner): ancorato
  // all'angolo in basso a destra della viewport REALE di camUI, non a un
  // punto fisso della scena — regge anche quando resize() cambia
  // camUI.worldW/worldH col variare dell'aspect ratio.
  function positionLogo() {
    if (!logoMark) return;
    const rightEdge = camUI.x + camUI.worldW / 2 - LOGO_MARGIN;
    const bottomEdge = camUI.y + camUI.worldH / 2 - LOGO_MARGIN;
    logoPos.x = rightEdge - logoMark.w;
    logoPos.y = bottomEdge - logoMark.h;
  }

  const camUI = new Camera();
  camUI.bounds = { left: 0, top: 0, right: scene.width, bottom: scene.height };
  camUI.x = 1235; camUI.y = 543;

  // ------------------------------------------------------------- sfondo: match
  // Solo i metadati (JSON, pochi KB): le posizioni dei pali dei semafori
  // (`object8`, sotto — il "tappo" colorato che lampeggia resta un vero
  // sprite dinamico) e le dimensioni della room per `camWorld.bounds`. Nessun
  // atlas immagine caricato da qui: la citta'/piattaforma vera e propria e'
  // gia' pronta cotta in `cityBg` (sotto).
  const mScene = await fetch("./data/match.scene.json").then((x) => x.json());
  const semaphorePoles = mScene.instances.filter((it) => it.obj === "object8");
  const semaphores = semaphorePoles.map((it) => createSemaphore(it.x, it.y));

  // Atlas "title": bottoni/banner (gia' caricati sopra) PIU' tutto il layer
  // dinamico (auto, aerei/bombe/esplosioni/detriti/fumo, nuvole/uccelli, i
  // "tappi" dei semafori, le turbine, le finestre accese — tools/23_atlas.py/
  // TITLE_DYNAMIC_SPRITES): `frameFor()` (sopra) serve gia' a tutto questo,
  // nessuna seconda funzione `mFrameFor()` da tenere in sync.
  //
  // La citta'/piattaforma FERMA: un'unica immagine pre-renderizzata offline
  // (tools/29_title_bg.py — vedi il commento in cima al file), non un atlas-
  // room. `CITY_RECT` e' l'angolo in alto a sinistra in spazio MONDO in cui
  // va disegnata (BAKE_X0/BAKE_Y0 di quello script — se cambiano li',
  // aggiornarli anche qui): la sua larghezza/altezza vera si legge da
  // `cityBg.width/height` invece di duplicarle a mano.
  const cityBg = await loadTexture(gl, "./assets/title_city.webp");
  const CITY_RECT = { x: 200, y: 180 };
  const cityFrame = { tex: cityBg.tex, u0: 0, v0: 0, u1: 1, v1: 1, w: cityBg.width, h: cityBg.height, ox: 0, oy: 0 };

  // ------------------------------------------------------- edifici illuminati
  // La citta' cotta in `cityBg` include gia' le case/ville occupate di
  // LIT_LOTS (tools/29_title_bg.py replica la stessa lista) ma SOLO
  // l'edificio spento: le finestre accese cambiano nel tempo (fade in/out
  // giorno/notte, stepBuildingLights() sotto), quindi restano un layer
  // dinamico separato, disegnato sopra l'immagine ferma ad ogni frame —
  // stesso principio delle turbine che lampeggiano (r120MotorDecor()).
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
  const buildingLights = LIT_LOTS.map((lot) => ({
    obj: "decor", x: lot.x, y: lot.y, depth: -lot.y - 1, _f: frameFor(lot.spr + "l"),
    _selfLit: true, _lightT: 0, _alpha: 0,
  }));
  function stepBuildingLights(dt, night) {
    for (const light of buildingLights) {
      light._lightT = Math.max(0, Math.min(LIGHT_FADE_SEC, light._lightT + (night ? dt : -dt)));
      light._alpha = light._lightT / LIGHT_FADE_SEC;
    }
  }

  function effDepth(it) { return it.depth === 0 ? -it.y : it.depth; }
  const sortWorld = (a, b) => effDepth(b) - effDepth(a);

  const camWorld = new Camera();
  // [Bug corretto, segnalato dall'autore: "la piattaforma va troppo a
  // destra/sinistra, si vede lo sprite tagliato"] `bounds` erano le
  // dimensioni dell'INTERA room `match` (mScene.width/height — 3900x2090,
  // molto piu' grandi della sola citta' cotta in cityBg) — di fatto mai
  // applicate: CAM_CENTER/CAM_DRIFT sotto scrivono camWorld.x/y DIRETTAMENTE
  // ogni frame, non tramite panByScreen()/update() (gli unici due punti
  // della classe che chiamano clamp() da soli, game/src/camera.js), quindi
  // la deriva poteva portare il bordo schermo oltre il bordo VERO di
  // cityBg (CITY_RECT/cityBg.width/height, sopra), esponendo il vuoto oltre
  // l'immagine invece di fermarsi quando il suo bordo tocca il bordo dello
  // schermo. `bounds` ora e' il rettangolo vero di cityBg, con un
  // `camWorld.clamp()` esplicito nel loop dopo aver scritto x/y (sotto) —
  // riusa la stessa logica gia' pronta della classe, compreso il fallback
  // "centra invece di incastrarti" se il mondo e' piu' stretto della vista
  // (schermi molto larghi dove cityBg da solo non basta a coprire tutto).
  camWorld.bounds = {
    left: CITY_RECT.x, top: CITY_RECT.y,
    right: CITY_RECT.x + cityBg.width, bottom: CITY_RECT.y + cityBg.height,
  };
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
    { name: "day", rgb: [1.00, 1.00, 1.00], dur: 14 }, { name: "dawn", rgb: [1.00, 0.82, 0.62], dur: 5 },
    { name: "night", rgb: [0.45, 0.52, 0.82], dur: 12 }, { name: "dawn", rgb: [0.92, 0.80, 0.78], dur: 5 },
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
  function isNightAt(tSec) { return PHASES[phaseAt(tSec).i].name === "night"; }
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

  // [Bug corretto, segnalato dall'autore: "aerei/dirigibili devono partire
  // da fuori schermo in movimento, altrimenti sembrano comparire gia' a
  // meta' schermo"] spawnThreat() (threats.js) nasce a coordinate FISSE
  // (spawnX -170 per air/bombar, -1000 per dirig) calibrate sull'intera
  // mappa `match_easy` — la camera qui (camWorld, molto piu' stretta,
  // ancorata a CAM_CENTER/CITY_RECT sopra, per niente la stessa finestra di
  // `match_easy`) non ha alcuna relazione con quelle coordinate: a seconda
  // della finestra del browser potevano gia' cadere dentro l'area visibile
  // invece che fuori. THREAT_SPAWN_MARGIN in piu' oltre al bordo, stesso
  // principio del margine di RAIN_MARGIN/CLOUD_SPAWNS altrove — non spunta
  // "a filo" del bordo dello schermo.
  const THREAT_SPAWN_MARGIN = 150;
  function updateThreats(dt) {
    // Mantiene un rifornimento costante cosi' aerei/bombardieri/dirigibili
    // continuano ad arrivare per tutto il tempo che il menu resta a schermo,
    // invece di esaurirsi dopo le prime ondate come farebbe r12 vero senza
    // spie a rialimentarli.
    fakeR12.ondan = 3; fakeR12.bombn = 1; fakeR12.diron = 1;
    const spawnedBefore = threats.length;
    stepThreatSpawner(fakeR12, threats, dt);
    // Sposta SOLO i nuovi arrivi di questo frame appena fuori dal bordo
    // sinistro VERO della camera (ricalcolato ogni volta: cambia con
    // resize/la deriva di camWorld) — direzione/velocita' di volo restano
    // quelle vere di spawnThreat(), sempre verso destra (COS30 positivo,
    // threats.js/stepThreats()), solo il punto di partenza cambia.
    const leftEdge = camWorld.x - camWorld.worldW / 2;
    for (let i = spawnedBefore; i < threats.length; i++) threats[i].x = leftEdge - THREAT_SPAWN_MARGIN;
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
    positionLogo();
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

    // camWorld.x/y VANNO risolti prima di updateThreats() sotto: gli riposiziona
    // i nuovi arrivi appena fuori dal bordo sinistro vero di QUESTO frame
    // (vedi il commento su THREAT_SPAWN_MARGIN sopra), non quello del frame
    // precedente.
    camWorld.x = CAM_CENTER.x + Math.sin((elapsed / CAM_PERIOD) * Math.PI * 2) * CAM_DRIFT.x;
    camWorld.y = CAM_CENTER.y + Math.cos((elapsed / CAM_PERIOD) * Math.PI * 2) * CAM_DRIFT.y;
    camWorld.clamp();
    updateThreats(dt);

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
      // La citta'/piattaforma ferma (cityBg/cityFrame, sopra) — un solo
      // quad, PRIMA di ogni sprite dinamico cosi' auto/aerei/bombe restano
      // sempre sopra di lei. Stessa tinta giorno/notte che ogni sprite non
      // self-lit riceveva individualmente prima (mulTint(0xffffff, amb) qui
      // equivale a tingere l'intera immagine in un colpo solo — risultato
      // identico, un solo draw invece di un centinaio).
      r.draw(cityFrame, CITY_RECT.x, CITY_RECT.y, 1, mulTint(0xffffff, amb), 1);
      const dynamic = [];
      for (const s of semaphores) if (s.spr) dynamic.push({ obj: "decor", x: s.x, y: s.y, depth: s.depth, _f: frameFor(s.spr) });
      // Le "turbine" di r120 (game/src/platform.js): un lampeggio, non
      // erano mai state statiche — vedi il commento su blinkMotorVisible() li'.
      for (const it of r120MotorDecor(elapsed)) dynamic.push({ obj: "decor", x: it.x, y: it.y, depth: it.depth, _f: frameFor(it.spr) });
      for (const c of atmo.clouds) dynamic.push({ obj: "decor", x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr) });
      for (const b of atmo.birds) dynamic.push({ obj: "decor", x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr) });
      for (const c of cars) dynamic.push({ obj: "decor", x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr, Math.floor(c.frame)), _tint: c.tint });
      for (const th of threats) dynamic.push({ obj: "decor", x: th.x, y: th.y, depth: th.depth, _f: frameFor(th.spr), _scale: th.scale });
      for (const bm of bombs) dynamic.push({ obj: "decor", x: bm.x, y: bm.y, depth: -bm.y, _f: frameFor(bm.spr) });
      for (const d of debris) dynamic.push({ obj: "decor", x: d.x, y: d.y, depth: -d.y, _f: frameFor(d.spr) });
      for (const ex of explosions) {
        const fi = Math.min(EXPLOSION_FRAME_COUNT - 1, Math.floor(ex.t / TICK));
        dynamic.push({ obj: "decor", x: ex.x, y: ex.y, depth: -4000, _f: frameFor(ex.spr, fi), _scale: ex.scale });
      }
      for (const p of aerSmoke) {
        const fi = Math.min(AER_SMOKE_FRAME_COUNT - 1, Math.floor(p.t / TICK));
        dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr, fi), _scale: p.scale });
      }
      dynamic.push(...buildingLights);
      const frameList = dynamic.sort(sortWorld);
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
    // Watermark statico del logo (logoMark/positionLogo(), sopra): semi-
    // trasparente + colorize (Renderer.setColorize(), gl.js — ignora l'RGB
    // del marchio, disegna la sagoma/alpha vera in tinta piena) invece del
    // marchio a colori originale, cosi' resta leggibile ma discreto sopra
    // qualunque sfondo (giorno/notte/vignetta) senza competere coi bottoni.
    if (logoMark) {
      r.setColorize(true);
      r.draw(logoMark, logoPos.x, logoPos.y, 1, 0xffffff, 0.4);
      r.setColorize(false);
    }
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

  // [Nuova funzionalita', richiesta dall'autore: "aggiungi le scritte NIMBUS
  // (centrata in alto) e REDUX (piccola sotto)"] Testo HTML vero,
  // Montserrat (self-hosted, index.html — stesso font gia' usato per menu
  // di pausa/tutorial/barra risorse in main.js), non uno sprite: nessun
  // equivalente nel decompilato (`title` non aveva un titolo testuale
  // separato dal banner, STUDIO.md — era tutto dentro `logigogi`, sopra),
  // un tocco puramente nuovo per questa title screen. "REDUX" segnala che
  // questo E' la riscrittura, non l'originale.
  //
  // [Corretto: l'autore intendeva un effetto diverso da quello scelto la
  // prima volta] Non una sostituzione casuale dei caratteri — lo stesso
  // sdoppiamento cromatico (ciano/blu) gia' usato per il logo della
  // schermata di caricamento (index.html, .logoWrap .ghost/@keyframes
  // rgbGlitch): due copie dello stesso testo, colorate e sovrapposte esatte
  // (position:absolute;inset:0) in `mix-blend-mode:screen`, invisibili
  // (opacity 0) per quasi tutto il ciclo di `rgbGlitch` e visibili solo per
  // una manciata di frame — lo stesso "sfarfallio" di trasmissione, non
  // testo che cambia. Le keyframe sono gia' globali in index.html (non
  // scope-ate a `.logoWrap`), riusate qui senza duplicarle.
  const titleWrap = document.createElement("div");
  titleWrap.style.cssText = "position:fixed;left:0;right:0;top:max(28px,6vh);text-align:center;" +
    "pointer-events:none;z-index:4;font-family:Montserrat,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;";
  const NIMBUS_SIZE = "font-size:clamp(34px,7vw,64px);font-weight:800;letter-spacing:0.1em;";
  const REDUX_SIZE = "font-size:clamp(12px,1.6vw,16px);font-weight:700;letter-spacing:0.5em;margin-top:2px;";
  // Stessi colori/ritardo del secondo strato (`.ghost.blue`, index.html) —
  // il ritardo di 0,06s fra ciano e blu e' quello che da' l'aspetto di uno
  // sdoppiamento vero invece di un semplice lampo bicolore in sincrono.
  const GHOST_LAYERS = [["#00e5ff", "0s"], ["#4d5bff", ".06s"]];
  function glitchLine(text, sizeCss, baseColorCss) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:relative;" + sizeCss + baseColorCss;
    wrap.textContent = text;
    for (const [color, delay] of GHOST_LAYERS) {
      const ghost = document.createElement("div");
      ghost.textContent = text;
      ghost.style.cssText = "position:absolute;inset:0;opacity:0;pointer-events:none;" + sizeCss +
        `color:${color};mix-blend-mode:screen;animation:rgbGlitch 5.4s infinite;animation-delay:${delay};`;
      wrap.appendChild(ghost);
    }
    return wrap;
  }
  const nimbusLine = glitchLine("NIMBUS", NIMBUS_SIZE, "color:#fff;text-shadow:0 2px 14px rgba(0,0,0,0.55);");
  const reduxLine = glitchLine("REDUX", REDUX_SIZE, "color:rgba(255,255,255,0.8);text-shadow:0 1px 6px rgba(0,0,0,0.55);");
  titleWrap.append(nimbusLine, reduxLine);
  document.body.appendChild(titleWrap);

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
  loadFileBtn.textContent = "Load game";
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
      // `null`: dialog annullato dall'utente — silenzioso, non e' un
      // errore. `"invalid"`: un file e' stato scelto davvero ma non e' un
      // salvataggio valido (JSON malformato, un altro gioco, o il
      // checksum non combacia — modificato a mano, save.js/verify()): qui
      // SI vale la pena dirlo, a differenza del dialog annullato.
      if (result === "invalid") {
        message = "invalid or modified file"; messageT = 3;
      } else if (result) {
        navigateTo = {
          room: result.data.scene ?? "match_easy", autoload: false,
          loadedData: result.data, fileHandle: result.handle,
        };
        fadeT = 0;
      }
    } catch (err) {
      console.error("nimbus: caricamento da file fallito", err);
      message = "load from file failed"; messageT = 3;
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
      titleWrap.remove();
    },
  };
}
