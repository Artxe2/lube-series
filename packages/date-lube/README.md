# Date Lube
## Simplify Date Manipulation in JavaScript
Working with dates in JavaScript can often be challenging, especially when it comes to parsing, formatting, and performing calculations.  
However, with the **"date-lube"** library, managing dates becomes a seamless experience.  
This powerful JavaScript library provides a comprehensive set of functions that simplify date manipulation tasks and empower developers to work efficiently with dates.
<br>
<br>

## Installation
```bash
npm i date-lube
```
```bash
pnpm i date-lube
```
```bash
bun i date-lube
```

## How to use
### To convert Date time
```ts
import { add } from "date-lube"

var d: Date = add(new Date, "-2Y")
//=> Date { 2 year ago }

var d: Date = add(new Date, "-1D")
//=> Date { yesterday }

var d: Date = add(new Date(0), "1Y2M-3D 4H 5m6s -7sss")
//=> Date { 1971-02-26T04:05:05.993Z }

var d: Date = add(new Date(0), "1Y-3D2M 4H 5m6s -7sss")
//=> Date { 1971-03-01T04:05:05.993Z }
```

### To convert Date to String
```ts
import { dateToString } from "date-lube"

var s: string = dateToString(new Date("2222-03-04T11:22:33.444"))
//=> "2222-03-04T11:22:33.444"

var s: string = dateToString(
    new Date("2222-03-04T11:22:33.444"),
    "HHhmmmssSsss _ YYYY/MM/DD"
)
//=> "11h22m33s444 _ 2222/03/04"
```

### To convert String to Date
```ts
import { stringToDate } from "date-lube"

var d: Date = stringToDate("2222-03-04T11:22:33.444")
//=> Date { 2222-03-04T11:22:33.444 in Locale }

var d: Date = stringToDate(
    "11h22m33s444 _ 2222/03/04",
    "HH mm ss sss _ YYYY MM DD"
)
//=> Date { 2222-03-04T11:22:33.444 in Locale }
```

### To convert Date using time zone offset
```ts
import { timeZone } from "date-lube"
import { TimeZone } from "date-lube/@types"

var d: Date = new Date// UTC+9
//=> Date { now }

var d: Date = timeZone(new Date, "Europe/London")
//=> Date { 8 or 9 hours ago }

var d: Date = timeZone(new Date, "America/New_York")
//=> Date { 13 or 14 hours ago }

var d: Date = timeZone(new Date, "America/New_York", true)
//=> Date { 13 or 14 hours later }

var arr: TimeZone[] = ["America/New_York", "Zulu"]
for (var tz of arr) {
	timeZone(new Date, tz)
}
```

### Time Unit
```ts
import { timeUnit } from "date-lube"

typeof timeUnit == {
	DD: 86400000// 1day = 86400000ms
	HH: 3600000// 1hour = 3600000ms
	mm: 60000// 1minute = 60000ms
	ss: 1000// 1second = 1000ms
}
```