var TILESIZE = window.innerHeight/18;
var TILEROUND = TILESIZE/10
var TEXTTYPE = "bold " + TILESIZE * 0.8 + "px Arial"
var SUBTEXTTYPE = "bold " + TILESIZE * 0.4 + "px Arial"
var OFFSET = TILESIZE/8
var ADHEIGHT = 90;
var BGSCALE = 1.5;
var window_height = window.innerHeight;
var image;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var square_size = 3
var square_index = getRandomInt(0,WORDSQUARES[square_size].length/4);
var win_plays = square_size * 2 + (square_size - 2) * 2 - 1


var stage;

function main() {
    stage = new createjs.Stage("canvas");
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight - ADHEIGHT;
    var image = new Image();
    image.src = "images/background.jpg";
    image.onload = handleImageLoad;
    stage.update();
    // code here.
}


tiles = []

function clearSelection(){
  for(var tile in tiles){
    tiles[tile][0].graphics.beginFill("White").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  }
}

selected_index = 1
won = false
plays = 0 // How many tiles the player has played
function drawTile(x,y,text,type, index){
  var tileGroup = new createjs.Container();
  var tile = new createjs.Shape();
  tile.graphics.beginFill("White").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  var text =  new createjs.Text(text, TEXTTYPE, "#000000")
  tile.text = text
  text.textAlign = 'center';
  text.x = TILESIZE/2
  text.y = TILESIZE/6
  tileGroup.addChild(tile)
  tileGroup.addChild(text)
  tileGroup.x = x;
  tileGroup.y = y;
  stage.addChild(tileGroup)
  tile.index = index
  tile.text = text


  if(type){
    if(index == selected_index && tile.text.text == "" ){
      tile.graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
    }
    tile.addEventListener("click", function(event) {
      console.log("Test")



      if(tile.text.text == ""){
        clearSelection()
        tile.graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
        selected_index = tile.index
        stage.update()
      }


    })
  } else {
    tile.addEventListener("click", function(event) {
      console.log("Test2")
      if(event.target.text != ""){
        onPlay("",text,tile)
      }
    })
  }
  return [tile,text]
}

