import { Renderer, makeSolidTexture, solidFrame, loadTexture } from "./gl.js";
import { Camera, screenProjection } from "./camera.js";
import { Input } from "./input.js";
import { createR12, tickR12 } from "./state.js";
import { BUILDING_TYPES, placeBuilding, canAfford, tryStartUpgrade, stepConstructions, nextUpgrade, upgradeUnlocked } from "./buildings.js";
import { save, load } from "./save.js";

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
const sortWorld = (a, b) => (b.depth - a.depth) || (a.y - b.y);
const staticWorld = scene.instances.slice().sort(sortWorld);

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
for (const it of staticWorld) it._c = colorFor(it.obj);

// ---------------------------------------------------------------- atlas
// Le pagine sono reimpacchettate per room da tools/23_atlas.py + 24_blit.py:
// quelle originali di GameMaker sparpagliavano 13 sprite su 12 pagine.
// L'atlas include anche gli sprite di gameplay (edifici, cantieri: vedi
// GAMEPLAY_SPRITES in 23_atlas.py) che non stanno ferme in nessuna room
// perche' e' il giocatore a farle comparire.
const atlas = await fetch("./data/match_easy.atlas.json").then((x) => x.json());
const pageTex = await Promise.all(
  atlas.pages.map((p) => loadTexture(gl, "./assets/" + p.file))
);
function frameFor(sprName) {
  const frames = atlas.sprites[sprName];
  if (!frames || !frames.length) return null;
  const f = frames[0];
  return { tex: pageTex[f.p].tex, u0: f.u0, v0: f.v0, u1: f.u1, v1: f.v1,
           w: f.w, h: f.h, ox: f.ox, oy: f.oy };
}
for (const it of staticWorld) it._f = frameFor(it.spr);
const missingArt = staticWorld.filter((it) => !it._f).length;

// -------------------------------------------------------- piazzabili e edifici
// I `placeholder` della room sono "gli spazi vuoti dove il giocatore piazza
// gli edifici" (STUDIO.md §6, confermato dall'autore). Nell'originale
// diventano un edificio vero al tocco, tramite una ruota di scelta
// (`cre1..cre4`) che non abbiamo ancora ricostruito: per ora ogni
// placeholder piazza sempre una `chies` (STUDIO.md §5.3), l'unico edificio
// di cui abbiamo ricostruito l'intera catena piazzamento -> potenziamento
// leggendo `chies`, `upcrc12` e `upcrc23` decompilati.
const placeholders = staticWorld.filter((it) => it.obj === "placeholder");
for (const p of placeholders) { p.id = `ph_${p.x}_${p.y}`; p.consumed = false; }
const placeholderById = new Map(placeholders.map((p) => [p.id, p]));

/** @type {ReturnType<typeof placeBuilding>[]} */
let buildings = [];
let decorEntities = [];      // ornamenti permanenti spawnati a fine cantiere
let r12 = createR12();

// Il decoro (`cddvd`/`cddvd2`/`cddvd3*`) non si accumula: ogni salto di
// livello uccide il decoro precedente e ne crea uno nuovo (`with (cddvd) {
// action_kill_object(); }` dentro upcrc12/upcrc23). Qui equivale a
// rimpiazzare tutte le entita' decoro di quell'edificio.
function spawnDecor(building, decorSprites) {
  decorEntities = decorEntities.filter((d) => d.buildingId !== building.id);
  for (const spr of decorSprites) {
    decorEntities.push({
      obj: "decor", buildingId: building.id,
      x: building.x, y: building.y, depth: building.depth - 1,
      spr, _f: frameFor(spr),
    });
  }
}

function placeAt(placeholder) {
  const def = BUILDING_TYPES.chies;
  if (!canAfford(r12, def.placeCost)) {
    return `serve ${def.placeCost.mon} mon (hai ${r12.mon.toFixed(0)})`;
  }
  for (const k in def.placeCost) r12[k] -= def.placeCost[k];
  placeholder.consumed = true;
  const b = placeBuilding("chies", placeholder.x, placeholder.y, placeholder.depth);
  buildings.push(b);
  spawnDecor(b, ["crcl"]);   // chies/Create.gml: action_create_object(cddvd, 0, 0)
  return null;
}

