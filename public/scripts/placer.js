mapXLengthmap = map[0].length
voidLine = new Array()
for(i=0;i<mapXLengthmap+2;i++){
	voidLine[i] = 'void'
	if(!map[i]) continue
	map[i].unshift('void')
	map[i].push('void')
}
map.unshift(voidLine)
map.push(voidLine)

map.forEach((line,i)=>{
	line.forEach((column,j)=>{
		tile = map[i][j]
		// Ratio: 64/45*decal
		tileLeft = (j * width) + (-i * height)
		// tileLeft = (j * width)
		tileTop = i * height
		
		tileElement = document.createElement('img')
		if(structures.indexOf(tile)!=-1) {
      tileLeft -= 23
      tileTop -= 105
      tileElement.src=`assets/structures/${tile}.png`
    }
    else {
      tileElement.src=`assets/tiles/${tile}.png`
      tileElement.setAttribute('isometric','')
    }
		tileElement.setAttribute('tile','')
		tileElement.style.left = tileLeft+"px"
		tileElement.style.top = tileTop+"px"
		mapElement.appendChild(tileElement)
	})
})