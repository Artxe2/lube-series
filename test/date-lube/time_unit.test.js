import { assert, describe, it } from "vitest"

import { timeUnit as time_unit } from "date-lube"

describe(
	"time_unit",
	() => {
		it(
			"DD == 24HH",
			() => {
				assert.equal(time_unit.DD, time_unit.HH * 24)
			}
		)
		it(
			"HH == 60mm",
			() => {
				assert.equal(time_unit.HH, time_unit.mm * 60)
			}
		)
		it(
			"mm == 60ss",
			() => {
				assert.equal(time_unit.mm, time_unit.ss * 60)
			}
		)
		it(
			"ss == 1000ms",
			() => {
				assert.equal(time_unit.ss, 1000)
			}
		)
	}
)