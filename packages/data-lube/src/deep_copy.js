const _date = Date
const _array = Array

/**
 * Deep copy object.
 * @template {*} T
 * @param {T} obj
 * @returns {T}
 */
const _default = obj => {
	if (!obj || typeof obj != "object") return obj
	if (obj.constructor == _date) return /** @type {T} */(new _date(obj))/**/
	/** @type {Record<string, *>} */
	const copy = obj.constructor == _array
		? []
		: {}
	for (const key in obj) {
		const data = obj[key]
		copy[key] = data && typeof data == "object"
			? _default(data)
			: data
	}
	return /** @type {T} */(copy)/**/
}

export default _default