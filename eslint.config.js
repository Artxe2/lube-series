import globals from "globals"
import lube from "eslint-plugin-lube"
import parser from "@typescript-eslint/parser"

export default [
	{
		ignores: [
			"coverage/**/*",
			"packages/*/types/**/*.d.ts"
		]
	},
	{
		...lube.configs,
		files: [
			"**/*.js",
			"**/*.svelte",
			"**/*.ts"
		],
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