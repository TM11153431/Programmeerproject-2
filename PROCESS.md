# Processbook

### Week 1, dinsdag:

Introductie gevolgd en gebrainstormd over een onderwerp voor de visualisatie.
Uiteindelijk besloten om groene energie als onderwerp te kiezen met een datamap, pie chart en line graph.
Gezocht op internet voor bijpassende data. Uiteindelijk data gevonden voor groene energieproductie voor alle landen en een andere dataset over verschillende soorten groene energie.
Vervolgens proposal geschreven.

### Week 1, woensdag:

Alle data bij elkaar gezocht en geherstructureerd. Alles in json-format gezet. Voorbeelden opgezocht voor geschikte D3 visualisaties. In de middag moest ik naar de tandarts...

### Week 1, donderdag:

Webpagina en de eerste drie visualisaties opgezet: Datamap, pie chart, line graph; en deze gekoppeld aan de data.
Hiervoor mede gekeken naar eerdere (eigen) projecten voor inspiratie.
De visualisaties zijn al interactief, maar het ontbreekt nog aan goede legenda's en tooltips.
Design document geschreven. 

### Week 1, vrijdag:

Vandaag moest ik werken, dus kon ik helaas niet mijn product presenteren of daar verder aan werken.

### Week 2, maandag:

Legenda en tooltip toegevoegd aan de pie chart. Bij mouseover wordt nu de exacte data van een taartpunt weergegeven. 
Indeling van de webpagina aangepast. Ook een schaal toegevoegd voor de wereldkaart chloropleet voor extra duidelijkheid.

### Week 2, dinsdag:

Better code hub gekoppeld aan mijn repository. Begonnen met de mainpage: stukje storytelling toegevoegd over verschillende soorten duurzame energie.
Verder gezorgd dat bij het laden van de data visualisatie standaard de data van Nederland wordt weergegeven zodat er geen lege plek staat.

### Week 2 woensdag:

Mainpage storytelling aangepast. Een enkele interactieve stacked bar toegevoegd om de verschillende soorten groene energie weer te geven.
De legenda van de datamap verder verbeterd met uitleg. Javascript verdeeld in meerdere kleine bestanden om het overzicht te houden.
Bij de datavisualisatie aanwijzingen met pijltjes gemaakt om het gebruiksvriendelijker te maken.

### Week 2 donderdag:

Line graph interactief gemaakt met behulp van crosshairs. Tooltip voor de pie chart geeft als default een aanwijzing om te hoveren over de taartpunten.
Begonnen met het idee om een barchart met de top 10 producerende of stijgende landen te maken. Hiervoor moet de data gefilterd worden; best lastig in json.

### Week 2, vrijdag:

In de vrijdagpresentatie de voortgang gepresenteerd en feedback ontvangen.

### Week 3, maandag:

Eerste opzet van de barchart gemaakt. Een script geschreven waarin de data gefilterd wordt tot de 10 meest producerende landen en
de top 10 meest gestegen landen. Tussen de twee barcharts kan geswitcht worden door middel van radio buttons.

### Week 3, dinsdag:

De barchart voozien van hover-info. Bij mouseover moeten de bars informatie geven (land, exacte percentage). Omdat de data alleen
voorzien is van de landcode moest er een fuctie geschreven worden waarin de naam van het land wordt gekoppeld aan de landcode. 
Hiervoor is informatie uit de library van de datamap gebruikt. 

### Week 3, woensdag:

De indeling van de webpagina veranderd zodat de inhoud gecentreerd is, hiervoor moest een aantal elementen in grootte aangepast worden. 
Aan de mainpage een extra stukje storytelling toegevoegd in de vorm van "honourable mentions", waarin twee landen uitgelicht worden.
Begonnen met nadenken over het implementeren van een slider waarin de datamap chloropleet aangepast wordt aan het jaar.
Hiervoor ook de structuur van de json-data voor de map aangepast.

### Week 3, woensdag:

Slider geïmplementeerd. Als er naar een bepaald jaar gesleept wordt wordt een callback functie geactiveerd waarin de datamap met 
de nieuwe date geladen wordt. Omdat de verschillen in percentages van 2000 tot 2014 per land niet heel groot zijn zie je weinig
kleurverschil optreden in de kaart bij het sliden. Extra interactiviteit is dus gewenst.

### Week 3, donderdag:

Bij de slider moest een tooltip toegevoegd worden om te laten zijn welk jaar geselecteerd is. Het idee is om alleen
het geselecteerde jaar te zien is, zodat er geen overbodige informatie zichtbaar is. Vooral het positioneren van de tooltip bleek lastig.

### Week 3, vrijdag: 

In de vrijdagpresentatie de voortgang gepresenteerd en feedback ontvangen.

### Week 4, maandag:

Vandaag was ik ziek. Ik heb thuis wel kunnen werken aan het opschonen van mijn code.

### Week 4, dinsdag:
Positie van de timeslider tooltip aangepast zodat deze relatief is (t.o.v. de slider zelf). Extra functionaliteit toegevoegd aan de slider.
Bij het sliden is er nu een focuspunt in de lijngrafiek die mee beweegt als het jaar aangepast wordt. Stacked bar op de infopage aangepast
zodat deze ook exacte percentages laat zien bij mouseover. Code verder opgeschoond en verduidelijkt. 