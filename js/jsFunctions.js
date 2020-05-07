function add_video() {
	// body...
	var marker_video = L.marker([45, -75.621562], {
		icon: new L.Icon.Default(),
	}).addTo(main_map);

	var icon_fd6df06ccdfb4bb89fd3b07b01e1a6a0 = L.AwesomeMarkers.icon({
		icon: 'video',
		iconColor: 'white',
		markerColor: 'red',
		prefix: 'fa',
		extraClasses: 'fa-rotate-0',
	});
	marker_video.setIcon(icon_fd6df06ccdfb4bb89fd3b07b01e1a6a0);

	var popup_a931dc205b904e72baa4c8dc9eb3dbe9 = L.popup({maxWidth: '300'});
	popup_a931dc205b904e72baa4c8dc9eb3dbe9.setContent('<video width="300" src="https://magmageopark.no/wp-content/uploads/2018/05/Magma-Webside-test2.mp4" type="video/mp4" controls></video>');
	//popup_a931dc205b904e72baa4c8dc9eb3dbe9.setContent('<p>Hello world!<br />This is a nice popup.</p>');
	marker_video.bindPopup(popup_a931dc205b904e72baa4c8dc9eb3dbe9);
}

function add3d(model3d) {
	// body...
	var marker_3d = L.marker([45, -75.621562], {
		icon: new L.Icon.Default(),
	}).addTo(main_map);

	var popupContent = '<iframe src="3D"></iframe>';
	var popup = L.popup().setContent(popupContent);
	marker_3d.bindPopup(popup);
	//new Vue({  el: '#app' });
}

function toggleChallenges() {
	$('#challengesTable').toggle();
	if ($('#tabletoggler').html()=='show more'){
	$('#tabletoggler').html('show less');
	}
	else{
	$('#tabletoggler').html('show more');
	}
}

function descriptionToggle(){
$("#residualdescr").toggle();
	if ($("#expandedDescr").html()=='\nshow less'){
		$("#expandedDescr").html('... show more');
	}
	else{
		$("#expandedDescr").html('\nshow less');
	}
}
function ecoToggle(){
$("#residualEco").toggle();
	if ($("#expandedEco").html()=='\nshow less'){
		$("#expandedEco").html('... show more');
	}
	else{
		$("#expandedEco").html('\nshow less');
	}
}
function createPopup(feature_properties) {
	/*
    table='<p>'+feature_properties.Description+'</p><br>\
    <table class="table" style="width:100%" >\
        <tr><th>Main Economic Sector</th><td>'+feature_properties.MainEconomicSector+'</td></tr>\
        <tr><th>Ageing</th><td id="1">'+feature_properties.Ageing+'</td></tr>\
        <tr><th>Immigrant</th><td id="2">'+feature_properties.Immigrant+'</td></tr>\
        <tr><th>Depopulation</th><td id="3">'+feature_properties.Depopulation+'</td></tr>\
        <tr><th>Unemployment</th><td id="4">'+feature_properties.Unemployment+'</td></tr>\
        <tr><th>Poverty</th><td id="5">'+feature_properties.Poverty+'</td></tr>\
    </table>'

    */
	var clipAt=150;
	var shortDesc='<span>'+feature_properties.Description.substr(0,clipAt)+'</span>';
	var residual='<span id="residualdescr" style="display:none">'+feature_properties.Description.substr(clipAt,feature_properties.Description.length)+'</span>';
	var description=shortDesc+residual+'<a style="cursor: pointer; color:#93bf38" id="expandedDescr" onclick="descriptionToggle()">... show more</a>';
	
	var ecnomic=""
	if (feature_properties.Role == 'RM')
	{
	var clipAt=100;
	var shortEco='<span>'+feature_properties.MainEconomicSector.substr(0,clipAt)+'</span>';
	var residualEco='<span id="residualEco" style="display:none">'+feature_properties.MainEconomicSector.substr(clipAt,feature_properties.MainEconomicSector.length)+'</span>';
	economic=shortEco+residualEco+'<a style="cursor: pointer; color:#93bf38" id="expandedEco" onclick="ecoToggle()">... show more</a>';
	}
	var table =
		'<h4 id="title">' +
		feature_properties.Name +
		'</h4>'+
		'<h5 style="color:'+SIAColor2(feature_properties.SIA)+'">'+roleDict[feature_properties.Role]+
		'<img src="'+siaImage[feature_properties.SIA]+'" width="210" height="35"></h5>'+
		' <br><font size="2"><div id="extra"><font size="2"><br><b>Description</b><p>' +
		description +
		'</p><hr class="customHR">';
	if (feature_properties.Role == 'RM') {
		table +=
			'<br><b style="cursor: pointer; color:#93bf38" onClick="viewPractices(' +
			feature_properties.ID +
			')" ><u>View Best Practices</u></b><br>';
		table +=
			'<br><b>Main Economic Sector</b><br>' +
			economic+
			'<br>';
		table +=
			'<br><b>Challenges     </b><a style="cursor: pointer; color:#93bf38" id="tabletoggler" onClick="toggleChallenges()">show more</a><br><table id="challengesTable"  class="table" style="width:100%; display:none" >';

		toavoid = ['Description', 'Role', 'Name', 'SIA', 'MainEconomicSector'];
		for (var item in feature_properties) {
			if (toavoid.indexOf(item) == -1) {
				if (feature_properties[item]) {
					row = '<tr><th>' + item.toString() + '</th>';
					if (feature_properties[item].startsWith('YES')) {
						row +=
							'<td style="background-color:#f7b446">' +
							feature_properties[item] +
							'</td></tr>';
					} else {
						row += '<td>' + feature_properties[item] + '</td></tr>';
					}
				}
				table += row;
			}
		}
		table += '</table></font></div>';
	}
	return table;
}

