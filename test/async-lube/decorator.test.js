import { decorator } from "async-lube"

let resolve = () => Promise.resolve().then(() => "resolve")

const alreadyTest = decorator(resolve)
alreadyTest()
	.then( () => console.log("Assert already pass:", true) )
	.catch( () => console.log("Assert already pass:", false) )
alreadyTest()
	.then( () => console.log("Assert already error:", false) )
	.catch( reason => console.log("Assert already error:", reason.message === "Request already in progress") )

const debounceTest = decorator(resolve)
	.debounce(500)
debounceTest()
	.then( () => console.log("Assert debounce error:", false) )
	.catch( reason => console.log("Assert debounce error:", reason.message === "Request be debounced") )
await debounceTest()
	.then( () => console.log("Assert debounce pass:", true) )
	.catch( () => console.log("Assert debounce pass:", false) )

const throttleTest = decorator(resolve)
	.throttle(2, 1000)
await throttleTest()
	.then( () => console.log("Assert throttle pass 1:", true) )
	.catch( () => console.log("Assert throttle pass 1:", false) )
await throttleTest()
	.then( () => console.log("Assert throttle pass 2:", true) )
	.catch( () => console.log("Assert throttle pass 2:", false) )
await throttleTest()
	.then( () => console.log("Assert throttle error:", false) )
	.catch( reason => console.log("Assert throttle error:", reason.message === "Too many requests") )

/**
 * @param {number} ms
 */
const sleep = ms => new Promise( resolve => setTimeout(resolve, ms) )

const retryTest = decorator(
	(() => {
		let count = 0
		return async () => {
			if (++count % 5) throw Error("FAIL " + count)
			return "OK"
		}
	})()
).retries(async (reason, count) => {
		await sleep(100)
		if (count == 3) throw reason
	})

await retryTest()
	.then( () => console.log("Assert retry fail:", false) )
	.catch( reason => console.log("Assert retry fail:", reason.message === "FAIL 3") )
await retryTest()
	.then( value => console.log("Assert retry success:", value === "OK") )
	.catch( reason => console.log("Assert retry fail:", false, reason) )