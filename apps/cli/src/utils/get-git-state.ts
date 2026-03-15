import type { DiffStats } from "@browser-tester/supervisor";
import {
  getBranchCommits,
  getBranchDiffStats,
  getCurrentBranchName,
  getMainBranchName,
  getUnstagedDiffStats,
  isInsideGitRepo,
} from "@browser-tester/supervisor";

export interface GitState {
  isGitRepo: boolean;
  currentBranch: string;
  isOnMain: boolean;
  hasUnstagedChanges: boolean;
  hasBranchCommits: boolean;
  branchCommitCount: number;
  diffStats: DiffStats | null;
  branchDiffStats: DiffStats | null;
}

export type TestScope = "unstaged-changes" | "entire-branch" | "default";

export const getGitState = (): GitState => {
  const cwd = process.cwd();

  if (!isInsideGitRepo(cwd)) {
    return {
      isGitRepo: false,
      currentBranch: "unknown",
      isOnMain: false,
      hasUnstagedChanges: false,
      hasBranchCommits: false,
      branchCommitCount: 0,
      diffStats: null,
      branchDiffStats: null,
    };
  }

  const currentBranch = getCurrentBranchName(cwd);
  const mainBranch = getMainBranchName(cwd);
  const isOnMain = mainBranch === currentBranch;
  const diffStats = getUnstagedDiffStats(cwd);
  const hasUnstagedChanges = diffStats !== null;

  let branchDiffStats: DiffStats | null = null;
  let branchCommitCount = 0;
  if (!isOnMain && mainBranch) {
    branchCommitCount = getBranchCommits(cwd, mainBranch).length;
    branchDiffStats = getBranchDiffStats(cwd, mainBranch);
  }

  return {
    isGitRepo: true,
    currentBranch,
    isOnMain,
    hasUnstagedChanges,
    hasBranchCommits: branchCommitCount > 0,
    branchCommitCount,
    diffStats,
    branchDiffStats,
  };
};

export const getRecommendedScope = (gitState: GitState): TestScope => {
  if (gitState.hasUnstagedChanges) return "unstaged-changes";
  if (!gitState.isOnMain && gitState.hasBranchCommits) return "entire-branch";
  return "default";
};
