import { assert, describe, it } from "vitest"

import { pattern } from "hangul-lube"

describe(
	"pattern",
	() => {
		it(
			"first consonant letters search",
			() => {
				const regex = pattern("ㄷㅎㅁㄱ ㅂㄷㅅㅇ ㅁㄹㄱ ㄷㄷㄹ")
				assert.equal(regex, "[다-딯][하-힣][마-밓][가-깋] [바-빟][다-딯][사-싷][아-잏] [마-밓][라-맇][가-깋] [다-딯][다-딯][라-맇]")
				assert.isTrue(
					new RegExp(regex).test("동해물과 백두산이 마르고 닳도록")
				)
			}
		)
		it(
			"first complex letters search",
			() => {
				const regex = pattern("ㅎㅇ~ 테스트 123456789!")
				assert.equal(regex, "[하-힣][아-잏]~ [테-텧][스-슿][트-틓] 123456789!")
				assert.isTrue(
					new RegExp(regex).test("하이~ 테스트 123456789!")
				)
			}
		)
	}
)