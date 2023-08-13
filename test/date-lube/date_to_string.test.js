import { assert, describe, it } from "vitest"

import { dateToString } from "date-lube"

describe(
	"date_to_string",
	() => {
		it(
			"default equals",
			() => {
				const date = new Date("2222-03-04T11:22:33.444")
				const defaultString = dateToString(date)
				assert.equal(defaultString, "2222-03-04T11:22:33.444")
			}
		)
		it(
			"formatted equals",
			() => {
				const date = new Date("2222-03-04T11:22:33.444")
				const formattedString = dateToString(date, "HHhmmmssSsss _ YYYY/MM/DD")
					.replace("S", "s")
				assert.equal(formattedString, "11h22m33s444 _ 2222/03/04")
			}
		)
	}
)