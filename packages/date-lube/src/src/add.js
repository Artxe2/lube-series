const time_regex = /(-?\d+)([YMDHms]+)/g

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
const _default = (date, sum) => {
	for (const [ , n, unit ] of sum.matchAll(time_regex)) {
		const number = +n
		if (unit == "Y") date.setFullYear(date.getFullYear() + number)
		else if (unit == "M") date.setMonth(date.getMonth() + number)
		else if (unit == "D") date.setDate(date.getDate() + number)
		else if (unit == "H") date.setHours(date.getHours() + number)
		else if (unit == "m") date.setMinutes(date.getMinutes() + number)
		else if (unit == "s") date.setSeconds(date.getSeconds() + number)
		else if (unit == "sss") date.setMilliseconds(
			date.getMilliseconds() + number
		)
	}
	return date
}

export default _default