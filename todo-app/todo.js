var http = require('http'),
    qs = require('querystring'),
    formidable = require('formidable');

var items = [];


var server = http.createServer(function (req, res) {
    if ('/' === req.url) {
        switch (req.method.toLowerCase()) {
            case 'get':
                show(res);
                break;
            case 'post':
                upload(req, res);
                break;
            default :
                badRequest(res);
        }
    }
});

server.listen(3000);

function show(res) {
    var html = '<html><head><title>Todo List</title></head><body>'
        + '<h1>Todo List</h1>'
        + '<ul>'
        + items.map(function (item) {
            return '<li>' + item + '</li>'
        }).join('')
        + '</ul>'
        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="item" /></p>'
        + '<p><input type="file" name="file" /></p>'
        + '<p><input type="submit" value="Submit" /></p>'
        + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request: expecting multipart/form-data');
        return;
    }

    var form = new formidable.IncomingForm();

    form.on('progress', function (bytesReceived, bytesExpected) {
        var percent = Math.floor(bytesReceived / bytesExpected * 100);
        console.log(percent);
    });

    form.parse(req);
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 === type.indexOf('multipart/form-data');
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}


function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text-plain');
    res.end('Bad Request');
}

function add(req, res) {
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    })
}

