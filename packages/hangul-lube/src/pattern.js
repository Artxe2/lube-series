import first_consonant_letters from "./first_consonant_letters.js"
import get_letter_range from "./get_letter_range.js"

/**
 * Generates a regular expression pattern for Korean consonant search.
 * @param {string} text
 * @returns {string}
 * @example pattern("ㄷㅎㅁㄱ") //=> "[다-딯][하-힣][마-밓][가-깋]"
 *
 * pattern("특수문자 test 1234!@#$") //=> "특[수-숳]문[자-잫] test 1234!@#$"
 */
let _default = text => {
	let regex = ""
	let len = text.length - 1
	for (let i = 0; i < len; i++) {
		let t = text[i]
		regex += first_consonant_letters[t] ?? get_letter_range(t)
	}
	return regex + get_letter_range(text[len])
}

export default _default