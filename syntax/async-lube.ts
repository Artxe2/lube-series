import { client, dag, decorator, parallel } from "async-lube"

const op: RequestInit = {
	cache: "default"
}
const hd = { Authorization: "..." }
client("https://...", abort => abort())
const {
	delete: _delete,
	get,
	head,
	options,
	patch,
	post,
	put
} = client("https://...")
let with_body = _delete()
with_body = _delete(op)
with_body = head()
with_body = head(op)
with_body = options()
with_body = options(op)
with_body = patch()
with_body = patch(op)
with_body = post()
with_body = post(op)
with_body = put()
with_body = put(op)
const { json, multiPart, urlEncoded } = with_body
var response: Promise<Response> = fetch("")
response = json({ string: "abc", number: 123 })
response = json({ string: "abc", number: 123 }, hd)
response = multiPart({ string: "abc", number: 123, file: new File([], "") })
response = multiPart({ string: "abc", number: 123, file: new File([], "") }, hd)
response = urlEncoded({ string: "abc", number: 123 })
response = urlEncoded({ string: "abc", number: 123 }, hd)
let with_query = get()
with_query = get(op)
const { query } = with_query
response = query({ string: "abc", number: 123 })
response = query({ string: "abc", number: 123 }, hd)
response.then
response.catch
response.finally

const func_a = (a: string) => a
const func_ab = (a: number, b: string) => a + b
dag().add(func_a, "1")
	.add(func_ab, 1, "1")
dag().add(func_a, () => "1")
	.add(func_ab, () => 1, () => "1")
dag().add(func_a, Promise.resolve("1"))
	.add(func_ab, Promise.resolve(1), Promise.resolve("1"))

decorator((a: number) => a)
	.cache(10)
	.debounce(200)
	.retries((reason, count) => {
		if (count > 3) {
			throw reason
		}
	})
	.throttle(3, 500)(1)
decorator((a: number, b?: string) => a + (b || ""))(1, "2")

parallel(2, () => ({ a: "a", b: "b" }), () => 123, () => {})
	.then(result => {
		if ("value" in result[0]) {
			result[0].value.a
		}
		if ("value" in result[1]) {
			result[1].value.toFixed()
		}
		if ("value" in result[2]) {
			// result[2].value[""]
		}
	})