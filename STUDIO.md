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
  **Il fumo decorativo ora è portato** (`game/src/smoke.js`,
  `stepSmokeSpawner`/`stepSmoke`, chiamate da `main.js`): una o due
  ciminiere per livello (**[C]** `industria1|2|3/Alarm_3|4.gml` +
  `smoke_ind|smoke_ind_2/Create|Step|Alarm_0.gml`), attive solo con
  `oil > 0`, con la stessa cadenza (20 tick), lo stesso moto (direzione
  70°, velocità 1.3 px/tick), la stessa crescita (+0.05 di scala/tick) e
  la stessa vita (69 tick, sparisce di scatto, nessuna dissolvenza — non
  l'aveva nemmeno l'originale) del decompilato. **[I]**: l'originale
  sceglie a dado, una volta a `Create`, QUALE delle 2-4 ciminiere
  disponibili usare (`xi`); `buildings.js` non riproduce quel dado
  (`finalSprite` è fisso per livello), quindi qui si usa sempre l'offset
  della variante che l'originale assocerebbe a quello sprite fisso. Le
  collisioni che nell'originale la interrompono prima contro la
  scenografia (`smoke_ind/Collision_*.gml`) restano un gap esplicito:
  nessun sistema di collisione generico per il decoro esiste ancora, e
  sarebbe invisibile alla scala di un frame.
  **Non portato** (resta un gap esplicito, non finto): il danno da fulmine
  in tempesta (`Alarm_5`/`6`: **[C]** la regola è letta — dado 1/100..130,
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
  torna). **Semplificazione dichiarata all'epoca, chiusa dopo** (vedi "I
  ruderi" molto più sotto): a questo punto il placeholder tornava
  semplicemente libero invece di restare occupato da un rudere permanente
  come nell'originale — un gap dichiarato esplicitamente, non dimenticato.
  `industria` tocca `hap` in `Destroy.gml` invece di `pop`, ma `hap` non è
  tracciato da nessun'altra parte del gioco (STUDIO.md, deciso già per
  `industria`/`casa`): per coerenza resta fuori anche qui, non solo per
  industria.
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
  (`puruspa`, `selec==11` — **[nota successiva]** i ruderi stessi sono stati
  portati dopo, "I ruderi" molto più sotto: un edificio distrutto lascia ora
  un rudere permanente e il placeholder resta bloccato, esattamente come
  senza questo strumento nell'originale; resta soltanto la riparazione a
  pagamento di `puruspa` stesso, MAI ricostruita); gli altri ~17 bottoni
  della barra (zoom, occhio,
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

- **Primo edificio difensivo: `missile`.** L'inizio di una famiglia (poi
  raggiunta da gatling e laser, vedi in fondo al file) diversa dai primi
  quattro edifici su un asse nuovo — non produce ne' consuma risorse,
  insegue bersagli col cannone.
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
  `tooCloseToTurret()`/`stepTurretAim()` erano gia' pensate per gatling/
  laser: aggiunte in fondo al file, riusano entrambe le funzioni cosi'
  come sono.

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
  ciascun nemico) — il fuoco vero (aggiunto poi, STUDIO.md "il lanciarazzi
  spara per davvero") uccide sempre al primo colpo, quindi quel ramo del
  decompilato non scatterebbe comunque anche ora che il fuoco esiste.
  **Il fumo di scia (`smoko_aer`) e' stato aggiunto in un giro successivo**
  (vedi in fondo al file, insieme al fumo di scia dei proiettili): air/
  bombar lo riarmano ogni 8 tick per tutta la loro vita (Alarm_6), mai
  dirig.
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
  **[CORRETTO IN UN GIRO SUCCESSIVO — leggere "lo stato piro" in fondo al
  file]**: qui sotto si concludeva che un solo colpo bastasse sempre a
  distruggere qualunque bersaglio, `air`/`bombar`/`dirig` incluse, perche'
  il controllo su `life` sembrava leggersi `life != 0`. Sbagliato:
  l'operatore usato da `action_if_variable(life, 0, 3)` e' "<=", non "!=" —
  la stessa famiglia di errore gia' presa e corretta altrove in questo
  documento per l'operatore 4 (coins.js) — e su `air`/`bombar`/`dirig` la
  vita e' vera e viene letta davvero per decidere fra esplosione sul colpo
  e lo stato "piro" (colpito, precipita, muore poco dopo). Resta VERO per
  le mongolfiere (`monvo_giga`/`monviolo`/...): quelle sì muoiono sempre al
  primo colpo, i loro `Collision_*` controllano solo `desto`, non `life`.
  Colpire una mongolfiera di risorse fa comunque cadere la sua cassa
  ([C] Destroy.gml scatta a prescindere da come muore, stessa logica gia'
  vista per il fulmine — `spawnLoot` ora esportata da balloons.js apposta);
  colpire una spia la fa sparire in silenzio, senza che riferisca mai
  (nessun Destroy.gml su `monspi`) — la vera contromossa alle ondate
  progressive.
  **Aggiornamento da un giro successivo**: sia il fuoco manuale al tap
  (allora "non riprodotto", poi aggiunto — vedi "il lanciarazzi" piu' in
  basso, e generalizzato a laser) sia il doppio conteggio dell'esplosione
  di `dirig` per fulmine (`Alarm_5.gml` crea un "esplo" esplicito PRIMA di
  uccidersi, poi `Destroy.gml` ci aggiunge la raggiera — allora liquidato
  come "sotto la soglia di quanto vale inseguire") sono ora entrambi
  implementati com'erano nel decompilato — vedi "lo stato piro" in fondo
  al file.
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

- **Selettore edificio scorrevole su mobile** (segnalato dall'autore: in
  portrait i bottoni a destra finivano fuori schermo, senza modo di
  toccarli). Non e' un problema del gioco originale da riprodurre — la sua
  UI si riposizionava scalando per `global.sca` (STUDIO.md §2, `Scala UI`
  0.89 su Android) su un layout che qui non esiste ancora — e' un limite
  del nostro selettore "a riga" (STUDIO.md §9 "Selettore edificio"), che
  accoda i bottoni da sinistra per la larghezza vera dello sprite senza mai
  chiedersi se la riga sta nello schermo: con 13 bottoni nel menu "edifici"
  (`casa`+`industria`+i 10 `OTHER_BUILDINGS`+indietro) la riga e' larga
  ~1150px, piu' di qualunque telefono in verticale — gli ultimi bottoni
  (compreso "Indietro", l'unico modo di uscire dal menu) erano disegnati
  fuori dal canvas: ne' visibili ne' toccabili, nessuna via per raggiungerli.
  Due modifiche in `game/src/main.js`, solo su mobile (`isMobile`, gia'
  usato per la scelta zoom rotella/bottoni): bottoni rimpiccioliti
  (`UI_SCALE` 0.6, sopra i ~44px minimi comuni per un tocco) e riga
  scorrevole (`uiScrollX`, bloccato ad ogni frame in `[0, maxScroll]` della
  riga corrente — una riga corta come "casa" a menoo 0 non eredita mai lo
  scroll di una vista precedente piu' lunga). Il calcolo e' a due passate:
  la prima misura solo le larghezze (serve `maxScroll` prima di sapere da
  dove disegnare), la seconda disegna e registra le hitbox, saltando i
  bottoni scrollati fuori da entrambi i lati (stesso culling gia' usato
  altrove, evita anche hitbox "fantasma" che intercetterebbero un tap
  sulla mappa sotto).
  Il gesto di scroll doveva restare distinto dal trascinamento mappa
  esistente (`input.onDrag` in main.js pana la camera incondizionatamente,
  da sempre) senza duplicare la logica di touch/mouse gia' unificata in
  `game/src/input.js` (STUDIO.md §7 "un solo percorso di input"): nuovo
  hook `input.uiHitTest(sx, sy)`, valutato una sola volta al pointerdown e
  memorizzato sul puntatore (`st.ui`), che sceglie se le mosse successive
  di quel dito vanno a `onUIDrag` (scorre `uiScrollX`) invece che a
  `onDrag` (pana la camera) — deciso all'inizio del gesto, non ad ogni
  move, cosi' un dito che scorre la riga verso l'alto/basso non "sfugge"
  a meta' gesto verso il pan sotto. La zona toccabile (`uiRowBounds`,
  ricalcolata ad ogni frame insieme al disegno) e' larga quanto lo schermo
  — non solo i pixel dei bottoni — cosi' anche un dito che parte fra due
  bottoni o oltre l'ultimo scorre comunque la riga; esiste solo quando
  `maxScroll > 0` (una riga che sta gia' tutta a schermo, come menoo 0 e
  spesso menoo 2, non intercetta niente: il pan mappa sotto resta
  invariato li'). Su desktop nessuna delle due modifiche si attiva
  (`UI_SCALE` resta 1, `uiHitTest`/`onUIDrag` restano `null` come prima di
  questa modifica): la riga ci stava gia' per intero, STUDIO.md "zero
  zoom" vale anche qui.
  Verificato in browser (viewport 390×844, touch emulato): con la riga
  "edifici" aperta su schermo stretto, solo 6 dei 13 bottoni entravano a
  schermo (`casa`..`laser`) e `uiButtons` non conteneva gli altri 7 — la
  stessa assenza di hitbox segnalata dall'autore, confermata prima di
  correggere. Uno swipe orizzontale sopra la riga sposta `uiScrollX` senza
  spostare la camera (`cam.x/y` invariati durante il trascinamento, a
  differenza di un trascinamento sulla mappa); swipe ripetuti arrivano
  fino in fondo (`uiScrollX` si ferma da solo al bordo, non scorre oltre
  l'ultimo bottone) e rendono visibile e toccabile "Indietro", che lo
  riporta correttamente al menu "casa" (`menoo` 1→0) — il bottone che
  prima era irraggiungibile.

- **Settimo edificio giocabile: `club`** (`club1`, src/objects/club1 —
  "Club" nel menu, gia' un bottone segnaposto `pudj`/`selec==60`). Come
  `missile`/`solare`, un solo livello (nessun `upXXX` lo referenzia nel
  decompilato). Il cantiere e' la stessa coppia "r"/"f" gia' nota
  (`impaclubr`/`impaclubf`, `game/src/buildings.js`), che riusa gli
  stessi sprite `ir1x`/`if1x`/"toppers" gia' in atlas per industria/
  missile/solare — nessuno sprite di cantiere in piu' da aggiungere,
  solo lo sprite finale (in realta' quattro: vedi sotto). Placement cost
  **[C]** 3500 mon, letto nello stesso punto degli altri costi
  (`placeholder/Mouse_LeftReleased.gml`, `selec==60`) — la stessa
  funzione conferma che `club` e' anche il quinto tipo (dopo casa/
  industria/missile/solare) a creare `mon_bil`, il pacco di cantiere
  raccoglibile: `game/src/main.js` aveva quel controllo hard-coded a
  quattro tipi, ora cinque.
  A differenza di missile/solare l'edificio finito non e' un solo sprite
  fisso: come `casa` (STUDIO.md sopra), `club1/Create.gml` sceglie a
  dado uniforme una fra 4 varianti (`club11`..`club14`), ciascuna col
  proprio decoro luce abbinato — gli sprite reali sono `club11i`..
  `club14i` (gli OGGETTI originali si chiamano `clublite1..4`, ma
  `decor` nella tabella vuole nomi di sprite, non di oggetto, verificato
  in `data/sprites.json`/`data/objects.json` prima di scrivere la
  tabella: usare i nomi oggetto per sbaglio avrebbe fatto fallire
  silenziosamente `frameFor()`). Stessa macchina generica
  (`up.variants`) gia' letta per casa/parco, nessun codice nuovo in
  `stepConstructions()`.
  **[C]** `club1/Destroy.gml`: hap +50 alla morte, nessun costo
  corrispondente alla nascita — stessa asimmetria gia' letta per solare/
  parco. **[C]** `club1/Create.gml` scrive anche `wewe = wewe + 20`:
  come gia' notato per industria (STUDIO.md sopra), `wewe` resta
  inerte — letto nel decompilato ma non cablato a nessuna regola
  implementata, il suo significato reale [?] non e' ancora chiaro.
  **[C]** danno da fulmine durante la tempesta: `storm: [{dice: 200,
  loss: 50}]` (`club1/Alarm_5.gml`, stessa tabella gia' generalizzata da
  `stepStormDamage()` per casa/industria/missile/solare).
  **Non riprodotto, con motivazione**: `club1/Alarm_0.gml` (armato ogni
  10-150 tic) cicla un tint casuale e RI-sceglie lo sprite dell'istanza
  fra `c112`..`c144` — non `club11`..`club14` come ci si aspetterebbe,
  ma gli stessi nomi sprite usati dalle VARIANTI DI CASA (STUDIO.md
  sopra, `BUILDING_TYPES.casa.construct.variants`). Lo stesso identico
  blocco di codice (byte per byte, stessi nomi sprite "casa") compare
  anche in `villa1/Alarm_0.gml`: quasi certamente codice condiviso/
  copiato fra oggetti diversi nel progetto originale (un pattern
  "scintillio colore + variante a dado" riusato senza aggiornare i nomi
  sprite per ogni copia) piuttosto che un comportamento voluto — non
  c'e' modo plausibile che i progettisti intendessero un nightclub che
  si trasforma periodicamente in una casetta a due piani. Riprodurlo
  fedelmente vorrebbe dire far scomparire un club a caso ogni 2-2.5s per
  mostrare al suo posto uno sprite di `casa` scelto anch'esso a caso: un
  bug quasi certo del gioco originale, sotto la soglia di quanto vale
  riprodurre fedelmente (nessuna conseguenza di gameplay, e nessuna
  certezza che sia mai stato visibile in pratica — richiederebbe capire
  quale delle due `action_sprite_color`/`action_sprite_set` per tic
  arrivi davvero a schermo prima del prossimo Step). Lo `Alarm_1`
  gemello (tint bianco fisso) e il ramo "ruspa"/`demobasia` (riparazione
  a pagamento, selec==11) restano fuori per lo stesso motivo gia'
  dichiarato altrove: nessuno strumento ruspa ricostruito.
  `tools/23_atlas.py`: aggiunte le 8 sprite nuove (`club11..14`,
  `club11i..14i`) al manifest `GAMEPLAY_SPRITES["buildings"]`; nessuna
  delle due ha un'istanza statica in `match_easy`, quindi senza
  elencarle esplicitamente l'atlas non le avrebbe mai impacchettate
  (stesso motivo gia' documentato per `sool`/`rl_as` sopra).
  Verificato in browser: piazzato un `club` (dote forzata da console),
  `r12.mon` -3500 esatto e un pacco di cantiere compare nel punto giusto
  (`constructionBalloons.length` 0→1); portando il cantiere all'ultimo
  passo da console e aspettando che finisca, l'edificio compare con uno
  sprite fra `club11`..`club14` e il `decorSpr` abbinato corretto
  (`club14`↔`club14i` osservato in una run, schermata a corredo);
  forzando `life = 0` l'edificio sparisce e `r12.hap` sale esattamente
  di 50 — non prima, solo alla distruzione.

- **Ottavo edificio giocabile: `villa`** (src/objects/villa1 — "Villa" nel
  menu, `pvilla`/`selec==63`). E' il secondo edificio, dopo `casa`, con
  crescita/consumo veri nel tempo — non solo costruzione+fine — ma un solo
  livello: nessun `upXXX` lo referenzia nel decompilato. Il cantiere
  (`impavil_r`/`impavil_f`) non usa la macchina a contatore "tic 0..N" di
  industria/missile/club: e' la stessa forma "base" a 5 passi/790 tic gia'
  letta per `casa.construct` (390+30+310+30+30) — **[C]** verificato passo
  per passo su `impavil_r/Create.gml` + `Alarm_0/1/2/3` (due alarm armati
  insieme da `Alarm_0`, 30 e 340 tic dopo: quello piu' corto vince e lascia
  l'altro pendente, lo stesso schema gia' letto per `casa` la prima volta).
  Placement cost **[C]** 7500 mon (`placeholder/Mouse_LeftReleased.gml`,
  `selec==63`), che rivela anche che villa e' il sesto tipo a creare
  `mon_bil`.
  **La distribuzione delle 12 varianti NON e' uniforme.** `villa1/
  Create.gml` sceglie fra `vil1`..`vil12` con una cascata di `dice(2)`
  annidati che SEMBRA lo stesso schema a due meta' simmetriche gia' visto
  per `casa` (STUDIO.md sopra) — ma le due meta' non sono identiche
  (profondita' diversa in punti diversi dell'albero), quindi non producono
  probabilita' uguali. Calcolato ramo per ramo dal decompilato (non
  supposto): `vil6`/`vil7`/`vil8` hanno il doppio delle probabilita' di
  `vil2`/`vil3`/`vil9`/`vil10`/`vil11`, `vil1`/`vil4`/`vil5` stanno a meta'
  strada, e `vil12` ha la META' della probabilita' "normale" — pesi 3/2/2/
  3/3/4/4/4/2/2/2/1 su un totale di 32. Il pick uniforme gia' generalizzato
  per casa/parco/club non bastava: nuova `pickVariant()` in buildings.js
  (peso opzionale per riga, default 1 — casa/parco/club restano uniformi
  senza cambiare una riga) usata ora ovunque al posto del pick diretto.
  Verificato con 20.000 campioni via `stepConstructions()` vero (non una
  reimplementazione a parte dell'algoritmo): frequenze osservate entro
  ±0.4 punti percentuali dai pesi teorici per tutte e 12 le varianti.
  **[C]** `growth`: stessi 4 intervalli (`[3500, 5796, 11565, 14656]`) e lo
  stesso primo intervallo fisso (2000) gia' letti per `casa1` — quasi
  certamente lo stesso codice riusato dagli sviluppatori originali per due
  edifici diversi, non una coincidenza (`villa1/Alarm_2.gml`). A differenza
  di casa pero' OGNI stadio (non solo la costruzione) ha 1 probabilita' su
  4 di creare un altro pedone (`pplo`) — `growth[].pedestrianDice`, nuovo
  parametro opzionale di `stepGrowth()` (STUDIO.md era gia' silenziosa su
  questo per casa: la sua crescita non ne crea mai). L'aggancio vero
  (`pedestrians.push`) resta fuori da buildings.js con lo stesso confine
  gia' scelto per decoro/monete (`onPedestrian`, chiamato da main.js).
  **[C]** `consumption`: tabella propria per stadio `ava` (non per livello:
  villa ne ha uno solo), letta da `villa1/Alarm_3.gml` — con un'asimmetria
  degna di nota: il consumo diurno di `ava==3` (12) e' PIU' BASSO di quello
  di `ava==2` (14), letto cosi' come sta nel decompilato, non raddrizzato.
  **Il pulsante blu della moneta esiste anche per villa, ma non e' lo
  stesso di casa.** `villa1/Alarm_4.gml` condivide la struttura (hap/ele,
  poi un premio in base ad `ava`, stesso periodo 3000 tic/primo controllo a
  600) ma **[C]** la soglia e' `hap >= pop + 100` (non `hap >= pop` come
  casa — un offset in piu', letto cosi' com'e'), e soprattutto ad `ava==0`
  il premio non e' una moneta: `action_create_object(soldbio, 0, 0)` — un
  oggetto della stessa famiglia "sold*" (stesso depth, stessa raccolta a
  tap) ma il cui `Mouse_MouseEnter.gml` assegna `r12.biotech += 1`, non
  `mon`. `biotech` era dichiarato in `state.js` fin dall'inizio (STUDIO.md
  §6 "cosa non so ancora") ma MAI scritto da nessuna regola: e' la prima
  volta che diventa un numero vero. **[C]** `soldbio` non ha ne'
  `Create.gml` ne' `Alarm_0.gml` propri nel decompilato — a differenza di
  `sold1..5` (che LO diventano "soldfade" e si autoriscuotono con una
  chies di livello 3) resta sempre "soldico", ferma, finche' non viene
  toccata. Agli stadi successivi (`ava` 1..4) villa riusa GLI STESSI
  oggetti gia' letti per casa1 (`sold2`.."sold5", 40/60/80/100 mon — non
  una coincidenza, gli oggetti sono condivisi) ma **[C]** a `ava>=5`
  (crescita completa) crea `sold1` (20 mon) — la PIU' BASSA delle sei, non
  la continuazione naturale della progressione (`sold6`, 120 mon, quello
  che la formula di casa userebbe): letto cosi' come sta, non
  "raddrizzato". `game/src/coins.js`: `stepCoinSpawner()` resta invariato
  per casa (nessun rischio di regressione su codice gia' verificato) e
  guadagna un secondo ramo esplicito per villa; `stepCoins()`/
  `collectCoin()` ora assegnano `r12[item.kind]` invece di `r12.mon` fisso
  — `kind` default assente sulle monete di casa (`"mon"` implicito nel
  nuovo codice, comportamento identico).
  Non riprodotto, stesso principio gia' scelto per club/altri: il ramo
  "ruspa"/`demobasia` (riparazione a pagamento, `selec==11`) e il ciclo
  colore/sprite di `Alarm_0` che (come club1, vedi sopra) ri-sceglie a
  dado lo sprite dell'istanza usando i nomi delle varianti di CASA
  (`c112`..`c144`) — stesso identico blocco di codice, stessa conclusione
  gia' argomentata per club (quasi certamente condiviso/copiato fra
  oggetti diversi nel progetto originale, non voluto).
  Verificato in browser: piazzata una villa (-7500 mon esatti, pacco di
  cantiere), cantiere completo con `vil3`/`vil3l` in una run (sprite+decoro
  abbinati); un pedone in piu' (`pedestrians.length` 0→1) esattamente alla
  fine del cantiere, prima ancora di qualunque stadio di crescita; forzando
  `hap`/`ele` alti con `ava==0` compare una moneta `kind:"biotech"`
  (`spr:"soldico"`, `auto:false`) che al tap porta `r12.biotech` da 0 a 1;
  con `ava` forzato a 1 la stessa condizione produce invece `kind:"mon"`,
  `amount:40` — la biforcazione fra le due famiglie di ricompensa si
  comporta esattamente come letto.

- **Nono e decimo edificio, seconda e terza torretta: `gatling` e
  `laser`.** Completano la famiglia difensiva aperta da `missile`
  (STUDIO.md "primo edificio difensivo" sopra): stesso `turret: true`,
  stessa `stepTurretAim()` generica (buildings.js), ma armi diverse fra
  loro — `game/src/projectiles.js` guadagna una tabella `WEAPONS` per
  tipo invece di restare cablato su missile.
  **[C]** Cantieri (`impagatlingr`/`f`, `impalaser_r`/`f`) riusano gli
  stessi sprite `ir1x`/`ir2x`/`ir3x`/`ir4x`/`if1x`/"toppers"/"gr21" gia'
  in atlas — nessuno sprite di cantiere in piu'. `impagatlingr/Alarm_0.gml`
  e' riga per riga lo stesso codice di `impamissr/Alarm_0.gml` (stesse
  durate, stesso offset del topper): copiato senza modifiche.
  `impalaser_r` invece e' un cantiere a 4 fasi da 23 tic come quello di
  `chies`/`industria` di livello 3, non i 10 tic "base" delle altre
  torrette — **[I]** troncato a tic 0..10 (scartando 11..22, lo stesso
  specchio "costruisci poi ripiega la gru" gia' troncato per
  `impaind1to2r`/`2to3r`, STUDIO.md "secondo edificio giocabile:
  industria"): a tic 6 pianta 4 "grubig" (sprite `gr21`, il rubble/gru gia'
  usato altrove) ai quattro angoli invece di uno solo, l'unico edificio
  a farlo. Costo di piazzamento **[C]** 10000 mon (gatling, `selec==62`)
  e 20000 mon (laser, `selec==5`); entrambi creano un pacco di cantiere —
  gatling `mon_bil` come le altre torrette, laser invece `mon_bbil` (la
  variante grande, mai cablata: riusa `mon_bil` come le altre, stesso
  pallone piu' piccolo del dovuto — game/src/balloons.js aggiornato di
  conseguenza). Vita **[C]** 800/1000, danno da fulmine 1/130 e 1/90 ogni
  57 tick -50 vita.
  **`gatling` spara due colpi a canna** (`yellow_pro`, sprite
  "gatmissse"): **[C]** `gatlinggun/Step.gml` insegue il veicolo piu'
  vicino entro 550px, spara entro 450px da una vera minaccia (stessa
  regola "punta al veicolo, non a chi ha innescato lo sparo" gia' letta
  per missile), ogni proiettile costa **[C]** 3 mon a nascere —
  incondizionato, senza `canAfford`, esattamente come nel decompilato: il
  fuoco automatico puo' davvero portare `mon` sotto zero. **[I]** Non
  riprodotta la posa di rinculo dopo lo sparo (`spra`/`amove`/Alarm_9|11,
  un piccolo stato che fa lampeggiare il cannone per ~50 tick) — 50 tick
  e' comunque il numero usato come ricarica effettiva (`WEAPONS.gatling.
  cooldown`), la stima piu' difendibile di quando la mira/il prossimo
  sparo tornano davvero possibili. **[C]** `gatlinggun/Mouse_LeftPressed.
  gml` non spara affatto al tocco (imposta solo la posa di rinculo senza
  crearne uno vero): nessun `manualFire` per gatling, un tocco su una
  mitragliatrice finita non fa niente (`tryStartUpgrade` risponde "livello
  massimo").
  **`laser` e' un colpo istantaneo, non un proiettile**: **[C]**
  `lasergun/Step.gml` insegue il veicolo piu' vicino entro 800px (il
  raggio di mira piu' lungo dei tre) ma spara solo entro 200px da una
  minaccia vera — un'arma a bruciapelo — costando **[C]** 200 energia,
  stavolta DAVVERO gated (`if (ele>=200)`, a differenza del costo in
  denaro di gatling): senza energia sufficiente non spara affatto, ne'
  automaticamente ne' al tocco. **[I]** Nel decompilato il colpo
  (`laserone`/`laserone_retro`, sprite unico "lasere") non si muove mai:
  resta alla punta del cannone, ruotato (`image_angle`) verso il
  bersaglio — e' lo sprite stesso, un fascio lungo gia' disegnato, a
  raggiungere il bersaglio lontano. Il renderer di questo motore
  (game/src/gl.js) non supporta rotazione (mai servita finora: ogni
  sprite direzionale e' gia' un fotogramma separato per direzione, non uno
  ruotato a runtime), quindi il fascio vero non si disegna: sostituito da
  un colpo istantaneo (hitscan) che distrugge sul colpo TUTTE le minacce
  vere entro `aim.fireRange` — non solo la piu' vicina, vedi la correzione
  piu' sotto — con un lampo alla bocca del cannone e un'esplosione vera su
  ciascun bersaglio — stesso risultato (le minacce spariscono), niente
  fascio disegnato in mezzo. **[C]** `lasergun/
  Mouse_LeftPressed.gml` spara per davvero al tocco (stessa forma
  dell'automatico, `manualFire: true`): a differenza di missile pero'
  l'originale non richiede affatto una minaccia vera per sparare
  manualmente, solo un veicolo entro 800px — il colpo puo' partire (lampo
  + costo + ricarica) anche senza colpire nulla.
  Verificato in browser (con l'atlas rigenerato in locale, non solo a
  occhio sul codice): entrambe piazzabili dal menu con il costo giusto
  scalato, `tooCloseToTurret()` le blocca l'una vicino all'altra come le
  altre torrette, i cantieri completano al tic e al livello giusti
  (22.03s/1321 tick per gatling, 36.53s/2190 tick per laser — combaciano
  con la somma delle durate lette sopra), la mira ruota lo sprite
  correttamente seguendo il traffico decorativo, e forzando una minaccia
  vera in portata di entrambe: gatling crea due proiettili (`gatmissse`)
  che volano verso il veicolo inseguito (non verso la minaccia, fedele),
  scala `mon` di 3 a testa; laser distrugge sul colpo la minaccia in
  portata, scala `ele` di 200, nessun proiettile creato.
  **Corretto dopo la prima verifica, segnalato dall'autore**: la prima
  versione faceva colpire al laser solo la minaccia vera piu' vicina
  (`nearestThreat()`), un colpo mirato come missile/gatling. Rileggendo
  `laserone`/`laserone_retro/Collision_*.gml` (tutti e dieci gli handler,
  uno per famiglia di minaccia) nessuno dei due chiama mai
  `action_kill_object()` su se stesso — solo su `other.id`, il bersaglio
  colpito: il fascio non si consuma al primo impatto, resta acceso e
  trafigge chiunque tocchi. `fireFrom()` in projectiles.js ora scorre TUTTE
  le minacce entro `aim.fireRange` e le distrugge una per una, invece di
  cercarne solo la piu' vicina — verificato con quattro minacce, tre entro
  200px e una fuori: il laser ne distrugge esattamente tre in un colpo
  solo, la quarta sopravvive.
  **Il fumo di scia dei proiettili, mancante alla prima verifica,
  segnalato dallo stesso giro di note**: **[C]** `red_ball/Alarm_0.gml`
  (missile) crea un `smoko` alla nascita e si riarma da solo ogni 2 tick
  per tutta la vita del razzo (~120 tick) — una scia vera, non un lampo
  isolato; `yellow_pro/Create.gml` (gatling) ne crea uno solo, alla bocca,
  senza riarmo. `smoko` **[C]** e' piu' semplice di `smoke_ind` (il fumo
  delle centrali, smoke.js): nessun moto ne' crescita, solo un dado fra tre
  sprite (**[C]** proporzioni 25/25/50% fra c1/c2/c3 — diverse da quelle di
  `smoke_ind`, 50/25/25, nonostante siano nomi quasi identici: **[C]**
  `c1`/`c2`/`c3` per `smoko` non sono gli stessi sprite di `cc1`/`cc2`/
  `cc3` per `smoke_ind`, verificato in `data/sprites.json` — 96x96 contro
  38x35, una coincidenza di nomenclatura nel progetto originale, non un
  refuso qui) e depth **[C]** -9000 fisso, la stessa quota delle monete blu
  ma senza `_selfLit`: un residuo di sparo si scurisce di notte come
  qualunque altro decoro, non e' un simbolo dell'interfaccia. Nuova
  `spawnSmoko()`/`stepSmoko()` in projectiles.js, un array `trails`
  separato da quello del fumo delle centrali (meccanica troppo diversa —
  statico invece che animato/in crescita — per condividere lo stesso
  step). Verificato in browser: un razzo lanciato lontano lascia una scia
  visibile di sbuffi grigi lungo tutta la traiettoria, non un singolo
  fotogramma fermo.

- **La scia di fumo di aerei/bombardieri.** Ultimo gap dichiarato del
  gruppo "minacce vere" (STUDIO.md sopra, "non riprodotto: piro... il
  fumo di scia"), chiuso mentre gia' c'eravamo dentro per quello dei
  proiettili. `game/src/threats.js`.
  **[C]** `air/Alarm_6.gml`/`bombar/Alarm_6.gml`: un alarm indipendente
  che si riarma da solo ogni 8 tick per tutta la vita del velivolo,
  crea `smoko_aer` — MAI `dirig`, nessun `Alarm_6` sul suo oggetto: la
  stessa asimmetria gia' letta per l'esplosione a fine vita naturale
  (`explodeOnExpire`). **[C]** `smoko_aer/Create.gml` riusa gli sprite
  "cc2"/"cc3" del fumo delle centrali (smoke.js) — mai "cc1" (qui il dado
  e' un 50/50 secco fra i due, non i tre pesi 50/25/25 di `smoke_ind`) —
  con la stessa animazione a 70 frame vera (`AER_SMOKE_FRAME_COUNT`), ma
  **[C]** ferma sul posto (nessun moto: non insegue l'aereo, resta dov'e'
  nata) e con una crescita diversa — scala iniziale 2 (il doppio del fumo
  delle centrali), +0.2/tick invece di +0.05/tick, vita 36 tick. Depth
  **[C]** -4000 fisso (`data/objects.json`), la stessa quota di esplosioni/
  fuoco vero — diversa sia da quella del fumo delle centrali (dinamica,
  `-y-150/-200`) sia da quella della scia dei proiettili (-9000 fisso):
  tre famiglie di oggetti diverse nel decompilato, tre quote diverse,
  lette cosi' come stanno invece di uniformarle. Nuovo array `aerSmoke` in
  main.js, terzo tipo di fumo nel motore insieme a `smoke` (centrali) e
  `trails` (proiettili) — nessuno dei tre condivide lo step con gli altri
  due, le differenze (moto/crescita/animazione/quota) sono abbastanza
  diverse da rendere un sistema di particelle unico piu' complicato dei
  tre separati. Verificato in browser: un caccia forzato fermo lascia
  dietro di se' una nuvola di sbuffi che crescono e si sovrappongono,
  visibilmente diversi (piu' grandi, colore diverso, animati) dalla scia
  puntiforme dei proiettili.

- **Lo stato piro: le minacce vere hanno davvero una vita.** Corregge un
  errore di lettura fatto (e documentato) fin dal primo giro sul fuoco
  vero del lanciarazzi (STUDIO.md "il lanciarazzi spara per davvero" piu'
  sopra): quel giro leggeva `action_if_variable(life, 0, 3)` come
  "life != 0" e concludeva che `life` fosse un contatore di fatto morto —
  un solo colpo bastava sempre. **L'operatore 3 e' invece "<="**, la stessa
  famiglia di errore gia' presa e corretta per l'operatore 4 in coins.js:
  `air`/`bombar`/`dirig` hanno davvero una vita (**[C]** `Create.gml`:
  2/3.5/10) che il fuoco vero scala colpo per colpo, e quando arriva a 0 o
  sotto **[C]** `Step.gml` decide — a dado per `air` (1/2), sempre per
  `bombar`/`dirig` — se il velivolo esplode sul colpo o entra in stato
  "piro": precipita per conto suo, smette di bombardare, cambia sprite, e
  muore per davvero solo dopo un timer breve indipendente. `game/src/
  threats.js` (`THREAT_TYPES[...].piro`, `stepThreats()`) +
  `game/src/projectiles.js` (`DAMAGE`, un colpo scala vita invece di
  uccidere sul colpo).
  **Danno per colpo, per arma, contro air/bombar/dirig** — **[C]** letto
  dai `Collision_*` di ciascun oggetto-colpo, mappati per indice tramite
  `data/objects.json` (77=air, 78=bombar, 85=dirig): missile (`red_ball`)
  -1 uniforme sui tre; gatling (`yellow_pro`) -0.07 uniforme, per
  proiettile (due a scarica = -0.14 per raffica); laser (`laserone`)
  -2/-3/-2, l'unico non uniforme. Risultato: un missile abbatte `air` in 2
  colpi e `dirig` in 10; il laser (-2, ma con 85 tick di ricarica) abbatte
  `air` in un colpo solo e `dirig` in 5; il gatling (-0.07 a proiettile,
  -0.14 a raffica, ma ricarica cortissima) ne serve tantissimi contro
  qualunque bersaglio vero — coerente col suo ruolo di arma a raffica
  leggera piu' che di cecchino. Verificato con un test dedicato: missile
  contro `air` fermo entra in piro esattamente al secondo colpo (vita
  2 -> 1 -> 0); laser contro `dirig` fermo esattamente al quinto (vita
  10 -> 0 in cinque colpi da -2); gatling contro `air` fermo dopo ~15
  raffiche (~12.5s).
  **I tre stati piro, uno per tipo** (**[C]** letti da `Step.gml` di
  ciascuno):
  - `air`: **[C]** 1/2 di probabilita' di entrare in piro (l'altra meta'
    esplode sul colpo, come se non avesse questo stato) — picchiata quasi
    verticale (direzione 300°, velocita' 12, molto piu' veloce del volo
    normale 13-16), 30 tick (0.5s) prima di morire per davvero, un lampo
    all'ingresso. Cambia sprite in una variante "in fiamme" — 4 colori
    (`rosso_pic`/`blu_pic`/`giallo_pic`/`verde_pic`, risolti per indice
    sprite) abbinati al colore scelto a dado alla nascita (`col`, salvato
    sull'istanza apposta — prima non serviva a nient'altro).
  - `bombar`: **[C]** SEMPRE piro (nessun dado, mai esplosione sul colpo)
    — planata quasi orizzontale (direzione 10°, velocita' 7, molto piu'
    lenta della picchiata di `air`), 20 tick prima di morire, un lampo
    all'ingresso PIU' due o quattro pezzi di fusoliera che si staccano (a
    dado, sprite finale `bomb_p1` o `bomb_p2`) — ognuno un piccolo oggetto
    a parte nel decompilato (`rot11`/`rot12`/`rot21`.."rot24", sprite
    `bomb_rNN`) con la propria direzione/velocita'/vita fissa (letta da
    ciascun `Create.gml`, non un pattern riparametrizzato — verificato
    voce per voce), che vola via e alla fine crea la propria esplosione.
    Nuovo `debris`/`spawnDebris()`/`stepDebris()` in threats.js, un
    quarto tipo di "cosa volante che poi esplode" insieme a bombe/
    proiettili/fumo.
  - `dirig`: **[C]** SEMPRE piro, ma **nessun lampo all'ingresso** (unico
    dei tre) — deriva quasi fermo (direzione -18°, velocita' 1.5) per 85
    tick, il piu' lungo, mentre **[C]** 5 dadi indipendenti (1/45 a testa,
    OGNI frame) sparpagliano esplosioni ai suoi 5 offset fissi — lo stesso
    schema a raggiera della sua morte vera (`Destroy.gml`, vedi sotto),
    qui pero' distribuito nel tempo invece che tutto insieme. Cambia
    sprite in `dirspr_distrutto`.
  **La morte vera, qualunque sia la causa, passa sempre da
  `spawnDeathEffect(type,...)`** (gia' esisteva, per il fulmine — ora
  riletta con piu' attenzione): **[C]** `dirig/Destroy.gml` scatta in
  automatico ad OGNI morte dell'istanza (fulmine, timer del piro, scadenza
  naturale), creando la raggiera di 5 esplosioni IN AGGIUNTA a quello che
  il codice che ha chiesto la morte crea gia' per conto suo — `air`/
  `bombar` non hanno un `Destroy.gml` proprio, la singola esplosione che
  Alarm_1/Alarm_5 creano esplicitamente gia' gli basta. Risultato per
  morte-per-fulmine: `air`/`bombar` un'esplosione sola, `dirig` sei (una
  esplicita di `Alarm_5` + la raggiera di `Destroy.gml`) — verificato che
  non fosse un doppio conteggio ma un dettaglio vero del decompilato.
  Risultato per scadenza naturale (nessuno l'ha mai colpito, muore di
  "vecchiaia"): stessa `spawnDeathEffect()`, che per `dirig` produce la
  raggiera anche qui — **corregge** una lettura precedente
  (`explodeOnExpire: false` per dirig) che concludeva erroneamente "nessuna
  esplosione", quando invece l'unica cosa assente per scadenza naturale e'
  l'esplosione esplicita di `Alarm_1` (che per `air`/`bombar` c'e', per
  `dirig` no) — non la raggiera di `Destroy.gml`, sempre presente.
  **[I]** Non riprodotto: il contatore `pu1.distrutti` di `air/Destroy.gml`
  (un totale "aerei abbattuti" mai letto da nessun'altra parte del
  decompilato ricostruita finora — nessuna UI lo mostra).
  Verificato in browser (dopo aver rigenerato l'atlas in locale, non solo
  letto il codice): un caccia forzato in piro mostra davvero lo sprite "in
  fiamme" del suo colore con la scia di fumo dietro; un bombardiere forzato
  in piro mostra lo sprite "spezzato" con l'esplosione della sua stessa
  distruzione visibile nello stesso fotogramma (i pezzi di fusoliera, con
  vite di 3-50 tick, erano gia' esplosi entro i tempi di cattura dello
  screenshot — cronometrato a parte con un log per confermare che il
  volo/esplosione dei singoli pezzi avviene comunque). Una simulazione di
  due minuti con le tre torrette attive, minacce miste e una tempesta a
  meta' strada non ha prodotto eccezioni ne' posizioni NaN.
- **I ruderi: la morte di un edificio lascia davvero un rudere, non piu' un
  posto libero.** Chiudeva la "semplificazione dichiarata" della sezione
  precedente ("Primo sistema vita/morte reale") — segnalato dall'autore
  ("nel gioco originale c'erano delle rovine al posto degli edifici").
  Decompilato letto da zero: ogni `casaX`/`industriaX`/`club1`/`villa1`/
  `sooool`/`rocket_launcher`/`gatlinggun`/`lasergun`/`banca1`/`monum`/Step.gml
  ha lo stesso ramo `life<=0` (letto con "<=", non "!=" — stesso operatore 3
  gia' corretto per `threats.js`, "lo stato piro"): **[C]** crea un oggetto
  `ruinN` a parte (mai la stessa istanza) e si distrugge. Non e' un rudere
  per TIPO ma per "taglia": `ruin1`/`ruin2`/`ruin3` sono condivisi da piu'
  edifici diversi allo stesso "livello di importanza" (es. `ruin1` =
  industria1 **e** casa1 **e** club1 **e** villa1), ognuno scelto a dado
  uniforme fra 4 varianti equiprobabili (`ruinN/Create.gml`: due
  `action_if_dice(2)` annidati, stesso schema di pick gia' letto per gli
  step di cantiere ad array — `pickSpr()`, riusato). `sooool` ha il proprio
  (`ruinsol`, un solo dado a due vie fra `soolr1`/`soolr2`). **`chies` e'
  l'eccezione**: non crea un oggetto a parte, cambia sprite a SE STESSA
  (`ruinc1`/`ruinc2`/`ruinc3` in base a `level`, nessun dado) e resta
  piazzata — l'unico `Step.gml` che non passa da `action_kill_object()` in
  questo ramo. `parco` e' un'eccezione diversa: **[C]** il suo `Step.gml`
  non legge mai `life` — nessun ramo `life<=0`, quindi nessun rudere: se mai
  la sua vita toccasse 0 (in pratica quasi impossibile, `life: 9999` gia'
  la scelta [I] fatta per questo) l'originale non farebbe letteralmente
  niente, e cosi' anche `destroyBuilding()` ora.
  Portato **fedele** a un dettaglio che prima era dichiarato "troppo": il
  rudere e' un vicolo cieco vero, non un placeholder libero — senza lo
  strumento ruspa/bulldozer (`selec==11`, `puruspa`, la sola cosa che
  nell'originale rimuove un rudere per ricostruirci sopra pagando, ancora
  MAI ricostruita: resta un gap dichiarato) il posto resta bloccato per
  sempre. `ruinSpriteFor()` (buildings.js, stesso schema per-livello di
  `currentDecor()`/`currentDeathPop()`: `construct`/`upgrades[level-2]`, con
  `baseRuin` come fallback di `chies`) decide lo sprite; `destroyBuilding()`
  (main.js) lo consulta PRIMA di toccare qualunque stato — se torna `null`
  (solo `parco`) esce subito senza rimuovere l'edificio ne' applicare
  pop/hap, altrimenti applica il bilancio come prima ma sposta l'istanza in
  un array `ruins` a parte invece di rimetterla fra i `buildings` (un
  rudere non produce, non cresce, non spara, non prende piu' danno da
  fulmine: e' decoro inerte, stessa famiglia di `decorEntities`) e NON
  libera piu' il placeholder trovato alla sua posizione. `ruins` e'
  disegnato come `decorEntities` (non ruba il tap: nessun evento Mouse reale
  sui `ruinN` a parte del ramo ruspa, non riprodotto) e ora e' anche
  salvato/caricato (save.js: `x`/`y`/`spr` bastano, `_f`/`depth` derivati al
  volo come per `buildings`) — senza, un rudere spariva a un ricaricamento
  manuale e il suo placeholder tornava (erroneamente) libero.
  Sprite nuovi in `GAMEPLAY_SPRITES` (tools/23_atlas.py): `ru11..ru14`/
  `ru21..ru24`/`ru31..ru34` (le tre "taglie" condivise), `soolr1`/`soolr2`
  (`sooool`), `ruinc1..ruinc3` (`chies`) — atlas e blitplan rigenerati e
  verificati in browser (Playwright): una `casa` piazzata e poi forzata a
  `life: 0` sparisce dai `buildings` e compare come rudere (`ru1N` scelto a
  dado) esattamente alla sua posizione, il placeholder sotto resta bloccato
  a un secondo tap (nessuna ricostruzione), `chies` forzata a morire diventa
  `ruinc1` e sopravvive a un ciclo salva/carica, e un `parco` sintetico a
  `life: 0` resta un edificio normale, invariato.
  **[C]** = comportamento letto nel decompilato. **[I]** = la sola scelta
  non fedele resta la stessa gia' dichiarata per la ruspa: nessuna
  ricostruzione a pagamento, il rudere e' permanente invece che riparabile.
- **Undicesimo edificio, primo multi-tile: `eolico`.** Segnalato dall'autore
  insieme ai ruderi ("partiamo dall'eolico"): a differenza di tutti i dieci
  edifici gia' portati, `eoli` (src/objects/eoli, "Pala eolica" nel menu,
  `pu4prov`/`selec==4`) non si piazza su un solo `placeholder`. **[C]** letto
  da zero: `placeholder/Mouse_LeftReleased.gml` (selec==4) non crea
  l'edificio direttamente — crea `eoliplacer` (offset +98px dal tocco), che
  arma un timer a 3 tick. Nel frattempo `placeholder/Collision_445.gml`
  (contro OGNI placeholder che la maschera FISSA "phold" di `eoliplacer`
  tocca) fa salire `places` di 1 per ognuno — fino a un massimo implicito di
  4, dato dalla geometria della maschera. Al timer, `eoliplacer/Alarm_1.gml`
  guarda `places`: se e' gia' 4, crea `impavent` (il cantiere vero) e scala
  50000 mon; altrimenti crea un `fantoccio` (sprite vuoto, nessun evento
  utile, si autodistrugge da solo dopo 30 tick) e MUORE due tick dopo senza
  mai piu' ricontrollare `places` — **sembra un meccanismo mai rifinito**
  nell'originale stesso (fallisce in silenzio, nessun feedback al
  giocatore, un solo controllo a tempo fisso). Una volta nato, `impavent`
  (**[C]** `impavent/Collision_placeholder.gml`) uccide con la propria
  maschera ("auton") ogni placeholder ancora sotto di lui — cosi' i 3 lotti
  "vicini" spariscono per davvero, non solo quello toccato.
  **[I] Approssimazione dichiarata** (stessa famiglia di `TURRET_MIN_DIST`/
  `BLAST_RADIUS`: "pepazzittecollider" mai ricostruito): niente vera
  maschera di collisione, `findPlacementCluster()` (main.js) cerca fra i
  placeholder ancora liberi i 3 piu' vicini a quello toccato entro 130px —
  la stessa spaziatura reale della griglia di `match_easy` gia' misurata per
  `TURRET_MIN_DIST` (~116px fra vicini diretti, ~152px al vicino successivo:
  130px prende esattamente i 4 vicini diagonali e nessun altro). A differenza
  dell'originale (silenzioso) il giocatore riceve sempre un messaggio,
  costruito o no — scelto per chiarezza, non per fedelta' a un dettaglio che
  sembra un bug/gap dell'originale stesso. I 3 lotti extra, una volta
  consumati, restano bloccati per sempre (nessun edificio/rudere li occupa
  visibilmente, esattamente come nell'originale che li uccide senza lasciare
  traccia) — persistiti in un nuovo array `blockedSlots` (main.js/save.js),
  altrimenti un salvataggio/caricamento li avrebbe liberati di nuovo (un
  problema che *non* esisteva prima di questo edificio: `buildings`/`ruins`
  bastavano perche' ogni placeholder occupato aveva sempre qualcosa sopra).
  Il resto di `eoli` e' invece un edificio ordinario, stessa infrastruttura
  di dati di tutti gli altri: **[C]** produzione elettrica pura (`eoli/
  Alarm_0.gml`, sempre +110 ele ogni 30 tick, nessun `oil` consumato — a
  differenza di industria, un generatore vero, non una centrale) — nuovo
  `windProduction`/`stepWindProduction()` invece di riusare `stepProduction()`
  (industria-specifico: gated su `oil>0`, sottrae `prod.oil` incondizionato)
  o `stepSolarProduction()` (dipende da giorno/notte, questo no); danno da
  fulmine (`eoli/Alarm_5.gml`, dado 1/30, -50 vita — crea anche un oggetto
  "thunder" cosmetico, non riprodotto, stessa scelta gia' fatta per laser);
  `hap` -20/+20 alla nascita/morte (l'unico fra tutti i tipi con `hap` dove i
  due numeri sono davvero l'opposto esatto); rudere `ruinventola`
  (`rovent1`/`rovent2`, dado a due vie) quando la vita arriva a 0 — stessa
  `ruinSpriteFor()`/array `ruins` gia' costruiti per gli altri dieci edifici,
  nessuna modifica li' serviva. Cantiere (`impavent/Create.gml` +
  `Alarm_0|1|2.gml`): tre sprite in sequenza (`impvent1`/`2`/`3`, 1740+600+
  2200 = 4540 tick, ~76s — il piu' lungo del motore) e un drain di -1 mon
  OGNI tick (non ogni N come altrove: stesso campo `{mon,every}`, qui
  `every:1`), coerenti con un costo di piazzamento di 50000 mon.
  Sprite nuovi in `GAMEPLAY_SPRITES` (tools/23_atlas.py): `impvent1/2/3`,
  `eol`, `rovent1/2` — atlas e blitplan rigenerati.
  Verificato in browser (Playwright): un tocco su un lotto con almeno 3
  vicini liberi entro 130px avvia davvero il cantiere (spr "impvent1",
  50000 mon scalati, i 3 vicini finiscono in `blockedSlots`); un tocco su un
  lotto isolato (tutti i vicini gia' occupati) NON scala niente e mostra
  "serve un'area libera di almeno 4 lotti vicini"; un `eoli` finito produce
  110 ele ogni 30 tick, muore in un rudere `rovent*` fedele allo schema
  gia' esistente, e un tentativo di costruire su uno dei 3 lotti bloccati
  fallisce silenziosamente (restano bloccati) anche dopo la sua morte; un
  ciclo salva/carica restituisce sia l'edificio che i 3 lotti bloccati.

- **Dodicesimo e tredicesimo edificio, primi due a trascinamento:
  `palazzo`/`museo`.** Richiesti dall'autore insieme ("ora fai il museo e
  il palazzo, che prendono due caselle ciascuno e hanno una logica di
  piazzamento diversa dagli altri edifici") — a differenza di `eolico`
  (tocco singolo, raggio di ricerca piu' largo) questi due si trascinano
  davvero da un lotto verso un vicino diagonale, e nel decompilato quel
  meccanismo esiste per intero, mai wired nel menu di questo motore.
  **[C] Identita'**: `pu6`/`selec==6` era etichettato "Grattacielo" in
  questo repo (mai verificato) — `src/objects/level2palazz` (il popup
  "livello 2 sbloccato" agganciato a `pu6/Mouse_MouseEnter.gml`, stesso
  schema `level2<nome>` di level2club/level2gatling/level2sol per
  club/gatling/solare) lo chiama "palazz[o]": rinominato. `pumediat`/
  `selec==70` era gia' "Museo", giusto.
  **[C] La meccanica di piazzamento**, letta da zero (nessuno dei due
  bottoni aveva mai un ramo in `placeholder/Mouse_LeftReleased.gml`, la
  release-only usata da ogni altro edificio): `placeholder/
  Mouse_LeftPressed.gml` (rami selec==6/70) arma alla PRESSIONE (non al
  rilascio) creando quattro sonde `cre1..cre4` ai quattro offset diagonali
  fissi (+99,+57)/(+99,-57)/(-99,-57)/(-99,+57) dal lotto toccato — gli
  stessi (ox,oy) che ogni istanza di `placeholder` dichiara in
  `match_easy.scene.json`, non un numero a caso. Ogni sonda che tocca un
  altro `placeholder` ancora libero (`creN/Collision_placeholder.gml`) arma
  una direzione (`dirN`, oggetto invisibile: `dirN/Mouse_LeftReleased.gml`
  mette `arm=1` al RILASCIO, non alla pressione — l'unico posto nel
  decompilato dove un piazzamento distingue i due). Se il rilascio non cade
  su nessuna direzione armata, `placeholder/Mouse_GlobalLeftReleased.gml`
  (evento globale, non legato a un'istanza sotto al puntatore) annulla
  tutto senza costo. Se cade su una direzione valida,
  `placeholder/Collision_dir1..4.gml` (lette riga per riga, tutte e
  quattro): le quattro direzioni si accoppiano in due assi opposti
  (dir1+dir3 contro dir2+dir4, non dir1+dir2) — per ENTRAMBI gli assi
  l'edificio vero nasce sempre sul lotto con la y maggiore fra origine e
  vicino (l'ancoraggio "piu' vicino alla camera" coerente col resto del
  motore), l'altro lotto della coppia viene ucciso da `dirdel` (spawnato
  esattamente sulla sua posizione in tutti e 4 i rami — **[C]**
  `dirdel/Collision_placeholder.gml`: uccide se stesso e il placeholder che
  tocca, nessun'altra logica) — stessa sorte dei lotti extra di `eolico`,
  riusa `blockedSlots` cosi' com'e', nessuna modifica a save.js. L'asse
  sceglie solo quale famiglia di sprite di cantiere orientati usare
  (`impa4r`/`IMPAMEDIA_R` contro `impa4rd`/`IMPAMEDIA_RD` — verificato con
  `diff`: identici byte-per-byte agli originali "r", solo il prefisso degli
  sprite cambia `sr*/sf*` -> `rd*/fd*`) e quale famiglia di varianti finali
  (c4xx "dispari" contro "pari").
  **[I] Asse come tipo concreto invece di un campo per-istanza**: invece di
  far portare l'asse a ogni funzione di buildings.js (`currentDecor`,
  `ruinSpriteFor`, `stepGrowth`, ...), `main.js`/`resolvePlacement()`
  materializza l'asse in un secondo tipo concreto al momento della
  costruzione vera — `BUILDING_TYPES.palazzo`/`museo` (asse "r") contro
  `palazzoRd`/`museoRd` (asse "rd"), mai in `OTHER_BUILDINGS`/il menu, solo
  raggiungibili da `resolvePlacement()`. `frontSprFor()` (buildings.js) e'
  stato esteso per riconoscere anche i prefissi `sr*`/`rd*` (oltre a `ir*`
  gia' noto), non serve altro nel motore.
  **[I] Solo un livello portato**: nel decompilato `palazzo` continua con
  un secondo salto (`casa4s|d/Alarm_2.gml`, ava==5 — MA solo se
  `chies.level>=3`, un gate mai visto per nessun'altra `casa`: crea
  `upsign45s|d` -> `impa5r|rd` -> `casa5ss|dd`, stesse sequenze/numeri).
  Un secondo livello avrebbe richiesto un gate nuovo (soglia di sblocco
  legata a un ALTRO edificio, non solo pop/makee/ava come
  `upgradeProgress()` conosce oggi) — fuori dallo scopo di questo giro,
  stesso genere di "fermata prima del massimo del decompilato" gia'
  accettato per `casa` stessa. `museo` non ha comunque un secondo livello
  nel decompilato: `media1s/Create.gml` arma `action_set_alarm(2000,2)` ma
  **non esiste `media1s/Alarm_2.gml`** — alarm morto, `ava` resta 0 per
  sempre; `med1`/`med2` sono solo un dado 50/50 sulla variante finale, non
  due edifici (nessun oggetto decompilato "media2*" esiste).
  **[C] Un canale nuovo**: `media1s/Alarm_3.gml` scala anche `r12.mon`
  (-60 ogni 120 tick, oltre a `ele`) — mai visto in nessun altro edificio
  con `consumption`: `stepConsumption()` ora legge anche un `rate.mon`
  opzionale, indipendente da giorno/notte. `museo` da' `hap` diretta invece
  di `pop` (nessun `grantPop`, nessuna crescita) — coerente con "un museo
  aumenta la felicita', non la popolazione".
  Sprite nuovi in `GAMEPLAY_SPRITES` (tools/23_atlas.py): le sequenze di
  cantiere condivise `sr/sf/rd/fd1x..4x` (96 sprite, stessa sagoma
  generica per entrambi gli edifici), `topls` (il topper, spawnato a meta'
  cantiere), le 20 varianti finali di `palazzo`/`palazzoRd` (c4xx + decoro
  luci "l"/"ds"), `ru41`/`ru41d`, e le 8 varianti/decoro di `museo`/
  `museoRd` (med1/med2 + le rispettive "d") — atlas e blitplan
  rigenerati (`python3 tools/24_blit.py font_gotham_mini` andava comunque
  rigenerato a parte: il font bitmap non era mai stato blittato in questo
  checkout, indipendente da questa modifica).
  Verificato in browser (Playwright, via `window.__nimbus`): premere su un
  lotto libero con "Palazzo"/"Museo" selezionato lo evidenzia SUBITO di
  rosso (non il viola dell'hover — **[C]** `action_sprite_color(255,1)` e'
  la costante GameMaker `c_red`, non bianco) e ferma lo scroll; trascinare
  fino a un vicino diagonale libero e rilasciare li' costruisce davvero
  (mon scalati esattamente, `blockedSlots` riceve il lotto NON scelto,
  l'edificio nasce sul lotto con la y maggiore, sprite di cantiere corretto
  per l'asse trascinato su entrambe le direzioni — verificato sia
  "r"/`palazzo` sia "rd"/`museoRd`); rilasciare senza trascinare (o fuori
  da ogni vicino valido) annulla senza scalare nulla; un tentativo di
  costruire di nuovo sul lotto bloccato non aggiunge edifici.

- **Torrette: il lanciarazzi punta/spara verso cose fuori dallo schermo.**
  Segnalato dall'autore. `stepTurretAim()` (buildings.js, condivisa da
  missile/gatling/laser — nessuna logica separata per il lanciarazzi)
  aveva due problemi indipendenti, entrambi introdotti da un giro
  precedente (**[C] git blame**: commit `e8352be`, "mira coerente col
  bersaglio colpito" — corretto un bug ma ne ha lasciati due):
  1. **Priorita' rigida invece di "il piu' vicino"**: le minacce vere
     (`threats`: aerei/bombardieri/zeppelin) battevano SEMPRE le
     mongolfiere (`balloons`, passate insieme alle auto decorative come
     `targets`) se una qualunque minaccia era entro `aim.range` — anche
     quando una mongolfiera era molto piu' vicina. Il cannone poteva
     restare puntato su un bombardiere a 390px mentre una mongolfiera a
     50px veniva ignorata. Corretto con un solo confronto di distanza fra
     `targets` e `threats` insieme, senza piu' due liste in ordine di
     priorita' — esattamente quello che l'autore ha chiesto ("calcolare la
     distanza da tutti gli oggetti volanti — mongolfiere, aerei, dirigibile
     — e puntare verso quella piu' vicina").
  2. **`aimAngle`/`aimTarget` non si azzeravano mai**: quando nessun
     bersaglio era piu' in portata (`nearest` restava `null`) la funzione
     faceva `continue` senza toccarli — **[C]** fedele a
     `rocket_launcher|gatlinggun|lasergun/Step.gml` (l'`if` che li
     aggiorna e' innestato dentro il controllo di portata, niente ramo
     `else`), ma con `targets`/`threats` che nascono fuori mappa e se ne
     vanno (STUDIO.md sopra, "le mongolfiere"; `threats.js`,
     `spawnX: -170` per gli aerei) un bersaglio puo' sparire (rimosso
     dall'array quando muore/scade, `threats.splice`) senza che
     `aimTarget` smetta MAI di puntare a quella posizione — il cannone
     resta visivamente "agganciato" per sempre. `fireTurretManual`
     (projectiles.js, tap manuale su missile/laser) spara sempre verso
     `b.aimTarget` **senza richiedere che ci sia davvero una minaccia
     vera**, quindi un tap dopo che il bersaglio se n'e' andato lanciava
     comunque un razzo verso quel punto congelato — spesso fuori
     dallo schermo, perche' l'ultimo bersaglio agganciato e' quasi sempre
     uno che si stava allontanando o che e' appena nato al bordo/fuori
     mappa. **[I]** Corretto azzerando `aimAngle`/`aimTarget` quando
     `nearest` e' `null`: `fireTurretManual`/`stepTurretFire` (che gia'
     controllano `aimTarget == null`) ora rifiutano correttamente il colpo
     invece di sparare nel vuoto.
  Rimossa anche `cars` dalla lista candidati (`main.js`,
  `stepTurretAim(buildings, balloons, threats)` invece di
  `cars.concat(balloons)`): le auto decorative non sono oggetti volanti,
  e includerle era un altro modo per far restare il cannone puntato su
  qualcosa a terra invece che sul velivolo piu' vicino — coerente con la
  richiesta ("mongolfiere, aerei, dirigibile", non le auto). [I]: nel
  decompilato il lanciarazzi punta anche i veicoli (`instance_nearest(
  veicoli_target)`, gia' non piu' fedele da `e8352be` in poi che gli aveva
  affiancato le minacce vere); qui si ferma agli oggetti volanti soltanto.
  Verificato con un test unitario diretto su `stepTurretAim()` (node, import
  ES module — non serve il browser per una funzione pura): mongolfiera a
  50px batte una minaccia a 380px (prima sceglieva sempre la minaccia);
  minaccia a 100px batte una mongolfiera a 350px (il "piu' vicino vince"
  resta corretto in entrambe le direzioni); un bersaglio che sparisce fa
  tornare `aimTarget`/`aimAngle` a `null` invece di restare congelato;
  bersagli oltre `aim.range` restano ignorati. Verificato anche in browser
  (Playwright) che piazzare e far vivere un lanciarazzi per qualche secondo
  di gioco normale non introduce errori in console.

- **Rettangolini rosa/rossi semitrasparenti sparsi intorno alla citta'.**
  Segnalato dall'autore. `main.js` (ciclo di disegno, prima riga 1434-1439)
  disegnava un quadrato colorato semitrasparente (`colorFor(it.obj)`, un
  hash del nome oggetto — commento originale: "colore stabile per nome
  oggetto, finche' non abbiamo gli atlas veri") per QUALUNQUE istanza della
  room priva di sprite, invece di ometterla. Nella scena `match_easy` sono
  31 istanze, 27 delle quali `pepazzittecollider` — **[C]**
  `src/objects/pepazzittecollider/_object.json`: `sprite: null, visible: 0`
  nel decompilato, un collisore invisibile by design (fa rimbalzare i
  pedoni, `pplo/Collision_pepazzittecollider.gml`; STUDIO.md piu' sopra,
  "l'autore stesso non ricorda a cosa delimitino esattamente"), non uno
  sprite perso. Le altre 4 (`scroller`/`scroller2`/`scriptfucker`/`iconic`)
  sono lo stesso genere di controller/collisore invisibile. Il quadratino
  era pensato come aiuto per chi sviluppa ("dov'e' quello che non ho ancora
  disegnato") ma restava visibile a QUALUNQUE giocatore, sparso per la
  mappa come se fosse un segnaposto di qualcosa — **[I]** tolto: le
  istanze senza `_f` ora vengono semplicemente saltate nel disegno, fedeli
  all'originale (che non le ha mai disegnate nemmeno lui). Il conteggio
  `missingArt`/"senza sprite N" nell'HUD di debug resta, e' gia' il modo
  giusto per uno sviluppatore di sapere quanti sono senza che finiscano
  davanti agli occhi di chi gioca soltanto. `colorFor()`/`it._c` (usati solo
  per quel quadratino) rimossi, codice morto dopo la modifica.
  Nella stessa occasione, individuata (ma non ancora ricostruita — non
  richiesto) la sagoma nera a forma di mano/pollice che compare vicino
  all'acqua in basso a destra sulla mappa: **[C]** e' `src/objects/reversi`
  (sprite `tut_ok`, poi `action_sprite_set(tut_exit,...)` al Create — mai
  riprodotto qui), il vero bottone SALVA-ED-ESCI del decompilato
  (`Mouse_LeftPressed.gml`: `action_save_game(...)` + `r12.exiting = 1`),
  non un placeholder generico ne' il bottone "mano" (`handbutton`/`handee`,
  gia' vero, in basso a SINISTRA — coppia diversa, non va confusa).
  Nell'originale segue la camera e si piazza in basso a destra SOLO nel
  menu principale (`reversi/Step.gml`: `with (pu1) { if (menoo==0) ...
  action_move_to(...) else action_move_to(-1000,-1000) }`) — qui invece
  `reversi` non e' mai stato tolto da `staticWorld` (stesso trattamento gia'
  dato a `pu1`/`chies`/`honda_facile_1|2`, mai esteso a questo), quindi resta
  un oggetto di mondo fermo nella posizione della room con lo sprite
  `tut_ok` "di riposo" mai sostituito da `tut_exit`. Segnalato all'autore,
  non implementato: comporterebbe decidere cosa significhi "esci" in una
  ricostruzione senza un vero menu principale a cui tornare.

- **Linguette di prezzo all'hover sui bottoni edificio e sui segnali di
  potenziamento.** Richiesto dall'autore — gia' documentato ma segnato
  "non riprodotto" a §5.4/riga 569 ("richiederebbero tracciare l'hover, che
  il nostro `Input` oggi non fa"): quella nota e' superata da tempo,
  `input.hover` esiste da quando serve alla raccolta automatica delle
  monete blu (STUDIO.md, "il pulsante blu delle monete"), semplicemente
  nessuno aveva ancora ricostruito questa parte.
  **[C]** src/objects/pu1..pumediat/Mouse_MouseEnter|Leave.gml (bottoni) e
  upsign12|23|45s|45d/Mouse_MouseEnter|Leave.gml (segnali): al passaggio
  del mouse creano un'istanza `cc<valore>` sopra il bottone/segnale,
  distrutta al MouseLeave — **non e' testo disegnato a runtime**, ogni
  `cc*` mostra uno sprite PRE-RENDERIZZATO col numero gia' dentro
  (`c100`..`c50000`, un taglio per ogni costo reale gia' presente in
  `placeCost`/`upgrades[].cost`, verificato uno per uno — nessun taglio
  mancante). `chies` (`upcrc12`/`upcrc23`) e' l'unica eccezione: costa
  mon+oil insieme, usa due sprite dedicati gia' pronti nel decompilato
  (`c12aa`/`c23aa`, banner larghi il doppio dei tagli a valuta singola)
  invece di un taglio `cXXXX`. `costTagSprite()` (buildings.js) fa questa
  scelta: `chies` -> `c12aa`/`c23aa` per indice, altrimenti `c<mon>` se
  (e solo se) il costo e' un singolo valore in `mon`.
  Posizionamento: **[I]** l'originale usa un offset fisso in coordinate
  room (-100 per i bottoni, -50 per gli upsign, `global.sca*0.5` di scala)
  che non si traduce 1:1 nello spazio schermo di `uiButtons` di questo
  motore (i bottoni bar sono gia' fissi in spazio schermo, non piu' istanze
  di mondo con una propria scala "sca") — qui la linguetta dei bottoni sta
  centrata sopra il bottone con un piccolo margine fisso (8px, spazio
  schermo, scala `UI_SCALE` come il bottone stesso), quella degli upsign
  centrata sopra il pin verde `upico` con margine derivato dalla sua vera
  altezza (`upicoFrame.oy`) invece di un numero scollegato — stesso
  risultato visivo dell'originale (una linguetta ben distanziata sopra
  quello che descrive), non gli stessi identici pixel di offset.
  Solo mouse (`input.hoverPointerType === "mouse"`), come la raccolta
  automatica delle monete: il touch non ha un vero hover senza contatto, e
  coprirebbe comunque il bottone/segnale col dito.
  Sprite aggiunti a `GAMEPLAY_SPRITES` (tools/23_atlas.py): `c100`, `c500`,
  `c1000`, `c2000`, `c3500`, `c5000`, `c6000`, `c7500`, `c10000`, `c20000`,
  `c35000`, `c50000`, `c12aa`, `c23aa` — atlas e blitplan rigenerati.
  Verificato in browser (Playwright): hover su un bottone edificio mostra
  la linguetta col costo giusto (verificato villa 7500 e museo 35000),
  sparisce spostando il mouse altrove; forzando una casa appena piazzata
  allo stato "potenziamento pronto" (`ava` alla soglia), il pin verde
  `upsign` compare e l'hover su di lui mostra "500" (`upsign12`, coerente
  con `BUILDING_TYPES.casa.upgrades[0].cost`).

- **Quattordicesimo e quindicesimo edificio, i primi due "a stella":
  monumento e banca.** Richiesto dall'autore ("riusciamo a implementare
  degli edifici con la stella?") — indagati tutti e tre i bottoni "stella"
  prima di iniziare (`stella1`/`selec==71`/monumento, `stella2`/
  `selec==72`/banca, `stella3`/`selec==82`): il terzo **non e' un edificio
  nuovo**, e' un secondo modo di sbloccare `eolico` (gia' implementato) —
  zero lavoro li'. Monumento e banca invece sono davvero nuovi, e a
  differenza di ogni edificio precedente **non stanno mai nel menu base**:
  sono ricompense di traguardo, invisibili finche' non si supera una
  soglia.
  **[C] Sblocco** — `pu1/Step.gml`, letto riga per riga (operatori: 0="==",
  1="<", 2=">", 3="<=", 4=">=", tutti gia' stabiliti altrove nel
  progetto — verificati di nuovo qui su un caso noto, `action_if_variable(
  shifta,0,2)`/`(shifta,-1000,1)`, un chiaro clamp min/max dello scroll
  orizzontale, prima di fidarsi sui casi nuovi): monumento a `distrutti>49`
  (non ">=49" — la soglia vera e' 50 abbattimenti), banca a
  `chies.level>1 && pop>=3000` (**non** "level>=1" come una prima lettura
  aveva capito: l'idiom `with(chies){ if(level>1) break } if(__b__){...}`
  va letto "esegui se la condizione dentro il with era vera" — lo stesso
  schema gia' usato in decine di altri punti di questo file per le soglie
  di potenziamento, qui riverificato con calma prima di fidarsene su un
  caso nuovo).
  `distrutti` (`pu1/Create.gml`, incrementato da `air/Destroy.gml` — **[C]**
  a OGNI distruzione di un `air`, non solo un colpo vero: GameMaker manda
  Destroy per qualunque motivo, replicato su tutti e 4 i punti di
  `threats.js` dove un `air` esce dall'array, non solo `life<=0`) era gia'
  dichiarato "non riprodotto, nessuna UI lo mostra" (STUDIO.md — quella nota
  e' smentita da questo lavoro: la UI che lo mostra e' proprio lo sblocco
  del monumento). Vive su `r12.distrutti` (game/src/state.js) invece che su
  un'istanza `pu1` che qui non esiste mai per davvero.
  **[I] Restano nel menu invece di fluttuare**: l'originale ancora
  `stella1`/`stella2` a un offset FISSO sopra `pu1` (`pu1.x, pu1.y-100*sca`
  / `pu1.x+100*sca, pu1.y-100*sca`), fuori dalla riga scorrevole dei
  bottoni normali — qui compaiono/scompaiono nella STESSA riga
  (`STAR_BUILDINGS`, main.js), riuso diretto dell'infrastruttura
  `OTHER_BUILDINGS`/`uiButtons` gia' esistente invece di un secondo layout
  a parte, stesso risultato osservabile (appaiono solo a soglia raggiunta).
  **[I] Restano nascosti una volta costruiti**: l'originale ha un proprio
  flag "gia' assegnato" (var 517/516, mai identificate con certezza) — qui
  basta controllare se esiste gia' un edificio di quel tipo in `buildings`,
  stesso risultato (il bottone non ricompare per un secondo esemplare).
  **[C] Monumento** (`monum`, sprite `monu_img`): nessuna produzione/
  crescita — vita 1000, felicita' simmetrica ±1000 (l'unico altro tipo cosi'
  e' `eolico`), drenaggio perenne -5 mon/67 tic dopo il cantiere (oltre al
  drain -3/20tic durante), rudere fisso `monu_ruin` (nessun dado, a
  differenza di quasi ogni altro rudere), nessun danno da fulmine (solo le
  bombe, gia' generiche in `stepBombs()`). **[C] placeholder/
  Mouse_LeftReleased.gml, ramo selec==71**: scala 20000 mon SENZA
  controllare prima l'affordability, unico ramo del file cosi' — riprodotto
  con un nuovo `def.noAffordCheck` (buildings.js/main.js placeAt()) invece
  di "correggerlo" silenziosamente: puo' davvero portare mon sotto zero.
  **[C] Banca** (`banca1`, sprite `banca_img`): vita 1300, consumo elettrico
  FISSO -18/-27 ele (giorno/notte, ogni 120 tic — banca non cresce mai,
  nessun `Alarm_2` armato), fulmine 1/160 ogni 57 tic (piu' raro del
  consueto 1/108), rudere `ruin3`/`ru31..34` (dado uniforme, stesso oggetto
  gia' condiviso da industria3/casa3/lasergun). **[C] placeholder/
  Mouse_LeftReleased.gml, ramo selec==72**: nessuna riga `mon=...` — davvero
  gratis (`placeCost: {}`, gia' un no-op per `canAfford()`/il ciclo di
  scalo, nessuna modifica al motore serviva). **[I] `Alarm_0` di banca1**
  (dado di ricolorazione/16 varianti sprite) verificato ARMATO O NO prima di
  crederci: `Create.gml` non arma mai lo slot 0 — stesso codice morto
  copiato da `casa1/Alarm_0` gia' scartato per casa4s/d/casa5ss/dd, non
  portato qui (una prima ricognizione lo aveva scambiato per una meccanica
  vera). Il pulsante prestiti (`bankbuttoner`, oggetto `repre`/calendario
  mesi, 4 prestiti a interesse composto) e' un sotto-sistema economico a
  parte — **[I] gap dichiarato**, fuori scopo per questo giro: la banca
  qui e' vita/luce/rudere/fulmine/consumo, non il prestito.
  Entrambi condividono lo stesso cantiere `ir1x`/`if1x` gia' impacchettato
  per casa/industria/missile/solare/palazzo/museo (nessuno sprite di
  cantiere nuovo — verificato che monum e banca lo usino DAVVERO
  identico, comprese le stesse 4 "gru" quadrate ad ogni tic3 e lo stesso
  topper finale `tops3`→sprite reale gia' `toppers`, offset (0,-170)).
  Sprite nuovi in `GAMEPLAY_SPRITES`: `sta1`/`sta1s`/`sta2`/`sta2s`
  (icone bottone — dimenticate al primo giro, il bug che il bottone non
  compariva mai nonostante `unlocked()` gia' corretta), `monu_img`/
  `monu_ruin`/`monu_l`/`monu_lx`, `banca_img`/`banca_l`/`banca_lx`, e
  `cfree` (il terzo cartellino di prezzo dedicato, per l'unico edificio
  davvero gratis — `costTagSprite()` in buildings.js) — atlas e blitplan
  rigenerati.
  Verificato in browser (Playwright): nessuno dei due bottoni compare prima
  della soglia; forzando `distrutti=50` il monumento compare, si piazza
  (-20000 mon, cantiere condiviso "ir1x" visibile), e il bottone sparisce di
  nuovo; forzando `chies.level=2`/`pop=3000` la banca compare, l'hover
  mostra "It's free!", si piazza senza scalare mon.

- **Correzione: la terza stella non e' eolico, e' un edificio nuovo —
  `grattacielo`.** La nota sopra ("monumento e banca") liquidava
  `stella3`/`selec==82` come "un secondo modo di sbloccare eolico, zero
  lavoro" dopo aver letto solo la riga che `placeholder/Mouse_LeftReleased.gml`
  condivide fra selec==4 e selec==82 (entrambi creano `eoliplacer`), senza
  scendere fino in fondo a `eoliplacer/Alarm_1.gml`. Segnalato dall'autore
  ("dovrebbe essere un enorme grattacielo tipo Burj Khalifa, indaga bene").
  **[C]** Quella funzione ha in realta' due rami indipendenti DOPO il punto
  in comune: selec==4 (costo 50000, crea `impavent` — eolico, gia' letto)
  e selec==82 (costo 200000, crea `m3cant` — un oggetto mai letto prima
  d'ora). `m3cant` non condivide NIENTE con eolico oltre al meccanismo di
  piazzamento (stessa maschera fissa `eoliplacer`/"phold", 4 lotti): **[C]**
  `data/sprites.json`, `m3x1`..`m3x14`, sono 588px di larghezza per
  un'altezza che cresce da 1085 a 1527px — una torre stretta e altissima,
  non l'810x865 quasi quadrato di `eol`.
  **[C] Crescita** (`m3cant/Create.gml` + `Alarm_0.gml`): a differenza di
  OGNI altro edificio del motore, non c'e' una fondamenta generica "ir1x"
  che poi si smaterializza in un `finalSprite` diverso — e' lo STESSO
  oggetto che cambia `sprite_index` 14 volte (440 tick sul primo sprite,
  poi 540-640 tick per passo), e l'ultimo sprite mostrato e' gia' l'edificio
  finito. Cantiere totale 7560 tick (~126s), il piu' lungo del motore,
  coerente con 200000 mon — nessun altro edificio piazzabile costa di piu'.
  **[C] Sblocco**: `banca1_light/Create.gml` (il decoro-luce che
  `BUILDING_TYPES.banca.construct.decor` gia' crea a fine cantiere) arma
  `stella3` alla PRIMA banca costruita (dietro due flag "run once", stesso
  idioma di `distrutti` per il monumento) — non una soglia a parte come le
  prime due stelle.
  **[C] Consumo**: riletti gli operatori di `m3cant/Step.gml` con la tabella
  gia' stabilita altrove in questo file (4=">=", non "!="` come una prima
  lettura del ramo `phase!=14` aveva capito — corretto a `phase>=14` prima
  di fidarsene): PRIMA di finire il cantiere non consuma niente di suo
  (l'unico drenaggio e' un "acceleratore" opzionale legato a `playbuttoner`,
  un bottone play/pausa mai ricostruito — stesso gap dichiarato dei prestiti
  di banca); UNA VOLTA FINITO consuma elettricita' OGNI TICK, non ogni 120
  come il resto del motore — -1/-2 ele di giorno/notte, riprodotto
  moltiplicando per 120 dentro il periodo fisso gia' cablato in
  `stepConsumption()` invece di toccare il motore per un solo edificio.
  Lo stesso blocco azzera anche `r12.spy` (mongolfiere spia, STUDIO.md
  "le mongolfiere") ogni tick a costruzione ultimata — un possibile effetto
  "il grattacielo blocca lo spionaggio" **non riprodotto**: la sua semantica
  esatta dipende dall'ordine di esecuzione fra oggetti nello stesso tick
  dell'originale, non verificabile con sicurezza da qui.
  **[C] Nessuna vita**: `m3cant` non ha ne' un `Destroy.gml` ne' una
  variabile `life` in nessun evento — indistruttibile per davvero, non solo
  "senza fulmine" come `parco`. Stesso trucco [I] gia' scelto per
  `BUILDING_TYPES.parco`: `life: 99999` invece di un caso speciale nel
  motore.
  **[C] Finestre notturne**: a fine cantiere l'originale crea 10 oggetti
  sovrapposti nello stesso punto (`m3lux1`..`m3lux9` + `m3lux_red`, ognuno
  una sagoma PIENA della torre — 588x1527 come `m3x14` stesso), ognuno con
  la propria velocita' di dissolvenza (`image_alpha += 0.003..0.023` al
  tick, diversa per ognuno — un vero "sfarfallio" di finestre a velocita'
  diverse, non un'unica luce). La dissolvenza condivisa (`LIGHT_FADE`,
  200 tick fissi per ogni altro decoro "luce" del motore) e' stata
  generalizzata (`addDecor()`/`stepLights()`, game/src/main.js) per accettare
  una durata per-decoro invece di estendere il motore con un caso speciale
  solo per questo edificio — compatibile all'indietro, tutti gli altri
  decori restano sulla stessa `LIGHT_FADE` di prima. `m3rd` (il fanale
  rosso in cima) non si dissolve mai nel decompilato: `fadeTicks: 0`, un
  caso a parte (nessun'altra luce del motore scatta di colpo).
  **[I] Gap dichiarato — cantiere/gru non ricostruiti**: l'originale
  affianca a `m3cant` un secondo oggetto (`impa31f`) che genera `impa31r` e
  un'intera catena `impa31/32/33r|f` + tre gru rotanti dedicate
  (`impa3gru`/`impa3gru1`/`impa3gru2`, ognuna con la propria macchina a
  stati a oscillazione) — impalcatura/scenografia allo stesso titolo delle
  code "f" gia' semplificate per industria/casa/palazzo (STUDIO.md sopra,
  "due semplificazioni"), qui pero' un intero sotto-sistema invece di un
  singolo passo troncato: nessun costo o tempo in piu' (letti entrambi
  direttamente da `m3cant`), quindi un gap dichiarato invece di una
  ricostruzione parziale rischiosa.
  Sprite nuovi in `GAMEPLAY_SPRITES`: `m3x1`..`m3x14`, `m3l1`..`m3l9`,
  `m3rd`, `sta3`/`sta3s` (icone bottone), `c200000` (cartellino di prezzo,
  generico via `costTagSprite()`) — atlas e blitplan rigenerati.
  Verificato in browser (Playwright, stato forzato via `window.__nimbus`):
  a inizio cantiere si vede `m3x1`, una base bassa; saltando all'ultimo
  passo cresce nella torre alta e stretta prevista dagli sprite; forzando
  notte + energia le finestre si accendono gradualmente a colori/velocita'
  diverse invece che tutte insieme, esattamente l'effetto "sfarfallio"
  letto nel decompilato.

- **`wewe` e' il peso della piattaforma, non l'inquinamento — e la
  profondita' del parco.** Due segnalazioni dell'autore, indipendenti ma
  risolte insieme.
  **[C] `wewe`** (`r12/Create.gml`: parte a 100): quasi ogni edificio lo
  scrive alla nascita (mai un `Destroy.gml` lo riduce) ed `r12/Alarm_2.gml`
  lo rilegge ogni 60 tick per drenare `oil` a soglie crescenti — letto qui
  come "inquinamento" in una nota precedente (STUDIO.md sopra, "cosa
  manca"), corretto dall'autore: e' il peso della piattaforma volante,
  "più la piattaforma pesa più consuma petrolio". Confermato dal codice
  stesso: lo stesso flag (`action_if_number(736,0,0)`) che guarda il
  drenaggio guarda anche l'innesco della tempesta VERA (non `stormeasy`,
  STUDIO.md sopra "le tempeste diventano reali") — entrambi gia' noti per
  essere il ramo `match`, mai `match_easy`, dove la base sta a terra ("una
  citta' 'normale'", l'autore) e non deve reggersi in volo.
  `state.js`: `wewOilDrain(wewe)` riproduce le 11 soglie lette riga per
  riga — comprese le prime due, che NON sono fasce esclusive: a
  `wewe===100` (il valore di partenza) scattano ENTRAMBE (-2 e -3, totale
  -5, uguale alla fascia 201-300), mentre 101-200 fa scattare solo la
  seconda (-3) — un edificio della piattaforma vuota drena piu' del primo
  edificio costruito. Verificato con gli operatori (3="<=", 2=">") gia'
  confermati altrove nel progetto, non "raddrizzato" a tiers puliti.
  `stepWeather(r12, dt, isMatch)` applica il drenaggio SOLO se `isMatch`
  (main.js passa `scene.name === "match"`, oggi sempre `false`: il motore
  carica solo `match_easy`, quindi il codice e' corretto ma dormiente fino
  a quella room) — a differenza della tempesta, gia' simulata "vera" anche
  su `match_easy` per una scelta dichiarata (costava poco tenerla pronta).
  Corretto anche un bug di questa porting scoperto rileggendo la funzione
  per aggiungerci `wewe`: il `return` anticipato mentre una tempesta era
  attiva fermava pure il conteggio dei 60 tick, che nel decompilato e'
  incondizionato (non annidato dentro `storm==0`).
  `BUILDING_TYPES`: campo `wewe` per livello su banca/casa(1-3)/club/
  eolico/gatling/industria(1-3)/laser/missile/museo/museoRd/palazzo/
  palazzoRd/solare/villa (14 tipi, 18 livelli — palazzo/museo hanno un
  secondo livello nel decompilato, `casa5ss|dd`, mai portato: STUDIO.md
  sopra, "un secondo livello fuori scopo"), applicato da
  `stepConstructions()` a fine cantiere insieme a `hap`. `chies`/`parco`/
  `monum`/`grattacielo` non pesano nulla nel decompilato: nessun campo.
  Verificato (Playwright, `window.__nimbus` + `import('./src/buildings.js')`
  per leggere gli esatti valori attesi): piazzate finte istanze a fine
  cantiere per tutti e 14 i tipi, `r12.wewe` passa da 100 a 1110 (100 + la
  somma esatta dei 14 delta); con `wewe` cosi' alto l'`oil` non crolla nei
  secondi successivi (il piccolo calo osservato e' la formula placeholder
  generica di `tickR12()`, non il drenaggio da peso — fedele, il motore
  gira sempre su `match_easy`).
  **[I] Profondita' del parco**: segnalato dall'autore — un parco e'
  scenografia bassa e piatta (lo scatter di alberi/lampioni di
  `spawnParcoScatter()`, non un edificio solido), ma nasceva con lo stesso
  `depth` dinamico di ogni altro edificio (`effDepth()`, main.js:
  `depth===0` -> `-y`), finendo davanti a pali/auto vicini che dovrebbero
  invece coprirlo. `BUILDING_TYPES.parco.fixedDepth = -5` (fuori dalla
  gamma tipica di `-y` su questa mappa, poche centinaia/migliaia negativi)
  letto da `placeAt()` (main.js) al posto del solito 0 — lo stesso
  `effDepth()` lo tratta gia' come "fisso" per qualunque valore diverso da
  zero, nessuna modifica al motore serviva oltre a leggere il campo.
  Verificato in browser: un parco piazzato vicino a un lampione mostra
  l'asta del lampione sopra il prato invece di sparire sotto.

- **La ruspa: demolizione/riparazione, `puruspa`/`selec==11`.** Segnalata
  da tempo come gap dichiarato ("cosa manca" §5, poi ribadita piu' volte
  come "mai ricostruita"). Investigata da zero, letta riga per riga.
  **[C] Non e' un rudere-a-un-lotto-libero come una prima ipotesi
  suggeriva**: `demobasia/Collision_*.gml` collide SOLO con gli edifici
  FINITI (`casa1`, `industria1`, ...), mai con un rudere — un rudere resta
  un vicolo cieco vero, la ruspa non lo tocca mai (destroyBuilding(),
  main.js, corretta di conseguenza: una nota precedente li' diceva il
  contrario). **[C] Il meccanismo vero**: ogni edificio finito, col ramo
  selec==11 del proprio `Mouse_LeftPressed.gml`, controlla il costo e (se
  coperto) crea `demobasia` sulla propria posizione — un popup, non una
  demolizione immediata. `demobasia/Create.gml` genera tre figli:
  `demobachia` (annulla, sprite "demoback"), `demoiessa` (conferma,
  "demoyesse", imposta `demobasia.iessa=1` al tocco), `disegnaprezzo` (il
  costo, un font disegnato a runtime — qui il cartellino gia' generico "cN"
  di `costTagSprite()`, nessun font nuovo). Solo quando `iessa==1`
  `demobasia/Collision_<tipo>.gml` scala il costo e crea un oggetto
  "_demo" dedicato per quel livello (`impacasa2r`, `impaind3r`, ...).
  **[C] Cosa fa davvero l'oggetto "_demo"** — verificato con un diff riga
  per riga contro il cantiere/potenziamento NORMALE dello stesso livello
  (`impacasa2r` contro `impa1to2r`, `impademogatlingr` contro
  `impagatlingr`, altri campionati a mano): la stessa identica sequenza da
  `Alarm_0` in poi. L'UNICA differenza reale e' la durata del PRIMO passo
  (`Create.gml`, un solo `action_set_alarm`): per un edificio a un solo
  livello o per il livello 1 di casa/industria/palazzo/museo (quelli che
  normalmente iniziano con una lunga fase di "sgombero lotto", 361-390
  tick) la ruspa la accorcia a 30 tick (1 per missile/gatling, quasi
  istantaneo) — ricostruire su un lotto gia' sviluppato salta lo sgombero.
  I livelli 2/3 (gia' brevi di loro, 30 tick anche da nuovi) non cambiano.
  Tradotto nel motore: `tryRuspaRebuild()` (buildings.js) rimanda
  l'edificio ALLO STESSO livello in cantiere (`b.level -= 1` prima di
  riusare la stessa formula gia' scelta da `tryStartUpgrade()`,
  `upgradeIndex: b.level-1` — nessun codice duplicato, `up.steps` e' lo
  stesso array del cantiere normale), con `ruspaFirstStepDur` (nuovo campo
  per livello) a sostituire solo la durata del primo passo quando serve
  (`stepConstructions()`, `c.rebuilding` marca l'istanza appena riavviata
  dalla ruspa).
  **[C] `eolico` e' l'eccezione**: `impavent_dem`, letto per intero
  (Create+Alarm_0/1/2) invece di dedurlo dal solo primo alarm, NON
  ricostruisce la pala eolica — l'ultimo passo crea 4 `placeholder` (agli
  stessi offset ±98/±58 di `impavent/Alarm_2.gml`) e si autodistrugge: la
  ruspa su una pala eolica libera il terreno, non lo ricostruisce (coerente
  con l'essere multi-lotto: rimettere ESATTAMENTE la stessa pala eolica
  nello stesso punto sarebbe un'operazione diversa da ogni altro tipo).
  `def.construct.ruspaDemolish` marca questo caso; `demolishMultiTile()`
  (main.js) libera il lotto toccato (mai rimosso da `placeholders`, solo
  `consumed`) e i 3 lotti piu' vicini entro il raggio di `multiTile` in
  `blockedSlots` — lo stesso raggio approssimato gia' scelto per il
  piazzamento (STUDIO.md, "pepazzittecollider" mai ricostruito), qui
  applicato al contrario.
  **[C] Costi**, tutti letti dal proprio `Alarm_9`/`Alarm_10` (il numero
  di alarm cambia quando 9 e' gia' preso da altro, es. gatling/solare):
  casa 500/2000/10000, industria 5000/50000/200000, parco 500, club/solare
  2000, villa 6000, palazzo/museo 20000, missile/gatling 20000, laser
  100000, eolico 200000 (il piu' caro del motore, coerente con l'unico che
  smonta invece di ricostruire). **[I]** `sooool/Mouse_LeftPressed.gml` ha
  un costo diverso (2700 invece di 2000) se il pannello e' su un parco
  (`overpark`) — una meccanica "pannelli solari sopra un parco esistente"
  MAI ricostruita in questo motore (`parco/Mouse_LeftPressed.gml`, ramo
  selec==61, trovata per caso investigando la ruspa): gap dichiarato,
  resta sempre il ramo normale.
  **UI**: popup si'/no in-mondo invece di un font disegnato a runtime —
  `ruspaPending` (main.js) sostituisce i quattro oggetti del decompilato
  (`demobasia`/`demobachia`/`demoiessa`/`disegnaprezzo`) con uno stato solo,
  due nuove entita' pickable ("ruspaYes"/"ruspaNo", stesso schema di
  "upsign" — depth sempre in primo piano, intercettate a prescindere dallo
  z-order) piu' un cartellino di prezzo "cN" riusato. Resta aperto finche'
  non tocchi si'/no (**[C]** `demobasia` non ha ne' `Step` ne' `Destroy` nel
  decompilato: nemmeno l'originale lo richiude da solo) — [I] un secondo
  tocco su un ALTRO edificio con la ruspa selezionata riarma il popup su
  quello nuovo invece di aprirne un secondo, unica scelta pratica con un
  solo stato invece di N istanze `demobasia` coesistenti.
  Sprite nuovi in `GAMEPLAY_SPRITES`: `demoback`, `demoyesse`, `c100000`
  (cartellino mancante, serviva solo al costo del laser) — atlas e
  blitplan rigenerati.
  Verificato in browser (Playwright, stato forzato via `window.__nimbus` +
  tap reali via `cam.worldToScreen()`): tocco su una casa1 con la ruspa
  apre il popup col cartellino "500"; "Back" lo chiude senza toccare mon;
  "Yes!" scala 500 mon e la rimanda in cantiere allo stesso livello, che
  supera il primo passo (accorciato) molto prima dei 390 tick normali;
  un'eolico ruspato scala 200000 mon, sparisce da `buildings`, e tutti e 4
  i lotti che occupava tornano piazzabili.

- **Due piccolezze segnalate dall'autore.** (1) Il popup della ruspa
  disegnava "Back"/"Yes!"/il cartellino a piena grandezza (scale 1),
  visibilmente piu' grandi dei bottoni del selettore edificio (gia'
  rimpiccioliti a `UI_SCALE`, 0.6 mobile/0.7 desktop) — `UI_SCALE` portata a
  livello di modulo (game/src/main.js, prima era locale alla sola funzione
  di disegno) cosi' anche il popup la riusa, offset scalati di conseguenza
  per restare ravvicinati. (2) `DEBUG_INFINITE_RESOURCES`
  (game/src/buildings.js, **[TEST] non comportamento dell'originale**,
  segnalato esplicitamente come temporaneo): `canAfford()` non blocca piu'
  niente per mancanza di mon/oil, ma la spesa/produzione VERA continua
  intatta — `clampR12()` (state.js) accumula il delta genuino su
  `r12.monReal`/`r12.oilReal` (seminati dai valori di partenza veri, 5500/
  5000) prima di rialzare la soglia usabile a un valore comodo (999999 mon,
  gia' il tetto esistente; 500000 di pavimento per l'olio, che non ne ha
  uno fisso). I valori veri restano leggibili nell'HUD di debug ("[TEST
  risorse infinite] reale: ..."), la barra vera mostra invece il valore
  gonfiato. Verificato in browser: piazzata una casa (100 mon) con mon
  visualizzato fermo a 999999, `r12.monReal` scende comunque di ~100.

