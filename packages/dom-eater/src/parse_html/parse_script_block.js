import AstSyntaxError from "../AstSyntaxError.js"
import parse_script_backticks from "./parse_script_backticks.js"
import parse_script_double_quotes from "./parse_script_double_quotes.js"
import parse_script_single_quotes from "./parse_script_single_quotes.js"

let stop_script_block_regex = /[{}'"`]/

/**
 * @param {string} text
 * @param {import("#public").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("#public").Script & { subType: "block" }}
 */
let parse_script_block = (text, errors, start) => {
	let child_pre_index = start + 1
	/** @type {import("#public").String[]} */
	let strings = []
	for (;;) {
		let child_index = text.slice(child_pre_index).search(stop_script_block_regex)
		if (child_index >= 0) {
			let index = child_pre_index + child_index
			if (text[index] == "}") {
				return {
					end: index + 1,
					start,
					strings,
					subType: "block",
					type: "Script"
				}
			} else if (text[index] == "{") {
				let node = parse_script_block(text, errors, index)
				for (let str of node.strings) {
					strings.push(str)
				}
				child_pre_index = node.end
			} else if (text[index] == "'") {
				let node = parse_script_single_quotes(text, errors, index)
				strings.push(node)
				child_pre_index = node.end
			} else if (text[index] == "\"") {
				let node = parse_script_double_quotes(text, errors, index)
				strings.push(node)
				child_pre_index = node.end
			} else {
				let node = parse_script_backticks(text, errors, index)
				strings.push(node)
				child_pre_index = node.end
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_script_block is incomplete.",
					start,
					text.length
				)
			)
			return {
				end: text.length,
				start,
				strings,
				subType: "block",
				type: "Script"
			}
		}
	}
}

export default parse_script_block