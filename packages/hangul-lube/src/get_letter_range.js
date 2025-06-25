import first_consonant_letters from "./first_consonant_letters.js"

/**
 * @param {string} letter
 * @returns {string}
 */
const _default = letter => {
	const regex = first_consonant_letters[letter]
	if (regex) return regex
	const code = letter.charCodeAt()
	return letter > "힣" || letter < "가" || (code - 44032) % 28
		? letter
		: `[${letter}-${String.fromCharCode(code + 27)}]`
}

export default _default