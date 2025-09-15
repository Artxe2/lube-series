/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	valid.push(
		{
			code: `
			var value = {
				aaaaaaaaaa_aaaaaaaaaa_aaaaaaaaaa
			}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: "func(a, /* a */(b)/* b */)"
		},
		{
			code: `
			var value = {
				// aaa
				a,
				b,
				c
			}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: "func(v => f(a, b, c))",
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			func(
				aaaaaaaaaa_bbbbbbbbbb_cccccccccc
			)
				.a(
					aaaaaaaaaa_bbbbbbbbbb_cccccccccc
				)
				.b(
					aaaaaaaaaa_bbbbbbbbbb_cccccccccc
				)
				.c(
					aaaaaaaaaa_bbbbbbbbbb_cccccccccc
				)
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			export default function(abc) {
				return [ abc, abc ]
			}
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		}
	)
	invalid.push(
		{
			code: `
			var value = {
				a: [a,b,c],
				b: true,
				c: {
					aaaaaaaaaa: a, bbbbbbbbbb: b, c: [ aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc ],
					d: { aaaaaaaaaa, bbbbbbbbbbb, ccccccccccc }
				}
			}
			`,
			errors: [
				{
					column: 9,
					line: 3,
					messageId: "not_match",
					type: "ArrayExpression"
				},
				{
					column: 9,
					line: 5,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 40,
					line: 6,
					messageId: "not_match",
					type: "ArrayExpression"
				},
				{
					column: 10,
					line: 7,
					messageId: "not_match",
					type: "ObjectExpression"
				}
			],
			output: `
			var value = {
				a: [ a, b, c ],
				b: true,
				c: {
					aaaaaaaaaa: a,
					bbbbbbbbbb: b,
					c: [
						aaaaaaaaaa,
						bbbbbbbbbbb,
						ccccccccccc
					],
					d: {
						aaaaaaaaaa,
						bbbbbbbbbbb,
						ccccccccccc
					}
				}
			}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var value = {a:{b:{c:{d:{e:{f:{g:gggggggggg_gggggggggg_gggggggggg}}}}}}}
			`,
			errors: [
				{
					column: 17,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 20,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 23,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 26,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 29,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 32,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				},
				{
					column: 35,
					line: 2,
					messageId: "not_match",
					type: "ObjectExpression"
				}
			],
			output: `
			var value = {
				a:{
					b:{
						c:{
							d:{
								e:{
									f:{
										g:gggggggggg_gggggggggg_gggggggggg
									}
								}
							}
						}
					}
				}
			}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		}
	)
}