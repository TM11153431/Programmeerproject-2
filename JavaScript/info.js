/*
info.js
Programmeerproject
Berend Nannes
*/

// set default data
var defaultData = [{
	name: "flare",
	children: [{
		name: "Nonreligious",
		size: 1
	}]
}]			


// que json files
d3.queue(3)
    .defer(function(url, callback) {
		d3.json(url, function(error, countryData) {
			if (error) throw error;
			// draw map function
			map(countryData);
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
	
function ready(error) {
    if (error) throw error;
}


// create data map
function map(countryData) {
	
	// retrieve json data
	dataset = countryData[0];
	
	// get min and max values
	var indexValues = Object.keys(dataset).map(function (key) { return dataset[key].percentage; } );
	var minIndex = Math.min.apply(null, indexValues);
	var maxIndex = Math.max.apply(null, indexValues);
	
	// create color scale
	var paletteScale = d3.scale.linear()
		.domain([minIndex, maxIndex])
		.range(["#92ff8c","#097703"]);
	
	// set fillColor to data points
	for (var i in dataset) {
		dataset[i].fillColor = paletteScale(dataset[i].percentage);
	}
	
	var map = new Datamap({
		// create data map
		element: document.getElementById('mapContainer'),
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
};


// show info when country is clicked
function drawPie(data, country, index, code) {
	
	// remove old data
	d3.select("#countryContainer").html("");
	d3.select("#pie").remove();
	
	// add country info
	var countryText = d3.select("#countryContainer")
	   .append("span")
		.style("font-size","25px")
		.style("font-weight","bold")
		.html(country+"<br/>")
	   .append("span")
		.style("font-size","20px")
		.style("font-weight","normal")
		.style("align","right")
		.html("<div style='font-size:20px'>" + index + "%" + "</div><div style='font-size:15px'>of this country's energy production is renewable energy</div>");
		
	// create pie chart
	
	var width = 200,
		height = 180,
		radius = Math.min(width, height) / 2;

	var color = d3.scale.category20();

	var pie = d3.layout.pie()
		.value(function(d) { return d.percentage; })
		.sort(null);

	var arc = d3.svg.arc()
		.innerRadius(radius - 100)
		.outerRadius(radius - 10);
		
	var arcOver = d3.svg.arc()
        .outerRadius(radius);

	var svg = d3.select("#pieContainer").append("svg")
		.attr("id", "pie")
		.attr("width", width)
		.attr("height", height)
	  .append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	var g = svg.selectAll(".arc")
		.data(pie(data))
	  .enter().append("g")
		.attr("class", "arc")
		.on("mouseover", function(d) {
            d3.select(this).select("path").transition()
               .duration(100)
               .attr("d", arcOver);
        })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
               .duration(100)
               .attr("d", arc);
        });
		
	g.append("path")
		.attr("d", arc)
		.style("fill", function(d) { return color(d.data.source); });
	
	/**
	g.append("text")
		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.text(function(d) { return d.data.source; });
	**/
	
	lineCallback(code)
};

// draw line graph
function drawLine(data,code) {
	
	console.log(data)
	
	// remove old graph
	d3.select("#lineGraph").remove();
	
	// Set the dimensions of the canvas / graph
	var	margin = {top: 10, right: 30, bottom: 30, left: 20},
		width = 400 - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;

	 
	// Set the ranges
	var	x = d3.scale.linear().range([0, width]);
	var	y = d3.scale.linear().range([height, 0]);
	 
	// Define the axes
	var	xAxis = d3.svg.axis().scale(x);
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
	y.domain([0, d3.max(data, function(d) { return d.percentage; })]);
	
	// Add the valueline path.
	svg.append("path")	
		.attr("class", "line")
		.attr("d", valueline(data));
	
	// Add the X Axis
	svg.append("g")		
		.attr("class", "axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
 
	// Add the Y Axis
	svg.append("g")		
		.attr("class", "axis")
		.call(yAxis);
	
};

// Stash the old values for transition.
function stash(d) {
	d.total = d.value;
	d.x0 = d.x;
	d.dx0 = d.dx;
};

// format big numbers
function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

