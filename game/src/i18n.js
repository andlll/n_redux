// Lingua dell'interfaccia (EN/IT/ES/PT/DE/FR) — stato globale condiviso da
// title.js/main.js/app.js/buildings.js/tutorial.js, persistito in
// localStorage cosi' la scelta sopravvive a un refresh/ritorno al menu. Il
// cambio lingua non richiede nessun remount: ogni chiamante legge `t()`/
// `buildingLabel()` di nuovo ad ogni frame (drawHtmlText() e' gia'
// ridisegnato 60 volte al secondo), quindi selezionare una lingua nel
// controllo segmentato del menu di pausa (main.js, drawPauseOverlay()) si
// vede gia' dal frame successivo.
//
// Aggiungere una lingua: 1) aggiungerne il codice a LANGUAGES sotto (l'ordine
// e' quello dei segmenti nel controllo del menu di pausa); 2) aggiungere il
// ramo relativo in detectDefault() se ha senso auto-rilevarla da
// navigator.language; 3) aggiungere la chiave mancante ad OGNI entry di
// STRINGS sotto (t() ricade su FALLBACK/EN se manca, quindi una lingua a
// meta' non rompe nulla, mostra solo inglese dove manca); 4) tutorial.js ha
// un secondo dizionario a parte (TUTORIAL_TEXTS_*, un array parallelo per
// lingua) perche' il balloon del tutorial non passa da t() — va esteso li'
// separatamente.
const STORAGE_KEY = "nimbus_lang";
// Esportato (invece di restare privato come prima, quando bastava a
// SUPPORTED/setLang qui sotto): main.js lo usa per costruire i segmenti del
// controllo lingua nel menu di pausa, uno per codice, senza doverli
// duplicare li'.
export const LANGUAGES = ["en", "it", "es", "pt", "de", "fr"];
const FALLBACK = "en";

function detectDefault() {
  try {
    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.startsWith("it")) return "it";
    if (nav.startsWith("es")) return "es";
    if (nav.startsWith("pt")) return "pt";
    if (nav.startsWith("de")) return "de";
    if (nav.startsWith("fr")) return "fr";
  } catch { /* navigator non disponibile (SSR/test) */ }
  return FALLBACK;
}

let lang = detectDefault();
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (LANGUAGES.includes(saved)) lang = saved;
} catch { /* storage non disponibile (privacy mode) */ }

export function getLang() { return lang; }

export function setLang(next) {
  if (!LANGUAGES.includes(next) || next === lang) return lang;
  lang = next;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignorato: solo persistenza */ }
  return lang;
}

