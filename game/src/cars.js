// Automobili decorative come dati, stesso approccio di buildings.js
// (STUDIO.md §7.3): honda_facile_1/2 sono le uniche due gia' istanziate in
// match_easy.scene.json (STUDIO.md §5.3 "veicoli_target" — famiglia che
// raggruppa i veicoli decorativi). Nell'originale non stanno ferme: guidano
// lungo un percorso fisso a spezzate, cambiando direzione/velocita'/sprite
// a orari precisi scanditi da una catena di alarm (src/objects/
// honda_facile_1|2), poi si tolgono di mezzo e — se c'e' ancora olio — ne
// riparte una identica dal punto di partenza. Qui la stessa catena e' una
// tabella `schedule` (tick assoluti da Create, come nell'originale) letta
// da un'unica stepCars(), invece di un oggetto/evento per fase.
//
// [C] = letto nel decompilato. Le direzioni sono gradi GameMaker
// (action_set_motion): 0=destra, 90=su, aumentano in senso antiorario —
// la stessa convenzione usata sotto per integrare la posizione.

const TICK = 1 / 60;

export const CAR_TYPES = {
  // [C] honda_facile_1/Create.gml arma SOLO alarm[0] (durata di vita, 900
  // tick): gli Alarm_1..6 dell'oggetto esistono nel decompilato ma non
  // vengono mai armati da nessun evento — codice morto nell'originale
  // stesso (stesso pattern di altri alarm mai innescati, STUDIO.md §9 "im1r
  // ..im4r"). Risultato: questa non svolta mai, guida dritta a velocita'
  // costante per tutta la sua vita.
  honda_facile_1: {
    spawn: { x: 1321, y: 924 },           // [C] posizione sia iniziale (room) sia di rientro (Alarm_0)
    life: 900,                             // [C] action_set_alarm(900, 0) in Create
    spr: "p_as",                           // [C] sprite di default (_object.json), mai cambiato
    initial: { dir: 150, spd: 3 },         // [C] action_set_motion(150, 3) in Create
    depthOffset: 2,                        // [C] honda_facile_1/Step.gml: depth = -y - 2
    schedule: [],
  },
  // [C] honda_facile_2/Create.gml arma sia alarm[0] (275) sia alarm[1]
  // (294): la catena vera, sette fasi che accelerano/decelerano e svoltano
  // fra le direzioni 30 e 150 prima di rientrare. `at` sono i tick assoluti
  // dalla nascita (non relativi alla fase precedente) esattamente come li
  // arma il decompilato — vedi lo sviluppo passo-passo in STUDIO.md.
  honda_facile_2: {
    spawn: { x: 126, y: 1098 },            // [C] posizione iniziale e di rientro (Alarm_6)
    life: 812,                             // [C] 352 + 460 (action_set_alarm(460, 6) nell'ultima fase)
    spr: "c_ad",                           // [C] sprite di default (_object.json)
    initial: { dir: 30, spd: 3 },          // [C] action_set_motion(30, 3) in Create
    depthOffset: 2,                        // [C] honda_facile_2/Step.gml: depth = -y - 2
    schedule: [
      { at: 275, dir: 30, spd: 2, spr: "c_ad_as" },   // [C] Alarm_0
      { at: 294, dir: 150, spd: 2 },                   // [C] Alarm_1 (armato da Create, non da Alarm_0)
      { at: 313, dir: 150, spd: 3, spr: "c_as" },      // [C] Alarm_2 (275+38)
      { at: 314, dir: 150, spd: 2, spr: "c_as_ad" },   // [C] Alarm_3 (313+1)
      { at: 333, dir: 30, spd: 2 },                     // [C] Alarm_4 (313+20)
      { at: 352, dir: 30, spd: 3, spr: "c_ad" },        // [C] Alarm_5 (314+38)
    ],
  },

  // honda1/honda2: le stesse "gia' istanziate dall'inizio" di honda_facile_1/2
  // sopra, ma per `match` (la mappa difficile) invece di `match_easy` — [C]
  // honda1|2/Create.gml, catena piu' ricca di honda_facile_1/2 (che invece
  // non svolta mai): entrambe girano avanti/indietro fra due direzioni
  // prima di rientrare, esattamente come honda3..9 sotto, solo che ci sono
  // gia' dall'inizio invece di essere fatte arrivare da `carmaker`. depth
  // `-y - 2` come honda_facile_1/2 (non `-16` come honda3..9, STUDIO.md
  // sotto): **[C]** honda1|2/Step.gml, letto riga per riga.
  honda1: {
    spawn: { x: 605, y: 835 },              // [C] honda1/Alarm_6.gml (rientro) — match.scene.json lo piazza a (604,837), stesso punto
    life: 426,                               // [C] 256 + 170 (Alarm_5 arma alarm(170,6))
    spr: "v_ad",                             // [C] sprite di default (_object.json)
    initial: { dir: 150, spd: 3 },           // [C] action_set_motion(150, 3) in Create
    depthOffset: 2,
    schedule: [
      { at: 85, dir: 30, spd: 2, spr: "v_ad_as" },   // [C] Alarm_0
      { at: 104, dir: 150, spd: 2 },                  // [C] Alarm_1 (armato da Create)
      { at: 123, dir: 150, spd: 3, spr: "v_as" },     // [C] Alarm_2 (85+38)
      { at: 218, dir: 150, spd: 2, spr: "v_as_ad" },  // [C] Alarm_3 (123+95)
      { at: 237, dir: 30, spd: 2 },                    // [C] Alarm_4 (123+114)
      { at: 256, dir: 30, spd: 3, spr: "v_ad" },       // [C] Alarm_5 (218+38)
    ],
  },
  honda2: {
    spawn: { x: 1105, y: 835 },             // [C] honda2/Alarm_6.gml (rientro) — match.scene.json lo piazza a (1103,834), stesso punto
    life: 721,                               // [C] 551 + 170 (Alarm_5 arma alarm(170,6))
    spr: "r_as",                             // [C] sprite di default (_object.json)
    initial: { dir: 150, spd: 3 },           // [C] action_set_motion(150, 3) in Create
    depthOffset: 2,
    schedule: [
      { at: 290, dir: 150, spd: 2, spr: "r_as_ad" },  // [C] Alarm_0
      { at: 309, dir: 30, spd: 2 },                    // [C] Alarm_1 (armato da Create)
      { at: 328, dir: 30, spd: 3, spr: "r_ad" },       // [C] Alarm_2 (290+38)
      { at: 513, dir: 30, spd: 2, spr: "r_ad_bd" },    // [C] Alarm_3 (328+185)
      { at: 532, dir: 330, spd: 2 },                    // [C] Alarm_4 (328+204)
      { at: 551, dir: 330, spd: 3, spr: "r_bd" },       // [C] Alarm_5 (513+38)
    ],
  },

  // honda3..honda9: le auto che `carmaker` fa arrivare col tempo (vedi
  // CARMAKER_SCHEDULE piu' sotto) — non ci sono dall'inizio come
  // honda_facile_1/2, compaiono una alla volta ogni 60s di gioco. Stesso
  // schema di honda_facile_2 (catena di alarm -> tabella `schedule`), ma
  // depth `-y - 16` (**[C]** honda3..9/Step.gml, contro `-y - 2` di
  // honda_facile_1/2: passano davanti a tutto anche piu' decisamente) e un
  // dettaglio in piu' letto in ogni Create.gml: `action_if_number(736, 1,
  // 0)` (vero per match_easy, STUDIO.md/state.js) sposta l'istanza appena
  // nata di (+21,-26) — un aggiustamento relativo, non assoluto — rispetto
  // al punto passato da chi la crea. Le coordinate qui sotto lo includono
  // gia', non sono quelle scritte a mano in Alarm_*.gml/carmaker.
  //
  // Sprite multi-frame (es. "g_bs_as", 38 frame) durante le fasi di
  // svolta/accelerazione: animati per davvero, vedi stepCars() piu' sotto
  // (`c.frame`) — l'unico posto nel motore che lo fa, perche' e' l'unico
  // caso in cui l'originale stesso anima davvero uno sprite invece di
  // sceglierne uno fisso (varianti di costruzione, sprite degli edifici,
  // ... restano tutte pose singole, fedeli).
  honda3: {
    spawn: { x: 1863, y: 604 },            // [C] carmaker/Alarm_0.gml (1842,630) + il nudge (+21,-26)
    life: 713,                              // [C] 633 + 80 (Alarm_5 arma alarm(80,6))
    spr: "g_bs",                            // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },          // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,                        // [C] honda3/Step.gml: depth = -y - 16
    schedule: [
      { at: 200, dir: 210, spd: 2, spr: "g_bs_as" },  // [C] Alarm_0
      { at: 219, dir: 150, spd: 2 },                   // [C] Alarm_1 (armato da Create)
      { at: 238, dir: 150, spd: 3, spr: "g_as" },      // [C] Alarm_2 (200+38)
      { at: 595, dir: 150, spd: 2, spr: "g_as_bs" },   // [C] Alarm_3 (238+357)
      { at: 614, dir: 210, spd: 2 },                    // [C] Alarm_4 (238+376)
      { at: 633, dir: 210, spd: 3, spr: "g_bs" },       // [C] Alarm_5 (595+38)
    ],
  },
  // [C] honda4/Alarm_4..6 non sono mai armati (Alarm_3 uccide/ricrea
  // sempre prima che possano scattare) — stesso "codice morto" di
  // honda_facile_1, catena piu' corta delle altre honda. Nota anche
  // l'unica discrepanza fra le honda: `carmaker` la crea la prima volta a
  // (62,526), ma la ricrea lei stessa (Alarm_3) a (72,528) — 10px piu' in
  // la, un disallineamento gia' presente nel decompilato originale (mai
  // corretto dall'autore), qui riprodotto con `firstSpawn` invece di
  // "aggiustarlo".
  honda4: {
    firstSpawn: { x: 83, y: 500 },          // [C] carmaker/Alarm_0.gml (62,526) + nudge
    spawn: { x: 93, y: 502 },               // [C] honda4/Alarm_3.gml (72,528) + nudge
    life: 378,                              // [C] 318 + 60 (Alarm_2 arma alarm(60,3))
    spr: "p_bd",                            // [C] sprite di default (_object.json)
    initial: { dir: 330, spd: 3 },          // [C] action_set_motion(330, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 280, dir: 330, spd: 2, spr: "p_bd_ad" },  // [C] Alarm_0
      { at: 299, dir: 30, spd: 2 },                    // [C] Alarm_1 (armato da Create)
      { at: 318, dir: 30, spd: 3, spr: "p_ad" },       // [C] Alarm_2 (280+38)
    ],
  },
  honda5: {
    spawn: { x: 1568, y: 491 },             // [C] carmaker/Alarm_0.gml (1547,517) + nudge
    life: 542,                               // [C] 504 + 38 (Alarm_9 arma alarm(38,11))
    spr: "c_bs",                             // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },           // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 180, dir: 210, spd: 2, spr: "c_bs_as" },  // [C] Alarm_0
      { at: 199, dir: 150, spd: 2 },                   // [C] Alarm_1
      { at: 218, dir: 150, spd: 3, spr: "c_as" },      // [C] Alarm_2 (180+38)
      { at: 288, dir: 150, spd: 2, spr: "c_as_ad" },   // [C] Alarm_3 (218+70)
      { at: 307, dir: 30, spd: 2 },                     // [C] Alarm_4 (218+89)
      { at: 326, dir: 30, spd: 3, spr: "c_ad" },        // [C] Alarm_5 (288+38)
      { at: 396, dir: 30, spd: 2, spr: "c_ad_as" },     // [C] Alarm_6 (326+70)
      { at: 415, dir: 150, spd: 2 },                     // [C] Alarm_7 (326+89)
      { at: 434, dir: 150, spd: 3, spr: "c_as" },        // [C] Alarm_8 (396+38)
      { at: 504, dir: 150, spd: 2, spr: "c_as_ad" },     // [C] Alarm_9 (434+70)
      { at: 523, dir: 30, spd: 2 },                       // [C] Alarm_10 (434+89)
    ],
  },
  honda6: {
    spawn: { x: 1877, y: 617 },             // [C] carmaker/Alarm_0.gml (1856,643) + nudge
    life: 762,                               // [C] 724 + 38 (Alarm_9 arma alarm(38,11))
    spr: "v_bs",                             // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },           // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 190, dir: 210, spd: 2, spr: "v_bs_as" },  // [C] Alarm_0
      { at: 209, dir: 150, spd: 2 },                   // [C] Alarm_1
      { at: 228, dir: 150, spd: 3, spr: "v_as" },      // [C] Alarm_2 (190+38)
      { at: 498, dir: 150, spd: 2, spr: "v_as_ad" },   // [C] Alarm_3 (228+270)
      { at: 517, dir: 30, spd: 2 },                     // [C] Alarm_4 (228+289)
      { at: 536, dir: 30, spd: 3, spr: "v_ad" },        // [C] Alarm_5 (498+38)
      { at: 616, dir: 30, spd: 2, spr: "v_ad_bd" },     // [C] Alarm_6 (536+80)
      { at: 635, dir: 330, spd: 2 },                     // [C] Alarm_7 (536+99)
      { at: 654, dir: 330, spd: 3, spr: "v_bd" },        // [C] Alarm_8 (616+38)
      { at: 724, dir: 330, spd: 2, spr: "v_bd_ad" },     // [C] Alarm_9 (654+70)
      { at: 743, dir: 210, spd: 2 },                      // [C] Alarm_10 (654+89)
    ],
  },
  honda7: {
    spawn: { x: 880, y: 38 },               // [C] carmaker/Alarm_0.gml (859,64) + nudge
    life: 1072,                              // [C] 1034 + 38 (Alarm_9 arma alarm(38,11))
    spr: "r_bd",                             // [C] sprite di default (_object.json)
    initial: { dir: 330, spd: 3 },           // [C] action_set_motion(330, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 270, dir: 330, spd: 2, spr: "r_bd_bs" },  // [C] Alarm_0
      { at: 289, dir: 210, spd: 2 },                   // [C] Alarm_1
      { at: 308, dir: 210, spd: 3, spr: "r_bs" },      // [C] Alarm_2 (270+38)
      { at: 498, dir: 210, spd: 2, spr: "r_bs_as" },   // [C] Alarm_3 (308+190)
      { at: 517, dir: 150, spd: 2 },                    // [C] Alarm_4 (308+209)
      { at: 536, dir: 150, spd: 3, spr: "r_as" },       // [C] Alarm_5 (498+38)
      { at: 806, dir: 150, spd: 2, spr: "r_as_ad" },    // [C] Alarm_6 (536+270)
      { at: 825, dir: 30, spd: 2 },                      // [C] Alarm_7 (536+289)
      { at: 844, dir: 30, spd: 3, spr: "r_ad" },         // [C] Alarm_8 (806+38)
      { at: 1034, dir: 30, spd: 2, spr: "r_ad_bd" },     // [C] Alarm_9 (844+190)
      { at: 1053, dir: 330, spd: 2 },                     // [C] Alarm_10 (844+209)
    ],
  },
  honda8: {
    spawn: { x: 274, y: 377 },              // [C] carmaker/Alarm_0.gml (253,403) + nudge
    life: 662,                               // [C] 624 + 38 (Alarm_9 arma alarm(38,11))
    spr: "g_bs",                             // [C] sprite di default (_object.json)
    initial: { dir: 210, spd: 3 },           // [C] action_set_motion(210, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 60, dir: 210, spd: 2, spr: "g_bs_bd" },   // [C] Alarm_0
      { at: 79, dir: 330, spd: 2 },                    // [C] Alarm_1
      { at: 98, dir: 330, spd: 3, spr: "g_bd" },       // [C] Alarm_2 (60+38)
      { at: 288, dir: 330, spd: 2, spr: "g_bd_ad" },   // [C] Alarm_3 (98+190)
      { at: 307, dir: 30, spd: 2 },                     // [C] Alarm_4 (98+209)
      { at: 326, dir: 30, spd: 3, spr: "g_ad" },        // [C] Alarm_5 (288+38)
      { at: 396, dir: 30, spd: 2, spr: "g_ad_as" },     // [C] Alarm_6 (326+70)
      { at: 415, dir: 150, spd: 2 },                     // [C] Alarm_7 (326+89)
      { at: 434, dir: 150, spd: 3, spr: "g_as" },        // [C] Alarm_8 (396+38)
      { at: 624, dir: 150, spd: 2, spr: "g_as_bs" },     // [C] Alarm_9 (434+190)
      { at: 643, dir: 210, spd: 2 },                      // [C] Alarm_10 (434+209)
    ],
  },
  honda9: {
    spawn: { x: 1319, y: 919 },             // [C] carmaker/Alarm_0.gml (1298,945) + nudge
    life: 1266,                              // [C] 1228 + 38 (Alarm_9 arma alarm(38,11))
    spr: "p_as",                             // [C] sprite di default (_object.json)
    initial: { dir: 150, spd: 3 },           // [C] action_set_motion(150, 3) in Create
    depthOffset: 16,
    schedule: [
      { at: 367, dir: 150, spd: 2, spr: "p_as_ad" },  // [C] Alarm_0
      { at: 386, dir: 30, spd: 2 },                    // [C] Alarm_1
      { at: 405, dir: 30, spd: 3, spr: "p_ad" },       // [C] Alarm_2 (367+38)
      { at: 595, dir: 30, spd: 2, spr: "p_ad_bd" },    // [C] Alarm_3 (405+190)
      { at: 614, dir: 330, spd: 2 },                    // [C] Alarm_4 (405+209)
      { at: 633, dir: 330, spd: 3, spr: "p_bd" },       // [C] Alarm_5 (595+38)
      { at: 1000, dir: 330, spd: 2, spr: "p_bd_bs" },   // [C] Alarm_6 (633+367)
      { at: 1019, dir: 210, spd: 2 },                    // [C] Alarm_7 (633+386)
      { at: 1038, dir: 210, spd: 3, spr: "p_bs" },       // [C] Alarm_8 (1000+38)
      { at: 1228, dir: 210, spd: 2, spr: "p_bs_as" },    // [C] Alarm_9 (1038+190)
      { at: 1247, dir: 150, spd: 2 },                     // [C] Alarm_10 (1038+209)
    ],
  },

  // ------------------------------------------------------------------
  // honda21..25(+a/b) e honda31..34(+a/b): il traffico periodico di r32/r22
  // (game/src/platform.js, seconda/terza piattaforma — STUDIO.md) — stesso
  // schema di honda3..9 sopra (`carmaker`), solo scandito da un alarm
  // dentro `r32`/`r22` stessi invece che dal controller globale (STUDIO.md
  // "maghene": r32|r22/Alarm_4.gml, ogni 8750 tick fa comparire il tipo
  // successivo, ciclando finche' non sono finiti). Le posizioni sono quelle
  // passate da `action_create_object` in quell'Alarm_4 (nessun nudge: quel
  // ramo del +21,-26 si applica solo su `match_easy`, mai vero su `match`).
  // R32_MAGHENE_SCHEDULE/R22_MAGHENE_SCHEDULE piu' sotto, dopo
  // CARMAKER_SCHEDULE, leggono queste chiavi nello stesso ordine del ciclo.

  honda21: {
    spawn: { x: 472, y: 1959 },
    life: 400,
    spr: "v_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 70, dir: 30, spd: 2, spr: "v_ad_as" },
      { at: 99, dir: 150, spd: 2 },
      { at: 108, dir: 150, spd: 3, spr: "v_as" },
      { at: 192, dir: 150, spd: 2, spr: "v_as_ad" },
      { at: 211, dir: 30, spd: 2 },
      { at: 230, dir: 30, spd: 3, spr: "v_ad" },
    ],
  },
  honda22: {
    spawn: { x: 966, y: 2008 },
    life: 421,
    spr: "c_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 205, dir: 30, spd: 2, spr: "c_ad_as" },
      { at: 224, dir: 150, spd: 2 },
      { at: 243, dir: 150, spd: 3, spr: "c_as" },
      { at: 313, dir: 150, spd: 2, spr: "c_as_ad" },
      { at: 328, dir: 30, spd: 2 },
      { at: 351, dir: 30, spd: 3, spr: "c_ad" },
    ],
  },
  honda23: {
    spawn: { x: 976, y: 1998 },
    life: 736,
    spr: "r_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 410, dir: 150, spd: 2, spr: "r_as_ad" },
      { at: 429, dir: 30, spd: 2 },
      { at: 448, dir: 30, spd: 3, spr: "r_ad" },
      { at: 528, dir: 30, spd: 2, spr: "r_ad_bd" },
      { at: 547, dir: 330, spd: 2 },
      { at: 566, dir: 330, spd: 3, spr: "r_bd" },
    ],
  },
  honda24: {
    spawn: { x: 2614, y: 1406 },
    life: 751,
    spr: "g_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 285, dir: 210, spd: 2, spr: "g_bs_as" },
      { at: 304, dir: 150, spd: 2 },
      { at: 323, dir: 150, spd: 3, spr: "g_as" },
      { at: 513, dir: 150, spd: 2, spr: "g_as_bs" },
      { at: 532, dir: 210, spd: 2 },
      { at: 551, dir: 210, spd: 3, spr: "g_bs" },
    ],
  },
  honda25: {
    spawn: { x: 135, y: 1222 },
    life: 294,
    spr: "p_bd",
    initial: { dir: 330, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 196, dir: 330, spd: 2, spr: "p_bd_ad" },
      { at: 215, dir: 30, spd: 2 },
      { at: 234, dir: 30, spd: 3, spr: "p_ad" },
    ],
  },
  honda21a: {
    spawn: { x: 472, y: 1959 },
    life: 400,
    spr: "g_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 70, dir: 30, spd: 2, spr: "g_ad_as" },
      { at: 99, dir: 150, spd: 2 },
      { at: 108, dir: 150, spd: 3, spr: "g_as" },
      { at: 192, dir: 150, spd: 2, spr: "g_as_ad" },
      { at: 211, dir: 30, spd: 2 },
      { at: 230, dir: 30, spd: 3, spr: "g_ad" },
    ],
  },
  honda22a: {
    spawn: { x: 966, y: 2008 },
    life: 421,
    spr: "p_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 205, dir: 30, spd: 2, spr: "p_ad_as" },
      { at: 224, dir: 150, spd: 2 },
      { at: 243, dir: 150, spd: 3, spr: "p_as" },
      { at: 313, dir: 150, spd: 2, spr: "p_as_ad" },
      { at: 328, dir: 30, spd: 2 },
      { at: 351, dir: 30, spd: 3, spr: "p_ad" },
    ],
  },
  honda23a: {
    spawn: { x: 976, y: 1998 },
    life: 736,
    spr: "g_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 410, dir: 150, spd: 2, spr: "g_as_ad" },
      { at: 429, dir: 30, spd: 2 },
      { at: 448, dir: 30, spd: 3, spr: "g_ad" },
      { at: 528, dir: 30, spd: 2, spr: "g_ad_bd" },
      { at: 547, dir: 330, spd: 2 },
      { at: 566, dir: 330, spd: 3, spr: "g_bd" },
    ],
  },
  honda24a: {
    spawn: { x: 2614, y: 1406 },
    life: 751,
    spr: "v_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 285, dir: 210, spd: 2, spr: "v_bs_as" },
      { at: 304, dir: 150, spd: 2 },
      { at: 323, dir: 150, spd: 3, spr: "v_as" },
      { at: 513, dir: 150, spd: 2, spr: "v_as_bs" },
      { at: 532, dir: 210, spd: 2 },
      { at: 551, dir: 210, spd: 3, spr: "v_bs" },
    ],
  },
  honda25a: {
    spawn: { x: 135, y: 1222 },
    life: 294,
    spr: "c_bd",
    initial: { dir: 330, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 196, dir: 330, spd: 2, spr: "c_bd_ad" },
      { at: 215, dir: 30, spd: 2 },
      { at: 234, dir: 30, spd: 3, spr: "c_ad" },
    ],
  },
  honda21b: {
    spawn: { x: 472, y: 1959 },
    life: 400,
    spr: "r_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 70, dir: 30, spd: 2, spr: "r_ad_as" },
      { at: 99, dir: 150, spd: 2 },
      { at: 108, dir: 150, spd: 3, spr: "r_as" },
      { at: 192, dir: 150, spd: 2, spr: "r_as_ad" },
      { at: 211, dir: 30, spd: 2 },
      { at: 230, dir: 30, spd: 3, spr: "r_ad" },
    ],
  },
  honda22b: {
    spawn: { x: 966, y: 2008 },
    life: 421,
    spr: "v_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 205, dir: 30, spd: 2, spr: "v_ad_as" },
      { at: 224, dir: 150, spd: 2 },
      { at: 243, dir: 150, spd: 3, spr: "v_as" },
      { at: 313, dir: 150, spd: 2, spr: "v_as_ad" },
      { at: 328, dir: 30, spd: 2 },
      { at: 351, dir: 30, spd: 3, spr: "v_ad" },
    ],
  },
  honda23b: {
    spawn: { x: 976, y: 1998 },
    life: 736,
    spr: "c_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 410, dir: 150, spd: 2, spr: "c_as_ad" },
      { at: 429, dir: 30, spd: 2 },
      { at: 448, dir: 30, spd: 3, spr: "c_ad" },
      { at: 528, dir: 30, spd: 2, spr: "c_ad_bd" },
      { at: 547, dir: 330, spd: 2 },
      { at: 566, dir: 330, spd: 3, spr: "c_bd" },
    ],
  },
  honda24b: {
    spawn: { x: 2614, y: 1406 },
    life: 751,
    spr: "r_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 285, dir: 210, spd: 2, spr: "r_bs_as" },
      { at: 304, dir: 150, spd: 2 },
      { at: 323, dir: 150, spd: 3, spr: "r_as" },
      { at: 513, dir: 150, spd: 2, spr: "r_as_bs" },
      { at: 532, dir: 210, spd: 2 },
      { at: 551, dir: 210, spd: 3, spr: "r_bs" },
    ],
  },
  honda25b: {
    spawn: { x: 135, y: 1222 },
    life: 294,
    spr: "g_bd",
    initial: { dir: 330, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 196, dir: 330, spd: 2, spr: "g_bd_ad" },
      { at: 215, dir: 30, spd: 2 },
      { at: 234, dir: 30, spd: 3, spr: "g_ad" },
    ],
  },
  honda31: {
    spawn: { x: 1909, y: 447 },
    life: 458,
    spr: "p_bd",
    initial: { dir: 330, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 300, dir: 330, spd: 2, spr: "p_bd_ad" },
      { at: 319, dir: 30, spd: 2 },
      { at: 338, dir: 30, spd: 3, spr: "p_ad" },
    ],
  },
  honda32y: {
    spawn: { x: 2713, y: 565 },
    life: 507,
    spr: "r_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 190, dir: 150, spd: 2, spr: "r_as_ad" },
      { at: 209, dir: 30, spd: 2 },
      { at: 228, dir: 30, spd: 3, spr: "r_ad" },
      { at: 299, dir: 30, spd: 2, spr: "r_ad_bd" },
      { at: 318, dir: 330, spd: 2 },
      { at: 337, dir: 330, spd: 3, spr: "r_bd" },
    ],
  },
  honda33: {
    spawn: { x: 2417, y: 755 },
    life: 421,
    spr: "v_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 85, dir: 30, spd: 2, spr: "v_ad_as" },
      { at: 104, dir: 150, spd: 2 },
      { at: 123, dir: 150, spd: 3, spr: "v_as" },
      { at: 308, dir: 150, spd: 2, spr: "v_as_bs" },
      { at: 332, dir: 210, spd: 2 },
      { at: 346, dir: 210, spd: 3, spr: "v_bs" },
    ],
  },
  honda34: {
    spawn: { x: 3251, y: 594 },
    life: 402,
    spr: "r_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 71, dir: 150, spd: 2, spr: "r_as_bs" },
      { at: 90, dir: 210, spd: 2 },
      { at: 109, dir: 210, spd: 3, spr: "r_bs" },
      { at: 294, dir: 210, spd: 2, spr: "r_bs_bd" },
      { at: 318, dir: 330, spd: 2 },
      { at: 332, dir: 330, spd: 3, spr: "r_bd" },
    ],
  },
  honda31a: {
    spawn: { x: 1909, y: 447 },
    life: 458,
    spr: "g_bd",
    initial: { dir: 330, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 300, dir: 330, spd: 2, spr: "g_bd_ad" },
      { at: 319, dir: 30, spd: 2 },
      { at: 338, dir: 30, spd: 3, spr: "g_ad" },
    ],
  },
  honda32a: {
    spawn: { x: 2713, y: 565 },
    life: 507,
    spr: "p_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 190, dir: 150, spd: 2, spr: "p_as_ad" },
      { at: 209, dir: 30, spd: 2 },
      { at: 228, dir: 30, spd: 3, spr: "p_ad" },
      { at: 299, dir: 30, spd: 2, spr: "p_ad_bd" },
      { at: 318, dir: 330, spd: 2 },
      { at: 337, dir: 330, spd: 3, spr: "p_bd" },
    ],
  },
  honda33a: {
    spawn: { x: 2417, y: 755 },
    life: 421,
    spr: "g_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 85, dir: 30, spd: 2, spr: "g_ad_as" },
      { at: 104, dir: 150, spd: 2 },
      { at: 123, dir: 150, spd: 3, spr: "g_as" },
      { at: 308, dir: 150, spd: 2, spr: "g_as_bs" },
      { at: 332, dir: 210, spd: 2 },
      { at: 346, dir: 210, spd: 3, spr: "g_bs" },
    ],
  },
  honda34a: {
    spawn: { x: 3251, y: 594 },
    life: 402,
    spr: "p_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 71, dir: 150, spd: 2, spr: "p_as_bs" },
      { at: 90, dir: 210, spd: 2 },
      { at: 109, dir: 210, spd: 3, spr: "p_bs" },
      { at: 294, dir: 210, spd: 2, spr: "p_bs_bd" },
      { at: 318, dir: 330, spd: 2 },
      { at: 332, dir: 330, spd: 3, spr: "p_bd" },
    ],
  },
  honda31b: {
    spawn: { x: 1909, y: 447 },
    life: 458,
    spr: "c_bd",
    initial: { dir: 330, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 300, dir: 330, spd: 2, spr: "c_bd_ad" },
      { at: 319, dir: 30, spd: 2 },
      { at: 338, dir: 30, spd: 3, spr: "c_ad" },
    ],
  },
  honda32b: {
    spawn: { x: 2713, y: 565 },
    life: 507,
    spr: "v_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 190, dir: 150, spd: 2, spr: "v_as_ad" },
      { at: 209, dir: 30, spd: 2 },
      { at: 228, dir: 30, spd: 3, spr: "v_ad" },
      { at: 299, dir: 30, spd: 2, spr: "v_ad_bd" },
      { at: 318, dir: 330, spd: 2 },
      { at: 337, dir: 330, spd: 3, spr: "v_bd" },
    ],
  },
  honda33b: {
    spawn: { x: 2417, y: 755 },
    life: 421,
    spr: "c_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 85, dir: 30, spd: 2, spr: "c_ad_as" },
      { at: 104, dir: 150, spd: 2 },
      { at: 123, dir: 150, spd: 3, spr: "c_as" },
      { at: 308, dir: 150, spd: 2, spr: "c_as_bs" },
      { at: 332, dir: 210, spd: 2 },
      { at: 346, dir: 210, spd: 3, spr: "c_bs" },
    ],
  },
  honda34b: {
    spawn: { x: 3251, y: 594 },
    life: 402,
    spr: "v_as",
    initial: { dir: 150, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 71, dir: 150, spd: 2, spr: "v_as_bs" },
      { at: 90, dir: 210, spd: 2 },
      { at: 109, dir: 210, spd: 3, spr: "v_bs" },
      { at: 294, dir: 210, spd: 2, spr: "v_bs_bd" },
      { at: 318, dir: 330, spd: 2 },
      { at: 332, dir: 330, spd: 3, spr: "v_bd" },
    ],
  },

  // ------------------------------------------------------------------
  // honda_br1/br11/br12/br13/br2/br21/br22 (bridge_des), honda_brr1/brr11/
  // brr12/brr2/brr21 (bridge_des2), honda_bl1 (bridge_sin): il traffico dei
  // tre ponti levatoi (game/src/bridges.js) — ucciso quando il ponte si
  // apre, fatto ripartire (con un tipo scelto a dado, vedi bridges.js)
  // quando si richiude. Stesso schema honda3..9/21..34 sopra. Le posizioni
  // "leaf" (br11/br12/br13/br21/br22/brr11/brr12/brr21) sono lette dal
  // punto in cui il genitore le crea (`action_create_object(honda_br11, 0,
  // 0)`, relativo) PRIMA di un eventuale `action_move_to` proprio (mai
  // raggiunto se il dado sceglie una foglia) — non le posizioni a cui il
  // genitore stesso si sposterebbe se sopravvivesse al dado.

  honda_br1: {
    spawn: { x: 135, y: 1222 },
    life: 443,
    spr: "v_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 285, dir: 210, spd: 2, spr: "v_bs_bd" },
      { at: 304, dir: 330, spd: 2 },
      { at: 323, dir: 330, spd: 3, spr: "v_bd" },
      { at: 612, dir: 30, spd: 2 },
    ],
  },
  honda_br11: {
    spawn: { x: 135, y: 1222 },
    life: 443,
    spr: "r_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 285, dir: 210, spd: 2, spr: "r_bs_bd" },
      { at: 304, dir: 330, spd: 2 },
      { at: 323, dir: 330, spd: 3, spr: "r_bd" },
      { at: 612, dir: 30, spd: 2 },
    ],
  },
  honda_br12: {
    spawn: { x: 135, y: 1222 },
    life: 443,
    spr: "g_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 285, dir: 210, spd: 2, spr: "g_bs_bd" },
      { at: 304, dir: 330, spd: 2 },
      { at: 323, dir: 330, spd: 3, spr: "g_bd" },
      { at: 612, dir: 30, spd: 2 },
    ],
  },
  honda_br13: {
    spawn: { x: 135, y: 1222 },
    life: 443,
    spr: "c_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 285, dir: 210, spd: 2, spr: "c_bs_bd" },
      { at: 304, dir: 330, spd: 2 },
      { at: 323, dir: 330, spd: 3, spr: "c_bd" },
      { at: 612, dir: 30, spd: 2 },
    ],
  },
  honda_br2: {
    spawn: { x: 228, y: 1257 },
    life: 399,
    spr: "p_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 205, dir: 30, spd: 2, spr: "p_ad_as" },
      { at: 224, dir: 150, spd: 2 },
      { at: 243, dir: 150, spd: 3, spr: "p_as" },
      { at: 291, dir: 150, spd: 2, spr: "p_as_ad" },
      { at: 306, dir: 30, spd: 2 },
      { at: 329, dir: 30, spd: 3, spr: "p_ad" },
    ],
  },
  honda_br21: {
    spawn: { x: 135, y: 1222 },
    life: 399,
    spr: "v_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 205, dir: 30, spd: 2, spr: "v_ad_as" },
      { at: 224, dir: 150, spd: 2 },
      { at: 243, dir: 150, spd: 3, spr: "v_as" },
      { at: 291, dir: 150, spd: 2, spr: "v_as_ad" },
      { at: 306, dir: 30, spd: 2 },
      { at: 329, dir: 30, spd: 3, spr: "v_ad" },
    ],
  },
  honda_br22: {
    spawn: { x: 135, y: 1222 },
    life: 399,
    spr: "r_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 205, dir: 30, spd: 2, spr: "r_ad_as" },
      { at: 224, dir: 150, spd: 2 },
      { at: 243, dir: 150, spd: 3, spr: "r_as" },
      { at: 291, dir: 150, spd: 2, spr: "r_as_ad" },
      { at: 306, dir: 30, spd: 2 },
      { at: 329, dir: 30, spd: 3, spr: "r_ad" },
    ],
  },
  // [Bug corretto, segnalato dall'autore: "questa macchina vola di fianco
  // al ponte invece di attraversarlo"] Lo spawn di tutta la famiglia
  // (honda_brr1/11/12, stessa posizione per tutti e tre — sopra) cadeva
  // ~40px PRIMA del vero impalcato del ponte, ancora dentro il ventaglio
  // di cavi della torre vicina (verificato ritagliando "bridr1mo" frame
  // chiuso, data/sprites.json, dalla texture vera): l'auto nasceva gia'
  // sospesa a mezz'aria accanto al ponte, non sopra di lui, e ci restava
  // per tutta la sua vita dato che questa famiglia non svolta mai (Alarm_2
  // del decompilato non e' mai armato — [C] fedele, la retta e' quella
  // giusta, solo il PUNTO di partenza era spostato). `y` spostato di +42
  // per cadere sull'impalcato vero, alla stessa quota della corsia
  // percorsa in senso opposto da honda_brr2/21 (parallela, non piu'
  // incrociata).
  honda_brr1: {
    spawn: { x: 2916, y: 1069 },
    life: 427,
    spr: "g_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
    ],
  },
  honda_brr11: {
    spawn: { x: 2916, y: 1069 },  // vedi il commento su honda_brr1 sopra
    life: 427,
    spr: "c_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
    ],
  },
  honda_brr12: {
    spawn: { x: 2916, y: 1069 },  // vedi il commento su honda_brr1 sopra
    life: 427,
    spr: "v_bs",
    initial: { dir: 210, spd: 3 },
    depthOffset: 16,
    schedule: [
    ],
  },
  honda_brr2: {
    spawn: { x: 2368, y: 1257 },
    life: 339,
    spr: "p_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 165, dir: 30, spd: 2, spr: "p_ad_as" },
      { at: 184, dir: 150, spd: 2 },
      { at: 203, dir: 150, spd: 3, spr: "p_as" },
      { at: 231, dir: 150, spd: 2, spr: "p_as_ad" },
      { at: 246, dir: 30, spd: 2 },
      { at: 269, dir: 30, spd: 3, spr: "p_ad" },
    ],
  },
  honda_brr21: {
    spawn: { x: 135, y: 1222 },
    life: 339,
    spr: "g_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 165, dir: 30, spd: 2, spr: "g_ad_as" },
      { at: 184, dir: 150, spd: 2 },
      { at: 203, dir: 150, spd: 3, spr: "g_as" },
      { at: 231, dir: 150, spd: 2, spr: "g_as_ad" },
      { at: 246, dir: 30, spd: 2 },
      { at: 269, dir: 30, spd: 3, spr: "g_ad" },
    ],
  },
  honda_bl1: {
    spawn: { x: 1705, y: 1444 },
    life: 505,
    spr: "v_ad",
    initial: { dir: 30, spd: 3 },
    depthOffset: 16,
    schedule: [
      { at: 67, dir: 30, spd: 2, spr: "v_ad_as" },
      { at: 86, dir: 150, spd: 2 },
      { at: 105, dir: 150, spd: 3, spr: "v_as" },
    ],
  },
};

