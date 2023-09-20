import * as estree from "estree"

export type ASTNode = {
	parent: ASTNode
	range: [number, number]
} & (
	estree.ArrayExpression & {
		elements: ASTNode[]
	}
	| estree.ArrayPattern & {
		elements: ASTNode[]
	}
	| estree.ArrowFunctionExpression & {
		body: ASTNode
		params: ASTNode[]
	}
	| estree.AssignmentExpression
	| estree.AssignmentPattern
	| estree.AwaitExpression
	| estree.BinaryExpression
	| estree.BlockStatement
	| estree.BreakStatement
	| estree.CallExpression
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
		specifiers: ASTNode[]
	}
	| estree.ExportSpecifier
	| estree.ExpressionStatement
	| estree.ForInStatement
	| estree.ForOfStatement
	| estree.ForStatement
	| estree.FunctionDeclaration & {
		body: ASTNode
		params: ASTNode[]
	}
	| estree.FunctionExpression & {
		body: ASTNode
		params: ASTNode[]
	}
	| estree.Identifier
	| estree.IfStatement
	| estree.ImportDeclaration & {
		source: estree.SimpleLiteral & {
			range: [number, number]
			raw: string
			value: string
		}
		specifiers: ASTNode[]
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
	| estree.NewExpression
	| estree.ObjectExpression & {
		properties: ASTNode[]
	}
	| estree.ObjectPattern & {
		properties: ASTNode[]
	}
	| estree.PrivateIdentifier
	| estree.Program
	| estree.Property & { key: estree.Identifier }
	| estree.PropertyDefinition
	| estree.RestElement
	| estree.ReturnStatement
	| estree.SequenceExpression
	| estree.SpreadElement
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
	| estree.VariableDeclarator
	| estree.WhileStatement
	| estree.WithStatement
	| estree.YieldExpression
)