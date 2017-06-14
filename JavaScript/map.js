
// create data map
function map(countryData) {
	
	// retrieve json data
	dataset = countryData[0];
	
	// get min and max values
	var indexValues = Object.keys(dataset).map(function (key) { return dataset[key].percentage; } );
	var minIndex = Math.min.apply(null, indexValues);
	var maxIndex = Math.max.apply(null, indexValues);
	
	// set colors for scale
	var colors = ["#92ff8c","#097703"];
	
	// create color scale
	var paletteScale = d3.scale.linear()
		.domain([minIndex, maxIndex])
		.range(colors);
	
	// set fillColor to data points
	for (var i in dataset) {
		dataset[i].fillColor = paletteScale(dataset[i].percentage);
	}
	
	var map = new Datamap({
		// create data map
		element: document.getElementById('mapContainer'),
		height: 550,
		projection: "mercator",
		done: function(datamap) {
				datamap.svg.selectAll('.datamaps-subunit').on('click', function(geo) {
					var code = geo.id;
					clickCallback(code, geo.properties.name, dataset[code].percentage);
					});
			},	
		geographyConfig: {
			popupTemplate: function(geo, data) {
				
				// check if there's available data
				if (data) {output = data.percentage + "%";}
				else {output = "No data available";}
				
				// return hover info
				return ['<div class="hoverinfo"><strong>',
				geo.properties.name, '</strong></br>' , output,
				'</div>'].join('');
				},
				
			// style properties
			borderColor: 'black',
			borderWidth: 0.6,
			highlightFillColor: 'black',
			highlightBorderColor: 'black',
		},
		// set default fill color
		fills: {
			defaultFill: 'white'
		},
		// set data
		data: dataset
	});
	
	// add container for color scale
	var svg = d3.select("#barContainer")
		.append("svg")
		.attr("width", "300px")
		.attr("height", "30px")
	
	// create color gradient
	var grad = svg.append('defs')
		.append('linearGradient')
		.attr('id', 'grad')
		.attr('x1', '0%')
		.attr('x2', '100%')
		.attr('y1', '0%')
		.attr('y2', '0%');		
	grad.selectAll('stop')
		.data(colors)
		.enter()
		.append('stop')
		.style('stop-color', function(d){ return d; })
		.attr('offset', function(d,i){
		return 100 * (i / (colors.length - 1)) + '%';
		})

	
	// draw color bar
	var bar = svg.append("g");
	bar.append("rect")
		.attr('x', 0)
		.attr('y', 5)
		.attr('width', 300)
		.attr('height', 30)
		.style('fill', 'url(#grad)');	

	// add text to bar
	bar.append("text").text("0%")
		.attr("transform", "translate(10,23)")
		.attr("font-size","14px")
		.attr("font-weight","bold")
		.attr("fill", colors[1]);		
	bar.append("text").text("100%")
		.attr("transform", "translate(260,23)")
		.attr("font-size","14px")
		.attr("font-weight","bold")
		.attr("fill", colors[0]);
	
	
};