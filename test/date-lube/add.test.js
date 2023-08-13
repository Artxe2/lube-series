import { assert, describe, it } from "vitest"

import { add } from "date-lube"

describe(
	"add",
	() => {
		it(
			"add",
			() => {
				const startDate = new Date("2222-03-04T11:22:33.444Z")
				add(startDate, "-1Y 2M")
				add(startDate, "-3D5H6m 7sasdf-8sss")
				assert.equal(startDate.getTime(), new Date("2221-05-01T16:28:40.436Z").getTime())
			}
		)
	}
)