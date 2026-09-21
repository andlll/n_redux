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
const DEFAULT_GRAPHICS_OPTIONS = { rain: true, cars: true, pedestrians: true, minorEffects: true };

export function loadGraphicsOptions() {
  try {
    const raw = localStorage.getItem(GRAPHICS_OPTIONS_KEY);
    if (!raw) return { ...DEFAULT_GRAPHICS_OPTIONS };
    const parsed = JSON.parse(raw);
    return {
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
  localStorage.setItem(GRAPHICS_OPTIONS_KEY, JSON.stringify({
    rain: options.rain, cars: options.cars, pedestrians: options.pedestrians, minorEffects: options.minorEffects,
  }));
}
