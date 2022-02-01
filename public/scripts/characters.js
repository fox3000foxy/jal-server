function CreateCharacter(characterElement) {
    if (characterElement == null) return;
    playersList.appendChild(characterElement)
    // console.log(characterElement)
    var me = parseInt(characterElement.getAttribute('me'))
    var self = {
        speed: 12,
        jumping: false,
        jumpingFinished: true,
        dir: 1
    }
    var characterType = characterElement.getAttribute("player")
    var defDir = parseInt(characterElement.getAttribute("defaultDir"))

    var character = document.createElement("img")
    var characterShadow = document.createElement("img")
    var collisionBox = document.createElement("div")
    var speechBubble = document.createElement("img")

    var idleSrc = "assets/characters/" + characterType + "/idle.gif"
    var runSrc = "assets/characters/" + characterType + "/run.gif"
    var pressed = {
        left: false,
        up: false,
        down: false,
        right: false,
        run: 1
    }

    character.src = idleSrc
    character.style.left = "0px"
    character.style.top = "0px"
    character.style.zIndex = "1"
    characterElement.style.zIndex = "2"

    characterShadow.src = character.src
    characterShadow.setAttribute('class', 'characterShadow')
    characterShadow.style.filter = "brightness(0)"
    characterShadow.style.width = "40px"
    characterShadow.style.height = "30px"
    characterShadow.style.transform = `skew(${-defDir * 45}deg, 0deg)`
    characterShadow.style.left = (defDir * 15) + "px"

    collisionBox.setAttribute('class', 'collisionBox')
    // /* Color the collision box of player*/ collisionBox.style.backgroundColor = 'green'
    collisionBox.style.position = 'absolute'
    collisionBox.style.width = '36px'
    collisionBox.style.height = '1px'
    collisionBox.style.left = '2px'
    collisionBox.style.top = '57px'
    collisionBox.style.zIndex = '3'

    nameTag = document.createElement('div')
    nameTag.setAttribute('class', 'nameTag')
    nameTag.innerText = characterElement.getAttribute("nameTag")
    nameTag.style.position = "absolute"
    // nameTag.style.width = "60px"
    //nameTag.style.height = "20px"
    nameTag.style.padding = "6px"
    nameTag.style.fontSize = "8px"
    nameTag.style.color = "white"
    nameTag.style.textAlign = "center"
    nameTag.style.background = "#0f0f0f8f"
    nameTag.style.left = "-12px"
    nameTag.style.top = "-20px"
    nameTag.style.transform = `scaleX(${defDir})`;

    speechBubble.src = "/assets/bubbles/dialog.gif"
    speechBubble.style.position = 'absolute'
    speechBubble.style.width = '34px'
    speechBubble.style.height = '34px'
    speechBubble.style.left = '9px'
    speechBubble.style.top = '-60px'
    speechBubble.style.zIndex = '3'
    speechBubble.style.transform = `scaleX(${defDir})`;

    characterElement.appendChild(character)
    characterElement.appendChild(collisionBox)
    if (!me) characterElement.appendChild(nameTag)
    if (characterElement.hasAttribute('autoShadow')) characterElement.appendChild(characterShadow)
    if (characterElement.hasAttribute('speechBubble')) characterElement.appendChild(speechBubble)

    if (localStorage.coordinates && me) {
        if (JSON.parse(localStorage.coordinates).x) mapBox.style.left = JSON.parse(localStorage.coordinates).x
        if (JSON.parse(localStorage.coordinates).y) mapBox.style.top = JSON.parse(localStorage.coordinates).y

      if(JSON.parse(localStorage.coordinates).x=="")
        mapBox.style.left = "0px"
      if(JSON.parse(localStorage.coordinates).y=="") 
        mapBox.style.top = "-1350px"
        if (JSON.parse(localStorage.coordinates).d) self.dir = JSON.parse(localStorage.coordinates).d
    }

    if (me) {
        characterElement.setAttribute("coordX", parseInt(mapBox.style.left))
        characterElement.setAttribute("coordY", parseInt(mapBox.style.top))
    }

    document.addEventListener('keydown', (ev) => {
        if (ev.key == "ArrowLeft") {
            self.dir = -1;
        }
        if (ev.key == "ArrowRight") {
            self.dir = 1;
        }

        if (ev.key == "ArrowRight") {
            pressed.right = true
        }
        if (ev.key == "ArrowLeft") {
            pressed.left = true
        }
        if (ev.key == "ArrowUp") {
            pressed.up = true
        }
        if (ev.key == "ArrowDown") {
            pressed.down = true
        }
        if (ev.key == "Shift") {
            pressed.run = 1.75
        }
        if (ev.key == " " && self.jumpingFinished == true) {
            self.jumping = true
        }
    })

    document.addEventListener('keyup', (ev) => {
        if (ev.key == "ArrowRight") {
            pressed.right = false
        }
        if (ev.key == "ArrowLeft") {
            pressed.left = false
        }
        if (ev.key == "ArrowUp") {
            pressed.up = false
        }
        if (ev.key == "ArrowDown") {
            pressed.down = false
        }
        if (ev.key == "Shift") {
            pressed.run = 1
        }
    })

    setInterval(() => {
        if (me) {
            oldLeft = parseInt(mapBox.style.left)
            oldTop = parseInt(mapBox.style.top)
            character.style.transform = `scaleX(${self.dir})`;
            characterShadow.style.transform = `scale(${self.dir},1) skew(${self.dir * -45}deg, 0deg)`
            if (pressed.left) {
                mapBox.style.left = (parseInt(mapBox.style.left) + (self.speed * pressed.run)) + "px"
            }
            if (pressed.right) {
                mapBox.style.left = (parseInt(mapBox.style.left) - (self.speed * pressed.run)) + "px"
            }
            collisionables.forEach((tileName) => {
                document.querySelectorAll("[src*=" + tileName + "]").forEach((voidTile, i) => {
                    let myPlayer = getPlayer('me').querySelector(".collisionBox")
                    if (overlaps(voidTile, myPlayer).collide) {
                        mapBox.style.left = oldLeft + "px"
                    }
                })
            })
            if (pressed.up) {
                mapBox.style.top = (parseInt(mapBox.style.top) + (self.speed * pressed.run)) + "px"
            }
            if (pressed.down) {
                mapBox.style.top = (parseInt(mapBox.style.top) - (self.speed * pressed.run)) + "px"
            }
            collisionables.forEach((tileName,j) => {
                //console.log(tileName,j)
                document.querySelectorAll("[src*=" + tileName + "]").forEach((voidTile, i) => {
                    //console.log(voidTile)
                    //if(i!=0) return
                    let myPlayer = getPlayer('me').querySelector(".collisionBox")
                    if (overlaps(voidTile, myPlayer).collide) {
                        mapBox.style.top = oldTop + "px"
                    }
                })
            })
            if (pressed.up || pressed.down || pressed.left || pressed.right || !self.jumpingFinished) {
                localStorage.coordinates = JSON.stringify({
                    x: mapBox.style.left,
                    y: mapBox.style.top,
                    d: self.dir
                })
                if (character.src.indexOf(runSrc) == -1) {
                    character.src = runSrc;
                    characterElement.setAttribute('state', 'run')
                    characterShadow.src = runSrc
                }
                moving()
            } else if (character.src.indexOf(idleSrc) == -1) {
                character.src = idleSrc;
                characterElement.setAttribute('state', 'idle')
                characterShadow.src = idleSrc
            }

            if (self.jumping) {
                self.jumpingFinished = false
                self.jumping = false
                for (i = 0; i < 21; i++ && self.jumping != false) {
                    setTimeout(() => {
                        character.style.top = (parseFloat(character.style.top) - (self.speed / 16)) + "px"
                        characterShadow.style.top = (parseFloat(characterShadow.style.top) - (self.speed / 16)) + "px"
                        characterShadow.style.left = (parseFloat(characterShadow.style.left) + (self.speed / 16)) + "px"
                    }, i * 10)
                }
                for (i = 25; i < 46; i++) {
                    setTimeout(() => {
                        character.style.top = (parseFloat(character.style.top) + (self.speed / 16)) + "px"
                        characterShadow.style.top = (parseFloat(characterShadow.style.top) + (self.speed / 16)) + "px"
                        characterShadow.style.left = (parseFloat(characterShadow.style.left) - (self.speed / 16)) + "px"
                    }, i * 10)
                }
                setTimeout(() => {
                    self.jumpingFinished = true;
                }, 480)
            }
        }

        myCoordX = parseInt(mapBox.style.left)
        myCoordY = parseInt(mapBox.style.top)
        myDir = self.dir

        otherCharacters = document.querySelectorAll("*[me='0']")
        otherCharacters.forEach(otherCharacter => {
            var coordX = parseInt(otherCharacter.getAttribute("coordx"))
            var coordY = parseInt(otherCharacter.getAttribute("coordy"))
            otherCharacter.style.left = myCoordX - coordX
            otherCharacter.style.top = myCoordY - coordY

            /*characterElement.style.zIndex = "2"
            if (myCoordY > coordY) otherCharacter.style.zIndex = "3"
            else otherCharacter.style.zIndex = "1"*/

        })
        if(!localStorage.coordinates){
          localStorage.setItem('coordinates',JSON.stringify({
            x:"0",
            y:"-1350",
            dir: 1
          }))
          location.reload()
        }


        if (me) {
            characterElement.setAttribute("coordX", myCoordX)
            characterElement.setAttribute("coordY", myCoordY)
        }
    }, 50)
    // setTimeout(()=>{if(me) coming()},500)
}