# P1a — lo stato di partita in un oggetto `st` (main.js)

Obiettivo: eliminare le 84 variabili `let` di closure di `mountMatch` e metterle
in un unico oggetto `st`, SENZA cambiare una riga di logica. Nessuna estrazione
di moduli in questo passo (quella è P1b, PR separate).

## Principi di non-invasività

1. **Nessuna variabile cambia posizione.** Ogni `let x = init;` diventa
   `st.x = init;` nello stesso punto, con lo stesso commento accanto. L'ordine
   di inizializzazione resta identico (molte dipendono da const dichiarate
   prima, es. `cars` a riga 1188 da `roomName`).
2. **Solo le 84 `let`.** Le 117 `const` di closure (array mutati in place come
   `staticWorld`, `textPool`, `placeholders`, funzioni, costanti) restano dove
   sono: non vengono mai riassegnate, non fanno parte del problema.
3. **Riscrittura scope-aware, non regex.** Uso acorn (in scratchpad, non nel
   progetto) per risolvere ogni identificatore al suo binding: si riscrivono
   solo i riferimenti che risolvono alle 84 `let`. Restano intatti stringhe,
   commenti, chiavi di oggetto (`{ paused: true }`), accessi a proprietà
   (`obj.message`), e i due casi di shadowing reali: il parametro `r12` di
   `stormFlashAlpha` (2776) e `stepLights` (2871).
4. **Shorthand property.** Un eventuale `{ paused }` diventa `{ paused: st.paused }`
   (acorn lo distingue).
5. **`window.__nimbus`** resta com'è, con i getter riscritti meccanicamente,
   più `get st() { return st; }`. Chi lo usa oggi non si accorge di nulla; i
   56 getter si tolgono in P1b.
6. **`onContextLost` e `dispose`** riscritti dallo stesso meccanismo, nessun
   cambio di comportamento.

## Prova meccanica di "nessun cambio di logica"

Dopo la riscrittura: prendo il nuovo file, tolgo ogni `st.` inserito e ogni
`st.x = ` lo riporto a `let x = `; il risultato deve essere byte-identico al
file originale (tranne la riga `const st = {};` aggiunta). Se non lo è, il diff
residuo è per definizione un cambio non voluto.

## Prestazioni

`st.x` su un oggetto la cui forma si stabilizza dopo l'init è un accesso
monomorfico inline-cached in V8/JSC: costo equivalente a una variabile di
closure. Nessuna allocazione aggiunta nel frame loop. Verifico comunque
`drawCalls` e il tempo per frame prima/dopo nello smoke test.

## Verifica

- `npm run build` in `game/` senza errori.
- Check statico post-rewrite con acorn: zero riferimenti liberi ai 84 nomi.
- Smoke test Playwright (script in scratchpad, non nel repo), eseguito PRIMA
  sul file originale e DOPO sul riscritto, stessi asserimenti:
  - la partita si monta, nessun errore in console, `__nimbus` presente;
  - dopo ~10 s di gioco `r12.time`/`phaseT` avanzano, `drawCalls > 0`,
    le auto si muovono;
  - `save()` poi `load()` riproducono lo stesso `r12` e lo stesso numero di
    edifici (round-trip);
  - `setPaused(true)` ferma l'avanzamento, `setPaused(false)` lo riprende;
  - `forceVictory()` mostra l'esito; `clearOutcome()` lo toglie.
- Partita giocata a mano da te sulle tre room (match, match_easy, tutorial):
  è l'unica verifica che copre l'input reale.

## Task

- [x] 1. Script acorn in scratchpad: parsing di main.js, risoluzione scope,
      riscrittura per offset dei riferimenti alle 84 `let`, output nuovo file.
- [x] 2. Applicare la riscrittura; aggiungere `const st = {};` dopo la
      destrutturazione di `ctx` (riga 50) e `get st()` in `__nimbus`.
- [x] 3. Prova meccanica di equivalenza (sezione sopra).
- [x] 4. Build + check statico.
- [x] 5. Smoke test Playwright su originale e riscritto.
- [x] 6. Aggiornare game/CLAUDE.md o STUDIO.md con una riga su `st`
      (dove vive lo stato di partita), come da regola "CLAUDE.md in sync".

## Fuori scope, ma proposto come commit separato subito dopo

- [x] 7. Fix `nextId` (P8): dopo `applyLoadedData`, `nextId = max(id) + 1`;
      al mount, reset. Una riga in buildings.js + una chiamata in main.js.
      È un bug di giocabilità reale (demolire un edificio caricato da file può
      cancellare decori/monete di un altro), non un refactor.

## Stima

Task 1–5: una sessione. Task 7: dieci minuti. Ogni task in un commit
proprio; nessun push senza tuo ok.
