/**
 * @fileoverview Rule to flag non-matching identifiers
 */
"use strict"
/** @type {import("eslint").Rule.RuleModule} */
module.exports = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Require identifiers to match a specified regular expression",
			recommended: false,
			url: "https://eslint.org/docs/latest/rules/id-match"
		},
		schema: [
			{ type: "string" },
			{
				type: "object",
				properties: {
					properties: {
						type: "boolean",
						default: false
					},
					classFields: {
						type: "boolean",
						default: false
					},
					onlyDeclarations: {
						type: "boolean",
						default: false
					},
					ignoreDestructuring: {
						type: "boolean",
						default: false
					}
				},
				additionalProperties: false
			}
		],
		messages: {
			notMatch: "Identifier '{{name}}' does not match the pattern '{{pattern}}'.",
			notMatchPrivate: "Identifier '#{{name}}' does not match the pattern '{{pattern}}'."
		}
	},
	create(context) {
		const { options, sourceCode } = context
		const pattern = options[0] || "^.+$"
		const allow_regex = new RegExp(pattern, "u")
		const {
			properties: check_properties,
			classFields: check_class_fields,
			onlyDeclarations: only_declarations,
			ignoreDestructuring: ignore_destructuring
		} = options[1] || {}

		/** @type {import("eslint").Scope.Scope} */
		let global_scope

		//--------------------------------------------------------------------------
		// Helpers
		//--------------------------------------------------------------------------

		// contains reported nodes to avoid reporting twice on destructuring with shorthand notation
		/** @type {Set<string>} */
		const reported_nodes = new Set()
		const ALLOWED_PARENT_TYPES = ["CallExpression", "NewExpression"]
		const DECLARATION_TYPES = ["FunctionDeclaration", "VariableDeclarator"]
		const IMPORT_TYPES = ["ImportSpecifier", "ImportNamespaceSpecifier", "ImportDefaultSpecifier"]

		/**
		 * Checks whether the given node represents a reference to a global variable that is not declared in the source code.
		 * These identifiers will be allowed, as it is assumed that user has no control over the names of external global variables.
		 * @param {import("../private").ASTNode} node `Identifier` node to check.
		 * @returns {boolean|void} `true` if the node is a reference to a global variable.
		 */
		function is_reference_to_global_variable(node) {
			const variable = global_scope.set.get(node.name)
			return variable && variable.defs.length === 0
				&& variable.references.some(ref => ref.identifier === node)
		}

		/**
		 * Checks if a parent of a node is an ObjectPattern.
		 * @param {import("../private").ASTNode} node The node to check.
		 * @returns {boolean} if the node is inside an ObjectPattern
		 * @private
		 */
		function is_inside_object_pattern(node) {
			let { parent } = node
			while (parent) {
				if (parent.type === "ObjectPattern") {
					return true
				}
				parent = parent.parent
			}
			return false
		}

		/**
		 * Verifies if we should report an error or not based on the effective
		 * parent node and the identifier name.
		 * @param {import("../private").ASTNode} effective_parent The effective parent node of the node to be reported
		 */
		function should_report(effective_parent) {
			return (!only_declarations || DECLARATION_TYPES.includes(effective_parent.type)) &&
				!ALLOWED_PARENT_TYPES.includes(effective_parent.type)
		}

		/**
		 * Reports an AST node as a rule violation.
		 * @param {import("../private").ASTNode} node The node to report.
		 * @returns {void}
		 * @private
		 */
		function report(node) {
			/*
			* We used the range instead of the node because it's possible
			* for the same identifier to be represented by two different
			* nodes, with the most clear example being shorthand properties:
			* { foo }
			* In this case, "foo" is represented by one node for the name
			* and one for the value. The only way to know they are the same
			* is to look at the range.
			*/
			if (!reported_nodes.has(node.range.toString())) {

				const message_id = (node.type === "PrivateIdentifier")
					? "notMatchPrivate" : "notMatch"

				context.report({
					node: /** @type {import("estree").Node} */(node),
					messageId: message_id,
					data: {
						name: node.name,
						pattern
					}
				})
				reported_nodes.add(node.range.toString())
			}
		}

		return {
			Program(node) {
				global_scope = sourceCode.getScope(node)
			},
			/** @param {import("../private").ASTNode} node */
			Identifier(node) {
				const name = node.name
				if (allow_regex.test(name)) return
				if (is_reference_to_global_variable(node)) return
				const parent = node.parent
				const effective_parent = (parent.type === "MemberExpression") ? parent.parent : parent
				if (parent.type === "MemberExpression") {
					if (!check_properties) return
					if (
						// Always check object names
						parent.object.type === "Identifier" && parent.object.name === name
					) {
						report(node)
					} else if (
						// Report AssignmentExpressions left side's assigned variable id
						effective_parent.type === "AssignmentExpression" &&
						effective_parent.left.type === "MemberExpression" &&
						effective_parent.left.property.name === node.name
					) {
						report(node)
					} else if (
						// Report AssignmentExpressions only if they are the left side of the assignment
						effective_parent.type === "AssignmentExpression"
						&& effective_parent.right.type !== "MemberExpression"
					) {
						report(node)
					}
				} else if (
					// For https://github.com/eslint/eslint/issues/15123
					parent.type === "Property" &&
					parent.parent.type === "ObjectExpression" &&
					parent.key === node &&
					!parent.computed
				) {
					if (!check_properties) return
					report(node)
				} else if (
					/*
					* Properties have their own rules, and
					* AssignmentPattern nodes can be treated like Properties:
					* e.g.: const { no_camelcased = false } = bar;
					*/
					parent.type === "Property" || parent.type === "AssignmentPattern"
				) {
					if (parent.parent && parent.parent.type === "ObjectPattern") {
						if (!ignore_destructuring && parent.shorthand && parent.value.left) {
							report(node)
						}
						const assignment_key_equals_value = parent.key.name === parent.value.name
						// prevent checking righthand side of destructured object
						if (!assignment_key_equals_value && parent.key === node) {
							return
						}
						// ignore destructuring if the option is set, unless a new identifier is created
						if (parent.value.name && !(assignment_key_equals_value && ignore_destructuring)) {
							report(node)
						}
					}
					// never check properties or always ignore destructuring
					if ((!check_properties && !parent.computed) || (ignore_destructuring && is_inside_object_pattern(node))) {
						return
					}
					// don't check right hand side of AssignmentExpression to prevent duplicate warnings
					if (parent.right !== node && should_report(effective_parent)) {
						report(node)
					}
				// Check if it's an import specifier
				} else if (IMPORT_TYPES.includes(parent.type)) {
					if (ignore_destructuring && "ImportSpecifier" == parent.type) return
					if (
						// Report only if the local imported identifier is invalid
						parent.local && parent.local.name === node.name
					) {
						report(node)
					}
				} else if (parent.type === "PropertyDefinition") {
					if (!check_class_fields) return
					report(node)
				} else if (
					// Report anything that is invalid that isn't a CallExpression
					should_report(effective_parent)
				) {
					report(node)
				}
			},
			PrivateIdentifier(node) {
				const is_class_field = node.parent.type === "PropertyDefinition"
				if (is_class_field && !check_class_fields) return
				if (!allow_regex.test(node.name)) {
					report(
						/** @type {import("../private").ASTNode} */(node)
					)
				}
			}
		}
	}
}