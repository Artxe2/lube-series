import { dag } from "async-lube"

let acc = ""
/**
 * @type {((str: string) => Promise<string>)[]}
 */
let arr = [
	(...str) => Promise.resolve().then(() => {
		const v = [...str, "a"].join()
		acc += " " + v
		return v
	}),
	(...str) => Promise.resolve().then(() => {
		const v = [...str, "b"].join()
		acc += " " + v
		return v
	}),
	(...str) => Promise.resolve().then(() => {
		const v = [...str, "c"].join()
		acc += " " + v
		return v
	}),
	(...str) => Promise.resolve().then(() => {
		const v = [...str, "d"].join()
		acc += " " + v
		return v
	}),
	(...str) => Promise.resolve().then(() => {
		const v = [...str, "e"].join()
		acc += " " + v
		return v
	}),
	(...str) => Promise.resolve().then(() => {
		const v = [...str, "f"].join()
		acc += " " + v
		return v
	}),
	(...str) => Promise.resolve().then(() => {
		const v = [...str, "g"].join()
		acc += " " + v
		return v
	}),
]

await dag()
	.add(arr[0])
	.add(arr[1], arr[0])
	.add(arr[2])
	.add(arr[3], arr[5])
	.add(arr[4])
	.add(arr[5], arr[0])
	.add(arr[6], arr[5], arr[3])
	()	.then( value => console.log("Assert default(last) resolve:", value === "a,f,a,f,d,g") )
		.catch( () => console.log("Assert default(last) resolve:", false) )
console.log("Assert dag order:", acc === " a c e a,b a,f a,f,d a,f,a,f,d,g")
await dag()
	.add(arr[0])
	.add(arr[1], arr[0])
	.add(arr[2])
	.add(arr[3], arr[5])
	.add(arr[4])
	.add(arr[5], arr[0])
	.add(arr[6], arr[5], arr[3])
	(3)	.then( value => console.log("Assert index resolve:", value === "a,f,d") )
		.catch( () => console.log("Assert index resolve:", false) )