function createPlayer(p){
  if(getPlayer(p.id)!=null) return;
	var playerElement = document.createElement('div')
	playerElement.setAttribute('class','character center')
	playerElement.setAttribute("player",p.type)
	playerElement.setAttribute("autoshadow","")
	playerElement.setAttribute("me",p.me)
	playerElement.setAttribute("coordX",(p.x || 0))
	playerElement.setAttribute("coordY",(p.y || 0))
	playerElement.setAttribute("id","player"+p.id)
	// console.log(p.dir)
	playerElement.setAttribute("style","transform: scaleX("+p.dir+");")
	return playerElement
}

getPlayer = (id)=>{return document.getElementById("player"+id)}

var type = location.href.split("type=")[1]
CreateCharacter(createPlayer({
	type,
	id: "me",
	dir: 1,
	me: 1
}))
