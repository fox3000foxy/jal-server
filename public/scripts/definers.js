width = 60
height = width * 3/4

//Tiles minimizer
gr = 'grass'
st = 'stone'
wa = 'water'
sa = 'sand'
//Type of tile
format = {
	"grass": "jpg",
	"stone": "jpg",
	"sand": "jpg",
	"water": "gif",
	"void": "jpg"
}
//Collisionnables
collisionables = [
	'void',
	'water'
]

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