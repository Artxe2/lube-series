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