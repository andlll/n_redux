// Tutorial ("me3" in title screen, room "tutorial" — mai portato finora,
// STUDIO.md). [C] tutorial_square/DrawGUI.gml: 34 messaggi in inglese (mai
// tradotti nel decompilato stesso), un balloon di testo fisso in basso — 33
// qui sotto in origine: **[Rimosso su richiesta dell'autore]** il messaggio
// sui "bottoni vista" (il terzo pannello della barra inferiore, menoo 2 in
// main.js — tolto perche' erano segnaposto senza funzione, e zoom+/-
// duplicavano pinch/rotella) non ha piu' senso senza quel pannello; il
// messaggio successivo (pan/zoom col mouse/dito) resta, copre da solo la
// stessa informazione utile.
// [Bug corretto, segnalato dall'autore: "nel tutorial spezza in due parti
// la parte sul lanciarazzi, e nella seconda specifica che il tocco
// prolungato va fatto selezionando lo strumento mano"] Il messaggio sul
// lanciarazzi (raccolta risorse dai palloncini + il tocco prolungato per
// aprire il pannello/attivare l'autodifesa) era un singolo balloon con due
// concetti distinti — spezzato in due sotto, di nuovo 34 messaggi in
// totale (coincidenza col conteggio originale sopra, contenuto diverso). Il
// secondo dei due ora specifica anche di selezionare prima lo strumento
// mano: **[C]** `input.onLongPress` (game/src/input.js) e il suo
// consumatore in main.js richiedono davvero `r12.selec === 0` (mano) per
// scattare — con un altro attrezzo selezionato (es. un edificio da
// piazzare) il tocco prolungato su una torretta non apre nessun pannello,
// un dettaglio che il balloon originale non spiegava.
// [Nuova funzionalita', richiesta dall'autore: "il tocco prolungato per
// aprire i sottomenu degli edifici deve funzionare su TUTTI gli edifici,
// non solo su quelli difensivi — spieghiamolo anche nel tutorial, magari
// subito dopo il messaggio sullo strumento mano"] Un messaggio in piu' dopo
// quello sull'autodifesa (sopra: il primo a introdurre "tieni premuto con
// la mano attiva"), che estende lo stesso gesto a qualunque edificio — main.
// js/buildingAt() (rinominata da turretAt()) ora riconosce infatti ogni
// edificio finito, non solo le tre torrette. 35 messaggi in totale ora
// (34 + questo), nessun'altra fase del tutorial ne dipende per
// l'avanzamento (il messaggio e' solo informativo, si avanza col bottone
// "avanti" come ogni altra fase senza condizione automatica) — l'unico
// altro punto del codice che punta a un NUMERO di fase fisso dopo questa
// (non solo al TESTO), il bersaglio della freccia sull'icona dell'olio in
// main.js, e' stato spostato da 25 a 26 di conseguenza.
// L'avanzamento e' un misto di due meccanismi, entrambi letti dal
// decompilato: **[C]** 8 fasi hanno una condizione di gioco vera
// (tutorial_square/Step.gml, stepTutorialAuto() sotto); tutte le altre
// avanzano solo al tocco del bottone "avanti" (tutorial_thumb) — **[Bug
// corretto]** una prima lettura di `action_if_variable(phase, 33, 1)`
// (tutorial_thumb/Mouse_LeftPressed.gml) l'aveva letta come "phase==33"
// (operatore 0): l'operatore vero e' 1 = "!=" (STUDIO.md, la stessa
// famiglia di errore gia' presa e corretta due volte altrove in questo
// progetto per gli operatori 3/4) — quindi il ramo "vero" e' `phase!=33`
// (avanza), non `phase==33`. Il click avanza per davvero `phase+0.5` nel
// decompilato (un residuo che richiederebbe due tocchi per fase, dato che
// DrawGUI confronta `phase` per uguaglianza esatta con un intero — un frame
// "vuoto" ogni tocco su due): **[I]** qui avanza di 1 intero per tocco,
// niente fase vuota — un dettaglio cosmetico, non l'esito finale (comunque
// "il prossimo messaggio ad ogni tocco").
import { spawnThreat } from "./threats.js";
import { getLang } from "./i18n.js";

// Un array per lingua, stesso ordine/lunghezza (35 fasi, vedi il commento
// storico sopra): stepTutorialAuto()/HIDE_ADVANCE_BUTTON sotto indicizzano
// per NUMERO di fase, mai per testo, quindi le due lingue possono vivere
// fianco a fianco senza toccare nessun'altra logica di avanzamento —
// tutorialText() sotto sceglie l'array giusto in base a getLang() (i18n.js),
// riletta ad ogni frame da main.js: un cambio lingua dal menu di pausa si
// vede gia' al balloon successivo, anche a tutorial in corso.
const TUTORIAL_TEXTS_EN = [
  "Damn! It looks like they destroyed half of the city! As new mayor you must rebuild it before they come back!",
  "First off, you should demolish those ruins, so that we can build new houses there.",
  "Select the scraper shaped button then click on the ruins to delete them!",
  "When you're about to delete a ruin the cost of the operation appears over it!",
  "Building and deleting cost money, of course. You also have to pay for the scaffoldings while the operation is going!",
  "We collect money by taxing the citizens. You can collect taxes by hoovering with the mouse over those blue icons!",
  "When you collect taxes you can see your money amount going up. The top bar gives you in general the amount of resources you own.",
  "The bottom bar instead is the Actions Bar. Use the hand button to select items",
  "The button next to it is the Build button. Now select it and then select the house button, the first one!",
  "Now build five houses in five empty spots! We need to boost the population in those times of war!",
  "When a house is completed immediately the population grows, but also the energy consumption! Houses' population keeps growing over time",
  "To provide energy to the city we use power plants. If the energy drops below zero, our citizens will stop paying taxes!",
  "Now build a power plant in an empty spot! Remember that energy consumption depends on population, so it will grow continuously",
  "We also need to provide some clean air and amusement to them, and to do so you can build parks",
  "Notice that the more the population and power plants grow the more they will need parks!",
  "Also notice that at night buildings consume much more energy!",
  "Now build a park in an empty spot. Remember that parks are cheap and fast to build but very expensive in manteinance!",
  "If you have enough parks you will see an happy face next to the resources count, otherwise yes, they will stop paying taxes!",
  "The defense of the city is another crucial point. As you can see we use massive artillery to keep the city safe!",
  "Build a rocket launcher in an empty spot. Remember that you can't build them too close at it would be too dangerous!",
  "We use weapons also to gather resources from our enemy, that carry them in those huge balloons you see flying above us!",
  "Tip: select the hand tool, then press and hold a weapon to open its panel and turn on Auto-defense, so it shoots down spy balloons and planes on its own (small cost per minute)!",
  "Tip: that works on any building, not just weapons! With the hand tool selected, press and hold a building to see its stats panel.",
  "Yes, I know what you are thinking and yes, NIMBUS grew stealing oil to foreign nations, but what can you do?",
  "When a balloon is aproaching, click to the closest weapon to destroy it, then quickly collect the resource falling from the sky!",
  "Green balloons are the ones carrying oil. They are the most common ones!",
  "Power plants and the city's engines burn oil to run. The more the city weights the more consumes oil!",
  "So remember not to build unnecessary stuff or too many power plants or the city will fall to the ground!",
  "Yellow balloons carry batteries for energy and blue ones carry money deposits.",
  "Red balloons are sent by the enemy to spy on us, so you absolutely have to destroy them!",
  "If you don't do it they will call reinforcements and you will experience an attack like the one you saw before!",
  "I think they will not stop until we build something very big to demonstrate them we belong here!",
  "In some time your city will become bigger and it will be difficult to control it all in a glance!",
  "You can also use the right mouse button to move the view and the mouse wheel for the zoom controls! On mobile, swipe with your finger to move the view of the map.",
  "Well, it looks like you know how to know how to move around now! Good luck with your own NIMBUS platform!",
];

