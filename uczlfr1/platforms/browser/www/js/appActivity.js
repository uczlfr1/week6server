// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);
document.addEventListener('DOMContentLoaded', function() {
 getEarthquakes();
}, false);

// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
var client;
// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
var geojsonlayer;
// create the code to get the Earthquakes data using an XMLHttpRequest

function getEarthquakes() {
 client = new XMLHttpRequest();
 client.open('GET','http://developer.cege.ucl.ac.uk:30270/getPOI');
 client.onreadystatechange = earthquakeResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
 client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function earthquakeResponse() {
 // this function listens out for the server to say that the data is ready - i.e. has state 4
 if (client.readyState == 4) {
 // once the data is ready, process the data
 var geoJSONString = client.responseText;
 processGeoJSON(geoJSONString);
 }
}
function processGeoJSON(geoJSONString) {
// convert the string of downloaded data to JSON
var geoJSON = JSON.parse(geoJSONString);
 // add the JSON layer onto the map - it will appear using the default icons
 geojsonlayer = L.geoJson(geoJSON).addTo(mymap);
 // change the map zoom so that all the data is shown
 mymap.fitBounds(geojsonlayer.getBounds());
}


