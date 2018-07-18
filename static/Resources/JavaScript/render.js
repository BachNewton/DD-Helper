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
    local_stats = stats;

    var table = document.createElement('table');
    table.setAttribute('style', 'font-size: 1em;');

    for (var stat in stats) {
        var row = document.createElement('tr');

        var col1 = document.createElement('td');
        var textNode = document.createTextNode(stat + ':');
        col1.appendChild(textNode);

        var col2 = document.createElement('td');
        textNode = document.createTextNode(stats[stat]);
        col2.appendChild(textNode);

        row.appendChild(col1);
        row.appendChild(col2);

        table.appendChild(row);
    }

    document.getElementById('playerData').innerHTML = '';
    document.getElementById('playerData').appendChild(table);
});

function playerEditMode() {
    var stats = local_stats;

    var table = document.createElement('table');
    table.setAttribute('style', 'font-size: 0.8em;');

    for (var stat in stats) {
        var row = document.createElement('tr');

        var col1 = document.createElement('td');
        var textNode = document.createTextNode(stat + ':');
        col1.appendChild(textNode);

        var col2 = document.createElement('td');

        var inputElement = document.createElement('input');
        inputElement.setAttribute('style', 'font-size: 1em;');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('name', 'statsInputs');
        inputElement.setAttribute('value', stats[stat]);

        col2.appendChild(inputElement);

        row.appendChild(col1);
        row.appendChild(col2);

        table.appendChild(row);
    }

    document.getElementById('playerData').innerHTML = '';
    document.getElementById('playerData').appendChild(table);

    document.getElementById('playerEdit').innerText = 'Save';
    document.getElementById('playerEdit').onclick = saveStats;
}

function saveStats() {
    statsInputs = document.getElementsByName('statsInputs');

    var i = 0;
    for (var stat in local_stats) {
        local_stats[stat] = statsInputs[i].value;
        i++;
    }

    socket.emit('player data update', local_stats);

    document.getElementById('playerEdit').innerText = 'Edit';
    document.getElementById('playerEdit').onclick = playerEditMode;
}