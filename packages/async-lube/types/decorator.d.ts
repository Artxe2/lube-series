export default _default;
/**
 * Create a function decorator with added behaviors such as caching, debouncing, retries, and throttling.
 * @template {(...args: *[]) => *} T
 * @param {T} handler
 * @returns
 * ```
 * type Decorator<T extends Function> = {
 *   // Run decorator.
 *   (...args): Promise<ReturnType<typeof handler>>
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
declare function _default<T extends (...args: any[]) => any>(handler: T): {
    (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>>;
    cache(s: number): ReturnType<typeof _default<T>>;
    debounce(ms: number): ReturnType<typeof _default<T>>;
    retries(checker: (reason: Error, count: number) => void): ReturnType<typeof _default<T>>;
    throttle(n: number, ms: number): ReturnType<typeof _default<T>>;
};
//# sourceMappingURL=decorator.d.ts.map