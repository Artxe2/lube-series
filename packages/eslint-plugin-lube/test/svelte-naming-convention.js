"use strict"
const { RuleTester } = require("eslint")

/** @type {RuleTester.ValidTestCase[]} */
const valid = []
/** @type {RuleTester.InvalidTestCase[]} */
const invalid = []

require(
	"./svelte-naming-convention/basic_snake_case"
).module(valid, invalid)
require(
	"./svelte-naming-convention/case_by_identifier"
).module(valid, invalid)
require(
	"./svelte-naming-convention/snake_case_with_symbols"
).module(valid, invalid)

new RuleTester().run(
	"svelte-naming-convention",
	require(
		"../rules/svelte-naming-convention"
	),
	{ valid, invalid }
)