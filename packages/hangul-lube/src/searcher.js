import first_consonant_letters from "./first_consonant_letters.js"
import get_letter_range from "./get_letter_range.js"

const non_word_pattern = "[^가-힣0-9A-Z]*?"

/**
 * Compile a regular expression pattern for Flexible korean search.
 * @param {string} text
 * @returns {RegExp?}
 * @example searcher("ㄷㅎㅁㄱ") //=>
 * /[다-딯][^가-힣0-9A-Z]*?[하-힣][^가-힣0-9A-Z]*?[마-밓][^가-힣0-9A-Z]*?[가-깋]/i
 *
 * searcher("특수문자 test 1234!@#$") //=>
 * /특[^가-힣0-9A-Z]*?[수-숳][^가-힣0-9A-Z]*?문[^가-힣0-9A-Z]*?[자-잫][^가-힣0-9A-Z]*? [^가-힣0-9A-Z]*?t[^가-힣0-9A-Z]*?e[^가-힣0-9A-Z]*?s[^가-힣0-9A-Z]*?t[^가-힣0-9A-Z]*? [^가-힣0-9A-Z]*?1[^가-힣0-9A-Z]*?2[^가-힣0-9A-Z]*?3[^가-힣0-9A-Z]*?4[^가-힣0-9A-Z]*?![^가-힣0-9A-Z]*?@[^가-힣0-9A-Z]*?#[^가-힣0-9A-Z]*?$/i
 */
let _default = text => {
	let regex = ""
	const len = text.length - 1
	for (let i = 0; i <= len; i++) {
		if (i) regex += non_word_pattern
		const t = text[i]
		regex += first_consonant_letters[t] || get_letter_range(t)
	}
	return regex
		? RegExp(regex, "i")
		: null
}

export default _default