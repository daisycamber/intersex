window.onload = function(){
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
  var extra = "";
  if (window.location.hash) {
     extra = window.location.hash.replace("#", "%23")
  }
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString + extra);
  console.log(urlParams.get('length'));
  
  var i = 0;
  for(i = 0; i < parseInt(urlParams.get('length')); i++){
    track.addNote({
      name : urlParams.get('name' + i),
      time : parseFloat(urlParams.get('time' + i)),
      duration: parseFloat(urlParams.get("duration" + i)),
    });
    console.log("Addded note");
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
  saveByteArray([midi.toArray()], "Uglek.com - OpenChords - " + getDate() + ".mid");
}
