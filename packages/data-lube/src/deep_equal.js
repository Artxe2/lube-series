/**
 * Verify that the object is the same as another object
 * @template {*} T
 * @param {T} object
 * @param {*} another
 * @returns {another is T}
 */
let _default = (object, another) => {
	if (
		!object
		|| !another
		|| typeof object != "object"
		|| typeof another != "object"
		|| object?.constructor != another?.constructor
	) return object === another
	let o_key = Object.keys(object)
	let a_key = Object.keys(another)
	if (o_key.length != a_key.length) return false
	for (let key of o_key) {
		if (
			!a_key.includes(key)
			|| !_default(
				/** @type {Record<string, *>} */(object)/**/[key],
				another[key]
			)
		) return false
	}
	return true
}


export default _default