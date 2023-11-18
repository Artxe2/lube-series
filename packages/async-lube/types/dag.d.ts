export default _default;
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
declare function _default(): {
    (index?: number | undefined): Promise<Awaited<ReturnType<typeof run_dag>>>;
    /**
     * @template {(...args: *[]) => *} T
     * @param {T} handler
     * @param {import("#private").Dependencies<T>} dependencies
     * @returns {ReturnType<typeof _default>}
     */
    add<T extends (...args: any[]) => any>(handler: T, ...dependencies: import("#private").Dependencies<T>): ReturnType<typeof _default>;
};
/**
 * @param {Map<*[], Function>} nodes
 * @param {number} index
 * @returns {Promise<*>}
 */
declare function run_dag(nodes: Map<any[], Function>, index: number): Promise<any>;
//# sourceMappingURL=dag.d.ts.map