function addDigital() {
	rm_r=rmRAreaSelector3.selected();
	var queryResult = $.ajax({
		method: 'GET',
		url: '/digital',
		data: {RM_R_CODE: JSON.stringify(rm_r)},
		dataType: 'json',

		success: function(response) {
			x = response;
			placeImages(x.images);
		},
	});
}
function placeImages(images){
	/*var content='<span class="close" onClick="$(\'#digiModal\').toggle()">&times;</span>'+
		'<div class="swiper-container">'+
			'<div class="swiper-wrapper" id="imageContainer">'+
                	'</div>'+
			'<div class="swiper-button-next" style="position: fixed"></div>'+
			'<div class="swiper-button-prev" style="position: fixed"></div>'+
		'</div>';
	$('#digitalcontainer').html(content);*/
	var slideshow='';
	l=images.length;
	for( i=0;i<l;i++){
		slideshow=slideshow+
			'<div class="swiper-slide" ><center><img src="data:image/jpg;base64,'+images[i]+'" height="450px" margin-left: auto; margin-right: auto; display: block;"></center></div>';
	}
	$('#imageContainer').html(slideshow);
	swiper.slideTo(0);
	$('#digiModal')[0].style.display = 'block';
}
