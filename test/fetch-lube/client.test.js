import { assert, describe, it } from "vitest"

import { client } from "fetch-lube"

describe(
	"client",
	() => {
		it(
			"get",
			async () => {
				const value = await client("https://dummyjson.com/products/category/:category")
					.get()
					.query({
						category: "smartphones",
						limit: 2
					}, {
						// eslint-disable-next-line max-len
						Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs"
					})
				const json = await value.json()
				assert.deepEqual(
					json,
					{
						"limit": 2,
						"products": [{
							"brand": "Apple",
							"category": "smartphones",
							"description": "An apple mobile which is nothing like apple",
							"discountPercentage": 12.96,
							"id": 1,
							"images": [
								"https://i.dummyjson.com/data/products/1/1.jpg",
								"https://i.dummyjson.com/data/products/1/2.jpg",
								"https://i.dummyjson.com/data/products/1/3.jpg",
								"https://i.dummyjson.com/data/products/1/4.jpg",
								"https://i.dummyjson.com/data/products/1/thumbnail.jpg"
							],
							"price": 549,
							"rating": 4.69,
							"stock": 94,
							"thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
							"title": "iPhone 9"
						}, {
							"brand": "Apple",
							"category": "smartphones",
							// eslint-disable-next-line max-len
							"description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
							"discountPercentage": 17.94,
							"id": 2,
							"images": [
								"https://i.dummyjson.com/data/products/2/1.jpg",
								"https://i.dummyjson.com/data/products/2/2.jpg",
								"https://i.dummyjson.com/data/products/2/3.jpg",
								"https://i.dummyjson.com/data/products/2/thumbnail.jpg"
							],
							"price": 899,
							"rating": 4.44,
							"stock": 34,
							"thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
							"title": "iPhone X"
						}],
						"skip": 0,
						"total": 5
					}
				)
			}
		)
		it(
			"post",
			async () => {
				let value = await client("https://dummyjson.com/auth/login")
					.post()
					.json({
						username: "kminchelle",
						password: "0lelplR"
					})
				let json = await value.json()
				value = await client("https://dummyjson.com/auth/users/1")
					.get()
					.query({}, {
						Authorization: "Bearer " + json.token
					})
				json = await value.json()
				assert.equal(json.email, "atuny0@sohu.com")
			}
		)
		it(
			"http status",
			async () => {
				const value = await client("https://dummyjson.com/auth/login")
					.post()
					.json({
						username: "kminchelle"
					})
				assert.equal(value.status, 400)
			}
		)
		it(
			"abort",
			async () => {
				/** @type {VoidFunction} */
				let stop
				let api = client("https://dummyjson.com/auth/login", abort => stop = abort)
					.post()
					.json({
						username: "kminchelle",
						password: "0lelplR"
					})
					.then(
						() => assert.fail("No error occurred")
					)
					.catch(
						reason => assert.equal(reason.name, "AbortError")
					)
				// @ts-ignore
				queueMicrotask(stop)
				await api
			}
		)
	}
)