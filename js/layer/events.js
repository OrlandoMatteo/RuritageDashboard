function eventsStats(){ 
    var rm_R=selectRMR.selected()
    var queryResult = $.ajax({
        method: 'GET',
        url: api_url+'/queryevents',
        data: {rm_r : JSON.stringify(rm_R)},
        dataType: 'json',

        success: function(response) {
            placeEvents(response);
            updateStatsEvents(response);
        },
    });
}

function placeEvents(data) {
	for (var i = 0; i < data.events.length; i++) {
		x = data.events[i];
		var geoJsonSites = L.geoJson(x, {
			pointToLayer:EventsStyle,
			onEachFeature: onEachEvent,
		}).addTo(main_map);
	}
}

function EventsStyle(feature, latlng) {
	var EventsIcon = L.icon({
			iconUrl: 'img/Events.png',
			iconSize:     [42,42], // size of the icon
		    });
	//var marker=L.marker(latlng, {icon: EventsIcon, riseOnHover: true});
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}

function onEachEvent(feature, layer) {
	layer.bindTooltip('Event') ;
	var content = '<h4 id="title">' + feature.properties.EVE_NAME + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p>';
	if (feature.properties.EVE_DESCRI!=null && feature.properties.EVE_DESCRI!=undefined){
		lateral_content=lateral_content+
		'Description: '+feature.properties.EVE_DESCRI;
	}
	if (feature.properties.EVE_TYPE!=null && feature.properties.EVE_TYPE!=undefined){
		lateral_content=lateral_content+
		'<br>Type: ' +
		eventTypeDict[feature.properties.EVE_TYPE];
	}
	if (feature.properties.EVE_DATING!=null && feature.properties.EVE_DATING!=undefined){
		lateral_content=lateral_content+
		'<br>' +feature.properties.EVE_DATING;
	}
	if (feature.properties.NOTES!=null && feature.properties.NOTES!=undefined){
		lateral_content=lateral_content+
		'<br>Notes: '+feature.properties.NOTES;
	}
	lateral_content=lateral_content+
		'</p></div>';
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	
	layer.bindPopup(lateral_content);

}

function updateStatsEvents(response){
    $('#summer')[0].innerHTML=response.summer;
    $('#winter')[0].innerHTML=response.winter;
    $('#spring')[0].innerHTML=response.spring;
    $('#autumn')[0].innerHTML=response.autumn;
    centroid=[response.centroid.geometry.coordinates[1],response.centroid.geometry.coordinates[0]]
    main_map.setView(centroid,8)
}
