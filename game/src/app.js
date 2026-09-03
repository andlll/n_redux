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
import { evictUnneededRoomAtlases, atlasKeyFor } from "./assets.js";
import { RenderScale } from "./renderscale.js";

const canvas = document.getElementById("view");
const loading = document.getElementById("loading");
const levelLoading = document.getElementById("levelLoading");

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
// Scala di risoluzione interna adattiva (game/src/renderscale.js) — una sola
// istanza condivisa fra menu e partita (come `r`/`pauseBlur`/`input` sopra),
// cosi' un cambio di gradino gia' misurato sopravvive al passaggio fra
// schermate invece di doversi ri-adattare da zero ad ogni navigate().
const renderScale = new RenderScale(r.isSoftwareRendering);

// [Nuova funzionalita', richiesta dall'autore: "alcuni device (es. Galaxy
// S23) hanno fps bassissimi (2-5) mentre un device di fascia media va bene
// — avvisiamo il giocatore quando la causa e' il fallback software"] `r`
// (sopra) ha gia' rilevato se sta disegnando via software invece che sulla
// GPU vera (gl.js, Renderer constructor — `isSoftwareRendering`, dedotto
// dalla stringa VERA del renderer via WEBGL_debug_renderer_info, non
// influenzata da quanto sia potente il device: e' una blocklist driver di
// Chrome/ANGLE per quella specifica combinazione GPU+versione, capita
// anche su hardware oggettivamente valido). Un banner HTML vero, stesso
// principio di `loadFileBtn`/`msgEl` in title.js — non un canvas WebGL:
// deve restare leggibile anche se il rendering vero e proprio e' quello
// rotto. Dismissibile (il giocatore l'ha gia' letto, non deve restare li'
// per sempre) ma non a scomparsa automatica: la causa persiste per tutta
// la sessione, un avviso che sparisce da solo rischia di non essere mai
// letto in tempo.
if (r.isSoftwareRendering) {
  const banner = document.createElement("div");
  banner.style.cssText = "position:fixed;left:0;right:0;top:0;z-index:20;" +
    "background:rgba(120,20,20,0.92);color:#fff;padding:10px 40px 10px 14px;" +
    "font:13px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;" +
    "text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);";
  banner.textContent = "Hardware acceleration unavailable on this device/browser — performance may be very limited. Try updating your browser or switching to Chrome.";
  const dismiss = document.createElement("button");
  dismiss.textContent = "×";
  dismiss.setAttribute("aria-label", "Dismiss");
  dismiss.style.cssText = "position:absolute;right:8px;top:50%;transform:translateY(-50%);" +
    "background:none;border:none;color:#fff;font-size:20px;line-height:1;cursor:pointer;padding:4px 8px;";
  dismiss.addEventListener("click", () => banner.remove());
  banner.appendChild(dismiss);
  document.body.appendChild(banner);
}

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

