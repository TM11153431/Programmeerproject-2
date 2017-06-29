# Report

Deze visualisatie gaat over duurzame (groene) energie. Het doel van het project is om een overzicht te geven over hoeveel duurzame energie wordt geproduceerd in vergelijking met de totale energieproductie. Verder moet duidelijk worden welke soorten
groene energie voornamelijk een bijdrage leveren aan de totale groene energieproductie. Daarnaast geeft de visualisatie inzicht over of de groene energieproductie in de wereld en in de afzonderlijke landen is toegenomen of afgenomen.

<img src="doc/project_screenshot.jpg" alt="infopage" style="width: 200px;"/>

### Technical design

De code bestaat uit de volgende scripts:
* **loaddata.js**. Om de data in te laden
* **map.js**. Voor de wereldkaart chloropleet
* **pie.js**. Voor de pie chart
* **line.js**. Voor de line graph
* **stackedbar.js**. Voor de stacked barchart
* **barchart.js**. Voor de top-10 barchart
* **d3.legend.js**. Voor een legenda (extern)

De data bestaat uit een ten eerste een json-file met daarin voor elk jaar voor elk land het percentage groene energie t.o.v. de totale energieproductie. Deze data staat in twee verschillende structuren: per land en per jaar, bedoeld voor
respectievelijk de datamap en de lijngrafiek. Verder is er data per land voor de bijdrage van de verschillende energiebronnen aan de totale energieproductie. De data wordt ingeladen in **loaddata.js** d.m.v. een queue. Elk onderdeel van de queue bevat een verschillende
dataset met zijn eigen callback functie, zodat elke dataset op ieder moment aangeroepen kan worden.

