let timeRE = /(-?\d+)([YMDHms]+)/g
let add = (date, sum) => {
	for (let [_, n, d] of sum.matchAll(timeRE)) {
		n = Number(n)
		if (d == "YYYY") date.setFullYear(date.getFullYear() + n)
		else if (d == "MM") date.setMonth(date.getMonth() + n)
		else if (d == "DD") date.setDate(date.getDate() + n)
		else if (d == "HH") date.setHours(date.getHours() + n)
		else if (d == "mm") date.setMinutes(date.getMinutes() + n)
		else if (d == "ss") date.setSeconds(date.getSeconds() + n)
		else if (d == "sss") date.setMilliseconds(date.getMilliseconds() + n)
	}
	return date
}

let dateToString = (date, format = "YYYY-MM-DDTHH:mm:ss.sss") => format
	.replace("YYYY", `${date.getFullYear()}`.padStart(4, "0"))
	.replace("MM", `${date.getMonth() + 1}`.padStart(2, "0"))
	.replace("DD", `${date.getDate()}`.padStart(2, "0"))
	.replace("HH", `${date.getHours()}`.padStart(2, "0"))
	.replace("mm", `${date.getMinutes()}`.padStart(2, "0"))
	.replace("ss", `${date.getSeconds()}`.padStart(2, "0"))
	.replace("sss", `${date.getMilliseconds()}`.padStart(3, "0"))

let stringToDate = (str, format = "YYYY-MM-DDTHH:mm:ss.sss") => {
	let x = format.indexOf("YYYY")
	let year = x < 0 ? "0000" : str.slice(x, x + 4)
	x = format.indexOf("MM")
	let month = x < 0 ? "00" : str.slice(x, x + 2)
	x = format.indexOf("DD")
	let day = x < 0 ? "00" : str.slice(x, x + 2)
	x = format.indexOf("HH")
	let hours = x < 0 ? "00" : str.slice(x, x + 2)
	x = format.indexOf("mm")
	let minutes = x < 0 ? "00" : str.slice(x, x + 2)
	x = format.indexOf("ss")
	let seconds = x < 0 ? "00" : str.slice(x, x + 2)
	x = format.indexOf("sss")
	let milliseconds = x < 0 ? "000" : str.slice(x, x + 3)
	return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`)
}

let timeUnit = {
	DD: 86400000,
	HH: 3600000,
	mm: 60000,
	ss: 1000
}

let timeZoneRE = /T\+?(-?\d+):?(\d*)/
let timeZone = (date, timeZone) => {
	Intl.DateTimeFormat("ia", { timeZone, timeZoneName: "short" })
		.format()
		.replace(
			timeZoneRE,
			(_, h, m) => date.setMinutes(date.getMinutes() + date.getTimezoneOffset() + Number(h) * 60 + (m ?? 0))
		)
	return date
}

export { add, dateToString, stringToDate, timeUnit, timeZone }