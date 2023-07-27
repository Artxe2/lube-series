let PR = Promise
let run_node = (resolve, reject, jobs, dependents, count, dependencies, callback, index) => PR.resolve()
		.then(async () => callback(...(dependencies.length ? await PR.all(dependencies) : dependencies)))
		.then(value => {
			jobs.set(dependencies, value)
			if (!--count[0]) resolve([...jobs.values()][index])
			else {
				let queue = dependents.get(callback)
				if (queue) {
					for (let p of queue) {
						p[p.indexOf(callback)] = value
						if (p.every(p => typeof p != "function"))
							run_node(resolve, reject, jobs, dependents, count, p, jobs.get(p), index)
					}
				}
			}
		}, reject)
let run_dag = (nodes, index) => new PR((resolve, reject) => {
	let jobs = new Map()
	let dependents = new Map()
	for (let [dependencies, callback] of nodes) {
		let clone = [...dependencies]
		jobs.set(clone, callback)
		for (let p of clone)
			if (typeof p == "function") {
				let array = dependents.get(p)
				if (array) array.push(clone)
				else dependents.set(p, [ clone ])
			}
	}
	let count = [ jobs.size ]
	for (let [dependencies, callback] of jobs)
		if (dependencies.every(p => typeof p != "function"))
			run_node(resolve, reject, jobs, dependents, count, dependencies, callback, index)
})

let dag = () => {
	let nodes = new Map()
	let utils = (index = nodes.size - 1) => run_dag(nodes, index)
	utils.add = (callback, ...dependencies) => {
		nodes.set(dependencies, callback)
		return utils
	}
	return utils
}

let decorator = callback => {
	let isInProgress
	let cachedValue
	let throttleCount = 0
	let cleanup_throttle = () => throttleCount--
	let throttle_impl = async args => {
		if (!throttleLimit || throttleCount < throttleLimit) {
			if (throttleLimit) {
				throttleCount++
				setTimeout(cleanup_throttle, throttleTimeMs)
			}
			return callback(...args)
		}
		throw "Too many requests"
	}
	let clear_cached_value = () => cachedValue = null
	let retries_impl = (args, resolve, reject, count) => throttle_impl(args)
			.then(value => {
				if (cacheTime) {
					cachedValue = value
					setTimeout(clear_cached_value, cacheTime)
				}
				isInProgress = 0
				resolve(value)
			}, reason => {
				if (retry_callback) {
					PR.resolve(retry_callback(reason, ++count))
						.then(() => retries_impl(args, resolve, reject, count))
						.catch(reason => {
							isInProgress = 0
							reject(reason)
						})
				} else {
					isInProgress = 0
					reject(reason)
				}
			})
	let handle_debounce_timeout = (args, resolve, reject, promise) => {
		if (debouncePromise == promise) {
			debouncePromise = null
			isInProgress = 1
			retries_impl(args, resolve, reject, 0)
		}
		else reject("Request be debounced")
	}
	let debouncePromise
	let debounce_impl = (args, resolve, reject, promise) => {
		if (debounceTimeMs) {
			debouncePromise = promise
			setTimeout(handle_debounce_timeout, debounceTimeMs, args, resolve, reject, promise)
		} else {
			isInProgress = 1
			retries_impl(args, resolve, reject, 0)
		}
	}
	let utils = (...args) => {
		let resolve
		let reject
		let promise = new PR((res, rej) => {
			resolve = res
			reject = rej
		})
		if (cachedValue != null) resolve(cachedValue)
		else if (isInProgress) reject("Request already in progress")
		else debounce_impl(args, resolve, reject, promise)
		return promise
	}
	let cacheTime = 0
	utils.cache = s => {
		cacheTime = s * 1000
		return utils
	}
	let throttleLimit = 0
	let throttleTimeMs = 0
	utils.throttle = (n, ms) => {
		throttleLimit = n
		throttleTimeMs = ms
		return utils
	}
	let retry_callback
	utils.retries = (callback) => {
		retry_callback = callback
		return utils
	}
	let debounceTimeMs = 0
	utils.debounce = ms => {
		debounceTimeMs = ms
		return utils
	}
	return utils
}

let parallel = (size, ...callbacks) => new PR(resolve => {
	let length = callbacks.length
	if (length < size) size = length
	let index = 0
	let finally_callback = () => {
		if (index < length) run(callbacks, index++)
		else if (++index == length + size) resolve(callbacks)
	}
	let run = (callbacks, i) => PR.resolve()
		.then(callbacks[i])
		.then(value => callbacks[i] = { value }, reason => callbacks[i] = { reason })
		.finally(finally_callback)
	while (index < size) run(callbacks, index++)
})

export { dag, decorator, parallel }