// Un solo percorso di input: mouse e touch producono gli stessi eventi.
// Niente `if (os_type == 4)` sparsi per il codice, come nell'originale.
//
// Espone: drag (con soglia), tap, rotella, pinch. Il consumatore non sa
// se sta parlando con un dito o con un mouse.

const TAP_SLOP = 8;       // px di movimento sotto cui resta un tap
const TAP_MS = 350;
// [Nuova funzionalita', richiesta dall'autore: "un modo per aprire il
// pannello stats/autodifesa di una torretta senza rubare il tap normale,
// che deve continuare a sparare"] Soglia del tocco prolungato.
// [Bug corretto, segnalato dall'autore: "il tocco prolungato per selezionare
// le strutture di difesa e' troppo lungo"] Era 550ms (deliberatamente sopra
// TAP_MS, cosi' il rilascio arrivava sempre oltre TAP_MS e onTap non
// scattava mai per lo stesso gesto): ridotta prima a 350ms (uguale a
// TAP_MS), poi — su ulteriore richiesta dell'autore, "il tocco prolungato
// per aprire i sottomenu degli edifici deve scattare a 0.25s, anche sugli
// edifici non difensivi" — a 250ms: non serve un margine fra le due soglie
// perche' a evitare il doppio evento e' gia' il flag esplicito
// `longPressFired` controllato in _up() sotto (`!st.longPressFired`), non
// l'ordine temporale: un long press che scatta PRIMA del rilascio marca il
// gesto e basta, qualunque sia la relazione fra le due costanti.
const LONG_PRESS_MS = 250;

export class Input {
  constructor(el) {
    this.el = el;
    this.pointers = new Map();       // id -> {x, y, sx, sy, t, moved}
    this.dragging = false;
    this.pinchDist = 0;

    this.onDrag = null;              // (dxScreen, dyScreen)
    this.onTap = null;               // (sx, sy)
    this.onZoom = null;              // (factor, anchorSx, anchorSy)
    // Rilascio del puntatore, sempre — a differenza di `onTap` (solo se il
    // gesto non ha mai superato `TAP_SLOP`). Serve al piazzamento a
    // trascinamento di palazzo/museo (game/src/main.js, armPlacement()):
    // quello e' un vero drag (l'origine e il lotto adiacente distano ~100px,
    // ben oltre la soglia di tap), quindi onTap non scatterebbe mai sul
    // rilascio — [C] src/objects/dir1/Mouse_LeftReleased.gml, l'originale
    // arma la direzione proprio al rilascio del tocco, non alla pressione.
    this.onPointerUp = null;         // (sx, sy)
    // Pressione del puntatore, un solo dito (`pointers.size` valutato PRIMA
    // di registrare questo puntatore, cosi' il secondo dito di un pinch non
    // lo fa scattare). Serve allo stesso piazzamento a trascinamento di
    // palazzo/museo: [C] src/objects/placeholder/Mouse_LeftPressed.gml arma
    // il gesto (crea cre1..cre4) alla PRESSIONE, non al rilascio come ogni
    // altro edificio (`onTap`) — l'unica differenza reale rispetto al resto
    // del piazzamento a un lotto solo.
    this.onPointerDown = null;       // (sx, sy)
    // Tocco prolungato fermo (LONG_PRESS_MS, sopra) su UN solo puntatore —
    // mai durante un pinch, mai se il dito si e' mosso oltre TAP_SLOP nel
    // frattempo (stesso identico "fermo" di un tap, solo tenuto piu' a
    // lungo). Il consumatore (main.js) lo usa per il pannello di una
    // torretta senza toccare il tap veloce, che deve continuare a sparare.
    this.onLongPress = null;         // (sx, sy)
    this._longPressTimer = null;
    // Un gesto che comincia sopra la UI (es. la barra di selettore edifici,
    // su mobile in scroll orizzontale) non deve muovere la camera sotto di
    // essa: `uiHitTest(sx, sy)` decide, al pointerdown, se questo puntatore
    // appartiene alla UI per tutta la durata del gesto — `onUIDrag` prende
    // il posto di `onDrag` finche' il dito resta giu'.
    this.uiHitTest = null;           // (sx, sy) => bool
    this.onUIDrag = null;            // (dxScreen, dyScreen)

    // Posizione del puntatore in spazio schermo, aggiornata ad ogni
    // pointermove indipendentemente da drag/pinch in corso — a differenza
    // di `pointers` (solo puntatori "giu'"), serve per l'hover vero (mouse
    // fermo, nessun tasto premuto), com'era MouseEnter/MouseLeave
    // nell'originale (src/objects/placeholder). null quando il puntatore
    // non e' sopra il canvas (o su touch, quando non c'e' nessun dito giu':
    // il touch non ha un vero "hover" prima del tocco, la stessa
    // limitazione che aveva l'originale su mobile).
    this.hover = null;
    // Tipo del puntatore dietro `hover` ("mouse"/"touch"/"pen"): serve a chi
    // consuma l'hover per distinguere un vero passaggio del mouse da un dito
    // ancora giu' (che aggiorna `hover` anche lui, vedi _move sotto) — es. la
    // raccolta automatica delle monete blu al passaggio, game/src/main.js,
    // che deve scattare solo col mouse, mai trascinando col dito.
    this.hoverPointerType = null;

    el.addEventListener("pointerdown", (e) => this._down(e));
    el.addEventListener("pointermove", (e) => this._move(e));
    el.addEventListener("pointerup", (e) => this._up(e));
    el.addEventListener("pointercancel", (e) => this._up(e));
    el.addEventListener("pointerleave", () => { this.hover = null; this.hoverPointerType = null; });
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
    const first = this.pointers.size === 0;
    if (first) this.onPointerDown?.(p.x, p.y);
    const st = {
      x: p.x, y: p.y, sx: p.x, sy: p.y, t: performance.now(), moved: false,
      ui: this.uiHitTest?.(p.x, p.y) ?? false, longPressFired: false,
    };
    this.pointers.set(e.pointerId, st);
    if (this.pointers.size === 2) { this.pinchDist = this._dist(); this._clearLongPress(); }
    else if (first) {
      this._clearLongPress();
      this._longPressTimer = setTimeout(() => {
        this._longPressTimer = null;
        if (st.moved || !this.pointers.has(e.pointerId)) return;
        st.longPressFired = true;
        this.onLongPress?.(st.x, st.y);
      }, LONG_PRESS_MS);
    }
  }