// [C] r12/Create.gml: `action_create_object(carmaker, 0, 0)`, incondizionato
// — carmaker esiste in OGNI room (non solo `match`), quindi anche in
// match_easy. carmaker/Create.gml arma un alarm ogni 3600 tick (60s) che
// fa comparire un tipo nuovo alla volta (carmaker/Alarm_0.gml, `made` da 2
// a 8): qui la stessa progressione come tabella, letta da main.js invece
// che simulare l'oggetto controller stesso.
export const CARMAKER_SCHEDULE = [
  { at: 3600, type: "honda3" },
  { at: 7200, type: "honda4" },
  { at: 10800, type: "honda5" },
  { at: 14400, type: "honda6" },
  { at: 18000, type: "honda7" },
  { at: 21600, type: "honda8" },
  { at: 25200, type: "honda9" },
].map((e) => ({ ...e, at: e.at * TICK }));   // tick -> secondi, comodo per confrontarlo con un cronometro in secondi

// [C] r32|r22/Alarm_4.gml ("maghene"): stesso schema di CARMAKER_SCHEDULE
// sopra ma il timer parte da quando la piattaforma stessa nasce (game/src/
// platform.js, stepFaroChain()), non dal boot della room — `r32`/`r22` non
// esistono finche' il rispettivo attracco (dockersig1/dockersig3) non
// finisce. Il primo tipo di ciascuna lista (honda21/honda31) non e' qui:
// e' creato direttamente da r32|r22/Create.gml, non dal ciclo di Alarm_4 —
// platform.js lo spawna a parte, nello stesso istante in cui la piattaforma
// appare.
export const R32_MAGHENE_SCHEDULE = [
  "honda22", "honda23", "honda24", "honda25", "honda21a", "honda22a", "honda23a",
  "honda24a", "honda25a", "honda21b", "honda22b", "honda23b", "honda24b", "honda25b",
].map((type, i) => ({ type, at: (i + 1) * 8750 * TICK }));
export const R22_MAGHENE_SCHEDULE = [
  "honda32y", "honda33", "honda34", "honda31a", "honda32a", "honda33a", "honda34a",
  "honda31b", "honda32b", "honda33b", "honda34b",
].map((type, i) => ({ type, at: (i + 1) * 8750 * TICK }));

