/**
 * @param {Record<string, string | number>=} data
 * @returns {string}
 */
const to_query = data => {
	let query = ""
	if (data) {
		for (const key in data) {
			query += (query ? "&" : "")
				+ encodeURIComponent(key)
				+ "="
				+ encodeURIComponent(
					/** @type {string} */(data[key])/**/
				)
		}
	}
	return query
}

/**
 * @param {Record<string, string | number | Blob>=} data
 * @returns {FormData | undefined}
 */
const to_form_data = data => {
	if (data) {
		const form_data = new FormData()
		for (const key in data) form_data.append(
			key,
			/** @type {string} */(data[key])/**/
		)
		return form_data
	}
}

const path_variable_regex = /:[_a-zA-Z0-9]+/g
/**
 * @param {string} url
 * @param {Record<string, string | number | Blob>=} data
 * @returns {string}
 */
const set_path_variables_in_url = (url, data) => {
	if (data) {
		url = url.replace(
			path_variable_regex,
			s => {
				s = s.slice(1)
				const v = data[s]
				delete data[s]
				return String(v)
			}
		)
	}
	return url
}

/**
 * @param {string} url
 * @param {(abort: VoidFunction) => void=} set_abort
 * @param {RequestInit=} options
 * @param {string=} query
 * @param {Record<string, string>=} headers
 * @returns {Promise<Response>}
 */
const get_fetch_query = (
	url,
	set_abort,
	options,
	query,
	headers
) => {
	options = /** @type {RequestInit} */({ headers, ...options })/**/
	if (set_abort) {
		const controller = new AbortController()
		set_abort(() => controller.abort())
		options.signal = controller.signal
	}
	return fetch(
		url + (query ? "?" + query : ""),
		options
	)
}

/**
 * @param {string} url
 * @param {"DELETE" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT"} method
 * @param {string} content_type
 * @param {(abort: VoidFunction) => void=} set_abort
 * @param {RequestInit=} options
 * @param {string | FormData=} body
 * @param {Record<string, string>=} headers
 * @returns {Promise<Response>}
 */
const get_fetch_body = (
	url,
	method,
	content_type,
	set_abort,
	options,
	body,
	headers
) => {
	headers = {
		"Content-Type": content_type,
		...headers
	}
	options = /** @type {RequestInit} */({ method, body, headers, ...options })/**/
	if (set_abort) {
		const controller = new AbortController()
		set_abort(() => controller.abort())
		options.signal = controller.signal
	}
	return fetch(url, options)
}

/**
 * @param {string} url
 * @param {"DELETE" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT"} method
 * @param {(abort: VoidFunction) => void=} set_abort
 * @param {RequestInit=} options
 * @returns
 * ```
 * type Fetch = {
 *   json(data?, headers?): Promise<Response>
 *   multiPart(data?, headers?): Promise<Response>
 *   urlEncoded(data?, headers?): Promise<Response>
 * }
 * ```
 */
const set_options_body = (url, method, set_abort, options) =>
	({
		/**
		 * Function for making a JSON fetch request with optional data and headers.
		 * @param {Record<string, string | number>=} data
		 * @param {Record<string, string>=} headers
		 * @returns {Promise<Response>}
		 */
		json: (data, headers) =>
			get_fetch_body(
				set_path_variables_in_url(url, data),
				method,
				"application/json;charset=UTF-8",
				set_abort,
				options,
				JSON.stringify(data),
				headers
			),
		/**
		 * Function for making a multipart fetch request with optional data and headers.
		 * @param {Record<string, string | number | Blob>=} data
		 * @param {Record<string, string>=} headers
		 * @returns {Promise<Response>}
		 */
		multiPart: (data, headers) =>
			get_fetch_body(
				set_path_variables_in_url(url, data),
				method,
				"multipart/form-data;charset=UTF-8",
				set_abort,
				options,
				to_form_data(data),
				headers
			),
		/**
		 * Function for making a URL-encoded fetch request with optional data and headers.
		 * @param  {Record<string, string | number>=} data
		 * @param {Record<string, string>=} headers
		 * @returns {Promise<Response>}
		 */
		urlEncoded: (data, headers) =>
			get_fetch_body(
				set_path_variables_in_url(url, data),
				method,
				"application/x-www-form-urlencoded;charset=UTF-8",
				set_abort,
				options,
				to_query(data),
				headers
			)
	})

/**
 * Function that creates an HTTP client for a specific URL with optional abort handler.
 * @param {string} url
 * @param {(abort: VoidFunction) => void=} set_abort
 * @returns
 * ```
 * type Client = {
 *   get(options?): {
 *     query(data?, headers?): Promise<Response>
 *   }
 *   ...(options?): {
 *     json(data?, headers?): Promise<Response>
 *     multiPart(data?, headers?): Promise<Response>
 *     urlEncoded(data?, headers?): Promise<Response>
 *   }
 * }
 * ```
 */
export default (url, set_abort) =>
	({
		/**
		 * HTTP DELETE method.
		 * @param {RequestInit=} options
		 * @returns {ReturnType<typeof set_options_body>}
		 */
		delete: options => set_options_body(url, "DELETE", set_abort, options),
		/**
		 * HTTP GET method.
		 * @param {RequestInit=} options
		 * @returns {{
		 *   query(data?: Record<string, string | number>, headers?: Record<string, string>): Promise<Response>
		 * }}
		 */
		get: options => ({
			/**
			 * Function for making a GET fetch request with optional data and headers.
			 * @param {Record<string, string | number>=} data
			 * @param {Record<string, string>=} headers
			 * @returns {Promise<Response>}
			 */
			query: (data, headers) =>
				get_fetch_query(
					set_path_variables_in_url(url, data),
					set_abort,
					options,
					to_query(data),
					headers
				)
		}),
		/**
		 * HTTP HEAD method.
		 * @param {RequestInit=} options
		 * @returns {ReturnType<typeof set_options_body>}
		 */
		head: options => set_options_body(url, "HEAD", set_abort, options),
		/**
		 * HTTP OPTIONS method.
		 * @param {RequestInit=} options
		 * @returns {ReturnType<typeof set_options_body>}
		 */
		options: options => set_options_body(url, "OPTIONS", set_abort, options),
		/**
		 * HTTP PATCH method.
		 * @param {RequestInit=} options
		 * @returns {ReturnType<typeof set_options_body>}
		 */
		patch: options => set_options_body(url, "PATCH", set_abort, options),
		/**
		 * HTTP POST method.
		 * @param {RequestInit=} options
		 * @returns {ReturnType<typeof set_options_body>}
		 */
		post: options => set_options_body(url, "POST", set_abort, options),
		/**
		 * HTTP PUT method.
		 * @param {RequestInit=} options
		 * @returns {ReturnType<typeof set_options_body>}
		 */
		put: options => set_options_body(url, "PUT", set_abort, options)
	})