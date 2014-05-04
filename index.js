var server = require("./server");
var router = require("./router");
var handlers = require("./handlers");

// Attaches a handler to each route.
var handle = {
	"/": handlers.iniciar,
	"/iniciar": handlers.iniciar,
	"/subir": handlers.subir
};

server.iniciar(router.route, handle);
