canvas.addEventListener('mousemove', updateMousePosition);
imageCanvas.addEventListener('mousemove', updateMouse2Position);
canvas.addEventListener('mousedown', mouseDown);
imageCanvas.addEventListener('mousedown', function () {
    mouseDown2 = true;
});
canvas.addEventListener('mouseup', mouseUp);
imageCanvas.addEventListener('mouseup', function () {
    mouseDown2 = false;
});
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

function updateMouse2Position(event) {
    var rect = imageCanvas.getBoundingClientRect();

    mouse2.x = event.clientX - rect.left;
    mouse2.y = event.clientY - rect.top;
}

function mouseDown() {
    socket.emit('mouse down');
}

function mouseUp() {
    socket.emit('mouse up');
}

function scrollWheel(event) {
    event.preventDefault();
    var magnitude = event.deltaY;
    var zoomPower = 100;
    var change = -magnitude / zoomPower;
    socket.emit('scroll wheel', change);
}