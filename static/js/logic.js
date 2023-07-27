//Define initial Values
  //set default years
  let startYear = 1
  let endYear = 2030
  let markerLayer
  let legend

  // Summary Statslet rigDescArr = [];
  let hullDescArr = [];
  let shipTypeArr = [];
  let countryArr = [];
  let buildDateArr = [];
  let lossDateArr = [];
  let rigDescArr = [];

  // Create data URL
  let url = `http://127.0.0.1:5000/documents/${startYear}/${endYear}`;// URL for Flask API

  // Initialize the map
  let myMap = L.map("map", {
    center: [-30.8, 130.9],
    zoom: 5
  });

  // Create layer control outside the makeMap function
  const layerControl = L.control.layers(baseLayers).addTo(myMap);  

function makeMap(xxx) {  
  d3.json(xxx)
    .then(function(data) {
      window.data = data; //makes data readable throughout code
      console.log(data);

      
      defaultTileLayer.addTo(myMap);
            // Generate summary stats
      // Number of records
      let numberOfRecords = data.length;
      console.log("Number of records: ", numberOfRecords);
  
      // calculate the first and last year of shipwrecks
      const lossDates = data.map((feature) => parseInt(feature.properties.LOSSDATE));

      // Filter out the 0 values from the lossDates array
      const nonZeroLossDates = lossDates.filter((year) => year !== 0);

      // Find the minimum year from the nonZeroLossDates array
      const minYear = Math.min(...nonZeroLossDates);
      const maxYear = Math.max(...lossDates);

      console.log("Minimum Year:", minYear);
      console.log("Maximum Year:", maxYear);

      //reset arrays
      hullDescArr = [];
      shipTypeArr = [];
      countryArr = [];
      buildDateArr = [];
      lossDateArr = [];
      rigDescArr = [];

      // Loop through each feature in the GeoJSON data
      data.forEach(function(feature) {
        const properties = feature.properties;
  
        rigDescArr.push(properties.RIGDESC);
        hullDescArr.push(properties.HULLDESC);
        shipTypeArr.push(properties.SHIPTYPEDE);
        countryArr.push(properties.COUNTRY);
        buildDateArr.push(properties.BUILDDATE);
        lossDateArr.push(properties.LOSSDATE);
     
       
      });
//initial plot
      HullPlot(hullDescArr)







      // Log the arrays for verification
      console.log("RIGDESC Array:", rigDescArr);
      console.log("HULLDESC Array:", hullDescArr);
      console.log("SHIPTYPEDE Array:", shipTypeArr);
      console.log("COUNTRY Array:", countryArr);
      console.log("BUILDDATE Array:", buildDateArr);
      console.log("LOSSDATE Array:", lossDateArr);


    


      // Initialize the marker layer with all ships
      markerLayer = createMarkerLayer(data);

    // Add the marker layer to the map
    markerLayer.addTo(myMap);

    // Update the legend content
    updateLegendContent();

    // Get unique RIGDESC values
    var rigDescValues = data.map(function(feature) {
    return feature.properties.RIGDESC;
    return markerLayer;
    });
  


    // Function to update the map with the selected ship type
    function updateMap(selectedRigDesc) {
    // Trim the selectedRigDesc to remove leading/trailing whitespaces
    selectedRigDesc = selectedRigDesc.trim();
  
    // Check if "All" is selected
    if (selectedRigDesc === "All") {
      // Show all ships
      markerLayer.clearLayers(); // Clear all existing markers
      markerLayer = createMarkerLayer(data); // Add all markers again
    } else {
      // Filter the data based on the selected rig description
      const filteredData = data.filter(
        (feature) => feature.properties.RIGDESC === selectedRigDesc
      );
  
      // Clear existing markers and add the new ones for the filtered data
      markerLayer.clearLayers();
      markerLayer = createMarkerLayer(filteredData);
    }  
    // Add the new marker layer to the map
    markerLayer.addTo(myMap);
  };



// Function to populate the story box
window.populateStoryBox = function(properties) {
    const storyBox = document.getElementById("story-box");
    storyBox.innerHTML = `
        <h2>${properties.WRECKNAME}</h2>
        <p><strong>Wreck Number:</strong> ${properties.WRECKNR}</p>
        <p><strong>Loss Date:</strong> ${properties.LOSSDATE}</p>
        <p><strong>Loss Location:</strong> ${properties.LOSSLOCATI}</p>
        <p><strong>Loss Cause:</strong> ${properties.LOSSCAUSE}</p>
        <p><strong>Build Date:</strong> ${properties.BUILDDATE}</p>
        <p><strong>Hull Description:</strong> ${properties.HULLDESC}</p>
        <p><strong>Port Built:</strong> ${properties.PORTBUILT}</p>
        <p><strong>Rig Description:</strong> ${properties.RIGDESC}</p>
    `;
  };



function createLegend() {
    // Create a legend control.
    legend = L.control({ position: 'bottomright' });
  
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<h4>Ships</h4>';
      ships = ['All','Barque', 'Brig', 'Brigantine', 'Cutter', 'Dandy', 'Ketch', 'Lugger', 'Schooner', 'Ship', 'Sloop', 'Snow', 'Yawl'];
      labels = ['static/images/ship.png','static/images/barque.png', 'static/images/Brig.png', 'static/images/brigantine.png', 'static/images/cutter.png', 'static/images/dandy.png', 'static/images/Ketch.png', 'static/images/lugger.png', 'static/images/Schooner.png', 'static/images/ship.png', 'static/images/Sloop.png', 'static/images/Snow.png', 'static/images/yawl.png'];
  
      // loop through our ships and generate a label with their png for each ship
      for (var i = 0; i < ships.length; i++) {
        div.innerHTML +=
          ` <img src="${labels[i]}" height="20" width="20" onclick="filterByShipType('${ships[i]}')">` + ships[i] + '<br>';
      }
      return div;
    };
  
    return legend;
  }
  
  // Generate the legend and add it to the map
  createLegend().addTo(myMap);

  window.filterByShipType = function(selectedRigDesc) {
    // Trim the selectedRigDesc to remove leading/trailing whitespaces
    selectedRigDesc = selectedRigDesc ? selectedRigDesc.trim() : null;
  
    // Show all ships when selectedRigDesc is null or empty
    if (!selectedRigDesc || selectedRigDesc === "All") {
      updateMap("All"); // Pass "All" to updateMap to show all ships
    } else {
      // Show ships based on the selected rig description
      updateMap(selectedRigDesc);
    }
  };
  
  


  function updateMap(selectedRigDesc) {
    // Check if selectedRigDesc is not null before proceeding
    if (selectedRigDesc !== null) {
      // Trim the selectedRigDesc to remove leading/trailing whitespaces
      selectedRigDesc = selectedRigDesc.trim();
    }
  
    // Check if "All" is selected
    if (selectedRigDesc === 'All' || selectedRigDesc === null) {
      // Show all ships
      markerLayer.clearLayers(); // Clear all existing markers
      markerLayer = createMarkerLayer(data); // Add all markers again
    } else {
      // Filter the data based on the selected rig description
      const filteredData = data.filter(
        (feature) => feature.properties.RIGDESC === selectedRigDesc
      );
  
      // Clear existing markers and add the new ones for the filtered data
      markerLayer.clearLayers();
      markerLayer = createMarkerLayer(filteredData);
    }
  
    // Add the new marker layer to the map
    markerLayer.addTo(myMap);

    return markerLayer;
  }
});


};

