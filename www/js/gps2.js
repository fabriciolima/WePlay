function mapa(){
	window.location = "mapa.html";	
}

google.maps.event.addDomListener(window, 'load', getLocation);
function getLocation(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000 });    
}
var marker;
function onSuccess(position) {
    var lat=position.coords.latitude;
    var lang=position.coords.longitude;

    //Google Maps
    var myLatlng = new google.maps.LatLng(lat,lang);
    var mapOptions = {zoom: 14,center: myLatlng,
    		mapTypeControl:false,
    		scaleControl: false,
    		  streetViewControl: false}
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //var marker = new google.maps.Marker();
    marker = new google.maps.Marker({
        		position: myLatlng,
        		map: map,
        		draggable:true});
}
function onError(error) {
    alert('code: ' + error.code + '\n' +'message: ' + error.message + '\n');
}

document.addEventListener("deviceready", onDeviceReady, true);


function localizacao(){
	alert(marker.position);
	
}