// -------------------------------------------------------------- salvataggio
// Serializzazione esplicita fin da subito (STUDIO.md §5.6/§7.1): lo stato
// che conta e' gia' dati semplici, quindi non c'e' uno snapshot binario da
// imitare, solo JSON. Stessi nomi di slot dell'originale ("nimsav_eas" per
// la mappa facile). Autosave periodico + tasti S/L per salvare/caricare a
// mano mentre si sviluppa.
function doSave() { save(scene.name, r12, buildings); }
function doLoad() {
  const data = load(scene.name);
  if (!data) return false;
  r12 = data.r12;
  buildings = data.buildings;
  decorEntities = [];
  const usedIds = new Set();
  for (const b of buildings) {
    // ricostruisce quale placeholder e' occupato dalla posizione salvata
    const ph = placeholders.find((p) => !usedIds.has(p.id) && p.x === b.x && p.y === b.y);
    if (ph) { ph.consumed = true; usedIds.add(ph.id); }
    spawnDecor(b, ["crcl"]);
    if (b.level >= 2) spawnDecor(b, BUILDING_TYPES.chies.upgrades[0].decor);
    if (b.level >= 3) spawnDecor(b, BUILDING_TYPES.chies.upgrades[1].decor);
  }
  return true;
}
doLoad();

window.addEventListener("keydown", (e) => {
  if (e.key === "s" || e.key === "S") { doSave(); message = "partita salvata"; messageT = 3; }
  if (e.key === "l" || e.key === "L") {
    const ok = doLoad();
    if (ok) picked = null;   // il riferimento selezionato apparteneva allo stato precedente
    message = ok ? "partita caricata" : "nessun salvataggio";
    messageT = 3;
  }
});
let autosaveT = 0;

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
let message = "";
let messageT = 0;

input.onTap = (sx, sy) => {
  const w = cam.screenToWorld(sx, sy);
  picked = null;
  // frameList e' ricostruita ad ogni frame di disegno: e' la stessa lista,
  // gia' ordinata top-most-last, che serve per il picking.
  for (let i = frameList.length - 1; i >= 0; i--) {
    const it = frameList[i];
    // il decoro (cddvd*) e' puramente visivo: nell'originale non aveva
    // eventi Mouse propri, quindi qui non deve "rubare" il tocco a chies.
    if (!it._f || it.obj === "decor") continue;
    const x0 = it.x - it._f.ox, y0 = it.y - it._f.oy;
    if (w.x >= x0 && w.x <= x0 + it._f.w && w.y >= y0 && w.y <= y0 + it._f.h) {
      picked = it;
      break;
    }
  }
  if (!picked) return;
  message = ""; messageT = 0;
  if (picked.obj === "placeholder" && !picked.consumed) {
    const err = placeAt(picked);
    message = err ?? `chiesa piazzata (-${BUILDING_TYPES.chies.placeCost.mon} mon)`;
    messageT = 3;
  } else if (picked.obj === "building") {
    const err = tryStartUpgrade(picked.ref, r12);
    message = err ?? "cantiere avviato";
    messageT = 3;
  }
};

/** Confronta per identita' logica: gli edifici sono incapsulati in un
 * wrapper nuovo ad ogni frame (lo sprite cambia durante il cantiere),
 * quindi il confronto va fatto sull'entita' vera (`ref`), non sul wrapper. */
function isPicked(it) {
  if (!picked) return false;
  if (it === picked) return true;
  return it.obj === "building" && picked.obj === "building" && it.ref === picked.ref;
}

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

