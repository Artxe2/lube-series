import { parseJsx } from "dom-eater"
import { assert, describe, it } from "vitest"

describe(
	"parse_jsx",
	() => {

		it(
			"example",
			() => {
				let ast = parseJsx(
					`
var n = 5
let a = <a>{n}</a>
let text = "<div></div>"
let props = {}

export function App() {
	let is_active = false
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
									"end": 25,
									"start": 22,
									"strings": [],
									"subType": "jsx",
									"type": "Script",
									"text": "{n}"
								}
							],
							"end": 29,
							"name": "a",
							"start": 19,
							"subType": "open",
							"type": "Element",
							"text": "<a>{n}</a>"
						},
						{
							"attributes": [
								{
									"end": 145,
									"name": "",
									"start": 135,
									"type": "Attribute",
									"value": {
										"elements": [],
										"end": 145,
										"start": 135,
										"strings": [],
										"subType": "jsx",
										"type": "Script",
										"text": "{...props}"
									},
									"text": "{...props}"
								},
								{
									"end": 183,
									"name": "style",
									"start": 146,
									"type": "Attribute",
									"value": {
										"end": 183,
										"scripts": [],
										"start": 152,
										"subType": "double",
										"type": "String",
										"text": "\"color: red; background: blue;\""
									},
									"text": "style=\"color: red; background: blue;\""
								},
								{
									"end": 319,
									"name": "className",
									"start": 187,
									"type": "Attribute",
									"value": {
										"elements": [],
										"end": 319,
										"start": 197,
										"strings": [
											{
												"end": 318,
												"scripts": [
													{
														"end": 317,
														"start": 288,
														"strings": [
															{
																"end": 316,
																"scripts": [],
																"start": 303,
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
												"start": 198,
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
									"end": 324,
									"start": 320,
									"type": "Text",
									"text": "\n\t\t\t"
								},
								{
									"elements": [],
									"end": 327,
									"start": 324,
									"strings": [],
									"subType": "jsx",
									"type": "Script",
									"text": "{a}"
								},
								{
									"end": 331,
									"start": 327,
									"type": "Text",
									"text": "\n\t\t\t"
								},
								{
									"elements": [],
									"end": 337,
									"start": 331,
									"strings": [],
									"subType": "jsx",
									"type": "Script",
									"text": "{text}"
								},
								{
									"end": 340,
									"start": 337,
									"type": "Text",
									"text": "\n\t\t"
								}
							],
							"end": 346,
							"name": "div",
							"start": 130,
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