import { add, dateToString, stringToDate, timeUnit, timeZone } from "date-lube"

add(new Date(), "1Y")
dateToString(new Date())
dateToString(new Date(), "")
stringToDate("")
stringToDate("", "")
let ms = timeUnit.DD + timeUnit.HH + timeUnit.mm + timeUnit.ss
timeZone(new Date(), "America/New_York")