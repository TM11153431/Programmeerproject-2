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
				if (window.location.href.indexOf("infopage") > -1){
				// draw the data map if on "infopage"
				map(countryData, "2014");
				// show default info
				setTimeout(function(){clickCallback("NLD", "Netherlands", "4.72");}, 500);
				slideCallback = function(year) {
					// activated by time slider
					d3.select("#yearContainer").html(year)
					//calculate position of year text
					.style("bottom", (278 - (2014-year)*(175/15)) + "px");
					// draw map for that year
					map(countryData, year);
					var country = document.getElementById("countryCode").getAttribute("value");;
					lineCallback(country);
				}
			}
		})
	}, "https://raw.githubusercontent.com/BerendNannes/Programmeerproject/master/Data/newmapdata.json")
	.defer(function(url, callback) {
		d3.json(url, function(error, data) {
			if (error) throw error;
			// if on index.html - draw stacked bar
			if (window.location.href.indexOf("index") > -1){
				drawBar(data[0]["WLD"])
			}
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
				if (window.location.href.indexOf("index") > -1){
					filterData(data[0]);
				}
			}
		}) 
	}, "https://raw.githubusercontent.com/BerendNannes/Programmeerproject/master/Data/linedata.json")
    .await(ready);
	
function ready(error, data) {
    if (error) throw error;
}


