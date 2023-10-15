export type Dependencies<T extends (...args: any[]) => any> = T extends (...args: infer P) => any
	? {
		[K in keyof P]: P[K] extends infer V
			? V | ((...args: any[]) => V |  Promise<V>) | Promise<V>
			: never
	}
	: never

export type ParallelResult<T extends ((...args: any[]) => any)[]> = {
	[K in keyof T]: T[K] extends (...args: any[]) => infer R
		? { value: Awaited<R> } | { reason: any }
		: never
}

type LengthArray<L extends number, A extends 0[] = [0]> = A["length"] extends L
	? A
	: LengthArray<L, [...A, 0]>

type NumericRange<Arr extends 0[], X extends number> =
	Arr["length"]
	| (Arr["length"] extends X 
		? never
		: NumericRange<[...Arr, 0], X>)

export type Between<M extends number, X extends number> = NumericRange<LengthArray<M>, X>