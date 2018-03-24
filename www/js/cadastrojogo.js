// $('form').submit(function(){
function salvaJogo(){
	var local = window.localStorage;
    var postData = $(this).serialize();
    nomePesquisa = $('#nome').val().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	nomeJogo = $('#nome').val();
	idPlataforma = $('#console').val();
	
	if(idPlataforma == null){
		Materialize.toast(Localization.for("escolherplataforma"), 4000);
		return false;
	}
	
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
	nomePesquisa = $('#nome').val().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	nomeJogo = $('#nome').val();
	idPlataforma = $('#console').val();
	
	idCliente = local.getItem('idCliente');
	
	$.post(getJSON()+"/jogo/add",{
			idPlataforma:idPlataforma,
			idCliente:idCliente,
			estado:idEstado,
			nomePesquisa:nomePesquisa,
			nomeJogo:nomeJogo,
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
			var opcao = '<option value='+plataforma[cont][0]+'>'+plataforma[cont][1]+'</option>';
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


$("#nome").on("input", function(e) {
	var val = $(this).val();
	nomeJogo = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
	

//	if(val === "") return;
	//You could use this to limit results
	if(val.length > 2){

		// db.child('jogo').orderByChild('nomepesquise').startAt(nomeJogo).limit(4)
		// 	.on('value',snap =>{
		// 		console.log("dsfg");
		// 	})
		$.ajax({
			type: "GET",
			url: getJSON()+"/jogo/nome",
			data: { nome:val},
			crossDomain: false,
			cache: false,
			dataType: "json",
			success: function(data){
				var dataList = $("#searchresults");
				dataList.empty();
				for(cont = 0 ; cont < data.length; ++cont){
					var opt = $("<option id="+data[cont].id+"></option>").attr("value", data[cont].nome);
					dataList.append(opt);
				}
				
			}
		});

		 
	}
	
}); 

