import { describe, expect, it } from "vitest";
import { normalizeSameSite } from "../src/utils/normalize-same-site.js";

describe("normalizeSameSite", () => {
  it("returns Strict for valid input", () => {
    expect(normalizeSameSite("Strict")).toBe("Strict");
  });

  it("returns Lax for valid input", () => {
    expect(normalizeSameSite("Lax")).toBe("Lax");
  });

  it("returns None for valid input", () => {
    expect(normalizeSameSite("None")).toBe("None");
  });

  it("returns undefined for empty string", () => {
    expect(normalizeSameSite("")).toBeUndefined();
  });

  it("returns undefined for unknown values", () => {
    expect(normalizeSameSite("strict")).toBeUndefined();
    expect(normalizeSameSite("lax")).toBeUndefined();
    expect(normalizeSameSite("none")).toBeUndefined();
    expect(normalizeSameSite("no_restriction")).toBeUndefined();
    expect(normalizeSameSite("unspecified")).toBeUndefined();
  });
});
