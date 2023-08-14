/**
 * Create a function decorator with added behaviors such as caching, debouncing, retries, and throttling.
 * @template T
 * @param {(...args: *[]) => T} callback The function to be decorated.
 * @returns The Decorator with added behaviors.
 */
export default callback => {
	let cache_time = 0
	/** @type {T?} */
	let cached_value
	/** @type {Promise<T>?} */
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

	/** @param {*[]} args */
	const throttle_impl = async args => {
		if (!throttle_limit || throttle_count < throttle_limit) {
			if (throttle_limit) {
				throttle_count++
				setTimeout(decrease_throttle, throttle_time_ms)
			}
			return callback(...args)
		}
		throw Error("Too many requests")
	}

	const clear_cached_value = () => cached_value = null

	/**
	 * @param {*[]} args
	 * @param {(value: T) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {number} count
	 * @returns
	 */
	const retries_impl = (args, resolve, reject, count) =>
		throttle_impl(args)
			.then(value => {
				if (cache_time) {
					cached_value = value
					setTimeout(clear_cached_value, cache_time)
				}
				is_in_progress = false
				resolve(value)
			}, reason => {
				if (retry_checker) {
					Promise.resolve(retry_checker(reason, ++count))
						.then(() => retries_impl(args, resolve, reject, count))
						.catch(reason => {
							is_in_progress = false
							reject(reason)
						})
				} else {
					is_in_progress = false
					reject(reason)
				}
			})

	/**
	 * @param {*[]} args
	 * @param {(value: T) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {Promise<*>} promise
	 */
	const handle_debounce_timeout = (args, resolve, reject, promise) => {
		if (debounce_promise == promise) {
			debounce_promise = null
			is_in_progress = true
			retries_impl(args, resolve, reject, 0)
		}
		else reject(Error("Request be debounced"))
	}

	/**
	 * @param {*[]} args
	 * @param {(value: T) => void} resolve
	 * @param {(reason?: Error) => void} reject
	 * @param {Promise<T>} promise
	 */
	const debounce_impl = (args, resolve, reject, promise) => {
		if (debounce_time_ms) {
			debounce_promise = promise
			setTimeout(handle_debounce_timeout, debounce_time_ms, args, resolve, reject, promise)
		} else {
			is_in_progress = true
			retries_impl(args, resolve, reject, 0)
		}
	}

	/**
	 * Run decorator.
	 * @param {*[]} args Arguments to be passed to the decorated function.
	 * @returns A Promise that resolves to the result of the decorated function.
	 * @throws Error("Request already in progress")
	 * -- If you call the function again before the previous operation finishes.
	 * @throws Error("Request be debounced") -- If the operation is cancelled by the debounce.
	 * @throws Error("Too many requests") -- If the operation is cancelled by the throttle.
	 */
	const utils = (...args) => {
		/** @type {(value: T) => void} */
		let resolve
		/** @type {(reason?: Error) => void} */
		let reject
		const promise = new Promise(
			(res, rej) => {
				resolve = res
				reject = rej
			}
		)
		// @ts-ignore
		if (cached_value != null) resolve(cached_value)
		// @ts-ignore
		else if (is_in_progress) reject(
			Error("Request already in progress")
		)
		// @ts-ignore
		else debounce_impl(args, resolve, reject, promise)
		return promise
	}

	/**
	 * Enable caching for the decorated function.
	 * @param {number} s The cache duration in seconds.
	 * @returns The Decorator with caching behavior applied.
	 */
	utils.cache = s => {
		cache_time = s * 1000
		return utils
	}

	/**
	 * Enable debouncing for the decorated function.
	 * @param {number} ms The debounce time in milliseconds.
	 * @returns The Decorator with debouncing behavior applied.
	 */
	utils.debounce = ms => {
		debounce_time_ms = ms
		return utils
	}

	/**
	 * Enable retries for the decorated function.
	 * @param {(reason: Error, count: number) => void} checker
	 * A function to determine whether to retry based on the rejection reason and the retry count.
	 *
	 * If no errors occur in the checker, proceed with the retry.
	 * @returns The Decorator with retries behavior applied.
	 */
	utils.retries = checker => {
		retry_checker = checker
		return utils
	}

	/**
	 * Enable throttling for the decorated function.
	 * @param {number} n The throttle limit (maximum number of calls).
	 * @param {number} ms The throttle time interval in milliseconds.
	 * @returns The Decorator with throttling behavior applied.
	 */
	utils.throttle = (n, ms) => {
		throttle_limit = n
		throttle_time_ms = ms
		return utils
	}
	return utils
}