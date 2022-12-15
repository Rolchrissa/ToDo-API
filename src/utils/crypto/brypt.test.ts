//test with vitest

import { describe, expect, it } from "vitest";
import { hashPassword } from "./bcrypt";
describe("suite name", () => {
  it("is a function", () => {
    expect(hashPassword).toBeTypeOf("function");
  });

  it("return a string", async () => {
    const hash = await hashPassword("123456");
    expect(hash).toBeTypeOf("string");
  });
  it("return a different string ", async () => {
    const pw = "123456";
    const hash = await hashPassword(pw);
    expect(hash).not.toBe(pw);
  });
});
