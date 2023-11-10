let E = Error

/**
 * @param {string} message
 * @param {number} start
 * @param {number} end
 * @returns {Error & { name: "AstSyntaxError", start: number, end: number }}
 */
export default (message, start, end) => {
	/** @type {Error & { start?: number, end?: number }} */
	let error = E(message)
	error.name = "AstSyntaxError"
	error.start = start
	error.end = end
	return /** @type {Error & { name: "AstSyntaxError", start: number, end: number }} */(error)/**/
}