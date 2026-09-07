// Lingua dell'interfaccia (EN/IT/ES/PT) — stato globale condiviso da title.js/
// main.js/app.js/buildings.js/tutorial.js, persistito in localStorage cosi'
// la scelta sopravvive a un refresh/ritorno al menu. Il cambio lingua non
// richiede nessun remount: ogni chiamante legge `t()`/`buildingLabel()` di
// nuovo ad ogni frame (drawHtmlText() e' gia' ridisegnato 60 volte al
// secondo), quindi un tap sul bottone "Language" nel menu di pausa si vede
// gia' dal frame successivo.
//
// Aggiungere una lingua: 1) aggiungerne il codice a SUPPORTED sotto (l'ordine
// e' quello in cui cycleLang() la propone); 2) aggiungere il ramo relativo in
// detectDefault() se ha senso auto-rilevarla da navigator.language; 3)
// aggiungere la chiave mancante ad OGNI entry di STRINGS sotto (t() ricade su
// FALLBACK/EN se manca, quindi una lingua a meta' non rompe nulla, mostra
// solo inglese dove manca); 4) tutorial.js ha un secondo dizionario a parte
// (TUTORIAL_TEXTS_*, un array parallelo per lingua) perche' il balloon del
// tutorial non passa da t() — va esteso li' separatamente.
const STORAGE_KEY = "nimbus_lang";
const SUPPORTED = ["en", "it", "es", "pt"];
const FALLBACK = "en";

function detectDefault() {
  try {
    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.startsWith("it")) return "it";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("pt")) return "pt";
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

// Un solo bottone nel menu di pausa (t("pause.language"), main.js) propone
// SEMPRE la lingua SUCCESSIVA in SUPPORTED, tornando in testa dopo l'ultima
// — stesso bottone/stessa azione di quando le lingue erano solo due (era un
// vero toggle EN<->IT), ora generalizzato a un ciclo cosi' aggiungere una
// lingua a SUPPORTED (sopra) basta a renderla raggiungibile, senza toccare
// main.js.
export function cycleLang() {
  const idx = SUPPORTED.indexOf(lang);
  return setLang(SUPPORTED[(idx + 1) % SUPPORTED.length]);
}

