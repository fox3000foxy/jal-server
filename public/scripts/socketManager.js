var socket = io();
myId = false
playersAsked = false
socket.emit('getId', null);
socket.on('getId', function(msg) {
	console.log('A new player ask for an ID !')
	if(!myId) myId = msg.id
	coming()
});

function coming(){
	socket.emit('coming', {
		x: myCoordX,
		y: myCoordY,
		dir: myDir,
		id: myId,
		type,
	});
	socket.emit('askExistingPlayers',null)
}

socket.on('newPlayer',(msg)=>{
	if(msg.id!=myId)
	CreateCharacter(createPlayer({
		type:msg.type,
		x: msg.x,
		y: msg.y,
		dir: msg.dir,
		id: msg.id,
		me: 0
	}))
})

socket.on('askExistingPlayers',(players)=>{
	// if(playersAsked) return;
	Object.keys(players).forEach((player)=>{
		if(players[player].id==myId) return;
		if(players[player].id==false) return;
		if(getPlayer(players[player].id)!=null) return;
		// console.log(players[player])
		CreateCharacter(createPlayer({
			type:players[player].type,
			x: players[player].x,
			y: players[player].y,
			dir: players[player].d,
			id: players[player].id,
			me: 0
		}))
	})
	// playersAsked = true
})

function moving(){
	socket.emit('movement',{
		x: myCoordX,
		y: myCoordY,
		dir: myDir,
		id: myId,
		type
	})
}

previousCoords = {}

socket.on('movement',(msg)=>{
	// console.log(msg)
	if(msg.id==myId) return;
	var player = getPlayer(msg.id)
	if(player==null) return
	player.style.transform = `scaleX(${msg.dir})`;
	player.setAttribute('coordX',msg.x+"px")
	player.setAttribute('coordY',msg.y+"px")
	oldCoords = (previousCoords[msg.id] || {x:0,y:0})

	previousCoords[msg.id] = {
		x:msg.x,
		y:msg.y
	}
	// player.style.top = myCoordY - msg.y
})

setInterval(()=>{
	socket.emit('setState',{
		state: (getPlayer("me").getAttribute('state') || "idle"),
		id: myId
	})

  socket.emit('heartbeat',null)
},50)

socket.on('heartbeat',(remainingPlayers)=>{
  //console.log('remainingPlayers:',remainingPlayers)
  document.querySelectorAll("[id*='player']").forEach(player=>{
    let playerId = player.getAttribute('id').split("player")[1]
    if(remainingPlayers.indexOf(playerId)==-1) {
      if(playerId!='me' && playerId!='s'){
        console.log("Player",playerId,"cleared")
        player.remove()
      }
    }
  })
})

socket.on('timeOut',(msg)=>{
  console.log(myId,msg.id)
  if(myId==msg.id) location.href='menu.html'

})

socket.on('setState',(msg)=>{
	if(getPlayer(msg.id)==null) return;
	var player = getPlayer(msg.id)
	// console.log(msg)
	var characterType = player.getAttribute("player")
	var newSrc = "characters/"+characterType+"/"+msg.state+".gif"
	// var runSrc = "characters/"+characterType+"/run.gif"
	childs = [...player.children]
	childs.forEach((child)=>{
		if(child.src.indexOf(newSrc)==-1) child.src = newSrc
	})
})

socket.on('leaving',(msg)=>{
	if(getPlayer(msg.id)==null) return;
	console.log(msg)
	getPlayer(msg.id).remove()
})