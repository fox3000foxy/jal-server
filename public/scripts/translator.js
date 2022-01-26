translatingCallback = null
lang = navigator.language.split('-')[0]
fetch("/translate/"+lang+".json")
.then(res=>res.json())
.then((translationPacket)=>{
	translations = translationPacket
	if(translatingCallback) translatingCallback()
	translationsApplier()
})
translationsApplier = ()=>{
	Object.keys(translations).forEach((key)=>{
		textNodesUnder(document.body).forEach((elem)=>{
				elem.nodeValue = elem.nodeValue.replace(key,translations[key])
		})
	})
}

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}