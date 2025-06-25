import { deepCopy, deepEqual, deepFreeze } from "data-lube"

const origin = {
	a: [ 1, 2 ],
	n: null,
	o: { k: "v" },
	s: "string",
	u: void 0
} as const
var copied: typeof origin = deepCopy(origin)
var clone: any = JSON.parse(JSON.stringify(copied))
if (deepEqual(origin, clone)) {
	origin.a
}
clone.a = []
var freezed = deepFreeze(clone)
deepCopy(freezed)