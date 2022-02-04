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
  playerElement.setAttribute("nameTag",(p.name))
	// console.log(p.dir)
	playerElement.setAttribute("style","transform: scaleX("+p.dir+");")
  playerElement.setAttribute("defaultDir",(p.dir || 1))
  //playerElement.setAttribute("style","transform: skew("+(-p.dir*45)+"deg,0deg);")
	return playerElement
}

function createNPC(n){
  if(getPlayer(n.id)!=null) return;
  // if(n.map!=mapName) return;
	var npcElement = document.createElement('div')
	npcElement.setAttribute('class','character center')
	npcElement.setAttribute("player",n.type)
	npcElement.setAttribute("autoshadow","")
	npcElement.setAttribute("me",0)
	var npcX = ((n.x * (width*2)) - n.y * (height*2) ) + 90
	var npcY = n.y * (height*2) + 90
	npcElement.setAttribute("coordX",( npcX  || 0))
	npcElement.setAttribute("coordY",( npcY || 0))
	npcElement.setAttribute("id","npc"+n.id)
  npcElement.setAttribute("nameTag",(n.name || n.id))
	// console.log(p.dir)
	npcElement.setAttribute("style","transform: scaleX("+n.dir+");")
  npcElement.setAttribute("defaultDir",n.dir)
  if(n.dialog) npcElement.setAttribute('speechBubble','')
  if(n.dialog) npcElement.addEventListener('mousedown',()=>{
	  let distance = getDistance(
        Math.abs(myCoordX),
        Math.abs(myCoordY),
        Math.abs(npcX),
        Math.abs(npcY)
      )
	  console.log(distance)
    if(distance < 250) DialogUI(n.dialog,n.id)
  }) 
  //playerElement.setAttribute("style","transform: skew("+(-p.dir*45)+"deg,0deg);")
	return npcElement
}

getPlayer = (id)=>{return document.getElementById("player"+id)}

var type = localStorage.type
console.log("Youre playing:",type)
CreateCharacter(createPlayer({
	type,
	id: "me",
	dir: 1,
  name: localStorage.name,
	me: 1
}))

fetch('/npcs/'+mapName+'.json')
.then(res=>res.json())
.then(npcArrays=>{
	npcArrays.forEach(npc=>{
		console.log("creating npc:",npc)
		CreateCharacter(createNPC(npc))
	})
})