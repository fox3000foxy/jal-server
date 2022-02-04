function QueryStringToJSON() {
    var pairs = location.search.slice(1).split('&');

    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
}

var qs = QueryStringToJSON();
mapSelected = location.href.split("?edit=")[1]
var socket = io()
selectedModel = "grass"
selectedMode = "tiles"
mapDataEdited = null
mousedown = false
window.addEventListener('mousedown', () => {mousedown = true})
window.addEventListener('mouseup', () => {mousedown = false})

mapListElem = document.getElementById("mapList")
mapEditor = document.getElementById("mapEditor")
tileChoices = document.getElementById("tileChoices")

function allMapsRequest() {
    mapListElem.innerHTML = ''
    fetch('/allMaps')
        .then(res => res.json())
        .then((mapList) => {
            allMaps = mapList
            mapList.forEach((mapName) => {
                let option = document.createElement('option')
                option.value = mapName
                option.innerText = mapName
                mapListElem.appendChild(option)
            })

            mapListElem.addEventListener('change', () => {
                setTimeout(() => {
                    getMapData(mapListElem.options[mapListElem.selectedIndex].value)
                })
            })

            if (qs.edit && allMaps.indexOf(qs.edit) != -1)
                mapListElem.selectedIndex = allMaps.indexOf(qs.edit)
            else
                mapListElem.selectedIndex = 0
            getMapData(mapListElem.value)
        })
}
allMapsRequest()

function getMapData(map) {
    fetch('/maps/' + map + '.json')
        .then(res => res.json())
        .then((mapData) => {
            fetch('/npcs/' + map + '.json')
                .then(res => res.json())
                .then(npcData => {
                    fetch('/warps/' + map + '.json')
                        .then(res => res.json())
                        .then(warpData => {
                            refreshMap(mapData, npcData, warpData)
                        }).catch(() => {
                            createDataFile(map, 'warps')
                        })
                }).catch(() => {
                    createDataFile(map, 'npcs')
                })
        })
}

function createDataFile(mapName, label) {
    // socket.emit('missingFile', {
        // mapName,
        // label
    // })
    // getMapData(mapName)
}
//A FAIRE

function createmap() {
    let mapName = prompt("Quel est le nom de la nouvelle carte ?")
    socket.emit('createMap', mapName)
    //code pour creer {mapname}.json
    location.href = "editor.html?edit=" + mapName
    //faire que ca select l'option <select>{mapname}</select>
}

function deletemap() {
    promptBox(
        `Êtes vous sur de vouloir supprimer cette map ?`,
        `Assurément !`,
        `Surtout pas !`,
        () => {
            socket.emit('deleteMap', mapListElem.value)
            allMapsRequest();
        }
    )
}

function promptBox(question, yesRes, noRes, yesCallback) {
    document.getElementById("errorLabel").innerText = question
    document.getElementById("errorButtonOK").innerText = yesRes
    document.getElementById("errorButtonCancel").innerText = noRes
    document.getElementById("errorButtonOK").onclick = () => {
        yesCallback()
        document.getElementById("errorButtonCancel").click()
    }
    document.getElementById("errorBox").style.display = 'block'
}


function deleteNpc(npcID) {
    // console.log(npcDataEdited)
    npcDataEdited = npcDataEdited.filter((el) => {
        return el.id !== npcID;
    });
    // console.log(npcDataEdited)
    refreshNPC(npcDataEdited)
    document.getElementById("errorBox").style.display = 'none'
	preventFromSave()
}

