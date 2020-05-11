function routesStats() {
    var rm_R=selectRMR.selected()
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/queryroutes',
		data: {rm_r : JSON.stringify(rm_R)},
		dataType: 'json',

		success: function(response) {
            placeRoute(response);
            updateRoutesStats(response);
        },
	});
}

function onEachRoute(feature, layer) {
	layer.bindTooltip('Route') ;
	var content = '<h4 id="title">' + feature.properties.N_NAME + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p>';
	if (feature.properties.CHAR_SIA!=null && feature.properties.CHAR_SIA!=undefined){
	lateral_content=lateral_content+
		'<br>Characterization: ' +
		charDict[feature.properties.CHAR_SIA];
	}
	if (feature.properties.NOTES!=null && feature.properties.NOTES!=undefined){
	lateral_content=lateral_content+
		'<br>Notes: ' +
		feature.properties.NOTES;
	}
	if (feature.properties.START!=null && feature.properties.START!=undefined){
	lateral_content=lateral_content+
		'<br>Start :' +
		feature.properties.START;
	}
	if (feature.properties.END!=null && feature.properties.END!=undefined){
	lateral_content=lateral_content+
		'<br>End: ' +
		feature.properties.END;
	}

	lateral_content=lateral_content+'</p></div>';
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
//		main_map.setView(e.target._latlngs[0][0]);
	//	$('#lateral').html(lateral_content);
	if (clickedRoute) {
			clickedRoute.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedRoute = e.target;

});
}

function placeRoute(data) {


	for (var i = 0; i < data.routes.length; i++) {
		x = data.routes[i];
		var routeStyle = {
			color: '#633d03',
			weight: 5,
			opacity: 1,
			dashArray : [2,7]
		};
		var geoJsonSites = L.geoJson(x, {
			style :routeStyle,
			onEachFeature: onEachRoute,
		}).addTo(main_map);
	}
}

function updateRoutesStats(response){
    centroid=[response.centroid.geometry.coordinates[1],response.centroid.geometry.coordinates[0]]
    main_map.setView(centroid,8)
}