import { assert, describe, it } from "vitest"

import { stringToDate } from "date-lube"

describe(
	"string_to_date",
	() => {
		it(
			"equals default & formatted",
			() => {
				const default_date = stringToDate("2222-03-04T11:22:33.444")
				const formatted_date = stringToDate(
					"11h22m33s444 _ 2222/03/04",
					"HH mm ss sss _ YYYY MM DD"
				)
				assert.equal(
					default_date.toISOString(),
					formatted_date.toISOString()
				)
			}
		)
	}
)