// Percentuale reale di avanzamento sulle due schermate di caricamento
// (index.html #loading/#levelLoading), richiesta dall'autore ("avrebbe senso
// una barra/percentuale invece del solo logo che pulsa"): title.js/main.js
// passano un `onProgress(loaded, total)` a loadRoomAtlas() (assets.js, conta
// le pagine CORE dell'atlas — quelle che il mount aspetta davvero prima di
// disegnare il primo frame) tramite `ctx.reportProgress(key, loaded, total,
// label)` qui sotto.
//
// [Bug corretto, segnalato dall'autore: "a volte vedo due percentuali di
// avanzamento, quando la prima arriva al 100 parte una seconda che
// ricomincia da 0"] title.js aspetta DUE atlas in sequenza per montare il
// menu (`title`, i bottoni, poi `match`, molto piu' grande — lo sfondo
// sfumato dietro): prima di questo fix le due sorgenti venivano SOMMATE
// (stessa `key` -> stesso totale complessivo) per mostrare "un unico
// avanzamento coerente" — ma la somma e' calcolata sulle sorgenti CONOSCIUTE
// finora: appena "title" arriva al 100% (e' l'unica sorgente registrata,
// essendo le due chiamate sequenziali, non parallele) la percentuale
// mostrata e' gia' 100%; nell'istante in cui parte "match" il suo totale
// (molte pagine in piu' di "title") si aggiunge al denominatore mentre il
// numeratore resta quasi fermo — la percentuale crolla di colpo verso lo
// 0%, esattamente il "riparte da 0" segnalato, prima di risalire mentre
// "match" carica davvero. Non un bug della somma in se' (due sorgenti
// CONTEMPORANEE risultano comunque in un'unica barra coerente, come
// intendeva il commento originale) ma della sequenzialita' di title.js.
//
// Qui si mostra il solo avanzamento della sorgente PIU' RECENTE invece di
// sommarle: niente piu' crollo a meta' (ogni fase ha la propria barra 0..100
// pulita), e ogni chiamata porta anche un'etichetta testuale di cosa sta
// caricando (title.js/main.js, sotto) mostrata sopra la percentuale — cosi'
// un secondo "riparte da 0" (fra una fase e la successiva, es. interfaccia
// -> mondo di sfondo) si legge come "e' iniziata la fase dopo", non come un
// blocco o un errore.
const progressFills = [loading, levelLoading].map((el) => el.querySelector(".fill"));
const progressPcts = [loading, levelLoading].map((el) => el.querySelector(".progressPct"));
const progressLabels = [loading, levelLoading].map((el) => el.querySelector(".progressLabel"));
const DEFAULT_PROGRESS_LABEL = "loading";
function resetProgress() {
  setLoadingProgressUI(0, DEFAULT_PROGRESS_LABEL);
}
function setLoadingProgressUI(frac, label) {
  const pct = Math.round(Math.max(0, Math.min(1, frac)) * 100);
  for (const fill of progressFills) fill.style.width = pct + "%";
  for (const pctEl of progressPcts) pctEl.textContent = pct + "%";
  for (const labelEl of progressLabels) labelEl.textContent = label;
}
function reportProgress(key, loaded, total, label = DEFAULT_PROGRESS_LABEL) {
  setLoadingProgressUI(total > 0 ? loaded / total : 0, label);
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

// Quali room-atlas (assets.js, ~800 MB di texture GPU l'una) servono davvero
// alla schermata che sta per montare — usata per liberare tutte le altre
// PRIMA di montarla (vedi la chiamata a evictUnneededRoomAtlases() sotto).
// "title" carica il proprio atlas — bottoni/banner PIU' il layer dinamico
// dietro al menu (mare/aerei/nuvole, tools/23_atlas.py/TITLE_DYNAMIC_SPRITES,
// title.js) — mai l'atlas di `match` (56 pagine, non serve piu' nessuna
// citta' dietro al menu). La risoluzione di `roomParam` -> nome room ripete
// quella in main.js/mountMatch(): deve restare identica, altrimenti si
// evincerebbe/terrebbe l'atlas sbagliato. `atlasKeyFor()` (assets.js):
// `match`/`match_easy`/`tutorial` condividono ORA lo stesso pacchetto texture
// (tools/23_atlas.py, ATLAS_MERGE_ROOMS) — la cache in assets.js e' chiavata
// sulla chiave condivisa, quindi va restituita qui, non il nome room grezzo,
// altrimenti evictUnneededRoomAtlases() (sotto) non troverebbe mai un match e
// libererebbe un atlas ancora in uso passando da una all'altra.
function neededRoomsFor(screen, params) {
  if (screen === "menu") return ["title"];
  const roomParam = params.room;
  const roomName = roomParam === "match" || roomParam === "tutorial" ? roomParam : "match_easy";
  return [atlasKeyFor(roomName)];
}

const ctx = { gl, r, canvas, input, pauseBlur, white, hideLoading, navigate, reportProgress, renderScale };

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
    // [Bug corretto, segnalato dall'autore: "su iPhone tutorial/match facile
    // continuano a far ripartire il sito"] Libera SUBITO le texture GPU di
    // qualunque room-atlas non serva alla schermata che sta per montare
    // (assets.js/evictUnneededRoomAtlases()) — altrimenti l'atlas di `match`
    // tenuto da title.js per lo sfondo del menu (~800 MB) restava in memoria
    // GPU anche dopo aver lasciato il menu, e si sommava per intero
    // all'atlas della room appena scelta (un altro ~800 MB): la somma bastava
    // a far terminare la scheda su mobile (budget molto piu' stretto che su
    // desktop), il sistema operativo la ricaricava da zero — "il sito si
    // refresha" per chi gioca. Va PRIMA del prossimo `import()`/mount(): la
    // prossima room deve trovare la memoria gia' libera quando inizia a
    // caricare la propria, non dopo.
    evictUnneededRoomAtlases(gl, neededRoomsFor(screen, params));
    resetProgress();
    // Nero pieno-schermo finche' la prossima schermata non disegna il suo
    // primo frame: senza questo resterebbe visibile l'ultimo frame di
    // quella precedente (sfondo/HUD "vecchi") per tutta la durata del
    // fetch di scene/atlas/texture della prossima room.
    r.beginFrame(canvas.width, canvas.height, [0, 0, 0]);
    r.flush();
    // Scritta "loading" sopra il nero (vedi il commento su #levelLoading,
    // index.html): resta finche' mount() non ha finito di scaricare
    // scene/atlas/texture della room, cosi' il nero pieno-schermo qui sopra
    // non sembra un blocco del gioco durante un fetch lento.
    levelLoading.classList.add("show");
    const mod = await SCREEN_MODULES[screen]();
    const mount = screen === "menu" ? mod.mountTitle : mod.mountMatch;
    current = await mount(ctx, params);
    levelLoading.classList.remove("show");
  } catch (err) {
    console.error(`nimbus: caricamento di "${screen}" fallito`, err);
    levelLoading.classList.remove("show");
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
