/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	valid.push(
		{
			code: `
			var value = [a,b,c]
			var value = (a,b,c) => {}
			var value = {a,b,c}
			a,b,c
			`,
			options: [
				{
					checkCall: false,
					checkArray: false,
					checkObject: false,
					checkSequence: false
				}
			],
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var value = {
			    aaaaaaaaaa_aaaaaaaaaa_aaaaaaaaaa
			}
			`,
			options: [ { indent: "    " } ],
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var value = { aaaaaaaaaa_aaaaaaaaaa_aaaaaaaaaa }
			`,
			options: [ { maxLength: 40 } ],
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		}
	)
	invalid.push(
		{
			code: `
			var value = [a,b,c]
			`,
			errors: [ { messageId: "not_match" } ],
			options: [ { arrayBracketSpacing: true } ],
			output: `
			var value = [ a, b, c ]
			`
		},
		{
			code: `
			var value = [a,b,c]
			`,
			errors: [ { messageId: "not_match" } ],
			options: [ { arrayBracketSpacing: false } ],
			output: `
			var value = [a, b, c]
			`
		}
	)
	invalid.push(
		{
			code: `
			var value = (a,b,c) => {}
			`,
			errors: [ { messageId: "not_match" } ],
			options: [ { funcCallSpacing: true } ],
			output: `
			var value = ( a, b, c ) => {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var value = (a,b,c) => {}
			`,
			errors: [ { messageId: "not_match" } ],
			options: [ { funcCallSpacing: false } ],
			output: `
			var value = (a, b, c) => {}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		}
	)
	invalid.push(
		{
			code: `
			var value = {a,b,c}
			`,
			errors: [ { messageId: "not_match" } ],
			options: [ { objectCurlySpacing: true } ],
			output: `
			var value = { a, b, c }
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		},
		{
			code: `
			var value = {a,b,c}
			`,
			errors: [ { messageId: "not_match" } ],
			options: [ { objectCurlySpacing: false } ],
			output: `
			var value = {a, b, c}
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		}
	)
	invalid.push(
		{
			code: `
			var value = \`\${[a,b,c]}\`
			`,
			errors: [ { messageId: "not_match" } ],
			options: [
				{ ignoreTemplateLiteral: false }
			],
			output: `
			var value = \`\${[ a, b, c ]}\`
			`,
			languageOptions: {
				parserOptions: { ecmaVersion: "latest" }
			}
		}
	)
}