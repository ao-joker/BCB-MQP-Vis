import React, { useEffect } from "react";
import * as d3 from "d3";
import data from "./FINAL-SET.csv";

const Home = () => 
{
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
                console.log(masterArray)
        
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
          var proteinObject = 
          {
              name: data[i]["Protein Name"],
              id: data[i]["Protein ID"],
              pathway: commaSeparatedStringToList(data[i]["Pathway"]),
              connections: data[i]["List of Proteins Connected To"],
              molecules: data[i]["Molecules Connected To"],
              pathwayConnection: data[i]["Other Pathways Connected To"],
              TF:data[i]["List of TF Reg"],
              regulation: data[i]["Corresponding reg"],
              branch: data[i]["Branch point"],              
              PPINetwork: commaSeparatedStringToList(data[i]["PPI network"]),
              PPIInteraction: commaSeparatedStringToList(data[i]["PPI network interaction type"])
          }

          arr.push(proteinObject)
        }

        return arr;

        //Makes a list of all pathways a protein is a part of
        function commaSeparatedStringToList(longString)
        {
            //A temporary array that will hold the pathways to convert into a string
            let arr = []

            //A variable to hold onto the last index of the string
            let lastIndex = 0

            //First, check if the protein is found in multiple pathways. If it is, do work to splice them out
            //Else, just push the whole string onto the array and return it
            if(longString.includes(','))
            {
                //Iterate through the string until you encounter a ',' and slice until you reach the end of the string
                for(var i = 0; i <= longString.length; i++)
                {
                    if(longString[i] === ','|| i === longString.length)
                    {
                        //Now separate the string from the last knonw index to the column
                        let separateString = longString.slice(lastIndex, i)

                        //Add it to the array and up the previous index to the next index after the comma
                        arr.push(separateString)
                        lastIndex = i + 1
                    }
                }

                return arr;
            }
            else
            {
                arr.push(longString)
                return arr;
            }

        }
    }

    /*
        Here is the function for making the main pathway
            - Allows one to see a pathway selected
            - Can select and see a different pathway
            - Able to see different layouts (Only proteins, protein to molecules, with transcription factors present)
    */
    function makePathway(masterArray)
    {
        /*  Necessary variabels for this function and other nested functions
            with the intended use and function noted according to the <variable></variable>   */

        //Radio button creating
        var labels= ["Protein-Protein", "Protein-Molecule-Protein"] //A set of labels for the buttons. All other layouts should be pused onto this list!
        var layoutType = ["Protein-Protein", "Protein-Molecule-Protein"] //The layouts that are applicable. Variable to store names as strings for id attribute creation
        var rbWidth = 200 //button width
        var rbHeight = 30 //button height
        var rbSpace = 30 //space between buttons
        var x0 = 20 //x offset
        var y0 = 10 //y offset

        //Pathway creation and update
        var selectedPathway = "Glycolysis/Gluconeogensis"
        var pathwayType = "Protein-Protein"

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

            //Create the group of rectangles and text that will compose these buttons
            var radioButtonGroups = radioButtons.selectAll("g.button")
                                               .data(labels)
                                               .enter()
                                               .append("g")
                                               .attr("class", "button")
                                               .style("cursor", "pointer")
                                               .on("click", function(d)
                                                  {
                                                     updateRadioButtons(d3.select(this), d3.select(this.parentNode))
                                                  })

            //adding a rect to each button group
            radioButtonGroups.append("rect")
                             .attr("class", "buttonRect")
                             .attr("id", function(d, i)
                                  {
                                     console.log(layoutType[i])
                                     console.log(i)
                                     return layoutType[i];
                                  })
                             .attr("width", rbWidth)
                             .attr("height", rbHeight)
                             .attr("x",function(d,i) 
                                 {
                                     return x0 + (rbWidth + rbSpace) * i;
                                 })
                             .attr("y", y0)
                             .attr("rx", 5) //Give nice rounded corners
                             .attr("ry", 5) //Give nice rounded corners
                             .attr("stroke", "black")
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



            //A function to all the radio buttons to update color for the selected radio button 
            //and to inform which model of the pathway should be shown
            function updateRadioButtons(button, parent)
            {
                parent.selectAll("rect")
                      .attr("fill", "red")
                      .attr("stroke", "black")
    
                button.select("rect")
                      .attr("fill", "blue")
                      .attr("stroke", "white")

                
            }

            //A dropdown menu so that the user can choose the pathway of choice
            //Get all the potential values for pathways in the csv
            var pathwayDropDownValues = getAllPathwayOptions(masterArray)
            console.log(pathwayDropDownValues)
            console.log(selectedPathway)

            //Create the actual dropdown menu
            d3.select("#selectButton")
              .selectAll('myOptions')
     	      .data(pathwayDropDownValues)
              .enter()
    	      .append('option')
              .text(function(d){return d;}) // text showed in the menu
              .attr("value", function(d){return d;}) // corresponding value returned by the button
              
            d3.select("#selectButton")
              .on("change", function(event, d)
                 {
                    selectedPathway = d3.select(this).property("value")
                    console.log(selectedPathway) 
                    
                    drawPathway(selectedPathway)
                 })

            /*d3.select("#Pathway")
                             .append("g")
                             .attr("id", "dropdown menu")
                             .append("option")
                             .data(pathwayDropDownValues)
                             .enter()
                             .attr("value", function(d){return d;})
                             .text(function(d){return d;})
              /*.append("select")
              .selectAll("option")
              .data(pathwayDropDownValues)
              .enter()
              .append('option')
              .style("left", "10px")
              .style("top", "5px")
              .text(function (d) {return d;})
              .attr("value", function (d) {return d;}) */
              //.on("change", updatePathwayLayout(masterArray, d3.select(this).attr("value")))
      

            //A function that inputs all the values for potentially viewed vis
            function getAllPathwayOptions(masterArray)
            {
                //Temporary array used to hold the different pathways
                let arr = []

                for(var i = 0; i < masterArray.length; i++)
                {
                    masterArray[i]["pathway"].forEach(function(element)
                                                     {
                                                        if(!(arr.includes(element)))
                                                        {
                                                            arr.push(element)
                                                        }
                                                     })
                }

                return arr;
            }
        
        //Actually making the pathway
        drawPathway(masterArray, pathwayType, selectedPathway)

        function drawPathway(masterArray, pathwayType, selectedPathway)
        {
            //Call functions that assign links and nodes specific to the pathway selected
            console.log(selectedPathway)
            var nodesP = assignNodes(masterArray, pathwayType, selectedPathway)
            var linksP = assignLinks(masterArray, selectedPathway)
            console.log(nodesP)
            console.log(linksP)

            //Create the pathway force-directed network

            //Create the list of nodes that fit the pathway typein question 
            function assignNodes(masterArray, pathwayType, selectedPathway)
            {                
                //Here is a temporary array to hold the nodes for the pathway
                let arr = []

                //Determine which layout organization to proceed with: protein-protein vs protein-molecule-protein
                if(pathwayType === "Protein-Protein")
                {
                    for(var i = 0; i < masterArray.length; i++)
                    {
                        //console.log(masterArray[i]["pathway"])
                        if(masterArray[i]["pathway"].includes(selectedPathway))
                        {
                            //console.log(masterArray[i]["pathway"])
                            var pathwayObject = 
                            {
                                name: masterArray[i]["name"]
                            }
        
                            arr.push(pathwayObject)
                        }
                    }
                }
                else
                {

                }

                return arr;
            }

            function assignLinks(masterArray, selectedPathway)
            {
                //Temporary arrays
                //  - The first will hold source and target objects of the final map 
                //  - The second will hold the last index between commas for slicing to ensure protein names are added properly to the final links array
                let arr = []
                let lastIndex = 0
          
                for(var i = 0; i < masterArray.length; i++)
                {
                    if(masterArray[i]["pathway"].includes(selectedPathway))
                    {
                        let str = masterArray[i]["connections"]
                        console.log(str)

                        switch(str.length)
                        {
                            case 0:
                                arr.push("")
                                break;

                            case 1:
                                var pathwayObject = 
                                {
                                    source: i,
                                    target: masterArray.findIndex(object => {return object.name === str})
                                }
                                arr.push(pathwayObject)
                                break;

                            default:
                                //console.log("Default")
                                for(var j = 0; j <= str.length; j++)
                                {
                                    if(str[j] === ',' || j === str.length)
                                    {
                                        //Now separate the string from the last knonw index to the column
                                        let separateString = str.slice(lastIndex, j)
                                        console.log(separateString)

                                        //Add it to the array and up the previous index to the next index after the comma
                                        var pathwayObject = 
                                        {
                                          source: i,
                                          target: masterArray.findIndex(object => {return object.name === separateString})
                                        }
                                        lastIndex = j + 1

                                        arr.push(pathwayObject)
                                    }
                                }
                                //Need to reset last index for next iteration
                                lastIndex = 0
                
                        }
                    }
                }
                return arr;
            }
        }

        //Redraw function with radio button inputs
        function updatePathwayLayout(masterArray, pathwayType)
        {
            drawPathway(masterArray, pathwayType, selectedPathway)
        }

        //Redraw function with dropdown inputs
        function redrawPathwayType(masterArray, selectedPathway)
        {

        }
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
            <select id="selectButton"></select>
            <svg id="Pathway" width="1000" height="1000"></svg>
            <svg id="Regulation" width="500" height="500"></svg>
            <svg id="PPI" width="500" height="500"></svg>
            
        </div>
    );
}
 
export default Home;