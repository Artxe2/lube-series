"use strict"
/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		docs: {
			description: "Enforces snake_case with some symbols for variable declaration.",
			recommended: true,
			url: "https://github.com/sveltejs/svelte/blob/master/CONTRIBUTING.md#code-conventions"
		},
		fixable: "code",
		messages: {
			not_match: "Identifier '{{name}}' does not match for svelte's naming conventions.",
			not_match_private: "PrivateIdentifier '#{{name}}' does not match for svelte's naming conventions."
		},
		schema: [{
			properties: {
				fixSameNames: {
					type: "boolean",
					default: false
				},
			},
			type: "object"
		}],
		type: "suggestion"
	},
	create(context) {
		const fix_same_names = /** @type {boolean} */ (context.options[0]?.fixSameNames)

		// let name | const name | class name
		const allow_regex = /^[_$]?[_$]?(?:[0-9a-z]+(?:_[0-9a-z]+)*\$?\$?)?$|^[A-Z][0-9A-Z_]*$|^(?:[0-9A-Z][0-9a-z]*)+$/
		const fixable_name_regex = /^[_$]?[_$]?(?:[0-9A-Za-z]+(?:_[0-9A-Za-z]+)*\$?\$?)?$/
		const fix_regex = /([0-9a-z]?)([A-Z][0-9A-Z]*)/g

		/**
		 * @param {string} _
		 * @param {string} a
		 * @param {string} b
		 */
		function fix_callback(_, a, b) {
			return a + (a ? "_" : "") + b.toLowerCase()
		}

		/** @type {Set<string>} */
		const reported_declarations = new Set()
		/** @type {Map<string, import("../private").ASTNode[]>} */
		const pending_usages = new Map()

		/** @param {import("../private").ASTNode} node */
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

		/** @param {import("../private").ASTNode} node */
		function report(node) {
			const name = node.name
			context.report({
				data: { name },
				fix(fixer) {
					if (fixable_name_regex.test(name)) {
						return fixer.replaceTextRange(
							node.range,
							node.name.replace(fix_regex, fix_callback)
						)
					}
					return null
				},
				messageId: node.type == "PrivateIdentifier"
					? "not_match_private"
					: "not_match",
				node: /** @type {import("estree").Node} */(node)
			})
			if (fix_same_names) {
				const usages = pending_usages.get(name)
				while (usages?.length) {
					report(/** @type {import("../private").ASTNode} */(
						usages.pop()
					))
				}
				reported_declarations.add(name)
			}
		}

		return {
			/** @param {import("../private").ASTNode} node */
			Identifier(node) {
				const name = node.name
				if (allow_regex.test(name)) return
				const parent = node.parent
				const type = parent.type
				// var value = [ camelCase ]
				if ("ArrayExpression" == type) {
					defer(node)
					return
				}
				// var [ camelCase ] = value
				if ("ArrayPattern" == type) {
					report(node)
					return
				}
				// (camelCase) => {}
				if ("ArrowFunctionExpression" == type) {
					report(node)
					return
				}
				// left = right
				if ("AssignmentExpression" == type) {
					defer(node)
					return
				}
				// (left = right) => {}
				if ("AssignmentPattern" == type) {
					if (parent.left == node) {
						report(node)
					} else {
						defer(node)
					}
					return
				}
				// await camelCase
				if ("AwaitExpression" == type) {
					defer(node)
					return
				}
				// left +-*/&| right
				if ("BinaryExpression" == type) {
					defer(node)
					return
				}
				/* BlockStatement */
				/* BreakStatement */
				// camelCase()
				if ("CallExpression" == type) {
					defer(node)
					return
				}
				/* CatchClause */
				/* ChainExpression */
				/* ClassBody */
				// class camelCase {}
				if ("ClassDeclaration" == type) {
					report(node)
					return
				}
				/* ClassExpression */
				// test ? alternate : consequent
				if ("ConditionalExpression" == type) {
					defer(node)
					return
				}
				/* ContinueStatement */
				/* DebuggerStatement */
				/* DoWhileStatement */
				/* EmptyStatement */
				// export * as camelCase from "module"
				if ("ExportAllDeclaration" == type) {
					return
				}
				// export default camelCase
				if ("ExportDefaultDeclaration" == type) {
					defer(node)
					return
				}
				/* ExportNamedDeclaration */
				// export { default as camelCase, camelCase2 } from "module"
				if ("ExportSpecifier" == type) {
					return
				}
				// camelCase
				if ("ExpressionStatement" == type) {
					defer(node)
					return
				}
				// for (left in right) {}
				if ("ForInStatement" == type) {
					if (parent.left == node) {
						report(node)
					} else {
						defer(node)
					}
					return
				}
				// for (left of right) {}
				if ("ForOfStatement" == type) {
					if (parent.left == node) {
						report(node)
					} else {
						defer(node)
					}
					return
				}
				// for (init; test; update) {}
				if ("ForStatement" == type) {
					defer(node)
					return
				}
				// function camelCase() {}
				if ("FunctionDeclaration" == type) {
					report(node)
					return
				}
				/* FunctionExpression */
				/* Identifier */
				// if (camelCase) {}
				if ("IfStatement" == type) {
					defer(node)
					return
				}
				/* ImportDeclaration */
				// import camelCase from "module"
				if ("ImportDefaultSpecifier" == type) {
					report(node)
					return
				}
				/* ImportExpression */
				// import * as camelCase from "module"
				if ("ImportNamespaceSpecifier" == type) {
					report(node)
					return
				}
				// import { imported as local, local2 } from "module"
				if ("ImportSpecifier" == type) {
					// import { imported as camelCase } from "module"
					if (parent.local == node && parent.imported.name != parent.local.name) {
						report(node)
					}
					return
				}
				/* LabeledStatement */
				/* Literal */
				// left &&||?? right
				if ("LogicalExpression" == type) {
					defer(node)
					return
				}
				// object.property
				if ("MemberExpression" == type) {
					if (parent.object == node) {
						defer(node)
					}
					// object[camelCase]
					// camelCase[key]
					else if (parent.computed) {
						defer(node)
					}
					return
				}
				/* MetaProperty */
				// class Object { camelCase() {} }
				if ("MethodDefinition" == type) {
					report(node)
					return
				}
				// new camelCase
				if ("NewExpression" == type) {
					defer(node)
					return
				}
				/* ObjectExpression */
				/* ObjectPattern */
				/* PrivateIdentifier */
				/* Program */
				// var value = { key: value }
				// var { key: value } = value
				if ("Property" == type) {
					if (parent.value == node && parent.key.name != parent.value.name) {
						defer(node)
					}
					return
				}
				// class Object { key = value }
				if ("PropertyDefinition" == type) {
					if (parent.key == node) {
						report(node)
					} else {
						defer(node)
					}
					return
				}
				// var [ ...camelCase ] = value
				// var { ...camelCase } = value
				if ("RestElement" == type) {
					report(node)
					return
				}
				// function func() { return camelCase }
				if ("ReturnStatement" == type) {
					defer(node)
					return
				}
				// a, b, camelCase
				if ("SequenceExpression" == type) {
					defer(node)
					return
				}
				// var value = [ ...camelCase ]
				// var value = { ...camelCase }
				if ("SpreadElement" == type) {
					defer(node)
					return
				}
				/* StaticBlock */
				/* Super */
				// switch (camelCase) {}
				if ("SwitchCase" == type) {
					defer(node)
					return
				}
				// switch (cond) { case camelCase: break }
				if ("SwitchStatement" == type) {
					defer(node)
					return
				}
				// camelCase`quasis${expression}quasis`
				if ("TaggedTemplateExpression" == type) {
					defer(node)
					return
				}
				/* TemplateElement */
				// `quasis${camelCase}quasis`
				if ("TemplateLiteral" == type) {
					defer(node)
					return
				}
				/* ThisExpression */
				// throw camelCase
				if ("ThrowStatement" == type) {
					defer(node)
					return
				}
				/* TryStatement */
				// +-!~ camelCase
				if ("UnaryExpression" == type) {
					defer(node)
					return
				}
				// ++--camelCase++--
				if ("UpdateExpression" == type) {
					defer(node)
					return
				}
				/* VariableDeclaration */
				// var id = init
				if ("VariableDeclarator" == type) {
					if (parent.id == node) {
						report(node)
					} else {
						defer(node)
					}
					return
				}
				// while (camelCase) {}
				if ("WhileStatement" == type) {
					defer(node)
					return
				}
				// with (camelCase) {}
				if ("WithStatement" == type) {
					defer(node)
					return
				}
				// function* func() { yield camelCase }
				if ("YieldExpression" == type) {
					defer(node)
					return
				}
			},
			/** @param {import("../private").ASTNode} node */
			PrivateIdentifier(node) {
				const name = node.name
				if (allow_regex.test(name)) return
				const parent = node.parent
				const type = parent.type
				// class Object { #camelCase() {} }
				if ("MethodDefinition" == type) {
					report(node)
					return
				}
				// class Object { #camelCase = value }
				if ("PropertyDefinition" == type) {
					report(node)
					return
				}
				// TODO ?
			}
		}
	}
}