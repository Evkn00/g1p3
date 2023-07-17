// url = "http://127.0.0.1:5000/documents" // url for Flask API
url = "data/TOPO_Shipwrecks_GDA2020.geojson"; // temp using local GeoJSON as cannot use local FLASK instance when on github pages?

let myMap = L.map("map", {
  center: [-30.8, 130.9],
  zoom: 5
});

// Basic Map set
/* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap); */

// Pretty map set
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 16
}).addTo(myMap);

// Use D3.js to load the data
d3.json(url)
  .then(function(data) {
    console.log(data);

    // Generate summary stats
    // Number of records
    let numberOfRecords = data.features.length;
    console.log("Number of records: ", numberOfRecords);

    // Summary Stats
    const rigDescArr = [];
    const hullDescArr = [];
    const shipTypeArr = [];
    const countryArr = [];
    const buildDateArr = [];
    const lossDateArr = [];

    // Loop through each feature in the GeoJSON data
    data.features.forEach(function(feature) {
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

    // Create a marker layer
    const markerLayer = L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng);
      },
      onEachFeature: function(feature, layer) {
        // Bind popup content to each marker
        const popupContent = `<strong>Wreck Name:</strong> ${feature.properties.WRECKNAME}`;
        layer.bindPopup(popupContent);

        // Add click event listener to populate story box
        layer.on("click", function() {
          populateStoryBox(feature.properties);
        });
      }
    });

    // Add the marker layer to the map
    markerLayer.addTo(myMap);
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
