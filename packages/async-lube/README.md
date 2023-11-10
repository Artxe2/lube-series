# Async Lube
## Simplify Asynchronous Operations in JavaScript
Managing asynchronous operations in JavaScript can often be complex and error-prone, especially when dealing with dependencies and handling handlers.  
However, with the **"async-lube"** library, working with asynchronous code becomes a seamless experience.  
This powerful JavaScript library provides a set of functions that simplify asynchronous operations and empower developers to write clean and efficient code.
<br>
<br>

## installation
```bash
npm i async-lube
```
```bash
pnpm i async-lube
```
```bash
bun i async-lube
```

## How to use
### Ergonomic fetch api
```ts
import { client } from "async-lube"

client("https://...", abort => setTimeout(abort, 2000))
    .get({ cache: "default" })
    .query({ id: 1 }, { Authorization: "..." })
    .then(res => res.json())

client("https://...")
    .post({ cache: "default" })
    .json({ string: "abc", number: 123 })
    .then(res => res.json())
```

### Ensure execution order of complex asynchronous flows with DAG
```ts
import { dag } from "async-lube"

async function func_a(): string {
    return ""
}
function func_b(a: string): number {
    return +a
}
let count = 0
async function func_c(a: string, b: number) {
    return ++count + a + b
}

var async_flow = dag()
    .add(func_a)
    .add(func_b, func_a)
    .add(func_c, func_a, func_b)

await async_flow() //=> "10"
await async_flow() //=> "20"
await async_flow() //=> "30"

var type_error_flow = dag()
    .add(func_a, "") // Expected 1 arguments, but got 2.ts(2554)
    .add(func_b) // Expected 2 arguments, but got 1.ts(2554)
    .add(func_b, 1) // Argument of type 'number' is not assignable to parameter of type ...ts(2345)
```

### Simplifies complex asynchronous functionality with Decorator
```ts
import { decorator } from "async-lube"

var api = decorator((id: string) => fetch("https://.../" + id))
    .cache(10) // s
    .debounce(200) // ms
    .retries((reason, count) => {
        if (count > 3) {
            throw reason // throwing an error does not retry
        }
    })
    .throttle(3, 500) // n request in ms

api("123") // caching key: "[\"123\"]"

api(123) // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
api() // Expected 1 arguments, but got 0.ts(2554)
```

### Parallel runs that limit the maximum number of concurrent runs
```ts
import { parallel } from "async-lube"

parallel(2, () => ({ a: "a", b: "b" }), () => 123, () => {})
    .then(result => {
        if ("value" in result[0]) {
            result[0].value.a
        } else {
            throw result.reason
        }
        if ("value" in result[1]) {
            result[1].value.toFixed()
        } else {
            throw result.reason
        }
        if ("value" in result[2]) {
            result[2].value[""] // Property '' does not exist on type 'void'.ts(7053)
        }
    })
```