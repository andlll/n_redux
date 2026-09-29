"""Pacchetto zip HTML5 per itch.io / Newgrounds (e qualunque portale che chieda
"uno zip con index.html alla radice").

`game/` e' gia' un sito statico con percorsi relativi, ma non e' cio' che si
carica cosi' com'e': gli atlas e il bundle JS sono generati (non versionati),
e la cartella contiene anche roba che a un portale non serve o da' fastidio.
Questo script fa da solo, nell'ordine:

  1. rigenera atlas, font bitmap e logo come .github/workflows/deploy-pages.yml
     (saltabile con --skip-assets se `game/assets/` e' gia' fresco);
  2. compila il bundle (`npm ci` se manca node_modules, poi `npm run build`);
  3. impacchetta SOLO cio' che il browser scarica davvero, con `index.html`
     alla radice dello zip.

Cosa NON entra, e perche':
  - `game/src/`, `package*.json`, `node_modules/`: il gioco carica solo
    `dist/app.js` (+ i suoi chunk); il sorgente e' inutile a runtime.
  - `dist/*.map` e la riga `//# sourceMappingURL` dai .js: senza il .map, la
    riga darebbe solo un 404 nei devtools. Toglie ~2 MB.
  - `data/*.blitplan.json`: servono solo a tools/24_blit.py, mai a runtime.
  - `sw.js` e la sua registrazione in `index.html` (copia nello zip, il file
    nel repo non si tocca): dentro l'iframe di un portale un service worker
    network-first non da' nessun vantaggio e riempirebbe la Cache Storage.
    Il manifest resta: innocuo, ma il portale non lo usa.

Uso:  python3 tools/30_package_html5.py [--skip-assets] [--out PERCORSO.zip]
Uscita di default: dist-html5/nimbus-html5.zip (cartella ignorata da git).
Stampa dimensioni e numero di file, da confrontare con il limite del portale.
"""
import os, re, shutil, subprocess, sys, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAME = os.path.join(ROOT, "game")
OUT = os.path.join(ROOT, "dist-html5", "nimbus-html5.zip")
if "--out" in sys.argv:
    OUT = os.path.abspath(sys.argv[sys.argv.index("--out") + 1])


def run(cmd, cwd=ROOT):
    print("$", " ".join(cmd))
    subprocess.run(cmd, cwd=cwd, check=True)


if "--skip-assets" not in sys.argv:
    # Stesso elenco del workflow di deploy: match copre anche match_easy e tutorial.
    for room in ("match", "title"):
        run([sys.executable, "tools/23_atlas.py", room])
        run([sys.executable, "tools/24_blit.py", room])
    for font in ("gotham_mid", "gotham_mini"):
        run([sys.executable, "tools/25_font.py", font])
        run([sys.executable, "tools/24_blit.py", "font_" + font])
    run([sys.executable, "tools/26_logo.py", "mount_logo"])
    run([sys.executable, "tools/24_blit.py", "mount_logo"])

if not os.path.isdir(os.path.join(GAME, "node_modules")):
    run(["npm", "ci"], cwd=GAME)
# esbuild non svuota la cartella di uscita: i chunk delle build precedenti
# (nomi con hash diversi) resterebbero e finirebbero nello zip, inutili.
shutil.rmtree(os.path.join(GAME, "dist"), ignore_errors=True)
run(["npm", "run", "build"], cwd=GAME)

if not os.path.isfile(os.path.join(GAME, "dist", "app.js")):
    sys.exit("dist/app.js mancante dopo la build")
if not os.path.isdir(os.path.join(GAME, "assets")):
    sys.exit("game/assets/ mancante: rilancia senza --skip-assets")

# (percorso nel repo relativo a game/, e' una directory?) — tutto il resto resta fuori.
INCLUDE = [
    "index.html", "manifest.webmanifest",
    "icon-192.png", "icon-512.png", "icon-512-maskable.png", "apple-touch-icon.png",
    "favicon-32.png", "favicon.ico", "pause-button.png", "cost-warning-icon.png",
    "fonts", "data", "assets", "dist",
]
SKIP_SUFFIX = (".map", ".blitplan.json")
SW_BLOCK = re.compile(r"<script>\s*if \(\"serviceWorker\" in navigator\) \{.*?\}\s*</script>", re.S)
SOURCEMAP_LINE = re.compile(r"\n?//# sourceMappingURL=\S+\s*$")

files = []
for entry in INCLUDE:
    p = os.path.join(GAME, entry)
    if os.path.isdir(p):
        for dp, _, fns in os.walk(p):
            for fn in sorted(fns):
                if not fn.endswith(SKIP_SUFFIX):
                    files.append(os.path.join(dp, fn))
    elif os.path.isfile(p):
        files.append(p)
    else:
        sys.exit("manca %s" % entry)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
if os.path.exists(OUT):
    os.remove(OUT)
raw = 0
with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for f in sorted(files):
        arc = os.path.relpath(f, GAME).replace(os.sep, "/")
        data = open(f, "rb").read()
        if arc == "index.html":
            html = data.decode("utf-8")
            html, n = SW_BLOCK.subn("", html)
            if n != 1:
                sys.exit("blocco di registrazione del service worker non trovato in index.html")
            data = html.encode("utf-8")
        elif arc.startswith("dist/") and arc.endswith(".js"):
            data = SOURCEMAP_LINE.sub("\n", data.decode("utf-8")).encode("utf-8")
        raw += len(data)
        z.writestr(arc, data)

print("\n%s\n  %d file, %.1f MB scompattato, %.1f MB lo zip" % (
    OUT, len(files), raw / 1e6, os.path.getsize(OUT) / 1e6))
