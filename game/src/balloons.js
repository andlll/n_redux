// Le mongolfiere — src/objects/monvo|monvo_giga|monbo|mongo|monviolo (risorse),
// monspi (spia) e mon_bil|mon_bbil (pacco di cantiere), mai lette finora
// (STUDIO.md non le cita). Tre famiglie distinte che condividono solo la
// stessa diagonale di volo (direzione 30°, la stessa di nuvole/uccelli in
// atmosphere.js) e la stessa idea "nasce fuori mappa, vola, se ne va".
//
// 1) Risorse: monvo (verde, petrolio), monvo_giga (verde gigante, molto piu'
//    petrolio), monbo (blu/petrolio, sprite "monss", denaro), mongo
//    (giallo/oliva, energia), monviolo (viola, cristalli). Non sono cliccabili
//    (nessun evento Mouse nel decompilato): volano per 3600 tick (60s) e alla
//    fine — o se colpite da un fulmine durante una tempesta, STUDIO.md "le
//    tempeste diventano reali" — lasciano cadere una cassa di risorse
//    (bar-us/-bluss/-gia/-viola/-us_giga), quella si' cliccabile (tap invece
//    di Mouse_MouseEnter, coerente con l'input touch-first di tutto il resto
//    del motore — STUDIO.md §7), per 700 tick prima di sparire da sola.
// 2) Spia: monspi (rossa). Stessa diagonale, nessun loot: dopo 750 tick
//    "riferisce" — alza r12.onda/ondan e fa comparire un avviso ATTACK
//    INCOMING (src/objects/aincom) — invece di sparire e basta. Sbloccata
//    solo dopo ~8 minuti di partita (r12/Create.gml: action_set_alarm(29000,8)
//    arma r12.spy). Se colpita da un fulmine prima di allora non succede
//    niente (nessun Destroy nel decompilato, a differenza delle risorse).
//    `recogn` (lo stesso ruolo ma un aereo da ricognizione, non una
//    mongolfiera — sprite "reconspr") esiste nel decompilato con la stessa
//    logica ma resta fuori: non e' una mongolfiera, e' un gap dichiarato.
// 3) Pacco di cantiere: mon_bil/mon_bbil (src/objects/placeholder/
//    Mouse_LeftReleased.gml). Non nasce a intervalli: un edificio piazzato
//    ne fa comparire una, che vola verso il cantiere per 225 tick portando
//    una cassa, la sgancia (mon_box, cade e sparisce), poi si svuota e
//    fluttua via verso l'alto (una vera action_set_gravity(90, 0.1):
//    l'originale la fa "alleggerire" e accelerare verso l'alto una volta
//    consegnato il pacco) per altri 1000 tick prima di sparire. Solo
//    `mon_bil` e' quella che l'originale usa per `casa` (selec==1),
//    `industria` (selec==2), `missile` (selec==3), `club` (selec==60),
//    `solare` (selec==61), `gatling` (selec==62), `villa` (selec==63) e
//    `monum` (selec==71) — otto dei piazzabili dal giocatore, tutti tranne
//    `parco` (selec==7, non crea nessun pallone nel decompilato). Solo
//    `laser` (selec==5) e `banca` (selec==72) creano `mon_bbil`, la
//    variante piu' grande — entrambe cablate (`spawnConstructionBalloon(x,
//    y, big)`, main.js passa `big` per quei due soli tipi).
//
// [C] = letto nel decompilato. [I] = semplificato deliberatamente (dettagliato
// punto per punto sotto).

const TICK = 1 / 60;
const DIR = (30 * Math.PI) / 180;              // [C] action_set_motion(30, ...) per tutta la famiglia risorse/spia
const COS30 = Math.cos(DIR), SIN30 = Math.sin(DIR);
const STORM_CHECK = 57 * TICK;                 // [C] Alarm_5: action_set_alarm(57, 5)

function dice(n) { return Math.random() < 1 / n; }

// --------------------------------------------------------- risorse + spia
// [C] posizione di nascita: irandom_range(380, 3120) nel decompilato, ma
// quel range e' tarato per `match` (3900x2090) — qui usiamo lo stesso range
// piu' piccolo che l'originale stesso usa per il ramo "mappa facile" di
// monspi/recogn (action_if_number(162, 0, 0), 380..1620), esteso per analogia
// anche alle risorse: match_easy e' alta 1086px, 380..1620 e' il range reale
// piu' vicino a quella dimensione fra i due scritti a mano nel decompilato.
const SPAWN_Y = [380, 1620];
const SPAWN_X = -170;                          // [C] action_create_object(mon*, -170, ...)

