# Fetch Lube
## Simplify Fetch API Usage in JavaScript
Working with the Fetch API in JavaScript can sometimes be cumbersome and require writing repetitive code. With the **"fetch-lube"** library, interacting with the Fetch API becomes easier and more streamlined. This powerful JavaScript library provides a client function that simplifies common HTTP methods and allows for convenient configuration of request options.
<br>
<br>

## installation
index.min.js: 1,050 byte
```
npm i -D fetch-lube
```

<br>

## types
```ts
type Data = { [x: string]: string | number }
type Options = {
	mode?: "no-cors" | "cors" | "same-origin"
	cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached"
	credentials?: "include" | "same-origin" | "omit"
	redirect: "manual" | "follow" | "error"
	referrerPolicy: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
}
type GetFetch = (data?: { [x: string]: string | number }, headers?: Data) => Promise<Response>
type SetOptionsBody = {
	json: GetFetch
	multiPart: (data?: { [x: string]: string | number | File }, headers?: Data) => Promise<Response>
	urlEncoded: GetFetch
}
declare module "fetch-lube" {
	const client: (url: string, setAbort?: (abort: Function) => void) => {
		get: (options?: Options) => {
			query: GetFetch
		}
		delete: (options?: Options) => SetOptionsBody
		head: (options?: Options) => SetOptionsBody
		options: (options?: Options) => SetOptionsBody
		post: (options?: Options) => SetOptionsBody
		put: (options?: Options) => SetOptionsBody
		patch: (options?: Options) => SetOptionsBody
	}
}
```
<br>

## Just syntax sugar for using fetch API
```js
import { client } from "fetch-lube"

// Get using fetch
let postId = 1
fetch("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments")
	.then(async value => {
		if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
		return value.json()
	}, console.error)

fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postId, {
		mode: "cors",
  		cache: "no-cache",
		headers: {
			Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJh..."
		}
	})
	.then(async value => {
		if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
		return value.json()
	}, console.error)

// Get using client
let postId = 1
client("https://jsonplaceholder.typicode.com/posts/:postId/comments")
	.get()
	.query({ postId })
	.then(async value => {
		if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
		return value.json()
	}, console.error)

client("https://jsonplaceholder.typicode.com/comments")
	.get({
		mode: "cors",
  		cache: "no-cache"
	})
	.query({ postId }, {
		Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJh..."
	})
	.then(async value => {
		if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
		return value.json()
	}, console.error)

// Post and timeout using fetch
let controller = new AbortController()
fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		mode: "cors",
  		cache: "no-cache",
		headers: {
			"Conetnt-Type": "application/json;charset=UTF-8",
			Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJh..."
		},
		body: JSON.stringify({
			title: 'foo',
			body: 'bar',
			userId: 1,
		}),
		signal: controller.signal
	})
	.then(async value => {
		if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
		return value.json()
	}, console.error)
setTimeout(() => controller.abort(), 1)

// Post and timeout using client
let stop
client("https://jsonplaceholder.typicode.com/posts", abort => stop = abort)
	.post({
		mode: "cors",
  		cache: "no-cache"
	})
	.json({
		title: 'foo',
		body: 'bar',
		userId: 1,
	}, {
		Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJh..."
	})
	.then(async value => {
		if (value.status > 299) throw { status: value.status, message: (await value.json()).message }
		return value.json()
	}, console.error)
setTimeout(stop, 1)
```
- - -