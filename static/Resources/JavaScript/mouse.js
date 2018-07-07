canvas.addEventListener('mousemove', updateMousePosition);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);

function updateMousePosition(event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    
    socket.emit('mouse movement', {
        x: mouse.x,
        y: mouse.y
    });
}

function mouseDown() {
    socket.emit('mouse down');
}

function mouseUp() {
    socket.emit('mouse up');
}