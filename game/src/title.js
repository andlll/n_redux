// La title screen — [C] src/rooms/title.json: tre bottoni (`standma`/
// "Match", `easma`/"Match Facile", `me3`/"Tutorial") + un banner laterale
// (`gogirrra`) — **[Richiesto dall'autore]** ridotto al solo marchio
// mtFUJI SOFTWARE come watermark statico in basso a destra (subFrameRight()/
// logoMark, sotto): "NIMBUS"/"Mount Fuji, 2019" del vecchio raster sono
// stati sostituiti da un vero titolo HTML in alto ("NIMBUS"/"REDUX", verso
// la fine del file).
//
// [Decisione dell'autore: "sostituisci la citta' dietro al menu con la scena
// di mare dell'inizio del tutorial, sempre sfumata, con tilt a destra/
// sinistra (tanto e' una texture seamless); tieni sopra il passaggio di
// aerei/nuvole ma senza bombardamenti"] Lo sfondo NON e' piu' un ritaglio di
// `match` (la citta'/piattaforma volante, ne' la vecchia versione statica
// pre-renderizzata da tools/29_title_bg.py, rimosso insieme a lei) ma
// "tuto_sfondo" — LO STESSO tassello di mare che copre lo schermo durante la
// fase iniziale della cutscene del tutorial (game/src/tutorial.js/main.js,
// fase "planes"): gia' seamless e pensato per essere ripetuto a tappeto,
// quindi disegnato qui in spazio SCHERMO (non serve nessuna pre-composizione
// offline ne' una camera che lo inquadri "dentro" un'immagine finita) con un
// leggero scorrimento orizzontale avanti/indietro (SEA_TILT_*, sotto) — da
// solo invisibile su una texture seamless, ma da' l'idea di un mare mosso
// invece di un fondale immobile. Sfumato con lo stesso `PauseBlur`
// (game/src/gl.js) gia' usato per il menu di pausa in game/src/main.js.
//
// Sopra il mare resta il traffico aereo "di sfondo": SOLO `air`
// (game/src/threats.js/THREAT_TYPES — l'unico dei tre tipi che non sgancia
// mai bombe una volta forzato `desto=false`, vedi updateThreats() sotto) +
// nuvole/uccelli (atmosphere.js). Niente `bombar`/`dirig` (sganciano sempre
// bombe) ne' nessuna delle bombe/esplosioni-da-impatto/detriti/fumo che la
// battaglia vera userebbe: "vivi ma senza guerra", stavolta per davvero,
// senza nessuna bomba nemmeno a vuoto. Auto/semafori/turbine/finestre
// accese erano tutti decoro della citta' rimossa: senza una citta' sotto
// non hanno piu' senso, quindi via anche loro.
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
import { createAtmosphere, stepAtmosphere } from "./atmosphere.js";
import {
  stepThreatSpawner, stepThreats, stepExplosions, EXPLOSION_FRAME_COUNT,
} from "./threats.js";

const TICK = 1 / 60;

