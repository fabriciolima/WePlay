getMeusJogos();
adicionaJogoInteresse();

function getMeusJogos(){
	var local = window.localStorage;
	idCliente = local.getItem('idCliente');
	db.collection("jogocliente")
		.where("idcliente","==",idCliente)
		// .where("dataexclusao","==",true)
		.get().then(function(lista){
			lista.forEach(function(doc) {
				if(doc.exists){
					if(doc.data().dataexclusao == null)
					adicionaMeuJogoTelaProposta(doc);
				}else{
					console.log("doc nao existe");
				}
			});
		});		


}


function adicionaMeuJogoTelaProposta(jogocliente) {
	proposta = jogocliente.data();
	var items = [];
	var local = window.localStorage;
	idCliente = local.getItem("idCliente");
	idjogocliente = local.getItem('idjogocliente');
	
	nomejogo = "";
	console.log("===",proposta);
	db.collection("jogo").doc(proposta.idjogo).get().then(function (docJogo){
		db.collection("plataforma").doc(proposta.idplataforma).get().then(function (docPlataforma){
			
			var checked = "";
			//verificar se tem jogo cadastrado para troca
			db.collection("jogocliente").doc(idjogocliente).collection("interessados")
			.where("idcliente","==",idCliente)
			.where("idjogocliente","==",jogocliente.id)
			// .where("dataexclusao","==",false)
				.get().then(function(lista){
					lista.forEach(function(docProposta) {
						if(docProposta.data().dataexclusao == null)
						checked = " checked ";						
					});
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
						+'		    <input type="checkbox" name="'+jogocliente.id+'" id="'+jogocliente.id+'" '+checked+'/>'
						+' <label for="'+jogocliente.id+'">Proposta de troca</label>'
						
						
						// +' <div class="switch center-align"> <label>'
						// +'	<input type="checkbox" name="'+proposta.idjogo+'" id="'+proposta.idjogo+'" >'
						// +'<span class="lever"></span>'
						// // +' <label for="'+proposta.idjogo+'">Proposta de troca</label>'
						// +' </label> </div>'
						
						
						+ '</div>'
						+ '</div>' + '</div>');
						$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meusjogos');
					});
					});
				});
		};


function adicionaJogoInteresse(){
	items = [];
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	db.doc('jogocliente/'+idjogocliente).get().then(function(docjc){//busca jc
		console.log(idjogocliente);
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
	
	sList ="";
	listaJogo = [];
	idCliente = local.getItem('idCliente');
	console.log("idcliente",idCliente);
	if(idCliente == null || idCliente =="null")
		window.location="login.html"
	$('input[type=checkbox]').each(function () {
		sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
		if(this.checked){
			console.log("+",this.id);
			db.collection("jogocliente").doc(idjogocliente).collection("interessados")
				.doc(this.id+'-'+idjogocliente).set({
					idcliente:idCliente,
					idjogocliente:this.id,
					datacadastro:new Date(),
					dataexclusao:null
				});
			}else{
				console.log("-",this.id);
			db.collection("jogocliente").doc(idjogocliente).collection("interessados")
				.doc(this.id+'-'+idjogocliente).set({
					idjogocliente:this.id,
					idcliente:idCliente,
					dataexclusao:new Date()
				});
				}
	});
	
	window.location = "index.html";
	Materialize.toast(Localization.for("jogocadastrado"), 4000);
    return false;
};