- **Bug di sincronizzazione impalcatura/gru, e tre gap chiusi su richiesta
  dell'autore: la faccina della felicita', i pannelli solari sopra un
  parco, i prestiti bancari.** Diverse sessioni concentrate su rifiniture
  segnalate giocando, non lette per la prima volta da capo.
  **Impalcatura**: due bug distinti, entrambi segnalati dall'autore.
  (1) Gru/topper transitori (`onSpawn` di `stepConstructions()`,
  "gru1"/"toppers"/"topls") passavano per `addDecor()` con lo stesso
  default `lit:true` del decoro FINALE (le finestre illuminate) — restavano
  ad alpha 0 finche' non era notte con energia sufficiente, quasi sempre
  per tutta la durata di un cantiere. `addConstructionSpawn()` (main.js) li
  marca `lit:false`: impalcatura vera, sempre visibile. (2) L'edificio
  finito (sprite/livello/pop/hap/decoro) scattava solo alla chiusura
  dell'ultimo passo del cantiere, quando l'impalcatura spariva del tutto —
  **[C]** nel decompilato la traccia "f" crea gia' l'edificio del livello
  successivo mentre "r" e' ancora nella coda cosmetica finale (STUDIO.md,
  "due semplificazioni"): `applyLevelFinish()` ora scatta all'INGRESSO
  dell'ultimo passo (`c.finished`, stepConstructions()), la stessa finestra
  in cui compare `up.cap` — l'impalcatura resta a schermo sopra un edificio
  ormai gia' vero, non prima.
  **Data in barra risorse**: **[C]** esisteva gia' nel decompilato ma su
  due variabili mai lette — `r12/Alarm_3.gml` (l'anno, gia' `r12.time` ma
  mai incrementato) e una variabile locale di `repre` chiamata anch'essa
  "mon" (il mese, NON `r12.mon` — nome confuso apposta, oggetti diversi).
  Mese ogni 300 tick (5s) Gen->Dic, anno ogni 3600 tick (60s, 12 mesi) —
  due alarm indipendenti nell'originale, sincronizzate perche' partono
  insieme, replicate cosi' in `stepCalendar()` (state.js). Testo disegnato
  col font/pipeline gia' della barra (gotham_mini), stessi offset del
  decompilato (`repre/DrawGUI.gml`).
  **La faccina della felicita'** (`hapware`, mai letta prima): l'autore
  giocando non si ricordava sommosse (una nota molto piu' sopra, gia'
  superata dalla lettura vera di `coins.js`: la condizione e' `hap>=pop`,
  non un'improbabile uguaglianza esatta, e produce una MONETA non dei
  soldati) ma una "faccina che diventa triste sotto una soglia" — **[C]**
  `hapware/Step.gml`: sprite `hap3` (sorriso) se `r12.hap>=r12.pop`, `hap1`
  (broncio) altrimenti — la STESSA soglia gia' letta per bloccare le
  monete blu, mancava solo l'icona. Bonus: `hapware/Create.gml` e' anche
  dove l'originale imposta `global.upp` (l'offset mai identificato con
  certezza per notch/status-bar) — Step.gml lo azzera comunque ad ogni
  frame a prescindere dall'orientamento, confermando (non piu' solo
  supponendo) che trattarlo come 0 ovunque in questo motore era gia'
  corretto.
  **Pannelli solari sopra un parco** (`overpark`/`oversolar`, letto da zero
  su richiesta): **[C]** `parco/Mouse_LeftPressed.gml`, ramo selec==61 —
  toccare un parco GIA' FINITO con "Pannelli solari" selezionato costruisce
  il pannello direttamente sopra di lui (stesso 1000 mon del piazzamento
  normale, nessun placeholder consumato, il parco resta li' com'e') —
  `placeSolarOverPark()` (main.js). L'unico effetto a valle e' economico:
  **[C]** `demobasia/Collision_sooool.gml` fa costare la ruspa sul pannello
  2700 mon invece di 2000 se `overpark`; **[C]**
  `demobasia/Collision_parco.gml` non ha PROPRIO un ramo per
  `oversolar==1` — il parco sottostante diventa permanentemente non
  ruspabile finche' il pannello resta li' sopra (`ruspaCostFor()` torna
  `null`, stessa convenzione dei tipi mai ruspabili). Persistito in
  save.js (`overpark`/`oversolar` sui due edifici, altrimenti un
  salva/carica li avrebbe persi).
  **Prestiti bancari** (`bankbuttoner`/`get_loan1..4`, sotto-sistema mai
  indagato a fondo): **[C]** icona persistente ancorata alla banca appena
  costruita (`banca1/Create.gml`, offset -50,-40), che apre un pannello
  con 4 tagli fissi — 25000/50000/100000/250000 mon, tutti a 36 rate
  mensili di 840/1680/3333/8400 (~20% di interesse totale, "20% interest
  rate" mostrato dal pannello stesso — un prestito a rate fisse, non
  composto come suggeriva una nota precedente mai verificata) — **[C]**
  `repre/Alarm_0.gml`, la STESSA alarm del calendario: le rate scattano nel
  medesimo tick del mese, ora nello stesso `stepCalendar()`. **[C]**
  Solo un prestito alla volta: il pannello si riapre solo quando tutti e
  quattro i contatori tornano a 0 (`loanActive()`, derivato invece di un
  flag a parte che potrebbe disallinearsi). **[I]** Nel decompilato
  `loanoscrino` (il pannello) su Android si ricentra sulla view ad ogni
  Step — di fatto un modale fullscreen sul solo target mobile, replicato
  qui come vero modale in spazio schermo (non ancorato al mondo come
  farebbe pensare il punto di creazione relativo a `bankbuttoner`), con
  scala calcolata invece di `UI_SCALE` fisso (il pannello nativo e' grande
  quanto un'intera view, non un'iconcina). **[I]** I 4 bottoni prestito
  nel decompilato si sovrappongono fisicamente (50px fra un centro e
  l'altro, 88px di altezza ciascuno) — qui impilati senza sovrapposizioni.
  **[I]** Nessun modo di annullare il pannello senza prendere un prestito
  nel decompilato (`loanoscrino` si autodistrugge solo quando
  `bankbuttoner.loaned` diventa 1) — qui un tocco fuori dai bottoni lo
  chiude senza costo.
  **Nota emersa testando**: `clampR12()` (state.js,
  `DEBUG_INFINITE_RESOURCES`) traccia correttamente i cali di `r12.mon`
  vero su `monReal` ma non gli AUMENTI che portano `mon` sopra 999999 —
  il clamp generico (`Math.min(999999, mon)`, PRIMA del calcolo del delta)
  azzera il guadagno prima che venga contato. Osservato prendendo un
  prestito (mon gia' a 999999 per il debug): `monReal` non saliva.
  Riguarda solo l'impalcatura di test (mai un problema a flag spento,
  dove `mon` non e' mai pinnato), non corretto qui — segnalato per quando
  quel flag verra' tolto.
  Sprite aggiunti a `GAMEPLAY_SPRITES` (tools/23_atlas.py): `hap1`/`hap3`
  (faccina, categoria gui — hap2/hap1hc/hap3hc, la variante hover mai
  riprodotta, restano fuori), `bancobutt`/`loanscr`/`getlo1..4` (prestiti).
  Verificato in browser (Playwright, `window.__nimbus`): forzando
  `r12.pop` sopra `r12.hap` la faccina passa da sorriso a broncio;
  toccare un parco finito con "Pannelli solari" selezionato crea un
  secondo edificio co-locato (`overpark:true`), il parco diventa non
  ruspabile (`ruspaCostFor` -> null), e la ruspa sul pannello finito costa
  2700 invece di 2000; toccare l'icona banca apre il pannello, un tocco su
  "25000 in 3 years" lo chiude e arma `loanUno=36`, un secondo tocco
  sull'icona non riapre nulla finche' il prestito e' attivo, e dopo un
  mese simulato (`stepCalendar`, isolato dal clamp di debug) `mon` scende
  di 840 e `loanUno` di 1.

- **Altri due gap dichiarati chiusi, continuando la stessa sessione.**
  **Il grattacielo blocca lo spionaggio davvero**: una nota precedente
  (STUDIO.md sopra, "il grattacielo blocca lo spionaggio non riprodotto")
  la segnava come "semantica non verificabile perche' dipende dall'ordine
  di esecuzione fra oggetti nello stesso tick" — riletta con calma,
  `m3cant/Step.gml` (ramo `phase>=14`) non fa un confronto una tantum
  sensibile a un ordine: azzera `r12.spy` OGNI tick, incondizionatamente,
  finche' l'edificio esiste. Anche perdendo la corsa con l'alarm che
  sblocca `spy` (balloons.js, `SPY_UNLOCK_T`) il tick successivo lo
  azzera comunque di nuovo — l'esito in regime e' sempre lo stesso a
  prescindere da chi gira prima. `stepConsumption()` (buildings.js) ora lo
  fa per davvero, fuori dal throttle a 120 tick gia' li' (la condizione
  originale gira ogni tick, non ogni 120). Verificato con un test diretto
  (node, import ES module): `r12.spy` forzato a 1 prima della chiamata
  torna 0 dopo, anche ripetendo la "corsa" piu' volte.
  **`playbuttoner` investigato, non implementato**: la stessa nota
  descriveva un "bottone play/pausa" che drena -5 ele/-5 mon PER TICK
  durante il cantiere del grattacielo quando attivo (`m3cant/Step.gml`,
  ramo `phase<14`) — **[C]** verificato leggendo `m3cant/Alarm_0.gml` (la
  catena che avanza le 14 fasi del cantiere) riga per riga: NESSUN
  riferimento a `playbuttoner`/`play` in nessuna fase, durate fisse
  indipendenti. Il bottone non accelera nulla nel decompilato stesso —
  drena risorse extra senza alcun beneficio reale, nonostante il nome
  suggerisca un acceleratore. Lasciato fuori deliberatamente: implementare
  un bottone che costa senza dare niente in cambio sarebbe una trappola
  per il giocatore, non una funzionalita' mancante.
  **Il pacco di cantiere grande per laser e banca**: **[C]** letto riga
  per riga `placeholder/Mouse_LeftReleased.gml` per la lista esatta di chi
  crea `mon_bil` (piccolo) contro `mon_bbil` (grande) — una nota
  precedente li' elencava "banca, laser" come tipi che lo usano ma "non
  ancora ricostruiti", superata da tempo (sono entrambi edifici veri da
  diverse sessioni) senza che qualcuno tornasse a cablare la variante
  giusta: `spawnConstructionBalloon()` (balloons.js) ora accetta un
  parametro `big`, che sceglie il prefisso sprite (`mon_bild` contro
  `mon_bbild`, sia per il pallone che per cassa/pallone-vuoto) — main.js
  lo passa `true` solo per `laser`/`banca`, fedele alla lista letta.
  Sprite aggiunti a `GAMEPLAY_SPRITES`: `mon_bbild`/`mon_bbild_empty`/
  `mon_bbild_box` — atlas e blitplan rigenerati.
  Verificato in browser (Playwright): piazzare un laser per davvero (menu
  -> tocco su un placeholder) fa nascere un pallone `mon_bbild`, non piu'
  `mon_bild`.

- **Bug vero trovato per caso investigando `recogn` (la "seconda spia",
  gap dichiarato da tempo — "non e' una mongolfiera, resta fuori"):
  `hap>=pop`, non `hap===pop`.** Rileggendo `r12/Alarm_1.gml` riga per
  riga per capire dove si aggancia `recogn` e' saltato fuori che la
  condizione "rara" che dimezza la probabilita' di spia (dado 1/17 invece
  di 1/2) era gia' cablata in `stepBalloonSpawner()` (balloons.js) con
  l'operatore SBAGLIATO — `r12.hap === r12.pop` invece di `>=` — scritta
  cosi' quando `hap` non era ancora aggiornato da nessuna parte (quindi
  "non importava, tanto non scattava mai") e mai corretta quando poi lo e'
  diventato (industria/casa/parco/club/solare/museo/monum/banca scrivono
  tutti `hap` da diverse sessioni). Con l'operatore giusto la condizione
  PUO' scattare per davvero in una partita lunga (una citta' con
  abbastanza felicita' accumulata) — corretto.
  **`recogn` implementato**: **[C]** stesso Alarm_1, stesso slot di
  `monspi` ma condizionato al livello di `chies` — `monspi` mentre
  `chies.level<3`, `recogn` una volta che `chies.level===3` (il massimo di
  questo motore — l'originale ha un "livello 4" interno mai replicato,
  solo un dettaglio di numerazione, non un livello di gioco in piu', vedi
  buildings.js §chies). Stesso schema "riferisce" di monspi (isSpy,
  stepBalloons() invariato), ma **[C]** `recogn/Create.gml`: vita piu'
  corta (550 contro 750 tick), velocita' fissa 30 invece di un range
  (`action_set_motion(30, ...)`, letta come 30px/tick — ~4-10x piu'
  veloce delle mongolfiere lente, coerente con "aereo" invece di
  "pallone"), e soprattutto una rotta quasi orizzontale (11° o 13° a
  dado) invece dei 30° fissi di tutta la famiglia risorse/spia.
  `spawnBalloon()`/`stepBalloons()` generalizzati per una rotta per-istanza
  (`b.cos`/`b.sin`, da `def.dir()` se il tipo la dichiara — solo recogn,
  finora) invece della costante globale COS30/SIN30, senza toccare nessun
  altro tipo (tutti restano ai 30° impliciti di prima).
  Sprite aggiunto a `GAMEPLAY_SPRITES`: `reconspr` — atlas e blitplan
  rigenerati.
  Verificato (node, import ES module — 60000 iterazioni per stabilita'
  statistica): con `chies.level=1` nascono solo `monspi`, mai `recogn`;
  con `chies.level=3` solo `recogn`, mai `monspi`; le rotte osservate su
  20 spawn di recogn sono sempre 11° o 13°, mai altro. Verificato anche in
  browser (screenshot): lo sprite "reconspr" (un biplano rosso) si
  disegna correttamente sulla mappa.

