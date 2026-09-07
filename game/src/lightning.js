// L'effetto visivo del colpo di fulmine — [C] thunder/Create.gml +
// Alarm_0.gml + Alarm_1.gml. Il motore applica gia' il DANNO da tempesta
// (buildings.js, stepStormDamage()) e la morte per fulmine delle
// mongolfiere (balloons.js, stepBalloons(), onStruck), ma non l'oggetto che
// l'originale crea PRIMA di applicare l'uno o l'altro, in OGNI Alarm_5/6
// che colpisce qualcosa: `thunder` (il fulmine stesso) + un figlio
// `basediswa_t`.
//
// [C] thunder/Create.gml: dado 1/2 fra due varianti (`th1`/`th2`), depth
// `-y-5`, arma `alarm[0]=30`. [C] Alarm_0 (t=30): passa allo sprite "in
// scarica" della stessa variante (`th1s`/`th2s`), arma `alarm[1]=15`. [C]
// Alarm_1 (t=45 tick totali dalla nascita): si autodistrugge — un solo
// cambio di sprite a meta' vita, nessuna animazione multi-frame.
//
// [C] basediswa_t/Create.gml: figlio creato alla posizione di `thunder`,
// spostato RELATIVO di (-100,-300), scala 200x — action_sprite_transform(200,
// 200, 0, 0), un fattore letterale non una percentuale (uno sprite 32x32
// come "base" diventa 6400x6400): un lampo che copre per davvero l'area di
// gioco, non un dettaglio vicino al fulmine. `image_blend` forzato a
// 16777215 (bianco — un moltiplicatore neutro, "non scurire coi toni
// ambientali giorno/notte", `_selfLit` nel nostro renderer prima di questo
// commento), depth fisso -5, arma `alarm[0]=30`. **[Bug corretto durante il
// porting]**: non e' un "bagliore bianco" come una prima lettura del solo
// Create.gml suggeriva — lo sprite `base` (data/sprites.json) e' in realta'
// un disco NERO puro (RGB sempre 0,0,0, verificato pixel per pixel sulle
// texture page) con 30 frame che sfumano solo l'ALPHA da 255 a ~10: un
// segno d'impatto scuro che si dissolve, non un lampo di luce.
// [Nuova implementazione, richiesta dall'autore: "fai in modo che copra
// esattamente tutto lo schermo, lascia stare quel 200 volte e trasformalo
// in un rettangolo vettoriale come fatto per il filtro notte"] Uno sprite
// 32x32 scalato 200x per inseguire "tutta l'area di gioco" resta comunque
// un quadrato FISSO ancorato al punto colpito (spostato di -100,-300): a
// seconda di dove la camera inquadra il colpo puo' restare piu' corto del
// bordo dello schermo da un lato, o sprecare migliaia di pixel dall'altro
// — un rettangolo vettoriale grande esattamente quanto la vista corrente
// (come l'overlay giorno/notte `aura`, main.js: un quad a tinta unita
// invece di uno sprite) coincide col bordo dello schermo per costruzione,
// qualunque sia la posizione della camera o dello zoom. `glowAlpha()`
// sotto sostituisce i 30 frame di alpha pre-cotti nello sprite con la
// stessa identica curva (255->~10 in 30 tick, lineare) calcolata in
// continuo: nessun frame index da inseguire, stesso fade percepito.
const TICK = 1 / 60;
const BOLT_SWAP_T = 30 * TICK;
const BOLT_LIFE = 45 * TICK;
export const GLOW_FRAME_COUNT = 30;
export const LIGHTNING_GLOW_LIFE = GLOW_FRAME_COUNT * TICK;

/** Un colpo per impatto — `x,y` e' il punto vero (edificio: b.x, b.y +
 * l'offset del tipo/livello colpito, buildings.js; mongolfiera: b.x, b.y). */
export function spawnLightning(x, y) {
  return { x, y, t: 0, variant: Math.random() < 0.5 ? 1 : 2 };
}

export function stepLightning(strikes, dt) {
  for (let i = strikes.length - 1; i >= 0; i--) {
    strikes[i].t += dt;
    if (strikes[i].t >= BOLT_LIFE) strikes.splice(i, 1);
  }
}

/** Sprite del fulmine vero in questo istante — tinta ambientale normale
 * (non e' `_selfLit`: `thunder` stesso non forza nessun colore nel
 * decompilato, solo il suo figlio `basediswa_t`/glowAlpha() sotto lo fa). */
export function boltSprite(s) {
  const swapped = s.t >= BOLT_SWAP_T;
  return s.variant === 1 ? (swapped ? "th1s" : "th1") : (swapped ? "th2s" : "th2");
}

/** Alpha del lampo nero a schermo intero in questo istante — sostituisce i
 * 30 frame pre-cotti dello sprite "base" (255->~10 di alpha, lineare) con
 * la stessa curva calcolata in continuo su `s.t`: 1 appena colpito, ~0.04
 * al termine di LIGHTNING_GLOW_LIFE. Chi chiama smette di disegnare da
 * solo oltre quella vita (`s.t >= LIGHTNING_GLOW_LIFE`, come prima). */
export function glowAlpha(s) {
  return 1 - Math.min(1, s.t / LIGHTNING_GLOW_LIFE) * (245 / 255);
}
