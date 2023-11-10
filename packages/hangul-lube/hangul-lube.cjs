'use strict';

/** @type {Record<string, string | void>} */
let _default$3 = {
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
	ㅎ: "[하-힣]"
};

/**
 * @param {string} letter
 * @returns {string}
 */
let _default$2 = letter => {
	let regex = _default$3[letter];
	if (regex) return regex
	let code = letter.charCodeAt();
	return letter > "힣" || letter < "가" || (code - 44032) % 28
		? letter
		: `[${letter}-${String.fromCharCode(code + 27)}]`
};

/**
 * Generates a regular expression pattern for Korean consonant search.
 * @param {string} text
 * @returns {string}
 * @example pattern("ㄷㅎㅁㄱ") //=> "[다-딯][하-힣][마-밓][가-깋]"
 *
 * pattern("특수문자 test 1234!@#$") //=> "특[수-숳]문[자-잫] test 1234!@#$"
 */
let _default$1 = text => {
	let regex = "";
	let len = text.length - 1;
	for (let i = 0; i < len; i++) {
		let t = text[i];
		regex += _default$3[t] ?? _default$2(t);
	}
	return regex + _default$2(text[len])
};

const non_word_pattern = "[^가-힣0-9A-Z]*?";

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
	let regex = "";
	const len = text.length - 1;
	for (let i = 0; i <= len; i++) {
		if (i) regex += non_word_pattern;
		const t = text[i];
		regex += _default$3[t] || _default$2(t);
	}
	return regex
		? RegExp(regex, "i")
		: null
};

exports.pattern = _default$1;
exports.searcher = _default;
