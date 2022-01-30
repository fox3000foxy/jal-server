function place() {
  //console.log(JSON.stringify(map))
  mapXLengthmap = map[0].length
  voidLine = new Array()
  for (i = 0; i < mapXLengthmap + 2; i++) {
    voidLine[i] = 'void'
    if (!map[i]) continue
    map[i].unshift('void')
    map[i].push('void')
  }
  map.unshift(voidLine)
  map.push(voidLine)

  map.forEach((line, i) => {
    line.forEach((column, j) => {
      tile = map[i][j]
      // Ratio: 64/45*decal
      tileLeft = (j * width) + (-i * height)
      // tileLeft = (j * width)
      tileTop = i * height

      var tileElement = document.createElement('img')
      //tile = window[tile]
      if (structures.indexOf(tile) != -1) {
        tileLeft -= 23;
        tileTop -= 105;
        tileElement.src = `assets/structures/${tile}.png`
        document.addEventListener('keydown', () => {
          //console.log()

          let strucBottom = tileTop + parseInt(mapBox.style.top)
          let playerBottom = getPlayer('me').getBoundingClientRect().top
          //TODO
          //let strucLeft = tileLeft + parseInt(mapBox.style.left)
          //console.log(strucLeft)
          //let playerLeft = getPlayer('me').getBoundingClientRect().left

          //console.log(strucLeft - playerLeft)
          if ((strucBottom - playerBottom) > 0) {
            //console.log("Behind")
            getPlayer("me").style.zIndex = "2"
          }
          else {
            //console.log("Before")
            getPlayer("me").style.zIndex = "4"
          }
        })
      }
      else {
        tileElement.src = `assets/tiles/${tile}.png`
        tileElement.setAttribute('isometric', '')
      }
      tileElement.setAttribute('tile', '')
      tileElement.setAttribute('tileName',tile)
      tileElement.style.left = tileLeft + "px"
      tileElement.style.top = tileTop + "px"
      if(AllStructures.indexOf(tile)!=-1) tileElement.style.zIndex = "3"
      else tileElement.style.zIndex = "1"
      mapElement.appendChild(tileElement)
    })
  })

}
