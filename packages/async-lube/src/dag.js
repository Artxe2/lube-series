/**
 * @param {(value: any) => void} resolve
 * @param {(reason?: any) => void} reject
 * @param {Map<any[], Function>} jobs
 * @param {Map<Function, any[][]>} dependents
 * @param {[number]} count
 * @param {any[]} dependencies
 * @param {Function|*} callback
 * @param {number} index
 */
const run_node = async (resolve, reject, jobs, dependents, count, dependencies, callback, index) => {
	const value = await callback( ...(dependencies.length ? await Promise.all(dependencies) : dependencies) )
	jobs.set(dependencies, value)
	if (!--count[0]) resolve([...jobs.values()][index])
	else {
		const queue = dependents.get(callback)
		if (queue) {
			for (const p of queue) {
				p[p.indexOf(callback)] = value
				if ( p.every((/** @type {any} */p) => typeof p != "function") ) {
					run_node(resolve, reject, jobs, dependents, count, p, jobs.get(p), index)
						.catch(reject)
				}
			}
		}
	}
}

/**
 * @param {Map<any[], Function>} nodes
 * @param {number} index
 */
const run_dag = (nodes, index) =>
	new Promise( (resolve, reject) => {
		/** @type {Map<any[], Function>} */
		const jobs = new Map()
		/** @type {Map<Function, any[][]>} */
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
		for (const [dependencies, callback] of jobs)
			if ( dependencies.every((/** @type {any} */p) => typeof p != "function") ) {
				run_node(resolve, reject, jobs, dependents, count, dependencies, callback, index)
					.catch(reject)
			}
	} )

/**
 * Create a new Directed Acyclic Graph (DAG).
 * @returns The DAG instance with methods to add execution plans and run the DAG asynchronously.
 */
export default () => {
	/** @type {Map<any[], Function>} */
	const nodes = new Map()

	/**
	 * Run dag.
	 * @param {number} index The index of the job that will be passed as a result of Promise after all dag jobs have been completed.
	 *
	 * Default value is node.size - 1(lastly added).
	 * @returns A Promise that resolves to the result of the DAG execution.
  	 *
	 * The resolved value corresponds to the result of the job at the specified index (if provided).
	 */
	const utils = (index = nodes.size - 1) => run_dag(nodes, index)

	/**
	 * Add a dag execution plan.
	 * @param {Function} callback A callback that runs when all dependencies are ready.
	 * @param {*[]} dependencies These are the values ​​passed as parameters when executing the callback.
	 *
	 * If the value is a function, it waits for the function to be executed by dag and is replaced by the resulting value.
	 * @returns The DAG instance with the added execution plan.
	 *
	 * This method allows you to build the DAG by specifying each job and its dependencies.
	 *
	 * You can chain this method to add multiple jobs and their respective dependencies to the DAG.
	 *
	 * The DAG execution plan is specified as a callback function that receives resolved dependency values as arguments.
	 */
	utils.add = (callback, ...dependencies) => {
		nodes.set(dependencies, callback)
		return utils
	}
	return utils
}