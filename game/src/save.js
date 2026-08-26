// Serializzazione esplicita (STUDIO.md §5.6 e §7.1): l'originale si
// appoggiava a `action_save_game`, uno snapshot binario di GameMaker che
// non e' replicabile "per caso". Qui lo stato che conta — risorse ed
// edifici piazzati — e' gia' dati semplici, quindi salvarlo e' solo JSON.
//
// Stessi nomi di slot dell'originale (§5.6): "nimsav" per la partita
// normale, "nimsav_eas" per quella facile, cosi' il concetto si mappa
// diretto anche se il formato e' nuovo.
//
// [Nuova funzionalita', richiesta dall'autore: "il salvataggio va in
// cache/cookie, viene perso — vogliamo file salvabili dove vuole
// l'utente"] Due percorsi paralleli, non uno che sostituisce l'altro:
// - `save()`/`load()` sotto restano su `localStorage` — il quicksave
//   "di sessione" (S/L da tastiera, Salva/Carica partita nel menu di
//   pausa) usato durante lo sviluppo per non perdere lo stato fra un
//   test e l'altro: veloce, zero dialog, ma legato al browser/profilo.
// - `saveToFile()`/`loadFromFile()` sotto sono il salvataggio VERO,
//   portabile: un file .json che l'utente sceglie/sposta/backuppa da
//   solo. Il menu principale (title.js, "Carica partita") usa SEMPRE
//   questo percorso — e' l'unico che puo' funzionare prima ancora che
//   una room sia montata (non c'e' nessuno slot localStorage da
//   indovinare finche' non si sa gia' quale scena aprire).

const SLOT = { match: "nimsav", match_easy: "nimsav_eas" };

export function saveSlotFor(sceneName) {
  return SLOT[sceneName] ?? `nimsav_${sceneName}`;
}

const SAVE_VERSION = 1;

function isValidSaveData(data) {
  return !!data && data.v === SAVE_VERSION && data.r12 && Array.isArray(data.buildings);
}

// `ruins` (game/src/main.js, destroyBuilding()): posizione/sprite/livello
// bastano a ricrearli, il resto (`_f`/`cost`, quest'ultimo derivabile da
// `level` con `ruinRebuildCost()`, buildings.js) e' derivato a runtime, non
// serializzato — stesso principio gia' scelto per `buildings` sopra (niente
// `_f`, ricalcolato al caricamento). `level` [Bug corretto, richiesto
// dall'autore: "in match non riesco a demolire le rovine"]: serve a
// ricostruire il rudere per davvero sotto ruspa (main.js) — un salvataggio
// scritto PRIMA di questo fix non ha `level`: `doLoad()` in main.js lo
// legge con `?? 1` (il rudere piu' economico, non "non ricostruibile" —
// meglio permissivo di un rudere improvvisamente bloccato dopo un
// caricamento vecchio). Campo aggiunto senza toccare `v`: un salvataggio
// vecchio senza `ruins` resta comunque valido, `doLoad()` in main.js lo
// legge con `?? []`.
// `blockedSlots` (game/src/main.js, placeAt()): i lotti "extra" che
// `eolico` occupa oltre a quello toccato (buildings.js, `def.multiTile`) —
// nessun edificio/rudere ci sta sopra, solo un placeholder permanentemente
// bloccato: senza salvarli esplicitamente un ciclo salva/carica li
// libererebbe di nuovo (doLoad() li rilegge come `buildings`/`ruins`, ma
// questi lotti non compaiono in nessuno dei due).
// `b.tiles` (game/src/main.js, placeAt()/demolishMultiTile()/doLoad()):
// **[Bug corretto]** per un edificio multi-tile (eolico/grattacielo) TUTTI i
// lotti realmente consumati (tocco incluso, non solo gli extra sopra) —
// senza salvarli, un caricamento non saprebbe piu' quale placeholder libero
// riattribuire a `consumed=true` per il lotto toccato (che non coincide con
// `b.x/b.y`, l'ancora visiva spostata da `anchorOffset`), lasciandolo
// libero per un secondo edificio dopo un giro salva/carica. `undefined` per
// ogni edificio a un solo lotto — nessun campo in piu' nel loro salvataggio.
// `platformState` (game/src/platform.js, catena fari -> seconda
// piattaforma): solo `match` la passa, `match_easy` resta `undefined` —
// `data.platformState` sara' quindi assente nel suo salvataggio, letto con
// `?? createFaroState()` da doLoad() in main.js come ogni altro campo
// opzionale qui sopra.
// `scene` [Nuovo]: il nome room ("match"/"match_easy"/"tutorial") dentro il
// salvataggio stesso, non solo implicito nello slot localStorage — il menu
// principale (title.js) non sa ancora quale room montare quando l'utente
// sceglie un file da caricare, gli serve leggerlo da qualche parte PRIMA di
// chiamare navigate().
export function serializeSave(sceneName, r12, buildings, ruins, blockedSlots, platformState) {
  return {
    v: SAVE_VERSION,
    scene: sceneName,
    r12,
    buildings: buildings.map((b) => ({
      id: b.id, type: b.type, x: b.x, y: b.y, depth: b.depth,
      level: b.level, life: b.life, spr: b.spr, construction: b.construction,
      makee: b.makee, prodT: b.prodT, decorSpr: b.decorSpr,
      ava: b.ava, growthT: b.growthT, growthNext: b.growthNext, consT: b.consT,
      coinT: b.coinT, coinNext: b.coinNext, solarT: b.solarT, windT: b.windT,
      overpark: b.overpark, oversolar: b.oversolar, tiles: b.tiles,
    })),
    ruins: ruins.map((r) => ({ x: r.x, y: r.y, spr: r.spr, level: r.level })),
    blockedSlots: blockedSlots.map((s) => ({ x: s.x, y: s.y })),
    platformState,
  };
}

