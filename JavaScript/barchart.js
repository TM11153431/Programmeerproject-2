function barChart(data) {
	
	var maxProducer = 0
	var maxRiser = ""
	
	countries = Object.keys(data)
	
	console.log(countries)
	
	for (s of countries) {
		console.log(s, data[s]);
	}
	
}