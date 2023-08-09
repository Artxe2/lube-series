# Lube Series
Simplify ~ ~ JavaScript Librarys in NPM

### **[/async-lube](https://www.npmjs.com/package/async-lube)**: Async Lube
Simplify Asynchronous Operations in JavaScript
```ts
/**
 * Represents a Directed Acyclic Graph (DAG).
 */
type DAG = {
	/**
	 * Run dag.
	 * @param index The index of the job that will be passed as a result of Promise after all dag jobs have been completed.
	 *
	 * Default value is node.size - 1(lastly added).
	 * @returns A Promise that resolves to the result of the DAG execution.
  	 *
	 * The resolved value corresponds to the result of the job at the specified index (if provided).
	 */
	(index?: number): Promise<any>

	/**
	 * Add a dag execution plan.
	 * @param callback A callback that runs when all dependencies are ready.
	 * @param dependencies These are the values ​​passed as parameters when executing the callback.
	 *
	 * If the value is a function, it waits for the function to be executed by dag and is replaced by the resulting value.
	 * @returns The DAG instance with the added execution plan.
	 *
	 * This method allows you to build the DAG by specifying each job and its dependencies.
	 *
	 * You can chain this method to add multiple jobs and their respective dependencies to the DAG.
	 *
	 * The DAG execution plan is specified as a callback function that receives resolved dependency values as arguments.
	 */
	add(callback: Function, ...dependencies: any[]): DAG
}

/**
 * Represents a function decorator with added behaviors.
 */
type Decorator = {
	/**
	 * Run decorator.
	 * @param args Arguments to be passed to the decorated function.
	 * @returns A Promise that resolves to the result of the decorated function.
	 * @throws Error("Request already in progress") -- If you call the function again before the previous operation finishes.
	 * @throws Error("Request be debounced") -- If the operation is cancelled by the debounce.
	 * @throws Error("Too many requests") -- If the operation is cancelled by the throttle.
	 */
	(...args: any[]): Promise<any>

	/**
	 * Enable caching for the decorated function.
	 * @param s The cache duration in seconds.
	 * @returns The Decorator with caching behavior applied.
	 */
	cache(s: number): Decorator

	/**
	 * Enable debouncing for the decorated function.
	 * @param ms The debounce time in milliseconds.
	 * @returns The Decorator with debouncing behavior applied.
	 */
	debounce(ms: number): Decorator

	/**
	 * Enable retries for the decorated function.
	 * @param checker A function to determine whether to retry based on the rejection reason and the retry count.
	 *
	 * If no errors occur in the checker, proceed with the retry.
	 * @returns The Decorator with retries behavior applied.
	 */
	retries(checker: (reason: Error, count: number) => void): Decorator

	/**
	 * Enable throttling for the decorated function.
	 * @param n The throttle limit (maximum number of calls).
	 * @param ms The throttle time interval in milliseconds.
	 * @returns The Decorator with throttling behavior applied.
	 */
	throttle(n: number, ms: number): Decorator
}

declare module "async-lube" {
	/**
	 * Create a new Directed Acyclic Graph (DAG).
	 * @returns The DAG instance with methods to add execution plans and run the DAG asynchronously.
	 */
	const dag: () => DAG

	/**
	 * Create a function decorator with added behaviors such as caching, debouncing, retries, and throttling.
	 * @param callback The function to be decorated.
	 * @returns The Decorator with added behaviors.
	 */
	const decorator: (callback: Function) => Decorator

	/**
	 * Run multiple functions in parallel with a specified limit on the number of parallel executions.
	 * @param size The maximum number of functions to run in parallel.
	 * @param callbacks The array of functions to run in parallel.
	 * @returns A Promise that resolves to an array of objects containing the result or rejection reason of each function.
	 */
	const parallel: (size: number, ...callbacks: Function[]) => Promise<({ value: any }|{ reason: any })[]>
}
```

### **[/date-lube](https://www.npmjs.com/package/date-lube)**: Date Lube
Simplify Date Manipulation in JavaScript
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

