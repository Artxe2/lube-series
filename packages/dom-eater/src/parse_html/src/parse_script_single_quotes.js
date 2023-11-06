import AstSyntaxError from "../../common/AstSyntaxError.js"

const end_single_quotes_regex = /(?<=(?<!\\)(?:\\\\)*)'/

/**
 * @param {string} text
 * @param {import("../../../public.js").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("../../../public.js").String & { subType: "single" }}
 */
export default (text, errors, start) => {
	const index = text.slice(start + 1).search(end_single_quotes_regex) + 1
	if (index > 0) {
		return {
			end: start + index + 1,
			scripts: [],
			start,
			subType: "single",
			type: "String"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_script_single_quotes is incomplete.",
			start,
			text.length
		)
	)
	return {
		end: text.length,
		scripts: [],
		start,
		subType: "single",
		type: "String"
	}
}