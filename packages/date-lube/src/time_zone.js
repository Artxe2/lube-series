let time_zone_regex = /T\+?(-?\d*):?(\d*)/

/**
 * Adjusts the date according to the specified time zone offset.
 * @param {Date} date
 * @param {import("../public.js").TimeZone} time_zone
 * @param {true=} inversion
 * @returns {Date}
 * @throws
 * ```
 * RangeError(`Invalid time zone specified: ${time_zone}`) // Throws from Intl.DateTimeFormat
 * ```
 */
let _default = (date, time_zone, inversion) => {
	let array = /** @type {RegExpExecArray} */(time_zone_regex.exec(
		Intl.DateTimeFormat(
			"ia",
			{
				timeZone: time_zone,
				timeZoneName: "short"
			}
		).format()
	))/**/
	let offset = date.getTimezoneOffset() + +(array[1] ?? 0) * 60 + +(array[2] ?? 0)
	date.setMinutes(
		date.getMinutes() + (inversion ? -offset : offset)
	)
	return date
}

export default _default