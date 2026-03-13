import { describe, expect, it } from "vitest";
import type { CdpRawCookie, ProfileCookie } from "../src/types.js";
import { normalizeSameSite } from "../src/utils/normalize-same-site.js";

const RAW_COOKIE: CdpRawCookie = {
  domain: ".example.com",
  name: "session",
  value: "abc123",
  path: "/",
  expires: 1735689600,
  secure: true,
  httpOnly: true,
  sameSite: "Lax",
  priority: "Medium",
  sourceScheme: "Secure",
  sourcePort: 443,
  sameParty: false,
};

const toProfileCookie = (raw: CdpRawCookie): ProfileCookie => ({
  name: raw.name,
  value: raw.value,
  domain: raw.domain,
  path: raw.path,
  expires: raw.expires > 0 ? raw.expires : undefined,
  secure: raw.secure,
  httpOnly: raw.httpOnly,
  sameSite: normalizeSameSite(raw.sameSite),
});

describe("toProfileCookie mapping", () => {
  it("maps all fields correctly", () => {
    const cookie = toProfileCookie(RAW_COOKIE);

    expect(cookie.name).toBe("session");
    expect(cookie.value).toBe("abc123");
    expect(cookie.domain).toBe(".example.com");
    expect(cookie.path).toBe("/");
    expect(cookie.expires).toBe(1735689600);
    expect(cookie.secure).toBe(true);
    expect(cookie.httpOnly).toBe(true);
    expect(cookie.sameSite).toBe("Lax");
  });

  it("strips CDP-only fields", () => {
    const cookie = toProfileCookie(RAW_COOKIE);

    expect(cookie).not.toHaveProperty("priority");
    expect(cookie).not.toHaveProperty("sourceScheme");
    expect(cookie).not.toHaveProperty("sourcePort");
    expect(cookie).not.toHaveProperty("sameParty");
  });

  it("sets expires to undefined for zero expiry (session cookie)", () => {
    const sessionCookie = { ...RAW_COOKIE, expires: 0 };
    const cookie = toProfileCookie(sessionCookie);

    expect(cookie.expires).toBeUndefined();
  });

  it("sets expires to undefined for negative expiry", () => {
    const negativeCookie = { ...RAW_COOKIE, expires: -1 };
    const cookie = toProfileCookie(negativeCookie);

    expect(cookie.expires).toBeUndefined();
  });

  it("normalizes sameSite values", () => {
    expect(toProfileCookie({ ...RAW_COOKIE, sameSite: "Strict" }).sameSite).toBe("Strict");
    expect(toProfileCookie({ ...RAW_COOKIE, sameSite: "Lax" }).sameSite).toBe("Lax");
    expect(toProfileCookie({ ...RAW_COOKIE, sameSite: "None" }).sameSite).toBe("None");
    expect(toProfileCookie({ ...RAW_COOKIE, sameSite: "" }).sameSite).toBeUndefined();
    expect(toProfileCookie({ ...RAW_COOKIE, sameSite: "unknown" }).sameSite).toBeUndefined();
  });

  it("preserves boolean fields", () => {
    const insecureCookie = toProfileCookie({ ...RAW_COOKIE, secure: false, httpOnly: false });

    expect(insecureCookie.secure).toBe(false);
    expect(insecureCookie.httpOnly).toBe(false);
  });
});
