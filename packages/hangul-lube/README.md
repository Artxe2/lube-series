# Hangul Lube
## Simplify Korean Consonant Search in JavaScript
Working with Korean text and performing consonant-based searches can be complex and time-consuming.  
With **"hangul-Lube"**, a powerful JavaScript library, you can simplify the process of generating regular expression patterns for Korean consonant search.  
This library allows you to effortlessly match Korean words or characters with the same initial consonant letter as the input text.
<br>
<br>

## installation
```
npm i -D hangul-lube
```

<br>

## types
```ts
declare module "hangul-lube" {
	/**
	 * Generates a regular expression pattern for Korean consonant search.
	 * @param text The input text containing Korean consonant characters.
	 * @returns A regular expression string that matches Korean words with the same initial consonant letter as the input text.
	 * @example
	 * pattern("ㄷㅎㅁㄱ"); //=> "[다-딯][하-힣][마-밓][가-깋]"
	 *
	 * pattern("특수문자 test 1234!@#$"); //=> "특[수-숳]문[자-잫] test 1234!@#$"
	 */
	const pattern: (text: string) => string
}
```