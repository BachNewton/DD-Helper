socket.on('state', function (state) {
    var players = state.players;
    var tokens = state.tokens;

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    drawGrid();
    drawTokens(tokens, players);
    drawPlayers(players);
    drawInfoPannel(tokens, players);
});

function drawGrid() {
    if (getGridState()) {
        var size = getGridSize();
        var boxSize = canvas.width / size;
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 3;

        for (var x = boxSize; x < canvas.width; x += boxSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (var y = boxSize; y < canvas.height; y += boxSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
}

function drawTokens(tokens, players) {
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        var name;
        if (token.name == 'Player' && players[token.id] != undefined) {
            ctx.fillStyle = players[token.id].color;
            name = players[token.id].name;
            if (name == '') {
                name = 'Player';
            }
        } else {
            ctx.fillStyle = token.color;
            name = token.name;
        }

        ctx.beginPath();
        ctx.arc(token.x, token.y, token.size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.font = getBestFontSize(token.size * 2 * 0.85, name);
        ctx.textAlign = 'center';
        ctx.textBaseline = "middle";
        ctx.fillText(name, token.x, token.y);
    }
}

function drawPlayers(players) {
    for (var id in players) {
        var player = players[id];

        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.mouse.x, player.mouse.y, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = "alphabetic";
        ctx.fillText(player.name, player.mouse.x, player.mouse.y - 10);
    }
}

function drawInfoPannel(tokens, players) {
    // Ctrl
    if (keysHeld[17]) {
        for (var i = tokens.length - 1; i >= 0; i--) {
            var token = tokens[i];

            if (token.name == 'Player' && players[token.id] != undefined && mouseOverToken(token)) {
                var pannelWidth = 120;
                var pannelHeight = 210;
                var x = mouse.x;
                var y = mouse.y;

                if (x + pannelWidth > canvas.width) {
                    x -= pannelWidth;
                }

                if (y + pannelHeight > canvas.height) {
                    y -= pannelHeight;
                }

                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, pannelWidth, pannelHeight);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 4;
                ctx.strokeRect(x, y, pannelWidth, pannelHeight);

                ctx.fillStyle = 'white';
                ctx.font = '24px Arial';
                ctx.textAlign = 'left';
                ctx.textBaseline = "top";
                x += 5;
                y += 5;
                var player = players[token.id];
                for (var stat in player.stats) {
                    ctx.fillText(stat + ':', x, y);
                    ctx.fillText(player.stats[stat], x + 80, y);
                    y += 24;
                }

                break;
            }
        }
    }
}

function mouseOverToken(token) {
    return Math.hypot(mouse.x - token.x, mouse.y - token.y) <= token.size;
}

function getBestFontSize(width, text) {
    var min = 0;
    var max = 1000;
    var guess;
    var font = 'px sans-serif';

    do {
        guess = (min + max) / 2;

        ctx.font = guess + font;
        var diff = ctx.measureText(text).width - width;

        if (diff > 0) {
            max = guess;
        } else if (diff < 0) {
            min = guess;
        }
    } while (Math.abs(diff) > 1);

    return guess + font;
}

socket.on('player data update', function (stats) {
    var text = '<div class="cols">';

    text += '<div>';
    for (var stat in stats) {
        text += stat;
        text += ': ';
        text += '<br>';
    }
    text += '</div>';

    text += '<div>';
    for (var stat in stats) {
        text += stats[stat];
        text += '<br>';
    }
    text += '</div>';

    text += '</div>';

    document.getElementById('playerData').innerHTML = text;
});