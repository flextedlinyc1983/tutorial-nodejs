var http = require("http");
var fs = require("fs");

var server = http.createServer();


var stream = fs.createReadStream('./resources.json');
stream.on('data', function (chunk) {
    console.log(chunk);
});
stream.on('end', function () {
    console.log('finished');
});

server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.createReadStream('./resources.json').pipe(res);
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');