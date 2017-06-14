/*
info.js
Programmeerproject
Berend Nannes
*/		


// que json files
d3.queue(3)
    .defer(function(url, callback) {
		d3.json(url, function(error, countryData) {
			if (error) throw error;
			// draw the data map
			map(countryData);
			// show default info
			setTimeout(function(){clickCallback("NLD", "Netherlands", "4.72");}, 100);
		})
	}, "https://raw.githubusercontent.com/BerendNannes/Programmeerproject/master/Data/mapdata.json")
	.defer(function(url, callback) {
		d3.json(url, function(error, data) {
			if (error) throw error;
			// send to pie chart
			clickCallback = function(code, country, index) {
				drawPie(data[0][code], country, index, code);
			}
		}) 
	}, "https://raw.githubusercontent.com/BerendNannes/Programmeerproject/master/Data/piedata.json")
	.defer(function(url, callback) {
		d3.json(url, function(error, data) {
			if (error) throw error;
			// send to line graph
			lineCallback = function(code) {
				drawLine(data[0][code], code);
			}
		}) 
	}, "https://raw.githubusercontent.com/BerendNannes/Programmeerproject/master/Data/linedata.json")
    .await(ready);
	
function ready(error, data) {
    if (error) throw error;
}


