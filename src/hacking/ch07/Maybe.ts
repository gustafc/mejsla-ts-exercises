function nyi(): never {
  throw new Error("NYI");
}

type Existing = Exclude<unknown, null | undefined>;

export function Maybe<T extends Existing>(t: T): Just<T>;
export function Maybe<T>(t: null | undefined): None;
export function Maybe<T>(t: T | null | undefined): Maybe<T> {
  return t == null ? None.INSTANCE : new Just(t);
}

export interface Maybe<T extends Existing> {
  flatMap<V extends Existing>(f: (t: T) => Maybe<V>): Maybe<V>;
}

abstract class Perhaps<T> implements Maybe<T> {
  abstract flatMap<V extends Existing>(f: (t: T) => Maybe<V>): Maybe<V>;
}

export class Just<T> extends Perhaps<T> {
  // FIXME: Would be nice to have ES private field here - i.e. something like
  //   readonly #value: T
  // but that breaks Prettier, so wait for them to fix it.
  readonly value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }
  flatMap<V>(f: (t: T) => Maybe<V>): Maybe<V> {
    return f(this.value);
  }
  toString(): string {
    return `Just(${this.value})`;
  }
}

export class None extends Perhaps<never> {
  static readonly INSTANCE = new None();
  private constructor() {
    super();
  }
  flatMap<V>(): Maybe<V> {
    return this;
  }
  toString(): string {
    return this.constructor.name;
  }
}
