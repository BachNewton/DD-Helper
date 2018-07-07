canvas.addEventListener('mousemove', updateMousePosition);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('wheel', scrollWheel);

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

function scrollWheel(event) {
    var magnitude = event.deltaY;
    var zoomPower = 100;
    var change = -magnitude / zoomPower;
    socket.emit('scroll wheel', change);
}