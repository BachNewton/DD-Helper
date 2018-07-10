socket.on('state', function (state) {
    var players = state.players;
    var tokens = state.tokens;

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    drawGrid();
    drawTokens(tokens, players);
    drawPlayers(players);
    drawMeasureLines(players)
    drawInfoPannel(tokens, players);
});

function drawGrid() {
    if (getGridState()) {
        var boxSize = getBoxSize();
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

function drawMeasureLines(players) {
    for (var id in players) {
        var player = players[id];

        if (player.measurePoint != null) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(player.measurePoint.x, player.measurePoint.y);
            ctx.lineTo(player.mouse.x, player.mouse.y);
            ctx.stroke();

            var halfX = (player.measurePoint.x + player.mouse.x) / 2;
            var halfY = (player.measurePoint.y + player.mouse.y) / 2;
            var distance = Math.hypot(player.measurePoint.x - player.mouse.x, player.measurePoint.y - player.mouse.y);

            if (getGridState()) {
                distance = distance / getBoxSize();
            }

            distance = distance.toFixed(1);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.font = '34px Arial';
            ctx.fillText(distance, halfX, halfY);
        }
    }
}

function drawInfoPannel(tokens, players) {
    // Ctrl
    if (keysHeld[17]) {
        for (var i = tokens.length - 1; i >= 0; i--) {
            var token = tokens[i];

            if (token.name == 'Player' && players[token.id] != undefined && mouseOverToken(token)) {
                var player = players[token.id];

                var fontSize = 24;
                ctx.font = fontSize + 'px Arial';

                var largestWidthStatName = getLargestWidthStatName(player.stats);
                var largestWidthStatValue = getLargestWidthStatValue(player.stats);
                var padding = 5;

                var pannelWidth = padding + largestWidthStatName + padding + largestWidthStatValue + padding;
                var pannelHeight = padding + fontSize * Object.keys(player.stats).length + padding;

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
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                x += padding;
                y += padding;

                for (var stat in player.stats) {
                    ctx.fillText(stat + ':', x, y);
                    ctx.fillText(player.stats[stat], x + largestWidthStatName + padding, y);
                    y += fontSize;
                }

                break;
            }
        }
    }
}

function getLargestWidthStatName(stats) {
    var max = 0;

    for (var statName in stats) {
        var width = ctx.measureText(statName + ':').width;

        if (width > max) {
            max = width;
        }
    }

    return max;
}

function getLargestWidthStatValue(stats) {
    var max = 0;

    for (var statName in stats) {
        var width = ctx.measureText(stats[statName]).width;

        if (width > max) {
            max = width;
        }
    }

    return max;
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