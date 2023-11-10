# Hangul Lube
## Simplify Korean Consonant Search in JavaScript
Working with Korean text and performing consonant-based searches can be complex and time-consuming.  
With **"hangul-Lube"**, a powerful JavaScript library, you can simplify the process of generating regular expression patterns for Korean consonant search.  
This library allows you to effortlessly match Korean words or characters with the same initial consonant letter as the input text.
<br>
<br>

## Installation
```bash
npm i hangul-lube
```
```bash
pnpm i hangul-lube
```
```bash
bun i hangul-lube
```

## How to use
### Get regular expression pattern for Korean consonant search
```ts
import { pattern } from "hangul-lube"

var p: string = pattern("ㄷㅎㅁㄱ")
//=> "[다-딯][하-힣][마-밓][가-깋]"

var p: string = pattern("특수문자 test 1234!@#$")
//=> "특[수-숳]문[자-잫] test 1234!@#$"
```

### Get regular expression for flexible korean search.
```ts
import { searcher } from "hangul-lube"

var r: RegExp = searcher("ㄷㅎㅁㄱ")
//=> /[다-딯][^가-힣0-9A-Z]*?[하-힣][^가-힣0-9A-Z]*?[마-밓][^가-힣0-9A-Z]*?[가-깋]/i

var r: RegExp = searcher("특수문자 test 1234!@#$")
//=> /특[^가-힣0-9A-Z]*?[수-숳][^가-힣0-9A-Z]*?문[^가-힣0-9A-Z]*?[자-잫][^가-힣0-9A-Z]*? [^가-힣0-9A-Z]*?t[^가-힣0-9A-Z]*?e[^가-힣0-9A-Z]*?s[^가-힣0-9A-Z]*?t[^가-힣0-9A-Z]*? [^가-힣0-9A-Z]*?1[^가-힣0-9A-Z]*?2[^가-힣0-9A-Z]*?3[^가-힣0-9A-Z]*?4[^가-힣0-9A-Z]*?![^가-힣0-9A-Z]*?@[^가-힣0-9A-Z]*?#[^가-힣0-9A-Z]*?$/i
```