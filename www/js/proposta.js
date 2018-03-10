getMeusJogos();
adicionaJogoInteresse();

function getMeusJogos(){
	document.addEventListener('deviceready', function(){
		db.collection("jogocliente").where("idcliente","==","5")
		.get().then(function(lista){
			console.log("lista",lista.size);
			lista.forEach(function(doc) {
				if(doc.exists){
					adicionaMeuJogoTelaProposta(doc.data());
				}else{
					console.log("doc nao existe");
				}
			});
		});		
	});
}


function adicionaMeuJogoTelaProposta(proposta) {
	var items = [];
	
	nomejogo = "";
	db.collection("jogo").doc(proposta.idjogo).get().then(function (docJogo){
		db.collection("plataforma").doc(proposta.idplataforma).get().then(function (docPlataforma){
				items.push('<div class="col s12 m7">'
				+ '<div class="card horizontal">'
				+ '<div class="card-image">'
				+ '	<img src="'+gerURLjogo90(proposta.idjogo)+'"> '
				+ '</div>'
				+ '<div class="card-stacked">'
				+ '	<div style="padding: 5px  15px  24px 5px;">'
			+ '		<h6 style="padding-left:  15px;">'+docPlataforma.data().nome+'</h6>'
 			+ '		<h5 style="padding-left:  5px;"> '+docJogo.data().nome+'</h5>'
				+ '	</div>'
				+'		    <input type="checkbox" name="'+proposta.idjogo+'" id="'+proposta.idjogo+'" />'
				+' <label for="'+proposta.idjogo+'">Proposta de troca</label>'
				

				// +' <div class="switch center-align"> <label>'
				// +'	<input type="checkbox" name="'+proposta.idjogo+'" id="'+proposta.idjogo+'" >'
				// +'<span class="lever"></span>'
				// // +' <label for="'+proposta.idjogo+'">Proposta de troca</label>'
				// +' </label> </div>'


				+ '</div>'
				+ '</div>' + '</div>');
		$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meusjogos');
	//		}).appendTo('body');
		});
	});
};


function adicionaJogoInteresse(){
	items = [];
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	db.doc('jogocliente/'+idjogocliente).get().then(function(docjc){//busca jc
		db.doc('jogo/'+docjc.data().idjogo).get().then(function (docjogo){
			items.push('<div class="col s12 m7">'
					+ '<div class="card horizontal">'
					+ '<div class="card-image">'
					+ '	<img src="'+gerURLjogo90(docjogo.id)+'"> '
					+ '</div>'
					+ '<div class="card-stacked">'
					+ '	<div style="padding: 5px  15px  24px 5px;">'
					+ '		<h6 style="padding-left:  15px;">'+local.getItem('nomeplataforma')+'</h6>'
					+ '		<h5 style="padding-left:  5px;"> '+docjogo.data().nome+'</h5>'
					+ '	</div>'
					+ '	<div class="card-action">'
					+'  <span class="badge">'+local.getItem('distancia')+'Km</span></div>'
					+ '	</div>'
					+ '</div>'
					+ '</div></div>');
			$('<ul/>', {'class' : 'my-new-list',
				html : items.join('')
			}).appendTo('#jogointeresse');
			
		}); //busca o jogo
	});
}

// $('form').submit(function(){
function fazProposta(){
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	console.log("idjogocliente",idjogocliente);
	sList ="";
	listaJogo = [];
	idCliente = local.getItem('idCliente');
	$('input[type=checkbox]').each(function () {
		sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
		if(this.checked){
			console.log("+",this.id);
			db.collection("jogocliente").doc(idjogocliente).collection("interessados").add({
				idcliente:idCliente,
				idjogocliente:this.id,
				datacadastro:new Date(),
				dataexclusao:null
			});
		}else{
			console.log("-",this.id);
			db.collection("jogocliente").doc(idjogocliente).collection("interessados").add({
				idcliente:idCliente,
				idjogocliente:this.id,
				dataexclusao:new Date()
			});
		}
	});
	
	Materialize.toast(Localization.for("jogocadastrado"), 4000);
	
    return false;
};

