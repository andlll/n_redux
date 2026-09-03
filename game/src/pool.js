// Pool generico di oggetti riusabili per gli effetti "a raffica" del motore
// (fumo delle centrali/navi, scintille dei fuochi d'artificio, gocce di
// pioggia) — [C] nell'originale questi erano `part_type`/`part_emitter`
// veri (raw/gml/gml_Object_rainlauncher_Create_0.gml: la pioggia e' un
// part_system nativo di GameMaker, un motore particellare con un proprio
// buffer di slot riusabili; i fuochi d'artificio usano l'effetto nativo
// equivalente, `action_effect`/ef_firework — fireworks.js). Qui ogni
// singola particella era un oggetto JS allocato al volo (`arr.push({...})`)
// e buttato via con `arr.splice(i, 1)` alla morte — sotto pioggia fitta
// (fino a 900 gocce/s, weather.js) questo genera un flusso enorme di
// oggetti a vita breve ma non brevissima (fino a 2.4s, spesso abbastanza da
// sopravvivere a uno scavenge e finire promossi in old space): il garbage
// collector che ne risulta e' una causa plausibile degli stutter periodici
// segnalati sui device Android piu' datati durante un temporale. `Pool`
// tiene un solo array di oggetti vivi (`active`, iterato per update/disegno
// esattamente come l'array semplice di prima) piu' una pila di oggetti
// morti pronti al riuso (`free`): `spawn()` pesca da li' invece di
// allocare, `release()` rimette il morto in circolo con uno swap-pop O(1)
// (mai uno splice O(n): nessuno dei tre effetti sopra legge `active` in un
// ordine che conti — disegnati sciolti o confluiti nella lista `dynamic`
// che main.js riordina comunque per depth).
export class Pool {
  constructor() {
    this.active = [];
    this.free = [];
  }

  /** Ripesca uno slot morto (o ne alloca uno nuovo la primissima volta che
   * il riciclo e' vuoto) e lo aggiunge ai vivi — il chiamante lo popola sui
   * propri campi subito dopo, stesso identico ordine di un `arr.push({...})`
   * di prima. */
  spawn() {
    const p = this.free.pop() ?? {};
    this.active.push(p);
    return p;
  }

  /** Rimuove l'i-esimo vivo (swap con l'ultimo + pop, non uno shift) e lo
   * rimette nel riciclo per il prossimo spawn(). */
  release(i) {
    const arr = this.active;
    const dead = arr[i];
    arr[i] = arr[arr.length - 1];
    arr.pop();
    this.free.push(dead);
  }

  /** Svuota tutti i vivi in un colpo solo (es. temporale che finisce di
   * scatto, weather.js) — li ricicla comunque, non li butta via. */
  clear() {
    for (const p of this.active) this.free.push(p);
    this.active.length = 0;
  }
}
