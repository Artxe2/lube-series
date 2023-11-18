import AstSyntaxError from "../AstSyntaxError.js"

let end_style_content_regex = /<\/style>/

/**
 * @param {string} text
 * @param {import("#public").AstSyntaxError[]} errors
 * @param {number} start
 * @returns {import("#public").Style}
 */
export default (text, errors, start) => {
	let index = text.slice(start).search(end_style_content_regex)
	if (index >= 0) {
		return {
			end: start + index,
			start,
			type: "Style"
		}
	}
	errors.push(
		AstSyntaxError(
			"parse_style_content is incomplete.",
			start,
			text.length
		)
	)
	return {
		end: text.length,
		start,
		type: "Style"
	}
}