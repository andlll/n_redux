// Renderer WebGL2 minimale: un solo batch di quad texturati e tinti.
// Nessuna dipendenza. Tutto qui dentro e' roba nostra.

const VERT = `#version 300 es
layout(location=0) in vec2 a_pos;      // posizione in spazio mondo (o schermo)
layout(location=1) in vec2 a_uv;
layout(location=2) in vec4 a_tint;
uniform mat3 u_proj;                   // mondo/schermo -> clip
out vec2 v_uv;
out vec4 v_tint;
void main() {
  v_uv = a_uv;
  v_tint = a_tint;
  vec3 p = u_proj * vec3(a_pos, 1.0);
  gl_Position = vec4(p.xy, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision mediump float;
in vec2 v_uv;
in vec4 v_tint;
uniform sampler2D u_tex;
uniform vec4 u_ambient;                // tinta globale (ciclo giorno/notte)
uniform bool u_colorize;               // vedi Renderer.setColorize() sotto
out vec4 outColor;
void main() {
  vec4 tex = texture(u_tex, v_uv);
  // u_colorize: ignora l'RGB della texture, usa solo la sua alpha come
  // sagoma - l'unico modo di schiarire uno sprite che e' NERO puro (0,0,0):
  // moltiplicare per qualunque tinta resta comunque nero (0*x=0), serve
  // sostituire il colore, non moltiplicarlo. Vedi Renderer.setColorize().
  vec4 c = u_colorize ? vec4(v_tint.rgb, tex.a * v_tint.a) : tex * v_tint;
  c.rgb *= u_ambient.rgb;
  if (c.a < 0.003) discard;
  outColor = c;
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error("shader: " + gl.getShaderInfoLog(s));
  }
  return s;
}

const FLOATS_PER_VERT = 8;             // x y u v r g b a
const VERTS_PER_QUAD = 6;

export class Renderer {
  constructor(canvas, maxQuads = 20000) {
    const gl = canvas.getContext("webgl2", {
      alpha: false, antialias: false, premultipliedAlpha: false,
    });
    if (!gl) throw new Error("WebGL2 not available");
    this.gl = gl;
    this.canvas = canvas;

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error("link: " + gl.getProgramInfoLog(prog));
    }
    this.prog = prog;
    this.uProj = gl.getUniformLocation(prog, "u_proj");
    this.uTex = gl.getUniformLocation(prog, "u_tex");
    this.uAmbient = gl.getUniformLocation(prog, "u_ambient");
    this.uColorize = gl.getUniformLocation(prog, "u_colorize");

    this.maxQuads = maxQuads;
    this.data = new Float32Array(maxQuads * VERTS_PER_QUAD * FLOATS_PER_VERT);
    this.count = 0;                    // quad accodati
    this.texture = null;               // texture del batch corrente

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, this.data.byteLength, gl.DYNAMIC_DRAW);
    const stride = FLOATS_PER_VERT * 4;
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 8);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, stride, 16);
    gl.bindVertexArray(null);

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    this.ambient = [1, 1, 1, 1];
    this.colorize = false;
    this.drawCalls = 0;
  }

  // `rgb`: colore di sfondo della room (0..1 per canale) — [I] default un
  // blu notte generico per chi non lo passa (title.js, dove il quad dello
  // sfondo sfumato copre comunque tutto lo schermo). game/src/main.js passa
  // `scene.bgColor` vero (gia' nel JSON, STUDIO.md — mai letto finora:
  // ogni room usava questo stesso placeholder, sbagliato per `match`, la
  // cui `bgColor` reale e' un azzurro cielo chiaro, non un blu scurissimo).
  beginFrame(w, h, rgb = [0.04, 0.06, 0.12]) {
    const gl = this.gl;
    gl.viewport(0, 0, w, h);
    gl.clearColor(rgb[0], rgb[1], rgb[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.prog);
    gl.uniform1i(this.uTex, 0);
    // Sempre spento all'inizio di ogni frame: setColorize(true) e' per
    // pochi disegni mirati (icone UI scure che vanno schiarite, main.js),
    // mai uno stato che deve sopravvivere al frame successivo.
    this.colorize = false;
    gl.uniform1i(this.uColorize, 0);
    this.drawCalls = 0;
  }

  /** matrice 3x3 (column-major) da spazio arbitrario a clip */
  setProjection(m) {
    this.flush();
    this.gl.uniformMatrix3fv(this.uProj, false, m);
  }

  setAmbient(r, g, b) {
    this.flush();
    this.ambient = [r, g, b, 1];
    this.gl.uniform4f(this.uAmbient, r, g, b, 1);
  }

  /**
   * Attiva/disattiva la "colorize mode" (FRAG sopra, `u_colorize`): mentre
   * e' attiva, `draw()`/`drawQuad()` ignorano l'RGB della texture e
   * disegnano `tint` a tinta piena, usando solo l'alpha della texture come
   * sagoma — l'unico modo di schiarire uno sprite nero puro, dato che
   * moltiplicare (il modo normale) non puo' farlo. Come `setAmbient()`,
   * cambia uno uniform del batch: `flush()` prima di applicarlo, cosi' i
   * quad gia' accodati restano nella modalita' in cui sono stati disegnati.
   */
  setColorize(on) {
    if (this.colorize === on) return;
    this.flush();
    this.colorize = on;
    this.gl.uniform1i(this.uColorize, on ? 1 : 0);
  }

  /**
   * Accoda un quad. `frame` = {tex, u0,v0,u1,v1, w,h, ox,oy}
   * ox/oy = origine in pixel dentro il frame (il punto che finisce su x,y).
   */
  draw(frame, x, y, scale = 1, tint = 0xffffff, alpha = 1) {
    if (frame.tex !== this.texture || this.count >= this.maxQuads) {
      this.flush();
      this.texture = frame.tex;
    }
    const w = frame.w * scale, h = frame.h * scale;
    const x0 = x - frame.ox * scale, y0 = y - frame.oy * scale;
    const x1 = x0 + w, y1 = y0 + h;
    const r = ((tint >> 16) & 255) / 255;
    const g = ((tint >> 8) & 255) / 255;
    const b = (tint & 255) / 255;
    const { u0, v0, u1, v1 } = frame;

    let o = this.count * VERTS_PER_QUAD * FLOATS_PER_VERT;
    const d = this.data;
    const put = (px, py, pu, pv) => {
      d[o++] = px; d[o++] = py; d[o++] = pu; d[o++] = pv;
      d[o++] = r; d[o++] = g; d[o++] = b; d[o++] = alpha;
    };
    put(x0, y0, u0, v0); put(x1, y0, u1, v0); put(x1, y1, u1, v1);
    put(x0, y0, u0, v0); put(x1, y1, u1, v1); put(x0, y1, u0, v1);
    this.count++;
  }

  /**
   * Accoda un quad a partire dai quattro angoli espliciti, invece di
   * x,y + scala assiale come draw() sopra: serve per forme non allineate
   * agli assi — nel motore, l'unico caso e' il fascio del laser (game/src/
   * projectiles.js), un quad sottile e lungo orientato verso il bersaglio.
   * `draw()` non basta perche' costruisce sempre un rettangolo dritto;
   * qui il chiamante calcola gia' i quattro angoli (in genere spostando
   * `p0..p3` perpendicolarmente alla direzione del fascio).
   */
  drawQuad(frame, p0, p1, p2, p3, tint = 0xffffff, alpha = 1) {
    if (frame.tex !== this.texture || this.count >= this.maxQuads) {
      this.flush();
      this.texture = frame.tex;
    }
    const r = ((tint >> 16) & 255) / 255;
    const g = ((tint >> 8) & 255) / 255;
    const b = (tint & 255) / 255;
    const { u0, v0, u1, v1 } = frame;

    let o = this.count * VERTS_PER_QUAD * FLOATS_PER_VERT;
    const d = this.data;
    const put = (px, py, pu, pv) => {
      d[o++] = px; d[o++] = py; d[o++] = pu; d[o++] = pv;
      d[o++] = r; d[o++] = g; d[o++] = b; d[o++] = alpha;
    };
    put(p0.x, p0.y, u0, v0); put(p1.x, p1.y, u1, v0); put(p2.x, p2.y, u1, v1);
    put(p0.x, p0.y, u0, v0); put(p2.x, p2.y, u1, v1); put(p3.x, p3.y, u0, v1);
    this.count++;
  }

  flush() {
    const gl = this.gl;
    // Ri-attivato ad ogni flush, PRIMA del controllo `count` sotto e non
    // solo quando c'e' davvero un batch da disegnare: PauseBlur (gl.js
    // sotto) usa un secondo programma shader fra un frame e l'altro, e
    // setProjection()/setAmbient() chiamano flush() (per svuotare il batch
    // prima di cambiare uniform) anche quando il batch e' vuoto — es. giusto
    // dopo blurScreen(), prima ancora di accodare un quad. Se in quel caso
    // flush() si fermasse subito senza riattivare `this.prog`, le successive
    // gl.uniformMatrix3fv(u_proj)/gl.uniform4f(u_ambient) scriverebbero su
    // un programma diverso da quello attivo (silenzioso, solo un warning
    // "location is not from the associated program" in console) e
    // verrebbero scartate: la proiezione restava quella del giro
    // precedente, con geometria disegnata completamente fuori posto (il
    // sintomo era lo sfondo/i bottoni della title screen deformati in una
    // macchia irriconoscibile). Costa una chiamata GL in piu' per flush,
    // trascurabile.
    gl.useProgram(this.prog);
    if (!this.count || !this.texture) { this.count = 0; return; }
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    const used = this.count * VERTS_PER_QUAD * FLOATS_PER_VERT;
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.data.subarray(0, used));
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.drawArrays(gl.TRIANGLES, 0, this.count * VERTS_PER_QUAD);
    gl.bindVertexArray(null);
    this.count = 0;
    this.drawCalls++;
  }
}

/** Texture 1x1 bianca: utile per rettangoli pieni senza atlas. */
export function makeSolidTexture(gl) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                new Uint8Array([255, 255, 255, 255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return t;
}

export function solidFrame(tex, w, h) {
  return { tex, u0: 0, v0: 0, u1: 1, v1: 1, w, h, ox: 0, oy: 0 };
}

/** Texture radiale (bianco pieno al centro, sfumato a trasparente sul
 * bordo): niente atlas/canvas 2D, solo un buffer di pixel calcolato a
 * mano, come makeSolidTexture() sopra. Serve per l'animazione "bolla"
 * delle monete raccolte (game/src/main.js) — l'unico posto nel motore
 * dove serve davvero un cerchio morbido invece di un quad pieno. */
export function makeCircleTexture(gl, size = 64) {
  const data = new Uint8Array(size * size * 4);
  const c = (size - 1) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - c) / c, dy = (y - c) / c;
      const d = Math.hypot(dx, dy);
      const a = Math.max(0, Math.min(1, (1 - d) * 2.2));
      const o = (y * size + x) * 4;
      data[o] = 255; data[o + 1] = 255; data[o + 2] = 255; data[o + 3] = Math.round(a * 255);
    }
  }
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

/** Rettangolo bianco con angoli arrotondati, raggio `radius` — [C]
 * tutorial_square/DrawGUI.gml: `draw_roundrect_colour_ext(...)` per il
 * balloon di testo del tutorial (game/src/main.js), l'unico posto nel
 * motore che ha bisogno di angoli arrotondati invece di un quad dritto
 * (solidFrame() sopra). Stesso principio "pixel calcolato a mano" di
 * makeCircleTexture(): per ogni pixel, distanza dal punto piu' vicino sul
 * rettangolo "arretrato" di `radius` da ogni bordo (clampato agli angoli,
 * piatto su bordi/centro) — dentro il raggio = pieno, fuori = trasparente,
 * un pixel di sfumatura in mezzo contro l'aliasing. L'alpha del box (0.7
 * nel decompilato) resta un parametro di `Renderer.draw()`, non qui: la
 * texture e' sempre bianca piena/trasparente, riusabile a qualunque
 * opacita' serva al chiamante. */
export function makeRoundedRectTexture(gl, w, h, radius) {
  const data = new Uint8Array(w * h * 4);
  const r = Math.min(radius, w / 2, h / 2);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const cx = Math.min(Math.max(x + 0.5, r), w - r);
      const cy = Math.min(Math.max(y + 0.5, r), h - r);
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const a = Math.max(0, Math.min(1, r - d + 0.5));
      const o = (y * w + x) * 4;
      data[o] = 255; data[o + 1] = 255; data[o + 2] = 255; data[o + 3] = Math.round(a * 255);
    }
  }
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

// -------------------------------------------------------- blur di pausa
// Sfoca il canvas gia' disegnato per il menu di pausa (main.js) — l'unico
// posto nel motore che ha bisogno di render-to-texture: tenerlo qui,
// isolato con il proprio shader/VAO invece che dentro Renderer, non
// complica il batch sprite di ogni giorno (Renderer sopra), usato per
// tutto il resto.
const BLUR_VERT = `#version 300 es
layout(location=0) in vec2 a_pos;      // NDC diretti, -1..1: un quad a
                                        // schermo intero non ha bisogno
                                        // della proiezione mondo/schermo
                                        // di VERT sopra.
