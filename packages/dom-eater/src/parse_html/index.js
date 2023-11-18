import normalize_nodes from "./normalize_nodes.js"
import parse_element from "./parse_element.js"
import parse_script_block from "./parse_script_block.js"

let stop_text_regex = /[<{]/

/**
 * @param {string} text
 * @param {import("#public").AstNode} node
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
 *   ast: import("#public").AstNode[]
 *   errors: import("#public").AstSyntaxError[]
 * }}
 */
export default (text, include_text) => {
	/** @type {import("#public").AstSyntaxError[]} */
	let errors = []
	/** @type {import("#public").AstNode[]} */
	let ast_nodes = []
	let start = 0
	for (;;) {
		let index = text.slice(start).search(stop_text_regex)
		if (index >= 0) {
			if (index) {
				ast_nodes.push(
					{
						end: start + index,
						start,
						type: "Text"
					}
				)
			}
			if (text[start + index] == "<") {
				let node = parse_element(text, errors, start + index)
				ast_nodes.push(node)
				start = node.end
			} else {
				let node = parse_script_block(text, errors, start + index)
				ast_nodes.push(node)
				start = node.end
			}
		} else {
			if (start < text.length) {
				ast_nodes.push(
					{
						end: text.length,
						start,
						type: "Text"
					}
				)
			}
			break
		}
	}
	ast_nodes.sort(
		(a, b) => a.start != b.start
			? a.start - b.start
			: a.end - b.end
	)
	normalize_nodes(text, ast_nodes, errors)
	if (include_text) {
		for (let node of ast_nodes) {
			set_text(text, node)
		}
	}
	return { ast: ast_nodes, errors }
}