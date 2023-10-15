export default _default;
/**
 * Adjusts the date according to the specified time zone offset.
 * @param {Date} date
 * @param {import("../../public.js").TimeZone} time_zone
 * @param {true=} inversion
 * @returns {Date}
 * @throws
 * ```
 * RangeError(`Invalid time zone specified: ${time_zone}`) // Throws from Intl.DateTimeFormat
 * ```
 */
declare function _default(date: Date, time_zone: import("../../public.js").TimeZone, inversion?: true | undefined): Date;
//# sourceMappingURL=time_zone.d.ts.map