const TUTORIAL_TEXTS_IT = [
  "Accidenti! Sembra che abbiano distrutto metà della città! Come nuovo sindaco devi ricostruirla prima che tornino!",
  "Per prima cosa, dovresti demolire quelle rovine, così potremo costruirci nuove case.",
  "Seleziona il bottone a forma di ruspa, poi clicca sulle rovine per eliminarle!",
  "Quando stai per eliminare una rovina, il costo dell'operazione appare sopra di essa!",
  "Costruire e demolire costano denaro, ovviamente. Devi anche pagare le impalcature finché l'operazione è in corso!",
  "Raccogliamo denaro tassando i cittadini. Puoi riscuotere le tasse passando il mouse sopra quelle iconcine blu!",
  "Quando riscuoti le tasse vedi salire la quantità di denaro. La barra in alto mostra in generale la quantità di risorse che possiedi.",
  "La barra in basso invece è la Barra delle Azioni. Usa il bottone a forma di mano per selezionare gli strumenti",
  "Il bottone accanto è il bottone Costruisci. Selezionalo e poi scegli il bottone della casa, il primo!",
  "Ora costruisci cinque case in cinque lotti vuoti! Dobbiamo far crescere la popolazione in questi tempi di guerra!",
  "Non appena una casa è completata la popolazione cresce subito, ma anche il consumo di energia! La popolazione delle case continua a crescere nel tempo",
  "Per fornire energia alla città costruiamo delle industrie. Se l'energia scende sotto zero, i nostri cittadini smetteranno di pagare le tasse!",
  "Ora costruisci un'industria in un lotto vuoto! Ricorda che il consumo di energia dipende dalla popolazione, quindi continuerà a crescere",
  "Dobbiamo anche garantire loro un po' di aria pulita e svago, e per farlo puoi costruire dei parchi",
  "Nota che più crescono popolazione e industrie, più avranno bisogno di parchi!",
  "Nota anche che di notte gli edifici consumano molta più energia!",
  "Ora costruisci un parco in un lotto vuoto. Ricorda che i parchi sono economici e veloci da costruire ma molto costosi da mantenere!",
  "Se hai abbastanza parchi vedrai una faccina felice accanto al conteggio delle risorse, altrimenti sì, smetteranno di pagare le tasse!",
  "La difesa della città è un altro punto cruciale. Come puoi vedere usiamo artiglieria pesante per tenere al sicuro la città!",
  "Costruisci un lanciamissili in un lotto vuoto. Ricorda che non puoi costruirli troppo vicini tra loro, sarebbe troppo pericoloso!",
  "Usiamo le armi anche per sottrarre risorse al nemico, che le trasporta in quelle enormi mongolfiere che vedi volare sopra di noi!",
  "Consiglio: seleziona lo strumento mano, poi tieni premuto su un'arma per aprire il suo pannello e attivare l'Autodifesa, così abbatterà da sola mongolfiere spia e aerei (piccolo costo al minuto)!",
  "Consiglio: funziona su qualsiasi edificio, non solo sulle armi! Con lo strumento mano selezionato, tieni premuto su un edificio per vedere il suo pannello statistiche.",
  "Sì, so cosa stai pensando, e sì, NIMBUS è cresciuta rubando petrolio a nazioni straniere, ma cosa ci vuoi fare?",
  "Quando una mongolfiera si avvicina, clicca sull'arma più vicina per distruggerla, poi raccogli in fretta la risorsa che cade dal cielo!",
  "Le mongolfiere verdi sono quelle che trasportano petrolio. Sono le più comuni!",
  "Le industrie e i motori della città bruciano petrolio per funzionare. Più la città pesa, più consuma petrolio!",
  "Quindi ricorda di non costruire cose inutili o troppe industrie, o la città cadrà al suolo!",
  "Le mongolfiere gialle trasportano batterie per l'energia e quelle blu depositi di denaro.",
  "Le mongolfiere rosse sono inviate dal nemico per spiarci, quindi devi assolutamente distruggerle!",
  "Se non lo fai chiameranno rinforzi e subirai un attacco come quello che hai visto prima!",
  "Credo che non si fermeranno finché non costruiremo qualcosa di enorme per dimostrargli che questo posto è nostro!",
  "Col tempo la tua città diventerà più grande e sarà difficile controllarla tutta con un'occhiata!",
  "Puoi anche usare il tasto destro del mouse per spostare la visuale e la rotellina per lo zoom! Su mobile, scorri con il dito per muovere la visuale della mappa.",
  "Bene, sembra che ora tu sappia come muoverti! Buona fortuna con la tua piattaforma NIMBUS!",
];

