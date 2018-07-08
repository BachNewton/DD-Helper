document.addEventListener('keydown', function (event) {
    socket.emit('key down', event.keyCode);
    keysHeld[event.keyCode] = true;
    checkKey(event.keyCode);
});

document.addEventListener('keyup', function (event) {
    socket.emit('key up', event.keyCode);
    keysHeld[event.keyCode] = false;
});

function checkKey(keyCode) {
    // T
    if (keyCode == 84 && document.activeElement != document.getElementById('chatInput') && document.activeElement != document.getElementById('playerName')) {
        createToken(mouse.x, mouse.y, 'Token', getTokenSize());
    }
}