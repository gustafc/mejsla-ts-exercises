import { Exclusive, ExclusiveWithoutBuiltins } from "./ch06";

type Expected = 1 | 4;
type Actual = Exclusive<1 | 2 | 3, 2 | 3 | 4>;
type ActualWithoutBuiltins = ExclusiveWithoutBuiltins<1 | 2 | 3, 2 | 3 | 4>;

function assign<T extends U, U>(t: T): U {
  return t;
}

describe("3️⃣  Write an Exclusive<T, U> type", () => {
  it("should work using builtin", () => {
    let one: Expected = parseInt("1") as Expected;
    let four: Expected = parseInt("4") as Expected;
    let actual: Actual;
    actual = assign(one);
    one = assign(actual);
    actual = assign(four);
    four = assign(actual);
  });

  it("should work without builtins", () => {
    let one: Expected = parseInt("1") as Expected;
    let four: Expected = parseInt("4") as Expected;
    let actual: ActualWithoutBuiltins;
    actual = assign(one);
    one = assign(actual);
    actual = assign(four);
    four = assign(actual);
  });
});
