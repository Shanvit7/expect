import type { CreatePageOptions } from "@browser-tester/browser";
import type { Command } from "commander";

export interface SharedOptions extends Omit<CreatePageOptions, "video"> {
  timeout?: number;
  json?: boolean;
  waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
  video?: string;
  diff?: boolean;
  contentBoundaries?: boolean;
  maxOutput?: number;
}

export const addSharedOptions = <T extends Command>(command: T): T =>
  command
    .option("-t, --timeout <ms>", "snapshot timeout in milliseconds", parseInt)
    .option("--headed", "run browser in headed mode")
    .option("--cookies", "inject cookies from local browsers")
    .option("--executable-path <path>", "path to browser executable")
    .option("--json", "output as JSON")
    .option("--wait-until <state>", "wait strategy: load, domcontentloaded, networkidle", "load")
    .option("--video <path>", "record video and save to path")
    .option("--diff", "show before/after diff for actions")
    .option("--content-boundaries", "wrap output in boundary markers")
    .option("--max-output <chars>", "truncate output to N characters", parseInt) as T;