function refreshMap(mapData, npcData, warpData) {
    mapDataEdited = [...mapData]
    npcDataEdited = [...npcData]
    warpDataEdited = [...warpData]
    mapEditor.innerHTML = ""
    console.log("Refreshing map!")
    let tableElem = document.createElement('table')
    tableElem.setAttribute("cellspacing", "0")
    tableElem.setAttribute("cellpadding", "0")
    mapDataEdited.forEach((line, i) => {
        let lineElem = document.createElement('tr')
        //console.log(line.length)
        line.forEach((tile, j) => {
            let tileElem = document.createElement('td')
            tileElem.setAttribute('tileData', tile)
            let imgTile = document.createElement('img')
            imgTile.classList = ["tile"]
            imgTile.style.userSelect = "none"
            imgTile.style.width = (window.innerWidth / line.length) + "px"
            imgTile.style.height = ((window.innerHeight - 200) / mapDataEdited.length) + "px"
            imgTile.setAttribute("draggable", "false")
            window.addEventListener('resize', () => {
                imgTile.style.width = (window.innerWidth / line.length) + "px"
                imgTile.style.height = ((window.innerHeight - 200) / mapDataEdited.length) + "px"
            })
            imgTile.addEventListener('mousedown', () => {
                mapDataEdited[i][j] = selectedModel
                tileElem.setAttribute('tileData', selectedModel)
                if (selectedModel == "eraser")
                    imgTile.removeAttribute('src')
                else if (selectedMode == "warpCreation") {
                    createWarp()
                } else
                    imgTile.src = "/assets/" + selectedMode + "/" + selectedModel + ".png"
				preventFromSave()
            })
            imgTile.addEventListener('mouseover', () => {
                if (!mousedown) return;
                mapDataEdited[i][j] = selectedModel
                tileElem.setAttribute('tileData', selectedModel)
                if (selectedModel == "eraser")
                    imgTile.removeAttribute('src')
                else if (selectedMode == "warpCreation") {
                    // createWarp()
                } else
                    imgTile.src = "/assets/" + selectedMode + "/" + selectedModel + ".png"
				preventFromSave()
            })
            imgTile.ondragover = (ev) => {
                mousedown = false
                let calculedWidth = (window.innerWidth / mapDataEdited[0].length)
                let calculedHeight = ((window.innerHeight - 200) / mapDataEdited.length)
                let draggedId = draggedItem.id
                draggedItem.style.top = calculedHeight * i
                draggedItem.style.left = calculedWidth * j
                npcDataEdited.forEach((npc) => {
                    if (npc.id == draggedId) {
                        npc.x = j
                        npc.y = i
                    }
                })
                warpDataEdited.forEach((warp) => {
                    if (warp.id == draggedId) {
                        warp.x = j
                        warp.y = i
						// console.log(warp,"edited")
                    }
                })
				preventFromSave()
            }
            if (AllTiles.indexOf(tile) != -1) {
                //if(tile=='void') tile = 'voidOld'
                imgTile.src = "/assets/tiles/" + tile + '.png'
            } else if (AllStructures.indexOf(tile) != -1) {
                imgTile.src = "/assets/structures/" + tile + '.png'
            }
            tileElem.appendChild(imgTile)
            lineElem.appendChild(tileElem)
        })
        tableElem.appendChild(lineElem)
    })
    mapEditor.appendChild(tableElem)

    //NPC PART
    refreshNPC(npcDataEdited)
    refreshWarp(warpDataEdited)
}
npcMap = null
warpMap = null

function refreshNPC(npcDataEdited) {
    if (!npcMap) {
        npcMap = document.createElement('div')
    } else {
        npcMap.innerHTML = ""
    }
    npcMap.style.position = "absolute"
    npcMap.style.top = 0
    npcDataEdited.forEach((npc) => {
        let imgNPC = document.createElement('img')
        imgNPC.src = "/assets/characters/" + npc.type + "/idle.gif"
        imgNPC.classList = ["tile"]
        imgNPC.style.position = 'absolute'
        let calculedWidth = (window.innerWidth / mapDataEdited[0].length)
        let calculedHeight = ((window.innerHeight - 200) / mapDataEdited.length)
        imgNPC.style.width = calculedWidth + "px"
        imgNPC.id = npc.id
        imgNPC.style.height = calculedHeight + "px"
        imgNPC.style.left = calculedWidth * npc.x
        imgNPC.style.top = calculedHeight * npc.y
        imgNPC.ondragstart = (event) => {
            draggedItem = imgNPC
			preventFromSave()
        }
        imgNPC.oncontextmenu = () => {
            event.preventDefault()
            editNPC(imgNPC.id)
        }
        window.addEventListener('resize', () => {
            let calculedWidth = (window.innerWidth / mapDataEdited[0].length)
            let calculedHeight = ((window.innerHeight - 200) / mapDataEdited.length)
            imgNPC.style.width = calculedWidth + "px"
            imgNPC.style.height = calculedHeight + "px"
            imgNPC.style.left = calculedWidth * npc.x
            imgNPC.style.top = calculedHeight * npc.y
        })
        imgNPC.style.transform = `scaleX(${npc.dir})`
        imgNPC.onwheel = () => {
            npc.dir = -npc.dir
            imgNPC.style.transform = `scaleX(${npc.dir})`
			preventFromSave()
        }
        npcMap.appendChild(imgNPC)
    })
    mapEditor.appendChild(npcMap)
}

