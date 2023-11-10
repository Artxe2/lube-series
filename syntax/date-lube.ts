import {
	add,
	dateToString,
	stringToDate,
	timeUnit,
	timeZone
} from "date-lube"

import { TimeZone } from "date-lube/@types"

add(new Date(), "")

dateToString(new Date())
dateToString(new Date, "")

stringToDate("")

timeUnit.DD

let array: TimeZone[] = [ "America/New_York", "Zulu" ]
for (let tz of array) {
	timeZone(new Date(), tz)
}