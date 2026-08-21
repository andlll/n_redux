// I ponti levatoi di `match` — [C] bridge_des/bridge_sin (creati da
// dockersig1/Alarm_4.gml, seconda piattaforma) + bridge_des2 (creato da
// dockersig3/Alarm_4.gml, terza piattaforma). Tutti e tre condividono la
// STESSA catena di alarm (Create -> Alarm_0 apre -> Alarm_2 completa
// l'apertura -> Alarm_1 richiude -> Alarm_3 completa la chiusura, loop):
//
//   Create:   arma alarm(D, 0)                      — D = durata "chiuso"
//   Alarm_0:  inizia l'apertura (frame 5->0, ~24 tic); uccide il traffico
//             del ponte; arma alarm(1800, 1) e alarm(24, 2)
//   Alarm_2:  apertura completa (frame 0 fisso) — bridge_des2 qui tenta
//             anche la nave cargo (1/10, vedi sotto)
//   Alarm_1:  inizia la chiusura (frame 0->5, ~30 tic); riarma alarm(3600,0)
//             e alarm(30, 3)
//   Alarm_3:  chiusura completa (frame 5 fisso); fa ripartire il traffico
//
// bridge_des2 e' l'unico a due battenti (`bridge_des2_sin`/`_des`, le due
// meta' che restano sollevate — sprite "bridr1_sin"/"bridr1_des" — mentre
// il ponte "base" sparisce del tutto, `action_sprite_set(empty2, 0, 0)`)
// invece di restare un solo impalcato animato come bridge_des/bridge_sin.
// **Scambiata per codice morto in una sessione precedente**: `cargomaker`
// (il selettore a dado fra le 4 navi) veniva creato solo da qui, e senza
// aver ancora letto la catena fari->piattaforme sembrava "mai piazzato in
// nessuna room" — in realta' e' innescato a runtime, non da un'istanza
// statica.
import { spawnCar } from "./cars.js";

const OPEN_ANIM_TICKS = 24;          // [C] Alarm_0 -> Alarm_2
const OPEN_HOLD_TICKS = 1800 - 24;   // [C] Alarm_0 -> Alarm_1, meno i 24 gia' contati sopra
const CLOSE_ANIM_TICKS = 30;         // [C] Alarm_1 -> Alarm_3
const CLOSED_TICKS = 3600;           // [C] Alarm_1 riarma Alarm_0 dopo 3600 tick
const DECK_FRAMES = 5;               // [C] "bridr1mo"/"brid1mo": 6 frame, 0..5

export function createBridgeState(firstClosedTicks = CLOSED_TICKS) {
  return { phase: "closed", t: 0, closedTicks: firstClosedTicks };
}

function killTypes(cars, prefixes) {
  for (let i = cars.length - 1; i >= 0; i--) {
    if (prefixes.some((p) => cars[i].type.startsWith(p))) cars.splice(i, 1);
  }
}

function pickWeighted(options) {
  const r = Math.random();
  let acc = 0;
  for (const o of options) { acc += o.w; if (r < acc) return o.type; }
  return options[options.length - 1].type;
}

// [C] honda_br1/Create.gml: dice(2) -> br11, altrimenti dice(3) -> br12,
// altrimenti dice(4) -> br13, altrimenti resta br1 — pesi equivalenti letti
// come probabilita' congiunte (STUDIO.md, cars.js). Stesso schema per le
// altre tre famiglie.
const BR_FAMILY_1 = [
  { type: "honda_br11", w: 1 / 2 }, { type: "honda_br12", w: 1 / 6 },
  { type: "honda_br13", w: 1 / 12 }, { type: "honda_br1", w: 1 / 4 },
];
const BR_FAMILY_2 = [
  { type: "honda_br21", w: 1 / 2 }, { type: "honda_br22", w: 1 / 6 }, { type: "honda_br2", w: 1 / 3 },
];
const BRR_FAMILY_1 = [
  { type: "honda_brr11", w: 1 / 2 }, { type: "honda_brr12", w: 1 / 4 }, { type: "honda_brr1", w: 1 / 4 },
];
const BRR_FAMILY_2 = [
  { type: "honda_brr21", w: 1 / 2 }, { type: "honda_brr2", w: 1 / 2 },
];

// Configurazione per bridge — [C] Alarm_3/4 di ciascun ponte.
export const BRIDGE_DES_CONFIG = { killPrefixes: ["honda_br1", "honda_br2"], families: [BR_FAMILY_1, BR_FAMILY_2] };
export const BRIDGE_SIN_CONFIG = { killPrefixes: ["honda_bl1"], families: [[{ type: "honda_bl1", w: 1 }]] };
export const BRIDGE_DES2_CONFIG = { killPrefixes: ["honda_brr1", "honda_brr2"], families: [BRR_FAMILY_1, BRR_FAMILY_2] };

/** Avanza la macchina a stati di un ponte — chiamata ogni frame. `onOpen`
 * (opzionale): richiamata una sola volta, appena il ponte finisce di
 * aprirsi (solo bridge_des2 la usa, per la nave — vedi maybeSpawnShip()). */
export function stepBridge(state, dt, cars, night, config, onOpen) {
  state.t += dt * 60;
  if (state.phase === "closed" && state.t >= state.closedTicks) {
    state.phase = "opening";
    state.t = 0;
    killTypes(cars, config.killPrefixes);
  } else if (state.phase === "opening" && state.t >= OPEN_ANIM_TICKS) {
    state.phase = "open";
    state.t = 0;
    onOpen?.();
  } else if (state.phase === "open" && state.t >= OPEN_HOLD_TICKS) {
    state.phase = "closing";
    state.t = 0;
  } else if (state.phase === "closing" && state.t >= CLOSE_ANIM_TICKS) {
    state.phase = "closed";
    state.t = 0;
    state.closedTicks = CLOSED_TICKS;
    for (const fam of config.families) cars.push(spawnCar(pickWeighted(fam), night));
  }
}