excludeTiles = ['door', 'door2', 'air', 'void', 'tour', 'voidOld']
AllTiles.forEach((tile) => {
    if (excludeTiles.indexOf(tile) != -1) return;
    let imgModel = document.createElement('img')
    imgModel.src = "/assets/tiles/" + tile + '.png'
    imgModel.classList = ["models"]
    imgModel.style.width = "40px"
    imgModel.style.userSelect = "none"
    imgModel.setAttribute("draggable", "false")
    imgModel.style.height = "40px"
    imgModel.style.marginLeft = "15px"
    if (tile == "grass") imgModel.style.border = "3px solid red";
    imgModel.addEventListener('mousedown', () => {
        document.querySelectorAll(".models").forEach((model) => {
            model.style.border = "";
        })
        imgModel.style.border = "3px solid red";
        selectedMode = "tiles"
        selectedModel = tile
    })
    tileChoices.appendChild(imgModel)
})

let eraser = document.createElement('img')
eraser.src = "/assets/eraser.png"
eraser.classList = ["models"]
eraser.style.width = "40px"
eraser.style.userSelect = "none"
eraser.setAttribute("draggable", "false")
eraser.style.height = "40px"
eraser.style.marginLeft = "15px"
eraser.addEventListener('mousedown', () => {
    document.querySelectorAll(".models").forEach((model) => {
        model.style.border = "";
    })
    eraser.style.border = "3px solid red";
    selectedMode = "tiles"
    selectedModel = "eraser"
})
tileChoices.appendChild(eraser)

let warpCreator = document.createElement('img')
warpCreator.src = "/warps/dirIndicator.png"
warpCreator.classList = ["models"]
warpCreator.style.width = "40px"
warpCreator.style.userSelect = "none"
warpCreator.setAttribute("draggable", "false")
warpCreator.style.height = "40px"
warpCreator.style.marginLeft = "15px"
warpCreator.addEventListener('mousedown', (ev) => {
    document.querySelectorAll(".models").forEach((model) => {
        model.style.border = "";
    })
    warpCreator.style.border = "3px solid red";
    selectedMode = "warpCreation"
})
tileChoices.appendChild(warpCreator)

var br = document.createElement('br')
tileChoices.appendChild(br)
AllStructures.forEach((structure) => {
    //if(excludeTiles.indexOf(tile)!=-1) return;
    let imgModel = document.createElement('img')
    imgModel.src = "/assets/structures/" + structure + '.png'
    imgModel.classList = ["models"]
    imgModel.style.width = "40px"
    imgModel.style.userSelect = "none"
    imgModel.setAttribute("draggable", "false")
    imgModel.style.height = "40px"
    imgModel.style.marginLeft = "15px"
    imgModel.style.border =
        imgModel.addEventListener('mousedown', () => {
            document.querySelectorAll(".models").forEach((model) => {
                model.style.border = "";
            })
            imgModel.style.border = "3px solid red";
            selectedMode = "structures"
            selectedModel = structure
        })
    tileChoices.appendChild(imgModel)
})

function save() {
    mapName = mapListElem.options[mapListElem.selectedIndex].value
    socket.emit("saveMap", {
        mapName,
        mapDataEdited,
        npcDataEdited,
		warpDataEdited
    })
	window.onbeforeunload = ()=>{return}
}

function addLine(direction) {
    mapXLengthmap = mapDataEdited[0].length
    voidLine = new Array()
    for (i = 0; i < mapXLengthmap; i++) {
        voidLine[i] = 'void'
    }
    if (direction == 0) {
        mapDataEdited.unshift(voidLine)
    }
    if (direction == 2) {
        mapDataEdited.forEach((line, i) => {
            mapDataEdited[i].push('void')
        })
    }
    if (direction == 3) {
        mapDataEdited.push(voidLine)
    }
    if (direction == 1) {
        mapDataEdited.forEach((line, i) => {
            mapDataEdited[i].unshift('void')
        })
    }
    refreshMap(mapDataEdited, npcDataEdited, warpDataEdited)
}

function removeLine(direction) {
    mapXLengthmap = mapDataEdited[0].length
    voidLine = new Array()
    for (i = 0; i < mapXLengthmap; i++) {
        voidLine[i] = 'void'
    }
    if (direction == 0) {
        mapDataEdited = mapDataEdited.slice(1, mapDataEdited.length)
    }
    if (direction == 2) {
        mapDataEdited.forEach((line, i) => {
            mapDataEdited[i] = mapDataEdited[i].slice(0, mapDataEdited[i].length - 1)
        })
    }
    if (direction == 3) {
        mapDataEdited = mapDataEdited.slice(0, mapDataEdited.length - 1)
    }
    if (direction == 1) {
        mapDataEdited.forEach((line, i) => {
            mapDataEdited[i] = mapDataEdited[i].slice(1, mapDataEdited[i].length)
        })
    }
    refreshMap(mapDataEdited, npcDataEdited, warpDataEdited)
}

