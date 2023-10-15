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