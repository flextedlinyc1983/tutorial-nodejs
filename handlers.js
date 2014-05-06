var querystring = require("querystring");


var iniciar = function (response, data) {
	console.log("Manipulador de petición 'iniciar' ha sido llamado.")


	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/subir" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

var subir = function (response, data) {
  	console.log("Manipulador de Peticion 'subir' fue llamado.");
  	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Tu enviaste el texto: : " + querystring.parse(data)["text"]);
  	response.end();
}

exports.iniciar = iniciar;
exports.subir = subir;