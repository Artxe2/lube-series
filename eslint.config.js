/*
VSCE: ESLint
VSCE: Sort JS object keys
VSCE: JavaScript and TypeScript Nightly
*/

import globals from "globals"
import lube from "eslint-plugin-lube"
import parser from "@typescript-eslint/parser"


export default [
	{
		...lube.configs,
		files: [
			"**/*.js",
			"**/*.svelte",
			"**/*.ts"
		],
		ignores: [ "coverage/**/*" ],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser,
			globals: {
				...globals.node,
				RequestInit: true
			}
		}
	},
	{
		files: [ "**/*.d.ts" ],
		rules: { "no-unused-vars": "off" }
	}
]