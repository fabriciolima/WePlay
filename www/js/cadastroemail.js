$('form').submit(function(){
//function salvaCliente(){
	nome= $('#nome').val();
	email =$('#email').val();
	password =$('#password').val();
	esqueci =$('#esqueci').is(':checked');//?'S':'N';
	
	
	$.get(getJSON()+"/cliente/addemail",{
		nome:$('#nome').val(),
		email:$('#email').val(),
		password:$('#password').val(),
		esqueci:esqueci},function(data, status){
			
			if(data > 0){
				local.setItem("idCliente",data);
				
				local.getItem("msg",Localization.for("emailcadastrado"))
				return false;
				window.location="index.html";
			}else{
				Materialize.toast(Localization.for("emailjacadastrado"), 5000);	
				
			}
			
		}),function (erro){
			Materialize.toast(Localization.for("erro"), 10000);
		}
		
		return false;
	});
	
	
	// function checkEsqueci(){
	// 	if($('#esqueci').is(':checked')){
	// 		$('#password').val('123456');
	// 		//$('#password').hide();
	// 		$('#checkboxRow').hide();
	// }else{
	// 	$('#password').val('');
	// 	//$('#password').show();
	// 	$('#checkboxRow').show();
	// }

}