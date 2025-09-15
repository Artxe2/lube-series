/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	valid.push(
		{
			code: `

			export { a, b as c, d } from 'module'
			export { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
			`,
			options: [ { maxLength: 30 } ],
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		},
		{
			code: `
			var a, b, c
			export { a, b, c };
			`,
			options: [ { semicolon: true } ],
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

			export { a, b as c, d } from 'module'
		    export { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "exports",
					type: "ExportNamedDeclaration"
				},
				{
					column: 7,
					line: 4,
					messageId: "exports",
					type: "ExportNamedDeclaration"
				}
			],
			options: [
				{ maxLength: 10, semicolon: true }
			],
			output: `

			export { a, b as c, d } from 'module';
		    export {
		    	fff,
		    	ggg,
		    	hhh,
		    	iii,
		    	jjj,
		    	kkk,
		    	lll
		    } from 'module/2';
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

			export { a, b as c, d } from 'module'  ;
		    export { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "exports",
					type: "ExportNamedDeclaration"
				},
				{
					column: 7,
					line: 4,
					messageId: "exports",
					type: "ExportNamedDeclaration"
				}
			],
			options: [
				{ indent: "  ", maxLength: 10 }
			],
			output: `

			export { a, b as c, d } from 'module'
		    export {
		      fff,
		      ggg,
		      hhh,
		      iii,
		      jjj,
		      kkk,
		      lll
		    } from 'module/2'
			`,
			languageOptions: {
				parserOptions: {
					ecmaVersion: "latest",
					sourceType: "module"
				}
			}
		}
	)
}