function onEachEntity(feature, layer) {
	/*
        layer.bindTooltip(feature.properties.Name);
        content=createPopup(feature.properties);
        layer.bindPopup('<h4 id="title">'+feature.properties.Name+'</h4> ',{maxHeight:200,maxWidth: main_map.getSize()[1]});
        layer.on('click', function(e){
            main_map.setView(e.latlng, 9);
            $('#lateral').html('<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">Close</u></font>'+content)

        });
*/
	id = feature.properties.ID;
	role = feature.properties.Role;
	layer.bindTooltip(feature.properties['RM_R_CODE']);
/*	main_map.eachLayer(function(livello) {
		if (livello.feature) {
			if (livello.feature.properties.Role) {
				if (
					livello.feature.properties.ID == id &&
					livello.feature.properties.Role == role
				) {
					content = createPopup(livello.feature.properties);
					layer.bindPopup(
						'<h4 id="title">' + feature.properties.Name + '</h4> ',
						{maxHeight: 200, maxWidth: 400},
					);
				}
			}
		}
	});
*/	
	
	content = createPopup(feature.properties);
	layer.bindPopup(content,{autoPan:true});
	layer.on('click', function(e) {
		var content = '';
		id = layer.feature.properties.ID;
		role = feature.properties.Role;
		main_map.eachLayer(function(livello) {
			if (livello.feature) {
				if (livello.feature.properties.Role) {
					if (
						livello.feature.properties.ID == id &&
						livello.feature.properties.Role == role
					) {
						//console.log(feature.properties);
					//	main_map.setView(e.latlng, 9);
						/*$('#lateral').html(
							'<font size="2"><u onClick="hideDescription()" style="cursor: pointer;">Minimize/Expand</u>&ensp;<u style="cursor: pointer;" onClick="closeLateral()">X</u></font>' +
								content,
						);*/
					}
				}
			}
		});
	});
}
/*
function RMStyle(feature,latlng){
    switch (feature.properties.SIA){
        case "SustainableFoodProduction":
            var SIA2Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: 'lightgreen',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA2Icon, riseOnHover: true});
        case "Pilgrimage":
            var SIA1Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: '#633d03',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA1Icon, riseOnHover: true});
        case "Migration":
            var SIA3Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: '#a8a8a8',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA3Icon, riseOnHover: true});
        case "ArtAndFestival":
            var SIA4Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: 'yellow',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA4Icon, riseOnHover: true});
        case "Resilience":
            var SIA5Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: '#c68c53',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA5Icon, riseOnHover: true});
        case "IntegratedLandscapeManagement":
            var SIA6Icon = L.AwesomeMarkers.icon({
                    icon: 'trophy',
                    iconColor: 'green',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA6Icon, riseOnHover: true});               
    }
}*/
function RMStyle2(feature, latlng) {
	switch (feature.properties.SIA) {
		case 'SustainableFoodProduction':
			var SIA2Icon = L.icon({
				iconUrl: 'img/rm_food.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA2Icon, riseOnHover: true});
		case 'Pilgrimage':
			var SIA1Icon = L.icon({
				iconUrl: 'img/rm_pilgrimage.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA1Icon, riseOnHover: true});
		case 'Migration':
			var SIA3Icon = L.icon({
				iconUrl: 'img/rm_migration.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA3Icon, riseOnHover: true});
		case 'ArtAndFestival':
			var SIA4Icon = L.icon({
				iconUrl: 'img/rm_artandfestival.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA4Icon, riseOnHover: true});
		case 'Resilience':
			var SIA5Icon = L.icon({
				iconUrl: 'img/rm_resilience.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA5Icon, riseOnHover: true});
		case 'IntegratedLandscapeManagement':
			var SIA6Icon = L.icon({
				iconUrl: 'img/rm_landscape.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA6Icon, riseOnHover: true});
	}
}

/*
function ReplicatorStyle(feature,latlng){
    switch (feature.properties.SIA){
        case "SustainableFoodProduction":
            var SIA2Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'lightgreen',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA2Icon, riseOnHover: true});
        case "Pilgrimage":
            var SIA1Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: '#633d03',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA1Icon, riseOnHover: true});
        case "Migration":
            var SIA3Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: '#a8a8a8',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA3Icon, riseOnHover: true});
        case "ArtAndFestival":
            var SIA4Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'yellow',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA4Icon, riseOnHover: true});
        case "Resilience":
            var SIA5Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'orange',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA5Icon, riseOnHover: true});
        case "IntegratedLandscapeManagement":
            var SIA6Icon = L.AwesomeMarkers.icon({
                    icon: 'user',
                    iconColor: 'green',
                    markerColor: 'white',
                    prefix: 'fa',
                    extraClasses: 'fa-rotate-0'
                    });
        return L.marker(latlng, {icon: SIA6Icon, riseOnHover: true});               
    }
}*/

function ReplicatorStyle2(feature, latlng) {
	switch (feature.properties.SIA) {
		case 'SustainableFoodProduction':
			var SIA2Icon = L.icon({
				iconUrl: 'img/r_food.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA2Icon, riseOnHover: true});
		case 'Pilgrimage':
			var SIA1Icon = L.icon({
				iconUrl: 'img/r_pilgrimage.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA1Icon, riseOnHover: true});
		case 'Migration':
			var SIA3Icon = L.icon({
				iconUrl: 'img/r_migration.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA3Icon, riseOnHover: true});
		case 'ArtAndFestival':
			var SIA4Icon = L.icon({
				iconUrl: 'img/r_artandfestival.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA4Icon, riseOnHover: true});
		case 'Resilience':
			var SIA5Icon = L.icon({
				iconUrl: 'img/r_resilience.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA5Icon, riseOnHover: true});
		case 'IntegratedLandscapeManagement':
			var SIA6Icon = L.icon({
				iconUrl: 'img/r_landscape.png',
				iconSize: [23, 27], // size of the icon
			});
			return L.marker(latlng, {icon: SIA6Icon, riseOnHover: true});
	}
}

function updateMap() {
	var roles = ["RoleModel","Replicator"];
	var sias = [];

	/*checkboxesRole = document.getElementById('roles');
	for (i = 0; i < checkboxesRole.children.length; i++) {
		if (checkboxesRole.children[i].type == 'checkbox') {
			if (checkboxesRole.children[i].checked) {
				roles.push(checkboxesRole.children[i].value);
			}
		}
	}
*/
	if (document.getElementById('sias')){
		checkboxesSIA = document.getElementById('sias');
		for (i = 0; i < checkboxesSIA.children.length; i++) {
			if (checkboxesSIA.children[i].type == 'checkbox') {
				if (checkboxesSIA.children[i].checked) {
					sias.push(checkboxesSIA.children[i].value);
				}
			}
		}
	}
	var queryResult = $.ajax({
		method: 'GET',
		url: 'http://localhost:8000/querySIA',
		data: {Roles: JSON.stringify(roles), SIAs: JSON.stringify(sias)},
		dataType: 'json',

		success: function(response) {
			x = response;
			if (roles.length == 0) {
				populateMap(x, roles);
			} else {
				for (var i = 0; i < roles.length; i++) {
					populateMap(x, roles);
				}
			}
			//populateMap(x,roles);
			//console.log(x);
		},
	});
	}
function initialMap(rm_r) {
	var queryResult = $.ajax({
		method: 'GET',
		url: '/initialMap',
		data: {Role: JSON.stringify(rm_r)},
		dataType: 'json',

		success: function(response) {
			x = response;
			populateMap(x, rm_r);
		},
	});
}
function populateMap(result, roles) {
	main_map.eachLayer(function(layer) {
		if (layer.feature) {
			if (
				layer.feature.properties.Role == 'RM' ||
				layer.feature.properties.Role == 'R'
			) {
				main_map.removeLayer(layer);
			}
		}
	});

	roleModelsJson = {type: 'FeatureCollection', features: []};
	for (var i = 0; i < result.features.length; i++) {
		if (result.features[i].properties.Role == 'RM') {
			roleModelsJson.features.push(result.features[i]);
		}
	}
	var geo_json_RoleModels = L.geoJson(roleModelsJson, {
		pointToLayer: RMStyle2,
		onEachFeature: onEachEntity,
		pane: 'RM'
	}).addTo(main_map);
	rmMarkers.addLayer(geo_json_RoleModels);
	geo_json_RoleModels.setStyle(function(feature) {
		return feature.properties.style;
	});

	replicatorJson = {type: 'FeatureCollection', features: []};
	for (var j = 0; j < result.features.length; j++) {
		if (result.features[j].properties.Role == 'R') {
			replicatorJson.features.push(result.features[j]);
		}
	}
	var geo_json_Replicators = L.geoJson(replicatorJson, {
		pointToLayer: ReplicatorStyle2,
		onEachFeature: onEachEntity,
		pane:'R'
	}).addTo(main_map);
	rMarkers.addLayer(geo_json_Replicators);

	geo_json_Replicators.setStyle(function(feature) {
		return feature.properties.style;
	});
	
}
function selectall() {
	checkboxes = document.getElementById('sias');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (checkboxes.children[i].type == 'checkbox') {
			checkboxes.children[i].checked = true;
		}
	}
	updateMap();
}

function onEachArea(feature, layer) {
	id = layer.feature.geometry.properties.RM_R_CODE;
	role = layer.feature.geometry.properties.Role;
	var content = '';
	main_map.eachLayer(function(livello) {
		if (livello.feature) {
			if (livello.feature.properties.Role) {
				if (
					livello.feature.properties.RM_R_CODE == id &&
					livello.feature.properties.Role == role
				) {
					content = createPopup(livello.feature.properties);
					//layer.bindPopup('<h4 id="title">'+livello.feature.properties.Name+'</h4> ',{maxHeight:200,maxWidth:400});
				}
			}
		}
	});
	layer.bindPopup(content);
/*	layer.on('click', function(e) {
		var content = '';
		//id=layer.feature.geometry.properties.ID;

		id = layer.feature.geometry.properties.RM_R_CODE;
		role = layer.feature.geometry.properties.Role;
		//console.log(id+' '+role);
		main_map.eachLayer(function(livello) {
			if (livello.feature) {
				if (livello.feature.properties.Role){
					console.log(livello.feature.properties);
					console.log(livello.feature.properties.Role);
					if (
						livello.feature.properties.RM_R_CODE == id &&
						livello.feature.properties.Role == role
					) {
						content = createPopup(livello.feature.properties);
						main_map.setView(e.latlng, 9);
						
					}
				}
			}
		});
	});*/
	//layer.bindTooltip(text,{sticky:true});
}

function drawArea(data) {
	for (var i = 0; i < data.data.length; i++) {
		x = data.data[i];
		var RMAreas = L.geoJson(x, {onEachFeature: onEachArea,pane: 'Areas'}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		RMAreas.setStyle(function(feature) {
			switch (feature.geometry.properties.SIA) {
				case 'Sustainable food production':
					return {color: '#f0b629'};

				case 'Pilgrimage':
					return {color: '#f0b629'};

				case 'Migration':
					return {color: '#f0b629'};

				case 'Art and festival':
					return {color: '#f0b629'};

				case 'Resilience':
					return {color: '#f0b629'};

				case 'Landscape':
					return {color: '#f0b629'};
			}
		});
		Areas.addLayer(RMAreas);
	}
}

function addRMArea() {
	var queryResult = $.ajax({
		method: 'GET',
		url: '/RMAreas',
		dataType: 'json',

		success: function(response) {
			x = response;
			drawArea(x);
		},
	});
}

function addRArea() {
	var queryResult = $.ajax({
		method: 'GET',
		url: '/RAreas',
		dataType: 'json',

		success: function(response) {
			x = response;
			drawArea(x);
		},
	});
}

function onEachPath(feature, layer) {
	layer.bindTooltip(feature.properties.name, {sticky: true});
}

function drawPaths(data) {
	for (var i = 0; i < data.data.length; i++) {
		x = data.data[i];
		var RMPaths = L.geoJson(x, {
			onEachFeature: onEachPath,
			pane: 'Paths',
		}).addTo(main_map);
		RMPaths.setStyle(function(feature) {
			return {color: '#472502', dashArray: '5 5'};
		});
		Paths.addLayer(RMPaths);
	}
}

function addRMPath() {
	var queryResult = $.ajax({
		method: 'GET',
		url: '/RMPath',
		dataType: 'json',

		success: function(response) {
			x = response;
			drawPaths(x);
		},
	});
}

function buildingSidebar(properties) {
	content =
		'<h4 id="title">' +
		properties.NAME +
		'</h4> <br><font size="2"><div id="extra"><font size="2"><br><b>Description</b><p>' +
		properties.BUI_DESCRI +
		'</p>';
	content =
		content +
		'<p><b>Additional Information</b><br>Type: ' +
		properties.BUI_TYP +
		'<br>Area: ' +
		properties.TOWN_NAME +
		'<br>Refers to :' +
		properties.RM_R_CODE +
		'</p>';
	return content;
}


function BuildingStyle(feature, latlng) {
	var BuildingIcon = L.icon({
		iconUrl: 'img/building.png',
		iconSize: [42, 42],
	});

	//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	var marker = L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});

	//Uncomment to have the same markers
	//var marker=L.marker(latlng, {riseOnHover: true});
	return marker;
}

function placeBuildings(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		//var geoJsonBuildings=L.geoJson(x,{onEachFeature:ngonEachBuilding}).addTo(main_map);
		var geoJsonBuildings = L.geoJson(x, {
			pointToLayer: HistBuildingStyle,
			onEachFeature: onEachHistBuilding,
			pane: 'Buildings',
		}).addTo(main_map);
		//geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});
		Buildings.addLayer(geoJsonBuildings);
	}
}

function addBuildings() {
	main_map.eachLayer(function(layer) {
		if (layer.feature && !layer.feature.properties.Role) {
			if (layer.options.pane == 'markerPane') {
				if (layer.feature.geometry.properties.BUI_TYP) {
					//console.log(layer);
					main_map.removeLayer(layer);
				}
			}
		}
	});
	var bui_type = [];
	bui_type = buiSelector.selected();

	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: '/buildings',
		data: {bounds: JSON.stringify(bounds), bui_types: JSON.stringify(bui_type)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeBuildings(x);
		},
	});
}

//CODE TO ADD CITY TO THE MAP
function townSidebar(properties) {
	content =
		'<h4 id="title">' +
		properties.NAME +
		'</h4> <hr class="customHR"><br><font size="2"><div id="extra"><font size="2">'+properties.DESCRIPTION+'<br><b>Notes</b><p>' +
		properties.NOTES +
		'</p>';
	return content;
}

function TownStyle(feature, latlng) {
	/* var TownIcon = L.AwesomeMarkers.icon({
                            icon: 'city',
                            iconColor: 'black',
                            markerColor: 'white',
                            prefix: 'fa',
                            extraClasses: 'fa-rotate-0'
                            });*/
	var TownIcon = L.icon({
		iconUrl: 'img/Town.png',
		iconSize: [42, 42], // size of the icon
	});

	//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	var marker = L.marker(latlng, {icon: TownIcon, riseOnHover: true});

	//Uncomment to have the same markers
	//var marker=L.marker(latlng, {riseOnHover: true});
	return marker;
}

function onEachTown(feature, layer) {
	layer.bindTooltip(feature.properties.NAME);
	var content = '<h4 id="title">' + feature.properties.NAME + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><div id="extra"><font size="2"><b>Description</b><p>';
	if (feature.properties.NOTES!=null){
		lateral_content=lateral_content+feature.properties.NOTES;
	}

	if( feature.properties.DESCRIPTION!=null){
		lateral_content=lateral_content+'\n'+feature.properties.DESCRIPTION;
	}
	lateral_content=lateral_content+'</p>';
	//lateral_content = townSidebar(feature.properties);
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
		var zoom = main_map.getZoom();
		if (zoom < 12) {
			zoom = 12;
		}
		main_map.setView(e.latlng, zoom);
		//$('#lateral').html(lateral_content);
		//console.log(layer);
		if (clickedTown) {
			clickedTown.setIcon(
				L.icon({
					iconUrl: 'img/Town.png',
					iconSize: [42, 42], // size of the icon
				})
			);
		}
		var layer = e.target;
		e.target.setIcon(
			L.icon({
				iconUrl: 'img/Town.png',
				iconSize: [60, 60], // size of the icon
			})
		);
		clickedTown = e.target;

		//info.update(layer.feature.properties);

		//layer.getPopup().openPopup();
	});
}

function placeTowns(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		//var geoJsonBuildings=L.geoJson(x,{onEachFeature:onEachBuilding}).addTo(main_map);
		var geoJsonTowns = L.geoJson(x, {
			pointToLayer: TownStyle,
			onEachFeature: onEachTown,
			pane: 'Towns',
		}).addTo(main_map);
		//geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});
		Towns.addLayer(geoJsonTowns);
	}
}

function addTowns() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: '/towns',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeTowns(x);
		},
	});
}

//CODE TO ADD SITES TO THE MAP

function SiteStyle(feature, latlng) {
	/*var SiteIcon = L.icon({
                iconUrl: 'img/site.png',
                iconSize:     [42,42], // size of the icon
            });

                //return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
    var marker=L.marker(latlng, {icon: SiteIcon, riseOnHover: true});*/
	var marker = L.marker(latlng, {riseOnHover: true});
	return marker;
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
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		//var geoJsonBuildings=L.geoJson(x,{onEachFeature:onEachBuilding}).addTo(main_map);
		var geoJsonSites = L.geoJson(x, {
			//pointToLayer: SiteStyle,
			onEachFeature: onEachSite,
			pane: 'Sites',
		}).addTo(main_map);
		//console.log(geoJsonSites.getBounds());
		//console.log(main_map.getBounds());
		geoJsonSites.setStyle({color: '#fa3939'});
		//geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});
		Sites.addLayer(geoJsonSites);
	}
}

function drawSites(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		var areaSites = L.geoJson(x, {onEachFeature: onEachSite}).addTo(main_map);
		//RMAreas.setStyle(function(feature) {return {color:'#472502'}});
		areaSites.setStyle(function(feature) {
			switch (feature.geometry.properties.SIA) {
				case 'Sustainable food production':
					return {color: '#29e12c'};

				case 'Pilgrimage':
					return {color: '#633d03'};

				case 'Migration':
					return {color: '#a8a8a8'};

				case 'Art and festival':
					return {color: '#f0b629'};

				case 'Resilience':
					return {color: '#c19c77'};

				case 'Landscape':
					return {color: '#0d5c1e'};
			}
		});
		Sites.addLayer(areaSites);
	}
}
function addSites() {
	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: '/sites',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeSite(x);
		},
	});
}
//CODE TO ADD HISTORIC BUILDINGS TO MAP
function histBuildingSidebar(properties) {
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
		'<img src="/images?RM_R_CODE='+properties.RM_R_CODE+'&imageName='+properties.RM_R_IM1+'" width=250px>';
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

function onEachHistBuilding(feature, layer) {
	//layer.bindTooltip(feature.properties.N_NAME) ;
	var content = '<h4 id="title">' + feature.properties.N_NAME + '</h4>';
	var lateral_content =
		content +
		'<br><font size="2"><div id="extra"><font size="2"><b>Description</b><p>' +
		feature.properties.BUI_DESCRI +
		'</p><hr class="customHR">';
	lateral_content = histBuildingSidebar(feature.properties);
	//layer.bindPopup(content,{autoPan:false,autoclose:false});
	layer.bindPopup(lateral_content);
	layer.on('click', function(e) {
		//$('#lateral').html(lateral_content);
		
		var zoom = main_map.getZoom();
		if (zoom < 17) {
			zoom = 17;
		}
		//main_map.setView(e.latlng, zoom);
		//main_map.setView(e.target._latlng, zoom);
		if (clickedBuilding) {
			clickedBuilding.setIcon(
				L.icon({
					iconUrl: 'img/Buildings.png',
					iconSize: [42, 42],
				})
			);
		}
		var layer = e.target;
		e.target.setIcon(
			L.icon({
				iconUrl: 'img/Buildings.png',
				iconSize: [60, 60],
			})
		);
		clickedBuilding = e.target;

		//info.update(layer.feature.properties);

		//layer.getPopup().openPopup();
	});
}

function HistBuildingStyle(feature, latlng) {
	var BuildingIcon = L.icon({
		iconUrl: 'img/Buildings.png',
		iconSize: [42, 42],
	});

	//return L.marker(latlng, {icon: TownIcon, riseOnHover: true});
	var marker = L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});

	//Uncomment to have the same markers
	//var marker=L.marker(latlng, {riseOnHover: true});
	return marker;
}

function placeHistBuildings(data) {
	for (var i = 0; i < data.features.length; i++) {
		x = data.features[i];
		//var geoJsonBuildings=L.geoJson(x,{onEachFeature:onEachBuilding}).addTo(main_map);
		var geoJsonBuildings = L.geoJson(x, {
			pointToLayer: HistBuildingStyle,
			onEachFeature: onEachHistBuilding,
			pane: 'Buildings',
		}).addTo(main_map);
		//geoJsonBuildings.setStyle(function(feature) {if(feature.geometry.type!='Point'){return {color: "#472502"}}});
		Buildings.addLayer(geoJsonBuildings);
	}
}

function addHistBuildings() {
	/*main_map.eachLayer(function(layer) {
		if (layer.feature && !layer.feature.properties.Role) {
			if (layer.options.pane == 'markerPane') {
				if (layer.feature.geometry.properties.N_NAME) {
					console.log(layer);
					main_map.removeLayer(layer);
				}
			}
		}
	});*/
	var hbl = [];
	hbl = hbtSelector.selected();
	/*checkboxesBui=document.getElementById('hbtlist');
    for (i=0;i<checkboxesBui.children.length;i++){
        if (checkboxesBui.children[i].type=="checkbox")
        {
            if (checkboxesBui.children[i].checked)
            {
                hbl.push(checkboxesBui.children[i].value);
            }
        }
    }*/

	var ssc = [];
	ssc = sscSelector.selected();
	/*checkboxesBui=document.getElementById('ssclist');
    for (i=0;i<checkboxesBui.children.length;i++){
        if (checkboxesBui.children[i].type=="checkbox")
        {
            if (checkboxesBui.children[i].checked)
            {
                ssc.push(checkboxesBui.children[i].value);
            }
        }
    }*/
	var tm = [];
	tm = tmSelector.selected();
	var ts = [];
	ts = tsSelector.selected();
	var rm = [];
	rm = rmotSelector.selected();
	var nf = [];
	nf = nfSelector.selected();

	bounds = main_map.getBounds();
	var queryResult = $.ajax({
		method: 'GET',
		url: '/histbuildings',
		data: {
			bounds: JSON.stringify(bounds),
			bui_types: JSON.stringify(hbl),
			sitSiaCo: JSON.stringify(ssc),
			tempMesi: JSON.stringify(tm),
			tempSta: JSON.stringify(ts),
			rehabMotiv: JSON.stringify(rm),
			nFunction: JSON.stringify(nf),
		},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeHistBuildings(x);
		},
	});
}
function hideOnZoom() {
	if (main_map.getZoom() < 10) {
		zoomflag = 0;
		main_map.eachLayer(function(layer) {
			if (layer.feature) {
				if (!layer.feature.properties.Role && layer.options.pane!='overlayPane'  && layer.options.pane!='Areas') {
					main_map.removeLayer(layer);
					//areaLayer = false;
					buildingsLayer=false;
					siteLayer=false;
					infraLayer=false;
					tourismLayer=false;
					infSiaLayer=false;
					eventLayer=false;
					townLayer = false;
					naturaLayer = false;
					infraLayer=false;
					infraBuildLayer=false;
					elemLayer=false;
				}
			}
		});
	}

	if (main_map.getZoom() > 6 && main_map.getZoom() < 10) {
		if (areaLayer == false) {
			// addRMPath();
			addRMArea();
			addRArea();
			areaLayer = true;
		}
	} 
	else {
		main_map.eachLayer(function(layer) {
			if (layer.feature && !layer.feature.properties.Role) {
				if (
					layer.options.pane == 'Paths' ||
					layer.options.pane == 'overlayPane'
				) {
					if (layer.feature.geometry.properties['Role']) {
						//main_map.removeLayer(layer);
						//areaLayer = false;
						landuseLayer=false;
					}
				}
			}
		});
	}

	if (main_map.getZoom() >= 10) {
			if (townLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(16) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addTowns();
				townLayer = true;
			}
			if (siteLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(7) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addSites();
				siteLayer = true;
			}
			if (infSiaLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(5) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addInfSia();
				
				infSiaLayer = true;
			}
			if (naturaLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(18) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addNatura2000();
				naturaLayer=true;
			}
			
				//attualmente ci sono dei problemi di visualizzazione
			if (openairLayer == false&& $('.leaflet-control-layers-overlays > label:nth-child(9) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addOpenAir();
				openairLayer=true;
			}
			if (landuseLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(6) > div:nth-child(1) > input:nth-child(1)')[0].checked ) {
				addLandUse();
				addRiskZone();
				landuseLayer=true;
			}
			
			if (routeLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(11) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addRoute();
				routeLayer=true;
			}
			if (changeLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(8) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addChange();
				changeLayer=true;
			}
			
		
		
		//$('#townButton').toggle();
		//$('#siteButton').toggle();
		//$('#buildingButton').toggle();
		//$('#imageButton').toggle();
		//$('#imageFlow')[0].style.display='none'
		createSlideShow();
	} 
	else {
		//$('#townButton')[0].style.display='none';
		//$('#siteButton')[0].style.display='none';
		//$('#buildingButton')[0].style.display='none';
		//$('#imageButton')[0].style.display='none';
		$('#imageContainer')[0].style.display = 'none';
		$('#imageContainer').html('');
		townLayer = false;
		siteLayer = false;
		eventLayer = false;
		infraLayer = false;
		infraBuildLayer = false;
		buildingsLayer = false;
		histbuildingsLayer = false;
		//$('#slideShow')[0].style.display='none'
		//main_map.eachLayer(function(layer) {
		//	if (layer.feature && !layer.feature.properties.Role) {
		//		if (layer.options.pane == 'markerPane') {
		//			//console.log(layer);
		//			main_map.removeLayer(layer);
		//		}
		//	}
		//});
	}
	if (main_map.getZoom()>=16){
		main_map.eachLayer(function(layer) {
			if (layer.feature && layer.feature.geometry.type!='Point') {
					if (layer.options.pane == 'LandUse') {
						//console.log(layer);
						main_map.removeLayer(layer);
						landuseLayer=false;
					}
				}
			});
	}
		if (main_map.getZoom()>=14) {
				if (buildingsLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(12) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
					addBuildings();
					addNearTown();
					buildingsLayer = true;
				}
				if (histbuildingsLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(12) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
					addHistBuildings();
					histbuildingsLayer = true;
					$('#imageContainer').toggle();
				}
				if (eventLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(13) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
					addEvents();
					eventLayer=true;
				}
				if (tourismLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(14) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
					addTourism();
					tourismLayer=true;
				}
				if (elemLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(15) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
					addElemsOfDist();
					elemLayer=true;
				}
			if (infraLayer == false && $('.leaflet-control-layers-overlays > label:nth-child(10) > div:nth-child(1) > input:nth-child(1)')[0].checked) {
				addInfrastr();
				infraLayer=true;
			}
			if (infraBuildLayer ==false && $('.leaflet-control-layers-overlays > label:nth-child(17) > div:nth-child(1) > input:nth-child(1)')[0].checked){
				infraBuildLayer=true;
				addInfrastrBuild();
			}
			}
}

function hideOnMove() {
	if (main_map.getZoom() >= 11) {
		main_map.eachLayer(function(layer) {
			if (layer.feature) {
				if (!layer.feature.properties.Role) {
					if (layer.options.pane == 'markerPane') {
						main_map.removeLayer(layer);
					}
				}
			}
		});
		// Uncomment addBuildings() if you want to show an example of buildings
		//addBuildings();
		addTowns();
		//addSites();
		addBuildings();
		addHistBuildings();
		createSlideShow();
	}
}

// Code just for the meeting of 15/02, used to demonstrate how images are shown in the platform
function PalestinaStyle(feature, latlng) {
	var BuildingIcon = L.AwesomeMarkers.icon({
		icon: 'landmark',
		iconColor: 'black',
		markerColor: 'white',
		prefix: 'fa',
		extraClasses: 'fa-rotate-0',
	});
	var marker = L.marker(latlng, {icon: BuildingIcon, riseOnHover: true});
	return marker;
}

function onEachPalestina(feature, layer) {
	layer.bindTooltip(feature.properties.name);
	popup = L.popup({maxWidth: '300'});
	popup.setContent(
		'<img class="resize" src=img/' + feature.properties.Photo + '>'
	);
	layer.bindPopup(popup);
}

function addPalestina() {
	var queryResult = $.ajax({
		method: 'GET',
		url: '/palestina',
		dataType: 'json',

		success: function(response) {
			x = response;
			var palestinaJson = L.geoJson(x, {
				pointToLayer: PalestinaStyle,
				onEachFeature: onEachPalestina,
			}).addTo(main_map);
		},
	});
}

/// end of code for the meeting

function showTowns() {
	if (townLayer == true) {
		townLayer = false;
		main_map.eachLayer(function(layer) {
			if (layer.feature && !layer.feature.properties.Role) {
				if (layer.options.pane == 'markerPane') {
					if (layer.options.icon.options.iconUrl == 'img/town4.png') {
						main_map.removeLayer(layer);
					}
				}
			}
		});
	} else {
		addTowns();
		townLayer = true;
	}
}
function showSites() {
	if (siteLayer == true) {
		siteLayer = false;
		main_map.eachLayer(function(layer) {
			if (layer.feature && !layer.feature.properties.Role) {
				if (layer.options.pane == 'markerPane') {
					if (layer.feature.geometry.properties.CH_TYPE) {
						main_map.removeLayer(layer);
					}
				}
			}
		});
	} else {
		addSites();
		siteLayer = true;
	}
}
function showBuildings() {
	$('#buildings').toggle();
	if (!$('#allBui')[0].checked) {
		if (buildingsLayer == true) {
			buildingsLayer = false;
			main_map.eachLayer(function(layer) {
				if (layer.feature && !layer.feature.properties.Role) {
					if (layer.options.pane == 'markerPane') {
						if (layer.feature.geometry.properties.BUI_NAME) {
							main_map.removeLayer(layer);
						}
					}
				}
			});
		} else {
			addBuildings();
			buildingsLayer = true;
		}
	}
}
function allBuiType() {
	checkboxes = document.getElementById('buildings');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (
			checkboxes.children[i].type == 'checkbox' &&
			checkboxes.children[i].value
		) {
			checkboxes.children[i].checked = $('#allBui')[0].checked;
		}
	}
	addBuildings();
}
function showHistBuildings() {
	$('#histbuildings').toggle();
	/*if (!$('#allHistBuiType')[0].checked) {
        if (buildingsLayer==true) {
            buildingsLayer=false;
            main_map.eachLayer(function (layer){
                if (layer.feature && !layer.feature.properties.Role) {
                    if(layer.options.pane=='markerPane'){
                        if (layer.feature.geometry.properties.O_NAME) {
                        main_map.removeLayer(layer);
                        }
                    }
                }
                });
        }
        else{
            addHistBuildings();
            buildingsLayer=true;
        }
    }*/
}

////// HIST BUILDING MENU
function allHistBuiType() {
	checkboxes = document.getElementById('hbtlist');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (
			checkboxes.children[i].type == 'checkbox' &&
			checkboxes.children[i].value
		) {
			checkboxes.children[i].checked = $('#allHistBuiType')[0].checked;
		}
	}
	addHistBuildings();
}
function allHistBuiSsc() {
	checkboxes = document.getElementById('sitSiaCo');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (
			checkboxes.children[i].type == 'checkbox' &&
			checkboxes.children[i].value
		) {
			checkboxes.children[i].checked = $('#allHistBuiSsc')[0].checked;
		}
	}
	addHistBuildings();
}
function allHistBuiTm() {
	checkboxes = document.getElementById('tempMesi');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (
			checkboxes.children[i].type == 'checkbox' &&
			checkboxes.children[i].value
		) {
			checkboxes.children[i].checked = $('#allHistBuiTm')[0].checked;
		}
	}
	addHistBuildings();
}
function allHistBuiTs() {
	checkboxes = document.getElementById('tempSta');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (
			checkboxes.children[i].type == 'checkbox' &&
			checkboxes.children[i].value
		) {
			checkboxes.children[i].checked = $('#allHistBuiTs')[0].checked;
		}
	}
	addHistBuildings();
}
function allHistBuiRm() {
	checkboxes = document.getElementById('rehabMotiv');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (
			checkboxes.children[i].type == 'checkbox' &&
			checkboxes.children[i].value
		) {
			checkboxes.children[i].checked = $('#allHistBuiRm')[0].checked;
		}
	}
	addHistBuildings();
}
function allHistBuiNf() {
	checkboxes = document.getElementById('nFunction');
	for (i = 0; i < checkboxes.children.length; i++) {
		if (
			checkboxes.children[i].type == 'checkbox' &&
			checkboxes.children[i].value
		) {
			checkboxes.children[i].checked = $('#allHistBuiNf')[0].checked;
		}
	}
	addHistBuildings();
}

