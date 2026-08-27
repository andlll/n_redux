// Cache degli atlas per room (JSON + texture GPU gia' caricate), condivisa
// da title.js e main.js tramite game/src/app.js — richiesto dall'autore
// ("alleggerire i caricamenti, caricare gli asset in modo furbo"): prima
// dell'app.js SPA (game/src/app.js) ogni visita di una room era comunque un
// refresh di pagina, quindi ogni fetch/texture ripartiva sempre da zero —
// ora che si puo' tornare al menu e rientrare in partita piu' volte nella
// STESSA sessione, senza una cache le texture (fino a ~40 MB per room)
// verrebbero riscaricate e ricaricate in GPU ad ogni singola visita.
//
// Cachiamo solo l'ATLAS (`atlas.json` + le texture delle sue pagine): e'
// puro materiale visivo, mai mutato da chi gioca, sicuro da condividere fra
// piu' partite nella stessa sessione. `scene.json` (le istanze della room)
// NON e' qui — resta una fetch fresca ad ogni mount (main.js/title.js):
// e' piccola (dozzine di KB contro le decine di MB delle texture, il vero
// costo) e i suoi oggetti vengono mutati in posto durante la partita
// (varianti scelte a dado, `_f` assegnato, stato di gioco agganciato alle
// istanze) — condividerli fra due partite nella stessa sessione vorrebbe
// dire che la seconda erediti lo stato "sporco" della prima invece di
// ripartire pulita.
import { loadTexture } from "./gl.js";

const cache = new Map();   // roomName -> entry (vedi loadRoomAtlas)

// [Bug corretto, segnalato dall'autore: "appena avvio match il sito si
// refresha tornando alla schermata logo e poi al menu", riproducibile su
// mobile] Ogni pagina di un atlas e' 2048x2048 RGBA = 16 MB non compressi in
// GPU — un atlas intero (~50 pagine per `match`/`match_easy`/`tutorial`,
// STUDIO.md) e' quindi ~800 MB. Prima di questo fix TUTTE le pagine
// "deferred" (le ~30 oltre `corePages`) partivano insieme, nello stesso
// istante: decine di `Image` che decodificano in parallelo (ognuna tiene un
// bitmap decodificato in memoria PRIMA che `texImage2D` lo carichi in GPU e
// il browser possa liberarlo) sommate al batch `corePages` gia' bloccante
// sotto — un picco di memoria transitoria, non solo lo stato stazionario
// finale, che su un dispositivo mobile (budget per-tab molto piu' stretto di
// un desktop) puo' bastare da solo a far terminare la pagina: il sistema
// operativo la ricarica da zero, che a chi gioca appare come "il sito si
// refresha" — si riparte da index.html (la schermata di caricamento col
// logo) e app.js chiama di nuovo `navigate("menu")` al bootstrap, quindi
// dopo il logo si ritorna al menu, non a un errore visibile. Qui il batch
// (core E deferred, stesso principio) carica al piu' PAGE_LOAD_CONCURRENCY
// pagine alla volta invece di tutte insieme: stesso totale di dati scaricati
// e stessa quantita' finale di memoria GPU occupata, ma senza il picco.
const PAGE_LOAD_CONCURRENCY = 4;

/** Carica `pages[indices[i]]` in `pageTex[indices[i]]`, al piu'
 * PAGE_LOAD_CONCURRENCY alla volta. Ogni pagina fallita viene loggata e
 * rilancia l'errore SOLO se `rethrow` (le pagine core: un fallimento li'
 * deve far rigettare l'intero atlas, vedi sotto) — le deferred continuano
 * a caricare le altre pagine anche se una fallisce (stesso comportamento di
 * prima di questo fix).
 *
 * `cancelled` (oggetto `{ value }` condiviso con l'entry di cache, vedi
 * evictRoomAtlas() sotto): controllato prima di ogni pagina non ancora
 * partita per smettere di avviarne di nuove non appena la room viene
 * evitta, e sulla pagina appena arrivata per liberarla subito invece di
 * scriverla in `pageTex` — evita che un `evictRoomAtlas()` capitato mentre
 * un worker era a meta' di un `await loadTexture()` lasci comunque quella
 * singola texture in GPU senza che nessuno la liberi mai piu'.
 *
 * `onPage` (opzionale): chiamato dopo ogni pagina che *avrebbe* dovuto
 * contare ai fini del progresso (fallita compresa: anche una pagina che non
 * carica fa comunque avanzare "quante ne mancano"), mai per una pagina
 * scartata da `cancelled`. */
