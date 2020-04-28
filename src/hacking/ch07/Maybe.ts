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
  flatMap<U extends Existing>(f: (t: T) => Maybe<U>): Maybe<U>;
  orElse<U>(alt: () => T): T | U;
}

abstract class Perhaps<T> implements Maybe<T> {
  abstract flatMap<V extends Existing>(f: (t: T) => Maybe<V>): Maybe<V>;
  abstract orElse<V>(alt: () => T): T | V;
  map<U extends Existing>(f: (t: T) => U): Maybe<U> {
    // FIXME: Why do I need to specify type parameter to flatMap here?
    return this.flatMap<U>(t => Maybe(f(t)));
  }
  toString(): string {
    return this.constructor.name + this.map(t => `(${t})`).orElse(() => "");
  }
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orElse<V>(alt: () => V): T {
    return this.value;
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
  orElse<V>(alt: () => V): V {
    return alt();
  }
}