Op de pagina [infopage.html](https://berendnannes.github.io/Programmeerproject/infopage.html) wordt de functie _map()_ in **map.js** uitgevoerd.
Daarin wordt de wereldkaart gevisualiseerd (sourcecode: [datamaps.github.io](http://datamaps.github.io/)). De kleur in de chloropleet is een gradient
waarin de kleur van het land gekoppeld is aan het percentage groene energie dat in dat land is produceerd (in 2014). Die zelfde gradient wordt gebruikt om
de legende onder de kaart te tekenen. Bij mouseover wordt het percentage van het land weergegeven in een tooltip. Een onclick functie zorgt
ervoor dat als er op een land geklikt wordt, de functie _clickCallback()_ wordt geactiveerd die is gedefiniëerd in de queue en toegang
verleent aan de data voor de verschillende energiebronnen. In deze callback wordt vervolgens de functie _drawPie()_ uitgevoerd in **pie.js**.

De functie _drawPie()_ maakt een pie chart waarin elke taartpunt een groene energiebron representeert. De grootte van de taartpunt staat voor
de bijdrage van die energiebron aan de totale energieproductie. De pie chart is uitgerust met een legenda, waarvan de sourcecode in
**d3.legend.js** is geïmplementeerd (dit heb ik niet zelf geschreven). Bij mouseover wordt een taartpunt ge-highlight en verschijnt er een
tooltip waarin duidelijk wordt om welke energiebron het gaat en wat de bijdrage van die bron aan de totale groene energieproductie is.

Zodra de pie chart getekend is wordt gelijk de callback functie _lineCallback()_ geactiveerd in **line.js**, die naar de data voor de lijngrafiek springt in
de queue. Daarin wordt vervolgens de functie _drawLine()_ uitgevoerd, die ervoor zorgt dat er een lijngrafiek getekend wordt die laat zien hoe
de groene energieproductie in dat land is toe- of afgenomen. Bovendien is ervoor gezorgd dat als je met de muis in de grafiek gaat staan een
crosshair zichtbaar wordt zodat je van elk punt in de grafiek de precieze data kan aflezen. Verder is er een groene focus cirkel in de grafiek die het jaar aangeeft.

De pagina is voorzien van een timeslider (input type=range html element) waarmee je kan schakelen tussen de jaren 2000-2014. Zodra er wordt
geschoven tussen jaren wordt de functie _slideCallback()_ geactiveerd. Dan wordt opnieuw de functie _map()_ uitgevoerd met de data voor het geslecteerde jaar.
Daarnaast wordt ook de functie _drawLine()_ weer aangeroepen zodat de focus cirkel zich aanpast aan het jaar dat geselecteerd is.

De main page [index.html](https://berendnannes.github.io/Programmeerproject/index.html) is bedoel om het onderwerp te introduceren en om een overzicht voor
de hele wereld te laten zien. Om de bijdrage van verschillene vormen van energie aan de globale groene energieproductie weer te geven wordt in **stackedbar.js**
met de functie _drawBar()_ een horizontale stacked bar getekend waarin de afzonderlijke bars de bijdrage van de verschillende energiebronnen weergeven. Bij mouseover
wordt de bar gehightlight en licht de bijbehorende cel met uitleg over die energiebron in de bovenstaande tabel op. Verder wordt dan het exacte percentage weergegeven.

Daar onder staan nog twee visualisaties: Ten eerste weer een lijngrafiek; dit keer met de data voor de hele wereld, zodat je kan zien of de groene energieproductie
in de wereld is toegenomen of juist afgenomen. Daarnaast staat een barchart waarin een top 10 is gevisualiseerd. Daarin zijn twee verschillende keuze's die je kan
maken met behulp van een radio button: de top-10 landen die het meest groene energie produceren, of de top-10 landen die het meest zijn gestegen in
de productie van groene energie. In de functie _filterData()_ in **barchart.js** worden eerst beide top-10's aangemaakt door te loopen over alle landen en telkens
de beste 10 te behouden. Verder wordt daarin bijgehouden of de keuze wordt aangepast met de radio buttons. Vervolgens wordt in de functie _drawBarchart()_ de barchart
getekend. De barchart is uitgerust met een tooltip die bij mouseover de naam van het land en het percentage laat zien.

### Challenges

In eerste instatie was het mijn bedoeling om al mijn visualisaties op één pagina te combineren. Gezien het feit dat het belangrijk is om een storytelling
aspect erbij te hebben heb ik later besloten dat ik twee verschillende pagina's moest hebben. Uiteindelijk ben ik blij met dit besluit omdat er nu een 
duidelijke tweedeling is: op de mainpage storytelling en overzicht, en op de andere pagina datavisualisaties van alle landen. Er is een oplossing denkbaar waarbij
je één grote pagina maakt waarin je kan scrollen, maar deze manier lijkt mij een stuk overzichtelijker.

Het was niet vanaf het begin af aan mijn plan om een timeslider te maken, omdat ik data uit voorgaande jaren ook al heb gevisualiseerd in line graphs. Uiteindelijk
heb ik toch de keuze gemaakt om dit wel te doen; ik had de data immers tot mijn beschikking, dus het leek zonde om dit niet te doen. Toen ik de slider eenmaal
geïmplementeerd had was het effect op de datamap minimaal: de verschillen tussen de jaren waren klein t.o.v. de totale kleurenschaal. Toen heb ik besloten om de
slider ook te koppelen aan de lijngrafiek door middel van een focus cirkel die meebeweegt met het gekozen jaar. Zo is er toch etra interactiviteit en is het 
effect van de slider beter zichtbaar. Ik ben blij met de keuze om toch een timeslider toe te voegen, omdat je tijdens het programmeren ook weer op nieuwe ideeën komt.

Als ik meer tijd zou hebben zou ik toch een aantal dingen anders willen doen. In mijn implementatie wordt elke keer als een slider of button wordt versleept of
aangeklikt een functie uitgevoerd die een bepaalde visualisatie opnieuw tekent. De volledige visualisatie wordt verwijderd en opnieuw aangemaakt. Het lijkt me
mooier om de container te behouden en alleen de data aan te passen. Dit zou sneller gaan en bovendien zou je dit vloeiend kunnen laten verlopen met behulp
van een transition. Ik heb besloten dit niet tijdens het project aan te passen, maar om vast te houden aan mijn huidige techniek. Voor volgende keer weet ik dat
ik dat dus anders zou willen aanpakken.

