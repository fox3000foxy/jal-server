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

window.addEventListener('beforeunload',()=>{
	socket.emit('leaving',myId)
})

socket.on('leaving',(msg)=>{
	document.getElementById("player"+msg.id).remove()
})