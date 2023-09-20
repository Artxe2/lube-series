const error = {
	messageId: "not_match",
	type: "Identifier" 
}
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
					...error,
					line: 3,
					column: 18
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 18
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
			errors: [{
				...error,
				line: 1,
				column: 7
			}],
			output: "var [ camel_case ] = value",
			parserOptions: { ecmaVersion: "latest" }
		},
		// ArrowFunctionExpression
		{
			code: "(camelCase) => {}",
			errors: [{
				...error,
				line: 1,
				column: 2
			}],
			output: "(camel_case) => {}",
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 4
				},
				{
					...error,
					line: 3,
					column: 15
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 4,
					column: 18
				},
				{
					...error,
					line: 5,
					column: 4
				},
				{
					...error,
					line: 5,
					column: 15
				}
			],
			output: `
			deferA = deferB
			pending_a = pending_b
			var pending_a, pending_b
			pending_a = pending_b
			function func({ pendingA = 123 }) {}
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 2,
					column: 5
				},
				{
					...error,
					line: 3,
					column: 18
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 18
				}
			],
			output: `
			(camel_case = deferA) => {}
			(snake_case = pending_a) => {}
			var pending_a
			(snake_case = pending_a) => {}
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 10
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 10
				}
			],
			output: `
			await deferA
			await pending_a
			var pending_a
			await pending_a
			`,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					...error,
					line: 3,
					column: 4
				},
				{
					...error,
					line: 3,
					column: 15
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 4,
					column: 18
				},
				{
					...error,
					line: 5,
					column: 4
				},
				{
					...error,
					line: 5,
					column: 15
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
					...error,
					line: 3,
					column: 4
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 4
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
			errors: [{
				...error,
				line: 1,
				column: 7
			}],
			output: "class camel_case {}",
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 11
				},
				{
					...error,
					line: 3,
					column: 22
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 4,
					column: 18
				},
				{
					...error,
					line: 5,
					column: 11
				},
				{
					...error,
					line: 5,
					column: 22
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
			errors: [{
				...error,
				line: 3,
				column: 8
			}],
			output: `
			export * as camelCase from "module"
			var camel_case
			`,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		// ExportDefaultDeclaration
		{
			code: `
			export default camelCase
			var camelCase
			`,
			errors: [{
				...error,
				line: 3,
				column: 8
			}],
			options: [{ fixSameNames: false }],
			output: `
			export default camelCase
			var camel_case
			`,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		{
			code: `
			export default camelCase
			var camelCase
			`,
			errors: [
				{
					...error,
					line: 2,
					column: 19
				},
				{
					...error,
					line: 3,
					column: 8
				},
			],
			output: `
			export default camel_case
			var camel_case
			`,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					...error,
					line: 3,
					column: 8
				},
				{
					...error,
					line: 3,
					column: 19
				},
			],
			output: `
			export { default as camelCase, camelCase2 } from 'module'
			var camel_case, camel_case2
			`,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					...error,
					line: 3,
					column: 4
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 4
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
					...error,
					line: 2,
					column: 9
				},
				{
					...error,
					line: 3,
					column: 23
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 23
				}
			],
			output: `
			for (camel_case in deferA) {}
			for (snake_case in pending_a) {}
			var pending_a
			for (snake_case in pending_a) {}
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 9
				},
				{
					...error,
					line: 3,
					column: 19
				},
				{
					...error,
					line: 3,
					column: 29
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 4,
					column: 18
				},
				{
					...error,
					line: 4,
					column: 28
				},
				{
					...error,
					line: 5,
					column: 9
				},
				{
					...error,
					line: 5,
					column: 19
				},
				{
					...error,
					line: 5,
					column: 29
				}
			],
			output: `
			for (deferA; deferB; deferC) {}
			for (pending_a; pending_b; pending_c) {}
			var pending_a, pending_b, pending_c
			for (pending_a; pending_b; pending_c) {}
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 2,
					column: 13
				},
				{
					...error,
					line: 4,
					column: 20
				}
			],
			output: `
			function camel_case() {}
			export function camelCase2() {}
			export function camel_case$() {}
			`,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					...error,
					line: 3,
					column: 8
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 8
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
			errors: [{
				...error,
				line: 1,
				column: 8
			}],
			output: "import camel_case from 'module'",
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		// ImportNamespaceSpecifier
		{
			code: "import * as camelCase from 'module'",
			errors: [{
				...error,
				line: 1,
				column: 13
			}],
			output: "import * as camel_case from 'module'",
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					...error,
					line: 2,
					column: 25
				},
				{
					...error,
					line: 3,
					column: 4
				}
			],
			output: `
			import { imported as camel_case, camelCase2, camelCase3 } from "module"
			camel_case
			camelCase2
			`,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					...error,
					line: 3,
					column: 4
				},
				{
					...error,
					line: 3,
					column: 16
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 4,
					column: 18
				},
				{
					...error,
					line: 5,
					column: 4
				},
				{
					...error,
					line: 5,
					column: 16
				}
			],
			output: `
			deferA && deferB
			pending_a || pending_b
			var pending_a, pending_b
			pending_a ?? pending_b
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 4
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 4
				},
				{
					...error,
					line: 7,
					column: 11
				},
				{
					...error,
					line: 8,
					column: 8
				},
				{
					...error,
					line: 9,
					column: 11
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
			errors: [{
				...error,
				line: 3,
				column: 8
			}],
			output: `
			class ObjectB { camelCase() {} }
			var camel_case
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 8
				},
				{
					...error,
					line: 4,
					column:8
				},
				{
					...error,
					line: 5,
					column: 8
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
					...error,
					line: 3,
					column: 23
				},
				{
					...error,
					line: 4,
					column:8
				},
				{
					...error,
					line: 5,
					column: 23
				},
				{
					...error,
					line: 6,
					column: 18
				}
			],
			output: `
			var value = { camelCase: deferA }
			var value = { key: pending_a }
			var pending_a
			var value = { key: pending_a }
			var value = { pendingA: pending_a }
			`,
			parserOptions: { ecmaVersion: "latest" }
		},
		// PropertyDefinition
		{
			code: `
			class ObjectB { camelCase = camelCase2 }
			var camelCase, camelCase2
			`,
			errors: [
				{
					...error,
					line: 3,
					column: 8
				},
				{
					...error,
					line: 3,
					column: 19
				}
			],
			output: `
			class ObjectB { camelCase = camelCase2 }
			var camel_case, camel_case2
			`,
			parserOptions: { ecmaVersion: "latest" }
		},
		//RestElement
		{
			code: `
			var [ ...camelCaseA ] = value
			var { ...camelCaseB } = value
			`,
			errors: [
				{
					...error,
					line: 2,
					column: 13
				},
				{
					...error,
					line: 3,
					column: 13
				}
			],
			output: `
			var [ ...camel_case_a ] = value
			var { ...camel_case_b } = value
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 31
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 31
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
					...error,
					line: 3,
					column: 10
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 10
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
					...error,
					line: 3,
					column: 21
				},
				{
					...error,
					line: 3,
					column: 31
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 4,
					column: 18
				},
				{
					...error,
					line: 5,
					column: 21
				},
				{
					...error,
					line: 5,
					column: 31
				}
			],
			output: `
			var value = [ ...deferA, deferB ]
			var value = [ ...pending_a, pending_b ]
			var pending_a, pending_b
			var value = [ ...pending_a, pending_b ]
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 12
				},
				{
					...error,
					line: 4,
					column:8
				},
				{
					...error,
					line: 5,
					column: 12
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
					...error,
					line: 3,
					column: 25
				},
				{
					...error,
					line: 4,
					column:8
				},
				{
					...error,
					line: 5,
					column: 25
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
					...error,
					line: 3,
					column: 4
				},
				{
					...error,
					line: 4,
					column:8
				},
				{
					...error,
					line: 5,
					column: 4
				}
			],
			output: `
			deferA\`quasis\${expression}quasis\`
			pending_a\`quasis\${expression}quasis\`
			var pending_a
			pending_a\`quasis\${expression}quasis\`
			`,
			parserOptions: { ecmaVersion: "latest" }
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
					...error,
					line: 3,
					column: 10
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 10
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
					...error,
					line: 3,
					column: 5
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 5
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
					...error,
					line: 3,
					column: 6
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 4
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
					...error,
					line: 2,
					column: 8
				},
				{
					...error,
					line: 3,
					column: 21
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 21
				},
				{
					...error,
					line: 7,
					column: 15
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
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					...error,
					line: 3,
					column: 11
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 11
				}
			],
			output: `
			while (deferA) {}
			while (pending_a) {}
			var pending_a
			while (pending_a) {}
			`
		},
		// WithStatement
		{
			code: `
			with (deferA) {}
			with (pendingA) {}
			var pendingA
			with (pendingA) {}
			`,
			errors: [
				{
					...error,
					line: 3,
					column: 10
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 10
				}
			],
			output: `
			with (deferA) {}
			with (pending_a) {}
			var pending_a
			with (pending_a) {}
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
					...error,
					line: 3,
					column: 31
				},
				{
					...error,
					line: 4,
					column: 8
				},
				{
					...error,
					line: 5,
					column: 31
				}
			],
			output: `
			function* func_a() { yield deferA }
			function* func_b() { yield pending_a }
			var pending_a
			function* func_c() { yield pending_a }
			`,
			parserOptions: { ecmaVersion: "latest" }
		},
	)
}