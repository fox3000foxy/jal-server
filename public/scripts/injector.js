async function inject() {
	// Module.import('socket.io/socket.io')
	await Module.import('definers')
	await Module.import('map')
	await Module.import('placer')
	await Module.import('players')
	await Module.import('characters')
	await Module.import('socketManager')
	await Module.cssImport('character')
	
	fadeOutPercent = 0
	fadeOut = setInterval(()=>{
		document.body.style = `clip-path: circle(${fadeOutPercent}% at center center);`
		fadeOutPercent++
		if(fadeOutPercent==101) clearInterval(fadeOut)
	})
	
	setInterval(()=>{
		document.querySelectorAll("*:not([draggable])").forEach((elem)=>{
			elem.setAttribute('draggable', false);
		})
	},50)
}