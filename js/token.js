var tokens = [];

exports.getTokens = function () {
    return tokens;
}

exports.newToken = function (tokenInfo, id) {
    while (tokenHere(tokenInfo.x, tokenInfo.y)) {
        tokenInfo.x += 10;
        tokenInfo.y += 10;
    }

    tokens.push({
        x: tokenInfo.x,
        y: tokenInfo.y,
        name: tokenInfo.name,
        color: tokenInfo.color,
        size: tokenInfo.size,
        id: id
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