# Lube Series
Simplify ~ ~ JavaScript Librarys in NPM

### **[/async-lube](https://www.npmjs.com/package/async-lube)**: Async Lube
Simplify Asynchronous Operations in JavaScript
```ts
type DAG = {
	(index?: number): Promise<any|void>
	add(callback: Function, ...dependencies: any[]): DAG
}
type Decorator = {
	(...args: any[]): Promise<any|void>
	cache(s: number): Decorator
	debounce(ms: number): Decorator
	retries(checker: (reason: any, count: number) => (any|void)): Decorator
	throttle(n: number, ms: number): Decorator
}
declare module "async-lube" {
	const dag: () => DAG
	const decorator: (callback: Function) => Decorator
	const parallel: (size: number, ...callbacks: Function[]) => Promise<({ value: any|void }|{ reason: any|void })[]>
}
```

### **[/date-lube](https://www.npmjs.com/package/date-lube)**: Date Lube
Simplify Date Manipulation in JavaScript
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

### **[/fetch-lube](https://www.npmjs.com/package/fetch-lube)**: Fetch Lube
Simplify Fetch API Usage in JavaScript
```ts
type Data = { [x: string]: string | number }
type Options = {
	mode?: "no-cors" | "cors" | "same-origin"
	cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached"
	credentials?: "include" | "same-origin" | "omit"
	redirect: "manual" | "follow" | "error"
	referrerPolicy: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
}
type GetFetch = (data?: { [x: string]: string | number }, headers?: Data) => Promise<Response>
type SetOptionsBody = {
	json: GetFetch
	multiPart: (data?: { [x: string]: string | number | File }, headers?: Data) => Promise<Response>
	urlEncoded: GetFetch
}
declare module "fetch-lube" {
	const client: (url: string, setAbort?: (abort: Function) => void) => {
		get: (options?: Options) => {
			query: GetFetch
		}
		delete: (options?: Options) => SetOptionsBody
		head: (options?: Options) => SetOptionsBody
		options: (options?: Options) => SetOptionsBody
		post: (options?: Options) => SetOptionsBody
		put: (options?: Options) => SetOptionsBody
		patch: (options?: Options) => SetOptionsBody
	}
}
```

### **[/wizard-lube](https://www.npmjs.com/package/wizard-lube)**: Wizard Lube
Simplify Wizard Flow Management in JavaScript
```ts
type Flow = {
	add: (pathname: string, handler: HandlerFunction) => Flow
	begin: () => {
		data: () => Record<string, any>
		step: (data: Record<string, any>) => void
	}
}
declare module "wizard-lube" {
	const flow: (base?: string) => Flow
}
```