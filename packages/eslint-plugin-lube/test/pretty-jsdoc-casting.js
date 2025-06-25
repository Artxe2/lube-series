"use strict"
const { RuleTester } = require("eslint")

/** @type {RuleTester.ValidTestCase[]} */
const valid = []
/** @type {RuleTester.InvalidTestCase[]} */
const invalid = []

require(
	"./pretty-jsdoc-casting/case_by_expression"
).module(valid, invalid)
require(
	"./pretty-jsdoc-casting/various_situations"
).module(valid, invalid)

new RuleTester().run(
	"pretty-jsdoc-casting",
	require(
		"../rules/pretty-jsdoc-casting"
	),
	{ valid, invalid }
)