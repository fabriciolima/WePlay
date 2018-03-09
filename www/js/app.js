

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




$('.botao-voltar').on('click', function() {
	 function BackKeyDown()
     {
		 e.preventDefault(); 
     }
    
});

var options={message:"kjhkjh",
	  	   subject:"llkjlj", 
	  	   files:null, 
	  	   url:"http://google.com/",
	  	   chooserTitle:'titulo'}

//window.plugins.socialsharing.shareWithOptions(options,null,null);

	


$('.atualiza').on('click',function(){
                // mRefresh.refresh();
        //refresh();
	$("#porperto").empty();
	$("#meusjogos").empty();
	getJogosPorPerto();
	getMeusJogos();
                return false;
            });



$('.cadastro-jogo').on('click', function() {
<<<<<<< HEAD
	var local = window.localStorage;
	var idCliente = local.getItem('idCliente');
	if(idCliente != null)
		window.location = "cadastroJogo.html";
	else{
		window.location = "login.html";
	}
=======
	window.location = "login.html";
//	var local = window.localStorage;
//	console.log(1);
//	var idCliente = local.getItem('idCliente');
//	console.log(idCliente);
//	if(idCliente != null)
//		window.location = "cadastroJogo.html";
//	else{
//		window.location = "login.html";
////		loginGoogle();
//	}
>>>>>>> remotes/origin/pc
    
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
			+ '<h2 class="header">Jogo perto</h2>'
			+ '<div class="card horizontal">'
			+ '<div class="card-image">'
			+ '	<img src="'+gerURLjogo90(data.idJogo)+'"> '
// + ' <img src="'+ getImagemPlataforma(data.id)+ '">'
			+ '</div>'
			+ '<div class="card-stacked">'
			+ '	<div class="card-content">'
			+ '		<p>'
			+ '<h6>'+data.nomeJogo+'</h6>'
// + '<h5> '+nomePlataforma(data.idPlataforma)+'</h5>'
			+ data.nomePlataforma
			+ '</p>'
			+ '	</div>'
			+ '	<div class="card-action">'
			+ '	<button class="btn waves-effect waves-light" type="submit" name="action" ' 
			+'     onclick="proporTroca('+data.idJogoCliente+','+data.distancia
// +',\''+data.nomeJogo+'\',\''
// +data.nomePlataforma +'\',\''
// '\')
								+')"> Propor troca <i class="material-icons right">shuffle</i> </button>'
			+'  <span class="badge">'+data.distancia+'</span></div>'
			+ '	</div>'
			+ '</div>'
			+ '</div></div>');
	$('<ul/>', {'class' : 'my-new-list',
		html : items.join('')
	}).appendTo('#porperto');
// }).appendTo('body');
};

function proporTroca(idJogoCliente,distancia){// },nomeJogo,nomePlataforma){
	var local = window.localStorage;
	var idCliente = local.getItem('idCliente');
	if(idCliente == null)
		window.location = "login.html";
	else{
//		loginGoogle();
	local.setItem('idjogocliente',idJogoCliente);
// local.setItem('nomeJogo',nomeJogo);
// local.setItem('nomePlataforma',nomePlataforma);
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
					+'<img src="'+gerURLjogo90(doc.data().id)+'"> '
					+ '</div>'
					+ '<div class="card-stacked">'
					+ '	<div class="card-content listadiv">'
					+ '	<div>'
					+ '			<h6>'+plataforma.data().nome+'</h6>'
					+ '			<h5> '+doc.data().nome+'</h5>'
					+ ' </div>'
					+'<div id="listainteressados_'+jogocliente.id+'" > </div>'
					+ '	</div>'
					+ '</div>'
					+ '</div>' + '</div>');
				$('<ul/>', {'class' : 'my-new-list',
					html : items.join('')
					}).appendTo('#listameusjogos');
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

function botaoTemJogosParaTroca(jogocliente){
//	botao",db.collection("jogocliente").doc(jogocliente.id);
<<<<<<< HEAD
	// console.log(jogocliente.id,jogocliente.data().ultimaabertura);
=======
	console.log(jogocliente.id,jogocliente.data().ultimaabertura);
>>>>>>> remotes/origin/pc
	if( jogocliente.data() != null && jogocliente.data().ultimaabertura != null){
		db.collection("jogocliente").doc(jogocliente.id).collection("interessados").where("datacadastro",">=",jogocliente.data().ultimaabertura)
		.get().then(function (listaNovos){
			if(listaNovos.size>0){
				console.log("novo",jogocliente.id);
				$('<div><a style="float:right" class="btn btn-floating pulse" onclick="verpropostas('+jogocliente.id+')">'
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
getJogosPorPerto();
// Ajax call
google.maps.event.addDomListener(window, 'load', getLocation);
function getJogosPorPerto(){
	document.addEventListener('deviceready', function(){
		navigator.geolocation.getCurrentPosition(function(posicao){
<<<<<<< HEAD
			console.log("perto",posicao);
			var lat=0;//position.coords.latitude;
			var long=0;//position.coords.longitude;
=======
			var lat=0;//position.coords.latitude;
			var long=0;//position.coords.longitude;
			console.log("Point(" + long+" "+lat+")");
>>>>>>> remotes/origin/pc
			pos = "Point(" + long+" "+lat+")";
			$.ajax({
				type: "GET",
				url: getJSON()+"/jogosperto",
				data: { 
<<<<<<< HEAD
					pos:"Point(0 0)",
=======
					pos:pos,
>>>>>>> remotes/origin/pc
					getJogosPorPerto: 1,
					sortBy: 'name', 
					sortOrder: 'ASC',
					page: $currentPage,
					size: $pageSize,
					filterBy: $filter
				},
				crossDomain: false,
				cache: false,
				dataType: "json",
				beforeSend: function(){ 
					scrollStop = 1;
				},
				success: function(data){
					for(cont = 0 ; cont < data.length; ++cont){
<<<<<<< HEAD
						console.log("cont",cont);
=======
>>>>>>> remotes/origin/pc
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



function getMeusJogos(){
	document.addEventListener('deviceready', function(){
		db.collection("jogocliente").where("idcliente","==","13")
		.get().then(function(lista){
			lista.forEach(function(doc) {
				adicionaMeuJogoTelaInicial(doc);				
			});
		});		
	});
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

getMeusJogos();
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


function getImagemPlataforma(id){

// window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
//
// console.log('file system open: ' + fs.name);
// fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false },
// function (fileEntry) {
//
// console.log("fileEntry is file?" + fileEntry.isFile.toString());
// // fileEntry.name == 'someFile.txt'
// // fileEntry.fullPath == '/someFile.txt'
// writeFile(fileEntry, null);
// }, function(){console.log("111");});
// }, function(){console.log("22222");});

// }, onErrorLoadFs);
// window.resolveLocalFileSystemURI("img/plataforma50/15_50.JPG", function(){
// console.log("existe");
// }, function(){
// console.log("nao existe");
// });

	// return "img/plataforma50/15_50.JPG";
	return "img/jogo90/"+id + "_90.png";
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
<<<<<<< HEAD



// cordova.plugins.firebase.messaging.requestPermission().then(function(token) {
//     console.log("APNS device token: ", token);
// });

// cordova.plugins.firebase.messaging.getToken().then(function(token) {
//     console.log("Got device token: ", token);
// });
=======

cordova.plugins.firebase.messaging.requestPermission().then(function(token) {
    console.log("APNS device token: ", token);
});

cordova.plugins.firebase.messaging.getToken().then(function(token) {
    console.log("Got device token: ", token);
});
>>>>>>> remotes/origin/pc


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
