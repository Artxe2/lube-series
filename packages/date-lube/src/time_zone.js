let time_zone_regex = /T\+?(-?\d+):?(\d*)/

/**
 * Adjusts the date according to the specified time zone offset.
 * @param {Date} date The Date object to be adjusted.
 * @param {string} timeZone A string representing the IANA time zone identifier.
 *
 * (e.g., "America/New_York" {@link https://www.iana.org/time-zones})
 * @returns The modified Date object with the adjusted time zone.
 */
export default (date, timeZone) => {
	const array = time_zone_regex.exec(Intl.DateTimeFormat("ia", { timeZone, timeZoneName: "short" }).format())
	if (array) {
		date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + Number(array[1]) * 60 + Number(array[2]))
	}
	return date
}