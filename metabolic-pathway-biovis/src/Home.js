import React, { useEffect } from "react";
import * as d3 from "d3";

const Home = () => {
    //YOU BEST FIX THOSE SVGs! THE SIZES AND LOCATION NEED DRASTIC ADJUSTING
    
    //Here, I will make a call to all the svg related functions
    useEffect(() => {
        
        //Make the final set of organized data
        var masterArray = organizeData()
        
        makePathway(masterArray)
        makeRegulationList(masterArray)
        makePPIBase(masterArray)
    })

    /*
        Here is the function that organizes all the data from the inputted csv

    */
    function organizeData()
    {
        //Declare a temporary array that is able to hold the contents to be passed to the masterArray
        let arr = []

        //Take in an manipulate the csv data to organize a ton of protein objects
        //Each protein object will be pushed into the temporary array arr
        d3.csv("FINAL SET - Sheet1.csv").then(
            function(data)
            {

            })

        return arr;
    }

    /*
        Here is the function for making the main pathway
            - Allows one to see a pathway selected
            - Can select and see a different pathway
            - Able to see different layouts (Only proteins, protein to molecules, with transcription factors present)
    */
    function makePathway(masterArray)
    {
        d3.select("#Pathway")
        .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 4000)
          .attr("height", 2000)
          .attr("stroke", "black")
          .attr("fill", "black")


        function
    }

    function makeRegulationList(masterArray)
    {
       
        d3.select("#Regulation")
        .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 1400)
          .attr("height", 1000)
          .attr("stroke", "blue")
          .attr("fill", "blue")
  
    }

    function makePPIBase(masterArray)
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