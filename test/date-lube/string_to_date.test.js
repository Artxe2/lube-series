import { assert, describe, it } from "vitest"

import { stringToDate } from "date-lube"

describe(
	"string_to_date",
	() => {
		it(
			"equals default & formatted",
			() => {
				const defaultDate = stringToDate("2222-03-04T11:22:33.444")
				const formattedDate = stringToDate("11h22m33s444 _ 2222/03/04", "HH mm ss sss _ YYYY MM DD")
				assert.equal(defaultDate.toISOString(), formattedDate.toISOString())
			}
		)
	}
)