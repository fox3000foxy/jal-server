const translate = require('translate-google')
const fs = require('fs')
const frPackage = require('./public/translate/fr.json')
const isoLangs = require('./isoLangs')
const translateFor = ['en','de','it']
isoLangs.forEach((lang)=>{
	if(translateFor.indexOf(lang.code)!=-1)
		translate(frPackage, {from: 'fr', to: lang.code}).then(res => {
			fs.writeFileSync('./public/translate/'+lang.code+'.json', JSON.stringify(res, null, 2));
		}).catch(err => {
			console.error(err)
		})
})
