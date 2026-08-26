// Testo bitmap con i font reali dell'originale (ritagliati da
// tools/25_font.py da `data/fonts.json`), invece dei quadratini colorati
// segnaposto. STUDIO.md §7.5: l'interfaccia vive in spazio schermo,
// separata dalla camera — questo modulo non sa niente del mondo, disegna
// solo glifi a coordinate schermo con lo stesso batch del renderer.

import { loadTexture } from "./gl.js";

export async function loadFont(gl, name, dataBase = "./data/", assetsBase = "./assets/") {
  const meta = await fetch(`${dataBase}font_${name}.json`).then((r) => r.json());
  // `nearest: true` (gl.js/loadTexture()) — vedi il commento li' per il
  // "sgranato" corretto: un atlas di glifi disegnato in spazio schermo non
  // scala mai, quindi non ha bisogno (ne' beneficio) del filtro LINEAR
  // morbido usato per gli sprite del mondo.
  const tex = await loadTexture(gl, assetsBase + meta.file, { nearest: true });
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

/** Disegna `str` con l'angolo in alto a sinistra in (x,y). Ritorna la larghezza disegnata.
 * Ogni glifo e' disegnato ad una posizione arrotondata al pixel intero
 * (`Math.round`, sulla posizione di disegno soltanto — l'avanzamento `cx`
 * resta frazionario, cosi' l'arrotondamento di un glifo non si accumula sui
 * successivi): col filtro NEAREST del font (loadFont(), sopra) un
 * posizionamento frazionario farebbe scattare il campionamento fra un texel
 * e il vicino ad ogni frazione di pixel di troppo, uno sfarfallio/tremolio
 * dei bordi invece di un glifo fermo e netto. */
export function drawText(renderer, font, str, x, y, scale = 1, tint = 0xffffff, alpha = 1) {
  let cx = x;
  for (const ch of str) {
    const g = glyphOf(font, ch);
    if (!g) { cx += font.meta.emSize * 0.4 * scale; continue; }
    if (g.w > 0 && g.h > 0) {
      const frame = { tex: font.tex, u0: g.u0, v0: g.v0, u1: g.u1, v1: g.v1, w: g.w, h: g.h, ox: 0, oy: 0 };
      renderer.draw(frame, Math.round(cx + g.offset * scale), Math.round(y), scale, tint, alpha);
    }
    cx += g.shift * scale;
  }
  return cx - x;
}
