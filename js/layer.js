//CODE FOR INFRASTR
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
	layer.on('click', function(e) {
		if(e.target._latlngs[0].length!=1){
			x=e.target._latlngs[0][0]
		}
		else{
			x=e.target._latlngs[0][0][0]
		}
	//	main_map.setView(x);
	//	$('#lateral').html(lateral_content);
		if (clickedInfra) {
			clickedInfra.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedInfra = e.target;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}
function placeInfrastr(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
		//	pointToLayer: SiteStyle,
			onEachFeature: onEachInfrastr,
			pane: 'Infrastr',
		}).addTo(main_map);
		geoJsonSites.setStyle({color: '#5a5a5a'});
		Infrastr.addLayer(geoJsonSites);
	}
}
/*function placeInfrastr(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachInfrastr}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {
			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addInfrastr() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/infrastrarea',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeInfrastr(x);
		},
	});
}

function InfrastrStyleBuild(feature, latlng) {
	/*var SiteIcon = L.icon({
			iconUrl: 'img/site.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var TourismIcon = L.icon({
			iconUrl: 'img/Infra.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: TourismIcon, riseOnHover: true});
	
	
	return marker;
}
function onEachInfrastrBuild(feature, layer) {
	layer.bindTooltip('Relevant public services',{sticky:true}) ;
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
	layer.on('click', function(e) {
		if (clickedInfra) {
			clickedInfra.setIcon(
				L.icon({
					iconUrl: 'img/Infra.png',
					iconSize: [42, 42], // size of the icon
				})
			);
		}
		var layer = e.target;
		e.target.setIcon(
			L.icon({
				iconUrl: 'img/Infra.png',
				iconSize: [60, 60], // size of the icon
			})
		);
		clickedInfra = e.target;

		
		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}
function placeInfrastrBuild(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			pointToLayer: InfrastrStyleBuild,
			onEachFeature: onEachInfrastrBuild,
			pane: 'InfrastrBuild',
		}).addTo(main_map);
		InfrastrBuild.addLayer(geoJsonSites);
	}
}
/*function placeInfrastr(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachInfrastr}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {
			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addInfrastrBuild() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/infrastrbuild',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeInfrastrBuild(x);
		},
	});
}


// CODE FOR INF SIA
function InfSiaStyle(feature, latlng) {
	/*var SiteIcon = L.icon({
			iconUrl: 'img/site.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}
function onEachInfSia(feature, layer){ 
	layer.bindTooltip('RM/R Influence Area',{sticky:true}) ;
	///
	var content = '<h4 id="title">Area of influence</h4>';
	//if (feature.properties.DESCRIPTION!='Not available') {
	var lateral_content =
		content +
		'<br><hr class="customHR"><font size="2"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p><br>' +
		feature.properties.NAME+
		'<p><br>Characterization ' +
		charDict[feature.properties.CHAR] +
		'<br>Notes : ' +
		feature.properties.NOTES+
		'</p></div>';
	/*}
	    else{
		var lateral_content='<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">X</u></font>'+content+'<br><font size="2"><div id="extra"><font size="2"></div>';
	    }*/
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
	//	main_map.setView(e.target._latlngs[0][0]);
	//	$('#lateral').html(lateral_content);
		if (clickedInfSIA) {
			clickedInfSIA.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedInfSIA = e.target;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}
function placeInfSia(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			/*pointToLayer:InfSiaStyle, */ onEachFeature: onEachInfSia,
			pane: 'InfSia',
		}).addTo(main_map);
		geoJsonSites.setStyle({color:'#6c5136'});
		InfSia.addLayer(geoJsonSites);
	}
}
/*function placeInfSia(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachInfSia}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {

			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addInfSia() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/infsia',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeInfSia(x);
		},
	});
}

//CODE  FOR OPENAIR
function OpenAirStyle(feature, latlng) {
	/*var SiteIcon = L.icon({
			iconUrl: 'img/site.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}

function onEachOpenAir(feature, layer) {
	layer.bindTooltip('Open air activities'),{sticky:true} ;
	var content = '<h4 id="title">' + feature.properties.NAME_ACT + '</h4>';
	//if (feature.properties.DESCRIPTION!='Not available') {
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p>'+
		'Description:'+
		activityBuildDict[feature.properties.ACTIVITY] +
		'<br>Characterization: ' +
		charDict[feature.properties.CHAR_SIA];
	if (feature.properties.PERIODIC!=null && feature.properties.PERIODIC!=undefined && feature.properties!='O'){
		lateral_content=lateral_content+'<br>Periodicity: ' +
		eventPeriodDict[feature.properties.PERIODIC];
	}
	if (feature.properties.TEMP_STA!=null){
		lateral_content=lateral_content+
		'<br>Season: '+
		seasonDict[feature.properties.TEMP_STA.substring(0,2)]+
		'</p></div>';
	}
	
	lateral_content=lateral_content+'<br>Notes: '+feature.properties.NOTES+'</p></div>';
	/*}
	    else{
		var lateral_content='<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">X</u></font>'+content+'<br><font size="2"><div id="extra"><font size="2"></div>';
	    }*/
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
		if(e.target._latlngs[0].length!=1){
			x=e.target._latlngs[0][0]
		}
		else{
			x=e.target._latlngs[0][0][0]
		}
	//	main_map.setView(x);
	//	$('#lateral').html(lateral_content);
		if (clickedOpenAir) {
			clickedOpenAir.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedOpenAir = e.target;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}

