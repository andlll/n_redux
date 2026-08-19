// La title screen — [C] src/rooms/title.json: tre bottoni (`standma`/
// "Match", `easma`/"Match Facile", `me3`/"Tutorial") + un banner laterale
// (`gogirrra`) + un piccolo logo animato (`eddaie`, 193 sottoimmagini vere,
// STUDIO.md — stesso principio delle esplosioni/del fumo: image_speed reale,
// non un fotogramma statico). L'autore: "c'era gia' una schermata di avvio
// nel codice base... usa il vecchio layout coi pulsanti esistenti".
//
// [C] standma|easma/Mouse_LeftPressed.gml: il tap arma un `disba` (fade nero
// a schermo intero) e 30 tick dopo chiama `action_load_game("nimsav"|
// "nimsav_eas")` — non un semplice `room_goto`: il gioco vero riparte da un
// salvataggio se esiste, altrimenti da zero. Qui equivale a navigare su
// `index.html?room=match|match_easy&autoload=1` (game/src/main.js legge
// `autoload` e chiama `doLoad()` una sola volta all'avvio, save.js gia'
// mappa "nimsav"/"nimsav_eas" sugli stessi due slot). [C] `me3/Mouse_
// LeftPressed.gml` invece va dritto alla room "tutorial" (`action_another_
// room`), un'intera modalita' a parte mai ricostruita: fuori scopo per
// questo giro (STUDIO.md), il bottone resta presente (il layout lo vuole)
// ma il tap si limita a un messaggio.
import { Renderer, loadTexture, makeSolidTexture, solidFrame } from "./gl.js";
import { Camera } from "./camera.js";
import { Input } from "./input.js";

const canvas = document.getElementById("view");
const r = new Renderer(canvas);
const gl = r.gl;
const cam = new Camera();
const input = new Input(canvas);
const SOLID = solidFrame(makeSolidTexture(gl), 1, 1);

const scene = await fetch("./data/title.scene.json").then((x) => x.json());
const atlas = await fetch("./data/title.atlas.json").then((x) => x.json());
const pageTex = await Promise.all(atlas.pages.map((p) => loadTexture(gl, "./assets/" + p.file)));

function frameFor(sprName, frameIdx = 0) {
  const frames = atlas.sprites[sprName];
  if (!frames || !frames.length) return null;
  const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
  return { tex: pageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1, w: f.w, h: f.h, ox: f.ox, oy: f.oy };
}
function frameCountFor(sprName) { return atlas.sprites[sprName]?.length ?? 1; }

// [C] eddaie/Create.gml: `action_sprite_set(provamose, 0, 0.5)` — 193 frame
// veri a mezza velocita' (STUDIO.md, stesso principio di esplosioni/scia di
// fumo: `Math.floor(t*speed) % frameCount`, un loop vero non un solo frame).
const EDDAIE_FPS = 0.5 * 60;
const eddaieFrameCount = frameCountFor("provamose");

// Bottoni cliccabili — solo quelli con un'azione reale (standma/easma/me3).
// Il rettangolo di hit-test usa lo stesso ox/oy/w/h gia' nel JSON (origine
// del pulsante, non il centro): coerente con inFrameRect() di main.js.
const BUTTONS = scene.instances.filter((it) => ["standma", "easma", "me3"].includes(it.obj));
for (const b of BUTTONS) b._f = frameFor(b.spr);
const OTHER = scene.instances.filter((it) => !["standma", "easma", "me3"].includes(it.obj));
for (const it of OTHER) it._f = frameFor(it.spr);

// [C] title.json, views[0]: (967,0,540,1086) — una fetta verticale della
// room 2560x1440, centrata sulla colonna di bottoni (tutti a x≈1235). La
// title screen non si panna/zooma mai: una camera fissa, tarata sulla
// stessa fetta invece di inseguire la finestra reale come cam.resize() fa
// nel gioco vero.
cam.bounds = { left: 0, top: 0, right: scene.width, bottom: scene.height };
cam.x = 1235;
cam.y = 543;
cam.minZoom = cam.maxZoom = 1;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  cam.resize(canvas.clientWidth, canvas.clientHeight);
  // Adatta lo zoom cosi' la colonna di bottoni (alta ~1086px, com'era la
  // vista originale) entri sempre nell'altezza disponibile, con un margine.
  const fitZoom = 1086 / cam.viewH;
  cam.minZoom = cam.maxZoom = fitZoom * 1.08;
  cam.setZoomImmediate(cam.minZoom);
}
window.addEventListener("resize", resize);
resize();

