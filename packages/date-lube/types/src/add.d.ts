export default _default;
/**
 * Calculates and adds the specified time duration to the provided date.
 * @param {Date} date
 * @param {string} sum
 * ```
 * e.g. "1Y2M 3D"
 * ```
 *
 * Supported time units:
 * - "Y": Years
 * - "M": Months
 * - "D": Days
 * - "H": Hours
 * - "m": Minutes
 * - "s": Seconds
 * - "sss": Milliseconds
 * @returns {Date}
 * @example add(new Date, "-1D") //=> Date { yesterday }
 */
declare function _default(date: Date, sum: string): Date;
//# sourceMappingURL=add.d.ts.map