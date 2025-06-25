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
const _default = handler => {
	/** @type {number} */
	let cache_time
	/** @type {Record<string, ReturnType<T>>} */
	const cached_value = {}
	/** @type {Promise<ReturnType<T>>?} */
	let debounce_promise
	/** @type {number} */
	let debounce_time_ms
	/** @type {boolean} */
	let is_in_progress
	/** @type {(reason: Error, count: number) => void} */
	let retry_checker
	let throttle_count = 0
	/** @type {number} */
	let throttle_limit
	/** @type {number} */
	let throttle_time_ms

	const decrease_throttle = () => throttle_count--

	/**
	 * @param {Parameters<T>} args
	 * @returns {Promise<ReturnType<T>>}
	 */
	const throttle_impl = async args => {
		if (!throttle_limit || throttle_count < throttle_limit) {
			if (throttle_limit) {
				throttle_count++
				setTimeout(
					decrease_throttle,
					throttle_time_ms
				)
			}
			return handler(...args)
		}
		throw Error("Too many requests")
	}

	/**
	 * @param {string} key
	 * @returns {void}
	 */
	const clear_cached_value = key => {
		delete cached_value[key]
	}

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
						cached_value[key] = value
						setTimeout(
							clear_cached_value,
							cache_time,
							key
						)
					}
					is_in_progress = false
					resolve(value)
				},
				reason => {
					if (retry_checker) {
						Promise.resolve(retry_checker(reason, ++count))
							.then(
								() => retries_impl(args, resolve, reject, key, count)
							)
							.catch(
								aborted => {
									is_in_progress = false
									reject(aborted)
								}
							)
					} else {
						is_in_progress = false
						reject(reason)
					}
				}
			)

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
			debounce_promise = null
			is_in_progress = true
			retries_impl(args, resolve, reject, key, 0)
		} else reject(Error("Request be debounced"))
	}

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
			debounce_promise = promise
			setTimeout(
				handle_debounce_timeout,
				debounce_time_ms,
				args,
				resolve,
				reject,
				promise,
				key
			)
		} else {
			is_in_progress = true
			retries_impl(args, resolve, reject, key, 0)
		}
	}

	/**
	 * @param {Parameters<T>} args
	 * @returns {Promise<Awaited<ReturnType<T>>>}
	 */
	const utils = (...args) => {
		/** @type {(value?: ReturnType<T>) => void} */// @ts-expect-error: resolve is assigned in Promiseconstructor
		let resolve = void 0
		/** @type {(reason?: Error) => void} */// @ts-expect-error: reject is assigned in Promiseconstructor
		let reject = void 0
		const promise = new Promise(
			(res, rej) => {
				resolve = res
				reject = rej
			}
		)
		const key = JSON.stringify(args)
		if (cached_value[key] != null) resolve(cached_value[key])
		else if (is_in_progress) reject(
			Error("Request already in progress")
		)
		else debounce_impl(args, resolve, reject, promise, key)
		return promise
	}

	/**
	 * Enable caching for the decorated function.
	 * @param {number} s
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.cache = s => {
		cache_time = s * 1000
		return utils
	}

	/**
	 * Enable debouncing for the decorated function.
	 * @param {number} ms
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.debounce = ms => {
		debounce_time_ms = ms
		return utils
	}

	/**
	 * Enable retries for the decorated function.
	 * @param {(reason: Error, count: number) => void} checker
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.retries = checker => {
		retry_checker = checker
		return utils
	}

	/**
	 * Enable throttling for the decorated function.
	 * @param {number} n
	 * @param {number} ms
	 * @returns {ReturnType<typeof _default<T>>}
	 */
	utils.throttle = (n, ms) => {
		throttle_limit = n
		throttle_time_ms = ms
		return utils
	}
	return utils
}

export default _default