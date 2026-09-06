// Lingua dell'interfaccia (EN/IT) — stato globale condiviso da title.js/
// main.js/app.js/buildings.js/tutorial.js, persistito in localStorage cosi'
// la scelta sopravvive a un refresh/ritorno al menu. Il cambio lingua non
// richiede nessun remount: ogni chiamante legge `t()`/`buildingLabel()` di
// nuovo ad ogni frame (drawHtmlText() e' gia' ridisegnato 60 volte al
// secondo), quindi un tap sul bottone "Language" nel menu di pausa si vede
// gia' dal frame successivo.
const STORAGE_KEY = "nimbus_lang";
const SUPPORTED = ["en", "it"];
const FALLBACK = "en";

function detectDefault() {
  try {
    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.startsWith("it")) return "it";
  } catch { /* navigator non disponibile (SSR/test) */ }
  return FALLBACK;
}

let lang = detectDefault();
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED.includes(saved)) lang = saved;
} catch { /* storage non disponibile (privacy mode) */ }

export function getLang() { return lang; }

export function setLang(next) {
  if (!SUPPORTED.includes(next) || next === lang) return lang;
  lang = next;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignorato: solo persistenza */ }
  return lang;
}

export function toggleLang() { return setLang(lang === "en" ? "it" : "en"); }

