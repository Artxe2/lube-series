"use strict"
/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		docs: {
			description: "Enforces proper indentation for import and export statements.",
			recommended: true,
			url: "https://github.com/Artxe2/lube-series/blob/master/packages/eslint-plugin-lube/docs/pretty-imports.md"
		},
		fixable: "code",
		messages: {
			exports: "This exports is not pretty",
			imports: "This imports is not pretty"
		},
		schema: [
			{
				properties: {
					checkExports: { type: "boolean", default: true },
					checkImports: { type: "boolean", default: true },
					indent: { type: "string", default: "\t" },
					maxLength: { type: "number", default: 30 },
					semicolon: { type: "boolean", default: false }
				},
				type: "object"
			}
		],
		type: "layout"
	},
	create(context) {
		/** @type {import("../private").RuleOptions["pretty-imports"]} */
		let option = context.options[0]
		let check_exports = option?.checkExports ?? true
		let check_imports = option?.checkImports ?? true
		let indent = option?.indent ?? "\t"
		let max_length = option?.maxLength ?? 30
		let semicolon = option?.semicolon ?? false

		let source_code = context.sourceCode
		let text = source_code.text
		let indent_regex = /[ \t]*(?=[^\n]*$)/
		let _r_regex = /\r/g

		/**
		 * @param {number} index
		 * @returns {string}
		 */
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
		 * @param {import("../private").AstNode} node
		 * @returns {string}
		 *//**
		 * @param {import("../private").AstNode | number} node_or_start
		 * @param {number=} end
		 * @returns {string}
		 */
		function get_text(node_or_start, end) {
			let substr = typeof node_or_start == "number"
				? text.slice(node_or_start, end)
				: text.slice(
					node_or_start.range[0],
					node_or_start.range[1]
				)
			return substr.replace(_r_regex, "")
		}
		/**
		 * @param {import("../private").AstNode} node
		 * @param {string} corrected_text
		 * @param {"exports" | "imports"} message_id
		 * @returns {void}
		 */
		function report(node, corrected_text, message_id) {
			context.report(
				{
					fix(fixer) {
						return fixer.replaceText(node, corrected_text)
					},
					messageId: message_id,
					node: /** @type {import("estree").Node} */(node)/**/
				}
			)
		}

		return {
			/**
			 * @param {import("../private").AstNode & import("estree").ExportNamedDeclaration} node
			 * @returns {void}
			 */
			ExportNamedDeclaration(node) {
				if (check_exports && node.specifiers[0]?.type == "ExportSpecifier") {
					let line_indent = get_indent(node.range[0])
					let length = 0
					for (let s of node.specifiers) {
						length += s.range[1] - s.range[0]
					}
					let corrected_text = length > max_length
						? `export {\n${line_indent + indent}${
							/** @type {import("../private").AstNode[]} */(node.specifiers)/**/.map(get_text)
								.join(",\n" + line_indent + indent)
						}\n${line_indent}}`
						: `export { ${
							/** @type {import("../private").AstNode[]} */(node.specifiers)/**/.map(get_text).join(", ")
						} }`
					if (node.source) {
						corrected_text += " from " + node.source.raw
					}
					if (semicolon) {
						corrected_text += ";"
					}
					if (corrected_text != get_text(node)) report(node, corrected_text, "exports")
				}
			},
			/**
			 * @param {import("../private").AstNode & import("estree").ImportDeclaration} node
			 * @returns {void}
			 */
			ImportDeclaration(node) {
				if (check_imports && node.specifiers[0]?.type == "ImportSpecifier") {
					let line_indent = get_indent(node.range[0])
					let length = 0
					for (let s of node.specifiers) {
						length += s.range[1] - s.range[0]
					}
					let corrected_text = length > max_length
						? `import {\n${line_indent + indent}${
							/** @type {import("../private").AstNode[]} */(node.specifiers)/**/.map(get_text)
								.join(",\n" + line_indent + indent)
						}\n${line_indent}} from ${node.source.raw}`
						: `import { ${
							/** @type {import("../private").AstNode[]} */(node.specifiers)/**/.map(get_text).join(", ")
						} } from ${node.source.raw}`
					if (semicolon) {
						corrected_text += ";"
					}
					if (corrected_text != get_text(node)) report(node, corrected_text, "imports")
				}
			}
		}
	}
}