// Dizionario piatto: ogni voce { en, it, es, pt }. Le stringhe con segnaposto
// usano `{nome}` (t() sotto li sostituisce con String(vars.nome)) invece di
// template literal per poter vivere nello stesso dizionario data-driven
// delle frasi fisse.
const STRINGS = {
  // ------------------------------------------------------------ menu di pausa
  "pause.title": { en: "PAUSE", it: "PAUSA", es: "PAUSA", pt: "PAUSA" },
  "pause.resume": { en: "Resume", it: "Riprendi", es: "Reanudar", pt: "Continuar" },
  "pause.saveToFile": { en: "Save to file", it: "Salva su file", es: "Guardar en archivo", pt: "Salvar em arquivo" },
  "pause.loadFromFile": { en: "Load from file", it: "Carica da file", es: "Cargar desde archivo", pt: "Carregar de arquivo" },
  "pause.savingOptions": { en: "Saving options", it: "Opzioni di salvataggio", es: "Opciones de guardado", pt: "Opções de salvamento" },
  "pause.resetGame": { en: "Reset game", it: "Ricomincia partita", es: "Reiniciar partida", pt: "Reiniciar partida" },
  "pause.backToMenu": { en: "Back to menu", it: "Torna al menu", es: "Volver al menú", pt: "Voltar ao menu" },
  "pause.language": { en: "Language: {lang}", it: "Lingua: {lang}", es: "Idioma: {lang}", pt: "Idioma: {lang}" },

  "savingOptions.title": { en: "SAVING OPTIONS", it: "OPZIONI DI SALVATAGGIO", es: "OPCIONES DE GUARDADO", pt: "OPÇÕES DE SALVAMENTO" },
  "savingOptions.autosave": { en: "Autosave: {state}", it: "Salvataggio automatico: {state}", es: "Guardado automático: {state}", pt: "Salvamento automático: {state}" },
  "savingOptions.interval": { en: "Interval: {min} min", it: "Intervallo: {min} min", es: "Intervalo: {min} min", pt: "Intervalo: {min} min" },
  "savingOptions.duringAttacks": { en: "Save during attacks: {state}", it: "Salva durante gli attacchi: {state}", es: "Guardar durante los ataques: {state}", pt: "Salvar durante ataques: {state}" },
  "savingOptions.duringLowOil": { en: "Save with low oil: {state}", it: "Salva con petrolio scarso: {state}", es: "Guardar con petróleo escaso: {state}", pt: "Salvar com petróleo baixo: {state}" },
  "savingOptions.back": { en: "Back", it: "Indietro", es: "Atrás", pt: "Voltar" },
  "common.on": { en: "ON", it: "ON", es: "ON", pt: "ON" },
  "common.off": { en: "OFF", it: "OFF", es: "OFF", pt: "OFF" },

  "confirmReset.title": { en: "RESET GAME", it: "RICOMINCIA PARTITA", es: "REINICIAR PARTIDA", pt: "REINICIAR PARTIDA" },
  "confirmReset.warning": {
    en: "This will restart the level from scratch. This action cannot be undone.",
    it: "Il livello ricomincerà da zero. Questa azione non si può annullare.",
    es: "El nivel se reiniciará desde cero. Esta acción no se puede deshacer.",
    pt: "O nível será reiniciado do zero. Esta ação não pode ser desfeita.",
  },
  "confirmReset.cancel": { en: "Cancel", it: "Annulla", es: "Cancelar", pt: "Cancelar" },

  // ---------------------------------------------------------- pannello edificio
  "buildingInfo.underConstruction": { en: "Under construction…", it: "In costruzione…", es: "En construcción…", pt: "Em construção…" },
  "buildingInfo.health": { en: "Health: {cur} / {max}", it: "Salute: {cur} / {max}", es: "Salud: {cur} / {max}", pt: "Saúde: {cur} / {max}" },
  "buildingInfo.residents": { en: "Residents: {n}", it: "Abitanti: {n}", es: "Habitantes: {n}", pt: "Moradores: {n}" },
  "buildingInfo.energy": { en: "Energy: +{ele}/cycle (uses {oil} oil)", it: "Energia: +{ele}/ciclo (consuma {oil} petrolio)", es: "Energía: +{ele}/ciclo (consume {oil} petróleo)", pt: "Energia: +{ele}/ciclo (consome {oil} petróleo)" },
  "buildingInfo.levelSuffix": { en: " — Level {level}/{max}", it: " — Livello {level}/{max}", es: " — Nivel {level}/{max}", pt: " — Nível {level}/{max}" },
  "buildingInfo.close": { en: "Close", it: "Chiudi", es: "Cerrar", pt: "Fechar" },

  "autoDefense.level1.name": { en: "Real threats only", it: "Solo minacce reali", es: "Solo amenazas reales", pt: "Apenas ameaças reais" },
  "autoDefense.level1.desc": {
    en: "Automatically engages planes and airships in range. Always on, no extra cost.",
    it: "Ingaggia automaticamente aerei e dirigibili a portata. Sempre attivo, nessun costo extra.",
    es: "Ataca automáticamente aviones y dirigibles a su alcance. Siempre activo, sin coste extra.",
    pt: "Ataca automaticamente aviões e dirigíveis ao alcance. Sempre ativo, sem custo extra.",
  },
  "autoDefense.level2.name": { en: "+ Spy patrol", it: "+ Pattuglia antispie", es: "+ Patrulla antiespías", pt: "+ Patrulha antiespiões" },
  "autoDefense.level2.desc": {
    en: "Also shoots down red spy balloons and recon planes on sight.",
    it: "Abbatte a vista anche le mongolfiere spia rosse e gli aerei da ricognizione.",
    es: "También derriba en cuanto los ve los globos espía rojos y los aviones de reconocimiento.",
    pt: "Também abate à vista os balões espiões vermelhos e os aviões de reconhecimento.",
  },
  "autoDefense.level3.name": { en: "Full auto", it: "Automatico totale", es: "Automático total", pt: "Automático total" },
  "autoDefense.level3.desc": {
    en: "Fires at anything in range — spies and resource balloons alike (loot still drops).",
    it: "Spara a tutto ciò che è a portata — spie e mongolfiere di risorse allo stesso modo (il bottino cade comunque).",
    es: "Dispara a todo lo que esté a su alcance — tanto a espías como a globos de recursos (el botín cae igualmente).",
    pt: "Atira em tudo que estiver ao alcance — tanto espiões quanto balões de recursos (o saque continua caindo).",
  },
  "autoDefense.freeAlwaysOn": { en: "Free — always on", it: "Gratis — sempre attivo", es: "Gratis — siempre activo", pt: "Grátis — sempre ativo" },
  "autoDefense.costPerMin": { en: "-{cost} mon/min", it: "-{cost} mon/min", es: "-{cost} mon/min", pt: "-{cost} mon/min" },

  // ---------------------------------------------------------- banca/scambi
  "bank.title": { en: "GET A LOAN", it: "RICHIEDI UN PRESTITO", es: "SOLICITAR UN PRÉSTAMO", pt: "SOLICITAR UM EMPRÉSTIMO" },
  "bank.subtitle": { en: "20% interest rate", it: "Tasso d'interesse 20%", es: "Tasa de interés del 20%", pt: "Taxa de juros de 20%" },
  "bank.inYears": { en: " in {years} years", it: " in {years} anni", es: " en {years} años", pt: " em {years} anos" },
  "trade.title": { en: "TRADE RESOURCES", it: "SCAMBIA RISORSE", es: "INTERCAMBIAR RECURSOS", pt: "TROCAR RECURSOS" },
  "trade.getPrefix": { en: "Get {amount} ", it: "Ottieni {amount} ", es: "Obtén {amount} ", pt: "Receba {amount} " },
  "trade.forMiddle": { en: " for {amount} ", it: " per {amount} ", es: " por {amount} ", pt: " por {amount} " },

  // ---------------------------------------------------------- game over/vittoria
  "gameOver.title": { en: "GAME OVER", it: "GAME OVER", es: "GAME OVER", pt: "GAME OVER" },
  "gameOver.reasonChies": {
    en: "The City center, the city's historic building, has been destroyed.",
    it: "Il Municipio, l'edificio storico della città, è stato distrutto.",
    es: "El Ayuntamiento, el edificio histórico de la ciudad, ha sido destruido.",
    pt: "A Prefeitura, o edifício histórico da cidade, foi destruída.",
  },
  "gameOver.reasonOil": {
    en: "The oil has run out: the rotors have stopped and the platform has crashed.",
    it: "Il petrolio è finito: i rotori si sono fermati e la piattaforma è precipitata.",
    es: "El petróleo se ha agotado: los rotores se han detenido y la plataforma se ha estrellado.",
    pt: "O petróleo acabou: os rotores pararam e a plataforma caiu.",
  },
  "gameOver.loadLastSave": { en: "Load last save", it: "Carica ultimo salvataggio", es: "Cargar última partida", pt: "Carregar último salvamento" },
  "gameOver.restartLevel": { en: "Restart level", it: "Ricomincia livello", es: "Reiniciar nivel", pt: "Reiniciar nível" },
  "congrats.title": { en: "CONGRATULATIONS!", it: "COMPLIMENTI!", es: "¡FELICIDADES!", pt: "PARABÉNS!" },
  "congrats.subtitle": {
    en: "The Skyscraper stands complete, the tallest building this city has ever raised. " +
      "From now on, enemies will no longer attack the city. Keep building, there's no limit from here.",
    it: "Il Grattacielo è completo, l'edificio più alto che questa città abbia mai costruito. " +
      "Da ora in poi i nemici non attaccheranno più la città. Continua a costruire, da qui non c'è limite.",
    es: "El Rascacielos está completo, el edificio más alto que esta ciudad haya construido jamás. " +
      "A partir de ahora, los enemigos ya no atacarán la ciudad. Sigue construyendo, desde aquí no hay límite.",
    pt: "O Arranha-céu está completo, o edifício mais alto que esta cidade já construiu. " +
      "A partir de agora, os inimigos não atacarão mais a cidade. Continue construindo, daqui não há limite.",
  },
  "congrats.keepPlaying": { en: "Keep playing", it: "Continua a giocare", es: "Seguir jugando", pt: "Continuar jogando" },

  // ---------------------------------------------------------------- edifici
  "building.chies": { en: "City center", it: "Municipio", es: "Ayuntamiento", pt: "Prefeitura" },
  "building.industria": { en: "Industry", it: "Industria", es: "Industria", pt: "Indústria" },
  "building.casa": { en: "House", it: "Casa", es: "Casa", pt: "Casa" },
  "building.missile": { en: "Missile Launcher", it: "Lanciamissili", es: "Lanzamisiles", pt: "Lançador de Mísseis" },
  "building.solare": { en: "Solar Panels", it: "Pannelli solari", es: "Paneles solares", pt: "Painéis Solares" },
  "building.parco": { en: "Park", it: "Parco", es: "Parque", pt: "Parque" },
  "building.club": { en: "Club", it: "Club", es: "Club", pt: "Clube" },
  "building.villa": { en: "Villa", it: "Villa", es: "Villa", pt: "Villa" },
  "building.gatling": { en: "Gatling Gun", it: "Mitragliatrice Gatling", es: "Ametralladora Gatling", pt: "Metralhadora Gatling" },
  "building.laser": { en: "Laser", it: "Laser", es: "Láser", pt: "Laser" },
  "building.eolico": { en: "Wind Turbine", it: "Turbina eolica", es: "Turbina eólica", pt: "Turbina Eólica" },
  "building.palazzo": { en: "Building", it: "Palazzo", es: "Edificio", pt: "Prédio" },
  "building.palazzoRd": { en: "Building", it: "Palazzo", es: "Edificio", pt: "Prédio" },
  "building.museo": { en: "Museum", it: "Museo", es: "Museo", pt: "Museu" },
  "building.museoRd": { en: "Museum", it: "Museo", es: "Museo", pt: "Museu" },
  "building.monum": { en: "Monument", it: "Monumento", es: "Monumento", pt: "Monumento" },
  "building.banca": { en: "Bank", it: "Banca", es: "Banco", pt: "Banco" },
  "building.grattacielo": { en: "Skyscraper", it: "Grattacielo", es: "Rascacielos", pt: "Arranha-céu" },
  "building.ruspa": { en: "Bulldozer", it: "Ruspa", es: "Buldócer", pt: "Buldôzer" },

  // ------------------------------------------------------- messaggi di gioco
  "msg.placementCancelled": { en: "placement cancelled", it: "piazzamento annullato", es: "colocación cancelada", pt: "colocação cancelada" },
  "msg.built": { en: "Built: {label} (-{cost} mon)", it: "Costruito: {label} (-{cost} mon)", es: "Construido: {label} (-{cost} mon)", pt: "Construído: {label} (-{cost} mon)" },
  "msg.cantSaveNow": { en: "You can't save right now: {reason}", it: "Non puoi salvare adesso: {reason}", es: "No puedes guardar ahora: {reason}", pt: "Você não pode salvar agora: {reason}" },
  "msg.gameSaved": { en: "game saved", it: "partita salvata", es: "partida guardada", pt: "partida salva" },
  "msg.gameSavedToFile": { en: "game saved to file", it: "partita salvata su file", es: "partida guardada en archivo", pt: "partida salva em arquivo" },
  "msg.saveToFileFailed": { en: "save to file failed", it: "salvataggio su file non riuscito", es: "no se pudo guardar en archivo", pt: "falha ao salvar em arquivo" },
  "msg.loadFromFileFailed": { en: "load from file failed", it: "caricamento da file non riuscito", es: "no se pudo cargar desde archivo", pt: "falha ao carregar do arquivo" },
  "msg.invalidFile": { en: "invalid or modified file", it: "file non valido o modificato", es: "archivo no válido o modificado", pt: "arquivo inválido ou modificado" },
  "msg.gameLoadedFromFile": { en: "game loaded from file", it: "partita caricata da file", es: "partida cargada desde archivo", pt: "partida carregada do arquivo" },
  "msg.loanObtained": { en: "loan of {amount} mon obtained", it: "prestito di {amount} mon ottenuto", es: "préstamo de {amount} mon obtenido", pt: "empréstimo de {amount} mon obtido" },
  "msg.traded": { en: "traded {giveAmount} {give} for {takeAmount} {take}", it: "scambiati {giveAmount} {give} per {takeAmount} {take}", es: "intercambiados {giveAmount} {give} por {takeAmount} {take}", pt: "trocado {giveAmount} {give} por {takeAmount} {take}" },
  "msg.needResourceHave": { en: "need {amount} {resource} (have {have})", it: "servono {amount} {resource} (hai {have})", es: "necesitas {amount} {resource} (tienes {have})", pt: "precisa de {amount} {resource} (tem {have})" },
  "msg.levelToUnlock": { en: "{label}: level {level} to unlock", it: "{label}: livello {level} per sbloccare", es: "{label}: nivel {level} para desbloquear", pt: "{label}: nível {level} para desbloquear" },
  "msg.noBuildingSelected": {
    en: "no building selected — open the menu with the crane",
    it: "nessun edificio selezionato — apri il menu con la gru",
    es: "ningún edificio seleccionado — abre el menú con la grúa",
    pt: "nenhum edifício selecionado — abra o menu com o guindaste",
  },
  "msg.notRebuiltYet": { en: "{label}: not rebuilt yet", it: "{label}: non ancora ricostruito", es: "{label}: aún no reconstruido", pt: "{label}: ainda não reconstruído" },
  "msg.constructionInProgress": { en: "construction already in progress", it: "cantiere già in corso", es: "obra ya en curso", pt: "obra já em andamento" },
  "msg.notDemolishable": {
    en: "{label}: not demolishable/repairable with the bulldozer",
    it: "{label}: non demolibile/riparabile con la ruspa",
    es: "{label}: no demolible/reparable con el buldócer",
    pt: "{label}: não demolível/reparável com o buldôzer",
  },
  "msg.needMonHave": { en: "need {cost} mon (have {have})", it: "servono {cost} mon (hai {have})", es: "necesitas {cost} mon (tienes {have})", pt: "precisa de {cost} mon (tem {have})" },
  "msg.confirmDemolish": {
    en: "demolish/repair: tap \"yes\" to confirm (-{cost} mon)",
    it: "demolisci/ripara: tocca \"sì\" per confermare (-{cost} mon)",
    es: "demoler/reparar: toca \"sí\" para confirmar (-{cost} mon)",
    pt: "demolir/reparar: toque em \"sim\" para confirmar (-{cost} mon)",
  },
  "msg.demolishedLotsFree": { en: "demolished — lots free", it: "demolito — lotti liberati", es: "demolido — parcelas liberadas", pt: "demolido — lotes liberados" },
  "msg.loanAlreadyActive": { en: "loan already active", it: "prestito già attivo", es: "préstamo ya activo", pt: "empréstimo já ativo" },
  "msg.fire": { en: "fire!", it: "fuoco!", es: "¡fuego!", pt: "fogo!" },
  "msg.noTargetInRange": { en: "no target in range", it: "nessun bersaglio a portata", es: "ningún objetivo a tiro", pt: "nenhum alvo ao alcance" },
  "msg.insufficientEnergy": { en: "insufficient energy", it: "energia insufficiente", es: "energía insuficiente", pt: "energia insuficiente" },
  "msg.cannonReloading": { en: "cannon reloading", it: "cannone in ricarica", es: "cañón recargando", pt: "canhão recarregando" },
  "msg.constructionStarted": { en: "construction started", it: "cantiere avviato", es: "obra iniciada", pt: "obra iniciada" },
  "msg.constructionStartedBulldozer": { en: "construction started (bulldozer)", it: "cantiere avviato (ruspa)", es: "obra iniciada (buldócer)", pt: "obra iniciada (buldôzer)" },
  "msg.solarPlaced": { en: "solar panels placed on the park (-1000 mon)", it: "pannelli solari installati sul parco (-1000 mon)", es: "paneles solares instalados en el parque (-1000 mon)", pt: "painéis solares instalados no parque (-1000 mon)" },
  "msg.alreadySolarOnPark": { en: "there's already a solar panel on this park", it: "c'è già un pannello solare su questo parco", es: "ya hay un panel solar en este parque", pt: "já há um painel solar neste parque" },
  "msg.needFreeArea": {
    en: "need a free area of {count} adjacent lots (a rectangle)",
    it: "serve un'area libera di {count} lotti adiacenti (un rettangolo)",
    es: "necesitas un área libre de {count} parcelas adyacentes (un rectángulo)",
    pt: "precisa de uma área livre de {count} lotes adjacentes (um retângulo)",
  },
  "msg.notPartOfPlatform": { en: "this area isn't part of the platform yet", it: "quest'area non fa ancora parte della piattaforma", es: "esta área todavía no forma parte de la plataforma", pt: "esta área ainda não faz parte da plataforma" },
  "msg.tooCloseToTurret": { en: "too close to another defense turret", it: "troppo vicino a un'altra torretta difensiva", es: "demasiado cerca de otra torreta defensiva", pt: "muito perto de outra torre de defesa" },
  "msg.needFreeDiagonalLot": { en: "need a free lot diagonally adjacent", it: "serve un lotto libero in diagonale", es: "necesitas una parcela libre en diagonal", pt: "precisa de um lote livre na diagonal" },
  "msg.dragToFreeLot": { en: "drag to a free adjacent lot", it: "trascina su un lotto libero adiacente", es: "arrastra a una parcela libre adyacente", pt: "arraste para um lote livre adjacente" },
  "msg.itsFree": { en: "It's free!", it: "È gratis!", es: "¡Es gratis!", pt: "É grátis!" },
  "msg.oilAlmostDepleted": { en: "oil is almost depleted", it: "il petrolio sta per esaurirsi", es: "el petróleo está a punto de agotarse", pt: "o petróleo está quase acabando" },
  "msg.stormHitting": { en: "a storm is hitting the city", it: "una tempesta sta colpendo la città", es: "una tormenta está azotando la ciudad", pt: "uma tempestade está atingindo a cidade" },
  "msg.attackIncoming": { en: "an attack is incoming", it: "un attacco è in arrivo", es: "un ataque está en camino", pt: "um ataque está a caminho" },
  "msg.threatNear": { en: "a threat is near the city", it: "una minaccia è vicina alla città", es: "una amenaza está cerca de la ciudad", pt: "uma ameaça está perto da cidade" },
  "msg.sandboxOn": {
    en: "sandbox mode ON: infinite resources, everything unlocked",
    it: "modalità sandbox ATTIVA: risorse infinite, tutto sbloccato",
    es: "modo sandbox ACTIVADO: recursos infinitos, todo desbloqueado",
    pt: "modo sandbox ATIVADO: recursos infinitos, tudo desbloqueado",
  },
  "msg.sandboxOff": { en: "sandbox mode OFF", it: "modalità sandbox DISATTIVATA", es: "modo sandbox DESACTIVADO", pt: "modo sandbox DESATIVADO" },
  "msg.gameLoaded": { en: "game loaded", it: "partita caricata", es: "partida cargada", pt: "partida carregada" },
  "msg.noSaveFound": { en: "no save found", it: "nessun salvataggio trovato", es: "no se encontró ninguna partida guardada", pt: "nenhum salvamento encontrado" },

  // ---------------------------------------------------------------- upgrade
  "upgrade.maxLevel": { en: "max level", it: "livello massimo", es: "nivel máximo", pt: "nível máximo" },
  "upgrade.needProductionCycles": {
    en: "need {needed} production cycles (now {done})",
    it: "servono {needed} cicli di produzione (ora a {done})",
    es: "necesitas {needed} ciclos de producción (ahora {done})",
    pt: "precisa de {needed} ciclos de produção (agora {done})",
  },
  "upgrade.needFullGrowth": { en: "need full growth ({done}/{needed})", it: "serve crescita piena ({done}/{needed})", es: "necesitas crecimiento completo ({done}/{needed})", pt: "precisa de crescimento completo ({done}/{needed})" },
  "upgrade.needPopulation": { en: "need population {needed} (now {done})", it: "serve popolazione {needed} (ora a {done})", es: "necesitas población {needed} (ahora {done})", pt: "precisa de população {needed} (agora {done})" },
  "upgrade.requiresChiesLevel": { en: "requires the city center at level {level}", it: "richiede il municipio al livello {level}", es: "requiere el ayuntamiento en nivel {level}", pt: "requer a prefeitura no nível {level}" },
  "upgrade.needResources": { en: "need {list}", it: "servono {list}", es: "necesitas {list}", pt: "precisa de {list}" },
  "upgrade.notRebuildable": { en: "not rebuildable with the bulldozer", it: "non ricostruibile con la ruspa", es: "no reconstruible con el buldócer", pt: "não reconstruível com o buldôzer" },
  "unlock.atLevel": { en: "Unlock at level {level}", it: "Sblocca al livello {level}", es: "Se desbloquea en el nivel {level}", pt: "Desbloqueia no nível {level}" },

  // ---------------------------------------------------------------- loading
  "loading.default": { en: "loading", it: "caricamento", es: "cargando", pt: "carregando" },
  "loading.interface": { en: "loading interface", it: "caricamento interfaccia", es: "cargando interfaz", pt: "carregando interface" },
  "loading.city": { en: "loading city", it: "caricamento città", es: "cargando ciudad", pt: "carregando cidade" },
  "hwWarning.text": {
    en: "Hardware acceleration unavailable on this device/browser — performance may be very limited. Try updating your browser or switching to Chrome.",
    it: "Accelerazione hardware non disponibile su questo dispositivo/browser — le prestazioni potrebbero essere molto limitate. Prova ad aggiornare il browser o a passare a Chrome.",
    es: "Aceleración por hardware no disponible en este dispositivo/navegador — el rendimiento podría ser muy limitado. Prueba a actualizar el navegador o a cambiar a Chrome.",
    pt: "Aceleração de hardware indisponível neste dispositivo/navegador — o desempenho pode ficar muito limitado. Tente atualizar o navegador ou mudar para o Chrome.",
  },
  "hwWarning.dismiss": { en: "Dismiss", it: "Chiudi", es: "Cerrar", pt: "Fechar" },

  // ------------------------------------------------------------- title screen
  "title.loadGame": { en: "Load game", it: "Carica partita", es: "Cargar partida", pt: "Carregar partida" },

  // --------------------------------------------------------------------- mesi
  "month.1": { en: "Jan", it: "Gen", es: "Ene", pt: "Jan" },
  "month.2": { en: "Feb", it: "Feb", es: "Feb", pt: "Fev" },
  "month.3": { en: "Mar", it: "Mar", es: "Mar", pt: "Mar" },
  "month.4": { en: "Apr", it: "Apr", es: "Abr", pt: "Abr" },
  "month.5": { en: "May", it: "Mag", es: "May", pt: "Mai" },
  "month.6": { en: "Jun", it: "Giu", es: "Jun", pt: "Jun" },
  "month.7": { en: "Jul", it: "Lug", es: "Jul", pt: "Jul" },
  "month.8": { en: "Aug", it: "Ago", es: "Ago", pt: "Ago" },
  "month.9": { en: "Sep", it: "Set", es: "Sep", pt: "Set" },
  "month.10": { en: "Oct", it: "Ott", es: "Oct", pt: "Out" },
  "month.11": { en: "Nov", it: "Nov", es: "Nov", pt: "Nov" },
  "month.12": { en: "Dec", it: "Dic", es: "Dic", pt: "Dez" },
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
