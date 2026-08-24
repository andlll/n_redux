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

const cache = new Map();   // roomName -> Promise<{ atlas, pageTex }>

/** Atlas (JSON gia' fatto il parse + texture GPU gia' caricate) di una room,
 * scaricato una sola volta per sessione: una seconda richiesta per la stessa
 * room (stesso `gl` — vedi sopra sul perche' non cambia mai in questa app)
 * ritorna la stessa promise gia' in corso o gia' risolta, senza rifare
 * fetch/upload. */
export function loadRoomAtlas(gl, roomName) {
  let entry = cache.get(roomName);
  if (!entry) {
    entry = (async () => {
      const atlas = await fetch(`./data/${roomName}.atlas.json`).then((x) => x.json());
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
      await Promise.all(atlas.pages.slice(0, coreCount).map((p, i) =>
        loadTexture(gl, "./assets/" + p.file).then((t) => { pageTex[i] = t; })));
      // Pagine deferred: NON aspettate — un fallimento qui non deve far
      // ripetere il download delle pagine core gia' andate a buon fine
      // (a differenza del catch sotto, che scarta l'intera cache SOLO se
      // una pagina CORE fallisce). frameFor() (main.js/title.js) tratta
      // gia' `pageTex[f.p] === null` come "non ancora pronto" — lo sprite
      // semplicemente non si disegna per i pochi frame in cui la sua
      // pagina e' ancora per strada, poi compare da solo.
      for (let i = coreCount; i < atlas.pages.length; i++) {
        loadTexture(gl, "./assets/" + atlas.pages[i].file)
          .then((t) => { pageTex[i] = t; })
          .catch((err) => console.error(`nimbus: pagina atlas "${atlas.pages[i].file}" non caricata`, err));
      }
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
    entry.catch(() => { if (cache.get(roomName) === entry) cache.delete(roomName); });
    cache.set(roomName, entry);
  }
  return entry;
}

/** Avvia il download dell'atlas di una room senza aspettarlo — usata da
 * app.js mentre si e' ancora nel menu, per la room piu' probabile
 * (`match_easy`, il tasto in evidenza): se il giocatore la sceglie davvero
 * `loadRoomAtlas()` trova gia' la cache calda (o comunque a buon punto)
 * invece di ripartire da zero, riducendo l'attesa proprio nel momento in
 * cui e' piu' fastidiosa (il tap su "gioca"). Un rifiuto (rete assente,
 * room non ancora generata) non deve interrompere nient'altro: nessuno sta
 * aspettando questa promise, quindi va intercettato qui — altrimenti
 * risulterebbe un rifiuto di promise non gestito in console. */
export function prefetchRoomAtlas(gl, roomName) {
  loadRoomAtlas(gl, roomName).catch(() => {});
}
