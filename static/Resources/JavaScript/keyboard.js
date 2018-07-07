document.addEventListener('keydown', function (event) {
    socket.emit('key down', event.keyCode);
    checkKey(event.keyCode);
});

document.addEventListener('keyup', function (event) {
    socket.emit('key up', event.keyCode);
});

function checkKey(keyCode) {
    // T
    if (keyCode == 84 && document.activeElement != document.getElementById('chatInput')) {
        createToken(mouse.x, mouse.y, 'Token', getTokenSize());
    }
}