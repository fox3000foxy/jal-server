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
  playerElement.setAttribute("nameTag",p.name)
	// console.log(p.dir)
	playerElement.setAttribute("style","transform: scaleX("+p.dir+");")
  playerElement.setAttribute("defaultDir",p.dir)
  //playerElement.setAttribute("style","transform: skew("+(-p.dir*45)+"deg,0deg);")
	return playerElement
}

getPlayer = (id)=>{return document.getElementById("player"+id)}

var type = qs.type
console.log("Youre playing:",type)
CreateCharacter(createPlayer({
	type,
	id: "me",
	dir: 1,
  name: qs.name,
	me: 1
}))

{"x":"-1950px","y":"-155px","d":-1}
