
getMeusJogosTelaProposta();
adicionaJogoInteresse();

function getMeusJogosTelaProposta(){
	$("#meusjogos").empty();
	var local = window.localStorage;
	idCliente = local.getItem('idCliente');
	if(idCliente != null)
	idjogocliente = local.getItem('idjogocliente');
	$.ajax({
		type: "GET",
		url: getJSON()+"/meusjogos",
		data: {idcliente:idCliente,
			idinteresse:idjogocliente},
			crossDomain: false,
			cache: false,
			dataType: "json",
			success: function(data){
				for(cont = 0 ; cont < data.length; ++cont){
					montaMeuJogoTelaProposta(data[cont]);
				}
			}
		});
	}


function montaMeuJogoTelaProposta(jogocliente) {
	
	var checked = jogocliente.possuiPropostaCom!=null ? " checked ":" ";	
	var itemsMeu = [];
	itemsMeu.push('<div class="col s12 m7">'
	+ '<div class="card horizontal">'
	+ '<div class="card-image">'
	+ '	<img src="'+gerURLjogo90(jogocliente.idJogo)+'"> '
	+ '</div>'
	+ '<div class="card-stacked">'
	+ '	<div style="padding: 5px  15px  24px 5px;">'
	+ '		<h6 style="padding-left:  15px;">'+jogocliente.nomePlataforma+'</h6>'
	+ '		<h5 style="padding-left:  5px;"> '+jogocliente.nomeJogo+'</h5>'
	
	+ '	</div>'
	+'		    <input type="checkbox" name="'+jogocliente.id+'" id="'+jogocliente.id+'" '+checked+'/>'
	+' <label for="'+jogocliente.id+'">Proposta de troca</label>'
	
	
	// +' <div class="switch center-align"> <label>'
	// +'	<input type="checkbox" name="'+proposta.idjogo+'" id="'+proposta.idjogo+'" >'
	// +'<span class="lever"></span>'
	// // +' <label for="'+proposta.idjogo+'">Proposta de troca</label>'
	// +' </label> </div>'
	
	+ '</div>'
	+ '</div></div>');
	$('<ul/>', {'class' : 'my-new-list',html : itemsMeu.join('')}).appendTo('#meusjogos');
};
					


function adicionaJogoInteresse(){
	items = [];
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	$.ajax({
		type: "GET",
		url: getJSON()+"/jogocliente",
		data: { idjogocliente:idjogocliente},
		crossDomain: false,
		cache: false,
		dataType: "json",
		success: function(data){
			items.push('<div class="col s12 m7">'
			+ '<div class="card horizontal">'
			+ '<div class="card-image">'
			+ '	<img src="'+gerURLjogo90(data.idJogo)+'"> '
			+ '</div>'
			+ '<div class="card-stacked">'
			+ '	<div style="padding: 5px  15px  24px 5px;">'
			+ '		<h6 style="padding-left:  15px;">'+data.nomePlataforma+'</h6>'
			+ '		<h5 style="padding-left:  5px;"> '+data.nomeJogo+'</h5>'
			+ '	</div>'
			+ '	<div class="card-action">'
			+'  <span class="badge">'+local.getItem('distancia')+'Km</span></div>'
			+ '	</div>'
			+ '</div>'
			+ '</div></div>');
			$('<ul/>', {'class' : 'my-new-list',
			html : items.join('')
		}).appendTo('#jogointeresse');
		
	}
});
}

// $('form').submit(function(){
function fazProposta(){
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	
	sList ="";
	listaJogo = [];
	idCliente = local.getItem('idCliente');
	if(idCliente == null || idCliente =="null")
		window.location="login.html"
	$('input[type=checkbox]').each(function () {
	// SpinnerDialog.show();
		meuId = this.id;
		sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
		if(this.checked){
			var dados = {funcao:"adiciona",
			idinteresse:idjogocliente,
			idproposta:meuId};

			salvaPropostaJson(dados);
		}else{
			var dados = {funcao:"remove",
			idinteresse:idjogocliente,
			idproposta:meuId};

			salvaPropostaJson(dados);
		};
		// SpinnerDialog.hide();
	})
		
	window.location = "index.html";
	// Materialize.toast(Localization.for("jogocadastrado"), 4000);
    // return false;
}


function salvaPropostaJson(dados){
		$.post(getJSON()+"/fazproposta",dados,
			function(data, status){
					if(status=='erro'){
						Materialize.toast("OK", 4000);
					};
	});
}
	