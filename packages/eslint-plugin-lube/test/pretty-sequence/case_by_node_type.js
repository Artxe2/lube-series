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
					line: 2,
					column: 17,
					type: "ArrayExpression"
				},
				{
					line: 3,
					column: 17,
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
					line: 2,
					column: 9,
					type: "ArrayPattern"
				},
				{
					line: 3,
					column: 9,
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
					line: 2,
					column: 17,
					type: "ArrowFunctionExpression"
				},
				{
					line: 5,
					column: 17,
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
			function func() {}
			async function func() {}
			`,
			errors: [
				{
					line: 2,
					column: 18,
					type: "FunctionDeclaration"
				},
				{
					line: 5,
					column: 19,
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
			function func() {}
			async function func() {}
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
					line: 2,
					column: 26,
					type: "FunctionExpression"
				},
				{
					line: 5,
					column: 26,
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
					line: 2,
					column: 9,
					type: "CallExpression"
				},
				{
					line: 3,
					column: 9,
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
					line: 2,
					column: 10,
					type: "NewExpression"
				},
				{
					line: 3,
					column: 10,
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
					line: 2,
					column: 17,
					type: "ObjectExpression"
				},
				{
					line: 3,
					column: 17,
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
					line: 2,
					column: 9,
					type: "ObjectPattern"
				},
				{
					line: 3,
					column: 9,
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
					line: 2,
					column: 4,
					type: "SequenceExpression"
				},
				{
					line: 6,
					column: 4,
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