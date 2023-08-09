/** @type {Record<string, string>} */
const firstConsonantLetters = {
	ㄱ: "[가-깋]",
	ㄴ: "[나-닣]",
	ㄷ: "[다-딯]",
	ㄹ: "[라-맇]",
	ㅁ: "[마-밓]",
	ㅂ: "[바-빟]",
	ㅅ: "[사-싷]",
	ㅇ: "[아-잏]",
	ㅈ: "[자-짛]",
	ㅊ: "[차-칳]",
	ㅋ: "[카-킿]",
	ㅌ: "[타-팋]",
	ㅍ: "[파-핗]",
	ㅎ: "[하-힣]",
}

/**
 * @param {string} letter
 */
const get_letter_range = letter => {
	const regex = firstConsonantLetters[letter]
	if (regex) return regex
	const code = letter.charCodeAt(0)
	return letter > "힣" || letter < "가" || (code - 44032) % 28
			? letter
			: `[${letter}-${String.fromCharCode(code + 27)}]`
}

/**
 * Generates a regular expression pattern for Korean consonant search.
 * @param {string} text The input text containing Korean consonant characters.
 * @returns A regular expression string that matches Korean words with the same initial consonant letter as the input text.
 * @example
 * pattern("ㄷㅎㅁㄱ"); //=> "[다-딯][하-힣][마-밓][가-깋]"
 *
 * pattern("특수문자 test 1234!@#$"); //=> "특[수-숳]문[자-잫] test 1234!@#$"
 */
export default (text) => {
	let regex = ""
	const len = text.length - 1
	for (let i = 0; i < len; i++) {
		let t = text[i]
		regex += firstConsonantLetters[t] || get_letter_range(t)
	}
	return regex + get_letter_range(text[len])
}