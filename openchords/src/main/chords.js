var chordsContainer
var octave = 3


var chordMarkers = []
var recordedChords = []

// Lengths of the chord
var chordLengths = []
// and for playback
var playbackChordLengths = []

// 9 synths
var synths = []

// Called when chord is played
function chordCallback(chordNumber){

  // Stop all all synths
  for(var i = 0; i < synths.length; i++){
    synths[i].triggerRelease();
  }

  var chordLength;
  if(playbackChordLengths[chordNumber] == "⅛"){
    chordLength = "8n"
  } else if(playbackChordLengths[chordNumber] == "¼"){
    chordLength = "4n"
  } else if(playbackChordLengths[chordNumber] == "½"){
    chordLength = "2n"
  } else if(playbackChordLengths[chordNumber] == "¾"){
    chordLength = "1n"
  } else if(playbackChordLengths[chordNumber] == "1"){
    chordLength = "1n"
  }
  for(var i = 0; i < playbackChords[chordNumber].length; i++){
    synths[i].triggerAttackRelease(playbackChords[chordNumber][i], chordLength)
  }
}

// Called when chord is selected
function playChord(chordNumber){
  if(recordedChords[chordNumber] != null){
    // Stop all all synths
    for(var i = 0; i < synths.length; i++){
      synths[i].triggerRelease();
    }

    var chordLength
    if(chordLengths[chordNumber] == "⅛"){
      chordLength = "8n"
    } else if(chordLengths[chordNumber] == "¼"){
      chordLength = "4n"
    } else if(chordLengths[chordNumber] == "½"){
      chordLength = "2n"
    } else if(chordLengths[chordNumber] == "¾"){
      chordLength = "1n"
    } else if(chordLengths[chordNumber] == "1"){
      chordLength = "1n"
    }
    for(var i = 0; i < recordedChords[chordNumber].length; i++){
      synths[i].triggerAttackRelease(recordedChords[chordNumber][i], chordLength)
    }
  }
}

function clearChords(){
  for (var i = 0; i < recordedChords.length; i++){
    if(recordedChords[i]){
      for(var j = 0; j < 9; j++){
        chordMarkers[i][j].visible = false
      }
    }
  }
  recordedChords = []
  clearChordLabels()
}

function deleteChord(){
  for(var j = 0; j < 9; j++){
    chordMarkers[selectedMeasure][j].visible = false
  }
  recordedChords[selectedMeasure] = null
  chordLabels[selectedMeasure].visible = false
  chordLengths[selectedMeasure] = null
}
function clearChords(){
  for (var i = 0; i < recordedChords.length; i++){
    for(var j = 0; j < 9; j++){
      chordMarkers[i][j].visible = false
    }
    recordedChords[i] = null
    chordLabels[i].visible = false
    chordLengths[i] = null
  }
}
var chordModes = []
var chordNames = []
var chordOctaves = []
var recordedChordNotes = []
var recordedSeventh = []
var recordedNinth = []
var recordedThirteenth = []
var recAddSeventh = []
var recAddNinth = []
var recAddThirteenth = []
var recordedChordNums = []
var recordedOctaves = []

