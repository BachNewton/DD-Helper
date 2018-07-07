socket.on('state', function (state) {
    var players = state.players;
    var tokens = state.tokens;

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    if (getGridState()) {
        var size = getGridSize();
        var boxSize = canvas.width / size;
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 3;

        for (var x = boxSize; x < canvas.width; x += boxSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (var y = boxSize; y < canvas.height; y += boxSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        ctx.fillStyle = token.color;
        ctx.beginPath();
        ctx.arc(token.x, token.y, token.size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.font = getBestFontSize(token.size * 2 * 0.85, token.name);
        ctx.textAlign = 'center';
        ctx.textBaseline = "middle";
        ctx.fillText(token.name, token.x, token.y);
    }

    for (var id in players) {
        var player = players[id];

        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.mouse.x, player.mouse.y, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = "bottom";
        ctx.fillText(player.name, player.mouse.x, player.mouse.y - 10);
    }
});

function getBestFontSize(width, text) {
    var min = 0;
    var max = 1000;
    var guess;
    var font = 'px sans-serif';

    do {
        guess = (min + max) / 2;

        ctx.font = guess + font;
        var diff = ctx.measureText(text).width - width;

        if (diff > 0) {
            max = guess;
        } else if (diff < 0) {
            min = guess;
        }
    } while (Math.abs(diff) > 1);

    return guess + font;
}