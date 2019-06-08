
var c = document.getElementById("myCanvas");
c.width = 3000
c.height = 3000
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(3000, 3000);
ctx.stroke();