function placeOpenAir(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			/*pointToLayer:OpenAirStyle,*/ onEachFeature: onEachOpenAir,
			pane: 'OpenAir',
		}).addTo(main_map);
		geoJsonSites.setStyle({color: '#63ceff'});
		OpenAir.addLayer(geoJsonSites);
	}
}

/*function placeOpenAir(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachOpenAir}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {

			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addOpenAir() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/openair',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeOpenAir(x);
		},
	});
}

// CODE FOR LAND USE
function LandUseStyle(feature, latlng) {
	/*var SiteIcon = L.icon({
			iconUrl: 'img/site.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}

function onEachLandUse(feature, layer) {
	layer.bindTooltip('Land use') ;
	var content =
		'<h4 id="title">Land Use</h4>';
	//if (feature.properties.DESCRIPTION!='Not available') {
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p>Description: '+landUseDict[feature.properties.ACTIVITY];
	if (feature.properties.CHAR!=null && feature.properties.CHAR!=undefined){
		lateral_content=lateral_content+
		'<br>Characterization: ' +
		charDict[feature.properties.CHAR];
	}	
	if (feature.properties.NOTES!=null && feature.properties.NOTES!=undefined){
		lateral_content=lateral_content+
		'<br>Notes: '+feature.properties.NOTES;
	}
	lateral_content=lateral_content+'</a></p></div>';
	/*}
	    else{
		var lateral_content='<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">X</u></font>'+content+'<br><font size="2"><div id="extra"><font size="2"></div>';
	    }*/
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
		if(e.target._latlngs[0].length!=1){
			x=e.target._latlngs[0][0]
		}
		else{
			x=e.target._latlngs[0][0][0]
		}
	//	main_map.setView(x);
	//	$('#lateral').html(lateral_content);
		if (clickedLandUse) {
			clickedLandUse.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedLandUse = e.target;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}

function placeLandUse(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			/*pointToLayer:LandUseStyle,*/ onEachFeature: onEachLandUse,
			pane: 'LandUse',
		}).addTo(main_map);
		geoJsonSites.setStyle({color: '#455424'});
		LandUse.addLayer(geoJsonSites);
	}
}

