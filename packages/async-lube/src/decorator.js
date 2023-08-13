/**
 * Create a function decorator with added behaviors such as caching, debouncing, retries, and throttling.
 * @param {Function} callback The function to be decorated.
 * @returns The Decorator with added behaviors.
 */
export default callback => {
	let cacheTime = 0
	/** @type {*} */
	let cachedValue
	/** @type {Promise<*>?} */
	let debouncePromise
	let debounceTimeMs = 0
	/** @type {boolean} */
	let isInProgress
	/** @type {(reason: Error, count: number) => void} */
	let retry_checker
	let throttleCount = 0
	let throttleLimit = 0
	let throttleTimeMs = 0

	const decrease_throttle = () => throttleCount--

	/** @param {*[]} args */
	const throttle_impl = async args => {
		if (!throttleLimit || throttleCount < throttleLimit) {
			if (throttleLimit) {
				throttleCount++
				setTimeout(decrease_throttle, throttleTimeMs)
			}
			return callback(...args)
		}
		throw Error("Too many requests")
	}

	const clear_cached_value = () => cachedValue = null

	/**
	 * @param {*[]} args
	 * @param {(value: any) => void} resolve
	 * @param {(reason?: any) => void} reject
	 * @param {number} count
	 * @returns
	 */
	const retries_impl = (args, resolve, reject, count) =>
		throttle_impl(args)
			.then(value => {
				if (cacheTime) {
					cachedValue = value
					setTimeout(clear_cached_value, cacheTime)
				}
				isInProgress = false
				resolve(value)
			}, reason => {
				if (retry_checker) {
					Promise.resolve(retry_checker(reason, ++count))
						.then(() => retries_impl(args, resolve, reject, count))
						.catch(reason => {
							isInProgress = false
							reject(reason)
						})
				} else {
					isInProgress = false
					reject(reason)
				}
			})

	/**
	 * @param {*[]} args
	 * @param {(value: any) => void} resolve
	 * @param {(reason?: any) => void} reject
	 * @param {Promise<*>} promise
	 */
	const handle_debounce_timeout = (args, resolve, reject, promise) => {
		if (debouncePromise == promise) {
			debouncePromise = null
			isInProgress = true
			retries_impl(args, resolve, reject, 0)
		}
		else reject(Error("Request be debounced"))
	}

	/**
	 * @param {*[]} args
	 * @param {(value: any) => void} resolve
	 * @param {(reason?: any) => void} reject
	 * @param {Promise<*>} promise
	 */
	const debounce_impl = (args, resolve, reject, promise) => {
		if (debounceTimeMs) {
			debouncePromise = promise
			setTimeout(handle_debounce_timeout, debounceTimeMs, args, resolve, reject, promise)
		} else {
			isInProgress = true
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
		/** @type {(value: any) => void} */
		let resolve
		/** @type {(reason?: any) => void} */
		let reject
		const promise = new Promise(
			(res, rej) => {
				resolve = res
				reject = rej
			}
		)
		// @ts-ignore
		if (cachedValue != null) resolve(cachedValue)
		// @ts-ignore
		else if (isInProgress) reject(
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
		cacheTime = s * 1000
		return utils
	}

	/**
	 * Enable debouncing for the decorated function.
	 * @param {number} ms The debounce time in milliseconds.
	 * @returns The Decorator with debouncing behavior applied.
	 */
	utils.debounce = ms => {
		debounceTimeMs = ms
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
	utils.retries = (checker) => {
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
		throttleLimit = n
		throttleTimeMs = ms
		return utils
	}
	return utils
}