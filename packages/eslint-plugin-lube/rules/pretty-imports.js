"use strict"
/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		docs: {
			description: "Enforces pretty imports.",
			recommended: true,
			url: "https://github.com/Artxe2/lube-series/blob/master/packages/eslint-plugin-lube/rules/pretty-imports.js"
		},
		fixable: "code",
		messages: {
			not_match: "This imports is not pretty"
		},
		schema: [{
			properties: {
				checkExports: {
					type: "boolean",
					default: true
				},
				checkImports: {
					type: "boolean",
					default: true
				},
				indent: {
					type: "string",
					default: "\t"
				},
				maxLength: {
					type: "number",
					default: 30
				},
				semicolon: {
					type: "boolean",
					default: false
				}
			},
			type: "object"
		}],
		type: "suggestion"
	},
	create(context) {
		const check_exports = /** @type {boolean} */ (context.options[0]?.checkExports) ?? true
		const check_imports = /** @type {boolean} */ (context.options[0]?.checkImports) ?? true
		const indent = /** @type {string} */ (context.options[0]?.indent) ?? "\t"
		const max_length = /** @type {number} */ (context.options[0]?.maxLength) ?? 30
		const semicolon = /** @type {number} */ (context.options[0]?.semicolon) ?? false

		const source_code = context.sourceCode
		const text = source_code.text

		const indent_regex = /[ \t]*(?=[^\n]*$)/
		const _r_regex = /\r/g
		/** @param {number} index */
		function get_indent(index) {
			return text.slice(0, index).match(indent_regex)?.[0] || ""
		}

		/**
		 * @overload
		 * @param {number} start
		 * @param {number} end
		 * @returns {string}
		 *//**
		 * @overload
		 * @param {import("../private").ASTNode} node
		 * @returns {string}
		 *//**
		 * @param {import("../private").ASTNode|number} node_or_start
		 * @param {number} [end]
		 * @returns {string}
		 */
		function get_text(node_or_start, end) {
			const substr = typeof node_or_start == "number"
				? text.slice(node_or_start, end)
				: text.slice(node_or_start.range[0], node_or_start.range[1])
			return substr.replace(_r_regex, "")
		}

		/**
		 * @param {import("../private").ASTNode} node
		 * @param {string} corrected_text
		 */
		function report(node, corrected_text) {
			context.report({
				fix(fixer) {
					return fixer.replaceText(node, corrected_text)
				},
				messageId: "not_match",
				node: /** @type {import("estree").Node} */(node)
			})
		}

		return {
			/** @param {import("../private").ASTNode & import("estree").ExportNamedDeclaration} node */
			ExportNamedDeclaration(node) {
				if (check_exports && node.specifiers[0]?.type == "ExportSpecifier") {
					const line_indent = get_indent(node.range[0])
					let length = 0
					for (const s of node.specifiers) {
						length += s.range[1] - s.range[0]
					}
					let corrected_text = length > max_length
						? `export {\n${line_indent + indent}${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(get_text)
								.join(",\n" + line_indent + indent)
						}\n${line_indent}}`
						: `export { ${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(get_text).join(", ")
						} }`
					if (node.source) {
						corrected_text += " from " + node.source.raw
					}
					if (semicolon) {
						corrected_text += ";"
					}
					if (corrected_text != text.slice(node.range[0], node.range[1])) report(node, corrected_text)
				}
			},
			/** @param {import("../private").ASTNode & import("estree").ImportDeclaration} node */
			ImportDeclaration(node) {
				if (check_imports && node.specifiers[0]?.type == "ImportSpecifier") {
					const line_indent = get_indent(node.range[0])
					let length = 0
					for (const s of node.specifiers) {
						length += s.range[1] - s.range[0]
					}
					let corrected_text = length > max_length
						? `import {\n${line_indent + indent}${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(get_text)
								.join(",\n" + line_indent + indent)
						}\n${line_indent}} from ${node.source.raw}`
						: `import { ${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(get_text).join(", ")
						} } from ${node.source.raw}`
					if (semicolon) {
						corrected_text += ";"
					}
					if (corrected_text != get_text(node)) report(node, corrected_text)
				}
			}
		}
	}
}