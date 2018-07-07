var tokens = [];

exports.getTokens = function () {
    return tokens;
}

exports.newToken = function (tokenInfo) {
    tokens.push({
        x: tokenInfo.x,
        y: tokenInfo.y,
        type: tokenInfo.type,
        color: 'white',
        size: 35
    });
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