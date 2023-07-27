import { client } from "./fetch-lube.js"

await client("https://dummyjson.com/auth/login")
	.post()
	.json({
		username: "kminchelle"
	})
	.then(async value => {
		if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
		return value.json()
	})
	.catch(reason => {
		console.log("reason:", reason)
		console.log("bad-request:", reason.status === 400)
	})