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
d3.queue(2)
    .defer(function(url, callback) {
		d3.json(url, function(error, RDI) {
			if (error) throw error;
			// draw map function
			map(RDI);
		})
	}, "https://raw.githubusercontent.com/BerendNannes/Programmeerproject/master/Data/mapdata.json")
	.defer(function(url, callback) {
		d3.json(url, function(error, data) {
			if (error) throw error;
			// send to showInfo
			clickCallback = function(code, country, index) {
				showInfo(data[0][code], country, index);
			}
		}) 
	}, "https://raw.githubusercontent.com/BerendNannes/Programmeerproject/master/Data/piedata.json")
    .await(ready);
	
function ready(error) {
    if (error) throw error;
}


// create data map
function map(RDI) {
	
	// retrieve json data
	dataset = RDI[0];
	
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
function showInfo(data, country, index) {
	
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
		.html(index + "%");
		
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

