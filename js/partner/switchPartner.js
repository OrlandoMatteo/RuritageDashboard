var api_url="http://www.localhost:8000";
function switchPartner(){
	var selected=selectPartner.selected();
	$('#selectedRMR')[0].innerHTML=rmRDict[selected];
    var queryResult = $.ajax({
		method: 'GET',
		url: api_url+'/description',
		data: {rm_r : JSON.stringify(selected)},
		dataType: 'json',

		success: function(response) {
            x = response;
			updatePage(response);
			updateBuildingTable(response);
			updateSitesTable(response);
			updateInfrastructuresTable(response);
			updateOpenAirTable(response);
		},
	});
}

function updatePage(response){
	console.log(response.info);
	$('#rmRInfo')[0].innerHTML=response.info.properties.Description;
	
}
function updateBuildingTable(response){
	updatedTable='';
	//$('#buildingTableBody')[0].innerHTML=updatedTable;
	btable.clear()
	for (var i = 0; i < response.buildings.length; i++) {
		var name='';
		if (response.buildings[i].properties.N_NAME){
			name=response.buildings[i].properties.N_NAME;
		}
		else{
			name=response.buildings[i].properties.NAME;
		}
		newEntry='<tr>'+
					'<td>'+name+'</td>'+
					'<td>'+activityBuildDict[response.buildings[i].properties.ACTIVITY]+'</td>'+
					'<td>'+protectedDict[response.buildings[i].properties.REG_STATUS]+'</td>'+
				'</tr>';
		updatedTable+=newEntry		
	}
	var dataset=[];
	for (var i = 0; i < response.buildings.length; i++) {
		var name='';
		if (response.buildings[i].properties.N_NAME){
			name=response.buildings[i].properties.N_NAME;
		}
		else{
			name=response.buildings[i].properties.NAME;
		}
		dataset[i]=[
			name,activityBuildDict[response.buildings[i].properties.ACTIVITY],
			protectedDict[response.buildings[i].properties.REG_STATUS],
			response.buildings[i].properties.BUI_TYP,
			response.buildings[i].properties.TOWN_NAME
		]
	}
	btable.rows.add(dataset).draw();
	//$('#buildingTableBody')[0].innerHTML=updatedTable;
	//$('#buildingTable').DataTable();
		
}

function updateSitesTable(response){	
	updatedTable='';
	$('#sitesTableBody')[0].innerHTML=updatedTable;
	for (var i = 0; i < response.sites.length; i++) {
		newEntry='<tr>'+
					'<td>'+response.sites[i].properties.NAME+'</td>'+
					'<td>'+charDict[response.sites[i].properties.CHAR_SIA]+'</td>'+
					'<td>'+protectedDict[response.sites[i].properties.REG_STATUS]+'</td>'+
				'</tr>';
		updatedTable+=newEntry		
	}
	$('#sitesTableBody')[0].innerHTML=updatedTable;
	$('#sitesTable').DataTable();
	
}

function updateInfrastructuresTable(response){	
	updatedTable='';
	$('#infrastructuresTableBody')[0].innerHTML=updatedTable;
	for (var i = 0; i < response.infrastructures.length; i++) {
		newEntry='<tr>'+
					'<td>'+response.infrastructures[i].properties.N_NAME+'</td>'+
					'<td>'+infraTypeDict[response.infrastructures[i].properties.INF_TYPE]+'</td>'+
					'<td>'+response.infrastructures[i].properties.INF_DESCRI+'</td>'+
				'</tr>';
		updatedTable+=newEntry		
	}
	$('#infrastructuresTableBody')[0].innerHTML=updatedTable;
	$('#infrastructuresTable').DataTable();
	
}

function updateOpenAirTable(response){	
	updatedTable='';
	$('#openAirTableBody')[0].innerHTML=updatedTable;
	for (var i = 0; i < response.openAir.length; i++) {
		newEntry='<tr>'+
					'<td>'+response.openAir[i].properties.NAME_ACT+'</td>'+
					'<td>'+eventPeriodDict[response.openAir[i].properties.PERIODIC]+'</td>'+
					'<td>'+seasonDict[response.openAir[i].properties.TEMP_STA]+'</td>'+
				'</tr>';
		updatedTable+=newEntry		
	}
	$('#openAirTableBody')[0].innerHTML=updatedTable;
	$('#openAirTable').DataTable();
	
}