// [C] entrambe: `action_sprite_color(16366009, 1)` in Create, solo se e'
// notte nell'istante esatto in cui l'istanza nasce (non viene mai
// riaggiornato durante la vita del veicolo, nemmeno attraversando
// giorno/notte) — una tinta blu lunare, applicata una tantum. GameMaker
// codifica i colori come R + G*256 + B*65536 (byte order opposto al nostro
// 0xRRGGBB), quindi 16366009 non e' 0x16366009: va scomposto e
// riimpacchettato, non letto direttamente come esadecimale.
// Esportata: game/src/platform.js la riusa per n_cluster1 (le nuvole
// dell'animazione di espansione piattaforma), stesso identico
// `action_sprite_color(16366009, 1)` — [C] n_cluster1/Create.gml.
export const NIGHT_TINT = (() => {
  const v = 16366009, r = v & 0xff, g = (v >> 8) & 0xff, b = (v >> 16) & 0xff;
  return (r << 16) | (g << 8) | b;                    // 0xb9b9f9
})();

function makeCar(type, night, pos) {
  const def = CAR_TYPES[type];
  const p = pos ?? def.spawn;
  return {
    type, x: p.x, y: p.y,
    dir: def.initial.dir, spd: def.initial.spd, spr: def.spr,
    t: 0, schedIdx: 0, depth: -p.y - def.depthOffset,
    tint: night ? NIGHT_TINT : 0xffffff,
    frame: 0,   // tick trascorsi da quando `spr` e' stato scelto l'ultima volta
  };
}

