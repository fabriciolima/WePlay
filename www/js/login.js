//window.sqlitePlugin.deleteDatabase();
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();

provider.setCustomParameters({
	  'login_hint': 'user@example.com'
	});

function loginGoogle(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  var token = result.credential.accessToken;
	  var user = result.user;
	  var local = window.localStorage;
	  local.setItem('idTemp', user.uid);
	  local.setItem('nomeCliente', user.displayName);
	}).catch(function(error) {
		console.log(error);
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function loginFacebook(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  var local = window.localStorage;
	  local.setItem('idTemp', user.uid);
	  local.setItem('nomeCliente', user.displayName);
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function telaLogin(){
	document.addEventListener('deviceready', function(){
		
	});
};

function salvaCliente(){
	var local = window.localStorage;
	lat = local.getItem('lat');
	lon = local.getItem('lon');
	
	if(local.getItem('idTemp')==null){
		Materialize.toast(Localization.for("facalogin"));
	}
	else
	if((lat == null) || (lat == 0)){
		Materialize.toast(Localization.for("escolherlocalizacao"));
	}
	else{
		$.post(getJSON()+'/cliente/add',{
      uid:local.getItem('idTemp'),
			nome:local.getItem('nomeTemp'),
			lon:local.getItem('lon'),
			lat:local.getItem('lat')},
				function(data, status){
					if(data != null && data != ""){
						local.setItem('idCliente',local.getItem('idTemp'));
						window.location = "index.html";
					}
					
			});
		
	}	
	return false;
	
};

