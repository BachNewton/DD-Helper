socket.on('state', function (state) {
    var players = state.players;
    var tokens = state.tokens;
    
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        ctx.fillStyle = token.color;
        ctx.beginPath();
        ctx.arc(token.x, token.y, token.size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(token.type, token.x, token.y + 9);
    }

    for (var id in players) {
        var player = players[id];
        
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.mouse.x, player.mouse.y, 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(player.name, player.mouse.x, player.mouse.y - 10);
    }
});