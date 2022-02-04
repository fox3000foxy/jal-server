function createWarp(w){
	var warpElement = document.createElement('div')
	warpElement.setAttribute('class','character center')
	warpElement.setAttribute("coordX",(w.x || 0))
	warpElement.setAttribute("coordY",(w.y || 0))
	warpElement.setAttribute("id","warp"+w.id)
	return warpElement
}

function CreateWarp(characterElement,properties) {
    if (characterElement == null) return;
    mapBox.appendChild(characterElement)
    // console.log(characterElement)

    var character = document.createElement("img")
    var collisionBox = document.createElement("div")
    character.style.left = "0px"
    character.style.top = "0px"
    character.style.zIndex = "1"
	// character.style.height = "65px"
    characterElement.style.zIndex = "2"

    collisionBox.setAttribute('class', 'collisionBox')
    // /* Color the collision box of player*/ collisionBox.style.backgroundColor = 'green'
    collisionBox.style.position = 'absolute'
    collisionBox.style.width = '60px'
    collisionBox.style.height = '10px'
    collisionBox.style.left = '2px'
    collisionBox.style.top = '55px'
    collisionBox.style.zIndex = '3'
	if (debugMode) collisionBox.style.background = "magenta"

    characterElement.appendChild(character)
    characterElement.appendChild(collisionBox)
	// otherCharacters = document.querySelectorAll("*[id='0']")
	// otherCharacters.forEach(otherCharacter => {
	if(properties.direction == "right"){
		var coordX = parseInt(characterElement.getAttribute("coordx")) + 57
		var coordY = parseInt(characterElement.getAttribute("coordy")) - 84
		character.style.width = "23px"
		character.style.height = "88px"
		character.src = "/warps/door2.png"
		// collisionBox.style.transform = 'skew(-45deg,0deg)'
		collisionBox.style.top = (parseInt(collisionBox.style.top) + 25 )+"px"
	}
	else if(properties.direction == "down"){
		var coordX = parseInt(characterElement.getAttribute("coordx"))// - 42.5
		var coordY = parseInt(characterElement.getAttribute("coordy"))
		character.src = "/warps/door.png"
	}
	console.log(properties.direction)
	characterElement.style.left = coordX
	characterElement.style.top = coordY
	warping = false
	setInterval(()=>{
		// console.log(overlaps(collisionBox,getPlayer('me').querySelector(".collisionBox")).collide)
		if(warping == false){
			if(
				overlaps(collisionBox,getPlayer('me').querySelector(".collisionBox")).collide
			){
				let x = properties.warpDestinationX
				let y = properties.warpDestinationY
				let newX = ((x * (width*2)) - (y*(height*2)) + 90)
				let newY = ((y * (height*2)) + 90)
				// console.log(properties)
				warping=true;
				localStorage.coordinates = JSON.stringify({
						d: myDir,
						x: -newX+"px",
						y: -newY+"px"
				})
				localStorage.mapName = properties.warpDestination
				closingCircle(()=>{		
					location.reload()
				})
			}
		}
		
		playerY = getPlayer('me').getBoundingClientRect().bottom
		warpY = character.getBoundingClientRect().top
		
		if(playerY < warpY) characterElement.style.zIndex = "4"
		else characterElement.style.zIndex = "3"
	},50)
		// characterElement.style.transform= "skew(0deg, 315deg)"
		/*characterElement.style.zIndex = "2"
		if (myCoordY > coordY) otherCharacter.style.zIndex = "3"
		else otherCharacter.style.zIndex = "1"*/
	// })
}

fetch('/warps/'+mapName+'.json')
.then(res=>res.json())
.then(warpArrays=>{
	warpArrays.forEach(warp=>{
		console.log(warp)
		var warpX = (warp.x * width) - (warp.y*height)
		var warpY = warp.y * (height*2) + 121
		CreateWarp(createWarp({
			...warp,
			"x": warpX,
			"y": warpY
		}),warp)
	})
})