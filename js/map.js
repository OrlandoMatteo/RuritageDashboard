// var mymap = L.map('mapid').setView([51.505, -0.09], 13);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(mymap);
var bounds = null;
var main_map = L.map(
    'main_map', {
    center: [0, 0],
    zoom: 2,
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

var example=L.tileLayer('https://api.mapbox.com/styles/v1/matteo-orlando/cjrcb08ss2adz2to56dqze3e2/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF0dGVvLW9ybGFuZG8iLCJhIjoiY2puYndpaWxtMDhpZjN3cGU0cjYxNjl2MyJ9.seN7FeS88tx9yYwqMk5QIw',{opacity:0.5});

// Land use 
//L.tileLayer.wms('https://image.discomap.eea.europa.eu/arcgis/services/Corine/CLC2018_WM/MapServer/WMSServer?',{layers:"12",format: 'image/png',transparent:true})
var CorineLandCover=L.tileLayer.wms('https://image.discomap.eea.europa.eu/arcgis/services/Corine/CLC2018_WM/MapServer/WMSServer?',{layers:"13",format: 'image/png',transparent:true})

var camino=L.tileLayer('https://api.mapbox.com/styles/v1/matteo-orlando/cjrw4js6t20ed1frv8uui4k2k/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF0dGVvLW9ybGFuZG8iLCJhIjoiY2puYndpaWxtMDhpZjN3cGU0cjYxNjl2MyJ9.seN7FeS88tx9yYwqMk5QIw');

//var topology=L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=d8abaa72b3604758be5fc3d52354cff0');
var topology=L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                          maxZoom: 17,
                          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                        });
var imageUrl='/static/img/FCM_21-1.png'
var imageBounds=[[5.985,-77.5],[3.465,-73.9]]
var image_layer=L.imageOverlay(imageUrl,imageBounds)
//var image_layer=L.l8afletGeotiff(imageUrl, {bounds: imageBounds})

main_map.createPane('RM');
main_map.getPane('RM').style.zIndex = 590;
main_map.createPane('R');
main_map.getPane('R').style.zIndex = 590;
main_map.createPane('Paths');
main_map.getPane('Paths').style.zIndex = 590;
main_map.createPane('Buildings');
main_map.getPane('Buildings').style.zIndex = 620;
main_map.createPane('HistBuildings');
main_map.getPane('HistBuildings').style.zIndex = 620;
main_map.createPane('Towns');
main_map.getPane('Towns').style.zIndex = 620;
main_map.createPane('Sites');
main_map.getPane('Sites').style.zIndex = 320;
main_map.createPane('Infrastr');
main_map.getPane('Infrastr').style.zIndex = 320;
main_map.createPane('InfrastrBuild');
main_map.getPane('InfrastrBuild').style.zIndex = 320;
main_map.createPane('InfSia');
main_map.getPane('InfSia').style.zIndex = 320;
main_map.createPane('OpenAir');
main_map.getPane('OpenAir').style.zIndex = 320;
main_map.createPane('LandUse');
main_map.getPane('LandUse').style.zIndex = 320;
main_map.createPane('Tourism');
main_map.getPane('Tourism').style.zIndex = 320;
main_map.createPane('Route');
main_map.getPane('Route').style.zIndex = 320;
main_map.createPane('Change');
main_map.getPane('Change').style.zIndex = 320;
main_map.createPane('Events');
main_map.getPane('Events').style.zIndex = 320;
main_map.createPane('Natura');
main_map.getPane('Natura').style.zIndex = 320;
main_map.createPane('RMV');
main_map.getPane('RMV').style.zIndex = 320;

main_map.createPane('Areas');
main_map.getPane('Areas').style.zIndex = 250;

var rmMarkers=L.featureGroup().addTo(main_map,{pane:'RM'});
var rMarkers=L.featureGroup().addTo(main_map,{pane:'R'});
var Paths=L.featureGroup().addTo(main_map);
var Areas=L.featureGroup().addTo(main_map,{pane:'Areas'});
var Buildings=L.featureGroup().addTo(main_map);
var HistBuildings=L.featureGroup().addTo(main_map);
var Towns=L.featureGroup().addTo(main_map);
var Sites=L.featureGroup().addTo(main_map,{pane:'Sites'});
var Infrastr=L.featureGroup().addTo(main_map,{pane:'Infrastr'});
var InfrastrBuild=L.featureGroup().addTo(main_map,{pane:'InfrastrBuild'});
var InfSia=L.featureGroup().addTo(main_map,{pane:'InfSia'});
var OpenAir=L.featureGroup().addTo(main_map,{pane:'OpenAir'});
var LandUse=L.featureGroup().addTo(main_map,{pane:'LandUse'});
var Tourism=L.featureGroup().addTo(main_map,{pane:'Tourism'});
var Events=L.featureGroup().addTo(main_map,{pane:'Events'});
var Route=L.featureGroup().addTo(main_map,{pane:'Route'});
var Change=L.featureGroup().addTo(main_map,{pane:'Change'});
var Natura=L.featureGroup().addTo(main_map,{pane:'Natura'});
var RMV=L.featureGroup().addTo(main_map,{pane:'RMV'});

var osm2 = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom: 0, maxZoom: 13});
//var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true,zoomLevelOffset:-7}).addTo(main_map);    

