import AstSyntaxError from "../AstSyntaxError.js"
import parse_attribute from "./parse_attribute.js"
import parse_script_content from "./parse_script_content.js"
import parse_style_content from "./parse_style_content.js"

let end_element_name_regex = /[ >]/
let slash_regex = /^\/|\/$/
let stop_element_regex = /[^\s/]/

/**
 * @param {string} text
 * @param {import("#public").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("#public").Element}
 */
export default (text, errors, start) => {
	let name_index = text.slice(start + 1).search(end_element_name_regex) + 1
	if (name_index > 0) {
		let child_pre_index = start + name_index
		let name = text.slice(start + 1, child_pre_index).replace(slash_regex, "")
		if (text[child_pre_index] == ">") {
			/** @type {import("#public").Element} */
			let node = {
				attributes: [],
				children: [],
				end: child_pre_index + 1,
				name,
				start,
				subType: text[start + 1] == "/"
					? "close"
					: text[child_pre_index - 1] == "/"
						? "closed"
						: "open",
				type: "Element"
			}
			if (node?.type == "Element") {
				if (node.name == "script" && node.subType == "open") {
					let text_content = parse_script_content(text, errors, child_pre_index + 1)
					node.children.push(text_content)
					node.end = text_content.end + 9
				} else if (node.name == "style" && node.subType == "open") {
					let text_content = parse_style_content(text, errors, child_pre_index + 1)
					node.children.push(text_content)
					node.end = text_content.end + 8
				}
			}
			return node
		}
		/** @type {import("#public").Attribute[]} */
		let attributes = []
		for (;;) {
			let child_index = text.slice(child_pre_index).search(stop_element_regex)
			if (child_index >= 0) {
				let index = child_pre_index + child_index
				if (text[index] == ">") {
					/** @type {import("#public").Element} */
					let node = {
						attributes,
						children: [],
						end: index + 1,
						name,
						start,
						subType: text[start + 1] == "/"
							? "close"
							: text[index - 1] == "/"
								? "closed"
								: "open",
						type: "Element"
					}
					if (node?.type == "Element") {
						if (node.name == "script" && node.subType == "open") {
							let text_content = parse_script_content(text, errors, index + 1)
							node.children.push(text_content)
							node.end = text_content.end + 9
						} else if (node.name == "style" && node.subType == "open") {
							let text_content = parse_style_content(text, errors, index + 1)
							node.children.push(text_content)
							node.end = text_content.end + 8
						}
					}
					return node
				}
				let node = parse_attribute(text, errors, index)
				attributes.push(node)
				child_pre_index = node.end
			} else {
				errors.push(
					AstSyntaxError(
						"parse_element is incomplete.",
						start,
						text.length
					)
				)
				return {
					attributes,
					children: [],
					end: text.length,
					name,
					start,
					subType: "open",
					type: "Element"
				}
			}
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_element is incomplete.",
			start,
			text.length
		)
	)
	return {
		attributes: [],
		children: [],
		end: text.length,
		name: text.slice(start),
		start: start,
		subType: "open",
		type: "Element"
	}
}