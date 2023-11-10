import fs from "node:fs"

let replace_any_type_regex = /(?<=@returns {(.+?)}\r?\n(?:.|[\r\n])+?: )any(?=;)/g

/**
 * @param {string} _
 * @param {string} type
 * @returns {string}
 */
let replace_any_type_handler = (_, type) => type

let decorator_d_ts = "packages/async-lube/types/decorator.d.ts"
let text = fs.readFileSync(decorator_d_ts)
	.toString()

fs.writeFileSync(
	decorator_d_ts,
	text.replace(
		replace_any_type_regex,
		replace_any_type_handler
	)
)