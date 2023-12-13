/**
 * Run multiple functions in parallel with a specified limit on the number of parallel executions.
 * @template {[((...args: []) => *), ...((...args: []) => *)[]]} T
 * @param {import("../private.js").Between<2, readonly T["length"]>} size
 * @param {T} handlers
 * @returns {Promise<import("../private.js").ParallelResult<T>>}
 */
let _default = (size, ...handlers) => {
	/** @type {import("../private.js").ParallelResult<T>} */
	let result = /** @type {import("../private.js").ParallelResult<T>} */([])/**/
	return new Promise(
		resolve => {
			let length = /** @type {import("../private.js").Between<2, readonly T["length"]>} */(handlers.length)/**/
			if (length < size) size = length
			let index = 0
			let finally_handler = () => {
				if (index < length) run(index++)
				else if (++index == length + size) resolve(result)
			}
			/**
			 * @param {number} i
			 * @returns {Promise<{ value: * } | { reason: * }>}
			 */
			let run = i =>
				Promise.resolve(handlers[i]?.())
					.then(
						value => result[i] = { value },
						reason => result[i] = { reason }
					)
					.finally(finally_handler)
			while (index < size) run(index++)
		}
	)
}

export default _default