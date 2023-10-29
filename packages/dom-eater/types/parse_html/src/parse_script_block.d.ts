export default parse_script_block;
/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Script & { subType: "block" }}
 */
declare function parse_script_block(text: string, errors: import("../../../public.js").AstSyntaxError[], start: number): import("../../../public.js").Script & {
    subType: "block";
};
//# sourceMappingURL=parse_script_block.d.ts.map