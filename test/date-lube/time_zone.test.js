import { assert, describe, it } from "vitest"
import { timeUnit as time_unit, timeZone as time_zone } from "date-lube"

describe(
	"time_zone",
	() => {
		it(
			"London ~ New-York",
			() => {
				const now = new Date()
				const london = time_zone(new Date(now), "Europe/London")
				const new_york = time_zone(new Date(now), "America/New_york")
				const gap = (london.getTime() - new_york.getTime()) / time_unit.mm
				assert.isTrue(gap >= 240 && gap <= 360 && gap % 60 === 0)
			}
		)
	}
)