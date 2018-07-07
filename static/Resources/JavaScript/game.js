// First connect
socket.emit('new player');

document.addEventListener('keydown', function (event) {
    socket.emit('key down', event.keyCode);
});

document.addEventListener('keyup', function (event) {
    socket.emit('key up', event.keyCode);
});

function playerNameChange() {
    var name = document.getElementById('playerName').value;
    socket.emit('player name change', name);
}

function playerColorChange() {
    var color = document.getElementById('playerColor').value;
    socket.emit('player color change', color);
}

function createToken() {
    var tokenInfo = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        type: 'Token'
    };

    socket.emit('new token', tokenInfo);
}