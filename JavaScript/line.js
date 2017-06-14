// draw line graph
function drawLine(data,code) {
	
	// remove old graph
	d3.select("#lineGraph").remove();
	
	// Set the dimensions of the canvas / graph
	var	margin = {top: 10, right: 30, bottom: 30, left: 30},
		width = 400 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;
	 
	// Set the ranges
	var	x = d3.scale.linear().range([0, width]);
	var	y = d3.scale.linear().range([height, 0]);

	 
	// Define the axes
	var	xAxis = d3.svg.axis().scale(x)
		.tickFormat(d3.format("d"));
	var	yAxis = d3.svg.axis().scale(y)
		.orient("left")
		.tickFormat(d3.format("d"));
	
	// Define the line
	var	valueline = d3.svg.line()
		.x(function(d) { return x(d.year); })
		.y(function(d) { return y(d.percentage); });

	// Adds the svg canvas
	var	svg = d3.select("#lineContainer")
		.append("svg")
			.attr("id", "lineGraph")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) {return d.year; }));
	y.domain([0.9*d3.min(data, function(d) { return d.percentage; }), d3.max(data, function(d) { return d.percentage; })]);
	
	// Add the valueline path.
	svg.append("path")	
		.attr("class", "line")
		.attr("stroke-width", "12")
		.attr("d", valueline(data));
	
	// Add the X Axis
	svg.append("g")		
		.attr("class", "axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
 
	// Add the Y Axis
	svg.append("g")		
		.attr("class", "axis")
		.call(yAxis)
	   .append("text")
		.attr("transform", "translate(15,120) rotate(-90)")
		.text("% renewable energy");
	
};