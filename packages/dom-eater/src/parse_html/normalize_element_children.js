import AstSyntaxError from "../AstSyntaxError.js"
import normalize_nodes from "./normalize_nodes.js"

let self_closing_element_regex = /^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr|!DOCTYPE)$/i

/**
 * @param {string} text
 * @param {import("../../public.js").AstNode[]} ast_nodes
 * @param {import("../../public.js").AstSyntaxError[]}  errors
 * @param {import("../../public.js").Element} element
 * @returns {void}
 */
export default (text, ast_nodes, errors, element) => {
	let name = element.name
	if (self_closing_element_regex.test(name)) return
	let length = ast_nodes.length
	for (let i = 0; i < length; i++) {
		let token = ast_nodes[i]
		if (token?.type == "Element" && token.name == name) {
			if (token.subType == "close") {
				element.end = token.end
				let children = ast_nodes.splice(0, i)
				ast_nodes.shift()
				if (children.length) {
					element.children = children
					normalize_nodes(text, children, errors)
				}
			} else {
				errors.push(
					AstSyntaxError(
						`The "${name}" Element is not closed.`,
						element.start,
						element.end
					)
				)
			}
			return
		}
	}
	errors.push(
		AstSyntaxError(
			`The "${name}" Element is not closed.`,
			element.start,
			element.end
		)
	)
}