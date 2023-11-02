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
	let cache_time = 0
	/** @type {ReturnType<T>?} */
	let cached_value
	/** @type {Promise<ReturnType<T>>?} */
	let debounce_promise
	let debounce_time_ms = 0
	/** @type {boolean} */
	let is_in_progress
	/** @type {(reason: Error, count: number) => void} */
	let retry_checker
	let throttle_count = 0
	let throttle_limit = 0
	let throttle_time_ms = 0

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

	const clear_cached_value = () => cached_value = null

	/**
	 * @param {Parameters<T>} args
	 * @param {(value: ReturnType<T>) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {number} count
	 * @returns {Promise<void>}
	 */
	const retries_impl = (args, resolve, reject, count) =>
		throttle_impl(args)
			.then(
				value => {
					if (cache_time) {
						cached_value = value
						setTimeout(clear_cached_value, cache_time)
					}
					is_in_progress = false
					resolve(value)
				},
				reason => {
					if (retry_checker) {
						Promise.resolve(retry_checker(reason, ++count))
							.then(
								() => retries_impl(args, resolve, reject, count)
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
	 * @returns {void}
	 */
	const handle_debounce_timeout = (args, resolve, reject, promise) => {
		if (debounce_promise == promise) {
			debounce_promise = null
			is_in_progress = true
			retries_impl(args, resolve, reject, 0)
		} else reject(Error("Request be debounced"))
	}

	/**
	 * @param {Parameters<T>} args
	 * @param {(value?: ReturnType<T>) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {Promise<ReturnType<T>>} promise
	 * @returns {void}
	 */
	const debounce_impl = (args, resolve, reject, promise) => {
		if (debounce_time_ms) {
			debounce_promise = promise
			setTimeout(
				handle_debounce_timeout,
				debounce_time_ms,
				args,
				resolve,
				reject,
				promise
			)
		} else {
			is_in_progress = true
			retries_impl(args, resolve, reject, 0)
		}
	}

	/**
	 * @param {Parameters<T>} args
	 * @returns {Promise<Awaited<ReturnType<T>>>}
	 */
	const utils = (...args) => {
		/** @type {(value?: ReturnType<T>) => void} */
		let resolve
		/** @type {(reason?: Error) => void} */
		let reject
		const promise = new Promise(
			(res, rej) => {
				resolve = res
				reject = rej
			}
		)
		// @ts-ignore: resolve is assigned in PromiseConstructor
		if (cached_value != null) resolve(cached_value)
		// @ts-ignore: reject is assigned in PromiseConstructor
		else if (is_in_progress) reject(
			Error("Request already in progress")
		)
		// @ts-ignore: resolve & reject is assigned in PromiseConstructor
		else debounce_impl(args, resolve, reject, promise)
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