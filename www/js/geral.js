document.addEventListener('deviceready', function(){
	Localization.initialize(
    { 
		pt: {
            sim: "SIM",
            nao: "Nops",
            perto:"Por perto",
            meusjogos:"Meus jogos",
            escolhaopcao:"Escolha uma opção",
            selecioneconsole:"Selecione um console",
            estado:"Estado de conservação",
            loginfacebook:"Login com Facebook",
            logingoogle:"Login com Google",
            localizacao:"Localização",
            escolherlocalizacao:"Escolher localização",
			facalogin:"Faça o Login com uma conta selecionada",
			enviar:"Enviar",
			proportroca:"Propor troca",
			semgps:"Sem gps",
			novo:"Novo",
			usado:"Usado",
			melhorlercomentario:"Melhor ler comentário",
			outros:"Outros",
			estadoconservacao:"Selecione estado de conservação",
			nomejogo:"Nome do jogo",
			escolherplataforma:"Escolha uma plataforma",
			escolherjogo:"Escolha um jogo",
			jogojacadastrado:"Voce já tem esse jogo",
			jogocadastrado:"Pronto para troca",
			tiporolo:"Comentário ou troco por $$$ "

        },
        fr: {
            sim: "Oui",
            nao: "Non",
            perto:""
		},
		es: {
            sim: "si",
            nao: "No",
            perto:"cerca",
            meusjogos:"mis juegos",
            escolhaopcao:"elija la opción",
            selecioneconsole:"seleccione una consola",
            estado:"Estado de conservación",
            loginfacebook:"Iniciar sesión con Facebook",
            logingoogle:"Iniciar sesión con  Google",
            localizacao:"Localización",
            escolherlocalizacao:"Elegir la ubicación",
			facalogin:"Inicie sesión con una cuenta seleccionada",
			enviar:"Enviar",
			proportroca:"Proponer un intercambio",
			semgps:"Sin gps",
			novo:"Nuevo",
			usado:"Usado",
			melhorlercomentario:"Mejor leer el comentario",
			outros:"Otros",
			estadoconservacao:"Seleccione estado de conservación",
			nomejogo:"Nombre del juego",
			escolherplataforma:"Elija una plataforma",
			escolherjogo:"Elegir un juego",
			jogojacadastrado:"Usted ya tiene ese juego",
			jogocadastrado:"listo para el intercambio",
			tiporolo:"Comentario o intercambio por $$$ "
						
        },
        en: {
            sim: "Yes",
            nao: "No",
            perto:"Near by",
            meusjogos:"My games",
            escolhaopcao:"Pick a choice",
            selecioneconsole:"Choose a console",
            estado:"conservation state",
            loginfacebook:"Login with Facebook",
            logingoogle:"Login with Google",
            localizacao:"Localization",
            escolherlocalizacao:"Choose a localization",
			facalogin:"Login with a selected account",
			enviar:"Send",
			proportroca:"Offer trade",
			semgps:"No gps signal",
			novo:"New",
			usado:"Wear",
			melhorlercomentario:"Better read comments",
			outros:"Others",
			estadoconservacao:"State of preservation",
			nomejogo:"Game's name",
			escolherplataforma:"Choose one platform",
			escolherjogo:"Choose a game",
			jogojacadastrado:"You have this game already",
			jogocadastrado:"OK. Good to go",
			tiporolo:"Comments or how much do you want"
			
        }
    },"en");
	});


//
//ImgCache.options.debug = true;
////increase allocated space on Chrome to 50MB, default was 10MB
//ImgCache.options.chromeQuota = 50*1024*1024;
////ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory;
//
//document.addEventListener('deviceready', function(){
//	ImgCache.init(function () {
//	
//		console.log('ImgCache init: success!');
//	
//	    // from within this function you're now able to call other ImgCache methods
//	    // or you can wait for the ImgCacheReady event
//	
//	}, function () {
//		console.log('ImgCache init: error! Check the log for errors');
//	});
//});

function voltar(){
	history.go(-1);
}

function getDB(){
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
		  return window.sqlitePlugin.openDatabase({name : "jogoDB.db",location : 'default',
			  androidDatabaseImplementation: 2});
		  //return window.openDatabase("jogoDB.db",'1','auto',1024*1024*100);
		} else {
		  return window.openDatabase("jogoDB.db",'1','auto',1024*1024*100);
		}
}

function getJSON(){
	// if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
	// 	db.doc("config/servidor").get().then(function(doc){
	// 		console.log("retornando remoto");
	// 		//return doc.data().ip;
	// 	});
		
	// }
	// console.log("retornando localhost");
	// return "http://18.219.152.216:8080/json";
	return "http://192.168.15.2:8080/json";
}

function gerURLplataforma90(id){
	return "www/img/plataforma90/"+id+"_90.png";
}

function gerURLplataforma(id){
	return "https://jogos-usados.firebaseapp.com/"+id+".png";
}

function gerURLjogo90(id){
	return "https://jogos-usados.firebaseapp.com/jogo90/"+id+"_90.png";
}

function gerURLjogo(id){
	return "https://jogos-usados.firebaseapp.com/jogo/"+id+"_90.png";
}

$('.botao-voltar').on('click', function() {
	voltar();	
});


function distancia(location1, location2) {
	  var radius = 6371; // Earth's radius in kilometers
	  var latDelta = degreesToRadians(location2[0] - location1[0]);
	  var lonDelta = degreesToRadians(location2[1] - location1[1]);

	  var a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
	          (Math.cos(degreesToRadians(location1[0])) * Math.cos(degreesToRadians(location2[0])) *
	          Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	  return radius * c;
};

function degreesToRadians(degrees) {
	  return (degrees * Math.PI / 180);
	};
	
// var admobid = {};
// 	  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
// 	    admobid = {
// 	      banner: 'ca-app-pub-5252544817016620/5591870476', // or DFP format "/6253334/dfp_example_ad"
// 	      interstitial: 'ca-app-pub-xxx/yyy'
// 	    };
// 	  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
// 	    admobid = {
// 	      banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
// 	      interstitial: 'ca-app-pub-5252544817016620/8293630401'
// 	    };
// 	  } else { // for windows phone
// 	    admobid = {
// 	      banner: 'ca-app-pub-5252544817016620/5591870476', // or DFP format "/6253334/dfp_example_ad"
// 	      interstitial: 'ca-app-pub-xxx/kkk'
// 	    };
// 	  }

// if(AdMob) AdMob.createBanner({
// 		  adId: admobid.banner,
// 		  position: AdMob.AD_POSITION.TOP_CENTER,
// 		  autoShow: true });

