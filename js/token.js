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

exports.removeAll = function () {
    tokens = [];
}