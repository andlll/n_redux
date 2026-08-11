// Camera 2D: pan + zoom veri (cambia la porzione di mondo inquadrata),
// esattamente come faceva `hyposet` scrivendo view_wview/view_hview.
//
// zoom = quanti pixel di mondo stanno in un pixel di schermo.
// zoom piu' grande => si vede piu' mondo (rimpicciolito). E' la stessa
// convenzione di global.sca nell'originale.

// Quanto rapidamente `zoom` insegue `targetZoom`: piu' alto = piu' pronto.
// L'originale non aveva questo problema perche' zoom_plus/zoom_minus
// avanzavano gia' gradualmente da soli (STUDIO.md §2, "0,005 per frame");
// la rotella del mouse invece qui applicava l'intero salto in un frame
// solo, "scattoso". ZOOM_EASE e' la sua controparte per un input istantaneo.
const ZOOM_EASE = 12;

export class Camera {
  constructor() {
    this.x = 0;                 // centro della vista, in coordinate mondo
    this.y = 0;
    this.zoom = 1;
    this.targetZoom = 1;        // dove sta andando `zoom`, aggiornato all'istante da setZoom()
    this.minZoom = 0.4;
    this.maxZoom = 3;
    this.bounds = null;         // {left, top, right, bottom} in coordinate mondo
    this.viewW = 1;             // dimensione viewport in pixel schermo
    this.viewH = 1;
    this._anchor = null;        // { sx, sy, wx, wy }: punto di mondo da tenere fermo mentre si anima
  }

  resize(w, h) { this.viewW = w; this.viewH = h; }

  /** larghezza/altezza di mondo attualmente inquadrate */
  get worldW() { return this.viewW * this.zoom; }
  get worldH() { return this.viewH * this.zoom; }

  /** Fissa lo zoom di schermo, senza animazione (usato per il fit iniziale). */
  setZoomImmediate(z) {
    this.zoom = this.targetZoom = Math.min(this.maxZoom, Math.max(this.minZoom, z));
    this._anchor = null;
    this.clamp();
  }

  /** Chiede un nuovo zoom (rotella o pinch): l'avvicinamento vero e proprio
   * lo fa update() ad ogni frame, cosi' resta fluido anche per un singolo
   * "scatto" di rotella. `anchorSx/Sy` e' il punto di schermo che deve
   * restare fermo sotto il dito/cursore per tutta la durata dell'animazione. */
  setZoom(z, anchorSx, anchorSy) {
    this.targetZoom = Math.min(this.maxZoom, Math.max(this.minZoom, z));
    this._anchor = anchorSx === undefined ? null
      : { sx: anchorSx, sy: anchorSy, ...this.screenToWorld(anchorSx, anchorSy) };
  }

  /** Avvicina `zoom` a `targetZoom` di un frame. Va chiamato una volta per frame. */
  update(dt) {
    if (this.zoom === this.targetZoom) return;
    const t = Math.min(1, dt * ZOOM_EASE);
    this.zoom += (this.targetZoom - this.zoom) * t;
    if (Math.abs(this.zoom - this.targetZoom) < 0.0005) this.zoom = this.targetZoom;
    if (this._anchor) {
      // ricalcola il pan ad ogni passo cosi' il punto sotto anchor resta fermo
      // anche a meta' dell'animazione, non solo all'inizio e alla fine.
      const after = this.screenToWorld(this._anchor.sx, this._anchor.sy);
      this.x += this._anchor.x - after.x;
      this.y += this._anchor.y - after.y;
    }
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
