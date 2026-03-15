import type { DiffStats } from "../types.js";

export const formatDiffStats = (diffStats: DiffStats | null | undefined): string => {
  if (!diffStats) return "No code changes detected.";

  return `${diffStats.filesChanged} file${diffStats.filesChanged === 1 ? "" : "s"} changed, +${diffStats.additions} -${diffStats.deletions}`;
};
