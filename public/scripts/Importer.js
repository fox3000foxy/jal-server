Module = {
	import: function (name){
		module = document.createElement('script')
		module.setAttribute('src',`scripts/${name}.js`)
		document.head.appendChild(module)
	},
	cssImport: function (name){
		module = document.createElement('link')
		module.setAttribute('rel',`stylesheet`)
		module.setAttribute('href',`styles/${name}.css`)
		document.head.appendChild(module)
	},
	defineStyle: function (style) {
		styleElement = document.createElement('style')
		styleElement.innerHTML = style
		document.head.appendChild(styleElement)
	}
}