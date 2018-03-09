$('form').submit(function(){


	var local = window.localStorage;
    var postData = $(this).serialize();
    idCliente = 1;//local.getItem('idCliente');
    nomeJogoNormal = $('#nome').val().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    nomeJogo = $('#nome').val();
    
    idJogo=0;
    //verifica se ja tem o jogo cadastrado
	db.doc("jogo2/"+nomeJogoNormal).get().then(function(doc){idJogo=doc.id})
    .catch(function(erro){
    	db.collection("jogo2").doc(nomeJogoNormal).set({nome: nomeJogo})
    	.then(function(doc){idJogo=doc.id});
    });
	
	console.log(idCliente);
    console.log($('#console').val());
    console.log($('#estado').val());
    console.log(idJogo + ','+nomeJogo);
    console.log($('#comentario').val()?$('#comentario').val():"");
    console.log($('#dinheiro').val()?$('#dinheiro').val():"");
    
    db.collection("jogocliente").add({
    	idcliente:idCliente,
		console:$('#console').val(),
		estado:$('#estado').val(),
		idjogo:idJogo,
		comentario:$('#comentario').val(),
		dinheiro:$('#dinheiro').val()}
    ).then(function(){
    	Materialize.toast('Jogo Salvo', 4000);
    	$.post(getJSON+"/add/jogo",{
        	idcliente:idCliente,
    		console:$('#console').val(),
    		estado:$('#estado').val(),
    		idjogo:idJogo,
    		comentario:$('#comentario').val(),
    		dinheiro:$('#dinheiro').val()
    		},function(data, status){
    			Materialize.toast("erro json: " + data + "\nStatus: " + status);
			    });
    	voltar();	
    }).catch(function(erro){Materialize.toast('Erro salvando', 4000);});

    return false;
});


    
		
		
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

		
//-------------------------------------------------------------------------------------------		
		
		db.collection("plataforma")//.where("nome","==",nomeJogo)
		.get().then(function (lista){
			lista.forEach(function(doc) {
				var opcao = '<option value='+doc.id+'>'+doc.data().nome+'</option>';
				$('#console').append(opcao);
				$('#console').material_select();
	        });

		});


	});
	
	$('#console').material_select();
//-------------------------------------------------------------------------------------------
}

function mostrandoCadastro(){
	 atualizaCadastro();
	 $('#estado').material_select();
	 
	//document.addEventListener("deviceready",lerDBGPS,false);
	
	
}


$("#nome").on("input", function(e) {
	var val = $(this).val();
	console.log(0);
	nomeJogo = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
//	if(val === "") return;
	//You could use this to limit results
	//if(val.length < 3) return;

	console.log(val);
	db.collection("jogo").where("nome",">=",nomeJogo).limit(3).get().then(function (lista){
		console.log(1);
		
	     var dataList = $("#searchresults");
		dataList.empty();
		lista.forEach(function(doc){
		console.log(doc);
		var opt = $("<option></option>").attr("value", doc.data().nome);
		dataList.append(opt);
	});
	})
	
}); 