/** true se il punto MONDO (wx,wy) cade dentro il rettangolo del bottone. */
function hitButton(b, wx, wy) {
  const f = b._f;
  if (!f) return false;
  return wx >= b.x - f.ox && wx <= b.x - f.ox + f.w && wy >= b.y - f.oy && wy <= b.y - f.oy + f.h;
}

let message = "";
let messageT = 0;
// Fade nero verso il gioco vero — [C] disba/Create.gml: cresce a schermo
// intero e resta 30 tick prima di far scattare il caricamento (qui la
// navigazione vera). `navigateTo`: null finche' nessun bottone e' stato
// toccato.
let fadeT = 0;
const FADE_DUR = 0.5;
let navigateTo = null;

input.onTap = (sx, sy) => {
  if (navigateTo) return;   // gia' in transizione, ignora altri tocchi
  const w = cam.screenToWorld(sx, sy);
  for (const b of BUTTONS) {
    if (!hitButton(b, w.x, w.y)) continue;
    if (b.obj === "standma") { navigateTo = "index.html?room=match&autoload=1"; fadeT = 0; }
    else if (b.obj === "easma") { navigateTo = "index.html?room=match_easy&autoload=1"; fadeT = 0; }
    else { message = "tutorial non ancora implementato"; messageT = 2.5; }
    break;
  }
};

let last = performance.now();
function frame(now) {
  const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
  last = now;

  if (navigateTo) {
    fadeT += dt;
    if (fadeT >= FADE_DUR) { location.href = navigateTo; return; }
  }
  if (messageT > 0) messageT -= dt;

  r.beginFrame(canvas.width, canvas.height);
  r.setAmbient(1, 1, 1);
  r.setProjection(cam.projection());
  const eddaieIdx = Math.floor((now / 1000) * EDDAIE_FPS) % eddaieFrameCount;
  for (const it of OTHER) {
    if (!it._f) continue;
    const f = it.obj === "eddaie" ? frameFor(it.spr, eddaieIdx) : it._f;
    r.draw(f, it.x, it.y, 1, 0xffffff, 1);
  }
  for (const b of BUTTONS) {
    if (!b._f) continue;
    r.draw(b._f, b.x, b.y, 1, 0xffffff, 1);
  }
  if (fadeT > 0) {
    const k = Math.min(1, fadeT / FADE_DUR);
    // Un quad pieno che copre tutta la vista, in spazio mondo (la camera e'
    // fissa, quindi coincide comunque con lo schermo) — stesso principio di
    // `disba` (base ingrandita 200x, un rettangolo nero pieno).
    const hw = cam.worldW / 2, hh = cam.worldH / 2;
    r.drawQuad(SOLID, { x: cam.x - hw, y: cam.y - hh }, { x: cam.x + hw, y: cam.y - hh },
      { x: cam.x + hw, y: cam.y + hh }, { x: cam.x - hw, y: cam.y + hh }, 0x000000, k);
  }
  r.flush();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

// Messaggio "tutorial non ancora implementato" — riusa lo stesso <div id
// ="hud"> del gioco vero non esiste qui (title.html non lo dichiara): un
// piccolo overlay DOM dedicato, piu' semplice di un secondo font bitmap
// caricato solo per tre parole.
const msgEl = document.createElement("div");
msgEl.style.cssText = "position:fixed;left:0;right:0;bottom:10%;text-align:center;" +
  "font:16px/1.4 ui-monospace,monospace;color:#fff;text-shadow:0 1px 3px #000;" +
  "pointer-events:none;transition:opacity 0.3s ease;opacity:0;";
document.body.appendChild(msgEl);
setInterval(() => {
  msgEl.textContent = message;
  msgEl.style.opacity = messageT > 0 ? "1" : "0";
}, 100);
