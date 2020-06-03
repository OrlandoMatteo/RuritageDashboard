function buildingsStats (){
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/querybuildings',
		data: {},
		dataType: 'json',

		success: function(response) {
            placeBuildings(response);
            updateBuildingsStats(response)
			
		},
    });
}

function placeBuildings(data) {
	for (var i = 0; i < data.buildings.length; i++) {
		x = data.buildings[i];
		//var geoJsonBuildings=L.geoJson(x,{onEachFeature:onEachBuilding}).addTo(main_map);
		var geoJsonBuildings = L.geoJson(x, {
			pointToLayer: buildingStyle,
			onEachFeature: onEachBuilding,
		}).addTo(main_map);
		//geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});

	}
}
function buildingStyle(feature, latlng) {
	var BuildingIcon = L.icon({
		iconUrl: 'img/Buildings.png',
		iconSize: [42, 42],
	});
    // var marker = L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});
    var marker = L.marker(latlng,{riseOnHover: true});
	return marker;
}

function onEachBuilding(feature, layer) {
	//layer.bindTooltip(feature.properties.N_NAME) ;
	var content = '<h4 id="title">' + feature.properties.N_NAME + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><div id="extra"><font size="2"><b>Description</b><p>' +
		feature.properties.BUI_DESCRI +
		'</p><hr class="customHR">';
	lateral_content = buildingSidebar(feature.properties);
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
}

function buildingSidebar(properties) {
	content ="";
	name="";
	if (properties.O_NAME!=null){
		name=properties.O_NAME;
	}
	else{
		if(properties.N_NAME!=null){
		name=properties.N_NAME;
		}
		else{
			name=properties.NAME;
		}
	}
	content =
		content +
		'<h4 id="title">' +
		name+'</h4>';
	if (properties.RM_R_IM1!=null)
	{
		imageNames=properties.RM_R_IM1.split(',');
		//console.log(properties.RM_R_IM1);
		content=content+
		'<img src="'+api_url+'/images?RM_R_CODE='+properties.RM_R_CODE+'&imageName='+properties.RM_R_IM1+'" width=250px>';
	}
			
	content=content+'<hr class="customHR"><br><font size="2"><div id="extra"><font size="2">';
	var role=''
	if (properties.RM_R_CODE.includes('RM')){
		role='Role Model';
	}
	else{
		role='Replicator';
	}
	content=content+'<b style="color:'+rmRColor(properties.RM_R_CODE)+'">'+role+'-'+rmRDict[properties.RM_R_CODE]+'</b>';	
	if (properties.BUI_DESCRI!=null && properties.BUI_DESCRI!=undefined){
		content=content+'<p><b>Description</b><br>' +
		properties.BUI_DESCRI+'<br>';
	}
	if (properties.O_FUNCTION!=null || properties.O_FUNCTION!=undefined){
		content=content+
		'<br>Original function: ' +
		ofDict[properties.O_FUNCTION]
	}
	if (properties.N_FUNCTION!=null || properties.N_FUNCTION!=undefined){
		content=content+
			'<br>New function: ' +
		nfDict[properties.N_FUNCTION];
	}
	if (properties.BUI_TYP!=null || properties.BUI_TYP!=undefined){
		content=content+
		'<br>Type: ' +
		properties.BUI_TYP ;
	}
	if (properties.ACTIVITY!=null || properties.ACTIVITY!=undefined){
		content=content+
		'<br>Activity: ' +
		activityBuildDict[properties.ACTIVITY];
	}
	if (properties.NOTES!=null || properties.NOTES!=undefined){
		content=content+
		'<br>Notes:' +
		properties.NOTES;
	}
	if (properties.NOTE2!=null || properties.NOTE2!=undefined){
		content=content+
			'. '+properties.NOTE2;
	}
	content=content+'</p>';
	content = content.replace(/null/g, 'Not available');
	content = content.replace(/undefined/g, 'Not available');
	return content;
}

function updateBuildingsStats(response){
    $('#protected')[0].innerHTML=response.protected;
    $('#cultural')[0].innerHTML=response.cultural;
    $('#farms')[0].innerHTML=response.farms;
    $('#other')[0].innerHTML=response.other;
    //centroid=[response.centroid.geometry.coordinates[1],response.centroid.geometry.coordinates[0]]
    //main_map.setView(centroid,8)
}