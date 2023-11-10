let _date = Date
let _array = Array

/**
 * Deep copy object.
 * @template {*} T
 * @param {T} obj
 * @returns {T}
 */
let _default = obj => {
	if (!obj || typeof obj != "object") return obj
	if (obj.constructor == _date) return /** @type {T} */(new _date(obj))/**/
	/** @type {Record<string, *>} */
	let copy = obj.constructor == _array
		? []
		: {}
	for (let key in obj) {
		let data = obj[key]
		copy[key] = data && typeof data == "object"
			? _default(data)
			: data
	}
	return /** @type {T} */(copy)/**/
}

export default _default