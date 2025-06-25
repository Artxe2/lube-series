'use strict';

/**
 * @param {Record<string, string | number>=} data
 * @returns {string}
 */
const to_query = data => {
	let query = "";
	if (data) {
		for (const key in data) {
			query += (query ? "&" : "")
				+ encodeURIComponent(key)
				+ "="
				+ encodeURIComponent(
					/** @type {string} */(data[key])/**/
				);
		}
	}
	return query
};

/**
 * @param {Record<string, string | number | Blob>=} data
 * @returns {FormData | undefined}
 */
const to_form_data = data => {
	if (data) {
		const form_data = new FormData();
		for (const key in data) form_data.append(
			key,
			/** @type {string} */(data[key])/**/
		);
		return form_data
	}
};

const path_variable_regex = /:[_a-zA-Z0-9]+/g;
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
				s = s.slice(1);
				const v = data[s];
				delete data[s];
				return String(v)
			}
		);
	}
	return url
};

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
	options = /** @type {RequestInit} */({ headers, ...options });/**/
	if (set_abort) {
		const controller = new AbortController();
		set_abort(() => controller.abort());
		options.signal = controller.signal;
	}
	return fetch(
		url + (query ? "?" + query : ""),
		options
	)
};

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
	};
	options = /** @type {RequestInit} */({ method, body, headers, ...options });/**/
	if (set_abort) {
		const controller = new AbortController();
		set_abort(() => controller.abort());
		options.signal = controller.signal;
	}
	return fetch(url, options)
};

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
	});

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
var client = (url, set_abort) =>
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
	});

/**
 * @param {(value?: *) => void} resolve
 * @param {(reason?: Error) => void} reject
 * @param {Map<*[], Function>} jobs
 * @param {Map<Function, *[][]>} dependents
 * @param {[number]} count
 * @param {*[]} dependencies
 * @param {Function} handler
 * @param {number} index
 * @returns {Promise<*>}
 */
const run_node = async (
	resolve,
	reject,
	jobs,
	dependents,
	count,
	dependencies,
	handler,
	index
) => {
	const value = await handler(
		...(dependencies.length ? await Promise.all(dependencies) : dependencies)
	);
	jobs.set(dependencies, value);
	if (!--count[0]) resolve([ ...jobs.values() ][index]);
	else {
		const queue = dependents.get(handler);
		if (queue) {
			for (const p of queue) {
				p[p.indexOf(handler)] = value;
				if (p.every(v => typeof v != "function")) {
					run_node(
						resolve,
						reject,
						jobs,
						dependents,
						count,
						p,
						/** @type {Function} */(jobs.get(p))/**/,
						index
					).catch(reject);
				}
			}
		}
	}
};

/**
 * @param {Map<*[], Function>} nodes
 * @param {number} index
 * @returns {Promise<*>}
 */
const run_dag = (nodes, index) =>
	new Promise(
		(resolve, reject) => {
			/** @type {Map<*[], Function>} */
			const jobs = new Map();
			/** @type {Map<Function, *[][]>} */
			const dependents = new Map();
			/** @type {[number]} */
			const count = [ nodes.size ];

			for (const [ dependencies, handler ] of nodes) {
				const clone = [ ...dependencies ];
				jobs.set(clone, handler);
				for (const p of clone)
					if (typeof p == "function") {
						const array = dependents.get(p);
						if (array) array.push(clone);
						else dependents.set(p, [ clone ]);
					}
			}
			for (const [ dependencies, handler ] of jobs) {
				if (
					dependencies.every(
						/** @type {*} */p/**/ => typeof p != "function"
					)
				) {
					run_node(
						resolve,
						reject,
						jobs,
						dependents,
						count,
						dependencies,
						handler,
						index
					)
						.catch(reject);
				}
			}
		}
	);

/**
 * Create a new Directed Acyclic Graph (DAG).
 * @returns
 * ```
 * type Dag = {
 *   // Run dag.
 *   (index?): Promise<any>
 *   // Add a dag execution plan.
 *   add(handler: Function, ...dependencies: any[]): Dag
 * }
 * ```
 */
const _default$2 = () => {
	/** @type {Map<*[], Function>} */
	const nodes = new Map();

	/**
	 * @param {number=} index
	 * @returns {Promise<Awaited<ReturnType<typeof run_dag>>>}
	 */
	const utils = (index = nodes.size - 1) => run_dag(nodes, index);

	/**
	 * @template {(...args: *[]) => *} T
	 * @param {T} handler
	 * @param {import("../private.js").Dependencies<T>} dependencies
	 * @returns {ReturnType<typeof _default>}
	 */
	utils.add = (handler, ...dependencies) => {
		nodes.set(dependencies, handler);
		return utils
	};
	return utils
};

/**
 * Create a function decorator with added behaviors such as caching, debouncing, retries, and throttling.
 * @template {(...args: *[]) => *} T
 * @param {T} handler
 * @returns
 * ```
 * type Decorator<T extends Function> = {
 *   // Run decorator.
 *   (...args): Promise<ReturnType<typeof handler>>
 * }
 * ```
 * @throws
 * ```
 * Error("Request already in progress") // If you call the function again before the previous operation finishes.
 * ```
 * @throws
 * ```
 * Error("Request be debounced") // If the operation is cancelled by the debounce.
 * ```
 * @throws
 * ```
 * Error("Too many requests") // f the operation is cancelled by the throttle.
 * ```
 */
