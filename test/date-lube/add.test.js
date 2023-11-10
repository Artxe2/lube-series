import { assert, describe, it } from "vitest"

import { add } from "date-lube"

describe(
	"add",
	() => {
		it(
			"add",
			() => {
				let start_date = new Date("2222-03-04T11:22:33.444Z")
				add(start_date, "-1Y 2M")
				add(
					start_date,
					"-3D5H6m 7sasdf-8sss"
				)
				assert.equal(
					start_date.getTime(),
					new Date("2221-05-01T16:28:40.436Z").getTime()
				)
			}
		)
	}
)