async function loadPagesLimited(gl, pages, pageTex, indices, { rethrow, cancelled, onPage }) {
  let next = 0;
  async function worker() {
    while (next < indices.length) {
      const i = indices[next++];
      if (cancelled.value) return;
      try {
        const tex = await loadTexture(gl, "./assets/" + pages[i].file);
        if (cancelled.value) { gl.deleteTexture(tex.tex); return; }
        pageTex[i] = tex;
      } catch (err) {
        console.error(`nimbus: pagina atlas "${pages[i].file}" non caricata`, err);
        if (rethrow) throw err;
      }
      onPage?.();
    }
  }
  const workers = Array.from({ length: Math.min(PAGE_LOAD_CONCURRENCY, indices.length) }, worker);
  await Promise.all(workers);
}

/** Atlas (JSON gia' fatto il parse + texture GPU gia' caricate) di una room,
 * scaricato una sola volta per sessione: una seconda richiesta per la stessa
 * room (stesso `gl` — vedi sopra sul perche' non cambia mai in questa app)
 * ritorna la stessa promise gia' in corso o gia' risolta, senza rifare
 * fetch/upload.
 *
 * `onProgress(loaded, total)` (opzionale): quante pagine CORE (quelle che
 * questa stessa chiamata aspetta prima di tornare, non le deferred in
 * background) sono arrivate finora — usato dalle schermate di caricamento
 * (index.html #loading/#levelLoading, app.js) per una barra/percentuale
 * reale invece di un'attesa cieca. Se la room e' gia' in cache (hit,
 * fetch/texture gia' partiti o finiti sotto una chiamata precedente) viene
 * comunque richiamato subito con lo stato attuale, cosi' un secondo
 * chiamante (es. si rientra nella stessa room prima che le pagine core
 * della visita precedente abbiano finito) vede da subito un numero
 * sensato invece di restare a 0 finche' non arriva la pagina successiva. */
export function loadRoomAtlas(gl, roomName, { onProgress } = {}) {
  let entry = cache.get(roomName);
  if (!entry) {
    const cancelled = { value: false };
    const progress = { loaded: 0, total: 0 };
    const listeners = new Set();
    const notify = () => { for (const fn of listeners) fn(progress.loaded, progress.total); };
    entry = {
      cancelled, progress, listeners,
      pageTex: null,   // popolato non appena l'atlas.json e' arrivato — vedi evictRoomAtlas()
    };
    entry.promise = (async () => {
      const atlas = await fetch(`./data/${roomName}.atlas.json`).then((x) => x.json());
      if (cancelled.value) return null;
      // [I] Segnalato dall'autore: "riusciamo a ridurre i tempi di
      // caricamento caricando gli asset degli edifici avanzati poco prima
      // che il giocatore sia in condizione di sbloccarli?" — `corePages`
      // (tools/23_atlas.py, ora impacchetta le pagine "servono da subito"
      // PRIMA di quelle "arrivano dopo": edifici a livello 1/HUD/decoro
      // sempre visibile contro potenziamenti/combattimento/la catena
      // fari->piattaforma, vedi tools/27_sprite_tiers.mjs) dice quante
      // pagine iniziali aspettare qui prima di poter disegnare il primo
      // frame — le altre si scaricano in background, PARTONO qui ma non
      // vengono aspettate, e riempiono lo stesso array `pageTex` condiviso
      // mano a mano che arrivano. Una room non ancora rigenerata con la
      // pipeline aggiornata (`corePages` assente, es. build vecchie
      // rimaste in cache) si comporta come prima: tutte le pagine core,
      // nessuna in background.
      const coreCount = atlas.corePages ?? atlas.pages.length;
      const pageTex = new Array(atlas.pages.length).fill(null);
      entry.pageTex = pageTex;
      progress.total = coreCount;
      const coreIndices = Array.from({ length: coreCount }, (_, i) => i);
      await loadPagesLimited(gl, atlas.pages, pageTex, coreIndices, {
        rethrow: true, cancelled, onPage: () => { progress.loaded++; notify(); },
      });
      if (cancelled.value) return null;
      // Pagine deferred: NON aspettate — un fallimento qui non deve far
      // ripetere il download delle pagine core gia' andate a buon fine
      // (a differenza del catch sotto, che scarta l'intera cache SOLO se
      // una pagina CORE fallisce). frameFor() (main.js/title.js) tratta
      // gia' `pageTex[f.p] === null` come "non ancora pronto" — lo sprite
      // semplicemente non si disegna per i pochi frame in cui la sua
      // pagina e' ancora per strada, poi compare da solo.
      const deferredIndices = Array.from(
        { length: Math.max(0, atlas.pages.length - coreCount) }, (_, i) => coreCount + i);
      loadPagesLimited(gl, atlas.pages, pageTex, deferredIndices, { rethrow: false, cancelled });
      return { atlas, pageTex };
    })();
    // [Bug corretto, segnalato dall'autore: "problemi col caricamento del
    // livello match" — schermo nero bloccato per sempre] Un fetch/decode
    // fallito per anche una sola delle ~50 pagine di un atlas (rete
    // instabile, un file mancante sul deploy, ...) fa rigettare questa
    // stessa promise — ma prima di questo fix la promise REIETTATA restava
    // comunque in cache per il resto della sessione: ogni tentativo
    // successivo di entrare in quella room (tornare al menu e ricliccare
    // "Match") ripescava la stessa promise gia' fallita invece di
    // riprovare il download, quindi falliva SEMPRE, identico, senza che
    // nulla di transitorio potesse mai risolversi da solo. Qui, se il
    // caricamento fallisce, la voce di cache viene rimossa cosi' un nuovo
    // tentativo riparte da un fetch vero.
    entry.promise.catch(() => { if (cache.get(roomName) === entry) cache.delete(roomName); });
    cache.set(roomName, entry);
  }
  if (onProgress) {
    onProgress(entry.progress.loaded, entry.progress.total);
    entry.listeners.add(onProgress);
    entry.promise.finally(() => entry.listeners.delete(onProgress));
  }
  return entry.promise;
}

