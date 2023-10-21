/**
 * @param {keyof import("estree").ExpressionMap} type 
 * @param {string} value 
 * @returns {import("eslint").RuleTester.InvalidTestCase}
 */
const test_case = (type, value) => ({
	code: `
	var value = /** @type {A} */(${value})
	var value = /** @type {B} */(${value}) // comment...
	var value = /** @type {C} */(
		${value} // comment...
	)
	var value = /** @type {D} */((${value}))
	var value = ((/** @type {E} */(${value})))
	`,
	errors: [
		{
			line: 2,
			column: 13,
			type
		},
		{
			line: 3,
			column: 13,
			type
		},
		{
			line: 4,
			column: 13,
			type
		},
		{
			line: 7,
			column: 13,
			type
		},
		{
			line: 8,
			column: 13,
			type
		}
	],
	output: `
	var value = /** @type {A} */(${value})/**/
	var value = /** @type {B} */(${value})/**/ // comment...
	var value = 
		/** @type {C} */(${value})/**/ // comment...
	
	var value = /** @type {D} */((${value}))/**/
	var value = ((/** @type {E} */(${value})/**/))
	`,
	parserOptions: { ecmaVersion: "latest" }
})

/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid 
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	invalid.push(
		test_case("ArrayExpression", "[a, b, c]"),
		test_case("ArrowFunctionExpression", "(a, b) => c"),
		test_case("AssignmentExpression", "a = b"),
		{
			code: `
			async function a() {
				/** @type {A} */(await b);
				/** @type {B} */(await b); // comment...
				/** @type {C} */(
					await b // comment...
				);
				/** @type {D} */((await b));
				((/** @type {E} */(await b)));
			}
			`,
			errors: [
				{
					line: 2,
					column: 24,
					type: "AwaitExpression"
				},
				{
					line: 3,
					column: 31,
					type: "AwaitExpression"
				},
				{
					line: 4,
					column: 31,
					type: "AwaitExpression"
				},
				{
					line: 7,
					column: 7,
					type: "AwaitExpression"
				},
				{
					line: 8,
					column: 33,
					type: "AwaitExpression"
				}
			],
			output: `
			async function a() {
				/** @type {A} */(await b)/**/;
				/** @type {B} */(await b)/**/; // comment...
				
					/** @type {C} */(await b)/**/ // comment...
				;
				/** @type {D} */((await b))/**/;
				((/** @type {E} */(await b)/**/));
			}
			`,
			parserOptions: { ecmaVersion: "latest" }
		},
		test_case("BinaryExpression", "a / b"),
		test_case("CallExpression", "a(b, c)"),
		test_case("ChainExpression", "a?.b?.c"),
		test_case("ClassExpression", "class { b = c }"),
		test_case("ConditionalExpression", "a ? b : c"),
		test_case("FunctionExpression", "function(a, b) { return c }"),
		test_case("Identifier", "a"),
		test_case("ImportExpression", "import('a')"),
		test_case("Literal", "'a'"),
		test_case("LogicalExpression", "a ?? b"),
		test_case("MemberExpression", "a.b"),
		{
			code: `
			function a() {
				/** @type {A} */(new.target);
				/** @type {B} */(new.target); // comment...
				/** @type {C} */(
					new.target // comment...
				);
				/** @type {D} */((new.target));
				((/** @type {E} */(new.target)));
			}
			`,
			errors: [
				{
					line: 2,
					column: 18,
					type: "MetaProperty"
				},
				{
					line: 3,
					column: 34,
					type: "MetaProperty"
				},
				{
					line: 4,
					column: 34,
					type: "MetaProperty"
				},
				{
					line: 7,
					column: 7,
					type: "MetaProperty"
				},
				{
					line: 8,
					column: 36,
					type: "MetaProperty"
				}
			],
			output: `
			function a() {
				/** @type {A} */(new.target)/**/;
				/** @type {B} */(new.target)/**/; // comment...
				
					/** @type {C} */(new.target)/**/ // comment...
				;
				/** @type {D} */((new.target))/**/;
				((/** @type {E} */(new.target)/**/));
			}
			`,
			parserOptions: { ecmaVersion: "latest" }
		},
		test_case("NewExpression", "new a(b, c)"),
		test_case("ObjectExpression", "{ a: b, c }"),
		test_case("SequenceExpression", "a, b, c"),
		test_case("TaggedTemplateExpression", "a`b${c}`"),
		test_case("TemplateLiteral", "`a${b}c`"),
		test_case("ThisExpression", "this"),
		test_case("UnaryExpression", "!a"),
		test_case("UpdateExpression", "++a"),
		{
			code: `
			function* a() {
				/** @type {A} */(yield b);
				/** @type {B} */(yield b); // comment...
				/** @type {C} */(
					yield b // comment...
				);
				/** @type {D} */((yield b));
				((/** @type {E} */(yield b)));
			}
			`,
			errors: [
				{
					line: 2,
					column: 19,
					type: "YieldExpression"
				},
				{
					line: 3,
					column: 31,
					type: "YieldExpression"
				},
				{
					line: 4,
					column: 31,
					type: "YieldExpression"
				},
				{
					line: 7,
					column: 7,
					type: "YieldExpression"
				},
				{
					line: 8,
					column: 33,
					type: "YieldExpression"
				}
			],
			output: `
			function* a() {
				/** @type {A} */(yield b)/**/;
				/** @type {B} */(yield b)/**/; // comment...
				
					/** @type {C} */(yield b)/**/ // comment...
				;
				/** @type {D} */((yield b))/**/;
				((/** @type {E} */(yield b)/**/));
			}
			`,
			parserOptions: { ecmaVersion: "latest" }
		}
	)
}