var api_url="http://www.localhost:8000";
function switchLayer(){
	var selected=selectLayer.selected();
	updatePage(selected);
    console.log(selected);
    $('#selectedLayer')[0].innerHTML='<div w3-include-html="'+selected+'.html" id="selectedLayer"></div>';
    w3IncludeHTML();
    switch (selected) {
        case 'siteOfInterest':
			$('#layerName')[0].innerHTML='Sites with historical/cultural/natural/social interest';
			siteOfInterestStats();
			break;
		case 'buildings':
			$('#layerName')[0].innerHTML='Buildings and artifacts with cultural or special functions or significance';
			buildingsStats();
			break;
		case 'events':
			$('#layerName')[0].innerHTML='Temporary large scale cultural/art event';
			eventsStats();
			break;
		case 'routes':
			$('#layerName')[0].innerHTML='Routes and itineraries with religious, natural, historical, touristic significance';
			routesStats();
			break;
		case 'infrastructures':
			$('#layerName')[0].innerHTML='Infrastructure/Facilities';
			infrastructureStats();
			break;
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

function updatePage(selectedLayer){
	main_map.eachLayer(function(layer) {
        if (layer.feature) {
            main_map.removeLayer(layer);
        }
	});
	//$('#layerName')[0].innerHTML=selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)
}

(function($) {
	"use strict"; // Start of use strict
  
	// Toggle the side navigation
	$("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
	  $("body").toggleClass("sidebar-toggled");
	  $(".sidebar").toggleClass("toggled");
	  if ($(".sidebar").hasClass("toggled")) {
		$('.sidebar .collapse').collapse('hide');
	  };
	});
  
	// Close any open menu accordions when window is resized below 768px
	$(window).resize(function() {
	  if ($(window).width() < 768) {
		$('.sidebar .collapse').collapse('hide');
	  };
	  
	  // Toggle the side navigation when window is resized below 480px
	  if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
		$("body").addClass("sidebar-toggled");
		$(".sidebar").addClass("toggled");
		$('.sidebar .collapse').collapse('hide');
	  };
	});
  
	// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
	$('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
	  if ($(window).width() > 768) {
		var e0 = e.originalEvent,
		  delta = e0.wheelDelta || -e0.detail;
		this.scrollTop += (delta < 0 ? 1 : -1) * 30;
		e.preventDefault();
	  }
	});
  
	// Scroll to top button appear
	$(document).on('scroll', function() {
	  var scrollDistance = $(this).scrollTop();
	  if (scrollDistance > 100) {
		$('.scroll-to-top').fadeIn();
	  } else {
		$('.scroll-to-top').fadeOut();
	  }
	});
  
	// Smooth scrolling using jQuery easing
	$(document).on('click', 'a.scroll-to-top', function(e) {
	  var $anchor = $(this);
	  $('html, body').stop().animate({
		scrollTop: ($($anchor.attr('href')).offset().top)
	  }, 1000, 'easeInOutExpo');
	  e.preventDefault();
	});
  
  })(jQuery); // End of use strict
  