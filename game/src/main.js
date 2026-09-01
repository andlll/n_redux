import { makeCircleTexture, makeRoundedRectTexture, makeRoundedRectStrokeTexture, solidFrame } from "./gl.js";
import { Camera, screenProjection } from "./camera.js";
import { loadRoomAtlas, loadDeferredGroup } from "./assets.js";
import { createR12, clampR12, stepWeather, stepCalendar, LOANS, loanActive, takeLoan, TINCOM_DURATION, oilCap } from "./state.js";
import { BUILDING_TYPES, placeBuilding, placeFinishedBuilding, canAfford, currentDecor, currentDeathPop, currentDeathHap, currentMaxLife, currentResidents, ruinSpriteFor, ruinRebuildCost, tryStartUpgrade, stepConstructions, stepProduction, stepSolarProduction, stepWindProduction, WIND_ANIM_FPS, stepGrowth, stepConsumption, stepStormDamage, upgradeUnlocked, tooCloseToTurret, stepTurretAim, costTagSprite, ruspaCostFor, tryRuspaRebuild, TURRET_SPRITE_NAMES, sandbox, pickSpr, frontSprFor } from "./buildings.js";
import { spawnCar, stepCars, CARMAKER_SCHEDULE } from "./cars.js";
import { createSemaphore, stepSemaphores } from "./semaphores.js";
import { createAtmosphere, stepAtmosphere } from "./atmosphere.js";
import { spawnPedestrian, stepPedestrians } from "./pedestrians.js";
import {
  stepBalloonSpawner, stepBalloons, stepLoot, collectLoot,
  spawnConstructionBalloon, stepConstructionBalloons, stepConstructionBoxes, ALERT_DURATION,
} from "./balloons.js";
import { stepCoinSpawner, stepCoins, collectCoin, COIN_DEPTH } from "./coins.js";
import { stepSmokeSpawner, stepSmoke, SMOKE_FRAME_COUNT, SMOKE_LIFE } from "./smoke.js";
import { spawnLightning, stepLightning, boltSprite, glowPosition, glowFrame, LIGHTNING_GLOW_LIFE } from "./lightning.js";
import { createWeatherState, stepRain, rainDropAngle, RAIN_STREAK_LENGTH, RAIN_STREAK_WIDTH, RAIN_TINT, RAIN_ALPHA } from "./weather.js";
import { createFireworksState, stepFireworks, FIREWORK_DEPTH, FIREWORK_SPARK_SIZE } from "./fireworks.js";
import { stepGrattacieloScaffold, scaffoldParts } from "./scaffold.js";
import { addCrane, stepCranes, craneParts } from "./cranes.js";
import {
  applyMatchPlatform, createFaroState, stepFaroChain, faroDecor, r120MotorDecor,
  clickFaroButton, clickWaveSignal, clickDockerSignal,
  clickFaro3Button, clickWaveSignal3, clickDockerSignal3,
  isPlaceholderActive,
} from "./platform.js";
import { clickShip } from "./bridges.js";
import { stepThreatSpawner, stepThreats, stepBombs, stepExplosions, spawnExplosion, EXPLOSION_FRAME_COUNT, stepAerSmoke, AER_SMOKE_FRAME_COUNT, AER_SMOKE_LIFE, stepDebris } from "./threats.js";
import { stepTurretFire, stepProjectiles, fireTurretManual, stepSmoko, spawnSmoko, SMOKO_LIFE, stepBeams, BEAM_LIFE } from "./projectiles.js";
import { save, load, saveSlotFor, serializeSave, saveToFile, loadFromFile, loadAutosaveSettings, saveAutosaveSettings } from "./save.js";
import {
  createTutorialState, extractRuinLots, stepTutorialAuto, stepCutscene,
  TUTORIAL_TEXTS, HIDE_ADVANCE_BUTTON, LAST_PHASE, CUTSCENE_CLIMB_TAN,
} from "./tutorial.js";

// Schermata montata da game/src/app.js (SPA, un solo index.html/link):
// export mountMatch(ctx, params) invece di uno script a livello di modulo —
// canvas, Renderer, Input, PauseBlur e la texture bianca condivisa arrivano
// gia' pronti in `ctx` (creati una sola volta per l'intera sessione, non ad
// ogni partita). `params` sostituisce URLSearchParams(location.search): la
// room e l'autoload arrivano come argomenti passati da chi ha chiamato
// navigate(), non piu' letti dalla query string di una pagina separata.
// dispose() ferma il loop e stacca tutto cio' che questo modulo ha
// registrato da solo (listener di keydown, l'aggancio di debug
// window.__nimbus), cosi' tornare al menu e rientrare in partita piu' volte
// nella stessa sessione non accumula loop/listener fantasma.
export async function mountMatch(ctx, params = {}) {
  const { gl, r, canvas, input, pauseBlur, white, navigate, reportProgress } = ctx;
  let stopped = false;
  // Cerchio morbido per l'animazione "bolla" delle monete raccolte (vedi
  // coinPops/collectCoinAt() piu' sotto) — nessun asset dell'originale la
  // prevede (nessun sistema di particelle in questo motore, STUDIO.md), e'
  // puramente nostra.
  const bubbleTex = makeCircleTexture(gl, 64);
  const cam = new Camera();

  // Zoom vero solo su mobile. Un puntatore "coarse" (dito, niente hover fine)
  // e' il segnale che il browser stesso da' per un device touch — piu'
  // affidabile di un controllo sulla larghezza schermo (un desktop con
  // finestra stretta non e' un telefono) o sullo user agent (facile da
  // falsificare, e comunque scoraggiato). Su desktop lo zoom resta fermo a un
  // rapporto 1 texel : 1 pixel fisico (vedi `pixelPerfectZoom()` sotto): niente
  // rotella, niente bottoni zoom+/- in UI, solo l'interfaccia com'e' disegnata,
  // pixel per pixel — la richiesta era esplicitamente "zero zoom" su desktop.
  const isMobile = matchMedia("(pointer: coarse)").matches;

  // Scala dei bottoni del selettore edificio (usata piu' sotto per disegnarli)
  // — [I] segnalato dall'autore: le linguette di prezzo/i popup della ruspa
  // disegnavano gli sprite originali a piena grandezza (scale 1), decisamente
  // piu' grandi dei bottoni gia' rimpiccioliti con questa stessa scala.
  // Portata qui, a livello di modulo, cosi' anche il popup della ruspa
  // (dynamic.push() piu' sopra nel ciclo di frame, molto prima della sezione
  // che disegna i bottoni) puo' riusarla invece di un secondo numero scollegato.
  const UI_SCALE = isMobile ? 0.6 : 0.7;
  // [I] Segnalato dall'autore: le etichette dei PREZZI (i cartellini "cN"/
  // "cfree", costTagSprite() in buildings.js) restavano comunque troppo
  // grandi su desktop anche a UI_SCALE (0.7) — a differenza dei bottoni/
  // popup sopra, un cartellino e' un dettaglio testuale che deve leggersi
  // in un angolo, non occupare quasi quanto l'icona che descrive. Scala
  // dedicata, unica per ogni cartellino di prezzo del motore (popup ruspa,
  // segnale di potenziamento, lotto-rudere del tutorial, selettore edificio).
  const COST_TAG_SCALE = 0.5;

  // ---------------------------------------------------------------- room
  // Quale room caricare — [C] `standma`/`easma`/`me3` (src/objects, la room
  // "title") mandano al gioco vero con `action_load_game("nimsav"|"nimsav_
  // eas")`, non un semplice `room_goto`: qui equivale a `params.room`,
  // passato da title.js (game/src/title.js) a navigate("match", { room,
  // autoload }) — `params.autoload` in piu' quando arriva DAVVERO da un
  // bottone della title screen (non da un caricamento diretto/refresh
  // dell'app), cosi' un boot diretto su questa room (game/src/app.js) resta
  // a stato vuoto com'era prima (STUDIO.md: l'autoload silenzioso ad ogni
  // apertura fu tolto apposta perche' mascherava le modifiche appena fatte
  // durante lo sviluppo) — vedi `doLoad()` piu' sotto, chiamato una sola
  // volta all'avvio solo con questo flag.
  // "tutorial" (game/src/tutorial.js): stessa partita vera di match_easy
  // sotto (nessuna base volante/faro, STUDIO.md — la room e' 1920x1086 come
  // match_easy, non 3900x2090 come match), con un HUD guidato in piu' sopra.
  const roomParam = params.room;
  const roomName = roomParam === "match" || roomParam === "tutorial" ? roomParam : "match_easy";
  const autoloadOnBoot = params.autoload === true;

  // ---------------------------------------------------------------- scena
  const scene = await fetch(`./data/${roomName}.scene.json`).then((x) => x.json());
  // [C] `scene.bgColor` (STUDIO.md, tools/22_scene.py: room["bg_color"]) — mai
  // letto finora: ogni room disegnava lo stesso placeholder blu scurissimo di
  // gl.js, sbagliato per `match` (bgColor vero: un azzurro cielo chiaro,
  // #cbe9fe) — si vedeva soprattutto nel vuoto sotto/intorno alle basi
  // volanti, sempre "notturno" a prescindere dalla fase del giorno.
  // GameMaker impacchetta i colori R+G*256+B*65536 (ordine BGR), come
  // altrove nel motore (cars.js, NIGHT_TINT).
  // Da quando esiste `bauraColorAt()` (piu' sotto, ciclo giorno/tramonto/
  // notte vero) questa tinta statica resta il cielo di sfondo solo su
  // `match_easy` (dove `baura` non e' mai esistito nel decompilato) — su
  // `match`/`tutorial` il colore dinamico la sostituisce, vedi il commento
  // sopra `r.beginFrame()` piu' sotto.
  const SCENE_BG_RGB = [scene.bgColor & 0xff, (scene.bgColor >> 8) & 0xff, (scene.bgColor >> 16) & 0xff].map((v) => v / 255);
  cam.bounds = { left: 0, top: 0, right: scene.width, bottom: scene.height };
  // [Bug corretto, gap dichiarato STUDIO.md: "match mostra ancora perlopiu'
  // cielo/nuvole al primo avvio"; poi decisione dell'autore: "in ogni room
  // centra la camera su chies"] Il centro GEOMETRICO della room (usato qui
  // sotto, e di nuovo in resize() piu' sotto per il ramo mobile) non e' dove
  // sta la citta': su `match` la piattaforma volante vive nella meta'
  // superiore della room (`match.json` e' alta 2090px, ma le istanze vere —
  // strade, edifici, la base — si affollano ben sopra la sua meta', il resto
  // e' cielo vuoto sotto/intorno) e su `tutorial` (allargata a 3900x2090,
  // le dimensioni di `match`, per fare spazio alla piattaforma — game/src/
  // platform.js) il contenuto vero resta raccolto nella meta' sinistra. Una
  // versione precedente qui usava la MEDIANA di x/y di tutte le istanze
  // della scena come proxy di "dove sta il contenuto vero" — `chies` (il
  // municipio, edificio principale e unico di ogni room, STUDIO.md §9) e'
  // un'ancora piu' semplice e piu' precisa: e' letteralmente il centro
  // amministrativo della citta', sempre presente, non una stima statistica
  // che poteva comunque cadere qualche schermata lontano dal punto giusto.
  // Effettivo solo su DESKTOP: su mobile lo zoom iniziale "cover" (resize()
  // piu' sotto, gia' un fix precedente per non lasciare bordi) inquadra
  // l'ALTEZZA della room esattamente pari a quella dello schermo per ogni
  // room giocabile (tutte piu' larghe che alte, ogni telefono in portrait
  // l'opposto) — zero margine di panoramica verticale, quindi `cam.clamp()`
  // (camera.js) ricentra comunque sul centro geometrico qualunque valore le
  // si passi. Non toccato: e' il comportamento "cover" voluto da quel fix,
  // non un effetto collaterale di questo.
  const chiesFocus = scene.instances.find((it) => it.obj === "chies");
  const initialFocusX = chiesFocus ? chiesFocus.x : scene.width / 2;
  const initialFocusY = chiesFocus ? chiesFocus.y : scene.height / 2;
  cam.x = initialFocusX;
  cam.y = initialFocusY;
  // minZoom = quanto ci si puo' avvicinare: sotto meta' della risoluzione
  // nativa dell'atlas gli sprite si vedono sgranati, ingranditi oltre il
  // loro dettaglio reale. Valore INIZIALE soltanto — ricalcolato ad ogni
  // resize() (sotto, `cam.minZoom = pixelPerfectZoom() * 0.5`) una volta che
  // il devicePixelRatio vero e' noto, vedi il commento li' sul perche' un
  // valore assoluto fisso qui sarebbe sbagliato su schermi hidpi.
  cam.minZoom = 0.5;
  // Finche' non tocchi niente la camera inquadra tutta la room (mobile) o
  // resta al pixel-perfect di default (desktop), e si riadatta se lo
  // schermo cambia (rotazione del telefono, spostamento fra monitor a dpr
  // diverso) — vedi resize() sotto. Diventa true al primo pan/zoom
  // dell'utente su entrambe le piattaforme (input.onDrag/onZoom piu' sotto),
  // cosi' un resize successivo non scavalca piu' la sua scelta.
  let userMoved = false;

  /** zoom = quanti pixel di mondo per pixel di schermo FISICO (camera.js):
   * per avere 1 texel dell'atlas = 1 pixel del display serve zoom == dpr,
   * non zoom == 1 (che darebbe 1 texel per pixel CSS, sgranato su schermi
   * hidpi dove un pixel CSS ne copre dpr^2 fisici). */
  function pixelPerfectZoom() {
    return Math.min(window.devicePixelRatio || 1, 2);
  }

  // Ordinamento dichiarato una volta sola. Nell'originale ogni edificio/albero
  // si auto-assegnava `depth = -y` nel proprio Create (STUDIO.md §5.3, e
  // confermato dal decompilato di impaind0to1f/Create.gml: `depth = -y - 2`)
  // — la stessa istanza dichiarata a `depth: 0` nella room diventava quindi
  // dinamicamente "-y" a runtime. I livelli fissi (ambiente/UI: air2 -1,
  // aura -10, placeholder -5000, pu1 -9998, ...) restano quelli scritti nella
  // room, perche' il loro codice non tocca mai `depth`.
  //
  // Qui replichiamo la stessa regola: le istanze "di mondo" (`depth === 0`
  // nella room — edifici, alberi, decoro/impalcature che creiamo noi a
  // runtime) si ordinano per `-y`; tutto il resto mantiene il suo depth
  // fisso. Senza questo, `air2` (il livello di terreno/strade, depth -1,
  // STUDIO.md §5.2 lo definiva erroneamente "atmosferico": e' in realta'
  // opaco su tutta la mappa) finiva sopra ENTRAMBI gli edifici e gli alberi,
  // perche' -1 sta "davanti" a 0 nella nostra convenzione (piu' basso =
  // disegnato dopo = piu' vicino alla camera) — il bug dietro sia al mancato
  // ordinamento assonometrico sia a "vedo solo le luci di chies" (il suo
  // unico figlio a depth -1, il bagliore delle finestre, restava sopra
  // `air2` per il solo caso fortuito della y, la chiesa stessa no).
  function effDepth(it) {
    return it.depth === 0 ? -it.y : it.depth;
  }
  const sortWorld = (a, b) => effDepth(b) - effDepth(a);
  // [Bug corretto] Le nuvole ("ni"/"nifast") piazzate direttamente nella room
  // finivano qui come qualunque altro decoro FISSO — ma nel decompilato
  // NESSUNA delle due lo e' mai: entrambe si mettono in moto da sole al
  // proprio Create (`action_set_motion(30, ...)`, la stessa diagonale gia'
  // riprodotta in game/src/atmosphere.js) e, per meta' delle volte, si
  // autodistruggono all'istante (`action_if_dice(2)` -> `action_kill_
  // object()`). Segnalato dall'autore: restavano invece ferme per sempre,
  // "nuvole statiche" che nell'originale non esistono — il cielo vero e'
  // interamente popolato dal generatore dinamico di atmosphere.js (chiamato
  // ogni frame da stepAtmosphere() piu' sotto), queste istanze della room
  // sono solo il punto di partenza "prima" che l'originale stesso avrebbe
  // gia' fatto sparire/mettere in moto.
  // [Bug corretto, segnalato dall'autore: "è rimasto un quadratino celeste
  // in alto a sinistra"] `aura`/`baura` (src/objects, entrambi piazzati una
  // sola volta nella room a x=0,y=0 — STUDIO.md, bauraColorAt()/
  // auraOverlayAt() piu' sotto) sono gia' completamente sostituiti da quelle
  // due funzioni: un quad a tinta dinamica per `aura` (l'overlay giorno/
  // notte sopra il mondo) e la vignetta fuori mappa per `baura` (il suo
  // sprite "vero", opaco, resta sempre coperto DENTRO la room dal terreno —
  // vedi i commenti li'). Prima di questo fix nessuno dei due era escluso
  // qui: restavano nella lista come qualunque altro decoro fisso, disegnati
  // al proprio frame NATIVO (mai scalato "90x90" come nell'originale
  // `action_sprite_transform`, STUDIO.md — quella trasformazione non e' mai
  // stata ricostruita, dato che serviva solo a coprire l'intera room per un
  // oggetto ora sostituito) — un piccolo riquadro azzurro cielo (lo sprite
  // "day" di `baura`, la stessa tinta di BAURA_DAY) a x=0,y=0. La piattaforma
  // isometrica e' ruotata: quel punto e' un angolo "vuoto" del bounding box
  // rettangolare della room, il terreno (che normalmente lo coprirebbe) non
  // ci arriva — cosi' il quadratino restava visibile, in particolare zoomando
  // (l'angolo del bounding box entra in vista solo allo zoom giusto, mai a
  // quello iniziale "cover" che mostra solo il centro della piattaforma).
  const staticWorld = scene.instances.filter((it) => it.obj !== "ni" && it.obj !== "nifast"
    && it.obj !== "aura" && it.obj !== "baura").sort(sortWorld);

  // ---------------------------------------------------------------- atlas
  // Le pagine sono reimpacchettate per room da tools/23_atlas.py + 24_blit.py:
  // quelle originali di GameMaker sparpagliavano 13 sprite su 12 pagine.
  // L'atlas include anche gli sprite di gameplay (edifici, cantieri: vedi
  // GAMEPLAY_SPRITES in 23_atlas.py) che non stanno ferme in nessuna room
  // perche' e' il giocatore a farle comparire. `loadRoomAtlas()` (game/src/
  // assets.js) cache atlas+texture per room: rientrare in questa stessa room
  // piu' volte nella sessione (SPA, game/src/app.js) non le riscarica.
  const { atlas, pageTex } = await loadRoomAtlas(gl, roomName, {
    onProgress: (loaded, total) => reportProgress(roomName, loaded, total, "loading city"),
  });
  // [Bug corretto, segnalato dall'autore: "il gioco lagga da morire su
  // alcuni device — ottimizziamo lato GPU: atlas piu' piccoli ed eviction"]
  // Il tier "combat" (sotto, dentro `if (skyAlive)`) si avvia normalmente
  // solo quando `r12.spy`/una minaccia vera si avvicina — ma la cutscene
  // iniziale del tutorial (tutorial.js, spawnBattle()) crea `bombar`/`air`/
  // `dirig` VERI gia' dopo pochi secondi, per script, MAI passando da
  // quei contatori (r12.spy/onda/bombn/diron restano a zero per l'intera
  // cutscene — e' tutta roba scriptata, non l'economia normale delle
  // mongolfiere spia): il trigger normale non scatterebbe mai in tempo.
  // Qui il tutorial fa eccezione, come faceva "deferred" incondizionato
  // prima di questo cambio — le sue pagine "combat" partono subito, non
  // c'e' niente da guadagnare a ritardarle in una room che le usa comunque
  // nei primi secondi.
  if (roomName === "tutorial") loadDeferredGroup(gl, roomName, "combat");
  // `frameIdx` (default 0): quasi tutti gli sprite del motore sono statici,
  // una sola posa (STUDIO.md, "nessun sistema di image_speed") — ma alcuni
  // (le svolte delle auto, game/src/cars.js) sono davvero multi-frame
  // nell'originale e ora vengono animati per davvero, non piu' fermi al
  // primo frame: vedi stepCars() e il suo uso qui sotto. L'atlas li
  // impacchetta gia' tutti (tools/23_atlas.py itera `s["frames"]` per
  // intero), semplicemente prima non venivano mai letti oltre il primo.
  // [I] Spostata qui (era dichiarata molto piu' sotto, vicino a LIGHT_FADE):
  // CLUB_PULSE_PERIOD/CLUB_SNAP (sotto, addDecor()) ora la usano molto
  // prima nel file — una `const` a livello di modulo letta prima di essere
  // inizializzata lancerebbe un ReferenceError ("temporal dead zone"), non
  // silenziosamente NaN.
  const TICK = 1 / 60;              // room_speed dell'originale, stessa unita' di buildings.js
  // [I] Caricamento in tre scaglioni (tools/23_atlas.py `corePages`/
  // `combatPages` + game/src/assets.js): core arriva prima del primo
  // fotogramma, "combat" (minacce vere/proiettili/fulmini) e "advanced"
  // (potenziamenti, traffico periodico, la catena fari->piattaforma, ogni
  // edificio oltre la dote iniziale) arrivano in background SOLO quando lo
  // stato di gioco vero si avvicina alla soglia di ciascuno (vedi il
  // trigger piu' sotto, dentro `if (skyAlive)`) — mai incondizionati subito
  // dopo core. `pageTex[f.p]` puo' quindi restare `null` per uno sprite
  // tecnicamente presente nell'atlas ma non ancora scaricato, a volte per
  // buona parte di una partita che non tocca mai quel contenuto. Trattato
  // esattamente come uno sprite mancante (`return null`, lo stesso ramo di
  // "frames non trovati" sotto): main.js non disegna nulla per quel frame
  // invece di far crashare l'intero rendering leggendo `.tex` di un
  // `pageTex[f.p]` ancora null — chi lo richiama ogni frame (la
  // stragrande maggioranza dei chiamanti, vedi `dynamic.push({...,
  // _f: frameFor(...)})` piu' sotto) lo ritenta da solo al frame
  // successivo, quindi lo sprite compare da solo (pop-in) appena la sua
  // pagina finisce di arrivare — nessuno stato da pulire.
  // I pochi chiamanti che invece CACHANO `_f` una volta sola
  // (`staticWorld`, sotto) vengono guariti esplicitamente, vedi
  // healMissingArt()/il ciclo di frame piu' in basso.
  // [Bug corretto, segnalato dall'autore: "gap di pixel tra una texture e
  // l'altra del mare" durante la cutscene del tutorial] `tools/23_atlas.py`
  // impacchetta gli sprite bordo a bordo, senza nessun gutter fra l'uno e
  // l'altro — per uno sprite disegnato una volta sola lo sfumato LINEAR di
  // un texel oltre il proprio bordo (nel prossimo sprite impacchettato li'
  // accanto) e' impercettibile, ma "tuto_sfondo" (il tassello di mare della
  // cutscene, sotto) viene ripetuto A TAPPETO fianco a fianco con SE STESSO:
  // ad ogni giunzione fra due copie, quello stesso mezzo texel sfumato
  // (bordo destro/basso di una copia contro un vicino ESTRANEO nell'atlas,
  // non contro l'inizio dell'altra copia) diventa una riga verticale/
  // orizzontale visibile — un colore che non c'entra niente col mare,
  // ripetuto ad ogni bordo di tassello. `inset` (di default `false`, quindi
  // zero cambiamento per ogni altro chiamante di frameFor) restringe il
  // rettangolo UV di mezzo texel su ogni lato prima di ritornarlo: il
  // campionamento LINEAR non arriva mai al vero bordo dello sprite, quindi
  // non puo' mai leggere il vicino — il tassello perde una frazione di
  // texel invisibile ai bordi (acqua contro acqua, sulla stessa immagine),
  // molto meglio di una cucitura colorata visibile.
  function frameFor(sprName, frameIdx = 0, inset = false) {
    const frames = atlas.sprites[sprName];
    if (!frames || !frames.length) return null;
    const f = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
    const page = pageTex[f.p];
    if (!page) return null;
    let { u0, v0, u1, v1 } = f;
    if (inset) {
      const halfU = 0.5 / page.width, halfV = 0.5 / page.height;
      u0 += halfU; v0 += halfV; u1 -= halfU; v1 -= halfV;
    }
    return { tex: page.tex, u0, v0, u1, v1, w: f.w, h: f.h, ox: f.ox, oy: f.oy };
  }
  // Quante sottoimmagini ha davvero uno sprite nell'atlas — serve solo a chi
  // deve fare il modulo per un'animazione che gira in loop invece di fermarsi
  // all'ultimo frame (vedi "eol"/WIND_ANIM_FPS piu' sotto, buildings.js).
  function frameCountFor(sprName) {
    return atlas.sprites[sprName]?.length ?? 1;
  }
  // Ritaglia un sotto-rettangolo di un frame gia' letto da frameFor() —
  // stessa tecnica di subFrameRight() in title.js (il marchio mtFUJI
  // ritagliato da `logigogi`), qui in due varianti: usata sotto per separare
  // l'icona dell'orologio, cotta insieme alle altre quattro nella stessa
  // immagine `icone_oriz` (barra risorse), dal resto della barra.
  // subFrameLeft: tiene [0, pxWidth), stesso ox/oy dell'originale (l'angolo
  // in alto a sinistra non si sposta, e' il lato destro che si accorcia).
  function subFrameLeft(f, pxWidth) {
    const frac = pxWidth / f.w;
    return { tex: f.tex, u0: f.u0, v0: f.v0, v1: f.v1, u1: f.u0 + (f.u1 - f.u0) * frac, w: pxWidth, h: f.h, ox: f.ox, oy: f.oy };
  }
  // subFrameRight: tiene [pxFromLeft, f.w), origine azzerata (ox=0/oy=0) —
  // un ritaglio non ha piu' l'ancoraggio del frame originale, il chiamante
  // lo posiziona dal proprio angolo in alto a sinistra.
  function subFrameRight(f, pxFromLeft) {
    const frac = pxFromLeft / f.w;
    return { tex: f.tex, v0: f.v0, v1: f.v1, u0: f.u0 + (f.u1 - f.u0) * frac, u1: f.u1, w: f.w - pxFromLeft, h: f.h, ox: 0, oy: 0 };
  }
  // [Bug corretto, segnalato dall'autore: "l'area di tap delle strutture di
  // difesa deve coprire tutto l'oggetto (un rettangolo grande come tutte le
  // coordinate dello sprite)"] Il tap sulle torrette (missile/gatling/laser)
  // usava sempre il bbox del frame CORRENTE (`_f`, sotto): uno sprite
  // direzionale diverso per ogni angolo di mira (TURRET_SPRITE_TABLES,
  // buildings.js), quindi l'area cliccabile si restringeva ogni volta che il
  // cannone ruotava verso una direzione con un bbox piu' stretto, invece di
  // restare un riquadro fisso. Qui l'UNIONE degli ingombri di TUTTI i
  // fotogrammi direzionali (mira + rinculo, TURRET_SPRITE_NAMES) del tipo —
  // non il frame disegnato in questo istante — usata SOLO per il tap
  // (inFrameRect() piu' sotto), mai per il disegno (che resta lo sprite vero
  // di ogni frame). Non cachata: chiamata solo al tap (poche volte al
  // secondo al massimo), non ad ogni frame di rendering — le pagine
  // "deferred" dell'atlas (assets.js) potrebbero non essere ancora arrivate
  // per qualche nome all'inizio, una cache permanente le lascerebbe fuori
  // per sempre anche dopo che sono arrivate.
  // [Bug corretto, segnalato dall'autore: "i beta tester lamentano che
  // spesso anche premendo sulle torrette queste non sparano"] L'unione dei
  // frame direzionali (sopra) restava comunque la sola sagoma "disegnata"
  // dello sprite, senza nessun margine per un dito vero — su schermo piccolo
  // il tap cade spesso appena fuori, specialmente sulle direzioni piu'
  // strette (il cannone visto quasi di profilo). TURRET_TAP_PAD allarga il
  // riquadro di TAP (mai il disegno, sempre e solo `turretBox` sopra) di un
  // margine fisso per lato, indipendente dallo sprite — lo stesso tipo di
  // "area di tocco piu' grande della grafica" comune su mobile.
  const TURRET_TAP_PAD = 28;
  function turretHitBox(type) {
    const names = TURRET_SPRITE_NAMES[type];
    if (!names) return null;
    let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
    for (const name of names) {
      const f = frameFor(name);
      if (!f) continue;
      left = Math.min(left, -f.ox); top = Math.min(top, -f.oy);
      right = Math.max(right, f.w - f.ox); bottom = Math.max(bottom, f.h - f.oy);
    }
    if (left >= right || top >= bottom) return null;
    left -= TURRET_TAP_PAD; top -= TURRET_TAP_PAD; right += TURRET_TAP_PAD; bottom += TURRET_TAP_PAD;
    return { ox: -left, oy: -top, w: right - left, h: bottom - top };
  }
  /** Frame corrente per uno sprite di CANTIERE con sottoimmagini vere
   * ("impvent1"/"impvent3" della pala eolica — `c.curSpd`, buildings.js/
   * BUILDING_TYPES.eolico: 0 per ogni altro passo di ogni altro edificio,
   * quindi qui sempre 0). `c.t` (il timer del passo corrente, si azzera ad
   * ogni cambio passo) fa da orologio dell'animazione — stesso principio di
   * `b.animT`/WIND_ANIM_FPS per lo sprite FINITO, generalizzato a qualunque
   * sprite di cantiere invece che solo all'ultimo. Segnalato dall'autore:
   * senza questo l'impalcatura/la pala restavano ferme sul frame 0 per
   * tutta la durata del passo, "nessuna animazione di montaggio/smontaggio"
   * anche dopo aver corretto b.animT per lo sprite finito sopra. */
  function constructionFrameIdx(b) {
    const c = b.construction;
    if (!c?.curSpd) return 0;
    const frames = frameCountFor(b.spr);
    return frames > 1 ? Math.floor(c.t * 60 * c.curSpd) % frames : 0;
  }
  // Alberi (STUDIO.md §5.3, src/objects/albe|albe2|albe3/Create.gml): a
  // Create l'originale sceglie a dado uno sprite finale diverso per istanza
  // (in albe, se nessun dado va a buon fine resta il default "a1" della
  // room); qui e' 131 volte lo stesso identico albero altrimenti — la
  // tavola di probabilita' sotto e' la stessa, decisa una volta al
  // caricamento della scena invece che alla nascita dell'istanza (nessuna
  // differenza visibile: gli alberi non nascono mai a runtime in questa
  // room, sono tutti gia' in scena da match_easy.scene.json).
  const dice = (n) => Math.random() < 1 / n;
  function treeVariant(obj) {
    if (obj === "albe") {                              // [C] albe/Create.gml
      if (dice(5)) return dice(2) ? "a2" : "a5";
      if (dice(2)) return dice(2) ? "a3" : "a4";
      return null;                                       // resta "a1", il default
    }
    if (obj === "albe2") return dice(2) ? (dice(2) ? "a21" : "a22") : (dice(2) ? "a23" : "a24");
    if (obj === "albe3") return dice(2) ? (dice(2) ? "a31" : "a32") : (dice(2) ? "a33" : "a34");
    return null;
  }
  for (const it of staticWorld) {
    const v = treeVariant(it.obj);
    if (v) it.spr = v;
  }

  for (const it of staticWorld) it._f = frameFor(it.spr);

  // [Bug corretto, richiesto dall'autore: "applichiamo lo stesso stile
  // Montserrat bianco su nero dei titoli di apertura del tutorial alla
  // schermata di sconfitta" — drawOutcomeOverlay() piu' sotto] Il font
  // bitmap "gotham_mini" (tools/25_font.py — [C] src/objects/repre/
  // DrawGUI.gml: action_font(gotham_mini, 0), un tempo la barra risorse,
  // poi solo il pannello di sconfitta dopo la migrazione a Montserrat qui
  // sotto) non ha piu' nessun chiamante in questo file: rimosso insieme
  // all'import di `loadFont`/`drawText`/`measureText`/`fitTextScale`
  // (font.js) e a `wrapText()` (usata solo da lui), diventati morti con
  // lui. Il balloon di testo del tutorial e i tre pannelli (pausa/
  // vittoria/sconfitta) usano tutti Montserrat vero (index.html/game/fonts/
  // — vedi drawHtmlText() sotto): nitido a QUALUNQUE dimensione, non un
  // compromesso fra atlas bitmap diversi.
  // [C] repre/DrawGUI.gml: dodici `action_draw_text` letterali, uno per ogni
  // valore di `repre.mon` (il mese, 1..12 — state.js, r12.month) — mai una
  // tabella nel decompilato, ricostruita qui come tale.
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // -------------------------------------------------------- piazzabili e edifici
  // I `placeholder` della room sono "gli spazi vuoti dove il giocatore piazza
  // gli edifici" (STUDIO.md §6, confermato dall'autore). Nell'originale
  // diventano un edificio vero al tocco, tramite una ruota di scelta
  // (`cre1..cre4`) che non abbiamo ancora ricostruito: qui la sostituisce un
  // selettore a bottoni (vedi `uiButtons` piu' sotto) per gli edifici di cui
  // abbiamo ricostruito la catena di piazzamento — `industria` e `casa`.
  // `chies` non e' fra questi: e' l'edificio principale, unico e
  // preesistente a centro mappa (STUDIO.md §9), non un tipo che il
  // giocatore piazza.
  const placeholders = staticWorld.filter((it) => it.obj === "placeholder");
  // [I] depth: la room dichiara -5000 (data/objects.json: sempre in primissimo
  // piano, davanti persino agli edifici — cosi' com'era nell'originale, mai
  // letto/cambiato a runtime). Qui invece il rombo viola, quando appare sotto
  // hover, resta appena sopra il piano stradale (`air2`, depth -1, STUDIO.md
  // §5.2) e sotto a tutto il resto — alberi/auto/edifici sono depth 0 nella
  // room, quindi ordinati per `-y` da effDepth() sopra, e la y minima in
  // `match_easy` e' 17 (effDepth -17): -2 sta sempre fra i due, mai sopra un
  // edificio o un albero, ma sempre sopra la strada sotto di lui.
  const PLACEHOLDER_DEPTH = -2;
  for (const p of placeholders) { p.id = `ph_${p.x}_${p.y}`; p.consumed = false; p.depth = PLACEHOLDER_DEPTH; }
  const placeholderById = new Map(placeholders.map((p) => [p.id, p]));

  // [Decisione dell'autore: "la rovina ruspata deve creare sempre un
  // placeholder vuoto, non un nuovo edificio"] Sgombera una rovina (rudere
  // VERO da battaglia o lotto-rudere del tutorial, sotto) lasciando un
  // lotto libero al suo posto, invece di avviare subito un cantiere —
  // prima di questa decisione la ruspa su una rovina "ricostruiva"
  // direttamente una `casa` (fedele al decompilato, ma il giocatore si
  // aspetta uno sgombero puro, poi una scelta libera di cosa costruirci
  // sopra). Riusa lo stesso `id`/`depth` dei placeholder veri della scena
  // (sopra) cosi' il lotto si comporta esattamente come uno qualunque
  // (hover, tap, findWindCluster) — se un placeholder con quell'id
  // esiste gia' (mai il caso per una rovina, ma difensivo) lo riattiva
  // invece di duplicarlo.
  function clearedPlaceholder(x, y) {
    const id = `ph_${x}_${y}`;
    let ph = placeholderById.get(id);
    if (ph) { ph.consumed = false; return ph; }
    ph = { obj: "placeholder", x, y, depth: PLACEHOLDER_DEPTH, spr: "phold", _f: frameFor("phold"), id, consumed: false };
    placeholders.push(ph);
    placeholderById.set(id, ph);
    staticWorld.push(ph);
    return ph;
  }

  // [Bug corretto, segnalato dall'autore: "verifica il codice originale, le
  // rovine non sparivano di colpo"] `ruin1|2|3/Mouse_LeftPressed.gml` non
  // sgombera il rudere all'istante: paga E POI crea `impacasa1r`/`impacasa2r`/
  // `impacasa3r` (STUDIO.md sopra) — lo stesso oggetto, con la stessa identica
  // catena `Alarm_0..N`, che `tryRuspaRebuild()` (buildings.js) gia' riusa per
  // ruspare un edificio VIVO: quindi gli STESSI `BUILDING_TYPES.casa.construct/
  // upgrades[0]/upgrades[1].steps` gia' verificati per quel percorso (diff
  // riga per riga contro `impacasa{1,2,3}r/f`: stessi sprite `irNN`, stesse
  // durate, stesso spawn di topper/gru ai tic giusti).
  //
  // [Bug corretto, segnalato dall'autore: "le impalcature di demolizione sono
  // rotte, non compare il pezzo davanti ne' il top"] Una prima versione di
  // questa coda approssimava la catena a soli 3 passi inventati (sempre lo
  // stesso sprite del solo lato "r", `ir_1`/`ir_2`) — senza ne' l'impalcatura
  // "f" in sovraimpressione (`frontSprFor()`, buildings.js) ne' il topper
  // (`spawn` sui passi veri): nessuno dei due esiste su un rudere con quella
  // approssimazione. Qui si riusano invece gli step array VERI (sopra),
  // quindi front track e topper (e le 4 gru della taglia 3,
  // `addConstructionSpawn()` sotto) tornano gratis, identici a quelli di un
  // vero cantiere/ruspata su un edificio vivo — `ruspaFirstStepDur` (solo
  // sulla taglia 1: le taglie 2/3 hanno gia' un primo passo da 30 tic anche
  // nel cantiere normale, nessun accorciamento da applicare) resta l'unica
  // differenza dal percorso di `tryRuspaRebuild()`.
  //
  // A differenza di un cantiere/upgrade vero pero' un rudere in demolizione
  // non deve MAI rivelare una casa finita a meta' sequenza — l'originale
  // stesso non lo fa: ne' `impacasa2r` ne' `impacasa3r` creano mai
  // un'istanza "casaN", solo il ciclo di sprite fino ad `action_kill_
  // object()`. Per questo qui non si riusa `stepConstructions()` di
  // buildings.js (che chiamerebbe `applyLevelFinish()` a `revealAtStep`): si
  // rilegge `up.steps` a mano, un passo alla volta, fino in fondo all'array.
  //
  // [I] Sempre `BUILDING_TYPES.casa`, MAI il tipo originale del rudere:
  // fedele all'originale, non un'approssimazione nostra — `ruin1/2/3` sono
  // gli stessi TRE oggetti condivisi da industria/casa/club/villa per
  // "taglia" (1/2/3, vedi il commento su `ru11..ru34` in
  // BUILDING_TYPES.industria/casa piu' sopra: "stesso pool... non un rudere
  // per tipo"), e tutti e tre creano solo `impacasa{1,2,3}r`, mai un
  // `impaind*`/`impaclub*` dedicato. Resta un gap dichiarato (non nuovo qui,
  // gia' presente in `ruinRebuildCost()`, buildings.js, che tratta allo
  // stesso modo ogni livello oltre il 3): i ruderi "taglia 4" di
  // media/palazzo (`ru41`/`ru41d`, un oggetto ruin4s/ruin4d PROPRIO, mai
  // riletto) e quelli fuori scala (solare/eolico/monum, ognuno un pool a se')
  // finiscono comunque qui con gli sprite ir1x/if1x di taglia 1 invece dei
  // propri — nessuna regressione (stessa approssimazione della versione
  // precedente di questa funzione), solo non ancora la stessa fedelta' del
  // percorso taglia 1-3 appena corretto.
  function ruinClearUp(level) {
    const def = BUILDING_TYPES.casa;
    return level <= 1 ? def.construct : def.upgrades[Math.min(level, 3) - 2];
  }
  let nextRuinClearId = 1;
  /** Avanza il ciclo di impalcature di ogni rudere in `list` (`ruins` o
   * `ruinLots`, stessa forma {x,y,level,spr,frontSpr,_f,clearing}) di `dt`
   * secondi — chiamata ogni frame come stepConstructions() sotto, stesso
   * principio. `clearing` nasce `{ stepIndex: 0, t: 0 }` (sotto, al tap):
   * `c.curSpr === undefined` (stesso trucco di stepConstructions()) monta
   * subito il primo sprite/spawn invece di aspettare che scada anche il suo
   * `dur`, cosi' l'impalcatura compare nello stesso frame del pagamento
   * invece che un frame dopo. A fine catena chiama `onDone` (main.js, sotto:
   * `clearedPlaceholder()`), ripulisce il decoro transitorio (topper/gru,
   * `c.fb` sotto) e rimuove la voce da `list`.
   */
  function stepRuinClearing(list, dt, onDone) {
    for (let i = list.length - 1; i >= 0; i--) {
      const entry = list[i];
      const c = entry.clearing;
      if (!c) continue;
      const up = ruinClearUp(entry.level ?? 1);
      // Oggetto "edificio" fittizio, solo per riusare addConstructionSpawn()/
      // removeTransientDecor()/stepCranes() (main.js/cranes.js) cosi' come
      // sono invece di duplicarli per un rudere: id proprio (decorEntities
      // li filtra per buildingId), `depth: 0` (addDecor() lo traduce in -y da
      // solo, stessa convenzione di ogni edificio vero), `construction: true`
      // (stepCranes() avanza solo le gru di un "edificio" in cantiere).
      if (!c.fb) c.fb = { id: `ruinClear${nextRuinClearId++}`, x: entry.x, y: entry.y, depth: 0, type: "casa", construction: true };
      let cur = up.steps[c.stepIndex];
      if (c.curSpr === undefined) {
        c.curSpr = pickSpr(cur.spr);
        if (cur.spawn) addConstructionSpawn(c.fb, cur.spawn);
      }
      // [Nuova sequenza, richiesta dall'autore: "sui cantieri delle rovine
      // prima l'impalcatura viene montata, poi la rovina sparisce, poi
      // l'impalcatura viene smontata, in tutti i casi"] Prima di questa
      // correzione `entry.spr` veniva sovrascritto con lo sprite di
      // cantiere (`c.curSpr`) fin dal primissimo frame — il rudere spariva
      // di scatto nell'ISTANTE del tap, sostituito da una fondamenta spoglia
      // ancora prima che l'impalcatura fosse davvero "montata" sopra di lui.
      // Durante il primo passo (`c.stepIndex === 0`, la stessa finestra
      // accorciata da `ruspaFirstStepDur` sotto — stesso principio gia' in
      // uso per un edificio VIVO ruspato, buildings.js/`clearingLot`)
      // `entry.spr`/`_f` restano quindi quelli del rudere vero (mai toccati
      // qui): solo `frontSpr` (l'impalcatura in sovraimpressione,
      // calcolata dallo sprite di cantiere corrente, non da quello del
      // rudere — altrimenti frontSprFor() non riconoscerebbe un prefisso
      // "ru1x") compare gia' da subito, sopra il rudere ancora visibile —
      // "l'impalcatura viene montata". Solo dal SECONDO passo in poi il
      // "retro" passa alla sagoma vera di cantiere: e' quello il momento in
      // cui "la rovina sparisce" per davvero, mai prima. L'ultimo passo che
      // esaurisce l'array (sotto, `else`) resta il momento in cui
      // l'impalcatura residua sparisce insieme al posto lasciato libero —
      // "l'impalcatura viene smontata", invariato.
      if (c.stepIndex > 0) { entry.spr = c.curSpr; entry._f = frameFor(entry.spr); }
      entry.frontSpr = frontSprFor(c.curSpr);
      c.t += dt;
      const dur = (c.stepIndex === 0 && up.ruspaFirstStepDur != null) ? up.ruspaFirstStepDur : cur.dur;
      if (c.t < dur * TICK) continue;
      c.t = 0;
      c.stepIndex++;
      if (c.stepIndex < up.steps.length) {
        cur = up.steps[c.stepIndex];
        c.curSpr = pickSpr(cur.spr);
        if (cur.spawn) addConstructionSpawn(c.fb, cur.spawn);
        entry.spr = c.curSpr;
        entry._f = frameFor(entry.spr);
        entry.frontSpr = frontSprFor(entry.spr);
      } else {
        removeTransientDecor(c.fb);
        onDone(entry);
        list.splice(i, 1);
      }
    }
  }

  // `chies` e' gia' un'istanza vera nella room (src/rooms/match_easy.json:
  // un solo `chies` a (851,513), STUDIO.md §5.3), non nasce da un
  // placeholder. Va tolta da `staticWorld` (altrimenti sarebbe disegnata due
  // volte) e diventa la prima entita' di `buildings`, cosi' la sua catena di
  // potenziamento vera (upcrc12/upcrc23) resta raggiungibile toccandola,
  // esattamente come per gli edifici piazzati dal giocatore.
  const chiesIndex = staticWorld.findIndex((it) => it.obj === "chies");
  const chiesScene = chiesIndex >= 0 ? staticWorld.splice(chiesIndex, 1)[0] : null;

  // [Bug corretto, segnalato dall'autore: "le strutture di difesa esistenti
  // nel tutorial non sembrano funzionanti"] Solo sulla room "tutorial"
  // (game/src/tutorial.js): a differenza di match/match_easy (che pre-
  // piazzano solo `chies`, sopra), la sua scena include gia' diversi
  // edifici VERI — casa2/casa3/industria1/industria2/parco/gatlinggun/
  // rocket_launcher, la meta' di citta' sopravvissuta al bombardamento
  // della cutscene iniziale (STUDIO.md/tutorial.js) — mai tolti da
  // `staticWorld` finora: restavano puro decoro statico, MAI in
  // `buildings`, quindi invisibili a stepTurretAim()/stepProjectiles() (le
  // torrette di difesa non rispondevano mai a una minaccia vera) e ad ogni
  // altra simulazione che legge quell'array (produzione/crescita/consumo,
  // ruspa, potenziamenti). Le stesse baseline `tutpar`/`tutind`/`tutrl`
  // (tutorial.js/createTutorialState()) gia' presupponevano che lo
  // fossero: contano quanti ne esistono GIA' apposta per sottrarli dal
  // conteggio di cio' che il giocatore costruisce durante il tutorial — un
  // conto che senza questo fix non tornava mai (un parco pre-esistente non
  // contava mai in `builtAtLevel("parco",1)`, quindi il tutorial avrebbe
  // richiesto di costruirne 5 di nuovi invece di uno solo per superare la
  // fase). Tolte qui da `staticWorld` (stesso principio di chies sopra);
  // seedTutorialBuildings() piu' sotto (dopo che r12 esiste davvero) le
  // trasforma in `buildings` veri, gia' finiti al livello che il loro nome
  // implica.
  const TUTORIAL_PREBUILT_TYPES = {
    casa2: { type: "casa", level: 2 }, casa3: { type: "casa", level: 3 },
    industria1: { type: "industria", level: 1 }, industria2: { type: "industria", level: 2 },
    parco: { type: "parco", level: 1 },
    gatlinggun: { type: "gatling", level: 1 }, rocket_launcher: { type: "missile", level: 1 },
  };
  const tutorialPrebuilt = roomName === "tutorial"
    ? staticWorld.filter((it) => TUTORIAL_PREBUILT_TYPES[it.obj])
    : [];
  for (const it of tutorialPrebuilt) staticWorld.splice(staticWorld.indexOf(it), 1);

  // `pu1` e' anche lei gia' un'istanza vera nella room ([C] src/rooms/
  // match_easy.json, sprite "p1" = la stessa casetta del bottone "casa" qui
  // sotto, a depth -9998 = sempre in primo piano). Nell'originale e' un
  // pannello invisibile che genera i propri figli/bottoni via codice
  // (src/objects/pu1/Create.gml — STUDIO.md §5.4): quello che si vede a
  // schermo non e' mai lei stessa, sono i figli. Qui i suoi figli sono
  // ricostruiti come UI vera in spazio schermo (vedi `uiButtons` piu' sotto),
  // quindi l'istanza originale nel mondo va tolta — altrimenti resta un
  // secondo bottone "casa" fantasma, disegnato come sprite di mondo invece
  // che UI, proprio sopra a quello vero (segnalato dall'autore: "doppia
  // casetta").
  const pu1Index = staticWorld.findIndex((it) => it.obj === "pu1");
  if (pu1Index >= 0) staticWorld.splice(pu1Index, 1);

  // `reversi` (sprite di default "tut_ok", ma Create.gml lo cambia subito in
  // "tut_exit") e' anche lei gia' un'istanza vera nella room — lo stesso
  // schema di `pu1` sopra: e' il bottone "esci"/torna al menu del vecchio
  // menu di pausa dell'originale. **[C]** `reversi/Step.gml`: si sposta OGNI
  // frame in spazio schermo (`action_move_to(view_xview[0]+409*sca, ...)`)
  // SOLO quando `pu1.menoo!=0` (pausa aperta); altrimenti va a `(-1000,
  // -1000)`, fuori mappa — mai un decoro fermo alla propria posizione nella
  // room. Qui il menu di pausa e' gia' vera UI in spazio schermo (STUDIO.md,
  // drawPauseOverlay() piu' sotto), quindi l'istanza originale nel mondo va
  // tolta come `pu1` — altrimenti resta ferma alle sue coordinate di
  // piazzamento per sempre, un'icona nera "pollice in su" sospesa nel vuoto
  // sopra `match` (depth -14001, sempre in primo piano) — segnalato
  // dall'autore ("gli omini a destra"): non erano omini, era questo bottone.
  const reversiIndex = staticWorld.findIndex((it) => it.obj === "reversi");
  if (reversiIndex >= 0) staticWorld.splice(reversiIndex, 1);

  // `honda_facile_1`/`honda_facile_2` (match_easy) o `honda1`/`honda2`
  // (match — STUDIO.md, letti dopo la prima sessione su questa room) sono
  // anche loro gia' istanze vere nella room (STUDIO.md §5.3 "veicoli_
  // target"): nell'originale non stanno ferme, guidano avanti e indietro
  // lungo un percorso fisso finche' l'olio non finisce (game/src/cars.js).
  // Tolte da staticWorld — altrimenti resterebbero due comparse immobili
  // sotto alle auto vere che si muovono sopra di loro — e sostituite dalle
  // istanze simulate in `cars` piu' sotto.
  // [Bug corretto] `tutorial` ha anche una terza istanza statica, `honda3`
  // (assente da `match`/`match_easy`, verificato su tutte e tre le scene) —
  // una nota precedente la lasciava ferma per scelta, assumendo che
  // `CAR_TYPES.honda3.spawn` (cars.js: il punto fisso di `carmaker`, le auto
  // che arrivano nel tempo su tutte e tre le room) non fosse la posizione
  // reale di QUESTA istanza. **[C]** Rileggendo `honda3/Create.gml`: il nudge
  // relativo (+21,-26), applicato quando `action_if_number(736,1,0)` e' vero
  // (lo stesso flag "0=match/1=match_easy" letto ovunque nel motore,
  // game/src/state.js) — su `tutorial` (`roomName==="match"`, STUDIO.md)
  // vale `false`, lo stesso ramo di `match`, quindi NON si applica: la
  // posizione vera dell'istanza (1841,631, `tutorial.scene.json`) piu' il
  // nudge da' (1862,605) — a un pixel da `CAR_TYPES.honda3.spawn`
  // (1863,604, gia' scritto per `carmaker`): sono lo stesso punto. Simulata
  // come honda1/honda2: tolta da `staticWorld`, spawnata da subito invece
  // che dopo 60s da `carmaker` (che qui SALTA il suo stesso primo turno,
  // `carmakerIdx` sotto, per non farla comparire due volte).
  const INITIAL_CAR_TYPES = roomName === "tutorial" ? ["honda1", "honda2", "honda3"]
    : roomName === "match" ? ["honda1", "honda2"] : ["honda_facile_1", "honda_facile_2"];
  for (const name of INITIAL_CAR_TYPES) {
    const idx = staticWorld.findIndex((it) => it.obj === name);
    if (idx >= 0) staticWorld.splice(idx, 1);
  }

  // La base volante (game/src/platform.js, applyMatchPlatform()): mai su
  // `match_easy` (una mappa piatta vera, nessun `r12`/`baa11`), ma non solo
  // su `match` — `tutorial` (game/src/tutorial.js) ha lo stesso identico
  // `r12`/baa11 nella propria room (STUDIO.md — la meta' SINISTRA della
  // piattaforma e' gia' li', risolta dalla pipeline di scena come per
  // `match`), che da sola copre solo x:[-17,1153] su una room larga 1920:
  // senza spingere anche r120/baa12 (la meta' destra) il resto della mappa
  // restava sospeso nel vuoto, "tagliato" a meta' — esattamente lo stesso
  // bug di `match` (sopra) gia' risolto una volta, ripresentatosi qui
  // perche' la room non era mai stata inclusa in questa chiamata.
  // [Decisione dell'autore: "estendi le dimensioni della room [tutorial] in
  // modo che siano pari a quelle di match e verifica che la piattaforma sia
  // rappresentata completamente come in match"] `interactive:true` anche su
  // tutorial (non piu' solo `match`): la catena fari/r22/r32 (game/src/
  // platform.js, sotto) diventa raggiungibile anche li' — stesso
  // trattamento riservato PRIMA solo allo sfondo sfocato della title screen
  // (game/src/title.js, sempre `interactive:false` la', una scena mai
  // giocata) resta quello, il tutorial no: e' una partita vera. La room
  // stessa (game/data/tutorial.scene.json, width/height) e' stata allargata
  // a 3900x2090 (le dimensioni di `match`, sotto SCENE_WIDTH in
  // platform.js) apposta per questo — la piattaforma vera (r120/motori/
  // fari/le due espansioni r32/r22, tutte a coordinate ASSOLUTE fisse in
  // platform.js, indipendenti dal contenuto proprio della room) si estende
  // ben oltre i vecchi 1920x1086 di `match_easy` che tutorial riusava
  // finora: senza spazio a sufficienza la camera non avrebbe mai potuto
  // panoramicare fin li', anche a `platformState` gia' inizializzato sotto.
  if (roomName === "match" || roomName === "tutorial") {
    applyMatchPlatform(staticWorld, { interactive: roomName === "match" || roomName === "tutorial" });
  }
  // [Bug corretto] `applyMatchPlatform()` PUSHA istanze nuove in `staticWorld`
  // (r120/baa12) DOPO il ciclo che assegna `_f` a tutto il resto (sopra,
  // "for (const it of staticWorld) it._f = frameFor(it.spr)"): senza questo
  // richiamo, quelle istanze restavano per sempre senza `_f`, e il ciclo di
  // disegno le scarta in silenzio (`if (!f) continue`, piu' sotto — lo stesso
  // trattamento riservato ai collisori invisibili veri, "arte persa" solo
  // nel nome). r120/baa12 non e' MAI comparso a schermo, in nessun test: la
  // meta' di `match` che l'autore continuava a vedere sospesa nel vuoto
  // ("è baa12", insistito piu' volte) non era ne' un problema di posizione
  // ne' uno sprite mancante — la texture era sempre stata quella giusta, non
  // veniva mai disegnata. `r12`/baa11 se la cavava per un motivo diverso:
  // e' gia' un'istanza vera in `match.scene.json` (risolta dalla pipeline di
  // scena PRIMA di questo file), quindi il suo `_f` viene assegnato nel primo
  // giro, in tempo.
  for (const it of staticWorld) if (!it._f) it._f = frameFor(it.spr);
  // Catena fari -> seconda piattaforma (game/src/platform.js): su `match` e
  // `tutorial` (decisione dell'autore, vedi il commento su
  // applyMatchPlatform() sopra), come r120 li' — `match_easy` resta
  // l'unica room senza, non avendo ne' la base volante ne' `chies` capace
  // di raggiungere i livelli che sbloccano i fari (STUDIO.md, gap
  // dichiarati).
  let platformState = (roomName === "match" || roomName === "tutorial") ? createFaroState() : null;

  // Semafori (game/src/semaphores.js, STUDIO.md): `object8` ("se", il palo —
  // mai rinominato dall'autore originale) resta in staticWorld com'e', un
  // oggetto di mondo fermo come un albero; il tappo colorato che lampeggia
  // (`object37` nel decompilato) e' un figlio creato al suo Create, quindi
  // qui ne creiamo uno per ogni palo gia' in scena — le 48 istanze di
  // match_easy — invece di uno per staticWorld com'era per i cambi di sprite
  // degli alberi, perche' questo ha bisogno di continuare ad avanzare ad ogni
  // frame (stepSemaphores() piu' sotto), non solo di uno sprite scelto una
  // volta.
  const semaphores = staticWorld.filter((it) => it.obj === "object8").map((it) => createSemaphore(it.x, it.y));

  /** @type {ReturnType<typeof placeBuilding>[]} */
  let buildings = [];
  let decorEntities = [];      // ornamenti (permanenti a fine cantiere, o transitori durante)
  // I ruderi (game/src/buildings.js, ruinSpriteFor()): quando la vita di un
  // edificio finito arriva a 0, l'originale non lo rimuove — lo sostituisce
  // con un oggetto "ruin*" permanente (STUDIO.md, "il rudere") che nessuno
  // strumento nel motore puo' rimuovere (la ruspa/`selec==11` non e' mai stata
  // ricostruita). Array a parte invece che dentro `buildings`: un rudere non
  // simula piu' niente (nessuna produzione/crescita/mira/fulmine), e' decoro
  // inerte come `decorEntities` — vedi destroyBuilding() sotto.
  let ruins = [];

  // ------------------------------------------------------------- tutorial
  // Solo sulla room "tutorial" (game/src/tutorial.js, STUDIO.md): stato del
  // controller a fasi (tutorial_square) + i lotti-rudere piazzati a mano
  // nella room (ruin1/ruin2 — un meccanismo dedicato, diverso dai `ruins` da
  // battaglia sopra: vedi il commento in tutorial.js). `ruinLots` sostituisce
  // le istanze `ruin1`/`ruin2` in `staticWorld`: da qui in poi vivono solo
  // qui, con hover/click propri (input.onTap piu' sotto), non piu' come
  // decoro passivo.
  let tutorialState = null;
  let ruinLots = [];
  // Balloon di testo + bottone "avanti/esci" (tutorial_square|tutorial_thumb/
  // DrawGUI.gml): entrambi disegnati nel layer GUI come ogni altro elemento
  // del motore (font bitmap vero, `fontMobile` sopra — non un div HTML),
  // non piu' un elemento DOM a parte. `tutorialOkRect` (sotto) e' il
  // rettangolo schermo del pollice, ricalcolato ad ogni frame, letto da
  // input.onTap per il tocco.
  let tutorialOkRect = null;   // { x, y, w, h }, ricalcolato ad ogni frame dal disegno
  // { left, right, top, bottom } del box testo, ricalcolato ad ogni frame:
  // serve al pollice (sotto) per agganciarsi sopra al box invece che di fianco.
  let tutorialBoxRect = null;
  if (roomName === "tutorial") {
    tutorialState = createTutorialState(scene);
    ruinLots = extractRuinLots(scene);
    for (const lot of ruinLots) lot._f = frameFor(lot.spr);
    // `air_tut2` (letto sopra solo per la sua posizione, createCutscene()) e'
    // anche lui gia' un'istanza vera della room col proprio sprite di default
    // ("tuto_bomb") — va tolta da staticWorld com'e' gia' per ruin1/ruin2,
    // altrimenti resta un bombardiere immobile per sempre, sovrapposto alla
    // stessa cutscene che lo simula.
    for (let i = staticWorld.length - 1; i >= 0; i--) {
      if (staticWorld[i].obj === "ruin1" || staticWorld[i].obj === "ruin2" || staticWorld[i].obj === "air_tut2") staticWorld.splice(i, 1);
    }
  }
  // [C] tutorial_thumb/Mouse_LeftPressed.gml (STUDIO.md, tutorial.js
  // header — l'operatore letto correttamente e' "!=", non "=="): un tocco
  // avanza SEMPRE alla fase successiva, tranne all'ultima (LAST_PHASE) dove
  // invece riporta al menu. `phase===4` in piu' crea la moneta di pratica
  // (STUDIO.md/tutorial.js, sold13). **[I]** `phase += 1` invece di `+0.5`:
  // vedi il commento in cima a tutorial.js per il perche'.
  function advanceTutorial() {
    if (tutorialState.phase === 4 && !tutorialState.practiceCoinSpawned) {
      tutorialState.practiceCoinSpawned = true;
      coins.push({
        buildingId: null, x: tutorialState.practiceCoinPos.x, y: tutorialState.practiceCoinPos.y,
        depth: COIN_DEPTH, amount: 260, kind: "mon", t: 0, spr: "soldico", auto: false,
        _tutorialPractice: true,
      });
    }
    if (tutorialState.phase >= LAST_PHASE) navigate("menu");
    else tutorialState.phase += 1;
  }
  // I lotti "extra" occupati da un edificio multi-tile (oggi solo `eolico`,
  // buildings.js `def.multiTile`) — [C] `impavent` uccide ogni placeholder che
  // la sua maschera copre, non solo quello toccato (vedi placeAt() sotto): qui
  // non c'e' niente da disegnare li' (nessun edificio/rudere), solo un
  // placeholder che deve restare bloccato per sempre. Nessun array a parte
  // servirebbe se il salvataggio potesse derivarli da `buildings`/`ruins`, ma
  // per definizione questi lotti non hanno nessuna delle due cose sopra —
  // persistito a parte in save.js, altrimenti un ciclo salva/carica li
  // libererebbe di nuovo (STUDIO.md non lo segnalava perche' e' un problema
  // nuovo, nato con questo edificio).
  let blockedSlots = [];
  // Auto decorative gia' in marcia da subito, come nella room originale
  // (phaseT parte da 0 = fase "giorno" in PHASES piu' sotto, quindi mai
  // notte alla nascita: nessun tint fanali sulle due iniziali).
  let cars = INITIAL_CAR_TYPES.map((t) => spawnCar(t, false));
  // `carmaker` (game/src/cars.js, CARMAKER_SCHEDULE): non e' un edificio ne'
  // un'istanza di scena, e' un timer che r12 avvia incondizionatamente in
  // ogni room — ogni 60s di gioco arriva un'altra auto (honda3..honda9),
  // finche' non sono comparse tutte e sette. `carmakerT` e' lo stesso
  // cronometro, `carmakerIdx` il prossimo tipo ancora da far comparire.
  // Su `tutorial` honda3 e' gia' partita da subito (INITIAL_CAR_TYPES sopra,
  // stessa posizione di spawn di CARMAKER_SCHEDULE[0]): si salta quella
  // prima voce, altrimenti a 60s ne comparirebbe una SECONDA identica,
  // sovrapposta al punto di partenza della prima.
  let carmakerT = 0, carmakerIdx = roomName === "tutorial" ? 1 : 0;
  // Nuvole e uccelli (game/src/atmosphere.js): stesso timer di r12/Alarm_0.gml,
  // puramente decorativi (non incidono su niente in r12).
  const atmo = createAtmosphere();
  // Pedoni (game/src/pedestrians.js): un "pplo" per ogni salto di livello di
  // una casa (vedi spawnDecor() piu' sotto) — vuoto all'avvio, match_easy
  // parte senza nessuna casa gia' costruita.
  let pedestrians = [];
  // Mongolfiere (game/src/balloons.js): `balloons`/`loot` sono le mongolfiere
  // di risorse/spia e le casse che lasciano cadere (r12/Alarm_1.gml, ogni 5s);
  // `constructionBalloons`/`constructionBoxes` sono il pacco che ogni `casa`/
  // `industria` piazzata si porta dietro (placeholder/Mouse_LeftReleased.gml),
  // spawnate una alla volta da placeAt() piu' sotto, non da un timer.
  let balloons = [];
  let loot = [];
  let constructionBalloons = [];
  let constructionBoxes = [];
  // I pulsanti blu delle monete (game/src/coins.js): una per `casa` felice e
  // con corrente, ogni 3000 tick — vedi stepCoinSpawner() piu' sotto.
  let coins = [];
  // Le "bolle" che animano la raccolta di una moneta (nostre, non
  // dell'originale — vedi bubbleTex sopra): { x, y, t }, spawnate da
  // collectCoinAt() piu' sotto e disegnate/scartate nel loop principale.
  let coinPops = [];
  const COIN_POP_LIFE = 0.4;
  // Il fumo decorativo delle centrali (game/src/smoke.js): una o due ciminiere
  // per `industria` in piedi, mai in cantiere — vedi stepSmokeSpawner() piu'
  // sotto.
  let smoke = [];
  // Il lampo del fulmine (game/src/lightning.js) — un colpo per ogni edificio
  // (stepStormDamage, buildings.js) o mongolfiera (stepBalloons, balloons.js)
  // effettivamente colpiti durante una tempesta, vedi entrambe le chiamate
  // piu' sotto.
  let lightning = [];
  // La pioggia vera del temporale (game/src/weather.js) — sia quello vero
  // di `match` (r12.storm) sia quello cosmetico di `match_easy`
  // (r12.stormeasy): stepRain() piu' sotto decide da solo se e' il momento
  // di farla cadere, in base a quale dei due e' attivo.
  let weatherState = createWeatherState();
  // Minacce vere (game/src/threats.js): `threats` sono aerei/bombardieri/
  // zeppelin, fatti nascere da stepThreatSpawner (r12/Alarm_4|5|6.gml) ogni
  // volta che una mongolfiera spia viene ignorata abbastanza a lungo da
  // "riuscire" (balloons.js). `bombs`/`explosions` sono quello che lasciano
  // cadere in volo.
  let threats = [];
  let bombs = [];
  let explosions = [];
  // Scia di fumo di aerei/bombardieri (game/src/threats.js, spawnAerSmoke/
  // stepAerSmoke) — mai gli zeppelin, [C] nessun Alarm_6 su dirig.
  let aerSmoke = [];
  // Pezzi di fusoliera che bombar stacca entrando in stato piro
  // (game/src/threats.js, spawnDebris/stepDebris) — mai air/dirig.
  let debris = [];
  // Il fuoco vero delle torrette (game/src/projectiles.js): stepTurretFire
  // crea i colpi (dalla punta del cannone, quando una minaccia vera e' entro
  // portata), stepProjectiles li fa volare e colpire.
  let projectiles = [];
  // Sbuffi di fumo di scia (game/src/projectiles.js, spawnSmoko/stepSmoko):
  // la scia del razzo in volo + il singolo sbuffo alla bocca del gatling —
  // non il fumo delle centrali (quello e' `smoke`, game/src/smoke.js).
  let trails = [];
  // Fasci del laser (game/src/projectiles.js, spawnBeam/stepBeams): l'unico
  // colpo del motore che non e' un proiettile ne' un fotogramma di sprite —
  // un quad pieno disegnato da drawBeams() sotto, vedi il commento su
  // WEAPONS.laser in projectiles.js.
  let beams = [];
  let r12 = createR12(roomName === "match");
  // [Nuova funzionalita', richiesta dall'autore: "in tutorial partiamo con
  // 10000 soldi in piu', altrimenti rischiano di non bastare"] Il tutorial fa
  // costruire ruderi/case/centrale/parco/missile ben prima che le tasse
  // raccolte bastino da sole: i 5500 di partenza di createR12() (state.js,
  // uguali su ogni room) a volte non reggono l'intera sequenza guidata.
  // `monReal` aggiornato insieme (state.js/clampR12, DEBUG_INFINITE_RESOURCES):
  // resta il valore genuino "usabile" anche se il debug/sandbox e' spento.
  if (roomName === "tutorial") { r12.mon += 10000; r12.monReal += 10000; }
  let selectedType = "casa";   // scelto dal selettore in basso a sinistra

  // La ruspa (`puruspa`, `selec===11`, STUDIO.md/OTHER_BUILDINGS sotto): tocco
  // su un edificio finito con la ruspa selezionata NON demolisce subito — apre
  // un popup si'/no come nel decompilato (`demobasia`, che crea `demobachia`/
  // `demoiessa`/`disegnaprezzo` — src/objects), letto qui in un solo oggetto
  // invece di quattro. `null` = nessun popup aperto. Vedi il commento sul
  // ramo "building" di input.onTap piu' sotto per come si arma/si conferma.
  let ruspaPending = null;   // { buildingId, cost } — la posizione si legge da b.x/b.y quando serve, non duplicata qui

  // Il pannello prestiti (src/objects/loanoscrino + get_loan1..4, state.js
  // LOANS/loanActive/takeLoan): a differenza del popup della ruspa (ancorato
  // al mondo, vicino all'edificio) e' un vero modale in spazio schermo — [C]
  // `loanoscrino/Step.gml`, ramo `os_type==4` (Android, il nostro target):
  // si RICENTRA sulla view ad ogni Step, di fatto un overlay fullscreen sul
  // solo target mobile del decompilato, non ancorato al mondo come sembra
  // dal punto di creazione relativo a `bankbuttoner`. `true` = aperto (un
  // solo banca possibile per partita, STUDIO.md — nessun bisogno di un id).
  // `bankButtons` sono i rettangoli schermo dei 4 bottoni prestito,
  // ricalcolati ad ogni frame dal disegno (stesso schema di `uiButtons`),
  // letti da input.onTap sotto.
  let bankPanelOpen = false;
  let bankButtons = [];   // { x, y, w, h, index }

  // Pannello informativo di un edificio (drawBuildingInfoPanel() piu' sotto)
  // — [Nuova funzionalita', richiesta dall'autore: "quando la mano e'
  // selezionata e clicchi su un edificio (non difensivo), mostra un
  // roundrect bianco con una tabella riepilogativa delle stats"]. Tiene
  // l'istanza edificio stessa (non un id: input.onTap la legge gia' cosi'
  // per ogni altro popup ancorato a un edificio, es. `ruspaPending` sopra),
  // azzerato anche quando quell'edificio viene demolito/distrutto sotto
  // panel aperto (destroyBuilding()/demolishMultiTile() sopra). Vero modale
  // in spazio schermo come `bankPanelOpen`: mentre e' aperto un tap va
  // SOLO al suo bottone di chiusura, mai al mondo sotto.
  let buildingInfoPanel = null;   // istanza edificio, o null

  // Overlay costruzioni per mobile (drawBuildMenuOverlay() piu' sotto) —
  // [Nuova funzionalita', richiesta dall'autore: "sul mobile, invece della
  // riga scorrevole apri una schermata modale tipo quella di pausa, con
  // quattro pulsanti edifici per riga su tre righe"]. Solo `isMobile`
  // (sopra): su desktop il bottone "costruzioni" continua ad aprire la
  // riga scorrevole di sempre (menoo=1), c'e' gia' spazio orizzontale a
  // sufficienza li'. Stesso modale in spazio schermo di bankPanelOpen/
  // buildingInfoPanel: mentre e' aperto un tap va SOLO ai suoi bottoni.
  // `buildMenuButtons` (i rettangoli-griglia, ricalcolati ad inizio frame —
  // vedi il commento sulla freccia del tutorial piu' sotto per il perche')
  // sono lo stesso genere di array di `uiButtons`/`bankButtons`.
  let buildMenuOpen = false;
  let buildMenuButtons = [];   // { x, y, w, h, type?, spr? } — niente `type` = "Back"
  // Cartellino prezzo/"Level N to unlock" della griglia mobile
  // (drawBuildMenuOverlay(), sotto) — l'equivalente touch dell'hover mouse
  // della riga scorrevole desktop (uiButtons piu' sotto). `input.hover`
  // segue anche un dito che scorre SENZA sollevarsi (Input._move(), input.js
  // — aggiornato ad ogni pointermove, touch incluso, non solo mouse), quindi
  // "fa pan sopra" un bottone lo rivela gia' in diretta; un tap secco pero'
  // solleva subito il dito (Input._up(): niente hover per il touch a
  // contatto perso) — `buildMenuTagType`/`buildMenuTagUntil` tengono vivo il
  // cartellino ancora un attimo dopo, armati dal tap stesso (onTap, sotto)
  // con un timestamp assoluto (`performance.now()`, come il resto dei timer
  // "usa e getta" di questo motore) invece di un altro contatore dt-based.
  let buildMenuTagType = null;
  let buildMenuTagUntil = 0;
  // [Bug corretto, richiesto dall'autore: "quando clicco un edificio ancora
  // bloccato lo sprite 'level N to unlock' deve comparire mezzo secondo e
  // sparire in dissolvenza"] Stato dedicato, separato da buildMenuTagType/
  // Until sopra: quello resta il timer "linger" dell'hover dal vivo (pieno,
  // sparizione di scatto quando scade — corretto per un dito che scorre e
  // si solleva), un TAP secco su un bottone (onTap, sotto) arma invece
  // questi due — GRID_TAP_SHOW_MS pieno seguito da GRID_TAP_FADE_MS di
  // dissolvenza (drawBuildMenuOverlay(), sotto).
  // [Nuova funzionalita', richiesta dall'autore: "su mobile come fa
  // l'utente a vedere il prezzo di un edificio? facciamolo in dissolvenza
  // come 'level N to unlock', ma confermiamo la scelta al primo tap e
  // facciamo apparire il cartellino insieme — un secondo tap per
  // confermare diventa poco chiaro"] Un bottone gia' SBLOCCATO selezionava
  // (r12.selec) e chiudeva l'overlay al primo tocco (sotto) senza lasciare
  // mai il tempo di leggere il cartellino prezzo — l'unico altro modo per
  // vederlo era un dito fermo sopra SENZA sollevarlo (`input.hover`, il
  // vero hover desktop qui sotto), un gesto che un tap normale non fa mai.
  // La selezione resta immediata al primo tap (invariata) — solo la
  // CHIUSURA dell'overlay si ritarda: il tap arma anche `gridTapTagType`/
  // `At`, drawBuildMenuOverlay() mostra il cartellino sopra il bottone
  // appena scelto, e chiude l'overlay DA SOLA quando il cartellino e'
  // finito di dissolversi (mai su un bottone ancora bloccato: quello non
  // seleziona mai, vedi il commento li'). Il nome non e' piu' "locked": lo
  // stesso stato copre ora entrambi i casi (prezzo o "Level N to unlock").
  let gridTapTagType = null;
  let gridTapTagAt = 0;
  const GRID_TAP_SHOW_MS = 500;
  const GRID_TAP_FADE_MS = 400;

  // Il decoro (`cddvd`/`cddvd2`/`cddvd3*`, `di*`) non si accumula: ogni salto
  // di livello uccide il decoro precedente e ne crea uno nuovo (`with (cddvd)
  // { action_kill_object(); }` dentro upcrc12/upcrc23, stesso schema per
  // industria). Qui equivale a rimpiazzare tutte le entita' decoro di
  // quell'edificio, incluso il decoro transitorio (gru/macerie) di un
  // cantiere in corso.
  function spawnDecor(building, decorSprites) {
    // `d.transient`: il decoro di cantiere (gru/topper, addConstructionSpawn()
    // sotto) non va toccato qui — solo il decoro FINALE del livello
    // precedente. Prima il filtro non distingueva i due, quindi rimpiazzare il
    // decoro finale (che ora scatta all'INGRESSO dell'ultimo passo, vedi
    // stepConstructions() in buildings.js) cancellava anche gru/topper appena
    // piazzati, nello stesso istante in cui l'edificio finito compariva
    // (bug segnalato dall'autore: "vedo le gru montarsi ma... spariscono
    // subito"). Il decoro transitorio sparisce invece in removeTransientDecor()
    // sotto, quando l'impalcatura e' DAVVERO smontata.
    decorEntities = decorEntities.filter((d) => d.buildingId !== building.id || d.transient);
    // `parco` non ha un decoro fisso per livello come gli altri tre: il suo
    // e' uno scatter casuale di alberi/lampioni (vedi spawnParcoScatter() e
    // il commento su BUILDING_TYPES.parco in buildings.js) — intercettato
    // qui, allo stesso punto in cui stepConstructions() segnala "cantiere
    // finito", invece che dentro buildings.js che non sa niente di alberi o
    // lampioni.
    if (building.type === "parco") { spawnParcoScatter(building); return; }
    // Un decoro e' di solito solo un nome di sprite (dx/dy/lit di default
    // vanno bene per tutti); `grattacielo` (buildings.js) passa invece
    // `{spr, fadeTicks}` per le finestre notturne, ognuna con la propria
    // velocita' di dissolvenza (vedi addDecor()/stepLights() sotto).
    addDecor(building, decorSprites.map((d) =>
      typeof d === "string" ? { spr: d, dx: 0, dy: 0 } : { spr: d.spr, dx: 0, dy: 0, fadeTicks: d.fadeTicks }));
    // [C] casa1|2|3/Create.gml: l'ultima riga crea un "pplo" (STUDIO.md) alla
    // posizione della casa — un abitante per ogni salto di livello, non uno
    // per casa: una casa a livello 3 ne ha lasciati indietro due, mai
    // rimossi (nemmeno casaN/Destroy.gml li tocca — sopravvivono alla casa).
    // [C] villa1/Create.gml: stesso `action_create_object(pplo, 0, 0)` di
    // casa, ma una volta sola (villa e' un solo livello, questo "salto" e'
    // anche l'unico) — altri se ne aggiungono poi durante la crescita
    // (`g.pedestrianDice`, stepGrowth() in buildings.js).
    if (building.type === "casa" || building.type === "villa") pedestrians.push(spawnPedestrian(building.x, building.y));
  }

  /** Decoro transitorio (gru/macerie durante un cantiere): si aggiunge senza
   * rimpiazzare, e sparisce quando `spawnDecor` sostituisce tutto a fine
   * cantiere (STUDIO.md §9: la traccia "f" degli impa* non e' ricostruita,
   * questo e' quanto resta della sua parte scenografica).
   *
   * I decori "luce" (bagliore finestre: crcl/c111l/i11l/... — STUDIO.md §5.3
   * "notte_target") sono lo stesso oggetto ma con un depth piu' vicino di 1
   * rispetto al proprio edificio (`-y - 1` contro `-y`, esattamente come
   * cddvd/d111/di11b/Create.gml: `depth = -y - 1`): "saltano" davanti a lui
   * nell'ordine di disegno invece di restare alla pari, e — vedi
   * `stepLights()`/il ciclo di disegno piu' sotto — davanti anche alla tinta
   * giorno/notte, che li spegnerebbe altrimenti invece di farli accendere.
   *
   * `lit: false` (usato per gli alberi/i pali dei lampioni dello scatter di
   * parco, vedi sotto) disattiva tutto questo: resta un decoro qualunque,
   * fermo alla y del suo edificio come un albero vero, tinto dal ciclo
   * giorno/notte come qualunque altro oggetto di mondo. */
  // [Bug corretto, segnalato dall'autore: "case e palazzi non dovrebbero
  // essere fade in / fade out ma usare degli sprite esistenti che
  // accendevano le finestre un po' alla volta"] **[C]** la dissolvenza in
  // alpha di stepLights() sotto approssimava una vera animazione:
  // `cddvd|cddvd2|cddvd3|d111/Step.gml` (chies/casa, verificati uno per
  // uno) impostano lo sprite del decoro su una variante "...x" con MOLTE
  // sottoimmagini vere (una finestra alla volta) e la fanno scorrere
  // all'INDIETRO (`image_speed:-1`, dall'ultimo frame a 0) per accendersi,
  // in AVANTI per spegnersi — mai un fade dell'immagine ferma. Ogni decoro
  // "l" a un solo frame (es. "c111l", `data/sprites.json`) ha un gemello
  // "x" con MOLTI frame veri nello stesso atlas ("c111x", 41..179 a
  // seconda della casa/edificio — un frame per finestra del disegno
  // originale, non un numero a caso): trovato qui, usato da stepLights()
  // per scegliere il frame giusto invece di sfumare l'alpha. Due
  // trasformazioni del nome, ENTRAMBE viste nel decompilato: la maggior
  // parte sostituisce la "l" finale con "x" (c111l->c111x, crc2l->crc2x —
  // cddvd2/cddvd3), il decoro base di chies invece AGGIUNGE una "x" senza
  // toglierla (crcl->crclx — cddvd) — provate entrambe, vince la prima che
  // esiste per davvero (frame_count>1 nell'atlas della room corrente). Se
  // nessuna esiste (industria: `di11b/Step.gml` accende di scatto, senza
  // scorrimento; club: `_pulse` sotto, ricolora invece di scorrere) resta
  // `null` — stepLights() ricade sulla dissolvenza in alpha di prima,
  // invariata per questi casi.
  function scrubSpriteFor(spr) {
    if (frameCountFor(spr) > 1) return spr;   // gia' lo sprite giusto (es. banca_lx)
    const replaced = spr.slice(0, -1) + "x";
    if (frameCountFor(replaced) > 1) return replaced;
    const appended = spr + "x";
    if (frameCountFor(appended) > 1) return appended;
    return null;
  }

  // Durata VERA (in tick, cioe' in sottoimmagini nominali dell'originale) di
  // ogni luce a scorrimento di casa/palazzo — **[C]** letta una volta da
  // `data/sprites.json` (`frame_count`) per i 100 sprite "...x" elencati in
  // `tools/23_atlas.py`/DEDUP_CONSECUTIVE_SPRITES. Serve perche' l'atlas
  // impacchettato NON ha piu' tanti frame quanti erano nell'originale: la
  // stragrande maggioranza erano duplicati byte per byte consecutivi (la
  // stessa finestra restava accesa per diversi tick prima che se ne
  // accendesse un'altra) e sono stati deduplicati per non costare ~1.1 GB
  // di VRAM decompressa (vedi il commento su DEDUP_CONSECUTIVE_SPRITES nel
  // tool) — `frameCountFor(scrubSpr)` dopo la deduplicazione riporta solo
  // 5..12 sottoimmagini VISIVE, non piu' la vera durata dell'accensione:
  // usarlo anche per il tempo (invece che solo per l'indice del frame da
  // mostrare) avrebbe fatto scorrere la luce 8-19 volte piu' veloce del
  // vero. `?? frameCountFor(scrubSpr)` sotto (stepLights()) resta il
  // fallback per qualunque sprite scrub NON in questa tabella (es.
  // banca_lx, mai deduplicato: la sua vera durata E' gia' il conteggio
  // nell'atlas).
  const SCRUB_TRUE_DURATION = {
    c111x: 95, c112x: 90, c113x: 86, c114x: 80, c121x: 87, c122x: 65,
    c123x: 56, c124x: 79, c131x: 90, c132x: 76, c133x: 89, c134x: 48,
    c141x: 72, c142x: 52, c143x: 49, c144x: 69, c151x: 82, c152x: 81,
    c153x: 67, c154x: 59, c211x: 85, c212x: 111, c213x: 95, c214x: 58,
    c221x: 64, c222x: 52, c223x: 69, c224x: 72, c231x: 78, c232x: 92,
    c233x: 96, c234x: 93, c241x: 61, c242x: 77, c243x: 88, c244x: 72,
    c251x: 91, c252x: 67, c253x: 75, c254x: 88, c311x: 108, c312x: 93,
    c313x: 91, c314x: 93, c321x: 54, c322x: 68, c323x: 82, c324x: 60,
    c331x: 75, c332x: 51, c333x: 66, c334x: 41, c341x: 83, c342x: 96,
    c343x: 95, c344x: 67, c351x: 64, c352x: 73, c353x: 63, c354x: 52,
    c411sx: 126, c412dx: 179, c413sx: 149, c414dx: 62, c421x: 73, c422x: 82,
    c423x: 74, c424x: 71, c431x: 62, c432x: 68, c433x: 62, c434x: 53,
    c441x: 60, c442x: 52, c443x: 56, c444x: 77, c451x: 85, c452x: 54,
    c453x: 96, c454x: 102, c511x: 115, c512x: 103, c513x: 94, c514x: 74,
    c521x: 111, c522x: 75, c523x: 85, c524x: 106, c531x: 59, c532x: 64,
    c533x: 76, c534x: 63, c541x: 93, c542x: 77, c543x: 71, c544x: 83,
    c551x: 93, c552x: 91, c553x: 71, c554x: 81,
  };

  // [Bug corretto, richiesto dall'autore: "forse anche il club ne aveva una
  // particolare (pulsava)"] **[C]** `clublite1..4/Alarm_0.gml`:
  // `action_sprite_set(club11i, 0, 1)` — sottoimmagine 0, image_speed 1: a
  // differenza di chies/casa (scorse a mano, `_scrubSpr`, sempre in UNA
  // direzione secondo `_lightT`) qui GameMaker anima da SOLO, in loop
  // continuo avanti (velocita' di default, mai piu' toccata) — "club11i"
  // ha davvero molte sottoimmagini (`data/sprites.json`: 23..34 a seconda
  // della variante), un vero "sfarfallio" di finestre che gira in tondo
  // per tutta la notte, non uno scorrimento diretto una volta sola come le
  // altre luci. `clublite1..4/Alarm_2.gml` (uno per variante, stessa
  // logica) aggiunge sopra la RICOLORAZIONE a dado ogni 30 tick fra 4
  // tinte equiprobabili (due `action_if_dice(2)` annidati) — il "pulsare"
  // vero e proprio, un cambio di colore mentre lo sfarfallio gira sotto.
  // Valori `action_sprite_color(V, 1)` ricomposti come sempre (R nel byte
  // basso, B nel byte alto — stessa formula di ARMED_TINT/NIGHT_TINT
  // altrove nel motore).
  const CLUB_COLORS = [0xff7c5b, 0xff00ff, 0xffff80, 0x00ff80];
  const CLUB_PULSE_PERIOD = 30 * TICK;
  // [C] clublite1..4/Step.gml: accensione/spegnimento armati con SOLI 2
  // tick di ritardo (`action_set_alarm(2, ...)`) — uno scatto quasi
  // istantaneo, non i 200 tick di LIGHT_FADE condivisi da ogni altro
  // decoro senza uno sprite/comportamento speciale.
  const CLUB_SNAP = 2 * TICK;

  function addDecor(building, spawns, { transient = false } = {}) {
    // [Bug corretto, segnalato dall'autore: "in alcuni casi c'e' un overlay
    // sbagliato tra edifici e luci degli edifici dietro, forse legato al
    // fatto che sono quelli a due slot?"] Il decoro (qui il bagliore delle
    // finestre notturne, spawnDecor() sopra) calcolava il proprio depth da
    // `-building.y` grezzo, IGNORANDO l'eventuale depth "vero" gia' scelto
    // per l'edificio stesso (`building.depth`, il campo che effDepth() legge
    // quando non e' 0 — vedi il commento li' sopra). Per un edificio normale
    // i due coincidono (`building.depth` resta 0, quindi coincide con
    // `-building.y`) — ma un edificio "a due lotti" (palazzo/museoRd,
    // resolvePlacement() piu' sotto) nasce apposta con un depth SCOSTATO
    // dalla propria y (la MEDIA fra i due lotti del cluster, non solo il
    // proprio: la sua sagoma e' grande abbastanza da coprire ANCHE il lotto
    // vicino bloccato, commento li'). Il suo decoro, ricalcolando `-y` da
    // zero, restava ancorato alla y "vera" invece che a quel depth scostato:
    // contro un terzo edificio vicino la cui y ricade fra i due, l'edificio
    // stesso si ordinava correttamente ma le sue luci no, comparendo davanti
    // o dietro nel punto sbagliato — l'esatto difetto segnalato. Stessa
    // baseline di effDepth() invece di ricalcolarla: `building.depth` quando
    // e' un vero scostamento (2 lotti, o `parco`/fixedDepth), altrimenti
    // `-building.y` come prima.
    const baseDepth = building.depth === 0 ? -building.y : building.depth;
    for (const { spr, dx, dy, lit = true, fadeTicks, depthOffset = 0, life } of spawns) {
      const y = building.y + dy;
      const isClub = building.type === "club";
      const scrubSpr = lit && !isClub ? scrubSpriteFor(spr) : null;
      decorEntities.push({
        obj: "decor", buildingId: building.id,
        x: building.x + dx, y, depth: (lit ? baseDepth - dy - 1 : baseDepth - dy) + depthOffset,
        spr, _f: frameFor(spr),
        // `fadeTicks` (grattacielo, buildings.js): dissolvenza propria invece
        // della LIGHT_FADE condivisa da tutti gli altri decori — vedi stepLights().
        // `_scrubSpr`/`_scrubFrames`: vero scorrimento a sottoimmagini invece
        // della dissolvenza (scrubSpriteFor() sopra). `_pulse`: club, vedi sopra.
        ...(lit ? {
          _selfLit: true, _lightT: 0, _fadeTicks: fadeTicks,
          ...(scrubSpr ? { _scrubSpr: scrubSpr, _scrubFrames: frameCountFor(scrubSpr) } : {}),
          ...(isClub ? { _pulse: true, _pulseFrames: frameCountFor(spr) } : {}),
        } : {}),   // parte spento, come "empty" in originale (Create.gml)
        // `transient` (addConstructionSpawn() sotto): decoro di cantiere
        // (gru/topper), escluso dal filtro di spawnDecor() — sparisce solo in
        // removeTransientDecor(), alla vera fine del cantiere (o prima,
        // `_life` sotto, per i topper).
        ...(transient ? { transient: true } : {}),
        // `_life` (`life`, buildings.js — SOLO i topper: tops1/2/3/3i/4s/4d/
        // 5s/5d si autodistruggono da soli col proprio `action_set_alarm`,
        // indipendente dal cantiere che li ha creati — STUDIO.md/il
        // commento su stepConstructions() in buildings.js) — [Bug corretto,
        // segnalato dall'autore: "fai come nell'originale"] senza questo il
        // topper restava (removeTransientDecor(), sotto) fino alla vera fine
        // del cantiere, molto DOPO il vero action_kill_object() del topper
        // originale (che scatta esattamente quando l'edificio vero nasce,
        // non quando l'impalcatura finisce di smontarsi) — un topper visibile
        // qualche secondo di troppo sopra un edificio gia' rivelato. stepTransientDecor()
        // (sotto) lo consuma ogni frame; `life == null` (ogni altro spawn,
        // gru incluse — le gru vere non passano di qui, vedi addConstructionSpawn())
        // lascia il decoro come sempre, rimosso solo da removeTransientDecor().
        ...(life != null ? { _life: life * TICK } : {}),
      });
    }
  }

  /** Consuma `_life` dei decori transitori con un timer proprio (i topper,
   * addDecor()/`life` sopra) di `dt` secondi — un secondo filtro oltre a
   * removeTransientDecor() (sotto, la vera fine del cantiere): un topper
   * sparisce al PRIMO dei due che arriva, esattamente come l'originale (il
   * proprio `action_kill_object()` puo' scattare ben prima che l'impalcatura
   * abbia finito di smontarsi). Chiamata una volta a frame, stesso principio
   * di stepLights() — ma quelli non hanno `_life` (solo i topper lo
   * dichiarano), quindi qui non serve nessun controllo sul tipo di decoro. */
  function stepTransientDecor(dt) {
    for (const d of decorEntities) if (d._life != null) d._life -= dt;
    decorEntities = decorEntities.filter((d) => d._life == null || d._life > 0);
  }

  /** `onSpawn` di stepConstructions() (buildings.js): le gru e i "topper"
   * (sprite "toppers"/"topls"/"topld" — anche per i topper di secondo
   * livello, tops5s/tops5d sotto: stesso sprite del primo livello,
   * "tops5s"/"tops5d" e' il nome dell'OGGETTO che li crea, non dello
   * sprite) creati durante un cantiere — [C]
   * gru1/toppers/Create.gml, nessuno dei due nel decompilato e' `notte_
   * target`: sono impalcature vere, illuminate come il resto della scena
   * dalla tinta ambientale, non un bagliore di finestra che ha bisogno di
   * notte+corrente per comparire. Segnalato dall'autore ("non vedo mai il
   * top delle impalcature"): passare `addDecor` diretto come `onSpawn` li
   * faceva nascere con `lit:true` di default (lo stesso usato per il decoro
   * FINALE, le finestre — vedi sopra), quindi restavano ad alpha 0 per
   * tutta la durata tipica di un cantiere (mai una notte intera con energia
   * sufficiente, la stessa soglia di stepLights()) — invisibili non per un
   * bug di rendering ma perche' il motore li trattava come una luce mai
   * accesa.
   *
   * [Bug corretto, in piu'] Anche dopo quel fix restavano spesso coperti
   * dalla stessa impalcatura che dovrebbero coronare: `depth` seguiva la
   * formula generica `-y` di ogni altro decoro, ma i topper reali (`tops1..
   * tops5d/Create.gml`, mai letti fin qui) dichiarano un bias fisso in piu'
   * (`depth = -y - 80|-88|-172|-344`, diverso per ciascuno) — necessario
   * proprio perche' nascono molto piu' in alto del proprio edificio (`dy`
   * fino a -340): senza quel bias la sola `-y` li ordinava PRIMA
   * dell'edificio (y piu' piccola = depth piu' grande = disegnato prima,
   * quindi dietro), nascosti dalla sagoma dell'impalcatura sotto. Ogni
   * spawn di topper qui sotto (BUILDING_TYPES) porta ora il proprio
   * `depthOffset` (letto da `addDecor()` sopra), preso dall'oggetto reale
   * che lo crea — mai un numero indovinato.
   *
   * [Bug corretto, richiesto dall'autore: "molte gru non si montano, si
   * crea solo la base ma non i pezzi sopra"] Gli spawn "gru1" (l'oggetto
   * `gru`, src/objects/gru — 4-5 agli angoli, quasi ogni edificio) non sono
   * un decoro fermo come i topper: la gru vera si monta/smonta e fa
   * comparire un braccio in cima da sola, con un timer TUTTO SUO
   * indipendente dal resto del cantiere (game/src/cranes.js) — instradati a
   * `addCrane()` invece che ad `addDecor()`, gli altri spawn (topper)
   * restano invariati. */
  function addConstructionSpawn(building, spawns) {
    const decorSpawns = [];
    for (const s of spawns) {
      if (s.spr === "gru1") addCrane(building, s.dx, s.dy);
      else decorSpawns.push(s);
    }
    if (decorSpawns.length) addDecor(building, decorSpawns.map((s) => ({ ...s, lit: false })), { transient: true });
  }

  /** `onFinish` di stepConstructions() (buildings.js): l'impalcatura e'
   * DAVVERO smontata (`b.construction` torna `null`) — solo qui il decoro
   * transitorio di cantiere (gru/topper, addConstructionSpawn() sopra) va
   * ripulito. Prima spariva insieme al decoro finale, appena l'edificio finito
   * compariva (spawnDecor() sopra, stesso bug commentato li'). Le gru
   * (game/src/cranes.js, `building._cranes`) non vivono in `decorEntities`
   * — pulite qui a parte, cosi' un'eventuale prossima costruzione sullo
   * stesso edificio (upgrade successivo) riparte senza gru "morte" residue. */
  function removeTransientDecor(building) {
    decorEntities = decorEntities.filter((d) => !(d.buildingId === building.id && d.transient));
    building._cranes = null;
  }

  // [C] parco/Create.gml: 7 posizioni fisse intorno al parco: ognuna, a dado
  // (1/`dice`), puo' diventare un albero o un lampione — mai entrambi, mai
  // garantito. `dice` e' la probabilita' che lo slot generi QUALCOSA; quale
  // dei due (albero o lampione) e' poi un secondo dado 50/50, sempre uguale
  // per ogni slot nel decompilato.
  const PARCO_SLOTS = [
    { dice: 4, dx: 0, dy: 0 }, { dice: 2, dx: 40, dy: 10 }, { dice: 3, dx: -40, dy: 10 },
    { dice: 4, dx: 5, dy: -30 }, { dice: 2, dx: -7, dy: 40 }, { dice: 4, dx: 70, dy: 21 },
    { dice: 3, dx: -80, dy: 7 },
  ];
  /** Il decoro vero di `parco` (STUDIO.md, vedi BUILDING_TYPES.parco in
   * buildings.js): alberi (stessa tavola a dado di treeVariant("albe") sopra,
   * niente luce) e lampioni — corpo fermo ("l1", non illuminato, tinto dal
   * ciclo giorno/notte come il palo che e') + la luce vera e propria ("l1l",
   * `lit: true` — [C] lampioncino/Create.gml: `action_create_object(lampla,
   * 0, 0)`, lo stesso oggetto "luce" gia' generico da addDecor()/
   * stepLights() per i bagliori degli edifici, qui applicato a un lampione
   * invece che a una finestra). Entrambi condividono `buildingId`: quando il
   * parco muore (o viene ricostruito), spawnDecor() sopra li ripulisce tutti
   * insieme come un decoro qualunque. */
  function spawnParcoScatter(building) {
    for (const slot of PARCO_SLOTS) {
      if (!dice(slot.dice)) continue;
      if (dice(2)) {
        addDecor(building, [{ spr: treeVariant("albe") ?? "a1", dx: slot.dx, dy: slot.dy, lit: false }]);
      } else {
        addDecor(building, [
          { spr: "l1", dx: slot.dx, dy: slot.dy, lit: false },
          { spr: "l1l", dx: slot.dx, dy: slot.dy, lit: true },
        ]);
      }
    }
  }

  /**
   * `eolico`/`grattacielo` (buildings.js, `def.multiTile`) sono gli unici
   * edifici che occupano PIU' di un placeholder — vedi il commento su
   * `BUILDING_TYPES.eolico` in buildings.js per il perche'. **[Bug corretto,
   * segnalato dall'autore con uno screenshot: "la turbina finisce in mezzo
   * alla strada e va in collisione con chies" — i 4 lotti devono essere
   * ADIACENTI, a formare un rettangolo]** Le due versioni precedenti
   * ("i 3 piu' vicini al TOCCO", poi "i 3 piu' vicini all'ANCORA visiva
   * entro un raggio") trovavano sempre 3 lotti REALMENTE liberi, ma non
   * necessariamente adiacenti fra loro: su una griglia isometrica un
   * placeholder a due passi di griglia puo' stare piu' vicino in linea
   * d'aria di uno a un passo solo in diagonale, quindi "i piu' vicini"
   * poteva scegliere un lotto dall'altra parte di una strada, o vicino a un
   * edificio giA' occupato come `chies` — un cluster sparso, non un
   * rettangolo. **[C]** Ricostruito leggendo `impavent_dem/Alarm_2.gml` riga
   * per riga (la ruspa che demolisce una pala eolica: `action_create_object
   * (placeholder, -98, 0)`, `(98, 0)`, `(0, -58)`, `(0, 58)` — i 4 lotti che
   * l'avevano formata, ricreati esattamente dov'erano): e' la STESSA identica
   * geometria di `DIAGONAL_DIRS` sotto (palazzo/museo, gia' letta a sua volta
   * dal decompilato con la stessa tolleranza sulla griglia reale di
   * `match_easy.scene.json`) — un singolo rombo della griglia isometrica
   * (un "rettangolo" in coordinate di griglia, che in schermo isometrico
   * disegna un rombo a 4 vertici), non un raggio. Il lotto TOCCATO e'
   * sempre il vertice OVEST del rombo (l'ancora visiva sta 98px ad est di
   * lui, `anchorOffset` in buildings.js): gli altri tre sono i suoi due
   * vicini diagonali verso est (`DIAGONAL_DIRS[0]`/`[1]`, entrambi dx
   * positivo) e il loro angolo opposto (la somma dei due, il vertice EST) —
   * quattro lotti realmente adiacenti a due a due, mai sparsi. Indipendente
   * dal tipo di edificio (eolico/grattacielo condividono la stessa maschera
   * fissa "phold" di `eoliplacer`, STUDIO.md): solo l'ancora VISIVA cambia
   * per tipo (`anchorOffset`), non i lotti di TERRENO consumati. `null` se
   * anche uno solo dei tre manca (occupato, non esiste, o e' gia' stato
   * consumato da un altro edificio) — un rifiuto esplicito (vedi placeAt())
   * e' preferibile a un piazzamento "riuscito" ma disallineato.
   */
  function findWindCluster(touched) {
    const d0 = DIAGONAL_DIRS[0], d1 = DIAGONAL_DIRS[1];   // (99,57)/(99,-57): i due vicini a est del lotto toccato
    const offsets = [d0, d1, { dx: d0.dx + d1.dx, dy: d0.dy + d1.dy }];   // + il loro angolo opposto (l'est vero e proprio)
    const found = [touched];
    for (const o of offsets) {
      const tx = touched.x + o.dx, ty = touched.y + o.dy;
      const ph = placeholders.find((p) => !found.includes(p) && !p.consumed
        && Math.abs(p.x - tx) <= DIAGONAL_TOLERANCE && Math.abs(p.y - ty) <= DIAGONAL_TOLERANCE);
      if (!ph) return null;
      found.push(ph);
    }
    return found;
  }

  function placeAt(placeholder, type) {
    const def = BUILDING_TYPES[type];
    // [C] placeholder/Create.gml + Collision_r12|r120|r22|r220|r32|r320.gml
    // (platform.js, isPlaceholderActive()): un lotto ancora "act=0" — non
    // sopra a nessun pezzo di piattaforma esistente, cioe' dentro l'area di
    // r32/r22 prima che quell'espansione sia stata costruita — non risponde
    // affatto al tocco nell'originale. Senza questo controllo si poteva
    // costruire in pieno oceano, ben prima di aver sbloccato quella
    // piattaforma (segnalato dall'autore: "i placeholder delle espansioni
    // sono disponibili da subito anche se le espansioni non sono state
    // costruite").
    if (!isPlaceholderActive(placeholder.x, placeholder.y, platformState)) {
      return "this area isn't part of the platform yet";
    }
    // [C] placeholder/Mouse_LeftReleased.gml, selec==3: il piazzamento vero e
    // proprio richiede anche `close==0` (nessun'altra torretta troppo vicina,
    // STUDIO.md "le mongolfiere" -> tooCloseToTurret()) — controllato PRIMA
    // del costo, come nel decompilato (il blocco intero e' innestato dentro
    // quel controllo, non dopo aver gia' scalato i mon).
    if (def.turret && tooCloseToTurret(buildings, placeholder.x, placeholder.y)) {
      return "too close to another defense turret";
    }
    // [C] placeholder/Mouse_LeftReleased.gml, ramo selec==71 (monum): scala
    // 20000 mon senza controllare prima `mon>=20000`, a differenza di OGNI
    // altro ramo di quel file — `def.noAffordCheck` riproduce esattamente
    // questa asimmetria (buildings.js, BUILDING_TYPES.monum) invece di
    // "correggerla" silenziosamente: puo' davvero portare mon sotto zero.
    if (!def.noAffordCheck && !canAfford(r12, def.placeCost)) {
      return `need ${def.placeCost.mon} mon (have ${r12.mon.toFixed(0)})`;
    }
    // `eolico`/`grattacielo` (def.multiTile.anchorOffset): il centro visivo
    // e' il placeholder TOCCATO piu' l'offset FISSO letto dal decompilato
    // (BUILDING_TYPES in buildings.js — `placeholder/Mouse_LeftReleased.gml`,
    // dove nasce `eoliplacer`), non la media del cluster trovato sotto —
    // quello (findWindCluster(), sopra) determina solo QUALI 4 lotti di
    // terreno vengono consumati, sempre lo stesso rombo adiacente al tocco
    // indipendentemente dal tipo di edificio che ci nasce sopra.
    const off = def.multiTile?.anchorOffset;
    const anchorX = off ? placeholder.x + off.dx : placeholder.x;
    const anchorY = off ? placeholder.y + off.dy : placeholder.y;
    // [C] eoliplacer/Alarm_1.gml controlla `places>=4` DOPO aver gia' verificato
    // i mon (stesso ordine qui) — a differenza dell'originale (fallisce in
    // silenzio, vedi buildings.js) restituisce sempre un messaggio chiaro.
    let cluster = [placeholder];
    if (def.multiTile) {
      cluster = findWindCluster(placeholder);
      if (!cluster) return `need a free area of ${def.multiTile.count} adjacent lots (a rectangle)`;
    }
    for (const k in def.placeCost) r12[k] -= def.placeCost[k];
    // [C] `impavent`, una volta nato, uccide con la propria maschera ogni
    // placeholder che copre (Collision_placeholder.gml) — qui equivale a
    // consumare TUTTI i lotti del cluster, non solo quello toccato: gli altri
    // restano bloccati per sempre (nessun edificio/rudere li occupa, spariscono
    // e basta, fedele all'originale). Registrati in `blockedSlots` (solo quelli
    // EXTRA, non il placeholder toccato: quello lo rioccupa gia' `buildings`)
    // cosi' un salvataggio/caricamento non li libera di nuovo — vedi doLoad().
    for (const ph of cluster) {
      ph.consumed = true;
      if (ph !== placeholder) blockedSlots.push({ x: ph.x, y: ph.y });
    }
    // depth 0, NON placeholder.depth (-5000): quel numero e' il livello fisso
    // "sempre in primo piano" del segnaposto vuoto (STUDIO.md, cosi' si vede
    // sempre sopra il terreno), non un depth di mondo da ereditare. Un
    // edificio vero e' un oggetto "di mondo" come chies o gli alberi: deve
    // ordinarsi per la propria y (vedi effDepth() sopra), non restare per
    // sempre incollato davanti a tutto il resto della mappa.
    // [Bug corretto, segnalato dall'autore: "il cantiere del parco finisce
    // ancora sotto gli altri edifici, deve avere la stessa depth degli altri
    // cantieri"] `def.fixedDepth` (parco, buildings.js) NON va applicato qui:
    // resta 0 (dinamico, -y come ogni altro cantiere in corso) finche' il
    // cantiere e' in corso, cosi' il parco in costruzione si ordina per -y
    // come qualunque altro — applyLevelFinish()/stepConstructions()
    // (buildings.js) passa a `def.fixedDepth` solo alla vera fine del
    // cantiere, quando il parco diventa davvero la scenografia piatta che
    // deve restare sempre "in fondo".
    const b = placeBuilding(type, anchorX, anchorY, 0);
    // [Bug corretto] `b.tiles`: i lotti REALMENTE consumati da questo
    // edificio (l'intero `cluster` sopra, tocco incluso) salvati sull'
    // istanza stessa — demolishMultiTile()/doLoad() sotto li usano per
    // liberare/ri-bloccare esattamente questi lotti, invece di ricalcolare
    // (e sbagliare) una nuova ricerca "cosa sta vicino a b.x,b.y": `b.x/b.y`
    // ora e' l'ancora visiva (sopra), un punto che quasi mai coincide con le
    // coordinate di un placeholder vero, a differenza di prima del fix
    // sull'ancora — cercare "il placeholder con le stesse coordinate di
    // b.x/b.y" (quello che facevano entrambe le funzioni) non trovava piu'
    // mai nulla per un edificio multi-tile.
    if (def.multiTile) b.tiles = cluster.map((ph) => ({ x: ph.x, y: ph.y }));
    buildings.push(b);
    if (b.level >= 1) spawnDecor(b, currentDecor(b));   // industria: arriva a fine cantiere, casa idem
    // [C] placeholder/Mouse_LeftReleased.gml, letto riga per riga: selec==1
    // (casa), selec==2 (industria), selec==3 (missile), selec==60 (club),
    // selec==61 (solare), selec==62 (gatling), selec==63 (villa), selec==71
    // (monum) creano `mon_bil` — otto dei nove tipi piazzabili dal giocatore
    // che ne creano uno (`parco`, selec==7, non crea nessun pallone). Solo
    // `laser` (selec==5) e `banca` (selec==72) creano `mon_bbil`, la
    // variante grande — ora davvero cablata (`big`, balloons.js/
    // spawnConstructionBalloon()), non piu' sempre `mon_bil` per tutti.
    // `eolico` (selec==4) crea `mon_bil` anche lui — [C] eoliplacer/
    // Alarm_1.gml, ramo selec==4.
    if (type === "casa" || type === "industria" || type === "missile" || type === "solare"
      || type === "club" || type === "villa" || type === "gatling" || type === "laser" || type === "eolico"
      || type === "monum" || type === "banca") {
      constructionBalloons.push(spawnConstructionBalloon(placeholder.x, placeholder.y, type === "laser" || type === "banca"));
    }
    return null;
  }

  /**
   * `parco/Mouse_LeftPressed.gml`, ramo selec==61: un secondo modo di
   * piazzare `solare`, mai attraversato da `placeAt()` sopra (nessun
   * placeholder coinvolto — l'edificio nasce esattamente sopra un `parco`
   * gia' finito, che non viene ne' consumato ne' ucciso). **[C]** stesso
   * costo del piazzamento normale (1000 mon, letto identico in entrambi i
   * rami del decompilato) — l'UNICA differenza reale e' cosmetica/economica
   * a valle: `overpark`/`oversolar` (impostati qui invece che da una vera
   * collisione fisica, l'unico modo in cui i due potrebbero mai toccarsi)
   * fanno costare di piu' la ruspa sul pannello (2700 invece di 2000,
   * `ruspaCostFor()` in buildings.js) e disabilitano del tutto quella sul
   * parco sottostante (nessun ramo per `oversolar==1` in
   * `demobasia/Collision_parco.gml`: il parco non si puo' piu' demolire/
   * riparare finche' il pannello resta li' sopra).
   */
  function placeSolarOverPark(parco) {
    // [Bug corretto] Il decompilato stesso (`parco/Mouse_LeftPressed.gml`,
    // ramo selec==61) non controlla MAI `oversolar` prima di creare
    // `impasolr`: solo `mon>=1000`, un'unica volta guardato altrove nello
    // stesso file (ramo selec==11, per decidere se la ruspa puo' aprirsi —
    // gia' letto sopra, STUDIO.md "pannelli solari sopra un parco"). Un
    // difetto vero dell'originale, non una scelta di design: senza questo
    // controllo si poteva impilare un pannello sopra l'altro, stesso punto,
    // pagando 1000 mon ogni volta — segnalato dall'autore giocando. `parco`
    // resta un solo `oversolar` booleano (nessuna lista): un secondo tocco
    // con un pannello gia' presente non deve costare ne' creare nulla.
    if (parco.oversolar) return "there's already a solar panel on this park";
    const def = BUILDING_TYPES.solare;
    if (!canAfford(r12, def.placeCost)) return `need ${def.placeCost.mon} mon (have ${r12.mon.toFixed(0)})`;
    for (const k in def.placeCost) r12[k] -= def.placeCost[k];
    const b = placeBuilding("solare", parco.x, parco.y, 0);
    b.overpark = true;
    parco.oversolar = true;
    buildings.push(b);
    constructionBalloons.push(spawnConstructionBalloon(parco.x, parco.y));
    return null;
  }

  // ---------------------------------------------------- piazzamento a trascinamento
  // `palazzo`/`museo` (buildings.js, `def.diagonalPlacement`) sono gli unici
  // edifici con una logica di piazzamento DAVVERO diversa da ogni altro tipo
  // (eolico incluso: quello resta un tocco singolo, solo con un raggio di
  // ricerca piu' largo) — **[C]** src/objects/placeholder/Mouse_LeftPressed.gml
  // (rami selec==6 "palazzo", selec==70 "museo"): il tocco su un lotto libero
  // (l'origine) crea quattro sonde `cre1..cre4` ai suoi quattro vicini
  // diagonali, agli stessi offset (ox,oy) del placeholder stesso —
  // game/data/match_easy.scene.json, ogni istanza dichiara "ox":99,"oy":57,
  // non un numero a caso. Ogni sonda che trova li' un placeholder ancora
  // libero arma una direzione (`dir1..dir4`, src/objects/dir1..4); il
  // giocatore conferma trascinando il tocco fin sopra a una di quelle
  // direzioni e RILASCIANDO — src/objects/dir1/Mouse_LeftReleased.gml:
  // `arm = 1` al rilascio, non alla pressione — a differenza di ogni edificio
  // a un lotto solo, che nasce gia' al tocco (placeholder/Mouse_LeftReleased,
  // un solo evento). Se il rilascio non cade su nessuna delle direzioni
  // armate, il gesto si annulla senza costo — [C]
  // placeholder/Mouse_GlobalLeftReleased.gml, ramo `making==1`.
  //
  // **[C]** src/objects/placeholder/Collision_dir1..4.gml, lette riga per
  // riga: le quattro direzioni si accoppiano in due assi opposti (dir1+dir3,
  // dir2+dir4 — non dir1+dir2). Per ENTRAMBI gli assi l'edificio vero nasce
  // sempre sul lotto con la y maggiore (piu' vicino alla camera) fra origine
  // e vicino scelto — l'altro lotto della coppia resta bloccato per sempre
  // (src/objects/dirdel, spawnato esattamente sulla posizione dell'altro
  // lotto in tutti e 4 i rami: stessa sorte dei lotti extra di `eolico`,
  // `blockedSlots`). L'asse (dir1/dir3 contro dir2/dir4) decide solo quale
  // famiglia di sprite di cantiere/varianti finali usare (`impa4r`/
  // `IMPAMEDIA_R` contro `impa4rd`/`IMPAMEDIA_RD` — materializzato in un
  // secondo tipo concreto in buildings.js, `resolvePlacement()` sotto).
  const DIAGONAL_DIRS = [
    { dx: 99, dy: 57, axis: "r" },
    { dx: 99, dy: -57, axis: "rd" },
    { dx: -99, dy: -57, axis: "r" },
    { dx: -99, dy: 57, axis: "rd" },
  ];
  // px di tolleranza sulla spaziatura reale della griglia: misurata su
  // match_easy.scene.json i placeholder vicini distano davvero ~(100,58), non
  // esattamente (99,57) — stessa scelta "tarata, non esatta" gia' fatta per
  // EOLICO_RADIUS/TURRET_MIN_DIST.
  const DIAGONAL_TOLERANCE = 20;
  // [C] placeholder/Mouse_LeftPressed.gml, rami selec==6/70: `action_sprite_color(255, 1)`
  // — 255 e' la costante GameMaker `c_red` (0x0000FF nel suo ordine BGR), non
  // bianco. Stesso schema di ricomposizione gia' usato in cars.js (NIGHT_TINT):
  // R=255&0xff, G=(255>>8)&0xff=0, B=(255>>16)&0xff=0 -> 0xff0000.
  const ARMED_TINT = 0xff0000;

  /** I placeholder ancora liberi nei quattro vicini diagonali di `origin`, uno per direzione al massimo. */
  function findDiagonalTargets(origin) {
    const targets = [];
    for (const d of DIAGONAL_DIRS) {
      const tx = origin.x + d.dx, ty = origin.y + d.dy;
      const ph = placeholders.find((p) => p !== origin && !p.consumed
        && Math.abs(p.x - tx) <= DIAGONAL_TOLERANCE && Math.abs(p.y - ty) <= DIAGONAL_TOLERANCE);
      if (ph) targets.push({ placeholder: ph, axis: d.axis });
    }
    return targets;
  }

  /**
   * Arma un gesto di piazzamento a trascinamento su `origin` (chiamata da
   * `input.onPointerDown`, non `onTap`: vedi il commento sopra). Restituisce
   * un messaggio d'errore se il piazzamento non puo' nemmeno cominciare (mon
   * insufficienti — controllato PRIMA di armare, come l'originale — o nessun
   * lotto libero in nessuna delle quattro direzioni), altrimenti arma
   * `armedPlacement` e torna `null`.
   */
  function armPlacement(origin, type) {
    const def = BUILDING_TYPES[type];
    // Stesso gate di placeAt() sopra (platform.js, isPlaceholderActive()): un
    // lotto non ancora su un pezzo di piattaforma esistente non arma niente.
    if (!isPlaceholderActive(origin.x, origin.y, platformState)) {
      return "this area isn't part of the platform yet";
    }
    if (!canAfford(r12, def.placeCost)) {
      return `need ${def.placeCost.mon} mon (have ${r12.mon.toFixed(0)})`;
    }
    const targets = findDiagonalTargets(origin);
    // [I] l'originale arma comunque (crea cre1..cre4 a vuoto) anche con zero
    // lotti liberi vicini, lasciando il giocatore trascinare per niente: qui,
    // come gia' scelto per eolico, un messaggio chiaro subito invece di un
    // gesto che puo' solo fallire.
    if (targets.length === 0) return "need a free lot diagonally adjacent";
    armedPlacement = { type, origin, targets };
    origin._armed = true;
    return null;
  }

  /** Annulla un gesto armato senza costruire nulla e senza costo — [C] placeholder/Mouse_GlobalLeftReleased.gml. */
  function cancelPlacement() {
    if (!armedPlacement) return;
    armedPlacement.origin._armed = false;
    armedPlacement = null;
  }

  /**
   * Rilascio del puntatore mentre un gesto e' armato (`input.onPointerUp`):
   * se cade su una delle direzioni valide, costruisce davvero; altrimenti
   * annulla. [C] Collision_dir1..4.gml: l'edificio nasce sul lotto con la y
   * maggiore fra origine e vicino — [Bug corretto, richiesto dall'autore:
   * "alcuni edifici disattivano i placeholder adiacenti anche se liberi, non
   * deve succedere"] l'ALTRO lotto (`blockedSite`, sotto) non viene piu'
   * bloccato per sempre com'era nel decompilato (`dirdel/Collision_
   * placeholder.gml`, [C], uccideva anche lui): resta un placeholder libero
   * come ogni altro, deviazione esplicita dall'originale. Palazzo/museo
   * restano comunque grandi due lotti VISIVAMENTE (lo sprite finale copre
   * anche l'area del vicino, vedi `depthY` sotto, invariato) — costruire
   * qualcos'altro proprio li' puo' quindi sovrapporsi a schermo col loro
   * sprite; accettato dall'autore, nessuna maschera di collisione vera per
   * evitarlo (STUDIO.md, "pepazzittecollider" mai ricostruito, stesso limite
   * gia' noto per le torrette).
   */
  function resolvePlacement(sx, sy) {
    if (!armedPlacement) return;
    const { type, origin, targets } = armedPlacement;
    const w = cam.screenToWorld(sx, sy);
    const hit = targets.find((t) => inFrameDiamond(w.x, w.y, t.placeholder.x, t.placeholder.y, t.placeholder._f));
    if (!hit) {
      cancelPlacement();
      message = "placement cancelled";
      messageT = 3;
      return;
    }
    const def = BUILDING_TYPES[type];
    const neighbor = hit.placeholder;
    const buildSite = neighbor.y > origin.y ? neighbor : origin;
    const blockedSite = buildSite === neighbor ? origin : neighbor;
    origin._armed = false;
    for (const k in def.placeCost) r12[k] -= def.placeCost[k];
    buildSite.consumed = true;
    // L'asse (dir1/dir3 "r" contro dir2/dir4 "rd", vedi il commento su
    // DIAGONAL_DIRS sopra) sceglie una catena di cantiere/varianti
    // interamente diversa (sprite orientati, famiglia c4xx "dispari" contro
    // "pari" — buildings.js, BUILDING_TYPES.palazzoRd/museoRd): invece di far
    // portare l'asse ad ogni funzione di buildings.js (currentDecor,
    // ruinSpriteFor, stepGrowth, ...) il tipo concreto e' gia' quello giusto,
    // esattamente come ogni altro tipo — palazzoRd/museoRd non compaiono nel
    // menu (OTHER_BUILDINGS), solo qui.
    const concreteType = hit.axis === "rd" ? `${type}Rd` : type;
    // Depth: palazzo/museo nascono sul lotto con la y MAGGIORE (buildSite,
    // sopra) ma lo sprite finale e' grande abbastanza da coprire visivamente
    // ANCHE il lotto bloccato (blockedSite, y minore) accanto — se il depth
    // si ordinasse come ogni altro edificio (-buildSite.y, il piu' vicino dei
    // due alla camera) l'edificio vinceva il confronto per-y anche contro
    // vicini genuinamente piu' vicini (y maggiore di buildSite ma ancora
    // dentro l'ingombro visivo del suo sprite sovradimensionato) — segnalato
    // dall'autore ("a volte si vedono sopra edifici che sono piu' in basso").
    // [I] Nessun dato di "vera" altezza dello sprite per fare di meglio
    // (STUDIO.md, "pepazzittecollider" mai ricostruito): la media fra i due
    // lotti del cluster e' un compromesso, non l'ancoraggio a un singolo
    // angolo (buildSite o blockedSite) — riduce il bias in avanti senza
    // introdurre quello opposto (nascosto da vicini che dovrebbero stargli
    // dietro).
    const depthY = (buildSite.y + blockedSite.y) / 2;
    const b = placeBuilding(concreteType, buildSite.x, buildSite.y, -depthY);
    buildings.push(b);
    if (b.level >= 1) spawnDecor(b, currentDecor(b));
    constructionBalloons.push(spawnConstructionBalloon(buildSite.x, buildSite.y));
    armedPlacement = null;
    message = `${def.label.toLowerCase()} placed (-${def.placeCost.mon} mon)`;
    messageT = 3;
  }

  /** Aggiunge `chies` a `buildings` a partita nuova (nessun salvataggio): non
   * costa niente e non consuma un placeholder, e' gia' li' (STUDIO.md §9). */
  function seedChies() {
    if (!chiesScene) return;
    const b = placeBuilding("chies", chiesScene.x, chiesScene.y, chiesScene.depth);
    buildings.push(b);
    spawnDecor(b, currentDecor(b));
  }

  /** Come seedChies() sopra, ma per gli edifici pre-esistenti della room
   * "tutorial" (tutorialPrebuilt/TUTORIAL_PREBUILT_TYPES sopra) — ognuno
   * gia' finito al livello che il suo nome implica invece che a livello 1,
   * via placeFinishedBuilding() (buildings.js). */
  function seedTutorialBuildings() {
    for (const it of tutorialPrebuilt) {
      const spec = TUTORIAL_PREBUILT_TYPES[it.obj];
      const b = placeFinishedBuilding(spec.type, it.x, it.y, it.depth, spec.level, r12);
      buildings.push(b);
      spawnDecor(b, currentDecor(b));
    }
  }

  /**
   * Un edificio la cui vita e' scesa a 0 (fulmine in tempesta, o una bomba
   * sganciata da una minaccia vera — game/src/threats.js, stepBombs). [C]
   * l'originale non lo rimuove: lo sostituisce con un rudere permanente
   * (`ruinSpriteFor()`, game/src/buildings.js — sceglie fra `ruin1`/`ruin2`/
   * `ruin3`/`ruinsol`/`ruinc1..3` in base a tipo e livello, con lo stesso dado
   * uniforme del decompilato dove ne ha piu' di uno).
   *
   * **[Bug corretto, richiesto dall'autore: "in match non riesco a
   * demolire le rovine"]** Una nota precedente qui concludeva che nessun
   * rudere avesse un ramo `Mouse_LeftPressed.gml` per `selec==11` —
   * **sbagliato, verificato controllando `ruin1|2|3` stessi invece di
   * `demobasia/Collision_*.gml`** (che infatti collide solo con edifici
   * FINITI, MAI con un rudere — quella parte era corretta, la conclusione
   * "quindi nessuno strumento lo tocca" no): **[C]** `ruin1|2|3/
   * Mouse_LeftPressed.gml` risponde davvero sotto ruspa, a pagamento —
   * `ruinRebuildCost()` (buildings.js) calcola quel costo qui anche per i
   * ruderi VERI da battaglia (non solo per i lotti-rudere pre-piazzati del
   * tutorial, `ruinLots` sotto, che usano la STESSA funzione da prima). Il
   * tocco vero e proprio, piu' sotto (`clearedPlaceholder()`), lascia un
   * lotto libero invece di ricostruire — [Decisione dell'autore: "la
   * rovina ruspata deve creare sempre un placeholder vuoto, non un nuovo
   * edificio"]. `level`/`cost` salvati qui sul rudere: la
   * "taglia" e' `b.level` dell'edificio al momento della morte, letta
   * UNA VOLTA qui invece che ricalcolata ad ogni tap.
   *
   * `parco` e' l'unica eccezione a QUESTA funzione: **[C]** `parco/Step.gml`
   * non legge mai `life`, quindi non fa NIENTE quando (nella pratica, quasi
   * mai: `life: 9999`) succede — `ruinSpriteFor()` torna `null` e questa
   * funzione si ferma subito, prima di toccare pop/hap/`buildings`,
   * esattamente come l'originale non farebbe niente. Per tutti gli altri
   * applica il bilancio pop (`currentDeathPop`) e hap (`currentDeathHap`,
   * industria/parco — STUDIO.md "i pulsanti blu delle monete") del livello
   * a cui e' morto, letti da chiesX/industriaX/casaX/parco/Destroy.gml.
   */
  function destroyBuilding(b) {
    const spr = ruinSpriteFor(b);
    if (!spr) return;
    r12.pop += currentDeathPop(b);
    r12.hap += currentDeathHap(b);
    decorEntities = decorEntities.filter((d) => d.buildingId !== b.id);
    buildings = buildings.filter((x) => x !== b);
    coins = coins.filter((c) => c.buildingId !== b.id);
    if (picked?.obj === "building" && picked.ref === b) picked = null;
    if (buildingInfoPanel === b) buildingInfoPanel = null;
    ruins.push({
      x: b.x, y: b.y, depth: -b.y, spr, _f: frameFor(spr),
      level: b.level, cost: ruinRebuildCost(b.level),
    });
  }

  /** Avvia un potenziamento e — [C] upcrc12/Mouse_LeftPressed.gml: `with
   * (cddvd) { action_kill_object(); }` scatta SUBITO al tocco, insieme allo
   * scalo dei costi e alla comparsa dell'impalcatura, non alla fine del
   * cantiere — spegne il decoro del livello vecchio (le finestre illuminate,
   * spawnDecor()/addDecor() sopra) invece di lasciarlo acceso sotto
   * l'impalcatura fino al prossimo spawnDecor() a fine cantiere. Segnalato
   * dall'autore ("le luci non devono accendersi mentre c'e' l'impalcatura
   * sopra chies"): senza questo, il decoro del livello appena lasciato
   * restava in `decorEntities` — mai rimosso da tryStartUpgrade(), solo
   * RIMPIAZZATO da spawnDecor() al completamento — e stepLights() lo
   * continuava ad accendere di notte per tutta la durata del cantiere. */
  function startUpgrade(b) {
    const err = tryStartUpgrade(b, r12, buildings);
    if (!err) decorEntities = decorEntities.filter((d) => d.buildingId !== b.id);
    return err;
  }

  /** Stessa correzione di startUpgrade() sopra, per il cantiere riavviato
   * dalla ruspa (tryRuspaRebuild() — un impalcatura torna comunque sopra
   * all'edificio, con lo stesso decoro vecchio da spegnere subito). */
  function ruspaRebuild(b) {
    const err = tryRuspaRebuild(b, r12);
    if (!err) decorEntities = decorEntities.filter((d) => d.buildingId !== b.id);
    return err;
  }

  /**
   * Il caso a parte della ruspa su `eolico`/`grattacielo`
   * (`def.construct.ruspaDemolish`, buildings.js): **[C]**
   * `impavent_dem/Alarm_2.gml`, a differenza di OGNI altro "_demo", non
   * ricostruisce l'edificio — crea 4 `placeholder` (agli stessi offset
   * ±98/±58 di `impavent/Alarm_2.gml` per i suoi 4 lotti) e si autodistrugge:
   * una pala eolica ruspata torna terreno libero, non una pala eolica nuova.
   * Qui equivale a togliere l'edificio da `buildings` e liberare i 4 lotti
   * che aveva consumato — **[Bug corretto, segnalato dall'autore: "il
   * piazzamento di eolico/grattacielo... occupano spazi non destinati ad
   * edifici"]** una versione precedente ricalcolava QUI da zero "quali lotti
   * appartengono a questo edificio" cercando un placeholder alle stesse
   * coordinate di `b.x/b.y` — coordinate che da quando `anchorOffset`
   * (buildings.js) sposta l'ancora visiva lontano dal placeholder toccato
   * (98-150px) non coincidono PIU' MAI con un placeholder vero: quel `find()`
   * falliva sempre in silenzio (nessun errore, semplicemente `ph`
   * `undefined`), quindi il lotto toccato non tornava mai libero dopo una
   * demolizione — restava bloccato per sempre, un vicolo cieco invisibile.
   * `b.tiles` (placeAt() in questo file: l'intero cluster di lotti REALMENTE
   * consumati alla costruzione, tocco incluso) elimina la necessita' di
   * ricalcolare/indovinare nulla: libera esattamente quei lotti, esattamente
   * quelli bloccati. `?? [{x:b.x,y:b.y}]` resta per un salvataggio scritto
   * prima di questo fix (nessun `tiles` salvato): degrada al comportamento
   * precedente (probabilmente ancora sbagliato per quell'edificio specifico)
   * invece di rompersi.
   */
  function demolishMultiTile(b) {
    for (const t of b.tiles ?? [{ x: b.x, y: b.y }]) {
      const ph = placeholders.find((p) => p.x === t.x && p.y === t.y);
      if (ph) ph.consumed = false;
      blockedSlots = blockedSlots.filter((s) => !(s.x === t.x && s.y === t.y));
    }
    decorEntities = decorEntities.filter((d) => d.buildingId !== b.id);
    buildings = buildings.filter((x) => x !== b);
    if (picked?.obj === "building" && picked.ref === b) picked = null;
    if (buildingInfoPanel === b) buildingInfoPanel = null;
  }

  // -------------------------------------------------------------- salvataggio
  // Serializzazione esplicita fin da subito (STUDIO.md §5.6/§7.1): lo stato
  // che conta e' gia' dati semplici, quindi non c'e' uno snapshot binario da
  // imitare, solo JSON. Stessi nomi di slot dell'originale ("nimsav_eas" per
  // la mappa facile) per il quicksave in localStorage.
  //
  // NON e' piu' automatico: il gioco e' ancora in sviluppo attivo, e un
  // autoload silenzioso al boot fa ripartire ogni sessione di test da uno
  // stato vecchio (edifici/decoro/depth di una build precedente), mascherando
  // esattamente le modifiche che si sta cercando di verificare — "vedo
  // sempre la versione vecchia" a ogni ricarica. Ogni caricamento della
  // pagina e' quindi una partita nuova, come il primissimo avvio. S/L restano
  // per salvare/ricaricare a mano DENTRO la stessa sessione di test, se
  // serve, ma non sopravvivono piu' da soli a un refresh.
  //
  // [Nuova funzionalita', richiesta dall'autore: "vogliamo file salvabili
  // dove vuole l'utente, cosi' non si perde"] Accanto al quicksave in
  // localStorage (S/L, Salva/Carica partita nel menu di pausa — invariati,
  // pensati per restare veloci durante un test) c'e' ora un salvataggio VERO
  // su file (save.js, saveToFile()/loadFromFile()): "Salva su file"/"Carica
  // da file" nel menu di pausa, e "Carica partita" nel menu principale
  // (title.js) — l'unico modo di riprendere una partita che non e' mai stata
  // aperta prima in QUESTO browser. `fileHandle` (sotto): quando l'API File
  // System Access c'e' (Chrome/Edge — non Safari ne' Firefox, save.js), il
  // primo "Salva su file" apre il dialog "Salva come" UNA volta sola; ogni
  // salvataggio successivo nella stessa sessione riscrive silenziosamente
  // lo stesso file. Seminato da `params.fileHandle` quando si arriva da un
  // "Carica partita" del menu principale (si e' gia' scelto un file, non
  // ha senso chiederne un secondo al primo salvataggio).
  let fileHandle = params.fileHandle ?? null;

  // [Nuova funzionalita', richiesta dall'autore: "eviterei di far salvare in
  // situazioni critiche (sotto attacco, con poco oil ecc)"] Ritorna una
  // breve spiegazione (mostrata come messaggio, vedi doSave()/
  // doSaveToFile() sotto) se il salvataggio va bloccato adesso, altrimenti
  // `null`. Tre condizioni, tutte e sole quelle discusse con l'autore:
  // - una minaccia vera (aereo/bombardiere/dirigibile) vicina alla citta'
  //   (entro CRITICAL_THREAT_RADIUS da `chiesScene`, il municipio — sempre
  //   presente, STUDIO.md — non "esiste una minaccia da qualche parte sulla
  //   mappa", quasi sempre vero durante una partita lunga: qui serve un
  //   pericolo imminente, non uno qualunque);
  // - olio quasi esaurito (sotto il 10% del tetto — oilCap(), state.js —
  //   non uno zero assoluto: la citta' e' gia' in affanno ben prima che
  //   l'energia si spenga davvero);
  // - temporale VERO in corso (`r12.storm`, solo `match` — non `stormeasy`,
  //   puramente cosmetico su `match_easy`, STUDIO.md: nessun danno, nessun
  //   motivo di bloccare nulla) o l'allarme "attacco in arrivo"
  //   (`r12.alertT`, balloons.js: una spia ha completato il giro).
  // Blocco netto (non solo un avviso): il tap su "Salva"/"Salva su file"
  // semplicemente non salva, un messaggio spiega perche' — coerente con
  // "S/L restano un quicksave di sessione", non un vero e proprio permesso
  // di salvare in qualunque momento.
  const CRITICAL_THREAT_RADIUS = 500;
  // [I] `kind` ("oil"|"attack") in piu' rispetto al solo testo, aggiunto per
  // l'autosalvataggio (stepAutosave() piu' sotto): "durante attacchi"/"con
  // oil basso" nel pannello impostazioni devono poter bypassare SOLO la
  // categoria che dicono, non l'altra — un testo libero da confrontare
  // parola per parola sarebbe fragile, la categoria esplicita no. Storm/
  // allarme/minaccia vicina condividono tutti "attack": sono la stessa
  // famiglia di pericolo (qualcosa sta colpendo o sta per colpire la
  // citta'), distinta solo da "oil" (un problema di risorse, non di
  // minaccia).
  function criticalSaveReason() {
    // `oilCap()` (state.js) resta `Infinity` finche' chies non arriva a
    // livello 2 (nessun tetto dichiarato prima) — un 10% di `Infinity` e'
    // ancora `Infinity`, quindi "sotto il 10% del tetto" sarebbe sempre
    // vero a inizio partita (bloccherebbe OGNI salvataggio, altro che solo
    // quelli critici). Soglia assoluta di riserva quando il tetto non e'
    // ancora un numero vero, proporzionata all'olio di partenza (5000-7500,
    // state.js `createR12()`).
    const cap = oilCap(buildings);
    const oilThreshold = Number.isFinite(cap) ? cap * 0.1 : 500;
    if (r12.oil <= oilThreshold) return { kind: "oil", text: "oil is almost depleted" };
    if (r12.storm) return { kind: "attack", text: "a storm is hitting the city" };
    if (r12.alertT > 0) return { kind: "attack", text: "an attack is incoming" };
    if (chiesScene) {
      const r2 = CRITICAL_THREAT_RADIUS * CRITICAL_THREAT_RADIUS;
      const near = threats.some((th) => (th.x - chiesScene.x) ** 2 + (th.y - chiesScene.y) ** 2 < r2);
      if (near) return { kind: "attack", text: "a threat is near the city" };
    }
    return null;
  }

  function doSave() {
    const reason = criticalSaveReason();
    if (reason) { message = "You can't save right now: " + reason.text; messageT = 3; return; }
    save(scene.name, r12, buildings, ruins, blockedSlots, platformState);
    message = "game saved"; messageT = 3;
    showSaveIcon();
  }
  // Applica un salvataggio gia' letto/parsato (da localStorage O da file,
  // save.js) allo stato vivo della partita — corpo unico riusato da
  // doLoad() (localStorage) e doLoadFromFile() sotto, cosi' i due percorsi
  // non possono disallinearsi silenziosamente col tempo.
  function applyLoadedData(data) {
    r12 = data.r12;
    buildings = data.buildings;
    // `?.tier1`: scarta anche un salvataggio con la forma vecchia (prima
    // dei due livelli fari/piattaforma) invece di rompersi su di lui — lo
    // stesso principio "niente stato vecchio da onorare" gia' scelto per
    // l'autoload (commento sopra).
    if (platformState) platformState = data.platformState?.tier1 ? data.platformState : createFaroState();
    decorEntities = [];
    const usedIds = new Set();
    for (const b of buildings) {
      // ricostruisce quali placeholder sono occupati dalla posizione
      // salvata. [Bug corretto] `b.tiles` (placeAt(), sopra): per un
      // edificio multi-tile (eolico/grattacielo) `b.x/b.y` e' l'ancora
      // visiva, spostata dal placeholder toccato — cercarne uno "alle stesse
      // coordinate di b.x/b.y" (come si faceva qui) non trova mai nulla per
      // loro, quindi dopo un caricamento il lotto toccato tornava
      // silenziosamente libero: un secondo edificio poteva nascere proprio
      // li', sovrapposto a quello ricaricato. `?? [{x:b.x,y:b.y}]`: un
      // edificio a un solo lotto (niente `tiles`) o un salvataggio scritto
      // prima di questo fix si comportano come prima, invariati.
      for (const t of b.tiles ?? [{ x: b.x, y: b.y }]) {
        const ph = placeholders.find((p) => !usedIds.has(p.id) && p.x === t.x && p.y === t.y);
        if (ph) { ph.consumed = true; usedIds.add(ph.id); }
      }
      if (b.level >= 1) spawnDecor(b, currentDecor(b));
    }
    // Ruderi (destroyBuilding() sopra): `_f`/`cost` non sono salvati
    // (derivati, save.js), vanno ricalcolati qui — stesso principio di `_f`
    // sugli edifici caricati. `level ?? 1`: un salvataggio scritto prima
    // del fix "in match non riesco a demolire le rovine" non ha `level` —
    // vedi il commento su save.js. Occupano un placeholder anche loro
    // (demolirli sotto ruspa li rimuove da `ruins` ma NON libera mai il
    // placeholder, ci nasce sopra un cantiere vero): stesso ciclo `usedIds`
    // di sopra, cosi' un edificio e un rudere non litigano mai per lo
    // stesso slot.
    ruins = (data.ruins ?? []).map((ru) => ({
      x: ru.x, y: ru.y, depth: -ru.y, spr: ru.spr, _f: frameFor(ru.spr),
      level: ru.level ?? 1, cost: ruinRebuildCost(ru.level ?? 1),
    }));
    for (const ru of ruins) {
      const ph = placeholders.find((p) => !usedIds.has(p.id) && p.x === ru.x && p.y === ru.y);
      if (ph) { ph.consumed = true; usedIds.add(ph.id); }
    }
    // Lotti "extra" di un edificio multi-tile (placeAt() sopra, oggi solo
    // `eolico`): niente da disegnare, solo un placeholder che deve restare
    // bloccato — stesso ciclo `usedIds` di sopra.
    blockedSlots = (data.blockedSlots ?? []).map((s) => ({ x: s.x, y: s.y }));
    for (const s of blockedSlots) {
      const ph = placeholders.find((p) => !usedIds.has(p.id) && p.x === s.x && p.y === s.y);
      if (ph) { ph.consumed = true; usedIds.add(ph.id); }
    }
    return true;
  }
  function doLoad() {
    const data = load(scene.name);
    if (!data) return false;
    return applyLoadedData(data);
  }
  // "Reset game" (menu di pausa, drawConfirmResetOverlay() piu' sotto):
  // ripristina il livello da zero come una partita mai iniziata — cancella
  // il quicksave localStorage di questa scena (altrimenti "Load game"/il
  // prossimo autoload dal menu principale riporterebbe indietro lo stato
  // appena cancellato) e rimonta la stessa room passando per `navigate()`
  // invece di ricostruire lo stato a mano qui: e' la stessa strada che
  // porta gia' a uno stato pulito quando si entra la prima volta da
  // title.js, niente logica di reset duplicata.
  function doResetGame() {
    localStorage.removeItem(saveSlotFor(scene.name));
    navigate("match", { room: roomParam });
  }
  // Async (save.js/saveToFile() apre un dialog nativo): il chiamante (input.
  // onTap sotto) non aspetta la Promise, aggiorna `message` da dentro questa
  // funzione stessa quando la scrittura finisce — coerente con ogni altro
  // messaggio "a fuoco e dimentica" del motore.
  async function doSaveToFile() {
    const reason = criticalSaveReason();
    if (reason) { message = "You can't save right now: " + reason.text; messageT = 3; return; }
    const data = serializeSave(scene.name, r12, buildings, ruins, blockedSlots, platformState);
    try {
      const h = await saveToFile(data, fileHandle);
      if (h === undefined) return;   // dialog annullato dall'utente, nessun messaggio
      if (h) fileHandle = h;
      message = "game saved to file"; messageT = 3;
      showSaveIcon();
    } catch (err) {
      console.error("nimbus: salvataggio su file fallito", err);
      message = "save to file failed"; messageT = 3;
    }
  }
  async function doLoadFromFile() {
    let result;
    try {
      result = await loadFromFile();
    } catch (err) {
      console.error("nimbus: caricamento da file fallito", err);
      message = "load from file failed"; messageT = 3;
      return;
    }
    if (!result) return;   // dialog annullato dall'utente, nessun messaggio
    // "invalid" (save.js/loadFromFile()): un file e' stato scelto davvero,
    // ma non e' un salvataggio valido — JSON malformato, un altro gioco, o
    // il checksum non combacia (modificato a mano, save.js/verify()). A
    // differenza del dialog annullato (sopra) qui vale la pena dirlo.
    if (result === "invalid") {
      message = "invalid or modified file"; messageT = 3;
      return;
    }
    // Un file salvato per un'ALTRA room (es. si apre un salvataggio di
    // `match` mentre si sta giocando `match_easy`) non puo' essere applicato
    // qui: gli edifici/la piattaforma dell'una non hanno senso nell'altra.
    // Rimanda alla navigazione vera (title.js/"Carica partita" gia' lo fa
    // per il primo avvio) invece di lasciare lo stato a meta' fra due room.
    if (result.data.scene && result.data.scene !== scene.name) {
      navigate("match", { room: result.data.scene, autoload: false, loadedData: result.data, fileHandle: result.handle });
      return;
    }
    if (result.handle) fileHandle = result.handle;
    applyLoadedData(result.data);
    picked = null;
    message = "game loaded from file"; messageT = 3;
    // Valore di ritorno (`true`/`undefined`): il chiamante dal menu di pausa
    // lo ignora (fuoco e dimentica, come sempre), ma la schermata di game
    // over (input.onTap, sotto) ne ha bisogno per sapere QUANDO chiudersi —
    // niente da fare finche' la Promise non si risolve, e solo se il
    // caricamento e' andato davvero a buon fine (non su un dialog annullato
    // o un file non valido, gia' usciti sopra con un `return` senza valore).
    return true;
  }
  seedChies();
  seedTutorialBuildings();
  // I fuochi d'artificio sopra chies a Gennaio (game/src/fireworks.js —
  // [C] chies/Create.gml: `action_create_object(fireworker, 0, -400)`,
  // nessun gate di room: chies esiste sempre, in ogni room). `chiesScene`
  // (sopra) e' la posizione VERA della sua istanza nella scena — chies non
  // si sposta mai, quindi il punto sopra la sua testa resta fisso per
  // tutta la partita.
  const fireworksState = chiesScene ? createFireworksState(chiesScene.x, chiesScene.y) : null;
  // [C] standma|easma/Mouse_LeftPressed.gml: `action_load_game(...)` scatta
  // SUBITO al tap del bottone, prima ancora che il gioco vero appaia — qui
  // equivale a questa singola chiamata all'avvio, solo quando si arriva
  // davvero dalla title screen (vedi il commento su `autoloadOnBoot` sopra).
  // `params.loadedData` (nuovo, "Carica partita" del menu principale, file
  // vero): ha gia' precedenza implicita, semplicemente scavalca l'autoload —
  // title.js non manda mai entrambi insieme (vedi navigate() li').
  if (params.loadedData) applyLoadedData(params.loadedData);
  else if (autoloadOnBoot) doLoad();

  function onKeydown(e) {
    // Scorciatoia da tastiera per lo stesso bottone di pausa in basso a
    // destra (vedi `paused` sopra) — comoda su desktop, dove il bottone
    // resta comunque toccabile col mouse come su touch. Disabilitata mentre
    // `outcome` (sopra) e' a schermo: in sconfitta non c'e' niente da
    // riprendere, in vittoria "P" toglierebbe di mezzo il pannello senza
    // passare dal tap che lo chiude per davvero (onTap sotto).
    if ((e.key === "p" || e.key === "P") && !outcome) { paused = !paused; pauseSubmenu = null; }
  }
  window.addEventListener("keydown", onKeydown);

  // ------------------------------------------------- ciclo giorno/notte
  // **[C]** `aura`, gli 8 alarm che si richiamano a catena (STUDIO.md §5.2):
  // ogni fase dura un tot di TICK (non secondi) prima di passare alla
  // successiva, letti da ogni `action_set_alarm` della catena —
  // 290/200/290/900/290/100/290/900, ciclo totale 3260 tick. Qui una fase,
  // un colore, moltiplicato per ogni sprite nel ciclo di disegno (non piu'
  // un uniform di shader globale, vedi sotto su `stepLights()`/mulTint(): i
  // decori "luce" devono poter saltarlo).
  // **[C]** Solo due tinte vere: `night` (0xF9B9B9 — azzurro chiaro, NON il
  // blu scuro saturo usato qui prima) e `dawn` (0xE7F2FF — bianco caldo
  // pallido), quest'ultima riusata IDENTICA sia prima che dopo la notte —
  // non esiste un colore "tramonto" separato nel decompilato, tolto.
  // Il resto del ciclo (`amb00`/`ambtr1`/`ambst`) cambia solo lo sprite di
  // sfondo, mai la tinta: resta bianco/`giorno` a tutti gli effetti di
  // gameplay (`aura.night`/`aura.dawn`, letti da `isNight()`/`isDawn()`).
  // **[I]** Secondi = tick / 60: `match` ha davvero room_speed 60 nel
  // data.win, ma `match_easy` ne ha 600 (dieci volte piu' veloce — **[?]**
  // intenzionale o un residuo di test mai tolto prima della spedizione).
  // Deciso con l'autore di usare lo stesso passo di `match` per entrambe le
  // mappe invece di riprodurre le 600 tick/s cosi' come stanno: un ciclo da
  // ~5s invece che ~54s avrebbe cambiato il ritmo di tutto il resto scandito
  // ad alarm in quella room, non solo il cielo.
  const TICKS_PER_SEC = 60;
  const PHASES = [
    { name: "day", rgb: [1, 1, 1], dur: 290 / TICKS_PER_SEC },
    { name: "dawn", rgb: [1, 0.949, 0.906], dur: 200 / TICKS_PER_SEC },
    { name: "day", rgb: [1, 1, 1], dur: 290 / TICKS_PER_SEC },
    { name: "night", rgb: [0.725, 0.725, 0.976], dur: 900 / TICKS_PER_SEC },
    { name: "day", rgb: [1, 1, 1], dur: 290 / TICKS_PER_SEC },
    { name: "dawn", rgb: [1, 0.949, 0.906], dur: 100 / TICKS_PER_SEC },
    { name: "day", rgb: [1, 1, 1], dur: 290 / TICKS_PER_SEC },
    { name: "day", rgb: [1, 1, 1], dur: 900 / TICKS_PER_SEC },
  ];
  // [C] aura/Create.gml + Alarm_0..7.gml: oltre a ricolorare gli oggetti
  // (PHASES/ambientAt() sopra), l'originale disegna anche un OVERLAY vero —
  // uno sprite 32x32 (ambst/amb00/amb0/ambtr1/amb2/ambtr3)
  // `action_sprite_transform(150, 90, 0, 0)`: diventa 4800x2880, piu' grande
  // della room, posizionato a coprirla tutta. Il commento qui sopra ("cambia
  // solo lo sprite di sfondo, mai la tinta... tolto") si sbagliava: campionati
  // pixel per pixel dalle texture page originali (non dal nome), quegli
  // sprite NON sono trasparenti — sono tinte unite alpha-blended: `ambst` =
  // pesca (255,205,160) @ alpha 0 (invisibile, il "giorno" pieno), `amb0` =
  // stesso pesca @ 64/255, `amb2` = blu (0,0,255) @ 64/255, e tre ANIMAZIONI a
  // 290 frame che interpolano fra questi estremi in sync con le durate degli
  // alarm (`amb00`: alpha 0→64/255 a pesca fisso; `ambtr1`: pesca→blu ad
  // alpha fissa; `ambtr3`: alpha 64/255→0 a blu fisso). Il redesign originale
  // aveva portato solo la ricolorazione degli sprite (una tinta uniform) e
  // lasciato fuori questo overlay: risultato, lo sfondo/cielo SENZA nessuno
  // sprite sopra restava sempre lo stesso colore fisso, mai tinto — segnalato
  // dall'autore ("sono sicuro al 100% che lo sfondo di match cambiava
  // colore... un oggetto con uno sprite colorato molto piccolo scalato").
  // AURA_OVERLAY sotto e' lo stesso ordine/durate di PHASES, ricostruito dai
  // pixel campionati. [I] la vera alternanza di depth -1/-8900 (STUDIO.md
  // §5.2, "da sopra a sotto") fra sopra e sotto il resto della scena non e'
  // riprodotta — troppo poco certa per rischiare un ordine di disegno
  // sbagliato — qui l'overlay resta sempre "dietro" (disegnato prima di ogni
  // sprite del layer mondo, sotto auraDraw() piu' sotto): ad alpha 25% la
  // differenza visiva con "sopra tutto per una manciata di secondi" e' minima.
  const AURA_PEACH = [255 / 255, 205 / 255, 160 / 255];
  const AURA_BLUE = [0, 0, 1];
  const AURA_ALPHA = 64 / 255;
  const AURA_OVERLAY = [
    { from: { rgb: AURA_PEACH, a: 0 }, to: { rgb: AURA_PEACH, a: AURA_ALPHA } },          // giorno(290): amb00, fade-in
    { from: { rgb: AURA_PEACH, a: AURA_ALPHA }, to: { rgb: AURA_PEACH, a: AURA_ALPHA } }, // alba(200): amb0, fisso
    { from: { rgb: AURA_PEACH, a: AURA_ALPHA }, to: { rgb: AURA_BLUE, a: AURA_ALPHA } },  // giorno(290): ambtr1, pesca->blu
    { from: { rgb: AURA_BLUE, a: AURA_ALPHA }, to: { rgb: AURA_BLUE, a: AURA_ALPHA } },   // notte(900): amb2, fisso
    { from: { rgb: AURA_BLUE, a: AURA_ALPHA }, to: { rgb: AURA_PEACH, a: AURA_ALPHA } },  // giorno(290): ambtr1 al contrario, blu->pesca
    { from: { rgb: AURA_PEACH, a: AURA_ALPHA }, to: { rgb: AURA_PEACH, a: AURA_ALPHA } }, // alba(100): amb0, fisso
    { from: { rgb: AURA_PEACH, a: AURA_ALPHA }, to: { rgb: AURA_PEACH, a: 0 } },          // giorno(290): amb00 al contrario, fade-out
    { from: { rgb: AURA_PEACH, a: 0 }, to: { rgb: AURA_PEACH, a: 0 } },                   // giorno(900): ambst, invisibile
  ];
  function auraOverlayAt(t) {
    const { i, u } = phaseIndexAt(t);
    const { from, to } = AURA_OVERLAY[i];
    const k = Math.min(1, u / PHASES[i].dur);
    return { rgb: from.rgb.map((v, j) => v + (to.rgb[j] - v) * k), a: from.a + (to.a - from.a) * k };
  }
  // [Nuova funzionalita', segnalato dall'autore: "aura e baura... uno andava
  // sul fondo per colorare il cielo e l'altro sopra gli edifici"] `aura`
  // sopra e' solo META' del sistema originale — c'e' un SECONDO oggetto,
  // `baura` (src/objects/baura), mai letto finora. **[C]** letto Create.gml +
  // Alarm_0..7.gml riga per riga: stessa identica scaletta di durate di
  // `aura`/PHASES sopra (290/200/290/900/290/100/290/900 tick — non una
  // coincidenza, i due oggetti sono sincronizzati), ma `depth` non cambia mai
  // (resta fisso a 50, il valore di default in baura/_object.json — il PIU'
  // arretrato di ogni oggetto nella room, "il fondo"), e i suoi sprite (day/
  // dayset/sett/setnite/nite) sono campionati pixel per pixel dalle texture
  // originali: colori PIENI e OPACHI (alpha 255 ovunque, non 64/255 come
  // `aura`), non un multiplicatore di tinta ma uno sfondo vero e proprio —
  // `day`=(216,239,255) azzurro cielo, `sett`=(255,162,130) pesca tramonto,
  // `nite`=(45,49,104) blu notte; `dayset`/`setnite` sono le stesse 290
  // animazioni-transizione di `amb00`/`ambtr1`, ma qui un lerp RGB lineare
  // fra i due colori pieni (verificato campionando piu' frame: il frame a
  // meta' e' esattamente la media dei due estremi), non un fade di alpha.
  // Stessa scala enorme (`action_sprite_transform(90, 90, 0, 0)`, contro
  // 150x90 di `aura`) e stessa posizione fissa (`move_to(0, -200)`): copre
  // l'intera room e OLTRE, sempre — l'autore lo notava proprio "anche fuori
  // dalla mappa", dove infatti e' l'UNICO posto in cui si vede davvero: `air2`
  // (il terreno, STUDIO.md/main.js) e' completamente opaco e copre l'intera
  // room, quindi dentro i confini `baura` resta sempre coperto — la sua unica
  // superficie visibile e' lo sfondo FUORI dalla room, oggi la vignetta bianca
  // fissa qui sotto (aggiunta per i "bordi strappati" del terreno in
  // zoom-out, mai un vero sfondo). `bauraColorAt()` sostituisce quel bianco
  // fisso con la tinta vera, mescolata con bianco (`VIGNETTE_TINT_MIX`) per
  // restare leggibile sotto le icone nere della UI in ogni condizione — la
  // stessa ragione (STUDIO.md, sotto) per cui la vignetta e' bianca e non
  // nera: qui pero' un compromesso, non un colore fisso, dato che il
  // giocatore ha chiesto esplicitamente il tint del cielo invece del bianco
  // piatto.
  const BAURA_DAY = [216 / 255, 239 / 255, 255 / 255];
  const BAURA_SUNSET = [255 / 255, 162 / 255, 130 / 255];
  const BAURA_NIGHT = [45 / 255, 49 / 255, 104 / 255];
  const BAURA_OVERLAY = [
    { from: BAURA_DAY, to: BAURA_SUNSET },      // giorno(290): dayset, cielo -> tramonto
    { from: BAURA_SUNSET, to: BAURA_SUNSET },   // alba(200): sett, fisso
    { from: BAURA_SUNSET, to: BAURA_NIGHT },    // giorno(290): setnite, tramonto -> notte
    { from: BAURA_NIGHT, to: BAURA_NIGHT },     // notte(900): nite, fisso
    { from: BAURA_NIGHT, to: BAURA_SUNSET },    // giorno(290): setnite al contrario, notte -> tramonto
    { from: BAURA_SUNSET, to: BAURA_SUNSET },   // alba(100): sett, fisso
    { from: BAURA_SUNSET, to: BAURA_DAY },      // giorno(290): dayset al contrario, tramonto -> cielo
    { from: BAURA_DAY, to: BAURA_DAY },         // giorno(900): day, fisso
  ];
  function bauraColorAt(t) {
    const { i, u } = phaseIndexAt(t);
    const { from, to } = BAURA_OVERLAY[i];
    const k = Math.min(1, u / PHASES[i].dur);
    return from.map((v, j) => v + (to[j] - v) * k);
  }

  let phaseT = 0;
  function phaseIndexAt(t) {
    const total = PHASES.reduce((s, p) => s + p.dur, 0);
    let u = t % total;
    let i = 0;
    while (u > PHASES[i].dur) { u -= PHASES[i].dur; i = (i + 1) % PHASES.length; }
    return { i, u };
  }
  // [Bug corretto, segnalato dall'autore: "il tint si applica correttamente
  // al cambio di fase ma poi torna indietro a bianco: deve restare quel
  // tint finche' non scatta la fase successiva"] Prima interpolava SEMPRE
  // dalla tinta della fase corrente (`a.rgb`) verso quella della fase
  // SUCCESSIVA (`b.rgb`) per l'intera durata di ogni fase — corretto per le
  // fasi "day" (che nell'originale SONO i sotto-eventi di transizione,
  // AURA_OVERLAY sopra: `ambtr1`/`amb00`, mai fissi), ma sbagliato per
  // "dawn"/"night": derivavano subito verso il bianco del giorno successivo
  // per l'intera propria durata invece di restare ferme sulla propria tinta
  // com'e' invece per l'overlay (`amb0`/`amb2`, "fisso" — vedi i commenti su
  // AURA_OVERLAY). Ora solo le fasi "day" interpolano (fra la tinta della
  // fase PRECEDENTE e quella SUCCESSIVA, le uniche due mai diverse da bianco
  // in questo ciclo), mentre "dawn"/"night" restituiscono la propria `rgb`
  // ferma per tutta la durata.
  function ambientAt(t) {
    const { i, u } = phaseIndexAt(t);
    const cur = PHASES[i];
    if (cur.name !== "day") return { rgb: cur.rgb, label: cur.name };
    const prev = PHASES[(i - 1 + PHASES.length) % PHASES.length];
    const next = PHASES[(i + 1) % PHASES.length];
    const k = Math.min(1, u / cur.dur);
    const s = k * k * (3 - 2 * k);                    // smoothstep
    return {
      rgb: prev.rgb.map((v, j) => v + (next.rgb[j] - v) * s),
      label: s < 0.75 ? prev.name : prev.name + " → " + next.name,
    };
  }
  // [Decisione dell'autore: "il temporale vero creava un sistema
  // particellare di pioggia, e SOLO durante quella c'era la possibilita' di
  // fulmini"] Il cielo che si scurisce durante il temporale — **[C]**
  // `thunderclap` (r12/Alarm_2.gml, ramo `match`) copre l'intera view con
  // uno sprite animato (`nitedis`) che entra in 120 tick (2s) e resta finche'
  // il temporale non finisce (r12/Alarm_7.gml gli dice di uscire, altri 2s).
  // [Bug corretto, segnalato dall'autore: "nel gioco originale c'era anche un
  // effetto black-to-fade sullo sfondo durante i fulmini, verifica che ci sia
  // e implementalo"] `nitedis` NON e' affatto inestraibile come annotato qui
  // prima ("mai estratto in questo porting") — esiste per davvero in
  // `data/sprites.json` (60 frame, 160x160, texture pages 67-68) e,
  // campionata pixel per pixel, e' una tinta PIENA color "nite" (45,49,104 —
  // la STESSA `BAURA_NIGHT` gia' usata sotto per baura/l'overlay giorno-
  // notte) la cui unica animazione e' l'ALPHA: da 255 (frame 0) a ~6 (frame
  // 59), una rampa lineare quasi perfetta — esattamente un fade-to-black(-
  // blu) classico, non un pattern da tassellare. La versione precedente
  // approssimava scurendo la tinta ambientale VERSO IL NERO (`amb.rgb *=
  // 1-darken`) — una tecnica diversa da un vero overlay alpha-blended color
  // "nite" sopra la scena (`dest = scena*(1-a) + nite*a`, quello che
  // GameMaker fa disegnando lo sprite semitrasparente sopra tutto): stesso
  // fade in/out lineare di 2s, ma il MONDO restava semplicemente piu' buio
  // (verso il nero) invece di virare visibilmente verso il blu notte vero,
  // come un vero cielo di tempesta. Sostituito sotto da un quad pieno in
  // spazio schermo (STORM_FLASH_TINT, disegnato nel layer GUI insieme alla
  // vignetta fuori mappa) invece di toccare l'ambient — stesso principio gia'
  // usato li' per la vignetta/l'overlay aura.
  // Il picco di opacita' resta STORM_FLASH_MAX invece del vero 255/255 del
  // frame 0 di `nitedis`: un overlay quasi opaco per i ~26s centrali di un
  // temporale da 30-35s (STORM_DURATIONS, state.js) renderebbe la citta'
  // invisibile per la maggior parte della sua durata — plausibile solo se
  // l'Alarm originale applica un `image_alpha` aggiuntivo mai visto (fuori
  // dagli sprite che possiamo campionare) per tenerlo giocabile: **[I]**
  // stessa cautela gia' scelta per lo stesso motivo prima, non un valore
  // verificabile dai soli asset.
  const STORM_DARKEN_FADE = 2;      // [C] 120 tick, nitedis
  const STORM_FLASH_MAX = 0.35;     // [I] picco di opacita' dell'overlay, vedi sopra
  const STORM_FLASH_TINT = (Math.round(BAURA_NIGHT[0] * 255) << 16) | (Math.round(BAURA_NIGHT[1] * 255) << 8) | Math.round(BAURA_NIGHT[2] * 255);
  function stormFlashAlpha(r12) {
    if (!r12.storm) return 0;
    const elapsed = r12.stormDuration - r12.stormT;
    const k = Math.min(elapsed / STORM_DARKEN_FADE, r12.stormT / STORM_DARKEN_FADE, 1);
    return Math.max(0, k) * STORM_FLASH_MAX;
  }
  // [C] casa1/Alarm_3.gml: `aura.night` — booleano secco, a differenza della
  // tinta ambientale che sfuma. Usa la stessa fase di ambientAt() (nessuno
  // smoothstep: qui serve un confine netto, com'era nell'originale).
  function isNight(t) {
    return PHASES[phaseIndexAt(t).i].name === "night";
  }
  // [C] sooool/Alarm_4.gml: `aura.dawn` — lo stesso confine netto di isNight()
  // sopra, per la produzione elettrica di `solare` (stepSolarProduction()).
  function isDawn(t) {
    return PHASES[phaseIndexAt(t).i].name === "dawn";
  }

  // `baura` (STUDIO.md, gap minore "nifast/mud/baura mai investigati") —
  // investigato, NON portato, per un motivo trovato solo provandolo: `mud`
  // non ha nessun codice proprio (gia' corretto com'e', un decoro statico
  // qualunque); `baura` e' presente su `match`/`tutorial` (mai
  // `match_easy`), un piccolo sole/luna (sprite 160x160, non uno sfondo a
  // piena mappa) che cicla `day/dayset/sett/setnite/nite` sugli STESSI 8
  // alarm di `aura` sopra (identiche durate) — la logica sarebbe stata
  // banale da agganciare a PHASES/phaseIndexAt() gia' qui sopra. **[Bug
  // evitato mentre si implementava**: `baura/Create.gml` lo sposta RELATIVO
  // di (0,-200) dalla propria istanza di scena (a sua volta (0,0)) — cioe'
  // 200px SOPRA il bordo superiore della room (`cam.bounds.top = 0`, qui
  // sopra). `Camera.clamp()` (game/src/camera.js) non lascia MAI il centro
  // scendere sotto `top + worldH/2`: qualunque sia lo zoom, il bordo
  // superiore della viewport non supera mai `y=0` — un punto a y=-200 non
  // e' quindi mai, in nessuna condizione di zoom/pan, dentro l'area
  // visibile. Animarlo per bene (l'ho scritto, poi tolto: stessa idea di
  // BAURA_PHASE_SPRITE/bauraSpriteFrame() gia' provata per `r120MotorDecor`)
  // sarebbe stato codice morto — nessun giocatore potrebbe mai vederlo senza
  // prima cambiare i limiti della camera, una modifica diversa e piu'
  // rischiosa (STUDIO.md, il fix "niente bordi" che ha introdotto quel
  // clamp) di quanto valga per un sole/luna decorativo. `nifast` resta
  // anch'esso un gap: il suo spawner periodico e' specifico di `match` e
  // non ancora collegato ad atmosphere.js (oggi copre solo `match_easy`).

  // --------------------------------------------------------------- luci
  // Le "luci" (bagliore finestre di chies/casa/industria, aggiunte da
  // addDecor() come decori con `_selfLit: true`) non funzionavano per due
  // motivi, entrambi da src/objects/cddvd|d111|di11b (STUDIO.md §5.3
  // "notte_target"), studiati insieme:
  //  1. Restavano sempre alla stessa tinta del resto del mondo: di notte la
  //     tinta ambientale (`PHASES` sopra) le scuriva tanto quanto tutto il
  //     resto, invece di restare accese sopra al buio — un bagliore che si
  //     spegne insieme alla luce ambientale non serve a niente. L'originale
  //     risolveva lo stesso problema con un depth piu' vicino di 1 rispetto
  //     al proprio edificio (`addDecor()` sopra, `depth = -y - 1`) per
  //     "saltare" davanti a qualunque cosa scurisse la scena; qui l'analogo
  //     e' saltare la moltiplicazione per la tinta ambientale nel ciclo di
  //     disegno (vedi mulTint() e il layer mondo piu' sotto) — stesso
  //     effetto, un filtro colorato che i decori luce attraversano intatti
  //     invece di esserne oscurati.
  //  2. Comparivano/sparivano di scatto: l'originale anima la transizione con
  //     uno sprite dedicato (es. "crclx", un frame per tick, giocato
  //     all'indietro per accendersi/in avanti per spegnersi). **[Bug
  //     corretto, segnalato dall'autore: "case e palazzi non dovrebbero
  //     essere fade in / fade out ma usare degli sprite esistenti che
  //     accendevano le finestre un po' alla volta"]** una prima lettura
  //     aveva liquidato questo come "una dissolvenza in alpha dello stesso
  //     disegno, non un effetto diverso frame per frame" e implementato
  //     solo quello — ma i frame SONO diversi (finestre diverse accese
  //     l'una dopo l'altra, non la stessa immagine piu' o meno trasparente):
  //     `scrubSpriteFor()`/`_scrubSpr` sopra ora trovano e scorrono lo
  //     sprite vero a molti frame per chies/casa/palazzo (chi ce l'ha —
  //     industria non scorre affatto nel decompilato, club ricolora invece
  //     di scorrere, `_pulse` sopra). Il fade in alpha sotto resta il
  //     fallback per tutto il resto (nessuno sprite "x" trovato).
  const LIGHT_FADE = 200 * TICK;
  const UPSIGN_DEPTH = -9001;        // [C] upsign12/_object.json: depth = -9001
  // Segnali cliccabili della catena fari (game/src/platform.js): stesso
  // principio di "upsign" sopra, elencati qui una volta sola invece che
  // ricreati ogni frame nel loop di disegno.
  const FARO_SIGN_OBJS = new Set([
    "faroButton", "faroWaveSignal", "faroDockerSignal",
    "faro3Button", "faro3WaveSignal", "faro3DockerSignal",
  ]);
  function stepLights(entities, dt, night, r12) {
    // [C] cddvd/Step.gml: sotto questa soglia di elettricita' la luce non si
    // accende (o si spegne di colpo se lo era gia', "bout" nel decompilato —
    // qui la stessa soglia, ma il fade la spegne comunque con una dissolvenza
    // invece che di scatto: una semplificazione [I], non cambia il succo).
    const lit = night && r12.ele > 3;
    for (const d of entities) {
      if (!d._selfLit) continue;
      // `_fadeTicks` (grattacielo, buildings.js/addDecor()): `0` e' il fanale
      // rosso in cima ("m3rd"), che nel decompilato scatta di colpo invece di
      // dissolversi — nessun'altra luce del motore lo fa, quindi resta un
      // caso a parte invece di una LIGHT_FADE di durata zero (divisione per
      // zero). Le altre finestre (m3l1..9) hanno ognuna la propria durata;
      // tutto il resto del motore lascia `_fadeTicks` undefined e riusa LIGHT_FADE.
      if (d._fadeTicks === 0) { d._alpha = lit ? 1 : 0; continue; }
      // Club (`_pulse`, addDecor() sopra): accensione/spegnimento quasi di
      // scatto (CLUB_SNAP, 2 tick — vedi clublite1..4/Step.gml) invece della
      // dissolvenza comune, poi ricolora a dado ogni CLUB_PULSE_PERIOD (30
      // tick) fra le 4 tinte di CLUB_COLORS mentre resta accesa — il
      // "pulsare" al neon richiesto dall'autore.
      if (d._pulse) {
        d._lightT = Math.max(0, Math.min(CLUB_SNAP, d._lightT + (lit ? dt : -dt)));
        d._alpha = d._lightT >= CLUB_SNAP ? 1 : 0;
        if (d._alpha) {
          // Sfarfallio in loop (vedi il commento su CLUB_COLORS sopra):
          // GameMaker a image_speed:1 avanza 1 sottoimmagine per tick,
          // riavvolgendo da solo — stesso calcolo di WIND_ANIM_FPS/
          // frameCountFor per l'eolico, qui sempre alla velocita' base
          // (nessun `curSpd` da leggere, il club non ne ha uno). Riusa
          // `_pulseT` (sotto) anche come orologio dell'animazione: un solo
          // timer per "quale finestra e' accesa adesso" e "quando tocca
          // ricolorare", coerente con la loro stessa cadenza nel
          // decompilato (30 frame di sfarfallio ~ 30 tick di ricolorazione).
          if (d._pulseFrames > 1) d._f = frameFor(d.spr, Math.floor((d._pulseT ?? 0) * 60) % d._pulseFrames);
          d._pulseT = (d._pulseT ?? 0) + dt;
          if (d._pulseT >= CLUB_PULSE_PERIOD) {
            d._pulseT -= CLUB_PULSE_PERIOD;
            d._tint = CLUB_COLORS[(Math.random() * CLUB_COLORS.length) | 0];
          }
        }
        continue;
      }
      // Chies/casa/palazzo (`_scrubSpr`/`_scrubFrames`, addDecor() sopra):
      // vero scorrimento a sottoimmagini invece di una dissolvenza —
      // `_lightT` resta lo stesso timer 0..`fade` di sempre, ma la durata e'
      // quella VERA dello sprite (un frame per tick, `_scrubFrames` tick in
      // tutto — non piu' LIGHT_FADE) e pilota quale finestra e' accesa
      // invece di quanto e' trasparente l'intero disegno: **[C]** all'inizio
      // dell'accensione (`_lightT` appena sopra 0) e' il frame PIU' alto
      // (poche finestre accese, come `action_sprite_set(x, frames-1, -1)`
      // nel decompilato), a fine accensione (`_lightT` = `fade`) il frame 0
      // (tutte accese) — `_alpha` resta un semplice on/off (0 esatto solo a
      // "mai acceso"/"spenta del tutto": lo sprite stesso, non l'alpha,
      // comunica quante finestre sono accese in questo istante).
      if (d._scrubSpr) {
        // `SCRUB_TRUE_DURATION` (sopra): la durata VERA, non il conteggio
        // (deduplicato) di `_scrubFrames` — vedi il commento li' per il perche'.
        const fade = (SCRUB_TRUE_DURATION[d._scrubSpr] ?? d._scrubFrames) * TICK;
        d._lightT = Math.max(0, Math.min(fade, d._lightT + (lit ? dt : -dt)));
        d._alpha = d._lightT > 0 ? 1 : 0;
        const frameIdx = Math.round((1 - d._lightT / fade) * (d._scrubFrames - 1));
        d._f = frameFor(d._scrubSpr, frameIdx);
        continue;
      }
      const fade = d._fadeTicks != null ? d._fadeTicks * TICK : LIGHT_FADE;
      d._lightT = Math.max(0, Math.min(fade, d._lightT + (lit ? dt : -dt)));
      d._alpha = d._lightT / fade;
    }
  }

  // [I] I tre tipi di fumo (centrali/smoke.js, scia missile-gatling/
  // projectiles.js, scia aerei/threats.js) muoiono tutti di scatto
  // nell'originale (`action_kill_object` a fine vita) — qui invece si
  // dissolvono: alpha piena fino a SMOKE_FADE_FRAC di vita rimasta, poi un
  // fade lineare fino a 0 esattamente quando l'oggetto verrebbe comunque
  // scartato (stepSmoke()/stepSmoko()/stepAerSmoke()), cosi' non serve
  // allungarne la vita per vedere la dissolvenza.
  const SMOKE_FADE_FRAC = 0.35;
  function fadeAlpha(t, life) {
    const remaining = (life - t) / life;
    return Math.max(0, Math.min(1, remaining / SMOKE_FADE_FRAC));
  }

  // [Bug corretto/migliorato, richiesto dall'autore: "vorrei... che
  // cambiasse velocemente colore, se possibile che avesse anche un effetto
  // sfocato ai lati"] **[I]** ruota rapidamente in tinta unita (S=1,V=1)
  // invece del ciano fisso di prima — nessun equivalente nel decompilato
  // (WEAPONS.laser in projectiles.js: il vero `laserone` e' uno sprite
  // statico, mai tinto a runtime), puramente un effetto richiesto. Un ciclo
  // completo ogni ~0.15s: nell'arco della vita breve del fascio (BEAM_LIFE,
  // 20 tick ~0.33s) si vedono gia' due cicli interi, un vero "sfarfallio"
  // di colore invece di una dissolvenza di tinta lenta e poco percepibile.
  function hueToRgb(h) {
    const i = Math.floor(h * 6) % 6, f = h * 6 - Math.floor(h * 6);
    const q = 1 - f;
    let rr, gg, bb;
    if (i === 0) { rr = 1; gg = f; bb = 0; }
    else if (i === 1) { rr = q; gg = 1; bb = 0; }
    else if (i === 2) { rr = 0; gg = 1; bb = f; }
    else if (i === 3) { rr = 0; gg = q; bb = 1; }
    else if (i === 4) { rr = f; gg = 0; bb = 1; }
    else { rr = 1; gg = 0; bb = q; }
    return (Math.round(rr * 255) << 16) | (Math.round(gg * 255) << 8) | Math.round(bb * 255);
  }
  const BEAM_HUE_PERIOD = 0.15;   // [I] secondi per un ciclo completo di colore

  /** Il fascio del laser (game/src/projectiles.js, spawnBeam/stepBeams): un
   * quad pieno da bocca a `BEAM_VISUAL_LENGTH` (projectiles.js), l'unico VFX
   * del motore che non e' uno sprite (Renderer.drawQuad(), gl.js — vedi il
   * commento su WEAPONS.laser in projectiles.js per il perche'). Vita breve
   * (BEAM_LIFE): sfuma verso la fine come le altre VFX transitorie gia' nel
   * motore (fadeAlpha() sopra).
   *
   * [Bug corretto/migliorato, richiesto dall'autore: "un effetto sfocato ai
   * lati"] **[I]** tre quad concentrici invece di uno solo (nessuna vera
   * sfocatura nel renderer, gl.js — STUDIO.md, niente shader custom): un
   * involucro largo e tenue, uno medio piu' denso, un nucleo bianco stretto
   * e quasi opaco. Con il blending "over" gia' attivo (gl.js, SRC_ALPHA/
   * ONE_MINUS_SRC_ALPHA) tre strati semitrasparenti sovrapposti si
   * accumulano verso il centro esattamente come un vero bagliore (piu'
   * chiaro/denso al centro, sfumato ai bordi) senza bisogno di un vero
   * shader di blur.
   */
  function drawBeams() {
    const half = 7;   // meta' spessore del nucleo del fascio, in px (invariato)
    for (const bm of beams) {
      const dx = bm.x1 - bm.x0, dy = bm.y1 - bm.y0;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      const alpha = fadeAlpha(bm.t, BEAM_LIFE);
      const hue = (bm.t / BEAM_HUE_PERIOD) % 1;
      const color = hueToRgb(hue);
      const layer = (w, tint, a) => {
        const nx = -uy * w, ny = ux * w;
        r.drawQuad(
          solidFrame(white, 1, 1),
          { x: bm.x0 + nx, y: bm.y0 + ny }, { x: bm.x1 + nx, y: bm.y1 + ny },
          { x: bm.x1 - nx, y: bm.y1 - ny }, { x: bm.x0 - nx, y: bm.y0 - ny },
          tint, a,
        );
      };
      layer(half * 3.2, color, alpha * 0.18);     // involucro esterno, sfocato
      layer(half * 1.7, color, alpha * 0.4);       // strato medio
      layer(half, color, alpha * 0.85);            // nucleo colorato
      layer(half * 0.35, 0xffffff, alpha * 0.9);   // filo centrale bianco incandescente
      // Lampo alla bocca del cannone (richiesto dall'autore, "un effetto
      // lampo di luce sulla bocca del cannone stesso") — **[I]** si affianca
      // all'esplosione "fica" gia' creata da fireFrom() (projectiles.js,
      // spawnExplosion con MUZZLE_FLASH_SCALE): un piccolo bagliore
      // quadrato che pulsa con la stessa tinta del fascio, per legare
      // visivamente bocca e raggio invece di un lampo bianco generico
      // scollegato dal colore del colpo in corso.
      const flashSize = 26 * (1 - bm.t / BEAM_LIFE) + 10;
      r.draw(solidFrame(white, flashSize, flashSize), bm.x0 - flashSize / 2, bm.y0 - flashSize / 2, 1, 0xffffff, alpha * 0.7);
      r.draw(solidFrame(white, flashSize * 0.5, flashSize * 0.5), bm.x0 - flashSize * 0.25, bm.y0 - flashSize * 0.25, 1, color, alpha);
    }
  }

  // Tavolozza del menu di pausa (drawPauseOverlay()/drawSavingOptionsOverlay()
  // sotto, richiesto dall'autore: pannello e bottoni "sulla tonalita' del
  // bianco" con "un effetto di trasparenza figo" invece del riquadro scuro
  // opaco di prima) — bottoni piu' opachi/bianchi del pannello cosi' restano
  // riconoscibili come elementi cliccabili distinti sopra il "vetro" del
  // pannello, che lascia intravedere di piu' il mondo sfocato dietro.
  const PANEL_TINT = 0xffffff, PANEL_ALPHA = 0.78;
  const BUTTON_TINT = 0xffffff, BUTTON_ALPHA = 0.92;
  // Colore del testo HTML del menu di pausa/il balloon del tutorial
  // (drawHtmlText(), sotto) — stesso valore di `.gameText { color }` in
  // index.html, tenuto qui anche in caso servisse cambiarlo a runtime
  // (non oggi: nessuno dei due pannelli lo fa mai).
  const TEXT_TINT = "#232838";

  // Pool fisso di elementi HTML riusati dal menu di pausa/dal sotto-pannello
  // "saving options" (drawPauseOverlay()/drawSavingOptionsOverlay() sotto)
  // — Montserrat vero (index.html/game/fonts/), non piu' un font bitmap:
  // segnalato dall'autore, "gotham" (il fix precedente) restava comunque
  // un po' sgranato oltre scala 1, un limite intrinseco di QUALUNQUE atlas
  // bitmap — un font vettoriale vero non ce l'ha, a qualunque dimensione.
  // Un pool invece di creare/distruggere elementi ogni frame: 8 bastano per
  // il pannello piu' affollato (titolo + le 7 righe del menu principale),
  // riusati identici per "saving options" (titolo + 5 righe) — quelli in
  // piu' restano semplicemente nascosti (`hideUnusedText()`, sotto) invece
  // di essere ricreati. `resetTextPool()` va chiamata una volta a inizio
  // frame, `hideUnusedText()` una volta alla fine — cosi' un frame in cui
  // NESSuno dei due pannelli disegna (non in pausa) nasconde tutto da solo,
  // senza un ramo dedicato "pulisci se non in pausa".
  // Il menu di pausa e' l'unico chiamante da 8 slot, ma NON e' il worst
  // case: barra risorse/balloon del tutorial/banner "ATTACK INCOMING"/
  // "THUNDERSTORM INCOMING" (piu' sotto) restano tutti disegnati fuori
  // pausa (`&& !paused` li salta apposta durante il menu — stesso motivo di
  // drawHtmlText() sopra, testo HTML non sfumato dal blur) e possono capitare
  // TUTTI nello stesso frame: 4 risorse + mese + anno + cristalli (7) +
  // balloon tutorial (1) + i 2 banner = 10. Il pannello di vittoria
  // (drawOutcomeOverlay() sotto, ora anche lui Montserrat vero invece del
  // font bitmap — vedi il commento li') non congela la partita ("la
  // vittoria non blocca niente"), quindi puo' capitare nello STESSO frame
  // della barra risorse: titolo + messaggio + un bottone ("Keep playing") = 3
  // in piu'. Il pannello di SCONFITTA (stesso file, ramo `defeat`: ora
  // anche lui Montserrat vero, "testo nudo su nero" invece del pannello col
  // font bitmap) e' il vero worst case: titolo + messaggio + le 4 righe del
  // menu di game over = 6 — `outcome` non e' incluso in `hideResourceText`
  // (sotto), e l'olio puo' esaurirsi anche nel tutorial (roomName ===
  // "tutorial", piu' sotto), quindi barra risorse (7) + balloon tutorial
  // (1) + i 2 banner + il pannello di sconfitta (6) possono capitare tutti
  // nello stesso frame = 16, +1 di margine.
  const TEXT_POOL_SIZE = 17;
  const textPool = Array.from({ length: TEXT_POOL_SIZE }, () => {
    const el = document.createElement("div");
    el.className = "gameText";
    document.body.appendChild(el);
    return el;
  });
  let textPoolUsed = 0;
  function resetTextPool() { textPoolUsed = 0; }
  // [Nuova funzionalita', richiesta dall'autore: "sostituisci gli sprite
  // mfs1/mfs11/mfs2 delle due schermate nere della cutscene iniziale del
  // tutorial con scritte Montserrat vere, stesso effetto grafico del menu
  // (title.js/glitchLine — sdoppiamento cromatico ciano/blu, mix-blend-mode:
  // screen) ma molto piu' intenso: qui restano a schermo solo 1.5s/3.3s
  // (CUTSCENE_BLACK1_DURATION/BLACK2_DURATION, tutorial.js), contro il
  // lampo raro (visibile ~4% di un ciclo di 5.4s) del titolo, che in una
  // finestra cosi' breve sparirebbe quasi sempre senza mai flashare —
  // `rgbGlitchIntense` (index.html) e' un ciclo molto piu' corto e SEMPRE
  // visibile invece che un lampo occasionale. Testo, non piu' i due sprite
  // decompilati ("mfs1"/"mfs11" — Windows/Android, "Mount Fuji Software
  // presents" — e "mfs2", "NIMBUS"): solo "MOUNT FUJI SOFTWARE" (niente
  // "presents") per la prima schermata, "NIMBUS"/"REDUX" (le stesse due
  // righe, stessa gerarchia di dimensione, del titolo del menu principale)
  // per la seconda.
  const CUTSCENE_GHOST_LAYERS = [["#00e5ff", "0s"], ["#4d5bff", ".05s"]];
  // [Bug corretto, segnalato dall'autore: "smorza un po' l'effetto delle
  // scritte 'Mount Fuji presents'/'Nimbus Redux', e' un po' fastidioso"]
  // Ciclo rallentato da .5s a .7s (index.html/@keyframes rgbGlitchIntense
  // dimezza gia' opacita' e spostamento di picco): un tremolio piu' lento,
  // oltre che piu' tenue, invece del solo range compresso.
  function glitchCutsceneLine(text, sizeCss, baseColorCss) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:relative;" + sizeCss + baseColorCss;
    wrap.textContent = text;
    for (const [color, delay] of CUTSCENE_GHOST_LAYERS) {
      const ghost = document.createElement("div");
      ghost.className = "cutsceneGhost";
      ghost.textContent = text;
      ghost.style.cssText = "position:absolute;inset:0;pointer-events:none;" + sizeCss +
        `color:${color};mix-blend-mode:screen;animation:rgbGlitchIntense .7s infinite;animation-delay:${delay};`;
      wrap.appendChild(ghost);
    }
    return wrap;
  }
  const CUTSCENE_TITLE_SIZE = "font-size:clamp(22px,5.4vw,48px);font-weight:800;letter-spacing:0.08em;";
  const CUTSCENE_SUB_SIZE = "font-size:clamp(11px,1.4vw,15px);font-weight:700;letter-spacing:0.45em;margin-top:2px;";
  const cutsceneTextWrap = document.createElement("div");
  cutsceneTextWrap.style.cssText = "position:fixed;left:0;right:0;top:50%;transform:translateY(-50%);" +
    "text-align:center;pointer-events:none;z-index:7;display:none;" +
    "font-family:Montserrat,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;";
  document.body.appendChild(cutsceneTextWrap);
  // `mode`: null (nascosta) | "mfs1" (prima schermata nera) | "mfs2"
  // (seconda) — nomi presi dagli sprite che sostituiscono, per coerenza col
  // resto del file. Ricostruisce i nodi solo al CAMBIO di modalita' (non
  // ogni frame): la cutscene passa di qui una volta sola per fase.
  function setCutsceneText(mode) {
    cutsceneTextWrap.style.display = mode ? "block" : "none";
    if (cutsceneTextWrap.dataset.mode === (mode ?? "")) return;
    cutsceneTextWrap.dataset.mode = mode ?? "";
    cutsceneTextWrap.replaceChildren();
    if (mode === "mfs1") {
      cutsceneTextWrap.appendChild(glitchCutsceneLine("MOUNT FUJI SOFTWARE", CUTSCENE_TITLE_SIZE, "color:#fff;text-shadow:0 2px 14px rgba(0,0,0,0.55);"));
    } else if (mode === "mfs2") {
      cutsceneTextWrap.appendChild(glitchCutsceneLine("NIMBUS", CUTSCENE_TITLE_SIZE, "color:#fff;text-shadow:0 2px 14px rgba(0,0,0,0.55);"));
      cutsceneTextWrap.appendChild(glitchCutsceneLine("REDUX", CUTSCENE_SUB_SIZE, "color:rgba(255,255,255,0.8);text-shadow:0 1px 6px rgba(0,0,0,0.55);"));
    }
  }
  function hideUnusedText() {
    for (let i = textPoolUsed; i < textPool.length; i++) textPool[i].style.display = "none";
  }
  /** Prende il prossimo elemento libero dal pool, lo posiziona/testizza e lo
   * rende visibile — un'etichetta centrata su (cx,cy) di norma (i bottoni/
   * il titolo del menu di pausa), oppure un blocco di paragrafo allineato a
   * sinistra con `wrap:true` (il balloon del tutorial, sotto: piu' righe,
   * la larghezza vera la decide il CSS invece di wrapText()/measureText()
   * — mai stati pensati per un font vettoriale). Ritorna l'elemento cosi'
   * chi chiama puo' leggerne `getBoundingClientRect()` quando serve
   * conoscere le dimensioni VERE renderizzate (il balloon, per dimensionare
   * lo sfondo WebGL intorno al testo). */
  // `align`/`color` [Nuova funzionalita', richiesta dall'autore: "usa
  // Montserrat anche per la barra risorse in alto, il font li' e' ancora
  // sgranato"] — la barra risorse (main.js, poco sotto) disegna i suoi
  // valori con l'angolo SINISTRO ancorato a una x fissa sotto ogni icona
  // (stesso schema di drawText()/font.js, mai stato centrato), non con un
  // centro come ogni chiamante precedente di drawHtmlText() (menu di
  // pausa/balloon del tutorial/pannello vittoria-sconfitta) — `align:
  // "left"` replica quell'ancoraggio (sola traslazione verticale, mai
  // orizzontale). `color` (default `TEXT_TINT`, sotto — invariato per ogni
  // chiamante che non lo passa) serve perche' la barra risorse cambia
  // colore da nera a bianca di notte/nella vignetta scura (`barTextColor`,
  // la stessa soglia gia' usata da `setColorize()` per le icone — vedi il
  // commento li'), a differenza del testo sempre scuro-su-chiaro degli
  // altri pannelli.
  // [Bug corretto, richiesto dall'autore: "centriamo i due testi lunghi
  // (i messaggi 'oil'/'chies' della schermata di sconfitta)"] `align` non ha
  // piu' un default fisso a "center": undefined distingue "il chiamante non
  // l'ha passato" da "center" esplicito, cosi' i due rami sotto possono
  // avere un default DIVERSO l'uno dall'altro senza toccarsi a vicenda — il
  // ramo `wrap` restava sempre "left" qualunque cosa arrivasse (il balloon
  // del tutorial/drawConfirmResetOverlay()/il pannello di vittoria, nessuno
  // dei quali passa `align`, continuano quindi invariati), il ramo non-wrap
  // restava sempre "center" salvo `align:"left"` esplicito (barra risorse) —
  // ora il primo rispetta `align:"center"` quando richiesto esplicitamente
  // (i due messaggi di sconfitta sotto), il secondo resta identico a prima.
  function drawHtmlText(text, x, y, { size = 16, maxWidth, wrap = false, align, color } = {}) {
    const el = textPool[textPoolUsed++];
    el.textContent = text;
    el.style.display = "block";
    el.style.fontSize = `${size}px`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = color ?? TEXT_TINT;
    if (wrap) {
      el.style.textAlign = align === "center" ? "center" : align === "justify" ? "justify" : "left";
      el.style.whiteSpace = "normal";
      el.style.overflow = "visible";
      el.style.textOverflow = "clip";
      el.style.width = `${maxWidth}px`;
      el.style.transform = "none";
    } else if (align === "left") {
      el.style.textAlign = "left";
      el.style.whiteSpace = "nowrap";
      el.style.overflow = "visible";
      el.style.textOverflow = "clip";
      el.style.maxWidth = maxWidth != null ? `${maxWidth}px` : "";
      el.style.transform = "translateY(-50%)";
    } else {
      el.style.textAlign = "center";
      el.style.whiteSpace = "nowrap";
      el.style.overflow = "hidden";
      el.style.textOverflow = "ellipsis";
      el.style.maxWidth = maxWidth != null ? `${maxWidth}px` : "";
      el.style.transform = "translate(-50%, -50%)";
    }
    return el;
  }

  /**
   * Menu di pausa (`paused`, sopra): cattura il canvas gia' disegnato per
   * questo frame (il mondo, congelato — la simulazione non e' avanzata) e lo
   * sfuma con `PauseBlur.blurScreen()` (game/src/gl.js), poi ci disegna sopra
   * un oscuramento leggero + un pannello con titolo e i bottoni (Riprendi;
   * Salva/Carica su FILE, doSaveToFile()/doLoadFromFile() — vedi il commento
   * su `fileHandle` piu' sopra; Reset game; Saving options — l'autosave e'
   * ON di default ora, save.js/DEFAULT_AUTOSAVE_SETTINGS, quindi niente piu'
   * quicksave/quickload manuali in localStorage qui: sarebbero stati solo un
   * doppione, `doSave()`/`doLoad()` restano comunque per l'autosalvataggio
   * vero/il debug hook `window.__nimbus`).
   * Nessun equivalente nel decompilato (STUDIO.md, `paused` sopra): puramente
   * nostro.
   *
   * Chiamata FUORI dal batch GUI appena chiuso (`r.flush()` prima di questa
   * chiamata, nel ciclo di frame): `pauseBlur.blurScreen()` legge il
   * framebuffer di default con `gl.copyTexImage2D`, che vede solo quello che
   * e' GIA' stato consegnato alla GPU — se il batch fosse ancora aperto (dati
   * accodati ma non `flush()`ati) la cattura vedrebbe un frame vecchio o a
   * meta'.
   */
  /** Vedi il commento su `pauseBlurTex` (sopra, insieme a `paused`): la
   * cattura+blur e' identica per i tre pannelli di pausa finche' il mondo
   * sotto resta congelato, quindi viene fatta al piu' una volta per
   * "sessione" di pausa invece che ad ogni frame di ognuno dei tre. */
  function getCachedPauseBlur() {
    if (!pauseBlurTex || pauseBlurW !== canvas.width || pauseBlurH !== canvas.height) {
      pauseBlurTex = pauseBlur.blurScreen(canvas.width, canvas.height);
      pauseBlurW = canvas.width; pauseBlurH = canvas.height;
    }
    return pauseBlurTex;
  }
  function drawPauseOverlay() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const blurTex = getCachedPauseBlur();
    // `v0`/`v1` scambiati rispetto alla convenzione usuale (v0=alto, ogni
    // sprite caricato da loadTexture() ha UNPACK_FLIP_Y_WEBGL=false):
    // `gl.copyTexImage2D` cattura dal framebuffer di default, che ha
    // l'origine in basso a sinistra (convenzione GL) — l'opposto. Senza lo
    // scambio l'immagine sfumata apparirebbe capovolta.
    r.draw({ tex: blurTex, u0: 0, v0: 1, u1: 1, v1: 0, w: cw, h: ch, ox: 0, oy: 0 }, 0, 0, 1, 0xffffff, 1);
    // Oscuramento extra sopra lo sfumato — lo stesso rettangolo pieno gia'
    // usato per la vignetta fuori mappa (main.js sopra), qui semitrasparente:
    // il blur da solo non basta a far leggere bene un pannello chiaro sopra
    // un mondo comunque colorato/luminoso.
    r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 0.4);

    // [Bug corretto, richiesto dall'autore: "l'autosave e' ora attivo di
    // default (save.js, DEFAULT_AUTOSAVE_SETTINGS), rimuoviamo i due
    // pulsanti di quicksave/quickload manuali dal menu di pausa"] "Save
    // game"/"Load game" (localStorage, doSave()/doLoad() sotto) restavano
    // solo un doppione una volta che il salvataggio automatico copre gia' il
    // caso — chi vuole ancora un salvataggio ESPLICITO, portabile, ha
    // comunque "Save to file"/"Load from file" (save.js/saveToFile()/
    // loadFromFile() — vedi il commento su `fileHandle` sopra per come i due
    // percorsi si incontrano). `doSave()`/`doLoad()` restano invariate: le
    // usa ancora stepAutosave() (sotto) per l'autosalvataggio vero, e
    // doLoad() resta anche il tasto "Load game" della schermata di
    // sconfitta (drawOutcomeOverlay() piu' sotto — quella non e' stata
    // toccata, "carica l'ultimo autosave dopo essere morti" resta un
    // percorso a se', non un doppione di questo menu). "Saving options"
    // apre il sotto-pannello dell'autosalvataggio (drawSavingOptionsOverlay(),
    // pauseSubmenu sopra) per chi vuole spegnerlo/regolarlo.
    const rows = [
      { label: "Resume", action: "resume" },
      { label: "Save to file", action: "saveFile" },
      { label: "Load from file", action: "loadFile" },
      { label: "Saving options", action: "savingOptions" },
      { label: "Reset game", action: "resetGame" },
      { label: "Back to menu", action: "title" },
    ];
    const panelW = Math.min(360, cw - 40), panelH = 96 + rows.length * 60 + 20;
    const px = (cw - panelW) / 2, py = (ch - panelH) / 2;
    // Pannello "vetro smerigliato": bianco traslucido invece del rettangolo
    // scuro opaco di prima, angoli arrotondati (pausePanelFrame(), sopra) al
    // posto degli angoli vivi — appoggiato sullo sfondo gia' sfumato/
    // scurito qualche riga sopra, cosi' la trasparenza lascia intravedere il
    // mondo sfocato invece di un bianco piatto.
    r.draw(pausePanelFrame(panelW, panelH), px, py, 1, PANEL_TINT, PANEL_ALPHA);

    // Montserrat vero (drawHtmlText(), sopra) invece del font bitmap
    // "gotham" di prima — nitido a qualunque dimensione, niente piu'
    // scala intera/fitTextScale() da calcolare.
    const title = "PAUSE";
    drawHtmlText(title, px + panelW / 2, py + 34, { size: 26 });

    pauseMenuButtons = [];
    const btnW = panelW - 60, btnH = 46, btnGap = 14;
    let by = py + 96;
    for (const row of rows) {
      const bx = px + (panelW - btnW) / 2;
      r.draw(pauseButtonFrame(btnW, btnH), bx, by, 1, BUTTON_TINT, BUTTON_ALPHA);
      drawHtmlText(row.label, bx + btnW / 2, by + btnH / 2, { size: 17, maxWidth: btnW - 20 });
      pauseMenuButtons.push({ x: bx, y: by, w: btnW, h: btnH, action: row.action });
      by += btnH + btnGap;
    }
    r.flush();
  }

  /**
   * Sotto-pannello "Saving options" del menu di pausa (pauseSubmenu === "saving",
   * aperto dalla voce omonima di drawPauseOverlay()) — stessa identica
   * struttura pannello/bottoni/blur, solo righe diverse: le quattro
   * impostazioni di autosalvataggio (`autosave`, sopra) piu' "Back" per
   * tornare al pannello principale. Ogni riga mostra il proprio stato
   * attuale nell'etichetta stessa (ON/OFF, il valore in minuti) invece di
   * un controllo separato — un solo tap la cambia e basta, coerente con
   * l'unico altro controllo touch-only a piu' valori del motore (Zoom +/-,
   * piu' sotto).
   */
  function drawSavingOptionsOverlay() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const blurTex = getCachedPauseBlur();
    r.draw({ tex: blurTex, u0: 0, v0: 1, u1: 1, v1: 0, w: cw, h: ch, ox: 0, oy: 0 }, 0, 0, 1, 0xffffff, 1);
    r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 0.4);

    const rows = [
      { label: `Autosave: ${autosave.enabled ? "ON" : "OFF"}`, action: "toggleEnabled" },
      { label: `Interval: ${autosave.intervalMin} min`, action: "cycleInterval" },
      { label: `Save during attacks: ${autosave.duringAttacks ? "ON" : "OFF"}`, action: "toggleAttacks" },
      { label: `Save with low oil: ${autosave.duringLowOil ? "ON" : "OFF"}`, action: "toggleLowOil" },
      { label: "Back", action: "back" },
    ];
    // 360 fisso di nuovo (com'era prima del fix su "gotham"): Montserrat,
    // proporzionale, ci sta comoda anche sulla riga piu' lunga ("Save
    // during attacks: OFF") senza bisogno di allargare il pannello — a
    // differenza del font bitmap monospazio-per-carattere di prima, un
    // font vero varia larghezza per lettera, molto piu' compatto.
    const panelW = Math.min(360, cw - 40), panelH = 96 + rows.length * 60 + 20;
    const px = (cw - panelW) / 2, py = (ch - panelH) / 2;
    r.draw(pausePanelFrame(panelW, panelH), px, py, 1, PANEL_TINT, PANEL_ALPHA);

    const title = "SAVING OPTIONS";
    drawHtmlText(title, px + panelW / 2, py + 38, { size: 22, maxWidth: panelW - 24 });

    pauseMenuButtons = [];
    const btnW = panelW - 60, btnH = 46, btnGap = 14;
    let by = py + 96;
    for (const row of rows) {
      const bx = px + (panelW - btnW) / 2;
      r.draw(pauseButtonFrame(btnW, btnH), bx, by, 1, BUTTON_TINT, BUTTON_ALPHA);
      drawHtmlText(row.label, bx + btnW / 2, by + btnH / 2, { size: 15, maxWidth: btnW - 20 });
      pauseMenuButtons.push({ x: bx, y: by, w: btnW, h: btnH, action: row.action });
      by += btnH + btnGap;
    }
    r.flush();
  }

  /**
   * Sotto-pannello di conferma per "Reset game" (pauseSubmenu === "confirmReset",
   * aperto dalla voce omonima di drawPauseOverlay()) — stessa struttura
   * pannello/bottoni/blur delle altre due, con un avviso al posto delle
   * righe di stato: doResetGame() (sopra) cancella il quicksave della scena
   * e rimonta la room da zero, irreversibile, quindi serve un tap in piu'
   * su "Reset game" invece di scattare subito dal pannello principale.
   */
  function drawConfirmResetOverlay() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const blurTex = getCachedPauseBlur();
    r.draw({ tex: blurTex, u0: 0, v0: 1, u1: 1, v1: 0, w: cw, h: ch, ox: 0, oy: 0 }, 0, 0, 1, 0xffffff, 1);
    r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 0.4);

    const rows = [
      { label: "Cancel", action: "cancelReset" },
      { label: "Reset game", action: "confirmReset" },
    ];
    const panelW = Math.min(360, cw - 40);
    const warnH = 70;
    const panelH = 96 + warnH + rows.length * 60 + 20;
    const px = (cw - panelW) / 2, py = (ch - panelH) / 2;
    r.draw(pausePanelFrame(panelW, panelH), px, py, 1, PANEL_TINT, PANEL_ALPHA);

    const title = "RESET GAME";
    drawHtmlText(title, px + panelW / 2, py + 34, { size: 24 });
    drawHtmlText(
      "This will restart the level from scratch. This action cannot be undone.",
      px + 30, py + 60, { size: 14, maxWidth: panelW - 60, wrap: true },
    );

    pauseMenuButtons = [];
    const btnW = panelW - 60, btnH = 46, btnGap = 14;
    let by = py + 96 + warnH;
    for (const row of rows) {
      const bx = px + (panelW - btnW) / 2;
      r.draw(pauseButtonFrame(btnW, btnH), bx, by, 1, BUTTON_TINT, BUTTON_ALPHA);
      drawHtmlText(row.label, bx + btnW / 2, by + btnH / 2, { size: 17, maxWidth: btnW - 20 });
      pauseMenuButtons.push({ x: bx, y: by, w: btnW, h: btnH, action: row.action });
      by += btnH + btnGap;
    }
    r.flush();
  }

  /**
   * Pannello informativo di un edificio (`buildingInfoPanel`, sopra) —
   * [Nuova funzionalita', richiesta dall'autore: "quando la mano e'
   * selezionata e clicchi su un edificio (non difensivo) mostra un roundrect
   * bianco simile a quello del menu di pausa con una tabella riepilogativa
   * delle stats"]. Stesso identico post-processo/vetro smerigliato di
   * drawPauseOverlay() sopra (blur del mondo gia' disegnato + pannello
   * traslucido con angoli arrotondati), ma di sola lettura: un solo bottone
   * "Close" invece di una lista di azioni — onTap (sopra) chiude comunque il
   * pannello con QUALUNQUE tocco, il bottone e' li' solo per scoperta/
   * chiarezza (stesso principio di "tocca ovunque per chiudere" gia' usato
   * per bankPanelOpen).
   *
   * Vita massima (`currentMaxLife()`) e abitanti (`currentResidents()`,
   * `null` per i tipi che non ne hanno — industria/missile/chies/parco/club/
   * solare) vengono da buildings.js — vedi i commenti li' per come sono
   * ricostruiti, dato che nessuno dei due e' un dato salvato di per se'
   * sull'istanza. Un edificio ancora in cantiere (`b.construction`) non ha
   * ancora vita/abitanti veri (`b.life`/`r12.pop` restano a 0/quello di
   * prima finche' il cantiere non finisce): mostra solo lo stato, non
   * statistiche a zero che sembrerebbero un edificio morente.
   */
  function drawBuildingInfoPanel() {
    const b = buildingInfoPanel;
    const def = BUILDING_TYPES[b.type];
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const blurTex = pauseBlur.blurScreen(canvas.width, canvas.height);
    r.draw({ tex: blurTex, u0: 0, v0: 1, u1: 1, v1: 0, w: cw, h: ch, ox: 0, oy: 0 }, 0, 0, 1, 0xffffff, 1);
    r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 0.4);

    const maxLevel = 1 + (def.upgrades?.length ?? 0);
    const maxLife = currentMaxLife(b);
    const residents = !b.construction ? currentResidents(b) : null;
    // `def.production` (industria, indicizzata per livello come `growth`):
    // energia generata/olio consumato ad ogni ciclo al livello attuale —
    // l'unico altro numero "di stato" oltre vita/abitanti gia' pronto in
    // BUILDING_TYPES senza dover ricostruire nulla, buildings.js.
    const production = !b.construction ? def.production?.[b.level - 1] : null;
    const statLines = [];
    if (residents != null) statLines.push(`Residents: ${Math.round(residents)}`);
    if (production) statLines.push(`Energy: +${production.ele}/cycle (uses ${production.oil} oil)`);

    const panelW = Math.min(320, cw - 40);
    const barH = 20;
    const headerH = 70;
    const bodyH = b.construction ? 30 : (22 + barH + 20);
    const statsH = statLines.length * 26;
    const btnH = 46;
    const panelH = headerH + bodyH + statsH + 16 + btnH + 20;
    const px = (cw - panelW) / 2, py = (ch - panelH) / 2;
    r.draw(pausePanelFrame(panelW, panelH), px, py, 1, PANEL_TINT, PANEL_ALPHA);

    const title = def.label + (maxLevel > 1 && !b.construction ? ` — Level ${b.level}/${maxLevel}` : "");
    drawHtmlText(title, px + panelW / 2, py + 32, { size: 20, maxWidth: panelW - 30 });

    let cy = py + headerH;
    if (b.construction) {
      drawHtmlText("Under construction…", px + panelW / 2, cy + 10, { size: 15, maxWidth: panelW - 30 });
      cy += bodyH;
    } else {
      const ratio = maxLife > 0 ? Math.max(0, Math.min(1, b.life / maxLife)) : 0;
      drawHtmlText(`Health: ${Math.max(0, Math.round(b.life))} / ${Math.round(maxLife)}`, px + panelW / 2, cy, { size: 15, maxWidth: panelW - 30 });
      cy += 22;
      const barX = px + 20, barW = panelW - 40;
      r.draw(solidFrame(white, barW, barH), barX, cy, 1, 0x000000, 0.12);
      const barColor = ratio > 0.5 ? 0x4caf50 : ratio > 0.2 ? 0xffa726 : 0xef5350;
      if (ratio > 0) r.draw(solidFrame(white, barW * ratio, barH), barX, cy, 1, barColor, 0.9);
      cy += barH + 20;
    }
    for (const line of statLines) {
      drawHtmlText(line, px + panelW / 2, cy, { size: 15, maxWidth: panelW - 30 });
      cy += 26;
    }

    const btnW = panelW - 60, bx = px + (panelW - btnW) / 2, by = py + panelH - 20 - btnH;
    r.draw(pauseButtonFrame(btnW, btnH), bx, by, 1, BUTTON_TINT, BUTTON_ALPHA);
    drawHtmlText("Close", bx + btnW / 2, by + btnH / 2, { size: 17, maxWidth: btnW - 20 });

    r.flush();
  }

  // Overlay costruzioni mobile (buildMenuOpen, sopra) — griglia 4 colonne
  // richiesta dall'autore: riga 1 casa/industria/parco/lanciarazzi, riga 2
  // palazzo/fotovoltaico/club/gatling, riga 3 villa/eolico/mediateca/laser.
  // `casa`/`industria` non vivono in OTHER_BUILDINGS (sono gli unici due
  // edifici SEMPRE reali, mai segnaposto, STUDIO.md) — duplicati qui con lo
  // stesso sprite/tint del bottone hardcoded nella riga scorrevole
  // (menoo===1, sotto): tenerli in sync se quei due cambiano.
  const BUILD_GRID_COLS = 4;
  const BUILD_GRID_TYPES = [
    ["casa", "industria", "parco", "missile"],
    ["palazzo", "solare", "club", "gatling"],
    ["villa", "eolico", "museo", "laser"],
  ];
  function buildMenuEntries() {
    const byType = Object.fromEntries([
      { type: "casa", spr: "p1", tint: 0x114f1f },
      { type: "industria", spr: "p2", tint: 0x603415 },
      ...OTHER_BUILDINGS,
    ].map((b) => [b.type, b]));
    const rows = BUILD_GRID_TYPES.map((row) => row.map((type) => byType[type]));
    // Edifici stella (STAR_BUILDINGS, sotto) sbloccati: appesi come riga
    // extra invece che nella griglia fissa richiesta — restano rari premi
    // di fine partita, non hanno un posto fisso nel layout a 3 righe.
    const starRow = STAR_BUILDINGS.filter((b) => b.unlocked());
    if (starRow.length) rows.push(starRow);
    return rows;
  }
  // Geometria pura (nessun disegno): riusata sia per ricalcolare
  // `buildMenuButtons` ad inizio frame (cosi' la freccia del tutorial vede
  // gia' le posizioni AGGIORNATE di questo frame, non quelle del frame
  // prima — vedi il commento sulla freccia piu' sotto) sia da
  // drawBuildMenuOverlay() per disegnare, senza calcolare due volte cose
  // diverse che dovrebbero combaciare a pixel.
  function buildMenuLayout(cw, ch) {
    const rows = buildMenuEntries();
    const cell = 76, gridPad = 16;
    const panelW = Math.min(BUILD_GRID_COLS * cell + gridPad * 2, cw - 40);
    const trueCell = (panelW - gridPad * 2) / BUILD_GRID_COLS;
    // headerH: prima 56px, spazio per l'etichetta "BUILDINGS" ora rimossa
    // (drawBuildMenuOverlay(), sotto) — ridotto a un margine puro sopra la
    // griglia, non piu' un'intestazione vuota.
    const headerH = 20, btnH = 46;
    const panelH = headerH + rows.length * trueCell + 16 + btnH + 20;
    const px = (cw - panelW) / 2, py = (ch - panelH) / 2;
    return { rows, px, py, panelW, panelH, cell: trueCell, gridPad, headerH, btnH };
  }
  function computeBuildMenuButtons() {
    const { rows, px, py, panelW, panelH, cell, gridPad, headerH, btnH } =
      buildMenuLayout(canvas.clientWidth, canvas.clientHeight);
    const buttons = [];
    let gy = py + headerH;
    for (const row of rows) {
      let gx = px + gridPad;
      for (const b of row) {
        buttons.push({ x: gx, y: gy, w: cell, h: cell, type: b.type, spr: b.spr });
        gx += cell;
      }
      gy += cell;
    }
    const btnW = panelW - 60;
    buttons.push({ x: px + (panelW - btnW) / 2, y: py + panelH - 20 - btnH, w: btnW, h: btnH });   // "Back"
    return buttons;
  }
  /**
   * Disegna l'overlay (buildMenuButtons, sopra: gia' ricalcolato ad inizio
   * frame, riusato qui com'e' invece di rifare la griglia). Stesso "vetro
   * smerigliato" (pausePanelFrame()/PANEL_TINT/BUTTON_TINT) del menu di
   * pausa/pannello edificio — blur del mondo congelato sotto, pannello
   * arrotondato sopra. Solo icone, nessuna etichetta sotto ogni bottone:
   * stessa convenzione gia' scelta per la riga scorrevole di sempre (mai
   * stata affiancata da testo). Selezionare un edificio chiude subito
   * l'overlay (input.onTap sotto) — un picker, non un pannello da tenere
   * aperto.
   */
  function drawBuildMenuOverlay() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const blurTex = pauseBlur.blurScreen(canvas.width, canvas.height);
    r.draw({ tex: blurTex, u0: 0, v0: 1, u1: 1, v1: 0, w: cw, h: ch, ox: 0, oy: 0 }, 0, 0, 1, 0xffffff, 1);
    r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 0.4);

    const { px, py, panelW, panelH } = buildMenuLayout(cw, ch);
    r.draw(pausePanelFrame(panelW, panelH), px, py, 1, PANEL_TINT, PANEL_ALPHA);
    // [Bug corretto, richiesto dall'autore: "togliere la scritta 'buildings'
    // in alto (e' un'informazione ovvia)"] Il pannello si apre SOLO toccando
    // il bottone "Buildings menu" (groo): a differenza del menu di pausa
    // (che puo' comparire da piu' punti d'ingresso e quindi ha bisogno di
    // dirsi cosa e') qui il contesto e' gia' ovvio a chi lo ha appena aperto
    // — l'etichetta era ridondante. `headerH` (buildMenuLayout(), sotto) e'
    // stato ridotto in proporzione: senza testo non serve piu' tutto quello
    // spazio sopra la griglia.

    for (const b of buildMenuButtons) {
      if (!b.type) continue;   // "Back", disegnato a parte sotto
      const f = frameFor(b.spr);
      if (!f) continue;
      const scale = Math.min((b.w - 14) / f.w, (b.h - 14) / f.h);
      // p1/p2/... hanno origine in basso a sinistra (origin_x=0, origin_y=
      // height — data/sprites.json, stessa convenzione gia' letta per la
      // riga scorrevole): l'angolo in alto a sinistra dello sprite scalato
      // va quindi calcolato a mano per centrarlo nella cella, non basta
      // passare il centro della cella come punto di ancoraggio.
      const iconX = b.x + (b.w - f.w * scale) / 2;
      // [Bug corretto, segnalato dall'autore: "la linea nera di base degli
      // sprite e' disallineata tra gli edifici della stessa riga"] Prima
      // `iconY` centrava ogni sprite VERTICALMENTE nella propria cella
      // (`b.y + (b.h + f.h*scale)/2`, meta' strada fra il bordo e il centro
      // usando l'ALTEZZA PROPRIA dello sprite) — corretto per uno sprite
      // isolato, ma edifici diversi hanno altezze diverse (un parco basso e
      // largo contro un grattacielo alto e stretto): centrare ciascuno per
      // conto proprio piazza le loro basi (il bordo inferiore, dove tocca
      // "terra") ad altezze DIVERSE, una fila apparentemente sfalsata anche
      // se le celle sono allineate. Qui ogni sprite appoggia invece sulla
      // STESSA linea di base (il fondo della cella, con lo stesso margine di
      // 7px gia' usato in orizzontale sopra) indipendentemente dalla propria
      // altezza — coerente riga per riga, e anche fra righe diverse.
      const iconY = b.y + b.h - 7;
      // [Nuova funzionalita', richiesta dall'autore: "usare colorize per
      // l'edificio attualmente selezionato"] Stesso trattamento gia' usato
      // per i bottoni SELEZIONATI della riga scorrevole in basso (vedi il
      // commento su `usingSelBuilding`/`b.tint` piu' sotto in questo file):
      // `setColorize(true)` sostituisce l'RGB della sagoma con `b.tint` a
      // tinta piena invece di lasciarla nera/nel suo colore naturale,
      // marcando a colpo d'occhio quale dei bottoni di questa griglia e' lo
      // strumento davvero attivo in questo momento — prima nessuno dei due
      // stati (selezionato o no) si distingueva dall'altro qui dentro.
      const isSelected = selectedType === b.type;
      const icon = isSelected ? findBuildingIcon(b.type) : null;
      // `locked`: stessa soglia di livello chiesa della riga scorrevole
      // desktop (buildingLocked()/LOCKED_BUTTON_ALPHA, definite piu' sotto
      // in questo file insieme a OTHER_BUILDINGS — stessa griglia di
      // BUILD_GRID_TYPES sopra, quindi stesso ordine e stessi tipi).
      const locked = buildingLocked(b.type);
      r.setColorize(isSelected);
      r.draw(f, iconX, iconY, scale, isSelected ? (icon?.tint ?? 0xffffff) : 0xffffff, locked ? LOCKED_BUTTON_ALPHA : 1);
      r.setColorize(false);
    }
    // Cartellino prezzo/"Level N to unlock" (unlockTagSprite()/
    // costTagSprite(), sopra) — l'equivalente touch dell'hover mouse della
    // riga scorrevole desktop (drawUiRow() piu' sotto, stesso schema).
    // `input.hover` segue anche un dito che scorre senza sollevarsi
    // (Input._move(), input.js): un "pan" sopra un bottone lo rivela in
    // diretta, aggiornando anche `buildMenuTagType`/`Until` cosi' che
    // sollevare il dito subito dopo lasci il cartellino ancora un attimo.
    // Nessun controllo su `hoverPointerType`: questo overlay esiste solo su
    // mobile (isMobile, buildMenuOpen sopra), il touch e' l'unico caso reale.
    const hoveredTagBtn = input.hover && buildMenuButtons.find((b) => b.type
      && input.hover.x >= b.x && input.hover.x <= b.x + b.w
      && input.hover.y >= b.y && input.hover.y <= b.y + b.h);
    if (hoveredTagBtn) { buildMenuTagType = hoveredTagBtn.type; buildMenuTagUntil = performance.now() + 2500; }
    const tagBtn = hoveredTagBtn
      ?? (buildMenuTagType && performance.now() < buildMenuTagUntil ? buildMenuButtons.find((b) => b.type === buildMenuTagType) : null);
    function drawMenuTag(btn, spr, alpha) {
      const tagFrame = frameFor(spr);
      if (!tagFrame) return;
      // Clampato dentro lo schermo (min/max sotto): un bottone sul bordo
      // sinistro/destro della griglia spingerebbe altrimenti il cartellino
      // (piu' largo di una singola cella) oltre il bordo del canvas.
      const tx = Math.min(Math.max(btn.x + btn.w / 2 - (tagFrame.w * COST_TAG_SCALE) / 2, 4), cw - tagFrame.w * COST_TAG_SCALE - 4);
      const ty = Math.max(btn.y - 8, 4);
      r.draw(tagFrame, tx, ty, COST_TAG_SCALE, 0xffffff, alpha);
    }
    if (tagBtn) {
      const locked = buildingLocked(tagBtn.type);
      drawMenuTag(tagBtn, locked ? unlockTagSprite(tagBtn.type) : costTagSprite(tagBtn.type, null), 1);
    }
    // [Bug corretto/Nuova funzionalita', vedi il commento su gridTapTagType/
    // At sopra] Un tap secco su QUALUNQUE bottone (bloccato o no) lo arma
    // con un timestamp assoluto invece del "linger" di `buildMenuTagType`/
    // `Until` (pensato per un dito che scorre e si solleva, non per questo
    // caso) — pieno per GRID_TAP_SHOW_MS, poi dissolto in GRID_TAP_FADE_MS
    // invece di sparire di scatto. Stesso sprite scelto dal resto della
    // funzione (locked ? unlockTagSprite : costTagSprite, sopra).
    if (gridTapTagType) {
      const elapsed = performance.now() - gridTapTagAt;
      const total = GRID_TAP_SHOW_MS + GRID_TAP_FADE_MS;
      const btn = elapsed < total && buildMenuButtons.find((b) => b.type === gridTapTagType);
      if (btn) {
        const alpha = elapsed < GRID_TAP_SHOW_MS ? 1 : 1 - (elapsed - GRID_TAP_SHOW_MS) / GRID_TAP_FADE_MS;
        const locked = buildingLocked(btn.type);
        drawMenuTag(btn, locked ? unlockTagSprite(btn.type) : costTagSprite(btn.type, null), alpha);
      } else {
        // Il cartellino e' svanito del tutto: se era quello di un bottone
        // GIA' selezionato al tap (input.onTap sopra: un bloccato non
        // seleziona mai, quindi non arriva mai qui), la sua unica ragione
        // di restare a schermo era mostrare il prezzo — l'overlay si chiude
        // da sola, lo stesso "tap seleziona e chiude" di sempre, solo
        // ritardato quel tanto che serve a leggere il prezzo. Un bottone
        // ancora bloccato invece resta aperto: non ha mai selezionato
        // nulla, non c'e' alcuna scelta da cui "tornare al mondo".
        if (!buildingLocked(gridTapTagType)) buildMenuOpen = false;
        gridTapTagType = null;
      }
    }
    const backBtn = buildMenuButtons[buildMenuButtons.length - 1];
    r.draw(pauseButtonFrame(backBtn.w, backBtn.h), backBtn.x, backBtn.y, 1, BUTTON_TINT, BUTTON_ALPHA);
    drawHtmlText("Back", backBtn.x + backBtn.w / 2, backBtn.y + backBtn.h / 2, { size: 17, maxWidth: backBtn.w - 20 });

    r.flush();
  }

  /** Rettangolo bordato (solo contorno, interno trasparente) — usato dai
   * bottoni "testo nudo su nero" della schermata di sconfitta sotto, dove il
   * nero di fondo deve restare visibile anche dentro il bottone (nessun
   * pannello dietro, a differenza di pausePanelFrame()/pauseButtonFrame()
   * sotto). [Bug corretto, richiesto dall'autore: "il colore bianco solo
   * contorno va bene, ma facciamo gli angoli arrotondati come il menu di
   * pausa"] Angoli arrotondati come pauseButtonFrame() sotto (stesso raggio,
   * 14) invece delle quattro strisce dritte di prima — `outlineButtonFrame`
   * (sotto, insieme a pausePanelFrame/pauseButtonFrame: stessa cache per
   * dimensione, stesso motivo li' spiegato) genera il contorno vero via
   * makeRoundedRectStrokeTexture() (gl.js), non piu' un quad pieno. */
  function drawOutlineRect(x, y, w, h, tint, alpha) {
    r.draw(outlineButtonFrame(w, h), x, y, 1, tint, alpha);
  }

  /**
   * `outcome` (sopra) — stesso post-processo di drawPauseOverlay(): cattura
   * il canvas gia' disegnato (`pauseBlur.blurScreen()`) e ci disegna sopra.
   * Chiamata FUORI dal batch GUI appena chiuso, stessa ragione li' spiegata.
   *
   * Sconfitta "chies" (la chiesa distrutta): crossfade verso il nero su
   * 1.2s, invariato. Sconfitta "oil" (l'olio esaurito): [Bug corretto,
   * richiesto dall'autore: "uno screenshot che trasla e' un po' triste"]
   * NON cattura piu' una schermata e la trasla — il mondo vero sta gia'
   * cadendo da solo (`crashFallY`/`oilCrash`, sopra: applicato dentro
   * `frameList()` piu' sopra, PRIMA che questa funzione giri nello stesso
   * frame), quindi qui non c'e' nulla da disegnare finche' `OIL_CRASH_INTRO_DUR`
   * non e' passato — il mondo gia' disegnato (con la citta' che sprofonda e
   * il cielo che continua, `skyAlive` sopra) resta visibile cosi' com'e',
   * senza sovrapposizioni. `outcomeButtons` resta vuoto in entrambi i casi
   * finche' l'introduzione non e' finita — nessun tocco fa niente prima di
   * allora, il pannello va guardato fino in fondo. Vittoria: nessuna
   * introduzione, lo stesso sfumato/oscuramento leggero del menu di pausa —
   * la partita continua sotto, non e' una fine.
   */
  function drawOutcomeOverlay() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    const defeat = outcome.kind === "defeat";
    const oilCrash = defeat && outcome.reason === "oil";
    if (oilCrash && outcome.t < OIL_CRASH_INTRO_DUR) {
      outcomeButtons = [];
      return;
    }
    const blurTex = pauseBlur.blurScreen(canvas.width, canvas.height);
    // v0/v1 scambiati: copyTexImage2D cattura dal framebuffer di default,
    // origine in basso a sinistra — stesso motivo di drawPauseOverlay() sopra.
    const worldFrame = { tex: blurTex, u0: 0, v0: 1, u1: 1, v1: 0, w: cw, h: ch, ox: 0, oy: 0 };

    let showPanel = true;
    if (oilCrash) {
      // La citta' e' gia' ben oltre il bordo (OIL_CRASH_INTRO_DUR sopra):
      // resta solo il cielo (nuvole ancora vive, `skyAlive` sopra) — stesso
      // "vetro smerigliato" del ramo vittoria sotto (blur leggero + velo
      // scuro), non il nero pieno di "chies": quello e' la fine della citta'
      // stessa, questo e' solo cio' che resta sopra di lei.
      r.draw(worldFrame, 0, 0, 1, 0xffffff, 1);
      r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 0.4);
    } else if (defeat) {
      const introDur = 1.2;
      const k = Math.min(1, outcome.t / introDur);
      const ease = k * k;
      // Base OPACA nera prima di tutto: il crossfade deve rivelare nero, non
      // il frame precedente ancora nel framebuffer.
      r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 1);
      r.draw(worldFrame, 0, 0, 1, 0xffffff, 1 - ease);
      showPanel = k >= 1;
    } else {
      r.draw(worldFrame, 0, 0, 1, 0xffffff, 1);
      r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 0.4);
    }

    outcomeButtons = [];
    if (showPanel && defeat) {
      // [Bug corretto, richiesto dall'autore: "applichiamo lo stesso stile
      // Montserrat bianco su nero dei titoli di apertura del tutorial
      // (glitchCutsceneLine()/cutsceneTextWrap, sopra), niente piu' pannello
      // scuro col vecchio font bitmap 'gotham'"] Testo Montserrat vero
      // DIRETTAMENTE sul nero pieno — il fondo e' gia' nero qui (il
      // crossfade sopra e' finito, `showPanel` diventa vero solo a `k>=1`):
      // nessun pannello/box dietro, a differenza degli altri due stati
      // (pausa/vittoria, "vetro smerigliato" chiaro) — la sconfitta e' una
      // vera fine, deve leggersi come tale. **[I]** Niente pero' l'effetto
      // glitch ciano/blu delle due schermate del tutorial (troppo "vivace"
      // per un momento di sconfitta, non richiesto): resta il solo bianco
      // pieno. I bottoni sono rettangoli bordati (`drawOutlineRect()`
      // sopra, contorno bianco/interno trasparente) invece di un riempimento
      // — stesso principio "testo nudo su nero", il nero di fondo resta
      // visibile anche dentro il bottone.
      const title = "GAME OVER";
      const subtitle = outcome.reason === "chies"
        ? "The City center, the city's historic building, has been destroyed."
        : "The oil has run out: the rotors have stopped and the platform has crashed.";
      const rows = [
        { label: "Load last save", action: "load" },
        { label: "Load from file", action: "loadFile" },
        { label: "Restart level", action: "resetGame" },
        { label: "Back to menu", action: "title" },
      ];

      const contentW = Math.min(360, cw - 40);
      const subH = 76;
      const btnW = contentW - 60, btnH = 46, btnGap = 14;
      const titleH = 46, gap1 = 20, gap2 = 26;
      const btnsH = rows.length * btnH + (rows.length - 1) * btnGap;
      const contentH = titleH + gap1 + subH + gap2 + btnsH;
      const px = (cw - contentW) / 2;
      let ty = (ch - contentH) / 2;

      drawHtmlText(title, cw / 2, ty + titleH / 2, { size: 34, color: "#ffffff" });
      ty += titleH + gap1;
      drawHtmlText(subtitle, px + 30, ty, { size: 14, maxWidth: contentW - 60, wrap: true, align: "center", color: "#ffffff" });
      ty += subH + gap2;

      for (const row of rows) {
        const bx = px + (contentW - btnW) / 2;
        drawOutlineRect(bx, ty, btnW, btnH, 0xffffff, 0.85);
        drawHtmlText(row.label, bx + btnW / 2, ty + btnH / 2, { size: 17, maxWidth: btnW - 20, color: "#ffffff" });
        outcomeButtons.push({ x: bx, y: ty, w: btnW, h: btnH, action: row.action });
        ty += btnH + btnGap;
      }
    } else if (showPanel) {
      // [Bug corretto, richiesto dall'autore: "la schermata di congratulazioni
      // e' brutta, rifacciamola con lo stesso stile del menu di pausa (font,
      // roundrect bianco ecc), cambiamo anche il messaggio che e' molto
      // generico"] Vittoria: stesso "vetro smerigliato" (pausePanelFrame()/
      // PANEL_TINT/PANEL_ALPHA) e Montserrat vero (drawHtmlText()) del menu
      // di pausa/drawConfirmResetOverlay(), non piu' il pannello scuro col
      // font bitmap condiviso (fino a qui) con la sconfitta — la vittoria
      // non e' una fine, non deve sembrarne una. Messaggio riscritto: non
      // piu' il generico "You've completed the Skyscraper. The game
      // continues.", ma un riferimento concreto a COSA si e' costruito.
      // [Bug corretto, richiesto dall'autore: "specifichiamo anche che da
      // ora in poi i nemici non ci attaccheranno piu'"] Il messaggio ora
      // annuncia esplicitamente la tregua che stepThreatSpawner rispetta
      // davvero da qui in poi (vedi `victoryShown` piu' sotto, dove smette
      // di far nascere nuove minacce), non solo "il gioco continua" senza
      // dire come cambia. Testo giustificato (`align: "justify"`,
      // drawHtmlText() sopra) invece del solito "left" di ogni altro
      // messaggio con wrap: l'unico paragrafo di piu' di due righe fra i
      // pannelli HTML, un blocco di testo piu' ordinato da leggere con
      // entrambi i margini dritti.
      const title = "CONGRATULATIONS!";
      const subtitle = "The Skyscraper stands complete, the tallest building this " +
        "city has ever raised. From now on, enemies will no longer attack the " +
        "city — keep building, there's no limit from here.";
      const rows = [{ label: "Keep playing", action: "continue" }];

      const panelW = Math.min(360, cw - 40);
      const subH = 130;
      const panelH = 96 + subH + rows.length * 60 + 20;
      const px = (cw - panelW) / 2, py = (ch - panelH) / 2;
      r.draw(pausePanelFrame(panelW, panelH), px, py, 1, PANEL_TINT, PANEL_ALPHA);

      drawHtmlText(title, px + panelW / 2, py + 34, { size: 26 });
      drawHtmlText(subtitle, px + 30, py + 60, { size: 14, maxWidth: panelW - 60, wrap: true, align: "justify" });

      const btnW = panelW - 60, btnH = 46, btnGap = 14;
      let by = py + 96 + subH;
      for (const row of rows) {
        const bx = px + (panelW - btnW) / 2;
        r.draw(pauseButtonFrame(btnW, btnH), bx, by, 1, BUTTON_TINT, BUTTON_ALPHA);
        drawHtmlText(row.label, bx + btnW / 2, by + btnH / 2, { size: 17, maxWidth: btnW - 20 });
        outcomeButtons.push({ x: bx, y: by, w: btnW, h: btnH, action: row.action });
        by += btnH + btnGap;
      }
    }
    r.flush();
  }

  /** Moltiplica una tinta 0xRRGGBB per una tinta ambientale [r,g,b] in 0..1. */
  function mulTint(base, rgb) {
    const r = Math.round(((base >> 16) & 255) * rgb[0]);
    const g = Math.round(((base >> 8) & 255) * rgb[1]);
    const b = Math.round((base & 255) * rgb[2]);
    return (r << 16) | (g << 8) | b;
  }

  /** Test punto-in-rettangolo sul bounding box di un frame (sprite/w/h/ox/oy)
   * — l'hit test "leggero" usato per la maggior parte degli oggetti cliccabili. */
  function inFrameRect(wx, wy, x, y, f) {
    const x0 = x - f.ox, y0 = y - f.oy;
    return wx >= x0 && wx <= x0 + f.w && wy >= y0 && wy <= y0 + f.h;
  }

  /** Disegna `f` ruotato di `angleDeg` intorno al proprio ancoraggio (cx,cy) —
   * [C] freccia_tutorial/EndStep.gml: `image_angle` (STUDIO.md/tutorial.js),
   * l'unico sprite del motore che ruota per davvero (Renderer.draw() sotto
   * disegna sempre allineato agli assi). Quattro angoli del rettangolo non
   * ruotato (rispetto all'ancora `f.ox/f.oy`), ruotati uno per uno e passati a
   * drawQuad() — stesso principio del quad pieno del laser (STUDIO.md
   * "il fascio del laser"), qui su uno sprite invece che un colore piatto.
   *
   * [Bug corretto] `image_angle` di GameMaker e' SEMPRE antiorario "a
   * schermo" (0=destra, 90=su, 180=sinistra, 270=giu', qualunque sia
   * l'orientamento degli assi di gioco) — la stessa convenzione con cui il
   * decompilato sceglie 270 per la freccia che punta ai bottoni IN BASSO e
   * 90 per quella che punta alla barra risorse IN ALTO (freccia_tutorial/
   * EndStep.gml, letto sopra). La formula qui sotto era invece la rotazione
   * antioraria "matematica" standard (assi Y verso l'alto) applicata
   * cosi' com'e' a coordinate schermo con Y verso il BASSO — visivamente
   * ORARIA, l'opposto: a 270 la freccia puntava in su invece che in giu' (e
   * viceversa a 90), con la punta che finiva sovrapposta al bottone invece
   * di restarne fuori puntandolo da una certa distanza (segnalato
   * dall'autore, tutorial.js). Negare l'angolo prima di ruotare corregge la
   * direzione, senza toccare come main.js calcola gli angoli (gia' 270/90
   * nello stile del decompilato). */
  function drawRotated(frame, cx, cy, angleDeg, scale, tint, alpha) {
    const rad = (-angleDeg * Math.PI) / 180;
    const cos = Math.cos(rad), sin = Math.sin(rad);
    const corners = [
      { x: -frame.ox, y: -frame.oy }, { x: frame.w - frame.ox, y: -frame.oy },
      { x: frame.w - frame.ox, y: frame.h - frame.oy }, { x: -frame.ox, y: frame.h - frame.oy },
    ].map((p) => ({
      x: cx + (p.x * cos - p.y * sin) * scale,
      y: cy + (p.x * sin + p.y * cos) * scale,
    }));
    r.drawQuad(frame, corners[0], corners[1], corners[2], corners[3], tint, alpha);
  }

  // Cache del rettangolo arrotondato del balloon (game/src/gl.js,
  // makeRoundedRectTexture()): l'altezza cambia solo quando cambia il
  // numero di righe a capo (nuova fase) o la larghezza schermo (resize),
  // non ad ogni frame — rigenerare la texture solo quando (w,h) cambiano
  // davvero, distruggendo la precedente invece di accumularle in VRAM.
  let tutorialBoxTex = null, tutorialBoxTexKey = "";
  function tutorialBoxFrame(w, h) {
    const key = w + "x" + h;
    if (key !== tutorialBoxTexKey) {
      if (tutorialBoxTex) gl.deleteTexture(tutorialBoxTex);
      tutorialBoxTex = makeRoundedRectTexture(gl, Math.round(w), Math.round(h), 20);
      tutorialBoxTexKey = key;
    }
    return solidFrame(tutorialBoxTex, w, h);
  }

  /**
   * Stessa idea di cache di tutorialBoxFrame() sopra, generalizzata: un solo
   * slot di texture per un dato raggio, rigenerata solo quando (w,h)
   * cambiano davvero. Usata per il pannello e i bottoni del menu di pausa
   * (drawPauseOverlay()/drawSavingOptionsOverlay() piu' sopra): due raggi
   * diversi (pannello piu' arrotondato dei bottoni al suo interno), quindi
   * due cache separate — un solo slot condiviso fra le due forme le
   * farebbe invalidare a vicenda ad ogni draw, ricreando la texture ogni
   * frame invece di riusarla.
   */
  function makeRoundRectCache(radius) {
    let tex = null, key = "";
    return (w, h) => {
      const k = Math.round(w) + "x" + Math.round(h);
      if (k !== key) {
        if (tex) gl.deleteTexture(tex);
        tex = makeRoundedRectTexture(gl, Math.round(w), Math.round(h), radius);
        key = k;
      }
      return solidFrame(tex, w, h);
    };
  }
  const pausePanelFrame = makeRoundRectCache(20);
  const pauseButtonFrame = makeRoundRectCache(14);

  /** Come makeRoundRectCache() sopra, ma per un contorno invece di un
   * riempimento (makeRoundedRectStrokeTexture(), gl.js) — usata da
   * drawOutlineRect() sopra per i bottoni "testo nudo su nero" della
   * schermata di sconfitta: stesso raggio (14) di pauseButtonFrame(), stesso
   * motivo di cache per dimensione. `thickness` (2px, l'unico chiamante) e'
   * parte della chiave della forma quanto `radius`: entrambi fissi qui,
   * un'unica cache basta (a differenza di pausePanelFrame/pauseButtonFrame,
   * due raggi diversi sullo STESSO chiamante nello stesso frame). */
  function makeRoundRectStrokeCache(radius, thickness) {
    let tex = null, key = "";
    return (w, h) => {
      const k = Math.round(w) + "x" + Math.round(h);
      if (k !== key) {
        if (tex) gl.deleteTexture(tex);
        tex = makeRoundedRectStrokeTexture(gl, Math.round(w), Math.round(h), radius, thickness);
        key = k;
      }
      return solidFrame(tex, w, h);
    };
  }
  const outlineButtonFrame = makeRoundRectStrokeCache(14, 2);

  /** Test punto-in-rombo, centrato sul bounding box di un frame: i placeholder
   * sono disegnati come sprite romboidali ("phold", il rombo viola —
   * Mouse_MouseEnter.gml originale), non rettangolari — un tocco/hover nei
   * quattro angoli vuoti del bounding box (fuori dal rombo vero) non deve
   * colpirli. Il decompilato usa la maschera di collisione precisa dello
   * sprite (`mask_sprite`), non il suo bbox: qui approssimata con un rombo
   * invece di un rettangolo pieno — molto piu' fedele alla sagoma vera per un
   * costo quasi identico (un confronto in piu' rispetto all'AABB). */
  function inFrameDiamond(wx, wy, x, y, f) {
    const x0 = x - f.ox, y0 = y - f.oy;
    const cx = x0 + f.w / 2, cy = y0 + f.h / 2;
    const hw = f.w / 2, hh = f.h / 2;
    if (hw <= 0 || hh <= 0) return false;
    return Math.abs(wx - cx) / hw + Math.abs(wy - cy) / hh <= 1;
  }

  // ---------------------------------------------------------------- input
  // [C] src/objects/placeholder/Mouse_LeftPressed.gml (rami selec==6/70):
  // `scroller2.goer = 0` ferma lo scorrimento della camera per tutta la durata
  // del gesto di piazzamento a trascinamento — qui basta ignorare `onDrag`
  // finche' `armedPlacement` e' vivo, invece di introdurre un vero stato
  // "scrolling disabilitato" nella camera.
  input.onDrag = (dx, dy) => { if (paused || armedPlacement) return; userMoved = true; cam.panByScreen(dx, dy); };
  // Piazzamento a trascinamento (palazzo/museo, armPlacement()/resolvePlacement()
  // sopra): arma alla PRESSIONE (non al tocco — `onTap` scatta solo al
  // rilascio, e qui l'origine e il lotto diagonale distano ~100px, ben oltre
  // la soglia di tap: `onTap` non vedrebbe mai questo gesto come tale). Un
  // tocco che comincia sopra la UI (bottoni del selettore) non deve armare
  // niente sotto di essa — stesso spirito di `uiHitTest` per il pan.
  input.onPointerDown = (sx, sy) => {
    if (paused || armedPlacement) return;
    for (const btn of uiButtons) {
      if (sx >= btn.x && sx <= btn.x + btn.w && sy >= btn.y && sy <= btn.y + btn.h) return;
    }
    const def = selectedType ? BUILDING_TYPES[selectedType] : null;
    if (!def?.diagonalPlacement) return;
    const w = cam.screenToWorld(sx, sy);
    const ph = placeholders.find((p) => !p.consumed && inFrameDiamond(w.x, w.y, p.x, p.y, p._f));
    if (!ph) return;
    const err = armPlacement(ph, selectedType);
    message = err ?? "drag to a free adjacent lot";
    messageT = 3;
  };
  input.onPointerUp = (sx, sy) => { if (!paused) resolvePlacement(sx, sy); };
  // Il fattore si applica a `targetZoom`, non a `zoom` (che insegue con un
  // filo di ritardo, vedi Camera.update()): cosi' una rotellata mentre lo
  // zoom sta ancora animando accumula sul bersaglio invece di "strappare"
  // indietro dal valore corrente, ancora a meta' strada. Stesso handler per
  // mobile (pinch) e desktop (rotella, `Input._wheel` genera lo stesso
  // `onZoom`, game/src/input.js) — richiesto dall'autore: su desktop la
  // rotella deve zoomare, non restare senza effetto com'era prima. `cam.
  // maxZoom` (resize() sotto) tiene comunque lo zoom-out al piu' al valore
  // di default (pixel-perfect su desktop, "si vede tutta la mappa" su
  // mobile) — `setZoom()`/`update()` (camera.js) clampano gia' da soli
  // dentro [minZoom, maxZoom], nessun controllo in piu' serve qui.
  input.onZoom = (f, ax, ay) => { if (paused) return; userMoved = true; cam.setZoom(cam.targetZoom * f, ax, ay); };
  // Selettore edificio scorrevole: su schermi stretti in portrait la riga di
  // bottoni (fino a 13 nel menu "edifici", vedi OTHER_BUILDINGS piu' sotto) e'
  // piu' larga dello schermo — senza scroll, quelli oltre il bordo destro non
  // sono ne' visibili ne' toccabili (segnalato dall'autore). `uiRowBounds` e'
  // la sagoma della riga corrente (ricalcolata ad ogni frame dal disegno,
  // piu' sotto), usata da `input.uiHitTest` per capire se un gesto e' iniziato
  // sopra la UI invece che sulla mappa: solo allora scorre `uiScrollX` invece
  // di far partire un pan di camera. Solo su mobile: su desktop la riga sta
  // gia' intera nella finestra (STUDIO.md "zero zoom"), niente da scorrere.
  let uiScrollX = 0;
  let uiRowBounds = null;
  if (isMobile) {
    input.uiHitTest = (sx, sy) => !paused && !!uiRowBounds
      && sx >= uiRowBounds.x0 && sx <= uiRowBounds.x1
      && sy >= uiRowBounds.y0 && sy <= uiRowBounds.y1;
    input.onUIDrag = (dx) => { if (!paused) uiScrollX -= dx; };
  }
  let picked = null;
  let message = "";
  let messageT = 0;
  // Shortcut sandbox (input.onTap, sotto): tap consecutivi su chies,
  // azzerati se il gap fra un tap e il successivo supera CHIES_TAP_WINDOW_MS.
  let chiesTapCount = 0;
  let chiesTapLastAt = 0;
  const CHIES_TAP_TARGET = 20;
  const CHIES_TAP_WINDOW_MS = 1200;
  /**
   * [Nuova funzionalita', richiesta dall'autore: "uno shortcut per la
   * modalita' sandbox, tipo tap su chies 20 volte di fila"] Nessun
   * equivalente nel decompilato — un easter egg nostro, non ricostruito da
   * nessun oggetto originale. Chiamata da OGNI tap che tocca chies, sia che
   * apra il pannello informativo (buildingInfoPanel, input.onTap sotto) sia
   * che lo trovi gia' aperto e lo chiuda — un tap su due andrebbe perso
   * contando solo nel ramo "picked.obj === 'building'", visto che il tap
   * SUCCESSIVO su un pannello gia' aperto lo chiude in un ramo separato
   * senza mai rifare il picking. "Di fila" e' un limite di TEMPO fra un tap
   * e il successivo, non di sequenza sugli altri bottoni: una scelta di
   * semplicita', non un requisito esplicito dell'autore. Ritorna `true` se
   * questo tap ha appena fatto scattare la soglia (il chiamante allora non
   * deve fare nient'altro con questo tocco, solo azzerare eventuali pannelli
   * aperti).
   */
  function registerChiesTap() {
    const nowMs = performance.now();
    chiesTapCount = (nowMs - chiesTapLastAt <= CHIES_TAP_WINDOW_MS) ? chiesTapCount + 1 : 1;
    chiesTapLastAt = nowMs;
    if (chiesTapCount < CHIES_TAP_TARGET) return false;
    chiesTapCount = 0;
    sandbox.on = !sandbox.on;
    message = sandbox.on
      ? "sandbox mode ON: infinite resources, everything unlocked"
      : "sandbox mode OFF";
    messageT = 4;
    return true;
  }
  // Icona "salvataggio in corso" (src/objects/savvvvvco, sprite "savicona",
  // tools/23_atlas.py — [C] r12/Alarm_10.gml, l'autosalvataggio ogni 30s
  // dell'originale, e reversi/Mouse_LeftPressed.gml, il salvataggio
  // all'uscita: entrambi creano questo stesso oggetto subito dopo
  // `action_save_game`). Richiesta dall'autore per il salvataggio manuale E
  // automatico di questo motore: "l'icona del dischetto con una sequenza
  // fade in fade out di un paio di cicli veloci" — esattamente cosa fa gia'
  // da sola la sprite originale (30 frame, un fade in/out completo bakeato
  // nell'alpha di ognuno, vedi il commento su "savicona" in 23_atlas.py) per
  // i 60 tick (1s) di vita di `savvvvvco` nel decompilato: due cicli interi
  // a 60fps. `null` = non in mostra (il caso comune); altrimenti secondi
  // trascorsi dall'ultimo salvataggio riuscito, avanzati in frame() sotto
  // finche' non supera SAVE_ICON_DURATION.
  let saveIconT = null;
  const SAVE_ICON_DURATION = 1;   // secondi — [C] savvvvvco/Create.gml: action_set_alarm(60, 0) a 60fps
  /** Chiamata da doSave()/doSaveToFile()/stepAutosave() dopo un salvataggio
   * riuscito (mai su un blocco per situazione critica o un tentativo
   * annullato) — riparte da zero anche se una sequenza precedente e' ancora
   * a meta', cosi' due salvataggi ravvicinati non lasciano l'icona a meta'
   * dissolvenza invece di un nuovo ciclo pieno. */
  function showSaveIcon() { saveIconT = 0; }
  // Pausa (bottone in basso a destra + tasto P, vedi drawPauseOverlay() e il
  // resto dei riferimenti a `paused` piu' sotto): congela l'intero blocco di
  // simulazione (frame(), sopra) e mostra il mondo — gia' disegnato,
  // semplicemente non piu' aggiornato — sfumato sotto un menu con
  // "Riprendi"/"Salva"/"Carica". Non esiste nel decompilato (nessun
  // `playbuttoner`/pausa vera nell'originale, STUDIO.md "playbuttoner
  // investigato" — quello era un acceleratore del grattacielo, non una
  // pausa globale): puramente nostro, richiesto dall'autore.
  let paused = false;
  // [Bug corretto, segnalato dall'autore: "il gioco lagga da morire su
  // alcuni device (es. Galaxy S23) — possiamo ottimizzare lato GPU?"]
  // Ricatturato: `pauseBlur.blurScreen()` (game/src/gl.js) e' un
  // `gl.copyTexImage2D` a RISOLUZIONE PIENA del framebuffer + quattro
  // passate di blur separabile — un post-processo pesante, notoriamente
  // costoso proprio sulle GPU mobile (tile-based: un readback pieno forza
  // la risoluzione dell'intero tile buffer). drawPauseOverlay()/
  // drawSavingOptionsOverlay()/drawConfirmResetOverlay() (sotto) lo
  // richiamavano ad OGNI frame per tutta la durata della pausa — ma mentre
  // `paused` e' vero la simulazione e' congelata (skyAlive/`frozen` piu'
  // sotto: il mondo disegnato sotto lo sfumato e' l'IDENTICO frame,
  // pixel per pixel, finche' non si esce dalla pausa o non si cambia
  // sotto-pannello): ricalcolare lo stesso sfocato 60 volte al secondo era
  // puro spreco, il costo GPU piu' pesante di ogni frame di pausa per
  // nessun beneficio visivo. `pauseBlurTex` cachea il risultato — vedi
  // getCachedPauseBlur() sotto — invalidato solo quando si ENTRA in pausa
  // (mai fra un sotto-pannello e l'altro, che condividono lo stesso mondo
  // congelato) o se le dimensioni del canvas cambiano nel frattempo
  // (rotazione schermo mentre in pausa).
  let pauseBlurTex = null, pauseBlurW = 0, pauseBlurH = 0, wasPaused = false;
  // Gesto di piazzamento a trascinamento in corso (palazzo/museo, buildings.js
  // `def.diagonalPlacement`) — vedi armPlacement()/resolvePlacement() sotto.
  // null quando nessun gesto e' armato (il caso comune, per ogni altro tipo).
  let armedPlacement = null;   // { type, origin, targets: [{placeholder, axis}] }
  let uiButtons = [];   // { x, y, w, h, type }, ricalcolati ad ogni frame dal disegno del selettore
  // Bottone di pausa (sempre presente, in basso a destra) + bottoni del
  // relativo menu (solo quando `paused`): stesso schema di `uiButtons` sopra
  // (ricalcolati ogni frame dal disegno, letti da input.onTap sotto), ma
  // tenuti separati perche' il bottone di pausa deve restare toccabile ANCHE
  // mentre il resto della UI e' bloccato dal menu (vedi onTap).
  let pauseBtnRect = null;   // { x, y, w, h }
  let pauseMenuButtons = [];   // { x, y, w, h, action }
  // Sotto-pannello del menu di pausa (null = quello principale, "saving" =
  // le opzioni di autosalvataggio sotto) — riusa lo stesso `pauseMenuButtons`
  // sopra: un solo pannello alla volta e' mai disegnato, quindi un solo
  // array di hitbox basta, letto in modo diverso da onTap a seconda di
  // questo flag invece di tenerne uno per pannello.
  let pauseSubmenu = null;

  // [Nuova funzionalita', richiesta dall'autore: "una funzione di autosave,
  // attivabile dal menu di pausa (saving options), che regola l'intervallo
  // (n minuti) e ha degli yes/no se salvare durante attacchi o con oil
  // basso, di norma disattivati"] Preferenza dell'utente, non stato di
  // questa partita: caricata da localStorage ad ogni mount (save.js,
  // GLOBALE — non per-scena) e riscritta li' stessa ad ogni tocco su una
  // delle voci del pannello (drawSavingOptionsOverlay()/onTap sotto), cosi'
  // resta la stessa scegliendo Match/Match Facile/Tutorial in sessioni
  // diverse. `autosaveT`: secondi reali dall'ultimo salvataggio automatico
  // (o dall'avvio), avanzato incondizionatamente in frame() sotto — tempo
  // di parete, non simulato: deve continuare a scorrere anche a partita in
  // pausa/sconfitta, altrimenti "ogni N minuti" varrebbe solo mentre si
  // gioca attivamente.
  let autosave = loadAutosaveSettings();
  let autosaveT = 0;
  const AUTOSAVE_INTERVALS = [1, 2, 5, 10, 15, 30];   // minuti, ciclati dal bottone "Interval"
  /** Prova un autosalvataggio se l'intervallo e' scaduto — chiamata una
   * volta per frame da frame() sotto. Stesso `criticalSaveReason()` del
   * salvataggio manuale (doSave() sopra), ma qui il blocco e' condizionale:
   * `duringAttacks`/`duringLowOil` (di norma entrambi `false`, coerenti col
   * comportamento gia' esistente) possono bypassare SOLO la propria
   * categoria (`reason.kind`), non l'altra. Se resta bloccato l'intervallo
   * NON si riazzera: ritenta ad ogni frame successivo (un confronto in piu'
   * a frame, costo trascurabile) cosi' salva appena la situazione torna
   * sicura invece di aspettare un altro giro intero — a differenza del
   * quicksave manuale, qui nessuno sta guardando un messaggio d'errore da
   * dover ripetere. */
  function stepAutosave(dt) {
    if (!autosave.enabled) { autosaveT = 0; return; }
    autosaveT += dt;
    if (autosaveT < autosave.intervalMin * 60) return;
    const reason = criticalSaveReason();
    if (reason) {
      const bypass = reason.kind === "oil" ? autosave.duringLowOil : autosave.duringAttacks;
      if (!bypass) return;
    }
    save(scene.name, r12, buildings, ruins, blockedSlots, platformState);
    autosaveT = 0;
    showSaveIcon();
  }

  /**
   * Fine partita — nessun equivalente vero nel decompilato (STUDIO.md,
   * "playbuttoner": investigato a fondo e non era una pausa/game over,
   * §6 "condizioni di vittoria e sconfitta" resta `[?]` fino in fondo al
   * diario; l'unica traccia vera, `blacker1` creato da `air_tut2/Alarm_1.gml`
   * nella cutscene del tutorial, non e' MAI implementata nel decompilato
   * stesso in nessun'altra room — la cutscene qui la bypassa apposta,
   * STUDIO.md tutorial.js). Richiesto dall'autore, tre condizioni:
   *  - sconfitta, `chies` (STUDIO.md §9: l'edificio unico e preesistente)
   *    distrutta — in QUALUNQUE room, e' sempre l'unico esemplare;
   *  - sconfitta, l'olio a zero SOLO su `match`/`tutorial` (le uniche due
   *    room con la piattaforma volante — game/src/platform.js,
   *    applyMatchPlatform(): `match_easy` ha la citta' gia' a terra, un
   *    "sotto" in cui cadere non esiste);
   *  - vittoria, il `grattacielo` completato (l'ultima delle tre "stelle",
   *    STAR_BUILDINGS sopra) — a differenza della sconfitta NON blocca la
   *    partita, resta un traguardo.
   * null | { kind: "defeat", reason: "chies"|"oil", t, motorFreezeT? }
   * | { kind: "victory", t }. `t`: secondi dal trigger, avanzato fuori dal
   * blocco `if (!frozen)` sotto (l'introduzione della sconfitta deve girare
   * anche mentre il resto della simulazione e' fermo). `victoryShown`
   * impedisce che la stessa vittoria ricompaia ogni frame dopo il primo tap
   * di "Continua" — al massimo un grattacielo esiste per partita (unlocked()
   * sopra), quindi basta un flag, non un id da tracciare.
   */
  let outcome = null;
  let victoryShown = false;
  let outcomeButtons = [];   // { x, y, w, h, action }, solo quando il pannello e' visibile
  // Crollo vero della piattaforma (`outcome.reason === "oil"`, sotto) — [C]
  // r12/Step.gml: appena `oil` tocca 0, un'enorme lista di `with (X) {
  // action_kill_object(); }` (finestre accese/luci di ogni edificio, auto
  // `hondaN`, pedoni `soldN`) sparisce all'istante, poi `with (notte_target)
  // { action_set_gravity(270, 0.04); }` (quasi tutta la citta') e `with
  // (casca_target) { action_set_gravity(270, 0.04); }` (la piattaforma
  // stessa, `r120`/`r22`/`r220`/`mudr21`, game/src/platform.js) iniziano a
  // cadere per davvero — un'accelerazione (270 = verso il basso, GameMaker
  // y cresce in giu'), non una velocita' fissa: parte piano e accelera.
  // Nessuna delle due famiglie include mai nuvole/uccelli/mongolfiere/
  // minacce (STUDIO.md): il cielo non cade mai insieme alla citta'.
  // Sostituisce la vecchia resa "screenshot che scivola giu'" (un solo
  // `draw()` traslato, mai un equivalente vero) — richiesto dall'autore:
  // "uno screenshot che trasla e' un po' triste". `crashVSpeed`/`crashFallY`
  // sono un SOLO scalare per frame (non un `vspeed` per entita' come
  // nell'originale): applicato in blocco a ogni voce non-`_sky` del render
  // (vedi il commento sopra `frameList`, piu' sotto) invece di muovere
  // davvero `buildings`/`staticWorld` — piu' economico, stesso risultato
  // visivo dato che tutto cio' che cade lo fa in blocco, alla stessa
  // velocita'. Resettati a 0 solo quando si esce dalla sconfitta senza
  // rimontare la room (doLoad()/doLoadFromFile() dal pannello di game over,
  // sotto) — un `navigate()` vero (Restart/Back to menu) rimonta comunque da
  // zero, quindi non ha bisogno di un reset esplicito.
  const CRASH_GRAVITY = 0.04;   // [C] r12/Step.gml: action_set_gravity(270, 0.04) — px/tick^2
  let crashVSpeed = 0;
  let crashFallY = 0;
  // [I] Quanto aspettare (drawOutcomeOverlay() sotto) prima di mostrare il
  // pannello GAME OVER: nessun timer fisso nel decompilato (li' non esiste
  // proprio questa schermata, STUDIO.md — "puramente nostra"), quindi
  // ricavato dalla fisica sopra invece di un numero indovinato: con
  // CRASH_GRAVITY=0.04, a 6s (360 tick) l'offset e' gia' ~0.02*360^2=2592px
  // (v(t)=g*t, y(t)=g*t^2/2 in unita' di tick) — piu' di qualunque altezza
  // di viewport reale anche allo zoom piu' lontano, quindi la citta' e' di
  // sicuro ben oltre il bordo prima che il pannello compaia.
  const OIL_CRASH_INTRO_DUR = 6;

  // [C] placeholder/Mouse_LeftReleased.gml: `r12.selec` e' il vero selettore
  // di modalita' piazzamento nell'originale (1 = casa, 2 = industria, ...).
  const SELEC_BY_TYPE = { casa: 1, industria: 2 };

  // Il pannello originale non e' un'unica barra: sono righe ALTERNATE, mai
  // tutte visibili insieme. [C] `pu1.menoo` decide quale, letto riga per
  // riga da ogni bottone figlio nel proprio Step.gml (`with (pu1) { if
  // (menoo==N) break }` poi `action_move_to(...)` sulla posizione vera, o
  // fuori schermo altrimenti):
  //   - menoo 0 "casa": handbutton, buildbutton (la gru: apre menoo 1) —
  //     quello che si vede all'avvio.
  //   - menoo 1 "edifici": pu1..pu7 e affini (i piazzabili) + backobutton in
  //     fondo per tornare a menoo 0. E' la riga che si apre toccando la gru.
  // Una versione precedente mostrava tutti i bottoni sempre, su righe
  // fisse — comodo ma non e' cosi' che il menu era organizzato davvero
  // (segnalato dall'autore). Qui replichiamo la stessa struttura a righe.
  // [Rimosso su richiesta dell'autore] Il terzo pannello del decompilato,
  // menoo 2 "vista" (eyebutton apriva eyebutton1/2/3 + zoom_plus/
  // zoom_minus + backobutton): i tre bottoni occhio erano segnaposto senza
  // funzione (mai ricostruiti, nessun testo li spiegava se non il tutorial,
  // vedi tutorial.js/TUTORIAL_TEXTS) e zoom+/- duplicavano pinch/rotella
  // (input.onZoom, game/src/input.js — l'unico controllo zoom rimasto,
  // gia' funzionante da solo su mobile/desktop). Tolti bottone e riga
  // insieme: nessuna funzione persa, un solo modo di zoomare invece di due.
  let menoo = 0;

  // I piazzabili del menu (menoo 1) che casa/industria non coprono da sole:
  // letti da src/objects/pu3|pu4prov|pu5prov|pu6|pu7|pudj|pusolare|pugatling|
  // puvillone|pumediat (sprite normale/selezionato, e il `selec` con cui
  // ciascuno riconosce di essere quello scelto) incrociati con
  // src/objects/placeholder/Mouse_LeftReleased.gml per i costi reali, dove
  // quel file li dichiara esplicitamente (`cost: null` altrove — non un
  // valore a caso, proprio "non letto"). Alcuni (parco/missile/solare/club/
  // villa/gatling/laser/eolico, via BUILDING_TYPES in buildings.js) sono
  // ormai piazzabili per davvero;
  // gli altri restano un segnaposto statico — selezionabili ed evidenziati
  // come qualunque tipo vero, ma toccare un placeholder con uno di questi
  // ancora senza `BUILDING_TYPES[type]` mostra un messaggio invece di
  // costruire (vedi `def` sotto, in `input.onTap`). Questo array resta
  // comunque la fonte unica di sprite/selec/costo per il bottone, vero o
  // segnaposto che sia — non toglierne una riga quando il tipo diventa
  // implementato. Ordine allineato a `BUILD_GRID_TYPES` (la griglia mobile,
  // sotto — la stessa richiesta dall'autore), appiattito riga per riga:
  // parco/missile (riga 1, dopo casa/industria che vivono a parte) poi
  // palazzo/solare/club/gatling (riga 2), villa/eolico/museo/laser (riga 3)
  // — cosi' la riga scorrevole desktop mostra gli edifici nello stesso
  // ordine della griglia mobile invece di uno arbitrario (STUDIO.md §9
  // annotava "non quello esatto": ora lo e', su richiesta dell'autore).
  // `chiesUnlock`: **[C]** pu6|pudj|pugatling|pusolare/Step.gml — palazzo/
  // club/gatling/solare restano bloccati finche' `chies.level<2` (il popup
  // "livello 2 sbloccato" di level2palazz/level2club/level2gatling/level2sol
  // sopra); puvillone|pumediat/Step.gml — villa/museo bloccati sotto
  // `chies.level<3` (leve3tounlovilla/level3tounlomedia). L'originale gate
  // anche eolico/laser a `chies.level>=3` (pu4prov/pu5prov/Step.gml,
  // leve3tounlo4/5) ma SOLO su `match`, mai su `match_easy` (un secondo
  // controllo su flag 736 che in questo motore — match_easy, STUDIO.md §9 —
  // non scatterebbe mai): qui il gate di livello resta, quello di room no,
  // coerente con come sono gia' stati resi "veri" (STUDIO.md, sopra) senza
  // quel secondo blocco. `buildingLocked()` sotto legge questo campo;
  // `parco`/`missile`/`ruspa` non lo dichiarano — mai stati bloccati
  // nel decompilato (pu3/pu7/Step.gml, nessun `unlosei`/`chies` gate).
  const OTHER_BUILDINGS = [
    { type: "parco", selec: 7, spr: "p7", tint: 0x139f13, label: "Park", cost: 500 },
    { type: "missile", selec: 3, spr: "p3", tint: 0x892020, label: "Missile Launcher", cost: 5000 },
    // "Grattacielo" era il nome (mai verificato) di una versione precedente
    // di questa riga: **[C]** src/objects/level2palazz (il popup "livello 2
    // sbloccato" agganciato a `pu6/Mouse_MouseEnter.gml`, stesso schema di
    // level2club/level2gatling/level2sol per club/gatling/solare) chiama
    // l'edificio "palazz[o]" — vedi il commento su BUILDING_TYPES.palazzo.
    // Il nome "Grattacielo" e' finito altrove: e' l'etichetta scelta ora per
    // `BUILDING_TYPES.grattacielo` (STAR_BUILDINGS sotto, la terza stella),
    // un edificio completamente diverso da questo — nessuna relazione se non
    // l'omonimia mai risolta a suo tempo.
    { type: "palazzo", selec: 6, spr: "p6", tint: 0x114f18, label: "Building", cost: 6000, chiesUnlock: 2 },   // ora vero, BUILDING_TYPES.palazzo — piazzamento a trascinamento, vedi armPlacement()
    { type: "solare", selec: 61, spr: "psolare", tint: 0xb57008, label: "Solar Panels", cost: 1000, chiesUnlock: 2 },
    { type: "club", selec: 60, spr: "pdj", tint: 0xc24398, label: "Club", cost: 3500, chiesUnlock: 2 },   // ora vero, BUILDING_TYPES.club
    { type: "gatling", selec: 62, spr: "pgatling", tint: 0x8b0808, label: "Gatling Gun", cost: 10000, chiesUnlock: 2 },
    { type: "villa", selec: 63, spr: "pvilla", tint: 0x1e666b, label: "Villa", cost: 7500, chiesUnlock: 3 },
    { type: "eolico", selec: 4, spr: "p4", tint: 0x8b6c17, label: "Wind Turbine", cost: 50000, chiesUnlock: 3 },   // ora vero, BUILDING_TYPES.eolico
    { type: "museo", selec: 70, spr: "pmuseo", tint: 0xa47f7f, label: "Museum", cost: 35000, chiesUnlock: 3 },   // ora vero, BUILDING_TYPES.museo — piazzamento a trascinamento, vedi armPlacement()
    { type: "laser", selec: 5, spr: "p5", tint: 0x5c0d64, label: "Laser", cost: 20000, chiesUnlock: 3 },
    // [C] STUDIO.md "cosa manca": lo strumento vero di demolizione/
    // riparazione (selec==11), mai ricostruito — la distruzione oggi e'
    // immediata (destroyBuilding()) invece di passare da questo strumento.
    { type: "ruspa", selec: 11, spr: "ru", tint: 0xe00000, label: "Bulldozer", cost: null },
  ];
  for (const b of OTHER_BUILDINGS) SELEC_BY_TYPE[b.type] = b.selec;
  const BUILDING_LABEL = Object.fromEntries(OTHER_BUILDINGS.map((b) => [b.type, b.label]));
  const CHIES_UNLOCK_BY_TYPE = Object.fromEntries(OTHER_BUILDINGS.filter((b) => b.chiesUnlock).map((b) => [b.type, b.chiesUnlock]));
  /** Lo sprite del cartellino "Level N to unlock" per un bottone edificio
   * ancora bloccato (`buildingLocked()`, sotto) — **[C]** `pu6|pudj|
   * pugatling|pusolare/Mouse_MouseEnter.gml` (chiesUnlock:2) creano
   * `level2club|gatling|palazz|sol`, tutti lo stesso sprite reale
   * "unlocklvl2"; `pu4prov|pu5prov|puvillone|pumediat/Mouse_MouseEnter.gml`
   * (chiesUnlock:3) creano `leve3tounlo4|5|villa`/`level3tounlomedia`,
   * tutti "unlocklvl3" — un solo banner generico per soglia, non uno per
   * edificio (verificato: ogni oggetto sopra referenzia lo stesso sprite,
   * mai uno dedicato). Stesso posto/occasione del cartellino prezzo vero
   * (`costTagSprite()`, buildings.js) quando il bottone e' gia' sbloccato —
   * vedi il commento su come i due si alternano piu' sotto (drawUiRow()/
   * drawBuildMenuOverlay()). `null` per `parco` (`pu7`, sotto un flag
   * diverso da `chies` — `unlocinque`, mai portato qui, STUDIO.md: nessun
   * gate nel nostro port) o qualunque tipo senza `chiesUnlock`.
   */
  function unlockTagSprite(type) {
    const need = CHIES_UNLOCK_BY_TYPE[type];
    return need === 2 ? "unlocklvl2" : need === 3 ? "unlocklvl3" : null;
  }
  /** [C] vedi il commento su `chiesUnlock` sopra: `true` finche' `chies`
   * (l'unica istanza, STUDIO.md §5.3) non ha raggiunto il livello richiesto —
   * `>=`, non `==2`/`==3` come il decompilato (`unlosei`/`unlos`/`unlocinque`
   * si "latchano" a 1 la prima volta che il livello combacia ESATTAMENTE e
   * restano tali, STUDIO.md sullo stesso schema gia' scelto per i bottoni
   * stella): equivalente per una partita che parte gia' dal livello giusto
   * (es. da un salvataggio), dove un confronto di sola uguaglianza non
   * scatterebbe mai — stessa scelta gia' fatta da `maxChiesLevel()`/
   * `upgradeUnlocked()` in buildings.js per `requiresChiesLevel`. */
  function buildingLocked(type) {
    if (sandbox.on) return false;   // [Nuova funzionalita', richiesta dall'autore: sandbox sblocca tutto, vedi CHIES_TAP_* sotto
    const need = CHIES_UNLOCK_BY_TYPE[type];
    if (!need) return false;
    return (buildings.find((b) => b.type === "chies")?.level ?? 0) < need;
  }
  // [C] STUDIO.md sopra: la stessa dissolvenza usata dal decompilato non
  // esiste (li' un bottone bloccato mostra semplicemente lo sprite normale,
  // MAI quello "selezionato", e basta) — qui invece l'edificio bloccato
  // resta visibile ma sbiadito, cosi' e' chiaro che esiste un edificio la'
  // e non solo che manca un bottone, richiesto dall'autore.
  const LOCKED_BUTTON_ALPHA = 0.35;

  // Edifici "stella" (STUDIO.md, "monumento"/"banca"): ricompense di
  // traguardo, MAI un bottone statico come il resto del menu — [C] `stella1`/
  // `stella2` (src/objects) non stanno nella room, ne' nel pannello: sono
  // create al volo da `pu1/Step.gml` solo al superamento di una soglia (mai
  // prima), ancorate a un offset fisso sopra `pu1` invece che dentro la riga
  // scorrevole. **[I]** Qui, per riuso diretto dell'infrastruttura di
  // `OTHER_BUILDINGS`/`uiButtons` gia' esistente, compaiono/scompaiono nella
  // STESSA riga scorrevole invece di fluttuare a parte — stesso risultato
  // osservabile (appaiono solo a soglia raggiunta), non lo stesso layout a
  // pixel. `unlocked()` legge `pu1/Step.gml` riga per riga (operatori 2=">",
  // 4=">=", gia' stabiliti nel resto del progetto): monum a `distrutti>49`
  // (aerei abbattuti, STUDIO.md/state.js), banca a `instance_count(monum)>0
  // && chies.level>1 && pop>=3000`. Restano nascosti una volta gia'
  // costruiti — [I]: nell'originale un flag "gia' assegnato" mai
  // identificato con certezza ottiene lo stesso risultato (il bottone non
  // ricompare per un secondo esemplare), qui basta controllare se esiste
  // gia' un edificio di quel tipo.
  const STAR_BUILDINGS = [
    {
      type: "monum", selec: 71, spr: "sta1", tint: 0x82824f, label: "Monument", cost: 20000,
      // `sandbox.on ||` (buildings.js, sopra): bypassa la soglia vera, non
      // il guard "gia' costruito" subito dopo — un secondo tap sul
      // monumento gia' in piedi non deve far ricomparire il bottone nemmeno
      // in sandbox, stessa ragione gia' scritta sopra per gli altri due.
      unlocked: () => (sandbox.on || (r12.distrutti ?? 0) > 49) && !buildings.some((b) => b.type === "monum"),
    },
    {
      type: "banca", selec: 72, spr: "sta2", tint: 0x82824f, label: "Bank", cost: 0,
      // [Bug corretto, segnalato dall'autore: "lo sblocco della banca
      // dovrebbe essere subordinato... alla creazione del monumento"]
      // **[C]** `pu1/Step.gml`: la create di `stella2` e' annidata dentro
      // `action_if_number(190, 0, 2)` — 190 e' l'indice oggetto di `monum`
      // (data/objects.json), l'operatore 2 e' ">": "instance_count(monum) >
      // 0". Una lettura precedente aveva letto solo le condizioni PIU'
      // interne (chies.level/pop) senza risalire al blocco che le contiene,
      // perdendo questo primo requisito — senza un monumento gia' in piedi
      // la banca non doveva mai comparire, indipendentemente da livello di
      // chies o popolazione.
      unlocked: () => {
        if (buildings.some((b) => b.type === "banca")) return false;
        if (sandbox.on) return true;
        const chies = buildings.find((b) => b.type === "chies");
        return buildings.some((b) => b.type === "monum")
          && !!chies && chies.level > 1 && r12.pop >= 3000;
      },
    },
    // Terza stella: `grattacielo` (buildings.js — corregge la conclusione
    // precedente che la scambiava per un secondo sblocco di eolico, vedi il
    // commento su BUILDING_TYPES.grattacielo). **[Bug corretto]** Una
    // lettura precedente di `banca1_light/Create.gml` fermava all'`instance_
    // create(stella3)` senza controllare cosa proteggeva quella riga,
    // liquidandolo come "due flag 'run once'" — **[C]** in realta'
    // `action_if_number(159, 0, 2)` + `action_if_number(161, 0, 2)`
    // (`data/objects.json`: 159=`r22`, 161=`r32`, entrambi con operatore 2
    // ">") sono "`instance_count(r22) > 0` E `instance_count(r32) > 0`" —
    // non guardie anti-duplicato (quelle userebbero l'operatore 0, "==0",
    // come per `stella1`/`stella2` sopra): la terza stella richiede DAVVERO
    // che entrambe le espansioni della piattaforma (game/src/platform.js,
    // `platformState.tier1`/`tier2` — solo su `match`, MAI presenti su
    // `match_easy`) siano gia' "expanded", oltre ad avere gia' una banca.
    // Coerente con l'endgame vero: il grattacielo (Burj Khalifa) e'
    // raggiungibile solo dopo aver esteso la piattaforma per intero, non
    // semplicemente "costruisci una banca" — e su `match_easy`, che non ha
    // mai una piattaforma da espandere, resta percio' irraggiungibile
    // (fedele, non un buco: `platformState` e' `null` li').
    {
      type: "grattacielo", selec: 82, spr: "sta3", tint: 0x82824f, label: "Skyscraper", cost: 200000,
      // `sandbox.on ||` bypassa anche il vincolo "solo su `match`" (sopra:
      // `platformState` e' `null` su `match_easy`) — coerente con "tutto
      // sbloccato", non piu' fedele all'originale a quel punto.
      unlocked: () => !buildings.some((b) => b.type === "grattacielo") && (sandbox.on || (buildings.some((b) => b.type === "banca")
        && platformState?.tier1.stage === "expanded" && platformState?.tier2.stage === "expanded")),
    },
  ];
  for (const b of STAR_BUILDINGS) { SELEC_BY_TYPE[b.type] = b.selec; BUILDING_LABEL[b.type] = b.label; }

  /** Sprite/tint del bottone di un tipo edificio, per tipo — usato dal
   * badge "edificio selezionato" sulla barra mobile (drawUiRow(), sotto:
   * `selectedType` non e' piu' visibile da nessuna parte una volta chiuso
   * l'overlay a griglia, STUDIO.md/tools qui sotto) e da
   * drawBuildMenuOverlay() per evidenziare il bottone selezionato dentro
   * l'overlay stesso. `casa`/`industria` non vivono in OTHER_BUILDINGS
   * (STUDIO.md sopra), cercati qui a mano prima di ricadere sulle liste vere.
   */
  function findBuildingIcon(type) {
    if (type === "casa") return { spr: "p1", tint: 0x114f1f };
    if (type === "industria") return { spr: "p2", tint: 0x603415 };
    return OTHER_BUILDINGS.find((b) => b.type === type) ?? STAR_BUILDINGS.find((b) => b.type === type) ?? null;
  }

  /** Raccoglie una moneta e fa partire la sua "bolla" (coinPops sopra) —
   * unico punto d'ingresso condiviso da input.onTap (tap/click, sotto) e
   * dalla raccolta automatica al passaggio del mouse (stepCoinHover() nel
   * loop principale), cosi' entrambi i gesti danno la stessa risposta
   * visiva. */
  function collectCoinAt(item) {
    // `item.{x,y}` e' l'ancora dell'edificio (il piede del pin "soldico"/
    // "soldfade", STUDIO.md coins.js — sprite a forma di segnaposto con
    // l'origine in fondo, non al centro), ma il simbolo dei soldi vero e
    // proprio sta nella testa TONDA del pin, in alto. Segnalato dall'autore
    // ("la bolla dovrebbe essere centrata sul simbolo, quindi più in alto"):
    // la testa e' un cerchio di diametro pari alla larghezza dello sprite
    // (`f.w`), disegnato subito sotto al bordo superiore — il suo centro sta
    // quindi a meta' larghezza sopra l'ancora, non sull'ancora stessa.
    const f = frameFor(item.spr);
    const bubbleY = f ? item.y - (f.oy - f.w / 2) : item.y;
    coinPops.push({ x: item.x, y: bubbleY, t: 0 });
    collectCoin(coins, item, r12);
  }

  /** Raccoglie una cassa di risorse lasciata da una mongolfiera (balloons.js)
   * e fa partire la stessa "bolla" blu della raccolta monete (coinPops sopra,
   * collectCoinAt()) — segnalato dall'autore: un effetto visivo simile a
   * quello dei soldi, non uno tutto suo. A differenza del pin delle monete la
   * cassa e' un semplice box (nessuna "testa" separata dal resto dello
   * sprite), quindi la bolla centra l'intero frame invece del solo cerchio
   * superiore. Punto d'ingresso condiviso da input.onTap (sotto) e dalla
   * raccolta al passaggio del mouse (hover, nel loop principale) — vedi il
   * commento li' per il perche' in piu' del solo tap. */
  function collectLootAt(item) {
    const f = frameFor(item.spr);
    const bubbleY = f ? item.y - f.oy + f.h / 2 : item.y;
    coinPops.push({ x: item.x, y: bubbleY, t: 0 });
    collectLoot(loot, item, r12);
  }

  input.onTap = (sx, sy) => {
    // `outcome` (sopra) intercetta PRIMA di tutto, bottone di pausa incluso —
    // in sconfitta la pausa non ha senso (la partita e' gia' finita), in
    // vittoria non deve restare un modo per aprire il menu di pausa SOPRA al
    // pannello di vittoria stesso.
    if (outcome) {
      if (outcome.kind === "victory") {
        // Qualunque tocco chiude — nessun blocco duro come la sconfitta
        // sotto: e' un traguardo, non una fine (richiesto dall'autore, "puo'
        // continuare a giocare"), quindi anche il bottone "Continua"
        // (outcomeButtons, drawOutcomeOverlay()) e' solo un'affordance, non
        // l'unico modo di chiuderlo.
        outcome = null;
        return;
      }
      // Sconfitta: `outcomeButtons` resta vuoto finche' l'introduzione
      // (buio/caduta, drawOutcomeOverlay()) non e' finita — nessun tocco fa
      // niente prima di allora, il pannello va guardato fino in fondo.
      // [Nuova funzionalita', richiesta dall'autore: "dopo il game over
      // avrebbe senso dare due opzioni [in piu']: carica da file o
      // ricomincia da capo"] Da "Load game"/"Back to menu" a quattro
      // percorsi distinti — "Load last save" (invariato, l'autosave in
      // localStorage), "Load from file" (doLoadFromFile(), come dal menu di
      // pausa — async, chiude la schermata SOLO a caricamento riuscito),
      // "Restart level" (doResetGame(), lo stesso "Reset game" del menu di
      // pausa — nessuna conferma qui: le altre tre opzioni sono gia' li'
      // sotto per chi ha toccato per sbaglio, a differenza del menu di
      // pausa dove "Reset game" e' l'unica via e quindi merita un passo in
      // piu'), "Back to menu" (invariato).
      const hit = outcomeButtons.find((b) => sx >= b.x && sx <= b.x + b.w && sy >= b.y && sy <= b.y + b.h);
      if (hit?.action === "load") {
        const ok = doLoad();
        if (ok) { picked = null; outcome = null; crashVSpeed = 0; crashFallY = 0; }
        message = ok ? "game loaded" : "no save found";
        messageT = 3;
      } else if (hit?.action === "loadFile") {
        doLoadFromFile().then((ok) => {
          if (ok) { outcome = null; crashVSpeed = 0; crashFallY = 0; }
        });
      } else if (hit?.action === "resetGame") {
        doResetGame();
      } else if (hit?.action === "title") {
        navigate("menu");
      }
      return;
    }
    // Il bottone di pausa intercetta PRIMA di ogni altra cosa, modale
    // (bankPanelOpen sotto) incluso — deve restare toccabile sempre, in
    // entrambi gli stati (avvia/toglie la pausa), altrimenti una volta
    // pausato non ci sarebbe piu' modo di uscirne se un altro modale fosse
    // aperto sopra di lui.
    if (pauseBtnRect && sx >= pauseBtnRect.x && sx <= pauseBtnRect.x + pauseBtnRect.w
      && sy >= pauseBtnRect.y && sy <= pauseBtnRect.y + pauseBtnRect.h) {
      paused = !paused;
      pauseSubmenu = null;   // riapre sempre sul pannello principale, mai su "Saving options"
      return;
    }
    // Mentre e' in pausa il resto del mondo (mondo, UI, altri modali) resta
    // bloccato — solo i bottoni del menu di pausa rispondono. Stesso schema
    // "modale" di bankPanelOpen sotto, controllato PRIMA di lui apposta:
    // se il pannello prestiti fosse gia' aperto quando si preme pausa,
    // restare bloccati su quello invece che sul menu di pausa sarebbe
    // confuso (e comunque quel pannello non e' piu' disegnato sopra il blur).
    if (paused) {
      const hit = pauseMenuButtons.find((b) => sx >= b.x && sx <= b.x + b.w && sy >= b.y && sy <= b.y + b.h);
      // "Saving options" (pauseSubmenu, sopra): stesso array `pauseMenuButtons`
      // del pannello principale, ma le `action` sono tutte diverse (toggle/
      // ciclo di un'impostazione) — nessuna ambiguita' possibile fra le due
      // liste di stringhe. Ogni tocco riscrive subito le impostazioni in
      // localStorage (saveAutosaveSettings()): niente "Applica"/"Annulla",
      // coerente con ogni altro controllo touch di questo motore.
      if (pauseSubmenu === "saving") {
        if (hit?.action === "toggleEnabled") {
          autosave.enabled = !autosave.enabled;
          saveAutosaveSettings(autosave);
        } else if (hit?.action === "cycleInterval") {
          const i = AUTOSAVE_INTERVALS.indexOf(autosave.intervalMin);
          autosave.intervalMin = AUTOSAVE_INTERVALS[(i + 1) % AUTOSAVE_INTERVALS.length];
          saveAutosaveSettings(autosave);
        } else if (hit?.action === "toggleAttacks") {
          autosave.duringAttacks = !autosave.duringAttacks;
          saveAutosaveSettings(autosave);
        } else if (hit?.action === "toggleLowOil") {
          autosave.duringLowOil = !autosave.duringLowOil;
          saveAutosaveSettings(autosave);
        } else if (hit?.action === "back") {
          pauseSubmenu = null;
        }
        return;
      }
      // "Reset game" (pauseSubmenu === "confirmReset", drawConfirmResetOverlay()
      // sopra): stesso `pauseMenuButtons` dei pannelli sopra, azioni proprie —
      // un tap su "Reset game" qui e' la CONFERMA vera (irreversibile,
      // doResetGame() cancella il quicksave e rimonta la room da zero), non
      // il tap che apre il pannello (quello e' "resetGame" sul principale,
      // sotto, che si limita ad aprire questo sotto-pannello).
      if (pauseSubmenu === "confirmReset") {
        if (hit?.action === "confirmReset") {
          doResetGame();
        } else if (hit?.action === "cancelReset") {
          pauseSubmenu = null;
        }
        return;
      }
      if (hit?.action === "resume") {
        paused = false;
        pauseSubmenu = null;
      } else if (hit?.action === "saveFile") {
        doSaveToFile();   // async, messaggio gestito dentro (fuoco e dimentica)
      } else if (hit?.action === "loadFile") {
        doLoadFromFile();   // async, idem
      } else if (hit?.action === "savingOptions") {
        pauseSubmenu = "saving";
      } else if (hit?.action === "resetGame") {
        pauseSubmenu = "confirmReset";   // un tap solo non basta: prima la conferma (irreversibile)
      } else if (hit?.action === "title") {
        navigate("menu");
      }
      return;
    }
    // Bottone "avanti/esci" del tutorial (tut_ok/tutorialOkRect, disegnato
    // piu' sotto nel layer GUI): stessa priorita' del bottone di pausa,
    // intercetta prima che il tocco raggiunga il mondo sotto.
    if (tutorialOkRect && sx >= tutorialOkRect.x && sx <= tutorialOkRect.x + tutorialOkRect.w
      && sy >= tutorialOkRect.y && sy <= tutorialOkRect.y + tutorialOkRect.h) {
      advanceTutorial();
      return;
    }
    // Il pannello prestiti (bankPanelOpen sopra), quando aperto, e' un vero
    // modale: intercetta il tocco PRIMA di ogni altra cosa (bottoni,
    // piazzamento, mondo). Un tocco su uno dei 4 bottoni prende quel
    // prestito; altrove lo chiude senza fare niente — [I] l'originale non ha
    // un vero "annulla" (l'unico modo per chiudere `loanoscrino` e'
    // prenderne uno, `loanoscrino/Step.gml` si autodistrugge solo quando
    // `bankbuttoner.loaned` diventa 1): qui un tocco fuori dai bottoni
    // chiude senza costo, piu' comodo di un pannello che non si puo' annullare.
    if (bankPanelOpen) {
      const hit = bankButtons.find((b) => sx >= b.x && sx <= b.x + b.w && sy >= b.y && sy <= b.y + b.h);
      if (hit) {
        takeLoan(r12, hit.index);
        message = `loan of ${LOANS[hit.index].amount} mon obtained`;
      } else {
        message = "";
      }
      bankPanelOpen = false;
      messageT = 3;
      return;
    }
    // Pannello informativo di un edificio (buildingInfoPanel, sopra) — stesso
    // trattamento modale di bankPanelOpen appena sopra: un tocco QUALUNQUE
    // lo chiude (non solo il bottone dedicato, disegnato per scoperta/
    // chiarezza), mai raggiunge il mondo sotto mentre e' aperto.
    if (buildingInfoPanel) {
      // registerChiesTap() (sopra): il pannello di chies e' gia' aperto —
      // questo tap lo chiude come ogni altro, ma deve comunque contare per
      // lo shortcut sandbox (vedi il commento su registerChiesTap()).
      if (buildingInfoPanel.type === "chies") registerChiesTap();
      buildingInfoPanel = null;
      return;
    }
    // Overlay costruzioni mobile (buildMenuOpen, sopra) — stesso
    // trattamento modale di bankPanelOpen/buildingInfoPanel, ma un tocco su
    // un edificio SELEZIONA quel tipo (come il tap diretto sul bottone
    // nella riga scorrevole di sempre) invece di limitarsi a chiudere: un
    // picker, non un pannello di sola lettura. Un tocco su "Indietro" o
    // fuori da ogni bottone chiude senza selezionare nulla.
    if (buildMenuOpen) {
      const hit = buildMenuButtons.find((b) => sx >= b.x && sx <= b.x + b.w && sy >= b.y && sy <= b.y + b.h);
      // [C] pu6|pudj|pugatling|pusolare|puvillone|pumediat/Mouse_LeftPressed.gml:
      // il ramo che scrive `r12.selec` e' innestato dentro `if (unlosei==1)`
      // — un tocco su un bottone ancora bloccato (buildingLocked(), sopra)
      // non fa NIENTE nel decompilato, non solo "non seleziona".
      // [Bug corretto/Nuova funzionalita', richiesto dall'autore: "su mobile
      // deve comparire 'level 2 to unlock' quando si seleziona un edificio
      // non sbloccato" + "su mobile come fa l'utente a vedere il prezzo di
      // un edificio? facciamolo in dissolvenza come 'level N to unlock',
      // ma confermiamo la scelta al primo tap e facciamo apparire il
      // cartellino insieme, altrimenti un secondo tap per confermare
      // diventa poco chiaro"] Un bottone SBLOCCATO seleziona ancora al
      // PRIMO tap, come sempre — ma non chiude piu' l'overlay all'istante:
      // arma anche `gridTapTagType`/`gridTapTagAt` (sopra), cosi'
      // drawBuildMenuOverlay() disegna il cartellino prezzo sopra il
      // bottone mezzo secondo pieno poi lo dissolve (GRID_TAP_SHOW_MS/
      // GRID_TAP_FADE_MS), e chiude l'overlay DA SOLA quando il
      // cartellino e' del tutto svanito (vedi il commento li'). Un bottone
      // ancora BLOCCATO non seleziona mai (invariato): arma solo lo stesso
      // cartellino ("Level N to unlock" invece del prezzo), che pero' non
      // fa chiudere l'overlay da solo alla fine — resta aperto per un
      // altro tentativo.
      if (hit?.type && buildingLocked(hit.type)) {
        gridTapTagType = hit.type;
        gridTapTagAt = performance.now();
        return;
      }
      if (hit?.type) {
        selectedType = hit.type;
        r12.selec = SELEC_BY_TYPE[hit.type] ?? 0;
        gridTapTagType = hit.type;
        gridTapTagAt = performance.now();
        return;
      }
      // "Indietro" (`hit` esiste ma senza `.type`) o un tocco fuori da ogni
      // bottone (`hit` `undefined`) chiudono l'overlay senza selezionare
      // nulla, come sempre.
      buildMenuOpen = false;
      return;
    }
    // Un gesto di piazzamento a trascinamento e' gia' stato armato da
    // `input.onPointerDown` per lo stesso tocco (vedi sopra): il rilascio lo
    // risolve gia' `input.onPointerUp` (resolvePlacement()), che scatta
    // comunque anche quando questo tap viene ignorato — nessuna doppia
    // gestione dello stesso rilascio.
    if (armedPlacement) return;
    // il selettore edificio vive in spazio schermo, sopra la mappa: un tocco
    // che lo colpisce non deve raggiungere il mondo sotto.
    for (const btn of uiButtons) {
      if (sx >= btn.x && sx <= btn.x + btn.w && sy >= btn.y && sy <= btn.y + btn.h) {
        if (btn.kind === "menu") {
          // [Nuova funzionalita', richiesta dall'autore] Solo su mobile, il
          // bottone "costruzioni" (menoo:1) apre l'overlay a griglia
          // (drawBuildMenuOverlay(), sopra) invece della riga scorrevole —
          // su desktop resta il comportamento di sempre. "Indietro"
          // (menoo:0, nella riga costruzioni stessa) non e' toccato: quel
          // bottone esiste solo su desktop ormai (la riga costruzioni non
          // si apre piu' affatto su mobile), quindi passa comunque di qui
          // senza bisogno di un ramo dedicato.
          if (isMobile && btn.menoo === 1) buildMenuOpen = true;
          else menoo = btn.menoo;
        }
        else if (btn.kind === "deselect") {
          // [Bug corretto, segnalato dall'autore: la mano non deseleziona
          // sempre lo strumento attivo] Azzerare `selectedType`/`r12.selec`
          // toglie solo l'evidenziazione del bottone edificio premuto: la
          // ruspa (selec===11) puo' aver gia' armato un popup si'/no su un
          // edificio specifico (`ruspaPending`, sopra) che restava aperto e
          // "vivo" — un tocco altrove veniva ancora letto come conferma/
          // rifiuto di QUELLA demolizione anche dopo aver premuto la mano.
          // La mano deve annullare qualunque strumento sia armato, non solo
          // il bottone evidenziato: anche il popup di conferma della ruspa.
          selectedType = null;
          r12.selec = 0;
          ruspaPending = null;
        }  // handbutton
        else if (btn.kind === "building") {                              // casa/industria/...
          // Stesso gate della griglia mobile qui sopra, per lo stesso
          // bottone visto nella riga scorrevole desktop (buildingLocked()).
          // Il cartellino vero (unlockTagSprite(), sopra) e' gia' visibile
          // all'hover su questa riga (drawUiRow() sotto): il messaggio resta
          // solo come rinforzo testuale del click stesso.
          if (buildingLocked(btn.type)) {
            message = `${BUILDING_LABEL[btn.type] ?? btn.type}: level ${CHIES_UNLOCK_BY_TYPE[btn.type]} to unlock`;
            messageT = 3;
          } else {
            selectedType = btn.type;
            r12.selec = SELEC_BY_TYPE[btn.type] ?? 0;
          }
        }
        return;
      }
    }
    const w = cam.screenToWorld(sx, sy);
    picked = null;
    // frameList e' ricostruita ad ogni frame di disegno: e' la stessa lista,
    // gia' ordinata top-most-last, che serve per il picking. Due passate: la
    // prima considera solo cio' che e' davvero interattivo (placeholder,
    // edifici — inclusa chies, ora che vive li' anche lei — e le casse di
    // risorse lasciate cadere dalle mongolfiere), a prescindere dal depth; la
    // seconda, di fallback, e' il vecchio picking "per z-order" usato solo
    // per ispezionare la scena nell'HUD di debug. Senza la prima passata
    // `air2` (il terreno/strade sull'intera mappa, depth -1, `mask_sprite:
    // null` nel decompilato: non ha MAI ricevuto click nell'originale)
    // coprirebbe chies (depth 0, per y) e la renderebbe intoccabile.
    //
    // Le casse (obj: "loot") e le monete (obj: "coin") sono qui invece che nel
    // fallback perche' nell'originale si raccolgono al passaggio del mouse
    // (bar*/sold*/Mouse_MouseEnter.gml), non con un click — un tap va quindi
    // trattato come il gesto piu' "sicuro" possibile, non come l'ultima
    // risorsa dopo aver controllato tutto il resto per z-order. "upsign" (il
    // segnale verde di potenziamento, pushato piu' sotto insieme agli altri
    // edifici) e' qui per lo stesso motivo di "building": va intercettato a
    // prescindere dal depth, non solo per z-order — e vince comunque contro
    // l'edificio sotto di lui perche' il suo depth (UPSIGN_DEPTH, sempre in
    // primo piano) e' piu' negativo. "ruspaYes"/"ruspaNo" (il popup si'/no
    // della ruspa, stesso depth) sono qui per lo stesso motivo.
    //
    // [Bug corretto, segnalato dall'autore: "se clicco su una mongolfiera
    // questa esplode da sola, non dovrebbe succedere"] "flyingBalloon" era
    // stato aggiunto qui in una sessione precedente ("un tap diretto sulla
    // mongolfiera la distrugge — le torrette non lo fanno piu' da sole") per
    // aggirare una regressione nella mira automatica delle torrette. Quella
    // regressione non c'e' piu': stepTurretAim() (buildings.js) punta gia' da
    // solo a una mongolfiera quando non c'e' nessuna minaccia vera in
    // portata, e stepProjectiles() (projectiles.js) la distrugge davvero al
    // colpo andato a segno — nessun oggetto mongolfiera dell'originale
    // (monviolo/monvo/mongo/monbo/monspi, src/objects/) ha mai avuto un
    // Mouse_LeftPressed.gml: in gioco non si "clicca" una mongolfiera per
    // farla esplodere, la si abbatte con una torretta. Lasciarla raggiungibile
    // a prescindere dal depth la faceva esplodere gratis a ogni tap che le
    // capitava sopra (anche solo per piazzare/ispezionare qualcos'altro
    // dietro di lei) — rimossa dalla lista, resta raggiungibile solo dal
    // vecchio fallback per z-order (usato solo per l'HUD di debug), come nel
    // gioco originale.
    for (const it of frameList) {
      if (it.obj !== "placeholder" && it.obj !== "building" && it.obj !== "loot"
        && it.obj !== "coin" && it.obj !== "upsign" && it.obj !== "ruspaYes" && it.obj !== "ruspaNo"
        && it.obj !== "bankIcon" && it.obj !== "faroButton" && it.obj !== "faroWaveSignal"
        && it.obj !== "faroDockerSignal" && it.obj !== "faro3Button" && it.obj !== "faro3WaveSignal"
        && it.obj !== "faro3DockerSignal" && it.obj !== "cargoShip" && it.obj !== "ruinLot"
        && it.obj !== "ruin") continue;
      // placeholder: maschera romboidale (inFrameDiamond sopra), non l'AABB —
      // stessa ragione della raccolta hover piu' sotto. Tutto il resto
      // (edifici, casse, monete, segnale di potenziamento) resta sul
      // bounding box rettangolare, piu' leggero e gia' fedele alla loro sagoma.
      // Le torrette (missile/gatling/laser) usano l'unione di tutti i loro
      // frame direzionali (turretHitBox(), sopra) invece del frame corrente:
      // vedi il commento li' per il perche'.
      const turretBox = it.obj === "building" && BUILDING_TYPES[it.ref.type]?.turret
        ? turretHitBox(it.ref.type) : null;
      const hit = it.obj === "placeholder"
        ? inFrameDiamond(w.x, w.y, it.x, it.y, it._f)
        : inFrameRect(w.x, w.y, it.x, it.y, turretBox ?? it._f);
      // [Bug corretto, segnalato dall'autore: "l'area cliccabile delle
      // torrette e' troppo piccola, sembra solo quella vicina alla bocca di
      // fuoco"] La sagoma vera (`it._f`, sopra) e' gia' l'intero sprite
      // dell'edificio — base+cannone, non solo il cannone — ma il concorso
      // fra AABB sovrapposte qui sotto si decide per `it.depth` (piu' vicino
      // alla telecamera vince, `-b.y`): in una citta' fitta il rettangolo di
      // UN VICINO davanti (che quindi vince) puo' sovrapporre la META'
      // INFERIORE/base di una torre alta come una torretta senza coprirla
      // davvero a schermo (le AABB non seguono la sagoma reale, `f.w/f.h`
      // e' il rettangolo minimo che la contiene) — restava cliccabile solo
      // la punta in alto (il cannone) che nessun vicino arriva a coprire.
      // Col nemico gia' addosso e il giocatore di fretta (serve un tap
      // rapido su un'area precisa) questo non e' accettabile: le torrette
      // vincono sempre il concorso di profondita' contro un edificio
      // normale che le si sovrappone (stesso trattamento di "upsign"/
      // "ruspaYes/No" sopra, un pelo piu' permissivo di UPSIGN_DEPTH cosi'
      // quei popup restano comunque sopra una torretta se mai si
      // sovrapponessero), mai contro un'altra torretta o contro se stesse.
      //
      // [Bug corretto, segnalato dall'autore: "alcuni edifici, quando
      // costruiti, disattivano anche i placeholder adiacenti anche se sono
      // liberi, non deve succedere — soprattutto con i sistemi di difesa"]
      // PLACEHOLDER_DEPTH (sopra, -2) e' un depth di DISEGNO — il rombo viola
      // deve stare sopra la strada ma sotto edifici/alberi, vedi il commento
      // li' — non un depth di PICKING: qui sotto pero' veniva riusato per
      // ENTRAMBI gli scopi tramite `o.depth`. Il depth vero di un edificio e'
      // sempre `-y` (effDepth()), quasi sempre molto piu' negativo di -2 (un
      // edificio a y=500 ha depth -500): nel concorso qui sotto un edificio
      // il cui bounding box (rettangolare, spesso piu' largo/alto della sua
      // singola cella — un palazzo a due piani, la sagoma di una torretta)
      // sconfina nella cella di un VICINO ancora libero vinceva quindi
      // SEMPRE il tap contro il placeholder sottostante, anche se quel
      // placeholder non era mai stato consumato — il tocco veniva
      // interpretato come "seleziona l'edificio vicino" invece di "costruisci
      // qui", rendendo quella cella di fatto inaccessibile. Le torrette
      // (`turretHitBox()`, l'unione di tutti i frame direzionali — un
      // rettangolo ancora piu' grande — piu' il -8000 esplicito qui sotto)
      // erano il caso peggiore, ma qualunque edificio con uno sprite
      // abbastanza ingombrante riproduceva lo stesso sintomo. Qui un
      // placeholder ancora libero ha sempre la priorita' su qualunque
      // edificio (torretta inclusa: PLACEHOLDER_PICK_PRIORITY sta sotto
      // -8000), ma resta comunque sotto ai popup veri (upsign/coin/upfaro/
      // ruspaYes|No/bankIcon, tutti fra -9001 e -9100) che devono continuare
      // a vincere quando si sovrappongono a un edificio.
      const PLACEHOLDER_PICK_PRIORITY = -8500;
      const pickPriority = (o) => o.obj === "placeholder" ? PLACEHOLDER_PICK_PRIORITY
        : (o.obj === "building" && BUILDING_TYPES[o.ref.type]?.turret) ? -8000
        : o.depth;
      if (hit && (!picked || pickPriority(it) < pickPriority(picked))) picked = it;
    }
    if (!picked) for (let i = frameList.length - 1; i >= 0; i--) {
      const it = frameList[i];
      // il decoro (cddvd*), l'impalcatura di cantiere, le auto (honda_facile_1/2),
      // i tappi dei semafori, nuvole/uccelli e i pedoni sono puramente
      // visivi: nell'originale non avevano eventi Mouse propri (i pedoni
      // solo eventi Collision, non replicati — vedi pedestrians.js), quindi
      // qui non devono "rubare" il tocco.
      if (!it._f || it.obj === "decor" || it.obj === "scaffold" || it.obj === "car"
        || it.obj === "semaphore" || it.obj === "cloud" || it.obj === "bird" || it.obj === "pedestrian") continue;
      // stessa distinzione rombo/rettangolo della prima passata sopra — un
      // placeholder che arriva fin qui (nessun oggetto interattivo colpito
      // nella prima passata) deve comunque rispettare la sua sagoma vera, non
      // il bbox pieno.
      const hit = it.obj === "placeholder"
        ? inFrameDiamond(w.x, w.y, it.x, it.y, it._f)
        : inFrameRect(w.x, w.y, it.x, it.y, it._f);
      if (hit) {
        picked = it;
        break;
      }
    }
    if (!picked) return;
    // Tutorial (game/src/tutorial.js): lotto-rudere — solo con la ruspa
    // selezionata e fondi sufficienti. [Decisione dell'autore: "la rovina
    // ruspata deve creare sempre un placeholder vuoto, non un nuovo
    // edificio"] Sgombera il lotto (clearedPlaceholder(), sopra) invece di
    // avviare subito un cantiere di `casa` — una versione precedente
    // seguiva alla lettera `ruin1|2/Mouse_LeftPressed.gml` (che nel
    // decompilato ricostruisce davvero, non sgombera soltanto), ma qui la
    // scelta esplicita e' che demolire lasci un lotto libero, non gia'
    // occupato da una nuova costruzione. [Bug corretto, segnalato
    // dall'autore: "le rovine non sparivano di colpo"] Il pagamento resta
    // immediato ma non sgombera piu' subito: monta `clearing` (avanzato da
    // stepRuinClearing() sopra, ogni frame) cosi' l'impalcatura vera della
    // sua taglia (front track + topper/gru inclusi, vedi il commento su
    // ruinClearUp()/stepRuinClearing() sopra) compare prima che il lotto si
    // liberi per davvero. `!lot.clearing` blocca un secondo tap (e quindi un
    // secondo pagamento) mentre il ciclo e' gia' in corso.
    if (picked.obj === "ruinLot") {
      const lot = picked.ref;
      message = ""; messageT = 0;
      if (!lot.clearing && r12.selec === 11 && canAfford(r12, { mon: lot.cost })) {
        r12.mon -= lot.cost;
        lot.clearing = { stepIndex: 0, t: 0 };
      }
      picked = null;
      return;
    }
    // Rudere VERO da battaglia (destroyBuilding() sopra) — stessa identica
    // meccanica di "ruinLot" appena sopra (stesso ciclo di impalcature via
    // `clearing`/stepRuinClearing()), solo su `ruins` invece di `ruinLots`.
    if (picked.obj === "ruin") {
      const ru = picked.ref;
      message = ""; messageT = 0;
      if (!ru.clearing && r12.selec === 11 && canAfford(r12, { mon: ru.cost })) {
        r12.mon -= ru.cost;
        ru.clearing = { stepIndex: 0, t: 0 };
      }
      picked = null;
      return;
    }
    // palazzo/museo: `input.onPointerDown`, per questo stesso tocco, ha gia'
    // provato ad armare il piazzamento (armPlacement()) e ha gia' mostrato un
    // messaggio — riuscito ("trascina verso...", ma allora `armedPlacement`
    // e' vivo e la guardia in cima a questa funzione e' gia' uscita) o
    // fallito (mon insufficienti/nessun lotto adiacente: qui sotto,
    // `armedPlacement` e' rimasto `null`). In entrambi i casi il messaggio
    // gia' mostrato e' quello giusto: non va sovrascritto col reset generico
    // sotto, e placeAt() (a un lotto solo) non va comunque chiamato.
    if (picked.obj === "placeholder" && !picked.consumed && BUILDING_TYPES[selectedType]?.diagonalPlacement) return;
    message = ""; messageT = 0;
    if (picked.obj === "placeholder" && !picked.consumed) {
      const def = selectedType ? BUILDING_TYPES[selectedType] : null;
      if (!selectedType) {
        // [C] handbutton/Mouse_LeftPressed.gml: `r12.selec = 0`, nessun
        // edificio armato — la modalita' di default prima di aprire il menu.
        message = "no building selected — open the menu with the crane";
      } else if (!def) {
        // Uno degli `OTHER_BUILDINGS` sopra: nel menu, ma non in
        // BUILDING_TYPES — nessuna catena di piazzamento ricostruita.
        message = `${BUILDING_LABEL[selectedType] ?? selectedType}: not rebuilt yet`;
      } else {
        const err = placeAt(picked, selectedType);
        message = err ?? `${def.label.toLowerCase()} placed (-${def.placeCost.mon} mon)`;
      }
      messageT = 3;
    } else if (picked.obj === "building") {
      const b = picked.ref;
      // Shortcut sandbox (registerChiesTap(), sopra): conta questo tap ma
      // NON lo intercetta finche' non fa scattare la soglia — tap 1..19 su
      // chies cadono comunque nei rami sotto (tipicamente il pannello
      // informativo, r12.selec===0) esattamente come se questo controllo
      // non ci fosse.
      if (b.type === "chies" && registerChiesTap()) return;
      // [C] parco/Mouse_LeftPressed.gml, ramo selec==61: un tocco su un parco
      // GIA' FINITO con "Pannelli solari" selezionato non richiede un
      // placeholder libero — crea il pannello direttamente sopra il parco
      // (stessa x/y, il parco resta li' com'e', mai ucciso). `placeSolarOverPark()`
      // sotto marca `overpark`/`oversolar` sui due edifici, esattamente come
      // le collisioni reciproche `sooool/Collision_parco.gml` +
      // `parco/Collision_sooool.gml` dell'originale (qui non serve una vera
      // collisione: e' l'UNICO modo in cui potrebbero mai toccarsi).
      if (!b.construction && b.type === "parco" && r12.selec === 61) {
        const err = placeSolarOverPark(b);
        message = err ?? "solar panels placed on the park (-1000 mon)";
        messageT = 3;
        return;
      }
      // [C] casa1|industria1|.../Mouse_LeftPressed.gml, ramo selec==11 (la
      // ruspa, OTHER_BUILDINGS sotto): un tocco su un edificio FINITO arma il
      // popup si'/no invece di potenziare/sparare — `demobasia/Create.gml`
      // non tocca ancora `r12.mon`, solo apre il popup (e nemmeno quello se
      // il costo non e' coperto: `casa1/Mouse_LeftPressed.gml` controlla
      // `mon>=500` PRIMA di creare `demobasia`, non dopo). La conferma vera
      // arriva dal tocco su "ruspaYes" sotto.
      if (r12.selec === 11) {
        const cost = ruspaCostFor(b);
        if (b.construction) message = "construction already in progress";
        else if (cost == null) message = `${BUILDING_LABEL[b.type] ?? b.type}: not demolishable/repairable with the bulldozer`;
        else if (!canAfford(r12, { mon: cost })) message = `need ${cost} mon (have ${r12.mon.toFixed(0)})`;
        else {
          ruspaPending = { buildingId: b.id, cost };
          message = `demolish/repair: tap "yes" to confirm (-${cost} mon)`;
        }
        messageT = 3;
        return;
      }
      // [C] rocket_launcher|lasergun/Mouse_LeftPressed.gml (`manualFire` in
      // buildings.js — [I] ora attivo anche per gatlinggun, vedi il commento
      // su `manualFire` li'): un tocco su una torretta finita non apre un
      // cantiere (nessuna delle tre ha potenziamenti — tryStartUpgrade ci
      // direbbe solo "livello massimo") — fa partire un colpo contro
      // qualunque cosa il cannone sta gia' inseguendo (game/src/
      // projectiles.js, fireTurretManual()): una minaccia vera se ce n'e'
      // una in portata, altrimenti la mongolfiera piu' vicina — [Bug
      // corretto, richiesto dall'autore] buildings.js/stepTurretAim().
      // Sotto cantiere invece resta tryStartUpgrade come per qualunque
      // edificio (che gia' risponderebbe da solo "cantiere gia' in corso").
      if (!b.construction && BUILDING_TYPES[b.type]?.manualFire) {
        const fired = fireTurretManual(b, projectiles, explosions, r12, threats, trails, beams, balloons, loot);
        message = fired ? "fire!"
          : !b.aimTarget ? "no target in range"
          : b.type === "laser" && r12.ele < 200 ? "insufficient energy"
          : "cannon reloading";
        messageT = 3;
      } else if (r12.selec === 0 && !BUILDING_TYPES[b.type]?.turret) {
        // [Nuova funzionalita', richiesta dall'autore: "quando la mano e'
        // selezionata e clicchi su un edificio (non difensivo) mostra una
        // finestrella con le stats"] Con la mano attiva (nessun tipo/
        // strumento armato) un tap su un edificio finito NON deve piu'
        // provare ad avviare un potenziamento (tryStartUpgrade sotto, il
        // comportamento di default per ogni altro `r12.selec`): apre invece
        // un pannello informativo di sola lettura (drawBuildingInfoPanel()
        // sotto), coerente con "la mano" come strumento di ispezione, non
        // di costruzione. Le torrette restano escluse (`turret`, sempre
        // vero insieme a `manualFire` per missile/gatling/laser — vedi il
        // ramo sopra): ci passano gia' SOLO per il fuoco manuale, un
        // pannello qui li intercetterebbe prima e romperebbe quel tocco.
        buildingInfoPanel = b;
      } else {
        const err = startUpgrade(b);
        message = err ?? "construction started";
        messageT = 3;
      }
    } else if (picked.obj === "ruspaYes") {
      // [C] demoiessa/Mouse_LeftReleased.gml: `iessa=1`, letto dalla
      // collisione di demobasia col vero edificio (qui, tryRuspaRebuild()/
      // demolishMultiTile() in buildings.js/main.js) — la stessa conferma,
      // un solo tocco invece di un flag+collisione al frame dopo.
      const b = picked.ref;
      const def = BUILDING_TYPES[b.type];
      if (def?.construct?.ruspaDemolish) {
        const cost = ruspaCostFor(b);
        if (!canAfford(r12, { mon: cost })) {
          message = `need ${cost} mon (have ${r12.mon.toFixed(0)})`;
        } else {
          r12.mon -= cost;
          demolishMultiTile(b);
          message = "demolished — lots free";
        }
      } else {
        const err = ruspaRebuild(b);
        message = err ?? "construction started (bulldozer)";
      }
      ruspaPending = null;
      messageT = 3;
      picked = null;
    } else if (picked.obj === "ruspaNo") {
      // [C] demobachia/Mouse_LeftReleased.gml: annulla, nessun costo.
      ruspaPending = null;
      picked = null;
    } else if (picked.obj === "loot") {
      const item = picked.ref;
      collectLootAt(item);
      message = `+${item.amount} ${item.key}`;
      messageT = 3;
      picked = null;   // raccolta, non c'e' piu' niente da tenere selezionato
    } else if (picked.obj === "coin") {
      const item = picked.ref;
      collectCoinAt(item);
      message = `+${item.amount} ${item.kind ?? "mon"}`;
      messageT = 3;
      picked = null;
    } else if (picked.obj === "upsign") {
      // [C] upsign12|23/Mouse_LeftPressed.gml: la stessa cosa che "building"
      // gia' fa tap-ovunque-sull'edificio (tryStartUpgrade gia' controlla
      // soglia e costo) — qui e' solo il bersaglio VISIBILE e prioritario
      // quando il potenziamento e' davvero pronto.
      const err = startUpgrade(picked.ref);
      message = err ?? "construction started";
      messageT = 3;
      picked = null;
    } else if (picked.obj === "bankIcon") {
      // [C] bankbuttoner/Mouse_LeftPressed.gml: apre il pannello solo se
      // NESSUN prestito e' gia' attivo (`loaned==0` nel decompilato, qui
      // `loanActive()` — vedi il commento li' per il perche').
      if (loanActive(r12)) {
        message = "loan already active";
      } else {
        bankPanelOpen = true;
      }
      messageT = 3;
      picked = null;
    } else if (picked.obj === "faroButton") {
      // [C] upfaro1/Mouse_LeftPressed.gml (game/src/platform.js): -2000 mon,
      // faro1 si accende e compare il segnale successivo (wavesig1).
      message = clickFaroButton(platformState, r12) ?? "";
      messageT = 3;
      picked = null;
    } else if (picked.obj === "faroWaveSignal") {
      // [C] wavesig1/Mouse_LeftReleased.gml: attivo solo di notte, -20 crys.
      message = clickWaveSignal(platformState, r12, isNight(phaseT)) ?? "";
      messageT = 3;
      picked = null;
    } else if (picked.obj === "faroDockerSignal") {
      // [C] dockersig1/Mouse_LeftPressed.gml: -5000 mon -9000 oil, avvia
      // l'attracco (~14s) che finisce nella seconda piattaforma (`r32`).
      message = clickDockerSignal(platformState, r12) ?? "";
      messageT = 3;
      picked = null;
    } else if (picked.obj === "faro3Button") {
      // [C] upfaro3/Mouse_LeftPressed.gml: -5000 mon, faro3 si accende.
      message = clickFaro3Button(platformState, r12) ?? "";
      messageT = 3;
      picked = null;
    } else if (picked.obj === "faro3WaveSignal") {
      // [C] wavesig3/Mouse_LeftReleased.gml: attivo solo di notte, -50 crys.
      message = clickWaveSignal3(platformState, r12, isNight(phaseT)) ?? "";
      messageT = 3;
      picked = null;
    } else if (picked.obj === "faro3DockerSignal") {
      // [C] dockersig3/Mouse_LeftPressed.gml: -15000 mon -27000 oil, avvia
      // l'attracco (~10s) che finisce nella terza piattaforma (`r22`/`r220`).
      message = clickDockerSignal3(platformState, r12) ?? "";
      messageT = 3;
      picked = null;
    } else if (picked.obj === "cargoShip") {
      // [C] cargo1|2|4/Mouse_LeftPressed.gml: una tantum, +2000..3000 alla
      // risorsa della nave (game/src/bridges.js). cargo3 non e' cliccabile:
      // non arriva nemmeno qui (obj resta "decor" per lei, faroDecor()).
      message = clickShip(picked.ref, r12) ?? "";
      messageT = 3;
      picked = null;
    }
  };

  // ---------------------------------------------------------------- loop
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
    }
    cam.resize(canvas.clientWidth, canvas.clientHeight);
    // [Bug corretto, segnalato dall'autore: "lo zoom in massimo e' eccessivo,
    // sgrana troppo" su iPhone] `cam.minZoom` (limite di zoom-IN, sotto il
    // quale gli sprite si vedono ingranditi oltre il loro dettaglio nativo)
    // era un valore ASSOLUTO fisso (0.5), scelto pensando a un dpr di
    // riferimento 1 (desktop): a quel dpr, 0.5 = al piu' 2x la risoluzione
    // nativa dell'atlas (pixelPerfectZoom() = 1, quindi 1 / 0.5 = 2x),
    // giudicato accettabile. Su un iPhone (`pixelPerfectZoom()` = dpr reale,
    // capato a 2) lo STESSO 0.5 assoluto permetteva pero' fino a 2 / 0.5 =
    // 4x — il doppio dell'ingrandimento rispetto a desktop, quindi il doppio
    // della sgranatura, per un valore che avrebbe dovuto essere lo stesso
    // limite relativo su ogni schermo. Qui `minZoom` e' invece proporzionale
    // a `pixelPerfectZoom()` (ricalcolato ad ogni resize, cosi' un cambio di
    // dpr — rotazione, spostamento fra monitor — lo aggiorna da solo): lo
    // stesso 2x massimo di ingrandimento su qualunque dispositivo, mobile
    // incluso.
    cam.minZoom = pixelPerfectZoom() * 0.5;
    // [Bug corretto, richiesto dall'autore: "in generale non permettere di
    // visualizzare al giocatore area fuori dallo spazio della room (tutti e
    // tre i livelli)"] Al di sopra di questo zoom, in ALMENO una delle due
    // dimensioni il mondo inquadrato (`cam.worldW`/`worldH`) supera la room
    // vera (`scene.width`/`height`) — `cam.clamp()` (camera.js) a quel punto
    // smette di poter incastrare i bordi e RICENTRA soltanto, lasciando
    // margine vuoto intorno alla piattaforma (coperto qui dalla vignetta
    // fuori mappa, main.js piu' sotto — ma l'autore vuole che quel margine
    // non sia proprio raggiungibile). `Math.min`, non `Math.max`: lo stesso
    // identico calcolo gia' usato dal ramo mobile sotto per il fit "cover"
    // (un margine vuoto compare appena una delle due dimensioni lo supera,
    // quindi serve il rapporto PIU' vincolante, non il meno vincolante).
    const roomCoverZoom = Math.min(scene.width / cam.viewW, scene.height / cam.viewH);
    if (!isMobile) {
      // Desktop: lo zoom di default resta pixel-perfect (mai un "fit to
      // screen" frazionario, che sfumerebbe gli sprite) — ma ora e' solo il
      // limite di zoom-OUT (`maxZoom`), non piu' un valore fisso: la rotella
      // (input.onZoom sopra) puo' avvicinare oltre (zoom < maxZoom, fino a
      // `cam.minZoom` sopra) senza mai poter allontanare oltre il default.
      // `setZoomImmediate` solo finche' l'utente non ha ancora zoomato/
      // panoramicato da solo (`userMoved`, sopra) — stesso schema gia' usato
      // dal ramo mobile sotto, cosi' un resize (finestra ridimensionata,
      // spostata su un monitor a dpr diverso) non scavalca piu' uno zoom
      // scelto dal giocatore.
      // [Bug corretto di nuovo, stesso sintomo] Una richiesta precedente
      // ("consenti anche uno zoom out fino a 0.5") aveva portato `maxZoom` a
      // `pixelPerfectZoom() * 2` — ma su una room grande (`match`, 3900x2090)
      // quel raddoppio supera `roomCoverZoom` (sopra), mostrando l'esterno
      // della piattaforma. `Math.min` con `roomCoverZoom` riporta il limite
      // di zoom-OUT al piu' permissivo dei due SENZA mai superare il bordo
      // della room — su un desktop/room dove il doppio pixel-perfect resta
      // comunque dentro la room (schermi piccoli, room piccole) il
      // comportamento richiesto in precedenza resta invariato.
      cam.maxZoom = Math.min(pixelPerfectZoom() * 2, roomCoverZoom);
      if (!userMoved) cam.setZoomImmediate(pixelPerfectZoom());
    } else if (canvas.clientWidth > 0) {
      // `Math.min`, non `Math.max`: la room e' quasi sempre piu' larga che
      // alta (match_easy 1920x1086, match 3900x2090 — orizzontali) mentre lo
      // schermo di un telefono in portrait e' l'opposto (stretto e alto).
      // Inquadrare l'intera larghezza (il vecchio Math.max, che sceglie il
      // rapporto piu' vincolante per contenere TUTTA la room) lascia allora
      // l'altezza sovrabbondante — fasce vuote sopra/sotto, il bordo
      // segnalato dall'autore. `Math.min` fa l'opposto: sceglie il rapporto
      // meno vincolante, cosi' l'asse corto della room (l'altezza) coincide
      // esattamente con l'asse lungo dello schermo (l'altezza del telefono in
      // portrait) — schermo coperto senza bordi, al costo di non vedere piu'
      // tutta la larghezza della mappa in un colpo solo (si scorre lateralmente,
      // clamp() sotto gestisce gia' il pan quando il mondo e' piu' stretto
      // della room).
      // `roomCoverZoom` sopra e' lo stesso identico calcolo — riusato invece
      // di ridichiararlo qui, resta comunque "fitZoom" nel resto di questo
      // ramo (il nome gia' usato per `setZoomImmediate()`/`cam.x`/`cam.y`
      // sotto, meno da toccare).
      const fitZoom = roomCoverZoom;
      // [Bug corretto di nuovo, stesso sintomo del ramo desktop sopra:
      // richiesto dall'autore, "non permettere di visualizzare area fuori
      // dallo spazio della room"] Prima: `fitZoom * 2` (`* 1.3` ancora
      // prima) — una richiesta precedente per uno zoom-out fino a scala 0.5,
      // ma OLTRE `fitZoom` (il fit "cover" vero, sopra) il mondo inquadrato
      // supera la room in almeno una dimensione: `cam.maxZoom` non deve mai
      // superarlo, `fitZoom` stesso e' gia' il limite piu' permissivo che
      // non mostra mai l'esterno della piattaforma.
      cam.maxZoom = fitZoom;
      if (!userMoved) {
        cam.setZoomImmediate(fitZoom);
        // `initialFocusX`/`initialFocusY` (calcolati sopra, dove viene
        // spiegato) invece di `scene.width|height / 2`: stesso principio,
        // stessa correzione — senza effetto pratico su Y oggi (cam.clamp()
        // sotto ricentra comunque quando la room "cover" non lascia margine
        // verticale, il caso comune), ma X conta davvero per `tutorial`
        // (contenuto non piu' centrato nei bound allargati, vedi sopra) anche
        // sul ramo mobile qui.
        cam.x = initialFocusX;
        cam.y = initialFocusY;
      }
    }
    cam.clamp();
  }

  let frameList = staticWorld;   // lista dell'ultimo frame disegnato, usata anche dal picking
  let last = performance.now();
  function frame(now) {
    if (stopped) return;
    // Un solo reset per frame, prima di ogni possibile drawHtmlText() (il
    // balloon del tutorial e il menu di pausa/"saving options", entrambi
    // piu' sotto) — hideUnusedText() (in fondo a questa stessa funzione)
    // nasconde poi quanto resta del pool non riusato.
    resetTextPool();
    // [Bug corretto, segnalato dall'autore: "su desktop non riesco ad
    // avviare match, rimane fermo in caricamento con schermo nero"] Un
    // errore imprevisto in un punto qualunque del ciclo di frame (migliaia
    // di righe di simulazione/disegno, ogni frame) non aveva NESSUN
    // recupero: un'eccezione dentro un callback di requestAnimationFrame non
    // rientra nel try/catch di app.js/navigate() (quello copre solo il MOUNT
    // iniziale, gia' concluso con successo a questo punto) — il browser si
    // limita a fermare silenziosamente quel singolo callback, senza mai
    // pianificarne un altro: se capita al primissimo frame (prima che
    // qualunque cosa di reale sia mai stata disegnata) il nero pieno-schermo
    // disegnato da app.js PRIMA del mount (STUDIO.md/app.js, navigate())
    // resta l'ultimo frame per sempre — indistinguibile da un caricamento
    // bloccato, la stessa identica classe di bug gia' corretta altrove per
    // il mount stesso (app.js) e per l'atlas (assets.js). Qui lo stesso
    // principio: mai lasciare il giocatore su uno schermo morto senza via
    // d'uscita — un errore qui si logga (visibile in console per il debug)
    // e riporta al menu invece di restare bloccato in silenzio.
    try {
    // Math.max(0, ...): il timestamp di requestAnimationFrame puo' precedere
    // di poco l'ultimo `last` (performance.now() catturato prima di registrare
    // il callback) — soprattutto al primissimo frame, o con WebGL software —
    // un dt negativo qui si propagherebbe a tutti i timer (c.frame incluso,
    // rendendo frameFor() con un indice negativo e un array out-of-bounds).
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
    // [Bug corretto, segnalato dall'autore: "gli aerei del tutorial iniziano
    // fermi poi si muovono"] `dt` sopra e' volutamente clampato a 0.05s per
    // proteggere la simulazione vera (fisica, spawn) da un salto enorme dopo
    // uno stallo — ma la cutscene iniziale (stepCutscene(), sotto) non ha
    // NESSUNA fisica da proteggere, solo un'interpolazione lineare nel tempo
    // (tutorial.js, `k = (t-startT)/dur` gia' clampato a 0..1): proprio il
    // momento in cui la cutscene parte e' anche il momento in cui il
    // browser e' piu' occupato (upload GPU delle texture dell'atlas appena
    // arrivato, subito dopo mount()), quindi i primi frame veri hanno un
    // `now - last` reale MOLTO piu' grande di 0.05s — con `dt` clampato la
    // cutscene avanza comunque solo di 0.05s "di gioco" per ognuno di quei
    // frame radi, cioe' in slow-motion, esattamente il "restano fermi"
    // segnalato (gli aerei si muovono per davvero, solo troppo poco per
    // essere percepito, finche' il framerate reale non si stabilizza). Qui
    // un secondo dt, senza il tetto di 0.05s, passato SOLO a stepCutscene()
    // (main.js piu' sotto): la cutscene resta sincronizzata al tempo reale
    // anche durante uno stallo iniziale, invece di rallentare con lui.
    const cutsceneDt = Math.max(0, (now - last) / 1000);
    last = now;
    phaseT += dt;
    resize();
    cam.update(dt);
    const night = isNight(phaseT);
    const dawn = isDawn(phaseT);

    // `outcome` (sopra): avanza il proprio orologio SEMPRE, anche a
    // simulazione ferma (la sconfitta congela `buildings`/`r12` etc. ma la
    // sua stessa introduzione — buio/caduta, drawOutcomeOverlay() — deve
    // continuare a scorrere). La vittoria non congela niente (`frozen` sotto
    // resta `false`), ma il suo `t` non serve a nient'altro che a esistere
    // per simmetria con la sconfitta — nessun timer di auto-chiusura.
    if (outcome) outcome.t += dt;
    stepAutosave(dt);
    if (saveIconT !== null) {
      saveIconT += dt;
      if (saveIconT >= SAVE_ICON_DURATION) saveIconT = null;
    }

    // --- simulazione: cantieri, economia, meteo, traffico, luci
    // `paused` (bottone di pausa in basso a destra, sotto) o una sconfitta
    // gia' in corso: l'intero blocco usa `dt` per avanzare stato — a
    // differenza del resto del motore (che non ha mai avuto un concetto di
    // "in pausa" prima di questo), qui basta saltarlo del tutto per
    // congelare la partita. La vittoria NON e' in questo elenco: "puo'
    // continuare a giocare" (richiesto dall'autore) — solo un pannello,
    // niente di simulativo si ferma. Il disegno sotto NON e' condizionato:
    // ridisegna lo stesso identico stato ogni frame (nessun costo visibile,
    // il mondo non cambia mentre e' fermo), cosi' il blur di pausa/sconfitta
    // (drawPauseOverlay()/drawOutcomeOverlay() in fondo al file) puo' restare
    // un post-processo puro invece di dover duplicare la logica di disegno.
    const frozen = paused || outcome?.kind === "defeat";
    // Crollo per olio esaurito (`outcome`/`crashFallY` sopra) — [C] r12/Step.gml
    // non fa cadere MAI nuvole/mongolfiere (STUDIO.md, "notte_target"/
    // "casca_target" non le includono): `skyAlive` le tiene vive anche
    // mentre il resto e' `frozen`, cosi' il cielo continua a scorrere sopra
    // la citta' che cade invece di congelarsi con lei. Il combattimento
    // (minacce/bombe/torrette) NON e' incluso apposta — richiesto
    // dall'autore: "non avrebbe senso proseguire il combattimento con un
    // game over" (rischierebbe anche un secondo `outcome`, motivo "chies",
    // se una bomba uccidesse la chiesa proprio mentre la prima sconfitta e'
    // gia' in corso) — resta congelato come ogni sconfitta.
    const oilCrash = outcome?.kind === "defeat" && outcome.reason === "oil";
    const skyAlive = !frozen || oilCrash;
    if (oilCrash) {
      // Stessa integrazione a tick della fisica GameMaker (TICK sopra):
      // `dt/TICK` e' quanti tick vale questo frame (1 a 60fps, la cadenza
      // nominale del motore), cosi' `crashVSpeed`/`crashFallY` accumulano
      // esattamente come l'originale (vspeed += gravity ad ogni tick, poi
      // y += vspeed) invece di una formula continua indipendente che
      // andrebbe ritarata a mano.
      const ticks = dt / TICK;
      crashVSpeed += CRASH_GRAVITY * ticks;
      crashFallY += crashVSpeed * ticks;
    }
    // Nuvole/uccelli (game/src/atmosphere.js) e mongolfiere (game/src/
    // balloons.js) — `skyAlive` sopra: le stesse chiamate di sempre, solo
    // non piu' innestate dentro `if (!frozen)` sotto (che le fermerebbe
    // anche durante il crollo per olio esaurito, l'unico caso in cui devono
    // restare vive). [Bug corretto, segnalato dall'autore: "durante il
    // temporale comparivano una marea di nuvole in piu'"] `!!r12.storm` da
    // solo lasciava fuori `stormeasy` (match_easy) — ma `nidark_slow`
    // (game/src/atmosphere.js) e' l'oggetto ORIGINALE dedicato proprio a
    // quel ramo cosmetico: stessa condizione combinata gia' usata per
    // stepRain() sotto.
    if (skyAlive) {
      // [Bug corretto, richiesto dall'autore: "il gioco lagga da morire su
      // alcuni device — ottimizziamo lato GPU: atlas piu' piccoli ed
      // eviction"] Avvia gli scaglioni "combat"/"advanced" (tools/
      // 27_sprite_tiers.mjs, game/src/assets.js/loadDeferredGroup()) solo
      // quando lo stato di gioco vero si avvicina alla soglia — non piu'
      // incondizionato subito dopo le pagine core. `loadDeferredGroup()` e'
      // gia' idempotente (assets.js), richiamarla ogni frame finche' la
      // condizione resta vera costa solo un controllo su un Set.
      // "combat": qualunque minaccia vera possa comparire da un istante
      // all'altro — r12.spy (spia sbloccata, l'innesco di onda/bombn/diron —
      // game/src/balloons.js) o un vero temporale (fulmini) gia' in corso,
      // oppure un'ondata gia' avviata (i tre contatori "attivi" restano >0
      // finche' l'ondata non si esaurisce, game/src/threats.js).
      // Due `if` INDIPENDENTI, apposta non un `if`/`else if`: `r12.spy`
      // resta vero per il resto della partita una volta sbloccato (~8
      // minuti, nessun `action_set_alarm` che lo riarma — game/src/
      // balloons.js), quindi con un `else if` il ramo "advanced" non
      // verrebbe piu' controllato affatto dopo quel momento se non era gia'
      // scattato prima — un edificio sbloccato DOPO che la spia e' gia'
      // attiva non avrebbe mai avviato il proprio scaglione.
      if (r12.spy || r12.storm || r12.stormeasy
        || (r12.ondan ?? 0) > 0 || (r12.bombn ?? 0) > 0 || (r12.diron ?? 0) > 0) {
        loadDeferredGroup(gl, roomName, "combat");
      }
      // "advanced": chies a livello 2 (la soglia PIU' BASSA fra tutti i
      // `chiesUnlock` — main.js sopra, OTHER_BUILDINGS: chi richiede
      // livello 3 diventa raggiungibile solo DOPO essere passato per il 2,
      // quindi lo stesso trigger li copre entrambi in anticipo) o un
      // potenziamento di un edificio gia' sbloccato (casa/industria, gli
      // unici due gate a soglia di popolazione invece che a livello chiesa
      // — upgradeUnlocked(), buildings.js).
      // [Bug corretto, segnalato dall'autore: "nel tutorial ci sono case che
      // spariscono perche' sono di livello 2 — succede quando si carica una
      // partita/scenario dove il giocatore e' gia' a un livello piu' alto,
      // il software carica solo la 'base'"] `upgradeUnlocked()` risponde
      // "sta per sbloccarsi un NUOVO potenziamento" (progresso pop/makee
      // gia' raggiunto per il livello SUCCESSIVO), non "esiste gia' un
      // edificio che ha GIA' bisogno di uno sprite oltre il livello 1": una
      // casa gia' a livello 2 (il tutorial la piazza precostruita, un
      // salvataggio la ricarica cosi' com'era) il cui progresso verso il
      // livello 3 non e' ancora maturato non fa scattare nulla, restando
      // silenziosamente sullo sprite mancante (core non lo include, vedi
      // tools/27_sprite_tiers.mjs) finche' quel progresso non arriva DA
      // ZERO — mai, se il giocatore non fa altro che restare li'. **[I]**
      // `b.level >= 2` diretto (sostituisce il caso chies sopra, ora un suo
      // sottoinsieme): qualunque edificio GIA' oltre il livello 1 in QUESTO
      // istante (precostruito o ricaricato, non solo "sta per crescere")
      // copre il gap, sia per il tutorial sia per un salvataggio che
      // riprende una partita avanzata.
      if (buildings.some((b) => b.level >= 2 || upgradeUnlocked(b, r12, buildings))) {
        loadDeferredGroup(gl, roomName, "advanced");
      }
      // [Nuova funzionalita', gap chiuso: STUDIO.md, "nifast"] Nuvole veloci
      // esclusive di `match`/`tutorial` (mai `match_easy` — atmosphere.js,
      // il commento su `fastClouds` per il dettaglio) invece delle "ni"
      // lente usate ovunque fino ad ora, indipendentemente dalla room.
      stepAtmosphere(atmo, dt, !!(r12.storm || r12.stormeasy), roomName !== "match_easy");
      // Mongolfiere (game/src/balloons.js): risorse/spia a intervalli regolari
      // (stepBalloonSpawner, equivalente di r12/Alarm_1.gml) + il pacco di
      // cantiere che casa/industria si porta dietro (spawnato da placeAt(),
      // solo avanzato qui).
      stepBalloonSpawner(r12, balloons, dt, buildings);
      // onStruck: [C] Alarm_5.gml crea "esplo" prima di uccidersi per
      // fulmine — vedi il commento in stepBalloons() (balloons.js).
      // onStruck (balloons.js): "esplo" + il lampo del fulmine vero e proprio
      // (game/src/lightning.js — stessa scelta gia' fatta per gli edifici,
      // stepStormDamage() sotto), entrambi creati dal decompilato prima che
      // la mongolfiera si autodistrugga.
      stepBalloons(balloons, loot, dt, r12, (x, y) => {
        explosions.push(spawnExplosion(x, y));
        lightning.push(spawnLightning(x, y));
      });
      stepLoot(loot, dt);
    }
    if (!frozen) {
      stepConstructions(buildings, dt, r12, spawnDecor, addConstructionSpawn, removeTransientDecor);
      // Ciclo di impalcature dei ruderi sotto ruspa (stepRuinClearing()
      // sopra) — stesso principio di stepConstructions() appena sopra, un
      // timer a parte perche' un rudere in `ruins`/`ruinLots` non e' un
      // `buildings` vero (niente `.construction`).
      stepRuinClearing(ruins, dt, (ru) => clearedPlaceholder(ru.x, ru.y));
      stepRuinClearing(ruinLots, dt, (lot) => clearedPlaceholder(lot.x, lot.y));
      // Vittoria (`outcome` sopra): il grattacielo (STAR_BUILDINGS, l'ultima
      // delle tre "stelle") appena finito di costruire — `b.construction`
      // diventa `null` proprio dentro stepConstructions() appena chiamata
      // (buildings.js), quindi qui e' gia' il primo frame utile per
      // accorgersene. Al piu' un grattacielo esiste per partita
      // (`unlocked()`, STAR_BUILDINGS sopra), quindi `victoryShown` basta a
      // non ripetere il trigger ad ogni frame successivo.
      if (!victoryShown) {
        const g = buildings.find((b) => b.type === "grattacielo" && !b.construction);
        if (g) { victoryShown = true; outcome = { kind: "victory", t: 0 }; }
      }
      // Impalcatura/gru rotanti del grattacielo (game/src/scaffold.js): un
      // sotto-sistema di scenografia indipendente, non un `onSpawn`/`onFinish`
      // di stepConstructions() sopra — vedi il commento in scaffold.js per il
      // perche'.
      stepGrattacieloScaffold(buildings, dt);
      // Le gru di cantiere (game/src/cranes.js) — stesso principio dello
      // scaffolding del grattacielo sopra: un timer tutto loro, indipendente
      // dal resto del cantiere. `ruinClearingFakes`: le gru della taglia 3
      // di un rudere in demolizione (stepRuinClearing()/ruinClearUp() sopra,
      // `c.fb` — un "edificio" fittizio, mai in `buildings`) — stepCranes()
      // stesso, non una copia: legge solo `.construction`/`._cranes`, che
      // `c.fb` porta gia'.
      const ruinClearingFakes = [...ruins, ...ruinLots].map((e) => e.clearing?.fb).filter(Boolean);
      stepCranes([...buildings, ...ruinClearingFakes], dt);
      stepProduction(buildings, dt, r12);
      stepSolarProduction(buildings, dt, r12, night, dawn);
      stepWindProduction(buildings, dt, r12);
      // Fumo delle centrali (game/src/smoke.js): dopo stepProduction(), cosi'
      // "oil>0" gia' rispecchia il consumo di questo frame, come per le monete
      // blu sotto (stesso ordine gia' scelto per stepCoinSpawner()).
      stepSmokeSpawner(buildings, smoke, dt, r12);
      stepSmoke(smoke, dt);
      stepLightning(lightning, dt);
      stepGrowth(buildings, dt, r12, (b) => pedestrians.push(spawnPedestrian(b.x, b.y)));
      stepConsumption(buildings, dt, r12, night);
      stepWeather(r12, dt, scene.name === "match", scene.name === "match_easy");
      stepStormDamage(buildings, dt, r12, (x, y) => lightning.push(spawnLightning(x, y)));
      // Pioggia vera del temporale (game/src/weather.js) — attiva sia sotto
      // il temporale vero di `match` (r12.storm) sia sotto quello cosmetico
      // di `match_easy` (r12.stormeasy): stepRain() la fa cadere o la
      // svuota di scatto a seconda di quale (se uno) e' attivo ORA.
      // [Bug corretto, segnalato dall'autore: "le gocce non coprono tutto lo
      // screen size"] Bordi della camera (`cam.x/y ± cam.worldW/worldH / 2`
      // — lo stesso calcolo di `l/t/rr/bb` usato piu' sotto per il culling
      // di frameList()), non piu' `scene.width/height`: la scena intera
      // puo' essere molto piu' grande dell'area davvero inquadrata in
      // questo istante (camera libera, game/src/camera.js), quindi una
      // striscia di emissione legata alla scena lasciava quasi sempre lo
      // schermo vero poco o per niente coperto — vedi il commento in cima a
      // weather.js.
      {
        const rvw = cam.worldW, rvh = cam.worldH;
        const rl = cam.x - rvw / 2, rt = cam.y - rvh / 2;
        stepRain(weatherState, dt, !!(r12.storm || r12.stormeasy), rl, rl + rvw, rt, rt + rvh);
      }
      // Fuochi d'artificio sopra chies (game/src/fireworks.js) — sempre
      // "in ascolto", scoppiano davvero solo a Gennaio (r12.month === 1,
      // state.js/stepCalendar()).
      if (fireworksState) stepFireworks(fireworksState, dt, r12.month === 1);
      // [Bug corretto, segnalato dall'autore: "avevi inserito popolazione (e
      // forse anche soldi?) che salgono da soli a ogni secondo, rimuoviamolo"]
      // Qui prima girava anche `tickR12()` (state.js, rimossa): una
      // simulazione economica **[I]** placeholder, mai confermata dal
      // decompilato, che ogni secondo faceva crescere `r12.pop` da sola per
      // OGNI edificio senza una vera regola di crescita nota (casa e' gia'
      // simulata per davvero da stepGrowth() sopra, `[C]` da casa1/Alarm_2.gml)
      // e aggiungeva soldi (`r12.mon`) come una tassa continua sulla
      // popolazione — nessuna delle due esiste nel decompilato: i soldi veri
      // arrivano solo da azioni del giocatore (monete raccolte, coins.js) o
      // da meccaniche confermate altrove, mai da un ticchettio automatico.
      // Resta solo `clampR12()` (oil>=0/tetto, crys<=99, ele, mon<=999999,
      // pop>=0 — tutti [C] da r12/Step.gml), che va comunque chiamata ogni
      // frame per applicare quei limiti alla produzione/crescita VERA appena
      // simulata sopra (stepProduction/stepGrowth/stepConsumption/...).
      clampR12(r12, buildings);
      // Sconfitta, l'olio a zero (`outcome` sopra) — SOLO su `match`/
      // `tutorial`, le uniche due room con la piattaforma volante
      // (game/src/platform.js): `r12.oil` e' gia' il valore finale di questo
      // frame qui (clampR12() appena sopra lo ha gia' pavimentato a 0).
      // `motorFreezeT`: il valore di `phaseT` di
      // QUESTO istante, cosi' le turbine di r120 (r120MotorDecor() piu'
      // sotto, nel disegno) smettono di lampeggiare invece di continuare
      // finche' non arriva il buio della cutscene — "i rotori si bloccano",
      // richiesto dall'autore.
      if (!outcome && (roomName === "match" || roomName === "tutorial") && r12.oil <= 0) {
        outcome = { kind: "defeat", reason: "oil", t: 0, motorFreezeT: phaseT };
      }
      stepCalendar(r12, dt);
      stepCars(cars, dt, r12, night);
      carmakerT += dt;
      while (carmakerIdx < CARMAKER_SCHEDULE.length && carmakerT >= CARMAKER_SCHEDULE[carmakerIdx].at) {
        cars.push(spawnCar(CARMAKER_SCHEDULE[carmakerIdx].type, night));
        carmakerIdx++;
      }
      stepLights(decorEntities, dt, night, r12);
      stepTransientDecor(dt);
      stepSemaphores(semaphores, dt);
      stepPedestrians(pedestrians, dt);
      // I pulsanti blu delle monete (game/src/coins.js): casa1|2|3/Alarm_4.gml,
      // dopo che stepConstructions() sopra ha gia' avanzato ava/hap di questo frame.
      stepCoinSpawner(buildings, coins, dt, r12);
      stepCoins(coins, dt, r12);
      if (platformState) {
        const chiesLevel = buildings.find((b) => b.type === "chies")?.level ?? 0;
        stepFaroChain(platformState, r12, balloons, cars, smoke, dt, chiesLevel, night);
      }
      // Raccolta al passaggio del mouse — [C] sold*/soldbio/Mouse_MouseEnter.gml
      // usa davvero un hover, non un click (coins.js, collectCoin() sopra il tap
      // esplicito per touch/desktop): un vero hover pero' esiste solo col mouse
      // fermo, non trascinando col dito (`hoverPointerType`, game/src/input.js) —
      // altrimenti panoramicare la mappa col dito raccoglierebbe monete di
      // striscio, un gesto che l'originale non prevede su touch.
      if (input.hover && input.hoverPointerType === "mouse") {
        const hw = cam.screenToWorld(input.hover.x, input.hover.y);
        for (let i = coins.length - 1; i >= 0; i--) {
          const c = coins[i];
          const f = frameFor(c.spr);
          if (!f) continue;
          const x0 = c.x - f.ox, y0 = c.y - f.oy;
          if (hw.x >= x0 && hw.x <= x0 + f.w && hw.y >= y0 && hw.y <= y0 + f.h) collectCoinAt(c);
        }
        // Casse di risorse (balloons.js): stessa raccolta al passaggio del
        // mouse delle monete sopra — segnalato dall'autore, prima si
        // raccoglievano solo con un tap esplicito.
        for (let i = loot.length - 1; i >= 0; i--) {
          const l = loot[i];
          const f = frameFor(l.spr);
          if (!f) continue;
          const x0 = l.x - f.ox, y0 = l.y - f.oy;
          if (hw.x >= x0 && hw.x <= x0 + f.w && hw.y >= y0 && hw.y <= y0 + f.h) collectLootAt(l);
        }
      }
      for (let i = coinPops.length - 1; i >= 0; i--) {
        coinPops[i].t += dt;
        if (coinPops[i].t >= COIN_POP_LIFE) coinPops.splice(i, 1);
      }
      stepConstructionBalloons(constructionBalloons, constructionBoxes, dt);
      // onLand: [C] mon_box|mon_bbox/Alarm_0.gml crea "smoko" prima di
      // autodistruggersi — vedi il commento in stepConstructionBoxes() (balloons.js).
      stepConstructionBoxes(constructionBoxes, dt, (x, y) => trails.push(spawnSmoko(x, y)));
      // Tutorial (game/src/tutorial.js): la cutscene iniziale gira PRIMA di
      // tutto il resto (avanzamento fasi/freccia restano fermi finche' non
      // finisce, stesso ordine del decompilato — l'HUD nasce distrutto dalla
      // cutscene, torna solo alla fine). `coinCollected` (fase 5->6) si legge
      // qui invece che dentro stepTutorialAuto() perche' dipende da `coins`,
      // non solo da `r12`/`buildings`.
      if (tutorialState) {
        if (tutorialState.cutscene) {
          // Niente piu' `aspect` da passare (STUDIO.md/tutorial.js, il fix
          // sugli aerei "fermi per qualche frame": la posizione in pixel si
          // calcola ora a valle, nel disegno sotto, dove la vera larghezza
          // dello sprite e' gia' nota).
          const cutDone = stepCutscene(tutorialState.cutscene, cutsceneDt, !!platformState);
          // `spawnThreats`/`killDirig` (tutorial.js, sopra stepCutscene()):
          // one-shot alla transizione di fase, "planes"->"black1" e
          // "battle"->"black2" — tutorial.js non conosce `threats` (non e'
          // sua responsabilita' possedere lo stato del mondo), quindi
          // ritorna cosa fare e main.js lo applica qui, PRIMA di
          // stepThreats() (sotto, fuori da questo blocco `if`) cosi' la
          // battaglia appena nata viene gia' animata nello stesso frame in
          // cui nasce. [C] blacker1/Create.gml crea gli stessi tipi che il
          // regista vero (stepThreatSpawner) usa in partita — nessun array
          // a parte, la stessa `threats` di sempre.
          if (tutorialState.cutscene.spawnThreats) threats.push(...tutorialState.cutscene.spawnThreats);
          // [C] blacker2/Create.gml: `with (dirig) { action_kill_object() }`
          // — nessuna esplosione, il decompilato lo fa sparire di scatto
          // (a differenza di una morte vera, spawnDeathEffect() non gira
          // qui): stesso trattamento, un filtro invece di un
          // `action_kill_object()` per istanza.
          if (tutorialState.cutscene.killDirig) threats = threats.filter((th) => th.type !== "dirig");
          if (cutDone) tutorialState.cutscene = null;
        } else {
          if (tutorialState.practiceCoinSpawned && !coins.some((c) => c._tutorialPractice)) {
            tutorialState.coinCollected = true;
          }
          stepTutorialAuto(tutorialState, { r12, buildings });
        }
        // Bottone avanti/esci: nascosto durante la cutscene e nelle fasi ad
        // avanzamento automatico (HIDE_ADVANCE_BUTTON — tutorial_thumb/
        // Step.gml, le stesse 8 fasi gia' viste in stepTutorialAuto()), visibile
        // in tutte le altre — [C] fedele, non si puo' avanzare a mano una fase
        // gameplay-gated.
        tutorialState.showOkButton = !tutorialState.cutscene && !HIDE_ADVANCE_BUTTON.has(tutorialState.phase);
        // [Bug corretto, segnalato dall'autore: "spesso non si capisce come
        // avanzare allo step successivo"] **[I]** Il balloon di testo restava
        // legato a `showOkButton` (nascosto insieme al bottone): proprio nelle
        // 8 fasi gameplay-gated, quelle che chiedono un'azione vera (demolisci
        // quel rudere, seleziona quel bottone, costruisci 5 case...), il
        // giocatore perdeva l'UNICA frase che gliela spiega — restava solo la
        // freccia (quando c'era, vedi il fix su `target` piu' sotto), muta su
        // COSA fare. Testo e bottone ora separati: il testo (l'"obiettivo" da
        // perseguire) resta visibile per l'intera fase, gated o no — solo il
        // bottone "avanti" sparisce quando la fase non si supera a tocco.
        tutorialState.showText = !tutorialState.cutscene;
        if (tutorialState.showText) {
          // Il balloon/bottone non devono coprire la barra azioni sotto
          // (segnalato dall'autore: si sovrapponevano) — `uiButtons` (un
          // frame indietro, ricalcolata piu' sotto: differenza impercettibile,
          // gia' lo stesso principio usato per il picking altrove) da' il
          // bordo superiore VERO della barra, qualunque sia menoo/dispositivo,
          // invece di un margine fisso indovinato. Salvato su `tutorialState`
          // cosi' anche il disegno del balloon/pollice (piu' sotto, layer
          // GUI) puo' riusarlo senza ricalcolarlo. Calcolato per ENTRAMBI
          // (testo/bottone, non solo quest'ultimo) da quando i due si sono
          // separati sopra.
          const barTop = uiButtons.length ? Math.min(...uiButtons.map((b) => b.y)) : canvas.clientHeight - 100;
          tutorialState.uiGap = Math.max(8, canvas.clientHeight - barTop + 10);
        }
      }
      // Minacce vere (game/src/threats.js): il regista fa nascere aerei/
      // bombardieri/zeppelin man mano che le spie ignorate si accumulano
      // (contatori alzati in stepBalloons() sopra), poi ognuno vola, bombarda,
      // e sparisce da solo. `!!platformState`: solo su una room con una
      // piattaforma vera gli `air` possono nascere "di sfondo" (dietro di
      // lei, threats.js/spawnThreat()) — decisione dell'autore.
      // [Bug corretto, richiesto dall'autore: "specifichiamo che da ora in
      // poi i nemici non ci attaccheranno piu'" nel messaggio di vittoria
      // (drawOutcomeOverlay() sopra) — la schermata di vittoria deve dire
      // il vero, non promettere una tregua che poi non arriva] Una volta
      // completato il grattacielo (`victoryShown`, sopra: mai piu' falso
      // per il resto della partita) il regista smette di far nascere nuove
      // minacce vere: quelle gia' in volo in quel momento restano fino a
      // che non se ne vanno da sole (`stepThreats()` sotto, invariato),
      // niente sparizione di scatto a meta' volo.
      if (!victoryShown) stepThreatSpawner(r12, threats, dt, !!platformState);
      stepThreats(threats, bombs, explosions, dt, r12, aerSmoke, debris);
      stepAerSmoke(aerSmoke, dt);
      stepDebris(debris, explosions, dt);
      stepBombs(bombs, explosions, buildings, dt, r12);
      stepExplosions(explosions, dt);
      // Unico controllo per tutte le fonti di danno di questo frame (fulmini,
      // STUDIO.md "le tempeste diventano reali" + bombe appena sganciate sopra).
      for (const b of buildings) {
        if (b.construction || b.life > 0) continue;
        // Sconfitta, `chies` distrutta (`outcome` sopra) — in QUALUNQUE room:
        // e' sempre l'unico esemplare (STUDIO.md §9), a differenza di ogni
        // altro edificio la cui morte (destroyBuilding() sotto, comunque
        // chiamata: diventa un rudere come sempre) non ferma la partita.
        if (b.type === "chies" && !outcome) outcome = { kind: "defeat", reason: "chies", t: 0 };
        destroyBuilding(b);
      }
      if (r12.alertT > 0) r12.alertT -= dt;
      // Torrette (game/src/buildings.js, stepTurretAim): inseguono la
      // minaccia vera piu' vicina (`threats`: aerei/bombardieri/zeppelin,
      // game/src/threats.js), e se nessuna e' in portata si agganciano alla
      // mongolfiera piu' vicina (`balloons`, game/src/balloons.js) invece di
      // restare a riposo — [Bug corretto, richiesto dall'autore] vedi il
      // commento su stepTurretAim() in buildings.js. Le auto decorative
      // (`cars`) restano fuori: non sono un bersaglio, ne' ostile ne'
      // cliccabile.
      stepTurretAim(buildings, threats, balloons);
      // Il fuoco vero (game/src/projectiles.js): dopo la mira, cosi' spara
      // gia' nella direzione appena calcolata (b.aimAngle). Automatico resta
      // SOLO contro minacce vere, mai contro mongolfiere — quelle si
      // abbattono solo col tap manuale sul cannone (fireTurretManual piu'
      // sotto) o un tap diretto sulla mongolfiera stessa.
      stepTurretFire(buildings, threats, dt, projectiles, explosions, r12, trails, beams);
      stepProjectiles(projectiles, balloons, threats, loot, explosions, trails, dt);
      stepBeams(beams, dt);
      stepSmoko(trails, dt);
      if (messageT > 0) messageT -= dt;
    }

    // --- lista di disegno di questo frame: mondo statico (placeholder consumati
    // esclusi) + edifici (sprite ricalcolato: cambia durante il cantiere) + decoro
    const dynamic = [];
    for (const b of buildings) {
      // `eolico` (b.animT, buildings.js/stepWindProduction): "eol" ha 8
      // sottoimmagini vere (le pale che girano), animate in loop invece che
      // ferme al frame 0 — vedi il commento su WIND_ANIM_FPS in buildings.js.
      // Ogni altro edificio resta un fotogramma fisso, come sempre. Il
      // controllo su `b.spr` (non `!b.construction` direttamente) resta lo
      // stesso di stepWindProduction() in buildings.js: "eol" compare solo
      // alla vera fine del cantiere (`revealAtEnd`, BUILDING_TYPES.eolico),
      // quindi qui sono equivalenti — ma il pareggio con lo sprite mostrato
      // resta piu' diretto.
      const windFrames = (b.type === "eolico" && b.spr === BUILDING_TYPES.eolico.construct.finalSprite) ? frameCountFor(b.spr) : 1;
      const buildingFrameIdx = windFrames > 1 ? Math.floor((b.animT ?? 0) * WIND_ANIM_FPS) % windFrames : constructionFrameIdx(b);
      // [I] Segnalato dall'autore: l'edificio scelto per la demolizione/
      // riparazione con la ruspa deve avere tinta rossa per tutta la durata
      // del popup di conferma si'/no (ruspaPending sotto), non solo restare
      // visivamente indistinguibile dagli altri finche' non si tocca "si'".
      // Stesso rosso puro (`_selfLit`, salta la tinta ambientale giorno/
      // notte) gia' usato per l'hover sui lotti-rudere del tutorial — [C]
      // ruin1|2/Mouse_MouseEnter.gml, action_sprite_color(255,1).
      const ruspaTargeted = ruspaPending?.buildingId === b.id;
      dynamic.push({
        obj: "building", ref: b, x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr, buildingFrameIdx),
        ...(ruspaTargeted ? { _tint: 0xff0000, _selfLit: true } : {}),
      });
      // Impalcatura in sovraimpressione + coperchio di fine cantiere (vedi
      // buildings.js): stessa x/y dell'edificio, spinti sopra di lui
      // dall'ordine di inserimento (a parita' di depth+y l'array mantiene
      // l'ordine con cui e' stato costruito, STUDIO.md sopra su sortWorld).
      // [Bug corretto, segnalato dall'autore: "le impalcature del parco non
      // devono avere la sua depth, altrimenti se c'e' un edificio sopra
      // finiscono sotto"] `depth: -b.y` esplicito invece di `depth: b.depth`:
      // l'impalcatura e' un decoro di cantiere come quella di qualunque altro
      // edificio, sempre -y diretto, mai il `fixedDepth` del tipo sotto di
      // lei — anche ora che `b.depth` stesso resta 0 durante il cantiere del
      // parco (def.fixedDepth si applica solo alla vera fine, stepConstructions()
      // in buildings.js: vedi il commento li'), i due finiscono per
      // coincidere, ma solo perche' quel fix a monte lo garantisce, non per
      // costruzione di questa riga — resta esplicito apposta.
      if (b.frontSpr) dynamic.push({ obj: "scaffold", x: b.x, y: b.y, depth: -b.y, _f: frameFor(b.frontSpr) });
      // Impalcatura/gru rotanti del grattacielo (game/src/scaffold.js): decoro
      // puro, si scurisce di notte come ogni altro (nessun `_selfLit`, vedi
      // scaffoldParts()).
      for (const p of scaffoldParts(b)) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr) });
      // Le gru di cantiere (game/src/cranes.js) — stesso principio, decoro
      // puro (nessun `_selfLit`: `gru/grutop/Create.gml` si scuriscono di
      // notte come ogni altro oggetto, STUDIO.md).
      for (const p of craneParts(b)) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr, p.frame) });
      // Il segnale verde di potenziamento (obj: "upsign") — [C] upsign12|23/
      // upcrc12|23/upind12|23, tutti la stessa icona "upico" (un pin verde
      // con una freccia in su): compare quando il potenziamento e' davvero
      // sbloccato (stessa soglia gia' letta da tryStartUpgrade()) e nessun
      // cantiere e' gia' in corso. Depth -9001, un filo piu' avanti delle
      // monete blu (-9000): [C] upsign12/_object.json, sempre in primo piano.
      if (!b.construction && upgradeUnlocked(b, r12, buildings)) {
        // `_selfLit`: come le luci delle finestre (stepLights() sopra), un
        // segnale simbolico dell'interfaccia — deve restare leggibile anche di
        // notte, non scurirsi con la tinta ambientale come un edificio vero.
        dynamic.push({ obj: "upsign", ref: b, x: b.x, y: b.y, depth: UPSIGN_DEPTH, _f: frameFor("upico"), _selfLit: true });
      }
      // L'iconcina prestiti (obj: "bankIcon") — [C] banca1/Create.gml:
      // `action_create_object(bankbuttoner, -50, -40)`, persistente per
      // tutta la vita della banca (mai un cantiere in corso da aspettare:
      // creata insieme all'edificio finito, uccisa insieme a lui —
      // `banca1/Destroy.gml`, qui equivale a non pushare niente quando
      // l'edificio sparisce da `buildings`, nessuna pulizia esplicita
      // serve). Depth -9100, un filo davanti a upsign (-9001): [C]
      // bankbuttoner/_object.json.
      if (b.type === "banca" && !b.construction) {
        dynamic.push({ obj: "bankIcon", ref: b, x: b.x - 50, y: b.y - 40, depth: -9100, _f: frameFor("bancobutt"), _selfLit: true });
      }
      // Popup si'/no della ruspa (ruspaPending, armato da input.onTap sotto)
      // — [C] demobasia/Create.gml: demobachia (annulla, sprite "demoback")
      // offset (16,-16), demoiessa (conferma, "demoyesse") offset (177,-16),
      // disegnaprezzo (il costo, qui il cartellino gia' generico "cN" invece
      // di un font disegnato a runtime — stesso riuso di costTagSprite())
      // offset (157,-185), tutti relativi alla posizione dell'edificio
      // (demobasia stesso nasce li', offset (0,0)). [I] Segnalato dall'autore:
      // a piena grandezza (scale 1) il popup risultava molto piu' grande dei
      // bottoni gia' rimpiccioliti — disegnato a UI_SCALE (sopra, la stessa
      // dei bottoni) con gli offset scalati di conseguenza, altrimenti le tre
      // icone piu' piccole finirebbero staccate l'una dall'altra invece che
      // ravvicinate come nell'originale.
      if (ruspaPending?.buildingId === b.id) {
        dynamic.push({ obj: "ruspaNo", ref: b, x: b.x + 16 * UI_SCALE, y: b.y - 16 * UI_SCALE, depth: UPSIGN_DEPTH, _f: frameFor("demoback"), _selfLit: true, _scale: UI_SCALE });
        dynamic.push({ obj: "ruspaYes", ref: b, x: b.x + 177 * UI_SCALE, y: b.y - 16 * UI_SCALE, depth: UPSIGN_DEPTH, _f: frameFor("demoyesse"), _selfLit: true, _scale: UI_SCALE });
        // [I] Segnalato dall'autore: il cartellino del costo (a differenza dei
        // due bottoni sopra) restava troppo grande su desktop a UI_SCALE
        // (0.7) — ridotto a COST_TAG_SCALE (sopra, vicino a UI_SCALE — la
        // stessa gia' in uso per il cartellino del segnale di potenziamento)
        // mantenendo pero' l'offset a UI_SCALE, cosi' il cartellino piu'
        // piccolo resta comunque ancorato vicino ai due bottoni invece di
        // scostarsi.
        dynamic.push({ obj: "decor", x: b.x + 157 * UI_SCALE, y: b.y - 185 * UI_SCALE, depth: UPSIGN_DEPTH, _f: frameFor(`c${ruspaPending.cost}`), _selfLit: true, _scale: COST_TAG_SCALE });
      }
    }
    for (const d of decorEntities) dynamic.push(d);
    // Ruderi (destroyBuilding() sopra) — sotto ruspa lasciano un placeholder
    // vuoto (clearedPlaceholder(), sopra) — stesso trattamento hover/tinta
    // rossa gia' in uso per i lotti-rudere del tutorial (`ruinLots` sotto),
    // qui esteso a QUALUNQUE room: un rudere da
    // battaglia puo' comparire su `match`/`match_easy` quanto su `tutorial`.
    // [I] Nessun cartellino prezzo all'hover (a differenza del popup ruspa
    // su un edificio vivo, `ruspaPending` sopra): ne' `ruinLot` lo mostra
    // gia' — stesso gap, non nuovo qui. `._f`/`.spr` di un rudere in
    // `clearing` cambiano ogni frame (stepRuinClearing() sopra, sopra
    // stepConstructions()): il tint rosso "tappabile" invece si spegne
    // (`!entry.clearing` sotto) proprio perche' un secondo tap durante il
    // ciclo di impalcature non fa piu' niente (guardia in input.onTap).
    const hoverWorld = input.hover && input.hoverPointerType === "mouse" ? cam.screenToWorld(input.hover.x, input.hover.y) : null;
    for (const ru of ruins) {
      const hovered = !ru.clearing && !!hoverWorld && r12.selec === 11 && ru._f && inFrameRect(hoverWorld.x, hoverWorld.y, ru.x, ru.y, ru._f);
      ru._hovered = hovered;
      dynamic.push({
        obj: "ruin", ref: ru, x: ru.x, y: ru.y, depth: ru.depth, _f: ru._f,
        ...(hovered ? { _tint: 0xff0000, _selfLit: true } : {}),
      });
      // Impalcatura in sovraimpressione + topper/gru del rudere sotto ruspa
      // (stepRuinClearing()/ruinClearUp() sopra) — stesso schema di
      // `b.frontSpr`/scaffoldParts()/craneParts() sui `buildings` veri poco
      // sopra, qui su `ru.frontSpr`/`ru.clearing.fb`.
      if (ru.frontSpr) dynamic.push({ obj: "scaffold", x: ru.x, y: ru.y, depth: -ru.y, _f: frameFor(ru.frontSpr) });
      if (ru.clearing?.fb) for (const p of craneParts(ru.clearing.fb)) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr, p.frame) });
    }
    // Tutorial (game/src/tutorial.js): lotti-rudere (ruin1/ruin2, un
    // meccanismo dedicato — mai le stesse istanze di `ruins` sopra). La
    // cutscene iniziale si disegna a parte, in spazio schermo (vedi sotto,
    // dopo il layer GUI) — copre l'intera canvas per davvero, indipendente
    // da dove punta la camera vera della room.
    if (tutorialState) {
      const hw = hoverWorld;
      for (const lot of ruinLots) {
        const hovered = !lot.clearing && !!hw && r12.selec === 11 && lot._f && inFrameRect(hw.x, hw.y, lot.x, lot.y, lot._f);
        lot._hovered = hovered;
        // [C] ruin1|2/Mouse_MouseEnter.gml: action_sprite_color(255,1) — 255 e'
        // "puro rosso" nel formato colore di GameMaker (R+G*256+B*65536, vedi
        // SCENE_BG_RGB sopra), non bianco: _selfLit qui salta la tinta
        // ambientale, altrimenti di notte il rosso si confonderebbe col resto.
        dynamic.push({
          obj: "ruinLot", ref: lot, x: lot.x, y: lot.y, depth: lot.depth, _f: lot._f,
          ...(hovered ? { _tint: 0xff0000, _selfLit: true } : {}),
        });
        // Impalcatura in sovraimpressione + topper/gru del lotto-rudere sotto
        // ruspa — stesso schema di `ru.frontSpr`/craneParts() sopra su `ruins`.
        if (lot.frontSpr) dynamic.push({ obj: "scaffold", x: lot.x, y: lot.y, depth: -lot.y, _f: frameFor(lot.frontSpr) });
        if (lot.clearing?.fb) for (const p of craneParts(lot.clearing.fb)) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr, p.frame) });
      }
    }
    // Auto decorative (game/src/cars.js): x/y/sprite/frame gia' avanzati da
    // stepCars() sopra — `c.frame` anima per davvero le svolte (STUDIO.md
    // "le auto sterzano davvero"), frameFor() lo ritaglia da solo sull'ultimo
    // frame disponibile per gli sprite a posa singola.
    for (const c of cars) {
      dynamic.push({ obj: "car", x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr, Math.floor(c.frame)), _tint: c.tint });
    }
    // Semafori (game/src/semaphores.js): il palo ("se") e' gia' in
    // staticWorld, qui va solo il tappo colorato quando e' acceso — `spr`
    // resta `null` durante i vuoti fra un colore e l'altro, niente da
    // disegnare in quei frame (a differenza delle luci fisse non c'e'
    // nessuna dissolvenza da animare, l'originale passa a "empty" di
    // scatto). `_selfLit` come le altre luci: un semaforo e' acceso anche
    // di giorno, non deve scurirsi con la tinta ambientale.
    for (const s of semaphores) {
      if (!s.spr) continue;
      dynamic.push({ obj: "semaphore", x: s.x, y: s.y, depth: s.depth, _f: frameFor(s.spr), _selfLit: true });
    }
    // Nuvole e uccelli (game/src/atmosphere.js): x/y spesso ben fuori dai
    // confini della room (nascono appena fuori mappa, gli uccelli molto piu'
    // sotto) — il filtro di frustum culling nel ciclo di disegno piu' sotto
    // li scarta gia' da solo quando non sono in vista, niente da fare qui.
    // Fumo delle centrali (game/src/smoke.js): stessa formula di depth
    // dell'originale (`depth = -y - 150/-200`, smoke_ind/smoke_ind_2 — vedi
    // CHIMNEYS in smoke.js), ricalcolata qui perche' il fumo si sposta (a
    // differenza di monete/segnali, fissi sul loro edificio). L'animazione a
    // 70 frame di cc1/cc2/cc3 gira per davvero (frameIdx), oltre e non invece
    // dell'ingrandimento uniforme (_scale) — vedi smoke.js.
    for (const p of smoke) {
      const frameIdx = Math.min(SMOKE_FRAME_COUNT - 1, Math.floor(p.t / TICK));
      dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: -p.y - p.family, _f: frameFor(p.spr, frameIdx), _scale: p.scale, _alpha: fadeAlpha(p.t, SMOKE_LIFE) });
    }
    // Il fulmine (game/src/lightning.js): il lampo vero (`th1`/`th2` ->
    // `th1s`/`th2s` a meta' vita, depth -y-5 come l'originale) sempre
    // presente finche' vivo, il segno d'impatto (`basediswa_t`, sprite
    // "base" — un disco nero che sfuma in alpha, 30 frame veri) solo per i
    // primi istanti. `_selfLit`: `image_blend` forzato bianco nel
    // decompilato — un moltiplicatore neutro, non lo schiarisce (e' nero),
    // ma lo tiene comunque fuori dalla tinta ambientale come l'originale.
    for (const s of lightning) {
      dynamic.push({ obj: "decor", x: s.x, y: s.y, depth: -s.y - 5, _f: frameFor(boltSprite(s)) });
      if (s.t < LIGHTNING_GLOW_LIFE) {
        const g = glowPosition(s);
        dynamic.push({ obj: "decor", x: g.x, y: g.y, depth: -5, _f: frameFor("base", glowFrame(s)), _scale: 2, _selfLit: true });
      }
    }
    // `_sky: true` (qui e su ogni altra voce dichiaratamente in volo piu'
    // sotto — mongolfiere/minacce/proiettili/fumo aereo): esclude la voce
    // dallo scivolamento verso il basso del crollo per olio esaurito
    // (`oilCrash`/`crashFallY`, frameList() sotto) — [C] r12/Step.gml,
    // "notte_target"/"casca_target" (la citta'/la piattaforma) non
    // includono mai nulla di questo.
    for (const c of atmo.clouds) dynamic.push({ obj: "cloud", x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr), _sky: true });
    for (const b of atmo.birds) dynamic.push({ obj: "bird", x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr), _sky: true });
    // Pedoni (game/src/pedestrians.js): x/y/depth gia' avanzati da
    // stepPedestrians() sopra.
    for (const p of pedestrians) dynamic.push({ obj: "pedestrian", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr) });
    // Mongolfiere (game/src/balloons.js): risorse/spia (obj: "flyingBalloon",
    // cliccabile — un tap la distrugge, vedi picking sotto: richiesto
    // dall'autore, non piu' le torrette da sole) + le casse che lasciano
    // cadere (obj: "loot", vedi picking sotto) + il pacco di cantiere di
    // casa/industria (obj: "balloon" invece — non cliccabile, sta solo
    // portando materiali a un cantiere, non e' un bersaglio).
    for (const b of balloons) dynamic.push({ obj: "flyingBalloon", ref: b, x: b.x, y: b.y, depth: b.depth, _f: frameFor(b.spr), _sky: true });
    for (const l of loot) dynamic.push({ obj: "loot", ref: l, x: l.x, y: l.y, depth: l.depth, _f: frameFor(l.spr), _sky: true });
    // Le monete (game/src/coins.js): "soldfade" anima per davvero (20 frame,
    // stesso schema delle svolte delle auto — frameFor legge il frame vero
    // invece di restare fermo al primo), "soldico" e' statica (un solo frame).
    for (const c of coins) {
      const frameIdx = c.auto ? Math.min(19, Math.floor(c.t / TICK)) : 0;
      // `_selfLit`: stesso motivo di "upsign" sopra — un pulsante simbolico
      // dell'interfaccia, non un oggetto di mondo, deve restare visibile
      // anche di notte invece di scurirsi con la tinta ambientale.
      dynamic.push({ obj: "coin", ref: c, x: c.x, y: c.y, depth: c.depth, _f: frameFor(c.spr, frameIdx), _selfLit: true });
    }
    // Catena fari -> seconda/terza piattaforma (game/src/platform.js): fari,
    // segnali cliccabili (upfaro1/3, wavesig1/3, dockersig1/3) e, a
    // piattaforma espansa, la scenografia fissa di `r32`/`r22`. `_selfLit`
    // solo sui segnali (stesso motivo di "upsign" sopra): i fari veri e la
    // nuova scenografia restano invece soggetti alla tinta giorno/notte come
    // ogni decoro.
    if (platformState) {
      for (const it of faroDecor(platformState, phaseT)) {
        // `it.frame`: solo l'impalcato animato dei ponti levatoi (bridges.js,
        // bridgeDeckFrame()) lo passa, tutto il resto resta al frame 0.
        dynamic.push({ ...it, _f: frameFor(it.spr, it.frame ?? 0), _selfLit: FARO_SIGN_OBJS.has(it.obj) || undefined });
      }
    }
    // [Bug corretto] Le "turbine" di r120 (game/src/platform.js): un
    // lampeggio, non un vero sprite animato — vedi il commento su
    // blinkMotorVisible() li'. Restava annidato dentro `if (platformState)`
    // sopra, ma r120 (con le sue turbine) viene piazzato da
    // applyMatchPlatform() anche su `tutorial` (vedi il commento li' sopra),
    // che pero' NON ha `platformState` (nessuna catena fari, `interactive:
    // false`): le turbine del tutorial restavano quindi ferme per sempre,
    // segnalato dall'autore. Gate corretto: la stessa condizione di
    // applyMatchPlatform() sopra (`match` O `tutorial`), non `platformState`.
    if (roomName === "match" || roomName === "tutorial") {
      // Sconfitta, l'olio a zero (`outcome.motorFreezeT` sopra): le turbine
      // smettono di lampeggiare — congelate al valore di `phaseT` di quando
      // l'olio e' finito, invece di continuare a inseguire l'orologio
      // ambientale (che non si ferma mai, nemmeno a partita persa: guida
      // anche il ciclo giorno/notte, STUDIO.md).
      const motorClockT = outcome?.kind === "defeat" && outcome.reason === "oil" ? outcome.motorFreezeT : phaseT;
      for (const it of r120MotorDecor(motorClockT)) dynamic.push({ ...it, _f: frameFor(it.spr) });
    }
    for (const m of constructionBalloons) dynamic.push({ obj: "balloon", x: m.x, y: m.y, depth: m.depth, _f: frameFor(m.spr) });
    for (const bx of constructionBoxes) dynamic.push({ obj: "decor", x: bx.x, y: bx.y, depth: bx.depth, _f: frameFor(bx.spr) });
    // Minacce vere (game/src/threats.js): nessuna e' cliccabile (nessun
    // evento Mouse nel decompilato), quindi "decor" come il pacco di
    // cantiere — non devono "rubare" il tap. `_scale` (solo per i caccia
    // "di sfondo", STUDIO.md "le minacce vere") e' la stessa `scale` gia'
    // supportata dal renderer per la GUI, qui riusata per la prima volta nel
    // mondo.
    for (const th of threats) dynamic.push({ obj: "decor", x: th.x, y: th.y, depth: th.depth, _f: frameFor(th.spr), _scale: th.scale, _sky: true });
    // [Bug corretto, segnalato dall'autore: "la depth delle bombe sganciate
    // dai nemici spesso e' troppo bassa e sembra che le bombe volino dietro
    // gli edifici"] **[C]** `bomba1/Create.gml`: `depth = -y - 400`, non
    // solo `-y` come ogni altro decoro dinamico (effDepth() in cima al
    // file). I -400 sono un margine "di quota" fisso: mentre cade (~0.5s,
    // BOMB_LIFE sopra) la bomba resta visivamente PIU' vicina alla camera
    // di qualunque edificio alla sua stessa y — coerente con "sta ancora
    // cadendo dal cielo", non ancora atterrata — e viene raggiunta/superata
    // in profondita' da un edificio solo quando la sua vera -y (senza
    // margine) supera quella dell'edificio. Senza il margine (`-bm.y` nudo,
    // come qui prima) la bomba nasce alla y dell'AEREO che l'ha sganciata —
    // quasi sempre MINORE della y di un edificio vicino — quindi per quasi
    // tutta la caduta appariva gia' "dietro" l'edificio invece che sopra di
    // lui, l'esatto difetto segnalato.
    for (const bm of bombs) dynamic.push({ obj: "decor", x: bm.x, y: bm.y, depth: -bm.y - 400, _f: frameFor(bm.spr), _sky: true });
    // Pezzi di fusoliera del bombardiere abbattuto (game/src/threats.js,
    // spawnDebris): puramente cosmetici come le bombe, stessa regola di depth.
    for (const d of debris) dynamic.push({ obj: "decor", x: d.x, y: d.y, depth: -d.y, _f: frameFor(d.spr), _sky: true });
    // Esplosioni (game/src/threats.js): "fica" ha 60 frame veri, uno stop-motion
    // da animare con ex.t (EXPLOSION_FRAME_COUNT) invece del solo frame 0 statico.
    for (const ex of explosions) {
      const frameIdx = Math.min(EXPLOSION_FRAME_COUNT - 1, Math.floor(ex.t / TICK));
      dynamic.push({ obj: "decor", x: ex.x, y: ex.y, depth: -4000, _f: frameFor(ex.spr, frameIdx), _scale: ex.scale, _sky: true });
    }
    // Il fuoco vero (game/src/projectiles.js): i razzi del lanciarazzi e i
    // traccianti del gatling. `p.angle` (solo il gatling, projectiles.js/
    // spawnProjectile()) ruota lo sprite come "image_angle = direction" —
    // vedi `_angle` nel loop del layer mondo sopra.
    for (const p of projectiles) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: -4000, _f: frameFor(p.spr), _angle: p.angle, _sky: true });
    // Fumo di scia (game/src/projectiles.js, spawnSmoko): depth -9000 fisso
    // come le monete blu ([C] smoko/_object.json), ma senza `_selfLit` — un
    // residuo di sparo, non un simbolo dell'interfaccia, si scurisce di
    // notte come qualunque altro decoro.
    for (const p of trails) dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr), _alpha: fadeAlpha(p.t, SMOKO_LIFE), _sky: true });
    // Scia di fumo degli aerei (game/src/threats.js, spawnAerSmoke): stessa
    // animazione a 70 frame vera di smoke.js (cc2/cc3), ferma sul posto e in
    // crescita (_scale) — a differenza della scia dei proiettili sopra.
    for (const p of aerSmoke) {
      const frameIdx = Math.min(AER_SMOKE_FRAME_COUNT - 1, Math.floor(p.t / TICK));
      dynamic.push({ obj: "decor", x: p.x, y: p.y, depth: p.depth, _f: frameFor(p.spr, frameIdx), _scale: p.scale, _alpha: fadeAlpha(p.t, AER_SMOKE_LIFE), _sky: true });
    }
    // Fuochi d'artificio sopra chies a Gennaio (game/src/fireworks.js):
    // scintille colorate — nessuno sprite dedicato, `_tint` sceglie il
    // colore del lanciatore. [Bug corretto, richiesto dall'autore: "le
    // particelle dei fireworks possiamo farle tonde invece che
    // rettangolari?"] Un quad a tinta unita (`solidFrame(white, ...)`, come
    // i flash altrove nel motore) e' sempre un quadrato pieno — sbagliato
    // per una scintilla, che deve leggersi come un puntino. Qui riusa
    // `bubbleTex` (sopra, gia' caricata per la "bolla" delle monete
    // raccolte): lo stesso cerchio morbido, sfumato dal centro al bordo
    // trasparente, invece del quadrato netto.
    if (fireworksState) for (const s of fireworksState.sparks) {
      dynamic.push({
        obj: "decor", x: s.x, y: s.y, depth: FIREWORK_DEPTH,
        _f: { ...solidFrame(bubbleTex, FIREWORK_SPARK_SIZE, FIREWORK_SPARK_SIZE), ox: FIREWORK_SPARK_SIZE / 2, oy: FIREWORK_SPARK_SIZE / 2 },
        _tint: s.tint, _alpha: Math.max(0, 1 - s.t / s.life),
      });
    }
    // Il decoro luce (bagliore delle finestre, STUDIO.md §5.3 "notte_target")
    // non va piu' filtrato qui: `stepLights()` sopra gli tiene un'alpha
    // (`_alpha`, 0 di giorno) che il ciclo di disegno rispetta da solo — a
    // differenza di un filtro binario, cosi' la dissolvenza resta visibile
    // durante la transizione invece di sparire di scatto a meta' fade.
    // [I] Guarisce gli sprite di `staticWorld` ancora `null` perche' la loro
    // pagina "deferred" (game/src/assets.js, tools/23_atlas.py
    // `corePages`) non era ancora arrivata quando `_f` e' stato calcolato
    // una volta sola (i due cicli subito dopo il fetch della scena, molto
    // piu' sopra) — a differenza degli sprite "dynamic" (frameFor()
    // richiamato di nuovo ogni frame qui sopra, si aggiornano gia' da
    // soli), questi non verrebbero mai piu' ritentati altrimenti: un
    // edificio di fascia alta o di livello 2+ resterebbe invisibile per
    // sempre invece di comparire (pop-in) appena la sua pagina arriva.
    for (const it of staticWorld) if (!it._f) it._f = frameFor(it.spr);
    let frameListNext = staticWorld.filter((it) => !(it.obj === "placeholder" && it.consumed)).concat(dynamic);
    // Crollo per olio esaurito (`oilCrash`/`crashFallY`, sopra) — [C] r12/
    // Step.gml: prima il kill istantaneo (`_selfLit` — finestre accese,
    // segnale di potenziamento, bancomat, popup ruspa, semafori, monete: la
    // stessa famiglia "oilzero_target" del decompilato — oltre ad auto/
    // pedoni, `honda*`/`sold*` nel decompilato, mai un `_selfLit` ma
    // comunque nella lista di kill), poi la caduta vera per tutto cio' che
    // resta e non e' `_sky` (nuvole/mongolfiere/minacce/proiettili/fumo
    // aereo, marcati sopra — "notte_target"/"casca_target" non li includono
    // mai). Un solo passaggio invece di muovere davvero ogni entita': `y`/
    // `depth` spostati in blocco alla stessa velocita' per tutti, coerente
    // con l'originale (un'unica gravita' per l'intera citta', non fisiche
    // indipendenti). `depth === 0` (effDepth() sopra: lo traduce da solo in
    // `-y` ogni volta, la maggior parte degli edifici durante il cantiere lo
    // lascia proprio a 0 per questo) va lasciato invariato — la `y` gia'
    // aggiornata basta, effDepth() la rilegge da sola; solo un `depth` GIA'
    // esplicito (`-b.y`/`-4000`/...) va spostato a mano della stessa
    // quantita', altrimenti perderebbe la caduta che effDepth() non gli
    // ricalcolerebbe piu'.
    if (oilCrash) {
      frameListNext = frameListNext
        .filter((it) => !it._selfLit && it.obj !== "car" && it.obj !== "pedestrian")
        .map((it) => {
          if (it._sky) return it;
          const y = it.y + crashFallY;
          return it.depth === 0 ? { ...it, y } : { ...it, y, depth: it.depth - crashFallY };
        });
    }
    frameList = frameListNext.sort(sortWorld);

    // [C] src/objects/placeholder/Create.gml + Mouse_MouseEnter/Leave.gml: il
    // placeholder nasce con sprite "empty" (invisibile) e diventa "phold" (il
    // rombo viola) solo sotto al puntatore, tornando invisibile appena lo
    // lascia — non e' mai visibile stabilmente come lo era nella build
    // precedente (segnalato dall'autore). Il tocco per costruire resta
    // valido ovunque (picking sotto usa sempre `frameList`, indipendente da
    // questo flag): solo il disegno lo rispetta, piu' sotto.
    // [Bug corretto, segnalato dall'autore: "quando e' attivo lo strumento
    // mano le caselle placeholder non devono illuminarsi di viola con
    // l'hovering"] `r12.selec === 0` e' esattamente lo stato "mano"/
    // deselezionato (handbutton, piu' sotto: `{ kind: "deselect", ...
    // r12.selec = 0 }") — nessun edificio da piazzare, quindi il rombo
    // viola (il "qui puoi costruire") non ha piu' senso da mostrare.
    let hoveredPh = null;
    if (input.hover && r12.selec !== 0) {
      const w = cam.screenToWorld(input.hover.x, input.hover.y);
      for (const p of placeholders) {
        if (p.consumed) continue;
        // [Bug corretto] Segnalato dall'autore: un placeholder su un'area di
        // piattaforma NON ANCORA costruita (isPlaceholderActive(), platform.js
        // — r32/r220/r22/r220, finche' la rispettiva catena fari non e'
        // "expanded") non risponde al tocco (placeAt()/armPlacement() sopra
        // gia' lo rifiutano), ma restava comunque disegnato "phold" (il rombo
        // viola) sotto il mouse — un hover che "vola" nel vuoto sopra
        // un'area di mappa dove non c'e' ancora nessuna piattaforma sotto.
        // Stesso gate qui, cosi' un placeholder inattivo non fa mai scattare
        // l'hover, indipendentemente da dove passa il mouse.
        if (!isPlaceholderActive(p.x, p.y, platformState)) continue;
        if (inFrameDiamond(w.x, w.y, p.x, p.y, p._f)) { hoveredPh = p; break; }
      }
    }
    for (const p of placeholders) p._hovered = p === hoveredPh;

    // Anteprima di piazzamento per gli edifici a piu' lotti (eolico/
    // grattacielo, `def.multiTile`) — **[Nuova funzionalita', richiesta
    // dall'autore]**: prima di piazzarli il giocatore non ha modo di sapere
    // dove finira' davvero il centro visivo dell'edificio (l'ancora e' a un
    // offset FISSO dal lotto toccato, non il lotto stesso — vedi il commento
    // su `anchorOffset` in placeAt() sopra) ne' se la posizione e' valida
    // (serve il rombo di 4 lotti adiacenti al tocco, non solo il lotto
    // toccato). Stessa identica logica di placeAt()/
    // findWindCluster() sopra, senza spendere ne' consumare nulla:
    // un fantasma semitrasparente, con lo sprite del PRIMO passo di
    // cantiere dell'edificio (`def.construct.steps[0].spr` — la fondamenta,
    // non l'edificio finito: e' quello che il giocatore vedra' comparire per
    // primo), appare solo quando il lotto sotto il puntatore e' quello che
    // verrebbe davvero toccato (`hoveredPh`, sopra: gia' esclude aree non
    // ancora sulla piattaforma) E il cluster di 4 lotti liberi esiste
    // davvero — sparisce da solo (nessun fantasma "bugiardo") se la
    // posizione non e' valida, invece di sempre mostrarne uno che poi al
    // tocco fallirebbe con un messaggio d'errore.
    let multiTilePreview = null;
    const selDefForPreview = selectedType ? BUILDING_TYPES[selectedType] : null;
    if (hoveredPh && selDefForPreview?.multiTile) {
      const off = selDefForPreview.multiTile.anchorOffset;
      const anchorX = off ? hoveredPh.x + off.dx : hoveredPh.x;
      const anchorY = off ? hoveredPh.y + off.dy : hoveredPh.y;
      const cluster = findWindCluster(hoveredPh);
      if (cluster) {
        const stepSpr = selDefForPreview.construct?.steps?.[0]?.spr;
        const f = stepSpr ? frameFor(stepSpr) : null;
        if (f) multiTilePreview = { x: anchorX, y: anchorY, f };
      }
    }

    // [Bug corretto, segnalato dall'autore: "lo sfondo pesca/scuro deve
    // sostituire il cielo di sfondo, altrimenti non ha senso"] `bauraColorAt()`
    // (sotto, ciclo giorno -> tramonto pesca -> notte -> tramonto -> giorno)
    // prima tingeva SOLO la vignetta fuori dai confini della room (poco
    // sotto) — il "cielo" vero, cioe' il colore di sfondo del canvas dove la
    // room non ha nessuno sprite sopra (`SCENE_BG_RGB`, es. il vuoto sotto/
    // intorno alla piattaforma volante su `match`), restava sempre fisso alla
    // tinta statica di `scene.bgColor`: due sfondi scollegati che non
    // cambiavano insieme. Qui SCENE_BG_RGB resta solo su `match_easy`, dove
    // `baura` non e' mai esistito nel decompilato (vedi il commento su
    // bauraColorAt() sotto).
    const skyRgb = roomParam === "match_easy" ? SCENE_BG_RGB : bauraColorAt(phaseT);
    r.beginFrame(canvas.width, canvas.height, skyRgb);
    const amb = ambientAt(phaseT);

    // --- layer mondo: segue la camera. La tinta giorno/notte e' moltiplicata
    // qui in JS invece che nello shader (u_ambient resta a [1,1,1,1], mai
    // toccato) perche' deve poter essere SALTATA per i decori luce
    // (`_selfLit`, vedi stepLights() sopra): sono l'unica cosa nel mondo che
    // deve restare alla propria luminosita' vera invece di scurirsi con tutto
    // il resto — altrimenti "si accendono" ma restano scure quanto la notte
    // intorno, indistinguibili (il bug segnalato: "le luci non funzionano").
    r.setProjection(cam.projection());
    // Overlay giorno/notte (AURA_OVERLAY sopra) — un quad a tinta unita che
    // copre l'intera room, disegnato PRIMA di ogni sprite del layer mondo cosi'
    // resta sempre dietro. `_selfLit` lo attraversa intatto per lo stesso
    // motivo delle luci (sopra): nessuno qui, il quad stesso non e' un decoro.
    const aura = auraOverlayAt(phaseT);
    if (aura.a > 0.002) {
      const auraTint = (Math.round(aura.rgb[0] * 255) << 16) | (Math.round(aura.rgb[1] * 255) << 8) | Math.round(aura.rgb[2] * 255);
      r.draw(solidFrame(white, scene.width, scene.height), 0, 0, 1, auraTint, aura.a);
    }
    const vw = cam.worldW, vh = cam.worldH;
    const l = cam.x - vw / 2, t = cam.y - vh / 2, rr = l + vw, bb = t + vh;
    for (const it of frameList) {
      if (it.obj === "placeholder" && !it._hovered && !it._armed) continue;
      const f = it._f;
      // Istanze senza sprite: nel decompilato sono esattamente questo, non
      // "arte persa" — controller/collisori invisibili by design
      // (`pepazzittecollider`: sprite:null, visible:0, STUDIO.md "27 istanze
      // in match_easy, mai piu' ricostruite: fanno rimbalzare i pedoni";
      // `scroller`/`scroller2`/`scriptfucker`: idem). Un tempo disegnate come
      // quadratino colorato semitrasparente per "vederle" in sviluppo — ma
      // quel marcatore restava visibile a QUALUNQUE giocatore, sparsi per la
      // mappa come se fossero un edificio/zona segnaposto (segnalato
      // dall'autore: "i rettangolini rossi intorno alla citta'").
      if (!f) continue;
      const x0 = it.x - f.ox, y0 = it.y - f.oy;
      if (x0 > rr || y0 > bb || x0 + f.w < l || y0 + f.h < t) continue;
      const base = (it.obj === "placeholder" && it._armed) ? ARMED_TINT : (it._tint ?? 0xffffff);
      const tint = it._selfLit ? base : mulTint(base, amb.rgb);
      // `_angle` (solo i traccianti del gatling, projectiles.js/main.js
      // sopra — "image_angle pari alla direzione"): drawRotated() invece
      // del draw() allineato agli assi, stesso principio della freccia del
      // tutorial/le gocce di pioggia (drawRotated(), sopra).
      if (it._angle != null) drawRotated(f, it.x, it.y, it._angle, it._scale ?? 1, tint, it._alpha ?? 1);
      else r.draw(f, it.x, it.y, it._scale ?? 1, tint, it._alpha ?? 1);
    }
    // Fantasma di anteprima per eolico/grattacielo (multiTilePreview, sopra):
    // alpha 0.5, nessuna tinta ambientale (come le luci/`_selfLit` sopra —
    // deve leggersi come UN'ANTEPRIMA, non come un pezzo di scena vera che si
    // scurisce di notte) — disegnato per ultimo, sopra a tutto il resto del
    // mondo cosi' non resta mai nascosto da un edificio vicino.
    if (multiTilePreview) {
      r.draw(multiTilePreview.f, multiTilePreview.x, multiTilePreview.y, 1, 0xffffff, 0.5);
    }
    // Pioggia vera del temporale (game/src/weather.js, stepRain() sopra):
    // gocce oblique disegnate come quad sottili ruotati (drawRotated() —
    // niente atlas, `solidFrame` come per ogni altro flash/overlay del
    // motore). Fuori dal ciclo frameList sopra (le gocce non hanno un `_f`
    // da ordinare per depth con il resto — vedi il commento in weather.js
    // su RAIN_DEPTH) ma sempre dentro la proiezione mondo di questo frame,
    // quindi seguono comunque la camera come ogni altro decoro.
    if (weatherState.drops.length) {
      const rainFrame = { ...solidFrame(white, RAIN_STREAK_WIDTH, RAIN_STREAK_LENGTH), ox: RAIN_STREAK_WIDTH / 2, oy: RAIN_STREAK_LENGTH / 2 };
      for (const d of weatherState.drops) drawRotated(rainFrame, d.x, d.y, rainDropAngle(d), 1, RAIN_TINT, RAIN_ALPHA);
    }
    // Le "bolle" di raccolta moneta (coinPops sopra): un cerchio azzurro che
    // cresce e sfuma sul punto della moneta appena presa, in primo piano come
    // le monete stesse — niente tinta ambientale, per lo stesso motivo di
    // `_selfLit` qui sopra. Segnalato dall'autore ("troppo piccola"): la testa
    // del pin "soldico" e' un cerchio di ~60px di diametro (STUDIO.md,
    // coins.js) — la bolla partiva a 20px e finiva a 66px, appena piu' grande
    // dell'icona invece di avvolgerla con margine. Range raddoppiato (36..130).
    for (const p of coinPops) {
      const k = p.t / COIN_POP_LIFE;
      const size = 36 + k * 94;
      r.draw(solidFrame(bubbleTex, size, size), p.x - size / 2, p.y - size / 2, 1, 0x4fc3f7, (1 - k) * 0.85);
    }
    // Linguetta di prezzo sul segnale di potenziamento (upsign) al passaggio
    // del mouse — [C] upsign12|23|45s|45d/Mouse_MouseEnter.gml, vedi
    // costTagSprite() in buildings.js. Solo mouse (come la raccolta monete
    // sopra): il touch non ha un vero hover senza contatto.
    if (input.hover && input.hoverPointerType === "mouse") {
      const hw = cam.screenToWorld(input.hover.x, input.hover.y);
      const upicoFrame = frameFor("upico");
      if (upicoFrame) for (const b of buildings) {
        if (b.construction || !upgradeUnlocked(b, r12, buildings)) continue;
        if (!inFrameRect(hw.x, hw.y, b.x, b.y, upicoFrame)) continue;
        const tagFrame = frameFor(costTagSprite(b.type, b.level - 1));
        if (tagFrame) {
          // [C] upsign12/Mouse_MouseEnter.gml: offset -50 dal segnale — qui
          // dal bordo superiore vero dell'icona "upico" (`upicoFrame.oy`,
          // l'origine e' quasi in basso al centro), non da un numero fisso
          // scollegato dalla sua altezza reale.
          r.draw(tagFrame, b.x - (tagFrame.w * COST_TAG_SCALE) / 2, b.y - upicoFrame.oy - 15, COST_TAG_SCALE, 0xffffff, 1);
        }
        break;
      }
    }
    // Cartellino costo sui lotti-rudere del tutorial (game/src/tutorial.js),
    // stesso schema del segnale di potenziamento sopra — [C] ruin1|2/
    // Mouse_MouseEnter.gml: `action_create_object(cc500|cc2000, 0, -50)`.
    if (tutorialState) for (const lot of ruinLots) {
      if (!lot._hovered) continue;
      const tagFrame = frameFor(`c${lot.cost}`);
      if (tagFrame) r.draw(tagFrame, lot.x - (tagFrame.w * COST_TAG_SCALE) / 2, lot.y - 50, COST_TAG_SCALE, 0xffffff, 1);
      break;
    }
    drawBeams();
    r.flush();

    // --- layer GUI: spazio schermo, dimensione costante, nessuna tinta
    r.setAmbient(1, 1, 1);
    r.setProjection(screenProjection(canvas.clientWidth, canvas.clientHeight));

    // Luminanza di sfondo, calcolata una sola volta per frame qui (non piu'
    // duplicata piu' sotto): decide quando le sagome/il testo NERI della UI
    // vanno ridisegnati bianchi per restare leggibili — sia la barra risorse
    // superiore (icone_oriz/crys_ico/hap1-3, poco sotto: stessa famiglia di
    // pittogrammi neri di crys_ico, vedi il commento li') sia la fila di
    // bottoni in basso (`iconsDark`/`setColorize()`, molto piu' sotto).
    // [Bug corretto, segnalato dall'autore: "quando i pulsanti della GUI
    // diventano bianchi devono diventare bianchi anche quelli della GUI
    // superiore"] Prima solo i bottoni in basso avevano questa protezione:
    // di notte (o dentro la vignetta scura fuori mappa) restavano leggibili
    // ma la barra risorse in alto — stessi pittogrammi neri, stesso sfondo —
    // no. Vedi il commento su ICON_DARK_THRESHOLD (bottoni in basso, sotto)
    // per la soglia/il perche' del minimo fra le due luminanze.
    function luma(rgb) { return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722; }
    const worldLuma = luma(amb.rgb);
    const bauraRgb = roomParam === "match_easy" ? null : bauraColorAt(phaseT);
    const vignetteLuma = bauraRgb ? luma(bauraRgb) : 1;
    const ICON_DARK_THRESHOLD = 0.4;
    const iconsDark = Math.min(worldLuma, vignetteLuma) < ICON_DARK_THRESHOLD;

    // Fuori dai confini della room: vignetta piena invece dei bordi
    // "strappati" del terreno quando lo zoom indietro supera la mappa (il
    // terreno non e' disegnato per essere visto da fuori dai suoi bordi).
    // [Corretto: un oggetto originale dedicato esiste davvero] `baura`
    // (vedi bauraColorAt() sopra) e' esattamente questo: uno sfondo enorme e
    // OPACO, sempre coperto dal terreno DENTRO la room (STUDIO.md, `air2` e'
    // opaco), quindi visibile solo qui — fuori dai suoi confini. L'originale
    // non aveva comunque bisogno di questa vignetta (limite minimo di zoom
    // esplicito su `match`, STUDIO.md §2: la mappa intera non si vedeva mai),
    // quindi non c'e' un secondo oggetto dedicato alla vignetta stessa — solo
    // a cosa mostrare quando la si disegna.
    //
    // Tinta VERA di `baura` (nessuna diluizione verso il bianco), non piu'
    // stemperata: **[Richiesto dall'autore]** la protezione per le icone
    // nere della UI ora e' la loro stessa, sotto (`setColorize()`,
    // `ICON_DARK_THRESHOLD` — vedi il commento li'), quindi lo sfondo qui
    // puo' restare fedele a `baura` invece di doversi tenere chiaro per
    // conto proprio.
    // [Deciso dall'autore, senza motivo specificato: "lo sfondo di match
    // easy lasciamolo bianco"] Su `match_easy` la vignetta resta bianca
    // pura, niente tint — `match`/`tutorial` restano col tint vero di
    // `baura` sopra.
    {
      const vignetteTint = roomParam === "match_easy" ? 0xffffff
        : (Math.round(bauraRgb[0] * 255) << 16) | (Math.round(bauraRgb[1] * 255) << 8) | Math.round(bauraRgb[2] * 255);
      const b = cam.bounds;
      const p0 = cam.worldToScreen(b.left, b.top);
      const p1 = cam.worldToScreen(b.right, b.bottom);
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      if (p0.y > 0) r.draw(solidFrame(white, cw, p0.y), 0, 0, 1, vignetteTint, 1);
      if (p1.y < ch) r.draw(solidFrame(white, cw, ch - p1.y), 0, p1.y, 1, vignetteTint, 1);
      if (p0.x > 0) r.draw(solidFrame(white, p0.x, ch), 0, 0, 1, vignetteTint, 1);
      if (p1.x < cw) r.draw(solidFrame(white, cw - p1.x, ch), p1.x, 0, 1, vignetteTint, 1);
    }

    // "Black-to-fade" del temporale (`thunderclap`/`nitedis`, vedi il
    // commento su stormFlashAlpha() sopra): un solo quad pieno color "nite"
    // sopra l'intera view, in spazio schermo cosi' copre davvero "the view"
    // com'era nel decompilato invece di una sola room (che puo' essere molto
    // piu' grande del viewport). Disegnato qui, insieme alla vignetta fuori
    // mappa: stesso layer GUI, stesso principio (un quad a tinta piena).
    const stormFlash = stormFlashAlpha(r12);
    if (stormFlash > 0.002) {
      r.draw(solidFrame(white, canvas.clientWidth, canvas.clientHeight), 0, 0, 1, STORM_FLASH_TINT, stormFlash);
    }

    // Barra risorse vera (STUDIO.md §9 "GUI vera"). [C] src/objects/repre/
    // DrawGUI.gml: e' un `DrawGUI`, quindi le coordinate sono gia' spazio
    // schermo assoluto — nessuna proiezione da rifare. Un'unica immagine con
    // le icone gia' dentro (`icone_oriz`), non quattro icone separate come
    // nella prima versione: la prima ipotesi era sbagliata. I numeri usano
    // "gotham_mini" — un font diverso da quello del resto della UI, non lo
    // stesso rimpicciolito — ai quattro offset letti nel decompilato: pop 30,
    // olio 142, energia 228, denaro 340, tutti a y=30 (+ `global.upp`, un
    // offset di sicurezza per notch/status-bar non ancora identificato: qui
    // trattato come 0). Colore nero come lo stato "non hover" dell'originale
    // (`action_color(0)`); lo stato hover (testo bianco, sfondo
    // `icone_orizz_hc`) non e' riprodotto — nessun concetto di hover nel
    // nostro input touch-first (STUDIO.md §7).
    // UI_MARGIN: risorse e bottoni non toccano piu' i bordi dello schermo —
    // da soli sarebbero sotto una status bar/notch su mobile o letteralmente
    // il primo pixel della finestra su desktop, non "dentro l'interfaccia"
    // come richiesto. Coordinate sempre arrotondate all'intero: un offset
    // frazionario (es. 8.3px) farebbe ricampionare lo sprite fra due pixel
    // fisici invece di allinearlo esattamente a uno solo — non piu'
    // "pixel perfect" nonostante lo zoom fisso di cui sopra.
    const UI_MARGIN = 8;
    const barFrame = frameFor("icone_oriz");
    const barX = UI_MARGIN, barY = UI_MARGIN;
    // [Nuova disposizione, richiesta dall'autore: "porta il simbolo
    // dell'orologio sulla seconda riga insieme a data/felicita'"] `icone_oriz`
    // cuoce un quinto pittogramma (l'orologio) accodato a pop/olio/energia/
    // denaro nella STESSA immagine — misurato a mano sulla texture: il denaro
    // finisce a x=322 (pixel locali del frame), l'orologio comincia a x=401
    // su 432 totali. CLOCK_CUT_X=395 separa le due meta' (subFrameLeft/
    // subFrameRight sopra) lasciando solo un piccolo margine prima
    // dell'icona, non piu' meta' del vuoto: `barRowFrame` (riga 1, le
    // quattro icone vere) e `clockFrame` (l'orologio isolato, da
    // ridisegnare altrove) invece dell'immagine intera.
    const CLOCK_CUT_X = 395;
    const barRowFrame = barFrame ? subFrameLeft(barFrame, CLOCK_CUT_X) : null;
    const clockFrame = barFrame ? subFrameRight(barFrame, CLOCK_CUT_X) : null;
    // [Bug corretto, segnalato dall'autore: "quando i pulsanti della GUI
    // diventano bianchi devono diventare bianchi anche quelli della GUI
    // superiore"] `icone_oriz` e' la stessa famiglia di pittogrammi neri
    // di `crys_ico`/`hap1`-`hap3` sotto (vedi i commenti li'), quindi va
    // protetta con lo stesso `setColorize(iconsDark)` gia' usato per i
    // bottoni in basso (`iconsDark`, calcolato una sola volta per frame
    // poco sopra) — altrimenti solo la fila di sotto restava leggibile di
    // notte/nella vignetta scura, non la barra risorse. `barTextColor`
    // stessa idea per i numeri: nero su sfondo chiaro come l'originale,
    // bianco quando l'icona diventa bianca — [Bug corretto, segnalato
    // dall'autore: "usa Montserrat anche per la barra risorse in alto, il
    // font li' e' ancora sgranato"] non piu' drawText()/fontMini (l'atlas
    // bitmap "gotham_mini" — vedi il commento su di lui, sopra, per il
    // perche' era rimasto l'unico bitmap: l'autore ora lo vuole comunque
    // sostituito). `drawHtmlText()` (sopra, `align: "left"`) invece: testo
    // HTML vero, nitido a qualunque risoluzione/dpr come ogni altro
    // pannello gia' migrato (menu di pausa/balloon del tutorial) — niente
    // piu' compromesso "pixel perfect ma comunque piccolo" di un atlas
    // bitmap. `barTextColor` come stringa CSS (invece dell'intero
    // `barTextTint` di drawText()): drawHtmlText() imposta `color` diretto
    // sull'elemento, non un tint moltiplicato su una texture.
    const barTextColor = iconsDark ? "#ffffff" : "#000000";
    // [Bug corretto, segnalato dall'autore: "durante la scena del
    // bombardamento nascondi anche i simboli delle risorse, non solo i
    // numeri"] Le icone WebGL della barra (barRowFrame/hapFrame/crysFrame/
    // clockFrame, qui sotto) restano disegnate durante pausa/menu Buildings
    // apposta: fanno gia' parte dello stesso canvas che pauseBlur()/
    // drawBuildMenuOverlay() sfumano/oscurano da soli (vedi il commento su
    // `hideResourceText` sotto). La cutscene iniziale del tutorial e'
    // diversa: la sua fase centrale ("battle", game/src/tutorial.js) non
    // disegna NESSUN velo sopra il mondo — il combattimento vero e' visibile
    // per intero, senza copertura — quindi le icone restavano lì da sole,
    // senza piu' i numeri accanto (gia' nascosti da `hideResourceText`).
    // `hideResourceIcons` copre solo questo caso, non pausa/buildMenuOpen.
    const hideResourceIcons = !!tutorialState?.cutscene;
    r.setColorize(iconsDark);
    if (!hideResourceIcons && barRowFrame) r.draw(barRowFrame, barX, barY, 1, 0xffffff, 1);
    r.setColorize(false);
    // [Bug corretto, segnalato dall'autore: "in pausa le scritte della UI
    // non si blurrano"] Questi numeri sono elementi HTML veri (drawHtmlText(),
    // sopra), non pixel del canvas: pauseBlur.blurScreen() (drawPauseOverlay(),
    // sopra) cattura e sfuma solo il canvas gia' disegnato, quindi qualunque
    // testo HTML resterebbe nitido SOPRA il pannello di pausa invece di
    // sfumarsi con tutto il resto. Le icone WebGL della barra (barRowFrame/
    // hapFrame/crysFrame, sopra/sotto) restano invece disegnate anche in
    // pausa: fanno gia' parte del canvas catturato, si sfumano da sole.
    // [Bug corretto, segnalato dall'autore: "durante la scena iniziale si
    // vedono i numerini delle risorse in alto", stessa cosa per il menu
    // Buildings del mobile] Stesso identico problema anche durante la
    // cutscene del tutorial (tutorialState.cutscene, sotto: disegna un
    // tassello pieno-schermo SOPRA il canvas, ma DOPO che questa barra e'
    // gia' stata accodata — copre `barRowFrame`/hapFrame/crysFrame perche'
    // sono gia' nello stesso canvas, ma non questi elementi HTML separati) e
    // durante drawBuildMenuOverlay() (buildMenuOpen: oscura/sfuma lo stesso
    // canvas ma non puo' toccare il DOM sopra di lui) — in entrambi i casi i
    // numeri nudi restavano leggibili sopra a un fondale che dovrebbe
    // nasconderli. `hideResourceText` raccoglie tutti i casi in cui il resto
    // della barra risorse e' gia' coperto/oscurato da qualcos'altro.
    const hideResourceText = paused || buildMenuOpen || !!tutorialState?.cutscene;
    const stats = [[Math.round(r12.pop), 30], [Math.round(r12.oil), 142],
                   [Math.round(r12.ele), 228], [Math.round(r12.mon), 340]];
    if (!hideResourceText) for (const [value, x] of stats) {
      drawHtmlText(String(value), barX + x, barY + 19, { size: 15, align: "left", color: barTextColor });
    }
    // Data (mese + anno, game/src/state.js stepCalendar()), orologio+ora e
    // faccina della felicita' (subito sotto): [Bug corretto, segnalato
    // dall'autore: "su iPhone la barra risorse compressa per intero e'
    // diventata troppo piccola"] Nell'originale (e in un tentativo precedente
    // di questa porting) stavano sulla STESSA riga di pop/olio/energia/denaro
    // sopra, a x=448..551 — ben oltre la larghezza vera dell'immagine di
    // sfondo (`icone_oriz`, ~450px, data/sprites.json), quindi su un telefono
    // stretto finivano fuori schermo (elementi HTML `position:fixed`, niente
    // wrap automatico). Rimpicciolire l'INTERO blocco con una scala uniforme
    // li faceva rientrare, ma rendeva illeggibili anche pop/olio/energia/
    // denaro, che da soli ci stavano gia' comodi.
    // [Nuova disposizione, richiesta dall'autore: "la seconda riga con
    // data/felicita' solo su mobile — porta li' anche l'orologio — su
    // desktop invece tutto su una riga sola"] Su mobile (isMobile, dove lo
    // spazio orizzontale e' quello stretto che ha causato il problema sopra)
    // restano su una SECONDA riga sotto la barra principale, l'orologio
    // accanto all'ora invece che cotto dentro `icone_oriz` (CLOCK_CUT_X,
    // sopra). Su desktop non c'e' nessun vincolo di larghezza analogo (la
    // barra ha gia' spazio a destra del denaro): si accodano invece sulla
    // STESSA riga 1, un'unica fila come nell'originale.
    // [Bug corretto, segnalato dall'autore: "sulla seconda riga deve
    // esserci l'orologio a sinistra, poi data (mese e anno) uno sopra
    // l'altro a fianco"] Layout precedente: mese sopra, orologio+anno sotto
    // — ordine sbagliato (l'orologio andava a sinistra di ENTRAMBE le righe
    // della data, non solo della seconda). Qui l'orologio e' un'unica icona
    // a sinistra, centrata verticalmente sulle due righe della data (mese
    // sopra, anno sotto — `r12.time` e' l'anno di gioco, game/src/state.js)
    // impilate alla sua destra. Il blocco intero parte comunque da x=90
    // (non dal margine sinistro vero): stessa distanza di sicurezza di
    // prima dal contatore cristalli (barX-6..~85, barY+48 in su —
    // crysFrame/crysText sotto), che altrimenti ci finirebbe sotto.
    const ROW2_Y = barY + 50;
    const ROW2B_Y = ROW2_Y + 20;
    const clockScale = isMobile ? 0.5 : 0.85;
    // [Bug corretto, segnalato dall'autore: "su desktop c'e' troppo gap fra
    // il denaro e orologio/data/faccina, avviciniamoli"] Tutto il blocco
    // orologio/data/faccina/cristalli (clockPos/DATE_COL_X/hapPos/crysPos/
    // crysTextPos, sotto) e' spostato 30px piu' a sinistra rispetto a prima
    // (era x+456/500/552/600/636) — stessa spaziatura RELATIVA fra un
    // elemento e il successivo, solo il blocco intero piu' vicino al denaro
    // (`stats` sopra, l'ultimo finisce a barX+340). Anche col valore piu'
    // lungo plausibile (`r12.mon` — misurato: un numero a 9 cifre e' largo
    // ~75px in Montserrat 15px grassetto, finisce quindi verso x=415)
    // l'orologio (ora a x+426) resta comunque staccato, ~11px di margine.
    const clockPos = isMobile ? { x: barX + 90, y: (ROW2_Y + ROW2B_Y) / 2 - 9 } : { x: barX + 426, y: barY + 8 };
    // [Bug corretto, segnalato dall'autore: "le icone a destra sono
    // disallineate — prima l'orologio (allineato con le altre icone), poi
    // mese e anno incolonnati, poi la faccina (allineata con le altre
    // icone)"] Su desktop mese e anno finivano appaiati sulla STESSA riga
    // (`barY+19` per entrambi) invece che impilati, e mese partiva PRIMA
    // dell'orologio (x=402 contro i 456 dell'orologio, che quindi compariva
    // in mezzo alla data invece che davanti a lei) — l'ordine giusto (vedi
    // sopra, gia' corretto per la seconda riga mobile) non era mai stato
    // applicato alla riga unica desktop. DATE_COL_X sta dopo l'orologio
    // (che a `clockScale` finisce verso x=457, spostato con lui); mese e
    // anno condividono adesso la stessa colonna.
    // [Bug corretto, segnalato dall'autore: "la faccina e' allineata col
    // mese invece che con le altre icone, e l'orologio deve cadere esatto a
    // meta' fra mese e anno"] `drawHtmlText(..., align:"left")` centra
    // verticalmente sul proprio `y` (transform:"translateY(-50%)", sopra),
    // e `r.draw()` (game/src/gl.js) centra un frame su `y - oy*scale +
    // h*scale/2` — con questa formula il VERO centro visivo di ogni
    // elemento e' stato ricalcolato a mano sui dati reali dei frame (data/
    // sprites.json): `clockFrame` (subFrameRight di "icone_oriz", ox=0/oy=0,
    // h=36) a `clockPos.y=barY+8`/scala 0.85 cade a `barY+23.3` — il
    // riferimento comune, dato che l'orologio era gia' segnalato corretto.
    // Mese/anno ora si impilano CENTRATI su quel riferimento (`barY+14`/
    // `barY+32`, stesso passo ~18px di prima ma ricentrato: la loro media
    // torna a combaciare con l'orologio, non piu' `barY+12` come prima).
    const DATE_COL_X = barX + 470;
    const monthPos = isMobile ? { x: barX + 116, y: ROW2_Y } : { x: DATE_COL_X, y: barY + 14 };
    const timePos = isMobile ? { x: barX + 116, y: ROW2B_Y } : { x: DATE_COL_X, y: barY + 32 };
    // `hap1`/`hap3` (data/sprites.json): ox=oy=23=w/2=h/2 esatto, quindi il
    // loro centro visivo coincide SEMPRE con `hapPos.y` stesso qualunque sia
    // la scala — bastava allinearlo allo stesso `barY+23` di sopra (prima
    // era `barY+5`, quasi al livello del solo mese).
    const hapPos = isMobile ? { x: barX + 174, y: (ROW2_Y + ROW2B_Y) / 2 } : { x: barX + 522, y: barY + 23 };
    if (!hideResourceText) {
      drawHtmlText(MONTH_NAMES[(r12.month ?? 1) - 1] ?? "", monthPos.x, monthPos.y, { size: 15, align: "left", color: barTextColor });
    }
    r.setColorize(iconsDark);
    if (!hideResourceIcons && clockFrame) r.draw(clockFrame, clockPos.x, clockPos.y, clockScale, 0xffffff, 1);
    r.setColorize(false);
    if (!hideResourceText) {
      drawHtmlText(String(Math.round(r12.time)), timePos.x, timePos.y, { size: 15, align: "left", color: barTextColor });
    }
    // La "faccina" della felicita' (src/objects/hapware — segnalata
    // dall'autore giocando, non ricordava le sommosse ma "la faccina in GUI
    // che diventa triste quando la felicita' scende sotto una soglia" — la
    // nota precedente su una sommossa con soldati era gia' stata corretta,
    // vedi il commento su BUILDING_TYPES.casa in buildings.js, ma questa
    // faccina non era mai stata letta prima d'ora). **[C]** hapware/Step.gml:
    // `hap3` (sorriso) se `r12.hap>=r12.pop`, `hap1` (broncio) altrimenti —
    // esattamente la stessa soglia gia' usata per bloccare le monete blu
    // (coins.js, stepCoinSpawner: "hap<pop" salta la generazione), quindi
    // "gli edifici non generano piu' soldi" e "la faccina diventa triste"
    // sono gia' la STESSA condizione, solo la seconda meta' (l'icona) mancava.
    // Scala **[C]** diretta da hapware/Create|Step.gml: 0.62 fissa (mai
    // moltiplicata per `global.sca`/UI_SCALE in questo motore, stesso
    // trattamento gia' scelto per la barra risorse — STUDIO.md §9, "zero
    // zoom" sulla UI) su mobile; su desktop (stessa riga di pop/olio/
    // energia/denaro, vedi sopra) leggermente ridotta per starci in altezza.
    const hapFrame = frameFor(r12.hap >= r12.pop ? "hap3" : "hap1");
    const hapScale = isMobile ? 0.62 : 0.55;
    r.setColorize(iconsDark);
    if (!hideResourceIcons && hapFrame) r.draw(hapFrame, hapPos.x, hapPos.y, hapScale, 0xffffff, 1);
    r.setColorize(false);
    // Cristalli (r12.crys: balloons.js, il loot di `monviolo`; platform.js,
    // il gettone lasciato dal monviolo in volo verso il faro) — **[I]**
    // nuovo indicatore, richiesto dall'autore ("nella barra superiore manca
    // un visualizzatore di gemme possedute dal giocatore"): nessun
    // equivalente nel decompilato, `icone_oriz` (l'immagine fissa della
    // barra risorse letta sopra) ha solo le quattro icone originali —
    // pop/olio/energia/denaro sono TUTTO cio' che l'originale mostrava li',
    // i cristalli sono un sistema aggiunto in questo motore (STUDIO.md).
    // [Bug corretto, segnalato dall'autore: "il simbolo delle gemme nella
    // GUI e' sbagliato, dovrebbe essere nero come gli altri"] Prima usava
    // "monviola_bar" — lo sprite viola a colori della cassa/del gettone di
    // cristalli raccolto in mondo (balloons.js/platform.js), fuori posto
    // accanto alle icone monocrome nere di pop/olio/energia/denaro/faccina.
    // "crys_ico" e' invece un'icona romboidale NERA della stessa famiglia
    // dei pittogrammi di `icone_oriz` (stessa area di texture, stesso stile
    // — data/sprites.json la elenca subito prima di "crys_ico_hc", la
    // variante "hover" mai usata in questo motore touch-first, STUDIO.md
    // §7): coerente con le altre, invece di stonare come unica icona
    // colorata della barra.
    // [Bug corretto, segnalato dall'autore: "nascondi icona e contatore
    // finche' il giocatore non raccoglie la prima gemma"] Prima disegnata
    // sempre, mostrando "0" fin dal primissimo frame anche se il giocatore
    // non ha ancora mai visto/raccolto un cristallo — un indicatore per una
    // risorsa che potrebbe non esistere ancora nella sua partita. Stessa
    // soglia (`> 0`) sia per comparire la prima volta sia per sparire di
    // nuovo se torna a zero (es. spesa tutta sui fari, platform.js): nessuno
    // stato "mai raccolta" da tracciare a parte, l'icona segue semplicemente
    // se il giocatore ne possiede almeno una in questo istante.
    // [Bug corretto, richiesto dall'autore: "su desktop c'e' spazio,
    // spostiamo il contatore gemme a destra della faccina, sempre allineato
    // con le altre risorse"] Su mobile resta sotto (`barX-6, barY+48` — la
    // riga scorre gia' stretta con mese/anno/faccina impilati, nessun altro
    // posto dove metterlo); su desktop invece la riga unica di pop/olio/
    // energia/denaro/orologio/data/faccina (sopra) ha gia' spazio libero a
    // destra della faccina — il contatore la segue sulla STESSA riga invece
    // di finire isolato sotto, come ogni altra risorsa qui.
    // [Bug corretto, segnalato dall'autore insieme al resto della riga
    // (vedi il commento su hapPos/monthPos/timePos sopra)] "crys_ico" (data/
    // sprites.json: w=27,h=40,ox=-7,oy=-16) NON e' centrato sul proprio
    // frame come `hap1`/`hap3` — il suo centro visivo (stessa formula di
    // `r.draw()`) cade a `y - oy*scale + h*scale/2 = y + 27` a scala 0.75,
    // quindi per allinearlo allo stesso `barY+23.3` dell'orologio la sua `y`
    // deve stare 27px PIU' IN ALTO, non piu' in basso come prima.
    if (r12.crys > 0) {
      const crysFrame = frameFor("crys_ico");
      const crysPos = isMobile ? { x: barX - 6, y: barY + 48 } : { x: barX + 570, y: barY - 4 };
      const crysScale = isMobile ? 0.9 : 0.75;
      const crysTextPos = isMobile ? { x: barX + 34, y: barY + 77 } : { x: barX + 606, y: barY + 19 };
      r.setColorize(iconsDark);
      if (!hideResourceIcons && crysFrame) r.draw(crysFrame, crysPos.x, crysPos.y, crysScale, 0xffffff, 1);
      r.setColorize(false);
      if (!hideResourceText) drawHtmlText(String(Math.round(r12.crys)), crysTextPos.x, crysTextPos.y, { size: 15, align: "left", color: barTextColor });
    }

    // Selettore edificio: sostituisce la ruota di scelta `cre1..cre4` non
    // ancora ricostruita (STUDIO.md §6/§9), e replica la struttura a tre
    // righe alternate del pannello originale (`menoo`, vedi sopra) invece di
    // mostrarle tutte insieme. `pu1`/`pu2`/... avevano nell'arte originale
    // due sprite, normale e "selezionato" (`pX`/`pXss`, scambiati in base a
    // `r12.selec`) — **[Bug corretto/ottimizzazione, segnalato dall'autore]**
    // misurando le due varianti pixel per pixel (`pXss` non e' un secondo
    // disegno: stessa sagoma esatta di `pX`, IoU 1.0 su tutte le 16 coppie,
    // solo il colore di riempimento cambia) risulta che ERA gia' un tint,
    // solo "cotto" in un secondo raster invece di applicato a runtime — la
    // stessa `setColorize()` gia' usata per le icone nere della UI (sotto)
    // lo riproduce identico da un SOLO sprite per bottone (`b.tint`, sopra in
    // OTHER_BUILDINGS/STAR_BUILDINGS), dimezzando gli sprite da impacchettare
    // per l'intera riga (tools/23_atlas.py, gruppo "gui") senza perdere
    // dettaglio: non c'e' nessun dettaglio in piu' da perdere, sono sagome
    // piatte in tinta unita'. Nell'originale erano ancorati a x fissi
    // (`action_move_to`/`N*global.sca`); qui si accodano da sinistra usando
    // la larghezza vera di ciascuno sprite (`GAP` px fra l'uno e l'altro).
    // `chies` non ha un bottone: non e' un tipo piazzabile (vedi sopra).
    // UI_SCALE: su mobile i bottoni sono piu' piccoli per far stare piu'
    // scroll orizzontale a schermo (STUDIO.md scorrevolezza qui sotto) — 0.6
    // e' il punto in cui ~13 bottoni (il menu "edifici" al completo) stanno
    // in 4-5 schermate di scroll su un telefono stretto (~360-430px)
    // restando comunque sopra i ~44px minimi comunemente raccomandati per un
    // tocco. Su desktop niente vincolo di tocco/scroll, ma alla dimensione
    // vera dello sprite (1) la barra risultava sproporzionata — [I] 0.7 a
    // richiesta, un compromesso fra leggibilita' e ingombro, non letto da
    // nessuna parte nel decompilato (`global.sca` scala l'intera UI
    // originale in un modo che non abbiamo ricostruito, STUDIO.md).
    // (UI_SCALE stessa e' dichiarata a livello di modulo, sopra: il popup
    // della ruspa la riusa anche lui, vedi dynamic.push() piu' su.)
    const baseY = Math.round(canvas.clientHeight - UI_MARGIN);
    // I "tasti costruzione" (menoo 1: casa/industria/...) sono adiacenti,
    // GAP 0 — ogni sprite porta gia' con se' la propria base rettangolare
    // nera fino al bordo del proprio frame (bbox ritagliato sui pixel
    // opachi, tools/23_atlas.py): un GAP positivo apriva una fessura
    // trasparente fra una base e l'altra, spezzando quella che nell'originale
    // e' una sola barra nera continua sotto tutti i bottoni. L'altra riga
    // (menoo 0: mano/gru/ruspa) non sono bottoni di costruzione e resta
    // staccata come prima.
    const GAP = menoo === 1 ? 0 : (isMobile ? 3 : 4);
    const row = menoo === 1
      // menoo 1 "edifici" ([C] pu1/Create.gml li crea tutti insieme): i due
      // veri (casa/industria) + il resto del menu, segnaposto (vedi sopra).
      // `ruspa` esclusa (vedi sotto): non e' un edificio da costruire, non
      // vive piu' qui.
      ? [
          { kind: "building", type: "casa", spr: "p1", tint: 0x114f1f },
          { kind: "building", type: "industria", spr: "p2", tint: 0x603415 },
          ...OTHER_BUILDINGS.filter((b) => b.type !== "ruspa").map((b) => ({ kind: "building", type: b.type, spr: b.spr, tint: b.tint })),
          ...STAR_BUILDINGS.filter((b) => b.unlocked()).map((b) => ({ kind: "building", type: b.type, spr: b.spr, tint: b.tint })),
          { kind: "menu", menoo: 0, spr: "baccc", label: "Back" },
        ]
      // menoo 0 "casa" ([C] handbutton/buildbutton): la riga di partenza.
      // handbutton deseleziona (r12.selec=0); gru apre l'altra riga.
      // [Spostata su richiesta dell'autore, liberato posto qui dalla rimozione
      // del bottone occhio/sottomenu vista] La ruspa non e' un edificio da
      // piazzare come gli altri (STUDIO.md/OTHER_BUILDINGS sopra: e' lo
      // strumento di demolizione, `selec===11`) — vive ora accanto a
      // mano/costruzioni invece che in mezzo agli edifici veri del
      // sottomenu costruzioni, sempre a portata di mano invece che
      // nascosta in fondo a una riga scorrevole. `kind: "building"` resta
      // lo stesso (il tap la seleziona come strumento esattamente come
      // prima, STUDIO.md sopra sul gestore dei tap), solo la riga cambia.
      : [
          { kind: "deselect", spr: "handee", label: "Deselect" },
          { kind: "menu", menoo: 1, spr: "groo", label: "Buildings menu" },
          ...OTHER_BUILDINGS.filter((b) => b.type === "ruspa").map((b) => ({ kind: "building", type: b.type, spr: b.spr, tint: b.tint })),
        ];
    // Prima passata, solo misure: serve la larghezza totale della riga PRIMA
    // di disegnare, per sapere quanto scroll orizzontale ha senso concedere
    // (uiScrollX va sempre bloccato all'intervallo [0, maxScroll] di QUESTA
    // riga, che cambia ad ogni `menoo` — una riga corta non deve poter
    // scorrere via lo scroll accumulato su una riga lunga vista prima).
    const frames = row.map((b) => frameFor(b.spr));
    let rowWidth = 0;
    for (const f of frames) if (f) rowWidth += f.w * UI_SCALE + GAP;
    if (rowWidth > 0) rowWidth -= GAP;
    const visibleW = Math.max(0, canvas.clientWidth - UI_MARGIN * 2);
    const maxScroll = Math.max(0, rowWidth - visibleW);
    uiScrollX = Math.min(Math.max(uiScrollX, 0), maxScroll);

    uiButtons = [];
    let rx = UI_MARGIN - uiScrollX;
    let rowTop = baseY;
    // [Nuova funzionalita', richiesta dall'autore: "le icone nere della UI,
    // quando lo sfondo diventa troppo scuro, rendiamole bianche con un
    // tint"] Queste icone (mano/gru/occhio/edifici non selezionati) sono
    // sagome NERE pure senza sfondo proprio (STUDIO.md, vedi il commento
    // su bauraColorAt() sopra): sul mondo di notte o dentro la vignetta
    // scura fuori mappa (`match`/`tutorial`, baura, ora a tinta piena — vedi
    // sopra) restano leggibili solo per contrasto col resto della scena, mai
    // garantito. Moltiplicare per una tinta piu' chiara non serve a niente
    // su nero puro (0*x=0, vedi Renderer.setColorize() in gl.js) — sotto una
    // soglia di luminanza le disegniamo con `setColorize(true)`: sagoma
    // (alpha) della texture, colore preso da `tint` direttamente invece che
    // moltiplicato. `iconsDark` (sopra, calcolato una sola volta per frame,
    // condiviso con la barra risorse) e' la PIU' SCURA fra due candidati, non
    // solo l'ambient del mondo: la fila di bottoni vive in basso a schermo
    // (`baseY`, vicino al bordo) — con zoom indietro sufficiente su
    // `match`/`tutorial` puo' finire sopra la vignetta invece che sul mondo.
    // Non vale la pena calcolare l'esatta sovrapposizione pixel per pixel:
    // prendere sempre il minimo fra i due (quando la vignetta e' un
    // candidato possibile) e' una scelta prudente, mai sbagliata in difetto
    // — nel peggiore dei casi le icone diventano bianche un frame prima del
    // necessario, mai il contrario. Soglia (0.4) scelta sotto la luminanza
    // della notte "normale" del mondo (~0.74, PHASES sopra: la notte piatta
    // da sola non basta a scurirle) ma sopra quella della tinta piena di
    // `baura` di notte (~0.2, la stessa usata dalla vignetta sopra) — dove
    // il nero puro sparirebbe davvero.
    // I bottoni edificio SELEZIONATI usano lo stesso meccanismo: `b.tint`
    // (OTHER_BUILDINGS/STAR_BUILDINGS/casa/industria, sopra) e' il colore
    // pieno gia' misurato dal vecchio sprite `pXss` — sempre disegnati in
    // colorize mode, INDIPENDENTEMENTE da `iconsDark` (a differenza delle
    // icone nere sotto: qui non e' un aggiustamento di leggibilita' di
    // notte, e' semplicemente COME si disegna un bottone selezionato, di
    // giorno come di notte — `r.setAmbient(1,1,1)` poco sopra rende questo
    // layer GUI comunque immune al ciclo giorno/notte).
    for (let i = 0; i < row.length; i++) {
      const b = row[i], f = frames[i];
      if (!f) continue;
      const w = f.w * UI_SCALE, h = f.h * UI_SCALE;
      // Bottoni scrollati fuori dai due lati non vengono ne' disegnati ne'
      // resi toccabili — stesso principio del culling gia' usato altrove nel
      // motore, qui serve anche a non lasciare hitbox "fantasma" fuori
      // schermo che intercetterebbero un tap sulla mappa sottostante.
      if (rx + w >= 0 && rx <= canvas.clientWidth) {
        // [Bug corretto, richiesto dall'autore: "la mano stessa deve avere
        // una tint blu" quando lo strumento mano e' attivo] Una tinta blu
        // al posto del bianco neutro basta a segnalare "strumento attivo",
        // coerente con `r12.selec === 0` = mano/deselezionato gia' usato
        // sopra per spegnere l'hover viola dei placeholder.
        const usingHandTint = b.kind === "deselect" && r12.selec === 0;
        const usingSelBuilding = b.kind === "building" && selectedType === b.type;
        const tint = usingSelBuilding ? b.tint : (usingHandTint ? 0x66aaff : 0xffffff);
        // [Bug corretto, segnalato dall'autore: "la mano non si colora
        // quando selezionata"] `handee` e' una sagoma nera pura come le
        // altre icone della riga (vedi il commento sopra su
        // `setColorize()`): moltiplicare per `tint` blu non fa niente su
        // nero puro (0*x=0), serve la colorize mode per sostituirlo
        // davvero — non solo quando `iconsDark`, sempre quando la mano e'
        // lo strumento attivo, altrimenti la tint resta invisibile di
        // giorno.
        // `locked`: bottone edificio ancora sotto la soglia di livello
        // chiesa (buildingLocked()/LOCKED_BUTTON_ALPHA, sopra) — disegnato
        // in trasparenza, richiesto dall'autore. **[C]** Il decompilato
        // (pu6|pudj|pugatling|pusolare/Step.gml) non sbiadiva il bottone:
        // restava a piena opacita', sempre con lo sprite "normale" (mai
        // quello "selezionato", l'unico effetto del blocco li'), il tocco
        // semplicemente non faceva niente (Mouse_LeftPressed innestato in
        // `if (unlosei==1)`) e solo l'hover rivelava il requisito (il popup
        // level2*/leve3tounlo* sopra, mai ricostruito qui — nessun hover sul
        // touch, STUDIO.md §7). La trasparenza e' la resa visiva scelta ora
        // al posto di quell'hover per rendere visibile lo stato bloccato
        // anche su schermi touch.
        const locked = b.kind === "building" && buildingLocked(b.type);
        r.setColorize(usingSelBuilding || iconsDark || usingHandTint);
        r.draw(f, rx, baseY, UI_SCALE, tint, locked ? LOCKED_BUTTON_ALPHA : 1);
        uiButtons.push({ x: rx, y: baseY - h, w, h, ...b });
        rowTop = Math.min(rowTop, baseY - h);
      }
      rx += w + GAP;
    }
    r.setColorize(false);
    // [Nuova funzionalita', richiesta dall'autore: "trovare il modo di
    // mostrare l'edificio attualmente selezionato anche in piccolo fuori
    // dalla finestra Buildings"] Su mobile `menoo` resta sempre a 0 (onTap
    // sopra: toccare "groo" apre solo l'overlay a griglia, non passa mai a
    // menoo=1) — la riga appena disegnata quindi non mostra MAI quale tipo
    // e' selezionato in questo momento, a differenza di desktop (dove la
    // riga edifici vera resta a vista con l'evidenziazione di
    // `usingSelBuilding` sopra). Un piccolo badge sul bottone stesso
    // "Buildings menu" colma il buco: una miniatura dell'edificio scelto,
    // sempre visibile anche a finestra chiusa, stesso sprite/tint gia'
    // usati dentro l'overlay (findBuildingIcon(), sopra) — non uno stato
    // duplicato da tenere sincronizzato a parte.
    // [Bug corretto, richiesto dall'autore: "quando la ruspa e' selezionata
    // non mostrare il mini indicatore sopra il pulsante costruzioni"] La
    // ruspa (`selectedType === "ruspa"`) e' uno STRUMENTO (demolizione/
    // riparazione), non un edificio piazzabile come quelli della griglia
    // "Buildings menu" che questo badge riassume — mostrarci sopra la sua
    // icona (rossa, "ru") suggerirebbe che il prossimo tap costruisce una
    // ruspa, non che sta per demolire/riparare qualcosa.
    if (isMobile && selectedType && selectedType !== "ruspa") {
      const menuBtn = uiButtons.find((btn) => btn.kind === "menu" && btn.menoo === 1);
      const icon = menuBtn && findBuildingIcon(selectedType);
      const iconFrame = icon && frameFor(icon.spr);
      if (menuBtn && iconFrame) {
        const badgeD = 26;
        const bx = menuBtn.x + menuBtn.w - 4, by = menuBtn.y + 4;
        // Anello chiaro sottile prima del disco scuro: alcuni tint edificio
        // (`icon.tint`, es. il verde molto scuro di "casa") si confondono
        // altrimenti con la sagoma nera piena dell'icona "groo" proprio
        // sotto — un bordo chiaro separa sempre il badge dal suo sfondo,
        // qualunque sia il colore dell'edificio selezionato in quel momento.
        r.draw(solidFrame(bubbleTex, badgeD + 3, badgeD + 3), bx - (badgeD + 3) / 2, by - (badgeD + 3) / 2, 1, 0xe8eaf0, 0.9);
        r.draw(solidFrame(bubbleTex, badgeD, badgeD), bx - badgeD / 2, by - badgeD / 2, 1, 0x14161c, 0.92);
        const iconScale = Math.min((badgeD - 8) / iconFrame.w, (badgeD - 8) / iconFrame.h);
        r.setColorize(true);
        r.draw(iconFrame, bx - (iconFrame.w * iconScale) / 2, by + (iconFrame.h * iconScale) / 2, iconScale, icon.tint, 1);
        r.setColorize(false);
      }
    }
    // Banda di trascinamento per lo scroll: tutta la larghezza schermo, dal
    // bordo superiore della riga fino in fondo — non solo i pixel dei
    // bottoni, cosi' anche un dito che parte fra due bottoni o dopo l'ultimo
    // (schermo non del tutto riempito) scorre la riga invece di spostare la
    // mappa sotto. Nulla da intercettare se la riga sta gia' tutta a schermo.
    uiRowBounds = (isMobile && maxScroll > 0)
      ? { x0: 0, y0: rowTop, x1: canvas.clientWidth, y1: canvas.clientHeight }
      : null;

    // Linguetta di prezzo (o "Level N to unlock", bottone ancora bloccato —
    // vedi il commento su unlockTagSprite() sopra) sui bottoni edificio al
    // passaggio del mouse — [C] pu1..pumediat/Mouse_MouseEnter.gml. Solo
    // mouse (come la raccolta monete/il segnale di potenziamento sotto): il
    // touch non ha un vero hover senza contatto, e qui coprirebbe comunque
    // il bottone col dito — questa riga scorrevole esiste solo su desktop
    // (isMobile la nasconde sempre dietro drawBuildMenuOverlay() invece,
    // vedi il commento li' per il suo equivalente touch).
    if (input.hover && input.hoverPointerType === "mouse") {
      const hb = uiButtons.find((btn) => btn.kind === "building"
        && input.hover.x >= btn.x && input.hover.x <= btn.x + btn.w
        && input.hover.y >= btn.y && input.hover.y <= btn.y + btn.h);
      const locked = hb && buildingLocked(hb.type);
      const tagFrame = hb && frameFor(locked ? unlockTagSprite(hb.type) : costTagSprite(hb.type, null));
      if (tagFrame) {
        r.draw(tagFrame, hb.x + hb.w / 2 - (tagFrame.w * COST_TAG_SCALE) / 2, hb.y - 8, COST_TAG_SCALE, 0xffffff, 1);
      }
    }

    // Ricalcolata ad ogni frame in cui e' aperto (stessa idea di
    // `uiButtons` sopra): serve gia' fresca a input.onTap per il tap-test,
    // non solo al disegno vero e proprio di drawBuildMenuOverlay() piu'
    // avanti nel frame.
    if (buildMenuOpen) buildMenuButtons = computeBuildMenuButtons();

    // Freccia del tutorial (game/src/tutorial.js — [C]
    // freccia_tutorial/EndStep.gml): la tabella originale punta a coordinate
    // fisse del layout GameMaker, gia' diverso dal selettore ricostruito qui
    // (STUDIO.md, "ricostruita come UI vera in spazio schermo") — **[I]**
    // punta quindi al bottone VERO corrispondente in `uiButtons` (per kind/
    // type), non a un pixel fisso copiato dal decompilato, cosi' resta
    // corretta qualunque sia la riga/lo scroll del menu al momento.
    // `!buildMenuOpen`: l'overlay costruzioni mobile (sopra) e' un blur
    // pieno schermo disegnato PIU' TARDI nel frame (drawBuildMenuOverlay()),
    // sopra a qualunque cosa disegnata qui — freccia/balloon (sotto)
    // resterebbero comunque coperti, quindi tanto vale non disegnarli
    // affatto mentre l'overlay e' aperto invece di sprecare lavoro su
    // qualcosa di invisibile. La freccia ha comunque gia' fatto il suo
    // lavoro guidando fino al bottone "costruzioni" prima che l'overlay si
    // aprisse; la griglia stessa (con tutte le icone visibili in chiaro,
    // piu' il testo della fase che nomina gia' il bottone giusto) resta
    // guida sufficiente da qui in poi.
    if (tutorialState && !tutorialState.cutscene && !buildMenuOpen) {
      tutorialState.arrowFrame = (tutorialState.arrowFrame + dt * 20) % 20;
      const byKind = (pred) => uiButtons.find(pred);
      // [Bug corretto, segnalato dall'autore: "quando l'oggetto da premere
      // non e' in quel menu' consiglia di premere lo strumento indietro
      // (sempre con la freccia indicante) e poi il sottomenu in cui
      // recarsi"] Il bottone bersaglio di una fase vive quasi sempre nel
      // menu' edifici (menoo 1): se il giocatore e' li' la freccia lo punta
      // gia' direttamente; se e' a casa (menoo 0) punta al bottone che apre
      // quel menu' — ma se il giocatore e' in un sottomenu che non contiene
      // NESSUno dei due bottoni, prima la freccia spariva senza indicare
      // nulla. Ultimo anello della catena: "Indietro" (`menoo:0`, presente
      // in OGNI sottomenu diverso da casa) — un passo alla volta verso il
      // bersaglio vero, mai piu' muta su cosa premere.
      const findIndietro = () => byKind((btn) => btn.kind === "menu" && btn.menoo === 0);
      // [Bug corretto, richiesto dall'autore: "se per avanzare serve
      // costruire degli edifici consiglia anche placeholder random una
      // volta cliccato il bottone corretto"] Una volta selezionato il tipo
      // giusto (`selectedType`, sopra) non resta piu' nulla da puntare nel
      // selettore: senza questo la freccia spariva anche qui, lasciando il
      // giocatore a cercare da solo un lotto libero (il rombo viola,
      // "phold") in mezzo alla mappa. Sceglie un lotto libero valido a
      // caso (isPlaceholderActive(), platform.js — mai uno su una parte di
      // piattaforma non ancora costruita) e lo mantiene finche' resta
      // valido, cosi' la freccia non salta da un lotto all'altro ad ogni
      // frame.
      const suggestedPlotTarget = () => {
        const sp = tutorialState.suggestedPlot;
        if (!sp || sp.consumed || !isPlaceholderActive(sp.x, sp.y, platformState)) {
          const free = placeholders.filter((p) => !p.consumed && isPlaceholderActive(p.x, p.y, platformState));
          tutorialState.suggestedPlot = free.length ? free[(Math.random() * free.length) | 0] : null;
        }
        if (!tutorialState.suggestedPlot) return null;
        const s = cam.worldToScreen(tutorialState.suggestedPlot.x, tutorialState.suggestedPlot.y);
        return { x: s.x, y: s.y - ARROW_GAP, angle: 270 };
      };
      // [Bug corretto] La punta della freccia (drawRotated() sopra, dopo il
      // fix del verso di rotazione) finisce esattamente su `target`: senza
      // un margine, puntare al bordo pixel-esatto del bottone (`b.y`)
      // lasciava la punta a contatto diretto — visivamente ancora "appoggiata
      // sopra" invece che sospesa a puntarlo da una distanza visibile, come
      // gli offset fissi (es. "-100") gia' usati dal decompilato per gli
      // altri bersagli. Un margine piccolo ma costante qui, riusato da ogni
      // caso "punta in giu' al bottone sotto".
      const ARROW_GAP = 12;
      const pointAtButton = (b) => b && { x: b.x + b.w / 2, y: b.y - ARROW_GAP, angle: 270 };
      let target = null;   // { x, y, angle }
      switch (tutorialState.phase) {
        // [Aggiornato: la ruspa vive ora in menoo 0 (mano/costruzioni/ruspa),
        // non piu' nel sottomenu costruzioni — vedi il commento su OTHER_
        // BUILDINGS/riga bottoni sopra] Fallback diretto a "Indietro": se il
        // giocatore e' nel sottomenu costruzioni (dove la ruspa non c'e'
        // piu'), la freccia lo riporta subito alla riga di casa, dove la
        // ruspa e' sempre visibile — non serve piu' passare da un secondo
        // sottomenu inesistente.
        case 2: {
          target = pointAtButton(byKind((btn) => btn.kind === "building" && btn.type === "ruspa")
            ?? findIndietro());
          break;
        }
        case 5: {
          if (tutorialState.practiceCoinSpawned) {
            const s = cam.worldToScreen(tutorialState.practiceCoinPos.x, tutorialState.practiceCoinPos.y);
            target = { x: s.x, y: s.y - 100, angle: 270 };
          }
          break;
        }
        // [Bug corretto, segnalato dall'autore: "la freccia punta a caso
        // invece che puntare le monete"] Le tre fasi che parlano di una
        // risorsa specifica della barra in alto (6: denaro appena
        // raccolto, 11: energia/centrali, 24: olio/consumo) puntavano tutte
        // allo stesso bersaglio sbagliato — il CENTRO dell'intero schermo a
        // y=100, un punto nel bel mezzo della mappa di gioco, non vicino
        // alla barra risorse (che vive in alto a sinistra, `barX`/`barY`
        // sotto — dichiarata piu' in basso in questa stessa funzione, dove
        // si disegna la barra vera). Qui invece punta all'icona/numero
        // VERO della risorsa di cui parla il testo di QUELLA fase (stessi
        // offset "pop 30/olio 142/energia 228/denaro 340" gia' letti dal
        // decompilato per disegnare i numeri, sotto), dal basso verso
        // l'alto (`angle:90`, gia' la convenzione per "punta alla barra
        // risorse in alto" — solo le coordinate erano sbagliate).
        case 6: case 11: case 24: {
          const resX = tutorialState.phase === 6 ? 340 : tutorialState.phase === 11 ? 228 : 142;
          target = { x: barX + resX, y: barY + 43, angle: 90 };
          break;
        }
        case 7: {
          target = pointAtButton(byKind((btn) => btn.kind === "deselect") ?? findIndietro());
          break;
        }
        // Fase 9: gia' scelto il tipo "casa" (fase 8), qui manca solo un
        // lotto libero — nessun bottone da puntare, solo il suggerimento
        // sopra.
        // [Bug corretto, segnalato dall'autore: "la freccia che punta i
        // lotti vuoti dovrebbe smettere di comparire quando sto costruendo
        // cio' che viene richiesto per avanzare, anche se c'e' solo il
        // cantiere — posati 5 cantieri non deve continuare a vedersi la
        // freccia sui lotti vuoti"] L'avanzamento vero (stepTutorialAuto(),
        // tutorial.js) aspetta 5 case COMPLETE (`builtAtLevel("casa",1)`,
        // livello 1 — giusto, "population grows" solo a fine cantiere), ma
        // `selectedType` resta "casa" per tutta la fase (si costruisce piu'
        // di un lotto senza riselezionare lo strumento ogni volta, main.js/
        // placeAt() non lo azzera mai da solo): senza questo controllo la
        // freccia continuava a suggerire un lotto libero IN PIU' anche dopo
        // che il giocatore aveva gia' piazzato i 5 cantieri richiesti,
        // finche' l'ultimo non finiva di costruirsi — spingendo a costruirne
        // di piu' del necessario. Qui basta che i 5 esistano GIA', a
        // livello 0 (cantiere) o 1 (appena finita): non oltre, altrimenti
        // le case GIA' in piedi all'avvio del tutorial (livello 2/3,
        // casa2/casa3 — STUDIO.md, stepTutorialAuto() in tutorial.js) le
        // farebbero sparire la freccia subito, PRIMA che il giocatore abbia
        // anche solo iniziato a costruire.
        case 9: {
          target = buildings.filter((b) => b.type === "casa" && b.level <= 1).length >= 5 ? null : suggestedPlotTarget();
          break;
        }
        case 8: case 12: case 16: case 19: {
          const type = tutorialState.phase === 8 ? "casa" : tutorialState.phase === 12 ? "industria"
            : tutorialState.phase === 16 ? "parco" : "missile";
          // 12/16/19 coprono SIA la selezione del tipo SIA il piazzamento
          // vero (a differenza di 8, che avanza gia' alla sola selezione,
          // fase 9 sopra): una volta selezionato il tipo giusto la freccia
          // passa dal bottone al lotto suggerito, invece di restare ferma
          // su un bottone gia' premuto.
          // Stesso fix di fase 9 sopra: 12/16/19 aspettano solo UN nuovo
          // edificio oltre quelli gia' in piedi all'avvio del tutorial
          // (`tutind`/`tutpar`/`tutrl`, createTutorialState() — contati
          // dalla room, STESSO "livello 1" implicito di quei nomi scena,
          // STUDIO.md), quindi appena quello e' piazzato (anche solo il
          // cantiere, livello 0/1 — non gli edifici gia' maturi della room,
          // stesso motivo del filtro `b.level <= 1` in fase 9 sopra) la
          // freccia deve smettere di suggerire un altro lotto.
          const neededCount = { industria: tutorialState.tutind + 1, parco: tutorialState.tutpar + 1, missile: tutorialState.tutrl + 1 }[type];
          const alreadyPlaced = neededCount !== undefined
            && buildings.filter((b) => b.type === type && b.level <= 1).length >= neededCount;
          target = selectedType === type && tutorialState.phase !== 8
            ? (alreadyPlaced ? null : suggestedPlotTarget())
            : pointAtButton(byKind((btn) => btn.kind === "building" && btn.type === type)
                ?? byKind((btn) => btn.kind === "menu" && btn.menoo === 1)
                ?? findIndietro());
          break;
        }
      }
      if (target) {
        const arrowFrame = frameFor("fr_ros", Math.floor(tutorialState.arrowFrame));
        // [Bug corretto, segnalato dall'autore: "la freccia del tutorial
        // dovrebbe diventare bianca quando il resto della GUI diventa
        // bianca di notte"] Stessa protezione gia' usata per la barra
        // risorse/i bottoni in basso (`iconsDark`/`setColorize()`, sopra):
        // senza, il tint 0xffffff qui sotto non basta da solo a schiarire
        // uno sprite scuro (moltiplicare nero per bianco resta nero) —
        // serve la "colorize mode" per sostituirlo davvero con una sagoma
        // piena bianca di notte/nella vignetta scura.
        if (arrowFrame) {
          r.setColorize(iconsDark);
          drawRotated(arrowFrame, target.x, target.y, target.angle, UI_SCALE, 0xffffff, 1);
          r.setColorize(false);
        }
      }
    }
    // Balloon di testo del tutorial — [C] tutorial_square/DrawGUI.gml:
    // `draw_set_alpha(0.7)` + `draw_roundrect_colour_ext(..., 16777215,
    // 16777215, 0)` (un rettangolo BIANCO pieno arrotondato, non nero) poi
    // `draw_set_alpha(1)` + `draw_text_ext_colour(..., 0,0,0,0, 1)` (testo
    // NERO in piena opacita') — lo sfondo arrotondato resta WebGL
    // (tutorialBoxFrame()/makeRoundedRectTexture() sopra, gia' nitido:
    // nessun font coinvolto), il testo e' Montserrat vero invece del font
    // bitmap "gotham_mobile" di prima (drawHtmlText(), sopra — segnalato
    // "sgranato" dall'autore come il menu di pausa). Il testo va disegnato
    // PRIMA di sapere `boxH` (l'HTML va a capo da solo, niente piu'
    // wrapText()/measureText()): lo misura DOPO averlo scritto
    // (`getBoundingClientRect()`), poi riposiziona sia lui che lo sfondo
    // WebGL in base all'altezza vera appena letta.
    // [Bug corretto, segnalato dall'autore: "in pausa le scritte della UI
    // non si blurrano"] Stesso motivo della barra risorse sopra: il testo
    // del balloon e' HTML (drawHtmlText(), sotto), fuori dal canvas che
    // pauseBlur.blurScreen() sfuma — `&& !paused` salta anche lo sfondo
    // WebGL del balloon (tutorialBoxFrame(), sotto), cosi' non resta un
    // riquadro vuoto senza testo mentre il gioco e' in pausa. `&&
    // !buildMenuOpen`: stesso motivo della freccia sopra — l'overlay
    // costruzioni mobile e' un blur pieno schermo disegnato piu' tardi nel
    // frame, il balloon resterebbe comunque coperto (e visibile solo il suo
    // testo HTML, che non passa dal canvas — lo stesso problema del fix "in
    // pausa" qui sopra, stavolta per l'overlay invece del menu di pausa).
    if (tutorialState?.showText && !paused && !buildMenuOpen) {
      const pad = 20;
      // [Bug corretto, segnalato dall'autore: "su mobile il pollice e'
      // gigante e occupa troppo spazio"] Il box usa ora sempre tutta la
      // larghezza — prima riservava spazio a destra per il pollice (tut_ok,
      // disegnato subito sotto) quando visibile, restringendo di molto il
      // testo su schermi stretti. Il pollice si e' spostato SOPRA il box
      // (vedi sotto) invece che di fianco: non serve piu' alcun vuoto qui.
      const boxLeft = 30, boxRight = canvas.clientWidth - 30;
      const textW = boxRight - boxLeft - pad * 2;
      const textEl = drawHtmlText(TUTORIAL_TEXTS[Math.floor(tutorialState.phase)] ?? "", boxLeft + pad, 0,
        { size: 16, maxWidth: textW, wrap: true });
      const boxH = textEl.getBoundingClientRect().height + pad * 2;
      const boxBottom = canvas.clientHeight - tutorialState.uiGap;
      const boxTop = boxBottom - boxH;
      textEl.style.top = `${boxTop + pad}px`;
      r.draw(tutorialBoxFrame(boxRight - boxLeft, boxH), boxLeft, boxTop, 1, 0xffffff, 0.7);
      // Letto subito sotto per agganciare il pollice sopra al box invece che
      // di fianco (stesso bordo destro di prima, solo impilato in verticale).
      tutorialBoxRect = { left: boxLeft, right: boxRight, top: boxTop, bottom: boxBottom };
    }
    // Bottone "avanti/esci" del tutorial: il vero sprite `tut_ok` (STUDIO.md
    // — l'oggetto si chiama `tutorial_thumb`, un pollice in su, non testo
    // "OK") invece dell'HTML segnaposto di prima. `tutorialOkRect` (letto da
    // input.onTap) e' il suo rettangolo schermo di QUESTO frame.
    tutorialOkRect = null;
    // `&& !buildMenuOpen`: stesso motivo di freccia/balloon sopra — resterebbe
    // comunque coperto dall'overlay costruzioni mobile, disegnato piu' tardi
    // nel frame; `tutorialOkRect` resta `null` (sopra), quindi non serve
    // nemmeno bloccare input.onTap a parte per questo caso.
    if (tutorialState?.showOkButton && !buildMenuOpen) {
      // [Bug corretto, segnalato dall'autore: "su mobile il pollice e'
      // gigante e occupa troppo spazio"] Scala 1.3 -> 1: sagoma nativa
      // (45x52), gia' sopra il minimo ~44px comunemente raccomandato per un
      // tocco (h=52) senza restare il singolo elemento piu' vistoso della
      // GUI del tutorial. Spostato SOPRA il box del testo (stesso bordo
      // destro di `tutorialBoxRect`, sopra) invece che di fianco: prima
      // rubava fino a un quarto della larghezza schermo al box su un
      // telefono stretto, ora il box usa tutta la larghezza (vedi sopra) e
      // il pollice sta per conto suo in una riga propria.
      const okScale = 1;
      const okGap = 12;
      const okFrame = frameFor("tut_ok");
      if (okFrame) {
        const w = okFrame.w * okScale, h = okFrame.h * okScale;
        const boxRight = tutorialBoxRect?.right ?? (canvas.clientWidth - 30);
        const boxTop = tutorialBoxRect?.top ?? (canvas.clientHeight - tutorialState.uiGap);
        const x = boxRight - w, y = boxTop - okGap - h;
        // [Bug corretto, segnalato dall'autore: "il pollice in su del
        // tutorial dovrebbe diventare bianco di notte come il resto della
        // GUI"] Stessa protezione di arrowFrame poco sopra e della barra
        // risorse/i bottoni in basso (`iconsDark`/`setColorize()`): `tut_ok`
        // e' una sagoma nera pura come loro, un tint 0xffffff da solo non
        // basta a schiarirla (nero*bianco resta nero).
        r.setColorize(iconsDark);
        r.draw(okFrame, x, y, okScale, 0xffffff, 1);
        r.setColorize(false);
        tutorialOkRect = { x, y, w, h };
      }
    }

    // Avviso "ATTACK INCOMING"/"THUNDERSTORM INCOMING" (src/objects/aincom/
    // tincom) — **[Bug corretto, segnalato dall'autore: "a volte non ci
    // stanno nello schermo"]** Erano i due ultimi banner ancora disegnati
    // come raster a scala 1 (`ainco` 949x59, `tinco` 1370x59 — data/
    // sprites.json): larghi abbastanza da uscire dai bordi su schermi
    // stretti, un limite che nessuna quantita' di margine risolve per un
    // bitmap a dimensione fissa. Sostituiti da testo HTML vero
    // (drawHtmlText(), stesso trattamento gia' scelto per il resto della UI
    // — barra risorse/menu di pausa/balloon del tutorial), sempre al centro
    // schermo come un elemento GUI qualunque (spazio schermo fisso, non
    // mondo): `bannerFontSize()` sotto lo fa anche RESTARE dentro lo
    // schermo, riducendo la dimensione in proporzione alla larghezza
    // disponibile invece di scalare un raster (che sfumerebbe scalando).
    // Stesso lampeggio (mostra/nasconde ogni 0.5s per 4s) di prima — [C]
    // aincom/Create.gml + Alarm_1/2.gml, tincom/Create.gml. `&& !paused`:
    // stesso motivo della barra risorse/del balloon del tutorial piu' sopra
    // — testo HTML vero, fuori dal canvas che pauseBlur.blurScreen() sfuma
    // per il menu di pausa, quindi va saltato del tutto mentre paused e'
    // true invece di restare nitido sopra al resto sfumato.
    function bannerFontSize(text, maxSize) {
      const avail = canvas.clientWidth - 40;
      return Math.max(14, Math.min(maxSize, avail / (text.length * 0.62)));
    }
    if (r12.alertT > 0 && !paused && Math.floor((ALERT_DURATION - r12.alertT) / 0.5) % 2 === 0) {
      const text = "ATTACK INCOMING";
      drawHtmlText(text, canvas.clientWidth / 2, canvas.clientHeight / 2,
        { size: bannerFontSize(text, 48), maxWidth: canvas.clientWidth - 40 });
    }
    if (r12.tincomT > 0 && !paused && Math.floor((TINCOM_DURATION - r12.tincomT) / 0.5) % 2 === 0) {
      const text = "THUNDERSTORM INCOMING";
      drawHtmlText(text, canvas.clientWidth / 2, canvas.clientHeight / 2,
        { size: bannerFontSize(text, 48), maxWidth: canvas.clientWidth - 40 });
    }
    // Il pannello prestiti (bankPanelOpen, state.js LOANS) — vero modale in
    // spazio schermo (vedi il commento su bankPanelOpen piu' sopra per il
    // perche'), disegnato per ultimo cosi' resta sempre sopra a tutto il
    // resto della GUI. `loanscr`/`getlo1..4` hanno gia' l'origine al centro
    // (data/sprites.json), quindi il centro schermo e' gia' il punto giusto.
    // Scala calcolata invece di UI_SCALE fisso: "loanscr"
    // (540x1086) e' grande quanto un'intera view, UI_SCALE (pensata per le
    // iconcine da ~100px del resto della barra) lo lascerebbe enorme o
    // minuscolo a seconda dello schermo — qui si adatta sempre a circa l'85%
    // del piu' piccolo fra larghezza/altezza disponibili.
    bankButtons = [];
    if (bankPanelOpen) {
      const bankScale = Math.min(canvas.clientWidth / 540, canvas.clientHeight / 1086) * 0.85;
      const cx = canvas.clientWidth / 2, cy = canvas.clientHeight / 2;
      const panelFrame = frameFor("loanscr");
      if (panelFrame) r.draw(panelFrame, cx, cy, bankScale, 0xffffff, 1);
      // [I] I quattro bottoni nel decompilato stavano a (270,-200..-50) da
      // `bankbuttoner`, 50px di distanza fra un centro e l'altro — meno dei
      // loro stessi 88px di altezza, quindi si sovrapporrebbero. Qui invece
      // impilati senza sovrapposizioni (110px fra un centro e l'altro,
      // 22px di margine reale) nell'area vuota del pannello fra il titolo
      // e la nota sul tasso.
      // [Bug corretto, segnalato dall'autore: "il primo pulsante va sopra
      // la scritta"] Il blocco era centrato sul centro GEOMETRICO dello
      // sprite "loanscr" (offset 0 = l'origine del disegno, data/
      // sprites.json: origin_y 543 su un canvas 1086 alto) — ma il testo
      // "GET A LOAN"/"20% interest rate" non e' distribuito simmetricamente
      // intorno a quel punto: misurato pixel per pixel sulla texture vera
      // (assets/textures/page_022.png, il frame di "loanscr"), il titolo
      // finisce a y=335 e la nota sul tasso inizia a y=847 nello stesso
      // sistema di coordinate del canvas — il centro VERO dell'area vuota
      // e' quindi a y=(335+847)/2=591, cioe' 48px SOTTO l'origine (543), non
      // sull'origine stessa. Spostando l'intero blocco di +48 (stessa
      // distanza reciproca fra i bottoni, invariata) il primo bottone
      // scende sotto il titolo (47px di margine reale, prima ne aveva 0 —
      // il suo bordo superiore coincideva quasi esattamente col confine
      // dell'area vuota) e l'ultimo resta comunque 47px sopra la nota sul
      // tasso: margini uguali sopra e sotto, non piu' solo "centrato sulla
      // carta" ma centrato su cio' che si vede davvero.
      const BANK_BUTTONS_Y_BIAS = 48;
      const offsets = [-165, -55, 55, 165].map((o) => o + BANK_BUTTONS_Y_BIAS);
      for (let i = 0; i < LOANS.length; i++) {
        const f = frameFor(`getlo${i + 1}`);
        if (!f) continue;
        const bx = cx, by = cy + offsets[i] * bankScale;
        r.draw(f, bx, by, bankScale, 0xffffff, 1);
        bankButtons.push({ x: bx - (f.w * bankScale) / 2, y: by - (f.h * bankScale) / 2, w: f.w * bankScale, h: f.h * bankScale, index: i });
      }
    }
    // Bottone di pausa — sempre presente (l'unico modo di entrare/uscire dal
    // menu di pausa, vedi drawPauseOverlay() sotto e onTap sopra), in basso a
    // destra, ultimo disegnato in questo batch cosi' resta sempre sopra a
    // ogni altro elemento della UI. Nessuno sprite dell'originale (il
    // decompilato non ha una vera pausa, STUDIO.md "playbuttoner" era
    // tutt'altro): un quadrato pieno scuro con un'icona "II", stessi
    // rettangoli pieni gia' usati altrove per elementi puramente nostri
    // (bolla monete, vignetta fuori mappa).
    const PB_SIZE = 48;
    const pbX = canvas.clientWidth - UI_MARGIN - PB_SIZE, pbY = canvas.clientHeight - UI_MARGIN - PB_SIZE;
    pauseBtnRect = { x: pbX, y: pbY, w: PB_SIZE, h: PB_SIZE };
    r.draw(solidFrame(white, PB_SIZE, PB_SIZE), pbX, pbY, 1, 0x1c1c22, 0.72);
    const pbBarW = 6, pbBarH = 20, pbGap = 8;
    const pbBarY = pbY + (PB_SIZE - pbBarH) / 2;
    r.draw(solidFrame(white, pbBarW, pbBarH), pbX + PB_SIZE / 2 - pbGap / 2 - pbBarW, pbBarY, 1, 0xffffff, 0.95);
    r.draw(solidFrame(white, pbBarW, pbBarH), pbX + PB_SIZE / 2 + pbGap / 2, pbBarY, 1, 0xffffff, 0.95);
    r.flush();

    // Menu di pausa: sfuma quello che e' appena stato disegnato (il mondo,
    // congelato — la simulazione sopra non e' avanzata, vedi `if (!paused)`)
    // e ci disegna sopra un pannello con i tre bottoni. Post-processo puro,
    // FUORI dal batch appena chiuso: legge il framebuffer di default con
    // `pauseBlur.blurScreen()` DOPO che tutto il resto e' gia' li' dentro.
    // `outcome` (sopra) ha priorita' sul menu di pausa — coerente con onTap
    // (che gia' intercetta `outcome` prima del bottone di pausa): i due non
    // vanno mai disegnati insieme.
    // `pauseBlurTex` (vedi il commento su di lei, insieme a `paused` piu' in
    // alto) va invalidato esattamente all'INGRESSO in pausa — `wasPaused`
    // rileva quella transizione un frame alla volta, cosi' i tre pannelli
    // sotto (drawPauseOverlay/drawSavingOptionsOverlay/drawConfirmResetOverlay)
    // possono condividere la stessa cattura per tutta la sessione di pausa
    // invece di rifarla ad ogni frame di ognuno.
    if (paused && !wasPaused) pauseBlurTex = null;
    wasPaused = paused;
    if (outcome) drawOutcomeOverlay();
    else if (paused) {
      if (pauseSubmenu === "saving") drawSavingOptionsOverlay();
      else if (pauseSubmenu === "confirmReset") drawConfirmResetOverlay();
      else drawPauseOverlay();
    }
    else if (buildingInfoPanel) drawBuildingInfoPanel();
    else if (buildMenuOpen) drawBuildMenuOverlay();

    // Cutscene iniziale del tutorial (game/src/tutorial.js): disegnata per
    // ultima, sopra a TUTTO il resto (mondo + UI vera) — quattro fasi
    // (`cutscene.phase`, vedi il commento su CUTSCENE_PLANES_DURATION in
    // tutorial.js), non piu' solo il sorvolo:
    //  - "planes": il sorvolo vero e proprio, interamente in spazio
    //    schermo. Il tassello "macerie" (tuto_sfondo) si ripete a tappeto
    //    su tutta la canvas (qualunque risoluzione: copertura piena
    //    garantita, a differenza di una prima versione che lo piazzava a
    //    coordinate mondo fisse), i tre aerei attraversano lo schermo da
    //    bordo a bordo — in PIXEL veri (tutorial.js, il commento su
    //    CUTSCENE_CLIMB_TAN: `p.k`, 0..1, e' l'unica cosa che tutorial.js
    //    traccia, il resto si calcola qui sotto sapendo gia' la vera
    //    larghezza dello sprite).
    //  - "black1"/"black2": **[C]** `blacker1|blacker2/DrawGUI.gml` —
    //    schermo nero pieno (`draw_rectangle(0,0,5000,5000,0)`, qui un
    //    rettangolo grande quanto il canvas basta). [Nuova funzionalita',
    //    richiesta dall'autore] La scritta sopra non e' piu' lo sprite
    //    decompilato ("mfs1"/"mfs11" — Windows/Android, "Mount Fuji
    //    Software presents" — o "mfs2", "NIMBUS"): `setCutsceneText()`
    //    (sopra) mostra testo HTML Montserrat vero, stesso sdoppiamento
    //    cromatico ciano/blu del titolo del menu ma molto piu' intenso
    //    (visibile per tutta la breve durata della fase, non un lampo raro
    //    — vedi il commento li'), "MOUNT FUJI SOFTWARE" (niente "presents")
    //    per "black1", "NIMBUS"/"REDUX" (le stesse due righe del menu
    //    principale) per "black2".
    //  - "battle": NESSUN overlay qui — il mondo, gia' disegnato PRIMA di
    //    questo blocco nello stesso frame, resta interamente visibile: e'
    //    la scena di combattimento vera e propria (bombar/air/dirig,
    //    stepThreats() sopra) direttamente sulla piattaforma, non un
    //    livello a parte.
    if (tutorialState?.cutscene) {
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      const phase = tutorialState.cutscene.phase;
      if (phase === "planes") {
        setCutsceneText(null);
        r.setAmbient(1, 1, 1);
        r.setProjection(screenProjection(cw, ch));
        const bgFrame = frameFor("tuto_sfondo", 0, true);
        if (bgFrame) {
          for (let y = 0; y < ch; y += bgFrame.h) {
            for (let x = 0; x < cw; x += bgFrame.w) r.draw(bgFrame, x, y, 1, 0xffffff, 1);
          }
        }
        for (const p of tutorialState.cutscene.planes) {
          const f = frameFor(p.spr);
          if (!f) continue;
          // [Bug corretto, segnalato dall'autore: "vedo gli aerei fermi per
          // qualche frame quando parte il livello"] `x` va da
          // COMPLETAMENTE fuori schermo a sinistra (bordo destro dello
          // sprite esattamente a x=0, k=0) a COMPLETAMENTE fuori schermo a
          // destra (bordo sinistro esattamente a x=cw, k=1) — usa la vera
          // larghezza in pixel dello sprite appena letta (`f.w`), non piu'
          // una frazione fissa dello schermo (tutorial.js, il commento su
          // CUTSCENE_CLIMB_TAN spiega perche' quella frazione non bastava:
          // `tuto_bomb` da solo e' largo 716px, piu' del margine di
          // qualunque schermo tranne i piu' larghi). `travelPx` e' la
          // stessa distanza usata sotto per la salita in diagonale, cosi'
          // le due restano coerenti fra loro.
          const travelPx = cw + f.w;
          const x = -f.w + p.k * travelPx;
          // y: sale in diagonale a CUTSCENE_CLIMB_TAN (tutorial.js, ~18°)
          // calcolato in pixel VERI dallo stesso `travelPx` — l'angolo a
          // schermo e' quindi sempre esattamente quello, qualunque sia la
          // forma della finestra, senza bisogno di un `aspect` passato da
          // fuori (STUDIO.md: prima veniva ricavato dal rapporto cw/ch
          // proprio per ottenere lo stesso risultato in frazioni — lavorare
          // gia' in pixel lo rende diretto).
          const y = p.yFrac * ch - p.k * travelPx * CUTSCENE_CLIMB_TAN;
          r.draw(f, x, y, 1, 0xffffff, 1);
        }
        r.flush();
      } else if (phase === "black1" || phase === "black2") {
        r.setAmbient(1, 1, 1);
        r.setProjection(screenProjection(cw, ch));
        r.draw(solidFrame(white, cw, ch), 0, 0, 1, 0x000000, 1);
        r.flush();
        setCutsceneText(phase === "black1" ? "mfs1" : "mfs2");
      } else {
        setCutsceneText(null);   // "battle": nessun velo, testo nascosto
      }
    } else {
      setCutsceneText(null);
    }

    // Icona "salvataggio in corso" (saveIconT/showSaveIcon(), sopra) —
    // ultimo layer disegnato, sopra ANCHE al menu di pausa/fine partita (non
    // solo al mondo): stepAutosave() (sopra) gira SEMPRE, anche a
    // simulazione ferma (`paused`, come `outcome.t` poco sopra) — un
    // autosalvataggio che scatta proprio mentre il menu di pausa e' aperto
    // deve restare visibile, non sparire sotto lo sfumato/pannello appena
    // disegnato sopra di lui.
    // Angolo in alto a destra, lontano dalla barra risorse (in alto a
    // sinistra, gia' stretta su schermi piccoli — STUDIO.md, il denaro si
    // taglia gia' al bordo su alcuni telefoni) cosi' non la sovrappone mai.
    if (saveIconT !== null) {
      const cw = canvas.clientWidth, ch = canvas.clientHeight;
      r.setAmbient(1, 1, 1);
      r.setProjection(screenProjection(cw, ch));
      const frameIdx = Math.floor((saveIconT / SAVE_ICON_DURATION) * 60) % 30;
      const f = frameFor("savicona", frameIdx);
      if (f) r.draw(f, cw - UI_MARGIN - f.w, UI_MARGIN, 1, 0xffffff, 1);
      r.flush();
    }

    // Nasconde ogni elemento del pool di testo HTML (drawHtmlText(), sopra)
    // non riusato in QUESTO frame — sia il caso comune (fuori pausa/
    // tutorial: nessuno dei due pannelli chiama drawHtmlText(), tutto il
    // pool va nascosto) sia il passaggio da un pannello piu' affollato a
    // uno con meno righe (es. "saving options" -> pausa principale).
    hideUnusedText();

    requestAnimationFrame(frame);
    } catch (err) {
      console.error("nimbus: errore nel ciclo di frame di match, torno al menu", err);
      stopped = true;
      navigate("menu");
    }
  }
  requestAnimationFrame(frame);

  // aggancio di debug, comodo per ispezionare senza aspettare il ciclo
  window.__nimbus = {
    cam, scene, get world() { return frameList; }, get buildings() { return buildings; }, get r12() { return r12; },
    get drawCalls() { return r.drawCalls; },
    get uiButtons() { return uiButtons; }, get cars() { return cars; }, semaphores, isMobile,
    get tutorialState() { return tutorialState; }, get tutorialOkRect() { return tutorialOkRect; },
    get paused() { return paused; }, setPaused: (v) => { paused = v; }, get pauseBtnRect() { return pauseBtnRect; },
    get pauseMenuButtons() { return pauseMenuButtons; },
    get pauseSubmenu() { return pauseSubmenu; }, setPauseSubmenu: (v) => { pauseSubmenu = v; },
    get autosave() { return autosave; }, get autosaveT() { return autosaveT; }, setAutosaveT: (t) => { autosaveT = t; },
    get saveIconT() { return saveIconT; }, showSaveIcon,
    setSaveIconT: (v) => { saveIconT = v; },
    get uiScrollX() { return uiScrollX; }, setUiScrollX: (x) => { uiScrollX = x; },
    get carmakerT() { return carmakerT; }, setCarmakerT: (t) => { carmakerT = t; },
    atmo, get pedestrians() { return pedestrians; },
    get balloons() { return balloons; }, get loot() { return loot; }, get coins() { return coins; },
    get coinPops() { return coinPops; },
    get constructionBalloons() { return constructionBalloons; }, get constructionBoxes() { return constructionBoxes; },
    get threats() { return threats; }, get bombs() { return bombs; }, get explosions() { return explosions; },
    get projectiles() { return projectiles; }, get smoke() { return smoke; }, get trails() { return trails; },
    get lightning() { return lightning; }, get weatherState() { return weatherState; },
    get fireworksState() { return fireworksState; },
    get beams() { return beams; },
    get aerSmoke() { return aerSmoke; }, get debris() { return debris; }, get ruins() { return ruins; },
    get blockedSlots() { return blockedSlots; }, get placeholders() { return placeholders; },
    get armedPlacement() { return armedPlacement; }, get selectedType() { return selectedType; }, get message() { return message; },
    get bankPanelOpen() { return bankPanelOpen; }, setBankPanelOpen: (v) => { bankPanelOpen = v; },
    // Fine partita (`outcome` sopra) — comodo per testare le tre condizioni
    // senza aspettare che l'olio scenda a zero per davvero o costruire un
    // grattacielo da 200000 mon: `forceDefeat("oil"|"chies")`/`forceVictory()`
    // impostano lo stesso stato che il gioco raggiungerebbe da solo.
    get outcome() { return outcome; }, get outcomeButtons() { return outcomeButtons; },
    forceDefeat: (reason) => { outcome = { kind: "defeat", reason, t: 0, motorFreezeT: phaseT }; },
    forceVictory: () => { victoryShown = true; outcome = { kind: "victory", t: 0 }; },
    clearOutcome: () => { outcome = null; },
    get bankButtons() { return bankButtons; },
    setPhase: (t) => { phaseT = t; },
    phases: PHASES,
    save: doSave, load: doLoad,
    get platformState() { return platformState; },
  };

  return {
    dispose() {
      stopped = true;
      window.removeEventListener("keydown", onKeydown);
      delete window.__nimbus;
      // Pool di testo HTML del menu di pausa/il balloon del tutorial
      // (textPool/drawHtmlText(), sopra) — stesso principio di msgEl/
      // loadFileBtn in title.js: nodi DOM creati da questo mount, tocca a
      // lui toglierli, altrimenti rientrare in questa stessa room piu'
      // volte nella sessione (SPA, game/src/app.js) li accumulerebbe.
      for (const el of textPool) el.remove();
      cutsceneTextWrap.remove();
    },
  };
}
