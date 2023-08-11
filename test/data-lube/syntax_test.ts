import { deepCopy, deepFreeze } from "data-lube"

deepCopy({a: "A", b: { c: [2, 4, 6, 8] } })
deepFreeze({a: "A", b: { c: [2, 4, 6, 8] } })