function showActors() {
	$('#roles').toggle();
	if ($('#rm_rDD')[0].style.backgroundColor != 'rgb(62, 142, 65)') {
		$('#rm_rDD')[0].style.backgroundColor = '#3e8e41';
	} else {
		$('#rm_rDD')[0].style.backgroundColor = '#93bf38';
	}
}
function showSIAs() {
	$('#sias').toggle();
	//to change color of the active widget
	/*if ($('#siaDD')[0].style.backgroundColor != 'rgb(62, 142, 65)') {
		$('#siaDD')[0].style.backgroundColor = '#3e8e41';
	} else {
		$('#siaDD')[0].style.backgroundColor = '#93bf38';
	}*/
	//
}
function hideDescription() {
	$('#lateral')
		.find('#extra')
		.toggle();
}

function closeLateral() {
	$('#lateral').html('');
}

function createSlideShow() {
	bounds = main_map.getBounds();
	//Uncomment to show imager
	/*var queryResult = $.ajax({
		method: 'GET',
		url: '/images',
		data: {bounds: JSON.stringify(bounds)},
		dataType: 'json',

		success: function(response) {
			x = response;
			//updateSlideshow(x);
			updateFlow(x);
		},
	});*/
}

/* OLD SLIDESHOW
function updateSlideshow(argument) {
    photos=argument.images;

    slideShow='';
    for (var i = 0; i < photos.length; i++) {
        var img = '<img src="data:image/jpg;base64,'+photos[i].binary.toString()+'" width="300px"/>'
        //img.attr('src', 'data:image/png;base64,' + photos[i]);
        var slide='<div class="mySlides">'+img+'</div>';
        slideShow=slideShow+slide;
       // console.log(photos[i]);
    }
    slideShow=slideShow+'<a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a>'
    $('#slideShow').html(slideShow);
}
*/