// Dizionario piatto: ogni voce { en, it, es, pt, de, fr }. Le stringhe con
// segnaposto usano `{nome}` (t() sotto li sostituisce con
// String(vars.nome)) invece di template literal per poter vivere nello
// stesso dizionario data-driven delle frasi fisse.
const STRINGS = {
  // ------------------------------------------------------------ menu di pausa
  "pause.title": { en: "PAUSE", it: "PAUSA", es: "PAUSA", pt: "PAUSA", de: "PAUSE", fr: "PAUSE" },
  "pause.resume": { en: "Resume", it: "Riprendi", es: "Reanudar", pt: "Continuar", de: "Fortsetzen", fr: "Reprendre" },
  "pause.saveToFile": { en: "Save to file", it: "Salva su file", es: "Guardar en archivo", pt: "Salvar em arquivo", de: "In Datei speichern", fr: "Enregistrer dans un fichier" },
  "pause.loadFromFile": { en: "Load from file", it: "Carica da file", es: "Cargar desde archivo", pt: "Carregar de arquivo", de: "Aus Datei laden", fr: "Charger depuis un fichier" },
  "pause.savingOptions": { en: "Saving options", it: "Opzioni di salvataggio", es: "Opciones de guardado", pt: "Opções de salvamento", de: "Speicheroptionen", fr: "Options de sauvegarde" },
  "pause.resetGame": { en: "Reset game", it: "Ricomincia partita", es: "Reiniciar partida", pt: "Reiniciar partida", de: "Spiel neu starten", fr: "Recommencer la partie" },
  "pause.backToMenu": { en: "Back to menu", it: "Torna al menu", es: "Volver al menú", pt: "Voltar ao menu", de: "Zurück zum Menü", fr: "Retour au menu" },
  // Didascalia sopra il controllo segmentato lingua (drawPauseOverlay(),
  // main.js — un segmento per codice in LANGUAGES sopra, quello selezionato
  // evidenziato in verde, stessa resa del selettore di livello autodifesa
  // in drawBuildingInfoPanel()): non porta piu' il valore corrente
  // interpolato (`{lang}`, come prima quando il bottone unico ciclava le
  // lingue leggibile solo dal proprio testo) — il valore e' ora il
  // segmento evidenziato stesso, la didascalia serve solo a spiegare a
  // cosa serve la riga.
  "pause.language": { en: "Language", it: "Lingua", es: "Idioma", pt: "Idioma", de: "Sprache", fr: "Langue" },

  "savingOptions.title": { en: "SAVING OPTIONS", it: "OPZIONI DI SALVATAGGIO", es: "OPCIONES DE GUARDADO", pt: "OPÇÕES DE SALVAMENTO", de: "SPEICHEROPTIONEN", fr: "OPTIONS DE SAUVEGARDE" },
  "savingOptions.autosave": { en: "Autosave: {state}", it: "Salvataggio automatico: {state}", es: "Guardado automático: {state}", pt: "Salvamento automático: {state}", de: "Automatisches Speichern: {state}", fr: "Sauvegarde automatique : {state}" },
  // Stessa storia di "pause.language" sopra: didascalia sopra il controllo
  // segmentato dell'intervallo (drawSavingOptionsOverlay(), main.js — un
  // segmento per valore in AUTOSAVE_INTERVALS li'), non piu' un'etichetta
  // con `{min}` interpolato.
  "savingOptions.interval": { en: "Interval (min)", it: "Intervallo (min)", es: "Intervalo (min)", pt: "Intervalo (min)", de: "Intervall (Min.)", fr: "Intervalle (min)" },
  "savingOptions.duringAttacks": { en: "Save during attacks: {state}", it: "Salva durante gli attacchi: {state}", es: "Guardar durante los ataques: {state}", pt: "Salvar durante ataques: {state}", de: "Während Angriffen speichern: {state}", fr: "Sauvegarder pendant les attaques : {state}" },
  "savingOptions.duringLowOil": { en: "Save with low oil: {state}", it: "Salva con petrolio scarso: {state}", es: "Guardar con petróleo escaso: {state}", pt: "Salvar com petróleo baixo: {state}", de: "Speichern bei wenig Öl: {state}", fr: "Sauvegarder avec peu de pétrole : {state}" },
  "savingOptions.back": { en: "Back", it: "Indietro", es: "Atrás", pt: "Voltar", de: "Zurück", fr: "Retour" },
  "common.on": { en: "ON", it: "ON", es: "ON", pt: "ON", de: "ON", fr: "ON" },
  "common.off": { en: "OFF", it: "OFF", es: "OFF", pt: "OFF", de: "OFF", fr: "OFF" },

  "confirmReset.title": { en: "RESET GAME", it: "RICOMINCIA PARTITA", es: "REINICIAR PARTIDA", pt: "REINICIAR PARTIDA", de: "SPIEL NEU STARTEN", fr: "RECOMMENCER LA PARTIE" },
  "confirmReset.warning": {
    en: "This will restart the level from scratch. This action cannot be undone.",
    it: "Il livello ricomincerà da zero. Questa azione non si può annullare.",
    es: "El nivel se reiniciará desde cero. Esta acción no se puede deshacer.",
    pt: "O nível será reiniciado do zero. Esta ação não pode ser desfeita.",
    de: "Das Level wird von vorne begonnen. Diese Aktion kann nicht rückgängig gemacht werden.",
    fr: "Le niveau recommencera de zéro. Cette action est irréversible.",
  },
  "confirmReset.cancel": { en: "Cancel", it: "Annulla", es: "Cancelar", pt: "Cancelar", de: "Abbrechen", fr: "Annuler" },

  // ---------------------------------------------------------- pannello edificio
  "buildingInfo.underConstruction": { en: "Under construction…", it: "In costruzione…", es: "En construcción…", pt: "Em construção…", de: "Im Bau…", fr: "En construction…" },
  "buildingInfo.health": { en: "Health: {cur} / {max}", it: "Salute: {cur} / {max}", es: "Salud: {cur} / {max}", pt: "Saúde: {cur} / {max}", de: "Leben: {cur} / {max}", fr: "Santé : {cur} / {max}" },
  "buildingInfo.residents": { en: "Residents: {n}", it: "Abitanti: {n}", es: "Habitantes: {n}", pt: "Moradores: {n}", de: "Bewohner: {n}", fr: "Habitants : {n}" },
  "buildingInfo.energy": { en: "Energy: +{ele}/cycle (uses {oil} oil)", it: "Energia: +{ele}/ciclo (consuma {oil} petrolio)", es: "Energía: +{ele}/ciclo (consume {oil} petróleo)", pt: "Energia: +{ele}/ciclo (consome {oil} petróleo)", de: "Energie: +{ele}/Zyklus (verbraucht {oil} Öl)", fr: "Énergie : +{ele}/cycle (consomme {oil} pétrole)" },
  "buildingInfo.levelSuffix": { en: " — Level {level}/{max}", it: " — Livello {level}/{max}", es: " — Nivel {level}/{max}", pt: " — Nível {level}/{max}", de: " — Stufe {level}/{max}", fr: " — Niveau {level}/{max}" },
  "buildingInfo.close": { en: "Close", it: "Chiudi", es: "Cerrar", pt: "Fechar", de: "Schließen", fr: "Fermer" },

  "autoDefense.level1.name": { en: "Real threats only", it: "Solo minacce reali", es: "Solo amenazas reales", pt: "Apenas ameaças reais", de: "Nur echte Bedrohungen", fr: "Menaces réelles uniquement" },
  "autoDefense.level1.desc": {
    en: "Automatically engages planes and airships in range. Always on, no extra cost.",
    it: "Ingaggia automaticamente aerei e dirigibili a portata. Sempre attivo, nessun costo extra.",
    es: "Ataca automáticamente aviones y dirigibles a su alcance. Siempre activo, sin coste extra.",
    pt: "Ataca automaticamente aviões e dirigíveis ao alcance. Sempre ativo, sem custo extra.",
    de: "Greift automatisch Flugzeuge und Luftschiffe in Reichweite an. Immer aktiv, keine Zusatzkosten.",
    fr: "Attaque automatiquement les avions et dirigeables à portée. Toujours actif, sans coût supplémentaire.",
  },
  "autoDefense.level2.name": { en: "+ Spy patrol", it: "+ Pattuglia antispie", es: "+ Patrulla antiespías", pt: "+ Patrulha antiespiões", de: "+ Spionagepatrouille", fr: "+ Patrouille anti-espions" },
  "autoDefense.level2.desc": {
    en: "Also shoots down red spy balloons and recon planes on sight.",
    it: "Abbatte a vista anche le mongolfiere spia rosse e gli aerei da ricognizione.",
    es: "También derriba en cuanto los ve los globos espía rojos y los aviones de reconocimiento.",
    pt: "Também abate à vista os balões espiões vermelhos e os aviões de reconhecimento.",
    de: "Schießt zusätzlich rote Spionageballons und Aufklärungsflugzeuge sofort ab.",
    fr: "Abat aussi à vue les ballons espions rouges et les avions de reconnaissance.",
  },
  "autoDefense.level3.name": { en: "Full auto", it: "Automatico totale", es: "Automático total", pt: "Automático total", de: "Vollautomatisch", fr: "Automatique total" },
  "autoDefense.level3.desc": {
    en: "Fires at anything in range — spies and resource balloons alike (loot still drops).",
    it: "Spara a tutto ciò che è a portata — spie e mongolfiere di risorse allo stesso modo (il bottino cade comunque).",
    es: "Dispara a todo lo que esté a su alcance — tanto a espías como a globos de recursos (el botín cae igualmente).",
    pt: "Atira em tudo que estiver ao alcance — tanto espiões quanto balões de recursos (o saque continua caindo).",
    de: "Schießt auf alles in Reichweite — Spione wie auch Ressourcenballons (die Beute fällt trotzdem).",
    fr: "Tire sur tout ce qui est à portée — espions comme ballons de ressources (le butin tombe quand même).",
  },
  "autoDefense.freeAlwaysOn": { en: "Free — always on", it: "Gratis — sempre attivo", es: "Gratis — siempre activo", pt: "Grátis — sempre ativo", de: "Kostenlos — immer aktiv", fr: "Gratuit — toujours actif" },
  "autoDefense.costPerMin": { en: "-{cost} mon/min", it: "-{cost} mon/min", es: "-{cost} mon/min", pt: "-{cost} mon/min", de: "-{cost} mon/min", fr: "-{cost} mon/min" },

  // ---------------------------------------------------------- banca/scambi
  "bank.title": { en: "GET A LOAN", it: "RICHIEDI UN PRESTITO", es: "SOLICITAR UN PRÉSTAMO", pt: "SOLICITAR UM EMPRÉSTIMO", de: "KREDIT AUFNEHMEN", fr: "OBTENIR UN PRÊT" },
  "bank.subtitle": { en: "20% interest rate", it: "Tasso d'interesse 20%", es: "Tasa de interés del 20%", pt: "Taxa de juros de 20%", de: "20 % Zinssatz", fr: "Taux d'intérêt de 20 %" },
  "bank.inYears": { en: " in {years} years", it: " in {years} anni", es: " en {years} años", pt: " em {years} anos", de: " in {years} Jahren", fr: " en {years} ans" },
  "trade.title": { en: "TRADE RESOURCES", it: "SCAMBIA RISORSE", es: "INTERCAMBIAR RECURSOS", pt: "TROCAR RECURSOS", de: "RESSOURCEN TAUSCHEN", fr: "ÉCHANGER DES RESSOURCES" },
  "trade.getPrefix": { en: "Get {amount} ", it: "Ottieni {amount} ", es: "Obtén {amount} ", pt: "Receba {amount} ", de: "Erhalte {amount} ", fr: "Obtenez {amount} " },
  "trade.forMiddle": { en: " for {amount} ", it: " per {amount} ", es: " por {amount} ", pt: " por {amount} ", de: " für {amount} ", fr: " contre {amount} " },

  // ---------------------------------------------------------- game over/vittoria
  "gameOver.title": { en: "GAME OVER", it: "GAME OVER", es: "GAME OVER", pt: "GAME OVER", de: "GAME OVER", fr: "GAME OVER" },
  "gameOver.reasonChies": {
    en: "The City center, the city's historic building, has been destroyed.",
    it: "Il Municipio, l'edificio storico della città, è stato distrutto.",
    es: "El Ayuntamiento, el edificio histórico de la ciudad, ha sido destruido.",
    pt: "A Prefeitura, o edifício histórico da cidade, foi destruída.",
    de: "Das Rathaus, das historische Gebäude der Stadt, wurde zerstört.",
    fr: "L'Hôtel de ville, le bâtiment historique de la ville, a été détruit.",
  },
  "gameOver.reasonOil": {
    en: "The oil has run out: the rotors have stopped and the platform has crashed.",
    it: "Il petrolio è finito: i rotori si sono fermati e la piattaforma è precipitata.",
    es: "El petróleo se ha agotado: los rotores se han detenido y la plataforma se ha estrellado.",
    pt: "O petróleo acabou: os rotores pararam e a plataforma caiu.",
    de: "Das Öl ist ausgegangen: Die Rotoren sind stehengeblieben und die Plattform ist abgestürzt.",
    fr: "Le pétrole est épuisé : les rotors se sont arrêtés et la plateforme s'est écrasée.",
  },
  "gameOver.loadLastSave": { en: "Load last save", it: "Carica ultimo salvataggio", es: "Cargar última partida", pt: "Carregar último salvamento", de: "Letzten Spielstand laden", fr: "Charger la dernière sauvegarde" },
  "gameOver.restartLevel": { en: "Restart level", it: "Ricomincia livello", es: "Reiniciar nivel", pt: "Reiniciar nível", de: "Level neu starten", fr: "Recommencer le niveau" },
  "congrats.title": { en: "CONGRATULATIONS!", it: "COMPLIMENTI!", es: "¡FELICIDADES!", pt: "PARABÉNS!", de: "GLÜCKWUNSCH!", fr: "FÉLICITATIONS !" },
  "congrats.subtitle": {
    en: "The Skyscraper stands complete, the tallest building this city has ever raised. " +
      "From now on, enemies will no longer attack the city. Keep building, there's no limit from here.",
    it: "Il Grattacielo è completo, l'edificio più alto che questa città abbia mai costruito. " +
      "Da ora in poi i nemici non attaccheranno più la città. Continua a costruire, da qui non c'è limite.",
    es: "El Rascacielos está completo, el edificio más alto que esta ciudad haya construido jamás. " +
      "A partir de ahora, los enemigos ya no atacarán la ciudad. Sigue construyendo, desde aquí no hay límite.",
    pt: "O Arranha-céu está completo, o edifício mais alto que esta cidade já construiu. " +
      "A partir de agora, os inimigos não atacarão mais a cidade. Continue construindo, daqui não há limite.",
    de: "Der Wolkenkratzer steht vollendet da, das höchste Gebäude, das diese Stadt je errichtet hat. " +
      "Von nun an greifen die Feinde die Stadt nicht mehr an. Bau weiter, von hier an gibt es keine Grenze mehr.",
    fr: "Le Gratte-ciel est achevé, le plus haut bâtiment que cette ville ait jamais élevé. " +
      "Désormais, les ennemis n'attaqueront plus la ville. Continue à construire, il n'y a plus de limite désormais.",
  },
  "congrats.keepPlaying": { en: "Keep playing", it: "Continua a giocare", es: "Seguir jugando", pt: "Continuar jogando", de: "Weiterspielen", fr: "Continuer à jouer" },

  // ---------------------------------------------------------------- edifici
  "building.chies": { en: "City center", it: "Municipio", es: "Ayuntamiento", pt: "Prefeitura", de: "Rathaus", fr: "Hôtel de ville" },
  // [Bug corretto, segnalato dall'autore: "'industria' non ha senso come
  // nome, produce energia elettrica (buildings.js: production ele), e' una
  // centrale"] "Industry"/"Industria" in tutte le lingue -> "Power
  // Plant"/"Centrale elettrica"/ecc, coerente con come il tutorial (gia'
  // corretto in inglese, tutorial.js) la descrive da sempre.
  "building.industria": { en: "Power Plant", it: "Centrale elettrica", es: "Central eléctrica", pt: "Usina Elétrica", de: "Kraftwerk", fr: "Centrale électrique" },
  "building.casa": { en: "House", it: "Casa", es: "Casa", pt: "Casa", de: "Haus", fr: "Maison" },
  "building.missile": { en: "Missile Launcher", it: "Lanciamissili", es: "Lanzamisiles", pt: "Lançador de Mísseis", de: "Raketenwerfer", fr: "Lance-missiles" },
  "building.solare": { en: "Solar Panels", it: "Pannelli solari", es: "Paneles solares", pt: "Painéis Solares", de: "Solarpanele", fr: "Panneaux solaires" },
  "building.parco": { en: "Park", it: "Parco", es: "Parque", pt: "Parque", de: "Park", fr: "Parc" },
  "building.club": { en: "Club", it: "Club", es: "Club", pt: "Clube", de: "Club", fr: "Club" },
  "building.villa": { en: "Villa", it: "Villa", es: "Villa", pt: "Villa", de: "Villa", fr: "Villa" },
  "building.gatling": { en: "Gatling Gun", it: "Mitragliatrice Gatling", es: "Ametralladora Gatling", pt: "Metralhadora Gatling", de: "Gatling-Kanone", fr: "Mitrailleuse Gatling" },
  "building.laser": { en: "Laser", it: "Laser", es: "Láser", pt: "Laser", de: "Laser", fr: "Laser" },
  "building.eolico": { en: "Wind Turbine", it: "Turbina eolica", es: "Turbina eólica", pt: "Turbina Eólica", de: "Windturbine", fr: "Éolienne" },
  "building.palazzo": { en: "Building", it: "Palazzo", es: "Edificio", pt: "Prédio", de: "Gebäude", fr: "Immeuble" },
  "building.palazzoRd": { en: "Building", it: "Palazzo", es: "Edificio", pt: "Prédio", de: "Gebäude", fr: "Immeuble" },
  "building.museo": { en: "Museum", it: "Museo", es: "Museo", pt: "Museu", de: "Museum", fr: "Musée" },
  "building.museoRd": { en: "Museum", it: "Museo", es: "Museo", pt: "Museu", de: "Museum", fr: "Musée" },
  "building.monum": { en: "Monument", it: "Monumento", es: "Monumento", pt: "Monumento", de: "Denkmal", fr: "Monument" },
  "building.banca": { en: "Bank", it: "Banca", es: "Banco", pt: "Banco", de: "Bank", fr: "Banque" },
  "building.grattacielo": { en: "Skyscraper", it: "Grattacielo", es: "Rascacielos", pt: "Arranha-céu", de: "Wolkenkratzer", fr: "Gratte-ciel" },
  "building.ruspa": { en: "Bulldozer", it: "Ruspa", es: "Buldócer", pt: "Buldôzer", de: "Planierraupe", fr: "Bulldozer" },

  // ------------------------------------------------------- messaggi di gioco
  "msg.placementCancelled": { en: "placement cancelled", it: "piazzamento annullato", es: "colocación cancelada", pt: "colocação cancelada", de: "Platzierung abgebrochen", fr: "placement annulé" },
  "msg.built": { en: "Built: {label} (-{cost} mon)", it: "Costruito: {label} (-{cost} mon)", es: "Construido: {label} (-{cost} mon)", pt: "Construído: {label} (-{cost} mon)", de: "Gebaut: {label} (-{cost} mon)", fr: "Construit : {label} (-{cost} mon)" },
  "msg.cantSaveNow": { en: "You can't save right now: {reason}", it: "Non puoi salvare adesso: {reason}", es: "No puedes guardar ahora: {reason}", pt: "Você não pode salvar agora: {reason}", de: "Du kannst jetzt nicht speichern: {reason}", fr: "Tu ne peux pas sauvegarder maintenant : {reason}" },
  "msg.gameSaved": { en: "game saved", it: "partita salvata", es: "partida guardada", pt: "partida salva", de: "Spiel gespeichert", fr: "partie sauvegardée" },
  "msg.gameSavedToFile": { en: "game saved to file", it: "partita salvata su file", es: "partida guardada en archivo", pt: "partida salva em arquivo", de: "Spiel in Datei gespeichert", fr: "partie sauvegardée dans un fichier" },
  "msg.saveToFileFailed": { en: "save to file failed", it: "salvataggio su file non riuscito", es: "no se pudo guardar en archivo", pt: "falha ao salvar em arquivo", de: "Speichern in Datei fehlgeschlagen", fr: "échec de la sauvegarde dans le fichier" },
  "msg.loadFromFileFailed": { en: "load from file failed", it: "caricamento da file non riuscito", es: "no se pudo cargar desde archivo", pt: "falha ao carregar do arquivo", de: "Laden aus Datei fehlgeschlagen", fr: "échec du chargement depuis le fichier" },
  "msg.invalidFile": { en: "invalid or modified file", it: "file non valido o modificato", es: "archivo no válido o modificado", pt: "arquivo inválido ou modificado", de: "ungültige oder veränderte Datei", fr: "fichier invalide ou modifié" },
  "msg.gameLoadedFromFile": { en: "game loaded from file", it: "partita caricata da file", es: "partida cargada desde archivo", pt: "partida carregada do arquivo", de: "Spiel aus Datei geladen", fr: "partie chargée depuis le fichier" },
  "msg.loanObtained": { en: "loan of {amount} mon obtained", it: "prestito di {amount} mon ottenuto", es: "préstamo de {amount} mon obtenido", pt: "empréstimo de {amount} mon obtido", de: "Kredit über {amount} mon aufgenommen", fr: "prêt de {amount} mon obtenu" },
  "msg.traded": { en: "traded {giveAmount} {give} for {takeAmount} {take}", it: "scambiati {giveAmount} {give} per {takeAmount} {take}", es: "intercambiados {giveAmount} {give} por {takeAmount} {take}", pt: "trocado {giveAmount} {give} por {takeAmount} {take}", de: "{giveAmount} {give} gegen {takeAmount} {take} getauscht", fr: "échangé {giveAmount} {give} contre {takeAmount} {take}" },
  "msg.needResourceHave": { en: "need {amount} {resource} (have {have})", it: "servono {amount} {resource} (hai {have})", es: "necesitas {amount} {resource} (tienes {have})", pt: "precisa de {amount} {resource} (tem {have})", de: "brauchst {amount} {resource} (hast {have})", fr: "il faut {amount} {resource} (tu as {have})" },
  "msg.levelToUnlock": { en: "{label}: level {level} to unlock", it: "{label}: livello {level} per sbloccare", es: "{label}: nivel {level} para desbloquear", pt: "{label}: nível {level} para desbloquear", de: "{label}: Stufe {level} zum Freischalten", fr: "{label} : niveau {level} pour débloquer" },
  "msg.noBuildingSelected": {
    en: "no building selected — open the menu with the crane",
    it: "nessun edificio selezionato — apri il menu con la gru",
    es: "ningún edificio seleccionado — abre el menú con la grúa",
    pt: "nenhum edifício selecionado — abra o menu com o guindaste",
    de: "kein Gebäude ausgewählt — öffne das Menü mit dem Kran",
    fr: "aucun bâtiment sélectionné — ouvre le menu avec la grue",
  },
  "msg.notRebuiltYet": { en: "{label}: not rebuilt yet", it: "{label}: non ancora ricostruito", es: "{label}: aún no reconstruido", pt: "{label}: ainda não reconstruído", de: "{label}: noch nicht wiederaufgebaut", fr: "{label} : pas encore reconstruit" },
  "msg.constructionInProgress": { en: "construction already in progress", it: "cantiere già in corso", es: "obra ya en curso", pt: "obra já em andamento", de: "Bau bereits im Gange", fr: "chantier déjà en cours" },
  "msg.notDemolishable": {
    en: "{label}: not demolishable/repairable with the bulldozer",
    it: "{label}: non demolibile/riparabile con la ruspa",
    es: "{label}: no demolible/reparable con el buldócer",
    pt: "{label}: não demolível/reparável com o buldôzer",
    de: "{label}: mit der Planierraupe nicht abreißbar/reparierbar",
    fr: "{label} : non démolissable/réparable avec le bulldozer",
  },
  "msg.needMonHave": { en: "need {cost} mon (have {have})", it: "servono {cost} mon (hai {have})", es: "necesitas {cost} mon (tienes {have})", pt: "precisa de {cost} mon (tem {have})", de: "brauchst {cost} mon (hast {have})", fr: "il faut {cost} mon (tu as {have})" },
  "msg.confirmDemolish": {
    en: "demolish/repair: tap \"yes\" to confirm (-{cost} mon)",
    it: "demolisci/ripara: tocca \"sì\" per confermare (-{cost} mon)",
    es: "demoler/reparar: toca \"sí\" para confirmar (-{cost} mon)",
    pt: "demolir/reparar: toque em \"sim\" para confirmar (-{cost} mon)",
    de: "abreißen/reparieren: tippe zur Bestätigung auf \"ja\" (-{cost} mon)",
    fr: "démolir/réparer : appuie sur \"oui\" pour confirmer (-{cost} mon)",
  },
  "msg.demolishedLotsFree": { en: "demolished — lots free", it: "demolito — lotti liberati", es: "demolido — parcelas liberadas", pt: "demolido — lotes liberados", de: "abgerissen — Grundstücke frei", fr: "démoli — parcelles libérées" },
  "msg.loanAlreadyActive": { en: "loan already active", it: "prestito già attivo", es: "préstamo ya activo", pt: "empréstimo já ativo", de: "Kredit bereits aktiv", fr: "prêt déjà actif" },
  "msg.fire": { en: "fire!", it: "fuoco!", es: "¡fuego!", pt: "fogo!", de: "Feuer!", fr: "feu !" },
  "msg.noTargetInRange": { en: "no target in range", it: "nessun bersaglio a portata", es: "ningún objetivo a tiro", pt: "nenhum alvo ao alcance", de: "kein Ziel in Reichweite", fr: "aucune cible à portée" },
  "msg.insufficientEnergy": { en: "insufficient energy", it: "energia insufficiente", es: "energía insuficiente", pt: "energia insuficiente", de: "nicht genug Energie", fr: "énergie insuffisante" },
  "msg.cannonReloading": { en: "cannon reloading", it: "cannone in ricarica", es: "cañón recargando", pt: "canhão recarregando", de: "Kanone lädt nach", fr: "canon en rechargement" },
  "msg.constructionStarted": { en: "construction started", it: "cantiere avviato", es: "obra iniciada", pt: "obra iniciada", de: "Bau begonnen", fr: "chantier commencé" },
  "msg.constructionStartedBulldozer": { en: "construction started (bulldozer)", it: "cantiere avviato (ruspa)", es: "obra iniciada (buldócer)", pt: "obra iniciada (buldôzer)", de: "Bau begonnen (Planierraupe)", fr: "chantier commencé (bulldozer)" },
  "msg.solarPlaced": { en: "solar panels placed on the park (-1000 mon)", it: "pannelli solari installati sul parco (-1000 mon)", es: "paneles solares instalados en el parque (-1000 mon)", pt: "painéis solares instalados no parque (-1000 mon)", de: "Solarpanele im Park installiert (-1000 mon)", fr: "panneaux solaires installés sur le parc (-1000 mon)" },
  "msg.alreadySolarOnPark": { en: "there's already a solar panel on this park", it: "c'è già un pannello solare su questo parco", es: "ya hay un panel solar en este parque", pt: "já há um painel solar neste parque", de: "in diesem Park gibt es bereits ein Solarpanel", fr: "il y a déjà un panneau solaire sur ce parc" },
  "msg.needFreeArea": {
    en: "need a free area of {count} adjacent lots (a rectangle)",
    it: "serve un'area libera di {count} lotti adiacenti (un rettangolo)",
    es: "necesitas un área libre de {count} parcelas adyacentes (un rectángulo)",
    pt: "precisa de uma área livre de {count} lotes adjacentes (um retângulo)",
    de: "brauchst eine freie Fläche von {count} angrenzenden Grundstücken (ein Rechteck)",
    fr: "il faut une zone libre de {count} parcelles adjacentes (un rectangle)",
  },
  "msg.notPartOfPlatform": { en: "this area isn't part of the platform yet", it: "quest'area non fa ancora parte della piattaforma", es: "esta área todavía no forma parte de la plataforma", pt: "esta área ainda não faz parte da plataforma", de: "dieser Bereich gehört noch nicht zur Plattform", fr: "cette zone ne fait pas encore partie de la plateforme" },
  "msg.tooCloseToTurret": { en: "too close to another defense turret", it: "troppo vicino a un'altra torretta difensiva", es: "demasiado cerca de otra torreta defensiva", pt: "muito perto de outra torre de defesa", de: "zu nah an einem anderen Verteidigungsturm", fr: "trop proche d'une autre tourelle de défense" },
  "msg.needFreeDiagonalLot": { en: "need a free lot diagonally adjacent", it: "serve un lotto libero in diagonale", es: "necesitas una parcela libre en diagonal", pt: "precisa de um lote livre na diagonal", de: "brauchst ein freies Grundstück diagonal angrenzend", fr: "il faut une parcelle libre en diagonale" },
  "msg.dragToFreeLot": { en: "drag to a free adjacent lot", it: "trascina su un lotto libero adiacente", es: "arrastra a una parcela libre adyacente", pt: "arraste para um lote livre adjacente", de: "zu einem freien angrenzenden Grundstück ziehen", fr: "fais glisser vers une parcelle libre adjacente" },
  "msg.itsFree": { en: "It's free!", it: "È gratis!", es: "¡Es gratis!", pt: "É grátis!", de: "Es ist kostenlos!", fr: "C'est gratuit !" },
  "msg.oilAlmostDepleted": { en: "oil is almost depleted", it: "il petrolio sta per esaurirsi", es: "el petróleo está a punto de agotarse", pt: "o petróleo está quase acabando", de: "das Öl geht fast zur Neige", fr: "le pétrole est presque épuisé" },
  "msg.stormHitting": { en: "a storm is hitting the city", it: "una tempesta sta colpendo la città", es: "una tormenta está azotando la ciudad", pt: "uma tempestade está atingindo a cidade", de: "ein Sturm trifft die Stadt", fr: "une tempête frappe la ville" },
  "msg.attackIncoming": { en: "an attack is incoming", it: "un attacco è in arrivo", es: "un ataque está en camino", pt: "um ataque está a caminho", de: "ein Angriff steht bevor", fr: "une attaque approche" },
  "msg.threatNear": { en: "a threat is near the city", it: "una minaccia è vicina alla città", es: "una amenaza está cerca de la ciudad", pt: "uma ameaça está perto da cidade", de: "eine Bedrohung ist in der Nähe der Stadt", fr: "une menace approche de la ville" },
  "msg.sandboxOn": {
    en: "sandbox mode ON: infinite resources, everything unlocked",
    it: "modalità sandbox ATTIVA: risorse infinite, tutto sbloccato",
    es: "modo sandbox ACTIVADO: recursos infinitos, todo desbloqueado",
    pt: "modo sandbox ATIVADO: recursos infinitos, tudo desbloqueado",
    de: "Sandbox-Modus AN: unendliche Ressourcen, alles freigeschaltet",
    fr: "mode bac à sable ACTIVÉ : ressources infinies, tout débloqué",
  },
  "msg.sandboxOff": { en: "sandbox mode OFF", it: "modalità sandbox DISATTIVATA", es: "modo sandbox DESACTIVADO", pt: "modo sandbox DESATIVADO", de: "Sandbox-Modus AUS", fr: "mode bac à sable DÉSACTIVÉ" },
  "msg.gameLoaded": { en: "game loaded", it: "partita caricata", es: "partida cargada", pt: "partida carregada", de: "Spiel geladen", fr: "partie chargée" },
  "msg.noSaveFound": { en: "no save found", it: "nessun salvataggio trovato", es: "no se encontró ninguna partida guardada", pt: "nenhum salvamento encontrado", de: "kein Spielstand gefunden", fr: "aucune sauvegarde trouvée" },

  // ---------------------------------------------------------------- upgrade
  "upgrade.maxLevel": { en: "max level", it: "livello massimo", es: "nivel máximo", pt: "nível máximo", de: "Höchststufe", fr: "niveau maximum" },
  "upgrade.needProductionCycles": {
    en: "need {needed} production cycles (now {done})",
    it: "servono {needed} cicli di produzione (ora a {done})",
    es: "necesitas {needed} ciclos de producción (ahora {done})",
    pt: "precisa de {needed} ciclos de produção (agora {done})",
    de: "brauchst {needed} Produktionszyklen (jetzt {done})",
    fr: "il faut {needed} cycles de production (actuellement {done})",
  },
  "upgrade.needFullGrowth": { en: "need full growth ({done}/{needed})", it: "serve crescita piena ({done}/{needed})", es: "necesitas crecimiento completo ({done}/{needed})", pt: "precisa de crescimento completo ({done}/{needed})", de: "braucht volles Wachstum ({done}/{needed})", fr: "il faut une croissance complète ({done}/{needed})" },
  "upgrade.needPopulation": { en: "need population {needed} (now {done})", it: "serve popolazione {needed} (ora a {done})", es: "necesitas población {needed} (ahora {done})", pt: "precisa de população {needed} (agora {done})", de: "brauchst Bevölkerung {needed} (jetzt {done})", fr: "il faut une population de {needed} (actuellement {done})" },
  "upgrade.requiresChiesLevel": { en: "requires the city center at level {level}", it: "richiede il municipio al livello {level}", es: "requiere el ayuntamiento en nivel {level}", pt: "requer a prefeitura no nível {level}", de: "erfordert das Rathaus auf Stufe {level}", fr: "nécessite l'hôtel de ville au niveau {level}" },
  "upgrade.needResources": { en: "need {list}", it: "servono {list}", es: "necesitas {list}", pt: "precisa de {list}", de: "brauchst {list}", fr: "il faut {list}" },
  "upgrade.notRebuildable": { en: "not rebuildable with the bulldozer", it: "non ricostruibile con la ruspa", es: "no reconstruible con el buldócer", pt: "não reconstruível com o buldôzer", de: "mit der Planierraupe nicht wiederaufbaubar", fr: "non reconstructible avec le bulldozer" },
  "unlock.atLevel": { en: "Unlock at level {level}", it: "Sblocca al livello {level}", es: "Se desbloquea en el nivel {level}", pt: "Desbloqueia no nível {level}", de: "Freischaltung auf Stufe {level}", fr: "Débloqué au niveau {level}" },

  // ---------------------------------------------------------------- loading
  "loading.default": { en: "loading", it: "caricamento", es: "cargando", pt: "carregando", de: "lädt", fr: "chargement" },
  "loading.interface": { en: "loading interface", it: "caricamento interfaccia", es: "cargando interfaz", pt: "carregando interface", de: "Oberfläche wird geladen", fr: "chargement de l'interface" },
  "loading.city": { en: "loading city", it: "caricamento città", es: "cargando ciudad", pt: "carregando cidade", de: "Stadt wird geladen", fr: "chargement de la ville" },
  "hwWarning.text": {
    en: "Hardware acceleration unavailable on this device/browser — performance may be very limited. Try updating your browser or switching to Chrome.",
    it: "Accelerazione hardware non disponibile su questo dispositivo/browser — le prestazioni potrebbero essere molto limitate. Prova ad aggiornare il browser o a passare a Chrome.",
    es: "Aceleración por hardware no disponible en este dispositivo/navegador — el rendimiento podría ser muy limitado. Prueba a actualizar el navegador o a cambiar a Chrome.",
    pt: "Aceleração de hardware indisponível neste dispositivo/navegador — o desempenho pode ficar muito limitado. Tente atualizar o navegador ou mudar para o Chrome.",
    de: "Hardwarebeschleunigung auf diesem Gerät/Browser nicht verfügbar — die Leistung kann stark eingeschränkt sein. Versuche, den Browser zu aktualisieren oder zu Chrome zu wechseln.",
    fr: "Accélération matérielle indisponible sur cet appareil/navigateur — les performances peuvent être très limitées. Essaie de mettre à jour ton navigateur ou de passer à Chrome.",
  },
  "hwWarning.dismiss": { en: "Dismiss", it: "Chiudi", es: "Cerrar", pt: "Fechar", de: "Schließen", fr: "Fermer" },

  // ------------------------------------------------------------- title screen
  "title.loadGame": { en: "Load game", it: "Carica partita", es: "Cargar partida", pt: "Carregar partida", de: "Spiel laden", fr: "Charger la partie" },

  // --------------------------------------------------------------------- mesi
  "month.1": { en: "Jan", it: "Gen", es: "Ene", pt: "Jan", de: "Jan", fr: "Jan" },
  "month.2": { en: "Feb", it: "Feb", es: "Feb", pt: "Fev", de: "Feb", fr: "Fév" },
  "month.3": { en: "Mar", it: "Mar", es: "Mar", pt: "Mar", de: "Mär", fr: "Mar" },
  "month.4": { en: "Apr", it: "Apr", es: "Abr", pt: "Abr", de: "Apr", fr: "Avr" },
  "month.5": { en: "May", it: "Mag", es: "May", pt: "Mai", de: "Mai", fr: "Mai" },
  "month.6": { en: "Jun", it: "Giu", es: "Jun", pt: "Jun", de: "Jun", fr: "Juin" },
  "month.7": { en: "Jul", it: "Lug", es: "Jul", pt: "Jul", de: "Jul", fr: "Juil" },
  "month.8": { en: "Aug", it: "Ago", es: "Ago", pt: "Ago", de: "Aug", fr: "Aoû" },
  "month.9": { en: "Sep", it: "Set", es: "Sep", pt: "Set", de: "Sep", fr: "Sep" },
  "month.10": { en: "Oct", it: "Ott", es: "Oct", pt: "Out", de: "Okt", fr: "Oct" },
  "month.11": { en: "Nov", it: "Nov", es: "Nov", pt: "Nov", de: "Nov", fr: "Nov" },
  "month.12": { en: "Dec", it: "Dic", es: "Dic", pt: "Dez", de: "Dez", fr: "Déc" },
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
