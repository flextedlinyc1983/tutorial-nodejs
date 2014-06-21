var connect = require('connect'),
    router = require('./middleware/router');

var routes = {
    GET: {
        '/users': function (req, res) {
            res.end('tobi, loki, ferret');
        },
        'user/:id': function (req, res, id) {
            res.end('user ' + id);
        }
    },
    DELETE: {
        '/user/:id': function (req, res, id) {
            res.end('deleted user ' + id);
        }
    }
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


var setup = function (format) {
    var regexp = /:(\w+)/g;

    return function logger(req, res, next) {
        var str = format.replace(regexp, function (match, property) {
            return req[property];
        });

        console.log(str);

        next();
    }
};

module.exports = setup;


connect()
    .use(setup(':method :url'))
    .use(router(routes))
    .listen(3000);
