var background = null;

var backgroundSelect = document.createElement('input');
backgroundSelect.setAttribute('type', 'file');
backgroundSelect.setAttribute('accept', 'image/*');
backgroundSelect.onchange = backgroundChange;

function backgroundButton() {
    backgroundSelect.click();
}

function backgroundChange() {
    var file = backgroundSelect.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
        var image = new Image();

        image.addEventListener('load', function () {
            socket.emit('new background image', {
                src: reader.result,
                width: image.width,
                height: image.height
            });
        });

        image.src = reader.result;
    });

    reader.readAsDataURL(file);
}

socket.on('new background image', function (data) {
    if (data != null) {
        background = data;
        background.image = new Image();
        background.image.src = background.src;
    }
});

function drawBackground(backgroundState) {
    if (background != null) {
        background.x = backgroundState.x;
        background.y = backgroundState.y;
        background.scale = backgroundState.scale;

        ctx.drawImage(background.image, background.x, background.y, background.width * background.scale, background.height * background.scale);
    }
}