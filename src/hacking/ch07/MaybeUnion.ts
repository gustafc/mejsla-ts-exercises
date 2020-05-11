export const None = Symbol("None");
export type None = typeof None;
export type Just<T> = { readonly value: T };
export type Maybe<T> = None | Just<T>;

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
  return flatMap(m, t => Maybe(f(t)));
}

export function toString<T>(m: Maybe<T>): string {
  return orElse(
    map(m, t => "Just(" + t + ")"),
    "None",
  );
}
