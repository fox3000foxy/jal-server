var socket = io();
myId = false
kickTimeout = new Array()
playersAsked = false
socket.emit('getId', null);
socket.on('getId', function(msg) {
	console.log('A new player ask for an ID !')
	if(!myId) myId = msg.id
	coming()
});

function dummy() {
  	socket.emit('coming', {
		x: myCoordX,
		y: myCoordY,
		dir: 1,
		id: 99,
    name: "Dummy", 
		type: 'Humain',
	});
}

function coming(){
	socket.emit('coming', {
		x: myCoordX,
		y: myCoordY,
		dir: myDir,
		id: myId,
    name: localStorage.name, 
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
    name: msg.name, 
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
      name: players[player].name,
			me: 0
		}))
	})
  setTimeout(defineSokcketOfMove,2500)
	// playersAsked = true
})

function moving(){
	socket.emit('movement',{
		x: myCoordX,
		y: myCoordY,
		dir: myDir,
		id: myId,
		name: localStorage.name,
		type
	})
}

previousCoords = {}

function defineSokcketOfMove(){
  socket.on('movement',(msg)=>{
    // console.log(msg)
    if(msg.id==myId) return;
    var player = getPlayer(msg.id)
    if(player==null) {
      var newChar = CreateCharacter(createPlayer({
        type:msg.type,
        x: msg.x,
        y: msg.y,
        dir: msg.d,
        id: msg.id,
        name: msg.name,
        me: 0
      }))
      if(newChar) {
        playersList.appendChild()
        var player = getPlayer(msg.id)
      }
    }
    player.style.transform = `scaleX(${msg.dir})`;
    player.setAttribute('coordX',msg.x+"px")
    player.setAttribute('coordY',msg.y+"px")
    shadow = player.querySelector(".characterShadow")
    shadow.style.transform = `skew(${-msg.dir * 45}deg, 0deg)`
    shadow.style.left= (msg.dir * 15)+"px"
    nameTag = player.querySelector(".nameTag")
    nameTag.style.transform = `scaleX(${msg.dir})`;
    oldCoords = (previousCoords[msg.id] || {x:0,y:0})

    previousCoords[msg.id] = {
      x:msg.x,
      y:msg.y
    }
  })
}


function listPlayer() {
  var remainingIds = new Array()
  document.querySelectorAll("[id*=player]:not(#players):not(#playerme)").forEach((elem)=>{
    remainingIds.push(elem.id.split("player")[1])
  })
  return remainingIds
  console.log(remainingIds)
}

setInterval(()=>{
	socket.emit('setState',{
		state: (getPlayer("me").getAttribute('state') || "idle"),
		id: myId
	})

  heartbeat()
},500)

function heartbeat(){
  listPlayer().forEach(playerId=>{
    socket.emit('heartbeat',{id:myId,receiver:playerId})
    kickTimeout[parseInt(playerId)] = setTimeout(()=>{
      console.log("Clearing:",playerId)
      if(getPlayer(playerId)!=null){
        getPlayer(playerId).remove()
        socket.emit('leaving',{id:playerId})
      }
    },30000)
  })
}

socket.on('imHere',(msg)=>{
  clearTimeout(kickTimeout[parseInt(msg.emitter)])
  //console.log("Je suis ici ! (",msg.emitter,")")
})


socket.on('heartbeat',(msg)=>{
  //console.log("Demande de heartbeat")
  socket.emit('imHere',{
    emitter: myId,
    receiver: msg.emitter
  })
  //console.log('remainingPlayers:',remainingPlayers)
  /*document.querySelectorAll("[id*='player']").forEach(player=>{
    let playerId = player.getAttribute('id').split("player")[1]
    if(remainingPlayers.indexOf(playerId)==-1) {
      if(playerId!='me' && playerId!='s'){
        console.log("Player",playerId,"cleared")
        player.remove()
      }
    }
  })*/
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
	var newSrc = "assets/characters/"+characterType+"/"+msg.state+".gif"
	// var runSrc = "characters/"+characterType+"/run.gif"
	childs = [...player.children]
	childs.forEach((child)=>{
		if(child.src && child.src.indexOf(newSrc)==-1) child.src = newSrc
	})
})

socket.on('leaving',(msg)=>{
	if(getPlayer(msg.id)==null) return;
	console.log(msg)
	getPlayer(msg.id).remove()
})