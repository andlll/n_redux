# Come funziona NIMBUS oggi

Documento di studio scritto leggendo il codice estratto, **prima** di
progettare la nuova versione. Serve a capire cosa stiamo riscrivendo.

> **Attenzione al livello di certezza.** Ho letto in dettaglio una decina di
> oggetti su 738 e analizzato in modo automatico tutti e 4592 i blocchi di
> codice. Marco ogni affermazione:
> **[C]** = confermato leggendo il codice · **[I]** = inferito da nomi e
> struttura, plausibile ma da verificare · **[?]** = non lo so ancora.

---

## 1. Che gioco è

**[I]** Un **gestionale/city-sim in verticale**: sorvoli una città dall'alto,
costruisci e potenzi edifici, e amministri risorse mentre il tempo passa fra
giorno e notte e arrivano eventi meteo e minacce.

**[C]** Il giocatore *non* è un personaggio che si muove. Non esiste nessun
oggetto con eventi di movimento da tastiera. L'interazione è tutta
**puntamento e click**: si trascina la mappa, si passa sopra un edificio e
compare un menu, si clicca.

**[C]** `ni` significa nuvola — da cui NIMBUS. Ci sono `nifast` (nuvole veloci)
e `nidark` (nuvole di tempesta), create dinamicamente.

---

## 2. Formato e piattaforma

**[C]** Il gioco è **in verticale**: la view è **611×1086** (circa 9:16) in
tutte le room giocabili. La room è molto più grande della view — `match` è
3900×2090 — e ci si muove trascinando.

**[C]** Gira su **due piattaforme con input diverso**, gestite ovunque con un
`if (os_type == 4)` / `if (os_type == 0)`:

| | `os_type == 0` (Windows) | `os_type == 4` (Android) |
|---|---|---|
| Pan mappa | trascinamento col **tasto destro** | trascinamento col **dito** |
| Scala UI | 1.0 | 0.89 |
| Layout | sempre verticale | verticale **o** orizzontale, deciso a runtime da `window_get_width/height` |

**[C]** Gli oggetti dell'interfaccia si riposizionano **a ogni Step** calcolando
`x = view_xview[0] + view_wview[0]/2` e simili. Non c'è un sistema di UI: ogni
bottone si ancora da solo alla view, ogni frame.

**[C]** C'è uno **zoom di camera vero**, ed è già l'architettura giusta.
`hyposet` calcola a ogni Step:

```
view_wview[0] = window_get_width()  * global.sca;
view_hview[0] = window_get_height() * global.sca;
view_wport[0] = window_get_width();
view_hport[0] = window_get_height();
```

Quindi `global.sca` è il **fattore di zoom**: cambia la porzione di mondo
inquadrata, e tutto il mondo scala con essa senza che i singoli oggetti facciano
niente. `zoom_plus` / `zoom_minus` lo fanno scorrere gradualmente (0,005 per
frame), con un limite minimo (`view_wview >= 1280`, `view_hview >= 720`).

**[C]** Quel limite minimo era **voluto**, non un effetto collaterale: serviva su
mobile a non far sgranare gli sprite e a non appesantire il gioco. Conseguenza:
su `match` (3900×2090) non si vedeva mai la mappa intera. L'autore è disposto a
rivederlo — con mipmap e atlas per room il costo di zoomare fuori è molto
minore di quanto fosse in GameMaker.

**[C]** Gli oggetti della **GUI** invece si **contro-scalano** da soli con
`action_sprite_transform(global.sca, global.sca, 0, 0)` a ogni Step, per
mantenere dimensione costante sullo schermo mentre il mondo zooma. È l'unico
motivo per cui `global.sca` compare in 513 punti.

---

## 3. Room e flusso

**[C]**

```
loguji  (logo Fuji)  ──►  title  ──┬─► me3     ──►  tutorial
                                   ├─► standma ──►  match       (load "nimsav")
                                   └─► easma   ──►  match_easy  (load "nimsav_eas")
```

| Room | Dimensione | Istanze | Ruolo |
|---|---|---|---|
| `loguji` | 3000×3000 | 2 | splash logo |
| `title` | 2560×1440 | 8 | menu principale |
| `tutorial` | 1920×1086 | 188 | tutorial guidato |
| `match` | 3900×2090 | 373 | partita normale |
| `match_easy` | 1920×1086 | 276 | partita facile (mappa più piccola) |
| `screensaver` | 1920×1086 | 217 | modalità demo/attract |
| `rocket_test` | 1024×768 | 51 | scena di test, non raggiungibile dal menu |
| `faqroom` | 1920×1086 | 3 | schermata FAQ |

**[C]** `match_easy` ha `speed = 600` contro il 60 di tutte le altre. È quasi
certamente un residuo di debug: il gioco girerebbe a 600 tick/secondo. **[I]** Da
non replicare.

---

## 4. Il modello di stato

**[C]** Ci sono solo **5 variabili globali**: `sca` (zoom), `upp`, `hc`, `figx`,
`figy`. Tutto il resto dello stato vive dentro **oggetti singleton**, letto e
scritto dagli altri con `with (oggetto) { ... }`.

**[C]** Il contenitore principale è **`r12`** (una sola istanza in `tutorial`,
`match`, `match_easy`, `screensaver`). I suoi campi:

| Gruppo | Campi |
|---|---|
| Risorse | `oil`, `mon` (denaro), `pop` (popolazione), `ele` (energia) |
| Tempo/meteo | `time`, `storm`, `stormeasy`, `onda`, `ondan` |
| Minacce | `bombn`, `bombus`, `bombolo`, `diro`, `diron`, `dirox`, `spy`, `allerta`, `arma` |
| Tecnologie | `biotech`, `crys`, `autocore` |
| UI/flusso | `selec` (modalità selezione), `over`, `exiting` |
| Non chiari | `noemi`, `dara`, `hap`, `wewe` **[?]** |

**[C]** `r12` è anche il **regista del mondo**: nei suoi alarm crea uccelli
(`birb`), nuvole scure, e le ondate di eventi, con probabilità (`action_if_dice`)
e posizioni scritte a mano una per una.

---

## 5. I sistemi

### 5.1 Camera — `scroller2` **[C]**

Pan a trascinamento, con i limiti scritti come costanti dentro il codice
(`0..3900` in x, `-200..2090` in y — i valori di `match`). Un flag `goer`
abilita/disabilita il pan, e la fascia bassa dello schermo (ultimi 100 px) è
esclusa perché lì c'è l'interfaccia. Crea due oggetti segnaposto `positiona` e
`positionb` che servono da riferimento per calcolare lo spostamento.

### 5.2 Ciclo giorno/notte — `aura` **[C]**

Il sistema più elegante del gioco e quello che più merita di essere ripensato.
È una **catena di 8 alarm** che si richiamano a vicenda; ogni fase:

1. cambia lo sprite di overlay (`ambst` → `amb00` → `amb0` → `ambtr1` → `amb2`)
2. cambia la propria `depth` (da `-1` a `-8900`) per passare da sopra a sotto
3. **ricolora uno per uno ~24 gruppi di oggetti** con `action_sprite_color`,
   ripetendo `with (casa1) { ... } with (chies) { ... } with (albe) { ... }` per
   ogni famiglia, in ognuna delle 8 fasi

Il flag `dawn` segna se è giorno. I colori sono costanti tipo `15201023`
(azzurro notte) e `16777215` (bianco = nessuna tinta).

### 5.3 Edifici — la famiglia `notte_target` **[C]**

**231 oggetti** hanno `notte_target` come parent: è il gruppo "reagisce al ciclo
giorno/notte" (accende le luci di notte). Altre famiglie: `oilzero_target` (24
figli, **[I]** si spengono quando finisce il petrolio), `veicoli_target`,
`casca_target`, `nemici_target`.

**[C]** Un edificio tipo (`chies`) ha `level` e `trade`, e all'`MouseEnter` fa
comparire dei bottoni contestuali (`go12`, `go23`, `autot`) che scompaiono
all'`MouseLeave`. Alla creazione si porta dietro oggetti figli (`cddvd`,
`fireworker`) e imposta `depth = -y` per l'ordinamento in profondità.

### 5.4 Economia e interfaccia — `pu1` e la famiglia `cc*` **[C]**

`pu1` è un pannello a `depth -9998` che genera i propri bottoni figli
(`pu7`, `handbutton`). Al passaggio del mouse fa comparire un cartellino prezzo
(`cc100`), al click imposta `r12.selec = 1` entrando in modalità piazzamento.

Gli oggetti `cc100`, `cc200`, `cc2000`, `cc20000`, `cc100000`, `cc200000` sono
**cartellini di prezzo**, uno per taglio. 16 di loro condividono lo stesso
identico codice.

### 5.5 Impatti e distruzione — la famiglia `impa*` **[C]**

Sequenze di esplosione/impatto gestite da alarm lunghissimi (fino a 12 KB di
codice per un solo evento). Le varianti `impa5r` / `impa5rd` / `impa5r_demo` /
`impa5rd_demo` sono **quattro copie quasi identiche** che cambiano solo gli
sprite: una macchina a stati guidata da un contatore `tic` che a ogni passo
sceglie lo sprite (spesso a caso con `action_if_dice`), riarma l'alarm e crea
oggetti figli.

### 5.6 Salvataggio **[C]**

Usa `action_save_game` / `action_load_game` di GameMaker con slot nominati:
`"nimsav"` (partita normale), `"nimsav_eas"` (facile), `"menusav"`, `"nimsave"`.

**Questo è il punto più delicato di tutta la riscrittura.** `save_game` di
GameMaker fa uno **snapshot binario dell'intero stato della room** — tutte le
istanze, tutte le loro variabili — senza che il gioco definisca niente. Non è
replicabile "per caso": va progettata una serializzazione esplicita fin dal
primo giorno.

---

## 6. Cosa non so ancora

- **[?]** Le regole vere dell'economia: come si guadagna, quanto costa, come
  cresce `pop`. Servirà leggere gli eventi degli edifici uno per uno.
- **[?]** Le condizioni di vittoria e sconfitta, ammesso che esistano.
- **[?]** Cosa fanno `noemi`, `dara`, `hap`, `wewe`, `upp`, `hc`.
- **[?]** Come funziona il tutorial (188 istanze, `tutpar`/`tutind`/`tutrl`).
- **[C]** `placeholder` (172 istanze in `match`, 48 in `match_easy`) sono gli
  **spazi vuoti dove il giocatore piazza gli edifici**. Confermato dall'autore.
- **[C]** Le 30 istanze senza sprite di `match_easy` sono controller invisibili
  (spawner e logica). L'autore lo ritiene probabile ma non lo ricorda con
  certezza: da riverificare quando toccheremo quegli oggetti.
- **[?]** `pepazzittecollider` (83 istanze in `match`) — **[I]** collisori
  invisibili del terreno. Nemmeno l'autore ricorda.

---

## 7. Cosa significa per la nuova versione

Sette decisioni che il codice attuale suggerisce, e che conviene prendere
consapevolmente invece di ereditarle.

**1. Serializzazione esplicita dal giorno uno.** È l'unica cosa che GameMaker
ci regalava e che nessun altro ci regalerà. Ogni entità deve sapersi
descrivere come dati semplici. Se lo aggiungiamo dopo, va riscritto tutto.

**2. Componenti, non ereditarietà.** I 231 figli di `notte_target` non sono una
gerarchia: sono un **tag**, "questo reagisce alla notte". Idem `oilzero_target`.
Un'entità con una lista di tag/componenti sostituisce l'albero dei parent e
sparisce il problema dell'ereditarietà singola.

**3. Le famiglie `impa*` diventano dati, non codice.** Quattro alarm da 12 KB
identici tranne che negli sprite sono una **tabella**: sequenza di frame,
durata, probabilità. Una sola macchina a stati che legge la tabella. Da sola
questa mossa cancella decine di migliaia di righe.

**4. Il ciclo giorno/notte è una tinta globale.** Non 24 `with (...)` per fase:
una fase attiva, un colore, e il renderer lo applica a tutti gli sprite in un
colpo solo. Con WebGL è letteralmente una uniform.

**5. L'interfaccia va in uno spazio schermo separato.** Basta bottoni che
ricalcolano la propria `x` dalla view a ogni frame. Un layer UI in coordinate
schermo, disegnato sopra, che non sa niente della camera.

**6. Ordinamento per y, dichiarato.** Il `depth = -y` sparso negli oggetti
diventa una regola del renderer: gli sprite del mondo si ordinano per y.

