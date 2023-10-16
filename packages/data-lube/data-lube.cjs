'use strict';

const _date = Date;
const _array = Array;

/**
 * Deep copy object.
 * @template {*} T
 * @param {T} obj
 * @returns {T}
 */
const _default$2 = obj => {
	if (!obj || typeof obj != "object") return obj
	if (obj.constructor == _date) return /** @type {T} */(new _date(obj))/**/
	/** @type {Record<string, *>} */
	const copy = obj.constructor == _array
		? []
		: {};
	for (const key in obj) {
		const data = obj[key];
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
const _default$1 = (object, another) => {
	if (
		!object
		|| !another
		|| typeof object != "object"
		|| typeof another != "object"
		|| object?.constructor != another?.constructor
	) return object === another
	const o_key = Object.keys(object);
	const a_key = Object.keys(another);
	if (o_key.length != a_key.length) return false
	for (const key of o_key) {
		if (
			!a_key.includes(key)
			|| !_default$1(/** @type {Record<string, *>} */(object)/**/[key], another[key])
		) return false
	}
	return true
};

/**
 * Deep freeze object.
 * @template {*} T
 * @param {T} data
 * @returns {import("../../private.js").DeepReadonly<T>}
 */
const _default = data => {
	if (data && typeof data == "object") {
		for (const key in Object.freeze(data)) _default(data[key]);
	}
	return /** @type {import("../../private.js").DeepReadonly<T>} */(data)/**/
};

exports.deepCopy = _default$2;
exports.deepEqual = _default$1;
exports.deepFreeze = _default;
