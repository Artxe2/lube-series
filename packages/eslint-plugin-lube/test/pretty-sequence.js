"use strict"
const { RuleTester } = require("eslint")

/** @type {RuleTester.ValidTestCase[]} */
const valid = []
/** @type {RuleTester.InvalidTestCase[]} */
const invalid = []

require(
	"./pretty-sequence/case_by_node_type"
).module(valid, invalid)
require(
	"./pretty-sequence/case_by_option"
).module(valid, invalid)
require(
	"./pretty-sequence/various_situations"
).module(valid, invalid)

new RuleTester().run(
	"pretty-sequence",
	require("../rules/pretty-sequence"),
	{ valid, invalid }
)