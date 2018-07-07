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
    appendToChat(text);
});

socket.on('roll', function (data) {
    var player = data.player;
    var amount = data.amount;
    var diceAmount = data.diceAmount;
    var diceSides = data.diceSides;

    var text = '';
    text += 'ROLL: ';
    text += getColoredHTMLText(player.color, player.name);
    text += ' rolled ';
    text += diceAmount;
    text += ' ';
    text += diceSides;
    text += ' sided ';
    if (diceAmount > 1) {
        text += 'dice';
    } else {
        text += 'die';
    }
    text += ' and got a: ';
    text += getColoredHTMLText('cyan', amount);
    text += '!';

    appendToChat(text);
});

function appendToChat(text) {
    var chatTextElement = document.getElementById('chatText');

    if (chatTextElement.innerHTML != '') {
        text = '<br>' + text;
    }

    chatTextElement.innerHTML += text;

    chatTextElement.scrollTop = chatTextElement.scrollHeight;
}

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