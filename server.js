var http = require("http");
var url = require("url");

var iniciar = function(route) {
	var onRequest = function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request to " + pathname + " received.");

		route(pathname);
		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<h1>Hello World</h1>");
		response.end();
	};

	http.createServer(onRequest).listen(8888);
	console.log("Server started");
};

exports.iniciar = iniciar