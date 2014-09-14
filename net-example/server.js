var net = require('net');

net.createServer(function (socket) {

    console.log('socket connected!');

    socket.on('data', function (data) {
        console.log('"data" event', data);
    });

    socket.on('end', function () {
        console.log('"end" event');
    });

    socket.on('close', function () {
        console.log('"close" event');
    });

    socket.on('close', function () {
        console.log('"close" event');
    });

    socket.on('error', function () {
        console.log('"error" event');
    });

    socket.pipe(socket);

}).listen(1337);

