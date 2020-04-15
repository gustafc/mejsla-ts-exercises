import { invokeEndpoint, Env } from "./ch06EnumsWithKeyOf";

describe("Enum-like behavior with keyof + typeof", () => {
  const scenarios: [Env, string][] = [
    ["PROD", "Calling https://integration.example.com/some/path with a timeout of 10000 ms"],
    ["LOCAL", "Calling http://localhost:3000/some/path with a timeout of 60000 ms"],
  ];
  scenarios.forEach(([env, expectedResult]) =>
    it("should work for " + env, () =>
      expect(invokeEndpoint(env, "/some/path")).toBe(expectedResult),
    ),
  );
});
