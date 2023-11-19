"use strict"

let left_space_regex = /\s+$/
let right_space_regex = /^\s+/
let type_regex = /(?<=(?:^|.*\s*)@type\s*\{).+(?=\}.*?$)/

/**
 * @param {number} length
 * @returns {number[]}
 */
function get_indexed_array(length) {
	let array = []
	while (length) array[--length] = length
	return array
}

/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		docs: {
			description: "Enforces additional empty comment when type casting in JSDoc.",
			recommended: true,
			url: "https://github.com/Artxe2/lube-series/blob/master/packages/eslint-plugin-lube/docs/pretty-jsdoc-casting.md"
		},
		fixable: "code",
		messages: {
			not_match: "This casting is not pretty"
		},
		type: "layout"
	},
	create(context) {
		let source_code = context.sourceCode
		let origin_text = source_code.text
		let fixed_text = origin_text
		let text_length = fixed_text.length + 1
		let text_indexes = get_indexed_array(text_length)
		/** @type {import("../private").Comment[]} */
		let comments = []
		for (let comment of /** @type {import("../private").Comment[]} */(source_code.getAllComments())/**/) {
			let [ start, end ] = comment.range
			while (start < end) comments[start++] = comment
		}
		/** @type {import("../private").AstNode[] & import("estree").Expression[]} */
		let expressions = []
		/** @type {Set<string>} */
		let node_ranges = new Set

		/**
		 * @param {import("../private").AstNode} node
		 * @returns {void}
		 */
		function verify_correct(node) {
			let temp_text = fixed_text
			let temp_indexes = [ ...text_indexes ]
			/** @type {(string | undefined)[]} */
			let types = []
			/** @type {true[]} */
			let extras = []
			/**
			 * @param {number} start
			 * @param {number} end
			 * @param {string=} insert
			 * @returns {void}
			 */
			function temp_text_changes(start, end, insert = "") {
				let gap = insert.length + temp_indexes[start] - temp_indexes[end]
				temp_text = temp_text.slice(0, temp_indexes[start]) + insert + temp_text.slice(temp_indexes[end])
				if (gap) {
					while (end < text_length) {
						temp_indexes[end++] += gap
					}
				}
			}
			let open = 0
			let close = 0
			let prev_open = 0
			let prev_close = 0
			let [ left, right ] = node.range
			W: while (left > 0) {
				if (comments[left - 1]) {
					let comment = comments[left - 1]
					left = comment.range[0]
					if (open && !types[open - 1]) {
						let type = comment.type == "Block" && type_regex.exec(comment.value)?.[0]
						if (type) {
							types[open - 1] = type
							temp_text_changes(...comment.range)
						}
					}
				} else {
					let left_space = left_space_regex.exec(origin_text.slice(0, left))?.[0].length
					if (left_space) {
						left -= left_space
					} else if (origin_text[left - 1] == "(") {
						while (right < text_length) {
							if (comments[right]) {
								let comment = comments[right]
								right = comment.range[1]
							} else {
								let right_space = right_space_regex.exec(origin_text.slice(right))?.[0].length
								if (right_space) {
									right += right_space
								} else {
									if (origin_text[right] == ")") {
										prev_open = left--
										prev_close = right
										temp_text_changes(left, left + 1)
										close++
										if (temp_text.slice(
											temp_indexes[right + 1],
											temp_indexes[right + 5]
										) == "/**/") {
											extras[right] = true
											temp_text_changes(right, right += 5)
										} else {
											temp_text_changes(right, ++right)
										}
									}
									break
								}
							}
						}
						if (open == close) break W
						open++
					} else {
						break
					}
				}
			}
			if (close && !types[close - 1]) {
				close--
				temp_text_changes(prev_open, prev_open, "(")
				temp_text_changes(prev_close, prev_close, ")")
			}
			let start = temp_indexes[node.range[0]]
			let end = temp_indexes[node.range[1]]
			if (extras[end] || open && temp_text.slice(end, end + 4) == "/**/") {
				end += 4
			}
			let corrected_text = temp_text.slice(start, end)
			for (let i = 0; i < close; i++) {
				corrected_text = types[i]
					? `/** @type {${types[i]}} */(${corrected_text})/**/`
					: `(${corrected_text})`
			}
			corrected_text = temp_text.slice(temp_indexes[left], start)
				+ corrected_text
				+ temp_text.slice(end, temp_indexes[right])
			if (fixed_text.slice(
				text_indexes[left],
				text_indexes[right]
			) != corrected_text) {
				report(node, left, right, corrected_text)
			}
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
			let gap = corrected_text.length + text_indexes[start] - text_indexes[end]
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
		function push_to_reverse(node) {
			let range = `${node.range[0]} ${node.range[1]}`
			if (node_ranges.has(range)) return
			node_ranges.add(range)
			expressions.push(node)
		}
		return {
			"Program:exit": () => {
				for (let node of expressions.reverse()) {
					verify_correct(node)
				}
			},
			ArrayExpression: push_to_reverse,
			ArrowFunctionExpression: push_to_reverse,
			AssignmentExpression: push_to_reverse,
			AwaitExpression: push_to_reverse,
			BinaryExpression: push_to_reverse,
			CallExpression: push_to_reverse,
			ChainExpression: push_to_reverse,
			ClassExpression: push_to_reverse,
			ConditionalExpression: push_to_reverse,
			FunctionExpression: push_to_reverse,
			Identifier: push_to_reverse,
			ImportExpression: push_to_reverse,
			Literal: push_to_reverse,
			LogicalExpression: push_to_reverse,
			MemberExpression: push_to_reverse,
			MetaProperty: push_to_reverse,
			NewExpression: push_to_reverse,
			ObjectExpression: push_to_reverse,
			SequenceExpression: push_to_reverse,
			TaggedTemplateExpression: push_to_reverse,
			TemplateLiteral: push_to_reverse,
			ThisExpression: push_to_reverse,
			UnaryExpression: push_to_reverse,
			UpdateExpression: push_to_reverse,
			YieldExpression: push_to_reverse
		}
	}
}