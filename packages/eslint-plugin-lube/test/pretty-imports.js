"use strict"
const { RuleTester } = require("eslint")

/** @type {RuleTester.ValidTestCase[]} */
const valid = []
/** @type {RuleTester.InvalidTestCase[]} */
const invalid = []

require("./pretty-imports/check_exports").module(valid, invalid)
require("./pretty-imports/check_imports").module(valid, invalid)

new RuleTester().run(
	"pretty-imports",
	require("../rules/pretty-imports"),
	{ 
		valid,
		invalid
	}
)