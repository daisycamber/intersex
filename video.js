// v1.5
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
    this.load.image('test', 'test.png');
}
var currentRing = 0;
var rings = [];// .depth = NUMBER
var circles = [];
var dataArray;
var bars = [];
var graphics;
function create ()
{
    
    
    for(var i = 0; i < 10; i++){
        rings[i] = this.add.circle(width/2, height/2, 50 + 50 * (9 - i),"0x"+Phaser.Math.Between(0x999999,0xFFFFFF).toString(16));
    }
    for(var i = 0; i < 10; i++){
        circles[i] = this.add.circle(Phaser.Math.Between(0, width), height/2, Phaser.Math.Between(minParticleSize,maxParticleSize),"0x"+Phaser.Math.Between(0xCCCCCC,0xFFFFFF).toString(16));
        circles[i].xv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
        circles[i].yv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
    }
    
    graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x000000 }, fillStyle: { color: 0x000000 } });
    graphics.depth = 100;

    // Set up analyser and play music
    audio = new Audio();
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    
    audio.src = "assets/music/Portals.mp3"; // the source path
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 64;
    
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    console.log(analyser.frequencyBinCount);
    
    analyser.getByteFrequencyData(dataArray);
    
    barWidth = 1920/analyser.frequencyBinCount;
    
    // generate bars
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        bars[i] = new Phaser.Geom.Rectangle(i * barWidth, 0, barWidth, barWidth);
        graphics.fillRectShape(bars[i]);
    }
    audio.play();
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
    // Update circles and rings on the beat
    if(frame > lastBeat + fpb) {
        // Update bars
        graphics.clear();
        analyser.getByteFrequencyData(dataArray);
        for (var i = 0; i < analyser.frequencyBinCount; i++) {
            var color = Phaser.Display.Color.GetColor(dataArray[i]/2, dataArray[i], 0);
            graphics.fillStyle(color);
            bars[i].height = dataArray[i] * (height/(255 * 2));
            graphics.fillRectShape(bars[i]);
        }
        for(var i = 0; i < circles.length; i++){
            circles[i].depth = circles.length - i;
            circles[i].y=height/2;
            circles[i].xv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
            circles[i].yv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
            circles[i].setFillStyle("0x"+Phaser.Math.Between(0x999999,0xFFFFFF).toString(16));
        }
        for(var i = 0; i < rings.length; i++){
            rings[i].radius=50 + (50 * i);
            rings[i].depth = rings.length - i + 10;
        }
        rings[Phaser.Math.Between(0,rings.length-1)].setFillStyle("0x"+Phaser.Math.Between(0x999999,0xFFFFFF).toString(16));
        lastBeat = frame;
    } 
    else{ // Off the beat
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
    frame++;
}
