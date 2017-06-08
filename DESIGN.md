# Design

De applicatie zal bestaan uit twee webpagina's:

### Data visualisatie

De data visualisatie pagina gaat bestaan uit de volgende onderdelen:

* Een interactieve wereldkaart (chloropleet) die het percentage geproduceerde groene energie t.o.v. van de totale energieproductie van elk land weergeeft. Daarvoor wordt een json-bestand met daarin voor elk land het percentage groene energie meegegeven aan de functie _map()_ , die met behulp van topoJSON een wereldkaart tekent .  Als een land aangeklikt wordt wordt met een callback functie naar andere datasets verwezen. Deze staan hieronder beschreven.
* 1. Een json-file met daarin voor elk land informatie over hoe de totale groene energieproductie is verdeeld over verschillende soorten groene energieproductie (zoals zonne- en windenergie) wordt gevisualiseerd door middel van een pie chart. Elke punt staat voor een andere energiebron.
* 2. Een json-file met waarin voor elk land voor elk jaar sinds 2000 het  percentage geproduceerde groene staat geregistreed. Deze data wordt gevisualiseerd door middel van een lijngrafiek. Hierin is af te lezen of voor een bepaald land de groene energieproductie is toegenomen of afgenomen sinds de millenniumwisseling. 

