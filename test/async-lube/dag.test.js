import { assert, describe, it } from "vitest"

import { dag } from "async-lube"

describe(
	"dag",
	() => {
		/**
		 * @type {((str: string) => Promise<string>)[]}
		 */
		const resolveArray = [
			(...str) =>
				Promise.resolve()
					.then(
						() => [...str, "a"].join()
					),
			(...str) =>
				Promise.resolve()
					.then(
						() => [...str, "b"].join()
					),
			(...str) =>
				Promise.resolve()
					.then(
						() => [...str, "c"].join()
					),
			(...str) =>
				Promise.resolve()
					.then(
						() => [...str, "d"].join()
					),
			(...str) =>
				Promise.resolve()
					.then(
						() => [...str, "e"].join()
					),
			(...str) =>
				Promise.resolve()
					.then(
						() => [...str, "f"].join()
					),
			(...str) =>
				Promise.resolve()
					.then(
						() => [...str, "g"].join()
					)
		]

		const rejectArray = [
			() =>
				Promise.resolve()
					.then(
						() => "a"
					),
			() =>
				Promise.resolve()
					.then(
						() => { throw Error("b") }
					),
			() =>
				Promise.resolve()
					.then(
						() => "c"
					),
			() =>
				Promise.resolve()
					.then(
						() => "d"
					),
			() =>
				Promise.resolve()
					.then(
						() => "e"
					),
			() =>
				Promise.resolve()
					.then(
						() => "f"
					),
			() =>
				Promise.resolve()
					.then(
						() => "g"
					)
		]

		it(
			"default(last) resolve",
			async () => {
				const my_dag = dag()
					.add(resolveArray[0])
					.add(resolveArray[1], resolveArray[0])
					.add(resolveArray[2])
					.add(resolveArray[3], resolveArray[5])
					.add(resolveArray[4])
					.add(resolveArray[5], resolveArray[0])
					.add(resolveArray[6], resolveArray[5], resolveArray[3])
				await my_dag()
					.then(
						value => assert.equal(value, "a,f,a,f,d,g")
					)
					.catch(
						reason => assert.fail(reason.message)
					)
			}
		)
		it(
			"index resolve",
			async () => {
				const my_dag = dag()
					.add(resolveArray[0])
					.add(resolveArray[1], resolveArray[0])
					.add(resolveArray[2])
					.add(resolveArray[3], resolveArray[5])
					.add(resolveArray[4])
					.add(resolveArray[5], resolveArray[0])
					.add(resolveArray[6], resolveArray[5], resolveArray[3])
				await my_dag(3)
					.then(
						value => assert.equal(value, "a,f,d")
					)
					.catch(
						reason => assert.fail(reason.message)
					)
			}
		)
		it(
			"run_dag error",
			async () => {
				const my_dag = dag()
					.add(rejectArray[0])
					.add(rejectArray[1])
					.add(rejectArray[2])
					.add(rejectArray[3])
					.add(rejectArray[4])
					.add(rejectArray[5])
					.add(rejectArray[6])
				await my_dag()
					.then(
						() => assert.fail("No error occurred")
					)
					.catch(
						reason => assert.equal("b", reason.message)
					)
			}
		)
		it(
			"run_node error",
			async () => {
				const my_dag = dag()
					.add(rejectArray[0])
					.add(rejectArray[1], rejectArray[0])
					.add(rejectArray[2])
					.add(rejectArray[3])
					.add(rejectArray[4])
					.add(rejectArray[5])
					.add(rejectArray[6])
				await my_dag()
					.then(
						() => assert.fail("No error occurred")
					)
					.catch(
						reason => assert.equal("b", reason.message)
					)
			}
		)
		it(
			"run_node nest error",
			async () => {
				const my_dag = dag()
					.add(rejectArray[0])
					.add(rejectArray[1], rejectArray[2])
					.add(rejectArray[2], rejectArray[3])
					.add(rejectArray[3])
					.add(rejectArray[4])
					.add(rejectArray[5])
					.add(rejectArray[6])
				await my_dag()
					.then(
						() => assert.fail("No error occurred")
					)
					.catch(
						reason => assert.equal("b", reason.message)
					)
			}
		)
	}
)