function transposeChords(diff){
  // These are the raw numerical values for the notes in the chord, as an array
  for (var j = 0; j < recordedChords.length; j++){
    if(chordNames[j] != null){
      chordName = chordNames[j]
      var notes = []
    // Build the chord
    console.log("Transposing chord")
    for(var i = 0; i < notesInChord; i++)
    {
        if (i < 3) {
          notes[i] = chordNotes[chordKeys[currentInterval][currentKey][chordName]][chordModes[j]][i] + (recordedOctaves[j] * 12) + 3
        }
        if(i >= 3){
          notes[i] = chordNotes[chordKeys[currentInterval][currentKey][chordName]][chordModes[j]][i-3] + ((recordedOctaves[j]-1) * 12) + 3
        }
        // Record the note as it falls on the keyboard, no longer numerical but a string value
        recordedChords[j][i] = keyboard[notes[i]]
        chordMarkers[j][i].y =  KEYSIZE * (-1 * ((notes[i]+1)) + numKeys)
        chordMarkers[j][i].visible = true;
    }
    var note
    // For adding the seventh, ninth and thirteenth
    if(recAddSeventh[j]){
      note = chordNotes[chordKeys[currentInterval][currentKey][chordName]][3][0] + ((recordedOctaves[j]) * 12) + 3
      chordMarkers[selectedMeasure][notesInChord+0].y =  KEYSIZE * (-1 * ((note+1)) + numKeys)
      chordMarkers[selectedMeasure][notesInChord+0].visible = true
    }
    if(recAddNinth[j]){
      note = chordNotes[chordKeys[currentInterval][currentKey][chordName]][3][1] + ((recordedOctaves[j]) * 12) + 3
      chordMarkers[selectedMeasure][notesInChord+1].y =  KEYSIZE * (-1 * ((note+1)) + numKeys)
      chordMarkers[selectedMeasure][notesInChord+1].visible = true
      recordedNinth[selectedMeasure] = note
      recAddNinth[selectedMeasure] = true

    }
    if(recAddThirteenth[j]){
      note = chordNotes[chordKeys[currentInterval][currentKey][chordName]][3][2] + ((recordedOctaves[j]) * 12) + 3
      chordMarkers[selectedMeasure][notesInChord+2].y =  KEYSIZE * (-1 * ((note+1)) + numKeys)
      chordMarkers[selectedMeasure][notesInChord+2].visible = true
      recordedThirteenth[selectedMeasure] = note
      recAddThirteenth[selectedMeasure] = true
    }
    chordLabels[j].text = chordKeys[currentInterval][currentKey][chordName] + " " + noteLength
  } //recordedChords[j]
  }
}
function touchStarted() {
  Tone.start();
}

function addChordMarkers() {
  chordsContainer = new createjs.Container()
  stage.addChild(chordsContainer)
  chordsContainer.y = KEYSIZE * -25

  for (var i = 0; i < 8; i++){
    chordMarkers[i] = []
    for(var j = 0; j < 9; j++){
      chordMarkers[i][j] = new createjs.Shape();
      chordMarkers[i][j].graphics.beginFill("White")
      chordMarkers[i][j].graphics.drawRect(KEYSIZE+((stage.canvas.width-KEYSIZE)/8) * i,0, (stage.canvas.width-KEYSIZE)/8, KEYSIZE);
      chordMarkers[i][j].visible = false
      chordsContainer.addChild(chordMarkers[i][j]);
    }
  }
}


