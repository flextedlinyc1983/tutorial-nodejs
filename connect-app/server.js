var connect = require('connect');

var logger = function (req, res, next) {
    console.log("%s %s", req.method, req.url);
    next();
};

var hello = function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
};


connect()
    .use(logger)
    .use(hello)
    .listen(3000);
