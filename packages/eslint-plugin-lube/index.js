const plugin = {
	configs: { plugins: {}, rules: {} },
	meta: { name: "eslint-plugin-lube" },
	rules: {
		"pretty-imports": require("./rules/pretty-imports"),
		"pretty-jsdoc-casting": require("./rules/pretty-jsdoc-casting"),
		"pretty-sequence": require("./rules/pretty-sequence"),
		"svelte-naming-convention": require(
			"./rules/svelte-naming-convention"
		)
	}
}

Object.assign(
	plugin.configs,
	{
		plugins: { lube: plugin },
		rules: {
			"array-bracket-newline": [ "error", "consistent" ],
			"array-element-newline": [ "error", "consistent" ],
			"arrow-parens": [ "error", "as-needed" ],
			"arrow-spacing": [
				"error",
				{ "after": true, "before": true }
			],
			"block-spacing": [ "error", "always" ],
			"brace-style": [ "error", "1tbs" ],
			"comma-dangle": [ "error", "never" ],
			"comma-spacing": [
				"error",
				{ "after": true, "before": false }
			],
			"comma-style": [ "error", "last" ],
			"computed-property-spacing": [ "error", "never" ],
			"dot-location": [ "error", "property" ],
			"eol-last": [ "error", "never" ],
			"func-call-spacing": [ "error", "never" ],
			"function-call-argument-newline": [ "error", "consistent" ],
			"generator-star-spacing": [ "error", "after" ],
			"indent": [ "error", "tab" ],
			"jsx-quotes": [ "error", "prefer-double" ],
			"key-spacing": [
				"error",
				{
					"afterColon": true,
					"beforeColon": false
				}
			],
			"keyword-spacing": [
				"error",
				{ "after": true, "before": true }
			],
			"lube/pretty-imports": "error",
			"lube/pretty-jsdoc-casting": "error",
			"lube/pretty-sequence": "error",
			"lube/svelte-naming-convention": "error",
			"max-len": [ "warn", 120 ],
			"max-statements-per-line": [ "error", { "max": 1 } ],
			"multiline-ternary": [ "error", "always-multiline" ],
			"newline-per-chained-call": [
				"error",
				{ "ignoreChainWithDepth": 2 }
			],
			"no-await-in-loop": "warn",
			"no-case-declarations": "off",
			"no-console": "warn",
			"no-duplicate-imports": "error",
			"no-lonely-if": "error",
			"no-multi-spaces": "error",
			"no-new-native-nonconstructor": "error",
			"no-self-compare": "error",
			"no-shadow": "error",
			"no-shadow-restricted-names": "error",
			"no-trailing-spaces": [
				"error",
				{
					"ignoreComments": false,
					"skipBlankLines": false
				}
			],
			"object-curly-newline": [ "error", { "consistent": true } ],
			"object-curly-spacing": [ "error", "always" ],
			"one-var": [ "error", "never" ],
			"operator-linebreak": [ "error", "before" ],
			"prefer-const": [
				"warn",
				{
					"destructuring": "all",
					"ignoreReadBeforeAssign": false
				}
			],
			"quotes": [ "error", "double" ],
			"rest-spread-spacing": [ "error", "never" ],
			"semi": [ "error", "never" ],
			"semi-spacing": [
				"error",
				{ "after": true, "before": false }
			],
			"semi-style": [ "error", "first" ],
			"space-before-blocks": [ "error", "always" ],
			"space-before-function-paren": [
				"error",
				{
					"anonymous": "never",
					"asyncArrow": "always",
					"named": "never"
				}
			],
			"space-in-parens": [ "error", "never" ],
			"space-infix-ops": [ "error", { "int32Hint": true } ],
			"space-unary-ops": [
				"error",
				{ "nonwords": false, "words": true }
			],
			"switch-colon-spacing": [
				"error",
				{ "after": true, "before": false }
			],
			"template-curly-spacing": [ "error", "never" ],
			"template-tag-spacing": [ "error", "never" ],
			"yield-star-spacing": [ "error", "after" ]
		}
	}
)

module.exports = plugin