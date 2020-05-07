function getRMV(){
var queryResult = $.ajax({
		method: 'GET',
		url: '/ratemyview',
		dataType: 'json',
		success: function(response) {
			x = response;
			//console.log(x);
			addRMV(x);
		},
	});
}
function addRMV(x){

	var markers=L.markerClusterGroup();
	var myIcon = L.icon(
			{
				iconUrl: 'http://ratemyview.co.uk/img/panoramicview.png',
				iconSize: [38, 38],
			iconAnchor: [19, 19],
			});

	for ( i=0;i<x.length; i++){
		var popupHTML='<img src="http://static.ratemyview.co.uk/uploads/'+x[i].photo+'" width="300" height="300">';
		var popup=L.popup().setContent(popupHTML);
		var marker =L.marker(L.latLng(x[i].loc[1],x[i].loc[0]),{icon:myIcon})
		marker.bindPopup(popup);
		markers.addLayer(marker);
	}
	
	RMV.addLayer(markers);
}
