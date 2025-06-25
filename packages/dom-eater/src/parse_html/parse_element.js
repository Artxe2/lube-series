import AstSyntaxError from "../AstSyntaxError.js"
import parse_attribute from "./parse_attribute.js"
import parse_script_content from "./parse_script_content.js"
import parse_style_content from "./parse_style_content.js"

const end_element_name_regex = /[ >]/
const slash_regex = /^\/|\/$/
const stop_element_regex = /[^\s/]/

/**
 * @param {string} text
 * @param {import("../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../public.js").Element}
 */
export default (text, errors, start) => {
	const name_index = text.slice(start + 1).search(end_element_name_regex) + 1
	if (name_index > 0) {
		let child_pre_index = start + name_index
		const name = text.slice(start + 1, child_pre_index).replace(slash_regex, "")
		if (text[child_pre_index] == ">") {
			/** @type {import("../../public.js").Element} */
			const node = {
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
					const text_content = parse_script_content(text, errors, child_pre_index + 1)
					node.children.push(text_content)
					node.end = text_content.end + 9
				} else if (node.name == "style" && node.subType == "open") {
					const text_content = parse_style_content(text, errors, child_pre_index + 1)
					node.children.push(text_content)
					node.end = text_content.end + 8
				}
			}
			return node
		}
		/** @type {import("../../public.js").Attribute[]} */
		const attributes = []
		for (;;) {
			const child_index = text.slice(child_pre_index).search(stop_element_regex)
			if (child_index >= 0) {
				const index = child_pre_index + child_index
				if (text[index] == ">") {
					/** @type {import("../../public.js").Element} */
					const node = {
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
							const text_content = parse_script_content(text, errors, index + 1)
							node.children.push(text_content)
							node.end = text_content.end + 9
						} else if (node.name == "style" && node.subType == "open") {
							const text_content = parse_style_content(text, errors, index + 1)
							node.children.push(text_content)
							node.end = text_content.end + 8
						}
					}
					return node
				}
				const node = parse_attribute(text, errors, index)
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