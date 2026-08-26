// Le gru transitorie di cantiere (`gru`, sprite di default "gru1" —
// src/objects/gru) create durante il piazzamento/potenziamento di quasi
// ogni edificio (BUILDING_TYPES in buildings.js, gli step con `spawn: [{spr:
// "gru1", ...}, ...]` a 4-5 angoli). [Bug corretto, segnalato dall'autore:
// "molte gru non si montano, si crea solo la base ma non i pezzi sopra"]
// main.js trattava ogni spawn "gru1" come un decoro FERMO — un solo sprite
// per tutta la durata del cantiere, mai sostituito. **[C]** `gru/Create.gml`
// + `Alarm_0..6`: la gru vera si MONTA (gru1 -> gru2 -> gru3, sempre piu'
// alta), fa comparire un braccio in cima ("grutop", offset (0,0) — nato
// dalla gru stessa) per ~600 tic, poi si SMONTA (gru3 -> gru2 -> gru1) e
// sparisce da sola — indipendentemente dal resto del cantiere, che di
// solito dura molto di piu'. Stesso principio di game/src/scaffold.js (il
// sotto-sistema gemello per il grattacielo): stato per-istanza avanzato ogni
// frame, appiattito in voci di disegno da main.js.
const TICK = 1 / 60;

// [C] gru/Create.gml: arma alarm(100,0). Alarm_0(t=100): sprite=gru2, arma
// alarm(100,1). Alarm_1(t=200): sprite=gru3, arma alarm(100,2). Alarm_2
// (t=300): crea "grutop" (offset 0,0), arma alarm(600,3). Alarm_3(t=900):
// arma alarm(40,4). Alarm_4(t=940): sprite=gru2, arma alarm(40,5). Alarm_5
// (t=980): sprite=gru1, arma alarm(40,6). Alarm_6(t=1020): kill.
const T_GRU2_UP = 100 * TICK;
const T_GRU3 = 200 * TICK;
const T_GRUTOP_SPAWN = 300 * TICK;
const T_GRU2_DOWN = 900 * TICK;
const T_GRU1_DOWN = 940 * TICK;   // [C] Alarm_4 (sprite=gru2) scatta qui — vedi sotto
const T_DIE = 980 * TICK + 40 * TICK;   // [C] Alarm_5(t=980, sprite=gru1) + 40 = Alarm_6(kill), 1020 tic totali

// [C] grutop/Create.gml: `action_set_alarm(600, 1)`, Alarm_1: `action_kill_
// object()` — vive esattamente 600 tic dalla propria nascita (t=300..900
// del genitore, la stessa finestra in cui la gru resta ferma su "gru3").
const GRUTOP_LIFE = 600 * TICK;

// [Bug corretto, segnalato dall'autore: "i top delle gru (bracci mobili) si
// muovono a casaccio tra i vari sprite e non in ordine come nell'oggetto"]
// **[C]** src/objects/grutop/Create.gml + Alarm_1..7.gml (Alarm_0.gml non e'
// MAI armato da nessuno degli altri eventi — ne' da Create ne' da un altro
// alarm: codice morto nel decompilato, ignorato qui come lo e' di fatto
// nell'originale). Una lettura precedente semplificava il braccio a tre
// pose scelte a dado a ogni passo ("un lato a caso, poi la posa successiva,
// poi neutro, da capo") — ma "gto"/"gtao" NON sono pose statiche: sono un
// vero flipbook a 35 sottoimmagini (0..34, data/sprites.json) che
// l'originale gioca IN ORDINE, avanti per stendere il braccio
// (`action_sprite_set(gto,0,1)`: parte dal fotogramma 0, +1 al tic) e
// indietro per ritrarlo (`action_sprite_set(gto,34,-1)`: parte dal 34, -1 al
// tic) — da cui il braccio che "salta" fra sprite non in ordine invece di
// stendersi/ritrarsi con un movimento continuo. Il LATO (gto=una direzione,
// gtao=quella speculare) resta lo stesso per tutta la corsa avanti+fermo+
// indietro di un ciclo — e' scelto a dado solo all'inizio di ogni ciclo
// (**[C]** `action_if_dice(2)`), non a ogni fotogramma.
const GRUTOP_FRAMES = 35;              // [C] data/sprites.json: gto/gtao, frame_count 35
const T_SWING = GRUTOP_FRAMES * TICK;  // [C] Alarm_2/3 dopo 35 tic esatti (fine/inizio flipbook)
const T_EXTENDED = 50 * TICK;          // [C] Alarm_2/3: sprite gto7/gtao7, arma alarm(50,4|5)
const T_EXTENDED_RETRY = 37 * TICK;    // [C] Alarm_4/5, ramo dado fallito: arma alarm(37,4|5)
const T_NEUTRAL = 50 * TICK;           // [C] Alarm_6: sprite gt0, arma alarm(50,7)
const T_NEUTRAL_RETRY = 52 * TICK;     // [C] Alarm_7/Create, ramo dado fallito: arma alarm(52,7)

