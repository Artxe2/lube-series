export default parse_script_block;
/**
 * @param {string} text
 * @param {import("#public").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("#public").Script & { subType: "jsx" }}
 */
declare function parse_script_block(text: string, errors: import("#public").AstSyntaxError[], start: number): import("#public").Script & {
    subType: "jsx";
};
//# sourceMappingURL=parse_script_block.d.ts.map