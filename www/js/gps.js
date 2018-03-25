var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: -34.397, lng: 150.644},
	zoom: 8
	});
}
  
var marker;

// google.maps.event.addDomListener(window, 'load', getLocation);

function getPointLocation(){
	navigator.geolocation.getCurrentPosition(function(posicao){
		var lat=position.coords.latitude;
	    var long=position.coords.longitude;
	    console.log("Point(" + long+" "+lat+")");
	    return "Point(" + long+" "+lat+")";
	}, onError, { timeout: 3000 });
}

function getLocation(){
	document.addEventListener("deviceready",
	function(){

		// navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000 });    
		var options = { enableHighAccuracy: true, maximumAge: 100, timeout: 60000 };
		if( navigator.geolocation) {
		   var watchID = navigator.geolocation.watchPosition( onSuccess, onError, options );
		   var timeout = setTimeout( function() { navigator.geolocation.clearWatch( watchID ); }, 5000 );
		} else {
			gotErr();
		}
	} , true);
}

function onSuccess(position) {
	var lat=position.coords.latitude;
    var long=position.coords.longitude;
    
    //Google Maps
    var myLatlng = new google.maps.LatLng(lat,long);
    var mapOptions = {zoom: 14,center: myLatlng,
    		mapTypeControl:false,
    		scaleControl: false,
    		streetViewControl: false}
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //var marker = new google.maps.Marker();
    marker = new google.maps.Marker({
        		position: myLatlng,
        		map: map,
        		draggable:true});
}

function onError(error) {
	Materialize.toast(Localization.for("GPS ERROR"), 4000);
}


function onBackKeyDown()
{

	alert('onbackkeydown');
	document.addEventListener("deviceready",criarDBGPS,false);
	 history.go(-1);
	    //navigator.app.backHistory();
	    
	//navigator.notification.alert();
    //navigator.app.exitApp();  // For Exit Application
}



function localizacao(){

	var local = window.localStorage;
	local.setItem('lat',marker.getPosition().lat().toFixed(6));
	local.setItem('lon',marker.getPosition().lng().toFixed(6));
	history.go(-1);
	//alert(marker.getPosition().lng().toFixed(6));
	//criarDBGPS();
	//alert('db gps ok');
	//BackKeyDown();
//	navigator.app.backHistory();
	document.addEventListener("backbutton", function (e) {
        if ($rootScope.ons.navigator.getPages().length > 1) {
            e.preventDefault();
            $rootScope.ons.navigator.popPage();
        } else {
            navigator.app.exitApp();
        }
}, false);

	
}

function ocultandoMapa(){
	document.getElementById('localizacao').value = "xxxxxxx";
	document.getElementById('localizacaoGPS').value = "xxxxxxx";
}


function lerDBGPS() {
	var local = window.localStorage;
	if(local.getItem('lon')!=null){
		document.getElementById('localizacao').value = local.getItem('lon') + " " + local.getItem('lat');
		document.getElementById('localizacaoGPS').value = local.getItem('lon') + " " + local.getItem('lat');
	}
	else{
		document.getElementById('localizacao').value = '0 0';
		document.getElementById('localizacaoGPS').value = '0 0';
	}
	
	//document.getElementById('inputgps').value = "1 1";
	//var myDB = window.sqlitePlugin.openDatabase({
//	var myDB = null;
//	
//	document.addEventListener('deviceready', function(){
//		if(window.cordova){
//			console.log('browser');
//			myDB = window.openDatabase("jogoDB.db",'1','auto',1024*1024*100);
//			//myDB = window.openDatabase({name: "jogoDB.db",location : 'default'});
//		} else{
//			console.log('device');
//			myDB = window.openDatabase({name: "jogoDB.db",location : 'default'});
//		}
//
//	myDB.transaction(function(transaction) {
//		transaction.executeSql('DROP TABLE IF EXISTS gps;');
//    	transaction.executeSql('CREATE TABLE IF NOT EXISTS gps (id integer primary key, lon text, lat text)');
//    	transaction.executeSql('insert into gps(id, lat, lon) VALUES(1,0,0)');
//	});
//	
//	myDB.transaction(function(tx) {
//		//transaction.executeSQL('SELECT COUNT(*) AS qtd FROM gps', [], function(rs){
//		tx.executeSql("SELECT * from gps", [], function(tx, rs){
//			//document.getElementById('inputgps').value = rs.rows.item(0).lon + " " + rs.rows.item(0).lat;
//			console.log('===>'+rs.rows.item(0).lon);
//			
//			//console.log(rs.rows.lenght);
//			console.log(rs.rows.item(0));
//			console.log(rs.rows.item(0).lon);
//		},function(erro){
//			console.log('erro lendo gps');
//			console.log(erro.message);
//		});
//	});
//	});
	
	//    	transaction.executeSql('CREATE TABLE IF NOT EXISTS gps (id integer primary key, lon text, lat text)');

	
}