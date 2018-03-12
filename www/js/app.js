//alert(Localization.for("sim"));

//window.location = "chat.html";
//$('.collection')
//    .on('click', '.collection-item', function(){
//        var nomeProduto = this.firstChild.textContent;
//        Materialize.toast(nomeProduto + ' adicionado', 1000);
//
//        var $badge = $('.badge', this);
//        if ($badge.length === 0) {
//            $badge = $('<span class="badge brown-text">0</span>').appendTo(this);
//        }
//
//        $badge.text(parseInt($badge.text()) + 1);
//    })
//    .on('click', '.badge', function() {
//        $(this).remove();
//        return false;
//    });




$('.botao-share').on('click', function() {
	 window.plugins.socialsharing.shareWithOptions(options,null,null);
});
$('.botao-config').on('click', function() {
	window.location="logout.html";
});
var options={message:"kjhkjh",
	  	   subject:"llkjlj", 
	  	   files:null, 
	  	   url:"https://jx52y.app.goo.gl/pGuk",
	  	   chooserTitle:'We Play'}


	

getJogosPorPerto();
getMeusJogosTelaInicial();
$('.atualiza').on('click',function(){
                // mRefresh.refresh();
        //refresh();
	$("#porperto").empty();
	$("#meusjogos").empty();
	getMeusJogosTelaInicial();
	getJogosPorPerto();
                return false;
            });



$('.cadastro-jogo').on('click', function() {
	var local = window.localStorage;
	var idCliente = local.getItem('idCliente');
	if(idCliente == null || idCliente =="null")
		window.location = "login.html";
	else{
		window.location = "cadastroJogo.html";
	}
    
});

//
// $.getJSON("http://localhost:8080/json/plataforma",
// function(data) {
// var items = [];
// $.each(data,function(key, val) {
// console.log('plataforma'+val.nome);
// atualizaPlataformasDB(val);
// });
// });


// $.getJSON(getJSON()+"/jogo",
// function(data) {
//			
// $.each(data,function(key, val) {
// console.log('jogo:'+val.nome);
// atualizaJogosDB(val);
// adicionaJogoTelaInicial(val);
// });
// });


function adicionaJogoTelaInicial(data) {
// db.collection("jogocliente").doc(data.idJogoCliente).set({
// idcliente:data.idCliente,
// idjogo:data.idJogo,
// estadojogo:1,
// idplataforma:data.idPlataforma});
	var items = [];
	
	items.push('<div class="col s12 m7">'
			+ '<div class="card horizontal">'
			+ '<div class="card-image" >'
			+ '	<img src="'+gerURLjogo90(data.idJogo)+'"> '
// + ' <img src="'+ getImagemPlataforma(data.id)+ '">'
			+ '</div>'
			+ '<div class="card-stacked">'
			+ '	<div style="padding: 5px  15px  24px 5px;">'
			+ '		<h6 style="padding-left:  15px;">'+data.nomePlataforma+'</h6>'
 			+ '		<h5 style="padding-left:  5px;"> '+data.nomeJogo+'</h5>'
			 +'<a style="float:right" class="btn btn-floating" onclick="'
			 +'  proporTroca(\''+data.idJogoCliente+'\','+data.distancia+',\''+data.nomePlataforma
			 +'\')"><i class="material-icons">swap_horiz</i></a>'
			 +'  <span class="badge">'+data.distancia+' Km</span> '
			 
			 + '</div>'
			+ '	</div>'
			// + '	<button class="btn waves-effect waves-light" type="submit" name="action" ' 
			// +'     onclick="proporTroca('+data.idJogoCliente+','+data.distancia
			// 					+')"> Propor troca <i class="material-icons right">shuffle</i> </button>'
								
			+'<div">'
			+ '</div>'
			+ '</div></div>');
	$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#porperto');
// }).appendTo('body');
};