function wonGame(){
  console.log("Won game")
  var tileGroup = new createjs.Container();
  var tile = new createjs.Shape();
  tile.graphics.beginFill("Orange").drawRoundRectComplex(0, 0, TILESIZE * 6, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  var text =  new createjs.Text("You won! (Tap)", TEXTTYPE, "#000000")
  text.textAlign = 'center';
  text.x = TILESIZE * 3
  text.y = TILESIZE/6
  tileGroup.addChild(tile);
  tileGroup.addChild(text);
  stage.addChild(tileGroup)

  tileGroup.x = (window.innerWidth - TILESIZE * 6)/2
  tileGroup.y = (window_height * 3/4)
  tile.addEventListener("click",function(event) {
    console.log("World!");
    stage.removeAllChildren();
    var bitmap = new createjs.Bitmap(image);
    bitmap.scale = BGSCALE;
    stage.addChild(bitmap);
    square_index = getRandomInt(0,WORDSQUARES[square_size].length/4);
    selected_index = 1
    letters = []
    for(i = 0; i < 4; i++){
      for(j = 0; j < square_size; j++){
        letters[4 * i + j] = (WORDSQUARES[square_size][square_index * 4 + i].substring(j,j+1));
        console.log(letters[4 * i + j])
      }
    }
    count = 0

    let uniqueChars = letters.filter((c, index) => {
        return letters.indexOf(c) === index;
    });
    inputText = uniqueChars//["C","A","D","E","K","E","H","P"]//,"M","B","I"]//["A","H","S","L","G","N
    inputText = shuffle(inputText)
    won = false
    drawInterface();
    //tiles[1][0].graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND,TILEROUND, TILEROUND, TILEROUND);
    stage.update();
  });
}
score = 0
total_score = 0
function onPlay(key, text,tile){
  if(tiles[selected_index][1].text == ""){
    if(key != ""){
      ctext = key
    }
    else {
      ctext = tile.text.text
    }
    correct = false
    if(selected_index > -1){
      console.log("Testing this")
      console.log(selected_index)
      pos = 0;
      if(selected_index < size && (tile.text.text == WORDSQUARES[square_size][square_index * 4].substring(selected_index,selected_index+1) || key == WORDSQUARES[square_size][square_index * 4].substring(selected_index,selected_index+1))){
        console.log("FUCK0")
        tiles[selected_index][1].text = ctext;
        correct = true

      }
      pos = selected_index-(size-1)


      if(selected_index >= size && selected_index < size + size-1 && (tile.text.text == WORDSQUARES[square_size][square_index * 4 + 1].substring(pos,pos+1) || key == WORDSQUARES[square_size][square_index * 4 + 1].substring(pos,pos+1))){
        console.log("FUCK1")
        console.log(selected_index)
        tiles[selected_index][1].text = ctext;
        correct = true
      }
      pos = selected_index-(size-2)*2-1


      console.log("Pos:")
      console.log(pos)
      if(selected_index >= size + size-2 && selected_index < size + (size-2)*2 && (tile.text.text == WORDSQUARES[square_size][square_index * 4 + 2].substring(pos,pos+1) || key == WORDSQUARES[square_size][square_index * 4 + 2].substring(pos,pos+1))){
        console.log("THIS WORKS NOT")
        tiles[selected_index][1].text =  ctext;
        correct = true
      }
      pos = selected_index-(size-2)*2-size

      if(selected_index >= size + (size-2)*2 && (tile.text.text == WORDSQUARES[square_size][square_index * 4 + 3].substring(pos,pos+1) || key == WORDSQUARES[square_size][square_index * 4 + 3].substring(pos,pos+1))){
        console.log("THIS WORKS")
        tiles[selected_index][1].text =  ctext;
        correct = true
      }
      // TODO fix this for all sizes
      if(correct){
        plays = plays + 1
        score = score + size;
        score_text.text = "Score: " + score + "/" + total_score;
        if(plays == win_plays){
          won = true
          plays = 0
          total_score = total_score + score
          score = 0
          wonGame()
        }
        else {
          clearSelection()
          while(tiles[selected_index][1].text != ""){
            selected_index = selected_index + 1;
            if(selected_index > win_plays){
              selected_index = 1;
            }
          }
          if(square_size == 3){
            if(selected_index == 4 && tiles[selected_index+1][1].text == "" ){
              selected_index = 5;
            }
            if(selected_index == 5 && tiles[selected_index-2][1].text == "" ){
              selected_index = 3;
            }
          }
          if(square_size == 4){
            console.log("Index is")
            console.log(selected_index)
            if(selected_index == 6 && tiles[selected_index+2][1].text == "" ){
              selected_index = 8;
            }
            else if(selected_index == 8 && tiles[11][1].text == "" ){
              selected_index = 11;
            }
            /*if(selected_index == 5 && tiles[selected_index+1][1].text == "" ){
              selected_index = 6;
            }
            if(selected_index == 7 && tiles[selected_index-2][1].text == "" ){
              selected_index = 8;
            }*/
          }
          if(square_size == 5){
            if(selected_index == 8 && tiles[selected_index+3][1].text == "" ){
              selected_index = 11;
            }
            /*if(selected_index == 5 && tiles[selected_index+1][1].text == "" ){
              selected_index = 6;
            }
            if(selected_index == 7 && tiles[selected_index-2][1].text == "" ){
              selected_index = 8;
            }*/
          }

          /*
          if(selected_index == 4 && tiles[selected_index][1].text == ""){
            selected_index = 5
          }
          else if(selected_index == 3 && tiles[selected_index][1].text != ""){
            selected_index = 4
          }
          else if (selected_index == 8 && tiles[2][1].text == "")
          {
            selected_index = 1
          }
          else if (selected_index == 8 && tiles[4][1].text == "")
          {
            selected_index = 4
          }*/
          if(!won){
            tiles[selected_index][0].graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);


          }
        }

      }
      else { // Decrement the score
        score = score - 1;
        score_text.text = "Score: " + score + "/" + total_score;
      }

      // TODO for some reason the S works along with the I in bottom left
    }
    stage.update()
    key = 0
  }

}

function drawWordSquare(size,index){
  width = size * (TILESIZE + OFFSET) - OFFSET
  x = (window.innerWidth - width)/2;
  y = (window_height - width)/2 - TILESIZE * 1.5;
  tiles[0] = (drawTile(x + 0 * (TILESIZE + OFFSET), y + 0,WORDSQUARES[square_size][square_index * 4].substring(0,1),true, i));
  for(var i = 1; i < size; i++){ // Top
    tiles[i] = (drawTile(x + i * (TILESIZE + OFFSET), y + 0,"",true, i));

  }
  for(var i = 0; i < size-2; i++){ // Left
    tiles[i+size] = (drawTile(x, y + (i+1) * (TILESIZE + OFFSET),"",true, i+size));//WORDSQUARES[3][index * 3+1].substring(i+1,i+2)));
  }
  for(var i = 0; i < size-2; i++){ // Right
    tiles[i+size-2+size] = (drawTile(x+width - TILESIZE, y + (i+1) * (TILESIZE + OFFSET),"",true,i+size-2+size));//WORDSQUARES[3][index * 3+2].substring(i+1,i+2)));
  }
  for(var i = 0; i < size; i++){ // Top
    tiles[i+size-2+size + size-2] = (drawTile(x + i * (TILESIZE + OFFSET), y+width-TILESIZE,"",true,i+size-2+size + size-2));//WORDSQUARES[3][index * 3+3].substring(i,i+1)));
  }
}
letters = []
for(i = 0; i < 4; i++){
  for(j = 0; j < square_size; j++){
    letters[4 * i + j] = (WORDSQUARES[square_size][square_index * 4 + i].substring(j,j+1));
    console.log(letters[4 * i + j])
  }
}
count = 0

