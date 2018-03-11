console.log(" sadfsadfsd");
var items = [];
var local = window.localStorage;
document.addEventListener('deviceready', function(){
	db.collection("plataforma").get().then(function (listaPlataforma){
			listaPlataforma.forEach(function(docPlataforma) {
				checked =  local.getItem("plataforma"+docPlataforma.id);
				console.log("+",checked);
				items.push('<div class="col s12 m7">'
						+ '<div class="card horizontal">'
						+ '<div class="card-image">'
						+ '	<img style="max-height: 60px;width: 125px;" src="'+gerURLplataforma90(docPlataforma.id)+'"> '
						+ '</div>'
						+ '<div class="card-stacked">'
						+ '	<div style="padding: 5px  15px  24px 5px;">'
						+ '		<h6 style="padding-left:  15px;">'+docPlataforma.data().nome+'</h6>'
						+ '	</div> </div>'
						+'<div class="switch valign-wrapper"><label ><input type="checkbox" onclick=\'salvaPlataforma(this);\'name="'+docPlataforma.id+'" id="'+docPlataforma.id+'" '+checked+'/>'
						+'   <span class="lever"></span></label> </div>'
						+ '</div>'
						+ '</div>');
				});
				$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#plataformas');
		});
	});
	

function salvaPlataforma(checkbox){
	console.log(checkbox);
	local.setItem("plataforma"+checkbox.id,  (checkbox.checked ? "checked" : ""));
}
function salvaCliente(){
	local.setItem("idCliente",null);
	window.location="index.html";
	
};

