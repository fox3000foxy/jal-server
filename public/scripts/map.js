map = [
	[gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,st,st,st,gr,wa,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,st,wa,wa,sa,sa,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,st,st,st,st,st,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
	[gr,gr,gr,gr,gr,gr,gr,gr,st,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr,gr],
]

mapXLengthmap = map[0].length
voidLine = new Array()
airLine = new Array()
for(i=0;i<mapXLengthmap+2;i++){
	voidLine[i] = 'void'
	airLine[i] = 'air'
	// voidLine[i] = 'void'
	if(!map[i]) continue
	// map[i].unshift('air')
	map[i].unshift('void')
	// map[i].push('air')
	map[i].push('void')
	// console.log(map[i].length)
}

// map.unshift(airLine)
map.unshift(voidLine)
// map.push(airLine)
map.push(voidLine)

// console.log(map)