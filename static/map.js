let Token=mapBoxAccessToken;
mapboxgl.accessToken = Token;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center : [Number(geoDataLong), Number(geoDataLat)],
    zoom: 15
});
 
// Create a default Marker and add it to the map.
var marker1 = new mapboxgl.Marker()
.setLngLat([Number(geoDataLong), Number(geoDataLat)])
.addTo(map);

map.easeTo(marker1);    