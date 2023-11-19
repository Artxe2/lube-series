import AstSyntaxError from "../AstSyntaxError.js"
import parse_script_block from "./parse_script_block.js"

let stop_attribute_single_quotes_regex = /(?<=(?<!\\)(?:\\\\)*)["{]/

/**
 * @param {string} text
 * @param {import("../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../public.js").String & { subType: "double" }}
 */
export default (text, errors, start) => {
	let child_pre_index = start + 1
	/** @type {import("../../public.js").Script[]} */
	let scripts = []
	for (;;) {
		let child_index = text.slice(child_pre_index).search(
			stop_attribute_single_quotes_regex
		)
		if (child_index >= 0) {
			let index = child_pre_index + child_index
			if (text[index] == "\"") {
				return {
					end: index + 1,
					scripts,
					start,
					subType: "double",
					type: "String"
				}
			}
			let node = parse_script_block(text, errors, index)
			scripts.push(node)
			child_pre_index = node.end
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute_double_quotes is incomplete.",
					start,
					text.length
				)
			)
			return {
				end: text.length,
				scripts,
				start,
				subType: "double",
				type: "String"
			}
		}
	}
}