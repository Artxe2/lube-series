import { dag } from "async-lube"

let arr = [
	() => Promise.resolve().then(() => "a"),
	() => Promise.resolve().then(() => { throw "b" }),
	() => Promise.resolve().then(() => "c"),
	() => Promise.resolve().then(() => "d"),
	() => Promise.resolve().then(() => "e"),
	() => Promise.resolve().then(() => "f"),
	() => Promise.resolve().then(() => "g")
]

await dag()
	.add(arr[0])
	.add(arr[1])
	.add(arr[2])
	.add(arr[3])
	.add(arr[4])
	.add(arr[5])
	.add(arr[6])
	()	.then( () => console.log("Assert run_dag error:", false) )
		.catch( reason => console.log("Assert run_dag error:", "b" === reason) )

await dag()
	.add(arr[0])
	.add(arr[1], arr[0])
	.add(arr[2])
	.add(arr[3])
	.add(arr[4])
	.add(arr[5])
	.add(arr[6])
	()	.then( () => console.log("Assert run_node error:", false) )
		.catch( reason => console.log("Assert run_node error:", "b" === reason) )

await dag()
	.add(arr[0])
	.add(arr[1], arr[2])
	.add(arr[2], arr[3])
	.add(arr[3])
	.add(arr[4])
	.add(arr[5])
	.add(arr[6])
	()	.then( () => console.log("Assert run_node nest error:", false) )
		.catch( reason => console.log("Assert run_node nest error:", "b" === reason) )