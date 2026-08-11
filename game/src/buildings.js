// Edifici come dati, non come codice (STUDIO.md §7.3): la catena di
// cantiere di `chies` (upcrc12/upcrc23, decompilati da
// src/objects/upcrc12|upcrc23/Alarm_0.gml) e la famiglia `impa*` di
// `industria` (impaind0to1r/1to2r/2to3r, STUDIO.md §5.5) sono entrambe
// tabelle di frame e durate, lette da un'unica macchina a stati in
// stepConstructions(). stepProduction()/stepGrowth()/stepConsumption() fanno
// lo stesso per le simulazioni proprie a edificio finito: elettricita' di
// `industria` (industria1|2|3/Alarm_2.gml), crescita di popolazione e
// consumo elettrico di `casa` (casa1/Alarm_2.gml e Alarm_3.gml) — dati, non
// un alarm per oggetto.
//
// [C] = valori letti nel codice decompilato (sprite, costi, soglie,
// durate in tick a 60fps convertite in secondi). [I] = inferito/scelto per
// restare giocabile dove l'originale randomizzava o non dichiarava un
// valore esplicito (vedi commenti puntuali sotto).

const TICK = 1 / 60; // le durate degli alarm nell'originale sono in tick a room_speed=60

export const BUILDING_TYPES = {
  chies: {
    label: "Chiesa",
    placeCost: { mon: 5000 },                    // [I] sotto la dote iniziale (5500): la ruota reale apriva a 6000
    baseSprite: "crc", baseLife: 1000,             // [C] chies/Create.gml
    baseDecor: ["crcl"],                           // [C] chies/Create.gml: action_create_object(cddvd, 0, 0)
    upgrades: [
      {                                            // livello 1 -> 2, upcrc12
        atPop: 500,                                // [C] chies/Step.gml: r12.pop >= 500
        cost: { mon: 5000, oil: 3000 },            // [C] upcrc12/Mouse_LeftPressed.gml
        finalSprite: "crc4", lifeBonus: 500,        // [C] upcrc12/Alarm_0.gml, tic==12
        decor: ["crc2l"],                           // sprite del figlio "cddvd2" che sostituisce "cddvd"
        steps: [                                    // [C] upcrc12/Mouse_LeftPressed.gml + Alarm_0.gml
          { spr: "ce11", dur: 60 },                  // sprite messo subito all'avvio del cantiere
          { spr: "ce12", dur: 60 }, { spr: "ce13", dur: 60 }, { spr: "ce14", dur: 60 },
          { spr: "ce15", dur: 60 }, { spr: "ce16", dur: 60 }, { spr: "ce17", dur: 800 },
          { spr: "ce18", dur: 30 }, { spr: "ce19", dur: 30 }, { spr: "ce20", dur: 30 },
          { spr: "ce21", dur: 30 }, { spr: "ce22", dur: 30 }, { spr: "ce23", dur: 30 },
        ],
      },
      {                                            // livello 2 -> 3, upcrc23
        atPop: 1500,                                // [C] chies/Step.gml: r12.pop >= 1500
        cost: { mon: 15000, oil: 9000 },            // [C] upcrc23/Mouse_LeftPressed.gml
        finalSprite: "crc5", lifeBonus: 500,        // [C] upcrc23/Alarm_0.gml, tic==16
        decor: ["crc3l", "crc3l2", "crc3l3", "crc3l4", "crc3l5"],  // sostituiscono "cddvd2"
        steps: [                                    // [C] upcrc23/Mouse_LeftPressed.gml + Alarm_0.gml
          { spr: "ci21", dur: 60 },                  // sprite messo subito all'avvio del cantiere
          { spr: "ci22", dur: 60 }, { spr: "ci23", dur: 60 }, { spr: "ci24", dur: 60 },
          { spr: "ci25", dur: 60 }, { spr: "ci26", dur: 60 }, { spr: "ci27", dur: 60 },
          { spr: "ci28", dur: 60 }, { spr: "ci29", dur: 2000 }, { spr: "ci30", dur: 30 },
          { spr: "ci31", dur: 30 }, { spr: "ci32", dur: 30 }, { spr: "ci33", dur: 30 },
          { spr: "ci34", dur: 30 }, { spr: "ci35", dur: 30 }, { spr: "ci36", dur: 30 },
          { spr: "ci37", dur: 30 },
        ],
      },
    ],
  },

  // Secondo edificio: la famiglia impa* come dati (STUDIO.md §5.5/§7.3/§9).
  // A differenza di chies (gia' costruita, in room fin dall'inizio),
  // industria e' creata dal giocatore anche al livello 1: il codice
  // originale la fa passare per la stessa macchina a stati impa* usata
  // per i salti di livello (`impaind0to1r` invece di un semplice sprite
  // fisso), quindi qui `construct` e' il primo "gradino" della catena.
  //
  // Ogni impa* e' in realta' una COPPIA di oggetti paralleli: "r" (le
  // fondamenta a terra, quello che disegniamo qui) e "f" (un'impalcatura
  // in sovraimpressione con gru/fumo che crea l'edificio successivo poco
  // prima che "r" finisca). Non ricostruiamo la traccia "f": costruiamo
  // solo sulla traccia "r", e completiamo alla fine del suo ultimo passo
  // invece che ~300 tick prima come nell'originale — la "coda" persa e'
  // scenografia (gru che si ritirano), non cambia costi ne' tempi totali
  // in modo percepibile. [I] per questa semplificazione precisa.
  //
  // impaind*r ha anche una catena di alarm 1..7/10/11 (im1r..im4r, un
  // pulsare fuoco) mai armata da Create ne' dalla scala tic: codice morto
  // nell'originale, non riletto qui.
  industria: {
    label: "Industria",
    placeCost: { mon: 2000 },    // [C] placeholder/Mouse_LeftReleased.gml, selec==2
    // Produzione elettrica reale per livello (1-indicizzata: production[0]
    // e' il livello 1). [C] industria1|2|3/Alarm_2.gml: ogni 120 tick, se
    // r12.oil > 0, consuma `oil` e genera `ele`; l'alarm si riarma comunque
    // (anche a oil esaurito). `makee` conta i cicli riusciti ed e' letto da
    // industria1|2/Step.gml per sbloccare il potenziamento (vedi `atMakee`
    // negli upgrades sotto): finora questa soglia era `atPop: 0` [I], un
    // "sempre sbloccato" scelto perche' la simulazione non era ancora
    // portata — ora e' la regola vera.
    production: [
      { every: 120, oil: 7, ele: 50 },     // [C] industria1/Alarm_2.gml
      { every: 120, oil: 20, ele: 120 },   // [C] industria2/Alarm_2.gml
      { every: 120, oil: 35, ele: 300 },   // [C] industria3/Alarm_2.gml (livello massimo, nessun upgrade a valle)
    ],
    construct: {                  // livello 0 -> 1, impaind0to1r (src/objects/impaind0to1r)
      drain: { mon: 1, every: 20 },              // [C] impaind0to1r/Alarm_10.gml
      finalSprite: "i11", life: 50,               // [C] industria1/Create.gml (life=50)
      decor: ["i11l", "i11ll"],                   // [I] variante 1 delle 4 di industria1/Create.gml (dado non riletto)
      steps: [                                    // [C] impaind0to1r/Create.gml + Alarm_0/1/2/3
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 30 },
        { spr: "ir11", dur: 370 },
        { spr: "ir12", dur: 30 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
      ],
    },
    upgrades: [
      {                          // livello 1 -> 2, upind12 costo + impaind1to2r (troncato a tic 0..10)
        atMakee: 667,              // [C] industria1/Step.gml: upo==0 && makee>=667 -> crea upind12
        cost: { mon: 5000 },      // [C] upind12/Mouse_LeftPressed.gml
        finalSprite: "i21", life: 100,             // [C] industria2/Create.gml
        decor: ["i21l", "i21b", "i21c"],           // [I] variante 1 delle 2 di industria2/Create.gml
        drain: { mon: 3, every: 20 },              // [C] impaind1to2r/Alarm_10.gml
        steps: [                                    // [C] impaind1to2r/Create.gml + Alarm_0.gml, tic 0..10
          { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
          { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
          { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
          { spr: "ir22", dur: 40, spawn: [                 // tic==3: 4 gru ai corners
            { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
            { spr: "gru1", dx: -80, dy: -50 }, { spr: "gru1", dx: -80, dy: 50 },
          ] },
          { spr: "ir21", dur: 40 },
          { spr: ["ir33", "ir34", "ir35", "ir36"], dur: 40 },
          { spr: "ir32", dur: 40 }, { spr: "ir31", dur: 40 },
          { spr: ["ir43", "ir44", "ir45", "ir46"], dur: 40 },
          { spr: "ir42", dur: 40 },
          { spr: "ir41", dur: 800 },   // tic==10: l'originale continua fino a tic 22 (coda cosmetica, vedi sopra)
        ],
      },
      {                          // livello 2 -> 3, upind23 costo + impaind2to3r (troncato a tic 0..10)
        atMakee: 1000,             // [C] industria2/Step.gml: upo==0 && makee>=1000 -> crea upind23
        cost: { mon: 10000 },     // [C] upind23/Mouse_LeftPressed.gml
        finalSprite: "i31", life: 200,             // [C] industria3/Create.gml
        decor: ["i31a1", "i31a2", "i31a3", "i31l1l"],  // [C] i31aa1/2/3 sempre creati + [I] variante 1 di di311/di312
        drain: { mon: 3, every: 20 },              // [C] impaind2to3r/Alarm_10.gml
        steps: [                                    // [C] impaind2to3r/Create.gml + Alarm_0.gml, tic 0..10
          { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
          { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
          { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
          { spr: "ir22", dur: 40 }, { spr: "ir21", dur: 40 },
          { spr: ["ir33", "ir34", "ir35", "ir36"], dur: 40 },
          { spr: "ir32", dur: 40, spawn: [                 // tic==6: 4 macerie/rubble ai corners
            { spr: "gr21", dx: 80, dy: 50 }, { spr: "gr21", dx: 80, dy: -50 },
            { spr: "gr21", dx: -80, dy: -50 }, { spr: "gr21", dx: -80, dy: 50 },
          ] },
          { spr: "ir31", dur: 40 },
          { spr: ["ir43", "ir44", "ir45", "ir46"], dur: 40 },
          { spr: "ir42", dur: 40 },
          { spr: "ir41", dur: 1400 },  // tic==10: come sopra, coda cosmetica non riprodotta
        ],
      },
    ],
  },

  // Terzo edificio: `casa` (STUDIO.md §9), e l'unico dei tre con tre livelli
  // giocati fino in fondo (casa1->casa2->casa3, non solo "un" potenziamento).
  // Diverso da chies/industria su due assi: e' il primo con un aspetto
  // scelto a caso fra varianti per livello (non "variante 1" scelta a
  // mano), ed e' il primo di cui portiamo simulazioni che CONSUMANO risorse
  // nel tempo (crescita di popolazione, consumo elettrico) invece di
  // limitarsi a costruzione+potenziamento. `growth`/`consumption` sono
  // percio' array indicizzati per livello attuale (`b.level - 1`), stesso
  // schema di `production` per industria — sono comportamento "mentre
  // l'edificio esiste così com'è", non "cosa succede quando finisce il
  // cantiere" (quello vive dentro `construct`/`upgrades[i]`, come
  // `variants`: la lista di varianti cambia da un livello all'altro).
  //
  // Il potenziamento si sblocca a `ava==5` (crescita completa), non a una
  // soglia di popolazione o di produzione: `atAva` in upgradeProgress().
  //
  // Non portati, letti ma lasciati fuori (come le scelte gia' fatte per
  // industria): il danno da fulmine (Alarm_5, stessa regola letta/non
  // cablata di industria — nessun sistema vita/morte esiste ancora); la
  // sommossa (Alarm_4: se `r12.hap == r12.pop` e `r12.ele <= 0` compaiono
  // `sold1..6` — condizione che non capiamo ancora bene, meglio non
  // cablarla a caso); il "rifai in loco" a pagamento (`demobasia`,
  // cosmetico, stesso schema di industria). `hap`/`wewe` non sono
  // aggiornati: le regole sono lette ma inerti, non serve a niente
  // scriverle finche' niente le legge.
  casa: {
    label: "Casa",
    placeCost: { mon: 100 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==1
    // [C] casa1/Alarm_2.gml: `ava` (0..5) e' lo stadio di crescita. Il primo
    // intervallo dopo la nascita e' fisso (`action_set_alarm(2000,2)` in
    // Create.gml, uguale per tutti e tre i livelli); da li' in poi ogni
    // avanzamento riarma con uno dei 4 valori scelti a dado uniforme
    // (diversi per livello: casa1/2/3/Alarm_2.gml). Ogni avanzamento
    // aggiunge pop reale, non un contributo generico: e' per questo che
    // tickR12() (state.js) esclude i tipi con `growth` dalla sua formula
    // placeholder.
    growth: [
      { firstInterval: 2000, intervals: [3500, 5796, 11565, 14656], popPerStage: 2, maxAva: 5 },   // [C] casa1
      { firstInterval: 2000, intervals: [6000, 7314, 9945, 11154], popPerStage: 4, maxAva: 5 },     // [C] casa2
      { firstInterval: 2000, intervals: [9000, 11231, 16846, 9912], popPerStage: 4, maxAva: 5 },    // [C] casa3
    ],
    // [C] casa1|2|3/Alarm_3.gml: ogni 120 tic consuma energia in base allo
    // stadio `ava` e al giorno/notte (`aura.night`) — [giorno, notte] per
    // stadio 0..5, una tabella per livello. E' la prima regola che collega
    // davvero il ciclo giorno/notte (finora solo una tinta, STUDIO.md §5.2)
    // a un numero di gioco: main.js calcola `isNight(phaseT)` dalla stessa
    // tabella `PHASES` usata per il colore ambientale.
    consumption: [
      [ { day: 1, night: 2 }, { day: 2, night: 4 }, { day: 3, night: 6 },       // [C] casa1
        { day: 4, night: 8 }, { day: 5, night: 9 }, { day: 6, night: 11 } ],
      [ { day: 2, night: 4 }, { day: 4, night: 8 }, { day: 6, night: 12 },      // [C] casa2
        { day: 8, night: 16 }, { day: 11, night: 19 }, { day: 14, night: 23 } ],
      [ { day: 3, night: 7 }, { day: 6, night: 11 }, { day: 9, night: 15 },     // [C] casa3
        { day: 12, night: 20 }, { day: 15, night: 24 }, { day: 18, night: 27 } ],
    ],
    construct: {                 // livello 0 -> 1, impa0to1r (src/objects/impa0to1r)
      life: 100,                  // [C] casa1/Create.gml
      grantPop: 2,                // [C] casa1/Create.gml: r12.pop += 2 alla nascita, prima della crescita
      // [C] casa1/Create.gml: 5 livelli di action_if_dice(2) annidati
      // scelgono fra 20 coppie (sprite casa, decoro affiancato) — un pick
      // uniforme fra 20, come pickSpr() sugli array di step. Ogni dXXX
      // (decoro) disegna lo sprite "cXXXl"; il branch senza dado finale
      // (d111) lascia la casa allo sprite di default "c111".
      variants: [
        { spr: "c111", decor: "c111l" }, { spr: "c112", decor: "c112l" },
        { spr: "c113", decor: "c113l" }, { spr: "c114", decor: "c114l" },
        { spr: "c121", decor: "c121l" }, { spr: "c122", decor: "c122l" },
        { spr: "c123", decor: "c123l" }, { spr: "c124", decor: "c124l" },
        { spr: "c131", decor: "c131l" }, { spr: "c132", decor: "c132l" },
        { spr: "c133", decor: "c133l" }, { spr: "c134", decor: "c134l" },
        { spr: "c141", decor: "c141l" }, { spr: "c142", decor: "c142l" },
        { spr: "c143", decor: "c143l" }, { spr: "c144", decor: "c144l" },
        { spr: "c151", decor: "c151l" }, { spr: "c152", decor: "c152l" },
        { spr: "c153", decor: "c153l" }, { spr: "c154", decor: "c154l" },
      ],
      steps: [                    // [C] impa0to1r/Create.gml + Alarm_0/1/2/3 (790 tic: 390+30+310+30+30)
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 30 },
        { spr: "ir11", dur: 310 },
        { spr: "ir12", dur: 30 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
      ],
    },
    upgrades: [
      {                            // livello 1 -> 2, upsign12 costo + impa1to2r (990 tic, completo — l'originale
                                    // stesso finisce a tic 10, nessuna coda da troncare qui)
        atAva: 5,                   // [C] casa1/Alarm_2.gml: ava==5 crea upsign12
        cost: { mon: 500 },        // [C] upsign12/Mouse_LeftPressed.gml
        life: 200,                  // [C] casa2/Create.gml
        grantPop: 14,                // [C] casa2/Create.gml: r12.pop += 14 alla nascita
        drain: { mon: 2, every: 10 },   // [C] impa1to2r/Alarm_10.gml
        variants: [                  // [C] casa2/Create.gml, stesso schema di casa1
          { spr: "c211", decor: "c211l" }, { spr: "c212", decor: "c212l" },
          { spr: "c213", decor: "c213l" }, { spr: "c214", decor: "c214l" },
          { spr: "c221", decor: "c221l" }, { spr: "c222", decor: "c222l" },
          { spr: "c223", decor: "c223l" }, { spr: "c224", decor: "c224l" },
          { spr: "c231", decor: "c231l" }, { spr: "c232", decor: "c232l" },
          { spr: "c233", decor: "c233l" }, { spr: "c234", decor: "c234l" },
          { spr: "c241", decor: "c241l" }, { spr: "c242", decor: "c242l" },
          { spr: "c243", decor: "c243l" }, { spr: "c244", decor: "c244l" },
          { spr: "c251", decor: "c251l" }, { spr: "c252", decor: "c252l" },
          { spr: "c253", decor: "c253l" }, { spr: "c254", decor: "c254l" },
        ],
        steps: [                     // [C] impa1to2r/Create.gml + Alarm_0.gml, tic 0..10 (fine reale, non troncata)
          { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
          { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
          { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
          { spr: "ir22", dur: 40 }, { spr: "ir21", dur: 600 },
          { spr: "ir21", dur: 40 },   // tic 5->6: nessun cambio sprite nell'originale, solo un'attesa in piu'
          { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
          { spr: "ir11", dur: 40 }, { spr: "ir12", dur: 40 },
          { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 40 },
        ],
      },
      {                            // livello 2 -> 3, upsign23 costo + impa2to3r (troncato a tic 0..10, coda
                                    // cosmetica fino a tic 22 come impaind2to3r di industria, STUDIO.md sopra)
        atAva: 5,                   // [C] casa2/Alarm_2.gml: ava==5 crea upsign23
        cost: { mon: 2000 },       // [C] upsign23/Mouse_LeftPressed.gml
        life: 300,                  // [C] casa3/Create.gml
        grantPop: 40,                // [C] casa3/Create.gml: r12.pop += 40 alla nascita
        drain: { mon: 3, every: 20 },   // [C] impa2to3r/Alarm_10.gml
        variants: [                  // [C] casa3/Create.gml, stesso schema di casa1/casa2
          { spr: "c311", decor: "c311l" }, { spr: "c312", decor: "c312l" },
          { spr: "c313", decor: "c313l" }, { spr: "c314", decor: "c314l" },
          { spr: "c321", decor: "c321l" }, { spr: "c322", decor: "c322l" },
          { spr: "c323", decor: "c323l" }, { spr: "c324", decor: "c324l" },
          { spr: "c331", decor: "c331l" }, { spr: "c332", decor: "c332l" },
          { spr: "c333", decor: "c333l" }, { spr: "c334", decor: "c334l" },
          { spr: "c341", decor: "c341l" }, { spr: "c342", decor: "c342l" },
          { spr: "c343", decor: "c343l" }, { spr: "c344", decor: "c344l" },
          { spr: "c351", decor: "c351l" }, { spr: "c352", decor: "c352l" },
          { spr: "c353", decor: "c353l" }, { spr: "c354", decor: "c354l" },
        ],
        steps: [                     // [C] impa2to3r/Create.gml + Alarm_0.gml, tic 0..10
          { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
          { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
          { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
          { spr: "ir22", dur: 40, spawn: [                 // tic==3: 4 gru ai corners
            { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
            { spr: "gru1", dx: -80, dy: -50 }, { spr: "gru1", dx: -80, dy: 50 },
          ] },
          { spr: "ir21", dur: 40 },
          { spr: ["ir33", "ir34", "ir35", "ir36"], dur: 40 },
          { spr: "ir32", dur: 40 }, { spr: "ir31", dur: 40 },
          { spr: ["ir43", "ir44", "ir45", "ir46"], dur: 40 },
          { spr: "ir42", dur: 40 },
          { spr: "ir41", dur: 800 },   // tic==10: l'originale continua fino a tic 22 (coda cosmetica)
        ],
      },
    ],
  },
};

let nextId = 1;

function pickSpr(spr) {
  return Array.isArray(spr) ? spr[(Math.random() * spr.length) | 0] : spr;
}

/**
 * Piazza un edificio nuovo sul posto di un placeholder. Se il tipo ha
 * `construct` (industria: impa* anche al primo livello), parte da livello 0
 * e in cantiere; altrimenti appare gia' finito a livello 1 (chies: gia'
 * costruita nell'originale, mai vista nascere dal giocatore).
 */
export function placeBuilding(type, x, y, depth) {
  const def = BUILDING_TYPES[type];
  const b = { id: nextId++, type, x, y, depth, construction: null };
  if (def.construct) {
    b.level = 0; b.life = 0; b.spr = null;
    b.construction = { upgradeIndex: -1, stepIndex: 0, t: 0 };
  } else {
    b.level = 1; b.life = def.baseLife; b.spr = def.baseSprite;
  }
  return b;
}

export function canAfford(r12, cost) {
  for (const k in cost) if ((r12[k] ?? 0) < cost[k]) return false;
  return true;
}

function pay(r12, cost) {
  for (const k in cost) r12[k] -= cost[k];
}

/** I decori del livello attuale di un edificio (cddvd/cddvd2/di*, sostituiti ad ogni salto). */
export function currentDecor(b) {
  const def = BUILDING_TYPES[b.type];
  if (b.level < 1) return [];
  // Edifici a variante casuale (casa: STUDIO.md §9) portano il proprio
  // decoro scelto sull'istanza, non nella tabella statica per livello.
  if (b.decorSpr) return [b.decorSpr];
  if (b.level === 1) return def.construct?.decor ?? def.baseDecor ?? [];
  return def.upgrades?.[b.level - 2]?.decor ?? [];
}

/** Il potenziamento che l'edificio potrebbe iniziare ora, se lo tocchi (null se il tipo non ne ha). */
export function nextUpgrade(b) {
  const def = BUILDING_TYPES[b.type];
  return def.upgrades?.[b.level - 1] ?? null;
}

/**
 * La soglia di sblocco di un potenziamento e' una fra tre, mutuamente
 * esclusive per tipo: popolazione minima (`atPop`, chies — [C] chies/
 * Step.gml), cicli di produzione completati dall'edificio stesso al livello
 * attuale (`atMakee`, industria — [C] industria1|2/Step.gml), o crescita
 * completa (`atAva`, casa — [C] casa1|2/Alarm_2.gml: ava==5 crea il segnale
 * di potenziamento upsign12/23).
 */
function upgradeProgress(b, up, r12) {
  if (up.atMakee != null) return { done: b.makee ?? 0, needed: up.atMakee, kind: "makee" };
  if (up.atAva != null) return { done: b.ava ?? 0, needed: up.atAva, kind: "ava" };
  return { done: r12.pop, needed: up.atPop, kind: "pop" };
}

export function upgradeUnlocked(b, r12) {
  const up = nextUpgrade(b);
  if (!up) return false;
  const p = upgradeProgress(b, up, r12);
  return p.done >= p.needed;
}

/**
 * Tocco su un edificio: se un potenziamento e' sbloccato (soglia pop o cicli
 * di produzione) e i costi sono coperti, avvia il cantiere. Restituisce un
 * messaggio per la HUD — null se ha avviato il cantiere, altrimenti il
 * motivo per cui no.
 */
export function tryStartUpgrade(b, r12) {
  if (b.construction) return "cantiere gia' in corso";
  const up = nextUpgrade(b);
  if (!up) return "livello massimo";
  const p = upgradeProgress(b, up, r12);
  if (p.done < p.needed) {
    if (p.kind === "makee") return `servono ${p.needed} cicli di produzione (ora ${p.done})`;
    if (p.kind === "ava") return `serve crescita completa (${p.done}/${p.needed})`;
    return `serve popolazione ${p.needed} (ora ${p.done.toFixed(0)})`;
  }
  if (!canAfford(r12, up.cost)) {
    const need = Object.entries(up.cost).map(([k, v]) => `${v} ${k}`).join(", ");
    return `serve ${need}`;
  }
  pay(r12, up.cost);
  b.construction = { upgradeIndex: b.level - 1, stepIndex: 0, t: 0 };
  b.spr = "empty";
  return null;
}

/**
 * Avanza tutti i cantieri in corso di `dt` secondi.
 * `onDecor(b, sprites)` sostituisce il decoro finale dell'edificio (fine
 * cantiere). `onSpawn(b, [{spr,dx,dy}])` aggiunge decoro transitorio
 * (gru/macerie) che sparisce quando `onDecor` rimpiazza tutto a fine
 * cantiere.
 */
export function stepConstructions(buildings, dt, r12, onDecor, onSpawn) {
  for (const b of buildings) {
    const c = b.construction;
    if (!c) continue;
    const def = BUILDING_TYPES[b.type];
    const up = c.upgradeIndex === -1 ? def.construct : def.upgrades[c.upgradeIndex];
    let cur = up.steps[c.stepIndex];
    if (c.curSpr === undefined) {
      c.curSpr = pickSpr(cur.spr);
      if (cur.spawn) onSpawn?.(b, cur.spawn);
    }
    if (up.drain) {
      c.drainT = (c.drainT ?? 0) + dt;
      const period = up.drain.every * TICK;
      while (c.drainT >= period) { c.drainT -= period; r12.mon -= up.drain.mon; }
    }
    c.t += dt;
    b.spr = c.curSpr;
    if (c.t < cur.dur * TICK) continue;
    c.t = 0;
    c.stepIndex++;
    if (c.stepIndex < up.steps.length) {
      cur = up.steps[c.stepIndex];
      c.curSpr = pickSpr(cur.spr);
      if (cur.spawn) onSpawn?.(b, cur.spawn);
    } else {
      if (c.upgradeIndex === -1) b.level = 1; else b.level++;
      b.life = up.life ?? (b.life + (up.lifeBonus ?? 0));
      if (up.grantPop) r12.pop += up.grantPop;   // [C] casa1|2|3/Create.gml: pop += N alla nascita del livello
      if (up.variants) {
        // Edifici a variante casuale (casa: STUDIO.md §9) — [C] casa1|2|3/Create.gml,
        // dado uniforme fra sprite+decoro, scelto una volta e persistito sull'istanza.
        const v = up.variants[(Math.random() * up.variants.length) | 0];
        b.spr = v.spr;
        b.decorSpr = v.decor;
        onDecor?.(b, [v.decor]);
      } else {
        b.spr = up.finalSprite;
        onDecor?.(b, up.decor);
      }
      b.construction = null;
      // [C] industria1|2|3/Create.gml + casa1|2|3/Create.gml: `makee`/`ava`
      // partono da 0 ad ogni livello. Nell'originale ogni livello e' un
      // oggetto diverso che riparte da zero; qui e' lo stesso building che
      // continua, quindi i contatori vanno azzerati esplicitamente ad ogni
      // salto (insieme ai timer che li accumulano, cosi' non scattano subito
      // con un resto lasciato dal livello precedente).
      b.makee = 0; b.prodT = 0;
      b.ava = 0; b.growthT = 0; b.growthNext = null; b.consT = 0;
    }
  }
}

/**
 * Avanza la produzione elettrica degli edifici finiti (non in cantiere) che
 * dichiarano `production` per livello (oggi solo `industria`). [C]
 * industria1|2|3/Alarm_2.gml: ogni `every` tick, se r12.oil > 0, consuma
 * `oil` e genera `ele`; l'alarm si riarma comunque (anche a olio esaurito,
 * il ciclo "salta" senza produrre). `b.makee` conta i cicli riusciti ed e'
 * la soglia reale che sblocca il potenziamento (vedi upgradeProgress sopra).
 */
export function stepProduction(buildings, dt, r12) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    const prod = def.production?.[b.level - 1];
    if (!prod) continue;
    b.prodT = (b.prodT ?? 0) + dt;
    const period = prod.every * TICK;
    while (b.prodT >= period) {
      b.prodT -= period;
      if (r12.oil > 0) {
        r12.oil -= prod.oil;
        r12.ele += prod.ele;
        b.makee = (b.makee ?? 0) + 1;
      }
    }
  }
}

/**
 * Avanza la crescita di popolazione degli edifici finiti che dichiarano
 * `growth` per livello (oggi solo `casa`, un valore per casa1/2/3). [C]
 * casa1|2|3/Alarm_2.gml: ogni avanzamento di stadio (`b.ava`, 0..`maxAva`)
 * aggiunge `popPerStage` a r12.pop e riarma con un intervallo scelto a dado
 * uniforme fra `intervals` — tranne il primo, che nell'originale e' un
 * valore fisso (`firstInterval`, `action_set_alarm(2000,2)` in Create.gml,
 * uguale per tutti e tre i livelli). Si ferma da solo a `maxAva`.
 */
export function stepGrowth(buildings, dt, r12) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    const g = def.growth?.[b.level - 1];
    if (!g || (b.ava ?? 0) >= g.maxAva) continue;
    if (b.growthNext == null) b.growthNext = g.firstInterval * TICK;
    b.growthT = (b.growthT ?? 0) + dt;
    while (b.growthT >= b.growthNext && (b.ava ?? 0) < g.maxAva) {
      b.growthT -= b.growthNext;
      b.ava = (b.ava ?? 0) + 1;
      r12.pop += g.popPerStage;
      b.growthNext = g.intervals[(Math.random() * g.intervals.length) | 0] * TICK;
    }
  }
}

/**
 * Avanza il consumo elettrico degli edifici finiti che dichiarano
 * `consumption` per livello e stadio di crescita (oggi solo `casa`, una
 * tabella per casa1/2/3). [C] casa1|2|3/Alarm_3.gml: ogni 120 tick consuma
 * energia in base allo stadio `b.ava` e a se e' notte (prima regola che
 * collega il ciclo giorno/notte — finora solo una tinta, STUDIO.md §5.2 —
 * a un numero di gioco).
 */
export function stepConsumption(buildings, dt, r12, isNight) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    const cons = def.consumption?.[b.level - 1];
    if (!cons) continue;
    const rate = cons[Math.min(b.ava ?? 0, cons.length - 1)];
    b.consT = (b.consT ?? 0) + dt;
    const period = 120 * TICK;   // [C] casa1/Alarm_3.gml, fisso indipendentemente dallo stadio
    while (b.consT >= period) {
      b.consT -= period;
      r12.ele -= isNight ? rate.night : rate.day;
    }
  }
}
