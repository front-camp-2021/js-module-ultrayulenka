import { cutStrings } from "./index.js";

describe("cutStrings", () => {
  it("should satisfy the following conditions", () => {
    const result1 = cutStrings(["123a", "4b", "555c", "d33"]);
    expect(result1).toEqual(["12", "4b", "55", "d3"]);

    const result2 = cutStrings([]);
    expect(result2).toEqual([]);
  });
});