**7. Un solo percorso di input.** Niente `if (os_type == 4)` sparsi ovunque:
mouse e touch producono gli stessi eventi astratti (`pointerdown`/`move`/`up`),
e il layout si adatta alle dimensioni, non alla piattaforma. Sul web questo
viene gratis.

---

## 8. Da dove partire

**[I]** L'ordine che rischia meno:

1. **Renderer + camera + input.** Mappa che si trascina e si zooma, sprite
   ordinati per y, ciclo giorno/notte come tinta. Poco codice, e si vede subito
   se la direzione è giusta.
2. **Formato dati delle entità + serializzazione.** Prima di avere entità.
3. **Una room importata davvero**: `match_easy`, che ha già istanze e posizioni
   in `src/rooms/match_easy.json`. Anche solo disegnata, senza logica.
4. **Un edificio completo**, dal piazzamento all'upgrade, per validare tutto il
   giro.
5. Solo allora, il grosso: portare le famiglie di comportamenti, a gruppi.

Il punto 3 è la prima verifica seria: se importare 276 istanze da JSON e
vederle sullo schermo funziona senza attrito, la pipeline regge e il resto è
lavoro, non rischio.

---

## 9. Stato dell'implementazione

Aggiornato mano a mano che il codice in `game/` avanza lungo l'ordine del
paragrafo 8.

- **Punto 1 (renderer + camera + input) fatto.** `game/src/gl.js`,
  `camera.js`, `input.js`: batch WebGL2, zoom/pan veri, un solo percorso di
  input per mouse e touch, tinta giorno/notte come uniform globale invece
  che 24 gruppi ricolorati a mano.
- **Punto 3 (una room vera) fatto per `match_easy`.** `game/src/main.js`
  importa `src/rooms/match_easy.json` (via `tools/22_scene.py`), disegna le
  276 istanze ordinate per depth/y con gli atlas per-room di
  `tools/23_atlas.py` + `24_blit.py`.
