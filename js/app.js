// Global Variables
var headHeight = 133;
var buffer = 200;

var vision = $('#vision');
var about = $('#about');
var projects = $('#projects');
var investors = $('#invest');
var ventures = $('#ventures');
var contact = $('#contact');

// Wait for onload event before firing image-dependant functions
$(window).load(function() {
	
	var homeTop = 0;
	var visionTop = $(vision).offset().top - buffer;
	var aboutTop = $(about).offset().top - buffer;
	var projectsTop = $(projects).offset().top - buffer;
	var investorsTop = $(investors).offset().top - buffer;
	var venturesTop = $(ventures).offset().top - buffer;
	var contactTop = $(contact).offset().top - buffer;
	
	// Delayed Loading
	function delayLoad(elem){
		$(elem).each(function(index){
			var imgSrc = $(this).attr('data-defer-src')
			$(this).attr('src', imgSrc);
		})
	}
	
	// Manage navigation on states
	function setNav(){
		$('.priNav a').removeClass('on');
		
		if($(document).scrollTop() >= homeTop && $(document).scrollTop() < visionTop){
			$('nav a[href=#home]').addClass('on');
		} else if($(document).scrollTop() >= visionTop && $(document).scrollTop() < aboutTop){
			$('nav a[href=#vision]').addClass('on');
		} else if($(document).scrollTop() >= aboutTop && $(document).scrollTop() < projectsTop){
			$('nav a[href=#about]').addClass('on');
			delayLoad('.coverImg');
		} else if($(document).scrollTop() >= projectsTop && $(document).scrollTop() < investorsTop){
			$('nav a[href=#projects]').addClass('on');		
		} else if($(document).scrollTop() >= investorsTop && $(document).scrollTop() < venturesTop){
			$('nav a[href=#invest]').addClass('on');	
		} else if($(document).scrollTop() >= venturesTop && $(document).scrollTop() < contactTop){
			$('nav a[href=#ventures]').addClass('on');		
		} else if($(document).scrollTop() >= contactTop){
			$('nav a[href=#contact]').addClass('on');
		}
	}

	// Handle navigation Click events
	function runNav(){
		$('.priNav a, .pageAnchor').click(function(){			
			var section = $(this).attr('href');
			var sectionOffset = $(section).offset().top;
			var scrollPoint = sectionOffset - headHeight; 
			
			$('html, body').animate({scrollTop:scrollPoint}, 750, 'swing');
			return false;
		});	
	}
	runNav();
	
	// Manage events fired on scroll
	function scrolling(){
		$(window).bind('scroll',function(){
			setNav();
		});
	}
	scrolling();
 
	// Run Slideshow Function
	function runSlideshow(){
		var slideshowHeight = $('.slideshow img').css('height');
		var loadUrl = "modules/banners.html"; // Use querystring to force refresh if making changes
		
		$('.slideshow').css('height', slideshowHeight).addClass('slideshowReady');
		
		$.get(loadUrl, function(data) {
			$('.slideshow .banners').append(data);
			setInterval(function(){
				$('.slideshow .banners :first-child').fadeOut(1250).next('img').fadeIn().end().appendTo('.slideshow .banners');
			}, 5000);
		});
	}
	runSlideshow();

	// Prepare before/after auto fade
	var startFade;
	var speed = 2000;
	
	function triggerFade(){
		startFade = setTimeout(function() {
			if($('.showAfter').hasClass('afterOn')) return false;
			$('.showcase .imgs').find('.before').fadeOut(speed);
			$('.showcase .imgs').find('.after').fadeIn(speed);
			$('.controls').find('span').removeClass('beforeOn afterOn');
			$('.showAfter').addClass('afterOn')
		}, 3000);
	}
	function cancelFade(){
		clearTimeout(startFade);
	}
	
	// Prepare vision control interface
	function prepareControls(){
		var controls = $('.controls');
		var showBefore = $('.showBefore');
		var showAfter = $('.showAfter');
		
		function clearDown(){
			cancelFade();
			$('.showcase .imgs figure').fadeOut(speed);
			$(controls).find('span').removeClass('beforeOn afterOn');
		}
		
		controls.show();
		
		$(showBefore).click(function(){
			if($(this).hasClass('beforeOn')) return false;
			clearDown();
			$(this).addClass('beforeOn').parents('.showcase').find('.before').fadeIn(speed);
		});
		
		$(showAfter).click(function(){
			if($(this).hasClass('afterOn')) return false;
			clearDown();
			$(this).addClass('afterOn').parents('.showcase').find('.after').fadeIn(speed);
		});	
	}
	prepareControls()

	// Prepare vision thumbnail interface
	function prepareThumbs(){
		var controls = $('.controls');
		var showcase = $('.showcase .imgs');
		var desc = $('.selections .desc');
		var thumbs = $('.thumbs li a')
		var loader = "<img src='img/vision-loader.gif' alt='loading...' class='loading' />";
		var loadUrl = "modules/vision.html?v2"; // Use querystring to force refresh if making changes
		
		function clearDown(){
			$(thumbs).parent('li').removeClass('on');
			$(controls).find('span').removeClass('beforeOn afterOn');
			$(controls).find('.showBefore').addClass('beforeOn');
		}
		
		$(thumbs).click(function(){
			clearDown();
			$(this).parent('li').addClass('on');
			var modContent = $(this).data('module');
			$(showcase).html(loader).load(loadUrl + ' ' + modContent + ' > *', function() {
				$(showcase).find('.before').fadeIn(750);
				cancelFade();
				triggerFade();
			});
			return false;
		}); 
	}
	prepareThumbs()

	// Prepare project scroller
	function prepareScroller(){
		
		var outerFrame = $('.projects .outerFrame');
		var frame = $('.projects .frame');
		var scroller = $('.projects .items');
		
		$(scroller).find('li:odd').addClass('odd');
		
		var frameWidth = frame.width();
		var scrollerWidth = scroller.width();
		var leftBound = $(frame).offset().left;
		var rightBound = leftBound + frameWidth;
		
		var scrollerBtns = $('.scroll');
		var scrollLeft = $('.scrollLeft');
		var scrollRight = $('.scrollRight');
		
		$('.projects .frame').css('overflow', 'hidden');
		
		function setFocus(){
			if ($(scroller).offset().left == leftBound){
				$(outerFrame).addClass('leftDisabled');
			} else if (($(scroller).offset().left + scrollerWidth) <= rightBound){
				$(outerFrame).addClass('rightDisabled');
			} else {
				$(outerFrame).removeClass('leftDisabled rightDisabled');
			}
		}
		setFocus();
		$(scrollerBtns).fadeIn();
		
		$(scrollLeft).click(function(){
			if ($(outerFrame).hasClass('leftDisabled')) return false;
			$(outerFrame).addClass('leftDisabled');
			$(scroller).animate({left: '+='+frameWidth}, 500, function(){
				$(outerFrame).removeClass('leftDisabled');
				setFocus();
			});
		});
		
		$(scrollRight).click(function(){
			if ($(outerFrame).hasClass('rightDisabled')) return false;
			$(outerFrame).addClass('rightDisabled');
			$(scroller).animate({left: '-='+frameWidth}, 500, function(){
				$(outerFrame).removeClass('rightDisabled');
				setFocus();
			});
		});	
	}
	prepareScroller()

	// Prepare lightbox galleries
	function prepareGalleries(){
		$('.lightboxGallery').each(function(){
			$('a', this).lightBox({overlayBgColor: '#C0CEDF'});
		});
	}
	prepareGalleries()

	// Update coypright year
	var currentYear = (new Date).getFullYear();
	$("#year").text( (new Date).getFullYear() );
});

