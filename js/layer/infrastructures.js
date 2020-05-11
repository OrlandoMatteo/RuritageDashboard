

function infrastructureStats(){
    var rm_R=selectRMR.selected()
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/queryinfrastr',
		data: {rm_r : JSON.stringify(rm_R)},
		dataType: 'json',
		success: function(response) {
            placeInfrastr(response);
            updateInfraStats(response);
		},
	});
}

function placeInfrastr(data) {
	for (var i = 0; i < data.infrastructures.length; i++) {
		x = data.infrastructures[i];
		var geoJsonSites = L.geoJson(x, {
		//	pointToLayer: SiteStyle,
			onEachFeature: onEachInfrastr,
		}).addTo(main_map);
	}
}

function InfrastrStyle(feature, latlng) {
	/*var SiteIcon = L.icon({
			iconUrl: 'img/site.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}
function onEachInfrastr(feature, layer) {
	layer.bindTooltip('Infrastructure',{sticky:true}) ;
	var content = '<h4 id="title">' + feature.properties.N_NAME + '</h4>';
	//if (feature.properties.INF_DESCRI!='Not available') {
	content =
		content +
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p><h6>Description</h6><font size="2">' +
		feature.properties.INF_DESCRI +
		'</p><hr class="customHR">';
	var lateral_content =
		content +
		'<br><font size="2"><div id="extra"><font size="2"><p>';
	if (feature.properties.INF_TYPE!=null && feature.properties.INF_TYPE!=undefined){
		lateral_content=lateral_content+
		'Infrastructure Type: ' +
		infraTypeDict[feature.properties.INF_TYPE]
	}
	if (feature.properties.INF_CAT!=null && feature.properties.INF_CAT!=undefined){
		lateral_content=lateral_content+
		'<br>Category: ' +
		feature.properties.INF_CAT ;
	}
	if (feature.properties.NOTES!=null && feature.properties.NOTES!=undefined){
		lateral_content=lateral_content+
		'<br>Notes: ' +
		feature.properties.NOTES ;
	}
	lateral_content=lateral_content+'</p></div>';
	//}
	/*else{
		var lateral_content='<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">X</u></font>'+content+'<br><font size="2"><div id="extra"><font size="2"></div>';
	    }*/
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
}
function updateInfraStats(response){
    centroid=[response.centroid.geometry.coordinates[1],response.centroid.geometry.coordinates[0]]
    main_map.setView(centroid,8)
    console.log(response.types)
    var values = $.map(response.types, function(value, key) { return value });
    var keys = $.map(response.types, function(value, key) { return infraTypeDict[key] });
    options = {
        series: values,
        labels: keys,
        chart: {
            type: 'donut',
            height: "300",
          },

      }
    var chart = new ApexCharts(document.querySelector("#inftypechart"), options);
        chart.render();

}