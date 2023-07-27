# Async Lube
## Simplify Asynchronous Operations in JavaScript
Managing asynchronous operations in JavaScript can often be complex and error-prone, especially when dealing with dependencies and handling callbacks. However, with the **"async-lube"** library, working with asynchronous code becomes a seamless experience. This powerful JavaScript library provides a set of functions that simplify asynchronous operations and empower developers to write clean and efficient code.
<br>
<br>

## installation
index.min.js: 1,530 byte
```
npm i -D async-lube
```

<br>

## types
```ts
type DAG = {
	(index?: number): Promise<any|void>
	add(callback: Function, ...dependencies: any[]): DAG
}
type Decorator = {
	(...args: any[]): Promise<any|void>
	cache(s: number): Decorator
	debounce(ms: number): Decorator
	retries(checker: (reason: any, count: number) => (any|void)): Decorator
	throttle(n: number, ms: number): Decorator
}
declare module "async-lube" {
	const dag: () => DAG
	const decorator: (callback: Function) => Decorator
	const parallel: (size: number, ...callbacks: Function[]) => Promise<({ value: any|void }|{ reason: any|void })[]>
}
```
<br>

## DAGs for Asynchronous Workflow
```js
import { dag } from "async-lube"

const getPlaceholder = uri => fetch("https://jsonplaceholder.typicode.com" + uri).then(value => value.json())

// Get user information with user id
const getUser = userId => getPlaceholder(`/users/${userId}`)

// Get a list of posts with user id
const getPosts = userId => getPlaceholder(`/users/${userId}/posts`)

// Get a list of comments by post after get a list of posts
const getComments = posts => Promise.all(posts.map(({ id }) => getPlaceholder(`/posts/${id}/comments`)))

let userId = -2
const getUserId = (n, m) => userId += n + m

const myDag = dag()
	.add(getUserId, 1, Promise.resolve(2)) // The parameters of add() are passed to the callback function via wait Promise.all().
	.add(getUser, getUserId) // Pass the execution result of getUserId to getUser
	.add(getPosts, getUserId) // Pass the execution result of getUserId to getPosts
	.add(getComments, getPosts) // Pass the execution result of getPosts to getComments
	.add((user, posts, comments) => ({ // Operations without Dependents can be declared as anonymous functions
		user: { name: user.name }
		, posts: posts.map((v, i) => ({ title: v.title, comments: comments[i].length }))
	}), getUser, getPosts, getComments) // Merges data after all asynchronous operations have been completed.

for (let i = 0; i < 3; i++) console.log(
	await myDag(4 - i) // Returns the result of the (n + 1)th added task. The default is the last index.
) 
/*
=> {
	user: { name: 'Leanne Graham' },
	posts: [
		{
			title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
			comments: 5
		},
		{ title: 'qui est esse', comments: 5 },
		...
	]
}
*/
/*
=> comments [
	[ { postId: 31, id: 151, ... } ],
	[ { postId: 31, id: 152, ... } ],
	...
]
*/
/*
=> posts [
	{ userId: 7, id: 61, ... },
	{ userId: 7, id: 62, ... },
	...
]
*/
```
<br>

## Decorators for Enhanced Behavior
```js
import { decorator } from "async-lube"

/*
 * @ERROR CASE
 * "Request already in progress"
 * "Request be debounced"
 * "Too many requests"
 */
const getPost = decorator(
	id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
		.then(value => {
			if (value.status > 299) throw value.status + " ERROR"
			return value.json()
		})
).cache(10) // Caching execution results for 10 seconds
	.debounce(300) // Debounce for 0.3 seconds
	.retries((reason, count) => {
		if (count == 3) throw reason // Wait 1 second and retry up to 3 times on failure
	})
	.throttle(3, 2000) // Throttling 3 times per 2 seconds

await getPost(3) // Forward parameters to callback functions
/*
=> {
	"userId": 1,
	"id": 3,
	"title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
	"body": `et iusto sed quo iure
voluptatem occaecati omnis eligendi aut ad
voluptatem doloribus vel accusantium quis pariatur
molestiae porro eius odio et labore et velit aut`
}
*/

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
decorator(
	decorator(
		() => fetch("https://jsonplaceholder.typicode.com/posts")
			.then(value => value.json())
	).retries(async () => await sleep(1000)) // Infinite retries every second
).throttle(3, 2000) // Avoid throttling on retry
```
<br>

## Parallel Execution for Performance and Concurrency Control
```js
import { parallel } from "async-lube"

let now = Date.now()

const wait = ms => new Promise((resolve, reject) => {
	let start = Date.now() - now
	setTimeout(() => {
		let end = Date.now() - now
		;(ms % 2 ? resolve : reject)(`${ms}: ${start} => ${end}ms`)
	}, ms)
})

await parallel(
	3, // Restrict concurrent execution
	() => wait(101), // resolve
	() => wait(302), // reject
	() => wait(503), // resolve
	() => wait(104), // reject
	() => wait(205), // resolve
	() => wait(306), // reject
	() => wait(407) // resolve
) // 7 operations total 1928ms
/*
=> [
	{ value: '101: 0 => 103ms' },
	{ reason: '302: 0 => 313ms' },
	{ value: '503: 0 => 508ms' },
	{ reason: '104: 103 => 207ms' },
	{ value: '205: 207 => 418ms' },
	{ reason: '306: 313 => 628ms' },
	{ value: '407: 418 => 837ms' }
]
*/ 
```
- - -