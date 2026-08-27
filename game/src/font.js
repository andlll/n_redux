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

/**
 * Arrotonda `scale` all'intero (minimo 1) piu' vicino — insieme al filtro
 * NEAREST dell'atlas (loadFont(), sotto), e' quello che rende il font
 * davvero "pixel perfect": ogni texel dell'atlas finisce disegnato come un
 * blocco NxN di pixel schermo tutti della stessa dimensione. Una `scale`
 * frazionaria (es. 2.4, usata prima qui dal menu di pausa) fa scattare
 * il campionamento NEAREST fra un blocco da 2 e uno da 3 pixel a seconda
 * della frazione accumulata da un glifo all'altro: e' esattamente il "font
 * raster sgranato" segnalato dall'autore, non un problema di filtro (gia'
 * corretto altrove, vedi gl.js/loadTexture()) ma di scala non intera.
 * measureText() usa la stessa funzione cosi' la larghezza misurata (usata
 * ovunque per centrare titoli/etichette) corrisponde sempre esattamente a
 * quella disegnata da drawText().
 */
function pixelPerfectScale(scale) {
  return Math.max(1, Math.round(scale));
}

/** Larghezza in pixel schermo di `str` disegnato a `scale`. */
export function measureText(font, str, scale = 1) {
  const s = pixelPerfectScale(scale);
  let w = 0;
  for (const ch of str) w += (glyphOf(font, ch)?.shift ?? font.meta.emSize * 0.4) * s;
  return w;
}

/** Piu' grande scala intera (fino a `maxScale`) per cui `str` non supera
 * `maxWidth` — utile per titoli/etichette a scala fissa (menu di pausa,
 * main.js) che devono restare grandi e nitidi quando c'e' spazio ma non
 * uscire dal bottone/pannello con un'etichetta lunga o su schermi stretti
 * (mobile, STUDIO.md). Scala sempre intera (pixelPerfectScale() sopra):
 * niente via di mezzo frazionaria "che quasi ci sta". */
export function fitTextScale(font, str, maxWidth, maxScale = 2) {
  for (let s = maxScale; s > 1; s--) {
    if (measureText(font, str, s) <= maxWidth) return s;
  }
  return 1;
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
  const s = pixelPerfectScale(scale);
  let cx = x;
  for (const ch of str) {
    const g = glyphOf(font, ch);
    if (!g) { cx += font.meta.emSize * 0.4 * s; continue; }
    if (g.w > 0 && g.h > 0) {
      const frame = { tex: font.tex, u0: g.u0, v0: g.v0, u1: g.u1, v1: g.v1, w: g.w, h: g.h, ox: 0, oy: 0 };
      renderer.draw(frame, Math.round(cx + g.offset * s), Math.round(y), s, tint, alpha);
    }
    cx += g.shift * s;
  }
  return cx - x;
}
