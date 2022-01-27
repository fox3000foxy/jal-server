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
	if(!map[i]) continue
	map[i].unshift('void')
	map[i].push('void')
}

map.unshift(voidLine)
map.push(voidLine)