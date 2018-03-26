var local = window.localStorage;
liberaCadastro();

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
			document.getElementById("btnlogin").disabled = false;

			
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
	firebase.auth().signInWithRedirect(provider);
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
			document.getElementById("btnlogin").disabled = false;
	});
}


firebase.auth().getRedirectResult().then(function(result) {
	var local = window.localStorage;
	
	if(result!=null){
		local.setItem('uidCliente', result.user.uid);
		local.setItem('nomeCliente', result.user.displayName);
		document.getElementById("btnlogin").disabled = false;
		if (result.credential) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			//var token = result.credential.accessToken;
		}
	}
		
}).catch(function(error) {
	if (error.code === 'auth/account-exists-with-different-credential') {
			local.setItem('uidCliente', '0');
			local.setItem('nomeCliente', 'Logado antes');
			document.getElementById("btnlogin").disabled = false;
		}
  });;



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

function liberaCadastro(){
	var local = window.localStorage;
	if(local.getItem('uidCliente')==null || local.getItem('uidCliente')=="null"
		|| local.getItem('idCliente')==null || local.getItem('idCliente')=="null"){
		document.getElementById("btnlogin").disabled = true;
	}
	else
	if((lat == null) || (lat == 0)){
		document.getElementById("btnlogin").disabled = true;
	}else
		document.getElementById("btnlogin").disabled = false;

}


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
		
		$.get(getJSON()+'/cliente/add',{
      		uid:local.getItem('uidCliente'),
			nome:local.getItem('nomeCliente'),
			lat:lat,
			lon:lon},function(data, status){

					if(data != null && data != "" && data != "null"){
						local.setItem('idCliente',data);
						window.location = "index.html";
					}
				}).catch(function(erro){
					Materialize.toast('Erro salvando', 4000);
				});
			};
	return false;
	
};

function mapa(){
	window.location = "mapa.html";
}