const TUTORIAL_TEXTS_ES = [
  "¡Vaya! ¡Parece que han destruido media ciudad! Como nuevo alcalde debes reconstruirla antes de que vuelvan!",
  "Antes de nada, deberías demoler esas ruinas, así podremos construir casas nuevas ahí.",
  "¡Selecciona el botón con forma de excavadora y luego pulsa sobre las ruinas para eliminarlas!",
  "¡Cuando vas a eliminar una ruina, el coste de la operación aparece sobre ella!",
  "Construir y demoler cuesta dinero, claro. ¡También tienes que pagar los andamios mientras la obra está en curso!",
  "Recaudamos dinero cobrando impuestos a los ciudadanos. ¡Puedes cobrar los impuestos pasando el ratón sobre esos iconos azules!",
  "Cuando cobras impuestos, ves subir la cantidad de dinero. La barra superior te muestra en general la cantidad de recursos que tienes.",
  "La barra inferior, en cambio, es la Barra de Acciones. Usa el botón de la mano para seleccionar herramientas",
  "El botón de al lado es el botón Construir. Selecciónalo y luego elige el botón de la casa, ¡el primero!",
  "¡Ahora construye cinco casas en cinco parcelas vacías! ¡Necesitamos hacer crecer la población en estos tiempos de guerra!",
  "En cuanto una casa se completa la población crece enseguida, ¡pero también el consumo de energía! La población de las casas sigue creciendo con el tiempo",
  "Para dar energía a la ciudad construimos industrias. Si la energía baja de cero, ¡nuestros ciudadanos dejarán de pagar impuestos!",
  "¡Ahora construye una industria en una parcela vacía! Recuerda que el consumo de energía depende de la población, así que seguirá creciendo",
  "También tenemos que darles algo de aire limpio y diversión, y para eso puedes construir parques",
  "¡Fíjate en que cuanto más crecen la población y las industrias, más parques necesitarán!",
  "¡Fíjate también en que de noche los edificios consumen mucha más energía!",
  "Ahora construye un parque en una parcela vacía. ¡Recuerda que los parques son baratos y rápidos de construir pero muy caros de mantener!",
  "Si tienes suficientes parques verás una carita feliz junto al contador de recursos, si no, sí, ¡dejarán de pagar impuestos!",
  "La defensa de la ciudad es otro punto crucial. ¡Como puedes ver usamos artillería pesada para mantener la ciudad a salvo!",
  "Construye un lanzamisiles en una parcela vacía. ¡Recuerda que no puedes construirlos demasiado cerca entre sí, sería demasiado peligroso!",
  "¡También usamos las armas para quitarle recursos al enemigo, que los transporta en esos globos enormes que ves volar sobre nosotros!",
  "Consejo: selecciona la herramienta mano, luego mantén pulsada un arma para abrir su panel y activar la Autodefensa, así derribará ella sola globos espía y aviones (pequeño coste por minuto)!",
  "Consejo: ¡eso funciona en cualquier edificio, no solo en las armas! Con la herramienta mano seleccionada, mantén pulsado un edificio para ver su panel de estadísticas.",
  "Sí, sé lo que estás pensando, y sí, NIMBUS creció robando petróleo a naciones extranjeras, pero ¿qué le vamos a hacer?",
  "Cuando un globo se acerque, pulsa sobre el arma más cercana para destruirlo, ¡luego recoge rápido el recurso que cae del cielo!",
  "Los globos verdes son los que transportan petróleo. ¡Son los más comunes!",
  "Las industrias y los motores de la ciudad queman petróleo para funcionar. ¡Cuanto más pesa la ciudad, más petróleo consume!",
  "Así que recuerda no construir cosas innecesarias ni demasiadas industrias, o la ciudad caerá al suelo!",
  "Los globos amarillos transportan baterías de energía y los azules depósitos de dinero.",
  "Los globos rojos los envía el enemigo para espiarnos, así que tienes que destruirlos sin falta!",
  "Si no lo haces, pedirán refuerzos y sufrirás un ataque como el que viste antes!",
  "Creo que no se detendrán hasta que construyamos algo enorme para demostrarles que este sitio es nuestro!",
  "Con el tiempo tu ciudad se hará más grande y será difícil controlarla toda de un vistazo!",
  "También puedes usar el botón derecho del ratón para mover la vista y la rueda para el zoom! En móvil, desliza el dedo para mover la vista del mapa.",
  "¡Bien, parece que ya sabes moverte! ¡Buena suerte con tu propia plataforma NIMBUS!",
];

const TUTORIAL_TEXTS_PT = [
  "Droga! Parece que destruíram metade da cidade! Como novo prefeito, você deve reconstruí-la antes que eles voltem!",
  "Primeiro, você deveria demolir essas ruínas, para que possamos construir casas novas ali.",
  "Selecione o botão em forma de escavadeira e depois clique nas ruínas para removê-las!",
  "Quando você está prestes a remover uma ruína, o custo da operação aparece sobre ela!",
  "Construir e demolir custam dinheiro, claro. Você também tem que pagar os andaimes enquanto a obra estiver em andamento!",
  "Arrecadamos dinheiro cobrando impostos dos cidadãos. Você pode coletar os impostos passando o mouse sobre aqueles ícones azuis!",
  "Quando você coleta impostos, vê a quantidade de dinheiro subindo. A barra superior mostra, em geral, a quantidade de recursos que você possui.",
  "Já a barra inferior é a Barra de Ações. Use o botão da mão para selecionar itens",
  "O botão ao lado é o botão Construir. Selecione-o e depois escolha o botão da casa, o primeiro!",
  "Agora construa cinco casas em cinco lotes vazios! Precisamos aumentar a população nestes tempos de guerra!",
  "Assim que uma casa é concluída, a população cresce imediatamente, mas também o consumo de energia! A população das casas continua crescendo com o tempo",
  "Para fornecer energia à cidade usamos indústrias. Se a energia cair abaixo de zero, nossos cidadãos vão parar de pagar impostos!",
  "Agora construa uma indústria em um lote vazio! Lembre-se de que o consumo de energia depende da população, então continuará crescendo",
  "Também precisamos oferecer a eles um pouco de ar puro e diversão, e para isso você pode construir parques",
  "Repare que quanto mais crescem a população e as indústrias, mais parques serão necessários!",
  "Repare também que, à noite, os edifícios consomem muito mais energia!",
  "Agora construa um parque em um lote vazio. Lembre-se de que os parques são baratos e rápidos de construir, mas muito caros de manter!",
  "Se você tiver parques suficientes, verá um rostinho feliz ao lado da contagem de recursos; caso contrário, sim, eles vão parar de pagar impostos!",
  "A defesa da cidade é outro ponto crucial. Como você pode ver, usamos artilharia pesada para manter a cidade segura!",
  "Construa um lançador de mísseis em um lote vazio. Lembre-se de que você não pode construí-los muito próximos, seria perigoso demais!",
  "Também usamos as armas para tomar recursos do inimigo, que os transporta naqueles balões enormes que você vê voando sobre nós!",
  "Dica: selecione a ferramenta mão, depois pressione e segure uma arma para abrir seu painel e ativar a Autodefesa, assim ela abaterá sozinha balões espiões e aviões (pequeno custo por minuto)!",
  "Dica: isso funciona em qualquer edifício, não só nas armas! Com a ferramenta mão selecionada, pressione e segure um edifício para ver seu painel de estatísticas.",
  "Sim, eu sei o que você está pensando, e sim, a NIMBUS cresceu roubando petróleo de nações estrangeiras, mas o que fazer?",
  "Quando um balão estiver se aproximando, clique na arma mais próxima para destruí-lo, depois colete rapidamente o recurso que cai do céu!",
  "Os balões verdes são os que transportam petróleo. São os mais comuns!",
  "As indústrias e os motores da cidade queimam petróleo para funcionar. Quanto mais pesada a cidade, mais petróleo consome!",
  "Então lembre-se de não construir coisas desnecessárias nem indústrias demais, ou a cidade cairá ao chão!",
  "Os balões amarelos transportam baterias de energia e os azuis transportam depósitos de dinheiro.",
  "Os balões vermelhos são enviados pelo inimigo para nos espionar, então você precisa destruí-los sem falta!",
  "Se você não fizer isso, eles chamarão reforços e você sofrerá um ataque como aquele que viu antes!",
  "Acho que eles não vão parar até construirmos algo bem grande para mostrar a eles que este lugar é nosso!",
  "Com o tempo sua cidade vai ficar maior e será difícil controlar tudo de relance!",
  "Você também pode usar o botão direito do mouse para mover a visão e a rodinha do mouse para o zoom! No celular, deslize o dedo para mover a visão do mapa.",
  "Bem, parece que agora você já sabe se virar por aí! Boa sorte com sua própria plataforma NIMBUS!",
];

