importScripts('js/lib/firebase-app.js');
importScripts('js/lib/firebase-messaging.js');

var config = {
	    apiKey: "AIzaSyA9v3ZU8IJd5bMIW-qgi5s5lVkDuQsQ3Ew",
	    authDomain: "jogos-usados.firebaseapp.com",
	    databaseURL: "https://jogos-usados.firebaseio.com",
	    projectId: "jogos-usados",
	    storageBucket: "jogos-usados.appspot.com",
	    messagingSenderId: "1082277080885"
	  };
	  firebase.initializeApp(config);
	  

const messaging = firebase.messaging();

messaging.requestPermission()
.then(function() {
	console.log('Notification permission granted2.');
	return messaging.getToken();
}).then(function (token){
	console.log("token",token);
}).catch(function(err) {
	console.log('Unable to get permission to notify.', err);
});

messaging.onMessage(function(payload){
	console.log("payload",payload);
})