export const BALLOON_TYPES = {
  monvo: {          // [C] verde — sempre creata, nessun dado (src/objects/monvo)
    spr: "monv", life: 3600, speedMin: 3, speedMax: 7, stormDice: 68,
    loot: { spr: "monv_bar", key: "oil", amount: () => 700 },            // [C] barus/Mouse_MouseEnter.gml
  },
  monvo_giga: {     // [C] verde gigante — dado 1/15, solo se chies.level>=2
    spr: "monv_giga", life: 3600, speedMin: 5, speedMax: 9, stormDice: 97,
    loot: { spr: "monv_giga_bar", key: "oil", amount: () => 2300 },      // [C] barus_giga/Mouse_MouseEnter.gml
  },
  monbo: {          // [C] blu (sprite "monss") — dado 1/13
    spr: "monss", life: 3600, speedMin: 3, speedMax: 7, stormDice: 68,
    loot: { spr: "monss_bar", key: "mon", amount: () => 700 },           // [C] barbluss/Mouse_MouseEnter.gml
  },
  mongo: {          // [C] giallo/oliva — dado 1/10
    spr: "mong", life: 3600, speedMin: 3, speedMax: 7, stormDice: 68,
    loot: { spr: "mong_bar", key: "ele", amount: () => 1100 },           // [C] bargia/Mouse_MouseEnter.gml
  },
  monviolo: {       // [C] viola — dado 1/18, solo se chies.level>=2
    spr: "monviola", life: 3600, speedMin: 6, speedMax: 10, stormDice: 190,
    loot: { spr: "monviola_bar", key: "crys", amount: () => 1 + ((Math.random() * 3) | 0) },  // [C] irandom_range(1,3)
  },
  // [Bug corretto, richiesto dall'autore: "smorza un po' la frequenza degli
  // aerei/palloni spia e falli andare piu' lenti"] speedMin/speedMax
  // originali (**[C]**) erano 4/7 — [I] ridotti per una diagonale piu'
  // placida, la frequenza vera si tocca in stepBalloonSpawner() sotto
  // (spyDice).
  monspi: {         // [C] rossa — spia, nessun loot (vedi sopra)
    spr: "monr", life: 750, speedMin: 3, speedMax: 5, stormDice: 68,
    isSpy: true,
  },
  // [C] recogn/Create.gml: la "seconda spia" — un aereo da ricognizione,
  // non una mongolfiera (sprite "reconspr", verificato visivamente), ma
  // riferisce esattamente come monspi (Alarm_0 identico: alza onda/bombolo/
  // dirox, mostra ATTACK INCOMING — isSpy sotto lo tratta allo stesso modo
  // in stepBalloons()). Due differenze reali: vita piu' corta (550 contro
  // 750 tick) e velocita' a dado fra due valori fissi invece di un range
  // continuo (`speed` sotto, una funzione invece di `speedMin`/`speedMax` —
  // stesso schema di `dir` sotto, generalizzato).
  //
  // [Bug corretto, segnalato dall'autore: "gli aerei spia si muovono in
  // orizzontale"] `action_set_motion(dir, spd)` prende la DIREZIONE per
  // prima e la VELOCITA' per seconda (STUDIO.md, stesso ordine gia' usato
  // ovunque in questo motore — es. R32_MOTORS/threats.js) — `action_set_
  // motion(30, 11)`/`action_set_motion(30, 13)` di questo Create.gml
  // significano quindi "direzione 30°, velocita' 11 o 13", non "velocita'
  // 30, direzione 11 o 13" come una lettura precedente aveva scambiato:
  // `recogn` volava quasi in orizzontale (11°/13°, angoli vicini a "dritto
  // a est/ovest") a velocita' fissa 30 invece della STESSA diagonale a 30°
  // di tutta la famiglia risorse/spia (`DIR` sotto), con solo la velocita'
  // a dado fra 11 e 13 — la sua unica vera differenza di rotta rispetto al
  // resto della famiglia. Rimosso `dir` (recogn ora usa la stessa diagonale
  // di default di `spawnBalloon()` sotto, nessun override serve piu').
  // [Bug corretto, richiesto dall'autore, stesso rallentamento di monspi
  // sopra] 11/13 originali (**[C]**).
  recogn: {
    spr: "reconspr", life: 550, stormDice: 68, isSpy: true,
    speed: () => (dice(2) ? 8 : 10),
  },
};

