'use strict';

const time_regex = /(-?\d+)([YMDHms]+)/g;

/**
 * Calculates and adds the specified time duration to the provided date.
 * @param {Date} date
 * @param {string} sum
 * ```
 * e.g. "1Y2M 3D"
 * ```
 *
 * Supported time units:
 * - "Y": Years
 * - "M": Months
 * - "D": Days
 * - "H": Hours
 * - "m": Minutes
 * - "s": Seconds
 * - "sss": Milliseconds
 * @returns {Date}
 * @example add(new Date, "-1D") //=> Date { yesterday }
 */
const _default$3 = (date, sum) => {
	for (const [, n, unit] of sum.matchAll(time_regex)) {
		const number = +n;
		if (unit == "Y") date.setFullYear(date.getFullYear() + number);
		else if (unit == "M") date.setMonth(date.getMonth() + number);
		else if (unit == "D") date.setDate(date.getDate() + number);
		else if (unit == "H") date.setHours(date.getHours() + number);
		else if (unit == "m") date.setMinutes(date.getMinutes() + number);
		else if (unit == "s") date.setSeconds(date.getSeconds() + number);
		else if (unit == "sss") date.setMilliseconds(date.getMilliseconds() + number);
	}
	return date
};

/**
 * Converts a Date object to a formatted string representation.
 * @param {Date} date
 * @param {string=} format
 * ```js
 * = "YYYY-MM-DDTHH:mm:ss.sss"
 * ```
 *
 * Supported time units:
 * - "YYYY": Years
 * - "MM": Months
 * - "DD": Days
 * - "HH": Hours
 * - "mm": Minutes
 * - "ss": Seconds
 * - "sss": Milliseconds
 * @returns {string}
 */
const _default$2 = (date, format = "YYYY-MM-DDTHH:mm:ss.sss") =>
	format.replace("YYYY", `${date.getFullYear()}`.padStart(4, "0"))
		.replace("MM", `${date.getMonth() + 1}`.padStart(2, "0"))
		.replace("DD", `${date.getDate()}`.padStart(2, "0"))
		.replace("HH", `${date.getHours()}`.padStart(2, "0"))
		.replace("mm", `${date.getMinutes()}`.padStart(2, "0"))
		.replace("ss", `${date.getSeconds()}`.padStart(2, "0"))
		.replace("sss", `${date.getMilliseconds()}`.padStart(3, "0"));

/**
 * Converts a date string to a Date object based on the provided format.
 * @param {string} date
 * @param {string=} format
 * ```js
 * = "YYYY-MM-DDTHH:mm:ss.sss"
 * ```
 *
 * Supported time units:
 * - "YYYY": Years
 * - "MM": Months
 * - "DD": Days
 * - "HH": Hours
 * - "mm": Minutes
 * - "ss": Seconds
 * - "sss": Milliseconds
 * @returns {Date}
 */
const _default$1 = (date, format = "YYYY-MM-DDTHH:mm:ss.sss") => {
	let x = format.indexOf("YYYY");
	const year = x < 0 ? "0000" : date.slice(x, x + 4);
	x = format.indexOf("MM");
	const month = x < 0 ? "00" : date.slice(x, x + 2);
	x = format.indexOf("DD");
	const day = x < 0 ? "00" : date.slice(x, x + 2);
	x = format.indexOf("HH");
	const hours = x < 0 ? "00" : date.slice(x, x + 2);
	x = format.indexOf("mm");
	const minutes = x < 0 ? "00" : date.slice(x, x + 2);
	x = format.indexOf("ss");
	const seconds = x < 0 ? "00" : date.slice(x, x + 2);
	x = format.indexOf("sss");
	const milliseconds = x < 0 ? "000" : date.slice(x, x + 3);
	return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`)
};

var timeUnit = /** @type {const} */({
	DD: 86400000,
	HH: 3600000,
	mm: 60000,
	ss: 1000
});/**/

const time_zone_regex = /T\+?(-?\d*):?(\d*)/;

/**
 * Adjusts the date according to the specified time zone offset.
 * @param {Date} date
 * @param {import("../../public.js").TimeZone} time_zone
 * @param {true=} inversion
 * @returns {Date}
 * @throws
 * ```
 * RangeError(`Invalid time zone specified: ${time_zone}`) // Throws from Intl.DateTimeFormat
 * ```
 */
const _default = (date, time_zone, inversion) => {
	const array = /** @type {RegExpExecArray} */(time_zone_regex.exec(Intl.DateTimeFormat("ia", {
		timeZone: time_zone,
		timeZoneName: "short"
	}).format()));/**/
	const offset = date.getTimezoneOffset() + +(array[1] ?? 0) * 60 + +(array[2] ?? 0);
	date.setMinutes(date.getMinutes() + (inversion ? -offset : offset));
	return date
};

exports.add = _default$3;
exports.dateToString = _default$2;
exports.stringToDate = _default$1;
exports.timeUnit = timeUnit;
exports.timeZone = _default;