function makeGrutop() {
  // [C] Create.gml: `action_if_dice(2)` — meta' delle volte il braccio parte
  // SUBITO a stendersi (dado a sua volta per il lato); l'altra meta' resta
  // fermo sullo sprite di default dell'oggetto (`grutop1`, _object.json)
  // finche' il primo Alarm_7 (qui lo stato "neutral", stesso trattamento del
  // ritorno a riposo dopo un ciclo completo — vedi stepGrutop) non lo fa
  // ripartire — e usa gia' la cadenza "lunga" (52 tic, non 50): Create arma
  // `alarm(52,7)` direttamente, senza passare da un primo controllo a 50.
  if (Math.random() < 0.5) {
    const side = Math.random() < 0.5;
    return { state: "swing", side, t: 0, spr: side ? "gto" : "gtao", frame: 0, retried: false };
  }
  return { state: "neutral", side: false, t: 0, spr: "grutop1", frame: 0, retried: true };
}

function stepGrutop(g, dt) {
  g.t += dt;
  if (g.state === "swing" || g.state === "swingBack") {
    // Sottoimmagine vera del flipbook, avanzata un TIC alla volta con una
    // propria riserva (`frameAcc`) invece di `Math.floor(g.t / TICK)`: alle
    // dt che questo motore usa (~1/60s, uguale a TICK) la divisione in
    // virgola mobile deriva quanto basta perche' floor() salti occasionalmente
    // un fotogramma intero (es. 6 -> 8) invece di passare da uno al
    // successivo — visibile ESATTAMENTE come lo scatto "a casaccio" segnalato
    // dall'autore che questo fix doveva togliere. Sottrarre TICK per intero
    // ad ogni giro (niente divisione) non puo' derivare: o e' passato un
    // tic intero o non lo e'.
    g.frameAcc = (g.frameAcc ?? 0) + dt;
    while (g.frameAcc >= TICK) {
      g.frameAcc -= TICK;
      g.frame = g.state === "swing" ? Math.min(GRUTOP_FRAMES - 1, g.frame + 1) : Math.max(0, g.frame - 1);
    }
  }
  if (g.state === "swing") {
    // [C] action_sprite_set(gto|gtao, 0, 1): sottoimmagine 0 -> 34, +1/tic.
    if (g.t >= T_SWING) {
      g.state = "extended"; g.t = 0; g.retried = false;
      g.spr = g.side ? "gto7" : "gtao7"; g.frame = 0;
    }
  } else if (g.state === "extended") {
    // [C] Alarm_2/3 -> Alarm_4/5: primo controllo a 50 tic, poi ogni 37 se
    // il dado precedente non ha fatto scattare il ritorno.
    if (g.t >= (g.retried ? T_EXTENDED_RETRY : T_EXTENDED)) {
      g.t = 0; g.retried = true;
      if (Math.random() < 0.5) {
        // [C] action_sprite_set(gto|gtao, 34, -1): riparte dal 34, -1/tic.
        g.state = "swingBack"; g.t = 0; g.frameAcc = 0;
        g.spr = g.side ? "gto" : "gtao"; g.frame = GRUTOP_FRAMES - 1;
      }
    }
  } else if (g.state === "swingBack") {
    if (g.t >= T_SWING) {
      g.state = "neutral"; g.t = 0; g.retried = false;
      g.spr = "gt0"; g.frame = 0;
    }
  } else if (g.state === "neutral") {
    // [C] Alarm_6 -> Alarm_7: primo controllo a 50 tic, poi ogni 52 se il
    // dado precedente non ha fatto ripartire il braccio.
    if (g.t >= (g.retried ? T_NEUTRAL_RETRY : T_NEUTRAL)) {
      g.t = 0; g.retried = true;
      if (Math.random() < 0.5) {
        const side = Math.random() < 0.5;   // [C] dado FRESCO per il lato a ogni ripartenza
        g.state = "swing"; g.side = side; g.t = 0; g.frameAcc = 0;
        g.spr = side ? "gto" : "gtao"; g.frame = 0;
      }
    }
  }
}

function stepCrane(c, dt) {
  if (c.dead) return;
  c.t += dt;
  if (c.t >= T_DIE) { c.dead = true; c.grutop = null; return; }
  c.spr = c.t < T_GRU2_UP ? "gru1" : c.t < T_GRU3 ? "gru2" : c.t < T_GRU2_DOWN ? "gru3" : c.t < T_GRU1_DOWN ? "gru2" : "gru1";
  if (!c.grutop && c.t >= T_GRUTOP_SPAWN && c.t - dt < T_GRUTOP_SPAWN) c.grutop = makeGrutop();
  if (c.grutop) {
    c.grutop.age = (c.grutop.age ?? 0) + dt;
    if (c.grutop.age >= GRUTOP_LIFE) c.grutop = null;
    else stepGrutop(c.grutop, dt);
  }
}

