import { assert, describe, it } from "vitest"

import { searcher } from "hangul-lube"

describe(
	"searcher",
	() => {
		it(
			"first consonant letters search",
			() => {
				const regex = searcher("ㄷㅎㅁㄱㅂㄷㅅㅇㅁㄹㄱㄷㄷㄹ~")
				assert.isTrue(
					regex?.test("동해물과 ?백두산이 !마르고 @닳도록~")
				)
			}
		)
		it(
			"first complex letters search",
			() => {
				const regex = searcher("ㅎㅇ 테스트123")
				assert.isTrue(
					regex?.test("하이~ 테스트 123456789!")
				)
			}
		)
	}
)