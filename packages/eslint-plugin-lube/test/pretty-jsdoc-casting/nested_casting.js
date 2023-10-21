/**
 * @param {import("eslint").RuleTester.ValidTestCase[]} valid 
 * @param {import("eslint").RuleTester.InvalidTestCase[]} invalid
 */
exports.module = (valid, invalid) => {
	valid.push(
		{
			code: `var v = func(
				a
			)`
		},
		{
			code: "var v = /** @type {A} */(/** @type {B} */(/** @type {C} */(a)/**/)/**/)/**/"
		},
		{
			code: "var v = /** @type {A} */(a)/**/()"
		},
		{
			code: "var v = { b: /** @type {A} */(a)/**/ }"
		},
		{
			code: `var v = /** @type {V} */({
				a: /** @type {A} */([/** @type {B} */(b)/**/, /** @type {C} */(c)/**/, /** @type {D} */(d)/**/])/**/,
				e: /** @type {F} */(f)/**/(/** @type {G} */(g)/**/, /** @type {E} */(E)/**/, /** @type {I} */(i)/**/),
				j: /** @type {K} */(k)/**/,
				l: [.../** @type {M} */(m)/**/, .../** @type {N} */(n)/**/, .../** @type {O} */(o)/**/],
				p: /** @type {Q} */(q.r)/**/,
				s: /** @type {S} */(t())/**/,
				u: /** @type {U} */({ v: /** @type {W} */(w)/**/ })/**/,
				.../** @type {X} */(x)/**/
			})/**/;
			/** @type {Y} */(y, /** @type {Z} */(z[/** @type {123} */(123)/**/])/**/)/**/`,
			parserOptions: { ecmaVersion: "latest" }
		}
	)
	invalid.push(
		{
			code: "var v = /**@type {A}*/(a)/**/",
			errors: [{
				column: 8,
				line: 1
			}],
			output: "var v = /** @type {A} */(a)/**/"
		},
		{
			code: "var v = /** @type {A} */(  /** @type {B} */(/** @type {C} */((a) /* block... */))) // line...",
			errors: [{
				column: 8,
				line: 1
			}],
			output: "var v =   /** @type {A} */(/** @type {B} */(/** @type {C} */((a))/**/)/**/)/**/ /* block... */ // line..."
		},
		{
			code: "var v = { b: /** @type {A} */(a) }",
			errors: [{
				column: 13,
				line: 1
			}],
			output: "var v = { b: /** @type {A} */(a)/**/ }"
		},
		{
			code: "var v = { b: /** @type {A} */(a) }",
			errors: [{
				column: 13,
				line: 1
			}],
			output: "var v = { b: /** @type {A} */(a)/**/ }"
		},
		{
			code: `var v = /** @type {V} */({
				a: /** @type {A} */([/** @type {B} */(b), /** @type {C} */(c), /** @type {D} */(d)]),
				e: /** @type {F} */(f)(/** @type {G} */(g), /** @type {E} */(E), /** @type {I} */(i)),
				j: /** @type {K} */(k),
				l: [.../** @type {M} */(m), .../** @type {N} */(n), .../** @type {O} */(o)],
				p: /** @type {Q} */(q.r),
				s: /** @type {S} */(t()),
				u: /** @type {U} */({ v: /** @type {W} */(w) }),
				.../** @type {X} */(x)
			});
			/** @type {Y} */(y, /** @type {Z} */(z[/** @type {123} */(123)]))`,
			errors: [...new Array(21).fill({})],
			output: `var v = /** @type {V} */({
				a: /** @type {A} */([/** @type {B} */(b)/**/, /** @type {C} */(c)/**/, /** @type {D} */(d)/**/])/**/,
				e: /** @type {F} */(f)/**/(/** @type {G} */(g)/**/, /** @type {E} */(E)/**/, /** @type {I} */(i)/**/),
				j: /** @type {K} */(k)/**/,
				l: [.../** @type {M} */(m)/**/, .../** @type {N} */(n)/**/, .../** @type {O} */(o)/**/],
				p: /** @type {Q} */(q.r)/**/,
				s: /** @type {S} */(t())/**/,
				u: /** @type {U} */({ v: /** @type {W} */(w)/**/ })/**/,
				.../** @type {X} */(x)/**/
			})/**/;
			/** @type {Y} */(y, /** @type {Z} */(z[/** @type {123} */(123)/**/])/**/)/**/`,
			parserOptions: { ecmaVersion: "latest" }
		}
	)
}