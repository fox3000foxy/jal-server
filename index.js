//Constants
const PORT = (process.env.PORT || 4300)
let id = 0
let actualPlayers = {}
let timeOut = {}
//Server
const express = require('express')
const http = require('http');
const { app, BrowserWindow } = require('electron')
const { Server } = require("socket.io");
var cors = require('cors')
const fs = require('fs')
const appli = express()
const server = http.createServer(appli);
const io = new Server(server);

appli.use(cors())

appli.get('/', (req, res) => { res.sendFile(__dirname + '/public/logos.html') })
appli.get('/isJALserver', (req, res) => { res.send(200) })
appli.get('/allCharacters', (req, res) => {
   res.send(JSON.stringify(fs.readdirSync('./public/assets/characters')))
})
appli.get('/favicon.ico',(req,res)=>{
  res.sendFile(__dirname+"/public/assets/icon.png")
})
appli.get('/allTiles.js', (req, res) => {
  let dirFiles = fs.readdirSync('./public/assets/tiles')
  for (i = 0; i < dirFiles.length; i++) {
    dirFiles[i] = dirFiles[i].split(".")[0]
  }
  res.send('AllTiles = ' + JSON.stringify(dirFiles))
})
appli.get('/allMaps', (req, res) => {
  let dirFiles = fs.readdirSync('./public/maps')
  for (i = 0; i < dirFiles.length; i++) {
    dirFiles[i] = dirFiles[i].split(".json")[0]
  }
  res.send(JSON.stringify(dirFiles))
})
appli.get('/allStructures.js', (req, res) => {
  let dirFiles = fs.readdirSync('./public/assets/structures')
  for (i = 0; i < dirFiles.length; i++) {
    dirFiles[i] = dirFiles[i].split(".")[0]
  }
  res.send('AllStructures = ' + JSON.stringify(dirFiles))
})
appli.use(express.static("public"))

io.on('connection', (socket) => {
  socket.on('getId', (msg) => {
    id++
    //console.log("ID", id, "has been gived")
    io.emit('getId', { id })
  })

  socket.on('heartbeat', (msg) => {
    io.emit('heartbeat', {
      emitter: msg.id,
      receiver: msg.receiver
    })
  })

  socket.on("saveMap",({mapName,mapDataEdited,npcDataEdited,warpDataEdited})=>{
    fs.writeFileSync("./public/maps/"+mapName+".json",
      JSON.stringify(mapDataEdited,null,2)
    )
	fs.writeFileSync("./public/npcs/"+mapName+".json",
      JSON.stringify(npcDataEdited,null,2)
    )
	fs.writeFileSync("./public/warps/"+mapName+".json",
      JSON.stringify(warpDataEdited,null,2)
    )
  })

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg)
  })

  socket.on('imHere', (msg) => {
    io.emit('imHere', {
      emitter: msg.emitter,
      receiver: msg.receiver
    })
  })
  
  socket.on('createMap',(msg) => {
	  // console.log("CreatingMap")
	  let createdArray = new Array()
	  lineLength = new Array(20)
	  for (i=0;i<10;i++) {
		createdArray.push(lineLength)
	  }
		fs.writeFileSync("./public/maps/"+msg+".json",JSON.stringify(createdArray,null,2))
		fs.writeFileSync("./public/npcs/"+msg.mapName+".json",JSON.stringify([],null,2))
		fs.writeFileSync("./public/warps/"+msg.mapName+".json",JSON.stringify([],null,2))

  })
  
  // socket.on('missingFile',(msg) => {
		// fs.writeFileSync("./public/"+msg.label+"/"+msg.mapName+".json",
		  // JSON.stringify([],null,2)
		// )
  // })
  
  socket.on('deleteMap',(msg) => {
	fs.unlinkSync("./public/maps/"+msg+".json")
	fs.unlinkSync("./public/npcs/"+msg+".json")
	fs.unlinkSync("./public/warps/"+msg+".json")
  })

  socket.on('coming', (msg) => {
    actualPlayers[msg.id] = msg
    io.emit('newPlayer', msg)
  })

  socket.on('askExistingPlayers', (msg) => {
    io.emit('askExistingPlayers', actualPlayers)
  })

  socket.on('movement', (msg) => {
    actualPlayers[msg.id] = msg
    io.emit('movement', msg)
  })

  socket.on('setState', (msg) => {
    io.emit('setState', msg)
  })

  socket.on('leaving', (msg) => {
    msg.id = parseInt(msg.id)
    //console.log("ID", msg.id, "has been removed")
    delete actualPlayers[msg.id]
    io.emit('leaving', { id: msg.id })
  })

  socket.on('disconnect', () => {
  });

  socket.on('quit', () => {
    if (app) process.exit()
  })
});

server.listen(PORT, () => {
  console.log("Server started at port", PORT)
})

//Front
// if(mode=="electron")
if (app) {
  const path = require('path')

  function createWindow() {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      },
       icon: __dirname + '/public/assets/icon.png'
    })

    win.loadURL('http://localhost:' + PORT + '/logos.html')
    // win.setMenu(null)
    // win.setFullScreen(true);
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
    if (process.platform !== 'darwin') { app.quit() }
  })
}