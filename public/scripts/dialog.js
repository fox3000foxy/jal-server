txtnum = 0
writeInterval = null
speechBox = document.getElementById("center")
function typeWriter({
    speaker,
    txt
}) {
    speechBox.innerHTML = `${speaker}:<br><br><br>`
    if (writeInterval) clearInterval(writeInterval)
    letter = 0
    writeInterval = setInterval(() => {
        speechBox.innerHTML += txt.charAt(letter);
        if (letter == txt.length - 1) {
          clearInterval(writeInterval)
        } 
        speechBox.scrollTop = 9999
        letter++
    }, 20)
    
}

function speaking(num) {

    if (num == 1) {
        document.getElementById(`perso1`).style = `bottom:25%;bottom:30%;transform: scale(3,3);filter: brightness(100%);`
        document.getElementById(`perso2`).style = `bottom:25%;transform: scale(-2,2);filter: brightness(25%);`
    }
    if (num == 2) {
        document.getElementById(`perso2`).style = `bottom:25%;bottom:30%;transform: scale(-3,3);filter: brightness(100%);`
        document.getElementById(`perso1`).style = `bottom:25%;transform: scale(2,2);filter: brightness(25%);`
    }

}
window.addEventListener('keydown', (ev) => {
    if (ev.key != "A") {
        txtnum += 1;
        text();
        //alert(letter == txt.length - 1)
    }
})

function text() {
    if (dialog[txtnum]) {
        var speaker = dialog[txtnum].speaker
        speaking(speaker);
        if (speaker == 1) var name = localStorage.name
        if (speaker == 2) var name = pnjName
        typeWriter({
            speaker: name,
            txt: dialog[txtnum].message
        })
    } else {
        document.getElementById("skip").click()
    }
}

dialogId = qs.dialogId
//console.log(dialogId)

fetch('/dialogs/' + dialogId + '.json')
    .then(res => res.json())
    .then(res2 => {
        dialog = res2.messages
        pnjName = res2.toSpeak.name
        document.getElementById(`perso2`).src = './assets/characters/' + res2.toSpeak.type + '/idle.gif'
        text()
    })

if (parent.document.getElementById(window.name))
    parent.document.getElementById(window.name).focus()