const LOOT_LIFE = 700 * TICK;                  // [C] bar*/Alarm_0.gml: action_set_alarm(700, 0)
const LOOT_FALL_SPEED = 4;                     // [C] bar*/Create.gml: action_move("010000000", 4)
export const ALERT_DURATION = 4;               // [C] aincom/Create.gml: action_set_alarm(240, 0), 240 tick = 4s

const SPAWN_PERIOD = 300 * TICK;               // [C] r12/Alarm_1.gml: action_set_alarm(300, 1)
const SPY_UNLOCK_T = 29000 * TICK;             // [C] r12/Create.gml: action_set_alarm(29000, 8) -> spy = 1
// [Nuova funzionalita', richiesta dall'autore: "per evitare che due
// mongolfiere/aerei spia (rossi) passino troppo vicini fra loro, dopo il
// passaggio di una mettiamo un cooldown di due minuti prima di riattivare
// il dado"] Puramente nostro, nessun equivalente nel decompilato — vedi
// `r12.spyCooldownT` in stepBalloonSpawner() sotto.
const SPY_COOLDOWN = 120;

function maxChiesLevel(buildings) {
  let lvl = 0;
  for (const b of buildings) if (b.type === "chies") lvl = Math.max(lvl, b.level);
  return lvl;
}

export function spawnBalloon(type) {
  const def = BALLOON_TYPES[type];
  // `dir` (nessun tipo lo usa piu' — vedi il commento su `recogn` sopra):
  // rotta scelta a dado invece dei 30° fissi di tutta la famiglia
  // risorse/spia. cos/sin persistiti sull'istanza invece di ricalcolati
  // ogni frame da stepBalloons().
  const rad = ((def.dir ? def.dir() : 30) * Math.PI) / 180;
  // `speed` puo' essere un numero fisso o una funzione (recogn sopra: dado
  // fra due valori discreti, non un range continuo) — `speedMin`/`speedMax`
  // restano il fallback per ogni altro tipo (range continuo, irandom_range).
  const spd = typeof def.speed === "function" ? def.speed()
    : def.speed ?? (def.speedMin + Math.random() * (def.speedMax - def.speedMin));
  return {
    type, x: SPAWN_X, y: SPAWN_Y[0] + Math.random() * (SPAWN_Y[1] - SPAWN_Y[0]),
    spd,
    t: 0, stormT: 0, spr: def.spr, depth: -3990,   // [C] Create.gml: depth = -3990 (fisso, sempre davanti al mondo)
    cos: Math.cos(rad), sin: Math.sin(rad),
  };
}

// Esportata: game/src/projectiles.js la riusa per far cadere la cassa
// anche quando una mongolfiera viene colpita da un razzo invece di
// scadere/fulminata (STUDIO.md "il lanciarazzi": monvo|monvo_giga|monbo|
// mongo|monviolo/Destroy.gml crea la cassa a prescindere da come muore).
export function spawnLoot(lootDef, x, y) {
  return { spr: lootDef.spr, key: lootDef.key, amount: lootDef.amount(), x, y, t: 0, depth: -4000 };
}

