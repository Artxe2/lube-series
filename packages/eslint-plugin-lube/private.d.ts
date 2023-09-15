import * as estree from "estree"

export type ASTNode = {
	end: number
	parent: ASTNode
	range: [number, number]
	start: number
} & (
	estree.ArrayExpression
	| estree.ArrayPattern
	| estree.ArrowFunctionExpression
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
	| estree.ExportNamedDeclaration
	| estree.ExportSpecifier
	| estree.ExpressionStatement
	| estree.ForInStatement
	| estree.ForOfStatement
	| estree.ForStatement
	| estree.FunctionDeclaration
	| estree.FunctionExpression
	| estree.Identifier
	| estree.IfStatement
	| estree.ImportDeclaration
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
	| estree.ObjectExpression
	| estree.ObjectPattern
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