makeMap(url)

//plot call functions 
function hullTypeCall() {
  HullPlot(hullDescArr);
};

function countryTypeCall() {
  countryPlot(countryArr);
};

function datePlotCall() {
  ShipwreckDatePlot(lossDateArr);
};

function rigPlotCall() {
  RigDescPlot(rigDescArr);
};



// Attach click event listeners to the buttons
  d3.select("#bar-chart-button").on("click", hullTypeCall);
  d3.select("#line-chart-button").on("click", countryTypeCall);
  d3.select("#pie-chart-button").on("click", datePlotCall);
  d3.select("#scatter-plot-button").on("click", rigPlotCall);




// Get references to the input fields and the slider
const inputMin = document.getElementById("input-number-min");
const inputMax = document.getElementById("input-number-max");
const slider = document.getElementById("slider-date");
let minYear = 1837
let maxYear = 2002


// Set up the slider
noUiSlider.create(slider, {
  start: [minYear, maxYear], // These values should be defined beforehand
  connect: true,
  range: {
    min: 1837, // Replace with the appropriate minimum year
    max: 2002, // Replace with the appropriate maximum year
  },
  step: 1,
  format: {
    to: (value) => Math.round(parseFloat(value)),
    from: (value) => parseFloat(value),
  },
});

// Function to update the input fields when the slider changes
slider.noUiSlider.on("update", function (values) {
  const [newMinYear, newMaxYear] = values.map(parseFloat);
  inputMin.value = newMinYear;
  inputMax.value = newMaxYear;
  startYear = newMinYear;
  endYear = newMaxYear;
}); 

// Function to update the legend content
function updateLegendContent() {
  if (legend) {
    // Create the legend content
    let div = L.DomUtil.create("div", "info legend");
    div.innerHTML += "<h4>Ships</h4>";
    ships = ["All", "Barque", "Brig", "Brigantine", "Cutter", "Dandy", "Ketch", "Lugger", "Schooner", "Ship", "Sloop", "Snow", "Yawl"];
    labels = ["static/images/ship.png", "static/images/barque.png", "static/images/Brig.png", "static/images/brigantine.png", "static/images/cutter.png", "static/images/dandy.png", "static/images/Ketch.png", "static/images/lugger.png", "static/images/Schooner.png", "static/images/ship.png", "static/images/Sloop.png", "static/images/Snow.png", "static/images/yawl.png"];

    // loop through our ships and generate a label with their png for each ship
    for (var i = 0; i < ships.length; i++) {
      div.innerHTML += `<img src="${labels[i]}" height="20" width="20" onclick="filterByShipType('${ships[i]}')">${ships[i]}<br>`;
    }

    // Update the content of the existing legend control
    legend.getContainer().innerHTML = div.innerHTML;
  }
}

// Function to clear the map and recreate it
function refreshMap() {
  // Remove the existing marker layer from the map
  if (markerLayer) {
    markerLayer.clearLayers();
    myMap.removeLayer(markerLayer);
  }

  // Remove the existing legend control from the map
  if (legend) {
    legend.remove();
  }

  // Reset the layer control
  if (layerControl) {
    layerControl.remove();
  }

  // Rebuild the data URL with the updated startYear and endYear
  let url = `http://127.0.0.1:5000/documents/${startYear}/${endYear}`;
  console.log(url);

  // Recreate the map
  markerLayer = makeMap(url);

  // Add the layer control again
  layerControl.addTo(myMap);
}

// Add event listener to the refresh button
document.getElementById("refresh-button").addEventListener("click", function () {
  console.log(`startYear: ${startYear}, endYear: ${endYear}`);
  refreshMap();
});
