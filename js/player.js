var coc = require('./callOfCthulhu.js');

var players = {};

exports.getPlayers = function () {
    return players;
}

exports.newPlayer = function (id) {
    players[id] = {
        keysHeld: {},
        mouse: {
            x: 0,
            y: 0,
            down: false
        },
        name: 'Adventurer',
        color: '#ffffff',
        held: {
            deltaX: 0,
            deltaY: 0,
            token: null
        },
        canDelete: true,
        measurePoint: null,
        stats: coc.getRandomPlayerStats()
    };
}

exports.remove = function (id) {
    delete players[id];
}

exports.mouseUpdate = function (id, mousePosition) {
    if (players[id] != undefined) {
        players[id].mouse.x = mousePosition.x;
        players[id].mouse.y = mousePosition.y;
    }
}

exports.mouseDown = function (id) {
    if (players[id] != undefined) {
        players[id].mouse.down = true;
    }
}

exports.mouseUp = function (id) {
    if (players[id] != undefined) {
        players[id].mouse.down = false;
        players[id].canDelete = true;
    }
}

exports.scrollWheel = function (id, change, tokens) {
    if (players[id] != undefined) {
        var player = players[id];

        for (var i = tokens.length - 1; i >= 0; i--) {
            var token = tokens[i];

            if (playerOverToken(player, token)) {
                token.size += change;
                if (token.size < 1) {
                    token.size = 1;
                }
                break;
            }
        }
    }
}

exports.keyDown = function (id, keyCode) {
    if (players[id] != undefined) {
        players[id].keysHeld[keyCode] = true;
    }
}

exports.keyUp = function (id, keyCode) {
    if (players[id] != undefined) {
        players[id].keysHeld[keyCode] = false;
    }
}

exports.nameChange = function (id, name) {
    if (players[id] != undefined) {
        players[id].name = name;
    }
}

exports.colorChange = function (id, color) {
    if (players[id] != undefined) {
        players[id].color = color;
    }
}

exports.updateHeldTokens = function (tokens) {
    for (var id in players) {
        var player = players[id];

        if (player.mouse.down) {
            if (player.held.token == null) {
                for (var i = tokens.length - 1; i >= 0; i--) {
                    var token = tokens[i];

                    if (playerOverToken(player, token)) {
                        player.held = {
                            deltaX: player.mouse.x - token.x,
                            deltaY: player.mouse.y - token.y,
                            token: token
                        };
                        break;
                    }
                }
            }
        } else {
            player.held.token = null;
        }
    }
}

exports.moveHeldTokens = function () {
    for (var id in players) {
        var player = players[id];

        if (player.held.token != null) {
            var token = player.held.token;
            token.x = player.mouse.x - player.held.deltaX;
            token.y = player.mouse.y - player.held.deltaY;
        }
    }
}

exports.removeTokens = function (tokens) {
    for (var id in players) {
        var player = players[id];

        // Shift
        if (player.mouse.down && player.keysHeld[16] && player.canDelete) {
            for (var i = tokens.length - 1; i >= 0; i--) {
                var token = tokens[i];

                if (playerOverToken(player, token)) {
                    tokens.splice(i, 1);
                    player.canDelete = false;
                    break;
                }
            }
        }
    }
}

function playerOverToken(player, token) {
    return Math.hypot(player.mouse.x - token.x, player.mouse.y - token.y) <= token.size;
}

exports.updateMeasurePoints = function () {
    for (var id in players) {
        var player = players[id];

        // Z
        if (player.keysHeld[90]) {
            if (player.measurePoint == null) {
                player.measurePoint = {
                    x: player.mouse.x,
                    y: player.mouse.y
                };
            }
        } else {
            player.measurePoint = null;
        }
    }
}