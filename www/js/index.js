var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
  
        // app.receivedEvent('deviceready');
       universalLinks.subscribe(null, function (eventData) {
        // do some work
        alert(eventData.url);
        console.log('eventdata ', eventData);

    });
       

    universalLinks.subscribe('verify', function(data) {
        alert('verify: ' + JSON.stringify(data, null, 2));
      });
      universalLinks.subscribe('load', function(data) {
        alert('load: ' + JSON.stringify(data, null, 2));
      });
       navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    //   initAd();
    //    showBannerFunc();


    }
    // ,    onSuccess: function(position){
    //     var longitude = position.coords.longitude;
    //     var latitude = position.coords.latitude;
    //     var latLong = new google.maps.LatLng(latitude, longitude);

    //     var mapOptions = {
    //         center: latLong,
    //         zoom: 13,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };

    //     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
    //     var marker = new google.maps.Marker({
    //           position: latLong,
    //           map: map,
    //           title: 'my location'
    //       });
    // },
    
    // onError: function(error){
    //     alert("the code is " + error.code + ". \n" + "message: " + error.message);
    // },
};



app.initialize();