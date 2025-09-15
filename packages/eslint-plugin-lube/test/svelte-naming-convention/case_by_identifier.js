/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	invalid.push(
		// ArrayExpression
		{
			code: `
			var value = [ deferA ]
			var value = [ pendingA ]
			var pendingA
			var value = [ pendingA ]
			`,
			errors: [
				{
					column: 18,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			var value = [ deferA ]
			var value = [ pending_a ]
			var pending_a
			var value = [ pending_a ]
			`
		},
		// ArrayPattern
		{
			code: "var [ camelCase ] = value",
			errors: [
				{
					column: 7,
					line: 1,
					messageId: "not_match"
				}
			],
			output: "var [ camel_case ] = value",
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// ArrowFunctionExpression
		{
			code: "(camelCase) => {}",
			errors: [
				{
					column: 2,
					line: 1,
					messageId: "not_match"
				}
			],
			output: "(camel_case) => {}",
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// AssignmentExpression
		{
			code: `
			deferA = deferB
			pendingA = pendingB
			var pendingA, pendingB
			pendingA = pendingB
			function func({ pendingA = 123 }) {}
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 15,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 15,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			deferA = deferB
			pending_a = pending_b
			var pending_a, pending_b
			pending_a = pending_b
			function func({ pendingA = 123 }) {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// AssignmentPattern
		{
			code: `
			(camelCase = deferA) => {}
			(snake_case = pendingA) => {}
			var pendingA
			(snake_case = pendingA) => {}
			`,
			errors: [
				{
					column: 5,
					line: 2,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			(camel_case = deferA) => {}
			(snake_case = pending_a) => {}
			var pending_a
			(snake_case = pending_a) => {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// AwaitExpression
		{
			code: `
			await deferA
			await pendingA
			var pendingA
			await pendingA
			`,
			errors: [
				{
					column: 10,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 10,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			await deferA
			await pending_a
			var pending_a
			await pending_a
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// BinaryExpression
		{
			code: `
			deferA = deferB
			pendingA - pendingB
			var pendingA, pendingB
			pendingA / pendingB
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 15,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 15,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			deferA = deferB
			pending_a - pending_b
			var pending_a, pending_b
			pending_a / pending_b
			`
		},
		// CallExpression
		{
			code: `
			deferA()
			pendingA()
			var pendingA
			pendingA()
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			deferA()
			pending_a()
			var pending_a
			pending_a()
			`
		},
		// ClassDeclaration
		{
			code: "class camelCase {}",
			errors: [
				{
					column: 7,
					line: 1,
					messageId: "not_match"
				}
			],
			output: "class camel_case {}",
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// ConditionalExpression
		{
			code: `
			test ? deferA : deferB
			test ? pendingA : pendingB
			var pendingA, pendingB
			test ? pendingA : pendingB
			`,
			errors: [
				{
					column: 11,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 22,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 11,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 22,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			test ? deferA : deferB
			test ? pending_a : pending_b
			var pending_a, pending_b
			test ? pending_a : pending_b
			`
		},
		// ExportAllDeclaration
		{
			code: `
			export * as camelCase from "module"
			var camelCase
			`,
			errors: [
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				}
			],
			output: `
			export * as camelCase from "module"
			var camel_case
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// ExportDefaultDeclaration
		{
			code: `
			export default camelCase
			var camelCase
			`,
			errors: [
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				}
			],
			options: [ { fixSameNames: false } ],
			output: `
			export default camelCase
			var camel_case
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		{
			code: `
			export default camelCase
			var camelCase
			`,
			errors: [
				{
					column: 19,
					line: 2,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				}
			],
			output: `
			export default camel_case
			var camel_case
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// ExportSpecifier
		{
			code: `
			export { default as camelCase, camelCase2 } from 'module'
			var camelCase, camelCase2
			`,
			errors: [
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 19,
					line: 3,
					messageId: "not_match"
				}
			],
			output: `
			export { default as camelCase, camelCase2 } from 'module'
			var camel_case, camel_case2
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// ExpressionStatement
		{
			code: `
			deferA
			pendingA
			var pendingA
			pendingA
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			deferA
			pending_a
			var pending_a
			pending_a
			`
		},
		// ForInStatement
		{
			code: `
			for (camelCase in deferA) {}
			for (snake_case in pendingA) {}
			var pendingA
			for (snake_case in pendingA) {}
			`,
			errors: [
				{
					column: 9,
					line: 2,
					messageId: "not_match"
				},
				{
					column: 23,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 23,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			for (camel_case in deferA) {}
			for (snake_case in pending_a) {}
			var pending_a
			for (snake_case in pending_a) {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// ForStatement
		{
			code: `
			for (deferA; deferB; deferC) {}
			for (pendingA; pendingB; pendingC) {}
			var pendingA, pendingB, pendingC
			for (pendingA; pendingB; pendingC) {}
			`,
			errors: [
				{
					column: 9,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 19,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 29,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 28,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 9,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 19,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 29,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			for (deferA; deferB; deferC) {}
			for (pending_a; pending_b; pending_c) {}
			var pending_a, pending_b, pending_c
			for (pending_a; pending_b; pending_c) {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// FunctionDeclaration
		{
			code: `
			function camelCase() {}
			export function camelCase2() {}
			export function camelCase$() {}
			`,
			errors: [
				{
					column: 13,
					line: 2,
					messageId: "not_match"
				},
				{
					column: 20,
					line: 4,
					messageId: "not_match"
				}
			],
			output: `
			function camel_case() {}
			export function camelCase2() {}
			export function camel_case$() {}
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// IfStatement
		{
			code: `
			if (deferA) {}
			if (pendingA) {}
			var pendingA
			if (pendingA) {}
			`,
			errors: [
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			if (deferA) {}
			if (pending_a) {}
			var pending_a
			if (pending_a) {}
			`
		},
		// ImportDefaultSpecifier
		{
			code: "import camelCase from 'module'",
			errors: [
				{
					column: 8,
					line: 1,
					messageId: "not_match"
				}
			],
			output: "import camel_case from 'module'",
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// ImportNamespaceSpecifier
		{
			code: "import * as camelCase from 'module'",
			errors: [
				{
					column: 13,
					line: 1,
					messageId: "not_match"
				}
			],
			output: "import * as camel_case from 'module'",
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// ImportSpecifier
		{
			code: `
			import { imported as camelCase, camelCase2, camelCase3 } from "module"
			camelCase
			camelCase2
			`,
			errors: [
				{
					column: 25,
					line: 2,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				}
			],
			output: `
			import { imported as camel_case, camelCase2, camelCase3 } from "module"
			camel_case
			camelCase2
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// LogicalExpression
		{
			code: `
			deferA && deferB
			pendingA || pendingB
			var pendingA, pendingB
			pendingA ?? pendingB
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 16,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 16,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			deferA && deferB
			pending_a || pending_b
			var pending_a, pending_b
			pending_a ?? pending_b
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// MemberExpression
		{
			code: `
			deferA.camelCase
			pendingA.camelCase
			var pendingA
			pendingA.camelCase
			object[deferB]
			object[pendingB]
			var pendingB
			object[pendingB]
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 11,
					line: 7,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 8,
					messageId: "not_match"
				},
				{
					column: 11,
					line: 9,
					messageId: "not_match"
				}
			],
			output: `
			deferA.camelCase
			pending_a.camelCase
			var pending_a
			pending_a.camelCase
			object[deferB]
			object[pending_b]
			var pending_b
			object[pending_b]
			`
		},
		// MethodDefinition
		{
			code: `
			class ObjectB { camelCase() {} }
			var camelCase
			`,
			errors: [
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				}
			],
			output: `
			class ObjectB { camelCase() {} }
			var camel_case
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// NewExpression
		{
			code: `
			new deferA
			new pendingA
			var pendingA
			new pendingA
			`,
			errors: [
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			new deferA
			new pending_a
			var pending_a
			new pending_a
			`
		},
		// Property
		{
			code: `
			var value = { camelCase: deferA }
			var value = { key: pendingA }
			var pendingA
			var value = { key: pendingA }
			var value = { pendingA }
			`,
			errors: [
				{
					line: 3,
					column: 23,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 23,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 6,
					messageId: "not_match"
				}
			],
			output: `
			var value = { camelCase: deferA }
			var value = { key: pending_a }
			var pending_a
			var value = { key: pending_a }
			var value = { pendingA: pending_a }
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// PropertyDefinition
		{
			code: `
			class ObjectB { camelCase = camelCase2 }
			var camelCase, camelCase2
			`,
			errors: [
				{
					column: 8,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 19,
					line: 3,
					messageId: "not_match"
				}
			],
			output: `
			class ObjectB { camelCase = camelCase2 }
			var camel_case, camel_case2
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		//RestElement
		{
			code: `
			var [ ...camelCaseA ] = value
			var { ...camelCaseB } = value
			`,
			errors: [
				{
					column: 13,
					line: 2,
					messageId: "not_match"
				},
				{
					column: 13,
					line: 3,
					messageId: "not_match"
				}
			],
			output: `
			var [ ...camel_case_a ] = value
			var { ...camel_case_b } = value
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// ReturnStatement
		{
			code: `
			function func_a() { return deferA }
			function func_b() { return pendingA }
			var pendingA
			function func_c() { return pendingA }
			`,
			errors: [
				{
					column: 31,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 31,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			function func_a() { return deferA }
			function func_b() { return pending_a }
			var pending_a
			function func_c() { return pending_a }
			`
		},
		// SequenceExpression
		{
			code: `
			a, b, deferA
			a, b, pendingA
			var pendingA
			a, b, pendingA
			`,
			errors: [
				{
					column: 10,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 10,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			a, b, deferA
			a, b, pending_a
			var pending_a
			a, b, pending_a
			`
		},
		// SpreadElement
		{
			code: `
			var value = [ ...deferA, deferB ]
			var value = [ ...pendingA, pendingB ]
			var pendingA, pendingB
			var value = [ ...pendingA, pendingB ]
			`,
			errors: [
				{
					column: 21,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 31,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 18,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 21,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 31,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			var value = [ ...deferA, deferB ]
			var value = [ ...pending_a, pending_b ]
			var pending_a, pending_b
			var value = [ ...pending_a, pending_b ]
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// SwitchCase
		{
			code: `
			switch (deferA) {}
			switch (pendingA) {}
			var pendingA
			switch (pendingA) {}
			`,
			errors: [
				{
					column: 12,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 12,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			switch (deferA) {}
			switch (pending_a) {}
			var pending_a
			switch (pending_a) {}
			`
		},
		// SwitchStatement
		{
			code: `
			switch (cond) { case deferA: break }
			switch (cond) { case pendingA: break }
			var pendingA
			switch (cond) { case pendingA: break }
			`,
			errors: [
				{
					column: 25,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 25,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			switch (cond) { case deferA: break }
			switch (cond) { case pending_a: break }
			var pending_a
			switch (cond) { case pending_a: break }
			`
		},
		// TaggedTemplateExpression
		{
			code: `
			deferA\`quasis\${expression}quasis\`
			pendingA\`quasis\${expression}quasis\`
			var pendingA
			pendingA\`quasis\${expression}quasis\`
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			deferA\`quasis\${expression}quasis\`
			pending_a\`quasis\${expression}quasis\`
			var pending_a
			pending_a\`quasis\${expression}quasis\`
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		// ThrowStatement
		{
			code: `
			throw deferA
			throw pendingA
			var pendingA
			throw pendingA
			`,
			errors: [
				{
					column: 10,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 10,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			throw deferA
			throw pending_a
			var pending_a
			throw pending_a
			`
		},
		// UnaryExpression
		{
			code: `
			+deferA
			-pendingA
			var pendingA
			~pendingA
			`,
			errors: [
				{
					column: 5,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 5,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			+deferA
			-pending_a
			var pending_a
			~pending_a
			`
		},
		// UpdateExpression
		{
			code: `
			++deferA
			--pendingA
			var pendingA
			pendingA++
			`,
			errors: [
				{
					column: 6,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 4,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			++deferA
			--pending_a
			var pending_a
			pending_a++
			`
		},
		// VariableDeclarator
		{
			code: `
			var camelCase = deferA
			var snake_case = pendingA
			var pendingA
			var snake_case = pendingA
			export var camelCase2
			export var camelCase$
			`,
			errors: [
				{
					column: 8,
					line: 2,
					messageId: "not_match"
				},
				{
					column: 21,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 21,
					line: 5,
					messageId: "not_match"
				},
				{
					column: 15,
					line: 7,
					messageId: "not_match"
				}
			],
			output: `
			var camel_case = deferA
			var snake_case = pending_a
			var pending_a
			var snake_case = pending_a
			export var camelCase2
			export var camel_case$
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		// WhileStatement
		{
			code: `
			while (deferA) {}
			while (pendingA) {}
			var pendingA
			while (pendingA) {}
			`,
			errors: [
				{
					column: 11,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 11,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			while (deferA) {}
			while (pending_a) {}
			var pending_a
			while (pending_a) {}
			`
		},
		// YieldStatement
		{
			code: `
			function* func_a() { yield deferA }
			function* func_b() { yield pendingA }
			var pendingA
			function* func_c() { yield pendingA }
			`,
			errors: [
				{
					column: 31,
					line: 3,
					messageId: "not_match"
				},
				{
					column: 8,
					line: 4,
					messageId: "not_match"
				},
				{
					column: 31,
					line: 5,
					messageId: "not_match"
				}
			],
			output: `
			function* func_a() { yield deferA }
			function* func_b() { yield pending_a }
			var pending_a
			function* func_c() { yield pending_a }
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		}
	)
}