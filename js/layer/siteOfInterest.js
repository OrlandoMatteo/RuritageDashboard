function siteOfInterestStats(){
    var rm_R=selectRMR.selected()
    bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/querysites',
		data: {bounds: JSON.stringify(bounds),rm_r:JSON.stringify(rm_R)},
		dataType: 'json',

		success: function(response) {
            x = response;
            placeSite(response);
            updateSiteStats(response);

		},
	});
}
function onEachSite(feature, layer) {
	layer.bindTooltip('Site of interest') ;
	var content = '<h4 id="title">' +feature.properties.NAME+ '</h4>';
var role=''
	if (feature.properties.RM_R_CODE.includes('RM')){
		role='Role Model';
	}
	else{
		role='Replicator';
	}
	var lateral_content =
			content +
			' <hr class="customHR"><b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+role+'-'+rmRDict[feature.properties.RM_R_CODE]+'</b><font size="2"><div id="extra"><font size="2"><p>';
	if (feature.properties.NOTES!=null && feature.properties.NOTES!=undefined){
		lateral_content=lateral_content+
			feature.properties.NOTES;
	}
	if (feature.properties.CHAR_SIA!=null && feature.properties.CHAR_SIA!=undefined){
		lateral_content=lateral_content+
			'<br>' +charDict[feature.properties.CHAR_SIA];
	}
	if (feature.properties.NOTE2!=null && feature.properties.NOTE2!=undefined){
		lateral_content=lateral_content+
		'<br>Note: '+feature.properties.NOTE2;
	}
	/*if (feature.properties.SIT_STATUS)
	{
		lateral_content=lateral_content+'<br>' +sitStatusTranslate(feature.properties.SIT_STATUS);
	}*/
	lateral_content=lateral_content+'</p></div>';
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
		main_map.setView(e.target._latlngs[0][0]);
		//$('#lateral').html(lateral_content);
		if (clickedSite) {
			clickedSite.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedSite = e.target;
		clickedBuilding=null;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}

function placeSite(data) {

	for (var i = 0; i < data.sites.length; i++) {
		x = data.sites[i];
		//var geoJsonBuildings=L.geoJson(x,{onEachFeature:onEachBuilding}).addTo(main_map);
		var geoJsonSites = L.geoJson(x, {
			//pointToLayer: SiteStyle,
			onEachFeature: onEachSite,
			// pane: 'Sites',
		}).addTo(main_map);
		//console.log(geoJsonSites.getBounds());
		//console.log(main_map.getBounds());
		geoJsonSites.setStyle({color: '#fa3939'});
		//geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});
		//Sites.addLayer(geoJsonSites);
	}
}

function updateSiteStats(response){
    $('#featureCount')[0].innerHTML=response.featureCount;
    $('#unescoSites')[0].innerHTML=response.unescoSites;
    $('#nationalSites')[0].innerHTML=response.nationalSites;
    $('#otherSites')[0].innerHTML=response.otherSites;
    centroid=[response.centroid.geometry.coordinates[1],response.centroid.geometry.coordinates[0]]
    main_map.setView(centroid,8)

}