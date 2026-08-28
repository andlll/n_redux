# NIMBUS — sorgenti ricostruiti

Estrazione completa del gioco **NIMBUS** a partire da `NIMBUS.exe` (build del
**30 novembre 2020**, `game_id 333266689`, versione 1.0.0.1760).

Il gioco è un **GameMaker Studio 1.x** (bytecode 15). L'eseguibile era un
self-extractor IExpress: dentro la sezione risorse c'era una cabinet MS-CAB
contenente `data.win`, il runner, `options.ini` e `splash.png`. Tutto il
contenuto qui sotto viene da `data.win` (161 MB).

## Cosa c'è dentro

| Cartella | Contenuto |
|---|---|
| `src/objects/<nome>/` | Un file `.gml` per evento + `_object.json` (sprite, parent, depth, physics) |
| `src/scripts/` | Gli script (qui solo `script0`, setup risoluzione/view) |
| `src/rooms/` | Una room per file JSON: istanze, view, background, tile |
| `assets/sprites/<nome>/` | I frame di ogni sprite come PNG, già ritagliati e riallineati |
| `assets/textures/` | Le 78 texture page originali |
| `data/` | Metadati completi: sprite, oggetti, room, font, stringhe, indice codice |
| `raw/gml/` | Tutti i 4592 blocchi di codice decompilati, nomi originali GameMaker |
| `raw/asm/` | Il disassemblato bytecode di ogni blocco (riferimento in caso di dubbio) |
| `tools/` | La toolchain di estrazione usata (Python + PowerShell) |

## Numeri

- **738 oggetti**, **4592 blocchi di codice** (4591 eventi + 1 script)
- **1376 sprite**, **17.224 frame PNG** estratti
- **8 room**: `loguji`, `tutorial`, `title`, `match`, `match_easy`,
  `screensaver`, `rocket_test`, `faqroom`
- **7 font**, 1 background, 2 shader
- **0 suoni** — il progetto non contiene audio incorporato
- 7056 stringhe, 6678 variabili, 83 funzioni richiamate

## Sulla decompilazione

Il codice è ricostruito da bytecode, non è il sorgente originale, ma:

- **4591 blocchi su 4592** hanno un flusso di controllo completamente
  strutturato (`if`/`else`/`while`/`with`/`break`). L'unico che non lo è
  (`rainlauncher_Create_0`) contiene in coda un listato piatto con label e
  `goto`, equivalente ma meno leggibile.
- I nomi di variabili, oggetti, sprite, room e funzioni sono **quelli
  originali**: GameMaker li conserva nel data.win.
- Gli ID asset numerici nelle chiamate sono già risolti in nomi
  (`action_sprite_set(sr15, 0, 1)` invece di `action_sprite_set(1119, 0, 1)`).

### Il gioco è quasi tutto drag & drop

Il codice non è GML scritto a mano: è la compilazione delle azioni
drag & drop dell'editor. Per questo vedrai ovunque chiamate `action_*`
e la variabile temporanea `__b__`. Le più frequenti:

| Funzione | Occorrenze | Significato |
|---|---|---|
| `action_set_relative(n)` | 9656 | 0 = valori assoluti, 1 = relativi (vale per le azioni successive) |
| `action_if_variable(var, val, op)` | 5989 | `op`: 0 = `==`, 1 = `<`, 2 = `>`, 3 = `!=` |
| `action_sprite_set(spr, sub, spd)` | 5647 | cambia sprite, subimage, velocità animazione |
| `action_set_alarm(val, n)` | 3838 | imposta `alarm[n]` |
| `action_if_dice(n)` | 2338 | vero con probabilità 1/n |
| `action_kill_object()` | 2153 | `instance_destroy()` |
| `action_create_object(obj, x, y)` | 1555 | crea istanza (relativa se `action_set_relative(1)`) |
| `action_sprite_color(col, alpha)` | 743 | blend colore + alpha |
| `action_set_motion(dir, spd)` | 445 | direzione e velocità |

L'elenco completo con i conteggi è in `data/functions.json`.

Un `with (nomeoggetto) { ... }` nel codice corrisponde all'opzione
"Applies to: Object" dell'azione drag & drop.

## E l'APK?

`NIMBUS Android Edition.apk` contiene una build **più vecchia e più piccola**
(`nimbus android part3`, 24 ottobre 2019): 1027 sprite, 531 oggetti, 3159
blocchi di codice. Confrontando i nomi di sprite, oggetti e room, l'APK è un
**sottoinsieme stretto** dell'exe: non contiene un solo asset che qui manchi.
Si può ignorare — a meno che non serva vedere come erano tarati i controlli
touch nella versione mobile.

## Note per il porting

- La risoluzione di riferimento è **1920×1080** (`script0`), con
  `display_aspect_ratio` usato per ricalcolare le view. La finestra di
  default nel data.win è però 3840×2160.
- Le room hanno dimensioni molto diverse fra loro (`match` è 3900×2090,
  `loguji` 3000×3000): il gioco scala le view, non la room.
- Gli sprite sono grandi (molti 566×513) e già a risoluzione alta.
- `_object.json` contiene `parent`: la gerarchia di ereditarietà è usata
  parecchio, conviene ricostruirla prima di toccare gli eventi.

## Struttura del repo

