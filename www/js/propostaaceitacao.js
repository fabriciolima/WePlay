adicionaMeuJogoTelaPropostaAceitacao();
 adicionaListaPropostas();

function adicionaMeuJogoTelaPropostaAceitacao() {
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
			+ '	</div>'
			+ '</div>'
			+ '</div></div>');
			$('<ul/>', {'class' : 'my-new-list',
			html : items.join('')
		}).appendTo('#meujogo');
		
	}
});
};

function adicionaListaPropostas(){
	
	itemsProposta = [];
	var local = window.localStorage;
	idjogocliente = local.getItem('idjogocliente');
	$.ajax({
		type: "GET",
		url: getJSON()+"/listaproposta",
		data: { idinteresse:idjogocliente},
		crossDomain: false,
		cache: false,
		dataType: "json",
		success: function(data){
			for(cont = 0 ; cont < data.length; ++cont){
				// adicionaMeuJogoTelaInicial(data[cont])
				itemsProposta.push('<div class="col s12 m7">'
				+ '<div class="card horizontal">'
				+ '<div class="card-image">'
				+ '	<img src="'+gerURLjogo90(data[cont].idJogo)+'"> '
				+ '</div>'
				+ '<div class="card-stacked">'
				+ '	<div style="padding: 5px  15px  24px 5px;">'
				+ '		<h6 style="padding-left:  15px;">'+data[cont].nomePlataforma+'</h6>'
				+ '		<h5 style="padding-left:  5px;"> '+data[cont].nomeJogo+'</h5>'
				
				+'<div><a style="float:right" class="btn btn-floating " onclick="abrechat(\''+data[cont].idTroca+'\')">'
				+'<i class="material-icons">chat</i></a></div>'
				+'  <span class="badge">'+00 +'Km</span></div>'

				+ '	</div>'
				+ '	<div class="card-action">'
				+ '	</div>'
				+ '</div>'
				+ '</div></div>');
			}
			$('<ul/>', {'class' : 'my-new-list',html : itemsProposta.join('')}).appendTo('#propostas');
		}
		});
}


				// +'<div><a style="float:right" class="btn btn-floating " onclick="abrechat(\''+idjogocliente+'\')">'


function abrechat(idTroca){
	var local = window.localStorage;
	$.post(getJSON()+"/chat/add",{idTroca:idTroca},function(data){
			local.setItem("idChat",data);	
			window.location="chat.html";
			// else
		})
	
}
// collection("jogocliente").doc(id).collection(interessados).doc(id).collection(chat).doc()
