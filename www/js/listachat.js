getListaChat();

function getListaChat(){
	$("#meusjogos").empty();
	var local = window.localStorage;
	idCliente = local.getItem('idCliente');
	if(idCliente != null)
	$.ajax({
		type: "GET",
		url: getJSON()+"/chat/lista",
		data: {idCliente:idCliente},
			crossDomain: false,
			cache: false,
			dataType: "json",
			success: function(data){
				for(cont = 0 ; cont < data.length; ++cont){
					// adicionaMeuJogoTelaInicial(data[cont])
					console.log(data[cont]);
					adicionaChat(data[cont]);
				}
			}
		});
	}

function abreChat(id){
	var local = window.localStorage;
	idChat = local.setItem("idChat",id);
	window.location = "chat.html";

}

function adicionaChat(chat) {
	
	var itemsMeu = [];
	itemsMeu.push('<li onclick="abreChat(this.id)" id="'+chat.id+'">'
	
	+'<div class="col s12 m7">'
	+ '<div class="card horizontal">'

	// + '<div id="interesse"'
	+ '<div class="card-image" style="max-width: 50%;">'
	+ '	   <div >'
	+ '		  <h6 style="padding-left:  15px;">'+chat.interesseNomePlataforma+'</h6>'
	+ '		  <h5 style="padding-left:  5px;"> '+chat.interesseNomeJogo+'</h5>'
	+ '	   </div>'
	+ '	<img src="'+gerURLjogo90(chat.interesseIdJogo)+'"> '
	+ '</div>'

	+'<div class="valign-wrapper"><i class="material-icons ">swap_horiz</i></div>'
	
	+ '<div class="card-image right-align" style="max-width: 50%;">'
			+'<div>'
			+ '		  <h6 style="padding-left:  15px;">'+chat.propostaNomePlataforma+'</h6>'
			+ '		  <h5 style="padding-left:  5px;"> '+chat.propostaNomeJogo+'</h5>'
			+'</div>'
			+ '	<div > <img src="'+gerURLjogo90(chat.propostaIdJogo)+'"> </div>'
	+ '</div>'

	+ '</div></div>'
	+'</li>');
	$('<ul/>', {'class' : 'my-new-list',html : itemsMeu.join('')}).appendTo('#listachat');
};
					


