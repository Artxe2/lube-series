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
const _default = (
	date,
	format = "YYYY-MM-DDTHH:mm:ss.sss"
) => {
	let x = format.indexOf("YYYY")
	const year = x < 0 ? "0000" : date.slice(x, x + 4)
	x = format.indexOf("MM")
	const month = x < 0 ? "00" : date.slice(x, x + 2)
	x = format.indexOf("DD")
	const day = x < 0 ? "00" : date.slice(x, x + 2)
	x = format.indexOf("HH")
	const hours = x < 0 ? "00" : date.slice(x, x + 2)
	x = format.indexOf("mm")
	const minutes = x < 0 ? "00" : date.slice(x, x + 2)
	x = format.indexOf("ss")
	const seconds = x < 0 ? "00" : date.slice(x, x + 2)
	x = format.indexOf("sss")
	const milliseconds = x < 0 ? "000" : date.slice(x, x + 3)
	return new Date(
		`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`
	)
}

export default _default