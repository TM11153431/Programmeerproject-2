/*
linkedviews.js
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
		.range(["#efedf5","#4d4675"]);
	
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
				if (data) {output = "RDI: " + data.percentage;}
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

// Stash the old values for transition.
function stash(d) {
	d.total = d.value;
	d.x0 = d.x;
	d.dx0 = d.dx;
}

// format big numbers
function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
