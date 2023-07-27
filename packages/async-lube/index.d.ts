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