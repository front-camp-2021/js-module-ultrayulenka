import { weirdString } from "./index.js";

describe("weirdString", () => {
  it("should satisfy the following conditions", () => {
    const result1 = weirdString("My name is Bob");
    expect(result1).toEqual("My NAMe Is BOb");

    const result2 = weirdString("");
    expect(result2).toEqual("");
  });
});
