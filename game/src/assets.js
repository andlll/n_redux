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
      const pageTex = await Promise.all(atlas.pages.map((p) => loadTexture(gl, "./assets/" + p.file)));
      return { atlas, pageTex };
    })();
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
