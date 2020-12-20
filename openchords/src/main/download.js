function getDate(){
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10)
  {
      dd='0'+dd;
  }

  if(mm<10)
  {
      mm='0'+mm;
  }
  today = mm+'-'+dd+'-'+yyyy;
  return today
}
var midi = new Midi()
// add a track
const track = midi.addTrack()

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var i = 0;
while(urlParams.get('name' + i) != null){
  track.addNote({
    name : urlParams.get('name' + i),
    time : urlParams.get('time' + i),
    duration: urlParams.get('duration' + i),
  });
  i = i + 1;
}
// Save the project
var saveByteArray = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, name) {
    var blob = new Blob(data, {type: "byte/stream"}),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());
saveByteArray([midi.toArray()], "intersexmusic.com/openchords-" + getDate() + ".mid");
