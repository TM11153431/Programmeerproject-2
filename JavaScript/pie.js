/*
pie.js
Programmeerproject
Berend Nannes
*/

function drawPie(data, country, index, code) {
	
	/** Creates a pie chart **/
	
	// remove old data
	d3.select("#countryContainer").html("");
	d3.select("#pie").remove();
	d3.select(".tooltip").remove();
	d3.select("#lineGraph").remove();
	
	// add country info
	var countryText = d3.select("#countryContainer")
	   .append("span")
		.style("font-size","25px")
		.style("font-weight","bold")
		.html(country+"<br/>")
		.attr("id","countryCode")
		.attr("value",code)
	   .append("span")
		.style("font-size","20px")
		.style("font-weight","normal")
		.style("align","right")
		.html("<div style='font-size:20px'><u><b>" + index + "%</b></u>" + "</div><div style='font-size:15px'>of this country's energy production is renewable energy</div>");
		
	// define div for tooltip
	var div = d3.select("#pieContainer").append("div")	
		.attr("class", "tooltip")
		.style("width", "170px")
		.style("height", "125px")
		.style("opacity", 1)
		.html("<div style='font-size: 18px'><b>Hover</b> <img src='doc/arrow-diagonal.png' alt='Click a country' height='30' width='30'><br> a slice to reveal exact percentage</div>");
		
	// set sizes for pie chart
	var width = 200,
		height = 300,
		radius = Math.min(width, height) / 2;
		
	var arc = d3.svg.arc()
	.innerRadius(radius - 100)
	.outerRadius(radius - 10);
		
	var arcOver = d3.svg.arc()
        .outerRadius(radius);

	var color = d3.scale.category20();

	// initiate pie layout
	var pie = d3.layout.pie()
		.value(function(d) { return d.percentage; })
		.sort(null);

	// create svg canvas
	var svg = d3.select("#pieContainer").append("svg")
		.attr("id", "pie")
		.attr("width", width)
		.attr("height", height)
	  .append("g")
		.attr("transform", "translate(" + width / 2 + "," + radius + ")");
	
	// link data
	var g = svg.selectAll(".arc")
		.data(pie(data))
	  .enter().append("g")
		.attr("class", "arc")
		.on("mouseover", function(d) {
			// grow slice
            d3.select(this).select("path").transition()
               .duration(200)
               .attr("d", arcOver);
			  // activate tooltip
			div.transition()		
				.duration(200)		
				.style("opacity",1);	
			div.html("<div style='font-size: 20px; color:"+ color(d.data.source) +";'><b>" + d.data.source + "</b></div><div style='font-size:15px'> provides <b><u>"
				+ (d.data.percentage*100).toFixed(2)+ "% </b></u> of the total renewable energy production." + "</div><br/>");
        })
        .on("mouseout", function(d) {
			// shrink slice
            d3.select(this).select("path").transition()
               .duration(100)
               .attr("d", arc);
        });

	
	// set legend categories
	g.append("path")
		.attr("d", arc)
		.attr("data-legend", function(d) { return d.data.source; })
		.attr("data-legend-pos", function(d, i) { return i; })
		.style("fill", function(d) { return color(d.data.source); });

	// draw legend
	var padding = 20,
	legx = radius + padding,
	legend = svg.append("g")
	.attr("class", "legend")
	.attr("transform", "translate(-30, 120)")
	.style("font-size", "12px")
	.call(d3.legend);
	
	if (window.location.href.indexOf("infopage") > -1) {
		/** go to line graph (if on infopage) **/
		lineCallback(code)
	}

};