/**
 * Deep freeze object.
 * @template {*} T
 * @param {T} data
 * @returns {import("../private.js").DeepReadonly<T>}
 */
let _default = data => {
	if (data && typeof data == "object") {
		for (let key in Object.freeze(data)) _default(data[key])
	}
	return /** @type {import("../private.js").DeepReadonly<T>} */(data)/**/
}

export default _default