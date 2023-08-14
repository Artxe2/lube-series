let _date = Date
let _array = Array

/**
 * @param {Record<string, *>} obj
 */
let clone = obj => {
	// @ts-ignore
	if (obj.constructor == _date) return new Date(obj)
	/** @type {Record<string, *>} */
	let copy = obj.constructor == _array
		? []
		: {}
	for (let key in obj) {
		let data = obj[key]
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