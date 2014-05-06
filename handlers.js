var exec = require('child_process').exec;


var iniciar = function (response) {
	console.log("Manipulador de petición 'iniciar' ha sido llamado.")

	// lists current server directory
	exec("find /", 
		{ timeout: 10000, maxBuffer: 20000*1024 },
		function (error, stdout, stderr) {
    		response.writeHead(200, {"Content-Type": "text/html"});
    		response.write(stdout);
    		response.end();
		});
}

var subir = function (response) {
	console.log("Manipulador de petición 'subir' fue llamado.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Hola Subir");
	response.end();
}

exports.iniciar = iniciar;
exports.subir = subir;