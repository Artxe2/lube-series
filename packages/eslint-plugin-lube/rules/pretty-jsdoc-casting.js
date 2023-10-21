"use strict"

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
			url: "https://github.com/Artxe2/lube-series/blob/master/packages/eslint-plugin-lube/docs/pretty-jsdoc-casting.md"
		},
		fixable: "code",
		messages: {
			not_match: "This casting is not pretty"
		},
		type: "layout"
	},
	create(context) {
		const source_code = context.sourceCode
		const origin_text = source_code.text
		let fixed_text = origin_text
		const text_length = fixed_text.length + 1
		const text_indexes = get_indexed_array(text_length)
		const left_space_regex = /\s+$/
		const right_space_regex = /^\s+/
		const type_regex = /(?<=(?:^|.*\s*)@type\s*\{).+?(?=\}.*?$)/
		/** @type {import("../private").Comment[]} */
		const comments = []
		for (const comment of /** @type {import("../private").Comment[]} */(source_code.getAllComments().reverse())/**/) {
			const [start, end] = comment.range
			comments[start] = comment
			comments[end - 1] = comment
		}
		/** @type {import("../private").AstNode[] & import("estree").Expression[]} */
		const expressions = []
		/** @type {Set<string>} */
		const node_ranges = new Set

		/**
		 * @param {import("../private").AstNode} node
		 * @returns {void}
		 */
		function verify_correct(node) {
			let temp_text = fixed_text
			const temp_indexes = [...text_indexes]
			/** @type {(string | undefined)[]} */
			const types = []
			/**
			 * @param {number} start
			 * @param {number} end
			 * @param {string=} insert
			 * @returns {void}
			 */
			function temp_text_changes(start, end, insert = "") {
				const gap = insert.length + temp_indexes[start] - temp_indexes[end]
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
			let [left, right] = node.range
			W: while (left > 0) {
				if (comments[left - 1]) {
					const comment = comments[left - 1]
					left = comment.range[0]
					if (open && !types[open - 1]) {
						const type = comment.type == "Block" && type_regex.exec(comment.value)?.[0]
						if (type) {
							types[open - 1] = type
							temp_text_changes(...comment.range)
						}
					}
				} else {
					const space = left_space_regex.exec(origin_text.slice(0, left))?.[0].length
					if (space) {
						left -= space
					} else if (origin_text[left - 1] == "(") {
						while (right < text_length) {
							if (comments[right]) {
								const comment = comments[right]
								right = comment.range[1]
							} else {
								const space = right_space_regex.exec(origin_text.slice(right))?.[0].length
								if (space) {
									right += space
								} else {
									if (origin_text[right] == ")") {
										prev_open = left--
										temp_text_changes(left, left + 1)
										close++
										if (temp_text.slice(temp_indexes[right + 1], temp_indexes[right + 5]) == "/**/") {
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
				temp_text_changes(right, right, ")")
			}
			const start = temp_indexes[node.range[0]]
			let end = temp_indexes[node.range[1]]
			if (temp_text.slice(end, end + 4) == "/**/") {
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
			if (fixed_text.slice(text_indexes[left], text_indexes[right]) != corrected_text) {
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
			const gap = corrected_text.length + text_indexes[start] - text_indexes[end]
			if (gap) {
				for (let i = end; i < text_length; i++) {
					text_indexes[i] += gap
				}
			}
			context.report({
				fix(fixer) {
					return fixer.replaceTextRange([start, end], corrected_text)
				},
				loc: {
					start: source_code.getLocFromIndex(start),
					end: source_code.getLocFromIndex(end)
				},
				messageId: "not_match",
				node
			})
		}
		/**
		 * @param {import("../private").AstNode} node
		 * @returns {void}
		 */
		function push_to_reverse(node) {
			const range = `${node.range[0]} ${node.range[1]}`
			if (node_ranges.has(range)) return
			node_ranges.add(range)
			expressions.push(node)
		}
		return {
			"Program:exit": () => {
				for (const node of expressions.reverse()) {
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