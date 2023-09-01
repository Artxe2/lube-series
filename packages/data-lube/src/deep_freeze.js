/**
 * @param {Record<string, *>} obj
 */
const freeze = obj => {
	for (const key in Object.freeze(obj)) {
		const data = obj[key]
		if (data && typeof data == "object") freeze(data)
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