- **Quattro bug segnalati insieme dall'autore, tutti riletti da capo invece
  di fidarsi delle note precedenti che li dicevano gia' chiusi** ("la
  turbina eolica da finita continua a non girare", "non vedo i topper in
  cima ai cantieri", "il cantiere della turbina continua ad essere
  disallineato", "le gru spariscono subito invece di aspettare la fine del
  cantiere", "il laser non spara"). Un commit precedente (952d8b3/502c510)
  dichiarava gia' risolti turbina/topper/impalcatura, ma il codice attuale
  li aveva ancora rotti — verificato tutto in browser (Playwright,
  `window.__nimbus` + import diretto dei moduli) prima di toccare niente,
  non fidandosi della documentazione.
  **Topper/gru che spariscono all'istante** (due segnalazioni diverse,
  stessa causa): **[Bug corretto]** `spawnDecor()` (main.js) — chiamata da
  `applyLevelFinish()` quando l'edificio finito compare, che ora scatta
  ALL'INGRESSO dell'ultimo passo del cantiere (STUDIO.md sopra,
  "sincronizzazione impalcatura/gru") — rimpiazzava INDISCRIMINATAMENTE
  ogni decoro dell'edificio, compreso il decoro TRANSITORIO (gru/topper,
  `addConstructionSpawn()`) appena piazzato nello stesso istante o nei
  passi precedenti: la fix precedente risolveva solo il caso "lit:true di
  default" (STUDIO.md sopra), non questo. Risultato osservabile: i topper
  (`toppers`/`topls`, spawnati proprio nell'ultimo passo insieme al decoro
  finale) sparivano nello stesso frame in cui nascevano; le gru spawnate
  prima (es. `gr21` di `impalaser_r` al tic 6) sparivano non alla vera fine
  del cantiere ma nell'istante in cui l'edificio finito compariva a
  schermo. Corretto separando le due categorie: `addDecor()` (main.js)
  accetta ora un flag `transient`, settato da `addConstructionSpawn()`;
  `spawnDecor()` filtra via SOLO il decoro non transitorio; un nuovo
  callback `onFinish` di `stepConstructions()` (buildings.js — chiamato nel
  ramo che azzera `b.construction` per davvero, non piu' un evento
  "fantasma" mai raggiunto da questo lato) rimuove il transitorio alla vera
  fine (`removeTransientDecor()`, main.js).
  **Turbina eolica finita che non gira**: **[Bug corretto]** stesso principio
  del bug sopra, causa diversa. `b.spr` mostra gia' "eol" (lo sprite
  FINITO, pale comprese) fin dall'ingresso dell'ultimo passo del cantiere
  (`impvent3`, 2200 tic ~37s) per la stessa ragione — ma
  `stepWindProduction()`/il calcolo del frame in main.js gating
  l'animazione su `!b.construction` (vera fine cantiere): per quei 37s la
  turbina appariva GIA' finita ma restava ferma su un fotogramma fisso, poi
  scattava a girare solo alla fine — proprio l'edificio senza impalcatura
  in sovraimpressione (`frontSpr`, niente traccia "f" per `eolico`,
  BUILDING_TYPES.eolico sopra) a nascondere quel "non ancora vivo", quindi
  l'unico caso in cui il problema si vedeva a occhio nudo. Corretto
  disaccoppiando l'animazione (cosmetica, ora segue `b.spr === "eol"`) dalla
  produzione di energia (economica, resta fedele a `!b.construction` —
  `eoli` nel decompilato nasce solo alla fine vera del cantiere).
  **Cantiere della turbina disallineato dai lotti**: **[Bug corretto]**
  letto `placeholder/Mouse_LeftReleased.gml` riga per riga: al tocco (ramo
  selec==4) l'originale crea `eoliplacer` a offset FISSO `(98, 0)` dal
  placeholder toccato, e l'intera catena successiva (`eoliplacer` ->
  `impavent` -> `eoli`) eredita quella posizione con offset relativo zero,
  mai piu' toccata — il centro vero e' sempre un numero fisso letto dal
  codice. Il motore invece ancorava la pala al CENTROIDE del cluster di 4
  lotti trovato da `findPlacementCluster()` (il tapped + i 3 vicini liberi
  piu' vicini): un punto che si sposta a seconda di quali vicini vengono
  scelti, quasi mai coincidente col vero centro — la griglia isometrica di
  `match_easy` ha una spaziatura irregolare (48 placeholder, gap fra 1 e
  100px), quindi il cluster scelto raramente formava un quadrato simmetrico
  intorno al tocco. `BUILDING_TYPES.eolico.multiTile.anchorOffset` (nuovo
  campo, buildings.js) porta l'offset (98,0); `placeAt()` (main.js) lo usa
  per l'ancoraggio invece della media del cluster, che resta comunque
  necessario per sapere QUALI lotti consumare/bloccare.
  **Il laser non spara**: non era vero — verificato con un test diretto
  (Playwright, `window.__nimbus`, torretta+minaccia ferma piazzate a mano):
  munizioni scalate (`r12.ele` 200->0), danno applicato (`life` 10->8, la
  soglia giusta per `dirig`), esattamente come da codice. **[Bug corretto]**
  il colpo VERO partiva ma non produceva NESSUN effetto visibile a schermo:
  `laserone`/`laserone_retro` nell'originale disegnano un fascio vero
  (sprite "lasere", 2000x97, ruotato verso il bersaglio) mai riprodotto
  perche' il renderer (gl.js) non sapeva disegnare uno sprite ruotato — solo
  un piccolo lampo alla bocca del cannone, facile da non notare. Aggiunto
  `Renderer.drawQuad()` (gl.js): un quad a quattro angoli espliciti invece
  di x,y+scala assiale, non richiede rotazione di sprite (il chiamante
  calcola gia' gli angoli) — usato per un fascio pieno (tinta ciano) da
  bocca a fondo raggio (`aim.fireRange`, nella direzione di mira, non verso
  un singolo bersaglio: il colpo stesso danneggia tutto cio' che e' in
  portata, non un solo target). `spawnBeam()`/`stepBeams()`/`BEAM_LIFE`
  (projectiles.js, chiamato da `fireFrom()` sul ramo beam) + `drawBeams()`
  (main.js). Vita breve (20 tic, ~0.33s: un lampo visibile, non un fascio
  persistente — la vera ricarica e' 85 tic).
  Verificato in browser (Playwright): turbina animata (screenshot A/B a
  frame diversi, pale visibilmente ruotate, anche durante la coda del
  cantiere); topper/gru piazzati a meta' costruzione e ancora visibili al
  passo successivo (prima sparivano subito); piazzamento vero della pala
  eolica via menu+tap (non forzato da script) allineato esattamente a
  `placeholder + (98,0)`, screenshot con impalcatura centrata sui 4 lotti
  liberi; fascio del laser renderizzato correttamente (test diretto su
  `drawQuad()` con un fascio finto — la cattura in tempo reale di uno
  sparo automatico e' risultata troppo breve per lo screenshot via
  Playwright, ma la stessa identica chiamata di disegno e' quella usata
  dal fuoco vero).

- **Due segnalazioni successive dell'autore sulla stessa sessione: la
  turbina eolica "finita" comparsa troppo presto nascondeva la vera
  animazione di montaggio, e i pannelli solari si potevano impilare
  all'infinito sullo stesso parco.**
  **Impalcatura/pala che dovrebbero montarsi/smontarsi gradualmente**:
  **[Bug corretto]**, causa diversa dal bug precedente sulla stessa sessione
  (l'animazione delle pale di "eol" finito). Verificato in `data/
  sprites.json`: "impvent1" ha DAVVERO 15 sottoimmagini e "impvent3" 22 —
  l'UNICO caso reale nel motore (`ir1x`/`if1x`/`sr4x`/`rd4x`/`m3x*` di ogni
  altro cantiere sono tutti a un solo frame vero) — **[C]**
  `impavent/Alarm_0|1|3.gml`/`Create.gml`: l'originale li anima con
  `action_sprite_set(sprite, 0, spd)` a velocita' non standard (0 poi 0.01
  per impvent1, 0.01 per impvent3), non a `image_speed` fermo come ogni
  altro passo di cantiere del motore. Il motore sceglieva sempre il frame 0
  di qualunque sprite, ignorando le sottoimmagini vere: `c.curSpd` (nuovo
  campo per passo, `stepConstructions()`) + `constructionFrameIdx()`
  (main.js) applicano lo stesso conto gia' usato per "eol" finito
  (WIND_ANIM_FPS/frameCountFor), generalizzato a QUALUNQUE sprite di
  cantiere. Le velocita' non sono arbitrarie: 0.01 frame/tic * 2200 tic
  (durata di impvent3) = 22 frame, ESATTAMENTE un ciclo completo dei 22
  frame veri — la pala compare e si assembla proprio mentre il passo
  scorre, non prima ne' dopo. `impvent1` (1740 tic) e' spezzato in due
  passi identici (stesso sprite, `pickSpr()` non cambia mai stringa fra i
  due) per riprodurre il dettaglio letto nel decompilato: **[C]** i primi
  300 tic sono DAVVERO fermi (`action_sprite_set(impvent1,0,0)` a Create),
  poi `Alarm_3` a tic 300 riarma la stessa sprite a 0.01 frame/tic per i
  restanti 1440 tic — 1440*0.01=14.4 frame, di nuovo quasi un ciclo intero
  dei 15 frame veri. Nessun cambio di costo/durata totale (300+1440=1740,
  identico), solo il timer di animazione (`c.t`, si azzera ad ogni passo)
  che riparte da 0 al punto giusto.
  **Scoperto testando questa correzione**: durante l'ultimo passo
  (`impvent3`) l'edificio mostrava GIA' "eol" (lo sprite FINITO, gia'
  animato dopo la correzione precedente sulla stessa sessione) invece di
  "impvent3" — la stessa scelta "l'edificio finito compare quando
  l'impalcatura entra nell'ultimo passo" gia' fatta per ogni altro
  edificio (STUDIO.md sopra, "sincronizzazione impalcatura/gru"), che per
  gli altri e' invisibile (un'impalcatura in sovraimpressione copre il
  "non ancora vivo") ma per `eolico` — l'UNICO senza traccia "f" — rendeva
  la neonata animazione di `impvent3` codice morto: il giocatore vedeva
  la pala GIA' completa e rotante per l'intero ultimo passo (~37s) invece
  del montaggio progressivo. **[Bug corretto]**: nuovo flag
  `up.revealAtEnd` (BUILDING_TYPES.eolico.construct, letto da
  `stepConstructions()`) rimanda `applyLevelFinish()` alla vera fine del
  cantiere SOLO per questo tipo — fedele all'originale anche qui (`eoli`
  nasce solo a fine cantiere, `impavent/Alarm_2.gml`), diverso da ogni
  altro edificio (che continua a "svelarsi" prima, scelta corretta li'
  perche' hanno tutti un'impalcatura vera a coprirli).
  Verificato in browser (Playwright, `window.__nimbus`): forzato un
  eolico su "impvent3" dall'inizio del passo — screenshot a t=0 mostra
  l'impalcatura vuota (sagoma metallica, nessuna pala), screenshot a
  t=12s (circa a meta' del ciclo di 22 frame) mostra le pale gia' visibili
  e in fase di montaggio sopra la stessa impalcatura — la vera animazione
  progressiva, mai vista prima. Verificato anche che `b.spr` resta
  "impvent3" (mai "eol") per l'intera durata del passo, e che
  `b.construction`/`b.life`/`b.spr` scattano tutti insieme solo al vero
  completamento del cantiere.
  **Pannelli solari impilabili all'infinito sullo stesso parco**:
  **[Bug corretto]** — verificato che il decompilato stesso
  (`parco/Mouse_LeftPressed.gml`, ramo selec==61) non controlla MAI
  `oversolar` prima di creare un altro `impasolr`: solo `mon>=1000`, un
  difetto vero dell'originale (lo stesso file legge gia' `oversolar` in
  un altro ramo, selec==11/ruspa, per bloccare la demolizione — un flag
  esistente ma mai usato per bloccare anche il piazzamento). Segnalato
  dall'autore giocando: si poteva pagare 1000 mon ripetutamente e impilare
  un pannello sopra l'altro nello stesso identico punto. `placeSolarOverPark()`
  (main.js) ora controlla `parco.oversolar` prima di scalare il costo/
  creare l'edificio, restituendo un messaggio invece di un secondo
  piazzamento silenzioso.
  Verificato in browser (Playwright): un parco finito, due tap consecutivi
  con "Pannelli solari" selezionato — il primo crea il pannello (-1000
  mon, `buildings.filter(solare).length` passa a 1), il secondo non crea
  nulla (resta a 1, mon invariato, messaggio "c'e' gia' un pannello solare
  su questo parco").
