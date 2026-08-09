// Camera 2D: pan + zoom veri (cambia la porzione di mondo inquadrata),
// esattamente come faceva `hyposet` scrivendo view_wview/view_hview.
//
// zoom = quanti pixel di mondo stanno in un pixel di schermo.
// zoom piu' grande => si vede piu' mondo (rimpicciolito). E' la stessa
// convenzione di global.sca nell'originale.

export class Camera {
  constructor() {
    this.x = 0;                 // centro della vista, in coordinate mondo
    this.y = 0;
    this.zoom = 1;
    this.minZoom = 0.4;
    this.maxZoom = 3;
    this.bounds = null;         // {left, top, right, bottom} in coordinate mondo
    this.viewW = 1;             // dimensione viewport in pixel schermo
    this.viewH = 1;
  }

  resize(w, h) { this.viewW = w; this.viewH = h; }

  /** larghezza/altezza di mondo attualmente inquadrate */
  get worldW() { return this.viewW * this.zoom; }
  get worldH() { return this.viewH * this.zoom; }

  setZoom(z, anchorSx, anchorSy) {
    const nz = Math.min(this.maxZoom, Math.max(this.minZoom, z));
    if (nz === this.zoom) return;
    if (anchorSx === undefined) { this.zoom = nz; this.clamp(); return; }
    // mantiene fermo il punto di mondo sotto l'ancora (pinch / rotella)
    const before = this.screenToWorld(anchorSx, anchorSy);
    this.zoom = nz;
    const after = this.screenToWorld(anchorSx, anchorSy);
    this.x += before.x - after.x;
    this.y += before.y - after.y;
    this.clamp();
  }

  panByScreen(dxs, dys) {
    this.x -= dxs * this.zoom;
    this.y -= dys * this.zoom;
    this.clamp();
  }

  clamp() {
    const b = this.bounds;
    if (!b) return;
    const hw = this.worldW / 2, hh = this.worldH / 2;
    const bw = b.right - b.left, bh = b.bottom - b.top;
    // se il mondo e' piu' stretto della vista, si centra invece di incastrarsi
    this.x = bw <= this.worldW ? (b.left + b.right) / 2
                               : Math.min(b.right - hw, Math.max(b.left + hw, this.x));
    this.y = bh <= this.worldH ? (b.top + b.bottom) / 2
                               : Math.min(b.bottom - hh, Math.max(b.top + hh, this.y));
  }

  screenToWorld(sx, sy) {
    return {
      x: this.x + (sx - this.viewW / 2) * this.zoom,
      y: this.y + (sy - this.viewH / 2) * this.zoom,
    };
  }

  worldToScreen(wx, wy) {
    return {
      x: (wx - this.x) / this.zoom + this.viewW / 2,
      y: (wy - this.y) / this.zoom + this.viewH / 2,
    };
  }

  /** mondo -> clip, column-major 3x3 per il vertex shader */
  projection() {
    const sx = 2 / this.worldW, sy = -2 / this.worldH;
    return new Float32Array([
      sx, 0, 0,
      0, sy, 0,
      -this.x * sx, -this.y * sy, 1,
    ]);
  }
}

/** schermo -> clip: per la GUI, che non deve sapere niente della camera */
export function screenProjection(w, h) {
  return new Float32Array([
    2 / w, 0, 0,
    0, -2 / h, 0,
    -1, 1, 1,
  ]);
}
