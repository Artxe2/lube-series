/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	valid.push(
		{ code: "var s = 'Hello'" },
		{
			code: "var snake_case = 'Hello'"
		},
		{
			code: "var snake_case_123 = 'Hello'"
		},
		{
			code: "var snake1_2_3case_4 = 'Hello'"
		},
		{
			code: "var SNAKE_CASE = 'Hello'"
		},
		{
			code: "var SNAKE1_2_3CASE_4 = 'Hello'"
		},
		{ code: "camelCase = 'Hello'" },
		{
			code: "var snake_case = camelCase"
		},
		{
			code: "var PascalCase = 'Hello'"
		},
		{
			code: "var P1ascal2Case345 = 'Hello'"
		}
	)
	invalid.push(
		{
			code: "var camelCase = 'Hello'",
			errors: [
				{
					column: 5,
					line: 1,
					messageId: "not_match"
				}
			],
			output: "var camel_case = 'Hello'"
		},
		{
			code: "var NO_SNAKE__CASE = 'Hello'",
			errors: [
				{
					column: 5,
					line: 1,
					messageId: "not_match"
				}
			]
		},
		{
			code: "var NO_SNAKE_CASE_ = 'Hello'",
			errors: [
				{
					column: 5,
					line: 1,
					messageId: "not_match"
				}
			]
		}
	)
}