layout(location=1) in vec2 a_uv;
out vec2 v_uv;
void main() {
  v_uv = a_uv;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

// Blur gaussiano a 5 campioni, separabile (una direzione per chiamata,
// orizzontale/verticale) — i pesi/offset sono la classica approssimazione
// "a 3 texture fetch" (due campioni combinano ciascuno una coppia di texel
// gaussiani grazie al campionamento LINEAR, invece di 5 fetch veri):
// economica, gia' abbastanza morbida per uno sfondo di menu.
const BLUR_FRAG = `#version 300 es
precision mediump float;
in vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_dir;                    // passo in texel, gia' moltiplicato per il raggio
out vec4 outColor;
void main() {
  vec4 c = texture(u_tex, v_uv) * 0.2270270270;
  c += texture(u_tex, v_uv + u_dir * 1.3846153846) * 0.3162162162;
  c += texture(u_tex, v_uv - u_dir * 1.3846153846) * 0.3162162162;
  c += texture(u_tex, v_uv + u_dir * 3.2307692308) * 0.0702702703;
  c += texture(u_tex, v_uv - u_dir * 3.2307692308) * 0.0702702703;
  outColor = c;
}`;

/**
 * `blurScreen(w, h)` cattura il framebuffer di default (gia' disegnato da
 * Renderer per QUESTO frame, `w`/`h` in pixel device — stessi di
 * `canvas.width/height`) e ne restituisce una texture sfumata, sottoscala
 * (un quarto di lato: piu' economico E visivamente piu' morbido a parita'
 * di raggio del kernel — lo stesso trucco di ogni "blur pesante a costo
 * leggero") passata due volte per il blur separabile (orizzontale poi
 * verticale, ripetuto due volte). Il chiamante la disegna di nuovo a piena
 * dimensione con Renderer.draw() — l'ingrandimento bilineare (gia' LINEAR
 * su MIN/MAG sotto) aggiunge morbidezza extra, gratis.
 */
export class PauseBlur {
  constructor(gl) {
    this.gl = gl;
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, BLUR_VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, BLUR_FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error("blur link: " + gl.getProgramInfoLog(prog));
    }
    this.prog = prog;
    this.uTex = gl.getUniformLocation(prog, "u_tex");
    this.uDir = gl.getUniformLocation(prog, "u_dir");

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1,
      -1, -1, 0, 0, 1, 1, 1, 1, -1, 1, 0, 1,
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
    gl.bindVertexArray(null);

    // `capture`: cattura a risoluzione piena (copyTexImage2D non puo'
    // sottocampionare da solo). `pingA`/`pingB`: le due texture di lavoro
    // del blur, a un quarto di lato — riallocate solo quando cambiano
    // davvero (resize finestra), non ad ogni frame di pausa.
    this.capture = gl.createTexture();
    this.pingA = gl.createTexture();
    this.pingB = gl.createTexture();
    for (const t of [this.capture, this.pingA, this.pingB]) {
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    this.fboA = gl.createFramebuffer();
    this.fboB = gl.createFramebuffer();
    this.pw = 0; this.ph = 0;
  }

  _ensureSize(pw, ph) {
    if (this.pw === pw && this.ph === ph) return;
    this.pw = pw; this.ph = ph;
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.pingA);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, pw, ph, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindTexture(gl.TEXTURE_2D, this.pingB);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, pw, ph, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboA);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pingA, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboB);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pingB, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  _pass(srcTex, dstFbo, pw, ph, dirX, dirY) {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, dstFbo);
    gl.viewport(0, 0, pw, ph);
    gl.useProgram(this.prog);
    gl.bindVertexArray(this.vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, srcTex);
    gl.uniform1i(this.uTex, 0);
    gl.uniform2f(this.uDir, dirX, dirY);
    gl.disable(gl.BLEND);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  blurScreen(w, h) {
    const gl = this.gl;
    const pw = Math.max(1, Math.round(w / 4)), ph = Math.max(1, Math.round(h / 4));
    this._ensureSize(pw, ph);
    gl.bindTexture(gl.TEXTURE_2D, this.capture);
    // `gl.RGB`, non `gl.RGBA`: il contesto e' creato con `alpha:false`
    // (Renderer sopra — il canvas e' sempre opaco, nessun bisogno di
    // comporsi sopra la pagina), quindi il framebuffer di default non ha
    // un canale alpha vero — copiarlo con internalformat RGBA fa scattare
    // GL_INVALID_OPERATION (formato incompatibile), silenzioso finche' non
    // si controlla `gl.getError()` a mano: il sintomo era un rettangolo
    // bianco/vuoto al posto del blur, nessuna eccezione JS.
    gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGB, 0, 0, w, h, 0);
    // Primo passo: legge `capture` a piena risoluzione ma scrive nel
    // framebuffer sottoscala — sottocampiona e sfuma insieme, un solo passo.
    this._pass(this.capture, this.fboA, pw, ph, 1.2 / pw, 0);
    this._pass(this.pingA, this.fboB, pw, ph, 0, 1.2 / ph);
    this._pass(this.pingB, this.fboA, pw, ph, 1.2 / pw, 0);
    this._pass(this.pingA, this.fboB, pw, ph, 0, 1.2 / ph);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // `_pass()` sopra lascia il viewport sulla risoluzione sottoscala
    // (`pw`/`ph`) dell'ultimo passo — senza ripristinarlo qui, OGNI disegno
    // successivo del chiamante (main.js, drawPauseOverlay(): oscuramento,
    // pannello, bottoni, testo) finirebbe compresso in quel piccolo
    // rettangolo invece di coprire lo schermo intero (il sintomo era
    // proprio un piccolo rettangolo fuori posto invece del menu).
    gl.viewport(0, 0, w, h);
    gl.enable(gl.BLEND);
    return this.pingB;
  }
}