let uniqueChars = letters.filter((c, index) => {
    return letters.indexOf(c) === index;
});
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
inputText = uniqueChars//["C","A","D","E","K","E","H","P"]//,"M","B","I"]//["A","H","S","L","G","N
inputText = shuffle(inputText)
console.log(letters)
function drawInputSquares(size){
  width = size * (TILESIZE + OFFSET) - OFFSET
  x = (window.innerWidth - width)/2;
  y = (window_height - width)/2 + width + OFFSET - TILESIZE * 1.5;
  for(var i = 0; i < size; i++){
    drawTile(x + i* (TILESIZE + OFFSET), y + (TILESIZE + OFFSET) * 0 + TILESIZE/2,inputText[i], false, i);
  }
  for(var i = 0; i < size; i++){
    drawTile(x + (i) * (TILESIZE + OFFSET), y + (TILESIZE + OFFSET) * 1 + TILESIZE/2,inputText[i+size], false, i+size);
  }
  if(size > 2){
    for(var i = 0; i < size; i++){
      drawTile(x + (i) * (TILESIZE + OFFSET), y + (TILESIZE + OFFSET) * 2 + TILESIZE/2,inputText[i+size*2], false, i+size);
    }
  }
}

function drawTitle(x,y,text){
  var tileGroup = new createjs.Container();
  var tile = new createjs.Shape();
  tile.graphics.beginFill("White").drawRoundRectComplex(0, 0, 5 * (TILESIZE + OFFSET) - OFFSET, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  var text =  new createjs.Text(text, TEXTTYPE, "#000000")
  text.x = TILESIZE/6
  text.y = TILESIZE/6
  tileGroup.addChild(tile)
  tileGroup.addChild(text)
  tileGroup.x = x;
  tileGroup.y = y;
  stage.addChild(tileGroup)
}
selectorTiles = []

function selectWordLength(length){
  score = 0
  plays = 0
  stage.removeAllChildren();
  var bitmap = new createjs.Bitmap(image);
  bitmap.scale = BGSCALE;
  stage.addChild(bitmap);
  square_size = length
  size = square_size;
  win_plays = square_size * 2 + (square_size - 2) * 2 - 1
  square_index = getRandomInt(0,WORDSQUARES[square_size].length/4);
  selected_index = 1
  letters = []
  for(i = 0; i < 4; i++){
    for(j = 0; j < square_size; j++){
      letters[4 * i + j] = (WORDSQUARES[square_size][square_index * 4 + i].substring(j,j+1));
      console.log(letters[4 * i + j])
    }
  }
  count = 0

  let uniqueChars = letters.filter((c, index) => {
      return letters.indexOf(c) === index;
  });
  inputText = uniqueChars//["C","A","D","E","K","E","H","P"]//,"M","B","I"]//["A","H","S","L","G","N
  inputText = shuffle(inputText)
  won = false
  drawInterface();
  //tiles[1][0].graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND,TILEROUND, TILEROUND, TILEROUND);
  stage.update();
}

function drawHomeButton(){
  var tileGroup = new createjs.Container();
  var tile = new createjs.Shape();
  tile.graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  var text =  new createjs.Text("\u2302", TEXTTYPE, "#000000")
  tile.addEventListener("click", function(event) {
    window.open("https://intersexmusic.com");
  });
  text.textAlign = 'center';
  text.x = TILESIZE/2
  text.y = TILESIZE/8
  tileGroup.x = 0;
  tileGroup.y = 0;
  tileGroup.addChild(tile)
  tileGroup.addChild(text)
  stage.addChild(tileGroup)
}

function drawSelector(x,y){
  for(i = 0; i < 4; i++)
  {
    var tileGroup = new createjs.Container();
    selectorTiles[i] = new createjs.Shape();
    if(i == square_size - 2) {
      selectorTiles[i].graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
    }
    else {
      selectorTiles[i].graphics.beginFill("White").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
    }
    var text =  new createjs.Text(i+2, TEXTTYPE, "#000000")
    selectorTiles[i].index = i
    selectorTiles[i].addEventListener("click", function(event) {
      for(j = 0; j < 4; j++){
        selectorTiles[j].graphics.beginFill("White").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
      }
      console.log(event.target)
      event.target.graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
      stage.update();
      console.log("Index is")
      console.log(event.target.index)
      if(event.target.index + 2 != square_size){
        selectWordLength(event.target.index + 2)
      }
    })
    text.textAlign = 'center';
    text.x = TILESIZE/2
    text.y = TILESIZE/6
    tileGroup.addChild(selectorTiles[i])
    tileGroup.addChild(text)
    tileGroup.x = x + (OFFSET + TILESIZE) * i;
    tileGroup.y = y;
    stage.addChild(tileGroup)
    //selectorTiles[i] = [tile,text]
  }
  //
  var tileGroup = new createjs.Container();
  var tile = new createjs.Shape();
  tile.graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  var text =  new createjs.Text("\u21bb", TEXTTYPE, "#000000")
  tile.addEventListener("click", function(event) {
    console.log("Here")
    score = 0;
    plays = 0;
    stage.removeAllChildren();
    var bitmap = new createjs.Bitmap(image);
    bitmap.scale = BGSCALE;
    stage.addChild(bitmap);
    square_index = getRandomInt(0,WORDSQUARES[square_size].length/4);
    selected_index = 1
    letters = []
    for(i = 0; i < 4; i++){
      for(j = 0; j < square_size; j++){
        letters[4 * i + j] = (WORDSQUARES[square_size][square_index * 4 + i].substring(j,j+1));
        console.log(letters[4 * i + j])
      }
    }
    count = 0

    let uniqueChars = letters.filter((c, index) => {
        return letters.indexOf(c) === index;
    });
    inputText = uniqueChars//["C","A","D","E","K","E","H","P"]//,"M","B","I"]//["A","H","S","L","G","N
    inputText = shuffle(inputText)
    won = false
    drawInterface();
    //tiles[1][0].graphics.beginFill("Pink").drawRoundRectComplex(0, 0, TILESIZE, TILESIZE, TILEROUND,TILEROUND, TILEROUND, TILEROUND);
    stage.update();
  });
  text.textAlign = 'center';
  text.x = TILESIZE/2
  text.y = TILESIZE/6
  tileGroup.x = x + (OFFSET + TILESIZE) * 4;
  tileGroup.y = y;
  tileGroup.addChild(tile)
  tileGroup.addChild(text)
  stage.addChild(tileGroup)


}

function drawSubtitle(x,y,text){
  var tileGroup = new createjs.Container();
  var tile = new createjs.Shape();
  tile.graphics.beginFill("White").drawRoundRectComplex(0, 0, 7 * (TILESIZE + OFFSET) - OFFSET, TILESIZE/2, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  var text =  new createjs.Text(text, SUBTEXTTYPE, "#000000")
  text.x = TILESIZE/6
  text.y = TILESIZE/6/2
  tileGroup.addChild(tile)
  tileGroup.addChild(text)
  tileGroup.x = x;
  tileGroup.y = y;
  stage.addChild(tileGroup)
}
size = square_size;
var score_text;
function drawScore(x,y){
  var tileGroup = new createjs.Container();
  var tile = new createjs.Shape();
  tile.graphics.beginFill("Gold").drawRoundRectComplex(0, 0, 5 * (TILESIZE + OFFSET) - OFFSET, TILESIZE, TILEROUND, TILEROUND, TILEROUND, TILEROUND);
  score_text =  new createjs.Text("Score: " + score + "/" + total_score, TEXTTYPE, "#000000")
  score_text.x = TILESIZE/6
  score_text.y = TILESIZE/6
  tileGroup.addChild(tile)
  tileGroup.addChild(score_text)
  tileGroup.x = x;
  tileGroup.y = y;
  stage.addChild(tileGroup)
}

function drawInterface(){
  width = 5 * (TILESIZE + OFFSET) - OFFSET
  x = (window.innerWidth - width)/2;
  y = TILESIZE/2;
  drawTitle(x,y,"WordSquares")
  width = 7 * (TILESIZE + OFFSET) - OFFSET
  x = (window.innerWidth - width)/2;
  drawSubtitle(x,TILESIZE*2,"by Jasper Holton and Melissa Romeo")
  drawSelector((window.innerWidth - (TILESIZE + OFFSET) * 5)/2, TILESIZE*3)
  drawScore((window.innerWidth - (5 * (TILESIZE + OFFSET) - OFFSET))/2, window_height - ADHEIGHT - TILESIZE);
  drawWordSquare(size,0);
  drawInputSquares(size)
  drawHomeButton();
}

function keyUp(e){
    var value = String.fromCharCode(e.keyCode).toUpperCase();
    console.log(value)
    onPlay(value,tiles[selected_index][1],tiles[selected_index][0])
}
function handleImageLoad(event) {
    image = event.target;
    var bitmap = new createjs.Bitmap(image);
    bitmap.scale = BGSCALE;
    stage.addChild(bitmap);

    document.onkeyup = keyUp;
    drawInterface();
    stage.update();
}
