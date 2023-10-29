import type ast_syntax_error from "./src/parse_dom/src/AstSyntaxError.js"

export type AstNode =
	Attribute
	| Element
	| Script
	| String
	| Style
	| Text

export type AstSyntaxError = ReturnType<typeof ast_syntax_error>

export type Attribute = {
	type: "Attribute"
	name: string
	value: (
		true
		| Script & { subType: "block" | "jsx" }
		| String & { subType: "single" | "double" }
	)
} & BaseAstNode

type BaseAstNode = {
	end: number
	start: number
	text?: string
}

export type Element = {
	attributes: Attribute[]
	children: AstNode[]
	name: string
	subType: "close" | "closed" | "open"
	type: "Element"
} & BaseAstNode

export type Script = (
	{
		strings: String[]
		subType: "block" | "content" | "template"
		type: "Script"
	}
	| {
		strings: String[]
		elements: Element[]
		subType: "jsx"
		type: "Script"
	}
) & BaseAstNode

export type String = {
	scripts: Script[]
	subType: "backtick" | "double" | "single"
	type: "String"
} & BaseAstNode

export type Style = {
	type: "Style"
} & BaseAstNode

export type Text = {
	type: "Text"
} & BaseAstNode