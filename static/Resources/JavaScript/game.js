// First connect
socket.emit('new player');

function playerNameChange() {
    var name = document.getElementById('playerName').value;
    socket.emit('player name change', name);
}

function playerColorChange() {
    var color = document.getElementById('playerColor').value;
    socket.emit('player color change', color);
}

function getTokenSize() {
    return parseInt(document.getElementById('tokenSize').value);
}

function getTokenColor() {
    return document.getElementById('tokenColor').value;
}

function createDefaultToken() {
    createToken(canvas.width * 0.25, canvas.height * 0.25, 'Token', getTokenSize());
}

function createPlayerToken() {
    createToken(canvas.width * 0.25, canvas.height * 0.25, 'Player', getTokenSize());
}

function createToken(x, y, name, size) {
    var tokenInfo = {
        x: x,
        y: y,
        name: name,
        size: size,
        color: getTokenColor()
    };

    socket.emit('new token', tokenInfo);
}

function removeAllTokens() {
    socket.emit('remove all tokens');
}

function howToUse() {
    var text = '';
    text += 'How to use:\n';
    text += '\n- To create a new token, press the button or press \'T\'';
    text += '\n- Click and drag tokens to move them';
    text += '\n- Shift + click on tokens to remove them';
    text += '\n- Scroll over a token to change its size';
    text += '\n- Hold Ctrl while hoving over a token to get its info';
    alert(text);
}

function gridChange() {
    var state = getGridState();
    var size = getGridSize();
    socket.emit('grid update', {
        state: state,
        size: size
    });
}

socket.on('grid update', function (data) {
    document.getElementById('grid').checked = data.state;
    document.getElementById('gridSize').value = data.size;
});