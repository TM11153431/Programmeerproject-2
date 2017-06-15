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
		
	// focus lines or crosshair
	var focus = svg.append('g').style('display', 'none');		
	focus.append('line')
		.attr('id', 'focusLineX')
		.attr('class', 'focusLine')
		.attr('stroke-dasharray', '5, 5');
	focus.append('line')
		.attr('id', 'focusLineY')
		.attr('class', 'focusLine')
		.attr('stroke-dasharray', '5, 5');
	focus.append('circle')
		.attr('id', 'focusCircle')
		.attr('r', 2)
		.attr('class', 'circle focusCircle');
	focus.append("text")
		.attr("id","focusText");
		
	
	// bisector to return index of mouse position
	var bisectDate = d3.bisector(function(d) { return d.year; }).left;
	
	// overlay for crosshairs
	svg.append('rect')
		.attr('class', 'overlay')
		.attr('width', width)
		.attr('height', height)
		.on('mouseover', function() { focus.style('display', null); })
		.on('mouseout', function() { focus.style('display', 'none'); })
		.on('mousemove', function() { 
			var mouse = d3.mouse(this);
			var mouseDate = x.invert(mouse[0]);
			var i = bisectDate(data, mouseDate);
			
			var d0 = data[i - 1].year
            var d1 = data[i].year;
			var d = mouseDate - d0[0] > d1[0] - mouseDate ? i : i-1;		
			
			var x_val = x(data[d].year);
            var y_val = y(data[d].percentage);
			

			focus.select('#focusLineX')
				.attr('x1', x_val).attr('y1', 0)
				.attr('x2', x_val).attr('y2', height);
			focus.select('#focusLineY')
				.attr('x1', 0).attr('y1', y_val)
				.attr('x2', width).attr('y2', y_val);
			focus.select('#focusCircle')
				.attr('cx', x_val)
				.attr('cy', y_val);
			focus.select("#focusText")
				.attr('x', x_val)
				.attr('y', y_val)
				.text(data[d].percentage + "%");
		});
	
};