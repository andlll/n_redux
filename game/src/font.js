// Testo bitmap con i font reali dell'originale (ritagliati da
// tools/25_font.py da `data/fonts.json`), invece dei quadratini colorati
// segnaposto. STUDIO.md §7.5: l'interfaccia vive in spazio schermo,
// separata dalla camera — questo modulo non sa niente del mondo, disegna
// solo glifi a coordinate schermo con lo stesso batch del renderer.

import { loadTexture } from "./gl.js";

export async function loadFont(gl, name, dataBase = "./data/", assetsBase = "./assets/") {
  const meta = await fetch(`${dataBase}font_${name}.json`).then((r) => r.json());
  const tex = await loadTexture(gl, assetsBase + meta.file);
  return { meta, tex: tex.tex };
}

function glyphOf(font, ch) {
  return font.meta.glyphs[String(ch.charCodeAt(0))];
}

/** Larghezza in pixel schermo di `str` disegnato a `scale`. */
export function measureText(font, str, scale = 1) {
  let w = 0;
  for (const ch of str) w += (glyphOf(font, ch)?.shift ?? font.meta.emSize * 0.4) * scale;
  return w;
}

/** Disegna `str` con l'angolo in alto a sinistra in (x,y). Ritorna la larghezza disegnata. */
export function drawText(renderer, font, str, x, y, scale = 1, tint = 0xffffff, alpha = 1) {
  let cx = x;
  for (const ch of str) {
    const g = glyphOf(font, ch);
    if (!g) { cx += font.meta.emSize * 0.4 * scale; continue; }
    if (g.w > 0 && g.h > 0) {
      const frame = { tex: font.tex, u0: g.u0, v0: g.v0, u1: g.u1, v1: g.v1, w: g.w, h: g.h, ox: 0, oy: 0 };
      renderer.draw(frame, cx + g.offset * scale, y, scale, tint, alpha);
    }
    cx += g.shift * scale;
  }
  return cx - x;
}
