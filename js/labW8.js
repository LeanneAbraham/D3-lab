//execute script when window is loaded
window.onload = function(){
    //get the <body> element from the DOM
    //this is a d3 selection. Creates a variable for it
    //a selection is ??? and then you pass it an argument. In this case its a class name, grabs a piece of the DOM and then returns element to container variable
    //d3 does selection as arrays,
    var container = d3.select("body")
      //.attr()applies to the body
      //no semicolan, why? Becuase a semicolan ends a statement, and we don't want to do that. we are chaining methods together
      //only append tag names, not a full html string, doesn't need carrots
      //write in blocks of code becuase you are chaining operators together and the chains get really long so write everything in verticle blocks and then don't put a semicolen until the end
      .append("svg")
        //datum is a single value which is singular for data
        .datum(100)
        //d always holds a datum, either what you assign as a .datum or a value which is assinged by .data
        .attr("width", function(d){
          return (d*4) + "px";
          })//applies to the svg
        .attr("height", function(d){
          return (d*3.5) + "px";
          })
        .attr("class","container")

        var x = d3.scaleLinear() //create the scale
          .domain([0,40]) //output min and max
          .range([500,0]); //input min and max
          //this is a generator function

        d3.json("data/MegaCities.geojson", function(data){
            //when you create a new element with d3 it switches what is selectd within the element
            //. creates a class
            //container puts the text elements inside the svg
            //select all basiclly sets up a loop
          var allText = container.selectAll(".textElement")
            //like .datum, but takes an array of values
            //can't handle a single number value, NEEDS to be an array
            .data(data.features)
            .enter()
            .append("text")
            .attr("class", "textElement")
            .attr("x", 20)
            .attr("y", function(d, i){
              console.log(x(d.properties.Pop_2015));
              return x(d.properties.Pop_2015);
            })
            //this is putting the array in each element in the text
            .text(function(d){
              return d.properties.City;
            })
        })
};
