import parse_element from "./parse_element.js"
import parse_script_backticks from "./parse_script_backticks.js"
import parse_script_double_quotes from "./parse_script_double_quotes.js"
import parse_script_single_quotes from "./parse_script_single_quotes.js"

let stop_jsx_regex = /['"`]|<[A-Za-z]/

/** @typedef {import("../../public.js").AstNode} */

/**
 * @param {string} text
 * @param {import("../../public.js").AstNode} node
 */
let set_text = (text, node) => {
	node.text = text.slice(node.start, node.end)
	if (node.type == "Attribute") {
		if (node.value !== true) {
			set_text(text, node.value)
		}
	} else if (node.type == "Element") {
		for (let attr of node.attributes) {
			set_text(text, attr)
		}
		for (let child of node.children) {
			set_text(text, child)
		}
	} else if (node.type == "Script") {
		for (let string of node.strings) {
			set_text(text, string)
		}
		if (node.subType == "jsx") {
			for (let element of node.elements) {
				set_text(text, element)
			}
		}
	} else if (node.type == "String") {
		for (let script of node.scripts) {
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
	let errors = []
	/** @type {import("../../public.js").AstNode[]} */
	let ast_nodes = []
	let start = 0
	for (;;) {
		let index = text.slice(start).search(stop_jsx_regex)
		if (index >= 0) {
			if (text[start + index] == "<") {
				let node = parse_element(text, errors, start + index)
				ast_nodes.push(node)
				start = node.end
			} else if (text[start + index] == "'") {
				let node = parse_script_single_quotes(text, errors, start + index)
				start = node.end
			} else if (text[start + index] == "\"") {
				let node = parse_script_double_quotes(text, errors, start + index)
				start = node.end
			} else {
				let node = parse_script_backticks(text, errors, start + index)
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
		for (let node of ast_nodes) {
			set_text(text, node)
		}
	}
	return { ast: ast_nodes, errors }
}