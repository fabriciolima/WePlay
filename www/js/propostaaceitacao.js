getMeuJogo();
adicionaListaPropostas();

function getMeuJogo(){
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	rcRef = db.collection("jogocliente").doc(idjogocliente).get().then(function(doc){
		if(doc.exists){
				adicionaMeuJogoTela(doc.data());
				//adicionaPropostas(rcRef);
			}else{
				console.log("doc nao existe");
			}
		});		

}

function adicionaMeuJogoTela(jogocliente) {
	var items = [];
	
	nomejogo = "";
	db.collection("jogo").doc(jogocliente.idjogo).get().then(function (docJogo){
		db.collection("plataforma").doc(jogocliente.idplataforma).get().then(function (docPlataforma){
				items.push('<div class="col s12 m7">'
					+ '<div class="card horizontal">'
					+ '<div class="card-image">'
					+ '	<img src="'+gerURLjogo90(docJogo.id)+'"> '
					+ '</div>'
					+ '<div class="card-stacked">'
					+ '	<div style="padding: 5px  15px  24px 5px;">'
					+ '		<h6 style="padding-left:  15px;">'+docPlataforma.data().nome+'</h6>'
					+ '		<h5 style="padding-left:  5px;"> '+docJogo.data().nome+'</h5>'
					+ '	</div>'
					+ '</div>'
					+ '</div></div>');
		$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meujogo');
	//		}).appendTo('body');
		});
	});
};

function adicionaListaPropostas(rcRef){
	items = [];
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	db.collection('jogocliente').doc(idjogocliente).collection('interessados').get().then(function(propostalista){
		propostalista.forEach(function(propostadoc) {
			if(propostadoc.data().dataexclusao == null)
				adicionaProposta(propostadoc.data().idcliente,propostadoc.data().idjogocliente)		
		});
	});
}


function adicionaProposta(idCliente,idjogocliente){
	
	db.collection('jogocliente').doc(idjogocliente).get().then(function (docjc){
		db.collection('jogo').doc(docjc.data().idjogo).get().then(function(docjogo){
			db.collection('plataforma').doc(docjc.data().idplataforma).get().then(function(docplataforma){
				distancia = calcdistancia(idCliente);
				//							'jogocliente/'+propostadoc.data().idjogocliente+'/interessados/'+docpropostajc.id
				
				items.push('<div class="col s12 m7">'
				+ '<div class="card horizontal">'
				+ '<div class="card-image">'
				+ '	<img src="'+gerURLjogo90(docjogo.id)+'"> '
				+ '</div>'
				+ '<div class="card-stacked">'
				+ '	<div style="padding: 5px  15px  24px 5px;">'
				+ '		<h6 style="padding-left:  15px;">'+docplataforma.data().nome+'</h6>'
				+ '		<h5 style="padding-left:  5px;"> '+docjogo.data().nome+'</h5>'
				+'<div><a style="float:right" class="btn btn-floating " onclick="abrechat(\''+idjogocliente+'\')">'
				+'<i class="material-icons">chat</i></a></div>'
				+'  <span class="badge">'+00 +'Km</span></div>'
				+ '	</div>'
				+ '	</div>'
				+ '</div>'
				+ '</div></div>');
			$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#propostas');
			});
		});
	});
}

function abrechat(jcProposta){
	var local = window.localStorage;
	local.setItem("jcInteresse",local.getItem('idjogocliente'));
	local.setItem("jcProposta",jcProposta);
	window.location="chat.html";
}
// collection("jogocliente").doc(id).collection(interessados).doc(id).collection(chat).doc()

function calcdistancia(idcliente,idjogocliente){
	// db.collection("jogocliente").doc(idjogocliente).get().then(function(docidjogocliente){
//		db.collection("cliente").doc(docidjogocliente.data().idcliente).get().then(function(doc1){
		// db.collection("cliente").doc(docidjogocliente.data().idcliente).get().then(function(doc1){
//			db.collection("cliente").doc(idcliente).get().then(function(doc2){
	//console.log("doc1",doc1.data().posicao);
				db.collection("cliente").doc(idcliente).get().then(function(doc2){
console.log(idcliente);
				console.log("doc2",doc2.data().localizacao);
				//  console.log(distancia(doc2.data().localizacao.latitude,doc2.data().localizacao.longitude));
			})
	// 	})
	// })
	
}