const TUTORIAL_TEXTS_DE = [
  "Verdammt! Sieht aus, als hätten sie die halbe Stadt zerstört! Als neuer Bürgermeister musst du sie wiederaufbauen, bevor sie zurückkommen!",
  "Zuerst solltest du diese Ruinen abreißen, damit wir dort neue Häuser bauen können.",
  "Wähle den Button in Baggerform aus und klicke dann auf die Ruinen, um sie zu entfernen!",
  "Wenn du kurz davor bist, eine Ruine zu entfernen, erscheinen die Kosten der Aktion darüber!",
  "Bauen und Abreißen kosten natürlich Geld. Du musst auch für die Gerüste bezahlen, solange die Arbeiten laufen!",
  "Wir sammeln Geld, indem wir die Bürger besteuern. Du kannst Steuern einsammeln, indem du mit der Maus über diese blauen Symbole fährst!",
  "Wenn du Steuern einsammelst, siehst du, wie dein Geldbetrag steigt. Die obere Leiste zeigt dir allgemein die Menge der Ressourcen, die du besitzt.",
  "Die untere Leiste dagegen ist die Aktionsleiste. Benutze den Handbutton, um Werkzeuge auszuwählen",
  "Der Button daneben ist der Bau-Button. Wähle ihn jetzt aus und dann den Haus-Button, den ersten!",
  "Baue jetzt fünf Häuser auf fünf leeren Grundstücken! Wir müssen die Bevölkerung in diesen Kriegszeiten vergrößern!",
  "Sobald ein Haus fertiggestellt ist, wächst sofort die Bevölkerung, aber auch der Energieverbrauch! Die Bevölkerung der Häuser wächst im Laufe der Zeit weiter",
  "Um die Stadt mit Energie zu versorgen, nutzen wir Industrieanlagen. Wenn die Energie unter null fällt, hören unsere Bürger auf, Steuern zu zahlen!",
  "Baue jetzt eine Industrieanlage auf einem leeren Grundstück! Denk daran, dass der Energieverbrauch von der Bevölkerung abhängt, also wird er stetig weiterwachsen",
  "Wir müssen ihnen auch etwas saubere Luft und Unterhaltung bieten, und dafür kannst du Parks bauen",
  "Beachte, dass je mehr Bevölkerung und Industrieanlagen wachsen, desto mehr Parks werden benötigt!",
  "Beachte auch, dass Gebäude nachts viel mehr Energie verbrauchen!",
  "Baue jetzt einen Park auf einem leeren Grundstück. Denk daran, dass Parks billig und schnell zu bauen, aber sehr teuer im Unterhalt sind!",
  "Wenn du genug Parks hast, siehst du ein glückliches Gesicht neben der Ressourcenanzeige, andernfalls hören sie auf, Steuern zu zahlen!",
  "Die Verteidigung der Stadt ist ein weiterer entscheidender Punkt. Wie du sehen kannst, setzen wir massive Artillerie ein, um die Stadt zu schützen!",
  "Baue einen Raketenwerfer auf einem leeren Grundstück. Denk daran, dass du sie nicht zu nah beieinander bauen kannst, das wäre zu gefährlich!",
  "Wir nutzen Waffen auch, um dem Feind Ressourcen abzunehmen, die er in diesen riesigen Ballons transportiert, die du über uns fliegen siehst!",
  "Tipp: Wähle das Handwerkzeug aus und halte dann eine Waffe gedrückt, um ihr Panel zu öffnen und die Autoverteidigung zu aktivieren, damit sie von selbst Spionageballons und Flugzeuge abschießt (geringe Kosten pro Minute)!",
  "Tipp: Das funktioniert bei jedem Gebäude, nicht nur bei Waffen! Halte bei ausgewähltem Handwerkzeug ein Gebäude gedrückt, um sein Statistik-Panel zu sehen.",
  "Ja, ich weiß, was du denkst, und ja, NIMBUS ist gewachsen, indem es fremden Nationen Öl gestohlen hat, aber was soll man machen?",
  "Wenn sich ein Ballon nähert, klicke auf die nächstgelegene Waffe, um ihn zu zerstören, und sammle dann schnell die vom Himmel fallende Ressource ein!",
  "Grüne Ballons transportieren Öl. Sie sind die häufigsten!",
  "Industrieanlagen und die Motoren der Stadt verbrennen Öl, um zu laufen. Je schwerer die Stadt, desto mehr Öl verbraucht sie!",
  "Denk also daran, keine unnötigen Dinge oder zu viele Industrieanlagen zu bauen, sonst stürzt die Stadt zu Boden!",
  "Gelbe Ballons transportieren Batterien für Energie und blaue Geldeinlagen.",
  "Rote Ballons werden vom Feind geschickt, um uns auszuspionieren, also musst du sie unbedingt zerstören!",
  "Wenn du das nicht tust, rufen sie Verstärkung und du erlebst einen Angriff wie den, den du vorher gesehen hast!",
  "Ich glaube, sie werden nicht aufhören, bis wir etwas sehr Großes bauen, um ihnen zu zeigen, dass wir hierher gehören!",
  "Mit der Zeit wird deine Stadt größer und es wird schwierig, alles auf einen Blick zu kontrollieren!",
  "Du kannst auch die rechte Maustaste benutzen, um die Ansicht zu bewegen, und das Mausrad für den Zoom! Auf dem Handy wische mit dem Finger, um die Kartenansicht zu bewegen.",
  "Nun, es sieht so aus, als wüsstest du jetzt, wie man sich zurechtfindet! Viel Glück mit deiner eigenen NIMBUS-Plattform!",
];