- **Punto 4 (un edificio completo) fatto per `chies`.** È l'unico edificio
  di cui è stata ricostruita l'intera catena leggendo il codice
  decompilato (`src/objects/chies`, `upcrc12`, `upcrc23`): piazzamento su
  un `placeholder`, soglie di popolazione reali (pop≥500, pop≥1500), costi
  reali (mon/oil), l'animazione di cantiere sprite-per-sprite con le
  durate vere in tick, il cambio di sprite/vita a fine livello, il decoro
  che nell'originale viene ucciso e ricreato ad ogni salto (`cddvd` →
  `cddvd2` → `cddvd3*`). Codice: `game/src/buildings.js` (tabella dati,
  non macchina a stati per edificio — STUDIO.md §7.3), `game/src/state.js`
  (equivalente di `r12`, con [C]/[I] sulle regole economiche esatte),
  `game/src/save.js` (serializzazione esplicita, stessi nomi di slot
  dell'originale). Il costo di piazzamento e la curva di crescita di
  popolazione/denaro sono **[I]**: inferiti e tarati per essere giocabili
  in una sessione di prova, non letti da un `Create` che li dichiari — la
  ruota di scelta edificio (`cre1..cre4`) che li determinava davvero non è
  ancora stata ricostruita.
- **UI in spazio schermo: partita.** `game/src/font.js` +
  `tools/25_font.py` ritagliano ed usano il font bitmap vero
  dell'originale (`data/fonts.json`, "gotham_mid") per disegnare i numeri
  della barra risorse dentro il canvas, invece dei quadratini colorati
  segnaposto. È un ritaglio diretto da una texture page (niente
  ripacchettamento: un font è già un unico rettangolo di glifi), con lo
  stesso schema `blitplan.json` degli atlas — la pipeline di deploy ora lo
  rigenera anche lei.
- **Nota su `cre1..cre4`**: **non** sono una ruota di scelta edificio come
  inferito inizialmente. Sono sonde invisibili create dal `placeholder` sui
  suoi 4 angoli che, se toccano un altro `placeholder`, generano `dir1..4`
  — quasi certamente per capire quali celle vicine sono libere (edifici
  multi-cella, o un'indicazione visiva di espansione). `chies` resta
  l'unico edificio con una vera catena piazzamento→livello ricostruita: le
  altre famiglie simili (`upind12/23`, "industria") delegano l'animazione
  di passaggio di livello alla famiglia `impa*` (impatti/esplosioni,
  STUDIO.md §5.5, alarm fino a 12KB) invece che ad un `tic` semplice come
  `upcrc12/23` — un secondo edificio giocabile richiede prima quella
  famiglia, non è un copia-incolla di `chies`.
- **La famiglia `impa*` come dati, e secondo edificio giocabile: `industria`.**
  `game/src/buildings.js` generalizza `stepConstructions()` oltre al caso
  `chies`: gli `steps` di un cantiere possono avere uno sprite fisso o un
  array (scelta casuale uniforme, come i `action_if_dice(2)` binari letti
  nel codice — sempre 50/50, quindi un array pesa tutte le opzioni
  uguale), un drenaggio periodico di risorse (`drain: {mon, every}`,
  letto da `impaind*r/Alarm_10.gml`), e figli scenografici transitori
  (`spawn`, le gru/macerie). `industria` è il primo edificio a passare
  per questa macchina anche al piazzamento (`construct`, livello 0→1):
  a differenza di `chies` — già costruita in room, mai vista nascere dal
  giocatore — `industria` nell'originale passa per `impaind0to1r` fin
  dal primo livello, esattamente come i salti di livello successivi
  (`impaind1to2r`, `impaind2to3r`). Placeholder ora ha un selettore a due
  bottoni in spazio schermo (`Chiesa`/`Industria` in alto a sinistra) al
  posto della ruota `cre1..cre4` non ricostruita.
  Letti direttamente dal decompilato: `placeCost` 2000 mon **[C]**
  (`placeholder/Mouse_LeftReleased.gml`, `selec==2` — trovato per caso
  cercando dove viene creato `impaind0to1r`: la stessa funzione rivela
  anche i costi reali di *tutti* gli altri edifici piazzabili, non
  riletti qui), costi di potenziamento 5000/10000 mon **[C]**
  (`upind12`/`upind23`), `life` 50/100/200 **[C]** (`industria1/2/3`,
  valori assoluti per livello, non un bonus incrementale come in
  `chies`).
  Due semplificazioni scelte consapevolmente, non lette dal codice:
  1. Ogni `impa*` è in realtà una **coppia** di oggetti paralleli — "r"
     (le fondamenta a terra, quello che guida costi/durate/sprite finale)
     e "f" (un'impalcatura in sovraimpressione, sempre davanti a "r" —
     **[C]** `impaind0to1f/Create.gml`: `depth = -y - 2` contro `-y - 1`
     circa di "r" — con gru/fumo, che crea l'edificio successivo *prima*
     che "r" finisca la sua sequenza). Il **timing** della traccia "f" non
     è ricostruito (l'edificio successivo si completa alla fine della
     sequenza "r" invece che ~300 tick prima — la "coda" persa è
     scenografia, gru che si ritirano, non cambia costi né tempi in modo
     percepibile — e il "coperchio" a gru di fine cantiere, `im2f`/`im4f`,
     compare durante l'ultimo passo invece che al tic esatto dell'alarm
     indipendente originale). Il suo **aspetto**, però, ora si vede:
     senza, un cantiere era solo la fondamenta che cambia sprite, senza
     nessuna impalcatura davanti (segnalato dall'autore) — `if11..if46`
     sono, uno a uno, la stessa sagoma di `ir11..ir46` come reticolo
     invece che struttura piena, quindi `game/src/buildings.js`
     (`frontSprFor()`) li deriva dallo sprite "r" già scelto per il passo
     corrente invece di un dado indipendente. **[I]**
  2. Le catene tic da 22 passi di `impaind1to2r`/`impaind2to3r` sono
     troncate a tic 0..10 (dove la "f" spedirebbe l'edificio nuovo):
     stesso motivo, i tic 11..22 sono un replay a specchio degli stessi
     sprite (coda cosmetica). **[I]**
  Anche la soglia di sblocco del potenziamento è semplificata:
  l'originale arma `upind12`/`upind23` solo dopo che `industria1/2`
  hanno completato 667 cicli di produzione elettrica (120 tick l'uno,
  ~22 minuti) — non riprodotto perché la simulazione elettricità/fumo/
  fulmini di `industria` (vista leggendo `industria1/Step.gml` e
  `Alarm_0..9.gml`: produce `ele` consumando `oil`, emette fumo,
  rischia danni da fulmine nelle tempeste, ha un tool di demolizione
  separato da quello di potenziamento) è tutta un sistema a parte, non
  ancora portato. Qui il potenziamento è disponibile subito, gated solo
  dal costo. **[I]**
  Sprite aggiunti a `GAMEPLAY_SPRITES` in `tools/23_atlas.py`
  (`ir11..46`, `i11/i21/i31` e relativi decori — `gru1`/`gr21` c'erano
  già per `chies`).
- **`industria` produce elettricità per davvero.** Letto `industria1/2/3
  /Alarm_2.gml`: ogni edificio finito (non in cantiere) riarma un alarm
  ogni 120 tick che, se `r12.oil > 0`, consuma olio e genera energia a un
  tasso fisso per livello — **[C]** 7 olio → 50 energia (liv. 1), 20 → 120
  (liv. 2), 35 → 300 (liv. 3, livello massimo). `game/src/buildings.js`
  aggiunge `production` per tipo/livello e `stepProduction()`, chiamata
  da `main.js` accanto a `stepConstructions()`. L'alarm si riarma anche
  a olio esaurito (il ciclo "salta" senza produrre), riprodotto con un
  timer che accumula comunque.
  Questo ha sostituito una soglia di potenziamento che prima era
  **[I]** finta (`atPop: 0`, sempre sbloccato): `industria1/2/Step.gml`
  dichiarano per davvero che `upind12`/`upind23` si sbloccano solo dopo
  che l'edificio ha completato **[C]** 667 / 1000 cicli di produzione
  (`makee`, un campo per edificio, letto da `industria1/2/Create.gml`:
  parte da 0 e — punto che il codice originale ottiene gratis avendo un
  oggetto diverso per livello, e che qui va fatto a mano — **[C]** si
  azzera ad ogni salto di livello, non accumula fra livelli). La soglia
  di sblocco ora è o `atPop` (chies) o `atMakee` (industria):
  `upgradeProgress()` in `buildings.js` distingue le due letture.
  Conseguenza sul lato economia: `state.js` prima applicava a *tutti* gli
  edifici, industria inclusa, la formula placeholder generica di consumo
  olio/crescita popolazione (**[I]**, STUDIO.md §6). Ora `tickR12()`
  esclude dalla formula generica i tipi che dichiarano `production`, per
  non contare due volte lo stesso olio.
  **Non portato** (resta un gap esplicito, non finto): il fumo
  decorativo (`smoke_ind*`, puramente visivo), il danno da fulmine in
  tempesta (`Alarm_5`/`6`: **[C]** la regola è letta — dado 1/100..130,
  vita −50 — ma non è cablata perché `r12.storm` è sempre 0 e non esiste
  ancora nessun sistema che agisca su `life` arrivata a 0, quindi
  sarebbe codice morto se collegato ora) e `demobasia`
  (non è demolizione: è un "rifai in loco" a pagamento che rilancia lo
  stesso `impa*r` del livello corrente con una skin decorativa diversa,
  **[C]** letto da `demobasia/Collision_industria*.gml`, cosmetico).
- **Terzo edificio giocabile: `casa`.** Diverso dai primi due su due assi:
  è il primo con un aspetto scelto a caso invece che fisso (**[C]**
  `casa1/Create.gml`: 5 livelli di `action_if_dice(2)` annidati, letti
  come un pick uniforme fra **20 coppie** sprite+decoro — stesso principio
  del `pickSpr` già usato per gli step con sprite ad array, esteso a un
  campo `variants` sul tipo; la coppia scelta si salva sull'istanza
  (`b.decorSpr`) invece che nella tabella statica per livello, perché
  `currentDecor()` doveva sapere QUALE variante è stata tirata a sorte,
  non solo il tipo), ed è il primo la cui simulazione **consuma** risorse
  nel tempo invece di limitarsi a costruzione+potenziamento.
  Piazzamento: **[C]** `placeCost` 100 mon (`placeholder/Mouse_LeftReleased.gml`,
  `selec==1` → crea `impa0to1r`, non `impaind0to1r`: due oggetti diversi
  quasi identici, stessa scoperta della coppia r/f già nota per industria
  — qui il cantiere dura 790 tick invece di 850, letto da `impa0to1r/
  Create.gml` + `Alarm_0..3.gml`). La casa vera e propria (`casa1`) non è
  creata dalla traccia "r" che ricostruiamo, ma dalla "f" (`impa0to1f/
  Alarm_3.gml`, a tic 685 su 850) — stessa semplificazione già scelta per
  industria: costruiamo solo "r" e creiamo `casa1` alla fine della sua
  sequenza (790 tick) invece che a metà.
  **Crescita di popolazione reale**, non più solo formula-placeholder:
  **[C]** `casa1/Create.gml` assegna `pop += 2` alla nascita; poi
  `casa1/Alarm_2.gml` avanza uno stadio `ava` (0..5) ogni intervallo —
  fisso a 2000 tick il primo (**[C]** `action_set_alarm(2000,2)` in
  Create), poi scelto a dado uniforme fra 4 valori (3500/5796/11565/14656
  tick) — aggiungendo altri `pop += 2` per stadio, fino a `ava==5` dove
  l'originale fa comparire l'icona di potenziamento (`upsign12`).
  `stepGrowth()` in `buildings.js`.
  **Consumo elettrico reale**: **[C]** `casa1/Alarm_3.gml`, ogni 120 tick,
  in base allo stadio `ava` e a giorno/notte (`aura.night`) — la prima
  regola che dà al ciclo giorno/notte un effetto di **gioco** reale, non
  solo la tinta cosmetica di STUDIO.md §5.2: `main.js` calcola
  `isNight(phaseT)` dalla stessa tabella `PHASES` usata per il colore.
  `stepConsumption()` in `buildings.js`.
  `state.js`/`tickR12()` esclude ora anche i tipi con `growth` dalla
  formula placeholder generica (oltre a quelli con `production`), per lo
  stesso motivo di industria: non contare due volte la stessa popolazione.
  **Non portato**, per lo stesso principio già applicato a industria (letto
  ma non cablato dove servirebbe un sistema che ancora non esiste): il
  danno da fulmine (`Alarm_5`, uguale schema di industria); il "rifai in
  loco" a pagamento (`Mouse_LeftPressed`/`demobasia`, cosmetico — e infatti
  `demobasia/Collision_casa1.gml` crea `impacasa1r`, non `impa1to2r`: sono
  due catene diverse, la prima l'abbiamo scartata per errore di lettura
  iniziale, vedi sotto); e — letta ma **non capita abbastanza da
  cablarla** — la sommossa (`Alarm_4`: se `r12.hap == r12.pop` e
  `r12.ele <= 0` compaiono `sold1..6` in base allo stadio `ava`;
  l'uguaglianza esatta fra `hap` e `pop` è una condizione strana per
  essere quella vera, e `hap`/`wewe` oggi non sono nemmeno aggiornati da
  nessun edificio nella nuova versione — meglio lasciarla un gap
  dichiarato che indovinarla).
  Sprite aggiunti a `GAMEPLAY_SPRITES` in `tools/23_atlas.py`: le 20
  varianti `c1xx`/`c1xxl` (poi anche `c2xx`/`c3xx`, vedi sotto); il
  cantiere riusa gli `ir1x` già presenti per industria (stesso schema di
  sprite, oggetto diverso).
- **Potenziamento `casa1→casa2→casa3`.** Ripreso subito dopo il primo
  passaggio su `casa`, che lo dava per fuori scope pensando che
  `impacasa1r`/`impacasa1f` (creati da `demobasia/Collision_casa1.gml`)
  fossero la catena di potenziamento: **non lo sono**, sono il "rifai in
  loco" cosmetico (stesso ruolo del `demobasia` di industria). La catena
  vera è `upsign12` → **[C]** `impa1to2r`/`impa1to2f`
  (`upsign12/Mouse_LeftPressed.gml`), e poi `upsign23` → `impa2to3r`/
  `impa2to3f` allo stesso modo. Costi **[C]** 500 mon (`casa1→2`) e 2000
  mon (`casa2→3`), entrambi letti da `upsignXX/Mouse_LeftPressed.gml`.
  Struttura dati: `growth`/`consumption` diventano array indicizzati per
  livello attuale (`b.level - 1`, stesso schema di `production` per
  industria — sono "come si comporta l'edificio così com'è", non "cosa
  succede a fine cantiere"), mentre `variants` si sposta da un campo del
  tipo a un campo di ciascun `construct`/`upgrades[i]` (ogni livello ha
  le sue 20 varianti: **[C]** `casa2/Create.gml` e `casa3/Create.gml`,
  stesso schema a dado di `casa1`). Lo sblocco del potenziamento è una
  terza specie di soglia, `atAva` (crescita completa, `ava==5`), accanto
  alle già note `atPop` (chies) e `atMakee` (industria) —
  `upgradeProgress()` in `buildings.js` le distingue tutte.
  Il cantiere `casa1→casa2` (**[C]** `impa1to2r/Create.gml` +
  `Alarm_0.gml`, catena a `tic` 0..10, 990 tick totali) è l'unico fra
  tutti i cantieri portati finora che **non richiede nessuna troncatura**:
  l'originale stesso chiama `action_kill_object()` a tic==10, senza coda
  a specchio da tagliare. Il cantiere `casa2→casa3` invece è la stessa
  forma già vista per `impaind2to3r` di industria — una catena a `tic`
  0..22 con una coda cosmetica speculare da tic 11 in poi — e viene
  troncata a tic 0..10 allo stesso modo, stessa motivazione (STUDIO.md
  sopra, "secondo edificio giocabile: industria", semplificazione 2).
  `grantPop` (14 per casa2, 40 per casa3, **[C]** `casa2/3/Create.gml`) e
  `life` (200/300, **[C]**) si applicano a fine cantiere come per
  qualunque `up.life`/`up.grantPop`. `b.ava`/`b.makee` e i relativi timer
  si azzerano ad ogni salto di livello, insieme (prima si azzerava solo
  `makee`, ora anche `ava`/`growthT`/`growthNext`/`consT`, nello stesso
  punto di `stepConstructions()`).
  Sprite aggiunti a `GAMEPLAY_SPRITES`: le varianti `c2xx`/`c2xxl` e
  `c3xx`/`c3xxl`; il cantiere `casa2→casa3` riusa `gru1` (già presente,
  letto da `impa2to3r/Alarm_0.gml`, tic==3 — l'oggetto creato si chiama
  `gru`, non `gru1`, ma `gru` disegna proprio lo sprite `gru1`).
- **Le tempeste sono cosmetiche in `match_easy`, e il danno da fulmine è
  morto anche nell'originale.** Prima di mettere mano al sistema
  vita/distruzione ho letto `r12` (STUDIO.md §4, "il regista del mondo")
  per capire cosa accende davvero `r12.storm`. **[C]** `r12/Alarm_2.gml`:
  il ramo `match` normale usa `storm` (dado 1/800 al secondo, dura
  1800/2100 tick), ma il ramo `match_easy` — quello su cui gira questa
  riscrittura — usa una variabile **diversa**, `stormeasy` (dado 1/450,
  stessa durata). **[C]** Ho cercato `stormeasy` in tutti gli oggetti: lo
  legge solo `r12` stesso, per le nuvole scure/pioggia cosmetiche
  (`nidark_slow`, `rainlauncher`). Nessun edificio lo controlla mai. Il
  danno da fulmine letto per industria/casa (Alarm_5/6) controlla invece
  `r12.storm` — che su `match_easy` **non viene mai impostato**. Quindi:
  non è che la nostra riscrittura non ha ancora collegato quel danno, è
  che il gioco originale stesso, su questa mappa, non lo attiva mai.
  Costruire un sistema vita/morte apposta per abilitarlo sarebbe infedele,
  non incompleto. Ho controllato anche da dove partono le minacce vere
  (bombe/aerei/zeppelin, `r12/Alarm_5/6.gml`): dipendono da contatori
  (`bombn`, `diron`, `ondan`) che partono a 0 e che nessun oggetto letto
  finora incrementa — trovarli è lavoro serio a sé, coerente con "le
  altre ~85 famiglie `impa*`" già segnate sotto, non un seguito rapido.
- **GUI vera: barra risorse e bottoni edificio.** Sostituiti i
  segnaposto (quadratini colorati, bottoni rettangolari col solo testo)
  con gli sprite e i font reali dell'originale.
  **Barra risorse**: **[C]** `repre/DrawGUI.gml` — la prima ipotesi (icona
  per statistica + font "gotham_mid" rimpicciolito) era sbagliata su
  entrambi i punti. È un `DrawGUI`, quindi le coordinate sono già spazio
  schermo assoluto: un'unica immagine con le quattro icone già disegnate
  dentro (`icone_oriz`, 604×55) e i numeri in un font *diverso* da quello
  usato altrove (`gotham_mini`, non lo stesso rimpicciolito — estratto con
  la stessa pipeline di `tools/25_font.py`), agli offset letti nel
  decompilato: pop 30px, olio 142px, energia 228px, denaro 340px, tutti a
  y=30. Colore nero, come lo stato "non hover" dell'originale
  (`action_color(0)`) — lo stato hover (testo bianco, sfondo
  `icone_orizz_hc`) non è riprodotto: non esiste un concetto di hover nel
  nostro input touch-first (STUDIO.md §7). `global.upp` (l'offset di
  sicurezza per notch/status-bar sommato a quasi tutte le y della GUI,
  **[?]** STUDIO.md §6) resta non identificato: trattato come 0.
  **Bottoni edificio**: `pu1` (casa, `selec==1`) e `pu2` (industria,
  `selec==2`) — **[C]** `pu1|pu2/Step.gml`. Ciascuno ha due sprite,
  normale e "selezionato" (`p1`/`p1ss`, `p2`/`p2ss`), scambiati in base a
  `r12.selec` — **non** un tint come nella prima versione, sono disegni
  diversi (la variante selezionata è la stessa sagoma ricolorata a mano
  nell'arte originale). Ancorati in basso a sinistra a x=0/184 — nel
  nostro spazio schermo già a scala costante l'equivalente diretto di
  `184*global.sca` è lo stesso numero in pixel, senza bisogno del
  balletto di contro-scala che serviva all'originale (STUDIO.md §2).
  `r12.selec` ora viene scritto per davvero al tocco del bottone (prima
  esisteva nello stato ma nessuno lo toccava mai).
  **`chies` non ha un vero bottone**: non è mai piazzata dal giocatore
  nell'originale (STUDIO.md, "secondo edificio giocabile"), quindi non
  esiste un `pu0`/`p0` da leggere. Resta un bottone di test, disegnato
  deliberatamente in uno stile diverso (rettangolo blu con testo, non uno
  sprite reale) per non farlo passare per un bottone vero.
  **Non riprodotto**: i cartellini di prezzo a comparsa sul passaggio del
  mouse (`cc100`, `cc2000ind`, STUDIO.md §5.4 — richiederebbero tracciare
  l'hover, che il nostro `Input` oggi non fa); gli altri ~18 bottoni della
  barra (`pu3..puvillone`, `puruspa`/`pureset` — zoom, occhio, reset,
  *bulldozer*: `ruspa` è italiano per "ruspa/bulldozer", quasi certamente
  il vero strumento di demolizione, distinto sia da `demobasia` — il
  "rifai in loco" — sia dal tool di potenziamento; non ancora letto); il
  calendario cosmetico (`repre` disegna anche un mese Gen–Dic e un giorno,
  legato a un contatore locale confuso col nome della variabile denaro di
  `r12` — stesso nome, oggetti diversi).
  Sprite aggiunti a `GAMEPLAY_SPRITES` (categoria `gui`, nuova):
  `icone_oriz`, `p1`, `p1ss`, `p2`, `p2ss`. Font `gotham_mini` estratto ed
  impaginato con la stessa pipeline di `gotham_mid`.
- **`chies` è l'edificio unico e preesistente, non un tipo piazzabile.**
  Correzione di un errore: la versione precedente trattava `chies` come un
  quarto "tipo" scelto dal selettore, con un bottone di test per piazzarne
  quante se ne vuole. Sbagliato su due fronti — **[C]** `src/rooms/
  match_easy.json` ha **una sola** istanza `chies`, a centro mappa
  (851,513): non nasce da un placeholder e il giocatore non ne piazza
  altre (STUDIO.md §5.3, già scritto ma non tradotto in codice). Ora
  `main.js` toglie quell'istanza da `staticWorld` e la aggiunge a
  `buildings` all'avvio (`seedChies()`, solo a partita nuova — se c'è un
  salvataggio la chies ricaricata è già lì), cosi' la sua catena di
  potenziamento vera (upcrc12/upcrc23) resta raggiungibile toccandola. Il
  bottone di test è sparito; `selectedType` di default è `"casa"`.
  **Effetto collaterale scoperto testando la correzione**: toccare chies al
  centro esatto della sua posizione non la selezionava — ci arrivava prima
  `air2` (**[C]** 1920×1564, depth -1, `mask_sprite: null` nel decompilato:
  nell'originale non ha mai potuto ricevere click, non ha maschera di
  collisione). **Non** è un layer atmosferico come ipotizzato qui in un
  primo momento: è il terreno/strade/piazza dell'intera mappa, completamente
  **opaco** (verificato pixel per pixel sull'atlas generato) — il nome e il
  fatto che sia figlio di `notte_target` (STUDIO.md §5.3) traggono in
  inganno. Il picking ora fa due passate: la prima considera solo cio' che
  e' davvero interattivo (placeholder, edifici) a prescindere dal depth; la
  seconda, di fallback, e' il vecchio "per z-order" usato solo per
  ispezionare la scena nell'HUD di debug.
  Lo stesso equivoco aveva un effetto **visivo**, non solo sul tocco, mai
  notato finché non segnalato dall'autore ("vedo solo le luci di chies, non
  l'edificio"): `air2` a depth -1 disegnava *sopra* ogni oggetto "di mondo"
  fermo a depth 0 (edifici, alberi — la y non li distingueva mai da lui,
  perché il confronto si fermava al depth prima di arrivarci), coprendo
  tutto tranne il bagliore delle finestre di chies, che per il solo caso
  fortuito della propria y finiva sopra `air2` nell'ordinamento. Risolto
  dando alle istanze "di mondo" un depth effettivo di `-y` invece del
  `depth: 0` statico della room (`main.js`, `effDepth()`) — la stessa regola
  che l'originale applicava dinamicamente nel `Create` di ogni edificio
  (confermato dal decompilato: `impaind0to1f/Create.gml` ha
  `depth = -y - 2`), qui dichiarata una volta sola nel comparatore invece
  che in ogni oggetto.
- **Le tempeste diventano reali (regola di `match`, non `stormeasy`).**
  Deciso di portare comunque `r12.storm` — non perché serva a
  `match_easy` (dove resta cosmetica, vedi sopra), ma perché è la regola
  che conta su `match`, la mappa difficile, ed è quella che il danno da
  fulmine di industria/casa legge davvero. **[C]** `r12/Alarm_2.gml`
  (ramo `match`): ogni secondo, un dado 1 su 800 fa iniziare una tempesta,
  che dura 30 o 35 secondi (**[C]** `r12/Alarm_7.gml` la spegne).
  `stepWeather()` in `state.js`.
  Danno da fulmine per livello, letto per davvero invece di lasciarlo
  inerte: **[C]** `industria1/Alarm_5.gml`, `industria2/Alarm_5.gml`,
  `industria3/Alarm_6.gml`, `casa1/Alarm_5.gml`, `casa2/Alarm_5.gml` — ogni
  57 tick, se la tempesta è attiva, un dado toglie vita.
  **Scoperta leggendo `casa3`**: nel decompilato arma un `Alarm_5`
  (`action_set_alarm(23,5)` in Create.gml) ma non esiste nessun
  `casa3/Alarm_5.gml` — l'alarm scatta e non fa niente, codice morto
  nell'originale stesso. Riprodotto fedelmente: `casa3` non prende mai
  danno da fulmine nella tabella `storm` di `buildings.js`.
  `stepStormDamage()` in `buildings.js`.
  **Primo sistema vita/morte reale**: quando `life` arriva a 0
  (`destroyBuilding()` in `main.js`) si applica il bilancio popolazione del
  livello a cui è morto (**[C]** `casaX/Destroy.gml`: -10/-34/-60 — non
  l'esatto opposto di quanto guadagnato in vita, l'originale stesso non
  torna) e il placeholder torna libero. **Semplificazione dichiarata**:
  nell'originale l'edificio distrutto resterebbe un rudere (`ruin1/2/3`)
  riparabile solo con lo strumento ruspa/bulldozer (`selec==11`,
  `puruspa`, mai ricostruito — vedi sotto) pagando per rifarlo con la
  stessa catena "rifai in loco" di `demobasia`: un vicolo cieco per chi
  gioca senza quello strumento. `industria` tocca `hap` in `Destroy.gml`
  invece di `pop`, ma `hap` non è tracciato da nessun'altra parte del
  gioco (STUDIO.md, deciso già per `industria`/`casa`): per coerenza resta
  fuori anche qui, non solo per industria.
- **Zoom fluido, con limiti sensati, e nero fuori dai confini della mappa.**
  Tre correzioni distinte alla camera:
  1. Lo zoom da rotella applicava l'intero salto in un frame solo
     ("scattoso"): ora `Camera.setZoom()` aggiorna solo un `targetZoom`, e
     `Camera.update()` (chiamata una volta a frame) lo insegue con
     un'interpolazione esponenziale, ricalcolando il pan ad ogni passo
     cosi' il punto sotto al cursore/dito resta fermo per tutta la durata
     dell'animazione, non solo all'inizio e alla fine. L'originale non
     aveva questo problema: `zoom_plus`/`zoom_minus` avanzavano già
     gradualmente da soli (STUDIO.md §2, "0,005 per frame") — qui e' la
     controparte per un input istantaneo come la rotella.
  2. `minZoom` (quanto ci si può avvicinare) abbassato da 0.25 a 0.5: sotto
     quella soglia gli sprite, disegnati alla risoluzione nativa
     dell'atlas, si vedevano ingranditi oltre il loro dettaglio reale
     ("sgranati"). `maxZoom` (quanto ci si può allontanare) non è più un
     numero fisso (era 8, ben oltre la mappa): ora si ricalcola ad ogni
     `resize()` come 1.3× lo zoom che inquadra tutta la room, cosi' non ha
     senso allontanarsi molto oltre "si vede tutta la mappa".
  3. Zoomando indietro oltre i confini della room si vedevano i bordi del
     terreno "strappati" (il terreno non è disegnato per essere visto da
     fuori dai suoi bordi). Non ho trovato un oggetto originale dedicato a
     questo: l'originale aveva il limite di zoom minimo esplicito apposta
     per non mostrare mai la mappa intera su `match` (STUDIO.md §2), quindi
     il problema a monte non si poneva mai. `main.js` ora disegna quattro
     rettangoli fuori dal rettangolo di schermo dei confini della room
     (calcolato con `cam.worldToScreen`), nel layer GUI — l'effetto atteso,
     non il vincolo a monte che lo evitava nell'originale. Bianchi, non
     neri: con la UI (icone nere) sopra e zoom-out sufficiente, un
     rettangolo nero ci finiva sotto — nero su nero, illeggibile (segnalato
     dall'autore, deciso insieme).
- **Cosa manca prima del punto 5** (portare le famiglie di comportamenti a
  gruppi): il *timing* della traccia "f" degli `impa*` (l'aspetto — le
  impalcature stesse — ora si vede, vedi sopra su industria/casa); il sistema
  `hap`/`wewe` (felicità/inquinamento visivo) e la sommossa che ne
  dipende; i "rifai in loco" cosmetici (`demobasia` + `impacasa*`/
  `impaind*` "rifatti") e il vero strumento di demolizione/riparazione
  (`puruspa`, `selec==11` — oggi la distruzione libera subito il
  placeholder invece di lasciare un rudere riparabile solo con
  quello strumento); gli altri ~17 bottoni della barra (zoom, occhio,
  reset — non più `puruspa`, appena discusso); le altre ~85 famiglie
  `impa*` (armi, minacce, altri edifici) non ancora lette; da dove
  arrivano davvero le minacce vere (bombe/aerei/zeppelin: dipendono da
  contatori — `bombn`, `diron`, `ondan` — che partono a 0 e che nessun
  oggetto letto finora incrementa).
- **Otto bug segnalati dall'autore dopo aver giocato la build precedente,
  tutti risolti insieme**:
  1. **Depth**: vedi sopra (`air2`/effDepth). Gli edifici piazzati dal
     giocatore avevano lo stesso bug da un'altra strada — nascevano con il
     depth del `placeholder` che occupavano (-5000, "sempre in primo
     piano", corretto per un segnaposto ma non per un edificio vero), non
     con un depth "di mondo": `placeAt()` ora passa `0`, come chies.
  2. **"Vedo solo le luci di chies"**: stesso bug del punto 1 (`air2` sopra
     la chiesa, sotto solo al suo bagliore per un caso di y).
  3. **Persistenza**: il gioco è ancora in sviluppo attivo, e un autoload
     silenzioso da `localStorage` a ogni apertura pagina faceva ripartire
     ogni sessione di test dallo stato di una build precedente, mascherando
     esattamente le modifiche appena fatte. Tolto l'autoload e l'autosave
     automatico (periodico + `beforeunload`): ogni caricamento è ora una
     partita nuova, S/L restano per salvare/caricare a mano dentro la
     stessa sessione.
  4. **Cantiere poco leggibile**: la traccia "f" (impalcatura in
     sovraimpressione) non era mai stata disegnata — vedi sopra.
  5. **Icone illeggibili con zoom-out eccessivo**: la vignetta fuori mappa
     era nera come le icone della UI che ci finivano sopra — nera su nera.
     Cambiata in bianca (vedi sopra), deciso insieme fra tre opzioni
     (l'alternativa "icone bianche di notte" scartata: non copriva il caso
     "vignetta visibile di giorno").
  6. **Luci sempre accese**: il decoro (bagliore finestre, STUDIO.md §5.3
     "notte_target") non veniva mai nascosto di giorno. `main.js` ora lo
     filtra da `frameList` quando `!isNight(phaseT)`.
  7. **Placeholder sempre visibili**: dovevano esserlo solo sotto al
     puntatore — **[C]** `placeholder/Create.gml` parte con sprite `empty`
     (invisibile), e solo `Mouse_MouseEnter`/`Mouse_MouseLeave` lo cambiano
     in `phold` (il rombo viola) e viceversa; qui restavano sempre `phold`.
     Aggiunto un vero hover: `input.js` traccia la posizione del puntatore
     ad ogni `pointermove` indipendentemente da drag/pinch in corso
     (`input.hover`, `null` quando il puntatore lascia il canvas — su
     touch, anche al sollevamento del dito: il touch non ha hover senza
     contatto, stessa limitazione dell'originale su mobile); `main.js` lo
     confronta ogni frame contro i placeholder liberi e disegna solo quello
     sotto al puntatore. Il tocco per costruire resta valido ovunque, anche
     senza hover precedente (il picking in `input.onTap` non e' cambiato):
     altrimenti un tap diretto su touch, che non genera mai un hover prima
     del tocco, non avrebbe piu' funzionato.
  8. **"Doppia casetta"**: `pu1` e' anche lei gia' un'istanza vera nella
     room (**[C]** sprite `p1`, la stessa del bottone "casa" — nell'originale
     e' un pannello invisibile che genera i propri figli/bottoni via codice,
     STUDIO.md §5.4), mai tolta da `staticWorld` come si era gia' fatto per
     `chies`: restava un secondo bottone "casa" fantasma, disegnato come
     sprite di mondo proprio sopra a quello vero in spazio schermo. Tolta
     allo stesso modo di `chies`.
     Colta l'occasione per rappresentare anche il resto del menu originale.
     Un primo tentativo li mise tutti su due righe fisse, sempre visibili —
     comodo ma non e' cosi' che il pannello era organizzato davvero
     (l'autore ha chiesto di ricontrollare): **[C]** rileggendo
     `src/objects/pu1/Create.gml` insieme al `Mouse_LeftPressed.gml` di
     `buildbutton`/`eyebutton`/`backobutton`, il pannello e' tre righe
     **alternate**, mai tutte visibili insieme, pilotate da `pu1.menoo`
     (0/1/2 — ogni bottone figlio nel proprio `Step.gml` fa `with (pu1) {
     if (menoo==N) break }` poi si posiziona o va fuori schermo):
     - **menoo 0** (avvio): `handbutton` (mano — **[C]**
       `Mouse_LeftPressed.gml`: `r12.selec = 0`, deseleziona), `buildbutton`
       (la gru — apre menoo 1), `eyebutton` (l'occhio — apre menoo 2).
     - **menoo 1**, aperta dalla gru: casa/industria (veri) + il resto dei
       piazzabili — `pu7` (parco, **[C]** `selec==7`, sbloccato a parte nel
       decompilato: qui sempre visibile), `pu3` (lanciamissili), `pu6`
       (grattacielo), `pu4prov` (pala eolica), `pu5prov` (laser), `pudj`
       (club), `pusolare` (pannelli solari), `pugatling` (mitragliatrice),
       `puvillone` (villa), `pumediat` (museo), `puruspa` (ruspa, STUDIO.md
       "mai ricostruita") — nessuno in `BUILDING_TYPES`: selezionabili come
       casa/industria (evidenziati con lo sprite "ss"), ma toccare un
       placeholder mostra "non ancora ricostruito" invece di costruire
       (costi reali dove `placeholder/Mouse_LeftReleased.gml` li dichiara
       esplicitamente, altrimenti omessi, non inventati) — piu'
       `backobutton` in fondo (torna a menoo 0).
     - **menoo 2**, aperta dall'occhio: `eyebutton1/2/3` (segnaposto, mai
       ricostruiti — probabilmente filtri di visualizzazione) e
       `zoom_plus`/`zoom_minus`, le uniche due che fanno davvero qualcosa:
       richiamano lo stesso `cam.setZoom` gia' agganciato a rotella/pinch —
       piu' `backobutton`.
     `menoo` e' locale a `main.js`, non un campo di `pu1` (che non esiste
     piu' come istanza, vedi sopra). L'ordine dei piazzabili nella riga 1 e'
     "tutti visibili, uno slot ciascuno": l'originale ne affianca alcuni in
     ordine diverso e ne nasconde altri a vicenda sullo stesso slot in base
     al progresso di gioco (`pu4prov`/`pu5prov`/`pudj`/`pusolare`/
     `pugatling`/`puvillone`/`pumediat` condividono `x=591` nel
     decompilato) — non tracciato qui, quindi mostrati tutti fianco a
     fianco invece che a rotazione.
     **Limite noto**: la riga bottoni non va a capo su schermi stretti (puo'
     uscire dal bordo destro su mobile, specialmente la riga 1 che ora ha
     14 voci) — non ricostruito, fuori dallo scopo di questo giro di
     correzioni.

- **Alberi/auto decorative allineati al comportamento originale, zoom solo
  mobile, UI pixel-perfect, luci finalmente accese.** Cinque correzioni
  distinte, segnalate insieme dall'autore:
  1. **Alberi tutti identici**: `albe`/`albe2`/`albe3` (STUDIO.md §5.3)
     sceglievano a dado uno sprite finale diverso per istanza nel proprio
     `Create.gml` — qui restavano sempre allo sprite di default della room
     (`a1`/`a21`/`a31`), quindi le 131 istanze di `albe` in `match_easy`
     erano visivamente lo stesso identico albero ripetuto. `main.js` ora
     applica la stessa tavola di probabilita' (`treeVariant()`) una volta
     al caricamento della scena. Non portata la meccanica di diffusione
     (`albe/Collision_r12.gml`, un albero che al contatto con `r12` puo'
     trasformarsi in `albe2`/`albe3`): gli alberi non sono interattivi in
     questo motore, e nessuna istanza `albe2`/`albe3` esiste comunque nella
     room — sarebbe codice morto.
  2. **Auto decorative ferme**: `honda_facile_1`/`honda_facile_2`
     (STUDIO.md §5.3 "veicoli_target", le uniche due istanze vere in
     `match_easy.scene.json`) nell'originale guidano lungo un percorso
     fisso a spezzate — direzione/velocita'/sprite cambiano a tick precisi
     scanditi da una catena di `alarm`, poi l'istanza si ricrea da capo al
     punto di partenza se c'e' ancora olio — ma qui restavano le comparse
     immobili della room. Portata in `game/src/cars.js` come tabella dati
     (`CAR_TYPES`, stesso approccio di `buildings.js`): `honda_facile_1` in
     realta' non svolta mai (**[C]** il suo `Create.gml` arma solo
     l'alarm di durata vita — gli `Alarm_1..6` che pure esistono nel
     decompilato non vengono mai armati, codice morto anche nell'originale),
     `honda_facile_2` ha la catena completa a 7 fasi. Tolte da
     `staticWorld` e sostituite da istanze simulate; tint fanali una tantum
     alla nascita se e' notte (**[C]** `action_sprite_color(16366009, 1)` —
     GameMaker codifica i colori R+G*256+B*65536, non 0xRRGGBB: va
     riscomposto, non letto come esadecimale diretto).
  3. **Zoom libero su desktop, sprite sfumati**: la rotella cambiava lo
     zoom anche su mouse/desktop, e li' "zero zoom, solo interfaccia
     pixel perfect" era la richiesta esplicita (l'unico input pensato per
     lo zoom e' il pinch, mai generato da un mouse). `isMobile` in
     `main.js` (un `matchMedia("(pointer: coarse)")`, il segnale che il
     browser da' per un device a tocco) disattiva `input.onZoom` del tutto
     su desktop e i due bottoni zoom+/zoom- nel menu "vista"; la camera si
     blocca a `pixelPerfectZoom()` — zoom uguale al `devicePixelRatio`, non
     a 1, altrimenti su schermi hidpi un texel dell'atlas coprirebbe piu'
     di un pixel fisico e si vedrebbe comunque sfumato. Su mobile lo zoom
     resta quello di prima (pinch + fit-to-screen automatico).
  4. **Risorse e bottoni al bordo dello schermo**: la barra risorse era
     disegnata a `(0, 20)` e la riga bottoni ancorata a `x=0`/
     `y=clientHeight`, letteralmente il primo/ultimo pixel della finestra —
     sotto una eventuale status bar o gesture bar, non "dentro
     l'interfaccia". `main.js` ora inserisce un margine (`UI_MARGIN = 8`)
     su entrambi, con le coordinate sempre arrotondate all'intero (un
     offset frazionario ricampionerebbe lo sprite fra due pixel fisici,
     vanificando lo zoom pixel-perfect del punto precedente).
  5. **"Le luci non funzionano"**: il decoro luminoso (bagliore finestre di
     chies/casa/industria, aggiunto da `addDecor()` — STUDIO.md §5.3
     "notte_target", cddvd/d1NN/di11b) di notte veniva moltiplicato per la
     stessa tinta ambientale scura di tutto il resto del mondo: una luce
     che si scurisce quanto il buio intorno e' invisibile, non "accesa".
     L'originale risolveva lo stesso problema dando al decoro un depth piu'
     vicino di 1 rispetto al proprio edificio (**[C]** `cddvd/Create.gml`:
     `depth = -y - 1`, gia' presente in `addDecor()` ma finora ignorato dal
     resto del disegno) per "saltare" davanti a cio' che scurisce la scena;
     qui l'equivalente e' che la tinta giorno/notte non e' piu' un uniform
     di shader globale ma una moltiplicazione in JS per ogni sprite
     (`mulTint()`), saltata apposta per i decori marcati `_selfLit` — la
     stessa idea "salta davanti al filtro colorato", implementata dove il
     nostro renderer puo' davvero applicarla. In piu' l'accensione/
     spegnimento comparivano di scatto: l'originale anima la transizione
     con uno sprite dedicato, un frame per tick (es. "crclx", 200 frame —
     verificato pixel per pixel: e' una dissolvenza in alpha dello stesso
     disegno, non un effetto diverso frame per frame, la bbox che si
     restringe verso i frame finali e' solo il ritaglio automatico dei
     margini trasparenti di GameMaker). Impacchettarli tutti per riprodurla
     frame per frame sarebbe costato piu' VRAM da solo (un singolo sprite
     grande quanto l'edificio, 200 frame: ~300 MB decompressi) di tutto
     l'atlas attuale, per coprire pure varianti che una singola partita non
     usa mai tutte (60 decori possibili di `casa`, uno scelto a dado per
     istanza): `stepLights()` anima invece un fade in alpha sullo sprite
     fermo gia' caricato, stessa durata (200 tick), con soglia di
     elettricita' (`r12.ele > 3`, **[C]** `cddvd/Step.gml`) sotto cui la
     luce non si accende.

- **`parco` (quarto edificio piazzabile) e i lampioni, finora un bottone
  segnaposto.** Era in `OTHER_BUILDINGS` da subito (`selec==7`, costo 500
  gia' letto da `placeholder/Mouse_LeftReleased.gml`) ma non in
  `BUILDING_TYPES`: toccare un placeholder con "Parco" selezionato mostrava
  "non ancora ricostruito". `lampioncino`/`lampla` (il lampione e la sua
  luce, STUDIO.md §5.3) non compaiono mai da soli nella room di
  `match_easy` (0 istanze in `match_easy.scene.json`, contro le 5 di
  `match`) — l'unico modo in cui esistono davvero e' come figli di
  `parco/Create.gml`, che ne piazza a dado insieme ad alberi in 7
  posizioni fisse intorno a se'. Aggiunto in `buildings.js`
  (`BUILDING_TYPES.parco`, cantiere da 150 tic che riusa gli stessi sprite
  ir1x/if1x di industria/casa, 8 varianti finali a dado come casa) e
  `main.js` (`PARCO_SLOTS`/`spawnParcoScatter()`, intercettato dove
  `spawnDecor()` normalmente leggerebbe un decoro fisso per livello — qui
  non esiste, ogni slot e' un'entita' diversa a dado). I lampioni
  scaturiti riusano di peso il sistema "luce" appena descritto sopra
  (`addDecor()` con `lit: true` per il bagliore, `lit: false` — nuovo, per
  il palo fermo e per gli alberi dello scatter — per tutto il resto che
  non deve saltare la tinta giorno/notte). Verificato piazzando un parco e
  saltando a notte: i lampioni si accendono con la stessa dissolvenza
  delle finestre.

- **Semafori** (segnalati dall'autore come "quei pali che esistono gia'
  nella room, ce ne sono 44 o giu' di li" — 48 per l'esattezza): non
  saltavano fuori da nessuna ricerca per nome ("semaforo", "traffic
  light", ...) perche' **[C]** l'autore originale non li ha mai
  rinominati — restano `object8` (il palo, sprite `"se"`, gia' 48 istanze
  in `match_easy.scene.json`) e `object37` (il figlio che lampeggia,
  creato da `object8/Create.gml`). Non e' un vero ciclo rosso-giallo-verde
  sequenziale: **[C]** `object37/Alarm_3.gml` sceglie a dado un tappo
  colorato — giallo `"se2"`/rosso `"se4"` 25% ciascuno, verde `"se3"` 50%
  — lo tiene acceso per 74/80/109 tick (**[C]** `Alarm_4.gml`, altro dado),
  poi 13 tick di buio (`"empty"`, **[C]** `Alarm_0.gml`) prima del
  prossimo colore, all'infinito; il primo intervallo (prima di accendersi
  la prima volta) e' piu' lungo, 30 o 308 tick a dado (**[C]**
  `object37/Create.gml`). Sempre acceso, giorno e notte — a differenza
  delle luci di finestre/lampioni non dipende da `aura.night` ne'
  dall'elettricita', e infatti non ha alcuna dissolvenza: e' un cambio di
  sprite di scatto, non un fade. Nuovo `game/src/semaphores.js`
  (`createSemaphore()`/`stepSemaphores()`, stesso approccio dati di
  `cars.js`): un'istanza per ognuno dei 48 pali gia' in `staticWorld` (il
  palo stesso non si tocca, resta com'era), depth `-y - 1` come le altre
  luci con `_selfLit` per saltare la tinta giorno/notte allo stesso modo.

- **Il traffico cresce nel tempo, non solo le due auto fisse** (chiesto
  dall'autore a memoria, confermato leggendo il codice). **[C]**
  `r12/Create.gml` crea `carmaker` incondizionatamente (`action_create_
  object(carmaker, 0, 0)`, fuori da qualunque `action_if_number(736,...)`
  di ramo-room): esiste in ogni room, non solo `match`. `carmaker/
  Alarm_0.gml` ogni 3600 tick (60s) fa comparire un'altra `honda3..9`, una
  alla volta (contatore `made`, da 2 a 8), finche' non sono arrivate tutte
  e sette — poi il timer continua a girare ma non trova piu' nessun `made`
  da far corrispondere, innocuo. Portato in `game/src/cars.js`
  (`CARMAKER_SCHEDULE`, sette voci a 60/120/.../420 secondi) e `main.js`
  (`carmakerT`/`carmakerIdx`, stesso schema di `stepCars`/`spawnCar` gia'
  in uso per honda_facile_1/2).
  Ogni `honda3..9` e' la stessa catena di alarm direzione/velocita'/sprite
  di honda_facile_2, solo piu' lunga (fino a 12 alarm invece di 7 — un
  percorso a due andate/ritorno invece di una) e con un dettaglio in piu'
  nel `Create.gml` di ciascuna: **[C]** `action_if_number(736, 1, 0)`
  (vero per match_easy) sposta l'istanza appena nata di `(+21, -26)`,
  relativo — le coordinate in `CAR_TYPES` includono gia' questo nudge, non
  sono quelle scritte a mano in `carmaker`/`honda*`. Depth `-y - 16`
  (contro `-y - 2` di honda_facile_1/2 — **[C]** `honda3..9/Step.gml`).
  Due dettagli fedeli non "corretti": `honda4` ha `Alarm_4..6` mai armati
  (stesso codice morto di `honda_facile_1`, **[C]** `Alarm_3` uccide/
  ricrea sempre prima), e la sua posizione di nascita da `carmaker`
  differisce di 10px da quella di ogni rientro successivo (**[C]**
  `carmaker/Alarm_0.gml` la crea a `(62,526)`, ma lei stessa in
  `Alarm_3.gml` rinasce a `(72,528)` — un disallineamento gia' presente
  nel decompilato originale) — riprodotto con `firstSpawn` distinto da
  `spawn` in `CAR_TYPES.honda4`, invece di "correggerlo".

- **Nuvole e uccelli**, chiesti esplicitamente dopo aver verificato che non
  ci fosse un altro spawner di veicoli oltre a `carmaker` (c'e' —
  `cargomaker`, i camion `cargo1..4` — ma il suo unico innesco,
  `bridge_des2/Alarm_2.gml`, non e' piazzato in nessuna room: morto anche
  nell'originale, niente da portare). **[C]** `r12/Alarm_0.gml` (armato
  ogni 140 tick, ~2.3s) fa nascere nuvole (`ni`, solo se non piove) e a
  dado uccelli isolati o in stormo (`birb`/`birbcluster`) — nessuno dei due
  ha `notte_target` come parent, quindi nell'originale non prendono la
  tinta giorno/notte; qui la prendono comunque, la stessa semplificazione
  gia' scelta per l'intero mondo (STUDIO.md sopra, "Qui: una fase, un
  colore..."). Puramente estetico (non letto da nessuna regola di gioco),
  quindi implementato "alleggerito" su richiesta: `game/src/atmosphere.js`
  usa un'unica formula di deriva (direzione 30° per entrambi) invece di
  una macchina a stati per ogni dettaglio dell'originale — niente
  autodistruzione immediata a meta' delle nuvole appena nate (**[C]**
  `ni/Create.gml`, un dado in piu' che qui e' assorbito nella probabilita'
  di spawn), niente due alarm separati per lo sbattito d'ali degli uccelli
  (**[C]** `birb/Alarm_1|2.gml`, qui un solo ciclo). Le nuvole nascono
  appena fuori dai bordi della room e la attraversano in pochi secondi
  (ben visibili); gli uccelli nascono molto sotto la mappa (`y=2500`,
  **[C]** coordinate dell'originale) e la attraversano di sfuggita durante
  una risalita lenta durata quasi un minuto — rari e discreti, come
  nell'originale.

- **Pedoni ("omini neri")**: ricordati "spawnati da chies o dal
  controller principale", ma non e' nessuno dei due — **[C]**
  `casa1|2|3/Create.gml` (non ancora letti, STUDIO.md non li citava)
  creano ciascuno un `pplo` (sprite `q1`..`q10`, 9-16px: letteralmente
  minuscoli omini neri) alla propria posizione, nell'ultima riga. Non un
  evento per casa: uno per **salto di livello** — una casa arrivata al
  livello 3 ne ha lasciati indietro due, mai rimossi (nemmeno
  `casaN/Destroy.gml` li tocca: sopravvivono alla casa che li ha creati).
  Camminano piano (**[C]** velocita' 0.5 px/tic) in una delle quattro
  diagonali, cambiando direzione a caso ogni 36-83 tic (**[C]**
  `pplo/Create.gml` + `Alarm_0.gml`), e rimbalzano contro `chies` e i
  marker invisibili `pepazzittecollider` gia' in scena (**[C]**
  `action_bounce`). Puramente estetico, quindi alleggerito su richiesta
  in `game/src/pedestrians.js`: niente fisica di collisione vera contro i
  27 collider — restano semplicemente entro un raggio fisso dalla propria
  casa, la stessa idea ("non si allontanano troppo da dove sono nati")
  senza portare la mappa dei collider. Agganciato in `main.js` dentro
  `spawnDecor()`, per il solo tipo `casa`, allo stesso punto in cui gia'
  intercettava `parco`.

- **Le mongolfiere.** Non sono `cargo1..4`/`cargomaker` (i camion colorati
  gia' scartati piu' sopra come codice morto): sono una famiglia distinta,
  mai letta finora, trovata risalendo dagli sprite (`monv`/`monss`/`mong`/
  `monviola`/`monr`, tutte hot-air-balloon veri, verificato visivamente
  ritagliando gli atlas, non solo dal nome) agli oggetti che li usano. Tre
  gruppi, `game/src/balloons.js`:
  1. **Risorse**: `monvo` (verde, petrolio), `monvo_giga` (verde gigante),
     `monbo` (blu/petrolio, sprite `monss`, denaro), `mongo` (giallo/oliva,
     energia), `monviolo` (viola, cristalli) — **[C]** nessun evento Mouse
     nel decompilato: non cliccabili in volo. Volano 3600 tic (60s, stessa
     diagonale di 30° di nuvole/uccelli) e alla fine — o se un fulmine le
     colpisce durante una tempesta vera (STUDIO.md sopra "le tempeste
     diventano reali", stesso schema di `stepStormDamage`) — lasciano
     cadere una cassa (bar-us/-us_giga/-bluss/-gia/-viola, quella si'
     cliccabile: nell'originale al passaggio del mouse, `Mouse_
     MouseEnter.gml`, qui un tap, coerente con l'input touch-first del
     resto del motore, STUDIO.md §7). Importi reali: 700 petrolio/denaro,
     1100 energia, 2300 petrolio (gigante), 1-3 cristalli (`irandom_range`).
  2. **Spia**: `monspi` (rossa). Stessa diagonale, nessun loot: dopo 750
     tic "riferisce" — alza `r12.onda`/`ondan` e fa comparire l'avviso
     ATTACK INCOMING (`aincom`, un banner che lampeggia ogni 0.5s per 4s,
     **[C]** `aincom/Create.gml` + `Alarm_1|2.gml`) — invece di limitarsi a
     sparire. Sbloccata solo dopo **[C]** ~8 minuti di partita
     (`r12/Create.gml`: `action_set_alarm(29000, 8)` arma `r12.spy`). Un
     fulmine prima di allora la cancella senza conseguenze (nessun
     `Destroy.gml` nel decompilato, a differenza delle risorse). `recogn` —
     stesso ruolo ma un aereo da ricognizione, non una mongolfiera (sprite
     `reconspr`, verificato visivamente) — resta fuori: non e' una
     mongolfiera, gap dichiarato.
  3. **Pacco di cantiere**: `mon_bil`/`mon_bbil` (**[C]** `placeholder/
     Mouse_LeftReleased.gml`, creato insieme a ogni `impa*` alla posizione
     relativa `(-1559, +680)` dal placeholder appena occupato). Vola 225
     tic portando una cassa (`mon_box`, che cade e sparisce), la sgancia,
     poi **[C]** una vera `action_set_gravity(90, 0.1)` la fa "alleggerire"
     e accelerare verso l'alto per altri 1000 tic prima di sparire — non un
     placeholder, la gravita' vera dell'originale. Solo `mon_bil` e'
     cablata: e' quella che l'originale usa per `casa` (`selec==1`) e
     `industria` (`selec==2`), gli unici due tipi piazzabili dal giocatore
     che la creano — **[C]** `parco` (`selec==7`) non crea nessun pallone
     nel decompilato, `mon_bbil` serve solo a tipi non ancora ricostruiti
     (banca, laser).
  Il regista (`stepBalloonSpawner`, equivalente di `r12/Alarm_1.gml`, ogni
  300 tic/5s) riproduce le probabilita' reali: verde sempre, giallo 1/10,
  blu 1/13, viola e verde-gigante 1/15-1/18 solo se `chies.level>=2`, verde
  extra 1/2 se `chies.level>=3`, spia 1/2 (o 1/17 se `r12.hap==r12.pop` —
  **[I]** mai vero in pratica, `hap` non e' aggiornato da nessuna parte del
  motore, stesso gap gia' dichiarato per casa/industria: l'originale stesso
  finisce quindi per usare sempre il dado 1/2). **[I]** Un'intera "ondata"
  (`r12.ondan`) sospende tutte le nuove nascite finche' non decade (-0.5/s):
  riprodotto senza la cerimonia di armamento originale (`r12.arma` che arma
  gli alarm 4/5/6 di `r12` al prossimo Step) perche' pilota anche
  un'ondata di bombardieri non ancora ricostruita — qui decade
  incondizionatamente appena `ondan>0`, stesso risultato pratico. **[I]** Il
  gate `action_if_number(160, 0, 0)` che nel decompilato precede
  `monviolo` (un flag globale non identificato) non e' riprodotto: dipende
  solo dal livello di chies, come `monvo_giga` nello stesso `Alarm_1` che
  non ha un gate simile. **[I]** Il range di nascita e' quello che
  l'originale stesso usa per il ramo "mappa facile" di `monspi`/`recogn`
  (`380..1620`, **[C]** `action_if_number(162, 0, 0)`), esteso per analogia
  anche alle risorse: l'altro range scritto a mano nel decompilato
  (`380..3120`) e' tarato per `match` (2090px di altezza), troppo per
  `match_easy` (1086px). Fumo/esplosioni decorative del fulmine e della
  cassa a terra (`smoko`) non riprodotte — stesso gap gia' dichiarato per
  il fumo di `industria`.

- **Primo edificio difensivo: `missile`.** L'inizio di una famiglia (in
  arrivo: gatling, laser) diversa dai primi quattro edifici su un asse
  nuovo — non produce ne' consuma risorse, insegue bersagli col cannone.
  **[C]** Cantiere `impamissr`/`impamissf` (coppia r/f, stesso schema gia'
  noto — STUDIO.md sopra "secondo edificio giocabile: industria"): riusa
  gli stessi sprite `ir1x`/`ir2x`/`if1x`/`if2x` di industria/casa/parco,
  nessuno sprite di cantiere in piu' da aggiungere all'atlas. **[C]** UN
  solo livello: `impamissr` non ha `upgrades`, a differenza di chies/
  industria/casa. `impamissilir`/`impamissilif` — stessa forma, sprite
  identici, facile scambiarli per un potenziamento — sono in realta'
  create SOLO da `demobasia/Collision_rocket_launcher.gml`: il "rifai in
  loco" a pagamento (20000 mon, `rocket_launcher/Mouse_LeftPressed.gml`
  selec==11) che nel decompilato finisce in un `placeholder` vuoto invece
  che in un rocket_launcher nuovo — stesso gap gia' dichiarato per
  industria/casa (STUDIO.md "cosa manca"), non riletto qui. **[C]** costo
  di piazzamento 5000 mon, e crea `mon_bil` come casa/industria (STUDIO.md
  "le mongolfiere" aggiornato di conseguenza). **[C]** vita 600, danno da
  fulmine 1/130 ogni 57 tick -50 vita, stesso schema di industria/casa
  (`stepStormDamage`, nessun codice nuovo).
  **La mira del cannone e' vera**, non solo un edificio statico: **[C]**
  `rocket_launcher/Step.gml` insegue col cannone il veicolo piu' vicino
  entro 400px (famiglia `veicoli_target` — mongolfiere di risorse/spia e
  le auto decorative, non le minacce vere), un sedicesimo di giro alla
  volta (16 sprite `lrn1..lrn16`, risolti per indice-sprite da `data/
  sprites.json`, non per nome scelto qui — `sprite_index = 242` eccetera
  nel decompilato). Se nessun veicolo e' in portata lo sprite non torna
  alla posa di riposo: resta congelato all'ultima direzione puntata,
  esattamente come nel decompilato (l'aggiornamento e' innestato dentro il
  controllo di portata, nessun ramo `else`) — verificato spostando un
  veicolo dentro e fuori portata. **Il fuoco vero non e' riprodotto**: il
  bersaglio che l'originale colpisce per davvero e' `nemici_target` (entro
  250px, non `veicoli_target`) — la famiglia delle minacce vere (dirig e
  le altre, STUDIO.md "cosa manca": "da dove arrivano davvero le
  minacce... dipendono da contatori che nessun oggetto incrementa") non
  esiste ancora in questo motore, quindi il ramo che crea `red_ball`/
  `rol_avant`/`rol_diet` (i proiettili) non ha mai un bersaglio valido da
  colpire — non e' un buco silenzioso, e' la stessa condizione che
  varrebbe anche nell'originale senza minacce nei paraggi.
  **[I] Il vincolo di distanza fra torrette** (`placeholder.close`,
  impostato da vera collisione fisica fra la maschera di missile/gatling/
  laser e i placeholder vicini — `placeholder/Collision_impamissr|
  rocket_launcher|gatlinggun|lasergun.gml`, STUDIO.md "pepazzittecollider"
  mai ricostruito) diventa una distanza minima fra torrette (200px,
  `tooCloseToTurret()`), tarata sulla maschera vera di rocket_launcher
  ("auton", 297x172px) contro il passo della griglia dei placeholder in
  `match_easy` (~116px fra vicini diretti) — abbastanza da bloccare i
  vicini immediati senza un sistema di collisione vero. Verificato: due
  torrette a ~116px si respingono ("troppo vicino a un'altra torretta di
  difesa", nessun mon scalato), la stessa coppia a >200px si piazza.
  Il campo `turret: true` in `BUILDING_TYPES.missile` e la generalita' di
  `tooCloseToTurret()`/`stepTurretAim()` sono pensate per gatling/laser,
  non ancora aggiunte.

- **Le minacce vere.** Il pezzo mancante che STUDIO.md segnalava da tempo
  ("da dove arrivano davvero le minacce vere... dipendono da contatori che
  nessun oggetto incrementa"): quel "nessun oggetto" era `monspi`, letto
  solo con le mongolfiere (STUDIO.md "le mongolfiere") — non incrementava
  niente perche' non esisteva ancora. `game/src/threats.js`.
  **[C]** Tre ondate indipendenti, tutte innescate dalla stessa fonte (una
  mongolfiera spia che porta a termine il suo giro, ignorata — oggi non
  esiste ancora un modo per fermarla prima): `monspi/Alarm_0.gml` +
  `r12/Step.gml` (i due punti in cui l'originale spalma questa contabilita',
  riuniti in uno solo dentro `stepBalloons()` di balloons.js) alzano
  `onda`/`ondan` **sempre**, `bombolo`→`bombus`/`bombn` **ogni 4a** spia
  riuscita, `dirox`→`diro`/`diron` **ogni 10a**. Tre timer indipendenti
  (`stepThreatSpawner`, equivalenti di `r12/Alarm_4|5|6.gml`) decadono
  quei contatori "attivi" mentre fanno nascere un nemico alla volta:
  - `ondan` (ogni 60 tick, -0.5) → `air`: un caccia, comune, veloce
    (velocita' 13 o 16 a dado, vita naturale 50s). Meta' delle volte nasce
    "in prima fila" e bombarda per davvero (`desto`), l'altra meta' e'
    traffico aereo decorativo piu' piccolo (scala 0.75) che non bombarda
    mai — **[C]** entrambi letti, non inventati.
  - `bombn` (ogni 200 tick, -0.5) → `bombar`: un bombardiere piu' lento e
    piu' resistente, bombarda piu' spesso (ogni 25 tick contro i 40 di
    `air`), vita naturale 100s.
  - `diron` (ogni 600 tick, -1) → `dirig`: uno zeppelin, il piu' raro e il
    piu' lento (velocita' 2), vita naturale 166s, due bombe indipendenti
    per ciclo (offset fissi, non una sola come gli altri due).
  Piu' spie vengono ignorate, piu' le ondate SUCCESSIVE sono lunghe (onda/
  bombus/diro non decadono mai a ritroso) — la progressione richiesta:
  ignorare la sesta spia non "riattiva" solo un'ondata di `air`, ne fa
  nascere una lunga il doppio della prima, e sblocca anche la prima
  ondata di `bombar`.
  **[I]** Gli alarm 4/5/6 nell'originale restano spenti finche' `r12.arma`
  non diventa 1 la prima volta (`r12/Step.gml`): qui girano fin
  dall'inizio senza quella cerimonia — prima della prima spia riuscita i
  tre contatori sono comunque zero, quindi non cambia niente di
  osservabile (`arma` resta dichiarato in state.js solo per fedelta' alla
  forma di `r12`). Stessa semplificazione gia' scelta per `ondan` in
  balloons.js, spostata qui perche' decadere e "far nascere un `air`" sono
  la stessa cosa nel decompilato: prima erano due punti diversi che
  leggevano la stessa variabile con effetti diversi (uno la decadeva senza
  far nascere niente), ora e' un solo punto — un bug introdotto e corretto
  nella stessa sessione, non ereditato.
  **Le bombe fanno davvero danno**: **[C]** `bomba1` cade per conto suo
  (direzione/velocita' fisse, non segue chi l'ha sganciata) per mezzo
  secondo, poi crea un lampo (`bomba2`, 2 tick) che toglie 100 vita a
  QUALUNQUE edificio tocchi — lo stesso importo per ogni tipo nel
  decompilato (chies/casaN/industriaN/club1/villa1/monum/banca1/... hanno
  ciascuno il proprio `Collision_*` ma il numero e' identico ovunque), mai
  agli edifici in cantiere (nessun `Collision_impa*` per le bombe). **[I]**
  Vera collisione fisica sostituita da un raggio minimo (150px, colpisce
  l'edificio finito piu' vicino entro quel raggio) — stessa scelta gia'
  fatta per `tooCloseToTurret()` (STUDIO.md "il lanciarazzi"), nessun
  sistema di collisione vero in questo motore.
  **Non riprodotto**: `piro` (lo stato "colpito, sto precipitando" di
  ciascun nemico) — richiede vita/danno su un nemico, che a sua volta
  richiede il fuoco vero del lanciarazzi (STUDIO.md "il lanciarazzi": la
  mira e' vera, il fuoco resta un gap dichiarato) — finche' niente puo'
  abbattere un aereo, quel ramo del decompilato non scatterebbe comunque;
  il fumo di scia (`smoko_aer`), puramente cosmetico, stesso gap gia'
  dichiarato per il fumo di `industria`/la cassa di cantiere.
  Verificato in browser: 10 spie riuscite di fila producono la contabilita'
  esatta (`onda`=10, `bombus`=2, `diro`=1); le tre ondate nascono nei tempi
  giusti e si vedono (caccia verde/giallo/zeppelin grigio in volo sopra la
  mappa); una bomba forzata a esplodere accanto a chies le toglie esattamente
  100 vita; un aereo "di sfondo" (`desto=0`) non sgancia mai bombe; la
  scadenza naturale distrugge `air`/`dirig` con l'asimmetria giusta (solo
  `air` lascia un'esplosione).

- **Il lanciarazzi spara per davvero.** Chiudeva il cerchio aperto insieme
  alle minacce vere: prima non c'era ancora modo di fermare una
  mongolfiera spia prima che "riuscisse" (STUDIO.md sopra), ne' di
  abbattere le ondate che ne conseguono. `game/src/projectiles.js`.
  **[C]** `rocket_launcher/Step.gml`: quando una minaccia vera
  (`nemici_target`) entra entro 250px e il cannone non e' in ricarica (40
  tick fra uno sparo e l'altro), parte un razzo (`red_ball`) dalla punta
  del cannone. Il dettaglio piu' facile da leggere male, verificato con un
  test dedicato: **il razzo non punta alla minaccia che ha innescato lo
  sparo** — punta a `instance_nearest(veicoli_target)`, lo stesso bersaglio
  gia' inseguito dal cannone (`b.aimAngle`/`b.aimTarget`, salvati da
  `stepTurretAim` in buildings.js). Se una mongolfiera innocua e' piu'
  vicina della minaccia vera che ha fatto scattare lo sparo, il razzo vola
  verso QUELLA — fedele all'originale (`red_ball/Create.gml` non menziona
  affatto `nemici_target`), confermato con un test che mette entrambe in
  portata e osserva quale muore.
  **Bug trovato e corretto prima di pubblicare**: il primo tentativo
  faceva volare il razzo lungo `b.aimAngle` cosi' com'e' — ma
  `red_ball/Create.gml` ricalcola la propria direzione con
  `action_move_point` dalla propria posizione di nascita (la punta del
  cannone, spostata anche di ~100px dal centro edificio), non eredita
  l'angolo del cannone. A distanza ravvicinata la differenza e' abbastanza
  grande da far mancare bersagli fermi proprio davanti al cannone — un
  test con un aereo statico a distanza fissa l'ha reso ovvio (il razzo
  volava a vuoto lungo un binario spostato di ~125px). Corretto salvando
  anche `b.aimTarget` (non solo l'angolo) e ricalcolando la direzione vera
  dalla posizione della punta del cannone in `stepTurretFire`.
  **[I] Un solo colpo distrugge sempre il bersaglio**: `monvo_giga`/
  `monviolo`/`air`/`bombar`/`dirig` hanno tutti un contatore `life` che
  sembrerebbe richiedere piu' colpi (`red_ball/Collision_*.gml` lo
  decrementa), ma il controllo che lo legge e' `life != 0`, non `== 0` —
  dopo il primo colpo `life` e' quasi sempre ancora diverso da zero, quindi
  il bersaglio muore comunque al primo colpo. Non e' una nostra
  semplificazione che "arrotonda" una meccanica a piu' colpi: e' un
  contatore di fatto morto nel gioco originale stesso, letto ma mai
  davvero capace di salvare un bersaglio da un secondo colpo che non
  arriva mai (muore sempre al primo). Colpire una mongolfiera di risorse
  fa comunque cadere la sua cassa ([C] Destroy.gml scatta a prescindere
  da come muore, stessa logica gia' vista per il fulmine — `spawnLoot`
  ora esportata da balloons.js apposta); colpire una spia la fa sparire
  in silenzio, senza che riferisca mai (nessun Destroy.gml su `monspi`) —
  la vera contromossa alle ondate progressive.
  **Non riprodotto**: il fuoco manuale al tap sul lanciarazzi
  (`rocket_launcher/Mouse_LeftPressed.gml`, che spara con una tabella di
  offset a 4 vie piu' rozza, ridondante con quella automatica) — toccare
  l'edificio oggi prova solo un potenziamento (che non esiste, "livello
  massimo"). `esplo` a 5 raffiche invece di una sola per `dirig`
  (`Destroy.gml`, un solo zeppelin e' grande) riprodotto ovunque muoia
  (fulmine, colpo diretto), tranne il doppio conteggio dell'esplosione
  singola che `Alarm_5.gml` crea anche lui prima del `Destroy.gml` in
  caso di fulmine — un dettaglio sotto la soglia di quanto vale
  inseguire.
  Verificato in browser: un razzo lanciato contro un aereo fermo e vicino
  lo abbatte (dopo aver corretto il bug di mira sopra); senza nessun
  veicolo da inseguire il cannone non ha una direzione e non spara anche
  con una minaccia vera in portata (fedele: il razzo stesso dipende da
  quel bersaglio); colpire una mongolfiera di risorse fa cadere la cassa
  giusta; una minaccia e una mongolfiera nello stesso punto muoiono una
  sola alla volta, mai entrambe dallo stesso colpo.

- **Le "finestre singole" per le luci delle case sono state ritentate e
  ritirate.** Il tentativo descritto in una revisione precedente di questo
  paragrafo — `tools/26_lights.py`, un ritaglio per finestra ottenuto dal
  bounding box del blob di pixel appena apparso fra due frame consecutivi
  di `crclx`/`cNNNx` — produceva luci visibilmente **rettangolari**, che
  non seguivano la sagoma isometrica (a rombo) delle finestre vere:
  segnalato dall'autore con uno screenshot. La causa e' strutturale, non
  un bug di soglia: il ritaglio viene preso dal FRAME FINALE (tutte le
  finestre gia' accese), dove i pixel di parete intorno alla finestra sono
  gia' opachi quanto la finestra stessa — il bounding box axis-aligned di
  un rombo include per forza gli angoli del rettangolo che lo circoscrive,
  e in quel frame quegli angoli non sono trasparenti come nel frame in cui
  il blob e' stato individuato, sono parete piena. Mascherare il ritaglio
  con la forma esatta del blob (invece del solo bounding box) risolverebbe
  la sagoma ma non vale la complessita' aggiunta rispetto a rivedere
  l'obiettivo:
  - `chies` (`crcl`/`crc2l`/`crc3l`): **tornato** alla dissolvenza uniforme
    in alpha sull'intera sagoma, cosi' com'era prima di questo tentativo
    (vedi sopra, sull'animazione `crclx`) — l'autore l'ha confermata
    visivamente corretta.
  - `casa` (le 60 varianti `cLVLab l`): **tornato** allo stesso decoro
    unico gia' impacchettato come sprite nell'atlas (l'immagine
    `cLVLab l` gia' caricata, non un ritaglio sintetizzato a runtime),
    con la stessa dissolvenza uniforme.
  `tools/26_lights.py`, `data/lights.json` e `game/data/lights.json`
  rimossi (nessun altro codice li leggeva); `addDecor()`/`stepLights()` in
  `main.js` tornati alla singola entita' per decoro con alpha continua,
  senza il ramo `lightWindows`/`_lightAt`. Il blob-diff per finestra
  singola resta un'idea valida per il TIMING (`t`, il momento 0..1 in cui
  una finestra si accende) — non necessariamente per la GEOMETRIA del
  ritaglio: se si vuole recuperare l'effetto "una finestra alla volta" in
  futuro, va rifatto mascherando il ritaglio con la forma del blob (alpha
  0 fuori dal rombo), non con un rettangolo.

- **Le auto sterzano davvero, non restano fisse sulla posa finale.** Una
  nota precedente di questo file (STUDIO.md §7, sulle auto) diceva "nessun
  sistema di `image_speed`" — anche questa **sbagliata** in parte:
  `action_sprite_set(c_ad_as, 0, 1)` in `honda_facile_2/Alarm_0.gml` (e
  l'equivalente nelle altre honda) passa un `image_speed` di 1, non 0 — lo
  sprite di svolta (`c_ad_as`, 38 frame; `c_as_ad`, altrettanti; uno per
  ogni coppia di direzioni) avanza per davvero un frame a Step invece di
  restare fermo al primo. **[C]** Non serviva nessun asset nuovo:
  `tools/23_atlas.py` gia' impacchettava tutti i frame di ogni sprite
  multi-frame (itera `s["frames"]` per intero), semplicemente
  `frameFor()` in `main.js` non ne leggeva mai altri oltre il primo — la
  correzione e' tutta logica, non pipeline. `frameFor(sprName, frameIdx)`
  accetta ora un indice di frame (0 per gli sprite fermi, come prima);
  `cars.js` traccia `c.frame` (tick trascorsi dall'ultima volta che lo
  sprite e' cambiato) e lo azzera solo quando una fase di `schedule` porta
  un `spr` nuovo.
  **Un dettaglio non ovvio, verificato leggendo il decompilato con
  attenzione**: l'alarm che arma lo sprite di svolta (275) e quello
  successivo che lo ferma (313 = 275+38, esattamente la durata
  dell'animazione) sono sincronizzati apposta — ma in mezzo puo' scattare
  un TERZO alarm (`Alarm_1`, a 294) che cambia SOLO la direzione
  (`action_set_motion`, senza `action_sprite_set`): la svolta continua ad
  animarsi senza interruzioni, la nuova direzione si applica alla posa che
  sta gia' scorrendo a meta'. Se `c.frame` fosse stato azzerato ad ogni
  fase di `schedule` (non solo quando cambia `spr`) l'animazione
  ripartirebbe da capo a meta' svolta, un artefatto visibile assente
  nell'originale. Verificato in browser forzando `honda_facile_2` a
  passare per la sua svolta (schedule reale: 275→`c_ad_as`, 294→solo
  `dir`, 313→`c_as`, 314→`c_as_ad`, 333→solo `dir`, 352→`c_ad`) e
  campionando `c.frame`/`c.spr` ad ogni fase: il frame avanza con
  continuita' (mai un salto a 0) attraverso il cambio di direzione a 294,
  e si azzera solo ai cambi di sprite (313, 314, 352) — confermato anche
  via screenshot, due frame diversi della stessa svolta mostrano
  effettivamente due pose diverse dell'auto.
  **Bug trovato mentre si testava questa modifica, non causato da essa ma
  scoperto grazie ad essa (corretto prima di pubblicare)**: il ciclo di
  gioco calcolava `dt` come `Math.min(0.05, (now - last) / 1000)` senza
  mai escludere valori negativi — al primissimo frame (e in generale con
  WebGL software, piu' lento), il timestamp passato da
  `requestAnimationFrame` puo' precedere di poco il `performance.now()`
  con cui e' stato inizializzato `last`, producendo un `dt` leggermente
  negativo. Con le auto ferme (senza frame multi-pose) l'effetto era
  innocuo (`c.t` leggermente negativo, invisibile); con `c.frame` ora
  passato a `frameFor()` come indice di array, un singolo frame con `dt`
  negativo bastava a produrre un indice negativo e un `frames[-1]`
  `undefined` — **bloccando l'intero ciclo di gioco al primissimo frame**
  (l'eccezione, non gestita, interrompeva `frame()` prima della riga che
  pianifica il proprio richiamo). Corretto in due punti: `Math.max(0, ...)`
  sul calcolo di `dt` in `main.js` (la causa vera, previene anche derive
  simili su qualunque altro timer del motore) e, per difesa, lo stesso
  clamp sull'indice dentro `frameFor()`. Verificato: senza la correzione
  il gioco non disegnava nulla e uno script di test lo confermava con un
  `pageerror`; con la correzione 300+ frame consecutivi osservati senza
  errori, e la simulazione (edifici/luci/auto/minacce) avanza normalmente.

- **I pulsanti blu delle monete di `casa`, e il segnale verde di
  potenziamento come icona vera invece del tap-ovunque sull'edificio**
  (chiesto dall'autore). Nuovo `game/src/coins.js` (`stepCoinSpawner`/
  `stepCoins`/`collectCoin`) porta `casa1|2|3/Alarm_4.gml` — vedi il
  commento in cima al file e quello aggiornato su `BUILDING_TYPES.casa` in
  buildings.js per la lettura completa (`hap>=pop && ele>0`, non la
  "sommossa" di una nota precedente). Questo sbloccava `r12.hap`, mai
  scritto da nessuna parte del motore: ora lo e' (industria -50/-100/-150
  alla nascita di ogni livello, +50/+150/+400 alla morte — numeri non
  simmetrici, letti cosi' come sono dal decompilato; parco +200/-210),
  applicato negli stessi punti dove gia' viveva `pop`
  (`stepConstructions()`/`destroyBuilding()`) invece che con un sistema a
  parte.
  Il segnale verde (`upsign12|23`/`upcrc12|23`/`upind12|23`, tutti la
  stessa icona "upico") era finora invisibile: il tap funzionava (tap
  ovunque sull'edificio, `tryStartUpgrade()` gia' controllava soglia e
  costo) ma non c'era niente da vedere finche' non si sbloccava — niente
  che dicesse "questo e' pronto". Ora e' un'entita' vera nel mondo
  (`obj: "upsign"`), pushata insieme all'edificio quando
  `upgradeUnlocked()` e' vera e nessun cantiere e' gia' in corso, con
  picking prioritario (depth -9001, sempre in primo piano) — tap-la o
  tap-l'edificio-sotto fanno la stessa cosa (`tryStartUpgrade()`), la
  seconda via resta per compatibilita' col comportamento gia' testato.
  **Bug trovato e corretto prima di pubblicare, non legato alla logica ma
  a un commento**: `/** [C] sold*/Mouse_MouseEnter.gml: ... */` in
  `coins.js` chiudeva il blocco JSDoc in anticipo — `*/` dentro "sold*/"
  (riferimento a `sold1..18`, con la barra del path subito dopo
  l'asterisco del wildcard) e' letto dal parser come la chiusura vera del
  commento, lasciando il resto della riga come codice: `SyntaxError:
  Unexpected token ':'` al caricamento, silenzioso su `node --check`
  (verifica solo sintassi CommonJS, non ha notato il problema) ma reale
  su un `import()` vero, sia in Node che nel browser. Trovato bisecando il
  file a meta' con `import()` finche' l'errore non spariva. Corretto
  scrivendo per esteso `sold1..18/Mouse_MouseEnter.gml` invece del
  wildcard.
  Verificato in browser: una `casa` piazzata e lasciata correre ~28s (fine
  cantiere + primo controllo a 600 tick) fa comparire una moneta da 20 mon
  (livello 1, `ava` 0) esattamente all'ancora dell'edificio; il tap la
  riscuote e la fa sparire. Forzando `b.ava = 5` via `window.__nimbus` (la
  crescita reale richiederebbe diversi minuti) fa comparire il segnale
  verde nella stessa posizione; il tap avvia il cantiere (-500 mon,
  `b.construction` valorizzato). Piazzando un'`industria` e aspettando che
  finisca il primo livello, `r12.hap` scende di 50 esattamente al
  completamento — non prima, durante il cantiere.

- **Quinto edificio giocabile: `solare`** (`sooool`, src/objects/sooool —
  "Pannelli solari" nel menu, gia' un bottone segnaposto). Come `missile`,
  un solo livello (nessun `upXXX` lo referenzia nel decompilato), ma non
  e' una torretta: e' il primo la cui produzione dipende dall'ORA DEL
  GIORNO invece che da un consumo di materia prima. **[C]**
  `sooool/Alarm_4.gml` (ogni 30 tick): sempre -5 mon; `ele` -1 di notte,
  +5 all'alba, +9 altrimenti (giorno/tramonto — il decompilato ha solo
  due flag booleani, `aura.night`/`aura.dawn`, non le quattro fasi di
  questo motore: "ne' notte ne' alba" copre sia giorno che tramonto).
  Nuovo `stepSolarProduction()`/`isDawn()` (stesso confine netto di
  `isNight()`, nessuno smoothstep). Placement cost **[C]** 1000 mon,
  trovato nello stesso posto dei costi gia' letti per industria/casa/
  missile/parco — `placeholder/Mouse_LeftReleased.gml` in un'unica
  funzione, `selec==61` — che rivela anche i costi di *tutti* gli altri
  edifici non ancora piazzabili (villa 7500, club 3500, gatling 10000
  con lo stesso controllo `close` di missile, monumento 20000 SENZA
  controllo affordability nel decompilato — un'asimmetria letta, non
  wired qui — banca senza alcun costo scalato): non riletti finche' non
  tocchera' a quei tipi.
  Il cantiere (`impasolr`/`impasolf`) riusa gli stessi sprite `ir1x`/
  `if1x`/`toppers` gia' in atlas per industria/casa/missile — solo
  `sool` (lo sprite finale) e' nuovo. Stessa semplificazione [I] gia'
  scelta per industria: si completa alla fine della traccia "r" (770
  tick) invece che a meta' della traccia "f" (dove l'originale crea
  davvero `sooool`, tick ~725) — differenza cosmetica sotto la soglia.
  **Bug trovato e corretto prima di pubblicare**: `solarProduction` non
  era escluso dalla simulazione economica placeholder di `state.js`
  (`tickR12()`, STUDIO.md §6) come gia' lo erano `production`/`growth` —
  `solare` veniva quindi contato *due volte* (olio/popolazione fantasma
  dalla formula generica, oltre alla sua produzione vera), verificato
  confrontando `r12.mon`/`ele` nei 2s dopo il completamento del cantiere
  prima e dopo la correzione (-9.8 mon con doppio conteggio, -15.8 senza
  — quest'ultimo torna con -5 mon/30 tick + la sola tassazione generica
  sulla popolazione, senza olio/pop fantasma).
  **[C]** `sooool/Destroy.gml`: hap +50 alla morte, nessun costo
  corrispondente alla nascita (`Create.gml` non tocca `hap`) — non
  simmetrico, letto cosi' come sta, stesso principio gia' scelto per
  industria/parco sopra. Verificato in browser: piazzata una `solare`,
  cantiere completo in ~14s (sprite finale `sool`), `ele`/`mon` che si
  muovono nella direzione giusta nei secondi successivi, `r12.hap` +50
  esatto forzando `life = 0` da console.