/**
 * Il "regista" delle mongolfiere di risorse/spia — equivalente di
 * `r12/Alarm_1.gml` (ogni 300 tick) + il timer che sblocca `r12.spy` dopo
 * 29000 tick (`r12/Create.gml` Alarm_8). Il decadimento di `r12.ondan` (e
 * la nascita degli `air` che rappresenta) vive in game/src/threats.js
 * (`stepThreatSpawner`) — qui `ondan` viene solo letto, per sospendere le
 * nuove mongolfiere mentre un'ondata di minacce vere e' attiva ([C]
 * r12/Alarm_1.gml: `if (!(ondan > 0))`).
 *
 * [I] Il gate `action_if_number(160, 0, 0)` che nel decompilato precede
 * `monviolo` non e' riprodotto (un flag globale non identificato, STUDIO.md
 * "cosa non so ancora"): qui `monviolo` dipende solo dal livello di chies,
 * come `monvo_giga` che nello stesso Alarm_1 non ha nessun gate simile.
 *
 * [C] Riletto da zero (una nota precedente usava `r12.hap === r12.pop`,
 * un'uguaglianza quasi impossibile — sbagliata su due punti): l'operatore
 * vero in `r12/Alarm_1.gml` e' 4 ("`>=`", non "=="), e ora che `hap` e'
 * davvero aggiornato (industria/casa/parco/club/solare/museo/monum/banca)
 * puo' succedere per davvero, non solo sulla carta. Quando `hap>=pop`
 * (citta' "felice") la spia/ricognizione ha una probabilita' PIU' BASSA
 * (dado 1/17 invece di 1/2) — la lettura opposta di quanto ci si
 * aspetterebbe, ma e' cosi' che il decompilato lo scrive. **[C]** Il tipo
 * dipende dal livello di `chies`, mai letto prima: `monspi` mentre
 * `chies.level<3`, `recogn` (sopra) una volta che `chies.level===3` — nel
 * decompilato i due controlli sono `level<3`/`level==3` scritti uno dopo
 * l'altro sullo stesso valore letto due volte, non mutuamente esclusivi
 * per costruzione: qui il secondo (`chiesLevel === 3`) e' gia' l'unico
 * caso restante una volta escluso `<3`, dato che 3 e' il livello massimo
 * di `chies` in questo motore (STUDIO.md: l'originale arriva a un "livello
 * 4" interno mai replicato — un dettaglio di numerazione, non un livello
 * di gioco in piu').
 */
