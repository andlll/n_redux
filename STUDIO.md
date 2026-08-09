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
