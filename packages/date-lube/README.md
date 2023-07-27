# Date Lube
## Simplify Date Manipulation in JavaScript
Working with dates in JavaScript can often be challenging, especially when it comes to parsing, formatting, and performing calculations.  
However, with the **"date-lube"** library, managing dates becomes a seamless experience.  
This powerful JavaScript library provides a comprehensive set of functions that simplify date manipulation tasks and empower developers to work efficiently with dates.
<br>
<br>

## installation
index.min.js: 1,503 byte
```
npm i -D date-lube
```

<br>

## types
```ts
declare module "date-lube" {
	const add: (date: Date, sum: string) => Date
	const dateToString: (date: Date, format?: string) => string
	const stringToDate: (str: string, format?: string) => Date
	const timeUnit: {
		DD: 86400000,
		HH: 3600000,
		mm: 60000,
		ss: 1000
	}
	const timeZone = (date: Date, timeZone: string) => Date
}
```
<br>

## Flexible Date Formatting
```js
import { dateToString, stringToDate, timeUnit } from "date-lube"

// Convert a Date to a formatted string
dateToString(new Date("2222-02-02T22:22:22.222")) =
//=> "2222-02-02T22:22:22.222"

// With custom date format
dateToString(new Date("2222-02-02T22:22:22.222"), "YYYY-DD/mm:sss") 
//=> "2222-02/22:22s"

// Convert a formatted string to a Date
stringToDate("2222-02-02T22:22:22.222") 
//=> Date { 2222-02-02T13:22:22.222Z } UTC +09:00

// With custom date format
stringToDate(
	"2221-02/23:224"
	, "YYYY-DD/mm:sss"
)
//=> Date { 2221-01-01T15:23:22.224Z } UTC +09:00

// Convert ms to a formatted string with timeUnit
let gap = new Date() - add(new Date(), "5HH13mm-7ss")
let dateStr = `${parseInt(gap / timeUnit.HH)}h ${parseInt(gap % timeUnit.HH / timeUnit.mm)}m`
//=> "-5h -10m"
```
<br>

## Effortless Date Arithmetic
```js
import { add } from "date-lube"

const date = new Date("2222-02-02T22:22:22.222") // Origin date
//=> Date { 2222-02-02T13:22:22.222Z } UTC +09:00

add(date, "1sss") // 1 ms later
//=> Date { 2222-02-02T13:22:22.223Z } UTC +09:00

add(date, "-2ss 1sss") // 1.999 seconds ago
//=> Date { 2222-02-02T13:22:20.224Z } UTC +09:00

add(date, "3mm2ss") // 3 minutes 2 seconds later
//=> Date { 2222-02-02T13:25:22.224Z } UTC +09:00

add(date, "-4HH -3mm") // 4 hours 3 minutes ago
//=> Date { 2222-02-02T09:22:22.224Z } UTC +09:00

add(date, "5DD4HH") // 5 days 4 hours later
//=> Date { 2222-02-07T13:22:22.224Z } UTC +09:00

add(date, "-6MM -5DD") // 6 months 5 days ago
//=> Date { 2221-08-02T13:22:22.224Z } UTC +09:00

add(date, "7YYYY6MM") // 7 years 6 months later
//=> Date { 2229-02-02T13:22:22.224Z } UTC +09:00
```
<br>

## Simple Time Zone Calculations
```js
import { timeZone } from "date-lube"

const seoul = new Date("2222-02-02T22:22:22.222") // Origin date in Asia/Seoul
//=> Date { 2222-02-02T13:22:22.222Z } UTC +09:00

const newYork = timeZone(new Date(seoul), "America/New_york") // Change the time from Seoul to New York
//=> Date { 2222-02-02T00:22:22.222Z } UTC +09:00
```
- - -