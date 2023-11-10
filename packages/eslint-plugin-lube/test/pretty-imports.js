"use strict"
let { RuleTester } = require("eslint")

/** @type {RuleTester.ValidTestCase[]} */
let valid = []
/** @type {RuleTester.InvalidTestCase[]} */
let invalid = []

require(
	"./pretty-imports/ExportNamedDeclaration"
).module(valid, invalid)
require(
	"./pretty-imports/ImportDeclaration"
).module(valid, invalid)

new RuleTester().run(
	"pretty-imports",
	require("../rules/pretty-imports"),
	{ valid, invalid }
)