const TUTORIAL_TEXTS_FR = [
  "Zut ! On dirait qu'ils ont détruit la moitié de la ville ! En tant que nouveau maire, tu dois la reconstruire avant qu'ils reviennent !",
  "D'abord, tu devrais démolir ces ruines, pour qu'on puisse y construire de nouvelles maisons.",
  "Sélectionne le bouton en forme de pelleteuse puis clique sur les ruines pour les supprimer !",
  "Quand tu es sur le point de supprimer une ruine, le coût de l'opération apparaît au-dessus !",
  "Construire et démolir coûtent de l'argent, bien sûr. Tu dois aussi payer les échafaudages pendant que les travaux sont en cours !",
  "On récolte de l'argent en taxant les citoyens. Tu peux collecter les impôts en passant la souris sur ces icônes bleues !",
  "Quand tu collectes les impôts, tu vois ton montant d'argent augmenter. La barre du haut te donne en général la quantité de ressources que tu possèdes.",
  "La barre du bas, elle, est la Barre d'Actions. Utilise le bouton main pour sélectionner des outils",
  "Le bouton juste à côté est le bouton Construire. Sélectionne-le, puis choisis le bouton maison, le premier !",
  "Construis maintenant cinq maisons sur cinq emplacements vides ! On doit faire croître la population en ces temps de guerre !",
  "Dès qu'une maison est terminée, la population augmente aussitôt, mais aussi la consommation d'énergie ! La population des maisons continue de croître avec le temps",
  "Pour fournir de l'énergie à la ville, on utilise des industries. Si l'énergie tombe en dessous de zéro, nos citoyens arrêteront de payer leurs impôts !",
  "Construis maintenant une industrie sur un emplacement vide ! N'oublie pas que la consommation d'énergie dépend de la population, donc elle continuera d'augmenter",
  "On doit aussi leur offrir un peu d'air pur et de distraction, et pour ça tu peux construire des parcs",
  "Remarque que plus la population et les industries grandissent, plus ils auront besoin de parcs !",
  "Remarque aussi que la nuit, les bâtiments consomment bien plus d'énergie !",
  "Construis maintenant un parc sur un emplacement vide. N'oublie pas que les parcs sont bon marché et rapides à construire, mais très coûteux à entretenir !",
  "Si tu as assez de parcs, tu verras un visage souriant à côté du compteur de ressources, sinon oui, ils arrêteront de payer leurs impôts !",
  "La défense de la ville est un autre point crucial. Comme tu peux le voir, on utilise une artillerie massive pour protéger la ville !",
  "Construis un lance-missiles sur un emplacement vide. N'oublie pas que tu ne peux pas les construire trop près les uns des autres, ce serait trop dangereux !",
  "On utilise aussi les armes pour prendre des ressources à l'ennemi, qui les transporte dans ces énormes ballons que tu vois voler au-dessus de nous !",
  "Astuce : sélectionne l'outil main, puis appuie longuement sur une arme pour ouvrir son panneau et activer l'Autodéfense, pour qu'elle abatte toute seule ballons espions et avions (petit coût par minute) !",
  "Astuce : ça marche sur n'importe quel bâtiment, pas seulement les armes ! Avec l'outil main sélectionné, appuie longuement sur un bâtiment pour voir son panneau de statistiques.",
  "Oui, je sais ce que tu penses, et oui, NIMBUS a grandi en volant du pétrole à des nations étrangères, mais que veux-tu qu'on y fasse ?",
  "Quand un ballon approche, clique sur l'arme la plus proche pour le détruire, puis récupère vite la ressource qui tombe du ciel !",
  "Les ballons verts transportent du pétrole. Ce sont les plus courants !",
  "Les industries et les moteurs de la ville brûlent du pétrole pour fonctionner. Plus la ville est lourde, plus elle consomme de pétrole !",
  "Alors n'oublie pas de ne pas construire de choses inutiles ni trop d'industries, sinon la ville s'écrasera au sol !",
  "Les ballons jaunes transportent des batteries d'énergie et les bleus des dépôts d'argent.",
  "Les ballons rouges sont envoyés par l'ennemi pour nous espionner, donc tu dois absolument les détruire !",
  "Si tu ne le fais pas, ils appelleront des renforts et tu subiras une attaque comme celle que tu as vue avant !",
  "Je pense qu'ils ne s'arrêteront pas tant qu'on n'aura pas construit quelque chose de très grand pour leur montrer que cet endroit est à nous !",
  "Avec le temps, ta ville deviendra plus grande et il sera difficile de tout contrôler d'un coup d'œil !",
  "Tu peux aussi utiliser le bouton droit de la souris pour déplacer la vue et la molette pour le zoom ! Sur mobile, glisse ton doigt pour déplacer la vue de la carte.",
  "Bon, on dirait que tu sais maintenant comment te débrouiller ! Bonne chance avec ta propre plateforme NIMBUS !",
];

export const TUTORIAL_TEXTS = TUTORIAL_TEXTS_EN;   // lunghezza (LAST_PHASE sotto): identica in tutte le lingue

export function tutorialText(phase) {
  const lang = getLang();
  const arr = lang === "it" ? TUTORIAL_TEXTS_IT
    : lang === "es" ? TUTORIAL_TEXTS_ES
    : lang === "pt" ? TUTORIAL_TEXTS_PT
    : lang === "de" ? TUTORIAL_TEXTS_DE
    : lang === "fr" ? TUTORIAL_TEXTS_FR
    : TUTORIAL_TEXTS_EN;
  return arr[phase] ?? "";
}

// [C] freccia_tutorial/EndStep.gml: la tabella fase -> bersaglio del
// decompilato punta a coordinate fisse del layout GameMaker originale, gia'
// diverso dal selettore ricostruito in main.js (STUDIO.md, "ricostruita
// come UI vera in spazio schermo") — il resolver vero (fase -> bottone
// VERO in `uiButtons`, per kind/type) vive li' invece che come dati qui,
// perche' ha bisogno di `uiButtons`/`menoo`/`cam` a runtime.

// [C] ruin1/ruin2 (istanze piazzate direttamente in tutorial.json, non
// create da destroyBuilding() — STUDIO.md, "un rudere non ha nessun ramo
// Mouse_LeftPressed": quel gap riguarda i ruderi da battaglia, un oggetto
// diverso. ruin1/ruin2 hanno invece un proprio Mouse_LeftPressed/MouseEnter
// dedicato: sotto ruspa (r12.selec===11) mostrano un cartellino costo
// all'hover e, al tocco con fondi sufficienti, sgomberano il lotto
// (main.js, clearedPlaceholder()) — **[Decisione dell'autore: "la rovina
// ruspata deve creare sempre un placeholder vuoto, non un nuovo
// edificio"]**, non piu' fedele al decompilato (che li ricostruiva sul
// posto, impacasa1r/impacasa2r). `level` (1/2, ora usato solo per
// distinguere quale sprite/costo mostrare, non piu' cosa costruire) resta
// comunque una taglia diversa fra i due: ruin1 costa 500 mon, ruin2 2000.
const RUIN_POOL = {
  ruin1: { level: 1, cost: 500, sprites: ["ru11", "ru12", "ru13", "ru14"] },
  ruin2: { level: 2, cost: 2000, sprites: ["ru21", "ru22", "ru23", "ru24"] },
};

export function extractRuinLots(scene) {
  const lots = [];
  let nextId = 1;
  for (const it of scene.instances) {
    const pool = RUIN_POOL[it.obj];
    if (!pool) continue;
    const spr = pool.sprites[(Math.random() * pool.sprites.length) | 0];
    lots.push({ id: nextId++, x: it.x, y: it.y, depth: -it.y, level: pool.level, cost: pool.cost, spr, _f: null });
  }
  return lots;
}


