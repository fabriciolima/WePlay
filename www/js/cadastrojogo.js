// $('form').submit(function(){
var idJogo = 0;
var nomeJogoSelecionado="";

function salvaJogo(){
	var local = window.localStorage;
    // var postData = $(this).serialize();
    //nomePesquisa = $('#nome').val().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	var idPlataforma = $('#console').children(":selected").attr("id");
	
	if(idPlataforma == null){
		Materialize.toast(Localization.for("escolherplataforma"), 4000);
		return false;
	}
	
	nomeJogo = $('#nome').val();
	if(nomeJogo.length < 3){
		Materialize.toast(Localization.for("escolherjogo"), 4000);
		return false;
	}
	
	var idEstado = 0;
	
	estadoradio = document.getElementsByName('estado');
	for (var cont = 0, length = estadoradio.length; cont < length; cont++){
		if (estadoradio[cont].checked) {
			idEstado = estadoradio[cont].id;
			break;
		}
	}
	
	//verificando se tem um jogocliente salvo
	//nomePesquisa = $('#nome').val().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	
	// idJogo=0;
	// try {
	// 	if(nomeJogo != $('#nome').val())
	// 		idJogo = 0;
	// 	//idJogo= document.querySelector("#searchresults option[value=\""+nomeJogo+"\"]").dataset.value;
	// }catch(err) {
	// 	idJogo=0;
	// }
	
	idCliente = local.getItem('idCliente');
	
	$.get(getJSON()+"/jogo/add",{
			idPlataforma:idPlataforma,
			idCliente:idCliente,
			estado:idEstado,
			// idJogo:idJogo,
			nomeJogo:nomeJogo,
			nomeJogoSelecionado: nomeJogoSelecionado,
			dinheiro:$('#dinheiro').val()},function(data, status){
				if(data.length >2){
					Materialize.toast(Localization.for("jogocadastrado"), 4000);
					window.location="index.html";
				}
				// else
			})
		
	return false;
}
// });


    
		
		
//		var jogo = 	db.collection("jogo");
//		jogo.orderBy("nome").limit(3);
//		jogo.where("nome",">=",nomeJogo).get().then({ includeQueryMetadataChanges: true }, function(snapshot) {
//			console.log(snapshot)
//		snapshot.docChanges.forEach(function(change) {
//			console.log('change',change);
//			console.log(change.doc.data());
////			adicionaJogoTelaInicial(change.doc.data());
//			if (change.type === "added") {console.log("New city: ", change.doc.data());}
//			
//			var source = snapshot.metadata.fromCache ? "local cache" : "server";           
//			console.log("Data came from " + source);       });   
//		});;

	


function atualizaCadastro()
{
	document.addEventListener('deviceready', function(){

		for(cont = 0 ; cont < plataforma.length; ++cont){
			var opcao = '<option id	='+plataforma[cont][0]+'>'+plataforma[cont][1]+'</option>';
			$('#console').append(opcao);
		}
		$('#console').material_select();

	});
	
	$('#console').material_select();
//-------------------------------------------------------------------------------------------
}

function atualizaEstado(){
	$('#estado').material_select();
}
function mostrandoCadastro(){
	 atualizaCadastro();
	 $('#estado').material_select();
	 
	//document.addEventListener("deviceready",lerDBGPS,false);
}


// $("#nome").on("input", function(e) {
// 	var val = $(this).val();
// 	nomeJogo = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	
// 	if(val.length > 2){

// 		$.ajax({
// 			type: "GET",
// 			url: getJSON()+"/jogo/nome",
// 			data: { nome:val},
// 			crossDomain: false,
// 			cache: false,
// 			dataType: "json",
// 			success: function(data){
// 				var dataList = $("#searchresults");
// 				dataList.empty();
// 				for(cont = 0 ; cont < data.length; ++cont){
// 					var opt = $("<option data-value="+data[cont].id+"></option>").attr("value", data[cont].nome);
// 					dataList.append(opt);
// 				}
				
// 			}
// 		});

		 
// 	}
	
// }); 


// $(document).ready(function(){
// 	$('input.autocomplete').autocomplete({
// 		data: {
// 		"Apple": null,
// 		"Microsoft": null,
// 		"Google": 'https://placehold.it/250x250'
// 		},
// 		limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
// 		onAutocomplete: function(val) {
// 			console.log(val);
// 		},
// 		minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
// 	});
// });



$("#nome").on("input", function(e) {
	var val = $(this).val();
	nomeJogo = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	
	if(val.length > 2){
		
		$.ajax({
			type: "GET",
			url: getJSON()+"/jogo/nome",
			data: { nome:val},
			crossDomain: false,
			cache: false,
			dataType: "json",
			success: function(data){
				console.log(data);
				var dataComplete = {};
				for (var i = 0; i < data.length; i++) {
				  dataComplete[data[i].nome] = data[i].img;
				}

				$(document).ready(function(){
					$('input.autocomplete').autocomplete({
						data: dataComplete,
						limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
						onAutocomplete: function(val) {
							nomeJogoSelecionado=val;
						},
						minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
					});
				});
			}
		});
	}	
}); 