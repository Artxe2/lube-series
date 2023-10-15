export default _default;
/**
 * Create a function decorator with added behaviors such as caching, debouncing, retries, and throttling.
 * @template {(...args: *[]) => *} T
 * @param {T} callback
 * @returns
 * ```
 * type Decorator<T extends Function> = {
 *   // Run decorator.
 *   (...args): Promise<ReturnType<typeof callback>>
 * }
 * ```
 * @throws
 * ```
 * Error("Request already in progress") // If you call the function again before the previous operation finishes.
 * ```
 * @throws
 * ```
 * Error("Request be debounced") // If the operation is cancelled by the debounce.
 * ```
 * @throws
 * ```
 * Error("Too many requests") // f the operation is cancelled by the throttle.
 * ```
 */
declare function _default<T extends (...args: any[]) => any>(callback: T): {
    (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>>;
    /**
     * Enable caching for the decorated function.
     * @param {number} s
     * @returns {ReturnType<typeof _default<T>>}
     */
    cache(s: number): ReturnType<typeof _default<T>>;
    /**
     * Enable debouncing for the decorated function.
     * @param {number} ms
     * @returns {ReturnType<typeof _default<T>>}
     */
    debounce(ms: number): ReturnType<typeof _default<T>>;
    /**
     * Enable retries for the decorated function.
     * @param {(reason: Error, count: number) => void} checker
     * @returns {ReturnType<typeof _default<T>>}
     */
    retries(checker: (reason: Error, count: number) => void): ReturnType<typeof _default<T>>;
    /**
     * Enable throttling for the decorated function.
     * @param {number} n
     * @param {number} ms
     * @returns {ReturnType<typeof _default<T>>}
     */
    throttle(n: number, ms: number): ReturnType<typeof _default<T>>;
};
//# sourceMappingURL=decorator.d.ts.map