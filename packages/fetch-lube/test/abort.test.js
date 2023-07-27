import { client } from "./fetch-lube.js"

let stop
let api = client("https://dummyjson.com/auth/login", abort => stop = abort)
	.post()
	.json({
		username: "kminchelle",
		password: "0lelplR"
	})
	.then(value => value.json())
	.catch(reason => {
		console.log("AbortError:", reason.name === "AbortError")
	})
queueMicrotask(stop)
await api