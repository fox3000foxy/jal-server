debugMode = 0
width = 60
height = width * 3 / 4

//Tiles minimizer
if(location.href.indexOf("index.html")!=-1) {
  structures = [...AllStructures]
  let AllPlacableBox = AllTiles.concat(AllStructures)
  AllPlacableBox.forEach((img)=>{
    //if(img!="voidOld")
    //eval(img.substr(0,2)+' = "'+img+'"')
  })

  //Collisionnables
  collisionables = structures.concat([
      'void',
      'water'
  ])

  //Define the tile size
  Module.defineStyle(`
    html {
      --width: ${width+1}px;
      --height: ${height+1}px
    }
  `)

  //Elements
  mapElement = document.getElementById('map')
  mapBox = document.getElementById('mapBox')
  playersList = document.getElementById('players')
}


//Main functions
function QueryStringToJSON() {
    var pairs = location.search.slice(1).split('&');

    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

var qs = QueryStringToJSON();

var dialogUi = document.getElementById("dialogUI")
if(dialogUi) {
  function DialogUI(dialogId,dialogSpeaker) {
    dialogUi.src = "dialog.html?dialogId="+dialogId+"&speaker="+dialogSpeaker+"&mapName="+mapName
  }
  dialogUi.onload = ()=>{
    dialogUi.style.display = 'block'
  }

}

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}
/*
function zoom(event) {
  event.preventDefault();
  scale += event.deltaY/100 * -0.125;
  if(scale < 1.125) {scale = 1.125}
  else if(scale > 1.75) {scale = 1.75}
  document.body.style.transform = `scale(${scale})`;
}

let scale = 1.125;
document.body.onwheel = zoom;*/