### **[/fetch-lube](https://www.npmjs.com/package/fetch-lube)**: Fetch Lube
Simplify Fetch API Usage in JavaScript
```ts
/**
 * Configuration options for an HTTP request.
 */
type Options = {
	mode?: "no-cors" | "cors" | "same-origin"
	cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached"
	credentials?: "include" | "same-origin" | "omit"
	redirect?: "manual" | "follow" | "error"
	referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
}

/**
 * Type representing different request body types for HTTP requests.
 */
type SetOptionsBody = {
	/**
	 * Function for making a JSON fetch request with optional data and headers.
	 * @param data Optional data to be sent with the JSON request.
	 * @param headers Optional headers to be included in the JSON request.
	 * @returns A Promise containing the response.
	 */
	json(
		data?: Record<string, string | number>,
		headers?: Record<string, string | number>
	): Promise<Response>
	/**
	 * Function for making a multipart fetch request with optional data and headers.
	 *
	 * Accepts File objects as values in the `data` parameter.
	 * @param data Optional data to be sent with the multipart request.
	 * @param headers Optional headers to be included in the multipart request.
	 * @returns A Promise containing the response.
	 */
	multiPart(
		data?: Record<string, string | number | File>,
		headers?: Record<string, string | number>
	): Promise<Response>

	/**
	 * Function for making a URL-encoded fetch request with optional data and headers.
	 * @param data Optional data to be sent with the URL-encoded request.
	 * @param headers Optional headers to be included in the URL-encoded request.
	 * @returns A Promise containing the response.
	 */
	urlEncoded(
		data?: Record<string, string | number>,
		headers?: Record<string, string | number>
	): Promise<Response>
}

declare module "fetch-lube" {
	/**
	 * Function that creates an HTTP client for a specific URL with optional abort callback.
	 *
	 * Returns an object containing various HTTP methods.
	 * @param url The URL to create the HTTP client for.
	 * @param setAbort An optional callback function to abort the request.
	 * @returns An object containing various HTTP methods.
	 */
	const client: (url: string, setAbort?: (abort: Function) => void) => {
		/**
		 * HTTP GET method.
		 * @param options Optional configuration options for the request.
		 * @returns An object containing the `query` function for call `Fetch` with query parameters.
		 */
		get(options?: Options): {
			/**
			 * Function for making a GET fetch request with optional data and headers.
			 *
			 * Returns a Promise containing the response.
			 * @param data Optional data to be sent with the GET request.
			 * @param headers Optional headers to be included in the GET request.
			 * @returns A Promise containing the response.
			 */
			query(
				data?: Record<string, string | number>,
				headers?: Record<string, string | number>
			): Promise<Response>
		}

		/**
		 * HTTP DELETE method.
		 * @param options Optional configuration options for the request.
		 * @returns An object containing the `json`, `multiPart`, `urlEncoded` function for call `Fetch` with body parameters.
		 */
		delete(options?: Options): SetOptionsBody

		/**
		 * HTTP HEAD method.
		 * @param options Optional configuration options for the request.
		 * @returns An object containing the `json`, `multiPart`, `urlEncoded` function for call `Fetch` with body parameters.
		 */
		head(options?: Options): SetOptionsBody
	
		/**
		 * HTTP OPTIONS method.
		 * @param options Optional configuration options for the request.
		 * @returns An object containing the `json`, `multiPart`, `urlEncoded` function for call `Fetch` with body parameters.
		 */
		options(options?: Options): SetOptionsBody
	
		/**
		 * HTTP POST method.
		 * @param options Optional configuration options for the request.
		 * @returns An object containing the `json`, `multiPart`, `urlEncoded` function for call `Fetch` with body parameters.
		 */
		post(options?: Options): SetOptionsBody
	
		/**
		 * HTTP PUT method.
		 * @param options Optional configuration options for the request.
		 * @returns An object containing the `json`, `multiPart`, `urlEncoded` function for call `Fetch` with body parameters.
		 */
		put(options?: Options): SetOptionsBody
	
		/**
		 * HTTP PATCH method.
		 * @param options Optional configuration options for the request.
		 * @returns An object containing the `json`, `multiPart`, `urlEncoded` function for call `Fetch` with body parameters.
		 */
		patch(options?: Options): SetOptionsBody
	}
}
```

### **[/hangle-lube](https://www.npmjs.com/package/hangle-lube)**: Hangle Lube
Simplify Korean Consonant Search in JavaScript
```ts
declare module "hangul-lube" {
	/**
	 * Generates a regular expression pattern for Korean consonant search.
	 * @param text The input text containing Korean consonant characters.
	 * @returns A regular expression string that matches Korean words with the same initial consonant letter as the input text.
	 * @example
	 * pattern("ㄷㅎㅁㄱ"); //=> "[다-딯][하-힣][마-밓][가-깋]"
	 *
	 * pattern("특수문자 test 1234!@#$"); //=> "특[수-숳]문[자-잫] test 1234!@#$"
	 */
	const pattern: (text: string) => string
}
```

### **[/wizard-lube](https://www.npmjs.com/package/wizard-lube)**: Wizard Lube
Simplify Wizard Flow Management in JavaScript
```ts
/**
 * Represents the object returned by the `flow` function.
 *
 * Provides methods to add form handlers and begin form processing.
 */
type Flow = {
	/**
	 * Adds a form handler for the specified `pathname`.
	 * @param pathname The relative URL path for the handler.
	 * @param handler The function that handles the form data for the specified `location.pathname`.
	 * @returns The `Flow` object for method chaining.
	 */
	add(pathname: string, handler: (data: Record<string, any>) => void): Flow

	/**
	 * Begins the form processing and returns an object with methods to manage the form data.
	 * @returns An object containing methods to interact with the form data and step through the wizard.
	 */
	begin(): {
		/**
		 * Retrieves the current form data.
		 * @returns The current form data as an object with string keys and any values.
		 */
		data(): Record<string, any>

		/**
		 * A function that update data from the previous step for `popState`.
		 * @throws Error("No information from previous data.") -- Failed to get previous data to current `location.pathname`
		 */
		footprint(): Promise<void>

		/**
		 * Forward the form data updated with the `data` you received to the data handler corresponding to the current `location.pathname`.
		 * @param data The form data to be updated for the current step.
		 */
		step(data: Record<string, any>): void
	}
}

declare module "wizard-lube" {
	/**
	 * Creates and initializes a form wizard with optional base URL.
	 * @param base The base URL for the form wizard.
	 *
	 * (Default: "/")
	 * @returns A Flow instance to manage the form flow and handlers.
	 */
	const flow: (base?: string) => Flow
}
```