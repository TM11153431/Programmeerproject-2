function drawBar(data) {
	
	// set size
	var width = 1140;
	var height = 50;

	// initiate svg
	var svg = d3.select("#stackedBarContainer")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
	
	// define scales
	var color = d3.scale.category20();
	var x = d3.scale.linear()
		.range([0,width])
		.domain([0,1])
		
	// draw rects
	g = svg.append("g")
		.selectAll("rect")
		.data(data).enter().append("rect")
		.attr("x", function(d) {
			total = 0;
			i = data.indexOf(d); 
			while (i > 0) {
				i--;
				total += data[i].percentage;
			}
			return x(total); 		
		})
		.attr("y", 20)
		.attr("height", height-25)
		.attr("width", function(d) {return x(d.percentage); })
		.attr("fill", function(d) { return color(d.source); })
		.on("mouseover", function trans(d) {
            d3.select(this).transition().duration(300)
				.attr("height", height)
				.attr("y", 10);
			d3.select("[id='"+d.source+"']").transition().duration(300)
				.attr("bgcolor", color(d.source));
		})
        .on("mouseout", function(d) {
			d3.select(this).transition().duration(300)
				.attr("height", height-25)
				.attr("y", 20);
			d3.select("[id='"+d.source+"']").transition().duration(300)
				.attr("bgcolor", "white");
        });
		
	
}