import AstSyntaxError from "../AstSyntaxError.js"

let end_double_quotes_regex = /(?<=(?<!\\)(?:\\\\)*)"/

/**
 * @param {string} text
 * @param {import("../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../public.js").String & { subType: "double" }}
 */
export default (text, errors, start) => {
	let index = text.slice(start + 1).search(end_double_quotes_regex) + 1
	if (index > 0) {
		return {
			end: start + index + 1,
			scripts: [],
			start,
			subType: "double",
			type: "String"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_script_double_quotes is incomplete.",
			start,
			text.length
		)
	)
	return {
		end: text.length,
		scripts: [],
		start,
		subType: "double",
		type: "String"
	}
}