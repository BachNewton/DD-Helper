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
    if (keyCode == 84 && focusNotInTextBox()) {
        createToken(mouse.x, mouse.y, 'Token', getTokenSize());
    }
}

function focusNotInTextBox() {
    return document.activeElement != document.getElementById('chatInput') && document.activeElement != document.getElementById('playerName') && focusNotInStatsInputTextBox();
}

function focusNotInStatsInputTextBox() {
    statsInputs = document.getElementsByName('statsInputs');

    for (var i = 0; i < statsInputs.length; i++) {
        var statsInput = statsInputs[i];

        if (document.activeElement == statsInput) {
            return false;
        }
    }

    return true;
}