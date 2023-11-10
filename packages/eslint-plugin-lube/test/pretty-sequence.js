"use strict"
let { RuleTester } = require("eslint")

/** @type {RuleTester.ValidTestCase[]} */
let valid = []
/** @type {RuleTester.InvalidTestCase[]} */
let invalid = []

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