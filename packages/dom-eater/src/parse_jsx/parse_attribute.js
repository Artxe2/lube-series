import AstSyntaxError from "../AstSyntaxError.js"
import parse_attribute_double_quotes from "./parse_attribute_double_quotes.js"
import parse_attribute_single_quotes from "./parse_attribute_single_quotes.js"
import parse_script_block from "./parse_script_block.js"

let stop_attribute_name_regex = /[ =>]/
let stop_space_regex = /\S/

/**
 * @param {string} text
 * @param {import("#public").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("#public").Attribute}
 */
export default (text, errors, start) => {
	if (text[start] == "{") {
		let node = parse_script_block(text, errors, start)
		return {
			end: node.end,
			name: "",
			start,
			type: "Attribute",
			value: node
		}
	}
	let name_index = text.slice(start + 1).search(stop_attribute_name_regex) + 1
	if (name_index > 0) {
		let name = text.slice(start, start + name_index)
		/** @type {import("#public").Attribute} */
		let node = {
			end: start + name_index,
			name,
			start,
			type: "Attribute",
			value: true
		}
		let equals_sign_index = text.slice(start + name_index).search(stop_space_regex)
		if (equals_sign_index < 0 || text[start + name_index + equals_sign_index] != "=") return node
		let value_index = text.slice(
			start + name_index + equals_sign_index + 1
		).search(stop_space_regex) + 1
		if (value_index > 0) {
			let index = start + name_index + equals_sign_index + value_index
			if (text[index] == "'") {
				let value = parse_attribute_single_quotes(text, errors, index)
				node.value = value
				node.end = value.end
			} else if (text[index] == "\"") {
				let value = parse_attribute_double_quotes(text, errors, index)
				node.value = value
				node.end = value.end
			} else if (text[index] == "{") {
				let value = parse_script_block(text, errors, index)
				node.value = value
				node.end = value.end
			} else {
				errors.push(
					AstSyntaxError(
						`parse_attribute value is not valid with "${text[index]}"`,
						start,
						index
					)
				)
				node.end = index
			}
		} else {
			errors.push(
				AstSyntaxError(
					"parse_attribute value is incomplete.",
					start,
					text.length
				)
			)
			node.end = text.length
		}
		return node
	}
	errors.push(
		AstSyntaxError(
			"parse_attribute name is incomplete.",
			start,
			text.length
		)
	)
	return {
		end: text.length,
		name: text.slice(start),
		start: start,
		type: "Attribute",
		value: true
	}
}