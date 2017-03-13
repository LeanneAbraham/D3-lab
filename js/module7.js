//execute script when window is loaded
window.onload = function() {
	//svg dimension variables
	var w = 1200,
		h = 600
		//get the <body> element from the DOM
	var container = d3.select("body")
		//put a new svg in the body
		.append("svg")
		//assign the width
		.attr("width", w)
		//assign the height
		.attr("height", h)
		//always assign a class (as the block name) for styling and future selection
		.attr("class", "container");
	//create rectangle inside of the svg
	var innerRect = container.append("rect")
		//rectangle width
		.attr("width", (w-60))
		//rectangle height
		.attr("height", (h-60))
    .attr("x", 50)
    .attr("y", 50)
    .attr("class", "square")
  //put city data into an array to feed into data
  var cityPop = [
		{city: 'Madison, WI', population: 233209},
		{city: 'Milwaukee, WI', population: 594833},
		{city: 'Green Bay, WI', population: 104057},
		{city: 'Superior, WI', population: 27244},
		{city: 'Washington, DC', population: 658893},
		{city: 'Wheaton, MD', population: 48284},
		{city: 'Syracuse, NY', population: 144669},
		{city: 'Middletown, DE', population: 19600}
		];
		//find the minimum value of the array
	  var minPop = d3.min(cityPop, function(d){
	      return d.population;
	      });
	  //find the maximum value of the array
	  var maxPop = d3.max(cityPop, function(d){
	      return d.population;
	      });
		//scale that distributes the circles horizontally
		var x = d3.scaleLinear() //create the scale
	    .range([100, 900]) //output min and max
	    .domain([0, 3]); //input min and max
	  //scale for circles center y coordinate
		var y = d3.scaleLinear()
	      .range([(h-12), 51])
	      .domain([0,800000]);
	      //color scale generator
	  var color = d3.scaleLinear()
	      .range([
	          "#FDBE85",
	          "#D94701"
	      		])
	      .domain([
	          minPop,
	          maxPop
	      		]);
		//Example 2.6 line 3
		var circles = container.selectAll(".circles") //create an empty selection
			.data(cityPop) //here we feed in an array
			.enter() //one of the great mysteries of the universe
			.append("circle") //inspect the HTML--holy crap, there's some circles there
			.attr("class", "circles").attr("id", function(d) {
				return d.city;
			   })
	    .attr("r", function(d) {
	      //calculate the radius based on population value as circle area
	      var area = d.population * 0.015;
	      return Math.sqrt(area / Math.PI);
			  })
	    .attr("cx", function(d, i) {
	      //use the scale generator with the index to place each circle horizontally
				return (x(i)/2)+80;
			  })
	    .attr("cy", function(d) {
				//subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG
				return y(d.population)
			  })
	    .style("fill", function(d, i){ //add a fill based on the color scale generator
	        return color(d.population);
	    })
	    .style("stroke", "#000"); //black circle stroke
	  //create axis
	  var yAxis = d3.axisLeft(y);
	  //create axis g element and add axis
	  var axis = container.append("g")
	    .attr("class", "axis")
	    .attr("transform", "translate(50, 0)")
	    .call(yAxis);
	  //create a title for chart
	  var title = container.append("text")
	    .attr("class", "title")
	    .attr("text-anchor", "middle")
	    .attr("x", w/2)
	    .attr("y", (1/h)+35)
	    .text("City Populations");
		//create circle labels
		var labels = container.selectAll(".labels")
		  .data(cityPop)
		  .enter()
		  .append("text")
		  .attr("class", "labels")
		  .attr("text-anchor", "left")
		  .attr("y", function(d){
		      //vertical position centered on each circle
		      return y(d.population);
		  });
		//first line of label
		var nameLine = labels.append("tspan")
		  .attr("class", "nameLine")
		  .attr("x", function(d,i){
					//function to find circle radius
					function radiuscalc (d) {
					  //calculate the radius based on population value as circle area
					  var area = d.population * 0.015;
					  return Math.sqrt(area / Math.PI);
					  }
					//get value of the radius
					var radius = radiuscalc (d);
		      //horizontal position to the right of each circle
					return (x(i)/2)+85+radius;
				  })
		  .text(function(d){
		      return d.city;
		  	});
		//second line of label
		var format = d3.format(",.2r")
		var popLine = labels.append("tspan")
		  .attr("class", "popLine")
			.attr("x", function(d,i){
					//function to find circle radius
					function radiuscalc (d) {
					  //calculate the radius based on population value as circle area
					  var area = d.population * 0.015;
					  return Math.sqrt(area / Math.PI);
					  }
					//get value of the radius
					var radius = radiuscalc (d);
		      //horizontal position to the right of each circle
					return (x(i)/2)+85+radius;
				  })
			.attr("dy", "15") //vertical offset
		  .text(function(d){
		      return "Pop. " + format (d.population);
		  	});
	}
