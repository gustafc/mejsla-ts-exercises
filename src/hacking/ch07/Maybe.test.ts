import { Maybe, Just, None } from "./Maybe";

function assertIsJust<T>(expectedValue: T, maybeT: Maybe<T>) {
  expect(maybeT).toBeInstanceOf(Just);
  expect(maybeT).toHaveProperty("value", expectedValue);
}

function assertIsNone<T>(shouldBeNone: Maybe<T>) {
  expect(shouldBeNone).toBe(None.INSTANCE);
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
      Maybe(1).flatMap(n => Maybe(n + "2")),
    );
  });
  it("maps Just+None to None", () => {
    assertIsNone(Maybe(1).flatMap(n => Maybe(null)));
  });
  it("maps None+Just to None", () => {
    assertIsNone(Maybe(null).flatMap(n => Maybe(1)));
  });
});
