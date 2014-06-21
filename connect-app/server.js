var connect = require('connect');

var logger = function (req, res, next) {
    console.log("%s %s", req.method, req.url);
    next();
};

var authenticateWithDatabase = function (user, pass, next) {
    if (user === 'tobi' && pass === 'ferret') next();
};

var restrict = function (req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    var parts = authorization.split(' ');
    var scheme = parts[0],
        auth = new Buffer(parts[1], 'base64').toString().split(':'),
        user = auth[0],
        pass = auth[1];

    authenticateWithDatabase(user, pass, function (err) {
        if (err) throw err;
        next();
    });
};

var hello = function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
};

var admin = function (req, res, next) {

    switch (req.url) {

        case '/':
            res.end('try /users');
            break;

        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;

    }
};

connect()
    .use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(3000);
