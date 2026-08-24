// Shell dell'app — un solo canvas/contesto WebGL2 per l'intera sessione.
// Prima c'erano due pagine HTML separate (index.html -> game/src/title.js,
// play.html -> game/src/main.js): passare dal menu a una partita era un vero
// `location.href`, cioe' un refresh di pagina vero e proprio. Qui invece
// title.js e main.js sono "schermate" (mountTitle()/mountMatch()) caricate
// con un `import()` dinamico solo quando servono e smontate esplicitamente
// (dispose()) quando si cambia schermata: un solo link per tutto il gioco,
// nessun refresh del browser fra menu/partita/tutorial — comodo anche per
// l'hosting su siti come itch.io o Playgrounds, dove un solo index.html e'
// piu' semplice da incorporare di due pagine con la propria navigazione.
//
// Risorse GPU create UNA volta sola qui (Renderer/gl, Input, PauseBlur, la
// texture bianca) e passate alle schermate via `ctx`: ricrearle ad ogni
// cambio schermata avrebbe accumulato programmi/VAO/buffer WebGL ad ogni
// visita del menu nella stessa sessione, invece che una volta per tutta la
// pagina. Le texture delle room (atlas per room, caricate da title.js/
// main.js) restano invece un costo per-room, non condiviso qui: quello e'
// il prossimo passo ("caricare gli asset in modo furbo durante le
// partite", non ancora fatto), non questo.
import { Renderer, makeSolidTexture, PauseBlur } from "./gl.js";
import { Input } from "./input.js";

const canvas = document.getElementById("view");
const hud = document.getElementById("hud");
const loading = document.getElementById("loading");

const r = new Renderer(canvas);
const gl = r.gl;
const white = makeSolidTexture(gl);
// Il blur del menu di pausa (drawPauseOverlay(), main.js) e dello sfondo
// sfumato del menu principale (title.js): render-to-texture + blur
// separabile, l'unico posto nel motore che ne ha bisogno — isolato nella
// propria classe (gl.js) invece che nel Renderer principale, che resta il
// solo batch di sprite di ogni giorno. Una sola istanza condivisa fra le
// due schermate che lo usano.
const pauseBlur = new PauseBlur(gl);
const input = new Input(canvas);

// Schermata di caricamento (index.html #loading): sfondo nero pieno-schermo
// col logo Mount Fuji Software (tools/26_logo.py) centrato — [C] STUDIO.md
// §3, il flusso di room originale e' `loguji` (logo Fuji) -> `title` (il
// menu) -> ...: lo splash va prima del MENU, non prima dei livelli. Mostrato
// una sola volta, al primissimo avvio dell'app (non ad ogni ritorno al
// menu): title.js chiama `hideLoading()` (via ctx) al primo frame disegnato,
// idempotente — le visite successive del menu nella stessa sessione la
// trovano gia' rimossa dal DOM.
// [Bug corretto, segnalato dall'autore: "non vedo piu' il logo fading su
// sfondo nero in avviamento"] Prima del refactor a SPA (game/src/app.js,
// vedi il commento sopra), era title.js — montato come script a livello
// di modulo — ad aggiungere subito "show" a questo stesso nodo (faceva
// partire la dissolvenza in ENTRATA del logo, CSS `#loading.show img`).
// Il refactor ha spostato la gestione di #loading qui (hideLoading(),
// sotto, per la dissolvenza in USCITA) ma non ha portato con se' quella
// riga: il logo restava quindi sempre a opacity:0 (il div nero pieno
// schermo si vedeva, il logo dentro mai) finche' hideLoading() non
// faceva sparire anche quello, invisibile per tutta la sua durata.
loading.classList.add("show");
let loadingHidden = false;
function hideLoading() {
  if (loadingHidden) return;
  loadingHidden = true;
  loading.classList.add("hide");
  loading.addEventListener("transitionend", () => loading.remove(), { once: true });
}

// Azzera tutti gli handler impostati dalla schermata precedente prima di
// montare la prossima: altrimenti un evento che arriva nella finestra fra
// dispose() e il montaggio del prossimo modulo (import() e' asincrono)
// troverebbe ancora gli handler della schermata appena smontata.
function resetInput() {
  input.onDrag = null; input.onTap = null; input.onZoom = null;
  input.onPointerDown = null; input.onPointerUp = null;
  input.uiHitTest = null; input.onUIDrag = null;
  input.hover = null; input.hoverPointerType = null;
}

// menu -> title.js; match/match_easy/tutorial sono tutte la stessa room
// "vera" (main.js), solo con `params.room` diverso — vedi mountMatch().
const SCREEN_MODULES = {
  menu: () => import("./title.js"),
  match: () => import("./main.js"),
};

const ctx = { gl, r, canvas, input, pauseBlur, white, hideLoading, navigate };

let current = null;   // { dispose() } della schermata montata adesso
let navigating = false;   // guardia contro un doppio navigate() in corsa

// [Bug corretto, segnalato dall'autore: "problemi col caricamento del
// livello match" — schermo nero bloccato per sempre, senza nessun modo di
// uscirne] Se il modulo o il mount() di una schermata falliscono (un fetch
// di rete che rigetta — atlas.json, una delle pagine texture, ... — vedi
// anche il fix in assets.js), l'eccezione risaliva fuori da questa stessa
// funzione: il nero pieno-schermo disegnato qui sopra PRIMA dell'await
// restava quindi l'ultimo frame mai disegnato per il resto della sessione
// — nessun errore visibile, nessun loop di rendering ripartito, nessun
// modo di tornare al menu se non un refresh manuale della pagina. Qui
// l'errore viene loggato (resta comunque visibile in console per il
// debug) e, se il fallimento non era gia' un tentativo di tornare al menu,
// si riprova ad andarci: il menu ricarica sempre dallo stesso `title`
// gia' funzionante, quindi il giocatore riprende il controllo invece di
// restare bloccato su un rettangolo nero senza spiegazione.
async function navigate(screen, params = {}) {
  if (navigating) return;
  navigating = true;
  try {
    resetInput();
    if (current) { current.dispose(); current = null; }
    hud.style.display = "none";
    // Nero pieno-schermo finche' la prossima schermata non disegna il suo
    // primo frame: senza questo resterebbe visibile l'ultimo frame di
    // quella precedente (sfondo/HUD "vecchi") per tutta la durata del
    // fetch di scene/atlas/texture della prossima room.
    r.beginFrame(canvas.width, canvas.height, [0, 0, 0]);
    r.flush();
    const mod = await SCREEN_MODULES[screen]();
    const mount = screen === "menu" ? mod.mountTitle : mod.mountMatch;
    current = await mount(ctx, params);
  } catch (err) {
    console.error(`nimbus: caricamento di "${screen}" fallito`, err);
    hideLoading();
    // `setTimeout(..., 0)`, non una chiamata diretta: questo stesso
    // navigate() e' ancora in corso (dentro il proprio try/finally, ne'
    // e' uscito) — chiamare navigate("menu") qui rientrerebbe subito nella
    // funzione mentre `navigating` e' ancora `true`, oppure (azzerandolo a
    // mano prima) lascerebbe che il `finally` sotto lo rimetta a `false`
    // A META' del nuovo tentativo appena partito, riaprendo la guardia
    // contro un secondo navigate() concorrente proprio mentre il menu sta
    // ancora caricando. Rimandarla al prossimo giro dell'event loop la fa
    // partire solo dopo che QUESTA chiamata e' finita per davvero.
    if (screen !== "menu") setTimeout(() => navigate("menu"), 0);
  } finally {
    navigating = false;
  }
}

navigate("menu");