// [Bug corretto, segnalato dall'autore: "su iPhone tutorial/match facile
// continuano a far ripartire il sito"] `loadRoomAtlas()` non liberava mai
// nessun atlas gia' in cache: title.js tiene gia' l'intero atlas di `match`
// (~50 pagine, ~800 MB non compressi in GPU — vedi sopra) caricato per lo
// sfondo sfumato del menu, e la cache lo lasciava li' anche dopo aver
// lasciato il menu. Entrare in `tutorial`/`match_easy` (un SECONDO atlas
// quasi altrettanto grande, main.js) sommava quindi ~1.6 GB di texture GPU
// nello stesso istante — su desktop (budget molto piu' ampio, e verificato
// solo li' nel fix precedente su questo stesso bug, assets.js/PAGE_LOAD_
// CONCURRENCY) resta sotto soglia, su iPhone (budget per-tab molto piu'
// stretto) basta a far terminare la scheda: il sistema operativo la
// ricarica da zero, "il sito si refresha" nello stesso modo gia' descritto
// sopra. `match` invece appariva funzionare perche' RIUSA la cache gia'
// calda dello sfondo del menu (stesso roomName "match"), senza aggiungere
// nulla — da qui il sintomo riportato solo su tutorial/match_easy, mai su
// match. Qui si liberano esplicitamente le texture GPU di una room non piu'
// necessaria (chiamata da app.js/navigate() prima di montare la prossima
// schermata, vedi neededRoomsFor() li'): la cache resta solo per le room
// davvero in uso ORA, mai la somma di tutte quelle mai visitate nella
// sessione.
export function evictRoomAtlas(gl, roomName) {
  const entry = cache.get(roomName);
  if (!entry) return;
  cache.delete(roomName);
  entry.cancelled.value = true;
  if (entry.pageTex) {
    for (const t of entry.pageTex) {
      if (t) gl.deleteTexture(t.tex);
    }
  }
}

/** Libera tutte le room in cache TRANNE quelle in `neededRooms` (Set/Array di
 * nomi) — vedi evictRoomAtlas() sopra per il perche'. */
export function evictUnneededRoomAtlases(gl, neededRooms) {
  const needed = neededRooms instanceof Set ? neededRooms : new Set(neededRooms);
  for (const roomName of [...cache.keys()]) {
    if (!needed.has(roomName)) evictRoomAtlas(gl, roomName);
  }
}
