var socket = io();
myId = false

socket.emit('getId', null);
socket.on('getId', function(msg) {
	console.log('A new player ask for an ID !')
	if(!myId) myId = msg.id
});

function coming(){
	socket.emit('coming', {
		x: myCoordX,
		y: myCoordY,
	});
}

socket.on('leaving',(msg)=>{
	document.getElementById("player"+msg.id).remove()
})