import { assert, describe, it } from "vitest"

import { flow } from "wizard-lube"

describe(
	"flow",
	() => {
		const my_flow = flow()
			.add("a", () => {
				goto("/b")
			})
			.add("b", () => {
				goto("/c")
			})
			.add("c", () => {
				goto("/d")
			})
			.begin()
		// @ts-ignore
		globalThis.location = {
			pathname: "/a"
		}
		/**
		 * @param {string} pathname
		 */
		const goto = pathname => {
			location.pathname = pathname
		}

		it(
			"init data",
			() => {
				assert.deepEqual(my_flow.data(), {})
			}
		)
		it(
			"step a => b",
			() => {
				my_flow.step({ firstName: "James", lastName: "Smith" })
				assert.equal(location.pathname, "/b")
				assert.deepEqual(
					my_flow.data(),
					{ firstName: "James", lastName: "Smith" }
				)
			}
		)
		it(
			"step b => c",
			() => {
				my_flow.step({ eMail: "user@domain.com", phone: "010-1234-5678" })
				assert.equal(location.pathname, "/c")
				assert.deepEqual(
					my_flow.data(),
					{ firstName: "James", lastName: "Smith", eMail: "user@domain.com", phone: "010-1234-5678" }
				)
			}
		)
		it(
			"step c => d",
			() => {
				my_flow.step({ eMail: "user@domain.com", phone: "010-1234-5678" })
				assert.equal(location.pathname, "/d")
				assert.deepEqual(
					my_flow.data(),
					{
						firstName: "James",
						lastName: "Smith",
						eMail: "user@domain.com",
						phone: "010-1234-5678"
					}
				)
			}
		)
		it(
			"footprint to d",
			() => {
				goto("/b")
				my_flow.footprint()
				assert.equal(location.pathname, "/b")
				assert.deepEqual(
					my_flow.data(),
					{ firstName: "James", lastName: "Smith" }
				)
			}
		)
		it(
			"step again b => c",
			() => {
				my_flow.step({ eMail: "user2@domain.com", phone: "010-1234-1234" })
				assert.equal(location.pathname, "/c")
				assert.deepEqual(
					my_flow.data(),
					{ firstName: "James", lastName: "Smith", eMail: "user2@domain.com", phone: "010-1234-1234" }
				)
			}
		)
		it(
			"step again c => d",
			() => {
				my_flow.step({ birthday: "2222-02-02" })
				assert.equal(location.pathname, "/d")
				assert.deepEqual(
					my_flow.data(),
					{
						firstName: "James",
						lastName: "Smith",
						eMail: "user2@domain.com",
						phone: "010-1234-1234",
						birthday: "2222-02-02"
					}
				)
			}
		)
	}
)