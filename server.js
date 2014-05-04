var http = require("http");
var url = require("url");

var iniciar = function(route, handle) {
	var onRequest = function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request to " + pathname + " received.");

		var content = route(handle, pathname);
		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(content);
		response.end();
	};

	http.createServer(onRequest).listen(8888);
	console.log("Server started");
};

exports.iniciar = iniciar