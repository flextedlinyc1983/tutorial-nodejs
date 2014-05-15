var socketio = require("socket.io");
var io;
var guessNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};


exports.listen = function (server) {
    io = socketio.listen(server); //Starts Socket.IO server.
    io.set('log level', 1);

    // Defines how each user connection will be handled.
    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');  // Places user in Lobby room when they connect.

        handleMessageBroadcast(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        // Provides user with list of occupied rooms on request
        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        // Defines cleanup logic for when user disconnects.
        handleClientDisconnection(socket, nickNames, namesUsed);
    });
};

var assignGuestName = function (socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('namesResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
};

var handleNameChangeAttempts = function (socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function (name) {
        if (name.indexOf('Guest') === 0) { // Don't allow nicknames to beg in with Guest
            socket.emit('nameResult', {
                success: false,
                message: 'Names cannot begin with "Guest".'
            });
        } else if (namesUsed.indexOf(name) === -1) { // Check new name is already registered.
            var previousName = nickNames[socket.id];
            var previousNameIndex = namesUsed.indexOf(previousName);
            namesUsed.push(name);
            nickNames[socket.id] = name;
            delete namesUsed[previousNameIndex]; // Removes previous name to make it available to other clients

            socket.emit('namesResult', {
                success: true,
                name: name
            });
            socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                text: previousName + ' is now knows as ' + name + '.'
            });
        } else { // Send error to client if name is already registered
            socket.emit('namesResult', {
                success: false,
                message: 'That name is already in user.'
            });
        }
    });
};

var joinRoom = function (socket, room) {
    socket.join(room);  // USer joins room.
    currentRoom[socket.id] = room; // User is now in this room.
    socket.emit('joinResult', {room: room}); //User knows they are in the room now.
    socket.broadcast.to(room).emit('message', {  // Let other users in room know that user has joined
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });

    var usersInRoom = io.sockets.client(room);
    // Summarizes who are in the room right now, if other users exist
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        for (var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) usersInRoomSummary += ', ';
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        //Sends summary of other users in the room to the user.
        socket.emit('message', {text: usersInRoomSummary});
    }
};


var handleMessageBroadcasting = function (socket) {
    socket.on('message', function (message) {
        socket.broadcast(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        })
    });
};