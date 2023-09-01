declare function _default(): {
    (index?: number): Promise<any>;
    /**
     * Add a dag execution plan.
     * @param {Function} callback A callback that runs when all dependencies are ready.
     * @param {*[]} dependencies These are the values passed as parameters when executing the `callback`.
     *
     * If the value is a function,
     * it waits for the function to be executed by dag and is replaced by the resulting value.
     * @returns The DAG instance with the added execution plan.
     *
     * This method allows you to build the DAG by specifying each job and its dependencies.
     *
     * You can chain this method to add multiple jobs and their respective dependencies to the DAG.
     *
     * The DAG execution plan is specified as a `callback` function
     * that receives resolved dependency values as arguments.
     */
    add(callback: Function, ...dependencies: any[]): any;
};
export default _default;
//# sourceMappingURL=dag.d.ts.map