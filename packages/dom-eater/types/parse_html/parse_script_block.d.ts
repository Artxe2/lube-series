export default parse_script_block;
/**
 * @param {string} text
 * @param {import("#public").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("#public").Script & { subType: "block" }}
 */
declare function parse_script_block(text: string, errors: import("#public").AstSyntaxError[], start: number): import("#public").Script & {
    subType: "block";
};
//# sourceMappingURL=parse_script_block.d.ts.map