function updateFlow(argument) {
	$('#imageContainer').html('');
	//console.log(argument);
	if (argument.images.length != 0) {
		photos = argument.images;
		slideShow = '';
		for (var i = 0; i < photos.length; i++) {
			var img =
				'<div onClick="centerMap(' +
				photos[i].coordinates[0] +
				',' +
				photos[i].coordinates[1] +
				',' +
				17 +
				')" class="swiper-slide" style="width:300px"><img src="data:image/jpg;base64,' +
				photos[i].binary +
				'" height="150px margin-left: auto; margin-right: auto; display: block;"  title="' +
				photos[i].Name +
				'" /></div>';
			//img.attr('src', 'data:image/png;base64,' + photos[i]);
			slideShow = slideShow + img;
			// console.log(photos[i]);
		}
		$('#imageContainer').html(slideShow);
		swiper.update();
	}
}

function showImages() {
	//$('#imageContainer').toggle();
}



function centerMap(x, y, zoom) {
	center = L.latLng(y, x);
	main_map.setView(center, zoom);
	closeLateral();
}
function centerRM(x, y, zoom) {
	center = L.latLng(y, x);
	main_map.setView(center, zoom);
	closeLateral();
	if ($('#digitalArchiveMenu')[0].style.display!='block'){
	$('#digitalArchiveMenu').toggle();
	}
}
function centerR(x, y, zoom) {
	center = L.latLng(y, x);
	main_map.setView(center, zoom);
	closeLateral();
	if ($('#digitalArchiveMenu')[0].style.display!='block'){
		$('#digitalArchiveMenu').toggle();
	}
	if ($('#digitalNarrativesMenu')[0].style.display!='block'){
		$('#digitalNarrativesMenu').toggle();
	}
}
function SIAColor(feature) {
	switch (feature.properties.SIA) {
		case 'SustainableFoodProduction':
			return '#93bf38';
		case 'Sustainable Food Production':
			return '#93bf38';
		case 'Pilgrimage':
			return '#633d03';
		case 'Migration':
			return '#a8a8a8';
		case 'ArtAndFestival':
			return '#f0b629';
		case 'Resilience':
			return '#f07929';
		case 'IntegratedLandscapeManagement':
			return '#0d5c1e';
		case 'Integrated Landscape Management':
			return '#0d5c1e';
	}
}
function SIAColor2(SIA) {
	switch (SIA) {
		case 'SustainableFoodProduction':
			return '#93bf38';
		case 'Sustainable Food Production':
			return '#93bf38';
		case 'Pilgrimage':
			return '#633d03';
		case 'Migration':
			return '#a8a8a8';
		case 'ArtAndFestival':
			return '#f0b629';
		case 'Resilience':
			return '#f07929';
		case 'IntegratedLandscapeManagement':
			return '#0d5c1e';
		case 'Integrated Landscape Management':
			return '#0d5c1e';
	}
}
function rmRColor(code){
	switch (code) {
			case 'RM3':
			case 'RM4':
			case 'R2':
				return '#93bf38';
			case 'RM1':
			case 'RM2':
			case 'R1':
				return '#633d03';
			case 'RM5':
			case 'RM6':
			case 'R3':
				return '#a8a8a8';
			case 'RM7':
			case 'RM8':
			case 'R4':
				return '#f0b629';
			case 'RM9':
			case 'RM10':
			case 'R5':
				return '#f07929';
			case 'RM11':
			case 'RM12':
			case 'RM12':
			case 'R6':
				return '#0d5c1e';
		}
}
function viewPractices(RmID) {
	var queryResult = $.ajax({
		method: 'GET',
		url: '/queryBP',
		data: {RmID: JSON.stringify(RmID)},
		dataType: 'json',

		success: function(response) {
			x = response;
			modelActionTable(x);
		},
	});
}

