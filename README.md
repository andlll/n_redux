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
| `tools/` | sì | Toolchain di estrazione e pipeline asset |
| `game/assets/` | no | Atlas per room, generati |
| `assets/sprites/` | no | I 17.224 frame singoli, generati |

Il repo è **autosufficiente**: non serve né `NIMBUS.exe` né nessuna cartella
locale. Tutto ciò che non è versionato si rigenera da ciò che lo è.

## Far girare il gioco

```bash
py -3 tools/23_atlas.py match_easy
```

Poi il blit degli atlas e un server statico:

```bash
powershell -File tools/24_blit.ps1 -Room match_easy
```

```bash
py -3 -m http.server 5173 --directory game
```

E si apre `http://127.0.0.1:5173/`.

## Rigenerare altro

I frame PNG singoli di ogni sprite (comodi da sfogliare, non servono alla
build) si ricavano dalle texture page:

```bash
powershell -File tools/10_sprites.ps1
```

Per rifare l'estrazione da capo partendo da `NIMBUS.exe` servono, nell'ordine:
`01_carve.py`, l'estrazione della CAB con `expand.exe`, poi `05_assets.py`,
`08_objects_rooms.py`, `09_decompile.py`, `12_repo.py`.

## Peso

~140 MB, di cui 120 sono le texture page. Sono file **immutabili**: estratti
una volta e mai più toccati, quindi non fanno crescere la cronologia come
farebbero dei binari che cambiano. I 190 MB di frame singoli restano fuori
apposta: sono dati derivati, si rigenerano in un comando.
