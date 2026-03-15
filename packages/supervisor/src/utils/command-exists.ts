import { execFileSync } from "node:child_process";

export const commandExists = (command: string): boolean => {
  try {
    execFileSync("which", [command], {
      encoding: "utf-8",
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
};
