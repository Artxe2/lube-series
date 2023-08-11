import { dag, decorator, parallel } from "async-lube"

const my_dag = dag()
		.add(() => {}, 1, "2", {})
		.add((p: any) => p)
my_dag().then((r: any) => r)
my_dag(2).then((r: any) => r)

const my_decorator = decorator(() => {}) || decorator((p: any) => p)
my_decorator.cache(1)
	.debounce(1)
	.retries((reason: Error, count: number) => {})
	.throttle(3, 500)
my_decorator(1, "2", {}).then((r: any) => r)

const myParallel = parallel(
	3,
	() => 1,
	() => 2,
	() => "a",
	() => "b",
	() => ({ c: "d" }),
	() => () => {}
)
myParallel.then((r: any) => r)