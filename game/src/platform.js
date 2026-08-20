// La base volante di `match` (`r120`, sprite "baa12") — [C] r12/Create.gml,
// ramo `match` (flag 736==0). Tutto decoro STATICO (nessuno step per
// frame: r120 non si muove mai nel decompilato, a differenza del nome
// "base volante" che suggerirebbe — resta ferma dove nasce), quindi entra
// in `staticWorld` com'e', stesso trattamento di ogni albero/auto gia' in
// scena. Estratto in un modulo a parte (invece di restare inline in
// main.js) perche' title.js (lo sfondo sfocato della title screen, STUDIO.md)
// ne ha bisogno anch'esso, sulla stessa `match.scene.json`.
export function applyMatchPlatform(staticWorld) {
  // Le 56 istanze statiche "albe" della room (quelle A TERRA) vengono
  // uccise incondizionatamente su questo ramo — sostituite dalle 14 sotto,
  // appese alla piattaforma invece che al terreno.
  for (let i = staticWorld.length - 1; i >= 0; i--) {
    if (staticWorld[i].obj === "albe") staticWorld.splice(i, 1);
  }
  const R120_X = 1170, R120_Y = 346;
  staticWorld.push({ obj: "r120", x: R120_X, y: R120_Y, depth: 1, spr: "baa12" });
  // [C] r12/Create.gml, `with (r120) { instance_create(x+dx, y+dy, albe) }`
  // — 14 offset letti uno per uno, nessun pattern regolare.
  const R120_TREES = [
    [282, 794], [439, 783], [379, 748], [518, 750], [565, 700], [463, 695],
    [538, 646], [637, 609], [699, 556], [758, 524], [816, 559], [724, 617],
    [672, 659], [739, 651],
  ];
  for (const [dx, dy] of R120_TREES) {
    staticWorld.push({ obj: "albe", x: R120_X + dx, y: R120_Y + dy, depth: 0, spr: "a1" });
  }
  // [C] stesso Create.gml, DOPO che `action_set_relative` torna a 0:
  // posizioni ASSOLUTE nella room, indipendenti da r120 (moto/fari/mudr2
  // sono scenografia fissa della mappa, non agganciata alla piattaforma).
  const R120_FIXED = [
    { obj: "moto11", x: 1951, y: 858, spr: "motor11", depth: 0 },
    { obj: "moto11", x: 1632, y: 1037, spr: "motor11", depth: 0 },
    { obj: "moto11", x: 656, y: 1231, spr: "motor11", depth: 0 },
    { obj: "moto12", x: 198, y: 217, spr: "motor12", depth: 0 },
    { obj: "moto12", x: 514, y: 34, spr: "motor12", depth: 0 },
    { obj: "moto13", x: 44, y: 876, spr: "motor13", depth: 0 },
    { obj: "moto13", x: 1015, y: 1142, spr: "motor13", depth: 0 },
    { obj: "faro1", x: 616, y: 1100, spr: "f1b", depth: 0 },
    { obj: "faro2", x: 1655, y: 1111, spr: "f2b", depth: 0 },
    { obj: "mudr2", x: 769, y: 845, spr: "moor12", depth: -1055 },   // [C] mudr2/_object.json: depth fisso, non -y
  ];
  for (const it of R120_FIXED) staticWorld.push(it);
}
