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
  
    let plotData = [{
      x: lossDateArr,
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