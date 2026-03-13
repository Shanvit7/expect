import { logger } from "./logger";
import type { SharedOptions } from "./shared-options";

const BOUNDARY_START = "<browser-tester-content>";
const BOUNDARY_END = "</browser-tester-content>";

export const formatOutput = (data: Record<string, unknown>, options: SharedOptions): void => {
  if (options.json) {
    logger.log(JSON.stringify(data, null, 2));
    return;
  }

  const tree = data.tree as string | undefined;
  if (!tree) return;

  let output = tree;

  if (options.maxOutput && output.length > options.maxOutput) {
    const totalLength = output.length;
    output = `${output.slice(0, options.maxOutput)}... (truncated, ${totalLength} chars total)`;
  }

  if (options.contentBoundaries) {
    output = `${BOUNDARY_START}\n${output}\n${BOUNDARY_END}`;
  }

  logger.log(output);
};