/** Prima comparsa di un'auto (a inizio partita per honda_facile_1/2, o
 * quando `carmaker` la fa arrivare per honda3..9): usa `firstSpawn` se il
 * tipo lo dichiara (solo honda4, vedi sopra), altrimenti la stessa
 * posizione dei rientri successivi. */
export function spawnCar(type, night) {
  const def = CAR_TYPES[type];
  return makeCar(type, night, def.firstSpawn ?? def.spawn);
}

/**
 * Avanza tutte le auto di `dt` secondi: applica le fasi di `schedule` che
 * sono state superate, integra la posizione dalla direzione/velocita'
 * corrente (stessa formula di GameMaker per action_set_motion: hspeed =
 * speed*cos(dir), vspeed = -speed*sin(dir), `speed` in px/tick), e a fine
 * vita la ricrea da capo se c'e' ancora olio (altrimenti sparisce per
 * sempre — [C] `with (r12) { oil > 0 }` prima di ricreare, poi
 * `action_kill_object()` comunque).
 *
 * [C] Le svolte animano per davvero: `honda_facile_2/Alarm_0.gml` non si
 * limita a `action_sprite_set(c_ad_as, 0, 1)` — quell'ultimo `1` e'
 * `image_speed`, un frame in avanti ad ogni Step, ed e' per questo che
 * l'alarm successivo (che passa allo sprite fisso `c_as`) e' armato esattamente
 * al numero di frame dello sprite di svolta (38 per `c_ad_as`, STUDIO.md):
 * l'animazione finisce da sola proprio quando arriva il momento di cambiare
 * sprite. Un dettaglio non ovvio, verificato nel decompilato: un secondo
 * alarm (Alarm_1) puo' scattare A META' di quell'animazione e cambiare
 * SOLO la direzione (`action_set_motion`, senza `action_sprite_set`) — la
 * svolta continua ad animarsi senza interruzioni, la nuova direzione si
 * applica alla posa che sta gia' scorrendo. Qui e' lo stesso: `c.frame` conta
 * i tick da quando `spr` e' stato scelto l'ultima volta (non da quando e'
 * iniziata la fase corrente di `schedule` — le due cose non coincidono
 * quando una fase cambia solo `dir`), azzerato solo quando una fase
 * successiva porta un `spr` nuovo. `frameFor()` in main.js poi ritaglia
 * l'indice sull'ultimo frame disponibile: per gli sprite fissi (una posa
 * sola) equivale a restare sempre al frame 0, nessun caso speciale da
 * gestire qui.
 */
