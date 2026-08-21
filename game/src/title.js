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
import { Renderer, loadTexture, makeSolidTexture, solidFrame, PauseBlur } from "./gl.js";
import { Camera, screenProjection } from "./camera.js";
import { Input } from "./input.js";
import { applyMatchPlatform, r120MotorDecor } from "./platform.js";
import { spawnCar, stepCars } from "./cars.js";
import { createAtmosphere, stepAtmosphere } from "./atmosphere.js";
import { createSemaphore, stepSemaphores } from "./semaphores.js";
import {
  stepThreatSpawner, stepThreats, stepBombs, stepExplosions, EXPLOSION_FRAME_COUNT,
  stepAerSmoke, AER_SMOKE_FRAME_COUNT, stepDebris,
} from "./threats.js";

const TICK = 1 / 60;
const canvas = document.getElementById("view");

// Schermata di caricamento (index.html #loading): il menu carica il proprio
// atlas PIU' un intero ritaglio di `match` per lo sfondo sfumato (sopra),
// pesante quanto un livello vero — quindi copriamo quell'attesa con logo +
// sfondo nero, esattamente come main.js faceva per i livelli. **[C]**
// STUDIO.md §3: il flusso di room originale e' `loguji` (logo Fuji) ->
// `title` (il menu) -> ...: lo splash va QUI, prima del menu — non prima dei
// livelli (game/play.html non ne mostra piu' uno, segnalato dall'autore).
// "show" fa partire subito la dissolvenza in entrata del logo; "hide"
// (chiamata sotto, al primo frame disegnato) fa la dissolvenza in uscita
// dell'intera overlay.
const loading = document.getElementById("loading");
loading.classList.add("show");
let loadingHidden = false;
function hideLoading() {
  if (loadingHidden) return;
  loadingHidden = true;
  loading.classList.add("hide");
  loading.addEventListener("transitionend", () => loading.remove(), { once: true });
}

const r = new Renderer(canvas);
const gl = r.gl;
const input = new Input(canvas);
const pauseBlur = new PauseBlur(gl);
const SOLID = solidFrame(makeSolidTexture(gl), 1, 1);

// ---------------------------------------------------------------- title UI
const scene = await fetch("./data/title.scene.json").then((x) => x.json());
const atlas = await fetch("./data/title.atlas.json").then((x) => x.json());
const pageTex = await Promise.all(atlas.pages.map((p) => loadTexture(gl, "./assets/" + p.file)));
function frameFor(sprName, frameIdx = 0) {
  const frames = atlas.sprites[sprName];
  if (!frames || !frames.length) return null;
  const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
  return { tex: pageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1, w: f.w, h: f.h, ox: f.ox, oy: f.oy };
}

const BUTTONS = scene.instances.filter((it) => ["standma", "easma", "me3"].includes(it.obj));
for (const b of BUTTONS) b._f = frameFor(b.spr);
const BANNER = scene.instances.find((it) => it.obj === "gogirrra");
BANNER._f = frameFor(BANNER.spr);

const camUI = new Camera();
camUI.bounds = { left: 0, top: 0, right: scene.width, bottom: scene.height };
camUI.x = 1235; camUI.y = 543;

// ------------------------------------------------------------- sfondo: match
const mScene = await fetch("./data/match.scene.json").then((x) => x.json());
const mAtlas = await fetch("./data/match.atlas.json").then((x) => x.json());
const mPageTex = await Promise.all(mAtlas.pages.map((p) => loadTexture(gl, "./assets/" + p.file)));
function mFrameFor(sprName, frameIdx = 0) {
  const frames = mAtlas.sprites[sprName];
  if (!frames || !frames.length) return null;
  const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
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
const worldStatic = mScene.instances.filter((it) => it.obj !== "placeholder");
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
    if (b.obj === "standma") { navigateTo = "play.html?room=match&autoload=1"; fadeT = 0; }
    else if (b.obj === "easma") { navigateTo = "play.html?room=match_easy&autoload=1"; fadeT = 0; }
    else { message = "tutorial non ancora implementato"; messageT = 2.5; }
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
  const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
  last = now;
  elapsed += dt;

  if (navigateTo) {
    fadeT += dt;
    if (fadeT >= FADE_DUR) { location.href = navigateTo; return; }
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
}
requestAnimationFrame(frame);

const msgEl = document.createElement("div");
msgEl.style.cssText = "position:fixed;left:0;right:0;bottom:10%;text-align:center;" +
  "font:16px/1.4 ui-monospace,monospace;color:#fff;text-shadow:0 1px 3px #000;" +
  "pointer-events:none;transition:opacity 0.3s ease;opacity:0;";
document.body.appendChild(msgEl);
setInterval(() => {
  msgEl.textContent = message;
  msgEl.style.opacity = messageT > 0 ? "1" : "0";
}, 100);
