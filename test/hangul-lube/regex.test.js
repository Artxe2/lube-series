import { pattern } from "hangul-lube"

console.log(
	"Assert first consonant letters search:",
	new RegExp( pattern("ㄷㅎㅁㄱ ㅂㄷㅅㅇ ㅁㄹㄱ ㄷㄷㄹ") ).test("동해물과 백두산이 마르고 닳도록")
)
console.log(
	"Assert complex letters search:",
	new RegExp( pattern("ㅎㅇ~ 테스트 123456789!") ).test("하이~ 테스트 123456789!")
)