function modelActionTable(d) {
	table =
		'<span class="close" onClick="closeModal()">&times;</span> <table class="table">             <thead>                 <tr>                    <td style="font-size:12px; font-weight:bold" rowspan = "2">Related SIA</td>      <td style="font-size:12px; font-weight:bold" rowspan = "2">Significant Crosscutting</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" rowspan = "2">Replicability</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" rowspan = "2">Key Resources</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" colspan = "3">Challenges</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" rowspan = "2">Drivers</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" colspan = "3">Context</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" colspan = "5">Capital transfer mechanism</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" rowspan = "2">Knowledge building</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" rowspan = "2">Barriers</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" rowspan = "2">Co-benefits</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold" colspan = "3">Process</td style="font-size:12px; font-weight:bold">                    <td style="font-size:12px; font-weight:bold">Keywords</td style="font-size:12px">                </tr>                <tr>                    <td style="font-size:12px">Challenge</td>                    <td style="font-size:12px">Yes/partially</td>                    <td style="font-size:12px">Description</td>                    <td style="font-size:12px">Geography</td>                    <td style="font-size:12px">Main Economic Sector</td>                    <td style="font-size:12px">Size of influence</td>                    <td style="font-size:12px">Capitals</td>                    <td style="font-size:12px">Relevance</td>                    <td style="font-size:12px">Initial</td>                    <td style="font-size:12px">Developed</td>                    <td style="font-size:12px">Obtained</td>                    <td style="font-size:12px">Milestone</td>                    <td style="font-size:12px">Year</td>                    <td style="font-size:12px">Conceptual step</td>                </tr>            </thead><tbody></tbody>            </table>';

	x = d['data'][0].Practices;
	//console.log(x);
	//RelatedSIa='<p><b>Related SIA</b><br>'+x['RELATED SIA'][0]+'</p>';
	header='<h4>'+d.data[0].Name+
		'<i class="fas fa-times xClose" onClick="closeModal()"></i>'+
		'</h4>'+
		'<h4 style="color:'+SIAColor2(d.data[0]['SIA NAME'])+'"> Role Model</h4>'+
		'<h4 style="color:'+SIAColor2(d.data[0]['SIA NAME'])+'"><img style="height:50px" src="'+siaImage[d.data[0]['SIA NAME']]+'"></h4>';
	CrossCutting =
		'<p><b>Significant Crosscutting</b><br>' +
		x['SIGNIFICANT CROSS-CUTTING'] +
		'</p>';

	Replicability = '<p><b style="color:orange">Replicability     :     </b><b style="color:#ffdb1a">'+ x['REPLICABILITY'] + '</b></p>';

	KeyResources = '<p><b>Key Resources</b>';
	for (var i = 0; i < x['KEY RESOURCES'].length; i++) {
		KeyResources = +x['KEY RESOURCES'][i] + '&nbsp;';
	}
	KeyResources += '</p>';

	Challenges =
		'<p><table class="table table-hover"><thead class="table-info">    <tr>        <th style="font-weight:bold; font-size:18px" colspan = "3">Challenges</th>    </tr>    <tr>        <th class="table-primary">Challenge</th class="table-primary">        <th class="table-primary">Presence</th class="table-primary">        <th class="table-primary">Description</th class="table-primary">    </tr></thead><tbody>';
	for (var i = 0; i < x.CHALLENGES.length; i++) {
		Challenges += '<tr>';
		Challenges += '<td>' + x.CHALLENGES[i].CHALLENGE + '</td>';
		Challenges += '<td>' + x.CHALLENGES[i]['YES/PARTIALLY'] + '</td>';
		Challenges += '<td>' + x.CHALLENGES[i].DESCRIPTION + '</td>';
		Challenges += '</tr>';
	}
	Challenges += '</tbody></table></p>';

	Drivers = '<p><b>Drivers</b>';
	for (var i = 0; i < x.DRIVERS.length; i++) {
		Drivers = +x.DRIVERS[i] + '&nbsp;';
	}
	Drivers += '</p>';

	CTM =
		'<p><table class="table table-hover"><thead class="table-info">    <tr>        <th style="font-weight:bold; font-size:18px" colspan = "5">Capital Transfer Mechanism</th>    </tr>    <tr>        <th class="table-primary">Capitals</th>        <th class="table-primary">Relevance</th>        <th class="table-primary">Initial</th> <th class="table-primary">Developed</th> <th class="table-primary">Obtained</th>    </tr></thead><tbody>';
	for (var i = 0; i < x['CAPITAL TRANSFER MECHANISM'].length; i++) {
		CTM += '<tr>';
		CTM += '<td>' + x['CAPITAL TRANSFER MECHANISM'][i].CAPITAL + '</td>';
		CTM += '<td>' + x['CAPITAL TRANSFER MECHANISM'][i].RELEVANCE + '</td>';
		CTM += '<td>' + x['CAPITAL TRANSFER MECHANISM'][i].INITIAL + '</td>';
		CTM += '<td>' + x['CAPITAL TRANSFER MECHANISM'][i].DEVELOPED + '</td>';
		CTM += '<td>' + x['CAPITAL TRANSFER MECHANISM'][i].OBTAINED + '</td>';
		CTM += '</tr>';
	}
	CTM += '</tbody></table></p>';
	
	KnowledgeBuilding='<p><table class="table table-hover"><thead class="table-info">    <tr>        <th style="font-weight:bold; font-size:18px" colspan = "3">Knowledge building</th>    </tr> </thead><tbody>';
	//KnowledgeBuilding = '<p><b>Knowledge Building</b></p>';
	for (var i = 0; i < x['KNOWLEDGE BUILDING'].length; i++) {
		KnowledgeBuilding += '<tr><td>&#10004;</td><td>' + x['KNOWLEDGE BUILDING'][i] + '</td></tr> ';
	}
	KnowledgeBuilding +=  '</tbody></table></p>';
	
	Barriers='<p><table class="table table-hover"><thead class="table-info">    <tr>        <th style="font-weight:bold; font-size:18px" colspan = "3">Barriers</th>    </tr> </thead><tbody>';
	//Barriers = '<p><b>Barriers</b></p>';
	for (var i = 0; i < x['BARRIERS'].length; i++) {
		Barriers += '<tr><td>&#10004;</td>';
		Barriers+= '<td>'+ x['BARRIERS'][i] + '</td></tr>';
	}
	Barriers +=  '</tbody></table></p>';	
	CoBenefit='<p><table class="table table-hover"><thead class="table-info">    <tr>        <th style="font-weight:bold; font-size:18px" colspan = "3">Co-benefits</th>    </tr> </thead><tbody>';

	//CoBenefit = '<p><b>CoBenefit</b></p>';
	for (var i = 0; i < x['CO-BENEFITS'].length; i++) {
		CoBenefit += '<tr><td>&#10004;</td>';
		CoBenefit +='<td>'+ x['CO-BENEFITS'][i] + '</td></tr>';
	}
	CoBenefit += '</tbody></table></p>';

	Process =
		'<p><table class="table table-hover"><thead class="bg-warning">    <tr>        <th style="font-weight:bold; font-size:18px" colspan = "3">Process</th>    </tr>    <tr>        <th class="table-warning">Milestones</th>        <th class="table-warning">Years</th>        <th class="table-warning">Conceputal step</th>     </tr></thead><tbody>';
	for (var i = 0; i < x.PROCESS.length; i++) {
		Process += '<tr>';
		Process += '<td>' + x.PROCESS[i].MILESTONE + '</td>';
		Process += '<td>' + x.PROCESS[i].YEAR + '</td>';
		Process += '<td>' + x.PROCESS[i]['CONCEPTUAL STEP'] + '</td>';
		Process += '</tr>';
	}
	Process += '</tbody></table></p>';

	/*
	Keywords = '<p><b>Keywords</b></p>';
	for (var i = 0; i < x.KEYWORDS; i++) {
		Keywords = +x.KEYWORDS[i] + '&nbsp;';
	}
	Keywords += '</p>';
*/
	modalContent =
		//'<span class="close" onClick="closeModal()">&times;</span> ' /*+RelatedSIa*/ +
		header+
		//CrossCutting +
		//Replicability +
		Challenges +
		CTM +
		KnowledgeBuilding +
		Barriers +
		CoBenefit +
		Process+
		'<h4><i class="fas fa-times xClose" onClick="closeModal()"></i></h4>';
	modalContent = modalContent.replace(/undefined/g, '');

	$('#bpcontainer').html(modalContent);
	$('#bpModal')[0].style.display = 'block';
}

