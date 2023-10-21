/**
 * @param {(value?: *) => void} resolve
 * @param {(reason?: Error) => void} reject
 * @param {Map<*[], Function>} jobs
 * @param {Map<Function, *[][]>} dependents
 * @param {[number]} count
 * @param {*[]} dependencies
 * @param {Function} callback
 * @param {number} index
 * @returns {Promise<*>}
 */
const run_node = async (resolve, reject, jobs, dependents, count, dependencies, callback, index) => {
	const value = await callback(
		...(dependencies.length ? await Promise.all(dependencies) : dependencies)
	)
	jobs.set(dependencies, value)
	if (!--count[0]) resolve([...jobs.values()][index])
	else {
		const queue = dependents.get(callback)
		if (queue) {
			for (const p of queue) {
				p[p.indexOf(callback)] = value
				if (
					p.every(
						p => typeof p != "function"
					)
				) {
					run_node(
						resolve,
						reject,
						jobs,
						dependents,
						count,
						p,
						/** @type {Function} */(jobs.get(p))/**/,
						index
					).catch(reject)
				}
			}
		}
	}
}

/**
 * @param {Map<*[], Function>} nodes
 * @param {number} index
 * @returns {Promise<*>}
 */
const run_dag = (nodes, index) =>
	new Promise(
		(resolve, reject) => {
			/** @type {Map<*[], Function>} */
			const jobs = new Map()
			/** @type {Map<Function, *[][]>} */
			const dependents = new Map()
			/** @type {[number]} */
			const count = [ nodes.size ]

			for (const [dependencies, callback] of nodes) {
				const clone = [...dependencies]
				jobs.set(clone, callback)
				for (const p of clone)
					if (typeof p == "function") {
						const array = dependents.get(p)
						if (array) array.push(clone)
						else dependents.set(p, [ clone ])
					}
			}
			for (const [dependencies, callback] of jobs) {
				if (
					dependencies.every(/** @type {*} */(p)/**/ => typeof p != "function")
				) {
					run_node(resolve, reject, jobs, dependents, count, dependencies, callback, index)
						.catch(reject)
				}
			}
		}
	)

/**
 * Create a new Directed Acyclic Graph (DAG).
 * @returns
 * ```
 * type Dag = {
 *   // Run dag.
 *   (index?): Promise<any>
 *   // Add a dag execution plan.
 *   add(callback: Function, ...dependencies: any[]): Dag
 * }
 * ```
 */
const _default = () => {
	/** @type {Map<*[], Function>} */
	const nodes = new Map()

	/**
	 * @param {number=} index
	 * @returns {Promise<Awaited<ReturnType<typeof run_dag>>>}
	 */
	const utils = (index = nodes.size - 1) => run_dag(nodes, index)

	/**
	 * @template {(...args: *[]) => *} T
	 * @param {T} callback
	 * @param {import("../../private.js").Dependencies<T>} dependencies
	 * @returns {ReturnType<typeof _default>}
	 */
	utils.add = (callback, ...dependencies) => {
		nodes.set(dependencies, callback)
		return utils
	}
	return utils
}

export default _default