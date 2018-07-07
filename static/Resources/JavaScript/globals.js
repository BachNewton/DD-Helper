var socket = io();

var mouse = { x: 0, y: 0 };

var canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 600;
var ctx = canvas.getContext('2d');