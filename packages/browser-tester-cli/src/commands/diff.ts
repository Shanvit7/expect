import { readFile } from "node:fs/promises";
import { diffSnapshots } from "@browser-tester/browser";
import { Command } from "commander";
import pc from "picocolors";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";

export const diff = new Command()
  .command("diff")
  .description("diff two snapshot files")
  .argument("<before>", "path to the before snapshot file")
  .argument("<after>", "path to the after snapshot file")
  .action(async (beforePath: string, afterPath: string) => {
    try {
      const [beforeText, afterText] = await Promise.all([
        readFile(beforePath, "utf-8"),
        readFile(afterPath, "utf-8"),
      ]);

      const result = diffSnapshots(beforeText.trim(), afterText.trim());

      if (!result.changed) {
        logger.dim("No differences found.");
        return;
      }

      const coloredDiff = result.diff
        .split("\n")
        .map((line) => {
          if (line.startsWith("+ ")) return pc.green(line);
          if (line.startsWith("- ")) return pc.red(line);
          return pc.dim(line);
        })
        .join("\n");

      logger.log(coloredDiff);
      logger.dim(
        `\n${result.additions} additions, ${result.removals} removals, ${result.unchanged} unchanged`,
      );
    } catch (error) {
      handleError(error);
    }
  });
