# Programmeerproject

Link to project: [index.html](https://berendnannes.github.io/Programmeerproject/index.html)
[![BCH compliance](https://bettercodehub.com/edge/badge/BerendNannes/Programmeerproject?branch=master)](https://bettercodehub.com/)

Het doel van dit project is om te laten zien hoe het er in de wereld voor staat met de productie van groene energie. Wordt er veel groene energie geproduceerd vergeleken met andere vormen van energie? Neemt dit toe of af? Om dit te beantwoorden wordt een interactieve wereldkaart gevisualiseerd waarop voor verschillende landen te zien is welk deel van hun totale energieproductie uit groene energie bestaat. Bij het klikken op een land wordt in kaart gebracht hoe groot de bijdrage is van verschillende soorten groene energie (zoals zonne- of windenergie) en hoeveel groene energie er in de afgelopen 15 jaar geproduceerd is ten opzichte van de totale energieproductie. Op de voorpagina moet een overzicht getoond worden waarin er en overzicht is voor de hele wereld..

De visualisatie bestaat dus uit twee pagina's:

### Mainpage (index.html)

![](doc/proposal_1.jpg =250)

1. ***Navigatie*** om te schakelen tussen de twee pagina's

2. ***Introductie***. Hierin wordt het onderwerp en het doel van de visualisatie geïntroduceerd.

3. ***Stacked bar***. In de horizontal stacked bar representeren de afzonderlijke bars verschillende soorten groene energie. Hoe groter de bar, hoe groter de bijdrage aan de totale groene energieproductie.
Bij mouseover zal de bar gehighlight worden en zal er informatie verschijnen over die energiebron.

4. ***Lijngrafiek***. In de lijngrafiek is weergegeven hoe de groene energieproductie in de wereld sinds 2000 is toegenomen (of afgenomen).

5. ***Barchart***. In de barchart staat een top 10 van landen weergegeven. Door middel van radio buttons kan gekozen worden welke top 10: de tien landen die het meeste groene energie produceren of de tien landen
die sinds het jaar 2000 het meest zijn gestegen in groene energieproductie.

6. ***Extra storytelling***. waarin informatie wordt gegeven over twee landen die opvallend veel groene energie produceren.

### Data visualisaties (infopage.html)

![](doc/proposal_2.jpg =250)

1. ***Navigatie*** om te schakelen tussen de twee pagina's

2. ***Wereldkaart***. Een chloropleet waarin de kleur van een land het percentage groene energie t.o.v. de totale energie productie weergeeft (hoe groener, hoe meer). Onder de kaart staat een legenda en aan de linkerkant
staat een timeslider waarmee geschovenvkan worden tussen de jaren 2000 tot en met 2014. De kleuren op de wereldkaart veranderen dan mee. Als op een land geklikt wordt wordt extra informatie zichtbaar aan de rechterkant.

3. ***Pie chart***. Een taartdiagram die wordt geactiveerd als een land geselecteerd is. De verschillende taartpunten geven de bijdrage van een bepaalde groene energiebron aan de totale groene energieproductie weer.
Als je met de muis over een taartpunt hovert wordt duidelijk om welke energiebron het gaat en wat de precieze bijdrage in procent is.

4. ***Lijngrafiek***. In de lijngrafiek is weergegeven hoe de groene energieproductie in het geselecteerde land is geëvolueerd sinds het jaar 2000. Als je met de muis in de grafiek gaat staan wordt een crosshair zichtbaar
waarmee je van punten in de grafiek de precieze data kan zien. De grafiek bevat ook een focus cirkel die het geselecteerde jaar aangeeft. Deze cirkel beweegt mee met de timeslider.

Over energie en milieu worden veel visualizaties gemaakt met behulp van een wereldkaart, maar die belichten vaak maar één aspect tegelijk. De bedoeling van dit project is om op één scherm meerdere aspecten van één onderwerp, groene energie, uit te lichten.