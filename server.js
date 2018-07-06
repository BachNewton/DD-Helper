// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var players = require('./js/player.js');
var tokens = require('./js/token.js');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

// WebSocket handlers
io.on('connection', function (socket) {
    socket.on('new player', function () {
        // A new player has connected
        console.log('A new player has connected! ID: ' + socket.id);
        players.newPlayer(socket.id);
    });

    socket.on('disconnect', function () {
        console.log('A player has disconnected! ID: ' + socket.id);
        players.remove(socket.id);
    });

    socket.on('chat message', function (data) {
        console.log('Received a chat message: ' + data.playerName + ' - ' + data.message);
        io.sockets.emit('chat message', data);
    });

    socket.on('mouse movement', function (mousePosition) {
        players.mouseUpdate(socket.id, mousePosition);
    });

    socket.on('mouse down', function () {
        players.mouseDown(socket.id);
    });

    socket.on('mouse up', function () {
        players.mouseUp(socket.id);
    });

    socket.on('player name change', function (name) {
        players.nameChange(socket.id, name);
    });

    socket.on('player color change', function (color) {
        players.colorChange(socket.id, color);
    });

    socket.on('new token', function (tokenInfo) {
        tokens.newToken(tokenInfo);
    });
});

// Client updates
setInterval(function () {
    players.updateHeldTokens(tokens.getTokens());
    players.moveHeldTokens(tokens.getTokens());
    
    var state = {
        players: players.getPlayers(),
        tokens: tokens.getTokens()
    };

    io.sockets.emit('state', state);
}, 1000 / 30);