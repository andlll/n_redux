// Scala di risoluzione INTERNA adattiva — riduce quanti pixel FISICI il
// canvas renderizza davvero (canvas.width/height, il backing store),
// lasciando invariata la sua dimensione CSS (canvas.clientWidth/Height): il
// browser fa lo stesso identico upscale bilineare che gia' fa per ogni
// sprite del motore (LINEAR ovunque, gl.js), il costo evitato e' tutto e
// solo GPU (meno pixel da rasterizzare/shadeare, meno banda texture) — il
// classico "dynamic resolution scaling". Funziona qui senza toccare nient'
// altro del motore perche' `Camera.projection()`/`screenProjection()`
// (camera.js) lavorano gia' in coordinate CSS (`canvas.clientWidth/Height`,
// mai `canvas.width/height`) e producono clip space (-1..1), indipendente
// da quanti pixel fisici quel cubo viene poi mappato — solo `resize()` in
// main.js/title.js, che calcola `canvas.width/height` da `dpr`, deve sapere
// di questa scala.
//
// Due strade, indipendenti fra loro (vedi il commento su isSoftwareRendering
// sotto per il perche' non serve unificarle):
//
// 1) Software rendering (gl.js, Renderer.isSoftwareRendering — dedotto da
// WEBGL_debug_renderer_info al momento stesso della creazione del contesto,
// nessuna misura necessaria): non e' "una GPU piu' lenta", e' l'assenza
// totale della GPU — ogni operazione che normalmente gira in parallelo su
// hardware dedicato (rasterizzazione, texture sampling, blending) viene
// eseguita dalla CPU in sequenza via SIMD, un cambio di modello di
// esecuzione, non un fattore di velocita' (da qui i 2-5fps osservati
// indipendentemente da quanto sia leggera la scena). Segnale certo al
// 100%: si parte subito al gradino piu' basso, senza aspettare che il
// monitor FPS sotto se ne accorga a sue spese (qualche secondo di frame a
// 2-5fps prima di reagire).
//
// 2) Tutto il resto (GPU mobile debole ma vera, throttling termico dopo
// minuti di gioco, scena affollata con troppi draw call): nessun segnale
// certo a priori, serve misurare — una media mobile del framerate REALE
// (non il `dt` gia' clampato a 0.05s del loop principale, che protegge la
// SIMULAZIONE ma nasconderebbe proprio i frame lenti che questo monitor
// deve individuare, stesso motivo per cui main.js calcola gia' un secondo
// `cutsceneDt` non clampato) che scende di un gradino quando il framerate
// resta basso ABBASTANZA A LUNGO (mai per un singolo frame di stutter:
// media lenta + cooldown fra un cambio e il successivo), e puo' risalire
// se le condizioni migliorano (es. il device si raffredda).
const STEPS = [1, 0.85, 0.7, 0.6, 0.5];
const LOW_FPS = 24;      // media sostenuta sotto questa soglia: si scende di un gradino
const HIGH_FPS = 50;     // media sostenuta sopra questa soglia: si puo' risalire di un gradino
// Gap deliberato fra le due soglie (isteresi): senza, un framerate reale
// intorno ai 30fps oscillerebbe in continuazione fra due gradini ad ogni
// piccola fluttuazione, un cambio di risoluzione visibile a vista ad ogni
// giro.
const EMA_WEIGHT = 0.02;   // costante di tempo ~1.5s a 60fps: ignora un singolo frame lento
const COOLDOWN = 3;        // secondi minimi fra due cambi di gradino consecutivi
const MAX_SAMPLE_DT = 1;   // oltre un secondo e' uno stallo (alt-tab, GC enorme), non un dato utile

export class RenderScale {
  constructor(isSoftwareRendering) {
    this.softwareRendering = isSoftwareRendering;
    this.stepIdx = isSoftwareRendering ? STEPS.length - 1 : 0;
    this.fpsEMA = null;
    // Parte gia' "in cooldown" (non a 0): senza questo, il primissimo
    // sample() deciderebbe subito un cambio di gradino sul valore grezzo di
    // UN solo frame (fpsEMA e' ancora `null`, quindi si inizializza diretto
    // a quel frame, senza nessuna media dietro) — proprio il momento meno
    // rappresentativo per farlo (JIT ancora a freddo, upload GPU delle
    // texture appena arrivate, STUDIO.md/main.js sulla stessa causa per
    // `cutsceneDt`). Cosi' i primi COOLDOWN secondi servono solo a scaldare
    // l'EMA, nessuna decisione prima che significhi davvero qualcosa.
    this.cooldownT = COOLDOWN;
  }

  get scale() { return STEPS[this.stepIdx]; }

  /** Va chiamato una volta per frame REALE (mai durante una pausa in
   * background — main.js/title.js gia' saltano quei frame del tutto, vedi
   * il controllo su `document.hidden`) con `rawDt`, il tempo di frame VERO
   * in secondi, non clampato. */
  sample(rawDt) {
    if (this.cooldownT > 0) this.cooldownT -= rawDt;
    // Software rendering: gia' fissato al gradino piu' basso in constructor,
    // per tutta la sessione — nessuna misura da fare, vedi il commento in
    // cima al file sul perche' e' un segnale certo a priori.
    if (this.softwareRendering) return;
    if (rawDt <= 0 || rawDt > MAX_SAMPLE_DT) return;
    const fps = 1 / rawDt;
    this.fpsEMA = this.fpsEMA === null ? fps : this.fpsEMA + (fps - this.fpsEMA) * EMA_WEIGHT;
    if (this.cooldownT > 0) return;
    if (this.fpsEMA < LOW_FPS && this.stepIdx < STEPS.length - 1) {
      this.stepIdx++;
      this.cooldownT = COOLDOWN;
    } else if (this.fpsEMA > HIGH_FPS && this.stepIdx > 0) {
      this.stepIdx--;
      this.cooldownT = COOLDOWN;
    }
  }
}