// [Bug corretto, segnalato dall'autore: "le gru in collisione con edifici
// dovrebbero auto eliminarsi in modo da non creare overlapping"] **[C]**
// src/objects/gru/Collision_*.gml + src/objects/grutop/Collision_*.gml:
// QUALUNQUE gru (corpo o braccio) che tocca la maschera di uno qualunque fra
// decine di edifici/cantieri elencati li' (casa1..5, industria1..3, club1,
// villa1, media1, sooool, eoli, gatling/laser/missile finiti E i loro
// cantieri impa*) si autodistrugge all'istante (`action_kill_object()`) —
// non solo il PROPRIO edificio (con cui e' normale/voluto che si sovrapponga,
// ci sta costruendo sopra): agli offset fissi con cui nasce (`dx,dy`,
// addCrane() sotto — fino a ±172px, con lotti vicini distanti solo ~116px
// l'uno dall'altro, vedi TURRET_MIN_DIST in buildings.js) puo' benissimo
// ricadere sul lotto di un VICINO gia' costruito, sovrapponendosi a lui.
// Nessuna vera maschera di collisione in questo motore (STUDIO.md,
// "pepazzittecollider" mai ricostruito): stessa approssimazione a distanza
// gia' scelta per tooCloseToTurret() (buildings.js) al posto della fisica
// vera, con un raggio piu' STRETTO della spaziatura dei lotti — una gru
// sparisce solo quando la sua posizione ricade davvero addosso a un altro
// edificio, non solo nei suoi paraggi.
const CRANE_COLLIDE_DIST = 110;

function craneCollidesWithOther(cx, cy, owner, buildings) {
  const r2 = CRANE_COLLIDE_DIST * CRANE_COLLIDE_DIST;
  for (const b2 of buildings) {
    if (b2 === owner) continue;
    const dx = b2.x - cx, dy = b2.y - cy;
    if (dx * dx + dy * dy < r2) return true;
  }
  return false;
}

/** Aggiunge una nuova gru al cantiere di `building` — chiamata da main.js al
 * posto di un decoro fermo, per ogni spawn `{spr:"gru1", dx, dy}` di
 * BUILDING_TYPES (buildings.js). */
export function addCrane(building, dx, dy) {
  if (!building._cranes) building._cranes = [];
  building._cranes.push(makeCrane(dx, dy));
}

function makeCrane(dx, dy) {
  return { dx, dy, t: 0, spr: "gru1", grutop: null, dead: false };
}

/** Avanza tutte le gru di tutti gli edifici in cantiere — chiamata una
 * volta per frame da main.js, insieme a stepConstructions()/
 * stepGrattacieloScaffold(). Le gru gia' morte (`dead`) restano
 * nell'array finche' il cantiere non finisce (removeTransientDecor in
 * main.js le toglie insieme al resto del decoro transitorio): risparmia un
 * filtro ad ogni frame per un array che al piu' ha 5 elementi. */
export function stepCranes(buildings, dt) {
  for (const b of buildings) {
    if (!b.construction || !b._cranes) continue;
    for (const c of b._cranes) {
      stepCrane(c, dt);
      if (!c.dead && craneCollidesWithOther(b.x + c.dx, b.y + c.dy, b, buildings)) {
        c.dead = true;
        c.grutop = null;
      }
    }
  }
}

/** Appiattisce le gru vive di un edificio in voci pronte per il disegno
 * (`{x,y,depth,spr,frame}`) — stesso principio di scaffoldParts() (game/src/
 * scaffold.js). Il corpo della gru segue la normale `-y` di ogni decoro
 * (nessun offset: [C] gru/_object.json, `depth = -y`); il braccio
 * (`grutop`) salta -260 in piu' (**[C]** `grutop/Create.gml: depth = -y -
 * 260`) per restare sempre davanti al corpo che lo regge. `frame` segue la
 * sottoimmagine vera del flipbook (stepGrutop() sopra) invece di fermarsi
 * sempre al fotogramma 0 di ogni sprite. */
export function craneParts(b) {
  if (!b._cranes) return [];
  const out = [];
  for (const c of b._cranes) {
    if (c.dead) continue;
    const y = b.y + c.dy;
    out.push({ x: b.x + c.dx, y, depth: -y, spr: c.spr, frame: 0 });
    if (c.grutop) out.push({ x: b.x + c.dx, y, depth: -y - 260, spr: c.grutop.spr, frame: c.grutop.frame });
  }
  return out;
}
