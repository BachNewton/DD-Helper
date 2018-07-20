var background = {
    src: '',
    width: 0,
    height: 0,
    scale: 1,
    x: 0,
    y: 0
};

exports.set = function (data) {
    background.src = data.src;
    background.width = data.width;
    background.height = data.height;
    background.scale = 1;
    background.x = 0;
    background.y = 0;
}

exports.get = function () {
    if (background.src != '') {
        return background;
    } else {
        return null;
    }
}

exports.getState = function () {
    return {
        scale: background.scale,
        x: background.x,
        y: background.y
    };
}