function proporTroca(idJogoCliente,distancia,nomePlataforma){
	var local = window.localStorage;
	var idCliente = local.getItem('idCliente');
	if(idCliente == null || idCliente =="null")
		window.location = "login.html";
	else{
//		loginGoogle();
	local.setItem('idjogocliente',idJogoCliente);
	// local.setItem('nomejogo',nomeJogo);
	local.setItem('nomeplataforma',nomePlataforma);
	local.setItem('distancia',distancia);
	window.location = "proposta.html";
	}
}
function adicionaMeuJogoTelaInicial(jogocliente) {
	var items = [];
// console.log(data);
	nomejogo = "";
//	console.log("jc",doc);

	db.doc("jogo/"+jogocliente.data().idjogo).get().then(function(doc){
		if(doc && doc.exists){
			db.collection("plataforma").doc(jogocliente.data().idplataforma).get().then(function(plataforma){
				items.push('<div class="col s12 m7">'
					+ '<div class="card horizontal">'
					+ '<div class="card-image">'
					+'<img src="'+gerURLjogo90(doc.id)+'"> '
					+ '</div>'
					+ '<div class="card-stacked">'
					+ '	<div class="card-content listadiv">'
					+'<a style="float:right" class="btn btn-floating" onclick="apaga(\''+jogocliente.id+'\')">' 
							+'<i class="material-icons">delete</i></a>'
					+ '	<div>'
					+ '			<h6>'+plataforma.data().nome+'</h6>'
					+ '			<h5> '+doc.data().nome+'</h5>'
					+ ' </div>'
					+'<div id="listainteressados_'+jogocliente.id+'" > </div>'
					+ '	</div>'
					+ '</div>'
					+ '</div></div>');
				$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meusjogos');
			botaoTemJogosParaTroca(jogocliente);
			})//plataforma
		}
	// }).appendTo('body');
	});
};

function nomePlataforma(idplataforma){
	console.log(idplataforma);
	if(idplataforma == null)
		return "";
	
		console.log("doc-"+idplataforma,doc.data())
		if(doc.exists)
			return doc.data().nome;
		else
			return "";

	}

function apaga(idJogoCliente){
	db.collection("jogocliente").doc(idJogoCliente).set({
		dataexclusao:new Date()
	}, { merge: true });
	$("#meusjogos").empty();
	getMeusJogosTelaInicial();
}

function botaoTemJogosParaTroca(jogocliente){
	// console.log("jogocliente",jogocliente);
//	botao",db.collection("jogocliente").doc(jogocliente.id);
	// console.log(jogocliente.id,jogocliente.data().ultimaabertura);
	if( jogocliente.data() != null && jogocliente.data().ultimaabertura != null){
		db.collection("jogocliente").doc(jogocliente.id).collection("interessados").where("datacadastro",">=",jogocliente.data().ultimaabertura)
		.get().then(function (listaNovos){
			if(listaNovos.size>0){
				console.log("novo",jogocliente.id);
				$('<div><a style="float:right" class="btn btn-floating pulse" onclick="verpropostas(\''+jogocliente.id+'\')">'
						+'<i class="material-icons">message</i></a></div>').appendTo('#listainteressados_'+jogocliente.id);
			}//verificar se existem mensagem antigas
			else db.collection("jogocliente").doc(jogocliente.id).collection("interessados")
			.get().then(function (listaTudo){
				if(listaTudo.size>0){
					console.log("tudo");
					$('<a style="float:right" class="btn btn-floating" onclick="verpropostas('+jogocliente.id+')">' 
							+'<i class="material-icons">message</i></a>').appendTo('#listainteressados_'+jogocliente.id);
				}
			});
		});
	}
	return '';
}

function verpropostas(idjogocliente){
	var local = window.localStorage;
	local.setItem('idjogocliente',idjogocliente);
	window.location = "propostaaceitacao.html";
}

// -----------------------------------------------------------------------------------------------
// script para o infinite scroll
// var url = geiftJSON()+"/jogo";
var $currentPage = 0;
var $pageSize = 20;
var scrollStop = 0;
var $filter = 'today';

