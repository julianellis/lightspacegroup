$(document).ready(function () {
	 
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
});