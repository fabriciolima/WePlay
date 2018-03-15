var local = window.localStorage;
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
var options={message:"Check This",
	  	   subject:"", 
	  	   files:null, 
	  	   url:"https://jx52y.app.goo.gl/pGuk",
	  	   chooserTitle:'We Play'}


	

getJogosPorPerto();
getMeusJogosTelaInicial();
$('.atualiza').on('click',function(){
	$currentPage = 0;	
	$("#porperto").empty();
	$("#meusjogos").empty();
	getMeusJogosTelaInicial();
	getJogosPorPerto();
	return false;
});
	
                


$('.cadastro-jogo').on('click', function() {
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
	items.push('<div class="col s12 m7">'
					+ '<div class="card horizontal">'
					+ '<div class="card-image">'
					+'<img src="'+gerURLjogo90(jogocliente.idJogo)+'"> '
					+ '</div>'
					+ '<div class="card-stacked">'
					+ '	<div class="card-content listadiv">'
					+'<a style="float:right" class="btn btn-floating" onclick="apaga(\''+jogocliente.idJogo+'\')">' 
							+'<i class="material-icons">delete</i></a>'
					+ '	<div>'
					+ '			<h6>'+jogocliente.nomePlataforma+'</h6>'
					+ '			<h5> '+jogocliente.nomeJogo+'</h5>'
					+ ' </div>'
					
					 +(jogocliente.qtdInteressados ==0?'':'<div><a style="float:right" class="btn btn-floating pulse" onclick="verpropostas(\''+jogocliente.id+'\')">'
					 					 +'<i class="material-icons">message</i></a></div>')
					
					+ '	</div>'
					+ '</div>'
					+ '</div></div>');
				$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meusjogos');
			// botaoTemJogosParaTroca(jogocliente);
		}

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
	ultimaabertura = jogocliente.data().ultimaabertura;
	console.log(jogocliente.id)
	if( jogocliente.data() != null && ultimaabertura != null){
		temMsg = false;
		qtdMsg = 0;
		db.collection("jogocliente").doc(jogocliente.id)
		
		where("idproposta","==",jogocliente.id).where("dataexclusao","==",false)
			//.where("datacadastro",">",ultimaabertura)
			.orderBy("datacadastro", "desc").limit(1).get().then(function(listaTroca){
				qtdMsg += listaTroca.size;
				console.log(listaTroca.size);
				listaTroca.forEach(function(docTroca){
					temMsg = temMsg || docTroca.data().datacadastro > ultimaabertura;
				});	

				if(!temMsg){
					db.collection("trocas").where("idinteresse","==",jogocliente.id).where("dataexclusao","==",false)
					//.where("datacadastro",">",ultimaabertura)
					.orderBy("datacadastro", "desc").limit(1).get().then(function(listaTroca){
						console.log(listaTroca.size);
						qtdMsg += listaTroca.size;
						listaTroca.forEach(function(docTroca){
							temMsg = temMsg || (docTroca.data().datacadastro > ultimaabertura);
						});	

						if(temMsg){
								 $('<div><a style="float:right" class="btn btn-floating pulse" onclick="verpropostas(\''+jogocliente.id+'\')">'
										 +'<i class="material-icons">message</i></a></div>').appendTo('#listainteressados_'+jogocliente.id);
							
						}else if(qtdMsg >0){
							$('<a style="float:right" class="btn btn-floating" onclick="verpropostas('+jogocliente.id+')">' 
											 +'<i class="material-icons">message</i></a>').appendTo('#listainteressados_'+jogocliente.id);
						}
					});
				}
			});


			//chat baseado em recebido
			db.collection("chat").where("idpessoa1","==",jogocliente.id)
			//where("dataexclusao","==",false)
			//.where("datacadastro",">",ultimaabertura)
			.orderBy("datacadastro", "desc").limit(1).get().then(function(listaTroca){
				if(listaTroca.size>0){
					 $('<div><a style="float:right" class="btn btn-floating pulse" onclick="verpropostas(\''+jogocliente.id+'\')">'
										 +'<i class="material-icons">message</i></a></div>').appendTo('#listainteressados_'+jogocliente.id);
				}
			});

	}
	return '';
}

