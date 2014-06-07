var http = require('http');
var url = require('url');

var items = [];

var getIndex = function ($url) {
    var pathname = url.parse($url).pathname;
    return parseInt(pathname.slice(1));
};

var server = http.createServer(function (req, res) {
    var i, item;
    switch (req.method) {
        case 'POST':
            item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function () {
                items.push(item);
                res.end('OK\n');
            });
            break;

        case 'GET':
            var body = items.map(function (item, i) {
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;

        case 'DELETE':
            i = getIndex(req.url);

            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id\n');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found\n');
            } else {
                items.splice(i, 1);
                res.end('OK!\n');
            }
            break;

        case 'PUT':
            i = getIndex(req.url);

            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id\n');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found\n');
            } else {
                req.setEncoding('utf8');
                req.on('data', function (chunk) {
                    if (chunk) item += chunk;
                });
                req.on('end', function () {
                    items[i] = item;
                    res.end('OK!\n');
                });
            }
            break;
    }
});

server.listen(3000);