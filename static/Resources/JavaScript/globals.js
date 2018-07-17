var socket = io();

// First connect
socket.emit('new player');

var mouse = { x: 0, y: 0 };
var mouse2 = { x: 0, y: 0 };
var mouseDown2 = false;

var keysHeld = {};

var images = [];

var held = null;

var local_stats = {};

var canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 800;
var ctx = canvas.getContext('2d');

var imageCanvas = document.getElementById('imagesCanvas');
imagesCanvas.width = 1600;
imagesCanvas.height = 1000;
var ctx2 = imagesCanvas.getContext('2d');

function getGridState() {
    return document.getElementById('grid').checked;
}

function getGridSize() {
    return parseInt(document.getElementById('gridSize').value);
}

function getBoxSize() {
    return boxSize = canvas.width / getGridSize();
}