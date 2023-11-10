import { assert, describe, it } from "vitest"

import { parallel } from "async-lube"

describe(
	"parallel",
	() => {
		let now = Date.now()
		/**
		 * @param {number} ms
		 * @returns {Promise<{
		 *   end: number
		 *   start: number
		 *   ms: number
		 * }>}
		 */
		let wait = ms => new Promise(
			(resolve, reject) => {
				let start = Date.now() - now
				setTimeout(
					() => {
						let end = Date.now() - now
						if (ms % 2) resolve({ end, start, ms })
						else reject({ end, start, ms })
					},
					ms
				)
			}
		)

		it(
			"result order and duration",
			async () => {
				let value = await parallel(
					3,
					() => wait(101),
					() => wait(300),
					() => wait(501),
					() => wait(100),
					() => wait(201),
					() => wait(300),
					() => wait(401)
				)
				for (let v of value) {
					if ("value" in v) {
						v.value.ms = parseInt(String(v.value.ms / 100))
						v.value.start = parseInt(String(v.value.start / 100))
						v.value.end = parseInt(String(v.value.end / 100))
					} else {
						v.reason.ms = parseInt(String(v.reason.ms / 100))
						v.reason.start = parseInt(String(v.reason.start / 100))
						v.reason.end = parseInt(String(v.reason.end / 100))
					}
				}
				assert.deepStrictEqual(
					value[0],
					{
						value: { ms: 1, start: 0, end: 1 }
					}
				)
				assert.deepStrictEqual(
					value[1],
					{
						reason: { ms: 3, start: 0, end: 3 }
					}
				)
				assert.deepStrictEqual(
					value[2],
					{
						value: { ms: 5, start: 0, end: 5 }
					}
				)
				assert.deepStrictEqual(
					value[3],
					{
						reason: { ms: 1, start: 1, end: 2 }
					}
				)
				assert.deepStrictEqual(
					value[4],
					{
						value: { ms: 2, start: 2, end: 4 }
					}
				)
				assert.deepStrictEqual(
					value[5],
					{
						reason: { ms: 3, start: 3, end: 6 }
					}
				)
				assert.deepStrictEqual(
					value[6],
					{
						value: { ms: 4, start: 4, end: 8 }
					}
				)
			}
		)
	}
)