import { parseJsx } from "dom-eater"
import { assert, describe, it } from "vitest"

describe(
	"parse_jsx",
	() => {

		it(
			"example",
			() => {
				const ast = parseJsx(
					`
var n = 5
const a = <a>{n}</a>
const text = "<div></div>"
const props = {}

export function App() {
	const is_active = false
	return (
		<div {...props} style="color: red; background: blue;"
			className={\`:hover/c=--primary-50;bold
			c=red bg=blue
			@dark@c=white
			:active/tf=scale(1.2)
			\${is_active ?? "bold;fs=1.2"}\`}>
			{a}
			{text}
		</div>
	)
}
`,
					true
				)
				assert.deepStrictEqual(
					ast.ast,
					[
						{
							"attributes": [],
							"children": [
								{
									"elements": [],
									"end": 27,
									"start": 24,
									"strings": [],
									"subType": "jsx",
									"type": "Script",
									"text": "{n}"
								}
							],
							"end": 31,
							"name": "a",
							"start": 21,
							"subType": "open",
							"type": "Element",
							"text": "<a>{n}</a>"
						},
						{
							"attributes": [
								{
									"end": 153,
									"name": "",
									"start": 143,
									"type": "Attribute",
									"value": {
										"elements": [],
										"end": 153,
										"start": 143,
										"strings": [],
										"subType": "jsx",
										"type": "Script",
										"text": "{...props}"
									},
									"text": "{...props}"
								},
								{
									"end": 191,
									"name": "style",
									"start": 154,
									"type": "Attribute",
									"value": {
										"end": 191,
										"scripts": [],
										"start": 160,
										"subType": "double",
										"type": "String",
										"text": "\"color: red; background: blue;\""
									},
									"text": "style=\"color: red; background: blue;\""
								},
								{
									"end": 327,
									"name": "className",
									"start": 195,
									"type": "Attribute",
									"value": {
										"elements": [],
										"end": 327,
										"start": 205,
										"strings": [
											{
												"end": 326,
												"scripts": [
													{
														"end": 325,
														"start": 296,
														"strings": [
															{
																"end": 324,
																"scripts": [],
																"start": 311,
																"subType": "double",
																"type": "String",
																"text": "\"bold;fs=1.2\""
															}
														],
														"subType": "template",
														"type": "Script",
														"text": "${is_active ?? \"bold;fs=1.2\"}"
													}
												],
												"start": 206,
												"subType": "backtick",
												"type": "String",
												"text": "`:hover/c=--primary-50;bold\n\t\t\tc=red bg=blue\n\t\t\t@dark@c=white\n\t\t\t:active/tf=scale(1.2)\n\t\t\t${is_active ?? \"bold;fs=1.2\"}`"
											}
										],
										"subType": "jsx",
										"type": "Script",
										"text": "{`:hover/c=--primary-50;bold\n\t\t\tc=red bg=blue\n\t\t\t@dark@c=white\n\t\t\t:active/tf=scale(1.2)\n\t\t\t${is_active ?? \"bold;fs=1.2\"}`}"
									},
									"text": "className={`:hover/c=--primary-50;bold\n\t\t\tc=red bg=blue\n\t\t\t@dark@c=white\n\t\t\t:active/tf=scale(1.2)\n\t\t\t${is_active ?? \"bold;fs=1.2\"}`}"
								}
							],
							"children": [
								{
									"end": 332,
									"start": 328,
									"type": "Text",
									"text": "\n\t\t\t"
								},
								{
									"elements": [],
									"end": 335,
									"start": 332,
									"strings": [],
									"subType": "jsx",
									"type": "Script",
									"text": "{a}"
								},
								{
									"end": 339,
									"start": 335,
									"type": "Text",
									"text": "\n\t\t\t"
								},
								{
									"elements": [],
									"end": 345,
									"start": 339,
									"strings": [],
									"subType": "jsx",
									"type": "Script",
									"text": "{text}"
								},
								{
									"end": 348,
									"start": 345,
									"type": "Text",
									"text": "\n\t\t"
								}
							],
							"end": 354,
							"name": "div",
							"start": 138,
							"subType": "open",
							"type": "Element",
							"text": "<div {...props} style=\"color: red; background: blue;\"\n\t\t\tclassName={`:hover/c=--primary-50;bold\n\t\t\tc=red bg=blue\n\t\t\t@dark@c=white\n\t\t\t:active/tf=scale(1.2)\n\t\t\t${is_active ?? \"bold;fs=1.2\"}`}>\n\t\t\t{a}\n\t\t\t{text}\n\t\t</div>"
						}
					]
				)
				assert.deepStrictEqual(ast.errors, [])
			}
		)// example

	}
)