// Ajax call
google.maps.event.addDomListener(window, 'load', getLocation);

function getJogosPorPerto(){
	document.addEventListener('deviceready', function(){
		navigator.geolocation.getCurrentPosition(function(posicao){
			var lat=posicao.coords.latitude.toFixed(6);
			var long=posicao.coords.longitude.toFixed(6);
			local.setItem('lat',lat);
			local.setItem('lon',long);
			pos = "Point(" + long+" "+lat+")";

			$.ajax({
				type: "GET",
				url: getJSON()+"/jogosperto",
				data: { 
					pos:pos,
					// getJogosPorPerto: 1,
					// sortBy: 'name', 
					// sortOrder: 'ASC',
					page: $currentPage,
					size: $pageSize
					// filterBy: $filter
				},
				crossDomain: false,
				cache: false,
				dataType: "json",
				beforeSend: function(){ 
					scrollStop = 1;
				},
				success: function(data){
					for(cont = 0 ; cont < data.length; ++cont){
						//console.log("cont",cont);
						// atualizaJogosDB(data.content[cont]);
						adicionaJogoTelaInicial(data[cont]);
					}
					if(data != null) scrollStop = 0;
					else scrollStop = 1;
					
				}
			});
		}, onError, { timeout: 3000 });
	});
}



function getMeusJogosTelaInicial(){
	var local = window.localStorage;
	idCliente = local.getItem('idCliente');
	console.log(idCliente);
	db.collection("jogocliente")
		.where("idcliente","==",idCliente)
		// .where("dataexclusao","==",null)
		.get().then(function(lista){
			lista.forEach(function(doc) {
				try {//@to-do mudar isso
					if(doc.data().dataexclusao == null)
						adicionaMeuJogoTelaInicial(doc);				
				}
				catch(err) {
					console.log(err,doc);
					
				}
			});
		});
return true;
}

// $.getJSON(getJSON()+"/meusjogos?idCliente=9",
// function(data) {
// console.log(data);
// $.each(data,function(key, val) {
// console.log('jogo:'+val.id);
// // atualizaJogosDB(val);
// // adicionaJogoTelaInicial(val);
// });
// });
//

$(document).scroll(function(e){
	      if(scrollStop == 0){
              var scrollAmount = $(window).scrollTop();
              var documentHeight = $('body').height();
              var viewPortHeight = $(window).height();

              var a = viewPortHeight + scrollAmount;
              var b = documentHeight - a;

              if(b < 300) {
                  $currentPage = $currentPage + 1;
                  getJogosPorPerto();
              }
          }
      });

// $('.filter').click(function(){
// $filter = $(this).attr('id');
// $('#grid-listing').empty();
// $currentPage = 0;
// scrollStop = 0;
// getJogosPorPerto();
// });


// google.maps.event.addDomListener(window, 'load', function(){
// navigator.geolocation.getCurrentPosition(cadastracliente, null, { timeout:
// 3000 });});

function cadastracliente(position){
	var local = window.localStorage;
	local.setItem('lat',position.coords.latitude.toFixed(6));
	local.setItem('lon',position.coords.longitude.toFixed(6));

	var lat=position.coords.latitude.toFixed(6);
    var long=position.coords.longitude.toFixed(6);
    
	    // if(lat != 0)
    dados={nome:lat,
    		telefone:"23423423",
    		localizacao: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)};
	    	
	    	db.collection("cliente").add(dados)
							.then(function(doc){
								console.log("salvo db");
								dados["localizacao"] = lat +' '+ long ;
								salvaClienteJSon(dados)})
							.catch(function(erro){console.log(erro);});
	
}

function salvaClienteJSon(dados){
	console.log("salvando dados:",dados);
	$.post(getJSON()+"/cliente/add",dados,function(data, status)
		    {
				if(status=='success'){
					if(data=='erro')
						alert('Erro. Tente novamente mais tarde');
					else{
						console.log("Data: " + data);
					}
					
				}
				else
					console.log("Data: " + data + "\nStatus: " + status);
			});
}



