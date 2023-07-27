let flow = (base = "/") => {
	let handlers = new Map()
	let utils = {
		add: (pathname, handler) => {
			handlers.set(base + pathname, handler)
			return utils
		},
		begin: () => {
			let prevForm = {}
			let form = {}
			return {
				data: () => form,
				step: data => {
					if (prevForm[location.pathname]) {
						form = prevForm[location.pathname]
					} else {
						prevForm[location.pathname] = form
					}
					form = { ...form, ...data}
					handlers.get(location.pathname)(form)
				}
			}
		}
	}
	return utils
}

export { flow }