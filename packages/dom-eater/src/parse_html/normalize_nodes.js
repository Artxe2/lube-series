import AstSyntaxError from "../AstSyntaxError.js"
import normalize_element_children from "./normalize_element_children.js"

/**
 * @param {string} text
 * @param {import("#public").AstNode[]} ast_nodes
 * @param {import("#public").AstSyntaxError[]} errors
 * @returns {void}
 */
export default (text, ast_nodes, errors) => {
	/** @type {import("#public").AstNode[]} */
	let ast = []
	while (ast_nodes.length > 0) {
		let node = /** @type {import("#public").AstNode} */(ast_nodes.shift())/**/
		ast.push(node)
		if (node.type == "Element" && node.name != "script" && node.name != "style") {
			if (node.subType == "close") {
				errors.push(
					AstSyntaxError(
						`unopened Element "${node.name}" cannot be closed.`,
						node.start,
						node.end
					)
				)
			} else if (node.subType == "open") {
				normalize_element_children(text, ast_nodes, errors, node)
			}
		}
	}
	ast_nodes.push(...ast)
}