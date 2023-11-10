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
let _default = (
	date,
	format = "YYYY-MM-DDTHH:mm:ss.sss"
) =>
	format.replace(
		"YYYY",
		`${date.getFullYear()}`.padStart(4, "0")
	)
		.replace(
			"MM",
			`${date.getMonth() + 1}`.padStart(2, "0")
		)
		.replace(
			"DD",
			`${date.getDate()}`.padStart(2, "0")
		)
		.replace(
			"HH",
			`${date.getHours()}`.padStart(2, "0")
		)
		.replace(
			"mm",
			`${date.getMinutes()}`.padStart(2, "0")
		)
		.replace(
			"ss",
			`${date.getSeconds()}`.padStart(2, "0")
		)
		.replace(
			"sss",
			`${date.getMilliseconds()}`.padStart(3, "0")
		)

export default _default