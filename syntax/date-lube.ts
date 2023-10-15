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

const array: TimeZone[] = ["America/New_York", "Zulu"]
for (const tz of array) {
	timeZone(new Date(), tz)
}