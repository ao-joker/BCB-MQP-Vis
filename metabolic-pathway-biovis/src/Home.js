import React, { useEffect } from "react";
import * as d3 from "d3";

const Home = () => {
    //YOU BEST FIX THOSE SVGs! THE SIZES AND LOCATION NEED DRASTIC ADJUSTING
    
    //Here, I will make a call to all the svg related functions
    useEffect(() => {
        makePathway()
        makeRegulationList()
        makePPIBase()
    })


    //Observe, an svg related function
    function makePathway(){
        d3.select("#Pathway")
        .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 4000)
          .attr("height", 2000)
          .attr("stroke", "black")
          .attr("fill", "black")
    }

    function makeRegulationList(){
       
        d3.select("#Regulation")
        .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 1400)
          .attr("height", 1000)
          .attr("stroke", "blue")
          .attr("fill", "blue")
  
    }

    function makePPIBase()
    {
        d3.select("#PPI")
        .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 1600)
          .attr("height", 1000)
          .attr("stroke", "red")
          .attr("fill", "red")
    }

    return(
        <div className="home">
            <h2>The Pathway Itself!</h2>
            <svg id="Pathway" width="1000" height="1000"></svg>
            <svg id="Regulation" width="500" height="500"></svg>
            <svg id="PPI" width="500" height="500"></svg>
            
        </div>
    );
}
 
export default Home;