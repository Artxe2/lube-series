/**
 * @param {Record<string, *>} obj
 */
let freeze = obj => {
	for (let key in Object.freeze(obj)) {
		let o = obj[key]
		if (o && typeof o == "object") freeze(o)
	}
}

/**
 * Deep freeze object.
 * @param {*} data Any type of object to freeze
 * @returns Freezed `data`.
 */
export default data => {
	if (data && typeof data == "object") freeze(data)
	return data
}