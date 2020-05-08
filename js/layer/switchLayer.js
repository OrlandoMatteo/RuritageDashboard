var api_url="http://www.localhost:8000";
function switchLayer(){
    var selected=selectLayer.selected();
    console.log($('#selectedLayer'));
    $('#selectedLayer')[0].innerHTML='<div w3-include-html="'+selected+'.html" id="selectedLayer"></div>';
    w3IncludeHTML();
    switch (selected) {
        case 'siteOfInterest':
            siteOfInterestStats() 
        default:
            break;
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