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

De main page [index.html](https://berendnannes.github.io/Programmeerproject/index.html) 