| Cartella | Versionata | Contenuto |
|---|---|---|
| `src/` | sì | Oggetti (un `.gml` per evento), room, script — la reference |
| `data/` | sì | Metadati: sprite, oggetti, room, font, stringhe |
| `raw/` | sì | Tutti i blocchi decompilati e il disassemblato |
| `assets/textures/` | sì | Le 78 texture page originali: **la fonte di tutti i pixel** |
| `game/` | sì | Il nuovo motore (WebGL2, nessuna dipendenza) |
| `game/fonts/` | sì | Montserrat (SIL OFL, `game/fonts/OFL.txt`): l'unico asset del motore non estratto da `NIMBUS.exe` — testo HTML vero (menu di pausa/tutorial) sopra al canvas, self-hosted invece che da Google Fonts a runtime |
| `tools/` | sì | Toolchain di estrazione e pipeline asset |
| `game/assets/` | no | Atlas per room, font bitmap e sfondo statico della title screen, generati |
| `assets/sprites/` | no | I 17.224 frame singoli, generati |

Il repo è **autosufficiente**: non serve né `NIMBUS.exe` né nessuna cartella
locale. Tutto ciò che non è versionato si rigenera da ciò che lo è.

## Far girare il gioco

`game/` è pensato per finire su un hosting statico (GitHub Pages, Netlify,
qualunque server di file): niente backend, solo fetch di JSON/PNG e moduli ES.
L'unico passo che serve prima è generare gli atlas per room, i font bitmap
della barra risorse/dei pannelli decompilati (STUDIO.md — `game/data/
font_*.json` referenzia un `.webp` mai generato dalla pipeline atlas sopra)
e lo sfondo statico della title screen (tools/29_title_bg.py — la citta'
ferma dietro al menu principale, vedi il commento in cima a game/src/
title.js: senza `game/assets/title_city.webp` il menu non monta affatto).

```bash
python3 -m pip install pillow    # unica dipendenza esterna della toolchain
for room in match_easy match title tutorial; do
  python3 tools/23_atlas.py "$room"
  python3 tools/24_blit.py "$room"
done
for font in gotham_mini gotham_mid; do
  python3 tools/25_font.py "$font"
  python3 tools/24_blit.py "font_$font"
done
python3 tools/29_title_bg.py
```

`24_blit.py` è la versione Python/Pillow — cross-platform — di
`24_blit.ps1` (PowerShell + GDI+, Windows-only, tenuto per chi già lavora lì).
Fanno lo stesso lavoro a partire dallo stesso `blitplan.json`; usa quello che
preferisci.

Poi un server statico qualsiasi:

```bash
python3 -m http.server 5173 --directory game
```

E si apre `http://127.0.0.1:5173/` (`index.html`) — l'unico link di tutta
l'app: la schermata di scelta (Match/Match Facile/Tutorial, il vecchio
layout del decompilato), la vera home del sito. `game/src/app.js` monta/
smonta le schermate (title.js/main.js) con `import()` dinamico invece di
navigare a una pagina diversa — un tap sui bottoni del menu carica scena e
atlas della room scelta e passa alla partita senza refresh del browser;
`autoload` (passato internamente da title.js) non si applica al tutorial,
che riparte sempre da zero; dalla partita si torna al menu col bottone
"Torna al menu" nel menu di pausa, sempre senza refresh.

### Deploy come sito statico

`.github/workflows/deploy-pages.yml` rigenera gli atlas per `match_easy` e
`match` ad ogni push su `main` e pubblica `game/` su GitHub Pages. Va
abilitato una volta sola in Settings → Pages → Source → "GitHub Actions".
Nessun altro passo: `game/assets/` resta fuori da git (è derivato) e viene
ricostruito ad ogni deploy dalle texture page versionate in
`assets/textures/`.

## I tool

Due famiglie, e la differenza conta.

**Analisi e build** — girano dal solo repo, senza altro:

| | |
|---|---|
| `22_scene.py <room>` | room → formato del motore |
| `23_atlas.py <room>` | reimpacchetta gli atlas della room |
| `24_blit.py <room>` | esegue il blit degli atlas (cross-platform, Pillow) |
| `24_blit.ps1 -Room <room>` | lo stesso, Windows-only (GDI+, nessuna dipendenza da installare) |
| `10_sprites.ps1` | rigenera i 17.224 frame PNG singoli |
| `16_dupes.py` | quanto codice è davvero unico |
| `17_survey.py` | room, oggetti con input, gerarchia parent |
| `19_state.py` | le variabili globali e chi le scrive |
| `20_digest.py <oggetto>...` | legge gli eventi di uno o più oggetti |
| `21_r12.py` | il modello di stato del singleton principale |

**Estrazione** (`01`–`15`, `18`) — rifanno la catena da `NIMBUS.exe`. Il loro
risultato è già versionato, quindi servono solo per rifare tutto da zero.
Hanno bisogno dei file originali, che nel repo non ci sono:

```bash
set NIMBUS_EXE=D:\percorso\NIMBUS.exe
```

```bash
set NIMBUS_EXTRACT=D:\percorso\lavoro
```

Senza queste, si fermano con un messaggio esplicito invece di un errore
incomprensibile. Nessun tool ha percorsi locali cablati: `tools/_paths.py`
risolve tutto rispetto al repo.

## Peso

~140 MB, di cui 120 sono le texture page. Sono file **immutabili**: estratti
una volta e mai più toccati, quindi non fanno crescere la cronologia come
farebbero dei binari che cambiano. I 190 MB di frame singoli restano fuori
apposta: sono dati derivati, li rifà `10_sprites.ps1` in un comando.
