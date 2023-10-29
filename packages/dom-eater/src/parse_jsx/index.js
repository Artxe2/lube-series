import parse_element from "./src/parse_element.js"
import parse_script_backticks from "./src/parse_script_backticks.js"
import parse_script_double_quotes from "./src/parse_script_double_quotes.js"
import parse_script_single_quotes from "./src/parse_script_single_quotes.js"

const stop_jsx_regex = /['"`]|<[A-Za-z]/

/** @typedef {import("../../public.js").AstNode} */

/**
 * @param {string} text
 * @param {import("../../public.js").AstNode} node
 */
const set_text = (text, node) => {
	node.text = text.slice(node.start, node.end)
	if (node.type == "Attribute") {
		if (node.value !== true) {
			set_text(text, node.value)
		}
	} else if (node.type == "Element") {
		for (const attr of node.attributes) {
			set_text(text, attr)
		}
		for (const child of node.children) {
			set_text(text, child)
		}
	} else if (node.type == "Script") {
		for (const string of node.strings) {
			set_text(text, string)
		}
		if (node.subType == "jsx") {
			for (const element of node.elements) {
				set_text(text, element)
			}
		}
	} else if (node.type == "String") {
		for (const script of node.scripts) {
			set_text(text, script)
		}
	}
}

/**
 * @param {string} text
 * @param {true=} include_text
 * @returns {{
 *   ast: import("../../public.js").AstNode[]
 *   errors: import("../../public.js").AstSyntaxError[]
 * }}
 */
export default (text, include_text) => {
	/** @type {import("../../public.js").AstSyntaxError[]} */
	const errors = []
	/** @type {import("../../public.js").AstNode[]} */
	const ast_nodes = []
	let start = 0
	for (;;) {
		const index = text.slice(start).search(stop_jsx_regex)
		if (index >= 0) {
			if (text[start + index] == "<") {
				const node = parse_element(text, errors, start + index)
				ast_nodes.push(node)
				start = node.end
			} else if (text[start + index] == "'") {
				const node = parse_script_single_quotes(text, errors, start + index)
				start = node.end
			} else if (text[start + index] == "\"") {
				const node = parse_script_double_quotes(text, errors, start + index)
				start = node.end
			} else {
				const node = parse_script_backticks(text, errors, start + index)
				start = node.end
			}
		} else break
	}
	ast_nodes.sort(
		(a, b) => a.start != b.start
			? a.start - b.start
			: a.end - b.end
	)
	if (include_text) {
		for (const node of ast_nodes) {
			set_text(text, node)
		}
	}
	return {
		ast: ast_nodes,
		errors
	}
}