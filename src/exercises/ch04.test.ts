import { reserve } from "./ch04";

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
