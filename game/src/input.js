// Un solo percorso di input: mouse e touch producono gli stessi eventi.
// Niente `if (os_type == 4)` sparsi per il codice, come nell'originale.
//
// Espone: drag (con soglia), tap, rotella, pinch. Il consumatore non sa
// se sta parlando con un dito o con un mouse.

const TAP_SLOP = 8;       // px di movimento sotto cui resta un tap
const TAP_MS = 350;

export class Input {
  constructor(el) {
    this.el = el;
    this.pointers = new Map();       // id -> {x, y, sx, sy, t, moved}
    this.dragging = false;
    this.pinchDist = 0;

    this.onDrag = null;              // (dxScreen, dyScreen)
    this.onTap = null;               // (sx, sy)
    this.onZoom = null;              // (factor, anchorSx, anchorSy)

    el.addEventListener("pointerdown", (e) => this._down(e));
    el.addEventListener("pointermove", (e) => this._move(e));
    el.addEventListener("pointerup", (e) => this._up(e));
    el.addEventListener("pointercancel", (e) => this._up(e));
    el.addEventListener("wheel", (e) => this._wheel(e), { passive: false });
    el.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  _pos(e) {
    const r = this.el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  _down(e) {
    this.el.setPointerCapture?.(e.pointerId);
    const p = this._pos(e);
    this.pointers.set(e.pointerId, {
      x: p.x, y: p.y, sx: p.x, sy: p.y, t: performance.now(), moved: false,
    });
    if (this.pointers.size === 2) this.pinchDist = this._dist();
  }

  _move(e) {
    const st = this.pointers.get(e.pointerId);
    if (!st) return;
    const p = this._pos(e);
    const dx = p.x - st.x, dy = p.y - st.y;
    st.x = p.x; st.y = p.y;
    if (Math.hypot(p.x - st.sx, p.y - st.sy) > TAP_SLOP) st.moved = true;

    if (this.pointers.size === 2) {
      const d = this._dist();
      if (this.pinchDist > 0 && d > 0) {
        const c = this._center();
        // dita che si allontanano => zoom in => meno mondo inquadrato
        this.onZoom?.(this.pinchDist / d, c.x, c.y);
      }
      this.pinchDist = d;
      return;
    }
    if (st.moved) this.onDrag?.(dx, dy);
  }

  _up(e) {
    const st = this.pointers.get(e.pointerId);
    if (!st) return;
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinchDist = 0;
    if (!st.moved && performance.now() - st.t < TAP_MS) this.onTap?.(st.x, st.y);
  }

  _wheel(e) {
    e.preventDefault();
    const p = this._pos(e);
    this.onZoom?.(Math.exp(e.deltaY * 0.0012), p.x, p.y);
  }

  _dist() {
    const [a, b] = [...this.pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  _center() {
    const [a, b] = [...this.pointers.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
}
