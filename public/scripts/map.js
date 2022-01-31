mapName = qs.mapName || "debug"
fetch('/maps/'+mapName+'.json')
.then(res=>res.json())
.then((mapData)=>{
  //console.log(mapData)
  map = mapData
  place()
})
