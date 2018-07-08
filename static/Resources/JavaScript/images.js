setInterval(drawImages, 1000 / 60);

function drawImages() {
    updateHeldImage();
    moveHeldImage();

    ctx2.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    for (var i = 0; i < images.length; i++) {
        var image = images[i];

        if (image.visable) {
            ctx2.drawImage(image.image, image.x, image.y, image.image.width, image.image.height);
        }
    }
}

function updateHeldImage() {
    if (mouseDown2) {
        if (held == null) {
            for (var i = images.length - 1; i >= 0; i--) {
                var image = images[i];

                if (image.visable && mouseOverImage(image)) {
                    held = {
                        deltaX: mouse2.x - image.x,
                        deltaY: mouse2.y - image.y,
                        image: image
                    };
                    bringImageToFront(i);
                    break;
                }
            }
        }
    } else {
        held = null;
    }
}

function moveHeldImage() {
    if (held != null) {
        var image = held.image;

        image.x = mouse2.x - held.deltaX;
        image.y = mouse2.y - held.deltaY;
    }
}

function mouseOverImage(image) {
    var x = mouse2.x;
    var y = mouse2.y;

    return x >= image.x && x <= image.x + image.image.width && y >= image.y && y <= image.y + image.image.height;
}

function updateImagesVisability(index) {
    var imageCheckboxes = document.getElementsByName('images');

    for (var j = 0; j < images.length; j++) {
        if (imageCheckboxes[index].value == images[j].name) {
            var isChecked = imageCheckboxes[index].checked;

            images[j].visable = isChecked;

            if (isChecked) {
                bringImageToFront(j);
            }

            break;
        }
    }
}

function bringImageToFront(index) {
    images.push(images.splice(index, 1)[0]);
}

function imageChange() {
    var file = document.getElementById('image').files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
        var data = reader.result;
        var name = file.name;

        socket.emit('new image', {
            name: name,
            data: data
        });
    });

    reader.readAsDataURL(file);
}

socket.on('new image', function (data) {
    var image = new Image();
    image.src = data.data;
    images.push({
        name: data.name,
        image: image,
        visable: true,
        x: 0,
        y: 0
    });

    addInputElement(data);
});

function addInputElement(data) {
    var imageCheckboxesIndex = document.getElementsByName('images').length;

    var element = document.createElement('input');
    element.setAttribute('type', 'checkbox');
    element.setAttribute('name', 'images');
    element.setAttribute('value', data.name);
    element.setAttribute('onchange', 'updateImagesVisability(' + imageCheckboxesIndex + ')');
    element.checked = true;

    var imagesListElement = document.getElementById('imagesList');

    if (imagesListElement.childElementCount != 0) {
        imagesListElement.appendChild(document.createElement('br'));
    }

    imagesListElement.appendChild(element);
    imagesListElement.appendChild(document.createTextNode(' ' + data.name));
}