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
    // [C] rocket_launcher/Step.gml: insegue il veicolo piu' vicino
    // (famiglia `veicoli_target` — mongolfiere di risorse/spia e le auto
    // decorative) entro 400px, un sedicesimo di giro alla volta
    // (`turretSprFor()` sotto). Il fuoco vero (game/src/projectiles.js,
    // stepTurretFire — STUDIO.md "le minacce vere" era il pezzo che
    // mancava) scatta separatamente quando una minaccia vera
    // (`nemici_target`: air/bombar/dirig) entra entro 250px, ma il razzo
    // punta comunque al veicolo piu' vicino gia' calcolato qui sopra — non
    // necessariamente alla minaccia che ha innescato lo sparo: [C] fedele,
    // `red_ball/Create.gml` punta a `instance_nearest(veicoli_target)`,
    // non a chi ha fatto scattare l'Alarm.
    aim: { range: 400 },
    storm: [{ dice: 130, loss: 50 }],   // [C] rocket_launcher/Alarm_5.gml
    construct: {                  // livello 0 -> 1, impamissr (src/objects/impamissr)
      drain: { mon: 1, every: 20 },              // [C] impamissr/Alarm_10.gml
      finalSprite: "rl_as", life: 600,            // [C] rocket_launcher/Create.gml
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

  // Quarto edificio: `parco` (STUDIO.md §9 "GUI vera", `pu7`/`selec==7`,
  // gia' nel menu ma segnaposto). E' l'unico dei quattro senza potenziamenti
  // (nessun `upXXX` lo referenzia nel decompilato: resta cosi' com'e' una
  // volta finito) e l'unico il cui decoro non e' un bagliore fisso per
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
};

let nextId = 1;

function pickSpr(spr) {
  return Array.isArray(spr) ? spr[(Math.random() * spr.length) | 0] : spr;
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

// [I] Distanza minima fra torrette (`missile`, e in futuro `gatling`/
// `laser`, tutte con `turret: true`): sostituisce la vera collisione fisica
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

// [C] rocket_launcher/Step.gml: point_direction (0°=est, cresce in senso
// antiorario) diviso in 16 archi di 22.5°, ognuno con il proprio sprite
// (`sprite_index = 240..255`, risolti per indice in data/sprites.json:
// "lrn1".."lrn16" — non un nome scelto qui, letto dall'asset originale).
const TURRET_DIRECTIONS = [
  { max: 22.5, spr: "lrn3" }, { max: 45, spr: "lrn4" }, { max: 67.5, spr: "lrn5" },
  { max: 90, spr: "lrn6" }, { max: 112.5, spr: "lrn7" }, { max: 135, spr: "lrn8" },
  { max: 157.5, spr: "lrn9" }, { max: 180, spr: "lrn10" }, { max: 202.5, spr: "lrn11" },
  { max: 225, spr: "lrn12" }, { max: 247.5, spr: "lrn13" }, { max: 270, spr: "lrn14" },
  { max: 292.5, spr: "lrn15" }, { max: 315, spr: "lrn16" }, { max: 337.5, spr: "lrn1" },
  { max: 360, spr: "lrn2" },
];
function turretSprFor(angleDeg) {
  const a = ((angleDeg % 360) + 360) % 360;
  for (const bucket of TURRET_DIRECTIONS) if (a <= bucket.max) return bucket.spr;
  return TURRET_DIRECTIONS[TURRET_DIRECTIONS.length - 1].spr;
}

/**
 * Le torrette (oggi solo `missile`) inseguono col cannone il veicolo piu'
 * vicino entro `def.aim.range` — `targets` e' una lista di `{x,y}` gia'
 * assemblata da chi chiama (in main.js: mongolfiere + auto decorative,
 * l'equivalente di `veicoli_target`). [C] rocket_launcher/Step.gml: se
 * NESSUN veicolo e' in portata lo sprite non cambia — resta all'ultima
 * direzione puntata invece di tornare alla posa di riposo, esattamente come
 * nel decompilato (l'`if` che aggiorna `sprite_index` e' innestato dentro
 * il controllo di portata, niente ramo `else`).
 */
export function stepTurretAim(buildings, targets) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    if (!def.aim) continue;
    let nearest = null, nearestD2 = def.aim.range * def.aim.range;
    for (const t of targets) {
      const d2 = (t.x - b.x) ** 2 + (t.y - b.y) ** 2;
      if (d2 < nearestD2) { nearestD2 = d2; nearest = t; }
    }
    if (!nearest) continue;
    const angle = (Math.atan2(-(nearest.y - b.y), nearest.x - b.x) * 180) / Math.PI;
    b.spr = turretSprFor(angle);
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
