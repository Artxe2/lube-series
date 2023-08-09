# Date Lube
## Simplify Date Manipulation in JavaScript
Working with dates in JavaScript can often be challenging, especially when it comes to parsing, formatting, and performing calculations.  
However, with the **"date-lube"** library, managing dates becomes a seamless experience.  
This powerful JavaScript library provides a comprehensive set of functions that simplify date manipulation tasks and empower developers to work efficiently with dates.
<br>
<br>

## installation
```
npm i -D date-lube
```

<br>

## types
```ts
declare module "date-lube" {
	/**
	 * Calculates and adds the specified time duration to the provided date.
	 * @param date The initial Date object.
	 * @param sum A string containing time units and values to calculate and add.
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
	const add: (date: Date, sum: string) => Date

	/**
	 * Converts a Date object to a formatted string representation.
	 * @param date The Date object to be formatted.
	 * @param format The desired format string with placeholders.
	 *
	 * (Default: "YYYY-MM-DDTHH:mm:ss.sss")
	 *
	 * Supported time units:
	 * - "YYYY": Years
	 * - "MM": Months
	 * - "DD": Days
	 * - "HH": Hours
	 * - "mm": Minutes
	 * - "ss": Seconds
	 * - "sss": Milliseconds
	 * @returns A formatted string representing the provided date.
	 */
	const dateToString: (date: Date, format?: string) => string

	/**
	 * Converts a date string to a Date object based on the provided format.
	 * @param str The date string to be parsed.
	 * @param format The format of the input date string using placeholders.
	 *
	 * (Default: "YYYY-MM-DDTHH:mm:ss.sss")
	 *
	 * Supported time units:
	 * - "YYYY": Years
	 * - "MM": Months
	 * - "DD": Days
	 * - "HH": Hours
	 * - "mm": Minutes
	 * - "ss": Seconds
	 * - "sss": Milliseconds
	 * @returns A Date object representing the parsed date.
	 */
	const stringToDate: (str: string, format?: string) => Date

	/**
	 * An object that defines time units and their corresponding milliseconds values.
	 */
	const timeUnit: {
		DD: 86400000,
		HH: 3600000,
		mm: 60000,
		ss: 1000
	}

	/**
	 * Adjusts the date according to the specified time zone offset.
	 * @param date The Date object to be adjusted.
	 * @param timeZone A string representing the IANA time zone identifier.
	 *
	 * (e.g., "America/New_York" {@link https://www.iana.org/time-zones})
	 * @returns The modified Date object with the adjusted time zone.
	 */
	const timeZone = (date: Date, timeZone: string) => Date
}
```