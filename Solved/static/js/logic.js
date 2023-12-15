let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStationsLayer){
  let lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let baseMaps = {
    "Light Map": lightmap
  };

  let overlayMaps = {
    "Bike Stations": bikeStationsLayer
  };

  let myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap, bikeStationsLayer]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}  

// Create the createMarkers function.
function createMarkers(stations) {
  let bikeMarkers = [];

  stations.forEach(station => {
    // Create a marker for each station and bind a popup with the station's name.
    let marker = L.marker([station.lat, station.lon]).bindPopup(`<h3>Station: ${station.name}</h3><h4>Capacity: ${station.capacity}</h4>`);
    bikeMarkers.push(marker);
  });
  
  // Create a layer group from the bike markers array.
  let bikeStationsLayer = L.layerGroup(bikeMarkers);

  // Pass the layer group to the createMap function.
  createMap(bikeStationsLayer);
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
let queryUrl = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";
// let queryUrl = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json";
// Performing a GET request to the query URL.
d3.json(queryUrl).then(function (rawData) {
  console.log("Stations Data", rawData.data.stations);
  createMarkers(rawData.data.stations);
});



