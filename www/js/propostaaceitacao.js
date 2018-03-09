getMeuJogo();
adicionaPropostas();

function getMeuJogo(){
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	document.addEventListener('deviceready', function(){
		rcRef = db.collection("jogocliente").doc(idjogocliente);
		
		rcRef.get().then(function(doc){
			if(doc.exists){
					adicionaMeuJogoTela(doc.data());
					adicionaPropostas(rcRef);
				}else{
					console.log("doc nao existe");
				}
			});		
	});
}

function adicionaMeuJogoTela(proposta) {
	var items = [];
	
	nomejogo = "";
	db.collection("jogo").doc(proposta.idjogo).get().then(function (docJogo){
		db.collection("plataforma").doc(proposta.idplataforma).get().then(function (docPlataforma){
				console.log(docPlataforma.data());
				items.push('<div class="col s12 m7">'
				+ '<h2 class="header">Jogo perto</h2>'
				+ '<div class="card horizontal">'
				+ '<div class="card-image">'
	//			+ '	<img src="img/plataforma50/2_50.PNG"> '
//				+ '	<img src="'+ getImagemPlataforma(data.id)+ '">'
				+ '</div>'
				+ '<div class="card-stacked">'
				+ '	<div class="card-content">'
				+ '		<p>'
				+ '<h6>'+docJogo.data().nome+'</h6>'
				+ '<h5> '+docPlataforma.data().nome+'</h5>'
				
				+ '</p>'
				+ '	</div>'
				+ '	<div class="card-action">'
				+ '	</div>'
				+ '</div>'
				+ '</div>' + '</div>');
		$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meujogo');
	//		}).appendTo('body');
		});
	});
};

function adicionaPropostas(rcRef){
	items = [];
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
<<<<<<< HEAD
	console.log("-------",idjogocliente);
	db.collection('jogocliente').doc(idjogocliente).collection('interessados').get().then(function(propostalista){
=======
	jcRef..collection('interessados').get().then(function(propostalista){
>>>>>>> remotes/origin/pc
		propostalista.forEach(function(propostadoc) {

			db.collection('jogocliente').doc(propostadoc.data().idjogocliente)
				.get().then(function (docpropostajc){
			
					if(docpropostajc.dataexclusao == null){
						console.log("5555",docpropostajc.data());
					
						db.collection('jogo').doc(docpropostajc.data().idjogo).get().then(function(docjogo){
							//calcdistancia(docpropostajc.data().idcliente,idjogocliente);
//							'jogocliente/'+propostadoc.data().idjogocliente+'/interessados/'+docpropostajc.id
							
							items.push('<div class="col s12 m7">'
									+ '<h2 class="header">Jogo perto</h2>'
									+ '<div class="card horizontal">'
									+ '<div class="card-image">'
//			+ '	<img src="img/plataforma50/2_50.PNG"> '
//			+ '	<img src="'+ getImagemPlataforma(data.id)+ '">'
									+ '</div>'
									+ '<div class="card-stacked">'
									+ '	<div class="card-content">'
									+ '		<p>'
									+ '<h6>'+docjogo.data().nome+'</h6>'
//			+ '<h5> '+nomePlataforma(data.idPlataforma)+'</h5>'
									+ local.getItem('nomePlataforma')
									+ '</p>'
									+ '	</div>'
//									+'      <div id="chat_'+docjogo.data().idcliente+'" > </div>'
									+'<div><a style="float:right" class="btn btn-floating " onclick="abrechat()">'
									+'<i class="material-icons">chat</i></a></div>'
									+ '	</div>'
									+ '</div>'
									+ '</div></div>');
							$('<ul/>', {'class' : 'my-new-list',
								html : items.join('')
							}).appendTo('#propostas');
						});
					}
		});
		}); //busca o jogo
	});
}

function abrechat(){
	window.location="chat.html";
}
// collection("jogocliente").doc(id).collection(interessados).doc(id).collection(chat).doc()

function calcdistancia(idcliente,idjogocliente){
	db.collection("jogocliente").doc(idjogocliente).get().then(function(docidjogocliente){
//		db.collection("cliente").doc(docidjogocliente.data().idcliente).get().then(function(doc1){
		db.collection("cliente").doc("0KJGSC0qpAIBhJ0Zn4Yv").get().then(function(doc1){
//			db.collection("cliente").doc(idcliente).get().then(function(doc2){
			db.collection("cliente").doc("1NzkWbFfRJMKqZ6n3aLl").get().then(function(doc2){
				console.log("doc1",doc1.data().posicao);
				console.log("doc2",doc2.data().posicao);
				console.log(distancia(doc1.data().posicao,doc2.data().posicao));
			})
		})
	})
	
}