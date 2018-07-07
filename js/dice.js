exports.roll = function (diceAmount, diceSides) {
    var amount = 0;

    for (var i = 0; i < diceAmount; i++) {
        amount += getRandomRange(1, diceSides);
    }

    return amount;
}

function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}