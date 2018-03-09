//const firebase = require("firebase");
//Required for side-effects
//require("firebase/firestore");

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9v3ZU8IJd5bMIW-qgi5s5lVkDuQsQ3Ew",
    authDomain: "jogos-usados.firebaseapp.com",
    databaseURL: "https://jogos-usados.firebaseio.com",
    projectId: "jogos-usados",
    storageBucket: "jogos-usados.appspot.com",
    messagingSenderId: "1082277080885"
  };
  firebase.initializeApp(config);
  var db = firebase.firestore();
  
  

  firebase.firestore().enablePersistence()
	.then(function() {
	    console.log('offline');
	    var db = firebase.firestore();
	})
	.catch(function(err) {
	    if (err.code == 'failed-precondition') {
	        // Multiple tabs open, persistence can only be enabled
	        // in one tab at a a time.
	        // ...
	    } else if (err.code == 'unimplemented') {
	        // The current browser does not support all of the
	        // features required to enable persistence
	        // ...
	    }
	});
//  const db.collection("plataforma/1").set({id: 1, nome: "Outros"}).then(function(){console.log("salvo");});
//  db.collection("plataforma").doc("2").set({id: 2, nome: "Playstation 1"}).then(function(){console.log("salvo");});
    
	const docCliente = db.doc("plataforma/Outros");
//	docCliente.set({
//		id:0,
//		nome: "Outros"
//	}).then(function(){console.log("salvo");})
//		.catch(function(erro){
//			console.log(erro);
//		});
	
//	
//	docCliente.get().then(function (doc){
//		if(doc && doc.exists)
//			console.log(doc.data());
//	}).catch(function(erro){
//		console.log(erro);
//	});
	
	
	
//		snapshot.docChanges.forEach(function(change)
//	db.collection("clientes").equalTo("ninguem").get().then(function (lista){
//		console.log("tamanho:"+lista.size);
//		lista.forEach(function(doc){ 
//			if(doc && doc.exists)
//				console.log(doc.data());
//		});
//	}).catch(function(erro){
//		console.log(erro);
//	});
	// Stop listening to changes
//	unsubscribe();
	
//	db.collection("clientes").doc("alguem")
//    .onSnapshot(function(doc) {
//        console.log("alguem: ", doc && doc.data());
//    });
//	
//	docCliente.onSnapshot(function(doc){
//		console.log("doc: "+doc);
//			if(doc && doc.exists)
//				console.log("tempo real:",doc.data());
//		})
	
	
//	docCliente.on("value", function(snapshot) {
//		  console.log(snapshot.val());
//	}, function (errorObject) {
//	  console.log("The read failed: " + errorObject.code);
//	});

	
	
function getJogo(nomeJogo){
		retorno=null;
		db.collection("jogo").where("nome","==",nomeJogo)
			.get().then(function (lista){
				lista.forEach(function(doc) {
		            retorno = doc.data();
		        });

			});
				
		return retorno;
}