// Add a chord
function chord(chordName) {
  touchStarted()
  //chordModes[selectedMeasure] = chordMode
  chordOctaves[selectedMeasure] = octave
  chordNames[selectedMeasure] = chordName
  recordedOctaves[selectedMeasure] = octave
  if(chordLabels[selectedMeasure] == null){
    addMeasure(selectedMeasure)
  }
  chordModes[selectedMeasure] = chordMode



  if(noteLength == "⅛"){
    chordLength = "8n"
  } else if(noteLength == "¼"){
    chordLength = "4n"
  } else if(noteLength == "½"){
    chordLength = "2n"
  } else if(noteLength == "¾"){
    chordLength = "1n"
  } else if(noteLength == "1"){
    chordLength = "1n"
  }

  // Delete the chord that was there and remove the markers
  deleteChord(selectedMeasure)
  chordLengths[selectedMeasure] = noteLength;
  recordedChords[selectedMeasure] = []
  recordedChordNums[selectedMeasure] = []
  // These are the raw numerical values for the notes in the chord, as an array
  var notes = []
  // Build the chord
  for(var i = 0; i < notesInChord; i++)
  {
    // First part of the chord
    if (i < 3) {
      notes[i] = chordNotes[chordKeys[currentInterval][currentKey][chordName]][chordMode][i] + (octave * 12) + 3
    }
    if(i >= 3){
      notes[i] = chordNotes[chordKeys[currentInterval][currentKey][chordName]][chordMode][i-3] + ((octave-1) * 12) + 3
    }
    // Record the note as it falls on the keyboard, no longer numerical but a string value
    recordedChords[selectedMeasure][i] = keyboard[notes[i]]
    recordedChordNums[selectedMeasure][i] = notes[i]
    synths[i].triggerAttackRelease(recordedChords[selectedMeasure][i], chordLength)
    chordMarkers[selectedMeasure][i].y =  KEYSIZE * (-1 * ((notes[i]+1)) + numKeys)
    chordMarkers[selectedMeasure][i].visible = true;
  }
  recordedChordNotes[selectedMeasure] = notes
  var note
  // For adding the seventh, ninth and thirteenth
  recAddSeventh[selectedMeasure] = false
  recAddNinth[selectedMeasure] = false
  recAddThirteenth[selectedMeasure] = false
  if(addSeventh){
    note = chordNotes[chordKeys[currentInterval][currentKey][chordName]][3][0] + ((octave) * 12) + 3
    recordedChords[selectedMeasure][notesInChord+0] = keyboard[note]
    recordedChordNums[selectedMeasure][notesInChord+0] = note
    synths[notesInChord+0].triggerAttackRelease(recordedChords[selectedMeasure][notesInChord+0], chordLength)
    chordMarkers[selectedMeasure][notesInChord+0].y =  KEYSIZE * (-1 * ((note+1)) + numKeys)
    chordMarkers[selectedMeasure][notesInChord+0].visible = true
    recordedSeventh[selectedMeasure] = note
    recAddSeventh[selectedMeasure] = true
  }
  if(addNinth){

    note = chordNotes[chordKeys[currentInterval][currentKey][chordName]][3][1] + ((octave) * 12) + 3
    recordedChords[selectedMeasure][notesInChord+1] = keyboard[note]
    recordedChordNums[selectedMeasure][notesInChord+1] = note
    synths[notesInChord+1].triggerAttackRelease(recordedChords[selectedMeasure][notesInChord+1], chordLength)
    chordMarkers[selectedMeasure][notesInChord+1].y =  KEYSIZE * (-1 * ((note+1)) + numKeys)
    chordMarkers[selectedMeasure][notesInChord+1].visible = true
    recordedNinth[selectedMeasure] = note
    recAddNinth[selectedMeasure] = true

  }
  if(addThirteenth){

    note = chordNotes[chordKeys[currentInterval][currentKey][chordName]][3][2] + ((octave) * 12) + 3
    recordedChords[selectedMeasure][notesInChord+2] = keyboard[note]
    recordedChordNums[selectedMeasure][notesInChord+2] = note
    synths[notesInChord+2].triggerAttackRelease(recordedChords[selectedMeasure][notesInChord+2], chordLength)
    chordMarkers[selectedMeasure][notesInChord+2].y =  KEYSIZE * (-1 * ((note+1)) + numKeys)
    chordMarkers[selectedMeasure][notesInChord+2].visible = true
    recordedThirteenth[selectedMeasure] = note
    recAddThirteenth[selectedMeasure] = true
  }

  chordLabels[selectedMeasure].visible = true;
  chordLabels[selectedMeasure].text = chordKeys[currentInterval][currentKey][chordName] + " " + noteLength
}

function updateChord(){
  if(chordNames[selectedMeasure]){
    chord(chordNames[selectedMeasure])
  }
}
// 9 + 1 synths (for chord and bass)
function addSynths(){
  for (var i = 0; i < 10; i++){
    synths[i] = SampleLibrary.load({
      instruments: "piano",
      ext: ".mp3"
    });

    synths[i].toMaster();
  }
}
var currentChord = 0
var waitTime = 0

function addChordPlayer(){

  setInterval(function(){
    if(currentChord < playbackChords.length && playbackChords[currentChord] != null){
      chordCallback(currentChord)
    }
    currentChord++
  },PLAYBACKSPEED)
}
// Play the chords back
function playbackRecordedChords(){
  currentChord = 0
  playbackChords = []
  playbackChordLengths = []
  // What this does is optimize an array of recorded chords to an array of chords for playback with correct timing
  //console.log(recordedChords.length)
  for(var i = 0; i < recordedChords.length; i++) {
    playbackChords[currentChord] = recordedChords[i] // Set playback to current chord
    playbackChordLengths[currentChord] = chordLengths[i]
    if(chordLengths[i] == "⅛"){
      currentChord = currentChord + 1
    } else if(chordLengths[i] == "¼"){
      currentChord = currentChord + 2
    } else if(chordLengths[i] == "½"){
      currentChord = currentChord + 4
    } else if(chordLengths[i] == "¾"){
      currentChord = currentChord + 6
    } else if(chordLengths[i] == "1"){
      currentChord = currentChord + 8
    }
  }
  currentChord = 0
}
function addChords(){
  addSynths();
  addChordMarkers();
  addChordPlayer();
}2
