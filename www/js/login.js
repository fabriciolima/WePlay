//window.sqlitePlugin.deleteDatabase();
//var provider = null;
//  new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// firebase.auth().useDeviceLanguage();
var local = window.localStorage;
//provider.setCustomParameters({'login_hint': 'user@example.com'});

function loginGoogle(){
	 var provider = new firebase.auth.GoogleAuthProvider();
	 provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
	 firebase.auth().useDeviceLanguage();
	 firebase.auth().signInWithRedirect(provider).then(function() {
		firebase.auth().getRedirectResult().then(function(result) {
		  // This gives you a Google Access Token.
		  // You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;

		  local.setItem('uidCliente', user.uid);
			local.setItem('nomeCliente', user.displayName);

			
		});
	}).catch(function(error){
		if (error.code === 'auth/account-exists-with-different-credential') {
			local.setItem('uidCliente', '0');
			local.setItem('nomeCliente', 'Logado antes');
		}
	});
	 
	 

}
function loginFacebook(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().useDeviceLanguage();
	provider.addScope('public_profile');
	firebase.auth().signInWithRedirect(provider).catch(function(error){
		if (error.code === 'auth/account-exists-with-different-credential') {
			local.setItem('uidCliente', '0');
			local.setItem('nomeCliente', 'Logado antes');
		}
	});
}


function login(){
	firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
			var token = result.credential.accessToken;
		}
			var user = result.user;
			var local = window.localStorage;
			local.setItem('uidCliente', user.uid);
			local.setItem('nomeCliente', user.displayName);
	});
}


firebase.auth().getRedirectResult().then(function(result) {
	var local = window.localStorage;
	if(result!=null){
		console.log(result);
		local.setItem('uidCliente', result.user.uid);
		local.setItem('nomeCliente', result.user.displayName);
		if (result.credential) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			//var token = result.credential.accessToken;
		}
	}
		
});



// 	firebase.auth().signInWithPopup(provider).then(function(result) {
// 	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
// 	  var token = result.credential.accessToken;
// 	  // The signed-in user info.
// 	  var user = result.user;
// 		var local = window.localStorage;
// 		local.setItem('uidCliente', user.uid);
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
	
	if(local.getItem('uidCliente')==null || local.getItem('uidCliente')=="null"){
		Materialize.toast(Localization.for("facalogin"));
	}
	else
	if((lat == null) || (lat == 0)){
		Materialize.toast(Localization.for("escolherlocalizacao"));
	}
	else{
		$.post(getJSON()+'/cliente/add',{
      uid:local.getItem('uidCliente'),
			nome:local.getItem('nomeCliente'),
			lat:lat,
			lon:lon},function(data, status){
					if(data != null && data != ""){
						local.setItem('idCliente',data);
						window.location = "index.html";
					}
				}).catch(function(erro){
					Materialize.toast('Erro salvando', 4000);
				});
			};
	return false;
	
};

