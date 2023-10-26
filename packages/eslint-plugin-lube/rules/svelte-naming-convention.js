"use strict"
/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		docs: {
			description: "Enforces snake_case with some symbols for variable declaration.",
			recommended: true,
			url: "https://github.com/Artxe2/lube-series/blob/master/packages/eslint-plugin-lube/docs/svelte-naming-convention.md"
		},
		fixable: "code",
		messages: {
			not_match: "Identifier '{{name}}' does not match for svelte's naming conventions."
		},
		schema: [
			{
				properties: {
					fixSameNames: {
						type: "boolean",
						default: true
					}
				},
				type: "object"
			}
		],
		type: "layout"
	},
	create(context) {
		const fix_same_names = /** @type {boolean} */(context.options[0]?.fixSameNames)/**/ ?? true

		// let name | const name | class name
		const allow_regex = /^[_$]?[_$]?(?:[\da-z]+(?:_[\da-z]+)*\$?\$?)?$|^[A-Z](?:_?[\dA-Z]+)*$|^(?:[\dA-Z][\da-z]*)+$/
		const fixable_name_regex = /^[_$]?[_$]?(?:[\dA-Za-z]+(?:_[\dA-Za-z]+)*\$?\$?)?$/
		const fix_regex = /([\da-z]?)([A-Z][\dA-Z]*)/g
		const camel_case_regex = /^[\da-z]+([A-Z][\da-z]*)*$/

		/** @type {Set<string>} */
		const reported_declarations = new Set()
		/** @type {Map<string, import("../private").AstNode[]>} */
		const pending_usages = new Map()
		/** @type {Set<import("../private").AstNode>} */
		const shortand_properties = new Set()

		/**
		 * @param {import("../private").AstNode & import("estree").Identifier} node
		 * @returns {void}
		 */
		function defer(node) {
			if (fix_same_names) {
				const name = node.name
				if (reported_declarations.has(name)) report(node)
				else {
					let usages = pending_usages.get(name)
					if (!usages) {
						usages = []
						pending_usages.set(name, usages)
					}
					usages.push(node)
				}
			}
		}

		/**
		 * @param {string} _
		 * @param {string} a
		 * @param {string} b
		 * @returns {string}
		 */
		function fix_handler(_, a, b) {
			return a + (a ? "_" : "") + b.toLowerCase()
		}

		/**
		 * @param {import("../private").AstNode & import("estree").Identifier} node
		 * @returns {void}
		 */
		function report(node) {
			const name = node.name
			context.report({
				data: { name },
				fix(fixer) {
					if (fixable_name_regex.test(name)) {
						return fixer.replaceTextRange(
							node.range,
							(shortand_properties.has(node) ? node.name + ": " : "")
								+ node.name.replace(fix_regex, fix_handler)
						)
					}
					return null
				},
				messageId: "not_match",
				node: /** @type {import("estree").Node} */(node)/**/
			})
			if (fix_same_names) {
				const usages = pending_usages.get(name)
				while (usages?.length) {
					report(/** @type {import("../private").AstNode & import("estree").Identifier} */(usages.pop())/**/)
				}
				reported_declarations.add(name)
			}
		}

		return {
			/** @param {import("../private").AstNode & import("estree").Identifier} node */
			Identifier(node) {
				const name = node.name
				if (allow_regex.test(name)) return
				const parent = node.parent
				const type = parent.type
				switch (type) {
				case "ArrayExpression":
					// var value = [ camelCase ]
					defer(node)
					break
				case "ArrayPattern":
					// var [ camelCase ] = value
					report(node)
					break
				case "ArrowFunctionExpression":
					// (camelCase) => {}
					report(node)
					break
				case "AssignmentExpression":
					// left = right
					defer(node)
					break
				case "AssignmentPattern":
					// (left = right) => {}
					if (parent.left == node) {
						if (parent.parent?.type != "Property") {
							// function func({ camelCase = true }) {}
							report(node)
						}
					} else {
						defer(node)
					}
					break
				case "AwaitExpression":
					// await camelCase
					defer(node)
					break
				case "BinaryExpression":
					// left +-*/&| right
					defer(node)
					break
					/* BlockStatement */
					/* BreakStatement */
				case "CallExpression":
					// camelCase()
					defer(node)
					break
				/* CatchClause */
				/* ChainExpression */
				/* ClassBody */
				case "ClassDeclaration":
					// class camelCase {}
					report(node)
					break
				/* ClassExpression */
				case "ConditionalExpression":
					// test ? alternate : consequent
					defer(node)
					break
				/* ContinueStatement */
				/* DebuggerStatement */
				/* DoWhileStatement */
				/* EmptyStatement */
				case "ExportAllDeclaration":
					// export * as camelCase from "module"
					break
				case "ExportDefaultDeclaration":
					// export default camelCase
					defer(node)
					break
				/* ExportNamedDeclaration */
				case "ExportSpecifier":
					// export { default as camelCase, camelCase2 } from "module"
					break
				case "ExpressionStatement":
					// camelCase
					defer(node)
					break
				case "ForInStatement":
					// for (left in right) {}
					if (parent.left == node) {
						report(node)
					} else {
						defer(node)
					}
					break
				case "ForOfStatement":
					// for (left of right) {}
					if (parent.left == node) {
						report(node)
					} else {
						defer(node)
					}
					break
				case "ForStatement":
					// for (init; test; update) {}
					defer(node)
					break
				case "FunctionDeclaration":
					// function camelCase() {}
					if (
						parent.parent?.type != "ExportNamedDeclaration"
						|| !camel_case_regex.test(name)
					) {
						report(node)
					}
					// export function camelCase() {}
					break
				/* FunctionExpression */
				/* Identifier */
				case "IfStatement":
					// if (camelCase) {}
					defer(node)
					break
				/* ImportDeclaration */
				case "ImportDefaultSpecifier":
					// import camelCase from "module"
					report(node)
					break
					/* ImportExpression */
				case "ImportNamespaceSpecifier":
					report(node)
					// import * as camelCase from "module"
					break
				case "ImportSpecifier":
					// import { imported as local, local2 } from "module"
					if (parent.local == node && parent.imported.name != parent.local.name) {
						// import { imported as camelCase } from "module"
						report(node)
					}
					break
				/* LabeledStatement */
				/* Literal */
				case "LogicalExpression":
					// left &&||?? right
					defer(node)
					break
				case "MemberExpression":
					// object.property
					if (parent.object == node) {
						defer(node)
					} else if (parent.computed) {
						// object[camelCase]
						// camelCase[key]
						defer(node)
					}
					break
				/* MetaProperty */
				case "MethodDefinition":
					// class Object { camelCase() {} }
					break
				case "NewExpression":
					// new camelCase
					defer(node)
					break
				/* ObjectExpression */
				/* ObjectPattern */
				/* PrivateIdentifier */
				/* Program */
				case "Property":
					// var value = { key: value }
					// var { key: value } = value
					if (parent.value == node) {
						if (parent.key.name == parent.value.name) {
							shortand_properties.add(node)
						}
						defer(node)
					}
					break
				case "PropertyDefinition":
					// class Object { camelCase = value }
					break
				case "RestElement":
					// var [ ...camelCase ] = value
					// var { ...camelCase } = value
					report(node)
					break
				case "ReturnStatement":
					// function func() { return camelCase }
					defer(node)
					break
				case "SequenceExpression":
					// a, b, camelCase
					defer(node)
					break
				case "SpreadElement":
					// var value = [ ...camelCase ]
					// var value = { ...camelCase }
					defer(node)
					break
				/* StaticBlock */
				/* Super */
				case "SwitchCase":
					// switch (camelCase) {}
					defer(node)
					break
				case "SwitchStatement":
					// switch (cond) { case camelCase: break }
					defer(node)
					break
				case "TaggedTemplateExpression":
					// camelCase`quasis${expression}quasis`
					defer(node)
					break
				/* TemplateElement */
				case "TemplateLiteral":
					// `quasis${camelCase}quasis`
					defer(node)
					break
				/* ThisExpression */
				case "ThrowStatement":
					// throw camelCase
					defer(node)
					break
				/* TryStatement */
				case "UnaryExpression":
					// +-!~ camelCase
					defer(node)
					break
				case "UpdateExpression":
					// ++--camelCase++--
					defer(node)
					break
				/* VariableDeclaration */
				case "VariableDeclarator":
					// var id = init
					if (parent.id == node) {
						if (
							parent.parent?.parent?.type != "ExportNamedDeclaration"
							|| !camel_case_regex.test(name)
						) {
							report(node)
						}
					} else {
						// export var camelCase
						defer(node)
					}
					break
				case "WhileStatement":
					// while (camelCase) {}
					defer(node)
					break
				case "WithStatement":
					// with (camelCase) {}
					defer(node)
					break
				case "YieldExpression":
					// function* func() { yield camelCase }
					defer(node)
					break
				}
			}
		}
	}
}