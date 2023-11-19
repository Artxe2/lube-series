'use strict';

let _date = Date;
let _array = Array;

/**
 * Deep copy object.
 * @template {*} T
 * @param {T} obj
 * @returns {T}
 */
let _default$2 = obj => {
	if (!obj || typeof obj != "object") return obj
	if (obj.constructor == _date) return /** @type {T} */(new _date(obj))/**/
	/** @type {Record<string, *>} */
	let copy = obj.constructor == _array
		? []
		: {};
	for (let key in obj) {
		let data = obj[key];
		copy[key] = data && typeof data == "object"
			? _default$2(data)
			: data;
	}
	return /** @type {T} */(copy)/**/
};

/**
 * Verify that the object is the same as another object
 * @template {*} T
 * @param {T} object
 * @param {*} another
 * @returns {another is T}
 */
let _default$1 = (object, another) => {
	if (
		!object
		|| !another
		|| typeof object != "object"
		|| typeof another != "object"
		|| object?.constructor != another?.constructor
	) return object === another
	let o_key = Object.keys(object);
	let a_key = Object.keys(another);
	if (o_key.length != a_key.length) return false
	for (let key of o_key) {
		if (
			!a_key.includes(key)
			|| !_default$1(
				/** @type {Record<string, *>} */(object)/**/[key],
				another[key]
			)
		) return false
	}
	return true
};

/**
 * Deep freeze object.
 * @template {*} T
 * @param {T} data
 * @returns {import("../private.js").DeepReadonly<T>}
 */
let _default = data => {
	if (data && typeof data == "object") {
		for (let key in Object.freeze(data)) _default(data[key]);
	}
	return /** @type {import("../private.js").DeepReadonly<T>} */(data)/**/
};

exports.deepCopy = _default$2;
exports.deepEqual = _default$1;
exports.deepFreeze = _default;
