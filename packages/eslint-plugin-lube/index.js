/**
 * @type {import("eslint").ESLint.Plugin & {
 *   configs: Record<string, import("eslint").ESLint.ConfigData|{}>
 * }}
 */
module.exports = {
	configs: {
		recommended: {
			extends: ["eslint:recommended"],
			plugins: ["lube"],
			rules: {
				"arrow-spacing": "error",
				"comma-spacing": "error",
				"dot-location": ["error", "property"],
				"for-direction": "error",
				"getter-return": "error",
				"indent": ["error", "tab"],
				"keyword-spacing": ["error", {
					"after": true,
					"before": true
				}],
				"max-len": ["warn", 120],
				"max-nested-callbacks": ["error", 3],
				"no-console": "warn",
				"no-duplicate-imports": "error",
				"no-empty-pattern": "error",
				"no-multi-spaces": "error",
				"object-curly-spacing": ["error", "always"],
				"prefer-const": "warn",
				"quotes": ["error", "double"],
				"semi": ["error", "never"],
				"semi-spacing": ["error", {
					"after": true,
					"before": false
				}],
				"space-before-function-paren": ["error", {
					"anonymous": "never",
					"asyncArrow": "always",
					"named": "never"
				}],
				"space-in-parens": ["error", "never"],
				"space-infix-ops": "error",
				"space-unary-ops": "error",
				"lube/pretty-imports": "error",
				"lube/pretty-jsdoc-casting": "error",
				"lube/svelte-naming-convention": "error",
			}
		}
	},
	rules: {
		"pretty-imports": require("./rules/pretty-imports"),
		"pretty-jsdoc-casting": require("./rules/pretty-jsdoc-casting"),
		"svelte-naming-convention": require("./rules/svelte-naming-convention")
	}
}