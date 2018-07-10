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

function getDiceMod() {
    return parseInt(document.getElementById('diceMod').innerText);
}

function diceRollUpdate() {
    var diceAmount = getDiceAmount();
    var diceSides = getDiceSides();
    var text = diceAmount + 'D' + diceSides + document.getElementById('diceMod').innerText;
    document.getElementById('diceRollText').innerHTML = text;
}

function roll() {
    var diceAmount = getDiceAmount();
    var diceSides = getDiceSides();
    var diceMod = getDiceMod();

    socket.emit('roll', {
        diceAmount: diceAmount,
        diceSides: diceSides,
        diceMod: diceMod
    });
}