export function stepCars(cars, dt, r12, night) {
  for (let i = cars.length - 1; i >= 0; i--) {
    const c = cars[i];
    const def = CAR_TYPES[c.type];
    c.t += dt;
    let spriteChanged = false;
    while (c.schedIdx < def.schedule.length && c.t >= def.schedule[c.schedIdx].at * TICK) {
      const step = def.schedule[c.schedIdx++];
      c.dir = step.dir; c.spd = step.spd;
      if (step.spr) { c.spr = step.spr; spriteChanged = true; }
    }
    c.frame = spriteChanged ? 0 : c.frame + dt / TICK;
    const rad = (c.dir * Math.PI) / 180;
    const pxPerSec = c.spd * 60;   // "speed" e' px/tick a room_speed 60
    c.x += Math.cos(rad) * pxPerSec * dt;
    c.y -= Math.sin(rad) * pxPerSec * dt;
    // [C] .../Step.gml: depth = -y - N, ricalcolato ogni Step perche' l'auto
    // si muove (a differenza di edifici/alberi, fermi dopo Create) — N e'
    // 2 per honda_facile_1/2, 16 per honda3..9 (def.depthOffset), sempre
    // abbastanza da passare davanti a tutto il resto a parita' di y.
    c.depth = -c.y - def.depthOffset;
    if (c.t >= def.life * TICK) {
      cars.splice(i, 1);
      if (r12.oil > 0) cars.push(makeCar(c.type, night));
    }
  }
}
