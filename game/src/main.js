import { Renderer, makeSolidTexture, solidFrame } from "./gl.js";
import { Camera, screenProjection } from "./camera.js";
import { Input } from "./input.js";

const canvas = document.getElementById("view");
const hud = document.getElementById("hud");
const r = new Renderer(canvas);
const gl = r.gl;
const white = makeSolidTexture(gl);
const cam = new Camera();
const input = new Input(canvas);

// ---------------------------------------------------------------- scena
const scene = await fetch("./data/match_easy.scene.json").then((x) => x.json());
cam.bounds = { left: 0, top: 0, right: scene.width, bottom: scene.height };
cam.x = scene.width / 2;
cam.y = scene.height / 2;
cam.maxZoom = 8;
cam.minZoom = 0.25;
// Finche' non tocchi niente la camera inquadra tutta la room, e si riadatta
// se lo schermo cambia (rotazione del telefono).
let userMoved = false;

// Ordinamento dichiarato una volta sola: prima il layer (depth), poi la y.
// Nell'originale era `depth = -y` sparso dentro i singoli oggetti.
const world = scene.instances.slice().sort((a, b) => (b.depth - a.depth) || (a.y - b.y));

// colore stabile per nome oggetto, finche' non abbiamo gli atlas veri
function colorFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  const hue = ((h % 360) + 360) % 360;
  const f = (n) => {
    const k = (n + hue / 30) % 12;
    const c = 0.55 - 0.35 * Math.max(-1, Math.min(Math.min(k - 3, 9 - k), 1));
    return Math.round(c * 255);
  };
  return (f(0) << 16) | (f(8) << 8) | f(4);
}
for (const it of world) it._c = colorFor(it.obj);

// ------------------------------------------------- ciclo giorno/notte
// Nell'originale: 8 alarm che ricoloravano ~24 gruppi di oggetti uno per uno.
// Qui: una fase, un colore, applicato a tutto dal fragment shader.
const PHASES = [
  { name: "giorno", rgb: [1.00, 1.00, 1.00], dur: 14 },
  { name: "tramonto", rgb: [1.00, 0.82, 0.62], dur: 5 },
  { name: "notte", rgb: [0.45, 0.52, 0.82], dur: 12 },
  { name: "alba", rgb: [0.92, 0.80, 0.78], dur: 5 },
];
let phaseT = 0;
function ambientAt(t) {
  const total = PHASES.reduce((s, p) => s + p.dur, 0);
  let u = t % total;
  let i = 0;
  while (u > PHASES[i].dur) { u -= PHASES[i].dur; i = (i + 1) % PHASES.length; }
  const a = PHASES[i], b = PHASES[(i + 1) % PHASES.length];
  const k = Math.min(1, u / a.dur);
  const s = k * k * (3 - 2 * k);                    // smoothstep
  return {
    rgb: a.rgb.map((v, j) => v + (b.rgb[j] - v) * s),
    label: k < 0.75 ? a.name : a.name + " → " + b.name,
  };
}

// ---------------------------------------------------------------- input
input.onDrag = (dx, dy) => { userMoved = true; cam.panByScreen(dx, dy); };
input.onZoom = (f, ax, ay) => { userMoved = true; cam.setZoom(cam.zoom * f, ax, ay); };
let picked = null;
input.onTap = (sx, sy) => {
  const w = cam.screenToWorld(sx, sy);
  picked = null;
  for (let i = world.length - 1; i >= 0; i--) {
    const it = world[i];
    if (!it.w) continue;
    const sxx = it.sx ?? 1, syy = it.sy ?? 1;
    const x0 = it.x - (it.ox ?? 0) * sxx, y0 = it.y - (it.oy ?? 0) * syy;
    if (w.x >= x0 && w.x <= x0 + it.w * sxx && w.y >= y0 && w.y <= y0 + it.h * syy) {
      picked = it;
      break;
    }
  }
};

// ---------------------------------------------------------------- loop
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w; canvas.height = h;
  }
  cam.resize(canvas.clientWidth, canvas.clientHeight);
  if (!userMoved && canvas.clientWidth > 0) {
    cam.zoom = Math.max(scene.width / cam.viewW, scene.height / cam.viewH);
    cam.x = scene.width / 2;
    cam.y = scene.height / 2;
  }
  cam.clamp();
}

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  phaseT += dt;
  resize();

  r.beginFrame(canvas.width, canvas.height);
  const amb = ambientAt(phaseT);

  // --- layer mondo: segue la camera, tinto dal ciclo giorno/notte
  r.setAmbient(amb.rgb[0], amb.rgb[1], amb.rgb[2]);
  r.setProjection(cam.projection());
  let drawn = 0;
  const vw = cam.worldW, vh = cam.worldH;
  const l = cam.x - vw / 2, t = cam.y - vh / 2, rr = l + vw, bb = t + vh;
  for (const it of world) {
    const w = it.w ?? 48, h = it.h ?? 48;
    const sx = it.sx ?? 1, sy = it.sy ?? 1;
    const x0 = it.x - (it.ox ?? 0) * sx, y0 = it.y - (it.oy ?? 0) * sy;
    if (x0 > rr || y0 > bb || x0 + w * sx < l || y0 + h * sy < t) continue;   // culling
    const f = solidFrame(white, w * sx, h * sy);
    r.draw(f, x0, y0, 1, it.tint ?? it._c, it === picked ? 1 : 0.85);
    drawn++;
  }
  r.flush();

  // --- layer GUI: spazio schermo, dimensione costante, nessuna tinta
  r.setAmbient(1, 1, 1);
  r.setProjection(screenProjection(canvas.clientWidth, canvas.clientHeight));
  const barH = 64;
  r.draw(solidFrame(white, canvas.clientWidth, barH), 0,
         canvas.clientHeight - barH, 1, 0x111a2e, 0.92);
  for (let i = 0; i < 5; i++) {
    r.draw(solidFrame(white, 44, 44), 12 + i * 54, canvas.clientHeight - barH + 10,
           1, [0x4f7fd0, 0x53a06a, 0xc9a44a, 0xb05a5a, 0x7a5ab0][i], 1);
  }
  r.flush();

  hud.textContent =
    `${scene.name}  ${scene.width}x${scene.height}\n` +
    `istanze ${world.length}  disegnate ${drawn}  drawcall ${r.drawCalls}\n` +
    `zoom ${cam.zoom.toFixed(2)}  camera ${cam.x.toFixed(0)},${cam.y.toFixed(0)}\n` +
    `fase ${amb.label}\n` +
    (picked ? `selezionato: ${picked.obj}${picked.spr ? " [" + picked.spr + "]" : ""}` : "trascina, rotella/pinch, tap");

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// aggancio di debug, comodo per ispezionare senza aspettare il ciclo
window.__nimbus = {
  cam, scene, world,
  setPhase: (t) => { phaseT = t; },
  phases: PHASES,
};
