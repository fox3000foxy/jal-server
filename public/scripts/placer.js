map.forEach((line,i)=>{
	line.forEach((column,j)=>{
		tile = map[i][j]
		// Ratio: 64/45*decal
		tileLeft = (j * width) + (-i * height)
		// tileLeft = (j * width)
		tileTop = i * height
		
		tileElement = document.createElement('img')
		tileElement.src=`tiles/${tile}.${format[tile]}`
		tileElement.setAttribute('isometric','')
		tileElement.setAttribute('tile','')
		tileElement.style.left = tileLeft+"px"
		tileElement.style.top = tileTop+"px"
		mapElement.appendChild(tileElement)
	})
})