  _clearLongPress() {
    if (this._longPressTimer != null) { clearTimeout(this._longPressTimer); this._longPressTimer = null; }
  }

  _move(e) {
    const p = this._pos(e);
    this.hover = p;
    this.hoverPointerType = e.pointerType;
    const st = this.pointers.get(e.pointerId);
    if (!st) return;
    const dx = p.x - st.x, dy = p.y - st.y;
    st.x = p.x; st.y = p.y;
    if (Math.hypot(p.x - st.sx, p.y - st.sy) > TAP_SLOP) { st.moved = true; this._clearLongPress(); }

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
    if (st.moved) (st.ui ? this.onUIDrag : this.onDrag)?.(dx, dy);
  }

  _up(e) {
    const st = this.pointers.get(e.pointerId);
    if (!st) return;
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinchDist = 0;
    this._clearLongPress();
    // Il touch non ha hover senza contatto (a differenza del mouse, che
    // resta "sopra" il canvas anche a tasto rilasciato): alzando il dito
    // l'evidenziazione del placeholder deve sparire subito, non restare
    // agganciata all'ultimo punto toccato.
    if (e.pointerType !== "mouse") { this.hover = null; this.hoverPointerType = null; }
    // `!st.longPressFired` e' gia' implicito (LONG_PRESS_MS > TAP_MS, sopra)
    // ma esplicito qui per chiarezza — un tap non deve MAI ripetere
    // un'azione gia' presa dal long press sullo stesso gesto.
    if (!st.moved && !st.longPressFired && performance.now() - st.t < TAP_MS) this.onTap?.(st.x, st.y);
    this.onPointerUp?.(st.x, st.y);
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
