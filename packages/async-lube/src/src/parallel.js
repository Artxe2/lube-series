/**
 * Run multiple functions in parallel with a specified limit on the number of parallel executions.
 * @param {number} size The maximum number of functions to run in parallel.
 * @param {Function[]} callbacks The array of functions to run in parallel.
 * @returns A Promise that resolves to an array of objects containing the result or rejection reason of each function.
 */
export default (size, ...callbacks) => {
	/** @type {*[]} */
	const result = []
	return new Promise(resolve => {
		const length = callbacks.length
		if (length < size) size = length
		let index = 0
		const finally_callback = () => {
			if (index < length) run(index++)
			else if (++index == length + size) resolve(result)
		}
		/** @param {number} i */
		const run = (i) =>
			Promise.resolve(callbacks[i]())
				.then(value => result[i] = { value }, reason => result[i] = { reason })
				.finally(finally_callback)
		while (index < size) run(index++)
	})
}