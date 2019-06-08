canvas.width = 3000
canvas.height = 3000
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(10000, 10000);
ctx.stroke();