function closeModal() {
	$('#bpModal')[0].style.display = 'none';
}

function sitStatusTranslate(x) {
	switch (x) {
		//P C H R O
		case 'P':
			return 'Planned';

		case 'C':
			return 'Contintuing';

		case 'H':
			return 'Historical';

		case 'R':
			return 'Recent';

		case 'O':
			return 'Other';
	}
}

function charSiaTranslate(x) {
	switch (x) {
		//NA Ra UA HU GA IA RI ND O
		case 'NA':
			return 'Natural area';

		case 'RA':
			return 'Rural Area';

		case 'UA':
			return 'Unpopulated Area';

		case 'HU':
			return 'Historic Urban Center';

		case 'GA':
			return 'Area of Gentrification';

		case 'IA':
			return 'Area of Industrialization';

		case 'RI':
			return 'Area of Recent Industrialization';

		case 'ND':
			return 'Risk of Natral Disaster';

		case 'O':
			return 'Other';
	}
}

function hbtoggler() {
	$('#histchecks').toggle();
	$('.js-example-basic-multiple').select2();
}
function selectColorChanger(e){
	if (e.target.style.fontWeight=="bold"){
	      e.target.style.backgroundColor="";
	     e.target.style.fontWeight="normal";
	     e.target.style.border='';
	     e.target.style.borderRadius=''
	}
	else{
	      e.target.style.backgroundColor="#93bf38";
	     e.target.style.fontWeight="bold";
	     e.target.style.border='solid #688c1e';
	     e.target.style.borderRadius='5px'
	};
 }
