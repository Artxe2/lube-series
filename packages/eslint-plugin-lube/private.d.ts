import * as eslint from "eslint"
import * as estree from "estree"

export type AstNode = BaseAstNode & (
	{
		elements: AstNode[]
	} & estree.ArrayExpression
	| {
		elements: AstNode[]
	} & estree.ArrayPattern
	| {
		body: AstNode
		params: AstNode[]
	} & estree.ArrowFunctionExpression
	| {
		left: AstNode
		right: AstNode
	} & estree.AssignmentExpression
	| estree.AssignmentPattern
	| estree.AwaitExpression
	| estree.BinaryExpression
	| estree.BlockStatement
	| estree.BreakStatement
	| {
		callee: AstNode
		arguments: AstNode[]
	} & estree.CallExpression
	| estree.CatchClause
	| estree.ChainExpression
	| estree.ClassBody
	| estree.ClassDeclaration
	| estree.ClassExpression
	| estree.ConditionalExpression
	| estree.ContinueStatement
	| estree.DebuggerStatement
	| estree.DoWhileStatement
	| estree.EmptyStatement
	| estree.ExportAllDeclaration
	| estree.ExportDefaultDeclaration
	| {
		source?: {
			range: [number, number]
			raw: string
			value: string
		} & estree.SimpleLiteral
		specifiers: AstNode[]
	} & estree.ExportNamedDeclaration
	| estree.ExportSpecifier
	| estree.ExpressionStatement
	| estree.ForInStatement
	| estree.ForOfStatement
	| estree.ForStatement
	| {
		body: AstNode
		id: AstNode
		params: AstNode[]
	} & estree.FunctionDeclaration
	| {
		body: AstNode
		id?: AstNode
		params: AstNode[]
	} & estree.FunctionExpression
	| estree.Identifier
	| estree.IfStatement
	| {
		source: {
			range: [number, number]
			raw: string
			value: string
		} & estree.SimpleLiteral
		specifiers: AstNode[]
	} & estree.ImportDeclaration
	| estree.ImportDefaultSpecifier
	| estree.ImportExpression
	| estree.ImportNamespaceSpecifier
	| estree.ImportSpecifier
	| estree.LabeledStatement
	| estree.Literal
	| estree.LogicalExpression
	| estree.MemberExpression
	| estree.MetaProperty
	| estree.MethodDefinition
	| {
		callee: AstNode
		arguments: AstNode[]
	} & estree.NewExpression
	| {
		properties: AstNode[]
	} & estree.ObjectExpression
	| {
		properties: AstNode[]
	} & estree.ObjectPattern
	| estree.PrivateIdentifier
	| estree.Program
	| {
		key: AstNode & (
			estree.Identifier
			| estree.Literal
		)
		value: AstNode
	} & estree.Property
	| estree.PropertyDefinition
	| estree.RestElement
	| estree.ReturnStatement
	| {
		expressions: AstNode[]
	} & estree.SequenceExpression
	| {
		argument: AstNode
	} & estree.SpreadElement
	| estree.StaticBlock
	| estree.Super
	| estree.SwitchCase
	| estree.SwitchStatement
	| estree.TaggedTemplateExpression
	| estree.TemplateElement
	| estree.TemplateLiteral
	| estree.ThisExpression
	| estree.ThrowStatement
	| estree.TryStatement
	| estree.UnaryExpression
	| estree.UpdateExpression
	| estree.VariableDeclaration
	| {
		id: AstNode
		init: AstNode
	} & estree.VariableDeclarator
	| estree.WhileStatement
	| estree.WithStatement
	| estree.YieldExpression
)

export type BaseAstNode = {
	parent: AstNode
	range: [number, number]
}

export type Comment = BaseAstNode & estree.Comment

export type RuleListener = {
	[K in keyof eslint.Rule.NodeListener]: (node: import("../private").AstNode) => void
}

export type RuleOptions = {
	"pretty-imports"?: {
		checkExports?: boolean
		checkImports?: boolean
		indent?: string
		maxLength?: number
		semicolon?: boolean
	}
	"pretty-jsdoc-casting": never
	"pretty-sequence"?: {
		arrayBracketSpacing?: boolean
		checkArray?: boolean
		checkCall?: boolean
		checkObject?: boolean
		checkSequence?: boolean
		funcCallSpacing?: boolean
		ignoreTemplateLiteral?: boolean
		indent?: string
		maxLength?: number
		objectCurlySpacing?: boolean
	}
	"svelte-naming-convention"?: {
		fixSameNames?: boolean
	}
}