/*function placeLandUse(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachLandUse}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {

			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addLandUse() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/landuse',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeLandUse(x);
		},
	});
}
// CODE for TOURISM
function TourismStyle(feature, latlng) {
	var TourismIcon = L.icon({
			iconUrl: 'img/Tourism.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: TourismIcon, riseOnHover: true});
	//var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}

function onEachTourism(feature, layer) {
	layer.bindTooltip('Tourism information point') ;
	var content = '<h4 id="title">' + feature.properties.NAME + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p><br>Type: ' +
		tourismDict[feature.properties.TYPE] +
		'</p></div>';
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
		//main_map.setView(e.latlng);
		//$('#lateral').html(lateral_content);
	
//		main_map.setView(e.latlng, zoom);
	//	$('#lateral').html(lateral_content);
		//console.log(layer);
		if (clickedTourism) {
			clickedTourism.setIcon(
				L.icon({
					iconUrl: 'img/Tourism.png',
					iconSize: [42, 42], // size of the icon
				})
			);
		}
		var layer = e.target;
		e.target.setIcon(
			L.icon({
				iconUrl: 'img/Tourism.png',
				iconSize: [60, 60], // size of the icon
			})
		);
		clickedTourism = e.target;

		//info.update(layer.feature.properties);

		//layer.getPopup().openPopup();
	});

}

function placeTourism(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			pointToLayer:TourismStyle,
			onEachFeature: onEachTourism,
			pane: 'Tourism',
		}).addTo(main_map);
		Tourism.addLayer(geoJsonSites);
	}
}

/*function placeTourism(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachTourism}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {

			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addTourism() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/tourism',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeTourism(x);
		},
	});
}
//CODE FOR ROUTE
function RouteStyle(feature, latlng) {
	/*var SiteIcon = L.icon({
			iconUrl: 'img/site.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
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
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var routeStyle = {
			color: '#633d03',
			weight: 5,
			opacity: 1,
			dashArray : [2,7]
		};
		var geoJsonSites = L.geoJson(x, {
			style :routeStyle,
			onEachFeature: onEachRoute,
			pane: 'Route',
		}).addTo(main_map);
		Route.addLayer(geoJsonSites);
	}
}

/*function placeRoute(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachRoute}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {

			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addRoute() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/route',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeRoute(x);
		},
	});
}
//CODE FOR CHANGE
function ChangeStyle(feature, latlng) {
	/*var SiteIcon = L.icon({
			iconUrl: 'img/site.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	    var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}

function onEachChange(feature, layer) {
	layer.bindTooltip('Main changes') ;
	var content = '<h4 id="title">' + feature.properties.N_NAME + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p><br>Description: ' +
		feature.properties.CHANGE1+' - '+feature.properties.EXP1+
		'</p></div>';
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
////		main_map.setView(e.target._latlngs[0][0]);
		//$('#lateral').html(lateral_content);
		if (clickedChange) {
			clickedChange.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedChange = e.target;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}

function placeChange(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			/*pointToLayer:ChangeStyle,*/ onEachFeature: onEachChange,
			pane: 'Change',
		}).addTo(main_map);
		geoJsonSites.setStyle({color: '#ddff00'});
		Change.addLayer(geoJsonSites);
	}
}

/*function placeChange(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachChange}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {

			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addChange() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/change',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeChange(x);
		},
	});
}

//CODE FOR NATURA 2000
function onEachNatura(feature,layer){
	layer.bindTooltip('Natura2000');
	var content='<h4 id="title">'+feature.properties.SITENAME+ '</h4>';
	var lateral_content =
		content+'<br><hr class="customHR">'; 
	if (feature.properties.SITETYPE=='A'){
		lateral_content+='<br>SPA (Special Protection Areas)';
	}
	if (feature.properties.SITETYPE=='B'){
		lateral_content+='<br>SCI (Special Conservation Importance)';
	}
	if (feature.properties.SITETYPE=='C'){
		lateral_content+='<br>SPA (Special Protection Areas)<br>SCI (Special Conservation Importance)';
	}
layer.bindPopup(lateral_content);
layer.on('click', function(e) {
//		main_map.setView(e.target._latlngs[0][0]);
		//$('#lateral').html(lateral_content);
		if (clickedNatura) {
			clickedNatura.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedNatura = e.target;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
	
}
function placeNatura(data) {
	for (var i = 0; i < data.naturaSites.length; i++) {
		x = data.naturaSites[i];
		var geoJsonSites = L.geoJson(x, {
			onEachFeature: onEachNatura,
			pane: 'Natura',
		}).addTo(main_map);
		geoJsonSites.setStyle({color: '#82014e'});
		Natura.addLayer(geoJsonSites);
	}
}
function addNatura2000(){
	var naturaResult = $.ajax({
		method: 'GET',
		url: api_url+'/natura',
		dataType: 'json',

		success: function(response) {
			x = response;
			placeNatura(x);
		},
	});
}

//CODE FOR EVENTS
function EventsStyle(feature, latlng) {
	var EventsIcon = L.icon({
			iconUrl: 'img/Events.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	var marker=L.marker(latlng, {icon: EventsIcon, riseOnHover: true});
	//var marker = L.marker(latlng, {riseOnHover: true});
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
layer.on('click', function(e) {
		//main_map.setView(e.latlng);
	
//		main_map.setView(e.target._latlng,17);
		//$('#lateral').html(lateral_content);
		//console.log(layer);
		if (clickedEvent) {
			clickedEvent.setIcon(
				L.icon({
					iconUrl: 'img/Events.png',
					iconSize: [42, 42], // size of the icon
				})
			);
		}
		var layer = e.target;
		e.target.setIcon(
			L.icon({
				iconUrl: 'img/Events.png',
				iconSize: [60, 60], // size of the icon
			})
		);
		clickedEvent = e.target;

		//info.update(layer.feature.properties);

		//layer.getPopup().openPopup();
	});
}

function placeEvents(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			pointToLayer:EventsStyle,
			onEachFeature: onEachEvent,
			pane: 'Events',
		}).addTo(main_map);
		Events.addLayer(geoJsonSites);
	}
}

/*function placeTourism(data) {
	    for (var i = 0; i < data.features.length; i++) {
		x=data.features[i];
		var areaSites=L.geoJson(x,{ onEachFeature:onEachTourism}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
		    switch (feature.geometry.properties.SIA)
		    {

			case "Sustainable food production":
			return {color:'#29e12c'};

			case "Pilgrimage":
			return {color:'#633d03'};
		}});
		Sites.addLayer(areaSites);
	    }
}*/
function addEvents() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/events',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeEvents(x);
		},
	});
}
function addNearTown() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/ntown',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeTowns(x);
		},
	});
}
//Nat risk