export function stepBalloonSpawner(r12, balloons, dt, buildings) {
  r12.spyT = (r12.spyT ?? 0) + dt;
  // [Bug corretto, segnalato dall'autore: "il grattacielo non blocca gli
  // aerei spia/gli attacchi"] **[C]** `r12/Create.gml: action_set_alarm
  // (29000, 8)` e' un vero ALARM di GameMaker: scatta UNA volta sola e non
  // si riarma da solo (nessun `action_set_alarm` dentro l'handler
  // dell'alarm[8], mai letto). Il guard `!r12.spy` qui sotto imitava quel
  // "una volta sola" leggendo lo STESSO flag che poi viene usato (ed
  // eventualmente azzerato dal grattacielo, buildings.js/stepConsumption:
  // "un grattacielo finito blocca le mongolfiere spia per sempre") — ma
  // una volta che `r12.spyT` supera la soglia resta sopra per sempre
  // (non decade mai), quindi ad ogni frame in cui qualcos'altro rimette
  // `r12.spy` a 0 (esattamente il grattacielo), questo `if` lo un-blocca
  // di nuovo nello stesso frame prima ancora che il resto del gioco possa
  // accorgersene: il blocco del grattacielo diventava un no-op silenzioso
  // dopo il primo sblocco. `r12.spyUnlockFired` e' il vero "e' gia'
  // scattato l'alarm" (mai piu' toccato dopo, indipendente da chi azzera
  // `r12.spy` in seguito) — lo sblocco resta quindi permanente ESATTAMENTE
  // una volta, e il grattacielo puo' davvero tenere `r12.spy` a 0 per
  // sempre da quel momento in poi.
  if (!r12.spyUnlockFired && r12.spyT >= SPY_UNLOCK_T) { r12.spy = 1; r12.spyUnlockFired = true; }   // [C]

  // [Nuova funzionalita', richiesta dall'autore] Cooldown reale (`dt`, non
  // tick di spawn — decade ad OGNI frame, indipendente dal ciclo di 300
  // tick sotto) fra un monspi/recogn e il successivo: azzerato a
  // SPY_COOLDOWN ogni volta che uno dei due nasce davvero (sotto), il dado
  // della spia (`spyDice`, sotto) resta spento finche' non e' tornato a
  // zero. Prima di questo, il dado 1/4 girava ogni 300 tick (5s)
  // indipendentemente da quanto a lungo un monspi/recogn precedente fosse
  // ancora in volo (vita 550-750 tick, 9-12.5s): potevano nascere due spie
  // ravvicinate nel tempo e quindi vicine nello spazio (stessa diagonale
  // fissa, stessa x di nascita) — segnalato dall'autore.
  r12.spyCooldownT = Math.max(0, (r12.spyCooldownT ?? 0) - dt);

  // ondan decade e fa nascere le minacce vere in game/src/threats.js
  // (stepThreatSpawner) — non qui: decadere e "far nascere un air" sono
  // la stessa cosa nel decompilato (r12/Alarm_4.gml), leggerlo/scriverlo
  // in due punti diversi con effetti diversi avrebbe voluto dire duplicare
  // quella logica o disallinearla. Qui `ondan` viene solo LETTO, per
  // sospendere le nuove nascite di mongolfiere mentre un'ondata e' attiva.
  r12.balloonSpawnT = (r12.balloonSpawnT ?? 0) + dt;
  while (r12.balloonSpawnT >= SPAWN_PERIOD) {
    r12.balloonSpawnT -= SPAWN_PERIOD;
    if ((r12.ondan ?? 0) > 0) continue;   // [C] if (!(ondan > 0)) — un'ondata attiva sospende tutte le nascite

    balloons.push(spawnBalloon("monvo"));                          // [C] sempre
    if (dice(10)) balloons.push(spawnBalloon("mongo"));            // [C]
    if (dice(13)) balloons.push(spawnBalloon("monbo"));            // [C]

    const chiesLevel = maxChiesLevel(buildings);
    if (chiesLevel >= 3 && dice(2)) balloons.push(spawnBalloon("monvo"));   // [C]
    if (chiesLevel >= 2) {
      if (dice(18)) balloons.push(spawnBalloon("monviolo"));       // [C] (gate 160 semplificato, vedi sopra)
      if (dice(15)) balloons.push(spawnBalloon("monvo_giga"));     // [C]
    }
    // `r12.spyCooldownT` (sopra): il dado della spia non gira nemmeno finche'
    // il cooldown non e' sceso a zero, qualunque sia l'esito che avrebbe
    // avuto — vedi il commento su di lui, sopra.
    if (r12.spy && r12.spyCooldownT <= 0) {
      const rare = r12.hap >= r12.pop;   // [C] operatore 4, non ==: vedi il commento sopra
      // [Bug corretto, richiesto dall'autore: "smorza un po' la frequenza
      // degli aerei/palloni spia"] 17/2 originali (**[C]**) — [I] entrambi
      // dimezzati (dado piu' alto = meno probabile, dice() sopra) per uno
      // stillicidio piu' rado di monspi/recogn, e quindi delle ondate vere
      // che innescano (game/src/threats.js, onda/bombn/diron).
      const spyDice = rare ? 30 : 4;
      // [C] r12/Alarm_1.gml: monspi (mongolfiera spia) mentre chies non e'
      // ancora al livello massimo, recogn (aereo da ricognizione, sopra)
      // una volta che lo e' — mai insieme, stesso dado in entrambi i rami.
      // Ogni spawn vero riarma `r12.spyCooldownT` a SPY_COOLDOWN (sopra).
      if (chiesLevel < 3) {
        if (dice(spyDice)) { balloons.push(spawnBalloon("monspi")); r12.spyCooldownT = SPY_COOLDOWN; }
      } else if (dice(spyDice)) {
        balloons.push(spawnBalloon("recogn")); r12.spyCooldownT = SPY_COOLDOWN;
      }
    }
  }
}

/**
 * Avanza tutte le mongolfiere di risorse/spia (e `recogn`, la "spia
 * aerea" — STUDIO.md, non una mongolfiera ma riusa lo stesso array/step):
 * volano lungo la propria rotta (`b.cos`/`b.sin`, scelta a spawn da
 * spawnBalloon() — 30° per tutta la famiglia risorse/spia, 11°/13° a dado
 * solo per recogn), rischiano un fulmine durante una tempesta vera
 * (STUDIO.md "le tempeste diventano reali", stesso schema di
 * `stepStormDamage` in buildings.js), e a fine vita lasciano una cassa di
 * risorse — anche se la fine e' un fulmine: nel decompilato `action_kill_
 * object()` fa comunque scattare il Destroy che crea la cassa. La sola
 * eccezione e' la spia: nessun Destroy nel decompilato, quindi un fulmine la
 * cancella senza conseguenze, mentre arrivare in fondo alla propria vita
 * (750 tick) e' la sua VERA riuscita — alza `r12.onda`/`ondan` e innesca
 * l'avviso (`r12.alertT`, disegnato in main.js come il banner "ATTACK
 * INCOMING" di src/objects/aincom).
 */
