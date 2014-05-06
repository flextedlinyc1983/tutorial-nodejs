var http = require("http");
var url = require("url");

var iniciar = function(route, handle) {
	var onRequest = function(request, response) {
		var data = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		request.addListener("data", function(chunk) {
			data += chunk;
          	console.log("Recibido trozo POST '" + chunk + "'.");		
       	});

       	request.addListener("end", function() {
      		route(handle, pathname, response, data);
    	});
	};

	http.createServer(onRequest).listen(8888);
	console.log("Server started");
};

exports.iniciar = iniciar