var escapeState = 'hidden'

switchEscape = ()=>{
	escapeState = escapeState=='hidden'?'visible':'hidden'
	document.getElementById('escapeMenu').style.visibility = escapeState
	document.getElementById('overlay').style.visibility = escapeState
}

window.addEventListener('keydown',(ev)=>{
	if(ev.key=="Escape") {
		switchEscape()
	}
})