export function stepBalloons(balloons, loot, dt, r12, onStruck) {
  for (let i = balloons.length - 1; i >= 0; i--) {
    const b = balloons[i];
    const def = BALLOON_TYPES[b.type];
    b.t += dt;
    const pxPerSec = b.spd * 60;
    b.x += b.cos * pxPerSec * dt;
    b.y -= b.sin * pxPerSec * dt;

    let struck = false;
    if (r12.storm) {
      b.stormT += dt;
      while (b.stormT >= STORM_CHECK) {
        b.stormT -= STORM_CHECK;
        if (dice(def.stormDice)) { struck = true; break; }
      }
    }

    if (struck) {
      balloons.splice(i, 1);
      // [C] monvo|mongo|monbo|monviolo|monspi|recogn/Alarm_5.gml creano
      // sempre "thunder" (il fulmine stesso, cosmetico puro — stessa
      // scelta gia' fatta per il danno da fulmine degli edifici,
      // buildings.js stepStormDamage) + "esplo" PRIMA di uccidersi: senza
      // nessun effetto qui la mongolfiera spariva nel nulla, l'unico caso
      // di morte istantanea del motore senza un'esplosione (air/bombar/
      // dirig la hanno sempre, threats.js spawnDeathEffect). onStruck(x,y)
      // lascia a chi chiama la scelta di COSA disegnare (spawnExplosion di
      // threats.js), per non importare threats.js qui dentro (gia'
      // importa da balloons.js — un ciclo).
      onStruck?.(b.x, b.y);
      if (def.loot) loot.push(spawnLoot(def.loot, b.x, b.y));   // [C] Destroy.gml scatta comunque
      continue;
    }
    if (b.t >= def.life * TICK) {
      balloons.splice(i, 1);
      if (def.isSpy) {
        // [C] monspi/Alarm_0.gml + r12/Step.gml (i due punti in cui
        // l'originale spalma questa stessa contabilita', qui riuniti in
        // uno solo — STUDIO.md "le minacce vere"): ogni spia riuscita alza
        // sempre `onda`/`ondan` (-> `air`, game/src/threats.js), e ogni 4a
        // e ogni 10a volta fa scattare anche `bombn` (-> `bombar`) e
        // `diron` (-> `dirig`) — le ondate piu' pesanti, piu' rare.
        r12.onda = (r12.onda ?? 0) + 1;
        r12.ondan = r12.onda;
        r12.bombolo = (r12.bombolo ?? 0) + 1;
        if (r12.bombolo === 4) { r12.bombolo = 0; r12.bombus = (r12.bombus ?? 0) + 1; }
        r12.bombn = r12.bombus ?? 0;
        r12.dirox = (r12.dirox ?? 0) + 1;
        if (r12.dirox === 10) { r12.dirox = 0; r12.diro = (r12.diro ?? 0) + 1; }
        r12.diron = r12.diro ?? 0;
        r12.alertT = ALERT_DURATION;             // [C] action_create_object(aincom, ...)
      } else if (def.loot) {
        loot.push(spawnLoot(def.loot, b.x, b.y));   // [C] Alarm_6.gml -> kill -> Destroy.gml
      }
    }
  }
}

/** Le casse di risorse lasciate cadere: cadono (stessa velocita' per tutte
 * e cinque, [C] bar-us/-bluss/-gia/-viola Create.gml) e spariscono da sole
 * se non raccolte in tempo — raccoglierle e' un tap, non un hover
 * (STUDIO.md §7). */
export function stepLoot(loot, dt) {
  for (let i = loot.length - 1; i >= 0; i--) {
    const l = loot[i];
    l.t += dt;
    l.y += LOOT_FALL_SPEED * 60 * dt;
    if (l.t >= LOOT_LIFE) loot.splice(i, 1);
  }
}

/** [C] bar-us/-bluss/-gia/-viola Mouse_MouseEnter.gml: assegna la risorsa e rimuove la cassa. */
export function collectLoot(loot, item, r12) {
  r12[item.key] = (r12[item.key] ?? 0) + item.amount;
  const idx = loot.indexOf(item);
  if (idx >= 0) loot.splice(idx, 1);
}

