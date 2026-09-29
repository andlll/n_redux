// Opzioni grafiche (menu di pausa, "Graphics options") — quattro interruttori
// puramente estetici pensati per guadagnare prestazioni su dispositivi
// deboli, stesso schema/persistenza di AUTOSAVE_SETTINGS in save.js: una
// sola voce in localStorage, GLOBALE (non per-scena), letta ad ogni mount di
// una room e riscritta a ogni tocco sul pannello.
//
// I quattro toggle e perche' sono questi e non altri: pioggia/auto/pedoni
// sono le uniche collezioni che scalano con la partita invece che restare
// piccole per costruzione — la pioggia in particolare arriva a spawnare fino
// a 900 gocce/secondo durante un temporale (weather.js, RAIN_SPAWN_PERIOD:
// "di gran lunga il flusso di particelle piu' pesante del motore"), molto
// piu' del traffico o dei pedoni messi insieme. "Minor effects" raggruppa il
// resto della piccola scenografia con vita breve/pool (fumo delle centrali,
// bolle di raccolta risorse, bagliore dei fari, scintille dei fuochi
// d'artificio) — ognuna gia' economica per conto suo, ma comunque disattivabile
// in blocco per chi vuole il minimo indispensabile. Nuvole/uccelli/semafori/
// ponti/gru di cantiere restano sempre attivi: bounded per costruzione (pochi
// lotti, un evento ogni tanto), il guadagno di un proprio toggle sarebbe
// trascurabile.
const GRAPHICS_OPTIONS_KEY = "nimbus-graphics";
const DEFAULT_GRAPHICS_OPTIONS = { rain: true, cars: true, pedestrians: true, minorEffects: true, fpsCap: 60 };

// Limite di fotogrammi al secondo del ciclo di disegno (match e menu): 30, 60
// oppure 0 = nessun limite (segue lo schermo: 90/120Hz su molti telefoni).
// Disegnare oltre i 60 non aggiunge nulla a un gioco a passo fisso, solo GPU,
// calore e batteria — per questo il default e' 60; 30 e' per chi vuole
// risparmiare ancora. Un frame piu' ravvicinato del limite viene saltato
// (si ripianifica il requestAnimationFrame senza toccare `last`, quindi il
// `dt` del frame successivo resta quello vero); la soglia sta 2ms SOTTO
// l'intervallo teorico per non scartare per errore frame validi con un po' di
// jitter (60Hz: 14.7ms contro 16.7; a 120Hz salta esattamente un frame su
// due, a 30 uno su due su un 60Hz).
export const FPS_CAPS = [30, 60, 0];
let currentFpsCap = DEFAULT_GRAPHICS_OPTIONS.fpsCap;
function validFpsCap(v) { return FPS_CAPS.includes(v) ? v : DEFAULT_GRAPHICS_OPTIONS.fpsCap; }
/** Intervallo minimo fra due frame disegnati, in ms (0 = nessun limite). */
export function frameMinMs() { return currentFpsCap ? 1000 / currentFpsCap - 2 : 0; }

export function loadGraphicsOptions() {
  const out = readGraphicsOptions();
  currentFpsCap = out.fpsCap;
  return out;
}
function readGraphicsOptions() {
  try {
    const raw = localStorage.getItem(GRAPHICS_OPTIONS_KEY);
    if (!raw) return { ...DEFAULT_GRAPHICS_OPTIONS };
    const parsed = JSON.parse(raw);
    return {
      fpsCap: validFpsCap(parsed.fpsCap),
      rain: typeof parsed.rain === "boolean" ? parsed.rain : DEFAULT_GRAPHICS_OPTIONS.rain,
      cars: typeof parsed.cars === "boolean" ? parsed.cars : DEFAULT_GRAPHICS_OPTIONS.cars,
      pedestrians: typeof parsed.pedestrians === "boolean" ? parsed.pedestrians : DEFAULT_GRAPHICS_OPTIONS.pedestrians,
      minorEffects: typeof parsed.minorEffects === "boolean" ? parsed.minorEffects : DEFAULT_GRAPHICS_OPTIONS.minorEffects,
    };
  } catch {
    return { ...DEFAULT_GRAPHICS_OPTIONS };
  }
}

export function saveGraphicsOptions(options) {
  currentFpsCap = validFpsCap(options.fpsCap);
  try {
    localStorage.setItem(GRAPHICS_OPTIONS_KEY, JSON.stringify({
      rain: options.rain, cars: options.cars, pedestrians: options.pedestrians, minorEffects: options.minorEffects,
      fpsCap: currentFpsCap,
    }));
  } catch { /* storage bloccato: il limite vale comunque per la sessione */ }
}

// Il limite serve gia' al primo frame del menu (title.js), prima che
// qualunque schermata chiami loadGraphicsOptions().
loadGraphicsOptions();