function editNPC(npcID) {
    let theNpc = null
    npcDataEdited.forEach((npc) => {
        if (npc.id == npcID)
            theNpc = npc
    })
    document.getElementById("errorLabel").innerHTML = `
		Editing: ${npcID}<br><br><br>
		Name: <input id="npcName" value="${theNpc.name}"><br><br>
		Dialog ID : <input id="npcDialog" value="${theNpc.dialog}"><br><br>
		Type : <input id="npcType" value="${theNpc.type}"><br><br>
		<br><button onclick="deleteNpc('${theNpc.id}')">Supprimer<\/button>
	`
    document.getElementById("errorButtonOK").innerText = "Save"
    document.getElementById("errorButtonCancel").innerText = "Cancel"
    document.getElementById("errorButtonOK").onclick = () => {
        // console.log(nameValue,dialogValue)
        npcDataEdited.forEach((npc) => {
            if (npc.id == npcID) {
                npc.name = errorLabel.querySelector("#npcName").value
                npc.dialog = errorLabel.querySelector("#npcDialog").value
                npc.type = errorLabel.querySelector("#npcType").value
                document.getElementById(npcID).src = "/assets/characters/" + npc.type + "/idle.gif"
            }
        })
        document.getElementById("errorButtonCancel").click()
    }
    document.getElementById("errorBox").style.display = 'block'
	preventFromSave()
}

function createNpc() {
    document.getElementById("errorLabel").innerHTML = `
		Creating NPC:<br><br><br>
		ID: <input id="npcID" value=""><br><br>
		Name: <input id="npcName" value=""><br><br>
		Dialog ID : <input id="npcDialog" value=""><br><br>
		Type : <input id="npcType" value=""><br><br>
	`
    document.getElementById("errorButtonOK").innerText = "Save"
    document.getElementById("errorButtonCancel").innerText = "Cancel"
    document.getElementById("errorButtonOK").onclick = () => {
        // console.log(nameValue,dialogValue)
        npcDataEdited.push({
            "type": errorLabel.querySelector("#npcType").value,
            "name": errorLabel.querySelector("#npcName").value,
            "id": errorLabel.querySelector("#npcName").value,
            "dir": 1,
            "x": 0,
            "y": 0,
            "dialog": errorLabel.querySelector("#npcDialog").value
        })
        document.getElementById("errorButtonCancel").click()
        refreshNPC(npcDataEdited)
    }
    document.getElementById("errorBox").style.display = 'block'
	preventFromSave()
}

function createWarp() {
	// console.log("Creating warp")
    document.getElementById("errorLabel").innerHTML = `
		Creating Warp:<br><br><br>
		ID: <input id="warpID" value=""><br><br>
		Destination: <select id="warpDestination"><\/select><br><br>
		X Destination: <input type="number" id="warpDestinationX" style="width:150px"><br>
		Y Destination: <input type="number" id="warpDestinationY" style="width:150px"><br>
	`
    //Name: <input id="npcName" value=""><br><br>
    //Dialog ID : <input id="npcDialog" value=""><br><br>
    //Type : <input id="npcType" value=""><br><br>
    let warpCreatorWarpDestinationElem = document.getElementById("errorLabel").querySelector("#warpDestination")
	warpCreatorWarpDestinationElem.innerHTML = mapList.innerHTML
    document.getElementById("errorButtonOK").innerText = "Create"
    document.getElementById("errorButtonCancel").innerText = "Cancel"
    document.getElementById("errorButtonOK").onclick = () => {
        // console.log(nameValue,dialogValue)
        warpDataEdited.push({
			"id": document.getElementById("errorLabel").querySelector("#warpID").value,
			"warpDestination": warpCreatorWarpDestinationElem.value,
			"warpDestinationX": parseInt(document.getElementById("errorLabel").querySelector("#warpDestinationX").value),
			"warpDestinationY": parseInt(document.getElementById("errorLabel").querySelector("#warpDestinationY").value),
			"x": 0,
			"y": 0,
			"direction": "down"
		})
        document.getElementById("errorButtonCancel").click()
        refreshWarp(warpDataEdited)
    }
    document.getElementById("errorBox").style.display = 'block'
	preventFromSave()
}

