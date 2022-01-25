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