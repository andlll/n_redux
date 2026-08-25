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
// spostato RELATIVO di (-100,-300), scala 200% (action_sprite_transform),
// `image_blend` forzato a 16777215 (bianco — un moltiplicatore neutro,
// "non scurire coi toni ambientali giorno/notte", `_selfLit` nel nostro
// renderer), depth fisso -5, arma `alarm[0]=30`. **[Bug corretto durante il
// porting]**: non e' un "bagliore bianco" come una prima lettura del solo
// Create.gml suggeriva — lo sprite `base` (data/sprites.json) e' in realta'
// un disco NERO puro (RGB sempre 0,0,0, verificato pixel per pixel sulle
// texture page) con 30 frame che sfumano solo l'ALPHA da 255 a ~10: un
// segno d'impatto scuro che si dissolve, non un lampo di luce — il "colore
// bianco" del blend non lo schiarisce mai (0 moltiplicato per qualunque
// tinta resta 0), conta comunque per fedelta' al decompilato. GameMaker
// anima uno sprite multi-frame per conto proprio (`image_speed` di default
// 1, mai spento in Create.gml): 30 frame su 30 tick di vita, un frame a
// tick, l'intera animazione gira esattamente una volta.
const TICK = 1 / 60;
const BOLT_SWAP_T = 30 * TICK;
const BOLT_LIFE = 45 * TICK;
export const GLOW_FRAME_COUNT = 30;
export const LIGHTNING_GLOW_LIFE = GLOW_FRAME_COUNT * TICK;
const GLOW_DX = -100, GLOW_DY = -300;

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
 * decompilato, solo il suo figlio `basediswa_t`/glowPosition() sotto lo fa). */
export function boltSprite(s) {
  const swapped = s.t >= BOLT_SWAP_T;
  return s.variant === 1 ? (swapped ? "th1s" : "th1") : (swapped ? "th2s" : "th2");
}

/** Posizione del segno d'impatto (basediswa_t) — vivo, e in animazione
 * (glowFrame() sotto), solo per i primi LIGHTNING_GLOW_LIFE secondi della
 * vita del fulmine. */
export function glowPosition(s) {
  return { x: s.x + GLOW_DX, y: s.y + GLOW_DY };
}

/** Frame corrente dell'animazione a 30 fotogrammi di `base` (l'alpha che
 * sfuma e' gia' dentro lo sprite stesso, nessun fade calcolato qui). */
export function glowFrame(s) {
  return Math.min(GLOW_FRAME_COUNT - 1, Math.floor(s.t / TICK));
}
