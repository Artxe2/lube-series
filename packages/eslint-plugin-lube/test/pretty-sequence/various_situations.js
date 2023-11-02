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
			parserOptions: { ecmaVersion: "latest" }
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
			parserOptions: { ecmaVersion: "latest" }
		},
		{
			code: "func(v => f(a, b, c))",
			parserOptions: { ecmaVersion: "latest" }
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
			parserOptions: { ecmaVersion: "latest" }
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
					type: "ArrayExpression"
				},
				{
					column: 9,
					line: 5,
					type: "ObjectExpression"
				},
				{
					column: 40,
					line: 6,
					type: "ArrayExpression"
				},
				{
					column: 10,
					line: 7,
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
			parserOptions: { ecmaVersion: "latest" }
		},
		{
			code: `
			var value = {a:{b:{c:{d:{e:{f:{g:gggggggggg_gggggggggg_gggggggggg}}}}}}}
			`,
			errors: [
				{
					column: 17,
					line: 2,
					type: "ObjectExpression"
				},
				{
					column: 20,
					line: 2,
					type: "ObjectExpression"
				},
				{
					column: 23,
					line: 2,
					type: "ObjectExpression"
				},
				{
					column: 26,
					line: 2,
					type: "ObjectExpression"
				},
				{
					column: 29,
					line: 2,
					type: "ObjectExpression"
				},
				{
					column: 32,
					line: 2,
					type: "ObjectExpression"
				},
				{
					column: 35,
					line: 2,
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
			parserOptions: { ecmaVersion: "latest" }
		}
	)
}