function onEachRiskZone(feature, layer) {
	layer.bindTooltip('Natural risk zone') ;
	var content =
		'<h4 id="title">'+feature.properties.NAME+'</h4>';
	//if (feature.properties.DESCRIPTION!='Not available') {
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>';
	if (feature.properties.NOTES!=null && feature.properties.NOTES!=undefined){
		lateral_content=lateral_content+
		'<br>Description: ' +
		feature.properties.NOTES;
	}	
	lateral_content=lateral_content+'</a></p></div>';
	/*}
	    else{
		var lateral_content='<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">X</u></font>'+content+'<br><font size="2"><div id="extra"><font size="2"></div>';
	    }*/
	lateral_content = lateral_content.replace(/undefined/g, 'Not available');
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
		if(e.target._latlngs[0].length!=1){
			x=e.target._latlngs[0][0]
		}
		else{
			x=e.target._latlngs[0][0][0]
		}
	//	main_map.setView(x);
	//	$('#lateral').html(lateral_content);
		if (clickedLandUse) {
			clickedLandUse.setStyle(
				{weight:3}			);
		}
		var layer = e.target;
		e.target.setStyle(
			{weight:12}	
					);
		clickedLandUse = e.target;

		//info.update(layer.feature.properties);
		//layer.getPopup().openPopup();
	});
}

function placeRiskZone(data) {
	for (var i = 0; i < data.sites.length; i++) {
		x = data.sites[i];
		var geoJsonSites = L.geoJson(x, {
			/*pointToLayer:LandUseStyle,*/ onEachFeature: onEachRiskZone,
			pane: 'LandUse',
		}).addTo(main_map);
		geoJsonSites.setStyle({color: '#455424'});
		LandUse.addLayer(geoJsonSites);
	}
}
function addRiskZone() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/queryriskareas',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeRiskZone(x);
		},
	});
}

//ELEMS OF DISTURBANCE
function addElemsOfDist() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/elemofdist',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeElemsOfDist(x);
		},
	});
}

function placeElemsOfDist(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var geoJsonSites = L.geoJson(x, {
			pointToLayer:ElemsOfDistStyle,
			onEachFeature: onEachElemsOfDist,
			pane: 'Events',
		}).addTo(main_map);
		Events.addLayer(geoJsonSites);
	}
}
function ElemsOfDistStyle(feature, latlng) {
	var ElemIcon = L.icon({
			iconUrl: 'img/elemOfDist.png',
			iconSize:     [42,42], // size of the icon
		    });

			//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	var marker=L.marker(latlng, {icon: ElemIcon, riseOnHover: true});
	//var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
}

function onEachElemsOfDist(feature, layer) {
	layer.bindTooltip('Element of disturbance') ;
	var content = '<h4 id="title">' + feature.properties.NOTES + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><hr class="customHR"><div id="extra"><font size="2">'+
'<b style="color:'+rmRColor(feature.properties.RM_R_CODE)+'">'+rmRDict[feature.properties.RM_R_CODE]+'</b>'+
		'<p>';
	
	layer.bindPopup(lateral_content);
layer.on('click', function(e) {
		//main_map.setView(e.latlng);
	
//		main_map.setView(e.target._latlng,17);
		//$('#lateral').html(lateral_content);
		//console.log(layer);
		if (clickedElem) {
			clickedElem.setIcon(
				L.icon({
					iconUrl: 'img/elemOfDist.png',
					iconSize: [42, 42], // size of the icon
				})
			);
		}
		var layer = e.target;
		e.target.setIcon(
			L.icon({
				iconUrl: 'img/elemOfDist.png',
				iconSize: [60, 60], // size of the icon
			})
		);
		clickedElem = e.target;

		//info.update(layer.feature.properties);

		//layer.getPopup().openPopup();
	});
}
