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
// [C] casa1|2|3/Create.gml: action_set_alarm(600, 4) — il primo controllo del
// pulsante blu della moneta (game/src/coins.js) arriva prima del successivo
// riarmo regolare a 3000 tick (COIN_PERIOD in coins.js).
const COIN_FIRST_DELAY = 600 * TICK;

export const BUILDING_TYPES = {
  chies: {
    label: "Chiesa",
    placeCost: { mon: 5000 },                    // [I] sotto la dote iniziale (5500): la ruota reale apriva a 6000
    baseSprite: "crc", baseLife: 1000,             // [C] chies/Create.gml
    baseDecor: ["crcl"],                           // [C] chies/Create.gml: action_create_object(cddvd, 0, 0)
    // [C] chies/Step.gml, ramo `life<=0`: a differenza di ogni altro
    // edificio, chies non crea un oggetto "ruin*" a parte — cambia sprite a
    // SE STESSA (`ruinc1`/`ruinc2`/`ruinc3` in base a `level`) e resta
    // piazzata (nessun `action_kill_object`): non un rudere-oggetto ma la
    // chiesa stessa che diventa rudere. `ruinSpriteFor()` sotto non
    // distingue i due casi (un solo sprite fisso, niente dado, come per
    // ogni altro tipo con un solo livello), destroyBuilding() in main.js
    // tratta il risultato allo stesso modo per tutti.
    baseRuin: "ruinc1",
    upgrades: [
      {                                            // livello 1 -> 2, upcrc12
        atPop: 500,                                // [C] chies/Step.gml: r12.pop >= 500
        cost: { mon: 5000, oil: 3000 },            // [C] upcrc12/Mouse_LeftPressed.gml
        finalSprite: "crc4", lifeBonus: 500,        // [C] upcrc12/Alarm_0.gml, tic==12
        ruin: "ruinc2",                             // [C] chies/Step.gml: level==2 -> ruinc2
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
        ruin: "ruinc3",                             // [C] chies/Step.gml: level==3 -> ruinc3
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
  // fondamenta a terra, quello che guida `steps` qui sotto: costi, durate,
  // sprite finale) e "f" (un'impalcatura in sovraimpressione, sempre
  // davanti a "r" — [C] impaind0to1f/Create.gml: `depth = -y - 2` contro
  // `-y - 1` circa di "r" — con gru/fumo, che crea l'edificio successivo
  // poco prima che "r" finisca). Completiamo alla fine dell'ultimo passo
  // di "r" invece che ~300 tick prima come nell'originale — la "coda"
  // persa e' scenografia (gru che si ritirano), non cambia costi ne' tempi
  // totali in modo percepibile. [I] per questa semplificazione precisa.
  //
  // La traccia "f" stessa pero' SI vede: senza, un cantiere e' solo un
  // singolo sprite "fondamenta" che cambia, senza nessuna impalcatura
  // davanti — poco leggibile come "cantiere in corso" (segnalato
  // dall'autore). [C] i suoi sprite (`if11..if46`) sono, uno a uno, la
  // stessa sagoma di `ir11..ir46` come reticolo di impalcatura invece che
  // struttura piena: `frontSprFor()` sotto li deriva dallo sprite "r" gia'
  // scelto per il passo corrente (stesso dado, non uno indipendente come
  // nell'originale — [I], evita impalcature scollegate dalla sagoma
  // sottostante). Il "coperchio" finale (`cap`, sulle sole `upgrades`: la
  // traccia costruzione a livello 1 non lo usa) e' [C] da
  // impaind1to2f|2to3f/Alarm_1.gml e impa1to2f|2to3f/Alarm_1.gml:
  // `action_sprite_set(im2f|im4f)`, mostrato durante l'ultimo passo (quello
  // lungo, "l'edificio e' quasi finito") invece che al tic esatto
  // dell'alarm indipendente originale. [I] per la stessa ragione.
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
    // Danno da fulmine per livello: ogni 57 tick, se `r12.storm` e' attivo,
    // un dado (1 su `dice`) fa perdere `loss` vita. [C]
    // industria1/Alarm_5.gml, industria2/Alarm_5.gml, industria3/Alarm_6.gml.
    // Su `match_easy` la tempesta reale (`r12.storm`, non `stormeasy`) resta
    // rara di suo (STUDIO.md §9) — qui la regola c'e' per davvero, non solo
    // letta, perche' su `match` (mappa difficile) non e' affatto cosmetica.
    storm: [
      { dice: 130, loss: 50 },   // [C] industria1
      { dice: 120, loss: 50 },   // [C] industria2
      { dice: 100, loss: 50 },   // [C] industria3
    ],
    construct: {                  // livello 0 -> 1, impaind0to1r (src/objects/impaind0to1r)
      drain: { mon: 1, every: 20 },              // [C] impaind0to1r/Alarm_10.gml
      finalSprite: "i11", life: 50,               // [C] industria1/Create.gml (life=50)
      // [C] industria1/Step.gml, ramo `life<=0`: `action_create_object(ruin1, 0, 0)`
      // — un rudere a parte (a differenza di chies), scelto a dado uniforme
      // fra 4 varianti equiprobabili (ruin1/Create.gml, due dice(2) annidati
      // — pickSpr() sotto replica lo stesso pick uniforme gia' usato per gli
      // step di cantiere ad array). Stesso pool di industria1/casa1/club1/
      // villa1: "taglia 1", non un rudere per tipo.
      ruin: ["ru11", "ru12", "ru13", "ru14"],
      decor: ["i11l", "i11ll"],                   // [I] variante 1 delle 4 di industria1/Create.gml (dado non riletto)
      // [C] industria1/Create.gml: hap -50 alla nascita; industria1/Destroy.gml:
      // hap +50 quando smette di esistere A QUESTO livello (sia per morte vera
      // che per potenziamento — l'originale distrugge e ricrea un'istanza per
      // livello, STUDIO.md sotto su stepConstructions()). Letto da nessuno fino
      // a ora: sbloccava i pulsanti blu delle monete di `casa` (vedi sotto),
      // rimasto fuori finche' `r12.hap` non serviva a niente.
      hap: { create: -50, destroy: 50 },
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
        ruin: ["ru21", "ru22", "ru23", "ru24"],   // [C] industria2/Step.gml: create_object(ruin2) — "taglia 2"
        decor: ["i21l", "i21b", "i21c"],           // [I] variante 1 delle 2 di industria2/Create.gml
        drain: { mon: 3, every: 20 },              // [C] impaind1to2r/Alarm_10.gml
        hap: { create: -100, destroy: 150 },       // [C] industria2/Create.gml + Destroy.gml (vedi livello 1 sopra)
        cap: "im2f",   // [C] impaind1to2f/Alarm_1.gml: sprite_set(im2f) — il "coperchio" a gru che
                        // chiude la traccia f (impalcatura in sovraimpressione, mai ricostruita finora,
                        // vedi `front` sotto) man mano che l'edificio sale di livello
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
        ruin: ["ru31", "ru32", "ru33", "ru34"],   // [C] industria3/Step.gml: create_object(ruin3) — "taglia 3"
        decor: ["i31a1", "i31a2", "i31a3", "i31l1l"],  // [C] i31aa1/2/3 sempre creati + [I] variante 1 di di311/di312
        drain: { mon: 3, every: 20 },              // [C] impaind2to3r/Alarm_10.gml
        // [C] industria3/Create.gml + Destroy.gml: gli stessi numeri del
        // decompilato, non "corretti" — il +400 alla morte non e' l'opposto
        // esatto del -150 alla nascita (ne' del -100/-150 accumulati salendo
        // dai livelli precedenti): l'originale stesso non torna in pareggio.
        hap: { create: -150, destroy: 400 },
        cap: "im4f",   // [C] impaind2to3f/Alarm_1.gml, stesso ruolo di im2f sopra ma all'altezza massima
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
  // cablata di industria — nessun sistema vita/morte esiste ancora); il
  // "rifai in loco" a pagamento (`demobasia`, cosmetico, stesso schema di
  // industria). `wewe` resta inerte: letto ma scritto da nessuna regola
  // implementata.
  //
  // **I pulsanti blu delle monete** (casa1|2|3/Alarm_4.gml — `sold1..18`,
  // game/src/coins.js): una nota precedente qui diceva "condizione che non
  // capiamo ancora bene" e la lasciava fuori, leggendo `action_if_variable
  // (hap, pop, 4)` come "hap == pop" (una sommossa). Sbagliato: l'operatore
  // 4 e' ">=" (stessa lettura di `chies/Step.gml: pop>=500`, gia' portata
  // sopra), e la condizione VERA e' la congiunzione di due controlli
  // annidati — hap>=pop **e** ele>0 (operatore 2, verificato su
  // `industria3/Alarm_2.gml: oil>0` — stessa forma, stesso operatore, gia'
  // portato come `production` sopra) — non una sommossa ma una RICOMPENSA:
  // casa felice (hap ha raggiunto la pop) e con corrente, ogni 3000 tick
  // (600 la primissima volta) fa comparire una moneta da riscuotere. Questo
  // sbloccava `r12.hap`, mai aggiornato da nessuna parte del motore: ora lo
  // e' (vedi `hap` su industria/parco sopra, l'unico effetto reale letto
  // nel decompilato).
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
    // Danno da fulmine per livello, stesso schema di industria (ogni 57
    // tick, 1 dado su `dice` se `r12.storm`). [C] casa1/Alarm_5.gml,
    // casa2/Alarm_5.gml. **casa3 non ha danno da fulmine**: nel decompilato
    // arma un `Alarm_5` (`action_set_alarm(23,5)` in Create.gml) ma non
    // esiste nessun `casa3/Alarm_5.gml` — l'alarm scatta e non fa niente,
    // codice morto nell'originale stesso. `null` qui riproduce fedelmente
    // quel "niente", non una dimenticanza.
    storm: [
      { dice: 180, loss: 50 },   // [C] casa1
      { dice: 170, loss: 50 },   // [C] casa2
      null,                       // [C] casa3: Alarm_5 armato ma senza codice
    ],
    construct: {                 // livello 0 -> 1, impa0to1r (src/objects/impa0to1r)
      life: 100,                  // [C] casa1/Create.gml
      grantPop: 2,                // [C] casa1/Create.gml: r12.pop += 2 alla nascita, prima della crescita
      // [C] casa1/Destroy.gml: r12.pop += -10 quando muore (non l'esatto
      // opposto dei +12 accumulati in vita — 2 alla nascita + 2 per ognuno
      // dei 5 stadi di crescita: l'originale stesso non torna, letto cosi'
      // com'e', non "corretto").
      deathPop: -10,
      ruin: ["ru11", "ru12", "ru13", "ru14"],   // [C] casa1/Step.gml: create_object(ruin1) — stesso pool di industria1
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
        deathPop: -34,                // [C] casa2/Destroy.gml
        ruin: ["ru21", "ru22", "ru23", "ru24"],   // [C] casa2/Step.gml: create_object(ruin2)
        drain: { mon: 2, every: 10 },   // [C] impa1to2r/Alarm_10.gml
        cap: "im2f",   // [C] impa1to2f/Alarm_1.gml, stesso ruolo di industria (vedi upind12 sopra)
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
        deathPop: -60,                // [C] casa3/Destroy.gml
        ruin: ["ru31", "ru32", "ru33", "ru34"],   // [C] casa3/Step.gml: create_object(ruin3)
        drain: { mon: 3, every: 20 },   // [C] impa2to3r/Alarm_10.gml
        cap: "im4f",   // [C] impa2to3f/Alarm_1.gml, stesso ruolo di industria (vedi upind23 sopra)
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

  // Primo edificio DIFENSIVO: `missile` (src/objects/rocket_launcher, coppia
  // di cantiere impamissr/impamissf — STUDIO.md "le mongolfiere",
  // `mon_bil` e' creato anche da questo selec). Stesso schema r/f gia' noto
  // (industria/casa/parco sopra): "r" guida costi/durate/sprite finale, "f"
  // e' l'impalcatura in sovraimpressione, derivata automaticamente da
  // `frontSprFor()` visto che riusa gli stessi sprite ir1x/ir2x (nessuna
  // catena "if1x" propria da aggiungere all'atlas). **[C]** `impamissr` non
  // ha `upgrades`: a differenza di chies/industria/casa e' un edificio a UN
  // solo livello — `impamissilir`/`impamissilif` (stessa forma, sprite
  // identici) non sono un potenziamento: sono create SOLO da `demobasia/
  // Collision_rocket_launcher.gml`, il "rifai in loco" a pagamento (20000
  // mon, `rocket_launcher/Mouse_LeftPressed.gml` selec==11) che upgrade
  // finivano in un `placeholder` vuoto invece che in un rocket_launcher
  // nuovo — stesso gap gia' dichiarato per industria/casa (STUDIO.md
  // "cosa manca"), non riletto qui.
  missile: {
    label: "Lanciamissili",
    placeCost: { mon: 5000 },    // [C] placeholder/Mouse_LeftReleased.gml, selec==3
    // [I] `close` nell'originale e' vera collisione fisica fra la maschera
    // di missile/gatling/laser (`placeholder/Collision_impamissr|
    // rocket_launcher|gatlinggun|lasergun.gml`, tutte impostano lo stesso
    // flag) e i placeholder vicini — senza un sistema di collisione vero
    // (STUDIO.md, "pepazzittecollider" mai ricostruito) qui e' una distanza
    // minima fra torrette, vedi `tooCloseToTurret()` sotto.
    turret: true,
    // [C] rocket_launcher/Mouse_LeftPressed.gml spara per davvero al tocco
    // (laser fa lo stesso, gatling no — vedi i due edifici sotto) — un
    // colpo verso lo stesso bersaglio gia' inseguito, non un potenziamento
    // (missile e' a un livello solo): vedi fireTurretManual() in
    // game/src/projectiles.js.
    manualFire: true,
    // [C] rocket_launcher/Step.gml: insegue il veicolo piu' vicino
    // (famiglia `veicoli_target` — mongolfiere di risorse/spia e le auto
    // decorative) entro 400px, un sedicesimo di giro alla volta
    // (`turretSprFor()` sotto) — [I] a meno che una minaccia vera
    // (`nemici_target`: air/bombar/dirig) non sia gia' entro lo stesso
    // raggio, nel qual caso ha la priorita' (stepTurretAim() sotto). Il
    // fuoco vero (game/src/projectiles.js, stepTurretFire) scatta
    // separatamente quando una minaccia vera entra entro 250px
    // (`fireRange`), sempre verso il bersaglio gia' inseguito qui sopra —
    // che quindi e' sempre la minaccia stessa quando e' a tiro, non piu'
    // un veicolo qualunque scelto a caso.
    aim: { range: 400, fireRange: 250 },
    storm: [{ dice: 130, loss: 50 }],   // [C] rocket_launcher/Alarm_5.gml
    construct: {                  // livello 0 -> 1, impamissr (src/objects/impamissr)
      drain: { mon: 1, every: 20 },              // [C] impamissr/Alarm_10.gml
      finalSprite: "rl_as", life: 600,            // [C] rocket_launcher/Create.gml
      ruin: ["ru21", "ru22", "ru23", "ru24"],   // [C] rocket_launcher/Step.gml: create_object(ruin2) — "taglia 2"
      decor: [],                                   // [C] rocket_launcher/Create.gml non crea nessun cddvd
      steps: [                                    // [C] impamissr/Create.gml + Alarm_0.gml, tic 0..10
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 361 },   // sprite iniziale di Create.gml, dura fino al primo Alarm_0
        { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir22", dur: 40 },
        { spr: "ir21", dur: 640, spawn: [                 // tic==4 (durata 600) + tic==5 (durata 40, nessun
          { spr: "toppers", dx: 0, dy: -86 },              // cambio sprite nel decompilato): fuse in un solo
        ] },                                                // passo — [C] impamissf/Alarm_0.gml tic==5 crea "tops2"
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir11", dur: 40 }, { spr: "ir12", dur: 40 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 40 },
      ],
    },
  },

  // Quinto edificio: `solare` (`sooool`, src/objects/sooool — "Pannelli
  // solari" nel menu, `pusolare`/`selec==61`). Come `missile`, un solo
  // livello (nessun `upXXX` lo referenzia nel decompilato: niente
  // `upgrades` qui) — ma non e' una torretta: e' il primo edificio la cui
  // produzione dipende dall'ORA DEL GIORNO invece che da un consumo di
  // materia prima (`solarProduction`, stepSolarProduction() sotto).
  // Placement cost **[C]** trovato nello stesso posto dei costi di
  // industria/casa: `placeholder/Mouse_LeftReleased.gml`, `selec==61`.
  solare: {
    label: "Pannelli solari",
    placeCost: { mon: 1000 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==61
    // [C] sooool/Alarm_4.gml, ogni 30 tick: sempre -5 mon; ele -1 di notte,
    // +5 all'alba, +9 altrimenti (giorno/tramonto) — vedi stepSolarProduction().
    solarProduction: { every: 30, mon: 5, ele: { night: -1, dawn: 5, day: 9 } },
    storm: [{ dice: 200, loss: 50 }],   // [C] sooool/Alarm_5.gml
    // [C] sooool/Destroy.gml: hap +50 alla morte — nessun costo corrispondente
    // alla nascita (sooool/Create.gml non tocca hap): non simmetrico, letto
    // cosi' come sta, stesso principio gia' scelto per industria/parco sopra.
    construct: {                  // livello 0 -> 1, impasolr (src/objects/impasolr)
      drain: { mon: 2, every: 20 },              // [C] impasolr/Alarm_10.gml
      finalSprite: "sool", life: 50,              // [C] sooool/Create.gml
      // [C] sooool/Step.gml: create_object(ruinsol) — proprio rudere, un
      // solo dado a due vie (ruinsol/Create.gml: default "soolr1", 50% di
      // ribaltare a "soolr2"), non il pool a 4 vie di ruin1/2/3.
      ruin: ["soolr1", "soolr2"],
      decor: [],                                   // [C] sooool/Create.gml non crea nessun cddvd (non e' un chies/casa/industria)
      hap: { destroy: 50 },
      steps: [                                    // [C] impasolr/Create.gml + Alarm_0/1/2/3/4, tic 0..770
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 370 },
        { spr: "ir12", dur: 30 },
        { spr: "ir11", dur: 310, spawn: [                 // [C] impasolf/Alarm_4.gml crea "tops1" (sprite
          { spr: "toppers", dx: 0, dy: -42 },              // "toppers", stessa forma di "tops2" per missile/
        ] },                                                // club ma offset -42 invece di -86) a meta' cantiere
        { spr: "ir12", dur: 30 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
      ],
    },
  },

  // Sesto edificio: `parco` (STUDIO.md §9 "GUI vera", `pu7`/`selec==7`,
  // gia' nel menu ma segnaposto). Come `missile`/`solare`, senza potenziamenti
  // (nessun `upXXX` lo referenzia nel decompilato: resta cosi' com'e' una
  // volta finito) ma e' l'unico il cui decoro non e' un bagliore fisso per
  // livello, ma uno scatter casuale di alberi e lampioni intorno a se' — 7
  // posizioni fisse, ciascuna a dado albero/lampione/niente (STUDIO.md, la
  // meccanica dietro "implementa anche i lampioni colorati": i lampioni non
  // stavano MAI fermi nella room, nascevano solo cosi'). Il pattern e'
  // troppo diverso da `decor`/`variants` (ogni slot e' un'entita' diversa,
  // non uno sprite fisso per livello) per stare in questa tabella: vive in
  // `PARCO_SLOTS`/`spawnParcoScatter()` (game/src/main.js), agganciato dove
  // `spawnDecor()` intercetta `b.type === "parco"` invece di leggere
  // `decor` qui sotto (lasciato vuoto apposta, mai letto per questo tipo).
  parco: {
    label: "Parco",
    placeCost: { mon: 500 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==7
    construct: {                 // livello 0 -> 1, imparcr (src/objects/imparcr)
      drain: { mon: 1, every: 20 },              // [C] imparcr/Alarm_10.gml
      life: 9999,                                 // [I] nessun danno da fulmine ne' vita nel decompilato
      // [C] parco/Step.gml non legge mai `life`: nessun ramo `life<=0`,
      // quindi nessun `ruin*` — l'unico tipo senza (`ruinSpriteFor()` in
      // fondo al file torna null, destroyBuilding() in main.js lo lascia
      // stare). `life: 9999` sopra e' gia' la stessa scelta [I] a rendere il
      // caso irraggiungibile nella pratica.
      decor: [],                                   // vedi sopra: il vero decoro passa da spawnParcoScatter()
      hap: { create: 200, destroy: -210 },   // [C] parco/Create.gml + Destroy.gml (non simmetrico, letto cosi' com'e')
      // [C] imparcr/Create.gml + Alarm_0/1/2/3: 150 tic totali (30+30+30+30+30) —
      // molto piu' breve di industria/casa, un parco e' un cantiere veloce.
      // Riusa "ir1x"/"ir11"/"ir12" (gli stessi sprite fondamenta di
      // industria/casa: frontSprFor() in fondo al file deriva la stessa
      // impalcatura "if1x" in sovraimpressione, nessun codice in piu').
      steps: [
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
        { spr: "ir12", dur: 30 },
        { spr: "ir11", dur: 30 },
        { spr: "ir12", dur: 30 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
      ],
      // [C] parco/Create.gml: 3 dice(2) annidati = 8 varianti equiprobabili
      // (par1..par8), stesso schema di casa ma senza decoro per variante
      // (`decor: null`, mai letto: spawnParcoScatter() se ne occupa).
      variants: [
        { spr: "par1", decor: null }, { spr: "par2", decor: null },
        { spr: "par3", decor: null }, { spr: "par4", decor: null },
        { spr: "par5", decor: null }, { spr: "par6", decor: null },
        { spr: "par7", decor: null }, { spr: "par8", decor: null },
      ],
    },
  },

  // Settimo edificio: `club` (src/objects/club1 — "Club" nel menu,
  // `pudj`/`selec==60`). Come `missile`/`solare`, un solo livello (nessun
  // `upXXX` lo referenzia nel decompilato). Il cantiere e' la stessa coppia
  // "r"/"f" gia' nota (`impaclubr`/`impaclubf`), che riusa gli stessi
  // sprite ir1x/if1x/"toppers" gia' in atlas per industria/missile/solare —
  // nessuno sprite di cantiere in piu' da aggiungere, solo lo sprite
  // finale (in realta' quattro, vedi sotto).
  //
  // A differenza di missile/solare l'edificio finito non e' un solo sprite
  // fisso: come `casa` (STUDIO.md §9), `club1/Create.gml` sceglie a dado
  // uniforme una fra 4 varianti (club11..14), ciascuna col proprio decoro
  // luce abbinato (gli sprite reali sono club11i..14i — gli OGGETTI
  // originali si chiamano clublite1..4, ma qui `decor` vuole nomi di
  // sprite, non di oggetto, stesso schema di `variants` gia' letto per
  // casa/parco sopra) — stessa macchina generica in stepConstructions().
  club: {
    label: "Club",
    placeCost: { mon: 3500 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==60
    storm: [{ dice: 200, loss: 50 }],   // [C] club1/Alarm_5.gml
    // [C] club1/Destroy.gml: hap +50 alla morte, nessun costo alla nascita
    // (Create.gml scrive solo `wewe` — resta inerte, stesso principio gia'
    // scelto per industria sopra: letto ma non cablato da nessuna regola,
    // il suo significato reale [?] non e' ancora chiaro) — non simmetrico,
    // stesso schema gia' letto per solare/parco.
    construct: {                  // livello 0 -> 1, impaclubr (src/objects/impaclubr)
      drain: { mon: 2, every: 10 },              // [C] impaclubr/Alarm_10.gml
      life: 50,                                    // [C] club1/Create.gml
      ruin: ["ru11", "ru12", "ru13", "ru14"],   // [C] club1/Step.gml: create_object(ruin1) — "taglia 1"
      hap: { destroy: 50 },
      variants: [                                  // [C] club1/Create.gml, dado uniforme fra 4
        { spr: "club11", decor: "club11i" },
        { spr: "club12", decor: "club12i" },
        { spr: "club13", decor: "club13i" },
        { spr: "club14", decor: "club14i" },
      ],
      // [C] impaclubr/Create.gml + Alarm_0.gml, tic 0..10 (1350 tic totali:
      // 390+40*8+640 — leggermente piu' lungo di missile/solare, un club
      // costa di piu': 3500 mon contro i 1000-5000 degli altri). tic==4
      // (durata 600) + tic==5 (durata 40, nessun cambio sprite nel
      // decompilato) fusi in un solo passo, stesso schema gia' scelto per
      // missile — [C] impaclubf/Alarm_0.gml tic==5 crea "tops2" (stesso
      // oggetto/offset del topper di missile, sprite reale "toppers").
      steps: [
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir22", dur: 40 },
        { spr: "ir21", dur: 640, spawn: [
          { spr: "toppers", dx: 0, dy: -86 },
        ] },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir11", dur: 40 }, { spr: "ir12", dur: 40 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 40 },
      ],
    },
  },

  // Ottavo edificio: `villa` (src/objects/villa1 — "Villa" nel menu,
  // `pvilla`/`selec==63`). E' il secondo edificio (dopo `casa`) con una
  // crescita/consumo vera nel tempo, non solo costruzione+fine — ma un solo
  // livello: `growth`/`consumption` qui sotto sono array di UN elemento
  // (indicizzati comunque per `b.level-1`, stesso schema di casa, cosi'
  // stepGrowth()/stepConsumption() non hanno bisogno di sapere che villa
  // non ha upgrade). Il cantiere (`impavil_r`/`impavil_f`) e' invece la
  // stessa forma "base" a 5 passi/790 tic gia' letta per `casa.construct`
  // (nessun contatore "tic" con rami per ogni valore, a differenza di
  // industria/missile/club) — stessi numeri, verificato passo per passo su
  // impavil_r/Create.gml + Alarm_0/1/2/3.
  villa: {
    label: "Villa",
    placeCost: { mon: 7500 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==63
    storm: [{ dice: 180, loss: 20 }],   // [C] villa1/Alarm_5.gml — dado/danno diversi da club (200/50)
    // [C] villa1/Alarm_2.gml: stessi 4 intervalli di casa1 (STUDIO.md sopra,
    // stesso schema "primo intervallo fisso, poi dado uniforme fra 4") —
    // quasi certamente lo stesso codice riusato dagli sviluppatori
    // originali, non una coincidenza. `pedestrianDice: 4`: [C] a ogni
    // stadio (non solo alla nascita) 1 probabilita' su 4 di un altro "pplo"
    // (stepGrowth() in buildings.js, onPedestrian).
    growth: [
      { firstInterval: 2000, intervals: [3500, 5796, 11565, 14656], popPerStage: 2, maxAva: 5, pedestrianDice: 4 },
    ],
    // [C] villa1/Alarm_3.gml: ogni 120 tic (stesso periodo di casa), consumo
    // per stadio `ava` — [giorno, notte] 0..5. A differenza di casa il
    // giorno di ava3 (12) e' PIU' BASSO di quello di ava2 (14): letto cosi'
    // com'e', non "raddrizzato" — lo stesso genere di asimmetria gia' visto
    // altrove nel decompilato (es. hap industria/club), non un refuso di
    // trascrizione.
    consumption: [
      [ { day: 4, night: 6 }, { day: 8, night: 12 }, { day: 14, night: 18 },
        { day: 12, night: 24 }, { day: 16, night: 30 }, { day: 18, night: 34 } ],
    ],
    construct: {                 // livello 0 -> 1, impavil_r (src/objects/impavil_r)
      drain: { mon: 2, every: 20 },              // [C] impavil_r/Alarm_10.gml
      life: 100,                                   // [C] villa1/Create.gml
      grantPop: 2,                                 // [C] villa1/Create.gml: r12.pop += 2 alla nascita
      deathPop: -10,                                // [C] villa1/Destroy.gml
      ruin: ["ru11", "ru12", "ru13", "ru14"],   // [C] villa1/Step.gml: create_object(ruin1) — "taglia 1"
      // [C] villa1/Create.gml: 5 livelli di action_if_dice(2) annidati, MA
      // l'albero non e' bilanciato come quello di casa (STUDIO.md §9) — due
      // meta' quasi identiche ma non uguali producono pesi diversi: vil6/7/8
      // doppi (4/32 ciascuno), vil1/4/5 intermedi (3/32), vil2/3/9/10/11
      // normali (2/32), vil12 dimezzato (1/32) — calcolato a mano ramo per
      // ramo dal decompilato, non un'approssimazione. pickVariant() sopra
      // e' la generalizzazione che lo rende possibile senza duplicare
      // stepConstructions() solo per questo caso.
      variants: [
        { spr: "vil1", decor: "vil1l", weight: 3 },
        { spr: "vil2", decor: "vil2l", weight: 2 },
        { spr: "vil3", decor: "vil3l", weight: 2 },
        { spr: "vil4", decor: "vil4l", weight: 3 },
        { spr: "vil5", decor: "vil5l", weight: 3 },
        { spr: "vil6", decor: "vil6l", weight: 4 },
        { spr: "vil7", decor: "vil7l", weight: 4 },
        { spr: "vil8", decor: "vil8l", weight: 4 },
        { spr: "vil9", decor: "vil9l", weight: 2 },
        { spr: "vil10", decor: "vil10l", weight: 2 },
        { spr: "vil11", decor: "vil11l", weight: 2 },
        { spr: "vil12", decor: "vil12l", weight: 1 },
      ],
      // [C] impavil_r/Create.gml + Alarm_0/1/2/3, 790 tic totali — stessa
      // forma "base" di casa.construct sopra (390+30+310+30+30), non i
      // rami "tic 0..N" di industria/missile/club. Lo spawn del topper
      // (tops1, offset -42 come solare, NON tops2/-86 come missile/club —
      // verificato leggendo l'oggetto giusto) e' in impavil_f/Alarm_4, che
      // fedelmente cade a meta' della fase "ir11": attaccato li'.
      steps: [
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 30 },
        { spr: "ir11", dur: 310, spawn: [
          { spr: "toppers", dx: 0, dy: -42 },
        ] },
        { spr: "ir12", dur: 30 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
      ],
    },
  },

  // Nono edificio: `gatling` (src/objects/gatlinggun — "Mitragliatrice" nel
  // menu, `pugatling`/`selec==62`). Seconda torretta dopo `missile`, stessa
  // famiglia `turret` — vedi stepTurretAim()/turretSprFor() sopra e
  // game/src/projectiles.js per il fuoco vero (bocca doppia, un colpo da
  // ciascuna canna per scarica).
  gatling: {
    label: "Mitragliatrice",
    placeCost: { mon: 10000 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==62
    turret: true,
    // [I] `gatlinggun/Mouse_LeftPressed.gml` non spara affatto al tocco —
    // imposta solo `spra=1` (la stessa posa di rinculo che Step.gml userebbe
    // dopo uno sparo vero, MA senza crearne uno), un tocco a vuoto senza
    // conseguenze. A differenza di missile/laser (vedi sotto) niente
    // `manualFire` qui: un tocco su una mitragliatrice finita resta senza
    // effetto (tryStartUpgrade in main.js risponde "livello massimo", non
    // diverso da nessun tocco).
    //
    // [C] gatlinggun/Step.gml: insegue il veicolo piu' vicino entro 550px
    // (un filo piu' lungo del raggio di missile); il fuoco vero (fireRange,
    // letto da game/src/projectiles.js) scatta separatamente entro 450px
    // contro una minaccia vera — stessa struttura "punta sempre al veicolo
    // piu' vicino, spara verso quello anche se non e' lui il bersaglio che
    // ha innescato lo sparo" gia' documentata per missile.
    aim: { range: 550, fireRange: 450 },
    storm: [{ dice: 130, loss: 50 }],   // [C] gatlinggun/Alarm_5.gml
    construct: {                  // livello 0 -> 1, impagatlingr (src/objects/impagatlingr)
      drain: { mon: 1, every: 20 },              // [C] impagatlingr/Alarm_10.gml
      finalSprite: "nm1a", life: 800,             // [C] gatlinggun/Create.gml
      ruin: ["ru21", "ru22", "ru23", "ru24"],   // [C] gatlinggun/Step.gml: create_object(ruin2) — "taglia 2"
      decor: [],                                   // [C] gatlinggun/Create.gml non crea nessun cddvd
      // [C] impagatlingr/Create.gml + Alarm_0.gml, tic 0..10 — stessa
      // identica forma (durate/sprite/offset del topper) di missile.construct
      // sopra: impagatlingr/f e impamissr/f sono, tic per tic, lo stesso
      // codice con nomi di oggetto diversi (verificato riga per riga).
      steps: [
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 361 },
        { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir22", dur: 40 },
        { spr: "ir21", dur: 640, spawn: [
          { spr: "toppers", dx: 0, dy: -86 },
        ] },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir11", dur: 40 }, { spr: "ir12", dur: 40 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 40 },
      ],
    },
  },

  // Decimo edificio: `laser` (src/objects/lasergun — "Laser" nel menu,
  // niente bottone dedicato nel decompilato per questo slot [I] gia' letto
  // da OTHER_BUILDINGS in main.js, `selec==5`). Terza e ultima torretta:
  // raggio di mira lunghissimo (800px) ma raggio di fuoco vero cortissimo
  // (200px, "a bruciapelo") e un costo per colpo in energia invece che in
  // denaro — vedi game/src/projectiles.js.
  laser: {
    label: "Laser",
    placeCost: { mon: 20000 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==5
    turret: true,
    // [C] lasergun/Mouse_LeftPressed.gml spara per davvero al tocco, stessa
    // forma del fuoco automatico (stesso costo/ricarica/raggio di mira) —
    // vedi fireTurretManual() in game/src/projectiles.js.
    manualFire: true,
    aim: { range: 800, fireRange: 200 },
    storm: [{ dice: 90, loss: 50 }],   // [C] lasergun/Alarm_5.gml (thunder offset -70, non riprodotto: puramente cosmetico)
    construct: {                  // livello 0 -> 1, impalaser_r (src/objects/impalaser_r)
      drain: { mon: 3, every: 20 },              // [C] impalaser_r/Alarm_10.gml
      finalSprite: "lan1", life: 1000,            // [C] lasergun/Create.gml
      ruin: ["ru31", "ru32", "ru33", "ru34"],   // [C] lasergun/Step.gml: create_object(ruin3) — "taglia 3"
      decor: [],                                   // [C] lasergun/Create.gml non crea nessun cddvd
      // [C] impalaser_r/Create.gml + Alarm_0.gml: 23 tic in tutto (0..22),
      // ma gli ultimi 12 (11..22) sono lo stesso specchio "costruisci poi
      // ripiega la gru" gia' troncato per impaind1to2r/2to3r (STUDIO.md,
      // industria "due semplificazioni") — troncato qui allo stesso modo,
      // tic 0..10. tic6 pianta 4 "grubig" (sprite "gr21", gia' in atlas per
      // il decoro di fine cantiere altrove) ai quattro angoli — l'unico
      // edificio con una gru per lato invece di una sola.
      steps: [
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir22", dur: 40 }, { spr: "ir21", dur: 40 },
        { spr: ["ir33", "ir34", "ir35", "ir36"], dur: 40 },
        { spr: "ir32", dur: 40, spawn: [
          { spr: "gr21", dx: 80, dy: 50 }, { spr: "gr21", dx: 80, dy: -50 },
          { spr: "gr21", dx: -80, dy: -50 }, { spr: "gr21", dx: -80, dy: 50 },
        ] },
        { spr: "ir31", dur: 40 },
        { spr: ["ir43", "ir44", "ir45", "ir46"], dur: 40 },
        { spr: "ir42", dur: 40 },
        { spr: "ir41", dur: 1400 },
      ],
    },
  },

  // Undicesimo edificio: `eolico` (`eoli`, src/objects/eoli — "Pala eolica"
  // nel menu, `pu4prov`/`selec==4`). Primo edificio NON piazzabile su un
  // solo placeholder: **[C]** `eoliplacer/Alarm_1.gml` (creato al tap da
  // `placeholder/Mouse_LeftReleased.gml`, selec==4) aspetta che
  // `placeholder/Collision_445.gml` (contro OGNI placeholder che tocca la
  // sua maschera fissa "phold", offset +98px dal tocco) faccia salire
  // `places` a 4 prima di far nascere `impavent` per davvero — una pala
  // eolica vuole un piccolo appezzamento libero, non un solo lotto. Senza
  // una vera maschera di collisione (STUDIO.md, "pepazzittecollider" mai
  // ricostruito — stessa scelta gia' fatta per `TURRET_MIN_DIST` sotto,
  // proprio sulla spaziatura di questa griglia) `multiTile` sotto e'
  // un'approssimazione dichiarata: il placeholder toccato PIU' i suoi 3
  // vicini liberi piu' vicini entro un raggio fisso — vedi
  // `findPlacementCluster()`/`EOLICO_RADIUS` in main.js. [I] A differenza
  // dell'originale (che fallisce IN SILENZIO se non trova 4 lotti — un
  // singolo controllo a tempo fisso 3 tick dopo la nascita di
  // `eoliplacer`, mai piu' ripetuto: sembra un meccanismo mai rifinito,
  // `fantoccio` che crea non fa letteralmente nulla, sprite vuoto, nessun
  // evento oltre un timer che lo autodistrugge) qui il giocatore riceve
  // sempre un messaggio, costruito o no.
  eolico: {
    label: "Pala eolica",
    placeCost: { mon: 50000 },   // [C] eoliplacer/Alarm_1.gml, ramo selec==4
    multiTile: { count: 4, radius: 130 },
    // [C] eoli/Alarm_0.gml: ogni 30 tick, SEMPRE +110 ele — a differenza di
    // industria non consuma `oil` (un generatore vero, non una centrale a
    // combustibile) e non e' gated su niente: `stepWindProduction()` sotto,
    // non il generico stepProduction() (quello e' industria-specifico,
    // richiede oil>0 incondizionatamente).
    windProduction: { every: 30, ele: 110 },
    storm: [{ dice: 30, loss: 50 }],   // [C] eoli/Alarm_5.gml (crea anche "thunder", puramente cosmetico — non riprodotto, stessa scelta di laser)
    construct: {                  // livello 0 -> 1, impavent (src/objects/impavent)
      // [C] impavent/Step.gml: `r12.mon -= 1` OGNI tick (non ogni N come il
      // `drain` di ogni altro cantiere) per tutta la sua durata — il campo
      // e' lo stesso `{mon, every}`, qui `every:1` lo riproduce esatto.
      drain: { mon: 1, every: 1 },
      finalSprite: "eol", life: 800,             // [C] eoli/Create.gml
      ruin: ["rovent1", "rovent2"],   // [C] eoli/Step.gml: create_object(ruinventola) — dado a due vie, ruinventola/Create.gml
      decor: [],                                   // [C] eoli/Create.gml non crea nessun cddvd
      hap: { create: -20, destroy: 20 },   // [C] eoli/Create.gml + Destroy.gml — l'unico simmetrico fra tutti i tipi con `hap`
      // [C] impavent/Create.gml + Alarm_0/1.gml: tre sprite in sequenza,
      // 1740+600+2200 = 4540 tick (~76s, il cantiere piu' lungo del motore —
      // coerente con un costo di 50000 mon). `impavent/Alarm_3.gml` a tic
      // 300 reimposta lo stesso sprite "impvent1" gia' attivo (un riavvio
      // dell'animazione senza effetto visibile su sprite statici): fuso nel
      // primo passo invece di un passo a parte, stesso principio gia' scelto
      // per le code cosmetiche di industria/casa (STUDIO.md, "due
      // semplificazioni"). Nessuna traccia "f" qui (`frontSprFor()` sotto
      // non riconosce "impvent*", niente impalcatura in sovraimpressione:
      // [C] fedele, questi sprite sono gia' l'illustrazione progressiva del
      // cantiere, non una fondamenta "ir1x" condivisa).
      steps: [
        { spr: "impvent1", dur: 1740 },
        { spr: "impvent2", dur: 600 },
        { spr: "impvent3", dur: 2200 },
      ],
    },
  },
};

let nextId = 1;

function pickSpr(spr) {
  return Array.isArray(spr) ? spr[(Math.random() * spr.length) | 0] : spr;
}

/**
 * Sceglie una `variants[i]` con peso opzionale (`weight`, default 1 —
 * casa/parco/club non lo dichiarano: restano un pick uniforme com'erano).
 * Serve per `villa` (STUDIO.md sotto): il dado a dice(2) annidati di
 * villa1/Create.gml NON e' un albero bilanciato — alcune varianti (vil6/7/8)
 * hanno probabilita' doppia di altre (vil2/3/9/10/11), e vil12 la meta' —
 * un pick uniforme fra 12 sarebbe infedele, non solo impreciso.
 */
function pickVariant(variants) {
  const total = variants.reduce((s, v) => s + (v.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const v of variants) {
    r -= v.weight ?? 1;
    if (r < 0) return v;
  }
  return variants[variants.length - 1];
}

/** Lo sprite "f" (impalcatura in sovraimpressione) che corrisponde allo
 * sprite "r" gia' scelto per il passo di cantiere corrente — vedi il
 * commento su BUILDING_TYPES.industria piu' sopra. null per le catene che
 * non hanno una traccia "f" nel decompilato (chies: sprite ce.../ci...). */
function frontSprFor(spr) {
  return spr.startsWith("ir") ? "if" + spr.slice(2) : null;
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

/** r12.pop da applicare se l'edificio muore ora, al suo livello attuale (0 se il tipo non ne ha). */
export function currentDeathPop(b) {
  const def = BUILDING_TYPES[b.type];
  if (b.level < 1) return 0;
  const cur = b.level === 1 ? def.construct : def.upgrades?.[b.level - 2];
  return cur?.deathPop ?? 0;
}

/** hap da applicare se l'edificio muore ora, al suo livello attuale — stesso
 * schema di currentDeathPop() sopra, per i tipi che dichiarano `hap`
 * (industria/parco; 0 per chies/casa/missile, che non ne hanno). */
export function currentDeathHap(b) {
  const def = BUILDING_TYPES[b.type];
  if (b.level < 1) return 0;
  const cur = b.level === 1 ? def.construct : def.upgrades?.[b.level - 2];
  return cur?.hap?.destroy ?? 0;
}

/**
 * Lo sprite del rudere che l'edificio lascerebbe se morisse ORA, al suo
 * livello attuale — stesso schema di currentDecor()/currentDeathPop() sopra
 * (`construct` per il livello 1, `upgrades[level-2]` oltre), con la stessa
 * ricaduta `baseRuin` che currentDecor() usa per `baseDecor` (chies non ha
 * `construct`). Un `ruin` puo' essere un pool di sprite equiprobabili (dado
 * uniforme, `pickSpr()` sopra — industria/casa/missile/club/villa/gatling/
 * laser/solare) o un unico sprite fisso (chies, niente dado nel decompilato).
 * `null` per i tipi senza nessun ramo `life<=0` nel decompilato (`parco`,
 * STUDIO.md/`BUILDING_TYPES.parco`): destroyBuilding() in main.js lo legge
 * per capire se lasciare un rudere o non fare niente, fedele in entrambi i
 * casi.
 */
export function ruinSpriteFor(b) {
  const def = BUILDING_TYPES[b.type];
  if (b.level < 1) return null;
  if (b.level === 1) return pickSpr(def.construct?.ruin ?? def.baseRuin ?? null);
  return pickSpr(def.upgrades?.[b.level - 2]?.ruin ?? null);
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
    b.frontSpr = frontSprFor(c.curSpr);
    // Il coperchio a gru (`up.cap`) compare durante l'ultimo passo: e'
    // sempre quello lungo ("l'edificio e' quasi finito", vedi steps sopra),
    // la stessa finestra in cui l'originale lo mostra davvero (poco dopo
    // l'inizio del cantiere, ma resta a schermo comunque fino alla fine).
    b.capSpr = (up.cap && c.stepIndex === up.steps.length - 1) ? up.cap : null;
    if (c.t < cur.dur * TICK) continue;
    c.t = 0;
    c.stepIndex++;
    if (c.stepIndex < up.steps.length) {
      cur = up.steps[c.stepIndex];
      c.curSpr = pickSpr(cur.spr);
      if (cur.spawn) onSpawn?.(b, cur.spawn);
    } else {
      // hap (industria/parco, `up.hap`/`oldDef.hap` in BUILDING_TYPES sopra):
      // l'originale distrugge l'istanza del livello vecchio e ne crea una
      // nuova per il livello nuovo, ognuna con il proprio Create.gml/
      // Destroy.gml — qui e' la STESSA istanza che continua, quindi il
      // "destroy" del livello che si sta lasciando va applicato esplicitamente
      // insieme al "create" di quello nuovo: i due non si annullano a vicenda
      // (i numeri del decompilato non sono simmetrici, vedi industria sopra).
      // Nessun effetto per i tipi che non dichiarano `hap` (casa, chies).
      const oldDef = c.upgradeIndex === -1 ? null
        : c.upgradeIndex === 0 ? def.construct : def.upgrades[c.upgradeIndex - 1];
      if (oldDef?.hap?.destroy) r12.hap += oldDef.hap.destroy;
      if (c.upgradeIndex === -1) b.level = 1; else b.level++;
      if (up.hap?.create) r12.hap += up.hap.create;
      b.life = up.life ?? (b.life + (up.lifeBonus ?? 0));
      if (up.grantPop) r12.pop += up.grantPop;   // [C] casa1|2|3/Create.gml: pop += N alla nascita del livello
      if (up.variants) {
        // Edifici a variante casuale (casa/parco/club: uniforme; villa: pesato
        // — vedi pickVariant() sopra) — sprite+decoro scelti una volta e
        // persistiti sull'istanza.
        const v = pickVariant(up.variants);
        b.spr = v.spr;
        b.decorSpr = v.decor;
        onDecor?.(b, [v.decor]);
      } else {
        b.spr = up.finalSprite;
        onDecor?.(b, up.decor);
      }
      b.construction = null;
      b.frontSpr = null; b.capSpr = null;
      // [C] industria1|2|3/Create.gml + casa1|2|3/Create.gml: `makee`/`ava`
      // partono da 0 ad ogni livello. Nell'originale ogni livello e' un
      // oggetto diverso che riparte da zero; qui e' lo stesso building che
      // continua, quindi i contatori vanno azzerati esplicitamente ad ogni
      // salto (insieme ai timer che li accumulano, cosi' non scattano subito
      // con un resto lasciato dal livello precedente).
      b.makee = 0; b.prodT = 0;
      b.ava = 0; b.growthT = 0; b.growthNext = null; b.consT = 0;
      // [C] casa1|2|3/Create.gml: `action_set_alarm(600, 4)`, riarmato a ogni
      // livello — il pulsante blu della moneta (game/src/coins.js) riparte
      // da zero ad ogni salto, stessa ragione dei contatori sopra.
      b.coinT = 0; b.coinNext = COIN_FIRST_DELAY;
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
 * Avanza `solare` (`sooool/Alarm_4.gml`, `def.solarProduction`): l'unico
 * edificio la cui produzione dipende dall'ORA DEL GIORNO invece che da un
 * consumo di materia prima (`oil` per industria). [C] ogni 30 tick: sempre
 * -5 mon; `ele` varia con la fase — -1 di notte, +5 all'alba, +9 altrimenti
 * (giorno/tramonto: il decompilato ha solo due flag booleani, `night` e
 * `dawn`, non le quattro fasi di questo motore — "ne' notte ne' alba" copre
 * entrambe). `isNight`/`isDawn` sono gli stessi booleani netti (nessuno
 * smoothstep) gia' usati da stepConsumption() per `casa`.
 */
export function stepSolarProduction(buildings, dt, r12, isNight, isDawn) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    const prod = def.solarProduction;
    if (!prod) continue;
    b.solarT = (b.solarT ?? 0) + dt;
    const period = prod.every * TICK;
    while (b.solarT >= period) {
      b.solarT -= period;
      r12.mon -= prod.mon;
      r12.ele += isNight ? prod.ele.night : isDawn ? prod.ele.dawn : prod.ele.day;
    }
  }
}

/**
 * Avanza `eolico` (`eoli/Alarm_0.gml`, `def.windProduction`): il piu'
 * semplice fra i tre produttori del motore — sempre +110 ele ogni 30 tick,
 * nessun costo, nessuna dipendenza da giorno/notte o da una materia prima
 * da esaurire. Non riusa stepProduction() (industria-specifico: gated su
 * `oil > 0` e sottrae `prod.oil` incondizionatamente, entrambi assenti qui)
 * ne' stepSolarProduction() (dipende dalla fase del giorno, questo no):
 * un generatore diverso merita il proprio stepper invece di forzare dati
 * incompatibili in uno esistente.
 */
export function stepWindProduction(buildings, dt, r12) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    const prod = def.windProduction;
    if (!prod) continue;
    b.windT = (b.windT ?? 0) + dt;
    const period = prod.every * TICK;
    while (b.windT >= period) { b.windT -= period; r12.ele += prod.ele; }
  }
}

/**
 * Avanza la crescita di popolazione degli edifici finiti che dichiarano
 * `growth` per livello (casa, un valore per casa1/2/3; villa, un solo
 * livello). [C] casa1|2|3/Alarm_2.gml: ogni avanzamento di stadio (`b.ava`,
 * 0..`maxAva`) aggiunge `popPerStage` a r12.pop e riarma con un intervallo
 * scelto a dado uniforme fra `intervals` — tranne il primo, che
 * nell'originale e' un valore fisso (`firstInterval`,
 * `action_set_alarm(2000,2)` in Create.gml, uguale per tutti e tre i
 * livelli DI CASA e anche per villa — [C] stesso valore letto in
 * villa1/Create.gml). Si ferma da solo a `maxAva`.
 *
 * `g.pedestrianDice` (solo villa: STUDIO.md sotto) — [C] villa1/Alarm_2.gml,
 * 1 probabilita' su 4 ad OGNI stadio (non solo alla nascita come per casa,
 * vedi `onPedestrian` sotto e la chiamata in main.js) crea un altro "pplo".
 * `onPedestrian(b)` e' chiamato invece di importare pedestrians.js qui:
 * buildings.js non sa niente di pedoni, stesso confine gia' scelto per
 * `onDecor`/`onSpawn` in stepConstructions().
 */
export function stepGrowth(buildings, dt, r12, onPedestrian) {
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
      if (g.pedestrianDice && Math.random() < 1 / g.pedestrianDice) onPedestrian?.(b);
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

const STORM_CHECK = 57 * TICK;   // [C] industria1|2/Alarm_5.gml, industria3/Alarm_6.gml, casa1|2/Alarm_5.gml: si riarmano tutti a 57 tick

/**
 * Avanza il danno da fulmine degli edifici finiti che dichiarano `storm`
 * per livello (industria, casa — non tutti i livelli: `null` = quel
 * livello non ha danno da fulmine nell'originale, vedi commenti sulle
 * tabelle in BUILDING_TYPES). [C] ogni 57 tick, se `r12.storm` e' attivo,
 * un dado (1 su N) toglie vita. Non uccide l'edificio qui — si limita a
 * portare `b.life` a 0 o sotto: la conseguenza (rimuoverlo, liberare il
 * placeholder, il bilancio pop/hap di `currentDeathPop`) e' responsabilita'
 * di chi chiama, perche' tocca cose che buildings.js non conosce (i
 * placeholder, il decoro in scena) — stesso confine di `spawnDecor`/
 * `addDecor` in main.js.
 */
export function stepStormDamage(buildings, dt, r12) {
  for (const b of buildings) {
    if (b.construction || b.life <= 0) continue;
    const def = BUILDING_TYPES[b.type];
    const sd = def.storm?.[b.level - 1];
    if (!sd) continue;
    b.stormT = (b.stormT ?? 0) + dt;
    while (b.stormT >= STORM_CHECK) {
      b.stormT -= STORM_CHECK;
      if (r12.storm && Math.random() < 1 / sd.dice) b.life = Math.max(0, b.life - sd.loss);
    }
  }
}

// [I] Distanza minima fra torrette (`missile`/`gatling`/`laser`, tutte con
// `turret: true`): sostituisce la vera collisione fisica
// dell'originale fra la maschera del cantiere/edificio e i placeholder
// vicini (`placeholder/Collision_impamissr|rocket_launcher|gatlinggun|
// lasergun.gml`, STUDIO.md "pepazzittecollider" mai ricostruito) — tarata
// sulla maschera vera di rocket_launcher ("auton", 297x172px) contro il
// passo della griglia dei placeholder in `match_easy` (~116px fra vicini
// diretti): abbastanza da bloccare i vicini immediati, non i vicini di
// vicini.
const TURRET_MIN_DIST = 200;

/** true se (x,y) e' troppo vicino a una torretta gia' piazzata (in cantiere o finita). */
export function tooCloseToTurret(buildings, x, y) {
  for (const b of buildings) {
    if (!BUILDING_TYPES[b.type]?.turret) continue;
    const dx = b.x - x, dy = b.y - y;
    if (dx * dx + dy * dy < TURRET_MIN_DIST * TURRET_MIN_DIST) return true;
  }
  return false;
}

// [C] rocket_launcher|gatlinggun|lasergun/Step.gml: point_direction (0°=est,
// cresce in senso antiorario) diviso in 16 archi di 22.5°, ognuno col
// proprio sprite — la STESSA rotazione "parti dal terzo nome, avvolgi a
// 16" per tutte e tre le torrette (missile: sprite_index 240..255 = lrn1..
// lrn16; gatling: 208..239 a due a due = nm1a..nm16a, qui solo le "a", le
// "b" sono la posa di rinculo — vedi sotto; laser: 192..207 = lan1..lan16),
// evidentemente una convenzione della striscia a 16 direzioni dell'editor
// originale, non una coincidenza fra i tre. Un solo generatore invece di
// tre tabelle scritte a mano — stesso ordine dei bucket, meno rischio di
// trascrizione su 48 voci in tutto.
const DIR_MAXES = [22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360];
function dirTable(prefix, suffix = "") {
  return DIR_MAXES.map((max, i) => ({ max, spr: `${prefix}${((i + 2) % 16) + 1}${suffix}` }));
}
const TURRET_SPRITE_TABLES = {
  missile: dirTable("lrn"),
  // [I] gatlinggun/Step.gml alterna anche una posa di rinculo dopo ogni
  // scarica (le "b", sprite_index dispari, pilotate da un piccolo stato
  // (`spra`/`amove`/Alarm_9|11) che fa lampeggiare il cannone per ~50 tick
  // dopo lo sparo) — non replicata: e' un dettaglio cosmetico del singolo
  // sparo, non della mira continua che questa tabella serve, e la stessa
  // macchina a stati aggiungerebbe parecchia complessita' per un lampeggio
  // che dura meno di un secondo. Restano solo le pose di mira "a".
  gatling: dirTable("nm", "a"),
  laser: dirTable("lan"),
};
function turretSprFor(type, angleDeg) {
  const table = TURRET_SPRITE_TABLES[type];
  const a = ((angleDeg % 360) + 360) % 360;
  for (const bucket of table) if (a <= bucket.max) return bucket.spr;
  return table[table.length - 1].spr;
}

/**
 * Le torrette (missile/gatling/laser, tutte con `turret: true`) inseguono
 * col cannone il veicolo piu' vicino entro `def.aim.range` — `targets` e'
 * una lista di `{x,y}` gia' assemblata da chi chiama (in main.js:
 * mongolfiere + auto decorative, l'equivalente di `veicoli_target`). [C]
 * rocket_launcher|gatlinggun|lasergun/Step.gml: se NESSUN veicolo e' in
 * portata lo sprite non cambia — resta all'ultima direzione puntata invece
 * di tornare alla posa di riposo, esattamente come nel decompilato (l'`if`
 * che aggiorna `sprite_index` e' innestato dentro il controllo di portata,
 * niente ramo `else`).
 *
 * [I] `threats`, se passato, ha priorita' sui semplici veicoli: quando una
 * minaccia vera (air/bombar/dirig) e' entro `def.aim.range` il cannone
 * punta LEI invece del veicolo piu' vicino — non piu' fedele all'originale
 * (che punta sempre al veicolo piu' vicino, vedi il commento su
 * `instance_nearest(veicoli_target)` in projectiles.js), corretto qui
 * perche' altrimenti il cannone poteva restare puntato su una mongolfiera
 * innocua anche con un bombardiere gia' a tiro — e siccome il fuoco vero
 * (projectiles.js, fireFrom) spara sempre verso `b.aimTarget`, il colpo
 * finiva su un bersaglio diverso da quello mostrato dallo sprite, confondendo
 * il giocatore. Qualunque minaccia entro il raggio di mira e' anche entro
 * `aim.fireRange` (sempre <= `aim.range`), quindi il bersaglio qui scelto e'
 * sempre coerente con quello che stepTurretFire()/fireTurretManual()
 * colpiranno davvero.
 */
export function stepTurretAim(buildings, targets, threats) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    if (!def.aim) continue;
    let nearest = null, nearestD2 = def.aim.range * def.aim.range;
    if (threats) {
      for (const th of threats) {
        const d2 = (th.x - b.x) ** 2 + (th.y - b.y) ** 2;
        if (d2 < nearestD2) { nearestD2 = d2; nearest = th; }
      }
    }
    if (!nearest) for (const t of targets) {
      const d2 = (t.x - b.x) ** 2 + (t.y - b.y) ** 2;
      if (d2 < nearestD2) { nearestD2 = d2; nearest = t; }
    }
    if (!nearest) continue;
    const angle = (Math.atan2(-(nearest.y - b.y), nearest.x - b.x) * 180) / Math.PI;
    b.spr = turretSprFor(b.type, angle);
    // [C] rocket_launcher/Step.gml: `direttorio` (l'angolo verso il
    // veicolo piu' vicino) sceglie anche da quale punta del cannone
    // sparerebbe il razzo (game/src/projectiles.js, MUZZLE_OFFSETS) — ma
    // il razzo stesso, una volta nato li', ripunta per conto suo al
    // bersaglio con `action_move_point` (`red_ball/Create.gml`): la
    // direzione di volo vera si ricalcola dalla punta del cannone, non
    // e' `aimAngle` letto cosi' com'e' (differenza notabile quando il
    // bersaglio e' vicino, l'offset del cannone e' ~100px). Salvati
    // entrambi sull'istanza — `aimAngle` per lo sprite e la scelta della
    // punta, `aimTarget` per il vero ricalcolo in stepTurretFire.
    b.aimAngle = angle;
    b.aimTarget = { x: nearest.x, y: nearest.y };
  }
}
