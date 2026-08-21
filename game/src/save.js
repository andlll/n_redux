// Serializzazione esplicita (STUDIO.md §5.6 e §7.1): l'originale si
// appoggiava a `action_save_game`, uno snapshot binario di GameMaker che
// non e' replicabile "per caso". Qui lo stato che conta — risorse ed
// edifici piazzati — e' gia' dati semplici, quindi salvarlo e' solo JSON.
//
// Stessi nomi di slot dell'originale (§5.6): "nimsav" per la partita
// normale, "nimsav_eas" per quella facile, cosi' il concetto si mappa
// diretto anche se il formato e' nuovo.

const SLOT = { match: "nimsav", match_easy: "nimsav_eas" };

export function saveSlotFor(sceneName) {
  return SLOT[sceneName] ?? `nimsav_${sceneName}`;
}

// `ruins` (game/src/main.js, destroyBuilding()): posizione/sprite bastano a
// ricrearli, il resto (`_f`/`obj: "decor"`) e' derivato a runtime, non
// serializzato — stesso principio gia' scelto per `buildings` sopra (niente
// `_f`, ricalcolato al caricamento). Campo aggiunto senza toccare `v`: un
// salvataggio vecchio senza `ruins` resta valido, `doLoad()` in main.js lo
// legge con `?? []`.
// `blockedSlots` (game/src/main.js, placeAt()): i lotti "extra" che
// `eolico` occupa oltre a quello toccato (buildings.js, `def.multiTile`) —
// nessun edificio/rudere ci sta sopra, solo un placeholder permanentemente
// bloccato: senza salvarli esplicitamente un ciclo salva/carica li
// libererebbe di nuovo (doLoad() li rilegge come `buildings`/`ruins`, ma
// questi lotti non compaiono in nessuno dei due).
// `platformState` (game/src/platform.js, catena fari -> seconda
// piattaforma): solo `match` la passa, `match_easy` resta `undefined` —
// `data.platformState` sara' quindi assente nel suo salvataggio, letto con
// `?? createFaroState()` da doLoad() in main.js come ogni altro campo
// opzionale qui sopra.
export function save(sceneName, r12, buildings, ruins, blockedSlots, platformState) {
  const data = {
    v: 1,
    r12,
    buildings: buildings.map((b) => ({
      id: b.id, type: b.type, x: b.x, y: b.y, depth: b.depth,
      level: b.level, life: b.life, spr: b.spr, construction: b.construction,
      makee: b.makee, prodT: b.prodT, decorSpr: b.decorSpr,
      ava: b.ava, growthT: b.growthT, growthNext: b.growthNext, consT: b.consT,
      coinT: b.coinT, coinNext: b.coinNext, solarT: b.solarT, windT: b.windT,
      overpark: b.overpark, oversolar: b.oversolar,
    })),
    ruins: ruins.map((r) => ({ x: r.x, y: r.y, spr: r.spr })),
    blockedSlots: blockedSlots.map((s) => ({ x: s.x, y: s.y })),
    platformState,
  };
  localStorage.setItem(saveSlotFor(sceneName), JSON.stringify(data));
}

export function load(sceneName) {
  const raw = localStorage.getItem(saveSlotFor(sceneName));
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (data.v !== 1) return null;
    return data;
  } catch {
    return null;
  }
}
