/**
 * @param {Record<string, *>} obj
 */
let clone = obj => {
	/** @type {Record<string, *>} */
	let copy = obj.constructor == Array
			? []
			: {}
	for (let key in obj) {
		let o = obj[key]
		copy[key] = o && typeof o == "object"
				? clone(o)
				: o
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