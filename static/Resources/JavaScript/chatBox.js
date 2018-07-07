document.getElementById('chatInput').addEventListener('keydown', function (event) {
    // Enter
    if (event.keyCode == 13) {
        sendChat();
    }
});

socket.on('chat message', function (data) {
    var text = '';
    text += getColoredHTMLText(data.color, data.playerName);
    text += ' - ';
    text += data.message;

    var chatTextElement = document.getElementById('chatText');

    if (chatTextElement.innerHTML != '') {
        text = '<br>' + text;
    }

    chatTextElement.innerHTML += text;

    chatTextElement.scrollTop = chatTextElement.scrollHeight;
});

function getColoredHTMLText(color, text) {
    var htmlText = '';
    htmlText += '<span style="color:' + color + ';">';
    htmlText += text;
    htmlText += '</span>';
    return htmlText;
}

function sendChat() {
    var message = document.getElementById('chatInput').value;

    if (message != '') {
        var playerName = document.getElementById('playerName').value;
        var color = document.getElementById('playerColor').value;

        socket.emit('chat message', {
            playerName: playerName,
            message: message,
            color: color
        });

        document.getElementById('chatInput').value = '';
    }
}