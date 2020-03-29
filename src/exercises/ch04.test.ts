import { reserve, call, is } from "./ch04";

describe("3️⃣  Extend the 'reserve' function from page 60", () => {
  const earlyDate = new Date(1584203809780);
  const lateDate = new Date(earlyDate.getTime() + 7 * 86_400_000);

  it("can be used to book a return trip", () => {
    expect(reserve(earlyDate, lateDate, "Serre Chevalier")).toBe(
      `Going on ${earlyDate.toLocaleDateString()} to SERRE CHEVALIER and returning on ${lateDate.toLocaleDateString()}`,
    );
  });

  it("can be used to book a one-way trip on a specific date", () => {
    expect(reserve(earlyDate, "Norway")).toBe(
      `One-way ticket to NORWAY leaving on ${earlyDate.toLocaleDateString()}`,
    );
  });

  it("can be used to book a one-way trip ASAP", () => {
    expect(reserve("Gnarp")).toBe(`Going ASAP to GNARP`);
  });
});

describe("4️⃣  Narrow the 'call' function from page 78 to only accept strings for arg 2", () => {
  it("should work with exactly two args", () => {
    function addLength(s1: string, s2: string) {
      return s1.length + s2.length;
    }
    expect(call(addLength, "as", "dfg")).toBe(5);
  });

  it("should work with more than two args", () => {
    function fn(n: number, s1: string, s2: string, ...bs: boolean[]) {
      return `${n.toString(16)}${s1.toLowerCase()}${s2.toUpperCase()}${bs
        .map(b => (b ? 1 : 0))
        .join("")}`;
    }
    expect(call(fn, 15, "A", "b", true, true, false, true)).toBe("faB1101");
  });

  // it("this should not compile", () => {
  //   function notAccepted(...ns: number[]) {
  //     return ns.reduce((l, r) => l + r, 0);
  //   }
  //   expect(call(notAccepted, 1, 2, 3)).toBe(6);
  // });
});

describe("5️⃣  Implement `is`", () => {
  describe("🆗 Positive cases", () => {
    it("should work with two args", () => {
      expect(is("a", "a")).toBe(true);
    });
    it("should work with three args", () => {
      expect(is("a", "a", "a")).toBe(true);
    });
  });
  describe("🆗 Negative cases", () => {
    it("should work with two args", () => {
      expect(is("a", "b")).toBe(false);
    });
    it("should work with three args", () => {
      expect(is("a", "a", "b")).toBe(false);
    });
  });
  describe("🔎 type correctness", () => {
    class VeryWide {
      veryWide = 1;
    }
    class Wide extends VeryWide {
      wide = 2;
    }
    class Narrow extends Wide {
      narrow = 3;
    }
    class VeryNarrow extends Narrow {
      veryNarrow = 4;
    }
    const veryNarrow = new VeryNarrow();
    const narrow = new Narrow();
    const wide = new Wide();
    const veryWide = new VeryWide();
    const literal: "a" = "a";
    const primitive: string = literal;
    it("should allow subtypes", () => {
      // Types:
      expect(is(primitive, literal)).toBe(true);
      // Classes:
      expect(typeof is(veryWide, wide, narrow, veryNarrow)).toBe("boolean");
      expect(typeof is(veryWide, narrow, wide, veryNarrow)).toBe("boolean");
      expect(typeof is(veryWide, veryNarrow, narrow, wide)).toBe("boolean");
      expect(typeof is(wide, narrow, veryNarrow)).toBe("boolean");
      expect(typeof is(wide, veryNarrow, narrow)).toBe("boolean");
    });
    // it("would allow these if we had no fields in the class hierarchy", () => {
    //   expect(typeof is(veryNarrow, narrow, wide, veryWide)).toBe("boolean");
    //   expect(typeof is(veryNarrow, wide)).toBe("boolean");
    // });
    it("has a surprising interaction with `any` type", () => {
      // `any` can also be a subtype!
      const superWide: any = veryNarrow;
      expect(is(veryNarrow, superWide)).toBe(true);
    });
  });
});
