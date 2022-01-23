//Constants
const mode = process.argv[0]
const PORT = (process.env.PORT || 4300)
let id = 0
let actualPlayers = {}
//Server
const express = require('express')
const http = require('http');
const { app, BrowserWindow } = require('electron')
const { Server } = require("socket.io");
const appli = express()
const server = http.createServer(appli);
const io = new Server(server);

appli.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/menu.html')
})
appli.use(express.static("public"))

io.on('connection', (socket) => {
  // console.log('A new player come !');
  
  socket.on('getId',(msg)=>{
	  id++
	  console.log("ID",id,"has been gived")
	  io.emit('getId',{id})
  })
  
  socket.on('coming',(msg)=>{
	  console.log("Incoming informations:",msg)
	  actualPlayers[msg.id] = msg
	  io.emit('newPlayer',msg)
  })
  
  socket.on('askExistingPlayers',(msg)=>{
	  io.emit('askExistingPlayers',actualPlayers)
  })
  
  socket.on('movement',(msg)=>{
	  // console.log("Movement:",msg)
	  actualPlayers[msg.id] = msg
	  io.emit('movement',msg)
  })

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

	  win.loadURL('http://localhost:'+PORT+'/logos.html')
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