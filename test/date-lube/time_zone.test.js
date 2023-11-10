import { assert, describe, it } from "vitest"
import { timeUnit, timeZone } from "date-lube"

describe(
	"time_zone",
	() => {
		it(
			"London ~ New-York",
			() => {
				let now = new Date()
				let london = timeZone(new Date(now), "Europe/London")
				let new_york = timeZone(
					new Date(now),
					"America/New_York"
				)
				let new_york_inv = timeZone(
					new Date(now),
					"America/New_York",
					true
				)
				let gap = (london.getTime() - new_york.getTime()) / timeUnit.mm
				let gap_inv = (london.getTime() - new_york_inv.getTime()) / timeUnit.mm
				assert.isTrue(
					gap >= 240 && gap <= 360 && gap % 60 === 0
				)
				assert.isTrue(
					gap_inv >= -1380 && gap_inv <= -1260 && gap_inv % 60 === 0
				)
			}
		)
	}
)