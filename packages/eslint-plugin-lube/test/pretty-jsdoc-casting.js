"use strict"
let { RuleTester } = require("eslint")

/** @type {RuleTester.ValidTestCase[]} */
let valid = []
/** @type {RuleTester.InvalidTestCase[]} */
let invalid = []

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