// v2.0
var minParticleSize = 1;
var maxParticleSpeed = 10;
var width = window.innerWidth;
var height = window.innerHeight - document.getElementById('navigationbarbottom').clientHeight;
var maxParticleSize = width/20;
var config = {
    type: Phaser.CANVAS,
    width: width,
    height: height,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.game.canvas.id = 'canvas';
    this.load.image('leaf1', 'drawings/leaf1.png');
}
var currentRing = 0;
var leaves = [];// .depth = NUMBER
var maxLeafSize = 200;
var minLeafSize = 50;
var deltaLeafSize = 0.5;
function create ()
{
    for(var i = 0; i < 25; i++){
        leaves[i] = this.add.image(window.innerWidth/2,window.innerHeight/2,'leaf1').setTint(0xff0000);
        leaves[i].depth = 100;
        leaves[i].deltaRotation = Phaser.Math.Between(-100, 100)/10000;
        leaves[i].deltaX = Phaser.Math.Between(-100, 100)/50;
        leaves[i].deltaY = Phaser.Math.Between(-100, 100)/50;
        leaves[i].deltaLeafSize = Phaser.Math.Between(40, 50)/100;
        leaves[i].displayWidth = minLeafSize;
        leaves[i].displayHeight = minLeafSize;
    }
}
var frame = 0;
var downloadOn = false;
// for EDM visualization
var bpm = 126;
var bps = 126/60 // beats per second
var bpf = 126/30// beats per frame
var fpb = (60*60)/bpm; // frames per beat
var halfBeat = fpb/2;
var lastBeat = 0;
var lastHalfBeat = 0;
function update ()
{
  /*
  if(frame%1000 == 0){

  }*/
  for(var i = 0; i < leaves.length; i++){
    leaves[i].rotation+=leaves[i].deltaRotation;
    leaves[i].x+=leaves[i].deltaX;
    leaves[i].y+=leaves[i].deltaY;
    if(leaves[i].displayWidth < maxLeafSize && leaves[i].displayHeight < maxLeafSize){
      leaves[i].displayWidth += leaves[i].deltaLeafSize;
      leaves[i].displayHeight += leaves[i].deltaLeafSize;
    }
    if(leaves[i].x < leaves[i].width * -1 || leaves[i].y < leaves[i].height * -1 || leaves[i].x > window.innerWidth + leaves[i].width || leaves[i].y > window.innerHeight + leaves[i].height){
      leaves[i].x = window.innerWidth/2;
      leaves[i].y = window.innerHeight/2;
      leaves[i].deltaRotation = Phaser.Math.Between(-100, 100)/10000;
      leaves[i].deltaX = Phaser.Math.Between(-100, 100)/50;
      leaves[i].deltaY = Phaser.Math.Between(-100, 100)/50;
      leaves[i].deltaLeafSize = Phaser.Math.Between(40, 50)/100;
      leaves[i].displayWidth = minLeafSize;
      leaves[i].displayHeight = minLeafSize;
    }
  }
  frame++;
}
