// Define the icon URLs and default icon URL
const iconUrls = {
  Brig: 'static/images/Brig.png',
  Brigantine: 'static/images/brigantine.png',
  Barque: 'static/images/barque.png',
  Snow: 'static/images/Snow.png',
  Ketch: 'static/images/Ketch.png',
  Schooner: 'static/images/Schooner.png',
  Cutter: 'static/images/cutter.png',
  Lugger: 'static/images/lugger.png',
  Sloop: 'static/images/Sloop.png',
  Yawl: 'static/images/yawl.png',
  Dandy: 'static/images/dandy.png',
  Ship: 'static/images/ship.png'
};
const defaultIconUrl = 'static/images/ship.png';

//set default years
let startYear = 1;
let endYear = 2030;

// Initialize the map
let myMap = L.map("map", {
  center: [-30.8, 130.9],
  zoom: 5
});

// Function to populate the story box
function populateStoryBox(properties) {
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
}

let markerLayer;

// Function to create marker layer
function createMarkerLayer(data) {
  return L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      const rigDesc = feature.properties.RIGDESC;
      const legendIconUrl = iconUrls[rigDesc] || defaultIconUrl;

      return L.marker(latlng, {
        icon: L.icon({
          iconUrl: legendIconUrl,
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
        }),
      });
    },
    onEachFeature: function (feature, layer) {
      // Bind popup content to each marker
      const popupContent = `<strong>Wreck Name:</strong> ${feature.properties.WRECKNAME}`;
      layer.bindPopup(popupContent);

      // Add click event listener to populate story box and zoom to the marker
      function onClickHandler() {
        populateStoryBox(feature.properties);
        myMap.flyTo(layer.getLatLng(), 8);
      }

      function onClickOffHandler() {
        myMap.flyTo([-30.8, 130.9], 5);
        layer.off("click", onClickOffHandler);
      }

      layer.on("click", onClickHandler);
      myMap.on("click", onClickOffHandler);
    },
  });
}

// Generate the legend and add it to the map
function createLegend() {
  // Create a legend control.
  let legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<h4>Ships</h4>';
    ships = ['All', 'Barque', 'Brig', 'Brigantine', 'Cutter', 'Dandy', 'Ketch', 'Lugger', 'Schooner', 'Ship', 'Sloop', 'Snow', 'Yawl'];
    labels = ['static/images/ship.png', 'static/images/barque.png', 'static/images/Brig.png', 'static/images/brigantine.png', 'static/images/cutter.png', 'static/images/dandy.png', 'static/images/Ketch.png', 'static/images/lugger.png', 'static/images/Schooner.png', 'static/images/ship.png', 'static/images/Sloop.png', 'static/images/Snow.png', 'static/images/yawl.png'];

    // loop through our ships and generate a label with their png for each ship
    for (var i = 0; i < ships.length; i++) {
      div.innerHTML +=
        ` <img src="${labels[i]}" height="20" width="20" onclick="filterByShipType('${ships[i]}')">` + ships[i] + '<br>';
    }
    return div;
  };

  return legend;
}

// Function to filter the ship type and update the map
function filterByShipType(selectedRigDesc) {
  // Show all ships when selectedRigDesc is null or empty
  if (!selectedRigDesc || selectedRigDesc === 'All') {
    // Pass "All" to createMarkerLayer to show all ships
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
}

// Add event listener to the refresh button
const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", function () {
  // Show the legend
  const legendContainer = document.getElementById("legend-container");
  legendContainer.style.display = "block";

  // Hide the slider
  const sliderContainer = document.getElementById("slider-container");
  sliderContainer.style.display = "none";
});

// Use D3.js to load the data
const url = `http://127.0.0.1:5000/documents/${startYear}/${endYear}`; // URL for Flask API
d3.json(url)
  .then(function (data) {
    window.data = data; //makes data readable throughout code
    console.log(data);

    // Pretty map set (default, no street names)
    const defaultTileLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 1,
      maxZoom: 16,
    }).addTo(myMap);

    // Add 2nd tile layer (ugly, street names, etc)
    const secondTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // layer list
    const baseLayers = {
      'Pirate Map': defaultTileLayer,
      'Boring Map': secondTileLayer,
    };

    // Create layer control
    L.control.layers(baseLayers).addTo(myMap);

    // Generate summary stats
    // Number of records
    let numberOfRecords = data.length;
    console.log("Number of records: ", numberOfRecords);

    // Summary Stats
    const rigDescArr = [];
    const hullDescArr = [];
    const shipTypeArr = [];
    const countryArr = [];
    const buildDateArr = [];
    const lossDateArr = [];

    // calculate the first and last year of shipwrecks
    const lossDates = data.map((feature) => feature.properties.LOSSDATE);

    // Filter out the 0 values from the lossDates array
    const nonZeroLossDates = lossDates.filter((year) => year !== 0);

    // Find the minimum year from the nonZeroLossDates array
    const minYear = Math.min(...nonZeroLossDates);
    const maxYear = Math.max(...lossDates);

    console.log("Minimum Year:", minYear);
    console.log("Maximum Year:", maxYear);

    // Loop through each feature in the GeoJSON data
    data.forEach(function (feature) {
      const properties = feature.properties;

      rigDescArr.push(properties.RIGDESC);
      hullDescArr.push(properties.HULLDESC);
      shipTypeArr.push(properties.SHIPTYPEDE);
      countryArr.push(properties.COUNTRY);
      buildDateArr.push(properties.BUILDDATE);
      lossDateArr.push(properties.LOSSDATE);
    });

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

    // Generate the legend and add it to the map
    createLegend().addTo(myMap);

    // Get references to the input fields and the slider
    const inputMin = document.getElementById("input-number-min");
    const inputMax = document.getElementById("input-number-max");
    const slider = document.getElementById("slider-date");

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

    // Step 5: Use Slider Events to update the overlay layer
    // Function to update the input fields when the slider changes
    slider.noUiSlider.on("update", function (values) {
      const [minYear, maxYear] = values.map(parseFloat);
      inputMin.value = minYear;
      inputMax.value = maxYear;

    // Update the map with filtered data based on the slider values
    updateMapByYearRange(minYear, maxYear);
  });

  // Function to update the slider when the input fields change
  inputMin.addEventListener("input", updateSlider);
  inputMax.addEventListener("input", updateSlider);

  // Function to update the slider based on input fields
  function updateSlider() {
    const minYear = parseInt(inputMin.value);
    const maxYear = parseInt(inputMax.value);

    // Make sure minYear and maxYear are within the allowed range
    if (minYear >= 1837 && maxYear <= 2002 && minYear <= maxYear) {
      // Update the slider
      slider.noUiSlider.set([minYear, maxYear]);
    }
  }

  // Function to update the map with data within the specified year range
  function updateMapByYearRange(startYear, endYear) {
    const filteredData = data.filter(
      (feature) => feature.properties.LOSSDATE >= startYear && feature.properties.LOSSDATE <= endYear
    );
    markerLayer.clearLayers();
    markerLayer.addData(filteredData);
  }

  // Initial map update with the full data
  updateMapByYearRange(startYear, endYear);
});