export function save(sceneName, r12, buildings, ruins, blockedSlots, platformState) {
  const data = serializeSave(sceneName, r12, buildings, ruins, blockedSlots, platformState);
  localStorage.setItem(saveSlotFor(sceneName), JSON.stringify(data));
}

export function load(sceneName) {
  const raw = localStorage.getItem(saveSlotFor(sceneName));
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return isValidSaveData(data) ? data : null;
  } catch {
    return null;
  }
}

// -------------------------------------------------------- salvataggio su file
// `showSaveFilePicker`/`showOpenFilePicker` (File System Access API): solo
// Chrome/Edge desktop+Android, NON Safari ne' Firefox (nessuna delle due lo
// implementa, ne' su desktop ne' su iOS/Android) — per questo ogni funzione
// sotto ha un fallback che funziona ovunque (download di un blob / <input
// type=file>), mai un'eccezione non gestita se l'API manca. Dove l'API c'e'
// il chiamante (main.js) puo' tenersi l'handle restituito e riusarlo per i
// salvataggi successivi: `writeSaveHandle()` allora riscrive lo STESSO file
// senza riaprire un dialog ad ogni "Salva".
export function fileSystemAccessSupported() {
  return typeof window !== "undefined" && "showSaveFilePicker" in window && "showOpenFilePicker" in window;
}

function suggestedFileName(sceneName) {
  return `nimbus-${sceneName}.json`;
}

const FILE_PICKER_TYPES = [{
  description: "Salvataggio NIMBUS",
  accept: { "application/json": [".json"] },
}];

// Scarica `data` come file .json col download nativo del browser — l'utente
// sceglie dove salvarlo dal proprio dialog "Salva come" (o dalla cartella
// download di default su mobile): funziona su ogni browser, ma non lascia
// un handle da riusare, ogni salvataggio successivo va ridato daccapo.
function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Scrive `data` su file. `handle` (opzionale, un `FileSystemFileHandle` gia'
 * scelto da una `saveToFile()` precedente nella stessa sessione): se
 * presente lo riscrive direttamente, senza aprire nessun dialog — cosi' un
 * "Salva" ripetuto (pausa/S da tastiera) dopo il primo "Salva su file" non
 * chiede piu' dove ogni volta. Ritorna il nuovo handle (da tenere per la
 * prossima chiamata) o `null` se e' stato solo un download (nessun handle
 * possibile) o l'utente ha annullato il dialog.
 */
export async function saveToFile(data, handle = null) {
  if (fileSystemAccessSupported()) {
    try {
      const h = handle ?? await window.showSaveFilePicker({
        suggestedName: suggestedFileName(data.scene),
        types: FILE_PICKER_TYPES,
      });
      const writable = await h.createWritable();
      await writable.write(JSON.stringify(data));
      await writable.close();
      return h;
    } catch (err) {
      // AbortError: l'utente ha chiuso il dialog senza scegliere nulla —
      // non e' un errore da segnalare, solo "niente da fare".
      if (err?.name === "AbortError") return undefined;
      throw err;
    }
  }
  downloadJSON(data, suggestedFileName(data.scene));
  return null;
}

/**
 * Apre un file scelto dall'utente e ne ritorna il contenuto (gia'
 * validato/parsato) insieme all'handle per riusarlo in `saveToFile()`
 * successive — `{ data, handle }`, o `null` se l'utente ha annullato, il
 * file non e' JSON valido, o non ha la forma di un salvataggio di questo
 * gioco (`v`/`r12`/`buildings`, vedi isValidSaveData sopra: protegge da un
 * file scelto per sbaglio).
 */
export async function loadFromFile() {
  if (fileSystemAccessSupported()) {
    let handle;
    try {
      [handle] = await window.showOpenFilePicker({ types: FILE_PICKER_TYPES });
    } catch (err) {
      if (err?.name === "AbortError") return null;
      throw err;
    }
    const file = await handle.getFile();
    try {
      const data = JSON.parse(await file.text());
      return isValidSaveData(data) ? { data, handle } : null;
    } catch {
      return null;
    }
  }
  // Fallback universale: <input type=file>, nessun handle da restituire
  // (l'API File di base non da' un riferimento riscrivibile sul disco).
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    // Fuori schermo, non `display:none` (alcuni browser mobile ignorano
    // `.click()` su un input file mai stato nel DOM, o nascosto con
    // display:none, prima di aprire davvero il dialog di sistema) — stesso
    // principio dell'elemento <a> temporaneo di downloadJSON() sopra,
    // rimosso subito dopo l'uso.
    input.style.cssText = "position:fixed;left:-9999px;top:-9999px;";
    document.body.appendChild(input);
    input.onchange = async () => {
      const file = input.files?.[0];
      input.remove();
      if (!file) { resolve(null); return; }
      try {
        const data = JSON.parse(await file.text());
        resolve(isValidSaveData(data) ? { data, handle: null } : null);
      } catch {
        resolve(null);
      }
    };
    // Nessun evento "annullato" affidabile su tutti i browser per <input
    // type=file> (niente `oncancel` universale) — un dialog chiuso senza
    // scegliere nulla semplicemente non richiama mai `onchange`, quindi la
    // Promise resta in sospeso finche' l'utente non riprova. Comportamento
    // accettabile (il chiamante e' gia' dentro un tap su "Carica da file",
    // non blocca il resto della UI), coerente con l'assenza di un modo
    // standard per saperlo.
    input.click();
  });
}