// db.collection("jogos").get().then({ includeQueryMetadataChanges: true },
// function(snapshot) {
// snapshot.docChanges.forEach(function(change) {
// console.log('change',change);
// adicionaJogoTelaInicial(change.doc.data());
// if (change.type === "added") {console.log("New city: ", change.doc.data());}
//				
// var source = snapshot.metadata.fromCache ? "local cache" : "server";
// console.log("Data came from " + source); });
// });
	

//const messaging = firebase.messaging();
//messaging.requestPermission()
//.then(function() {
//	console.log('Notification permission granted.');
//	console.log(messaging.getToken());
//	alert(messaging.getToken());
//	return messaging.getToken();
//}).then(function (token){
//	alert(token);
//}).catch(function(err) {
//	alert(err);
//});
//
//cordova.plugins.firebase.messaging.requestPermission().then(function(token) {
//	alert(": ", token);
//});



// cordova.plugins.firebase.messaging.requestPermission().then(function(token) {
//     console.log("APNS device token: ", token);
// });

// cordova.plugins.firebase.messaging.getToken().then(function(token) {
//     console.log("Got device token: ", token);
// });


window.addEventListener('pushnotification', function(notification) {
    console.log("push");
    // was the app in the forground when the notification was received?
    window.addEventListener('pushnotification', function(notification) {
        
        // was the app in the forground when the notification was received?
        var inForground = notification.$foreground;
        // was the app active when then notification was received?
        notification.$active;
        
        alert()
    }, false);

}, false);

document.addEventListener("deviceready", function(){
	
	initAd();
	showBannerFunc();
}, true);

function initAd(){
	// document.addEventListener("deviceready", initAd, true);
			if ( window.plugins && window.plugins.AdMob ) {
				var ad_units = {
					ios : {
						banner: 'ca-app-pub-5252544817016620/5591870476',		//PUT ADMOB ADCODE HERE 
						interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'	//PUT ADMOB ADCODE HERE 
					},
					android : {
						banner: 'ca-app-pub-5252544817016620/5591870476',		//PUT ADMOB ADCODE HERE 
						interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'	//PUT ADMOB ADCODE HERE 
					}
				};
				var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;
	 
				window.plugins.AdMob.setOptions( {
					publisherId: admobid.banner,
					interstitialAdId: admobid.interstitial,
					adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,	//use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD 
					bannerAtTop: false, // set to true, to put banner at top 
					overlap: true, // banner will overlap webview  
					offsetTopBar: false, // set to true to avoid ios7 status bar overlap 
					isTesting: false, // receiving test ad 
					autoShow: false // auto show interstitial ad when loaded 
				});
	 
				registerAdEvents();
				window.plugins.AdMob.createInterstitialView();	//get the interstitials ready to be shown 
				window.plugins.AdMob.requestInterstitialAd();
	 
			} else {
				//alert( 'admob plugin not ready' ); 
			}
	}
	//functions to allow you to know when ads are shown, etc. 
	function registerAdEvents() {
			document.addEventListener('onReceiveAd', function(){});
			document.addEventListener('onFailedToReceiveAd', function(data){});
			document.addEventListener('onPresentAd', function(){});
			document.addEventListener('onDismissAd', function(){ });
			document.addEventListener('onLeaveToAd', function(){ });
			document.addEventListener('onReceiveInterstitialAd', function(){ });
			document.addEventListener('onPresentInterstitialAd', function(){ });
			document.addEventListener('onDismissInterstitialAd', function(){
				window.plugins.AdMob.createInterstitialView();			//REMOVE THESE 2 LINES IF USING AUTOSHOW 
				window.plugins.AdMob.requestInterstitialAd();			//get the next one ready only after the current one is closed 
			});
		}
	 
	function showBannerFunc(){
		window.plugins.AdMob.createBannerView();
	}
	