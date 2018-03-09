getMeusJogos();
//adicionaJogoInteressado();

function getMeusJogos(){
	document.addEventListener('deviceready', function(){
		db.collection("jogocliente").where("idcliente","==","5")
		.get().then(function(lista){
			console.log("lista",lista.size);
			lista.forEach(function(doc) {
				if(doc.exists){
					adicionaMeuJogoTelaInicial(doc.data());
				}else{
					console.log("doc nao existe");
				}
			});
		});		
	});
}


function adicionaMeuJogoTelaInicial(proposta) {
	var items = [];
	
	nomejogo = "";
	db.collection("jogo").doc(proposta.idjogo).get().then(function (docJogo){
		db.collection("plataforma").doc(proposta.idplataforma).get().then(function (docPlataforma){
				console.log(docPlataforma.data());
				items.push('<div class="col s12 m7">'
				+ '<h2 class="header">Jogo perto</h2>'
				+ '<div class="card horizontal">'
				+ '<div class="card-image">'
				+ '	<img src="'+gerURLjogo90(docJogo.data().idJogo)+'"> '
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
				+'		  <p>'
				+'		    <input type="checkbox" name="'+proposta.idjogo+'" id="'+proposta.idjogo+'" />'
			    +' <label for="'+proposta.idjogo+'">Proposta de troca</label>'
				+'	  </p>'
				+ '	</div>'
				+ '</div>'
				+ '</div>' + '</div>');
		$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meusjogos');
	//		}).appendTo('body');
		});
	});
};
adicionaJogoInteresse();
$('form').submit(function(){
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	console.log("idjogocliente",idjogocliente);
	sList ="";
	$('input[type=checkbox]').each(function () {
	    sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
	    console.log(this.id+'-'+"(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")"); // do your staff with each checkbox
	});
	
	console.log("------------------");
	var local = window.localStorage;
    var postData = $(this).serialize();
    console.log(postData);
    return false;
});
function adicionaJogoInteresse(){
	items = [];
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	db.doc('jogocliente/'+idjogocliente).get().then(function(docjc){//busca jc
		db.doc('jogo/'+docjc.data().idjogo).get().then(function (docjogo){
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
					+ '	<div class="card-action">'
					+'  <span class="badge">'+local.getItem('distancia')+'</span></div>'
					+ '	</div>'
					+ '</div>'
					+ '</div></div>');
			$('<ul/>', {'class' : 'my-new-list',
				html : items.join('')
			}).appendTo('#jogointeresse');
			
		}); //busca o jogo
	});
}