let frameList = staticWorld;   // lista dell'ultimo frame disegnato, usata anche dal picking
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  phaseT += dt;
  resize();

  // --- simulazione: cantieri, economia, autosave
  stepConstructions(buildings, dt, spawnDecor);
  tickR12(r12, dt, buildings);
  if (messageT > 0) messageT -= dt;
  autosaveT += dt;
  if (autosaveT > 15) { autosaveT = 0; doSave(); }

  // --- lista di disegno di questo frame: mondo statico (placeholder consumati
  // esclusi) + edifici (sprite ricalcolato: cambia durante il cantiere) + decoro
  const dynamic = [];
  for (const b of buildings) {
    dynamic.push({ obj: "building", ref: b, x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr) });
  }
  for (const d of decorEntities) dynamic.push(d);
  frameList = staticWorld.filter((it) => !(it.obj === "placeholder" && it.consumed))
    .concat(dynamic).sort(sortWorld);

  r.beginFrame(canvas.width, canvas.height);
  const amb = ambientAt(phaseT);

  // --- layer mondo: segue la camera, tinto dal ciclo giorno/notte
  r.setAmbient(amb.rgb[0], amb.rgb[1], amb.rgb[2]);
  r.setProjection(cam.projection());
  let drawn = 0;
  const vw = cam.worldW, vh = cam.worldH;
  const l = cam.x - vw / 2, t = cam.y - vh / 2, rr = l + vw, bb = t + vh;
  for (const it of frameList) {
    const f = it._f;
    if (f) {
      const x0 = it.x - f.ox, y0 = it.y - f.oy;
      if (x0 > rr || y0 > bb || x0 + f.w < l || y0 + f.h < t) continue;
      const tint = isPicked(it) ? 0xbfe0ff : 0xffffff;
      r.draw(f, it.x, it.y, 1, tint, 1);
    } else {
      // istanze senza sprite: controller invisibili, li mostro come marcatori
      const s = 24;
      if (it.x > rr + s || it.y > bb + s || it.x < l - s || it.y < t - s) continue;
      r.draw(solidFrame(white, s, s), it.x - s / 2, it.y - s / 2, 1, it._c, 0.35);
    }
    drawn++;
  }
  r.flush();

  // --- layer GUI: spazio schermo, dimensione costante, nessuna tinta
  r.setAmbient(1, 1, 1);
  r.setProjection(screenProjection(canvas.clientWidth, canvas.clientHeight));
  const barH = 64;
  r.draw(solidFrame(white, canvas.clientWidth, barH), 0,
         canvas.clientHeight - barH, 1, 0x111a2e, 0.92);
  const stats = [
    ["olio", Math.round(r12.oil), 0xc9a44a],
    ["mon", Math.round(r12.mon), 0x53a06a],
    ["pop", Math.round(r12.pop), 0x4f7fd0],
    ["ele", Math.round(r12.ele), 0xb05a5a],
  ];
  for (let i = 0; i < stats.length; i++) {
    r.draw(solidFrame(white, 44, 44), 12 + i * 54, canvas.clientHeight - barH + 10,
           1, stats[i][2], 1);
  }
  r.flush();

  // --- HUD testuale di debug: le barre vere (numeri, icone) sono un layer
  // a parte da fare quando l'atlas della UI sara' importato.
  let status = "";
  if (picked?.obj === "building") {
    const b = picked.ref;
    const up = nextUpgrade(b);
    status = `${BUILDING_TYPES[b.type].label} livello ${b.level}  vita ${b.life}`;
    if (b.construction) status += `  [cantiere in corso]`;
    else if (up) status += upgradeUnlocked(b, r12)
      ? `  potenziamento pronto (${Object.entries(up.cost).map(([k, v]) => v + " " + k).join(", ")})`
      : `  prossimo potenziamento a pop ${up.atPop}`;
  } else if (picked?.obj === "placeholder") {
    status = picked.consumed ? "occupato" : `vuoto — tocca per costruire (${BUILDING_TYPES.chies.placeCost.mon} mon)`;
  } else if (picked) {
    status = `${picked.obj}${picked.spr ? " [" + picked.spr + "]" : ""}`;
  }

  hud.textContent =
    `${scene.name}  ${scene.width}x${scene.height}\n` +
    `istanze ${frameList.length}  disegnate ${drawn}  drawcall ${r.drawCalls}\n` +
    `atlas ${atlas.pages.length} pagine  senza sprite ${missingArt}\n` +
    `zoom ${cam.zoom.toFixed(2)}  camera ${cam.x.toFixed(0)},${cam.y.toFixed(0)}\n` +
    `fase ${amb.label}  edifici ${buildings.length}\n` +
    (status ? status + "\n" : "") +
    (messageT > 0 ? message + "\n" : "") +
    `trascina, rotella/pinch, tap — [S] salva [L] carica`;

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.addEventListener("beforeunload", doSave);

// aggancio di debug, comodo per ispezionare senza aspettare il ciclo
window.__nimbus = {
  cam, scene, get world() { return frameList; }, get buildings() { return buildings; }, get r12() { return r12; },
  setPhase: (t) => { phaseT = t; },
  phases: PHASES,
  save: doSave, load: doLoad,
};
