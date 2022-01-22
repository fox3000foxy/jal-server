function createPlayer(p){
	var playerElement = document.createElement('div')
	playerElement.setAttribute('class','character center')
	playerElement.setAttribute("player",p.type)
	playerElement.setAttribute("autoshadow","")
	playerElement.setAttribute("me",p.me)
	playerElement.setAttribute("coordX",(p.x || 0))
	playerElement.setAttribute("coordY",(p.y || 0))
	playerElement.setAttribute("id",p.id)
	return playerElement
}

me = createPlayer({
	type:"Human",
	id: "me",
	me: 1
})

// player1 = createPlayer({
	// type:"Fox",
	// id: 5,
	// me: 0
// })
// <div class="character center" player="Human" autoshadow me="1" coordX="-740" coordY="-857"></div>
playersList.appendChild(me)
// playersList.appendChild(player1)