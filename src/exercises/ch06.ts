export type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>;

// Exclusive<1 | 2, 2 | 3>
// is equivalent to the union of the following:
// Exclusive<1, 2 | 3> === 1
// Exclusive<2, 2 | 3> === never
// Exclusive<2, 1 | 2> === never
// Exclusive<3, 1 | 2> === 3

type ExclusiveInternal<T, U> = T extends U ? never : T;
export type ExclusiveWithoutBuiltins<T, U> = ExclusiveInternal<T, U> | ExclusiveInternal<U, T>;
