var route = function (handle, pathname, response, data) {
	console.log("About to route a request for " + pathname);
	
	if (typeof handle[pathname] !== 'function') {
    	console.log("No request handler found for " + pathname);
    	response.writeHead(404, {"Content-Type": "text/html"});
    	response.write("404 Not found");
    	response.end();
	} 
	else {
		handle[pathname](response, data);
	}
}

exports.route = route;