/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	valid.push(
		{
			code: `

			import { a, b as c, d } from 'module'
			import { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
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
import {
	aaaaa_bbbbb,
	aaaaa_ccccc,
	aaaaa_ddddd
} from "module";`,
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

			import { a, b as c, d } from 'module'
		    import { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "imports",
					type: "ImportDeclaration"
				},
				{
					column: 7,
					line: 4,
					messageId: "imports",
					type: "ImportDeclaration"
				}
			],
			options: [
				{ maxLength: 10, semicolon: true }
			],
			output: `

			import { a, b as c, d } from 'module';
		    import {
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

			import { a, b as c, d } from 'module'  ;
		    import { fff, ggg, hhh, iii, jjj, kkk, lll } from 'module/2'
			`,
			errors: [
				{
					column: 4,
					line: 3,
					messageId: "imports",
					type: "ImportDeclaration"
				},
				{
					column: 7,
					line: 4,
					messageId: "imports",
					type: "ImportDeclaration"
				}
			],
			options: [
				{ indent: "  ", maxLength: 10 }
			],
			output: `

			import { a, b as c, d } from 'module'
		    import {
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