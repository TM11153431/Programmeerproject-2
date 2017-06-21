function filterData(data) {
	/** Create top-10 renewable energy producing countries and the top-10 increasing countries **/
	
	var topValues = []
	var topIncreases = []
	
	var topCountries = []
	var topRisers = []
	
	countries = Object.keys(data)	
	
	for (s of countries) {
		
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
	topCountries.sort(compare)
	topRisers.sort(compare)
	
	drawBarchart(topRisers);
	
	d3.selectAll("input").on("change", function change() {
		var value = this.value;
		if (value == "risers") {drawBarchart(topRisers);}
		else {drawBarchart(topCountries)};
	})
	.transition()
        .duration(1000);
}

function drawBarchart(data) {
	
	// remove old data
	d3.select(".chart").remove();
	d3.select(".barTool").remove();
	
	// define div for tooltip
	var div = d3.select("#barchartContainer").append("div")	
		.attr("class", "barTool")
		.style("width", "300px")
		.style("height", "125px")
		.style("opacity", 1);
		
		
	var margin = {top: 30, right: 30, bottom: 60, left: 60},
		width = 500 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;
	
		
	var x = d3.scale.ordinal()
		.rangeBands([0, width], .1)
		.domain(data.map(function(d) { return d.country; }));

	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(data, function(d) { return d.value; })]);
		
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");
		
	var chart = d3.select("#barchartContainer")
	   .append("svg")
		.attr("class","chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	   .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	var barWidth = width / data.length;

	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
		
	chart.append("g")
		.attr("class", "y axis")
		.call(yAxis)

	 chart.selectAll(".bar")
		.data(data)
	   .enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.country); })
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.attr("width", x.rangeBand())
		.on('mouseover', function(d) {
			div.html("<div><b>"+ countryName(d.country)+ "</b><br>"+ Math.round(d.value) + "%" +"</div><br/>");
			})
		;
		

}

function countryName(id) {
	var countries = Datamap.prototype.worldTopo.objects.world.geometries;
	for (var i = 0, j = countries.length; i < j; i++) {
	if (id == countries[i].id) {return countries[i].properties.name};
	}
}


function replace(array, index, newObject) {
	array.splice(index, 1);
	array.push(newObject);
}

function compare(a,b) {
  if (a.value > b.value)
    return -1;
  if (a.value < b.value)
    return 1;
  return 0;
}