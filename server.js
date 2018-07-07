// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var players = require('./js/player.js');
var tokens = require('./js/token.js');
var dice = require('./js/dice.js');

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
        io.sockets.emit('chat message', {
            playerName: 'Server',
            message: 'A new player has connected to the server!',
            color: 'white'
        });
    });

    socket.on('disconnect', function () {
        console.log('A player has disconnected! ID: ' + socket.id);
        players.remove(socket.id);
        io.sockets.emit('chat message', {
            playerName: 'Server',
            message: 'A player has left to the server!',
            color: 'white'
        });
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

    socket.on('key down', function (keyCode) {
        players.keyDown(socket.id, keyCode);
    });

    socket.on('key up', function (keyCode) {
        players.keyUp(socket.id, keyCode);
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

    socket.on('roll', function (data) {
        var player = players.getPlayers()[socket.id];

        if (player != undefined) {
            var amount = dice.roll(data.diceAmount, data.diceSides);

            console.log(player.name + ' rolled a: ' + amount);

            io.sockets.emit('roll', {
                player: player,
                amount: amount,
                diceAmount: data.diceAmount,
                diceSides: data.diceSides
            });
        }
    });
});

// Client updates
setInterval(function () {
    players.updateHeldTokens(tokens.getTokens());
    players.moveHeldTokens(tokens.getTokens());
    tokens.removeTokens(players.getPlayers());

    var state = {
        players: players.getPlayers(),
        tokens: tokens.getTokens()
    };

    io.sockets.emit('state', state);
}, 1000 / 60);