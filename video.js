var minParticleSize = 1;
var maxParticleSpeed = 10;
var width = window.innerWidth;
var height = window.innerHeight;
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
};

var game = new Phaser.Game(config);

function preload ()
{
    this.game.canvas.id = 'canvas';
    this.load.image('test', 'test.png');
    this.load.audio('portals', ['Portals.mp3']);
}
var currentRing = 0;
var rings = [];// .depth = NUMBER
var circles = [];
function create ()
{
    for(var i = 0; i < 10; i++){
        rings[i] = this.add.circle(width/2, height/2, 50 + 50 * (9 - i),"0x"+Phaser.Math.Between(0x999999,0xFFFFFF).toString(16));
    }
    for(var i = 0; i < 20; i++){
        circles[i] = this.add.circle(Phaser.Math.Between(0, width), height/2, Phaser.Math.Between(minParticleSize,maxParticleSize),"0x"+Phaser.Math.Between(0xCCCCCC,0xFFFFFF).toString(16));
        circles[i].xv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
        circles[i].yv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
    }
    var music = this.sound.add("portals");
    music.play();
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
    if(frame > lastBeat + fpb) {
        for(var i = 0; i < circles.length; i++){
            circles[i].depth = circles.length - i;
            circles[i].y=height/2;
            circles[i].xv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
            circles[i].yv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
            circles[i].setFillStyle("0x"+Phaser.Math.Between(0x999999,0xFFFFFF).toString(16));
        }
        for(var i = 0; i < rings.length; i++){
            rings[i].radius=50 + (50 * i);
            rings[i].depth = rings.length - i;
        }
        rings[Phaser.Math.Between(0,rings.length-1)].setFillStyle("0x"+Phaser.Math.Between(0x999999,0xFFFFFF).toString(16));
        lastBeat = frame;
    }
    else{
        for(var i = 0; i < rings.length; i++){
            rings[i].radius = rings[i].radius + 5; // Make ring bigger
        }
        for(var i = 0; i < circles.length; i++){
            circles[i].x+=circles[i].xv;
            circles[i].y+=circles[i].yv;
            if(circles[i].y>height+50){
                circles[i].y=-50;
            }
            if(circles[i].y<-50){
                circles[i].y=height+50;
            }
            if(circles[i].x>width+50){
                circles[i].x=-50;
            }
            if(circles[i].x<-50){
                circles[i].x=width + 50;
            }
        }
    }
    if(frame < 60 * 60 * 3.2){
        
        if(downloadOn){
            var image    = this.game.canvas.toDataURL();
            download(image, frame + ".png", "image/png");
        }
    }
    frame++;
}
