export default _default;
/**
 * Run multiple functions in parallel with a specified limit on the number of parallel executions.
 * @template {[((...args: []) => *), ...((...args: []) => *)[]]} T
 * @param {import("../../private.js").Between<2, readonly T["length"]>} size
 * @param {T} handlers
 * @returns {Promise<import("../../private.js").ParallelResult<T>>}
 */
declare function _default<T extends [() => any, ...(() => any)[]]>(size: import("../../private.js").Between<2, T["length"]>, ...handlers: T): Promise<import("../../private.js").ParallelResult<T>>;
//# sourceMappingURL=parallel.d.ts.map