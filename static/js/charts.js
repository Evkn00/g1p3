   // Sample data for different chart types
   const barChartData = [10, 20, 30, 40, 50];
   const lineChartData = [ { x: [1, 2, 3, 4, 5], y: [10, 25, 15, 35, 20], type: 'scatter', mode: 'lines+markers' }];
   const pieChartData = [{ labels: ["A", "B", "C"], values: [30, 20, 50], type: 'pie' }];
   const scatterPlotData = [{ x: [5, 10, 20, 25, 30], y: [10, 15, 8, 13, 18], mode: 'markers', type: 'scatter' }];
 
   // Function to create a bar chart
   function createBarChart() {
     d3.select(".chart").html(""); // Clear the chart area
 
     Plotly.newPlot('chart', [{
       x: barChartData.map((_, i) => i + 1),
       y: barChartData,
       type: 'bar',
       marker: { color: 'steelblue' }
     }]);
   }
 
   // Function to create a line chart
   function createLineChart() {
     d3.select(".chart").html(""); // Clear the chart area
 
     Plotly.newPlot('chart', lineChartData);
   }
 
   // Function to create a pie chart
   function createPieChart() {
     d3.select(".chart").html(""); // Clear the chart area
 
     Plotly.newPlot('chart', pieChartData);
   }
 
   // Function to create a scatter plot
   function createScatterPlot() {
     d3.select(".chart").html(""); // Clear the chart area
 
     Plotly.newPlot('chart', scatterPlotData);
   }





//HullPlot
   function HullPlot(hullDescArr) {
 
    let array = []
    //console.log(hullDescArr)
    let obj = {};
    hullDescArr.forEach(val => obj[val] = (obj[val] || 0) + 1);  //ref all things javascript youtube
    keyData = Object.keys(obj);
    valueData = Object.values(obj);
  
    let plotData = [{
      autosize: true,  
      type: "pie",
      labels: keyData,
      values: valueData
    }]
  
    let layout = {
      title: "Shipwrecks by Hull Type", 
    }

    //Plotly.newPlot("plot", plotData, layout);
    Plotly.newPlot("chart", plotData, layout);
  
  };

//CountryPlot
  function countryPlot(countryArr) {
    let obj = {};

    countryArr.forEach(val => obj[val] = (obj[val] || 0) + 1);  //ref all things javascript youtube
  
    keyData = Object.keys(obj);
    valueData = Object.values(obj);
  
    let plotData = [{
      x: keyData,
      y: valueData,
      type: "bar"
    }]
  
    let layout = {
      autosize: true,
/*       width: 400,
      height: 300, */
      title: "Shipwrecks by Country of Origin",
      xaxis: {
        title: "Country of Origin",
        tickangle: 45
      },
      yaxis: {
        title: "Number of Shipwrecks"
      }
     }
 
    Plotly.newPlot("chart", plotData, layout);
  };



//DatePlot
  function ShipwreckDatePlot(lossDateArr) {
  
    let obj = {};
  
    lossDateArr.forEach(val => obj[val] = (obj[val] || 0) + 1);  //ref all things javascript youtube
  
    keyData = Object.keys(obj);
    valueData = Object.values(obj);
  
    let plotData = [{
      x: keyData,
      type: "histogram"
    }]
  
    let layout = {
      autosize: true,
/*       width: 400,
      height: 300, */
      title: "Shipwrecks by Date of Occurrence",
      xaxis: {
        title: "Year ShipWreck Occurred",
        tickangle: 45
      },
      yaxis: {
        title: "Number of Shipwrecks"
      }
    }
  
    Plotly.newPlot("chart", plotData, layout);
  
  };


//RigPlot
  function RigDescPlot(rigDescArr) {

    let obj = {}; 
    rigDescArr.forEach(val => obj[val] = (obj[val] || 0) + 1);  //ref all things javascript youtube

    keyData = Object.keys(obj);
    valueData = Object.values(obj);
  
    let plotData = [{
      x: keyData,
      y: valueData,
      type: "bar",
      marker: {
        color: "orange"
      }
    }]
  
    let layout = {
      autosize: true,
/*       width: 400,
      height: 300, */
      title: "Shipwrecks by Rigging Type",
      xaxis: {
        title: "Type of Rigging"
      },
      yaxis: {
        title: "Number of Shipwrecks"
      }
    } 
    //Plotly.newPlot("plot", plotData, layout);
    Plotly.newPlot("chart", plotData, layout);
  
  };