// --------------------------------------------------------- pacco di cantiere
// [C] src/objects/placeholder/Mouse_LeftReleased.gml: action_set_relative(1)
// poi action_create_object(mon_bil, -1559, 680) — posizione RELATIVA al
// placeholder appena occupato, non assoluta.
const CONSTRUCTION_OFFSET = { dx: -1559, dy: 680 };
const CONSTRUCTION_SPEED = 8;                    // [C] mon_bil/Create.gml: action_set_motion(30, 8)
const CONSTRUCTION_CARRY = 225 * TICK;           // [C] action_set_alarm(225, 0)
const CONSTRUCTION_LIFE = CONSTRUCTION_CARRY + 1000 * TICK;   // [C] Alarm_0 arma Alarm_1 a +1000
const CONSTRUCTION_GRAVITY = 0.1;                // [C] action_set_gravity(90, 0.1): dopo lo sgancio "alleggerisce"

const BOX_FALL_SPEED = 1;                        // [C] mon_box/Create.gml: action_move("010000000", 1)
const BOX_LIFE = 120 * TICK;                     // [C] mon_box/Alarm_0.gml: action_set_alarm(120, 0)

/** `mon_bil` (default) o `mon_bbil` (`big: true` — [C] placeholder/
 * Mouse_LeftReleased.gml, selec==5/72: laser e banca creano la variante
 * grande, mai cablata finora — riusava sempre `mon_bil`, un pallone piu'
 * piccolo del dovuto per i due edifici piu' cari del motore). Stessa
 * fisica/tempistica per entrambe: solo lo sprite (e quello della cassa/
 * del pallone vuoto, sotto) cambia prefisso. */
export function spawnConstructionBalloon(targetX, targetY, big = false) {
  const prefix = big ? "mon_bbild" : "mon_bild";
  return {
    x: targetX + CONSTRUCTION_OFFSET.dx, y: targetY + CONSTRUCTION_OFFSET.dy,
    vx: COS30 * CONSTRUCTION_SPEED, vy: -SIN30 * CONSTRUCTION_SPEED,
    t: 0, dropped: false, spr: prefix, prefix, depth: -3000,   // [C] _object.json: depth = -3000, mai ricalcolato
  };
}

function spawnConstructionBox(x, y, prefix) {
  return { x, y, t: 0, spr: `${prefix}_box`, depth: -y - 200 };   // [C] mon_box/Step.gml: depth = -y - 200
}

/** Avanza i palloni di cantiere: 225 tick a volo dritto portando la cassa,
 * poi la sgancia (spawna `mon_box`, separato — vedi sotto) e fluttua via
 * verso l'alto accelerando (la gravita' vera dell'originale, non un
 * placeholder) finche' non sparisce. */
export function stepConstructionBalloons(list, boxes, dt) {
  for (let i = list.length - 1; i >= 0; i--) {
    const m = list[i];
    m.t += dt;
    if (!m.dropped && m.t >= CONSTRUCTION_CARRY) {
      m.dropped = true;
      m.spr = `${m.prefix}_empty`;              // [C] action_sprite_set(mon_bild_empty, 0, 1)
      boxes.push(spawnConstructionBox(m.x, m.y, m.prefix));
    }
    if (m.dropped) m.vy -= CONSTRUCTION_GRAVITY * 60 * dt;   // [C] gravita' applicata un tick alla volta
    m.x += m.vx * 60 * dt;
    m.y += m.vy * 60 * dt;
    if (m.t >= CONSTRUCTION_LIFE) list.splice(i, 1);
  }
}

/** La cassa sganciata: cade a terra, recalcola il proprio depth ogni Step
 * come nel decompilato (per finire dietro/davanti agli edifici in base a
 * dove arriva), poi sparisce — [C] mon_box|mon_bbox/Alarm_0.gml crea
 * `smoko` a offset relativo (0, 100) prima di autodistruggersi, lo sbuffo
 * di fumo della "cassa a terra" (STUDIO.md, mai riprodotto). `onLand(x,y)`
 * lascia a chi chiama la scelta di COSA disegnare (spawnSmoko di
 * projectiles.js), per non importare projectiles.js qui dentro (gia'
 * importa da balloons.js — un ciclo). */
export function stepConstructionBoxes(boxes, dt, onLand) {
  for (let i = boxes.length - 1; i >= 0; i--) {
    const bx = boxes[i];
    bx.t += dt;
    bx.y += BOX_FALL_SPEED * 60 * dt;
    bx.depth = -bx.y - 200;
    if (bx.t >= BOX_LIFE) {
      boxes.splice(i, 1);
      onLand?.(bx.x, bx.y + 100);
    }
  }
}
