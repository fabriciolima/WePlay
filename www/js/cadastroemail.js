$('form').submit(function(){
//function salvaCliente(){
	nome= $('#nome').val();
	email =$('#email').val();
	password =$('#password').val();

	console.log($('#nome').val());
	console.log($('#email').val());
	Materialize.toast(Localization.for("emailcadastrado"), 10000);
	window.location="index.html";
	return false;		
	
	$.get(getJSON()+"/cliente/addemail",{
			nome:$('#nome').val(),
			email:$('#email').val(),
			password:$('#password').val()},function(data, status){
				Materialize.toast(Localization.for("cadastrando"), 10000);
				if(data.length >2){
					Materialize.toast(Localization.for("emailcadastrado"), 10000);
					window.location="index.html";
				}
				
			}),function (erro){
				Materialize.toast(Localization.for("erro"), 10000);
			}
	
});