export async function mountTitle(ctx) {
  const { gl, r, canvas, input, pauseBlur, white, navigate, hideLoading, reportProgress } = ctx;
  let stopped = false;
  const SOLID = solidFrame(white, 1, 1);

  // ---------------------------------------------------------------- title UI
  const scene = await fetch("./data/title.scene.json").then((x) => x.json());
  // Un solo atlas ("title", sotto) copre bottoni/banner PIU' l'intero layer
  // dinamico dello sfondo (mare/aerei/nuvole — tools/23_atlas.py,
  // TITLE_DYNAMIC_SPRITES): un solo progresso di caricamento onesto, un solo
  // atlas da liberare quando si lascia il menu (game/src/app.js,
  // neededRoomsFor()).
  const { atlas, pageTex } = await loadRoomAtlas(gl, "title", {
    onProgress: (loaded, total) => reportProgress("title", loaded, total, "loading interface"),
  });
  function frameFor(sprName, frameIdx = 0, inset = false) {
    const frames = atlas.sprites[sprName];
    if (!frames || !frames.length) return null;
    const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
    if (!pageTex[f.p]) return null;
    let { u0, v0, u1, v1 } = f;
    // [C] tools/23_atlas.py impacchetta gli sprite bordo a bordo, senza
    // gutter: per un frame disegnato una volta sola lo sfumato LINEAR di un
    // texel oltre il proprio bordo (il prossimo sprite in atlas, li' accanto)
    // e' impercettibile, ma "tuto_sfondo" (il tassello di mare, sotto) viene
    // ripetuto A TAPPETO fianco a fianco con SE STESSO — ad ogni giunzione
    // quello stesso mezzo texel diventa una riga visibile. `inset` restringe
    // il rettangolo UV di mezzo texel per lato prima di ritornarlo, stessa
    // tecnica gia' in uso in game/src/main.js per lo stesso sprite.
    if (inset) {
      const page = pageTex[f.p];
      const halfU = 0.5 / page.width, halfV = 0.5 / page.height;
      u0 += halfU; v0 += halfV; u1 -= halfU; v1 -= halfV;
    }
    return { tex: pageTex[f.p].tex, u0, v0, u1, v1, w: f.w, h: f.h, ox: f.ox, oy: f.oy };
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

  // ------------------------------------------------------------- sfondo: mare
  // "tuto_sfondo" (1000x564, data/sprites.json): lo stesso tassello di mare
  // della cutscene iniziale del tutorial, ripetuto a tappeto in spazio
  // SCHERMO (non mondo: e' un fondale astratto, non serve nessuna camera che
  // lo "inquadri" dentro un'area finita) con un leggero scorrimento
  // orizzontale avanti/indietro — SEA_TILT_PERIOD secondi per un ciclo
  // completo sinistra->destra->sinistra, SEA_TILT_AMPLITUDE px di ampiezza.
  const SEA_TILT_PERIOD = 22;
  const SEA_TILT_AMPLITUDE = 260;

  // ------------------------------------------------------ traffico aereo/cielo
  // camWorld resta una finestra puramente VIRTUALE nello stesso spazio
  // mondo condiviso da atmosphere.js/threats.js (le posizioni di
  // nascita di nuvole/uccelli/aerei sono coordinate fisse calibrate per la
  // mappa `match`/`match_easy`, non per questo schermo): serve solo a
  // posizionare/tagliare quel traffico, non disegna piu' nessuno sfondo
  // sotto di se' — nessun `bounds`/`clamp()` da rispettare (STUDIO.md, "zero
  // zoom" non si applica qui: e' l'unica camera mondo di questa schermata).
  const camWorld = new Camera();
  camWorld.minZoom = camWorld.maxZoom = 1.6;
  camWorld.setZoomImmediate(1.6);
  // Stesso ritaglio di sempre (un tempo centrato su r120, la base volante
  // ormai rimossa insieme alla citta'): la deriva lenta intorno a questo
  // punto resta comunque un buon punto di vista sul traffico aereo di
  // sfondo, indipendente da cosa ci fosse sotto.
  const CAM_CENTER = { x: 1450, y: 750 };
  const CAM_DRIFT = { x: 420, y: 90 };
  const CAM_PERIOD = 42;   // secondi per un giro completo della deriva

  // ------------------------------------------------------------- simulazione
  let atmo = createAtmosphere();
  let threats = [], explosions = [];
  // Stub minimo di r12: solo i campi che stepThreatSpawner/stepThreats
  // leggono davvero. Niente `bombn`/`diron`: restando `undefined` (letti con
  // `?? 0`) bombar/dirig non nascono mai — SOLO `air` (il tipo che, forzato
  // `desto=false` in updateThreats() sotto, non sgancia mai bombe) popola il
  // cielo di questa schermata. `storm` resta sempre falsy: nessun fulmine,
  // nessuna nuvola scura di tempesta.
  const fakeR12 = { ondan: 0, distrutti: 0 };

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
  function mulTint(base, rgb) {
    const r = Math.round(((base >> 16) & 255) * rgb[0]);
    const g = Math.round(((base >> 8) & 255) * rgb[1]);
    const b = Math.round((base & 255) * rgb[2]);
    return (r << 16) | (g << 8) | b;
  }

  function effDepth(it) { return it.depth === 0 ? -it.y : it.depth; }
  const sortWorld = (a, b) => effDepth(b) - effDepth(a);

  // [Bug corretto, segnalato dall'autore: "aerei/dirigibili devono partire
  // da fuori schermo in movimento, altrimenti sembrano comparire gia' a
  // meta' schermo"] spawnThreat() (threats.js) nasce a coordinate FISSE
  // (spawnX -170) calibrate sull'intera mappa `match_easy` — la camera qui
  // (camWorld, molto piu' stretta) non ha alcuna relazione con quelle
  // coordinate: a seconda della finestra del browser potevano gia' cadere
  // dentro l'area visibile invece che fuori. THREAT_SPAWN_MARGIN in piu'
  // oltre al bordo, stesso principio del margine di RAIN_MARGIN/
  // CLOUD_SPAWNS altrove — non spunta "a filo" del bordo dello schermo.
  const THREAT_SPAWN_MARGIN = 150;
  function updateThreats(dt) {
    // Mantiene un rifornimento costante di traffico "di sfondo" cosi' gli
    // aerei continuano ad arrivare per tutto il tempo che il menu resta a
    // schermo, invece di esaurirsi dopo le prime ondate come farebbe r12
    // vero senza spie a rialimentarli.
    fakeR12.ondan = 3;
    const spawnedBefore = threats.length;
    stepThreatSpawner(fakeR12, threats, dt);
    // Sposta SOLO i nuovi arrivi di questo frame appena fuori dal bordo
    // sinistro VERO della camera (ricalcolato ogni volta: cambia con
    // resize/la deriva di camWorld) — direzione/velocita' di volo restano
    // quelle vere di spawnThreat(), sempre verso destra (COS30 positivo,
    // threats.js/stepThreats()), solo il punto di partenza cambia.
    // [Decisione dell'autore: "senza bombardamenti"] `desto` (threats.js,
    // spawnThreat(): mezza volta vero anche per `air` quando non c'e' una
    // piattaforma sotto cui nascondersi, STUDIO.md) e' l'UNICO interruttore
    // che fa sganciare bombe a un `air` — forzato sempre a `false` qui, cosi'
    // il traffico aereo di questa schermata non bombarda mai, a prescindere
    // da come nasce.
    const leftEdge = camWorld.x - camWorld.worldW / 2;
    for (let i = spawnedBefore; i < threats.length; i++) {
      threats[i].x = leftEdge - THREAT_SPAWN_MARGIN;
      threats[i].desto = false;
    }
    // Niente bombe/detriti/fumo di scia da avanzare: senza `desto` nessun
    // `air` le genera mai (vedi sopra), e senza fuoco vero (nessuna torretta
    // su questa schermata) `life` non scende mai sotto il massimo — l'unica
    // fonte di `explosions` rimasta e' la scadenza naturale (`maxAge`,
    // threats.js/stepThreats()), un piccolo sbuffo quando un aereo lascia la
    // scena, non un impatto.
    stepThreats(threats, [], explosions, dt, fakeR12, [], []);
    stepExplosions(explosions, dt);
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
  // (nuvole/aerei continuano ad avanzare ogni frame in JS, ma lo sfondo
  // sfumato si aggiorna solo ogni BG_INTERVAL: piu' l'intervallo e' largo,
  // piu' il salto fra un aggiornamento e il successivo si vede, segnalato
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

    // [Nuova funzionalita', gap chiuso: STUDIO.md, "nifast"] Lo sfondo
    // sfumato di questo menu e' il mare dell'inizio del tutorial (STUDIO.md
    // §9, "sfondo menu a mare") — stessa famiglia di `match`/`tutorial`, mai
    // `match_easy`: nuvole veloci, non quelle lente.
    stepAtmosphere(atmo, dt, false, true);

    // camWorld.x/y VANNO risolti prima di updateThreats() sotto: gli riposiziona
    // i nuovi arrivi appena fuori dal bordo sinistro vero di QUESTO frame
    // (vedi il commento su THREAT_SPAWN_MARGIN sopra), non quello del frame
    // precedente.
    camWorld.x = CAM_CENTER.x + Math.sin((elapsed / CAM_PERIOD) * Math.PI * 2) * CAM_DRIFT.x;
    camWorld.y = CAM_CENTER.y + Math.cos((elapsed / CAM_PERIOD) * Math.PI * 2) * CAM_DRIFT.y;
    updateThreats(dt);

    r.beginFrame(canvas.width, canvas.height);
    bgT += dt;
    if (bgT >= BG_INTERVAL || !blurTex) {
      bgT = 0;
      const bgStart = performance.now();
      const amb = ambientAt(elapsed);
      const cw = canvas.clientWidth, ch = canvas.clientHeight;

      // --- mare (schermo, tassello seamless, tilt sx/dx) ---
      r.setAmbient(1, 1, 1);
      r.setProjection(screenProjection(cw, ch));
      const seaFrame = frameFor("tuto_sfondo", 0, true);
      if (seaFrame) {
        const tilt = Math.sin((elapsed / SEA_TILT_PERIOD) * Math.PI * 2) * SEA_TILT_AMPLITUDE;
        const offsetX = ((tilt % seaFrame.w) + seaFrame.w) % seaFrame.w;
        const seaTint = mulTint(0xffffff, amb);
        for (let y = 0; y < ch; y += seaFrame.h) {
          for (let x = -seaFrame.w + offsetX; x < cw; x += seaFrame.w) r.draw(seaFrame, x, y, 1, seaTint, 1);
        }
      }
      r.flush();

      // --- layer dinamico: nuvole/uccelli/aerei, camera mondo (posizioni e
      // margini di spawn condivisi con atmosphere.js/threats.js) ---
      r.setProjection(camWorld.projection());
      const dynamic = [];
      for (const c of atmo.clouds) dynamic.push({ obj: "decor", x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr) });
      for (const b of atmo.birds) dynamic.push({ obj: "decor", x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr) });
      for (const th of threats) dynamic.push({ obj: "decor", x: th.x, y: th.y, depth: th.depth, _f: frameFor(th.spr), _scale: th.scale });
      for (const ex of explosions) {
        const fi = Math.min(EXPLOSION_FRAME_COUNT - 1, Math.floor(ex.t / TICK));
        dynamic.push({ obj: "decor", x: ex.x, y: ex.y, depth: -4000, _f: frameFor(ex.spr, fi), _scale: ex.scale });
      }
      const frameList = dynamic.sort(sortWorld);
      const vw = camWorld.worldW, vh = camWorld.worldH;
      const l = camWorld.x - vw / 2, t = camWorld.y - vh / 2, rt = l + vw, bt = t + vh;
      for (const it of frameList) {
        const f = it._f;
        if (!f) continue;
        const x0 = it.x - f.ox, y0 = it.y - f.oy;
        if (x0 > rt || y0 > bt || x0 + f.w < l || y0 + f.h < t) continue;
        r.draw(f, it.x, it.y, it._scale ?? 1, mulTint(0xffffff, amb), 1);
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
