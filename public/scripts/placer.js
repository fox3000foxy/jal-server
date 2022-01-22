map.forEach((line,i)=>{
	line.forEach((column,j)=>{
		tile = map[i][j]
		tileLeft = (j * width) + (-i * height)
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