exports.getRandomPlayerStats = function () {
    var values = [40, 50, 50, 50, 60, 60, 70, 80];
    var stats = {
        STR: undefined,
        CON: undefined,
        POW: undefined,
        DEX: undefined,
        APP: undefined,
        SIZ: undefined,
        INT: undefined,
        EDU: undefined
    };

    for (var stat in stats) {
        stats[stat] = values.splice(getRandomIndex(values), 1)[0];
    }

    return stats;
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}