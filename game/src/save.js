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

export function save(sceneName, r12, buildings) {
  const data = {
    v: 1,
    r12,
    buildings: buildings.map((b) => ({
      id: b.id, type: b.type, x: b.x, y: b.y, depth: b.depth,
      level: b.level, life: b.life, spr: b.spr, construction: b.construction,
      makee: b.makee, prodT: b.prodT,
    })),
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
