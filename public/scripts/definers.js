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
	"water": "gif"
}

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