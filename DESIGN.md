# Design

De applicatie zal bestaan uit twee webpagina's:

### Data visualisatie

De data visualisatie pagina gaat bestaan uit de volgende onderdelen:

* Een interactieve wereldkaart (chloropleet) die het percentage geproduceerde groene energie t.o.v. van de totale energieproductie van elk land weergeeft. Daarvoor wordt een json-bestand met daarin voor elk land het percentage groene energie meegegeven aan de functie _map()_ , die met behulp van topoJSON een wereldkaart tekent .  Als een land aangeklikt wordt wordt met een callback functie naar andere datasets verwezen. Deze staan hieronder beschreven.
1. Een json-file met daarin voor elk land informatie over hoe de totale groene energieproductie is verdeeld over verschillende soorten groene energieproductie (zoals zonne- en windenergie) wordt gevisualiseerd door middel van een pie chart. Elke punt staat voor een andere energiebron.
2. Een json-file met waarin voor elk land voor elk jaar sinds 2000 het percentage geproduceerde groene energie staat geregistreed. Deze data wordt gevisualiseerd door middel van een lijngrafiek. Hierin is af te lezen of voor een bepaald land de groene energieproductie is toegenomen of afgenomen sinds de millenniumwisseling. 

### Main page

Op de main page wordt het onderwerp geïntroduceerd, er wordt uitgelegd hoe de visualisatie werkt en er worden een paar landen als voorbeeld besproken. Als toevoeging aan de introductie worden nog twee visualisaties weergegeven:

* Een lijngrafiek waarop te zien is hoe de productie van groene energie is toegenomen op aarde
* Een barchart waarin de top-10 producerende landen worden weergegeven, en de top-10 landen die het meest zijn toegenomen in de productie van groene energie