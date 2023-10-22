/**
 * Run multiple functions in parallel with a specified limit on the number of parallel executions.
 * @template {[((...args: []) => *), ...((...args: []) => *)[]]} T
 * @param {import("../../private.js").Between<2, readonly T["length"]>} size
 * @param {T} callbacks
 * @returns {Promise<import("../../private.js").ParallelResult<T>>}
 */
const _default = (size, ...callbacks) => {
	/** @type {import("../../private.js").ParallelResult<T>} */
	const result = /** @type {import("../../private.js").ParallelResult<T>} */([])/**/
	return new Promise(resolve => {
		const length = /** @type {import("../../private.js").Between<2, readonly T["length"]>} */(callbacks.length)/**/
		if (length < size) size = length
		let index = 0
		const finally_callback = () => {
			if (index < length) run(index++)
			else if (++index == length + size) resolve(result)
		}
		/**
		 * @param {number} i
		 * @returns {Promise<{ value: * } | { reason: * }>}
		 */
		const run = i =>
			Promise.resolve(callbacks[i]())
				.then(value => result[i] = { value }, reason => result[i] = { reason })
				.finally(finally_callback)
		while (index < size) run(index++)
	})
}

export default _default