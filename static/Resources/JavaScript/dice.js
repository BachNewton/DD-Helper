function getDiceAmount() {
    return parseInt(document.getElementById('diceAmount').value);
}

function getDiceSides() {
    var diceSidesOptions = document.getElementsByName('diceSides');

    for (var i = 0; i < diceSidesOptions.length; i++) {
        if (diceSidesOptions[i].checked) {
            return parseInt(diceSidesOptions[i].value);
        }
    }
}

function diceRollUpdate() {
    var diceAmount = getDiceAmount();
    var diceSides = getDiceSides();

    var text = diceAmount + ' d' + diceSides;
    if (diceAmount > 1) {
        text += 's';
    }

    document.getElementById('diceRollText').innerHTML = text;
}

function roll() {
    var diceAmount = getDiceAmount();
    var diceSides = getDiceSides();

    socket.emit('roll', {
        diceAmount: diceAmount,
        diceSides: diceSides
    });
}