var local = window.localStorage;
console.log("primeiravez",local.getItem("primeiravez"));
if(local.getItem("primeiravez")==null){
	for(cont = 0 ; cont < plataforma.length; ++cont){
			local.setItem("plataforma"+plataforma[cont][0], "checked");
		};
		// local.setItem("primeiravez","nao");
}

$('.botao-share').on('click', function() {
	 window.plugins.socialsharing.shareWithOptions(options,null,null);
});

$('.botao-chat').on('click', function() {
	window.location = "listachat.html";
});

var options={message:"Check This",
	  	   subject:"", 
	  	   files:null, 
	  	   url:"https://jx52y.app.goo.gl/pGuk",
	  	   chooserTitle:'We Play'}

			 
	

getJogosPorPerto();
getMeusJogosTelaInicial();
verificaPossuiChat();

$('.atualiza').on('click',function(){
	$currentPage = 0;	
	$("#porperto").empty();
	$("#meusjogos").empty();
	getMeusJogosTelaInicial();
	getJogosPorPerto();
	return false;
});
	
                


$('.adiciona-jogo').on('click', function() {
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
	
	items.push('<li onclick="proporTroca(\''+data.id+'\','+data.distancia+',\''+data.nomePlataforma+'\')" >'
			+'<div class="col s12 m7">'
			+ '<div class="card horizontal">'
			+ '<div class="card-image" style="max-width: 35%;" >'
			+ '	<img src="'+gerURLjogo90(data.idJogo)+'"> '
// + ' <img src="'+ getImagemPlataforma(data.id)+ '">'
			+ '</div>'
			+ '<div class="card-stacked">'
			+ '	<div style="padding: 5px  15px  24px 5px;">'
			+ '		<h6 style="padding-left:  15px;">'+data.nomePlataforma+'</h6>'
 			+ '		<h5 style="padding-left:  5px;"> '+data.nomeJogo+'</h5>'
			 +'  <span class="badge">'+data.distancia+' Km</span> '
			 
			 + '</div>'
			+ '	</div>'
			// + '	<button class="btn waves-effect waves-light" type="submit" name="action" ' 
			// +'     onclick="proporTroca('+data.idJogoCliente+','+data.distancia
			// 					+')"> Propor troca <i class="material-icons right">shuffle</i> </button>'
								
			+'<div">'
			+ '</div>'
			+ '</div></div></li>');
	$('<ul />', {'class' : 'my-new-list',html : items.join('')}).appendTo('#porperto');
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
	var itemsMeu = [];
	itemsMeu.push('<div class="col s12 m7">'
					+ '<div class="card horizontal">'
					+ '<div class="card-image">'
					+'<img src="'+gerURLjogo90(jogocliente.idJogo)+'"> '
					+ '</div>'
					+ '<div class="card-stacked">'
					+ '	<div class="card-content listadiv">'
					+'<a style="float:right" class="btn btn-floating" onclick="apaga(\''+jogocliente.id+'\')">' 
							+'<i class="material-icons">delete</i></a>'
					+ '	<div>'
					+ '			<h6>'+jogocliente.nomePlataforma+'</h6>'
					+ '			<h5> '+jogocliente.nomeJogo+'</h5>'
					+ ' </div>'
					
					 +(jogocliente.qtdInteressados ==0?'':'<div><a style="float:right" class="btn btn-floating pulse" onclick="verpropostas(\''+jogocliente.id+'\')">'
					 					 +'<i class="material-icons">visibility</i></a></div>')
					
					+ '	</div>'
					+ '</div>'
					+ '</div></div>');
					
				$('<ul/>', {'class' : 'my-new-list',html : itemsMeu.join('')}).appendTo('#meusjogos');
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
	idCliente = local.getItem("idCliente");
	console.log(idJogoCliente,idCliente);
	$.post(getJSON()+'/jogo/d',{
		jc:idJogoCliente,
		uid:uidCliente},
	 function(result){
		$("#meusjogos").empty();		 
		Materialize.toast("OK", 4000);
		getMeusJogosTelaInicial();
	});
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
// google.maps.event.addDomListener(window, 'load', getLocation);

function getJogosPorPerto(){
	document.addEventListener('deviceready', function(){
		//var local = window.localStorage;
		var filtros=[];
		
		for(cont = 0 ; cont < plataforma.length; ++cont){
			if(local.getItem("plataforma"+plataforma[cont][0])== "checked"){
				filtros.push(plataforma[cont][0]);
			}
		}
			console.log(JSON.stringify(filtros));
			lat = local.getItem('lat');
			long = local.getItem('lon');
			console.log("lat",lat);
			if(lat!=null){
				adicionaJogosPorPerto(filtros);
			}
			else{
				navigator.geolocation.getCurrentPosition(function(posicao){
					local.setItem('lat',posicao.coords.latitude);
					local.setItem('lon',posicao.coords.longitude);
					adicionaJogosPorPerto(filtros);
				}, onError, { timeout: 3000 });
			}
	});
}

function adicionaJogosPorPerto(filtros){

	lat = local.getItem('lat');
	long = local.getItem('lon');
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
			listaPlataforma:JSON.stringify(filtros)
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
				adicionaMeuJogoTelaInicial(data[cont]);
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




// window.addEventListener('pushnotification', function(notification) {
//     console.log("push");
//     // was the app in the forground when the notification was received?
//     window.addEventListener('pushnotification', function(notification) {
        
//         // was the app in the forground when the notification was received?
//         var inForground = notification.$foreground;
//         // was the app active when then notification was received?
//         notification.$active;
        
//         alert()
//     }, false);

// }, false);

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

function verificaPossuiChat(){
// 	//$('<i class="material-icons waves-effect waves-light waves-circle botao-chat">message</i>').appendTo('#botoes');
// 	$('<button class="btn waves-effect waves-light" onclick=")">'
// 		+' <i class="material-icons right">message</i> </button>').appendTo('#botoes');
// 	local.getItem("idCliente");
// 	$.post(getJSON()+'/chat/verifica',{idCliente: idCliente}, function(result){
// 		console.log(result);
// 		// if(result=="true")
// });	
}

