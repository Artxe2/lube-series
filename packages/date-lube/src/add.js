let time_regex = /(-?\d+)([YMDHms]+)/g

/**
 * Calculates and adds the specified time duration to the provided date.
 * @param {Date} date The initial Date object.
 * @param {string} sum A string containing time units and values to calculate and add.
 *
 * (e.g., "1Y2M 3D")
 *
 * Supported time units:
 * - "Y": Years
 * - "M": Months
 * - "D": Days
 * - "H": Hours
 * - "m": Minutes
 * - "s": Seconds
 * - "sss": Milliseconds
 * @returns The modified Date object with the calculated time added.
 */
export default (date, sum) => {
	for (let [, n, unit] of sum.matchAll(time_regex)) {
		const number = Number(n)
		if (unit == "Y") date.setFullYear(date.getFullYear() + number)
		else if (unit == "M") date.setMonth(date.getMonth() + number)
		else if (unit == "D") date.setDate(date.getDate() + number)
		else if (unit == "H") date.setHours(date.getHours() + number)
		else if (unit == "m") date.setMinutes(date.getMinutes() + number)
		else if (unit == "s") date.setSeconds(date.getSeconds() + number)
		else if (unit == "sss") date.setMilliseconds(date.getMilliseconds() + number)
	}
	return date
}