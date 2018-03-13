//window.sqlitePlugin.deleteDatabase();
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();

provider.setCustomParameters({
	  'login_hint': 'user@example.com'
	});

function loginGoogle(){
	firebase.auth().signInWithRedirect(provider).then(login());
}
function loginFacebook(){
	firebase.auth().signInWithRedirect(provider);
}

function login(){
		firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			
		//firebase.auth().signInWithPopup(provider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
			var local = window.localStorage;
			local.setItem('idTemp', user.uid);
			local.setItem('nomeCliente', user.displayName);
			console.log('idTemp', user.uid);
			console.log('user', user);
		}
	});
}


// 	firebase.auth().signInWithPopup(provider).then(function(result) {
// 	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
// 	  var token = result.credential.accessToken;
// 	  // The signed-in user info.
// 	  var user = result.user;
// 		var local = window.localStorage;
// 		local.setItem('idTemp', user.uid);
// 	  local.setItem('nomeCliente', user.displayName);
// 	}).catch(function(error) {
// 	  // Handle Errors here.
// 	  var errorCode = error.code;
// 	  var errorMessage = error.message;
// 	  // The email of the user's account used.
// 	  var email = error.email;
// 	  // The firebase.auth.AuthCredential type that was used.
// 	  var credential = error.credential;
// 	  // ...
// 	});
// }


function salvaCliente(){
	var local = window.localStorage;
	lat = local.getItem('lat');
	lon = local.getItem('lon');
	
	if(local.getItem('idTemp')==null || local.getItem('idTemp')=="null"){
		Materialize.toast(Localization.for("facalogin"));
	}
	else
	if((lat == null) || (lat == 0)){
		Materialize.toast(Localization.for("escolherlocalizacao"));
	}
	else{
		$.post(getJSON()+'/cliente/add',{
      uid:local.getItem('idTemp'),
			nome:local.getItem('nomeCliente'),
			lat:lat,
			lon:lon},function(data, status){
					if(data != null && data != ""){
						local.setItem('idCliente',data);
						console.log("===>",data);
						window.location = "index.html";
					}
				}).catch(function(erro){
					Materialize.toast('Erro salvando', 4000);
					console.log(erro);
				});
			};
	return false;
	
};

