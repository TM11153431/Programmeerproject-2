/*
barchart.js
Programmeerproject
Berend Nannes
*/	

function filterData(data) {
	
	/** Create top-10 renewable energy producing countries and the top-10 increasing countries **/
	
	// define arrays
	var topValues = []
	var topIncreases = []
	
	var topCountries = []
	var topRisers = []
	
	countries = Object.keys(data)	
	
	// check for each country if it belongs in the top10
	for (s of countries) {
		
		// get percentage and increase
		percentage = data[s][data[s].length-1].percentage;
		if (data[s][0].percentage > 0) {increase = ((percentage - data[s][0].percentage) / data[s][0].percentage)*100;}
		else {increase = 0};

		if (topValues.length < 10) {
			// create top-10
			topValues.push(percentage); 
			topIncreases.push(increase);
			topCountries.push({"country":s, "value":percentage});
			topRisers.push({"country":s, "value":increase});
		}
		else {
			// check if value is better than the worst top-10 candidate
			minimumPercentage = Math.min.apply(null, topValues);
			minimumIncrease = Math.min.apply(null, topIncreases);
			if (percentage > minimumPercentage) {		
				for (var i = 0; i < topCountries.length; i++) {					
					if (topCountries[i].value === minimumPercentage) {
						// add to top-10
						replace(topValues, i, percentage);
						replace(topCountries, i, {"country":s, "value":percentage})
					}				
				}
			}			
			if (increase > minimumIncrease) {			
				for (var i = 0; i < topRisers.length; i++) {					
					if (topRisers[i].value === minimumIncrease) {
						// add to top-10
						replace(topIncreases, i, increase);
						replace(topRisers, i, {"country":s, "value":increase})
					}				
				}
			}
		}
	}
	// sort descending
	topCountries.sort(compare)
	topRisers.sort(compare)
	
	// create default barchart
	drawBarchart(topRisers);
	
	// radio button functionality
	d3.selectAll("input").on("change", function change() {
		var value = this.value;
		if (value == "risers") {drawBarchart(topRisers);}
		else {drawBarchart(topCountries)};
	});
}

function drawBarchart(data) {
	/** creates barchart **/
	
	// remove old data
	d3.select(".chart").remove();
	d3.select(".barTool").remove();
	
	// define div for tooltip
	var div = d3.select("#barchartContainer").append("div")	
		.attr("class", "barTool")
		.style("display", "none")
		.style("opacity", 1);
		
	// set margins
	var margin = {top: 30, right: 50, bottom: 60, left: 60},
		width = 500 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;
	
	// set x and y scales
	var x = d3.scale.ordinal()
		.rangeBands([0, width], .1)
		.domain(data.map(function(d) { return d.country; }));
	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(data, function(d) { return d.value; })]);
	
	// define axes
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");
	
	// set svg element
	var chart = d3.select("#barchartContainer")
	   .append("svg")
		.attr("class","chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	   .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	var barWidth = width / data.length;

	// draw axes
	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);		
	chart.append("g")
		.attr("class", "y axis")
		.call(yAxis)

	// draw bars
	 chart.selectAll(".bar")
		.data(data)
	   .enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.country); })
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.attr("width", x.rangeBand())
		.on("mouseover", function(d) {
			div.html("<b>"+ countryName(d.country)+ "</b><br>"+ Math.round(d.value) + "%" +"</div><br/>")
			.style("display", "inline")
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY) + "px");
			})
		.on("mouseout", function(d) {div.style("display", "none")});
		

}

function countryName(id) {
	/** get the name of a country given the ISO-3 code **/
	var countries = Datamap.prototype.worldTopo.objects.world.geometries;
	for (var i = 0, j = countries.length; i < j; i++) {
	if (id == countries[i].id) {return countries[i].properties.name};
	}
}

function replace(array, index, newObject) {
	/** replaces and array element **/
	array.splice(index, 1);
	array.push(newObject);
}

function compare(a,b) {
	/** compare function for sorting (descending) **/
  if (a.value > b.value)
    return -1;
  if (a.value < b.value)
    return 1;
  return 0;
}