/** Frame (0..5, non intero) dell'impalcato animato — arrotondare prima di
 * passarlo a frameFor(). 5 = chiuso, 0 = aperto. */
export function bridgeDeckFrame(state) {
  if (state.phase === "opening") return Math.max(0, DECK_FRAMES - (state.t / OPEN_ANIM_TICKS) * DECK_FRAMES);
  if (state.phase === "open") return 0;
  if (state.phase === "closing") return Math.min(DECK_FRAMES, (state.t / CLOSE_ANIM_TICKS) * DECK_FRAMES);
  return DECK_FRAMES;
}
/** [C] bridge_des_over|bridge_sin_over: visibile solo a ponte chiuso —
 * sparisce insieme all'impalcato per tutta la durata dell'apertura. */
export function bridgeOverVisible(state) { return state.phase === "closed"; }
/** [C] bridge_des2/Alarm_2: solo lei apre "a battenti" — le due meta'
 * sollevate restano visibili SOLO a ponte gia' completamente aperto. */
export function bridgeGapOpen(state) { return state.phase === "open"; }

// ---------------------------------------------------------------- nave cargo
// [C] cargomaker/Step.gml: dado in cascata dice(4) x4 (cargo1/2/4/3, in
// quest'ordine) — equivalente a un'estrazione uniforme fra i quattro,
// pesi identici. cargo1(mon)/cargo2(ele)/cargo4(oil) sono raccoglibili con
// un tap (irandom_range(2000,3000) alla risorsa giusta, poi restano a
// galla come relitto "gia' preso" — sprite cargoNv); cargo3 nasce gia'
// `preso` (mai cliccabile nel decompilato: solo scenografia).
const SHIP_TYPES = [
  { type: "cargo1", kind: "mon", sprP: "cargo1p", sprV: "cargo1v" },
  { type: "cargo2", kind: "ele", sprP: "cargo2p", sprV: "cargo2v" },
  { type: "cargo4", kind: "oil", sprP: "cargo4p", sprV: "cargo4v" },
  { type: "cargo3", kind: null, sprP: "cargo3v", sprV: "cargo3v" },
];
const SHIP_SPAWN_CHANCE = 1 / 10;      // [C] bridge_des2/Alarm_2.gml: action_if_dice(10)
const SHIP_LIFE_SECONDS = 3000 / 60;   // [C] cargoN/Create.gml: action_set_alarm(3000, 0)
const SHIP_DIR_RAD = (150 * Math.PI) / 180;   // [C] action_set_motion(150, 2)
const SHIP_PX_PER_SEC = 2 * 60;
const SHIP_SMOKE_PERIOD = 40 / 60;     // [C] cargoN/Alarm_1.gml: action_set_alarm(40, 1)
const SHIP_SMOKE_OFFSET = { x: 555, y: 238 };   // [C] action_create_object(smoke_ind, 555, 238), relativo

/** [C] bridge_des2/Alarm_2.gml: 1/10 di probabilita' appena il ponte finisce
 * di aprirsi — `x`/`y` e' la posizione di `cargomaker` in quell'evento
 * (4500, 2170), sempre la stessa. Ritorna `null` se il dado non la fa nascere. */
export function maybeSpawnShip(x, y) {
  if (Math.random() >= SHIP_SPAWN_CHANCE) return null;
  const t = SHIP_TYPES[Math.floor(Math.random() * SHIP_TYPES.length)];
  return { ...t, taken: t.kind === null, x, y, t: 0, smokeT: 0 };
}

/** [C] cc1/cc2/cc3 (smoke.js, stessa distribuzione 50/25/25 di industria). */
function puffSprite() {
  const d = Math.random();
  return d < 0.5 ? "cc1" : d < 0.75 ? "cc2" : "cc3";
}

/** Avanza le navi in volo — rotta dritta, stesso sbuffo di fumo periodico
 * dell'originale (game/src/smoke.js gestisce poi vita/deriva/crescita). */
export function stepCargoShips(ships, smoke, dt) {
  for (let i = ships.length - 1; i >= 0; i--) {
    const s = ships[i];
    s.t += dt;
    s.x += Math.cos(SHIP_DIR_RAD) * SHIP_PX_PER_SEC * dt;
    s.y -= Math.sin(SHIP_DIR_RAD) * SHIP_PX_PER_SEC * dt;
    s.smokeT += dt;
    while (s.smokeT >= SHIP_SMOKE_PERIOD) {
      s.smokeT -= SHIP_SMOKE_PERIOD;
      smoke.push({
        x: s.x + SHIP_SMOKE_OFFSET.x, y: s.y + SHIP_SMOKE_OFFSET.y,
        family: 150, spr: puffSprite(), scale: 1, t: 0,
      });
    }
    if (s.t >= SHIP_LIFE_SECONDS) ships.splice(i, 1);
  }
}

/** [C] cargo1|2|4/Mouse_LeftPressed.gml: una tantum, +2000..3000 alla
 * risorsa della nave. cargo3 (kind null) non e' mai cliccabile. */
export function clickShip(ship, r12) {
  if (ship.taken || ship.kind == null) return null;
  ship.taken = true;
  const amount = 2000 + Math.floor(Math.random() * 1001);
  r12[ship.kind] += amount;
  return `+${amount} ${ship.kind}`;
}
