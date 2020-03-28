import { reserve, call } from "./ch04";

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