export function createTutorialState(scene) {
  const count = (name) => scene.instances.filter((it) => it.obj === name).length;
  const airTut2 = scene.instances.find((it) => it.obj === "air_tut2");
  const casa3 = scene.instances.find((it) => it.obj === "casa3");
  return {
    phase: 0,
    // [C] tutorial_square/Create.gml: tutpar/tutind/tutrl — la "soglia"
    // e' quanti esistono GIA' all'avvio, non un numero fisso: contati qui
    // dalla stessa room invece di scriverli a mano, stesso risultato
    // (4 parco, 2 industria1, 2 rocket_launcher in tutorial.json).
    tutpar: count("parco"),
    tutind: count("industria1"),
    tutrl: count("rocket_launcher"),
    // [C] tutorial_thumb/Mouse_LeftPressed.gml, fase 4: `instance_create
    // (casa3.x, casa3.y, sold13)` — la prima `casa3` della room, presa qui
    // una volta sola invece di ricercarla ad ogni tocco.
    practiceCoinPos: casa3 ? { x: casa3.x, y: casa3.y } : { x: 0, y: 0 },
    practiceCoinSpawned: false,
    coinCollected: false,
    // Cutscene iniziale di bombardamento (air_tut1/air_tut2 — vedi
    // createCutscene()/stepCutscene() sotto per la deviazione concordata
    // sull'esito): l'HUD del tutorial (freccia/balloon/bottone, uccisi
    // dalla cutscene nel decompilato) resta nascosto finche' `cutscene`
    // non e' null.
    cutscene: airTut2 ? createCutscene() : null,   // vedi createCutscene()/stepCutscene() sotto
    arrowFrame: 0,
  };
}

// [C] tutorial_square/Step.gml: le 8 condizioni di gioco vero. `ctx` = {
// r12, buildings }. Il conteggio per tipo/livello legge `buildings` (solo
// cio' che il giocatore ha costruito DURANTE il tutorial: nessuna `casa1`
// preesiste nella room — le case gia' in piedi sono tutte casa2/casa3,
// STUDIO.md — quindi non serve distinguere "storico" da "istantaneo" come
// invece servirebbe per un edificio che puo' retrocedere di livello).
export function stepTutorialAuto(state, ctx) {
  const { r12, buildings } = ctx;
  const builtAtLevel = (type, level) => buildings.filter((b) => b.type === type && b.level === level).length;
  if (state.phase === 2 && r12.selec === 11) state.phase = 3;
  else if (state.phase === 5 && state.coinCollected) state.phase = 6;
  else if (state.phase === 7 && r12.selec === 0) state.phase = 8;
  else if (state.phase === 8 && r12.selec === 1) state.phase = 9;
  else if (state.phase === 9 && builtAtLevel("casa", 1) >= 5) state.phase = 10;
  else if (state.phase === 12 && builtAtLevel("industria", 1) > state.tutind) state.phase = 13;
  else if (state.phase === 16 && builtAtLevel("parco", 1) > state.tutpar) state.phase = 17;
  else if (state.phase === 19 && builtAtLevel("missile", 1) > state.tutrl) state.phase = 20;
}

// Fasi in cui il balloon/freccia restano nascosti perche' l'avanzamento e'
// automatico (il giocatore deve AGIRE, non toccare "avanti" — [C]
// tutorial_thumb/Step.gml, le stesse 8 fasi elencate li' come "nascosto").
export const HIDE_ADVANCE_BUTTON = new Set([2, 5, 7, 8, 9, 12, 16, 19]);

export const LAST_PHASE = TUTORIAL_TEXTS.length - 1;   // 34

// ---------------------------------------------------------- intro cutscene
// [C] air_tut2 (istanza in tutorial.json, x=363,y=219) al Create: crea 2
// `air_tut1` (aerei, offset relativo +300,+200 / -300,+220 dalla propria
// posizione) + 6 `tut_sf` (sfondo "macerie", tassello 1000x564, a
// coordinate mondo ASSOLUTE), e uccide subito tutorial_square/
// freccia_tutorial/tutorial_thumb (l'HUD del tutorial sparisce per la
// durata della cutscene). air_tut2 stesso e' un terzo "aereo" (sprite
// tuto_bomb) in moto. **[Bug corretto]** una prima versione qui piazzava
// i 6 tasselli esattamente alle coordinate mondo del decompilato — ma
// quella griglia (passo 1128 = 2x l'altezza 564 del tassello, passo 2000
// contro una larghezza di 1000) lascia META' dell'area scoperta
// (checkerboard, non un tappeto pieno), e comunque dipende da dove la
// camera normale della room si trova in quel momento (mai garantito
// vicino ad `air_tut2`): risultato, lo sfondo "macerie" copriva solo un
// angolo dello schermo invece di tutto quanto (segnalato dall'autore
// dagli screenshot). **[I]** Qui la cutscene e' invece interamente in
// SPAZIO SCHERMO (stesso layer di uiButtons/freccia, non il mondo/camera):
// il tassello si ripete a tappeto su tutta la canvas (qualunque
// risoluzione) e i tre aerei attraversano lo schermo da un bordo
// all'altro in coordinate normalizzate — copertura piena garantita,
// indipendente da dove la camera vera della room punta.
// Durata di QUESTA prima fase: 4s (240 tick nel decompilato, Alarm_1 — il
// momento in cui l'originale uccide aerei/sfondo e fa comparire l'overlay
// nero `blacker1`).
//
// [Corretto: non era affatto la schermata di game over del gioco base come
// ipotizzato in un primo momento (STUDIO.md §6), ne' un vicolo cieco da
// saltare] Seguita fino in fondo la catena `blacker1` -> `blacker12` ->
// `blacker2` (src/objects, letti riga per riga): e' un'INTERA seconda meta'
// della cutscene, non un game over. **[C]**:
//  1. "planes" (questa fase, 240 tick/4s): il sorvolo in spazio schermo
//     sopra, gia' portato.
//  2. "black1" (`blacker1`, 90 tick/Alarm_0): schermo NERO pieno con la
//     scritta "Mount Fuji Software" — sprite `mfs1` su Windows, `mfs11` su
//     Android (`blacker1/DrawGUI.gml`: `draw_rectangle` nero pieno-schermo
//     poi `action_draw_sprite(mfsN, view_wview[0]/2, view_hview[0]/2, -1)`,
//     centrato). Nello STESSO istante `blacker1/Create.gml` fa nascere la
//     VERA scena di combattimento in coordinate MONDO (non schermo): 3
//     `bombar` + 9 `air` + 1 `dirig`, in posizioni fisse (CUTSCENE_BOMBAR_Y/
//     CUTSCENE_DIRIG_POS sotto) — nascosta dietro il nero per ora.
//  3. "battle" (`blacker12`, 240 tick/Alarm_0): il nero sparisce (`blacker1`
//     si autodistrugge quando scade) ma l'HUD del tutorial resta ancora
//     morto — la battaglia appena nata (ancora viva, stessi oggetti/stesso
//     comportamento `air`|`bombar`|`dirig` del gioco vero, threats.js) e'
//     visibile per intero DIRETTAMENTE SULLA PIATTAFORMA per 4 secondi,
//     senza nessun velo sopra: e' la "scena di combattimento" che l'autore
//     ricordava, mai portata prima d'ora.
//  4. "black2" (`blacker2`, 200 tick/Alarm_0): un secondo schermo nero,
//     sprite `mfs2` — un secondo logo/scritta PIU' PICCOLO di `mfs1`
//     (data/sprites.json: 296x54 contro 620x118 — non lo stesso ripetuto
//     due volte). Nello stesso istante `blacker2/Create.gml` uccide ogni
//     `dirig` rimasto (lo zeppelin, il piu' lento e resistente dei tre —
//     l'unico tipo ripulito qui: `air`/`bombar` restano vivi, continuano a
//     volare/bombardare/scadere per conto proprio anche dopo, esattamente
//     come nel decompilato, che non ha nessun Destroy per loro in
//     blacker12/blacker2). Alla fine di questa fase `blacker2/Destroy.gml`
//     ricrea `tutorial_thumb`/`tutorial_square`: l'HUD del tutorial torna,
//     si riparte dalla fase 0 del balloon di testo.
// Le posizioni/gli oggetti della battaglia riusano `spawnThreat()`
// (threats.js) — la STESSA fabbrica del regista vero delle ondate
// (STUDIO.md, "le minacce vere"): stesso sprite/vita/velocita'/dado
// fronte-retro per tipo, solo le posizioni di nascita sono quelle fisse del
// decompilato invece che quelle a dado/bordo schermo del regista normale.
// `stepCutscene()` sotto non tocca direttamente l'array `threats` di
// main.js (tutorial.js non conosce lo stato del mondo): ritorna i nuovi
// nemici (`cutscene.spawnThreats`, un one-shot alla transizione
// "planes"->"black1") e un flag (`cutscene.killDirig`, un one-shot alla
// transizione "battle"->"black2") che main.js applica al proprio array
// subito dopo averli letti — stesso principio di `stepTutorialAuto()`
// sopra (un `ctx` passato da fuori), qui capovolto (dati passati FUORI)
// perche' e' main.js, non tutorial.js, a possedere `threats`.
const CUTSCENE_PLANES_DURATION = 4;         // secondi — [C] air_tut2/Alarm_1: 240 tick
const CUTSCENE_BLACK1_DURATION = 90 / 60;   // secondi — [C] blacker1/Alarm_0: 90 tick
const CUTSCENE_BATTLE_DURATION = 240 / 60;  // secondi — [C] blacker12/Alarm_0: 240 tick
const CUTSCENE_BLACK2_DURATION = 200 / 60;  // secondi — [C] blacker2/Alarm_0: 200 tick

