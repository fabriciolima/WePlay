var plataforma = new Array(
	["1","Outros"],
	["2","Playstation 1"],
	["3","Playstation 2"],
	["4","Playstation 3"],
	["5","Playstation 4"],
	["6","PSP"],
	["7","Xbox One"],
	["8","Xbox 360"],
	["9","Xbox"],
	["10","Wii U"],
	["11","Wii"],
	["12","Nintendo DS"],
	["13","Game Boy"],
	["14","Nintendo Switch"],
	["15","PS Vita"]
);
var items = [];
var local = window.localStorage;
document.addEventListener('deviceready', function(){
	console.log(plataforma);
	for(cont = 0 ; cont < plataforma.length; ++cont){
		checked =  local.getItem("plataforma"+plataforma[cont][0]);
		console.log("+",checked);
		items.push('<div class="col s12 m7">'
		+ '<div class="card horizontal">'
		+ '<div class="card-image">'
		+ '	<img style="max-height: 60px;width: 125px;" src="'+gerURLplataforma90(plataforma[cont][0])+'"> '
		+ '</div>'
		+ '<div class="card-stacked">'
		+ '	<div style="padding: 5px  15px  24px 5px;">'
		+ '		<h6 style="padding-left:  15px;">'+plataforma[cont][1]+'</h6>'
		+ '	</div> </div>'
		+'<div class="switch valign-wrapper"><label ><input type="checkbox" onclick=\'salvaPlataforma(this);\'name="'+plataforma[cont][0]+'" id="'+plataforma[cont][0]+'" '+checked+'/>'
		+'   <span class="lever"></span></label> </div>'
		+ '</div>'
		+ '</div>');
	}
	$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#plataformas');
});


function salvaPlataforma(checkbox){
	console.log(checkbox);
		local.setItem("plataforma"+checkbox.id,  (checkbox.checked ? "checked" : ""));
}
function salvaCliente(){
	local.setItem("idCliente",null);
	window.location="index.html";
	idCliente = local.getItem("idCliente");
	$.post(getJSON()+'/cliente/d',{i:idCliente},
		 function(result){
			$("#meusjogos").empty();		 
			Materialize.toast("OK", 4000);
			getMeusJogosTelaInicial();
		});
	}
	
