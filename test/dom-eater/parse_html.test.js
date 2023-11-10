import { AstSyntaxError, parseHtml } from "dom-eater"
import { assert, describe, it } from "vitest"

describe(
	"parse_html",
	() => {

		it(
			"self-closing",
			() => {
				let ast = parseHtml(
					`
<area>
<base>
<br>
<col>
<embed>
<hr>
<img>
<input>
<link>
<meta>
<param>
<source>
<track>
<wbr>
<!DOCTYPE text>
<a>
`,
					true
				)
				assert.deepStrictEqual(
					JSON.parse(
						JSON.stringify(
							ast.ast,
							[ "subType", "text", "type" ]
						)
					),
					[
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<area>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<base>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<br>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<col>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<embed>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<hr>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<img>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<input>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<link>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<meta>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<param>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<source>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<track>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<wbr>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<!DOCTYPE text>",
							type: "Element"
						},
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<a>",
							type: "Element"
						},
						{ text: "\n", type: "Text" }
					]
				)
				assert.deepStrictEqual(
					ast.errors,
					[
						AstSyntaxError(
							"The \"a\" Element is not closed.",
							0,
							0
						)
					]
				)
			}
		)// self-closing

		it(
			"script element",
			() => {
				let ast = parseHtml(
					`
<script>
import { Component } from "module"
let single = 'single'
let double = "double"
function func() {
	var str = \`str \${1 == 1 ? "true" + single : 'false' + double}\`
}
func()
</script>
<style>
</style>
<div>
</div>
`,
					true
				)
				assert.deepStrictEqual(
					JSON.parse(
						JSON.stringify(
							ast.ast,
							[
								"children",
								"scripts",
								"strings",
								"subType",
								"text",
								"type"
							]
						)
					),
					[
						{ "text": "\n", "type": "Text" },
						{
							"children": [
								{
									"strings": [
										{
											"scripts": [],
											"subType": "double",
											"text": "\"module\"",
											"type": "String"
										},
										{
											"scripts": [],
											"subType": "single",
											"text": "'single'",
											"type": "String"
										},
										{
											"scripts": [],
											"subType": "double",
											"text": "\"double\"",
											"type": "String"
										},
										{
											"scripts": [
												{
													"strings": [
														{
															"scripts": [],
															"subType": "double",
															"text": "\"true\"",
															"type": "String"
														},
														{
															"scripts": [],
															"subType": "single",
															"text": "'false'",
															"type": "String"
														}
													],
													"subType": "template",
													"text": "${1 == 1 ? \"true\" + single : 'false' + double}",
													"type": "Script"
												}
											],
											"subType": "backtick",
											"text": "`str ${1 == 1 ? \"true\" + single : 'false' + double}`",
											"type": "String"
										}
									],
									"subType": "content",
									"text": "\nimport { Component } from \"module\"\nlet single = 'single'\nlet double = \"double\"\nfunction func() {\n\tvar str = `str ${1 == 1 ? \"true\" + single : 'false' + double}`\n}\nfunc()\n",
									"type": "Script"
								}
							],
							"subType": "open",
							"text": "<script>\nimport { Component } from \"module\"\nlet single = 'single'\nlet double = \"double\"\nfunction func() {\n\tvar str = `str ${1 == 1 ? \"true\" + single : 'false' + double}`\n}\nfunc()\n</script>",
							"type": "Element"
						},
						{ "text": "\n", "type": "Text" },
						{
							"children": [
								{ "text": "\n", "type": "Style" }
							],
							"subType": "open",
							"text": "<style>\n</style>",
							"type": "Element"
						},
						{ "text": "\n", "type": "Text" },
						{
							"children": [
								{ "text": "\n", "type": "Text" }
							],
							"subType": "open",
							"text": "<div>\n</div>",
							"type": "Element"
						},
						{ "text": "\n", "type": "Text" }
					]
				)
				assert.deepStrictEqual(ast.errors, [])
			}
		)//script element

		it(
			"style element",
			() => {
				let ast = parseHtml(
					`
<script>
</script>
<style>
	.header { color: red; }
	[class] main:after { background: blue; }
</style>
<div>
</div>
`,
					true
				)
				assert.deepStrictEqual(
					JSON.parse(
						JSON.stringify(
							ast.ast,
							[
								"children",
								"subType",
								"text",
								"type"
							]
						)
					),
					[
						{ "text": "\n", "type": "Text" },
						{
							"children": [
								{
									"subType": "content",
									"text": "\n",
									"type": "Script"
								}
							],
							"subType": "open",
							"text": "<script>\n</script>",
							"type": "Element"
						},
						{ "text": "\n", "type": "Text" },
						{
							"children": [
								{
									"text": "\n\t.header { color: red; }\n\t[class] main:after { background: blue; }\n",
									"type": "Style"
								}
							],
							"subType": "open",
							"text": "<style>\n\t.header { color: red; }\n\t[class] main:after { background: blue; }\n</style>",
							"type": "Element"
						},
						{ "text": "\n", "type": "Text" },
						{
							"children": [
								{ "text": "\n", "type": "Text" }
							],
							"subType": "open",
							"text": "<div>\n</div>",
							"type": "Element"
						},
						{ "text": "\n", "type": "Text" }
					]
				)
				assert.deepStrictEqual(ast.errors, [])
			}
		)// style element

		it(
			"attributes and children",
			() => {
				let ast = parseHtml(
					`
<div {var} script =  {"double"}{\`\${'single'}\`} flag string="{true ?? "true"}">
<span>text</span>
{func()}
</div>
`,
					true
				)
				assert.deepStrictEqual(
					JSON.parse(
						JSON.stringify(
							ast.ast,
							[
								"attributes",
								"children",
								"scripts",
								"strings",
								"subType",
								"text",
								"type",
								"value"
							]
						)
					),
					[
						{ "text": "\n", "type": "Text" },
						{
							"attributes": [
								{
									"text": "{var}",
									"type": "Attribute",
									"value": {
										"strings": [],
										"subType": "block",
										"text": "{var}",
										"type": "Script"
									}
								},
								{
									"text": "script =  {\"double\"}",
									"type": "Attribute",
									"value": {
										"strings": [
											{
												"scripts": [],
												"subType": "double",
												"text": "\"double\"",
												"type": "String"
											}
										],
										"subType": "block",
										"text": "{\"double\"}",
										"type": "Script"
									}
								},
								{
									"text": "{`${'single'}`}",
									"type": "Attribute",
									"value": {
										"strings": [
											{
												"scripts": [
													{
														"strings": [
															{
																"scripts": [],
																"subType": "single",
																"text": "'single'",
																"type": "String"
															}
														],
														"subType": "template",
														"text": "${'single'}",
														"type": "Script"
													}
												],
												"subType": "backtick",
												"text": "`${'single'}`",
												"type": "String"
											}
										],
										"subType": "block",
										"text": "{`${'single'}`}",
										"type": "Script"
									}
								},
								{
									"text": "flag",
									"type": "Attribute",
									"value": true
								},
								{
									"text": "string=\"{true ?? \"true\"}\"",
									"type": "Attribute",
									"value": {
										"scripts": [
											{
												"strings": [
													{
														"scripts": [],
														"subType": "double",
														"text": "\"true\"",
														"type": "String"
													}
												],
												"subType": "block",
												"text": "{true ?? \"true\"}",
												"type": "Script"
											}
										],
										"subType": "double",
										"text": "\"{true ?? \"true\"}\"",
										"type": "String"
									}
								}
							],
							"children": [
								{ "text": "\n", "type": "Text" },
								{
									"attributes": [],
									"children": [
										{ "text": "text", "type": "Text" }
									],
									"subType": "open",
									"text": "<span>text</span>",
									"type": "Element"
								},
								{ "text": "\n", "type": "Text" },
								{
									"strings": [],
									"subType": "block",
									"text": "{func()}",
									"type": "Script"
								},
								{ "text": "\n", "type": "Text" }
							],
							"subType": "open",
							"text": "<div {var} script =  {\"double\"}{`${'single'}`} flag string=\"{true ?? \"true\"}\">\n<span>text</span>\n{func()}\n</div>",
							"type": "Element"
						},
						{ "text": "\n", "type": "Text" }
					]
				)
				assert.deepStrictEqual(ast.errors, [])
			}
		)// attributes and children

		it(
			"attribute error",
			() => {
				let ast = parseHtml(
					`
<a {></a>
`,
					true
				)
				assert.deepStrictEqual(
					JSON.parse(
						JSON.stringify(
							ast.ast,
							[ "subType", "text", "type" ]
						)
					),
					[
						{ text: "\n", type: "Text" },
						{
							subType: "open",
							text: "<a {></a>\n",
							type: "Element"
						}
					]
				)
				assert.deepStrictEqual(
					ast.errors,
					[
						AstSyntaxError(
							"parse_script_block is incomplete.",
							0,
							0
						),
						AstSyntaxError(
							"parse_element is incomplete.",
							0,
							0
						),
						AstSyntaxError(
							"The \"a\" Element is not closed.",
							0,
							0
						)
					]
				)
			}
		)// attribute error

	}
)