function refreshWarp(warpDataEdited) {
	// console.log(!warpMap)
    if (!warpMap) {
        warpMap = document.createElement('div')
	} 
	else {
        warpMap.innerHTML = ""
    }
    warpMap.style.position = "absolute"
    warpMap.style.top = 0
    warpDataEdited.forEach((warp) => {
		console.log(warp)
        let imgWarp = document.createElement('img')
        imgWarp.src = "/warps/dirIndicator.png"
        imgWarp.classList = ["tile"]
        imgWarp.style.position = 'absolute'
        let calculedWidth = (window.innerWidth / mapDataEdited[0].length)
        let calculedHeight = ((window.innerHeight - 200) / mapDataEdited.length)
        imgWarp.style.width = calculedWidth + "px"
        imgWarp.id = warp.id
        imgWarp.style.height = calculedHeight + "px"
        imgWarp.style.left = calculedWidth * warp.x
        imgWarp.style.top = calculedHeight * warp.y
        imgWarp.ondragstart = (event) => {
            draggedItem = imgWarp
			preventFromSave()
        }
        imgWarp.oncontextmenu = () => {
            event.preventDefault()
            editWarp(imgWarp.id)
        }
        window.addEventListener('resize', () => {
            let calculedWidth = (window.innerWidth / mapDataEdited[0].length)
            let calculedHeight = ((window.innerHeight - 200) / mapDataEdited.length)
            imgWarp.style.width = calculedWidth + "px"
            imgWarp.style.height = calculedHeight + "px"
            imgWarp.style.left = calculedWidth * warp.x
            imgWarp.style.top = calculedHeight * warp.y
        })
        imgWarp.style.transform = `rotate(${warp.direction=="right"?"-90deg":"0deg"})`
        imgWarp.onwheel = () => {
            warp.direction = warp.direction=="down"?"right":"down"
            imgWarp.style.transform = `rotate(${warp.direction=="right"?"-90deg":"0deg"})`
			preventFromSave()
        }
        warpMap.appendChild(imgWarp)
    })
    mapEditor.appendChild(warpMap)
}

function editWarp(warpID) {
    let theWarp = null
    warpDataEdited.forEach((warp) => {
        if (warp.id == warpID)
            theWarp = warp
    })
	console.log('Thewarp:',theWarp)
    document.getElementById("errorLabel").innerHTML = `
		Editing Warp: ${warpID}<br><br><br>
		Destination: <select id="warpDestination"><\/select><br><br>
		X Destination: <input type="number" id="warpDestinationX" style="width:150px"><br>
		Y Destination: <input type="number" id="warpDestinationY" style="width:150px"><br>
		<br><button onclick="deleteWarp('${warpID}')">Supprimer<\/button>
	`
	let warpCreatorWarpDestinationElem = document.getElementById("errorLabel").querySelector("#warpDestination")
	warpCreatorWarpDestinationElem.innerHTML = mapList.innerHTML
	document.getElementById("errorLabel").querySelector("#warpDestinationX").value = theWarp.warpDestinationX
	document.getElementById("errorLabel").querySelector("#warpDestinationY").value = theWarp.warpDestinationY
    document.getElementById("errorButtonOK").innerText = "Save"
    document.getElementById("errorButtonCancel").innerText = "Cancel"
    document.getElementById("errorButtonOK").onclick = () => {
        // console.log(nameValue,dialogValue)
        warpDataEdited.forEach((warp) => {
            if (warp.id == warpID) {
				warp = {
					...warp,					
					"warpDestination": warpCreatorWarpDestinationElem.value,
					"warpDestinationX": document.getElementById("errorLabel").querySelector("#warpDestinationX").value,
					"warpDestinationY": document.getElementById("errorLabel").querySelector("#warpDestinationY").value,
				}
            }
        })
        document.getElementById("errorButtonCancel").click()
    }
    document.getElementById("errorBox").style.display = 'block'
	preventFromSave()
}
function deleteWarp(warpID) {
    // console.log(npcDataEdited)
    warpDataEdited = warpDataEdited.filter((el) => {
        return el.id !== warpID;
    });
    // console.log(npcDataEdited)
    refreshWarp(warpDataEdited)
    document.getElementById("errorBox").style.display = 'none'
	preventFromSave()
}

function preventFromSave(){
	window.onbeforeunload = ()=>{return true}
}