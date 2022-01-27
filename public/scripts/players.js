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

function createNPC(n){
  if(getPlayer(n.id)!=null) return;
	var npcElement = document.createElement('div')
	npcElement.setAttribute('class','character center')
	npcElement.setAttribute("player",n.type)
	npcElement.setAttribute("autoshadow","")
	npcElement.setAttribute("me",n.me)
	npcElement.setAttribute("coordX",(n.x || 0))
	npcElement.setAttribute("coordY",(n.y || 0))
	npcElement.setAttribute("id","player"+n.id)
  npcElement.setAttribute("nameTag",n.name)
	// console.log(p.dir)
	npcElement.setAttribute("style","transform: scaleX("+n.dir+");")
  npcElement.setAttribute("defaultDir",n.dir)
  //playerElement.setAttribute("style","transform: skew("+(-p.dir*45)+"deg,0deg);")
	return npcElement
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

CreateCharacter(createNPC({
	type:"Chevre",
	id: "Larry",
	dir: -1,
  name: "Larry",
	me: 0,
  x:"-1950px",
  y:"-155px"
}))//{"x":"-1950px","y":"-155px","d":-1}
