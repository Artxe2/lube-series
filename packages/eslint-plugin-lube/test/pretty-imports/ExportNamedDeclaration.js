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
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		{
			code: `
			var a, b, c
			export { a, b, c };
			`,
			options: [ { semicolon: true } ],
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
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
					messageId: "exports",
					type: "ExportNamedDeclaration",
					line: 3,
					column: 4
				},
				{
					messageId: "exports",
					type: "ExportNamedDeclaration",
					line: 4,
					column: 7
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
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		},
		{
			code: `

			export { a, b as c, d } from 'module'  ;
		    export { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
			`,
			errors: [
				{
					messageId: "exports",
					type: "ExportNamedDeclaration",
					line: 3,
					column: 4
				},
				{
					messageId: "exports",
					type: "ExportNamedDeclaration",
					line: 4,
					column: 7
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
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
			}
		}
	)
}