// Dizionario piatto: ogni voce { en, it }. Le stringhe con segnaposto usano
// `{nome}` (t() sotto li sostituisce con String(vars.nome)) invece di
// template literal per poter vivere nello stesso dizionario data-driven
// delle frasi fisse.
const STRINGS = {
  // ------------------------------------------------------------ menu di pausa
  "pause.title": { en: "PAUSE", it: "PAUSA" },
  "pause.resume": { en: "Resume", it: "Riprendi" },
  "pause.saveToFile": { en: "Save to file", it: "Salva su file" },
  "pause.loadFromFile": { en: "Load from file", it: "Carica da file" },
  "pause.savingOptions": { en: "Saving options", it: "Opzioni di salvataggio" },
  "pause.resetGame": { en: "Reset game", it: "Ricomincia partita" },
  "pause.backToMenu": { en: "Back to menu", it: "Torna al menu" },
  "pause.language": { en: "Language: {lang}", it: "Lingua: {lang}" },

  "savingOptions.title": { en: "SAVING OPTIONS", it: "OPZIONI DI SALVATAGGIO" },
  "savingOptions.autosave": { en: "Autosave: {state}", it: "Salvataggio automatico: {state}" },
  "savingOptions.interval": { en: "Interval: {min} min", it: "Intervallo: {min} min" },
  "savingOptions.duringAttacks": { en: "Save during attacks: {state}", it: "Salva durante gli attacchi: {state}" },
  "savingOptions.duringLowOil": { en: "Save with low oil: {state}", it: "Salva con petrolio scarso: {state}" },
  "savingOptions.back": { en: "Back", it: "Indietro" },
  "common.on": { en: "ON", it: "ON" },
  "common.off": { en: "OFF", it: "OFF" },

  "confirmReset.title": { en: "RESET GAME", it: "RICOMINCIA PARTITA" },
  "confirmReset.warning": {
    en: "This will restart the level from scratch. This action cannot be undone.",
    it: "Il livello ricomincerà da zero. Questa azione non si può annullare.",
  },
  "confirmReset.cancel": { en: "Cancel", it: "Annulla" },

  // ---------------------------------------------------------- pannello edificio
  "buildingInfo.underConstruction": { en: "Under construction…", it: "In costruzione…" },
  "buildingInfo.health": { en: "Health: {cur} / {max}", it: "Salute: {cur} / {max}" },
  "buildingInfo.residents": { en: "Residents: {n}", it: "Abitanti: {n}" },
  "buildingInfo.energy": { en: "Energy: +{ele}/cycle (uses {oil} oil)", it: "Energia: +{ele}/ciclo (consuma {oil} petrolio)" },
  "buildingInfo.levelSuffix": { en: " — Level {level}/{max}", it: " — Livello {level}/{max}" },
  "buildingInfo.close": { en: "Close", it: "Chiudi" },

  "autoDefense.level1.name": { en: "Real threats only", it: "Solo minacce reali" },
  "autoDefense.level1.desc": {
    en: "Automatically engages planes and airships in range. Always on, no extra cost.",
    it: "Ingaggia automaticamente aerei e dirigibili a portata. Sempre attivo, nessun costo extra.",
  },
  "autoDefense.level2.name": { en: "+ Spy patrol", it: "+ Pattuglia antispie" },
  "autoDefense.level2.desc": {
    en: "Also shoots down red spy balloons and recon planes on sight.",
    it: "Abbatte a vista anche le mongolfiere spia rosse e gli aerei da ricognizione.",
  },
  "autoDefense.level3.name": { en: "Full auto", it: "Automatico totale" },
  "autoDefense.level3.desc": {
    en: "Fires at anything in range — spies and resource balloons alike (loot still drops).",
    it: "Spara a tutto ciò che è a portata — spie e mongolfiere di risorse allo stesso modo (il bottino cade comunque).",
  },
  "autoDefense.freeAlwaysOn": { en: "Free — always on", it: "Gratis — sempre attivo" },
  "autoDefense.costPerMin": { en: "-{cost} mon/min", it: "-{cost} mon/min" },

  // ---------------------------------------------------------- banca/scambi
  "bank.title": { en: "GET A LOAN", it: "RICHIEDI UN PRESTITO" },
  "bank.subtitle": { en: "20% interest rate", it: "Tasso d'interesse 20%" },
  "bank.inYears": { en: " in {years} years", it: " in {years} anni" },
  "trade.title": { en: "TRADE RESOURCES", it: "SCAMBIA RISORSE" },
  "trade.getPrefix": { en: "Get {amount} ", it: "Ottieni {amount} " },
  "trade.forMiddle": { en: " for {amount} ", it: " per {amount} " },

  // ---------------------------------------------------------- game over/vittoria
  "gameOver.title": { en: "GAME OVER", it: "GAME OVER" },
  "gameOver.reasonChies": {
    en: "The City center, the city's historic building, has been destroyed.",
    it: "Il Municipio, l'edificio storico della città, è stato distrutto.",
  },
  "gameOver.reasonOil": {
    en: "The oil has run out: the rotors have stopped and the platform has crashed.",
    it: "Il petrolio è finito: i rotori si sono fermati e la piattaforma è precipitata.",
  },
  "gameOver.loadLastSave": { en: "Load last save", it: "Carica ultimo salvataggio" },
  "gameOver.restartLevel": { en: "Restart level", it: "Ricomincia livello" },
  "congrats.title": { en: "CONGRATULATIONS!", it: "COMPLIMENTI!" },
  "congrats.subtitle": {
    en: "The Skyscraper stands complete, the tallest building this city has ever raised. " +
      "From now on, enemies will no longer attack the city. Keep building, there's no limit from here.",
    it: "Il Grattacielo è completo, l'edificio più alto che questa città abbia mai costruito. " +
      "Da ora in poi i nemici non attaccheranno più la città. Continua a costruire, da qui non c'è limite.",
  },
  "congrats.keepPlaying": { en: "Keep playing", it: "Continua a giocare" },

  // ---------------------------------------------------------------- edifici
  "building.chies": { en: "City center", it: "Municipio" },
  "building.industria": { en: "Industry", it: "Industria" },
  "building.casa": { en: "House", it: "Casa" },
  "building.missile": { en: "Missile Launcher", it: "Lanciamissili" },
  "building.solare": { en: "Solar Panels", it: "Pannelli solari" },
  "building.parco": { en: "Park", it: "Parco" },
  "building.club": { en: "Club", it: "Club" },
  "building.villa": { en: "Villa", it: "Villa" },
  "building.gatling": { en: "Gatling Gun", it: "Mitragliatrice Gatling" },
  "building.laser": { en: "Laser", it: "Laser" },
  "building.eolico": { en: "Wind Turbine", it: "Turbina eolica" },
  "building.palazzo": { en: "Building", it: "Palazzo" },
  "building.palazzoRd": { en: "Building", it: "Palazzo" },
  "building.museo": { en: "Museum", it: "Museo" },
  "building.museoRd": { en: "Museum", it: "Museo" },
  "building.monum": { en: "Monument", it: "Monumento" },
  "building.banca": { en: "Bank", it: "Banca" },
  "building.grattacielo": { en: "Skyscraper", it: "Grattacielo" },
  "building.ruspa": { en: "Bulldozer", it: "Ruspa" },

  // ------------------------------------------------------- messaggi di gioco
  "msg.placementCancelled": { en: "placement cancelled", it: "piazzamento annullato" },
  "msg.built": { en: "Built: {label} (-{cost} mon)", it: "Costruito: {label} (-{cost} mon)" },
  "msg.cantSaveNow": { en: "You can't save right now: {reason}", it: "Non puoi salvare adesso: {reason}" },
  "msg.gameSaved": { en: "game saved", it: "partita salvata" },
  "msg.gameSavedToFile": { en: "game saved to file", it: "partita salvata su file" },
  "msg.saveToFileFailed": { en: "save to file failed", it: "salvataggio su file non riuscito" },
  "msg.loadFromFileFailed": { en: "load from file failed", it: "caricamento da file non riuscito" },
  "msg.invalidFile": { en: "invalid or modified file", it: "file non valido o modificato" },
  "msg.gameLoadedFromFile": { en: "game loaded from file", it: "partita caricata da file" },
  "msg.loanObtained": { en: "loan of {amount} mon obtained", it: "prestito di {amount} mon ottenuto" },
  "msg.traded": { en: "traded {giveAmount} {give} for {takeAmount} {take}", it: "scambiati {giveAmount} {give} per {takeAmount} {take}" },
  "msg.needResourceHave": { en: "need {amount} {resource} (have {have})", it: "servono {amount} {resource} (hai {have})" },
  "msg.levelToUnlock": { en: "{label}: level {level} to unlock", it: "{label}: livello {level} per sbloccare" },
  "msg.noBuildingSelected": {
    en: "no building selected — open the menu with the crane",
    it: "nessun edificio selezionato — apri il menu con la gru",
  },
  "msg.notRebuiltYet": { en: "{label}: not rebuilt yet", it: "{label}: non ancora ricostruito" },
  "msg.constructionInProgress": { en: "construction already in progress", it: "cantiere già in corso" },
  "msg.notDemolishable": {
    en: "{label}: not demolishable/repairable with the bulldozer",
    it: "{label}: non demolibile/riparabile con la ruspa",
  },
  "msg.needMonHave": { en: "need {cost} mon (have {have})", it: "servono {cost} mon (hai {have})" },
  "msg.confirmDemolish": {
    en: "demolish/repair: tap \"yes\" to confirm (-{cost} mon)",
    it: "demolisci/ripara: tocca \"sì\" per confermare (-{cost} mon)",
  },
  "msg.demolishedLotsFree": { en: "demolished — lots free", it: "demolito — lotti liberati" },
  "msg.loanAlreadyActive": { en: "loan already active", it: "prestito già attivo" },
  "msg.fire": { en: "fire!", it: "fuoco!" },
  "msg.noTargetInRange": { en: "no target in range", it: "nessun bersaglio a portata" },
  "msg.insufficientEnergy": { en: "insufficient energy", it: "energia insufficiente" },
  "msg.cannonReloading": { en: "cannon reloading", it: "cannone in ricarica" },
  "msg.constructionStarted": { en: "construction started", it: "cantiere avviato" },
  "msg.constructionStartedBulldozer": { en: "construction started (bulldozer)", it: "cantiere avviato (ruspa)" },
  "msg.solarPlaced": { en: "solar panels placed on the park (-1000 mon)", it: "pannelli solari installati sul parco (-1000 mon)" },
  "msg.alreadySolarOnPark": { en: "there's already a solar panel on this park", it: "c'è già un pannello solare su questo parco" },
  "msg.needFreeArea": {
    en: "need a free area of {count} adjacent lots (a rectangle)",
    it: "serve un'area libera di {count} lotti adiacenti (un rettangolo)",
  },
  "msg.notPartOfPlatform": { en: "this area isn't part of the platform yet", it: "quest'area non fa ancora parte della piattaforma" },
  "msg.tooCloseToTurret": { en: "too close to another defense turret", it: "troppo vicino a un'altra torretta difensiva" },
  "msg.needFreeDiagonalLot": { en: "need a free lot diagonally adjacent", it: "serve un lotto libero in diagonale" },
  "msg.dragToFreeLot": { en: "drag to a free adjacent lot", it: "trascina su un lotto libero adiacente" },
  "msg.itsFree": { en: "It's free!", it: "È gratis!" },
  "msg.oilAlmostDepleted": { en: "oil is almost depleted", it: "il petrolio sta per esaurirsi" },
  "msg.stormHitting": { en: "a storm is hitting the city", it: "una tempesta sta colpendo la città" },
  "msg.attackIncoming": { en: "an attack is incoming", it: "un attacco è in arrivo" },
  "msg.threatNear": { en: "a threat is near the city", it: "una minaccia è vicina alla città" },
  "msg.sandboxOn": {
    en: "sandbox mode ON: infinite resources, everything unlocked",
    it: "modalità sandbox ATTIVA: risorse infinite, tutto sbloccato",
  },
  "msg.sandboxOff": { en: "sandbox mode OFF", it: "modalità sandbox DISATTIVATA" },
  "msg.gameLoaded": { en: "game loaded", it: "partita caricata" },
  "msg.noSaveFound": { en: "no save found", it: "nessun salvataggio trovato" },

  // ---------------------------------------------------------------- upgrade
  "upgrade.maxLevel": { en: "max level", it: "livello massimo" },
  "upgrade.needProductionCycles": {
    en: "need {needed} production cycles (now {done})",
    it: "servono {needed} cicli di produzione (ora a {done})",
  },
  "upgrade.needFullGrowth": { en: "need full growth ({done}/{needed})", it: "serve crescita piena ({done}/{needed})" },
  "upgrade.needPopulation": { en: "need population {needed} (now {done})", it: "serve popolazione {needed} (ora a {done})" },
  "upgrade.requiresChiesLevel": { en: "requires the city center at level {level}", it: "richiede il municipio al livello {level}" },
  "upgrade.needResources": { en: "need {list}", it: "servono {list}" },
  "upgrade.notRebuildable": { en: "not rebuildable with the bulldozer", it: "non ricostruibile con la ruspa" },
  "unlock.atLevel": { en: "Unlock at level {level}", it: "Sblocca al livello {level}" },

  // ---------------------------------------------------------------- loading
  "loading.default": { en: "loading", it: "caricamento" },
  "loading.interface": { en: "loading interface", it: "caricamento interfaccia" },
  "loading.city": { en: "loading city", it: "caricamento città" },
  "hwWarning.text": {
    en: "Hardware acceleration unavailable on this device/browser — performance may be very limited. Try updating your browser or switching to Chrome.",
    it: "Accelerazione hardware non disponibile su questo dispositivo/browser — le prestazioni potrebbero essere molto limitate. Prova ad aggiornare il browser o a passare a Chrome.",
  },
  "hwWarning.dismiss": { en: "Dismiss", it: "Chiudi" },

  // ------------------------------------------------------------- title screen
  "title.loadGame": { en: "Load game", it: "Carica partita" },

  // --------------------------------------------------------------------- mesi
  "month.1": { en: "Jan", it: "Gen" },
  "month.2": { en: "Feb", it: "Feb" },
  "month.3": { en: "Mar", it: "Mar" },
  "month.4": { en: "Apr", it: "Apr" },
  "month.5": { en: "May", it: "Mag" },
  "month.6": { en: "Jun", it: "Giu" },
  "month.7": { en: "Jul", it: "Lug" },
  "month.8": { en: "Aug", it: "Ago" },
  "month.9": { en: "Sep", it: "Set" },
  "month.10": { en: "Oct", it: "Ott" },
  "month.11": { en: "Nov", it: "Nov" },
  "month.12": { en: "Dec", it: "Dic" },
};

export function t(key, vars) {
  const entry = STRINGS[key];
  let str = entry ? (entry[lang] ?? entry[FALLBACK] ?? key) : key;
  if (vars) for (const k in vars) str = str.split(`{${k}}`).join(String(vars[k]));
  return str;
}

// Etichetta di un edificio dal suo `type` interno (le stesse chiavi di
// BUILDING_TYPES in buildings.js) — un solo punto per la traduzione, riusato
// sia da buildings.js (BUILDING_TYPES[x].label, letta dal pannello
// informativo/titoli) sia da main.js (OTHER_BUILDINGS/STAR_BUILDINGS/
// BUILDING_LABEL, la riga costruzioni e i suoi messaggi).
export function buildingLabel(type) { return t(`building.${type}`); }
