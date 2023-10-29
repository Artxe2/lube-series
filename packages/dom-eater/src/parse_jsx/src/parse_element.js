import AstSyntaxError from "../../common/AstSyntaxError.js"
import parse_attribute from "./parse_attribute.js"
import parse_script_block from "./parse_script_block.js"

const end_element_name_regex = /[ >]/
const slash_regex = /^\/|\/$/
const stop_element_content_regex = /[{<]/
const stop_element_regex = /[^\s/]/

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Element}
 */
const parse_open_tag = (text, errors, start) => {
	const name_index = text.slice(start + 1).search(end_element_name_regex) + 1
	if (name_index > 0) {
		let child_pre_index = start + name_index
		const name = text.slice(start + 1, child_pre_index).replace(slash_regex, "")
		if (text[child_pre_index] == ">") {
			/** @type {import("../../../public.js").Element} */
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
			return node
		}
		/** @type {import("../../../public.js").Attribute[]} */
		const attributes = []
		for (;;) {
			const child_index = text.slice(child_pre_index).search(stop_element_regex)
			if (child_index >= 0) {
				const index = child_pre_index + child_index
				if (text[index] == ">") {
					/** @type {import("../../../public.js").Element} */
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
					return node
				}
				const node = parse_attribute(text, errors, index)
				attributes.push(node)
				child_pre_index = node.end
			} else {
				errors.push(
					AstSyntaxError("parse_element is incomplete.", start, text.length)
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
		AstSyntaxError("parse_element is incomplete.", start, text.length)
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

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").Element}
 */
const parse_element = (text, errors, start) => {
	const err = errors.length
	const node = parse_open_tag(text, errors, start)
	if (errors.length > err || node.subType == "closed") return node
	if (node.subType == "close") {
		errors.push(
			AstSyntaxError(`unopened Element "${node.name}" cannot be closed.`, node.start, node.end)
		)
		return node
	}
	let child_pre_index = node.end
	for (;;) {
		const child_index = text.slice(child_pre_index).search(stop_element_content_regex)
		if (child_index >= 0) {
			const index = child_pre_index + child_index
			if (child_index) {
				node.children.push({
					end: index,
					start: child_pre_index,
					type: "Text"
				})
			}
			if (text[index] == "<") {
				if (text[index + 1] == "/") {
					if (text.slice(index, index + node.name.length + 3) == `</${node.name}>`) {
						node.end = index + node.name.length + 3
					} else {
						errors.push(
							AstSyntaxError(`close tag is different from open tag "${node.name}".`, start, text.length)
						)
						node.end = text.length
					}
					return node
				} else {
					const child = parse_element(text, errors, index)
					node.children.push(child)
					child_pre_index = child.end
				}
			} else {
				const child = parse_script_block(text, errors, index)
				node.children.push(child)
				child_pre_index = child.end
			}
		} else {
			errors.push(
				AstSyntaxError("parse_element is incomplete.", start, text.length)
			)
			node.end = text.length
			return node
		}
	}
}

export default parse_element