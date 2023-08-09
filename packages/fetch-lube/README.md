# Fetch Lube
## Simplify Fetch API Usage in JavaScript
Working with the Fetch API in JavaScript can sometimes be cumbersome and require writing repetitive code.  
With the **"fetch-lube"** library, interacting with the Fetch API becomes easier and more streamlined.  
This powerful JavaScript library provides a client function that simplifies common HTTP methods and allows for convenient configuration of request options.
<br>
<br>

## installation
```
npm i -D fetch-lube
```

<br>

## types
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