/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	invalid.push(
		{
			code: `
			var value = [a, b, c]
			var value = [ aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc ]
			var value = []
			`,
			errors: [
				{
					column: 17,
					line: 2,
					messageId: "not_match",
					type: "ArrayExpression"
				},
				{
					column: 17,
					line: 3,
					messageId: "not_match",
					type: "ArrayExpression"
				}
			],
			output: `
			var value = [ a, b, c ]
			var value = [
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			]
			var value = []
			`
		},
		{
			code: `
			var [a, b, c] = value
			var [ aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc ] = value
			var [] = value
			`,
			errors: [
				{
					column: 9,
					line: 2,
					messageId: "not_match",
					type: "ArrayPattern"
				},
				{
					column: 9,
					line: 3,
					messageId: "not_match",
					type: "ArrayPattern"
				}
			],
			output: `
			var [ a, b, c ] = value
			var [
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			] = value
			var [] = value
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var value = ( a, b, c ) => {
				//
			}
			var value = (aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc) => {
				//
			}
			var value = () => {}
			var value = a => b
			var value = async a => b
			var value = async (a, b, c) => {}
			`,
			errors: [
				{
					column: 17,
					line: 2,
					messageId: "not_match",
					type: "ArrowFunctionExpression"
				},
				{
					column: 17,
					line: 5,
					messageId: "not_match",
					type: "ArrowFunctionExpression"
				}
			],
			output: `
			var value = (a, b, c) => {
				//
			}
			var value = (
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			) => {
				//
			}
			var value = () => {}
			var value = a => b
			var value = async a => b
			var value = async (a, b, c) => {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			function func( a, b, c ) {
				//
			}
			function func2(aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc) {
				//
			}
			function func3() {}
			async function func4() {}
			`,
			errors: [
				{
					column: 18,
					line: 2,
					messageId: "not_match",
					type: "FunctionDeclaration"
				},
				{
					column: 19,
					line: 5,
					messageId: "not_match",
					type: "FunctionDeclaration"
				}
			],
			output: `
			function func(a, b, c) {
				//
			}
			function func2(
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			) {
				//
			}
			function func3() {}
			async function func4() {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var value = function ( a, b, c ) {
				//
			}
			var value = function (aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc) {
				//
			}
			var value = function () {}
			var value = async function () {}
			`,
			errors: [
				{
					column: 26,
					line: 2,
					messageId: "not_match",
					type: "FunctionExpression"
				},
				{
					column: 26,
					line: 5,
					messageId: "not_match",
					type: "FunctionExpression"
				}
			],
			output: `
			var value = function (a, b, c) {
				//
			}
			var value = function (
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			) {
				//
			}
			var value = function () {}
			var value = async function () {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			func( a, b, c )
			func(aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc)
			func()
			`,
			errors: [
				{
					column: 9,
					line: 2,
					messageId: "not_match",
					type: "CallExpression"
				},
				{
					column: 9,
					line: 3,
					messageId: "not_match",
					type: "CallExpression"
				}
			],
			output: `
			func(a, b, c)
			func(
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			)
			func()
			`
		},
		{
			code: `
			new A( a, b, c )
			new A(aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc)
			new A()
			`,
			errors: [
				{
					column: 10,
					line: 2,
					messageId: "not_match",
					type: "NewExpression"
				},
				{
					column: 10,
					line: 3,
					messageId: "not_match",
					type: "NewExpression"
				}
			],
			output: `
			new A(a, b, c)
			new A(
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			)
			new A()
			`
		},
		{
			code: `
			var value = {a, b, c}
			var value = { aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc }
			var value = {}
			`,
			errors: [
				{
					column: 17,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 17,
					line: 3,
					messageId: "not_match",
					type: "ObjectExpression"
				}
			],
			output: `
			var value = { a, b, c }
			var value = {
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			}
			var value = {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var {a, b, c} = value
			var { aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc } = value
			var {} = value
			`,
			errors: [
				{
					column: 9,
					line: 2,
					messageId: "not_match",
					type: "ObjectPattern"
				},
				{
					column: 9,
					line: 3,
					messageId: "not_match",
					type: "ObjectPattern"
				}
			],
			output: `
			var { a, b, c } = value
			var {
				aaaaaaaaaa,
				bbbbbbbbbbb,
				ccccccccccc
			} = value
			var {} = value
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			a,
			b,
			c

			aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc
			`,
			errors: [
				{
					column: 4,
					line: 2,
					messageId: "not_match",
					type: "SequenceExpression"
				},
				{
					column: 4,
					line: 6,
					messageId: "not_match",
					type: "SequenceExpression"
				}
			],
			output: `
			a, b, c

			aaaaaaaaaa,
			bbbbbbbbbbb,
			ccccccccccc
			`
		}
	)
}