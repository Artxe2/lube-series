import { assert, describe, it } from "vitest"
import { timeUnit, timeZone } from "date-lube"

describe(
	"time_zone",
	() => {
		it(
			"London ~ New-York",
			() => {
				const now = new Date()
				const london = timeZone(new Date(now), "Europe/London")
				const new_york = timeZone(new Date(now), "America/New_york")
				const gap = (london.getTime() - new_york.getTime()) / timeUnit.mm
				assert.isTrue(gap >= 240 && gap <= 360 && gap % 60 === 0)
			}
		)
	}
)