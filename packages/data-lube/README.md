# Data Lube
## Simplify Data Manipulation in JavaScript
Working with complex data structures and ensuring data integrity can be challenging.  
With **"data-lube"**, a powerful JavaScript library, you can simplify the process of deep copying and deep freezing objects, helping you maintain data consistency and avoid unexpected changes.  
This library offers easy-to-use functions such as deep copy and deep freeze, allowing you to work with data structures without worrying about unintended modifications.
<br>
<br>

## installation
```bash
npm i data-lube
```
```bash
pnpm i data-lube
```
```bash
bun i data-lube
```

## How to use
### Easy deep copy
```ts
import { deepCopy } from "data-lube"

var origin = {
    a: [ 1, 2 ],
    d: new Date
    n: null,
    o: { k: "v" },
    s: "string",
    u: void 0
}
var clone: typeof origin = deepCopy(origin)
```

### Easy comparison and type evaluation
```ts
import { deepEqual } from "data-lube"

var origin = {
    a: [ 1, 2 ],
    n: null,
    o: { k: "v" },
    s: "string"
} as const
var clone: any = JSON.parse(JSON.stringify(origin))
if (deepEqual(origin, clone)) {
    clone.a = [] // Cannot assign to 'a' because it is a read-only property.ts(2540)
}
```

### Easy deep freeze
```ts
import { deepFreeze } from "data-lube"

var freezed = deepFreeze({
    a: [ 1, 2 ],
    n: null,
    o: { k: "v" },
    s: "string"
})
freezed.a = [] // Cannot assign to 'a' because it is a read-only property.ts(2540)

// @ts-ignore
freezed.a = [] // TypeError: Cannot assign to read only property 'a' of object '#<Object>'
```