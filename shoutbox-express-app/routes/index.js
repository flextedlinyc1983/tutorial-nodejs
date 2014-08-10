exports.notFound = function (req, res) {
    res.status(404).format({
        html: function () {
            res.render("404");
        },
        json: function () {
            res.send({message: "Resource not found"})
        },
        xml: function () {
            res.write('<error>\n');
            res.write(' <message>Resource not found</message>\n');
            res.end('</error>\n');
        },
        text: function () {
            res.send("Resource not found.\n")
        }
    });
};

exports.error = function (err, req, res, next) {
    console.error(err.stack); // log error to stderr stream.
    var message;

    switch (err.type) {

        case 'database':
            message = 'Server Unavailable';
            res.statusCode = 503;
            break;

        default :
            message = 'Internal Server Error';
            res.statusCode = 500;
    }

    res.format({
        html: function () {
            res.render('5xx', {msg: message, status: res.statusCode});
        },

        json: function () {
            res.send({error: message});
        },

        text: function () {
            res.send(message + '\n');
        }
    });
};