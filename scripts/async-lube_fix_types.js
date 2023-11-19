import { readFileSync, writeFileSync } from "node:fs"

import { fileURLToPath } from "node:url"

const dir = fileURLToPath(new URL("..", import.meta.url))

const replace_any_type_regex = /(?<=@returns {(.+?)}\r?\n(?:.|[\r\n])+?: )any(?=;)/g

/**
 * @param {string} _
 * @param {string} type
 * @returns {string}
 */
const replace_any_type_handler = (_, type) => type

const decorator_d_ts = `${dir}/packages/async-lube/types/decorator.d.ts`
const text = readFileSync(decorator_d_ts)
	.toString()

writeFileSync(
	decorator_d_ts,
	text.replace(
		replace_any_type_regex,
		replace_any_type_handler
	)
)