function verpropostas(idjogocliente){
	var local = window.localStorage;
	local.setItem('idjogocliente',idjogocliente);
	// db.collection("jogocliente").doc(idjogocliente).set({
	// 	ultimaabertura:new Date()
	// }, { merge: true })
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
		//var local = window.localStorage;
		var filtros=[];
		db.collection("plataforma").get().then(function(listaPlataforma){
			listaPlataforma.forEach(function(docPlataforma){
				if(local.getItem("plataforma"+docPlataforma.id)!= "")
				filtros.push(docPlataforma.id);
			});
			if(local.getItem('lat')!=null){
				adicionaJogosPorPerto(filtros);
			}
			else
			navigator.geolocation.getCurrentPosition(function(posicao){
				Materialize.toast("indo buscar no GPS", 4000);
				adicionaJogosPorPerto(filtros);
			}, onError, { timeout: 3000 });
		});

	});
}

function adicionaJogosPorPerto(filtros){

	if(local.getItem('lat')!=null){
		lat = local.getItem('lat');
		long = local.getItem('lon');
	}
	else{
		var lat=posicao.coords.latitude.toFixed(6);
		var long=posicao.coords.longitude.toFixed(6);
		local.setItem('lat',lat);
		local.setItem('lon',long);
	}
	pos = "Point(" + long+" "+lat+")";
	
	
console.log(JSON.stringify(filtros));
	$.ajax({
		type: "GET",
		url: getJSON()+"/jogosperto",
		data: { 
			pos:pos,
			// getJogosPorPerto: 1,
			// sortBy: 'name', 
			// sortOrder: 'ASC',
			page: $currentPage,
			size: $pageSize,
			plataformas:JSON.stringify(filtros)
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

}

function getMeusJogosTelaInicial(){
	var local = window.localStorage;
	idCliente = local.getItem('idCliente');
	console.log(idCliente);
	if(idCliente != null)
	$.ajax({
		type: "GET",
		url: getJSON()+"/meusjogos",
		data: {idcliente:idCliente,
			idinteresse:null},
		crossDomain: false,
		cache: false,
		dataType: "json",
		success: function(data){
			for(cont = 0 ; cont < data.length; ++cont){
				adicionaMeuJogoTelaInicial(data[cont])
			}
		}
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
	window.plugins.AdMob.createBannerView();
	//showBannerFunc();
}, true);


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
				//window.plugins.AdMob.createInterstitialView();			//REMOVE THESE 2 LINES IF USING AUTOSHOW 
				//window.plugins.AdMob.requestInterstitialAd();			//get the next one ready only after the current one is closed 
			});
		}
	 
	function showBannerFunc(){
		window.plugins.AdMob.createBannerView();
	}
	
if(local.getItem("primeiravez")==null){
	db.collection("plataforma").get().then(function listaPlataforma(listaPlataforma){
		listaPlataforma.forEach(function(doc){
			local.setItem("plataforma"+doc.id, "checked");
		});
	});
	local.setItem("primeiravez","nao");
}

function initAd(){
	if ( window.plugins && window.plugins.AdMob ) {
		var ad_units = {
			ios : {
				banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',		//PUT ADMOB ADCODE HERE
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
			adSize: window.plugins.AdMob.AD_SIZE.BANNER,	//use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
			bannerAtTop: false, // set to true, to put banner at top
			overlap: false, // banner will overlap webview 
			offsetTopBar: false, // set to true to avoid ios7 status bar overlap
			isTesting: true, // receiving test ad
			autoShow: false // auto show interstitial ad when loaded
		});

		registerAdEvents();
		

	} else {
		//alert( 'admob plugin not ready' );
	}
}