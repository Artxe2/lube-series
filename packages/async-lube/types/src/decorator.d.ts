declare function _default<T>(callback: (...args: any[]) => T): {
    (...args: any[]): Promise<any>;
    /**
     * Enable caching for the decorated function.
     * @param {number} s The cache duration in seconds.
     * @returns The Decorator with caching behavior applied.
     */
    cache(s: number): any;
    /**
     * Enable debouncing for the decorated function.
     * @param {number} ms The debounce time in milliseconds.
     * @returns The Decorator with debouncing behavior applied.
     */
    debounce(ms: number): any;
    /**
     * Enable retries for the decorated function.
     * @param {(reason: Error, count: number) => void} checker
     * A function to determine whether to retry based on the rejection reason and the retry count.
     *
     * If no errors occur in the checker, proceed with the retry.
     * @returns The Decorator with retries behavior applied.
     */
    retries(checker: (reason: Error, count: number) => void): any;
    /**
     * Enable throttling for the decorated function.
     * @param {number} n The throttle limit (maximum number of calls).
     * @param {number} ms The throttle time interval in milliseconds.
     * @returns The Decorator with throttling behavior applied.
     */
    throttle(n: number, ms: number): any;
};
export default _default;
//# sourceMappingURL=decorator.d.ts.map