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
    label: "Church",
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
    label: "Industry",
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
    // `dy`: offset verticale del lampo/fulmine visivo (game/src/lightning.js,
    // stepStormDamage() sotto) — [C] `action_create_object(thunder, 0, dy)`
    // relativo, letto da industria1|2|3/Alarm_5|5|6.gml.
    storm: [
      { dice: 130, loss: 50, dy: -20 },    // [C] industria1
      { dice: 120, loss: 50, dy: -50 },    // [C] industria2
      { dice: 100, loss: 50, dy: -140 },   // [C] industria3
    ],
    construct: {                  // livello 0 -> 1, impaind0to1r (src/objects/impaind0to1r)
      drain: { mon: 1, every: 20 },              // [C] impaind0to1r/Alarm_10.gml
      finalSprite: "i11", life: 50,               // [C] industria1/Create.gml (life=50)
      wewe: 20,                                    // [C] industria1/Create.gml: wewe += 20 — peso su `match`, state.js
      ruspaCost: 5000, ruspaFirstStepDur: 30,       // [C] industria1/Mouse_LeftPressed.gml, ramo selec==11 — impaindu1r arma 30 tick, non 390 come impaind0to1r
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
      // [Bug corretto, segnalato dall'autore: "impalcature volanti/sequenze
      // fuori posto"] Stessa gru mancante di `casa` sopra (`ir11`, stesso
      // passo): **[C]** `impaind0to1f/Alarm_4.gml` (mai riletta finora per
      // il decoro transitorio) crea "tops1" a (0,-42), identico a
      // `impa0to1f`/`impasolf`/`impavil_f` — industria e' l'unico altro
      // "cantiere base a 5 passi" senza `spawn`, stesso motivo (portata
      // prima che il meccanismo esistesse).
      steps: [                                    // [C] impaind0to1r/Create.gml + Alarm_0/1/2/3
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 30 },
        { spr: "ir11", dur: 370, spawn: [
          { spr: "toppers", dx: 0, dy: -42, depthOffset: -80 },
        ] },
        { spr: "ir12", dur: 30 },
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 30 },
      ],
    },
    upgrades: [
      {                          // livello 1 -> 2, upind12 costo + impaind1to2r (troncato a tic 0..10)
        atMakee: 667,              // [C] industria1/Step.gml: upo==0 && makee>=667 -> crea upind12
        cost: { mon: 5000 },      // [C] upind12/Mouse_LeftPressed.gml
        finalSprite: "i21", life: 100,             // [C] industria2/Create.gml
        wewe: 60,                                   // [C] industria2/Create.gml: wewe += 60
        ruspaCost: 50000,                            // [C] industria2/Mouse_LeftPressed.gml, ramo selec==11 — nessun ruspaFirstStepDur: impaindu2r arma 30 tick, identico a impaind1to2r
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
        wewe: 180,                                  // [C] industria3/Create.gml: wewe += 180
        ruspaCost: 200000,                           // [C] industria3/Mouse_LeftPressed.gml, ramo selec==11 — nessun ruspaFirstStepDur: impaind3r arma 30 tick, identico a impaind2to3r
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
  // industria). `wewe` (peso su `match`, state.js — non "inquinamento" come
  // ipotizzato qui in un primo momento) e' scritto da ogni livello, vedi
  // `construct`/`upgrades` sotto.
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
    label: "House",
    placeCost: { mon: 100 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==1
    // [C] casa1/Alarm_2.gml: `ava` (0..5) e' lo stadio di crescita. Il primo
    // intervallo dopo la nascita e' fisso (`action_set_alarm(2000,2)` in
    // Create.gml, uguale per tutti e tre i livelli); da li' in poi ogni
    // avanzamento riarma con uno dei 4 valori scelti a dado uniforme
    // (diversi per livello: casa1/2/3/Alarm_2.gml). Ogni avanzamento
    // aggiunge pop reale, gia' simulata per davvero da stepGrowth()
    // (main.js) — nessuna crescita automatica generica altrove (state.js).
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
    // `dy`: offset del lampo visivo (game/src/lightning.js) — [C] casa1|2
    // creano "thunder" a offset relativo (0,0), nessuno spostamento.
    storm: [
      { dice: 180, loss: 50, dy: 0 },   // [C] casa1
      { dice: 170, loss: 50, dy: 0 },   // [C] casa2
      null,                       // [C] casa3: Alarm_5 armato ma senza codice
    ],
    construct: {                 // livello 0 -> 1, impa0to1r (src/objects/impa0to1r)
      life: 100,                  // [C] casa1/Create.gml
      wewe: 10,                   // [C] casa1/Create.gml: wewe += 10 — peso su `match`, state.js
      // [C] casa1/Mouse_LeftPressed.gml, ramo selec==11 (ruspa): 500 mon —
      // vedi il commento su `tryRuspaRebuild()` in fondo al file per il
      // meccanismo completo. `ruspaFirstStepDur` sostituisce SOLO la durata
      // del primo passo di `steps` sotto: **[C]** `impacasa1r/Create.gml`
      // arma il primo alarm a 30 tick, non 390 come `impa0to1r` (il cantiere
      // vero, da lotto vuoto) — il resto della sequenza (`Alarm_0` in poi)
      // e' byte-per-byte identico, verificato diff alla mano: ricostruire
      // su un lotto gia' sviluppato salta solo la fase di "sgombero".
      ruspaCost: 500, ruspaFirstStepDur: 30,
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
      // [Bug corretto, segnalato dall'autore: "impalcature volanti/sequenze
      // fuori posto"] Nessuna gru appariva durante il cantiere di una casa —
      // l'unico dei "cantieri base a 5 passi" (stessa forma di villa/solare)
      // senza `spawn`. **[C]** letto `impa0to1f/Alarm_4.gml` (la traccia "f"
      // di casa, mai riletta finora per il decoro transitorio): crea "tops1"
      // a (0,-42) circa a meta' del passo "ir11" — stesso oggetto/offset
      // gia' corretto per `solare`/`villa` sotto (`impasolf`/`impavil_f`,
      // Alarm_4 identico), qui mancava soltanto perche' casa e' stata
      // portata PRIMA che il meccanismo `spawn` esistesse (STUDIO.md, punto
      // 4) e non e' mai stata riallineata alle altre.
      steps: [                    // [C] impa0to1r/Create.gml + Alarm_0/1/2/3 (790 tic: 390+30+310+30+30)
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 30 },
        { spr: "ir11", dur: 310, spawn: [
          { spr: "toppers", dx: 0, dy: -42, depthOffset: -80 },
        ] },
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
        wewe: 25,                    // [C] casa2/Create.gml: wewe += 25
        ruspaCost: 2000,              // [C] casa2/Mouse_LeftPressed.gml, ramo selec==11 — nessun ruspaFirstStepDur: impacasa2r arma 30 tick, identico a impa1to2r
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
        wewe: 40,                    // [C] casa3/Create.gml: wewe += 40
        ruspaCost: 10000,             // [C] casa3/Mouse_LeftPressed.gml, ramo selec==11 — nessun ruspaFirstStepDur: impacasa3r arma 30 tick, identico a impa2to3r
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
    label: "Missile Launcher",
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
    // [C] rocket_launcher/Step.gml: insegue la minaccia vera piu' vicina
    // (`nemici_target`: air/bombar/dirig) entro 400px, un sedicesimo di giro
    // alla volta (`turretSprFor()` sotto). [I] Le mongolfiere (risorse/spia)
    // e le auto decorative NON sono un bersaglio (stepTurretAim() sotto,
    // buildings.js): la torretta resta senza aggancio finche' non c'e' un
    // velivolo ostile in portata, mai puntata su un pallone o un'auto a
    // terra. Il fuoco vero (game/src/projectiles.js, stepTurretFire) scatta
    // separatamente quando una minaccia vera entra entro 250px (`fireRange`),
    // sempre verso il bersaglio gia' inseguito qui sopra.
    aim: { range: 400, fireRange: 250 },
    storm: [{ dice: 130, loss: 50 }],   // [C] rocket_launcher/Alarm_5.gml
    construct: {                  // livello 0 -> 1, impamissr (src/objects/impamissr)
      drain: { mon: 1, every: 20 },              // [C] impamissr/Alarm_10.gml
      finalSprite: "rl_as", life: 600,            // [C] rocket_launcher/Create.gml
      wewe: 40,                                    // [C] rocket_launcher/Create.gml: wewe += 40 — peso su `match`, state.js
      // [C] rocket_launcher/Mouse_LeftPressed.gml, ramo selec==11: 20000
      // mon. `ruspaFirstStepDur: 1` e' il piu' estremo del motore —
      // `impamissilir/Create.gml` arma il primo alarm a 1 tick, non 361
      // come `impamissr`: praticamente salta il primo passo.
      ruspaCost: 20000, ruspaFirstStepDur: 1,
      ruin: ["ru21", "ru22", "ru23", "ru24"],   // [C] rocket_launcher/Step.gml: create_object(ruin2) — "taglia 2"
      decor: [],                                   // [C] rocket_launcher/Create.gml non crea nessun cddvd
      steps: [                                    // [C] impamissr/Create.gml + Alarm_0.gml, tic 0..10
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 361 },   // sprite iniziale di Create.gml, dura fino al primo Alarm_0
        { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir22", dur: 40 },
        { spr: "ir21", dur: 640, spawn: [                 // tic==4 (durata 600) + tic==5 (durata 40, nessun
          { spr: "toppers", dx: 0, dy: -86, depthOffset: -88 },              // cambio sprite nel decompilato): fuse in un solo
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
    label: "Solar Panels",
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
      wewe: 10,                                    // [C] sooool/Create.gml: wewe += 10 — peso su `match`, state.js
      // [C] sooool/Mouse_LeftPressed.gml, ramo selec==11: 2000 mon SE il
      // pannello non e' su un parco, 2700 se lo e' (`overpark` — main.js,
      // placeSolarOverPark(); il sovrapprezzo vero e proprio e' in
      // ruspaCostFor() sopra, questo resta il costo base). `impasoldem1r/
      // Create.gml` arma il primo alarm a 30 tick, non 370 come `impasolr`.
      ruspaCost: 2000, ruspaFirstStepDur: 30,
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
          { spr: "toppers", dx: 0, dy: -42, depthOffset: -80 },              // "toppers", stessa forma di "tops2" per missile/
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
    label: "Park",
    placeCost: { mon: 500 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==7
    // [I] Segnalato dall'autore: un parco e' scenografia bassa e piatta (lo
    // scatter di alberi/lampioni di spawnParcoScatter(), non un edificio
    // solido), ma con `depth` dinamico (`effDepth()`, main.js: `depth===0` ->
    // `-y` come ogni altro edificio) finiva davanti a pali/auto/altri oggetti
    // di mondo vicini che dovrebbero invece coprirlo. Un `fixedDepth` fuori
    // dalla gamma tipica di `-y` (poche centinaia/migliaia negativi su
    // questa mappa) lo tiene sempre "in fondo", dietro a tutto cio' che si
    // muove sopra — placeAt() (main.js) lo legge invece del solito 0.
    fixedDepth: -5,
    construct: {                 // livello 0 -> 1, imparcr (src/objects/imparcr)
      drain: { mon: 1, every: 20 },              // [C] imparcr/Alarm_10.gml
      life: 9999,                                 // [I] nessun danno da fulmine ne' vita nel decompilato
      ruspaCost: 500,                              // [C] parco/Mouse_LeftPressed.gml, ramo selec==11 — nessun ruspaFirstStepDur: imparcor_demo arma 30 tick, identico a imparcr
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
    storm: [{ dice: 200, loss: 50, dy: -20 }],   // [C] club1/Alarm_5.gml
    // [C] club1/Destroy.gml: hap +50 alla morte, nessun costo alla nascita —
    // non simmetrico, stesso schema gia' letto per solare/parco.
    construct: {                  // livello 0 -> 1, impaclubr (src/objects/impaclubr)
      drain: { mon: 2, every: 10 },              // [C] impaclubr/Alarm_10.gml
      life: 50,                                    // [C] club1/Create.gml
      wewe: 20,                                    // [C] club1/Create.gml: wewe += 20 — peso su `match`, state.js
      // [C] club1/Mouse_LeftPressed.gml, ramo selec==11: 2000 mon.
      // `impaclubdemr/Create.gml` arma il primo alarm a 30 tick, non 390
      // come `impaclubr`.
      ruspaCost: 2000, ruspaFirstStepDur: 30,
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
          { spr: "toppers", dx: 0, dy: -86, depthOffset: -88 },
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
      wewe: 10,                                     // [C] villa1/Create.gml: wewe += 10 — peso su `match`, state.js
      // [C] villa1/Mouse_LeftPressed.gml, ramo selec==11: 6000 mon.
      // `impavilla1r/Create.gml` arma il primo alarm a 30 tick, non 390
      // come `impavil_r` — dal secondo passo in poi (Alarm_0) e' l'unica
      // coppia verificata byte-per-byte identica fra le due varianti.
      ruspaCost: 6000, ruspaFirstStepDur: 30,
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
          { spr: "toppers", dx: 0, dy: -42, depthOffset: -80 },
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
    label: "Gatling Gun",
    placeCost: { mon: 10000 },   // [C] placeholder/Mouse_LeftReleased.gml, selec==62
    turret: true,
    // [C] `gatlinggun/Mouse_LeftPressed.gml` nel decompilato non spara
    // affatto al tocco — imposta solo `spra=1` (la stessa posa di rinculo
    // che Step.gml userebbe dopo uno sparo vero, MA senza crearne uno), un
    // tocco a vuoto senza conseguenze. [I] Segnalato dall'autore giocando
    // ("clicco sul gatling e non spara"): qui `manualFire` e' comunque
    // attivo, come per missile/laser — un tocco su una mitragliatrice
    // finita spara per davvero invece di restare senza effetto, deviazione
    // deliberata dal decompilato per coerenza con le altre due torrette.
    manualFire: true,
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
      wewe: 40,                                    // [C] gatlinggun/Create.gml: wewe += 40 — peso su `match`, state.js
      // [C] gatlinggun/Mouse_LeftPressed.gml, ramo selec==11: 20000 mon
      // (armato su Alarm_10, non Alarm_9 come tutti gli altri — Alarm_9 di
      // gatlinggun e' gia' preso da altro). `impademogatlingr/Create.gml`
      // arma il primo alarm a 1 tick, non 361 come `impagatlingr`.
      ruspaCost: 20000, ruspaFirstStepDur: 1,
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
          { spr: "toppers", dx: 0, dy: -86, depthOffset: -88 },
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
    storm: [{ dice: 90, loss: 50, dy: -70 }],   // [C] lasergun/Alarm_5.gml
    construct: {                  // livello 0 -> 1, impalaser_r (src/objects/impalaser_r)
      drain: { mon: 3, every: 20 },              // [C] impalaser_r/Alarm_10.gml
      finalSprite: "lan1", life: 1000,            // [C] lasergun/Create.gml
      wewe: 90,                                    // [C] lasergun/Create.gml: wewe += 90 — peso su `match`, state.js
      // [C] lasergun/Mouse_LeftPressed.gml, ramo selec==11: 100000 mon —
      // il piu' caro tra le torrette (coerente con 20000 di piazzamento,
      // il piu' caro anche li'). `impalasdem_r/Create.gml` arma il primo
      // alarm a 30 tick, non 390 come `impalaser_r`.
      ruspaCost: 100000, ruspaFirstStepDur: 30,
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
  // `placeholder/Collision_eoliplacer.gml` (contro OGNI placeholder che
  // tocca la sua maschera fissa "phold", offset +98px dal tocco) faccia
  // salire `places` a 4 prima di far nascere `impavent` per davvero — una
  // pala eolica vuole un piccolo appezzamento libero, non un solo lotto.
  //
  // [Bug corretto, segnalato dall'autore con uno screenshot: "la turbina
  // finisce in mezzo alla strada e va in collisione con chies" — i 4 lotti
  // devono essere ADIACENTI, a formare un rettangolo] Le due versioni
  // precedenti di `multiTile` (prima un raggio dal TOCCO, poi dall'ANCORA
  // visiva) trovavano sempre 3 lotti REALMENTE liberi entro una certa
  // distanza in linea d'aria, ma non necessariamente adiacenti fra loro: su
  // una griglia isometrica un lotto due passi piu' lontano puo' misurare
  // meno px di uno a un passo solo in diagonale, quindi "il piu' vicino"
  // poteva scegliere un lotto dall'altra parte di una strada. **[C]**
  // Ricostruito leggendo `impavent_dem/Alarm_2.gml` (la ruspa che demolisce
  // una pala eolica ricrea i 4 placeholder che l'avevano formata, a offset
  // ESATTI `(-98,0)`/`(98,0)`/`(0,-58)`/`(0,58)` dal proprio centro — la
  // stessa geometria, a meno del segno, di `DIAGONAL_DIRS` in main.js,
  // palazzo/museo): senza una vera maschera di collisione (STUDIO.md,
  // "pepazzittecollider" mai ricostruito) `findWindCluster()` in main.js
  // sostituisce il raggio con la ricerca ESATTA (stessa tolleranza sulla
  // griglia reale gia' usata da `DIAGONAL_DIRS`) dei tre vicini che
  // completano il rombo isometrico adiacente al lotto toccato — sempre
  // adiacenti a due a due, mai sparsi. [I] A differenza dell'originale (che
  // fallisce IN SILENZIO se non trova 4 lotti — un singolo controllo a
  // tempo fisso 3 tick dopo la nascita di `eoliplacer`, mai piu' ripetuto:
  // sembra un meccanismo mai rifinito, `fantoccio` che crea non fa
  // letteralmente nulla, sprite vuoto, nessun evento oltre un timer che lo
  // autodistrugge) qui il giocatore riceve sempre un messaggio, costruito o
  // no.
  //
  // `anchorOffset` — il CENTRO VISIVO della pala — NON e' la media del
  // cluster trovato sopra: **[C]** letto `placeholder/Mouse_LeftReleased.gml`
  // riga per riga, al tocco (ramo selec==4) l'originale crea `eoliplacer` a
  // offset FISSO `(98, 0)` dal placeholder toccato (`action_create_object
  // (eoliplacer, 98, 0)`), e la catena successiva (`eoliplacer` ->
  // `impavent` -> `eoli`, tutte con `action_create_object(..., 0, 0)`,
  // offset relativo zero) eredita quella stessa posizione senza piu'
  // toccarla: il centro vero e' sempre `placeholder.x + 98, placeholder.y`,
  // un numero fisso letto dal codice — indipendente dai 4 lotti di TERRENO
  // consumati sopra (stesso rombo per qualunque edificio nasca su questa
  // maschera, `grattacielo` sotto incluso: cambia solo la sua ancora
  // visiva, non i lotti).
  eolico: {
    label: "Wind Turbine",
    placeCost: { mon: 50000 },   // [C] eoliplacer/Alarm_1.gml, ramo selec==4
    // [C] placeholder/Mouse_LeftReleased.gml: `anchorOffset` e' l'offset FISSO
    // (98, 0) di eoliplacer dal placeholder toccato, vedi il commento sopra.
    // `count` resta solo per il messaggio d'errore (main.js, placeAt()): il
    // rombo di 4 lotti adiacenti che `findWindCluster()` cerca e' sempre
    // quello, non un parametro.
    multiTile: { count: 4, anchorOffset: { dx: 98, dy: 0 } },
    // [C] eoli/Alarm_0.gml: ogni 30 tick, SEMPRE +110 ele — a differenza di
    // industria non consuma `oil` (un generatore vero, non una centrale a
    // combustibile) e non e' gated su niente: `stepWindProduction()` sotto,
    // non il generico stepProduction() (quello e' industria-specifico,
    // richiede oil>0 incondizionatamente).
    windProduction: { every: 30, ele: 110 },
    // `dy` non letto (offset esatto non verificato): il lampo visivo
    // (game/src/lightning.js) usa qui il default 0, un'approssimazione [I] —
    // a differenza di industria/casa/club/laser sopra, dove l'offset vero e'
    // stato letto riga per riga.
    storm: [{ dice: 30, loss: 50 }],   // [C] eoli/Alarm_5.gml (crea anche "thunder")
    construct: {                  // livello 0 -> 1, impavent (src/objects/impavent)
      // [C] impavent/Step.gml: `r12.mon -= 1` OGNI tick (non ogni N come il
      // `drain` di ogni altro cantiere) per tutta la sua durata — il campo
      // e' lo stesso `{mon, every}`, qui `every:1` lo riproduce esatto.
      drain: { mon: 1, every: 1 },
      finalSprite: "eol", life: 800,             // [C] eoli/Create.gml
      // [Bug corretto] Nessuna traccia "f" (frontSprFor() sopra non
      // riconosce "impvent*"): senza impalcatura a coprirlo, "svelarsi"
      // prima come ogni altro edificio (STUDIO.md, "l'edificio finito
      // compare quando l'impalcatura entra nell'ultimo passo") mostrerebbe
      // "eol" — gia' finito e animato — per l'intero ultimo passo
      // (`impvent3`, 37s), nascondendo l'animazione di montaggio vera
      // (steps sotto). `revealAtEnd` (stepConstructions(), buildings.js)
      // rimanda `applyLevelFinish()` alla vera fine del cantiere per
      // questo tipo soltanto — fedele all'originale anche qui (`eoli`
      // nasce solo a fine cantiere, `impavent/Alarm_2.gml`).
      revealAtEnd: true,
      // [C] eoli/Create.gml: wewe += 200 — di gran lunga il piu' pesante fra
      // tutti gli edifici (il secondo, media1s/d, si ferma a 150): una pala
      // eolica intera sulla piattaforma volante, fedele al nome "wewe"
      // (peso, non "inquinamento" come ipotizzato in un primo momento —
      // vedi state.js). Applicato solo su `match`, mai su `match_easy`.
      wewe: 200,
      // [C] eoli/Mouse_LeftPressed.gml, ramo selec==11: 200000 mon — il
      // rudere piu' costoso del motore, coerente con essere anche
      // l'edificio piu' costoso da piazzare. **[C] `impavent_dem`, letto
      // riga per riga (Create.gml + Alarm_0/1/2), e' DIVERSO da ogni altro
      // "_demo": non ricostruisce `eoli`, crea 4 `placeholder` (agli offset
      // ±98/±58, la stessa geometria di `impavent/Alarm_2.gml` per i suoi
      // 4 lotti) e si autodistrugge — una pala eolica ruspata torna terreno
      // libero, non una pala eolica nuova. `ruspaDemolish: true` marca
      // questo (main.js, la gestisce a parte da `tryRuspaRebuild()`) invece
      // di forzarla nella forma "stessa tipo/livello" di ogni altro edificio.
      ruspaCost: 200000, ruspaDemolish: true,
      ruin: ["rovent1", "rovent2"],   // [C] eoli/Step.gml: create_object(ruinventola) — dado a due vie, ruinventola/Create.gml
      decor: [],                                   // [C] eoli/Create.gml non crea nessun cddvd
      hap: { create: -20, destroy: 20 },   // [C] eoli/Create.gml + Destroy.gml — l'unico simmetrico fra tutti i tipi con `hap`
      // [C] impavent/Create.gml + Alarm_0/1.gml: tre sprite in sequenza,
      // 1740+600+2200 = 4540 tick (~76s, il cantiere piu' lungo del motore —
      // coerente con un costo di 50000 mon). Nessuna traccia "f" qui
      // (`frontSprFor()` sotto non riconosce "impvent*", niente impalcatura
      // in sovraimpressione): [C] fedele, questi sprite sono gia'
      // l'illustrazione progressiva del cantiere, non una fondamenta "ir1x"
      // condivisa.
      //
      // [Bug corretto] "sprite fermo per finta durata, poi sprite diverso"
      // non basta qui: **[C]** verificato in `data/sprites.json`, "impvent1"
      // ha DAVVERO 15 sottoimmagini e "impvent3" 22 (ir1x/if1x/sr4x/rd4x/m3x*
      // di ogni altro cantiere del motore sono invece tutti a un solo
      // frame — l'unico caso reale nel motore) — l'originale li anima con
      // `action_sprite_set(sprite, 0, spd)`, non con `image_speed` a zero
      // come ogni altro passo di cantiere. Segnalato dall'autore
      // ("l'impalcatura/la pala dovrebbe montarsi/smontarsi con
      // un'animazione, non si vede nulla"): il motore sceglieva sempre il
      // frame 0 di qualunque sprite, ignorando le sottoimmagini vere.
      // `spd` (nuovo campo per passo, frame/tic — lo stesso "frame/step" di
      // GameMaker) fa lo stesso conto gia' usato per "eol" finito
      // (WIND_ANIM_FPS/frameCountFor, main.js), generalizzato a QUALUNQUE
      // sprite di cantiere invece che solo allo sprite finale.
      // `impvent2` resta senza `spd` (un solo frame, l'`image_speed=1`
      // dell'originale non farebbe comunque nessuna differenza visibile).
      // `impvent3`: **[C]** `impavent/Alarm_1.gml`, `action_sprite_set
      // (impvent3, 0, 0.01)` — 0.01 frame/tic * 2200 tic di durata = 22
      // frame, ESATTAMENTE un ciclo completo dei 22 frame veri dello
      // sprite: la velocita' non e' arbitraria, e' tarata apposta perche'
      // l'animazione (la pala che prende forma) finisca proprio quando
      // finisce il passo.
      // `impvent1`: **[C]** `impavent/Create.gml` lo crea FERMO
      // (`action_sprite_set(impvent1, 0, 0)`), poi `impavent/Alarm_3.gml` a
      // tic 300 lo riarma a 0.01 frame/tic — non un riavvio "senza
      // effetto" come letto in una nota precedente (che assumeva sprite
      // statici, smentita ora che si sa che hanno sottoimmagini vere): il
      // passo (1740 tic) e' percio' spezzato in due qui, stessa identica
      // sagoma "impvent1" ma durata/velocita' diverse — 300 tic fermo sul
      // frame 0, poi 1440 tic a 0.01 frame/tic = 14.4 frame, di nuovo quasi
      // un ciclo completo dei 15 frame veri, stessa logica di impvent3.
      // Spezzare il passo non cambia costi/durate totali (300+1440=1740,
      // identico) ne' texto/messaggi (stesso sprite mostrato, `pickSpr()`
      // sotto lo rivaluta ma "impvent1" e' una stringa singola, non un
      // array a dado) — l'unico effetto e' il timer di animazione
      // (`c.t`, si azzera ad ogni passo) che riparte da 0 al secondo
      // sotto-passo, esattamente il momento in cui l'originale stesso lo
      // riarma.
      steps: [
        { spr: "impvent1", dur: 300, spd: 0 },
        { spr: "impvent1", dur: 1740 - 300, spd: 0.01 },
        { spr: "impvent2", dur: 600 },
        { spr: "impvent3", dur: 2200, spd: 0.01 },
      ],
    },
  },

  // Dodicesimo e tredicesimo edificio: `palazzo` (`pu6`/`selec==6` — la voce
  // OTHER_BUILDINGS lo chiamava "Grattacielo", main.js: nessuno dei due nomi
  // compare mai in un messaggio di gioco nell'originale, ma **[C]**
  // src/objects/level2palazz (il popup "livello 2 sbloccato" agganciato a
  // `pu6/Mouse_MouseEnter.gml` — stesso schema di level2club/level2gatling/
  // level2sol per club/gatling/solare: "level2" + nome interno) chiama
  // l'edificio "palazz[o]", non "grattacielo") e `museo` (`pumediat`/
  // `selec==70`) sono i primi due edifici a DUE lotti — **diversi anche da
  // `eolico`**, l'unico altro multi-lotto: quello resta un tocco singolo
  // con un raggio di ricerca piu' largo (`multiTile` sopra), questi si
  // piazzano con un vero trascinamento verso un vicino diagonale libero —
  // vedi il commento su `DIAGONAL_DIRS`/`armPlacement()`/`resolvePlacement()`
  // in game/src/main.js per la meccanica completa, letta da
  // src/objects/placeholder/Mouse_LeftPressed.gml (rami selec==6/70) +
  // Collision_dir1..4.gml + dir1..4 + dirdel. `def.diagonalPlacement: true`
  // e' il flag che main.js legge per instradare questi due tipi ad
  // armPlacement() invece del normale placeAt() a un lotto solo.
  //
  // **[C]** Collision_dir1..4.gml: le quattro direzioni si accoppiano in
  // due assi opposti (dir1+dir3 contro dir2+dir4), che scelgono una catena
  // di cantiere/varianti interamente diversa — sprite orientati (`sr*`/`sf*`
  // contro `rd*`/`fd*`, la stessa idea di `ir*`/`if*` con un prefisso
  // diverso, vedi `frontSprFor()` sopra) e una famiglia di varianti finali
  // "dispari" contro "pari" (c4xx). Invece di far portare l'asse ad ogni
  // funzione di buildings.js, main.js materializza l'asse in un TIPO
  // concreto diverso al momento della costruzione vera —
  // `resolvePlacement()`: "palazzo"/"museo" (asse dir1/dir3, "r") contro
  // "palazzoRd"/"museoRd" (asse dir2/dir4, "rd") sotto. Questi ultimi due
  // non compaiono mai in OTHER_BUILDINGS/il menu: sono raggiungibili solo
  // internamente, come "chies".
  //
  // **[C]** src/objects/impa4r|impa4f/Alarm_0.gml: sequenza a tic reale,
  // 23 passi (390+40*9+800+20*11 tic, ~2860 in tutto) — MA l'edificio vero
  // (`casa4s`/`casa4d`) nasce gia' al passo 10 di `impa4f` (700 tic dopo
  // l'inizio di quel passo, non alla fine dell'intera animazione):
  // `impa4f/Alarm_5.gml`. I passi successivi (11..22) sono una coda
  // cosmetica simmetrica che smonta la gru senza alcun effetto di gioco —
  // stessa "coda cosmetica" gia' tagliata altrove nel motore (STUDIO.md,
  // "due semplificazioni" — impalaser_r/impa2to3r). `steps` sotto si ferma
  // al passo che consegna l'edificio (dur dell'ultimo passo troncata a 700,
  // non 800, per allinearsi esattamente al momento della nascita). Il
  // drain (`impa4r/Alarm_10.gml`, l'unico dei due a drenare mon — `impa4f`
  // non drena niente, letto come `frontSpr` puramente cosmetico) resta
  // attivo per tutta questa sequenza accorciata. **[I]** scelta dichiarata,
  // non un dato mancante: il "vero" impa4r/impa4f originale continua a
  // vivere (e a drenare) anche dopo la nascita dell'edificio, un concetto
  // ("cantiere che sopravvive al proprio edificio") che questo motore non
  // modella da nessuna parte — troncare e' coerente col resto del file.
  //
  // **Secondo livello ora portato** (`upgrades[0]` sotto): nel decompilato
  // palazzo continua con un secondo salto (`casa4s|d/Alarm_2.gml`, ava==5 —
  // MA solo se `chies.level>=3`, un gate mai visto per nessun'altra `casa`:
  // crea `upsign45s|d` -> `impa5r|rd` -> `casa5ss|dd`). Il gate nuovo
  // (soglia legata a un ALTRO edificio, non solo pop/makee/ava come
  // `upgradeProgress()` conosceva finora) e' `requiresChiesLevel`, letto da
  // `upgradeUnlocked()`/`tryStartUpgrade()` sotto insieme al normale
  // `atAva` — stesso genere di gate gia' scelto per `chies` stessa
  // (`atPop`), solo su un edificio diverso da se stesso.
  palazzo: {
    label: "Building",
    placeCost: { mon: 6000 },   // [C] placeholder/Mouse_LeftPressed.gml, ramo selec==6
    diagonalPlacement: true,
    construct: {                 // livello 0 -> 1, impa4r/impa4f -> casa4s (asse "r", dir1/dir3)
      drain: { mon: 3, every: 20 },                // [C] impa4r/Alarm_10.gml
      life: 400, deathPop: -160,                    // [C] casa4s/Create.gml + Destroy.gml
      wewe: 100,                                      // [C] casa4s/Create.gml: wewe += 100 — peso su `match`, state.js
      // [C] casa4s/Mouse_LeftPressed.gml, ramo selec==11: 20000 mon.
      // `impa4r_demo/Create.gml` arma il primo alarm a 30 tick, non 390
      // come `impa4r`.
      ruspaCost: 20000, ruspaFirstStepDur: 30,
      grantPop: 37,                                  // [C] casa4s/Create.gml: r12.pop += 37 alla nascita
      ruin: ["ru41"],                                // [C] casa4s/Step.gml: create_object(ruin4s)
      // [C] casa4s/Create.gml: 5 livelli di dice(2) annidati, albero
      // bilanciato (a differenza di villa) — 10 varianti "dispari" (suffisso
      // 1/3), tutte 1/16: pickVariant() sopra e' gia' uniforme senza
      // `weight`. Decoro luci notturne "cXXXsl" (STUDIO.md, stesso schema
      // vil1/vil1l di villa).
      variants: [
        { spr: "c411s", decor: "c411sl" }, { spr: "c413s", decor: "c413sl" },
        { spr: "c421", decor: "c421l" }, { spr: "c423", decor: "c423l" },
        { spr: "c431", decor: "c431l" }, { spr: "c433", decor: "c433l" },
        { spr: "c441", decor: "c441l" }, { spr: "c443", decor: "c443l" },
        { spr: "c451", decor: "c451l" }, { spr: "c453", decor: "c453l" },
      ],
      // [C] impa4r/Alarm_0.gml, passi 0..10 (vedi commento sopra per il
      // perche' si ferma qui). Il gruppo di 5 "gru" al passo 3 e' letto
      // punto per punto (offset diversi ciascuna, non un pattern regolare).
      steps: [
        { spr: ["sr11", "sr12", "sr13", "sr14"], dur: 390 },
        { spr: "sr15", dur: 40 }, { spr: "sr16", dur: 40 },
        { spr: ["sr21", "sr22", "sr23", "sr24"], dur: 40 },
        { spr: "sr25", dur: 40, spawn: [
          { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
          { spr: "gru1", dx: -12, dy: -112 }, { spr: "gru1", dx: -80, dy: 50 },
          { spr: "gru1", dx: -172, dy: -114 },
        ] },
        { spr: "sr26", dur: 40 },
        { spr: ["sr31", "sr32", "sr33", "sr34"], dur: 40 },
        { spr: "sr35", dur: 40 }, { spr: "sr36", dur: 40 },
        { spr: ["sr41", "sr42", "sr43", "sr44"], dur: 40 },
        { spr: "sr45", dur: 40 },
        { spr: "sr46", dur: 700, spawn: [{ spr: "topls", dx: 0, dy: -170, depthOffset: -172 }] },
      ],
    },
    // **Secondo livello, ora portato**: casa4s/Alarm_2.gml continua oltre
    // ava==5 con un gate mai visto per nessun'altra `casa` — **[C]** solo se
    // `chies.level>=3` crea `upsign45s` (altrimenti ripolla ogni 600 tick
    // finche' non lo e'); qui e' `upgrades[0].requiresChiesLevel`, letto da
    // upgradeUnlocked()/tryStartUpgrade() sopra insieme al normale `atAva`
    // (nessun altro edificio combina i due). **[C]** upsign45s/Mouse_
    // LeftPressed.gml: costo 20000 mon, crea `impa5r` (stessa posizione
    // relativa (0,0) del segnale, come upcrc12/upind12 per chies/industria).
    upgrades: [
      {
        atAva: 5, requiresChiesLevel: 3, cost: { mon: 20000 },
        // [C] impa5r/Alarm_10.gml: stesso drain di impa4r, nessun cambio.
        drain: { mon: 3, every: 20 },
        life: 700, deathPop: -320,               // [C] casa5ss/Create.gml + Destroy.gml
        wewe: 100,                                // [C] casa5ss/Create.gml: wewe += 100
        // [C] casa5ss/Mouse_LeftPressed.gml, ramo selec==11: 50000 mon.
        // impa5r_demo/Create.gml arma il primo alarm a 30 tick, come impa5r.
        ruspaCost: 50000, ruspaFirstStepDur: 30,
        grantPop: 187,                            // [C] casa5ss/Create.gml: r12.pop += 187 alla nascita
        ruin: ["ru41"],                           // [C] casa5ss/Step.gml: create_object(ruin4s) — stesso rudere del livello 1
        // [C] casa5ss/Create.gml: stesso albero bilanciato di casa4s, 10
        // varianti "pari" (suffisso 2/4 — sr51 e' r, non l'asse di sprite:
        // qui e' solo la numerazione delle varianti che cambia da 411../451.
        // a 512../554.).
        variants: [
          { spr: "c512", decor: "c512l" }, { spr: "c514", decor: "c514l" },
          { spr: "c522", decor: "c522l" }, { spr: "c524", decor: "c524l" },
          { spr: "c532", decor: "c532l" }, { spr: "c534", decor: "c534l" },
          { spr: "c542", decor: "c542l" }, { spr: "c544", decor: "c544l" },
          { spr: "c552", decor: "c552l" }, { spr: "c554", decor: "c554l" },
        ],
        // [C] impa5r/Create.gml + Alarm_0.gml, tic 0..23 (STUDIO.md "due
        // semplificazioni" — stessa coda cosmetica gia' tagliata per il
        // livello 1: l'originale continua a tic 46, mirror simmetrico dei
        // tic 24..45 che smonta la gru senza alcun effetto di gioco).
        // `casa5ss` nasce dalla traccia "f" (impa5f/Alarm_5.gml) allo stesso
        // istante in cui "r" entra nel suo passo finale (tic23, il topper +
        // 1200 tic di pausa) — stessa scelta gia' fatta per il livello 1.
        // Le 22 sprite intermedie (tic1..22) ripetono lo stesso schema a
        // dado di tic0 (una coppia/quaterna equiprobabile per gradino), letto
        // riga per riga: **[C]** i 5 "grubig" al tic4 sono uno sprite piu'
        // grande di "gru1" (usato dal livello 1), stessi 5 offset esatti.
        steps: [
          { spr: ["sr11", "sr12", "sr13", "sr14"], dur: 30 },
          { spr: "sr15", dur: 40 }, { spr: "sr16", dur: 40 },
          { spr: ["sr21", "sr22", "sr23", "sr24"], dur: 40 },
          { spr: "sr25", dur: 40, spawn: [
            { spr: "grubig", dx: 80, dy: 50 }, { spr: "grubig", dx: 80, dy: -50 },
            { spr: "grubig", dx: -12, dy: -112 }, { spr: "grubig", dx: -80, dy: 50 },
            { spr: "grubig", dx: -172, dy: -114 },
          ] },
          { spr: "sr26", dur: 40 },
          { spr: ["sr31", "sr32", "sr33", "sr34"], dur: 40 },
          { spr: "sr35", dur: 40 }, { spr: "sr36", dur: 40 },
          { spr: ["sr41", "sr42", "sr43", "sr44"], dur: 40 },
          { spr: "sr45", dur: 40 }, { spr: "sr46", dur: 40 },
          { spr: ["sr51", "sr52"], dur: 40 },
          { spr: "sr53", dur: 40 }, { spr: "sr54", dur: 40 },
          { spr: ["sr61", "sr62"], dur: 40 },
          { spr: "sr63", dur: 40 }, { spr: "sr64", dur: 40 },
          { spr: ["sr71", "sr72"], dur: 40 },
          { spr: "sr73", dur: 40 }, { spr: "sr74", dur: 40 },
          { spr: ["sr81", "sr82"], dur: 40 },
          { spr: "sr83", dur: 40 },
          { spr: "sr84", dur: 1200, spawn: [{ spr: "tops5s", dx: 0, dy: -340, depthOffset: -344 }] },
        ],
      },
    ],
    // [C] casa4s/Alarm_2.gml: primo intervallo 2000, poi dado uniforme fra
    // 4 valori — stesso schema di villa/casa, +37 pop per stadio (0..5).
    // Il secondo elemento (livello 2, casa5ss/Alarm_2.gml) ha lo stesso
    // schema, +72 pop per stadio, un solo intervallo diverso (24000 invece
    // di 15846 — letto cosi' com'e', non "raddrizzato").
    growth: [
      { firstInterval: 2000, intervals: [9000, 13231, 15846, 9912], popPerStage: 37, maxAva: 5 },
      { firstInterval: 2000, intervals: [15000, 23000, 24000, 24500], popPerStage: 72, maxAva: 5 },
    ],
    // [C] casa4s/Alarm_3.gml, ogni 120 tic, per stadio ava 0..5. Il secondo
    // elemento e' casa5ss/Alarm_3.gml, stesso schema, numeri piu' alti.
    consumption: [
      [
        { day: 6, night: 15 }, { day: 11, night: 24 }, { day: 17, night: 31 },
        { day: 23, night: 42 }, { day: 33, night: 50 }, { day: 38, night: 55 },
      ],
      [
        { day: 13, night: 29 }, { day: 20, night: 47 }, { day: 35, night: 60 },
        { day: 44, night: 81 }, { day: 65, night: 99 }, { day: 77, night: 109 },
      ],
    ],
    // [C] casa4s/Alarm_5.gml (livello 1) + casa5ss/Alarm_5.gml (livello 2,
    // dado 1/76 invece di 1/108) — entrambi creano anche "thunder" (`dy` non
    // letto, stesso default [I] di eolico sopra, game/src/lightning.js).
    storm: [{ dice: 108, loss: 50 }, { dice: 76, loss: 50 }],
  },

  // Stessa entry di `palazzo` sopra, asse "rd" (dir2/dir4) — **[C]**
  // impa4rd/impa4fd sono, verificato con diff, identici a impa4r/impa4f a
  // parte i nomi sprite (sr*->rd*, sf*->fd*); `casa4d/Create.gml` e'
  // identico a `casa4s` a parte le 10 varianti "pari" (suffisso 2/4) e il
  // rudere (`ruin4d`, sprite "ru41d" invece di "ru41"). Mai selezionabile
  // dal menu (non in OTHER_BUILDINGS): main.js, resolvePlacement() la
  // materializza solo quando il trascinamento cade su dir2/dir4.
  palazzoRd: {
    label: "Building",
    placeCost: { mon: 6000 },
    diagonalPlacement: true,
    construct: {
      drain: { mon: 3, every: 20 },
      life: 400, deathPop: -160,
      wewe: 100,                                      // [C] casa4d/Create.gml: wewe += 100 — peso su `match`, state.js
      ruspaCost: 20000, ruspaFirstStepDur: 30,          // [C] casa4d/Mouse_LeftPressed.gml, ramo selec==11 — impa4rd_demo/Create.gml arma 30 tick, non 390 come impa4rd
      grantPop: 37,
      ruin: ["ru41d"],
      variants: [
        { spr: "c412d", decor: "c412dl" }, { spr: "c414d", decor: "c414ds" },
        { spr: "c422", decor: "c422l" }, { spr: "c424", decor: "c424l" },
        { spr: "c432", decor: "c432l" }, { spr: "c434", decor: "c434l" },
        { spr: "c442", decor: "c442l" }, { spr: "c444", decor: "c444l" },
        { spr: "c452", decor: "c452l" }, { spr: "c454", decor: "c454l" },
      ],
      steps: [
        { spr: ["rd11", "rd12", "rd13", "rd14"], dur: 390 },
        { spr: "rd15", dur: 40 }, { spr: "rd16", dur: 40 },
        { spr: ["rd21", "rd22", "rd23", "rd24"], dur: 40 },
        { spr: "rd25", dur: 40, spawn: [
          { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
          { spr: "gru1", dx: -12, dy: -112 }, { spr: "gru1", dx: -80, dy: 50 },
          { spr: "gru1", dx: -172, dy: -114 },
        ] },
        { spr: "rd26", dur: 40 },
        { spr: ["rd31", "rd32", "rd33", "rd34"], dur: 40 },
        { spr: "rd35", dur: 40 }, { spr: "rd36", dur: 40 },
        { spr: ["rd41", "rd42", "rd43", "rd44"], dur: 40 },
        { spr: "rd45", dur: 40 },
        // [Bug corretto] **[C]** tops4d/_object.json: sprite "topld", non
        // "topls" — scoperto implementando il topper del livello 2
        // (tops5d, stesso sprite "topld") e controllando anche l'oggetto
        // del livello 1 per coerenza: erano gia' diversi nel decompilato
        // (topls per l'asse "s"/dir1-3, topld per "d"/dir2-4), il commento
        // dell'atlas che li diceva "uguali per entrambi gli assi" era letto
        // male. Puramente cosmetico (topper mai controllato da vicino sui
        // due assi fianco a fianco), corretto qui.
        { spr: "rd46", dur: 700, spawn: [{ spr: "topld", dx: 0, dy: -170, depthOffset: -172 }] },
      ],
    },
    // **Secondo livello** — stessa entry di palazzo sopra, asse "rd": [C]
    // casa4d/Alarm_2.gml ha lo stesso gate (ava==5 + chies.level>=3) e crea
    // upsign45d -> impa5rd invece di upsign45s -> impa5r.
    upgrades: [
      {
        atAva: 5, requiresChiesLevel: 3, cost: { mon: 20000 },
        drain: { mon: 3, every: 20 },
        life: 700, deathPop: -320,               // [C] casa5dd/Create.gml + Destroy.gml
        wewe: 100,
        ruspaCost: 50000, ruspaFirstStepDur: 30,
        grantPop: 187,
        ruin: ["ru41d"],                          // [C] casa5dd/Step.gml: create_object(ruin4d)
        // [C] casa5dd/Create.gml: 10 varianti "dispari" (suffisso 1/3) —
        // invertito rispetto al livello 1, dove l'asse "d" usa le pari:
        // letto cosi' com'e', non "raddrizzato".
        variants: [
          { spr: "c511", decor: "c511l" }, { spr: "c513", decor: "c513l" },
          { spr: "c521", decor: "c521l" }, { spr: "c523", decor: "c523l" },
          { spr: "c531", decor: "c531l" }, { spr: "c533", decor: "c533l" },
          { spr: "c541", decor: "c541l" }, { spr: "c543", decor: "c543l" },
          { spr: "c551", decor: "c551l" }, { spr: "c553", decor: "c553l" },
        ],
        // [C] impa5rd/Create.gml + Alarm_0.gml, tic 0..23 — stessa
        // troncatura del livello 1/dell'asse "r" sopra. **[I]** dal tic11 in
        // poi il decompilato smette di usare il prefisso "rd"/"fd" (gia'
        // esaurito a "rd46" del livello 1) e passa a "dr"/"df" — un'
        // incoerenza di nomi propria del decompilato (non un refuso di
        // lettura, verificato riga per riga sia su impa5rd che su impa5fd):
        // `frontSprFor()` sotto riconosce ora anche questo prefisso.
        // I 5 "grubig" del tic4 hanno offset SPECULARI rispetto all'asse
        // "r" (coerente con l'asse diagonale opposto).
        steps: [
          { spr: ["rd11", "rd12", "rd13", "rd14"], dur: 30 },
          { spr: "rd15", dur: 40 }, { spr: "rd16", dur: 40 },
          { spr: ["rd21", "rd22", "rd23", "rd24"], dur: 40 },
          { spr: "rd25", dur: 40, spawn: [
            { spr: "grubig", dx: 80, dy: 50 }, { spr: "grubig", dx: -80, dy: -50 },
            { spr: "grubig", dx: -80, dy: 50 }, { spr: "grubig", dx: 12, dy: -112 },
            { spr: "grubig", dx: 172, dy: -114 },
          ] },
          { spr: "rd26", dur: 40 },
          { spr: ["rd31", "rd32", "rd33", "rd34"], dur: 40 },
          { spr: "rd35", dur: 40 }, { spr: "rd36", dur: 40 },
          { spr: ["rd41", "rd42", "rd43", "rd44"], dur: 40 },
          { spr: "rd45", dur: 40 }, { spr: "rd46", dur: 40 },
          { spr: ["dr51", "dr52"], dur: 40 },
          { spr: "dr53", dur: 40 }, { spr: "dr54", dur: 40 },
          { spr: ["dr61", "dr62"], dur: 40 },
          { spr: "dr63", dur: 40 }, { spr: "dr64", dur: 40 },
          { spr: ["dr71", "dr72"], dur: 40 },
          { spr: "dr73", dur: 40 }, { spr: "dr74", dur: 40 },
          { spr: ["dr81", "dr82"], dur: 40 },
          { spr: "dr83", dur: 40 },
          { spr: "dr84", dur: 1200, spawn: [{ spr: "tops5d", dx: 0, dy: -340, depthOffset: -344 }] },
        ],
      },
    ],
    // [C] casa4d/Alarm_2.gml (livello 1, unico ramo diverso da casa4s:
    // 14464 invece di 15846) + casa5dd/Alarm_2.gml (livello 2, tre
    // intervalli diversi da casa5ss: 21000/23000 invece di 23000/24000).
    growth: [
      { firstInterval: 2000, intervals: [9000, 13231, 14464, 9912], popPerStage: 37, maxAva: 5 },
      { firstInterval: 2000, intervals: [15000, 21000, 23000, 24500], popPerStage: 72, maxAva: 5 },
    ],
    consumption: [
      [
        { day: 6, night: 15 }, { day: 11, night: 24 }, { day: 17, night: 31 },
        { day: 23, night: 42 }, { day: 33, night: 50 }, { day: 38, night: 55 },
      ],
      [
        { day: 13, night: 29 }, { day: 20, night: 47 }, { day: 35, night: 60 },
        { day: 44, night: 81 }, { day: 65, night: 99 }, { day: 77, night: 109 },
      ],
    ],
    storm: [{ dice: 108, loss: 50 }, { dice: 76, loss: 50 }],
  },

  // `museo` (`pumediat`/`selec==70`) — **[C]** unico livello, nessuna
  // crescita: `media1s/Create.gml` arma `action_set_alarm(2000,2)` ma
  // **non esiste `media1s/Alarm_2.gml`** nella directory decompilata (alarm
  // armato senza handler, stesso genere di codice morto gia' documentato
  // altrove nel file) — `ava` resta 0 per sempre, nessun secondo edificio
  // "livello 2" (`med2`/`med2d` sono solo la seconda meta' di un dado 50/50
  // sulla variante finale, non un livello — verificato: nessun oggetto
  // decompilato "media2*" esiste). Da' `hap` diretta invece di `pop` (unico
  // fra tutti i tipi con `construct.hap` a non avere ne' `grantPop` ne'
  // crescita — coerente con "un museo aumenta la felicita', non la
  // popolazione"). **[C]** media1s/Alarm_3.gml consuma anche mon ogni 120
  // tic, oltre a ele — mai visto in nessun altro edificio con
  // `consumption`: vedi `rate.mon` in stepConsumption() sopra.
  museo: {
    label: "Museum",
    placeCost: { mon: 35000 },   // [C] placeholder/Mouse_LeftPressed.gml, ramo selec==70
    diagonalPlacement: true,
    construct: {                 // media1s (asse "r", dir1/dir3) — [C] impamediaR/impamediaF: stessa sequenza sr*/sf* di palazzo, solo il drain cambia
      drain: { mon: 5, every: 20 },                 // [C] impamediaR/Alarm_10.gml
      life: 350,                                      // [C] media1s/Create.gml
      wewe: 150,                                       // [C] media1s/Create.gml: wewe += 150 — peso su `match`, state.js
      // [C] media1s/Mouse_LeftPressed.gml, ramo selec==11: 20000 mon.
      // `IMPAMEDIA_R_DEMO/Create.gml` arma il primo alarm a 30 tick, non
      // 390 come `impamediaR`.
      ruspaCost: 20000, ruspaFirstStepDur: 30,
      hap: { create: 1200, destroy: -1220 },          // [C] media1s/Create.gml + Destroy.gml
      ruin: ["ru41"],                                 // [C] media1s/Step.gml: create_object(ruin4s) — stesso rudere di palazzo
      variants: [                                     // [C] media1s/Create.gml: dado 50/50, non un dado a piu' vie
        { spr: "med1", decor: "med1l" },
        // [C] MEDIALITE2/Step.gml non anima nessuna transizione: lo sprite
        // acceso e' "med2x" (non esiste "med2l" nel decompilato — asimmetria
        // reale, non un refuso di trascrizione).
        { spr: "med2", decor: "med2x" },
      ],
      steps: [
        { spr: ["sr11", "sr12", "sr13", "sr14"], dur: 390 },
        { spr: "sr15", dur: 40 }, { spr: "sr16", dur: 40 },
        { spr: ["sr21", "sr22", "sr23", "sr24"], dur: 40 },
        { spr: "sr25", dur: 40, spawn: [
          { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
          { spr: "gru1", dx: -12, dy: -112 }, { spr: "gru1", dx: -80, dy: 50 },
          { spr: "gru1", dx: -172, dy: -114 },
        ] },
        { spr: "sr26", dur: 40 },
        { spr: ["sr31", "sr32", "sr33", "sr34"], dur: 40 },
        { spr: "sr35", dur: 40 }, { spr: "sr36", dur: 40 },
        { spr: ["sr41", "sr42", "sr43", "sr44"], dur: 40 },
        { spr: "sr45", dur: 40 },
        { spr: "sr46", dur: 700, spawn: [{ spr: "topls", dx: 0, dy: -170, depthOffset: -172 }] },
      ],
    },
    // [C] media1s/Alarm_3.gml: ogni 120 tic, SEMPRE lo stesso valore (`ava`
    // non cresce mai — un solo elemento invece delle 6 voci per-stadio di
    // casa/villa/palazzo, stepConsumption() sopra lo rilegge comunque ad
    // ogni ciclo con `Math.min(0, cons.length-1)` = indice 0). `mon:60` e'
    // il canale extra (sopra).
    consumption: [[{ day: 60, night: 150, mon: 60 }]],
    storm: [{ dice: 108, loss: 50 }],   // [C] media1s/Alarm_5.gml, stessi numeri di palazzo
  },

  // Stessa entry di `museo` sopra, asse "rd" — **[C]** media1d e' identico
  // a media1s in OGNI file (Create/Alarm_0/1/3/5/9/Destroy/Step, verificato
  // riga per riga): nessuna asimmetria numerica come invece esiste fra
  // palazzo/palazzoRd. Solo gli sprite (cantiere rd*/fd*, varianti
  // med1d/med2d) e il costo di trascinamento (dir2/dir4) cambiano.
  museoRd: {
    label: "Museum",
    placeCost: { mon: 35000 },
    diagonalPlacement: true,
    construct: {
      drain: { mon: 5, every: 20 },
      life: 350,
      wewe: 150,                                       // [C] media1d/Create.gml: wewe += 150 — peso su `match`, state.js
      ruspaCost: 20000, ruspaFirstStepDur: 30,          // [C] media1d/Mouse_LeftPressed.gml, ramo selec==11 — IMPAMEDIA_RD_DEMO/Create.gml arma 30 tick, non 390 come impamediaRD
      hap: { create: 1200, destroy: -1220 },
      ruin: ["ru41"],
      variants: [
        { spr: "med1d", decor: "med1dl" },
        { spr: "med2d", decor: "med2dx" },   // [C] MEDIALITE2D: stessa asimmetria di MEDIALITE2, "med2dl" non esiste
      ],
      steps: [
        { spr: ["rd11", "rd12", "rd13", "rd14"], dur: 390 },
        { spr: "rd15", dur: 40 }, { spr: "rd16", dur: 40 },
        { spr: ["rd21", "rd22", "rd23", "rd24"], dur: 40 },
        { spr: "rd25", dur: 40, spawn: [
          { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
          { spr: "gru1", dx: -12, dy: -112 }, { spr: "gru1", dx: -80, dy: 50 },
          { spr: "gru1", dx: -172, dy: -114 },
        ] },
        { spr: "rd26", dur: 40 },
        { spr: ["rd31", "rd32", "rd33", "rd34"], dur: 40 },
        { spr: "rd35", dur: 40 }, { spr: "rd36", dur: 40 },
        { spr: ["rd41", "rd42", "rd43", "rd44"], dur: 40 },
        { spr: "rd45", dur: 40 },
        { spr: "rd46", dur: 700, spawn: [{ spr: "topls", dx: 0, dy: -170, depthOffset: -172 }] },
      ],
    },
    consumption: [[{ day: 60, night: 150, mon: 60 }]],
    storm: [{ dice: 108, loss: 50 }],
  },

  // Quattordicesimo edificio: `monum` ("Monumento", src/objects/monum,
  // sprite `monu_img`) — il primo dei tre "edifici stella", una ricompensa
  // di traguardo mai piazzabile dal menu normale (STUDIO.md sotto per il
  // meccanismo di sblocco completo). **[C]** monum/Create.gml + Destroy.gml
  // + Alarm_0.gml + Step.gml, letti riga per riga: nessuna produzione,
  // nessuna crescita — solo vita, un drenaggio perenne di mon, e felicita'
  // simmetrica alla nascita/morte (l'unico altro tipo cosi' e' `eolico`).
  // **[C]** placeholder/Mouse_LeftReleased.gml, ramo selec==71: scala 20000
  // mon SENZA controllare prima `mon>=20000` (a differenza di OGNI altro
  // ramo di quel file) — puo' davvero portare `mon` sotto zero. `def.
  // noAffordCheck` (main.js, placeAt()) riproduce esattamente questa
  // asimmetria invece di "correggerla" silenziosamente.
  // **[C]** Cantiere (`impaMONUr`/`impaMONUf`): la stessa identica sequenza
  // "ir1x"/"if1x" gia' condivisa da casa/industria/missile/solare (nessuno
  // sprite di cantiere nuovo) — l'edificio nasce al tic10 di `impaMONUf`,
  // 700 tic dopo l'inizio di quel passo (`Alarm_5`), stessa "coda
  // cosmetica" gia' tagliata per palazzo/museo (`steps` sotto si ferma li',
  // dur dell'ultimo passo troncata a 700 non 800). Le 4 "gru" al passo 3
  // (offset ±80,±50, un quadrato pulito — diverso dai 5 punti irregolari di
  // palazzo) e il topper finale (`tops3`, sprite reale gia' "toppers": lo
  // stesso oggetto di villa/club/missile/laser, nessuno sprite in piu').
  monum: {
    label: "Monument",
    placeCost: { mon: 20000 },   // [C] placeholder/Mouse_LeftReleased.gml, ramo selec==71
    noAffordCheck: true,
    construct: {
      drain: { mon: 3, every: 20 },              // [C] impaMONUr/Alarm_10.gml
      finalSprite: "monu_img", life: 1000,         // [C] monum/Create.gml
      hap: { create: 1000, destroy: -1000 },       // [C] monum/Create.gml + Destroy.gml
      ruin: ["monu_ruin"],                          // [C] monum/Step.gml: create_object(ruinmonument), nessun dado
      decor: ["monu_l"],                            // [C] monum/Create.gml: create_object(monum_light)
      steps: [
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir22", dur: 40, spawn: [
          { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
          { spr: "gru1", dx: -80, dy: -50 }, { spr: "gru1", dx: -80, dy: 50 },
        ] },
        { spr: "ir21", dur: 40 },
        { spr: ["ir33", "ir34", "ir35", "ir36"], dur: 40 },
        { spr: "ir32", dur: 40 }, { spr: "ir31", dur: 40 },
        { spr: ["ir43", "ir44", "ir45", "ir46"], dur: 40 },
        { spr: "ir42", dur: 40 },
        { spr: "ir41", dur: 700, spawn: [{ spr: "toppers", dx: 0, dy: -170, depthOffset: -172 }] },
      ],
    },
    // [C] monum: nessun Alarm_5/storm armato in Create.gml (a differenza di
    // banca sotto) — solo le bombe (generiche, stepBombs() in threats.js)
    // possono danneggiarlo.
  },

  // Quindicesimo edificio: `banca` ("Banca", src/objects/banca1, sprite
  // `banca_img`) — il secondo "edificio stella". **[C]**
  // placeholder/Mouse_LeftReleased.gml, ramo selec==72: nessuna riga
  // `r12.mon = ...` — davvero gratis, non solo senza controllo di
  // affordability come il monumento. `placeCost: {}` (nessuna chiave) basta
  // da solo: `canAfford()`/il ciclo di scalo su un oggetto vuoto sono gia'
  // no-op, `costTagSprite()` sopra lo riconosce e mostra `cfree`.
  // Stesso cantiere `ir1x`/`if1x` di monum (verificato: anche banca spawna
  // le stesse 4 "gru" al passo 3 e lo stesso "toppers" al passo finale —
  // **[I]** una fonte secondaria online per questo gioco descrive il
  // cantiere della banca come "senza gru": non e' quello che il decompilato
  // mostra, letto due volte riga per riga).
  // **[C]** banca1/Create.gml + Alarm_3|5.gml, letti riga per riga: vita
  // 1300, consumo elettrico FISSO (non per stadio: banca non cresce mai,
  // nessun Alarm_2/crescita armato) -18 ele di giorno/-27 di notte ogni 120
  // tic, danno da fulmine (dado 1/160 ogni 57 tic, -50 vita — PIU' raro del
  // resto del motore, dove 1/108 e' la norma). **[I]** `Alarm_0`
  // (armato-ma-mai-innescato: nessun `action_set_alarm(_,0)` in Create.gml)
  // contiene un intero albero di ricolorazione/cambio sprite a dado
  // ricopiato da `casa1/Alarm_0` — stesso codice morto gia' scartato per
  // casa4s/casa4d/casa5ss/casa5dd, non portato qui per lo stesso motivo.
  // Il pulsante prestiti (`bankbuttoner`, oggetto `repre`/calendario mesi,
  // 4 prestiti a interesse) e' un intero sotto-sistema economico a parte —
  // **[I] gap dichiarato**, fuori scopo per questo giro (STUDIO.md sotto).
  banca: {
    label: "Bank",
    placeCost: {},
    construct: {
      drain: { mon: 3, every: 20 },               // [C] impaBANKr/Alarm_10.gml
      finalSprite: "banca_img", life: 1300,         // [C] banca1/Create.gml
      wewe: 70,                                       // [C] banca1/Create.gml: wewe += 70 — peso su `match`, state.js
      ruin: ["ru31", "ru32", "ru33", "ru34"],       // [C] ruin3/Create.gml: dado uniforme fra 4, stesso oggetto di industria3/casa3/lasergun
      // [Bug corretto, segnalato dall'autore: "la banca non ha illuminazione
      // ma dovrebbe averla"] **[C]** `banca1_light/Create.gml` nasce con
      // sprite "empty" (invisibile) e NESSUN `action_set_alarm` che armi il
      // proprio `Alarm_0` (quello che punterebbe a "banca_l", un frame
      // singolo, `data/sprites.json`: 1 sottoimmagine) — quell'alarm non
      // scatta mai, codice morto. Il vero interruttore e' `Step.gml`: notte
      // + `r12.ele>=0` -> `action_sprite_set(banca_lx, 19, -1)` (20
      // sottoimmagini vere, un frame per l'accensione scrubbing all'indietro
      // — stesso principio del bagliore delle altre finestre, qui con una
      // sagoma dedicata invece del solito quadratino "*l"). "banca_l" era
      // quindi lo sprite SBAGLIATO: mai mostrato nel decompilato, la banca
      // restava percio' sempre buia qui. `_selfLit` gia' gestisce la
      // dissolvenza in alpha (stepLights(), main.js) sullo stesso frame 0 di
      // "banca_lx", coerente con ogni altra luce del motore.
      decor: ["banca_lx"],
      steps: [
        { spr: ["ir13", "ir14", "ir15", "ir16"], dur: 390 },
        { spr: "ir12", dur: 40 }, { spr: "ir11", dur: 40 },
        { spr: ["ir23", "ir24", "ir25", "ir26"], dur: 40 },
        { spr: "ir22", dur: 40, spawn: [
          { spr: "gru1", dx: 80, dy: 50 }, { spr: "gru1", dx: 80, dy: -50 },
          { spr: "gru1", dx: -80, dy: -50 }, { spr: "gru1", dx: -80, dy: 50 },
        ] },
        { spr: "ir21", dur: 40 },
        { spr: ["ir33", "ir34", "ir35", "ir36"], dur: 40 },
        { spr: "ir32", dur: 40 }, { spr: "ir31", dur: 40 },
        { spr: ["ir43", "ir44", "ir45", "ir46"], dur: 40 },
        { spr: "ir42", dur: 40 },
        { spr: "ir41", dur: 700, spawn: [{ spr: "toppers", dx: 0, dy: -170, depthOffset: -172 }] },
      ],
    },
    consumption: [[{ day: 18, night: 27 }]],   // [C] banca1/Alarm_3.gml, ogni 120 tic — costante, nessun `ava` (banca non cresce)
    storm: [{ dice: 160, loss: 50 }],           // [C] banca1/Alarm_5.gml
  },

  // Sedicesimo edificio, il terzo "a stella": `m3cant` ("Grattacielo").
  // **Correzione di un errore**: la nota precedente su STUDIO.md (§9,
  // "monumento e banca") liquidava `stella3`/`selec==82` come "un secondo
  // modo di sbloccare eolico, zero lavoro" — letta la sola RIGA che le due
  // ramificazioni condividono in `eoliplacer/Alarm_1.gml` (la creazione di
  // `eoliplacer` da `placeholder/Mouse_LeftReleased.gml`, identica per
  // selec==4 e selec==82) senza scendere fino in fondo a quella funzione.
  // **[C]** In realta' `eoliplacer/Alarm_1.gml` ha due rami INDIPENDENTI
  // dopo quel punto comune: selec==4 (costo 50000, crea `impavent`, gia'
  // letto — `BUILDING_TYPES.eolico` sopra) e selec==82 (costo 200000, crea
  // `m3cant`, un oggetto MAI letto prima d'ora). Stesso meccanismo di
  // piazzamento (il placeholder toccato + 3 vicini liberi entro un raggio,
  // `multiTile` sotto), edificio finale completamente diverso: non una pala
  // eolica, una torre — **[C]** `m3x1`..`m3x14` (data/sprites.json) sono
  // 588px di larghezza per un'altezza che cresce da 1085 a 1527px, contro
  // l'810x865 quasi quadrato di `eol`. Il nome scelto qui ("Grattacielo")
  // non e' mai scritto nel decompilato (nessun `draw_text`/`show_message`
  // in `m3cant`/`stella3`): stessa scelta gia' fatta per "Monumento"/
  // "Banca", un'etichetta leggibile invece del nome tecnico dell'oggetto.
  // **[C] Sblocco**: `banca1_light/Create.gml` (il decoro-luce che
  // `BUILDING_TYPES.banca.construct.decor` gia' crea a fine cantiere)
  // chiama `instance_create(pu1.x, pu1.y, stella3)` dietro due flag
  // "run once" (`action_if_number(159/161,...)`, stesso idioma di
  // `distrutti`/monumento) — la terza stella si sblocca alla PRIMA banca
  // costruita, non a una soglia separata: `unlocked()` in main.js legge
  // `buildings.some(b => b.type === "banca")`.
  // **[C] Piazzamento** (`eoliplacer/Alarm_1.gml`, ramo selec==82): costo
  // 200000 mon, stesso `places>=4` di eolico — `multiTile` sotto riusa
  // esattamente `count`/`radius` di `BUILDING_TYPES.eolico` (stessa maschera
  // fissa "phold" di `eoliplacer`, STUDIO.md, indipendente dal tipo che
  // finira' per nascere).
  // **[C] Crescita** (`m3cant/Create.gml` + `Alarm_0.gml`, letti riga per
  // riga): a differenza di OGNI altro edificio, non c'e' una fondamenta
  // generica "ir1x" che poi si smaterializza in un `finalSprite` diverso —
  // e' lo stesso oggetto che cambia `sprite_index` 14 volte (`m3x1` per i
  // primi 440 tick, poi `m3x2`..`m3x14` ogni 540-640 tick), e l'ultimo
  // sprite mostrato E' gia' l'edificio finito (`finalSprite` sotto coincide
  // col l'ultimo passo, non e' un errore di battitura). Cantiere totale
  // 7560 tick (~126s) — il piu' lungo del motore, coerente con 200000 mon.
  // **Impalcatura/gru ora ricostruite (game/src/scaffold.js)**: l'originale
  // affianca a `m3cant` un secondo oggetto (`impa31f`, creato dal suo
  // stesso `Create.gml`) che a sua volta genera `impa31r` e un'intera
  // catena `impa31/32/33r|f` + tre gru rotanti dedicate (`impa3gru`/
  // `impa3gru1`/`impa3gru2`, ognuna con la propria macchina a stati a
  // oscillazione) — un intero sotto-sistema di scenografia SENZA alcun
  // effetto su costo/tempo del cantiere (letti entrambi direttamente da
  // `m3cant`, mai da questi oggetti): `stepGrattacieloScaffold()` lo avanza
  // in parallelo a stepConstructions() (main.js), letto e verificato punto
  // per punto (timing/offset/sprite) nel file dedicato.
  // **[C] Consumo** (`m3cant/Step.gml`, letto con gli operatori confermati
  // altrove in questo progetto — 4=">=", non "!="` come una prima lettura
  // aveva capito): PRIMA di finire (`phase<14`) il cantiere non consuma
  // niente di suo — l'unico drenaggio e' un "acceleratore" opzionale
  // (-5 mon/-5 ele PER TICK, legato a `playbuttoner`, un bottone
  // play/pausa mai ricostruito qui, stesso gap dichiarato del sistema
  // prestiti di banca) che il giocatore puo' attivare per pagare la
  // costruzione piu' in fretta — non implementato, il cantiere avanza
  // sempre alla velocita' base. UNA VOLTA FINITO (`phase>=14`) consuma
  // invece elettricita' OGNI TICK, non ogni 120 come ogni altro edificio:
  // -1 ele/tick di giorno, -2/tick di notte — `consumption` sotto riusa il
  // periodo fisso di 120 tick gia' cablato in `stepConsumption()`
  // moltiplicando per 120 (120/240), stesso risultato aggregato senza
  // toccare il motore per un singolo edificio.
  // **[C]** Lo stesso blocco azzera anche `r12.spy` (il flag che sblocca le
  // mongolfiere spia dopo ~8 minuti, game/src/balloons.js) ogni tick a
  // costruzione ultimata — "il grattacielo blocca lo spionaggio" per
  // davvero, non piu' un gap dichiarato: la condizione e' incondizionata e
  // gira ogni tick (non un confronto sensibile all'ordine fra oggetti),
  // quindi l'esito in regime non dipende da chi gira prima — vedi
  // stepConsumption() sotto per l'implementazione.
  // **[C] Nessuna vita**: a differenza di OGNI altro edificio, `m3cant` non
  // ha ne' un `Destroy.gml` ne' una variabile `life` in nessun evento —
  // indistruttibile per davvero, non solo "senza fulmine" come `parco`.
  // `life: 99999` sotto e' lo stesso trucco [I] gia' scelto per
  // `BUILDING_TYPES.parco` (nessun ramo `life<=0` da riprodurre, un numero
  // irraggiungibile tiene il motore generico invece di un caso speciale).
  // **[C] Finestre notturne**: a fine cantiere l'originale crea 10 oggetti
  // sovrapposti nello stesso punto (`m3lux1`..`m3lux9` + `m3lux_red`,
  // ognuno una sagoma PIENA della torre — 588x1527 come `m3x14` stesso, non
  // un dettaglio in un angolo), ognuno con la propria soglia di dissolvenza
  // (`image_alpha += 0.003..0.023` al tick, diverso per ognuno — un vero
  // "sfarfallio" di finestre che si accendono a velocita' diverse, non
  // un'unica luce). `fadeTicks` sotto (game/src/main.js, addDecor()/
  // stepLights() generalizzati per questo) converte ogni incremento nel
  // numero di tick equivalente (1/incremento). `m3rd` (il fanale rosso in
  // cima) non si dissolve mai nel decompilato — scatta di colpo — quindi
  // `fadeTicks: 0`.
  grattacielo: {
    label: "Skyscraper",
    placeCost: { mon: 200000 },   // [C] eoliplacer/Alarm_1.gml, ramo selec==82
    // Stessa maschera fissa "phold" di eolico (STUDIO.md, `eoliplacer`
    // condiviso dai due rami selec==4/82): i 4 lotti di TERRENO consumati
    // sono lo stesso rombo isometrico adiacente al tocco che
    // `findWindCluster()` cerca per eolico (main.js — indipendente dal tipo
    // di edificio che nasce sopra, vedi il commento su `BUILDING_TYPES.
    // eolico`), solo l'ancora VISIVA cambia. **[C]** `eoliplacer/Alarm_1.gml`:
    // `m3cant` nasce a offset relativo (0, 116) da `eoliplacer` — che a sua
    // volta nasce a (98, 0) dal placeholder toccato — quindi l'ancora vera e'
    // `placeholder + (98, 116)`, non la media del cluster: la torre e' molto
    // piu' alta della pala (STUDIO.md sopra, "588x1527 contro 810x865"),
    // serve piu' margine verticale per non coprire il proprio stesso lotto.
    multiTile: { count: 4, anchorOffset: { dx: 98, dy: 116 } },
    construct: {
      finalSprite: "m3x14", life: 99999,   // [C] m3cant/Alarm_0.gml fase 13; [I] indistruttibile, vedi sopra
      decor: [
        { spr: "m3l1", fadeTicks: 50 }, { spr: "m3l2", fadeTicks: 100 },
        { spr: "m3l3", fadeTicks: 200 }, { spr: "m3l4", fadeTicks: 50 },
        { spr: "m3l5", fadeTicks: 100 }, { spr: "m3l6", fadeTicks: 67 },
        { spr: "m3l7", fadeTicks: 77 }, { spr: "m3l8", fadeTicks: 43 },
        { spr: "m3l9", fadeTicks: 333 }, { spr: "m3rd", fadeTicks: 0 },
      ],
      steps: [
        { spr: "m3x1", dur: 440 },
        { spr: "m3x2", dur: 540 }, { spr: "m3x3", dur: 540 }, { spr: "m3x4", dur: 540 },
        { spr: "m3x5", dur: 640 }, { spr: "m3x6", dur: 640 }, { spr: "m3x7", dur: 640 }, { spr: "m3x8", dur: 640 },
        { spr: "m3x9", dur: 540 }, { spr: "m3x10", dur: 540 }, { spr: "m3x11", dur: 540 }, { spr: "m3x12", dur: 540 },
        { spr: "m3x13", dur: 540 },
        { spr: "m3x14", dur: 240 },
      ],
    },
    // [C] m3cant/Step.gml, ramo `phase>=14`: -1 ele/tick di giorno, -2/tick
    // di notte, applicati OGNI tick (non ogni 120 come il resto del
    // motore) — moltiplicato per 120 cosi' stepConsumption() (periodo fisso
    // 120 tick) applica lo stesso totale aggregato.
    consumption: [[{ day: 120, night: 240 }]],
    // nessun `storm`: m3cant non arma nessun Alarm di fulmine (vedi sopra, "Nessuna vita").
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
 * non hanno una traccia "f" nel decompilato (chies: sprite ce.../ci...).
 * `sr*`/`rd*` (palazzo/museo, BUILDING_TYPES.palazzo/museo/palazzoRd/
 * museoRd) sono la stessa idea con un prefisso diverso — **[C]**
 * impa4r/impa4f: stessa sequenza a tic, sprite "sr*"/"sf*" (diff riga per
 * riga: solo il prefisso cambia); impa4rd/impa4fd: "rd*"/"fd*" per l'asse
 * opposto (dir2/dir4). Il secondo livello di palazzoRd (impa5rd/impa5fd,
 * BUILDING_TYPES.palazzoRd.upgrades[0]) esaurisce "rd46" e continua con un
 * prefisso DIVERSO, "dr*"/"df*" — un'incoerenza propria del decompilato,
 * non un errore di lettura (STUDIO.md, commento sopra ai `steps` di
 * palazzoRd.upgrades[0]).
 */
function frontSprFor(spr) {
  if (spr.startsWith("ir")) return "if" + spr.slice(2);
  if (spr.startsWith("sr")) return "sf" + spr.slice(2);
  if (spr.startsWith("rd")) return "fd" + spr.slice(2);
  if (spr.startsWith("dr")) return "df" + spr.slice(2);
  return null;
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

/**
 * Come placeBuilding(), ma gia' finito al `level` dato invece che a livello
 * 1 (o 0, in cantiere) — per gli edifici PRE-ESISTENTI di una room (main.js,
 * game/src/tutorial.js: casa2/casa3/industria1/industria2/parco/gatlinggun/
 * rocket_launcher nella scena "tutorial", mai nati da un cantiere del
 * giocatore). Applica applyLevelFinish() un salto di livello per volta, dal
 * cantiere ex novo (`def.construct`, livello 0->1) fino al livello
 * richiesto (`def.upgrades[L-1]` per ogni salto successivo) — lo stesso
 * percorso che l'edificio avrebbe fatto se costruito per davvero, cosi'
 * hap/wewe/pop (r12) restano coerenti con quanto un edificio arrivato li'
 * avrebbe gia' accumulato, invece di comparire "gratis" senza quegli
 * effetti economici. `onDecor` no-op qui: il decoro si applica DOPO, da chi
 * chiama, leggendo `currentDecor(b)` sullo stato finale (stesso schema di
 * `seedChies()`, main.js) — non serve durante i salti intermedi.
 */
export function placeFinishedBuilding(type, x, y, depth, level, r12) {
  const def = BUILDING_TYPES[type];
  const b = placeBuilding(type, x, y, depth);
  for (let l = 0; l < level; l++) {
    const up = l === 0 ? def.construct : def.upgrades[l - 1];
    applyLevelFinish(b, def, up, { upgradeIndex: l === 0 ? -1 : l - 1 }, r12, () => {});
  }
  b.construction = null;
  return b;
}

// [TEST] Richiesto dall'autore mentre si testano le meccaniche economiche
// appena collegate (wewe/oil, costi della ruspa): con questo flag a `true`
// nessun costo blocca piu' niente — NON e' comportamento dell'originale, va
// tolto (o riportato a `false`) prima di considerare il bilanciamento
// "vero". La spesa VERA continua comunque (`pay()`/`r12[k] -= cost[k]`
// restano invariati, chiamati normalmente da chi supera questo controllo):
// solo il blocco sparisce. game/src/state.js (clampR12()) tiene traccia a
// parte di quanto mon/oil sarebbero DAVVERO in `r12.monReal`/`r12.oilReal`
// (mostrati nell'HUD di debug da main.js) prima di rialzare la soglia
// effettivamente usabile.
export let DEBUG_INFINITE_RESOURCES = true;

export function canAfford(r12, cost) {
  if (DEBUG_INFINITE_RESOURCES) return true;
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

// [Bug corretto, richiesto dall'autore: "in match non riesco a demolire le
// rovine"] Il rudere che un edificio lascia (ruinSpriteFor() sopra) NON e'
// un decoro muto nel decompilato — **[C]** `src/objects/ruin1|2|3/
// Mouse_LeftPressed.gml` (lo stesso oggetto che questo motore gia'
// istanzia in scena come rudere, mai controllato finora: una lettura
// precedente di "I ruderi", STUDIO.md, concludeva "nessun rudere ha un
// ramo Mouse_LeftPressed" guardando solo `casaX/Step.gml` — chi crea il
// rudere — senza controllare l'oggetto ruin1/2/3 stesso): sotto ruspa
// (`r12.selec===11`) un tap sul rudere risponde a pagamento — nel
// decompilato ricostruisce SUL POSTO (ruin1 500 mon -> `casa` ex novo,
// ruin2 2000 mon -> upgrade 1->2, ruin3 5000 mon -> upgrade 2->3), ma qui
// (main.js) lo stesso costo lascia invece un placeholder vuoto al posto
// del rudere — **[Decisione dell'autore: "la rovina ruspata deve creare
// sempre un placeholder vuoto, non un nuovo edificio"]**, non piu' fedele
// al decompilato su questo punto specifico. `ruinsol` (solare, un solo
// livello possibile) userebbe lo STESSO costo di ruin1 (500 mon) per
// coerenza con l'originale. `chies` resta fuori (non crea mai un rudere a
// parte, STUDIO.md: cambia sprite a se stessa e resta piazzata) — l'unico
// tipo la cui morte non passa mai di qui. Il "livello" del rudere e'
// `b.level` dell'edificio al momento della morte (1/2/3) — la stessa
// colonna "taglia" che ruinSpriteFor() sopra legge dallo stesso `b`;
// main.js lo salva sul rudere insieme allo sprite scelto, solo per
// calcolare questo costo (non piu' per scegliere cosa ricostruire).
export function ruinRebuildCost(level) {
  return level === 1 ? 500 : level === 2 ? 2000 : 5000;
}

/** Il potenziamento che l'edificio potrebbe iniziare ora, se lo tocchi (null se il tipo non ne ha). */
export function nextUpgrade(b) {
  const def = BUILDING_TYPES[b.type];
  return def.upgrades?.[b.level - 1] ?? null;
}

/**
 * Lo sprite della "linguetta" di prezzo che compare all'hover su un
 * bottone edificio (`upgradeIndex` null: `def.placeCost`) o su un segnale
 * di potenziamento (`upgradeIndex`: indice in `def.upgrades`) — `null` se
 * quel costo non ha una linguetta nota.
 *
 * **[C]** src/objects/pu1..pumediat/Mouse_MouseEnter|Leave.gml (bottoni) e
 * upsign12|23|45s|45d/Mouse_MouseEnter|Leave.gml (segnali): al passaggio
 * del mouse creano un'istanza `cc<valore>` (`STUDIO.md §5.4`, gia'
 * documentato ma mai ricostruito — a quel tempo `input.js` non aveva
 * ancora un vero hover) posizionata sopra il bottone/segnale, distrutta
 * al MouseLeave. Non e' testo disegnato a runtime: ogni `cc*` mostra uno
 * sprite PRE-RENDERIZZATO col numero gia' dentro (`c100`, `c500`, `c1000`,
 * `c2000`, `c3500`, `c5000`, `c6000`, `c7500`, `c10000`, `c20000`,
 * `c35000`, `c50000` — un taglio per ogni costo reale gia' in
 * `placeCost`/`upgrades[].cost` qui sopra, verificato uno per uno). `chies`
 * (`upcrc12`/`upcrc23`) e' l'unica eccezione: costa mon+oil insieme, niente
 * taglio `cXXXX` a valuta singola gli si addice — usa due sprite dedicati
 * gia' pronti nel decompilato, `c12aa`/`c23aa` (506x88, "banner" largo il
 * doppio dei tagli normali). `banca` e' l'unico edificio DAVVERO gratis
 * (`placeCost: {}`, nessuna riga di scalo in Mouse_LeftReleased.gml) — usa
 * il terzo cartellino dedicato del decompilato, `cfree` (stella2/
 * Mouse_MouseEnter.gml: `action_create_object(ccfree, 0, 0)`).
 */
export function costTagSprite(type, upgradeIndex) {
  if (type === "chies") return upgradeIndex === 0 ? "c12aa" : upgradeIndex === 1 ? "c23aa" : null;
  const def = BUILDING_TYPES[type];
  const cost = upgradeIndex == null ? def?.placeCost : def?.upgrades?.[upgradeIndex]?.cost;
  const keys = cost ? Object.keys(cost) : [];
  if (keys.length === 0) return upgradeIndex == null && def?.placeCost ? "cfree" : null;
  if (keys.length !== 1 || keys[0] !== "mon") return null;
  return `c${cost.mon}`;
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

// [C] casa4s|d/Alarm_2.gml: l'unico gate di potenziamento agganciato al
// livello di UN ALTRO edificio, mai visto per nessun'altra `casa` (industria/
// casa/villa/club/palazzo primo livello dipendono solo da se stessi o da
// r12.pop) — usato solo da palazzo/palazzoRd sotto (`upgrades[0].
// requiresChiesLevel`). Duplica `maxChiesLevel()` di balloons.js invece di
// condividerla: stessa scelta gia' fatta per `dice()` in ogni modulo che ne
// ha bisogno, un helper di 3 righe non vale un giro di import incrociati.
function maxChiesLevel(buildings) {
  let lvl = 0;
  for (const b of buildings) if (b.type === "chies") lvl = Math.max(lvl, b.level);
  return lvl;
}

export function upgradeUnlocked(b, r12, buildings) {
  const up = nextUpgrade(b);
  if (!up) return false;
  const p = upgradeProgress(b, up, r12);
  if (p.done < p.needed) return false;
  if (up.requiresChiesLevel != null && maxChiesLevel(buildings) < up.requiresChiesLevel) return false;
  return true;
}

/**
 * Tocco su un edificio: se un potenziamento e' sbloccato (soglia pop o cicli
 * di produzione) e i costi sono coperti, avvia il cantiere. Restituisce un
 * messaggio per la HUD — null se ha avviato il cantiere, altrimenti il
 * motivo per cui no.
 */
export function tryStartUpgrade(b, r12, buildings) {
  if (b.construction) return "construction already in progress";
  const up = nextUpgrade(b);
  if (!up) return "max level";
  const p = upgradeProgress(b, up, r12);
  if (p.done < p.needed) {
    if (p.kind === "makee") return `need ${p.needed} production cycles (now ${p.done})`;
    if (p.kind === "ava") return `need full growth (${p.done}/${p.needed})`;
    return `need population ${p.needed} (now ${p.done.toFixed(0)})`;
  }
  if (up.requiresChiesLevel != null && maxChiesLevel(buildings) < up.requiresChiesLevel) {
    return `requires the church at level ${up.requiresChiesLevel}`;
  }
  if (!canAfford(r12, up.cost)) {
    const need = Object.entries(up.cost).map(([k, v]) => `${v} ${k}`).join(", ");
    return `need ${need}`;
  }
  pay(r12, up.cost);
  b.construction = { upgradeIndex: b.level - 1, stepIndex: 0, t: 0 };
  b.spr = "empty";
  return null;
}

/** La configurazione (construct o upgrades[i]) del livello ATTUALE di un
 * edificio finito — stesso schema di currentDecor()/ruinSpriteFor() sopra,
 * usata sotto per leggere ruspaCost/ruspaFirstStepDur senza duplicarlo. */
function currentLevelDef(b) {
  const def = BUILDING_TYPES[b.type];
  if (b.level < 1) return null;
  return b.level === 1 ? def.construct : def.upgrades?.[b.level - 2];
}

/** Il costo ruspa (demolizione/riparazione) dell'edificio al suo livello
 * attuale — `null` se il tipo/livello non e' ruspabile (chies/monum/banca/
 * grattacielo: nessuno dei loro oggetti nel decompilato ha un ramo
 * `Mouse_LeftPressed.gml` per selec==11).
 *
 * `overpark`/`oversolar` (main.js, placeSolarOverPark()): **[C]**
 * `demobasia/Collision_sooool.gml` legge il costo della ruspa su un
 * pannello solare 2700 mon se `overpark`, 2000 altrimenti — un pannello
 * costruito sopra un parco costa di piu' da smontare/riparare. **[C]**
 * `demobasia/Collision_parco.gml` invece non ha PROPRIO un ramo per
 * `oversolar==1` (solo per `oversolar==0`, 500 mon): un parco con un
 * pannello sopra non e' affatto ruspabile finche' il pannello resta li'
 * — `null`, stessa convenzione gia' usata per i tipi non ruspabili sopra. */
export function ruspaCostFor(b) {
  if (b.type === "parco" && b.oversolar) return null;
  if (b.type === "solare" && b.overpark) return 2700;
  return currentLevelDef(b)?.ruspaCost ?? null;
}

/**
 * Tocco di conferma sulla ruspa (`r12.selec===11`, popup si'/no gia'
 * confermato dal giocatore — main.js gestisce l'armare/il conferma, vedi
 * `ruspaPending` li'): paga il costo e rimanda l'edificio in cantiere ALLO
 * STESSO livello. **[C]** `demobasia/Collision_*.gml` crea, per ogni
 * livello, un oggetto "_demo" dedicato (`impacasa2r`, `impaind3r`, ...) che
 * si e' rivelato — diff alla mano contro il cantiere/potenziamento normale
 * dello stesso livello — la stessa identica catena `Alarm_0` in poi, con
 * AL PIU' il primo passo accorciato (`ruspaFirstStepDur` per livello,
 * buildings.js sopra: ricostruire su un lotto gia' sviluppato salta la fase
 * di sgombero che un lotto vuoto richiede). Riusa percio' `up.steps` cosi'
 * com'e' invece di duplicarlo — `c.rebuilding` (letto da
 * stepConstructions() sotto) e' l'unica differenza dal percorso normale.
 * `eolico` non passa mai di qui (`def.construct.ruspaDemolish` sopra):
 * main.js lo intercetta prima e demolisce per davvero invece.
 *
 * [Bug corretto] `b.spr` NON viene piu' azzerato a "empty" (invisibile) qui:
 * a differenza di un cantiere su un lotto vuoto (tryStartUpgrade()/
 * placeBuilding() sopra, dove "empty" e' letteralmente cio' che c'e' — un
 * lotto libero), un lotto ruspato ha ancora l'edificio VECCHIO sopra finche'
 * la ruspa non lo sgombera per davvero. Segnalato dall'autore: sparire di
 * scatto a "empty" e poi al primo sprite del cantiere (una fondamenta/un
 * lotto spoglio, lo stesso di una costruzione ex novo) faceva sembrare
 * l'edificio gia' demolito ancora prima che il "sgombero" (il primo passo,
 * accorciato da `ruspaFirstStepDur` — a volte un solo tick) iniziasse
 * davvero. `b.spr` resta quindi quello vecchio (l'ultimo disegnato prima di
 * questa chiamata) finche' stepConstructions() sotto non decide lui stesso
 * di sostituirlo, SOLO quando il primo passo (il "sgombero") e' finito per
 * davvero — vedi il commento su `c.rebuilding` li'.
 */
export function tryRuspaRebuild(b, r12) {
  if (b.construction) return "construction already in progress";
  const cost = ruspaCostFor(b);
  if (cost == null) return "not rebuildable with the bulldozer";
  if (!canAfford(r12, { mon: cost })) return `need ${cost} mon (have ${r12.mon.toFixed(0)})`;
  r12.mon -= cost;
  b.level -= 1;
  b.construction = { upgradeIndex: b.level - 1, stepIndex: 0, t: 0, rebuilding: true };
  return null;
}

/** Applica il salto di livello vero e proprio (pop/hap/wewe/vita/sprite
 * finale/decoro/contatori azzerati) — estratto da stepConstructions() sotto
 * perche' ora scatta in un punto diverso da quando `b.construction` viene
 * tolto (vedi il commento li' per il perche').
 *
 * [Bug corretto, richiesto dall'autore] `deferDecor`: per i tipi SENZA
 * `up.revealAtEnd` questa funzione gira all'INGRESSO dell'ultimo passo
 * (stepConstructions() sotto), non alla vera fine — sprite/livello/vita/
 * economia possono gia' cambiare li' (l'edificio "si rivela" sotto
 * l'impalcatura ancora in sovraimpressione, un effetto voluto: STUDIO.md,
 * "sincronizzazione impalcatura/gru"), ma il DECORO (`onDecor`, le finestre
 * illuminate — `addDecor()`/`_selfLit` in main.js, depth -y-1 apposta per
 * saltare DAVANTI a tutto, impalcatura inclusa) no: senza questo le luci
 * di un edificio si accendevano gia' durante l'ultimo passo del cantiere,
 * visibili sopra l'impalcatura ancora in piedi — segnalato dall'autore
 * ("le luci degli edifici vanno attivate solo quando il cantiere e'
 * completamente finito"). Con `deferDecor` la scelta del decoro (sprite di
 * variante compreso, per i tipi a dado) resta congelata su `c.pendingDecor`
 * finche' stepConstructions() non la applica per davvero, alla vera fine
 * (`b.construction = null`). I tipi con `up.revealAtEnd` (oggi solo
 * `eolico`) chiamano gia' questa funzione solo alla vera fine — per loro
 * `deferDecor` resta false, `onDecor` scatta qui stesso, invariato. */
function applyLevelFinish(b, def, up, c, r12, onDecor, deferDecor = false) {
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
  // [C] `wewe` (peso della piattaforma su `match`, state.js): scritto
  // alla nascita di ogni livello che lo dichiara, mai sottratto (nessun
  // Destroy.gml del decompilato lo tocca — un edificio distrutto non
  // "alleggerisce" la piattaforma, fedele com'e').
  if (up.wewe) r12.wewe = (r12.wewe ?? 0) + up.wewe;
  b.life = up.life ?? (b.life + (up.lifeBonus ?? 0));
  if (up.grantPop) r12.pop += up.grantPop;   // [C] casa1|2|3/Create.gml: pop += N alla nascita del livello
  if (up.variants) {
    // Edifici a variante casuale (casa/parco/club: uniforme; villa: pesato
    // — vedi pickVariant() sopra) — sprite+decoro scelti una volta e
    // persistiti sull'istanza.
    const v = pickVariant(up.variants);
    b.spr = v.spr;
    b.decorSpr = v.decor;
    if (deferDecor) c.pendingDecor = [v.decor]; else onDecor?.(b, [v.decor]);
  } else {
    b.spr = up.finalSprite;
    if (deferDecor) c.pendingDecor = up.decor; else onDecor?.(b, up.decor);
  }
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

/**
 * Avanza tutti i cantieri in corso di `dt` secondi.
 * `onDecor(b, sprites)` sostituisce il decoro FINALE dell'edificio (finestre/
 * decoro per livello, chiamato da `applyLevelFinish()`). `onSpawn(b,
 * [{spr,dx,dy}])` aggiunge decoro TRANSITORIO (gru/topper) durante un passo
 * del cantiere. `onFinish(b)` avvisa quando l'impalcatura e' DAVVERO smontata
 * (`b.construction` torna `null`) — e' il punto giusto per far sparire il
 * decoro transitorio, non `onDecor`.
 *
 * [I] Segnalato dall'autore: l'edificio finito deve comparire quando
 * l'impalcatura ENTRA nell'ultimo passo (la fase di smontaggio — la stessa
 * finestra in cui compare `up.cap`, sotto), non quando quel passo finisce.
 * [C] Nel decompilato la traccia "f" (impalcatura in sovraimpressione, mai
 * ricostruita per intero — STUDIO.md "due semplificazioni") crea gia'
 * l'edificio del livello successivo MENTRE "r" e' ancora impegnata nella
 * coda cosmetica finale, che qui e' un solo passo lungo invece della sua
 * vera durata (11 tic mai portati): la costruzione vera e' gia' finita da
 * quel momento, resta solo la scenografia dello smontaggio — `applyLevelFinish()`
 * sopra ora scatta li' (`c.finished`), non piu' quando l'ultimo passo
 * chiude e l'impalcatura sparisce per davvero.
 *
 * [Bug corretto] `onDecor` chiama `spawnDecor()` (main.js), che PRIMA
 * rimpiazzava indiscriminatamente OGNI decoro dell'edificio — compreso il
 * transitorio appena piazzato da `onSpawn` nello stesso passo (i topper
 * "toppers"/"topls" nascono proprio nell'ultimo passo, insieme al decoro
 * finale) o nei passi precedenti (le gru "gr21"/"gru1" di impalaser/impa*).
 * Risultato: gru/topper sparivano nell'istante stesso in cui l'edificio
 * finito compariva, invece di restare visibili fino alla vera fine
 * dell'impalcatura. Ora `onDecor` tocca solo il decoro finale (main.js
 * marca quello transitorio con `transient:true` e lo esclude dal filtro),
 * e `onFinish` lo ripulisce quando l'impalcatura sparisce per davvero.
 */
export function stepConstructions(buildings, dt, r12, onDecor, onSpawn, onFinish) {
  for (const b of buildings) {
    const c = b.construction;
    if (!c) continue;
    const def = BUILDING_TYPES[b.type];
    const up = c.upgradeIndex === -1 ? def.construct : def.upgrades[c.upgradeIndex];
    let cur = up.steps[c.stepIndex];
    if (c.curSpr === undefined) {
      c.curSpr = pickSpr(cur.spr);
      // `c.curSpd` (frame/tic dello sprite di QUESTO passo, main.js lo legge
      // per animare "impvent1"/"impvent3" — commento su BUILDING_TYPES.eolico
      // sopra): 0 per ogni altro passo di ogni altro edificio (tutti a un
      // solo frame vero, l'animazione non farebbe differenza).
      c.curSpd = cur.spd ?? 0;
      if (cur.spawn) onSpawn?.(b, cur.spawn);
      if (c.stepIndex === up.steps.length - 1 && !c.finished && !up.revealAtEnd) {
        applyLevelFinish(b, def, up, c, r12, onDecor, true);
        c.finished = true;
      }
    }
    if (up.drain) {
      c.drainT = (c.drainT ?? 0) + dt;
      const period = up.drain.every * TICK;
      while (c.drainT >= period) { c.drainT -= period; r12.mon -= up.drain.mon; }
    }
    c.t += dt;
    // [Bug corretto] Il PRIMO passo di un cantiere avviato dalla ruspa
    // (`c.rebuilding`, tryRuspaRebuild() sopra) e' il "sgombero" del lotto
    // gia' sviluppato — accorciato da `ruspaFirstStepDur` (a volte un solo
    // tick) proprio perche' non c'e' nessun vero sgombero da fare, a
    // differenza di un lotto vuoto. Il suo sprite (`cur.spr`, lo stesso
    // della fondamenta/lotto spoglio di un cantiere ex novo) non deve
    // quindi comparire: finche' quel passo e' in corso `b.spr`/`b.frontSpr`
    // restano quelli dell'edificio VECCHIO (tryRuspaRebuild() non li tocca
    // piu' apposta) — l'edificio resta visibilmente in piedi finche' la
    // ruspa non lo sgombera per davvero, invece di sparire di scatto in una
    // fondamenta spoglia ancora prima che il cantiere sia davvero iniziato.
    // `&& b.spr`: SOLO se c'e' davvero un edificio vecchio da preservare —
    // un lotto-rudere marcava `rebuilding:true` allo STESSO modo ma partiva
    // da `placeBuilding()`, che per un tipo con `construct` lascia `b.spr`
    // a `null` (nessun edificio precedente, mai esistito): senza questo
    // controllo in piu' quel `null` restava tale per l'intero primo passo
    // invece del vero sprite di cantiere, ed il lotto spariva del tutto
    // (nessun `_f`, scartato in silenzio dal ciclo di disegno) — segnalato
    // dall'autore verificando che la demolizione di un rudere avviasse un
    // cantiere vero e non un edificio gia' finito. Un rudere non avvia piu'
    // nessun cantiere (main.js, clearedPlaceholder() — decisione
    // dell'autore: "la rovina ruspata deve creare sempre un placeholder
    // vuoto"), quindi oggi `c.rebuilding` nasce solo da tryRuspaRebuild()
    // su un edificio gia' vivo (sempre con `b.spr` valorizzato) — il
    // controllo resta comunque qui, difensivo, per lo stesso motivo di
    // sempre.
    const clearingLot = c.rebuilding && c.stepIndex === 0 && b.spr;
    // Finche' non e' l'ultimo passo lo sprite disegnato e' ancora il
    // cantiere generico (`c.curSpr`); da quando applyLevelFinish() sopra ha
    // gia' girato (`c.finished`) resta quello vero appena assegnato, non
    // va piu' sovrascritto ogni frame.
    if (!c.finished && !clearingLot) b.spr = c.curSpr;
    b.frontSpr = clearingLot ? null : frontSprFor(c.curSpr);
    // Il coperchio a gru (`up.cap`) compare durante l'ultimo passo: e'
    // sempre quello lungo ("l'edificio e' quasi finito", vedi steps sopra),
    // la stessa finestra in cui l'originale lo mostra davvero (poco dopo
    // l'inizio del cantiere, ma resta a schermo comunque fino alla fine).
    b.capSpr = (up.cap && c.stepIndex === up.steps.length - 1) ? up.cap : null;
    // [C] `c.rebuilding` (tryRuspaRebuild() sopra): il primo passo di un
    // cantiere avviato dalla ruspa dura `ruspaFirstStepDur`, non `cur.dur`
    // — solo il primo, il resto della catena e' identico a un cantiere
    // normale (verificato diff alla mano su piu' tipi, vedi i commenti su
    // ogni `ruspaFirstStepDur` in BUILDING_TYPES).
    const dur = (c.stepIndex === 0 && c.rebuilding && up.ruspaFirstStepDur != null)
      ? up.ruspaFirstStepDur : cur.dur;
    if (c.t < dur * TICK) continue;
    c.t = 0;
    c.stepIndex++;
    if (c.stepIndex < up.steps.length) {
      cur = up.steps[c.stepIndex];
      c.curSpr = pickSpr(cur.spr);
      // `c.curSpd` (frame/tic dello sprite di QUESTO passo, main.js lo legge
      // per animare "impvent1"/"impvent3" — commento su BUILDING_TYPES.eolico
      // sopra): 0 per ogni altro passo di ogni altro edificio (tutti a un
      // solo frame vero, l'animazione non farebbe differenza).
      c.curSpd = cur.spd ?? 0;
      if (cur.spawn) onSpawn?.(b, cur.spawn);
      if (c.stepIndex === up.steps.length - 1 && !c.finished && !up.revealAtEnd) {
        applyLevelFinish(b, def, up, c, r12, onDecor, true);
        c.finished = true;
      }
    } else {
      // L'edificio (livello/sprite/vita/economia/contatori) e' gia' stato
      // finalizzato all'ingresso dell'ultimo passo, sopra — qui resta solo
      // da far sparire l'impalcatura residua, smontata per davvero. Il
      // decoro TRANSITORIO (gru/topper, onSpawn sopra) va rimosso proprio
      // qui, non da onDecor: onDecor sostituisce solo il decoro FINALE
      // dell'edificio (finestre/decoro per livello) — se rimuovesse anche
      // il transitorio a quel punto, gru/topper sparirebbero nell'istante in
      // cui l'edificio finito compare invece che alla vera fine
      // dell'impalcatura (bug segnalato dall'autore).
      // `up.revealAtEnd` (**[Bug corretto]**, solo `eolico` finora): buildings
      // con un'impalcatura vera in sovraimpressione (`frontSprFor()` sopra)
      // possono "svelarsi" prima — lo sprite finito e' comunque coperto
      // dallo scaffold fino alla fine vera. `eolico` NON ha nessuna traccia
      // "f" (BUILDING_TYPES.eolico sopra): senza `revealAtEnd` mostrava gia'
      // "eol" (la pala finita, GIA' animata dopo la correzione sopra) per
      // l'intero ultimo passo (`impvent3`, 37s) — il giocatore vedeva una
      // pala completa e rotante MOLTO prima che il cantiere finisse
      // davvero, e l'animazione di montaggio vera (`impvent3`, 22 frame,
      // appena aggiunta sopra) non si vedeva mai perche' `b.spr` non era
      // piu' "impvent3". Qui applyLevelFinish() gira solo ora, alla vera
      // fine, per i tipi che lo dichiarano — fedele all'originale anche per
      // eolico (`eoli` nasce solo a fine cantiere, `impavent/Alarm_2.gml`).
      if (up.revealAtEnd && !c.finished) {
        applyLevelFinish(b, def, up, c, r12, onDecor);
        c.finished = true;
      }
      // [Bug corretto, richiesto dall'autore] "le luci degli edifici vanno
      // attivate solo quando il cantiere e' completamente finito": il
      // decoro FINALE (finestre illuminate, `_selfLit` in main.js — depth
      // -y-1, apposta per saltare davanti a TUTTO, impalcatura inclusa)
      // resta scelto ma non ancora applicato (`c.pendingDecor`,
      // applyLevelFinish() sopra con `deferDecor=true`) per tutta la durata
      // dell'ultimo passo: applicarlo solo qui, alla vera fine
      // dell'impalcatura, evita che una finestra illuminata compaia sopra
      // un cantiere ancora visibilmente in corso. I tipi con
      // `up.revealAtEnd` non passano mai di qui con un `pendingDecor` da
      // applicare (il loro applyLevelFinish() sopra gira gia' senza
      // `deferDecor`, `onDecor` e' gia' scattato).
      if (c.pendingDecor !== undefined) { onDecor?.(b, c.pendingDecor); c.pendingDecor = undefined; }
      b.construction = null;
      b.frontSpr = null; b.capSpr = null;
      onFinish?.(b);
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
    const def = BUILDING_TYPES[b.type];
    const prod = def.windProduction;
    if (!prod) continue;
    // [C] eoli/Create.gml: `action_sprite_set(eol, 0, 0.25)` — "eol" ha 8
    // sottoimmagini vere (le pale in rotazione, non un singolo fotogramma
    // statico) e GameMaker le scorre da solo a `image_speed` 0.25
    // frame/step = 15 frame/s a 60fps. Segnalato dall'autore ("la pala
    // gira ma l'animazione non si vede"): il motore non aveva ancora un
    // ciclo continuo per nessuno sprite di edificio finito (solo animazioni
    // "un colpo solo" con un contatore di fine, tipo soldfade/fica) — qui
    // basta un timer che non si azzera mai, letto in main.js insieme al
    // numero di frame reale dell'atlas per fare il modulo.
    //
    // [Bug corretto] Prima l'animazione partiva solo a `!b.construction` —
    // cioe' alla vera fine del cantiere. All'epoca `b.spr` mostrava gia'
    // "eol" (lo sprite FINITO) fin dall'ingresso dell'ultimo passo (stessa
    // scelta di ogni altro edificio, "l'edificio finito compare quando
    // l'impalcatura entra nell'ultimo passo"): per gli altri edifici questo
    // e' invisibile (un'impalcatura in sovraimpressione copre il "non
    // ancora vivo"), ma `eolico` non ne ha nessuna (BUILDING_TYPES.eolico
    // sopra) — la turbina restava a schermo GIA' col suo aspetto finito ma
    // completamente ferma per l'intera coda del cantiere (~37s), poi
    // scattava a girare solo alla fine. Corretto da due lati insieme:
    // `revealAtEnd` (BUILDING_TYPES.eolico/stepConstructions() sopra) fa si'
    // che "eol" compaia solo alla VERA fine, come nell'originale; qui
    // l'animazione resta condizionata a `b.spr` (non a `!b.construction`
    // direttamente) solo perche' e' lo stesso identico istante per questo
    // tipo — piu' diretto e resistente a un futuro cambio di `revealAtEnd`.
    // La produzione di energia sotto resta fedele a `eoli/Alarm_0.gml`
    // (l'oggetto "eoli" vero nasce solo alla fine del cantiere nel
    // decompilato) e continua a richiedere `!b.construction`.
    if (b.spr === def.construct.finalSprite) b.animT = (b.animT ?? 0) + dt;
    if (b.construction) continue;
    b.windT = (b.windT ?? 0) + dt;
    const period = prod.every * TICK;
    while (b.windT >= period) { b.windT -= period; r12.ele += prod.ele; }
  }
}
// [C] eoli/Create.gml: 0.25 frame/step * 60 step/s.
export const WIND_ANIM_FPS = 15;

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
 * Avanza il consumo elettrico (ed eventualmente in mon) degli edifici
 * finiti che dichiarano `consumption` per livello e stadio di crescita
 * (casa, villa — una tabella per livello/stadio `ava`; museo, STUDIO.md
 * sotto — una sola voce, mai indicizzata perche' non cresce mai). [C]
 * casa1|2|3/Alarm_3.gml: ogni 120 tick consuma energia in base allo stadio
 * `b.ava` e a se e' notte (prima regola che collega il ciclo giorno/notte —
 * finora solo una tinta, STUDIO.md §5.2 — a un numero di gioco). `rate.mon`
 * (opzionale, solo `museo`) e' un secondo canale: **[C]** media1s|d/Alarm_3.gml
 * scala anche `r12.mon` allo stesso intervallo di 120 tick, indipendente da
 * giorno/notte — mai visto in nessun altro edificio con `consumption`.
 */
export function stepConsumption(buildings, dt, r12, isNight) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    const cons = def.consumption?.[b.level - 1];
    if (!cons) continue;
    // [C] m3cant/Step.gml, ramo `phase>=14` (edificio finito): OGNI tick,
    // se `r12.spy` e' 1 lo rimette a 0 — un grattacielo finito blocca le
    // mongolfiere spia per sempre (STUDIO.md, "cosa non so ancora" lo
    // segnava come "semantica non verificabile": rivisto, la condizione e'
    // in realta' incondizionata e continua, non un singolo confronto
    // sensibile all'ordine fra oggetti nello stesso tick — anche vincendo
    // una sola volta la corsa con l'alarm che sblocca `spy`
    // (balloons.js, SPY_UNLOCK_T), il tick successivo lo azzera comunque
    // di nuovo, quindi l'esito in regime e' sempre lo stesso). Scritto qui
    // fuori dal throttle `period` sotto (che scatta ogni 120 tick, non
    // ogni tick) per restare fedele alla cadenza vera.
    if (b.type === "grattacielo") r12.spy = 0;
    const rate = cons[Math.min(b.ava ?? 0, cons.length - 1)];
    b.consT = (b.consT ?? 0) + dt;
    const period = 120 * TICK;   // [C] casa1/Alarm_3.gml, fisso indipendentemente dallo stadio
    while (b.consT >= period) {
      b.consT -= period;
      r12.ele -= isNight ? rate.night : rate.day;
      if (rate.mon) r12.mon -= rate.mon;
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
 *
 * `onStrike(x, y)`: [C] ogni Alarm_5/6 che applica il danno crea PRIMA
 * "thunder" (il lampo visivo, game/src/lightning.js) — `sd.dy` (default 0
 * dove l'offset esatto non e' stato letto, vedi i commenti sulle singole
 * tabelle `storm`) e' l'offset verticale relativo all'ancora dell'edificio.
 */
export function stepStormDamage(buildings, dt, r12, onStrike) {
  for (const b of buildings) {
    if (b.construction || b.life <= 0) continue;
    const def = BUILDING_TYPES[b.type];
    const sd = def.storm?.[b.level - 1];
    if (!sd) continue;
    b.stormT = (b.stormT ?? 0) + dt;
    while (b.stormT >= STORM_CHECK) {
      b.stormT -= STORM_CHECK;
      if (r12.storm && Math.random() < 1 / sd.dice) {
        b.life = Math.max(0, b.life - sd.loss);
        onStrike?.(b.x, b.y + (sd.dy ?? 0));
      }
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
  gatling: dirTable("nm", "a"),
  // [Bug corretto, segnalato dall'autore: "il gatling... sembra manchino le
  // animazioni"] **[C]** `gatlinggun/Step.gml` alterna anche una posa di
  // rinculo dopo ogni scarica: le "b" (sprite_index dispari, es. nm1b),
  // pilotate da `spra`/`amove`/Alarm_9|11 — Alarm_11 (3 tick dopo lo sparo)
  // passa alla posa "b", e ci resta finche' non arriva Alarm_9 (riarmato a
  // 50 tick da OGNI rilascio del pulsante, `Mouse_GlobalLeftReleased.gml`)
  // a riportare `spra` a 0 e restituire lo sprite alla posa di mira "a". In
  // pratica: durante uno sparo prolungato lo sprite resta "in rinculo"
  // quasi ininterrottamente (ogni nuovo colpo si riarma prima che Alarm_9
  // scatti), tornando alla posa di mira solo ~50 tick dopo l'ULTIMO colpo —
  // una lettura precedente aveva scambiato questi stessi 50 tick per il
  // tempo di ricarica fra due colpi (WEAPONS.gatling.cooldown in
  // projectiles.js, corretto qui accanto), liquidando l'intera posa "b"
  // come "un lampeggio che dura meno di un secondo" da non replicare.
  gatlingRecoil: dirTable("nm", "b"),
  laser: dirTable("lan"),
};
// [Bug corretto, segnalato dall'autore: "l'area di tap delle strutture di
// difesa deve coprire tutto l'oggetto"] Ogni sprite direzionale di una
// torretta ha un bounding box diverso (il cannone "si allunga" di lato per
// certe direzioni, meno per altre) — main.js usa il frame CORRENTE per
// l'hit test del tap, quindi l'area cliccabile si restringeva ad ogni
// cambio di direzione invece di restare un riquadro fisso grande quanto lo
// sprite piu' esteso che il tipo puo' assumere. Qui solo l'elenco dei nomi
// sprite per tipo (mira + rinculo): main.js unisce i loro bbox in un solo
// rettangolo di tap la prima volta che serve (l'atlas vive li', non qui).
export const TURRET_SPRITE_NAMES = Object.fromEntries(
  Object.keys(TURRET_SPRITE_TABLES)
    .filter((k) => !k.endsWith("Recoil"))
    .map((type) => {
      const names = new Set();
      for (const key of [type, type + "Recoil"]) {
        const table = TURRET_SPRITE_TABLES[key];
        if (table) for (const o of table) names.add(o.spr);
      }
      return [type, [...names]];
    }),
);
// [C] gatlinggun/Alarm_9.gml: 50 tick dall'ultimo sparo prima che la posa di
// rinculo ("b") torni alla posa di mira ("a") — vedi il commento sopra.
const GATLING_RECOIL_HOLD = 50 * TICK;
function turretSprFor(type, angleDeg, recoiling) {
  const table = (recoiling && TURRET_SPRITE_TABLES[type + "Recoil"]) || TURRET_SPRITE_TABLES[type];
  const a = ((angleDeg % 360) + 360) % 360;
  for (const bucket of table) if (a <= bucket.max) return bucket.spr;
  return table[table.length - 1].spr;
}

/**
 * Le torrette (missile/gatling/laser, tutte con `turret: true`) inseguono
 * col cannone la minaccia vera piu' vicina entro `def.aim.range` —
 * `threats` e' la lista di `{x,y}` gia' assemblata da chi chiama (in
 * main.js: aerei/bombardieri/zeppelin, game/src/threats.js). Le minacce
 * vere hanno SEMPRE la priorita' sulle mongolfiere (vedi sotto): finche' ce
 * n'e' una in portata l'aggancio (e quindi il fuoco automatico,
 * stepTurretFire in projectiles.js) resta esattamente quello di prima,
 * nessuna regressione sulla difesa vera.
 *
 * **[Bug corretto, richiesto dall'autore]** Quando NESSUNA minaccia vera e'
 * in portata, la torretta non resta piu' a riposo (cannone fermo,
 * `aimTarget` azzerato): punta invece alla mongolfiera (risorsa o spia,
 * `balloons`, game/src/balloons.js) piu' vicina entro lo stesso raggio —
 * segnalato dall'autore ("le strutture di difesa non puntano ne' sparano
 * contro le mongolfiere"): un tap sul cannone in questa situazione ora fa
 * partire un colpo vero (fireTurretManual, projectiles.js) verso la
 * mongolfiera agganciata, esattamente come farebbe contro una minaccia
 * vera. Il fuoco AUTOMATICO invece resta impossibile contro le mongolfiere
 * anche con questo fallback: stepTurretFire ricontrolla da se' che una
 * minaccia vera sia davvero in `fireRange` prima di far partire un colpo
 * senza tocco, quindi un `aimTarget` di tipo mongolfiera (nessuna minaccia
 * intorno) non fa mai scattare nulla da solo — resta un'azione che il
 * giocatore deve chiedere esplicitamente col tap sul cannone. [Bug corretto,
 * segnalato dall'autore: "se clicco su una mongolfiera questa esplode da
 * sola"] Il tap diretto sulla mongolfiera stessa (un tempo l'ALTRA via per
 * abbatterle, main.js) e' stato rimosso: nessun oggetto mongolfiera
 * dell'originale ha mai avuto un Mouse_LeftPressed.gml, la torretta (questo
 * fallback incluso) resta l'unico modo di abbatterle. Le auto decorative
 * (`cars`, un tempo incluse come "veicoli_target" dell'originale) restano
 * fuori da entrambi i giri: non sono un bersaglio, ne' ostile ne' cliccabile.
 *
 * **[I]** Se nessuna minaccia NE' mongolfiera e' in portata, `aimAngle`/
 * `aimTarget` vengono azzerati (non lasciati all'ultima direzione come
 * nell'originale — [C] `rocket_launcher|gatlinggun|lasergun/Step.gml`,
 * l'`if` che li aggiorna e' innestato dentro il controllo di portata,
 * niente ramo `else`): con bersagli che nascono fuori mappa e se ne vanno
 * (game/src/threats.js, game/src/balloons.js) un bersaglio puo'
 * allontanarsi parecchio, o sparire del tutto, senza che la sua POSIZIONE
 * smetta mai di essere "in portata" rispetto a un cannone fermo —
 * l'originale lascia il cannone agganciato per sempre a quel punto, e
 * siccome il fuoco manuale (`fireTurretManual`, projectiles.js) spara
 * sempre verso `b.aimTarget` senza ricontrollare se c'e' ancora qualcosa
 * li', il colpo finiva verso il vuoto — spesso fuori dallo schermo, dato
 * che l'ultimo bersaglio agganciato e' quasi sempre quello che si stava
 * allontanando o e' appena nato lontano dalla mappa (STUDIO.md, `spawnX:
 * -170` per gli aerei). Azzerare quando non c'e' davvero niente in portata
 * e' l'unico modo per far tornare `fireTurretManual`/`stepTurretFire` (che
 * gia' controllano `aimTarget == null`) a rifiutare correttamente il colpo.
 */
export function stepTurretAim(buildings, threats, balloons) {
  for (const b of buildings) {
    if (b.construction) continue;
    const def = BUILDING_TYPES[b.type];
    if (!def.aim) continue;
    const range2 = def.aim.range * def.aim.range;
    let nearest = null, nearestD2 = range2;
    for (const th of threats) {
      const d2 = (th.x - b.x) ** 2 + (th.y - b.y) ** 2;
      if (d2 < nearestD2) { nearestD2 = d2; nearest = th; }
    }
    // Fallback mongolfiere: SOLO se non c'e' gia' una minaccia vera in
    // portata (nearest ancora null qui) — le minacce vere vincono sempre.
    if (!nearest && balloons) {
      nearestD2 = range2;
      for (const bal of balloons) {
        const d2 = (bal.x - b.x) ** 2 + (bal.y - b.y) ** 2;
        if (d2 < nearestD2) { nearestD2 = d2; nearest = bal; }
      }
    }
    if (!nearest) { b.aimAngle = null; b.aimTarget = null; continue; }
    const angle = (Math.atan2(-(nearest.y - b.y), nearest.x - b.x) * 180) / Math.PI;
    // [Bug corretto] `b.fireT` (game/src/projectiles.js: azzerato a ogni
    // colpo, poi conta il tempo trascorso dall'ultimo) e' esattamente il
    // "tempo dall'ultimo sparo" che governa anche la posa di rinculo vera
    // (vedi TURRET_SPRITE_TABLES/GATLING_RECOIL_HOLD sopra) — nessun nuovo
    // stato da tracciare, riusa quello che il fuoco gia' mantiene.
    const recoiling = (b.fireT ?? Infinity) < GATLING_RECOIL_HOLD;
    b.spr = turretSprFor(b.type, angle, recoiling);
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
