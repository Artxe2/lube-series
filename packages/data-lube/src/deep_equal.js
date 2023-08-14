/**
 * Verify that the object is the same as another object
 * @param {*} object Any type of object
 * @param {*} another Any type of object too
 * @returns is deep equal `object` and `another`.
 */
let equals = (object, another) => {
	if (object !== another) {
		if (
			typeof object !== "object"
			|| typeof another !== "object"
			|| object?.constructor !== another?.constructor
		) return false
		let o_key = Object.keys(object)
		let a_key = Object.keys(another)
		if (o_key.length != a_key.length) return false
		for (let key of o_key) {
			if (!a_key.includes(key) || !equals(object[key], another[key])) return false
		}
	}
	return true
}


export default equals