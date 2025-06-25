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
	)
	jobs.set(dependencies, value)
	if (!--count[0]) resolve([ ...jobs.values() ][index])
	else {
		const queue = dependents.get(handler)
		if (queue) {
			for (const p of queue) {
				p[p.indexOf(handler)] = value
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

			for (const [ dependencies, handler ] of nodes) {
				const clone = [ ...dependencies ]
				jobs.set(clone, handler)
				for (const p of clone)
					if (typeof p == "function") {
						const array = dependents.get(p)
						if (array) array.push(clone)
						else dependents.set(p, [ clone ])
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
 *   add(handler: Function, ...dependencies: any[]): Dag
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
	 * @param {T} handler
	 * @param {import("../private.js").Dependencies<T>} dependencies
	 * @returns {ReturnType<typeof _default>}
	 */
	utils.add = (handler, ...dependencies) => {
		nodes.set(dependencies, handler)
		return utils
	}
	return utils
}

export default _default