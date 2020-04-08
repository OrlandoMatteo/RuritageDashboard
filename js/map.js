var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function collapseMap(){
    if ($('#mapid')[0].style.height!='0vh'){
        $('#mapid')[0].style.height='0vh';
    }
    else{
        $('#mapid')[0].style.height='50vh';
    }
}