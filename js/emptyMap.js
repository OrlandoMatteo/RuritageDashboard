
var bounds = null;
var main_map = L.map(
    'main_map', {
    center: [0, 0],
    zoom: 5,
    maxBounds: bounds,
    layers: [],
    worldCopyJump: false,
    crs: L.CRS.EPSG3857,
    zoomControl: false,
    });
L.control.zoom({position:'bottomright'}).addTo(main_map); 
// $('.leaflet-control-zoom')[0].style.bottom='20px';
// $('.leaflet-control-zoom')[0].style.right='220px';
var openstreetmap_layer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
    "attribution": null, 
    "detectRetina": false, 
    "maxNativeZoom": 18, 
    "maxZoom": 18, 
    "minZoom": 0, 
    "noWrap": false, 
    "opacity": 1, 
    "subdomains": "abc", 
    "tms": false
}).addTo(main_map);
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
