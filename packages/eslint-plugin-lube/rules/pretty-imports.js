"use strict"
/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		docs: {
			description: "Enforces pretty imports.",
			recommended: true,
			url: "https://github.com/Artxe2/lube-series/blob/master/packages/eslint-plugin-lube/test/pretty-imports"
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
		const source_code = context.sourceCode
		const text = source_code.text

		const indent_regex = /[ \t]*(?=[^\n]*$)/
		/** @param {number} index */
		function get_indent(index) {
			return text.slice(0, index).match(indent_regex)?.[0] || ""
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
					const corrected_text = length > max_length
						? `export {\n${line_indent + indent}${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(v => text.slice(v.range[0], v.range[1]))
								.join(",\n" + line_indent + indent)
						}\n${line_indent}} from ${text.slice(node.source.range[0], node.range[1])}`
						: `export { ${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(v => text.slice(v.range[0], v.range[1])).join(", ")
						} } from ${text.slice(node.source.range[0], node.range[1])}`
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
					const corrected_text = length > max_length
						? `import {\n${line_indent + indent}${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(v => text.slice(v.range[0], v.range[1]))
								.join(",\n" + line_indent + indent)
						}\n${line_indent}} from ${text.slice(node.source.range[0], node.range[1])}`
						: `import { ${
							/** @type {import("../private").ASTNode[]} v */
							(node.specifiers).map(v => text.slice(v.range[0], v.range[1])).join(", ")
						} } from ${text.slice(node.source.range[0], node.range[1])}`
					if (corrected_text != text.slice(node.range[0], node.range[1])) report(node, corrected_text)
				}
			}
		}
	}
}