/**
 * `nearest`: campionamento NEAREST invece di LINEAR — solo il font bitmap
 * (font.js/loadFont()) lo chiede. [Bug corretto, segnalato dall'autore: "il
 * font del tutorial e' sgranato"] Ogni texture del motore (compreso l'atlas
 * dei font) usava sempre LINEAR (necessario per lo sprite-work del gioco,
 * che DEVE restare morbido quando scala/ruota) — ma un atlas di glifi
 * disegnato in spazio schermo (font.js/drawText(), niente zoom di camera in
 * mezzo) non scala mai: LINEAR ci sfuma comunque i bordi ad ogni frazione di
 * pixel fra texel e schermo (frequente sugli schermi hidpi, dove 1px CSS
 * copre dpr^2 pixel fisici — STUDIO.md, lo stesso motivo per cui index.html
 * preferisce testo HTML vettoriale al font bitmap per le schermate di
 * caricamento), leggibile come "sgranato" a piccola taglia. NEAREST lo
 * disegna sempre allo stesso identico dettaglio dell'atlas sorgente, un
 * bordo netto invece che sfumato — lo stesso principio "pixel perfect" gia'
 * scelto per l'overlay HTML, qui applicato al font vero nel canvas.
 */
export async function loadTexture(gl, url, { nearest = false } = {}) {
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error("immagine non caricata: " + url));
    i.src = url;
  });
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const filter = nearest ? gl.NEAREST : gl.LINEAR;
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  return { tex: t, width: img.width, height: img.height };
}
