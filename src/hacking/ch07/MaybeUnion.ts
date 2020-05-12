export const None = Symbol("None");
export type None = typeof None;
export type Just<T> = { readonly value: T };
export type Maybe<T> = None | Just<T>;

type PipeFn<A, B> = (arg: Maybe<A>) => Maybe<B>;

export function pipe<T>(m: Maybe<T>): Maybe<T>;
export function pipe<T, A>(m: Maybe<T>, op1: PipeFn<T, A>): Maybe<A>;
export function pipe<T, A, B>(m: Maybe<T>, op1: PipeFn<T, A>, op2: PipeFn<A, B>): Maybe<B>;
export function pipe<T, A, B, C>(m: Maybe<T>, op1: PipeFn<T, A>, op2: PipeFn<A, B>, op3: PipeFn<B, C>): Maybe<C>;
export function pipe<T, A, B, C, D>(m: Maybe<T>, op1: PipeFn<T, A>, op2: PipeFn<A, B>, op3: PipeFn<B, C>, op4: PipeFn<C, D>): Maybe<D>;
export function pipe<T, A, B, C, D, E>(m: Maybe<T>, op1: PipeFn<T, A>, op2: PipeFn<A, B>, op3: PipeFn<B, C>, op4: PipeFn<C, D>, op5: PipeFn<D, E>): Maybe<E>;
export function pipe<T, A, B, C, D, E, F>(m: Maybe<T>, op1: PipeFn<T, A>, op2: PipeFn<A, B>, op3: PipeFn<B, C>, op4: PipeFn<C, D>, op5: PipeFn<D, E>, op6: PipeFn<E, F>): Maybe<F>;
export function pipe<T, A, B, C, D, E, F>(
  m: Maybe<T>,
  op1: PipeFn<T, A>,
  op2: PipeFn<A, B>,
  op3: PipeFn<B, C>,
  op4: PipeFn<C, D>,
  op5: PipeFn<D, E>,
  op6: PipeFn<E, F>,
  ...ops: PipeFn<any, any>[]
): Maybe<{}>;
export function pipe<T>(m: Maybe<T>, ...ops: PipeFn<any, any>[]): Maybe<any> {
  return ops.reduce((prev: Maybe<any>, fn: PipeFn<any, any>) => fn(prev), m);
}

function isNone(v: any): v is None {
  return v === None;
}

export function Maybe<T>(v: T | null | undefined): Maybe<T> {
  return v == null ? None : ({ value: v } as const);
}

export function orElse<T, V>(m: Maybe<T>, alternative: V): T | V {
  return isNone(m) ? alternative : m.value;
}

export function flatMap<T, V>(m: Maybe<T>, f: (t: T) => Maybe<V>): Maybe<V> {
  return isNone(m) ? None : f(m.value);
}

export function map<T, V>(m: Maybe<T>, f: (t: T) => V): Maybe<V> {
  return flatMap(m, (t) => Maybe(f(t)));
}

export function filter<T>(m: Maybe<T>, f: (t: T) => boolean): Maybe<T> {
  return isNone(m) || !f(m.value) ? None : m;
}

export function flatMapFn<T, V>(f: (t: T) => Maybe<V>): PipeFn<T, V> {
  return (m: Maybe<T>) => flatMap(m, f);
}

export function mapFn<T, V>(f: (t: T) => V): PipeFn<T, V> {
  return (m: Maybe<T>) => map(m, f);
}

export function filterFn<T>(f: (t: T) => boolean): PipeFn<T, T> {
  return (m: Maybe<T>) => filter(m, f);
}

export function toString<T>(m: Maybe<T>): string {
  return orElse(
    map(m, (t) => "Just(" + t + ")"),
    "None",
  );
}
