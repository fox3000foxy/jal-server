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
		var foundationElement = document.createElement('img')
		foundationElement.src = `assets/tiles/stone.png`
		foundationElement.style.left = tileLeft + "px"
		foundationElement.style.top = tileTop + "px"
		foundationElement.setAttribute('tile', '')
		foundationElement.setAttribute('tileName',tile)
        foundationElement.setAttribute('isometric', '')
		mapElement.appendChild(foundationElement)
		  
		  
        tileLeft -= 23;
        tileTop -= 105;
        tileElement.src = `assets/structures/${tile}.png`
        setInterval(() => {
          //console.log()

          let strucBottom = tileTop + parseInt(mapBox.style.top)
          let playerBottom = getPlayer('me').getBoundingClientRect().top
          //TODO
          //console.log(strucLeft)
          let strucLeft = tileElement.getBoundingClientRect().left
          let playerLeft = getPlayer('me').getBoundingClientRect().left

          // console.log(strucBottom - playerBottom)
		  if(
			strucLeft - playerLeft > 20 ||
			strucLeft - playerLeft < -86 ||
			strucBottom - playerBottom > 290
		  ) 
		  {
            tileElement.style.opacity = "1"
			return
		  }
          // console.log(strucLeft - playerLeft)
          console.log(
			// "Left:",(strucLeft - playerLeft),
			// "Top:",(strucBottom - playerBottom)
			)
			if (
				((strucLeft - playerLeft) > -84 && (strucBottom - playerBottom) > -23) ||
				((strucLeft - playerLeft) > 18 && (strucBottom - playerBottom) > 50)
			) {
            //console.log("Behind")
			tileElement.style.opacity = "50%"
			getPlayer('me').style.zIndex = "2"
          }
          else {
            //console.log("Before")
            tileElement.style.opacity = "1"
			getPlayer('me').style.zIndex = "4"
          }
        },50)
      }
      else {
        tileElement.src = `assets/tiles/${tile}.png`
        tileElement.setAttribute('isometric', '')
      }
      tileElement.setAttribute('tile', '')
      tileElement.setAttribute('tileName',tile)
	  // tileElement.style.zIndex = "1"
      tileElement.style.left = tileLeft + "px"
      tileElement.style.top = tileTop + "px"
      if(AllStructures.indexOf(tile)!=-1) tileElement.style.zIndex = "3"
      // else tileElement.style.zIndex = "1"
      mapElement.appendChild(tileElement)
    })
  })

}
