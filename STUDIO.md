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
     Colta l'occasione per rappresentare anche il resto del menu originale
     (**[C]** `src/objects/pu1/Create.gml` elenca tutti i bottoni figli che
     genera) come segnaposto statici: gli altri edifici piazzabili — `pu3`
     (lanciamissili), `pu6` (grattacielo), `pu4prov` (pala eolica),
     `pu5prov` (laser), `pudj` (club), `pusolare` (pannelli solari),
     `pugatling` (mitragliatrice), `puvillone` (villa), `pumediat` (museo),
     `puruspa` (ruspa, STUDIO.md "mai ricostruita") — nessuno in
     `BUILDING_TYPES`: selezionabili come casa/industria (evidenziati con lo
     sprite "ss"), ma toccare un placeholder mostra "non ancora
     ricostruito" invece di costruire (costi reali dove
     `placeholder/Mouse_LeftReleased.gml` li dichiara esplicitamente,
     altrimenti omessi, non inventati). E i bottoni "di cornice"
     (`handbutton`, `buildbutton`, `eyebutton`/`1`/`2`/`3`, `backobutton`,
     `zoom_plus`/`zoom_minus`) in una seconda riga sopra: nell'originale
     aprivano/chiudevano tre righe alternate del menu (`pu1.menoo`, mai
     ricostruito — qui il menu e' gia' tutto visibile in una riga sola,
     quindi non c'e' niente da aprire/chiudere), inerti tranne zoom+/zoom-,
     che richiamano lo stesso `cam.setZoom` gia' agganciato a rotella/pinch.
     **Limite noto**: la riga bottoni non va a capo su schermi stretti (puo'
     uscire dal bordo destro su mobile) — non ricostruito, fuori dallo scopo
     di questo giro di correzioni.
