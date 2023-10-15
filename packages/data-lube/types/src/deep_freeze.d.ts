export default _default;
/**
 * Deep freeze object.
 * @template {*} T
 * @param {T} data
 * @returns {import("../../private.js").DeepReadonly<T>}
 */
declare function _default<T extends unknown>(data: T): Readonly<{ [K in keyof T]: T[K] extends string | number | symbol ? Readonly<T[K]> : T[K] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_1 ? { [K_2 in keyof T_1]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_2 ? { [K_3 in keyof T_2]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3] extends infer T_3 ? { [K_4 in keyof T_3]: A[K_1][K_2][K_3][K_4] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4]> : A[K_1][K_2][K_3][K_4] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4] extends infer T_4 ? { [K_5 in keyof T_4]: A[K_1][K_2][K_3][K_4][K_5] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5]> : A[K_1][K_2][K_3][K_4][K_5] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5] extends infer T_5 ? { [K_6 in keyof T_5]: A[K_1][K_2][K_3][K_4][K_5][K_6] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6]> : A[K_1][K_2][K_3][K_4][K_5][K_6] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6] extends infer T_6 ? { [K_7 in keyof T_6]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends infer T_7 ? { [K_8 in keyof T_7]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends infer T_8 ? { [K_9 in keyof T_8]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9] extends infer T_9 ? { [K_10 in keyof T_9]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9][K_10] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9][K_10]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9][K_10] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; }>[] : Readonly<T[K] extends infer T_10 ? { [K_11 in keyof T_10]: T[K][K_11] extends string | number | symbol ? Readonly<T[K][K_11]> : T[K][K_11] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_11 ? { [K_2 in keyof T_11]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_12 ? { [K_3 in keyof T_12]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3] extends infer T_13 ? { [K_4 in keyof T_13]: A[K_1][K_2][K_3][K_4] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4]> : A[K_1][K_2][K_3][K_4] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4] extends infer T_14 ? { [K_5 in keyof T_14]: A[K_1][K_2][K_3][K_4][K_5] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5]> : A[K_1][K_2][K_3][K_4][K_5] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5] extends infer T_15 ? { [K_6 in keyof T_15]: A[K_1][K_2][K_3][K_4][K_5][K_6] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6]> : A[K_1][K_2][K_3][K_4][K_5][K_6] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6] extends infer T_16 ? { [K_7 in keyof T_16]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends infer T_17 ? { [K_8 in keyof T_17]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends infer T_18 ? { [K_9 in keyof T_18]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8][K_9] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; }>[] : Readonly<T[K][K_11] extends infer T_19 ? { [K_12 in keyof T_19]: T[K][K_11][K_12] extends string | number | symbol ? Readonly<T[K][K_11][K_12]> : T[K][K_11][K_12] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_20 ? { [K_2 in keyof T_20]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_21 ? { [K_3 in keyof T_21]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3] extends infer T_22 ? { [K_4 in keyof T_22]: A[K_1][K_2][K_3][K_4] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4]> : A[K_1][K_2][K_3][K_4] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4] extends infer T_23 ? { [K_5 in keyof T_23]: A[K_1][K_2][K_3][K_4][K_5] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5]> : A[K_1][K_2][K_3][K_4][K_5] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5] extends infer T_24 ? { [K_6 in keyof T_24]: A[K_1][K_2][K_3][K_4][K_5][K_6] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6]> : A[K_1][K_2][K_3][K_4][K_5][K_6] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6] extends infer T_25 ? { [K_7 in keyof T_25]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends infer T_26 ? { [K_8 in keyof T_26]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7][K_8] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; }>[] : Readonly<T[K][K_11][K_12] extends infer T_27 ? { [K_13 in keyof T_27]: T[K][K_11][K_12][K_13] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13]> : T[K][K_11][K_12][K_13] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_28 ? { [K_2 in keyof T_28]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_29 ? { [K_3 in keyof T_29]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3] extends infer T_30 ? { [K_4 in keyof T_30]: A[K_1][K_2][K_3][K_4] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4]> : A[K_1][K_2][K_3][K_4] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4] extends infer T_31 ? { [K_5 in keyof T_31]: A[K_1][K_2][K_3][K_4][K_5] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5]> : A[K_1][K_2][K_3][K_4][K_5] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5] extends infer T_32 ? { [K_6 in keyof T_32]: A[K_1][K_2][K_3][K_4][K_5][K_6] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6]> : A[K_1][K_2][K_3][K_4][K_5][K_6] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6] extends infer T_33 ? { [K_7 in keyof T_33]: A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6][K_7]> : A[K_1][K_2][K_3][K_4][K_5][K_6][K_7] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; }>[] : Readonly<T[K][K_11][K_12][K_13] extends infer T_34 ? { [K_14 in keyof T_34]: T[K][K_11][K_12][K_13][K_14] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13][K_14]> : T[K][K_11][K_12][K_13][K_14] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_35 ? { [K_2 in keyof T_35]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_36 ? { [K_3 in keyof T_36]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3] extends infer T_37 ? { [K_4 in keyof T_37]: A[K_1][K_2][K_3][K_4] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4]> : A[K_1][K_2][K_3][K_4] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4] extends infer T_38 ? { [K_5 in keyof T_38]: A[K_1][K_2][K_3][K_4][K_5] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5]> : A[K_1][K_2][K_3][K_4][K_5] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4][K_5] extends infer T_39 ? { [K_6 in keyof T_39]: A[K_1][K_2][K_3][K_4][K_5][K_6] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5][K_6]> : A[K_1][K_2][K_3][K_4][K_5][K_6] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; } : never>; } : never>; }>[] : Readonly<T[K][K_11][K_12][K_13][K_14] extends infer T_40 ? { [K_15 in keyof T_40]: T[K][K_11][K_12][K_13][K_14][K_15] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13][K_14][K_15]> : T[K][K_11][K_12][K_13][K_14][K_15] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_41 ? { [K_2 in keyof T_41]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_42 ? { [K_3 in keyof T_42]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3] extends infer T_43 ? { [K_4 in keyof T_43]: A[K_1][K_2][K_3][K_4] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4]> : A[K_1][K_2][K_3][K_4] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3][K_4] extends infer T_44 ? { [K_5 in keyof T_44]: A[K_1][K_2][K_3][K_4][K_5] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4][K_5]> : A[K_1][K_2][K_3][K_4][K_5] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; } : never>; }>[] : Readonly<T[K][K_11][K_12][K_13][K_14][K_15] extends infer T_45 ? { [K_16 in keyof T_45]: T[K][K_11][K_12][K_13][K_14][K_15][K_16] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16]> : T[K][K_11][K_12][K_13][K_14][K_15][K_16] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_46 ? { [K_2 in keyof T_46]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_47 ? { [K_3 in keyof T_47]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2][K_3] extends infer T_48 ? { [K_4 in keyof T_48]: A[K_1][K_2][K_3][K_4] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3][K_4]> : A[K_1][K_2][K_3][K_4] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; }>[] : Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16] extends infer T_49 ? { [K_17 in keyof T_49]: T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17]> : T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_50 ? { [K_2 in keyof T_50]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1][K_2] extends infer T_51 ? { [K_3 in keyof T_51]: A[K_1][K_2][K_3] extends string | number | symbol ? Readonly<A[K_1][K_2][K_3]> : A[K_1][K_2][K_3] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; }>[] : Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17] extends infer T_52 ? { [K_18 in keyof T_52]: T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18]> : T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<A[K_1] extends infer T_53 ? { [K_2 in keyof T_53]: A[K_1][K_2] extends string | number | symbol ? Readonly<A[K_1][K_2]> : A[K_1][K_2] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; }>[] : Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18] extends infer T_54 ? { [K_19 in keyof T_54]: T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18][K_19] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18][K_19]> : T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18][K_19] extends (infer A)[] ? readonly Readonly<{ [K_1 in keyof A]: A[K_1] extends string | number | symbol ? Readonly<A[K_1]> : A[K_1] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; }>[] : Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18][K_19] extends infer T_55 ? { [K_20 in keyof T_55]: T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18][K_19][K_20] extends string | number | symbol ? Readonly<T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18][K_19][K_20]> : T[K][K_11][K_12][K_13][K_14][K_15][K_16][K_17][K_18][K_19][K_20] extends (infer A)[] ? readonly Readonly<any>[] : Readonly<any>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; } : never>; }>;
//# sourceMappingURL=deep_freeze.d.ts.map