// [C] `tut_sf/Create.gml` (lo sfondo "mare", sprite `tuto_sfondo`):
// `action_set_motion(210, 6)` — direzione 210°, 6px/step alla room speed
// originale di 60fps. In GameMaker `hspeed = speed*cos(dir)`, `vspeed =
// -speed*sin(dir)`: a 210° `cos<0` (sinistra) e `sin<0` (quindi `vspeed>0`,
// verso il basso) — il mare scorre in diagonale verso sinistra/basso, non
// e' fermo dietro al sorvolo. Il proprio `Alarm_1` lo distruggerebbe dopo
// 400 tick, ma `air_tut2/Alarm_1` (240 tick, `CUTSCENE_PLANES_DURATION`
// sopra) lo uccide comunque prima insieme al resto della fase "planes":
// la durata visibile vera e' quella, non 400 tick. Qui in px/secondo
// (invece che px/step) per restare coerenti col resto della cutscene, gia'
// integrata su `dt` reale invece che a tick fissi (vedi il commento su
// `stepCutscene`/dt piu' sotto).
const SEA_SCROLL_VX = 6 * Math.cos((210 * Math.PI) / 180) * 60;   // px/s, negativo = verso sinistra
const SEA_SCROLL_VY = -6 * Math.sin((210 * Math.PI) / 180) * 60;  // px/s, positivo = verso il basso

/** Offset di scorrimento del tassello "mare" (`tuto_sfondo`) alla fase
 * "planes" della cutscene, in pixel — main.js lo applica modulo la
 * dimensione del tassello (texture seamless) per tappezzare lo schermo
 * senza buchi. `phaseT`: secondi trascorsi dall'inizio della fase
 * (`cutscene.phaseT`, gia' tracciato da stepCutscene()). */
export function seaScrollOffset(phaseT) {
  return { x: SEA_SCROLL_VX * phaseT, y: SEA_SCROLL_VY * phaseT };
}

// Attraversano lo schermo da un bordo oltre l'altro (frazione della
// larghezza vista, -0.3..1.3) in tempi/altezze leggermente sfalsati fra
// loro — tre sagome invece di un'unica traiettoria identica.
const CUTSCENE_PLANES = [
  { spr: "tuto_fig1", yFrac: 0.30, startT: 0.0, dur: 2.6 },
  { spr: "tuto_fig2", yFrac: 0.55, startT: 0.4, dur: 2.8 },
  { spr: "tuto_bomb", yFrac: 0.42, startT: 0.2, dur: 3.2 },
];

// [Bug corretto, segnalato dall'autore: "gli aerei del tutorial si muovono
// in orizzontale"] **[C]** `air_tut1/Create.gml`: `action_set_motion(30,
// irandom_range(1,3))`; `air_tut2/Create.gml`: `action_set_motion(30, 1)`
// — entrambi volano a direzione 30°, la STESSA diagonale di tutta la
// famiglia "aerei" (threats.js), mai orizzontale. Una prima versione di
// questa cutscene (gia' deliberatamente riportata in spazio schermo per
// garantire copertura piena, vedi il commento sopra) interpolava solo
// `xFrac`, lasciando `yFrac` fisso — un volo perfettamente orizzontale,
// infedele alla direzione vera.
//
// [Bug corretto di nuovo, stesso sintomo] Il primo tentativo di correzione
// faceva salire `yFrac` di una frazione FISSA (0.18) dell'altezza schermo
// durante l'attraversamento — ma xFrac/yFrac sono entrambe frazioni della
// rispettiva dimensione (larghezza/altezza), non pixel: su un viewport
// largo (16:9 o piu', il caso comune) 0.18*ch di salita contro 1.6*cw di
// avanzata resta un angolo di pochi gradi (~3-4°), visivamente quasi
// piatto — esattamente il difetto segnalato di nuovo dall'autore ("gli
// aerei sul mare continuano a volare in orizzontale"). Riprodurre la
// VERA pendenza di 30° (come le minacce vere in mondo, threats.js, dove
// funziona perche' la camera scala x/y allo stesso modo) e' pero'
// incompatibile con l'attraversamento pieno-schermo in pochi secondi di
// QUESTA cutscene (in spazio schermo, non mondo): su un viewport largo,
// 30° veri manderebbero ogni aereo fuori dal bordo alto dopo aver
// coperto solo una piccola fetta della larghezza — un guizzo, non un
// sorvolo. Qui la salita si calibra invece su un angolo piu' moderato ma
// comunque inequivocabilmente diagonale (~18°, ben oltre la soglia
// percepibile) — esportata come TANGENTE (`CUTSCENE_CLIMB_TAN`, non
// l'angolo) perche' e' main.js a fare il calcolo pixel per pixel (vedi
// sotto), non piu' qui.
//
// [Bug corretto, segnalato dall'autore: "vedo gli aerei fermi per qualche
// frame quando parte il livello"] **[I]** Fino a qui `xFrac` partiva da un
// margine FISSO (-0.3, "fuori sinistra") — una frazione dello SCHERMO, non
// della vera larghezza in pixel di ciascuno sprite: `tuto_bomb` (data/
// sprites.json) e' largo 716px, `tuto_fig1`/`tuto_fig2` 426px. Su
// qualunque schermo dove 0.3*cw e' minore di questi (praticamente sempre —
// perfino un desktop panoramico da 1280px da' solo 384px di margine,
// MENO della larghezza di `tuto_bomb`), una fetta consistente dello
// sprite restava GIA' dentro l'area visibile fin dal frame 0 — e visto
// che ogni aereo ha anche un ritardo proprio prima di muoversi (`startT`,
// 0/0.2/0.4s: gli aerei non partono tutti insieme), quella fetta restava
// li' FERMA per quei primi frame, prima che il proprio `startT` scadesse
// e cominciasse a scorrere. Non bastava allargare il margine fisso (nessuna
// frazione unica di `cw` nasconde in modo affidabile sprite di larghezze
// diverse su schermi di larghezze diverse, dal telefono stretto al
// desktop panoramico): main.js ora calcola la posizione X in PIXEL veri,
// usando la vera larghezza dello sprite (`f.w`) letta dall'atlas — il
// bordo destro dello sprite parte esattamente a x=0 (zero pixel visibili)
// e il bordo sinistro finisce esattamente a x=cw (zero pixel visibili),
// qualunque siano sprite e schermo. Qui in tutorial.js resta solo il
// progresso normalizzato `k` (0..1, tempo puro): main.js lo traduce in
// pixel sapendo gia' quanto e' largo lo sprite che sta per disegnare.
const CUTSCENE_CLIMB_ANGLE = (18 * Math.PI) / 180;
export const CUTSCENE_CLIMB_TAN = Math.tan(CUTSCENE_CLIMB_ANGLE);

