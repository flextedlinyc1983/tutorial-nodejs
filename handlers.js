var sys = require('sys')
var exec = require('child_process').exec;


var iniciar = function () {
	var content = "";

	console.log("Manipulador de petición 'iniciar' ha sido llamado.")

	// lists current server directory
	var child = exec("ls -lah", function (error, stdout, stderr) {
  		content = stdout;
	});

	return content;
}

var subir = function () {
	console.log("Manipulador de petición 'subir' ha sido llamado.")
	return "Hola Subir";
}

exports.iniciar = iniciar;
exports.subir = subir;