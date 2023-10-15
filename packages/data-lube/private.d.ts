export type DeepReadonly<T> = Readonly<{
	[K in keyof T]: T[K] extends (number | string | symbol)
		? Readonly<T[K]> 
		: T[K] extends Array<infer A>
			? Readonly<Array<DeepReadonly<A>>> 
			: DeepReadonly<T[K]>
}>