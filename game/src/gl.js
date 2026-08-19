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
out vec4 outColor;
void main() {
  vec4 c = texture(u_tex, v_uv) * v_tint;
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
    if (!gl) throw new Error("WebGL2 non disponibile");
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
    this.drawCalls = 0;
  }

  beginFrame(w, h) {
    const gl = this.gl;
    gl.viewport(0, 0, w, h);
    gl.clearColor(0.04, 0.06, 0.12, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.prog);
    gl.uniform1i(this.uTex, 0);
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
    if (!this.count || !this.texture) { this.count = 0; return; }
    const gl = this.gl;
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

export async function loadTexture(gl, url) {
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
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return { tex: t, width: img.width, height: img.height };
}
