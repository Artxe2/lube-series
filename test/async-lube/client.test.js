import { assert, describe, it } from "vitest"

import { client } from "async-lube"

describe(
	"client",
	() => {
		it(
			"get",
			async () => {
				const value = await client(
					"https://dummyjson.com/products/category/:ca_teGory123"
				)
					.get()
					.query(
						{
							ca_teGory123: "smartphones",
							limit: 2,
							select: "brand,category,description"
						},
						{
							Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs"
						}
					)
				const json = await value.json()
				assert.deepStrictEqual(
					json,
					{
						"products": [
							{
								"id": 121,
								"brand": "Apple",
								"category": "smartphones",
								"description": "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience."
							},
							{
								"id": 122,
								"brand": "Apple",
								"category": "smartphones",
								"description": "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time."
							}
						],
						"total": 16,
						"skip": 0,
						"limit": 2
					}
				)
			}
		)
		it(
			"post",
			async () => {
				let value = await client(
					"https://dummyjson.com/auth/login"
				)
					.post()
					.json(
						{
							username: "emilys",
							password: "emilyspass"
						}
					)
				let json = await value.json()
				value = await client(
					"https://dummyjson.com/auth/users/1"
				)
					.get()
					.query(
						{},
						{
							Authorization: "Bearer " + json.accessToken
						}
					)
				json = await value.json()
				assert.equal(
					json.email,
					"emily.johnson@x.dummyjson.com"
				)
			}
		)
		it(
			"http status",
			async () => {
				const value = await client(
					"https://dummyjson.com/auth/login"
				)
					.post()
					.json({ username: "kminchelle" })
				assert.equal(value.status, 400)
			}
		)
		it(
			"abort",
			async () => {
				let stop = () => {}
				const api = client(
					"https://dummyjson.com/auth/login",
					abort => stop = abort
				)
					.post()
					.json(
						{
							username: "kminchelle",
							password: "0lelplR"
						}
					)
					.then(
						() => assert.fail("No error occurred")
					)
					.catch(
						reason => assert.equal(reason.name, "AbortError")
					)
				queueMicrotask(stop)
				await api
			}
		)
	}
)