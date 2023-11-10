export default _default;
/**
 * Compile a regular expression pattern for Flexible korean search.
 * @param {string} text
 * @returns {RegExp?}
 * @example searcher("ㄷㅎㅁㄱ") //=>
 * /[다-딯][^가-힣0-9A-Z]*?[하-힣][^가-힣0-9A-Z]*?[마-밓][^가-힣0-9A-Z]*?[가-깋]/i
 *
 * searcher("특수문자 test 1234!@#$") //=>
 * /특[^가-힣0-9A-Z]*?[수-숳][^가-힣0-9A-Z]*?문[^가-힣0-9A-Z]*?[자-잫][^가-힣0-9A-Z]*? [^가-힣0-9A-Z]*?t[^가-힣0-9A-Z]*?e[^가-힣0-9A-Z]*?s[^가-힣0-9A-Z]*?t[^가-힣0-9A-Z]*? [^가-힣0-9A-Z]*?1[^가-힣0-9A-Z]*?2[^가-힣0-9A-Z]*?3[^가-힣0-9A-Z]*?4[^가-힣0-9A-Z]*?![^가-힣0-9A-Z]*?@[^가-힣0-9A-Z]*?#[^가-힣0-9A-Z]*?$/i
 */
declare function _default(text: string): RegExp | null;
//# sourceMappingURL=searcher.d.ts.map