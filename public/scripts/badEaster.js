keypressHistory = ['','','','','','','','']
bad = null
window.addEventListener('keydown',(ev)=>{
	for(i=1;i<8;i++) {
		keypressHistory[i-1] = keypressHistory[i]
	}
	keypressHistory[7] = ev.key
	konamiCodeCheck()
})

function konamiCodeCheck() {
	if(
		keypressHistory[0] == "ArrowUp" &&
		keypressHistory[1] == "ArrowUp" &&
		keypressHistory[2] == "ArrowDown" &&
		keypressHistory[3] == "ArrowDown" &&
		keypressHistory[4] == "ArrowLeft" &&
		keypressHistory[5] == "ArrowRight" &&
		keypressHistory[6] == "ArrowLeft" &&
		keypressHistory[7] == "ArrowRight"
	)
	konami()
}

function konami() {
	if(!bad) {
		bad = document.createElement('audio')
		bad.setAttribute('autoplay','')
		bad.src = 'assets/musics/badEaster.mp3'
		bad.currentTime = 2.65
		document.body.appendChild(bad)
	}
	else {
		bad.remove()
		bad = null
	}
}