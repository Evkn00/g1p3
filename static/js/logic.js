//url = "http://127.0.0.1:5000/documents"  //url for Flask API
url = "data/TOPO_Shipwrecks_GDA2020.geojson"; // temp using local GeoJSON as cannot use local FLASK instance when on github pages?

// Custom icon
var shipIcon = L.icon({
  iconUrl: 'static/images/Brig.png',
  iconSize: [38, 38], // size of the icon
  iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor
});

// Define the icon URLs for each RIGDESC value
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
};

// Create a default icon URL for unknown RIGDESC values
const defaultIconUrl = 'static/images/ship.png';

let myMap = L.map("map", {
  center: [-30.8, 130.9],
  zoom: 5
});

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
  let markerLayer = L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      const rigDesc = feature.properties.RIGDESC;
      const iconUrl = iconUrls[rigDesc] || defaultIconUrl;

      return L.marker(latlng, {
        icon: L.icon({
          iconUrl: iconUrl,
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
        }),
      });
    },
      onEachFeature: function(feature, layer) {
        // Bind popup content to each marker
        const popupContent = `<strong>Wreck Name:</strong> ${feature.properties.WRECKNAME}`;
        layer.bindPopup(popupContent);

     // Add click event listener to populate story box and zoom to the marker
  function onClickHandler() {
    populateStoryBox(feature.properties);
    myMap.flyTo(layer.getLatLng(), 8); // Adjust the zoom level as needed
  }

  function onClickOffHandler() {
    myMap.flyTo(layer.getLatLng(-32.8385, 137.5724), 5); // Adjust the zoom level as needed
    layer.off("click", onClickOffHandler);
    //layer.on("click", onClickHandler);
  }

  layer.on("click", onClickHandler);
  myMap.on("click", onClickOffHandler);
}
    });

    // Add the marker layer to the map
    markerLayer.addTo(myMap);
  });

  var shipIcon;
  if (feature.properties.RIGDESC === "Brig") {
    new ShipIcon ({iconUrl: 'static/images/ship.png'})
  } else {
    new ShipIcon ({iconUrl: 'static/images/ship.png'})
  }

  // Custom icon
  var ShipIcon = L.Icon.extend({
    options:{
      iconSize: [38, 38], // size of the icon
      iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor
    }
  });

  L.icon = function (options) {
    return new L.Icon(options);
  };    

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
