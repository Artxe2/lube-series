/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid 
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	valid.push(
		{ code: "var _ = 'Hello'" },
		{ code: "var __ = 'Hello'" },
		{ code: "var _snake_case = 'Hello'" },
		{ code: "var $ = 'Hello'" },
		{ code: "var $$ = 'Hello'" },
		{ code: "var $snake_case$ = 'Hello'" },
		{ code: "var __snake_case$$ = 'Hello'" },
		{ code: "var $$snake_case$$ = 'Hello'" },
	)
	invalid.push(
		{
			code: "var __camelCase$$ = 'Hello'",
			errors: [{
				line: 1,
				column: 5
			}],
			output: "var __camel_case$$ = 'Hello'"
		},
		{
			code: "var ___ = 'Hello'",
			errors: [{
				line: 1,
				column: 5
			}],
			output: "var ___ = 'Hello'"
		},
		{
			code: "var $$$ = 'Hello'",
			errors: [{
				line: 1,
				column: 5
			}],
			output: "var $$$ = 'Hello'"
		},
		{
			code: "var $snake$case$ = 'Hello'",
			errors: [{
				line: 1,
				column: 5
			}],
			output: "var $snake$case$ = 'Hello'"
		},
	)
}