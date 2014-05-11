var socketio = require("socket.io");
var io;
var guessNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
