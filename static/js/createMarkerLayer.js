// Function to create marker layer
function createMarkerLayer(data) {
    return L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
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