var basemap={"Basemap":openstreetmap_layer};
var siteicon='<img src="img/Site.jpg">Sites';
var infraicon='<img src="img/Infrastructure.jpg">Infrastructure';
var infsiaicon='<img src="img/InfluenceArea.jpg">Influence Area';
var openairicon='<img src="img/OpenAir.jpg">Open air activity';
var landuseicon='<img src="img/LandUse.jpg">Land Use';
var routeicon='<img src="img/Route.jpg">Route';
var changeicon='<img src="img/Change.jpg">Change';
var naturaicon='<img src="img/Natura2000.jpg">Natura 2000';
var changeicon='<img src="img/Change.jpg">Change';

var overlay={
'Satellite view':Esri_WorldImagery,
'<img src="img/RMRAreas.png" width="16px">RM/R Areas':Areas,
'<img src="img/role-model-official.png" width="16px"><span title="Rural Heritage Hub of the Role Model where all the stakeholders gather"> Role Models (RM) Hub</span>':rmMarkers,
'<img src="img/replicator-official.png" width="16px"><span title="Rural Heritage Hub of the Replicator where all the stakeholders gather"> Replicators (R) Hub</span>':rMarkers,
'<img src="img/InfluenceArea.png" width="16px"><span title="Area of influence and interaction of the RM/R with the territory"> Area of influence</span>':InfSia,
'<img src="img/LandUse.png" width="16px"><span title="Agricultural, industrial, commercial and residential distribution of the land"> Land Use</span>':LandUse,
'<img src="img/Site.png" width="16px"><span title="Sites with historic/cultural/natural/social interest"> Site of interest</span>':Sites,
'<img src="img/Change.png" width="16px"><span title="Areas that are recently triggered a change in the RM/R"> Area of changes</span>':Change,
'<img src="img/OpenAir.png" width="16px"><span title="Relevant periodic open air activities"> Open-air activity</span>':OpenAir,
'<img src="img/Infrastructure.jpg" width="16px"><span title="Infrastructural elements within the RM/R Area"> Infrastructure</span>':Infrastr,
'<img src="img/Route.png" width="16px"><span title="Itineraries with religious/natural/historic/touristic significance"> Route</span>':Route,
'<img src="img/Buildings.png" width="16px"><span title="Significant buildings with heritage values, peculiar functions, or significance for RM/R">Buildings and artifacts</span>':Buildings,
'<img src="img/Events.png" width="16px"><span title="Temporal large scale cultural/art events"> Events</span>':Events,
'<img src="img/Tourism.png" width="16px"><span title="Tourism related buildings/kiosks/information points/etc"> Tourism</span>':Tourism,
'<img src="img/elemOfDist.png" width="16px"><span title="and interference with cultural natural heritage">Elements of disturbance</span>':Tourism,
'<img src="img/Town.png" width="16px"><span title="Closest urban areas with complementary functions"> Towns</span>':Towns,
'<img src="img/Infra.png" width="16px"><span title="Buildings in nearby towns with complementary functions">Public services</span>':InfrastrBuild,
'<img src="img/Natura2000.jpg" width="16px"><span title="Site of the network of protected areas in the world"> Natura 2000</span>':Natura,
'<img src="http://ratemyview.co.uk/img/panoramicview.png" width="16px"><span title="Photographs uploaded by the users of the RateMyView app"> RateMyView</span>':RMV,
'<img src="https://www.copernicus.eu/sites/default/files/styles/servicecards_icon_hover/public/2018-10/Land-hover.png?itok=LuSkXVw2" width="16px"><a onclick="$(\'#corineLegend\').toggle()" title="Click to show Corine legend">Corine land cover</a><img src="img/corine.png" style="display:none;margin-top:-433px;margin-left:-486px;width:350px" id="corineLegend">':CorineLandCover
};

L.control.layers(basemap, overlay,{collapsed:false}).addTo(main_map);




/*var pilIcon=L.icon({
iconUrl: 'static/img/PilgrimageIcon.png',

iconSize:     [57, 23 ], // size of the icon
});
var marker = L.marker([51.5, -0.09],{icon:pilIcon}).addTo(main_map);
marker.bindPopup('<iframe style="-ms-transform: scale(0.65)" src="http://84.124.106.115:8080/dashboard/snapshot/D00LjCDhOAboJJIacC6IjXhLD8HEfFCA?orgId=1"></iframe>',{maxWidth:600});*/

//omnivore.kml('/static/db/Puntos_Palencia.kml').addTo(main_map);

//var RMAreas=addRMArea();
zoomflag=0;

var areaLayer=false;
var pathLayer=false;
var siteLayer=false;
var townLayer=false;
var buildingsLayer=false;
var infraLayer=false;
var infraBuildLayer=false;
var openairLayer=false;
var landuseLayer=false;
var tourismLayer=false;
var routeLayer=false;
var changeLayer=false;
var eventLayer=false;
var infSiaLayer=false;
var naturaLayer=false;
var elemLayer=false;

var histbuildingsLayer=false;
var clickedBuilding;
var clickedTown;
var clickedSite;
var clickedLandUse;
var clickedInfra;
var clickedInfSIA;
var clickedChange;
var clickedTourism;
var clickedOpenAir;
var clickedOpenAir;
var clickedRoute;
var clickedNatura;
var clickedEvent;
var clickedElem;

var resultFlag=0;
main_map.on('zoomend', hideOnZoom);
//main_map.on('moveend', hideOnMove);


window.onLoad=updateMap();
//window.onLoad=getRMV();
//window.onload=$('.leaflet-control-layers').toggle();


function collapseMap(){
    if ($('#main_map')[0].style.height!='0vh'){
        $('#main_map')[0].style.height='0vh';
    }
    else{
        $('#main_map')[0].style.height='50vh';
    }
}
