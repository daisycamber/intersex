var stage
function main(){
  // Createjs stuff
  stage = new createjs.Stage("canvas");
  // Enable touch
  createjs.Touch.enable(stage)
  var elmnt = document.getElementById("myDIV");
var txt = "Height with padding and border: " + elmnt.offsetHeight + "px<br>";
  // Fit canvas to screen
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight- window.innerWidth/12;

  // Add functionality
  addSelector();
  scroll();
  addChords();
  addLengthMeasures();
  addChordLabels();
  addPianoKeys();
  addToolBar();


  canvas.style.backgroundColor = BACKGROUNDCOLOR;
  stage.update();

  createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {
    stage.update();
  }
}
