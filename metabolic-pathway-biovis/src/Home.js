import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "./FINAL-Set.csv";

const Home = () => {
    //YOU BEST FIX THOSE SVGs! THE SIZES AND LOCATION NEED DRASTIC ADJUSTING
    
    //Here, I will make a call to all the svg related functions
    useEffect(() => {
        
        //Make the final set of organized data
        d3.csv(data).then(
            function(data)
            {
                //Begin by organizing the inputted csv data in a menaningful way, somehow
                //console.log(data)
                var masterArray = organizeData(data)
                //console.log(masterArray)
        
                makePathway(masterArray)
                makeRegulationList(masterArray)
                makePPIBase(masterArray)
            })

    })

    /*
        Here is the function that organizes all the data from the inputted csv

    */
    function organizeData(data)
    {
        //Declare a temporary array that is able to hold the contents to be passed to the masterArray
        let arr = []

        //Take in an manipulate the csv data to organize a ton of protein objects
        //Each protein object will be pushed into the temporary array arr

        for(var i = 0; i < data.length; i++)
        { 

            console.log("I got 2")
          var proteinObject = 
          {
              name: data[i]["Protein Name"],
              id: data[i]["Protein ID"],
              pathway: data[i]["Pathway"],
              connections: data[i]["List of Proteins Connected To"],
              molecules: data[i]["Molecules Connected To"],
              pathwayConnection: data[i]["Other Pathways Connected To"],
              TF:data[i]["List of TF Reg"],
              regulation: data[i]["Corresponding reg"],
              branch: data[i]["Branch point"],              
              PPINetwork: data[i]["PPI network"],
              PPIInteraction: data[i]["PPI network interacrtion type"]
          }

          arr.push(proteinObject)
        }

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
        //Background for the svg
        d3.select("#Pathway")
        .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 4000)
          .attr("height", 2000)
          .attr("stroke", "black")
          .attr("fill", "black")

            //Radio buttons
            //Create the listed buttons to view the following: protein-protein ; protein-molecule-protein
            //Inspiration and coding help came from this source: http://www.nikhil-nathwani.com/blog/posts/radio/radio.html
            var radioButtons = d3.select("#Pathway")
                                 .append("g")
                                 .attr("id", "radioButtons") 

            //A set of labels for the buttons
            var labels= ["Protein-Protein", "Protein-Molecule-Protein"];

            //Create the group of rectangles and text that will compose these buttons
            var radioButtonGroups= radioButtons.selectAll("g.button")
                                               .data(labels)
                                               .enter()
                                               .append("g")
                                               .attr("class", "button")
                                               .style("cursor", "pointer")

            var rbWidth= 200; //button width
            var rbHeight= 30; //button height
            var rbSpace= 30; //space between buttons
            var x0= 20; //x offset
            var y0= 10; //y offset

            //adding a rect to each button group
            radioButtonGroups.append("rect")
                             .attr("class", "buttonRect")
                             .attr("width", rbWidth)
                             .attr("height", rbHeight)
                             .attr("x",function(d,i) 
                                 {
                                     return x0 + (rbWidth + rbSpace) * i;
                                 })
                             .attr("y", y0)
                             .attr("rx", 5) //Give nice rounded corners
                             .attr("ry", 5) //Give nice rounded corners
                             .attr("fill", "red")

            //adding text to each button group, centered within the button rect
            radioButtonGroups.append("text")
                             .attr("class", "buttonText")
                             .attr("x",function(d, i) 
                                  {
                                    return x0 + (rbWidth + rbSpace) * i + rbWidth / 2;
                                  })
                             .attr("y", y0 + (rbHeight / 2))
                             .attr("text-anchor", "middle")
                             .attr("dominant-baseline", "central")
                             .attr("fill", "white")
                             .text(function(d) {return d;})

        
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