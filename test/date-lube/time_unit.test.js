import {
	assert, describe, it 
} from "vitest"

import { timeUnit } from "date-lube"

describe(
	"time_unit",
	() => {
		it(
			"DD == 24HH",
			() => {
				assert.equal(timeUnit.DD, timeUnit.HH * 24)
			}
		)
		it(
			"HH == 60mm",
			() => {
				assert.equal(timeUnit.HH, timeUnit.mm * 60)
			}
		)
		it(
			"mm == 60ss",
			() => {
				assert.equal(timeUnit.mm, timeUnit.ss * 60)
			}
		)
		it(
			"ss == 1000ms",
			() => {
				assert.equal(timeUnit.ss, 1000)
			}
		)
	}
)