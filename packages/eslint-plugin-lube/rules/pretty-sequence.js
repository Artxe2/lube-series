"use strict"

const indent_regex = /[ \t]*(?=[^\n]*$)/
const left_space_regex = /\s+$/
const right_space_regex = /^\s+/
const __n_regex = /(?<=\n)/g
const _r_regex = /\r/g

/**
 * @param {number} length
 * @returns {number[]}
 */
function get_indexed_array(length) {
	const array = []
	while (length) array[--length] = length
	return array
}

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		docs: {
			description: "Enforces additional empty comment when type casting in JSDoc.",
			recommended: true,
			url: "https://github.com/Artxe2/lube-series/blob/master/packages/eslint-plugin-lube/docs/pretty-sequence.md"
		},
		fixable: "code",
		messages: {
			not_match: "This sequence is not pretty"
		},
		schema: [
			{
				properties: {
					arrayBracketSpacing: { type: "boolean", default: true },
					checkArray: { type: "boolean", default: true },
					checkCall: { type: "boolean", default: true },
					checkObject: { type: "boolean", default: true },
					checkSequence: { type: "boolean", default: true },
					funcCallSpacing: { type: "boolean", default: false },
					indent: { type: "string", default: "\t" },
					maxLength: { type: "number", default: 30 },
					objectCurlySpacing: { type: "boolean", default: true }
				},
				type: "object"
			}
		],
		type: "layout"
	},
	create(context) {
		/** @type {import("../private").RuleOptions["pretty-sequence"]} */
		const option = context.options[0]
		const array_bracket_spacing = option?.arrayBracketSpacing ?? true
		const check_array = option?.checkArray ?? true
		const check_call = option?.checkCall ?? true
		const check_object = option?.checkObject ?? true
		const check_sequence = option?.checkSequence ?? true
		const func_call_spacing = option?.funcCallSpacing ?? false
		const indent = option?.indent ?? "\t"
		const max_length = option?.maxLength ?? 30
		const object_curly_spacing = option?.objectCurlySpacing ?? true

		const source_code = context.sourceCode
		const origin_text = source_code.text
		let fixed_text = origin_text
		const text_length = fixed_text.length + 1
		const text_indexes = get_indexed_array(text_length)
		/** @type {import("../private").Comment[]} */
		const comments = []
		for (const comment of /** @type {import("../private").Comment[]} */(source_code.getAllComments())/**/) {
			let [ start, end ] = comment.range
			while (start < end) comments[start++] = comment
		}
		/** @type {import("../private").AstNode[] & import("estree").Expression[]} */
		const nodes = []

		/**
		 * @param {import("../private").AstNode} node
		 * @param {number} start
		 * @param {number} end
		 * @param {boolean=} add_indentation
		 * @returns {string}
		 */
		function get_text(node, start, end, add_indentation) {
			let open_paren = false
			let [ left, right ] = node.range
			W: while (left > start) {
				if (comments[left - 1]) {
					left = comments[left - 1].range[0]
				} else {
					const left_space = left_space_regex.exec(origin_text.slice(0, left))?.[0].length
					if (left_space) {
						left -= left_space
					} else if (origin_text[left - 1] == "(") {
						open_paren = true
						while (right < end) {
							if (comments[right]) {
								const comment = comments[right]
								right = comment.range[1]
							} else {
								const right_space = right_space_regex.exec(origin_text.slice(right))?.[0].length
								if (right_space) {
									right += right_space
								} else {
									if (origin_text[right] == ")") {
										left--
										right++
										open_paren = false
									}
									break
								}
							}
						}
						if (open_paren) break W
					} else {
						break
					}
				}
			}
			while (right < end) {
				if (comments[right]) {
					const comment = comments[right]
					right = comment.range[1]
				} else {
					const right_space = right_space_regex.exec(origin_text.slice(right))?.[0].length
					if (right_space) {
						right += right_space
					} else {
						break
					}
				}
			}
			const substr = fixed_text.slice(
				text_indexes[left],
				text_indexes[right]
			)
				.replace(_r_regex, "")
				.trim()
			return add_indentation
				? substr.replace(__n_regex, indent)
				: substr
		}
		/**
		 * @param {import("../private").AstNode} node
		 * @returns {void}
		 */
		function push_to_reverse(node) {
			nodes.push(node)
		}
		/**
		 * @param {import("../private").AstNode} node
		 * @param {number} start
		 * @param {number} end
		 * @param {string} corrected_text
		 * @returns {void}
		 */
		function report(node, start, end, corrected_text) {
			fixed_text = fixed_text.slice(0, text_indexes[start]) + corrected_text + fixed_text.slice(text_indexes[end])
			const gap = corrected_text.length + text_indexes[start] - text_indexes[end]
			if (gap) {
				for (let i = end; i < text_length; i++) {
					text_indexes[i] += gap
				}
			}
			context.report(
				{
					fix(fixer) {
						return fixer.replaceTextRange([ start, end ], corrected_text)
					},
					loc: {
						start: source_code.getLocFromIndex(start),
						end: source_code.getLocFromIndex(end)
					},
					messageId: "not_match",
					node
				}
			)
		}
		/**
		 * @param {import("../private").AstNode} node
		 * @returns {void}
		 */
		function verify_correct(node) {
			/**
			 * @param {number} index
			 * @returns {string}
			 */
			function get_indent(index) {
				return fixed_text.slice(0, text_indexes[index]).match(indent_regex)?.[0] || ""
			}
			let length = 0
			let start = 0
			let end = 0
			let corrected_text = ""
			let line_indent = get_indent(node.range[0])
			switch (node.type) {
			case "ArrayExpression":
			case "ArrayPattern":
				start = node.range[0] + 1
				end = node.range[1] - 1
				let null_anchor = start
				const elements = node.elements.map(
					v => {
						const n = v ?? {
							range: [ null_anchor, null_anchor ]
						}
						const text = get_text(n, start, end)
						null_anchor += text.length + 1
						return n
					}
				)
				for (const text of elements.map(v => get_text(v, start, end))) {
					if (text.includes("\n")) {
						length = max_length + 1
						break
					}
					length += text.length
				}
				corrected_text = length > max_length
					? `\n${line_indent + indent}${
						elements.map(
							v => get_text(
								v,
								start,
								end,
								line_indent == get_indent(v.range[0])
							)
						)
							.join(",\n" + line_indent + indent)
					}\n${line_indent}`
					: `${length && array_bracket_spacing ? " " : ""}${
						elements.map(v => get_text(v, start, end)).join(", ")
					}${length && array_bracket_spacing ? " " : ""}`
				break
			case "ArrowFunctionExpression":
			case "FunctionDeclaration":
			case "FunctionExpression":
				if (node.type == "ArrowFunctionExpression") {
					if (
						node.params.length != 1
						|| origin_text.slice(
							node.range[0],
							node.params[0].range[0]
						).includes("(")
					) {
						start = origin_text.indexOf("(", node.range[0]) + 1
						end = origin_text.indexOf(
							")",
							node.params.length
								? node.params[node.params.length - 1].range[1]
								: start
						)
					} else {
						[ start, end ] = node.params[0].range
					}
				} else {
					start = node.type == "FunctionDeclaration"
						? origin_text.indexOf("(", node.id.range[1]) + 1
						: node.id
							? origin_text.indexOf("(", node.id.range[1]) + 1
							: origin_text.indexOf("(", node.range[0]) + 1
					end = origin_text.indexOf(
						")",
						node.params.length
							? node.params[node.params.length - 1].range[1]
							: start
					)
				}
				for (const text of node.params.map(v => get_text(v, start, end))) {
					if (text.includes("\n")) {
						length = max_length + 1
						break
					}
					length += text.length
				}
				corrected_text = length > max_length
					? `\n${line_indent + indent}${
						node.params.map(
							v => get_text(
								v,
								start,
								end,
								line_indent == get_indent(v.range[0])
							)
						)
							.join(",\n" + line_indent + indent)
					}\n${line_indent}`
					: `${length && func_call_spacing ? " " : ""}${
						node.params.map(v => get_text(v, start, end)).join(", ")
					}${length && func_call_spacing ? " " : ""}`
				break
			case "CallExpression":
			case "NewExpression":
				if (node.range[1] == node.callee.range[1]) return
				line_indent = get_indent(node.callee.range[1])
				start = origin_text.indexOf("(", node.callee.range[1]) + 1
				end = node.range[1] - 1
				for (const text of node.arguments.map(v => get_text(v, start, end))) {
					if (text.includes("\n")) {
						length = max_length + 1
						break
					}
					length += text.length
				}
				corrected_text = length > max_length
					? `\n${line_indent + indent}${
						node.arguments.map(
							v => get_text(
								v,
								start,
								end,
								line_indent == get_indent(v.range[0])
							)
						)
							.join(",\n" + line_indent + indent)
					}\n${line_indent}`
					: `${length && func_call_spacing ? " " : ""}${
						node.arguments.map(v => get_text(v, start, end)).join(", ")
					}${length && func_call_spacing ? " " : ""}`
				break
			case "ObjectExpression":
			case "ObjectPattern":
				start = node.range[0] + 1
				end = node.range[1] - 1
				for (const text of node.properties.map(v => get_text(v, start, end))) {
					if (text.includes("\n")) {
						length = max_length + 1
						break
					}
					length += text.length
				}
				corrected_text = length > max_length
					? `\n${line_indent + indent}${
						node.properties.map(
							v => get_text(
								v,
								start,
								end,
								line_indent == get_indent(v.range[0])
							)
						)
							.join(",\n" + line_indent + indent)
					}\n${line_indent}`
					: `${length && object_curly_spacing ? " " : ""}${
						node.properties.map(v => get_text(v, start, end))
							.join(", ")
					}${length && object_curly_spacing ? " " : ""}`
				break
			case "SequenceExpression":
				start = node.range[0]
				end = node.range[1]
				for (const text of node.expressions.map(v => get_text(v, start, end))) {
					if (text.includes("\n")) {
						length = max_length + 1
						break
					}
					length += text.length
				}
				corrected_text = length > max_length
					? `${node.expressions
						.map(v => get_text(v, start, end))
						.join(",\n" + line_indent)}`
					: `${node.expressions
						.map(v => get_text(v, start, end))
						.join(", ")}`
				break
			}

			if (
				fixed_text.slice(
					text_indexes[start],
					text_indexes[end]
				)
					.replace(_r_regex, "")
				!= corrected_text
			) {
				report(node, start, end, corrected_text)
			}
		}
		return /** @type {import("../private").RuleListener} */({
			"Program:exit": () => {
				for (const node of nodes.reverse()) {
					verify_correct(node)
				}
			},
			ArrayExpression: node => {
				if (check_array) push_to_reverse(node)
			},
			ArrayPattern: node => {
				if (check_array) push_to_reverse(node)
			},
			ArrowFunctionExpression: node => {
				if (check_call) push_to_reverse(node)
			},
			CallExpression: node => {
				if (check_call) push_to_reverse(node)
			},
			FunctionExpression: node => {
				if (check_call) push_to_reverse(node)
			},
			FunctionDeclaration: node => {
				if (check_call) push_to_reverse(node)
			},
			NewExpression: node => {
				if (check_call) push_to_reverse(node)
			},
			ObjectExpression: node => {
				if (check_object) push_to_reverse(node)
			},
			ObjectPattern: node => {
				if (check_object) push_to_reverse(node)
			},
			SequenceExpression: node => {
				if (check_sequence) push_to_reverse(node)
			}
		})/**/
	}
}