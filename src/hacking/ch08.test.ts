import { promisify, Callback } from "./ch08";

describe("promisify", () => {
  it("should forward result properly", async () => {
    function cbd(s: string, cb: Callback<string>): void {
      cb(null, s);
    }
    expect(await promisify(cbd)("This ends well")).toBe("This ends well");
  });
  it("should forward error properly", async () => {
    const expectedError = new Error("Expected error");
    function cbd(s: string, cb: Callback<string>): void {
      cb(expectedError, null);
    }
    try {
      await promisify(cbd)("This does not end well");
      throw new Error("Did not propagate error");
    } catch (e) {
      expect(e).toBe(expectedError);
    }
  });
});
