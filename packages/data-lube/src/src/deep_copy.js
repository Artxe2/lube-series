const _date = Date
const _array = Array

/**
 * @param {Record<string, *>} obj
 */
const clone = obj => {
	if (obj.constructor == _date) return new _date(obj)
	/** @type {Record<string, *>} */
	const copy = obj.constructor == _array
		? []
		: {}
	for (const key in obj) {
		const data = obj[key]
		copy[key] = data && typeof data == "object"
			? clone(data)
			: data
	}
	return copy
}

/**
 * Deep copy object.
 * @param {*} data Any type of object to copy
 * @returns The clone of `data`.
 */
export default data =>
	data && typeof data == "object"
		? clone(data)
		: data