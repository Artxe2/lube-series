import * as estree from "estree"

export type BaseAstNode = {
	parent: AstNode
	range: [number, number]
}

export type AstNode = BaseAstNode & (
	estree.ArrayExpression & {
		elements: AstNode[]
	}
	| estree.ArrayPattern & {
		elements: AstNode[]
	}
	| estree.ArrowFunctionExpression & {
		body: AstNode
		params: AstNode[]
	}
	| estree.AssignmentExpression & {
		left: AstNode
		right: AstNode
	}
	| estree.AssignmentPattern
	| estree.AwaitExpression
	| estree.BinaryExpression
	| estree.BlockStatement
	| estree.BreakStatement
	| estree.CallExpression & {
		callee: AstNode
		arguments: AstNode[]
	}
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
	| estree.ExportNamedDeclaration & {
		source?: estree.SimpleLiteral & {
			range: [number, number]
			raw: string
			value: string
		}
		specifiers: AstNode[]
	}
	| estree.ExportSpecifier
	| estree.ExpressionStatement
	| estree.ForInStatement
	| estree.ForOfStatement
	| estree.ForStatement
	| estree.FunctionDeclaration & {
		body: AstNode
		params: AstNode[]
	}
	| estree.FunctionExpression & {
		body: AstNode
		params: AstNode[]
	}
	| estree.Identifier
	| estree.IfStatement
	| estree.ImportDeclaration & {
		source: estree.SimpleLiteral & {
			range: [number, number]
			raw: string
			value: string
		}
		specifiers: AstNode[]
	}
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
	| estree.NewExpression & {
		callee: AstNode
		arguments: AstNode[]
	}
	| estree.ObjectExpression & {
		properties: AstNode[]
	}
	| estree.ObjectPattern & {
		properties: AstNode[]
	}
	| estree.PrivateIdentifier
	| estree.Program
	| estree.Property & {
		key: AstNode & estree.Identifier
		value: AstNode
	}
	| estree.PropertyDefinition
	| estree.RestElement
	| estree.ReturnStatement
	| estree.SequenceExpression
	| estree.SpreadElement & {
		argument: AstNode
	}
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
	| estree.VariableDeclarator & {
		id: AstNode
		init: AstNode
	}
	| estree.WhileStatement
	| estree.WithStatement
	| estree.YieldExpression
)

export type Comment = BaseAstNode & estree.Comment