import { parallel } from "./async-lube.js"

let now = Date.now()

const wait = ms => new Promise((resolve, reject) => {
	let start = Date.now() - now
	setTimeout(() => {
		let end = Date.now() - now
		;(ms % 2 ? resolve : reject)({ ms, start, end })
	}, ms)
})

let result = await parallel(
	3,
	() => wait(101),
	() => wait(300),
	() => wait(501),
	() => wait(100),
	() => wait(201),
	() => wait(300),
	() => wait(401)
)

const assert = (data, key, ms, start, end) => {
	data = data?.[key]
	return parseInt(data?.ms / 100) === ms
		&& parseInt(data?.start / 100) === start
		&& parseInt(data?.end / 100) === end
}
console.log("Assert 0:", assert(result[0], "value", 1, 0, 1))
console.log("Assert 1:", assert(result[1], "reason", 3, 0, 3))
console.log("Assert 2:", assert(result[2], "value", 5, 0, 5))
console.log("Assert 3:", assert(result[3], "reason", 1, 1, 2))
console.log("Assert 4:", assert(result[4], "value", 2, 2, 4))
console.log("Assert 5:", assert(result[5], "reason", 3, 3, 6))
console.log("Assert 6:", assert(result[6], "value", 4, 4, 8))