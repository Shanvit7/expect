import { beforeEach, describe, expect, it, vi } from "vitest";
import { commandExists } from "../src/utils/command-exists.js";

const availableCommands = new Set<string>();

vi.mock("node:child_process", () => ({
  execFileSync: vi.fn((_command: string, args: string[]) => {
    const target = args[0];
    if (!availableCommands.has(target)) throw new Error(`not found: ${target}`);
    return `/usr/local/bin/${target}`;
  }),
}));

describe("commandExists", () => {
  beforeEach(() => {
    availableCommands.clear();
  });

  it("returns true when the command is available", () => {
    availableCommands.add("gh");
    expect(commandExists("gh")).toBe(true);
  });

  it("returns false when the command is not found", () => {
    expect(commandExists("gh")).toBe(false);
  });
});
