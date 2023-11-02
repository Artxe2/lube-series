import { assert, describe, it } from "vitest"

import { dag } from "async-lube"

describe(
	"dag",
	() => {
		/** @type {((...str: string[]) => Promise<string>)[]} */
		const resolve_array = [
			(...str) =>
				Promise.resolve()
					.then(() => [ ...str, "a" ].join()),
			(...str) =>
				Promise.resolve()
					.then(() => [ ...str, "b" ].join()),
			(...str) =>
				Promise.resolve()
					.then(() => [ ...str, "c" ].join()),
			(...str) =>
				Promise.resolve()
					.then(() => [ ...str, "d" ].join()),
			(...str) =>
				Promise.resolve()
					.then(() => [ ...str, "e" ].join()),
			(...str) =>
				Promise.resolve()
					.then(() => [ ...str, "f" ].join()),
			(...str) =>
				Promise.resolve()
					.then(() => [ ...str, "g" ].join())
		]

		/** @type {((...str: string[]) => Promise<string>)[]} */
		const reject_array = [
			() =>
				Promise.resolve()
					.then(() => "a"),
			() =>
				Promise.resolve()
					.then(
						() => {
							throw Error("b")
						}
					),
			() =>
				Promise.resolve()
					.then(() => "c"),
			() =>
				Promise.resolve()
					.then(() => "d"),
			() =>
				Promise.resolve()
					.then(() => "e"),
			() =>
				Promise.resolve()
					.then(() => "f"),
			() =>
				Promise.resolve()
					.then(() => "g")
		]

		it(
			"default(last) resolve",
			async () => {
				const my_dag = dag()
					.add(resolve_array[0])
					.add(
						resolve_array[1],
						resolve_array[0]
					)
					.add(resolve_array[2])
					.add(
						resolve_array[3],
						resolve_array[5]
					)
					.add(resolve_array[4])
					.add(
						resolve_array[5],
						resolve_array[0]
					)
					.add(
						resolve_array[6],
						resolve_array[5],
						resolve_array[3]
					)
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
					.add(resolve_array[0])
					.add(
						resolve_array[1],
						resolve_array[0]
					)
					.add(resolve_array[2])
					.add(
						resolve_array[3],
						resolve_array[5]
					)
					.add(resolve_array[4])
					.add(
						resolve_array[5],
						resolve_array[0]
					)
					.add(
						resolve_array[6],
						resolve_array[5],
						resolve_array[3]
					)
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
					.add(reject_array[0])
					.add(reject_array[1])
					.add(reject_array[2])
					.add(reject_array[3])
					.add(reject_array[4])
					.add(reject_array[5])
					.add(reject_array[6])
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
					.add(reject_array[0])
					.add(reject_array[1], reject_array[0])
					.add(reject_array[2])
					.add(reject_array[3])
					.add(reject_array[4])
					.add(reject_array[5])
					.add(reject_array[6])
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
					.add(reject_array[0])
					.add(reject_array[1], reject_array[2])
					.add(reject_array[2], reject_array[3])
					.add(reject_array[3])
					.add(reject_array[4])
					.add(reject_array[5])
					.add(reject_array[6])
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