// [C] blacker1/Create.gml, letto riga per riga: 3 `bombar` a x=-170 fisso
// (lo stesso `spawnX` che il regista vero usa per questo tipo,
// threats.js/THREAT_TYPES.bombar) ma a TRE y fisse invece che a dado; 9
// `air` a x=-170 e y a dado — nessun override di posizione per questi, il
// range e' gia' lo stesso `spawnY` del regista vero ([380,1620]); 1 `dirig`
// a (200,1200), GIA' dentro la scena invece che fuori campo a sinistra
// come lo spawn normale di questo tipo (x=-1000) — entra "gia' in scena",
// non da fuori schermo.
const CUTSCENE_BOMBAR_Y = [400, 420, 1500];
const CUTSCENE_AIR_COUNT = 9;
const CUTSCENE_DIRIG_POS = { x: 200, y: 1200 };

/** La scena di combattimento della cutscene (vedi il commento sopra
 * CUTSCENE_PLANES_DURATION) — chiamata una sola volta, alla transizione
 * "planes"->"black1". `hasPlatform`: stesso booleano gia' passato dal
 * regista vero (main.js, `!!platformState`) al normale `spawnThreat()` —
 * la room "tutorial" ha una piattaforma vera (main.js, `platformState`
 * creato anche per lei, non solo per `match`), quindi gli `air` qui
 * possono nascere "di sfondo" esattamente come nel gioco vero. */
function spawnBattle(hasPlatform) {
  const list = [];
  for (const y of CUTSCENE_BOMBAR_Y) list.push(spawnThreat("bombar", hasPlatform, { x: -170, y }));
  for (let i = 0; i < CUTSCENE_AIR_COUNT; i++) list.push(spawnThreat("air", hasPlatform));
  list.push(spawnThreat("dirig", hasPlatform, CUTSCENE_DIRIG_POS));
  return list;
}

export function createCutscene() {
  const planes = CUTSCENE_PLANES.map((p) => ({ ...p, k: 0 }));
  return { phase: "planes", phaseT: 0, planes, spawnThreats: null, killDirig: false };
}

/** Avanza la cutscene di UN frame e ritorna `true` quando l'intera catena a
 * 4 fasi e' finita (main.js smette di disegnarla e riporta l'HUD del
 * tutorial) — vedi il commento sopra CUTSCENE_PLANES_DURATION per le fasi.
 * `cutscene.phase` (stringa, "planes"|"black1"|"battle"|"black2") e'
 * pubblico: main.js lo legge per decidere COSA disegnare in questo frame
 * (il sorvolo, lo schermo nero con quale logo, o niente sopra al mondo).
 * `cutscene.spawnThreats`/`cutscene.killDirig` sono azzerati ad OGNI
 * chiamata e valorizzati solo nel frame esatto della rispettiva
 * transizione — main.js li legge subito dopo aver chiamato questa funzione
 * (non restano "in coda": un frame dopo sono gia' tornati `null`/`false`).
 *
 * Durante la fase "planes" questa funzione aggiorna solo `p.k` (0..1, puro
 * progresso nel tempo) per ciascun aereo — NON piu' una posizione in pixel
 * o in frazione di schermo: main.js (che conosce la vera larghezza in
 * pixel dello sprite, letta dall'atlas) traduce `k` in una posizione reale
 * al momento di disegnare, vedi il commento su CUTSCENE_CLIMB_TAN sopra
 * per il perche'. `hasPlatform` (vedi spawnBattle() sopra) serve solo alla
 * transizione "planes"->"black1", quando nasce la battaglia.
 *
 * [Bug corretto, segnalato dall'autore: "gli aerei del tutorial iniziano
 * fermi poi si muovono"] `dt` qui e' quello VERO passato da main.js
 * (`cutsceneDt`, senza il tetto di 0.05s del `dt` usato dal resto della
 * simulazione — vedi il commento li'): un frame reale piu' lungo del
 * solito (tipico appena dopo il mount, mentre il browser carica ancora
 * le texture dell'atlas in GPU) avanza la cutscene della sua vera durata
 * invece che di soli 0.05s "di gioco", cosi' non sembra rallentare/
 * fermarsi proprio nell'istante in cui il framerate vero e' piu' basso. */
export function stepCutscene(cutscene, dt, hasPlatform = false) {
  cutscene.spawnThreats = null;
  cutscene.killDirig = false;
  cutscene.phaseT += dt;
  if (cutscene.phase === "planes") {
    for (const p of cutscene.planes) {
      p.k = Math.max(0, Math.min(1, (cutscene.phaseT - p.startT) / p.dur));
    }
    if (cutscene.phaseT >= CUTSCENE_PLANES_DURATION) {
      cutscene.phase = "black1";
      cutscene.phaseT = 0;
      cutscene.spawnThreats = spawnBattle(hasPlatform);
    }
  } else if (cutscene.phase === "black1") {
    if (cutscene.phaseT >= CUTSCENE_BLACK1_DURATION) { cutscene.phase = "battle"; cutscene.phaseT = 0; }
  } else if (cutscene.phase === "battle") {
    if (cutscene.phaseT >= CUTSCENE_BATTLE_DURATION) {
      cutscene.phase = "black2";
      cutscene.phaseT = 0;
      cutscene.killDirig = true;
    }
  } else if (cutscene.phase === "black2") {
    if (cutscene.phaseT >= CUTSCENE_BLACK2_DURATION) return true;
  }
  return false;
}