// Lazy Load Google Map
function initializeMap() {
  var styles = [
		{
			featureType: "landscape",
			elementType: "geometry.fill",
			stylers: [
				{ color: '#c0cedf' }
			]
		},{
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{ visibility: "off"  }
			]
		},{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ color: '#ffffff' },
			]
		},{ 
			featureType: "road", 
			elementType: "labels.text.stroke", 
			stylers: [ 
				{ color: '#ffffff' } 
		] 
		},{ 
			featureType: "road", 
			elementType: "labels.text.fill", 
			stylers: [ 
				{ color: "#000000" } 
			] 
		},{ 
			featureType: "poi", 
			elementType: "geometry.fill", 
			stylers: [ 
				{ color: "#8fb59e" } 
			] 
		},{ 
			featureType: "poi", 
			elementType: "labels.text.fill", 
			stylers: [ 
				{ color: "#000000" } 
			] 
		},{ 
			featureType: "poi", 
			elementType: "labels.text.stroke", 
			stylers: [ 
				{ "color": "#ffffff" } 
			] 
		},{ 
			featureType: "water", 
			elementType: "labels.text.stroke", 
			stylers: [ 
				{ color: "#ffffff" } 
			] 
		},{ 
			featureType: "water", 
			elementType: "labels.text.fill", 
			stylers: [ 
				{ color: "#000000" } 
			] 
		},{
		} 
					];

	var latlng = new google.maps.LatLng(51.456993, -0.150050);
	var myOptions = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: false,
		scrollwheel: false,
		styles: styles
	};

	var map = new google.maps.Map(document.getElementById('map'), myOptions);
	
	var marker = new google.maps.MarkerImage('/img/map/map-marker.png',
		new google.maps.Size(64, 75),
		new google.maps.Point(0, 0),
		new google.maps.Point(32, 75)
	);

	var marker1 = new google.maps.Marker({
		position: new google.maps.LatLng(51.455988, -0.143966),
		map: map,
		icon: marker
	});

	google.maps.event.addListener(marker1, 'click', function () {
		infowindow1.open(map, marker1);
	});

	var infowindow1 = new google.maps.InfoWindow({
		content: createInfo('Light Space ', '71c South Side<br />Clapham Common<br />London<br />SW4 9DA')
	});

	function createInfo(title, content) {
		return '<div class="infowindow" style="text-align: left;"><strong>' + title + '</strong><br />' + content + '</div>';
	}
}

function loadMapScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initializeMap&key=AIzaSyCyq6kr0f-9lqRHIn0-MqmiSHRTpyouSuc';
  document.body.appendChild(script);
}

if(document.getElementById('map')){
	loadMapScript();
}
