//Constants
const mode = process.argv[0]
const PORT = (process.env.PORT || 4300)
let id = 0
let actualPlayers = {}
let timeOut = {}
//Server
const express = require('express')
const http = require('http');
const { app, BrowserWindow } = require('electron')
const { Server } = require("socket.io");
const appli = express()
const server = http.createServer(appli);
const io = new Server(server);

appli.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/logos.html')
})
appli.get('/isJALserver',(req,res)=>{
	res.send(200)
})
appli.use(express.static("public"))

io.on('connection', (socket) => {
  // console.log('A new player come !');
  
  socket.on('getId',(msg)=>{
	  id++
	  console.log("ID",id,"has been gived")
	  io.emit('getId',{id})
  })

  socket.on('heartbeat',(msg)=>{
    io.emit('heartbeat',{
      emitter: msg.id,
      receiver: msg.receiver
    })
  })

  socket.on('imHere',(msg)=>{
    //console.log("im here from",msg.emitter)
    io.emit('imHere',{
      emitter: msg.emitter,
      receiver: msg.receiver
    })
  })
  
  socket.on('coming',(msg)=>{
	  ////console.log("Incoming informations:",msg)
	  actualPlayers[msg.id] = msg
	  io.emit('newPlayer',msg)
  })
  
  socket.on('askExistingPlayers',(msg)=>{
	  io.emit('askExistingPlayers',actualPlayers)
  })
  
  socket.on('movement',(msg)=>{
	  // console.log("Movement:",msg)
	  actualPlayers[msg.id] = msg
    //timeOut[msg.id] = 3
    //console.log("Move:",msg)
	  io.emit('movement',msg)
  })

  setInterval(()=>{
    Object.keys(timeOut).forEach((key)=>{
      timeOut[key]--
      //if(timeOut[key]==0)
      //io.emit('leaving',{id:parseInt(key)})
      //io.emit('timeOut',{id:parseInt(key)})
    })
  },1000)

  socket.on('setState',(msg)=>{
	  // console.log("Movement:",msg)
	  io.emit('setState',msg)
  })
  
  socket.on('leaving',(msg)=>{
	  console.log("ID",msg.id,"has been removed")
	  delete actualPlayers[msg.id]
	  io.emit('leaving',{id:msg.id})
  })
  
  socket.on('disconnect', () => {
    // console.log('Disconnection !');
  });
  
  socket.on('quit',()=>{
	  if(app) process.exit()
  })
});

server.listen(PORT,()=>{
	console.log("Server started at port",PORT)
})

//Front
// if(mode=="electron")
if(app) {
	const path = require('path')

	function createWindow () {
	  const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
		  preload: path.join(__dirname, 'preload.js')
		}
	  })

	  win.loadURL('http://localhost:'+PORT+'/start.html')
	  win.setMenu(null)
	  win.setFullScreen(true);
	}

	app.whenReady().then(() => {
	  createWindow()
	  app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
		  createWindow()
		}
	  })
	})

	app.on('window-all-closed', () => {
	  if (process.platform !== 'darwin') {app.quit()}
	})
}