import { Maybe, Just, None, orElse, flatMap, map, toString } from "./MaybeUnion";

function assertIsJust<T>(expectedValue: T, maybeT: Maybe<T>) {
  expect(maybeT).toHaveProperty("value", expectedValue);
}

function assertIsNone<T>(shouldBeNone: Maybe<T>) {
  expect(shouldBeNone).toBe(None);
}

describe("construction", () => {
  it("can construct Just", () => {
    const just1 = Maybe<number>(1);
    assertIsJust(1, just1);
  });

  it("can construct None", () => {
    const none = Maybe<number>(null);
    assertIsNone(none);
  });
});

describe("flatMap", () => {
  it("maps Just+Just to Just", () => {
    assertIsJust(
      "12",
      flatMap(Maybe(1), n => Maybe(n + "2")),
    );
  });
  it("maps Just+None to None", () => {
    assertIsNone(flatMap(Maybe(1), n => Maybe(null)));
  });
  it("maps None+Just to None", () => {
    assertIsNone(flatMap(Maybe(null), n => Maybe(1)));
  });
});

describe("orElse", () => {
  it("Just.orElse = value", () => {
    expect(orElse(Maybe(1), 2));
  });
  it("None.orElse = arg", () => {
    expect(orElse(None, 2));
  });
});

describe("toString", () => {
  ([
    [Maybe(null), "None"],
    [Maybe(123), "Just(123)"],
  ] as const).forEach(([m, toStringed]) => {
    it("should toString " + toStringed, () => {
      expect(toString(m)).toBe(toStringed);
    });
  });
});
