var stage
function main(){
  // Createjs stuff
  stage = new createjs.Stage("canvas");
  // Enable touch
  createjs.Touch.enable(stage)
  // Fit canvas to screen
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight- 200;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // some code..
    stage.canvas.height = window.innerHeight- 150;
  }
  console.log(window.innerHeight)
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
