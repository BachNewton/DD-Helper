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