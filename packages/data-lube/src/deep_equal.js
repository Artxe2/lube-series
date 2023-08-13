/**
 * Verify that the object is the same as another object
 * @param {*} object Any type of object
 * @param {*} another Any type of object too
 * @returns Freezed `data`.
 */
let equals = (object, another) => {
	if (object !== another) {
		if (
			typeof object !== "object"
			|| typeof another !== "object"
			|| object?.constructor !== another?.constructor
		) return false
		for (let key in object) {
			if (!equals(object[key], another[key])) return false
		}
	}
	return true
}


export default equals