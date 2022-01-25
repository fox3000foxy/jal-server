window.addEventListener('load',()=>{
	document.body.style = `clip-path: circle(0% at center center);`
	fadeOutPercent = 0
	fadeOut = setInterval(()=>{
		document.body.style = `clip-path: circle(${fadeOutPercent}% at center center);`
		fadeOutPercent++
		if(fadeOutPercent==101) {
      clearInterval(fadeOut)
      if (scale)   document.body.style.transform = `scale(${scale})`;
    }
	})
})

setInterval(()=>{
	document.querySelectorAll("*:not([draggable])").forEach((elem)=>{
		elem.setAttribute('draggable', false);
    elem.addEventListener('contextmenu', ()=>{
      event.preventDefault()
    });
	})
},50)

closingCircle = async (callback)=>{
	document.body.style = `clip-path: circle(100% at center center);`
	fadeOutPercent = 100
	fadeOut = setInterval(()=>{
		document.body.style = `clip-path: circle(${fadeOutPercent}% at center center);`
		fadeOutPercent--
		if(fadeOutPercent==-1) {
			clearInterval(fadeOut)
			callback()
		}
	})
}