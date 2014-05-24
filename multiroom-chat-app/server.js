var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var PORT = 3000;

var send404 = function (response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
};

var sendFile = function (response, filePath, fileContents) {
    response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))})
    response.end(fileContents);
};

var serveStatic = function (response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function (exists) {
            console.log(absPath);
            if (!exists) {
                send404(response);
            } else {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            }
        });
    }
};

// Set up HTTP server.
var server = http.createServer(function (request, response) {
    var filePath = (request.url === '/') ? 'public/index.html' : 'public' + request.url;
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});
server.listen(PORT, function () {
    console.log('Server listening on port ' + PORT);
});

// Set up Socket.IO server.
var chatServer = require('./lib/chat_server');
chatServer.listen(server);