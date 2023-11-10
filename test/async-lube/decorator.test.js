import { assert, describe, it } from "vitest"

import { decorator } from "async-lube"

describe(
	"decorator",
	() => {
		let resolve = async () => "resolve"
		/**
		 * @param {number} ms
		 */
		let sleep = ms => new Promise(res => setTimeout(res, ms))
		let get_result = (
			() => {
				let count = 0
				/**
				 * @param {number} key
				 * @returns {number}
				 */
				return key => count++ ?? key
			}
		)()

		it(
			"already error",
			async () => {
				let already_test = decorator(resolve)
				await Promise.all(
					[
						already_test()
							.catch(
								reason => assert.fail(reason.message)
							),
						already_test()
							.then(
								() => assert.fail("No error occurred")
							)
							.catch(
								reason => assert.equal(
									reason.message,
									"Request already in progress"
								)
							)
					]
				)
			}
		)
		it(
			"debounce error",
			async () => {
				let debounce_test = decorator(resolve)
					.debounce(500)
				await Promise.all(
					[
						debounce_test()
							.then(
								() => assert.fail("No error occurred")
							)
							.catch(
								reason => assert.equal(
									reason.message,
									"Request be debounced"
								)
							),
						debounce_test()
							.catch(
								reason => assert.fail(reason.message)
							)
					]
				)
			}
		)
		it(
			"throttle error",
			async () => {
				let throttle_test = decorator(resolve)
					.throttle(2, 1000)
				await Promise.all(
					[
						await throttle_test()
							.catch(
								reason => assert.fail(reason.message)
							),
						await throttle_test()
							.catch(
								reason => assert.fail(reason.message)
							),
						throttle_test()
							.then(
								() => assert.fail("No error occurred")
							)
							.catch(
								reason => assert.equal(
									reason.message,
									"Too many requests"
								)
							)
					]
				)
			}
		)
		it(
			"retries",
			async () => {
				let retry_test = decorator(
					(() => {
						let count = 0
						return async () => {
							if (++count % 5) throw Error("FAIL " + count)
							return "OK"
						}
					})()
				).retries(
					async (reason, count) => {
						await sleep(100)
						if (count == 3) throw reason
					}
				)
				await Promise.all(
					[
						await retry_test()
							.then(
								() => assert.fail("No error occurred")
							)
							.catch(
								reason => assert.equal(reason.message, "FAIL 3")
							),
						retry_test()
							.then(
								value => assert.equal(value, "OK")
							)
							.catch(
								reason => assert.fail(reason.message)
							)
					]
				)
			}
		)
		it(
			"caching",
			async () => {
				let caching_test = decorator(get_result)
					.cache(1)
				let test1 = await caching_test(1)
				await sleep(500)
				let test2 = caching_test(2)
				let test3 = await caching_test(1)
				await sleep(600)
				let test4 = await caching_test(1)

				assert.equal(test1, 0)
				assert.equal(await test2, 1)
				assert.equal(test3, 0)
				assert.equal(test4, 2)
			}
		)
	}
)