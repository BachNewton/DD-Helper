var tokens = [];

exports.getTokens = function () {
    return tokens;
}

exports.newToken = function (tokenInfo) {
    while (tokenHere(tokenInfo.x, tokenInfo.y)) {
        tokenInfo.x += 10;
        tokenInfo.y += 10;
    }

    tokens.push({
        x: tokenInfo.x,
        y: tokenInfo.y,
        type: tokenInfo.type,
        color: 'white',
        size: tokenInfo.size
    });
}

function tokenHere(x, y) {
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (token.x == x && token.y == y) {
            return true;
        }
    }

    return false;
}

exports.removeTokens = function (players) {
    for (var id in players) {
        var player = players[id];

        // Shift
        if (player.mouse.down && player.keysHeld[16] && player.canDelete) {
            for (var i = tokens.length - 1; i >= 0; i--) {
                var token = tokens[i];

                if (Math.hypot(player.mouse.x - token.x, player.mouse.y - token.y) <= token.size) {
                    tokens.splice(i, 1);
                    player.canDelete = false;
                    break;
                }
            }
        }
    }
}