function focusRMR(markerID){
//$('#digitalArchiveMenu').toggle();
//$('#digitalNarrativesMenu').toggle();

main_map.eachLayer(function(layer){
		if (layer.feature){
					x=layer.feature;
					if (x["_id"]==markerID){
						main_map.setView(new L.LatLng(layer._latlng.lat,layer._latlng.lng),6);
						layer.fireEvent("click");
					}
				}
		}
	);

}
function getImage(img,code){
var queryResult = $.ajax({
		method: 'GET',
		url: '/images',
		data: {imageName:img,RM_R_CODE:code},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeSite(x);
		},
	});
}
function createFakeDropdown() {
	var roles = ['RoleModel','Replicator'];
	var sias = [];

	/*checkboxesRole = document.getElementById('roles');
	for (i = 0; i < checkboxesRole.children.length; i++) {
		if (checkboxesRole.children[i].type == 'checkbox') {
			roles.push(checkboxesRole.children[i].value);
		}
	}
	checkboxesSIA = document.getElementById('sias');
	for (i = 0; i < checkboxesSIA.children.length; i++) {
		if (checkboxesSIA.children[i].type == 'checkbox') {
			sias.push(checkboxesSIA.children[i].value);
		}
	}*/
	var queryResult = $.ajax({
		method: 'GET',
		url: '/querySIA',
		data: {Roles: JSON.stringify(roles), SIAs: JSON.stringify(sias)},
		dataType: 'json',

		success: function(response) {
			result = response;
			var dropdowncontentRM = '';
			var dropdowncontentR = '';
			for (var i = 0; i < result.features.length; i++) {
				if (result.features[i].properties.Role == 'RM') {
				//console.log(result.features[i]);
					
					dropdowncontentRM =
						dropdowncontentRM +
						'<a href="#" style="color: ' +
						SIAColor(result.features[i]) +
						'" >'+result.features[i].properties.Name+'</a>';
					//dropdowncontentRM =
					//	dropdowncontentRM +
					//	'<a href="#" style="color: ' +
					//	SIAColor(result.features[i]) +
					//	'" onClick="centerRM(' +
					//	result.features[i].geometry.coordinates[0] +
					//	' ,' +
					//	result.features[i].geometry.coordinates[1] +
					//	',' +
					//	9 +
					//	')">' +
					//	result.features[i].properties.Name +
					//	'</a>';
					//dropdowncontentRM=dropdowncontentRM+'<a href="#" onClick="centerMap('+result.features[i].geometry.coordinates[0]+' ,'+result.features[i].geometry.coordinates[1]+')">'+result.features[i].properties.Name+' (SIA: '+result.features[i].properties.SIA+')</a>'
				}
				if (result.features[i].properties.Role == 'R') {
					dropdowncontentR =
						dropdowncontentR +
						'<a href="#" style="color: ' +
						SIAColor(result.features[i]) +
						'">' +
						result.features[i].properties.Name +
						'</a>';
				}
			}
			//dropdowncontentRM+='<a href="#" onclick="$("#digitalArchiveMenu").toggle()">Digital Archive Menu</a>'
			//dropdowncontentR+='<a href="#" onclick="$("#digitalNarrativesMenu").toggle()">Digital Narratives Menu</a>'
			//console.log(dropdowncontentRM);
			$('#rmlist').html(dropdowncontentRM);
			$('#rlist').html(dropdowncontentR);
			//populateMap(x,roles);
			//console.log(x);
		},
	});
}