const _default$1 = handler => {
	/** @type {number} */
	let cache_time;
	/** @type {Record<string, ReturnType<T>>} */
	const cached_value = {};
	/** @type {Promise<ReturnType<T>>?} */
	let debounce_promise;
	/** @type {number} */
	let debounce_time_ms;
	/** @type {boolean} */
	let is_in_progress;
	/** @type {(reason: Error, count: number) => void} */
	let retry_checker;
	let throttle_count = 0;
	/** @type {number} */
	let throttle_limit;
	/** @type {number} */
	let throttle_time_ms;

	const decrease_throttle = () => throttle_count--;

	/**
	 * @param {Parameters<T>} args
	 * @returns {Promise<ReturnType<T>>}
	 */
	const throttle_impl = async args => {
		if (!throttle_limit || throttle_count < throttle_limit) {
			if (throttle_limit) {
				throttle_count++;
				setTimeout(
					decrease_throttle,
					throttle_time_ms
				);
			}
			return handler(...args)
		}
		throw Error("Too many requests")
	};

	/**
	 * @param {string} key
	 * @returns {void}
	 */
	const clear_cached_value = key => {
		delete cached_value[key];
	};

	/**
	 * @param {Parameters<T>} args
	 * @param {(value: ReturnType<T>) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {string} key
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	const retries_impl = (args, resolve, reject, key, count) =>
		throttle_impl(args)
			.then(
				value => {
					if (cache_time) {
						cached_value[key] = value;
						setTimeout(
							clear_cached_value,
							cache_time,
							key
						);
					}
					is_in_progress = false;
					resolve(value);
				},
				reason => {
					if (retry_checker) {
						Promise.resolve(retry_checker(reason, ++count))
							.then(
								() => retries_impl(args, resolve, reject, key, count)
							)
							.catch(
								aborted => {
									is_in_progress = false;
									reject(aborted);
								}
							);
					} else {
						is_in_progress = false;
						reject(reason);
					}
				}
			);

	/**
	 * @param {Parameters<T>} args
	 * @param {(value?: ReturnType<T>) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {Promise<ReturnType<T>>} promise
	 * @param {string} key
	 * @returns {void}
	 */
	const handle_debounce_timeout = (args, resolve, reject, promise, key) => {
		if (debounce_promise == promise) {
			debounce_promise = null;
			is_in_progress = true;
			retries_impl(args, resolve, reject, key, 0);
		} else reject(Error("Request be debounced"));
	};

	/**
	 * @param {Parameters<T>} args
	 * @param {(value?: ReturnType<T>) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {Promise<ReturnType<T>>} promise
	 * @param {string} key
	 * @returns {void}
	 */
	const debounce_impl = (args, resolve, reject, promise, key) => {
		if (debounce_time_ms) {
			debounce_promise = promise;
			setTimeout(
				handle_debounce_timeout,
				debounce_time_ms,
				args,
				resolve,
				reject,
				promise,
				key
			);
		} else {
			is_in_progress = true;
			retries_impl(args, resolve, reject, key, 0);
		}
	};

	/**
	 * @param {Parameters<T>} args
	 * @returns {Promise<Awaited<ReturnType<T>>>}
	 */
	const utils = (...args) => {
		/** @type {(value?: ReturnType<T>) => void} */// @ts-expect-error: resolve is assigned in Promiseconstructor
		let resolve = void 0;
		/** @type {(reason?: Error) => void} */// @ts-expect-error: reject is assigned in Promiseconstructor
		let reject = void 0;
		const promise = new Promise(
			(res, rej) => {
				resolve = res;
				reject = rej;
			}
		);
		const key = JSON.stringify(args);
		if (cached_value[key] != null) resolve(cached_value[key]);
		else if (is_in_progress) reject(
			Error("Request already in progress")
		);
		else debounce_impl(args, resolve, reject, promise, key);
		return promise
	};

	/**
	 * Enable caching for the decorated function.
	 * @param {number} s
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.cache = s => {
		cache_time = s * 1000;
		return utils
	};

	/**
	 * Enable debouncing for the decorated function.
	 * @param {number} ms
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.debounce = ms => {
		debounce_time_ms = ms;
		return utils
	};

	/**
	 * Enable retries for the decorated function.
	 * @param {(reason: Error, count: number) => void} checker
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.retries = checker => {
		retry_checker = checker;
		return utils
	};

	/**
	 * Enable throttling for the decorated function.
	 * @param {number} n
	 * @param {number} ms
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.throttle = (n, ms) => {
		throttle_limit = n;
		throttle_time_ms = ms;
		return utils
	};
	return utils
};

/**
 * Run multiple functions in parallel with a specified limit on the number of parallel executions.
 * @template {[((...args: []) => *), ...((...args: []) => *)[]]} T
 * @param {import("../private.js").Between<2, readonly T["length"]>} size
 * @param {T} handlers
 * @returns {Promise<import("../private.js").ParallelResult<T>>}
 */
const _default = (size, ...handlers) => {
	/** @type {import("../private.js").ParallelResult<T>} */
	const result = /** @type {import("../private.js").ParallelResult<T>} */([]);/**/
	return new Promise(
		resolve => {
			const length = /** @type {import("../private.js").Between<2, readonly T["length"]>} */(handlers.length);/**/
			if (length < size) size = length;
			let index = 0;
			const finally_handler = () => {
				if (index < length) run(index++);
				else if (++index == length + size) resolve(result);
			};
			/**
			 * @param {number} i
			 * @returns {Promise<{ value: * } | { reason: * }>}
			 */
			const run = i =>
				Promise.resolve(handlers[i]?.())
					.then(
						value => result[i] = { value },
						reason => result[i] = { reason }
					)
					.finally(finally_handler);
			while (index < size) run(index++);
		}
	)
};

exports.client = client;
exports.dag = _default$2;
exports.decorator = _default$1;
exports.parallel = _default;
