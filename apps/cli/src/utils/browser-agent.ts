import {
  planBrowserFlow,
  resolveTestTarget,
  type BrowserEnvironmentHints,
  type BrowserFlowPlan,
  type CommitSummary,
  type TestTarget,
  type TestTargetSelection,
} from "@browser-tester/supervisor";

export type TestAction = "test-unstaged" | "test-branch" | "select-commit";

interface GenerateBrowserPlanOptions {
  action: TestAction;
  commit?: CommitSummary;
  userInstruction: string;
}

interface GenerateBrowserPlanResult {
  target: TestTarget;
  plan: BrowserFlowPlan;
  environment: BrowserEnvironmentHints;
}

const parseBooleanEnvironmentValue = (value: string | undefined): boolean | undefined => {
  if (!value) return undefined;
  const normalizedValue = value.trim().toLowerCase();
  if (normalizedValue === "true" || normalizedValue === "1" || normalizedValue === "yes")
    return true;
  if (normalizedValue === "false" || normalizedValue === "0" || normalizedValue === "no")
    return false;
  return undefined;
};

const getBrowserEnvironment = (): BrowserEnvironmentHints => ({
  baseUrl: process.env.BROWSER_TESTER_BASE_URL,
  headed: parseBooleanEnvironmentValue(process.env.BROWSER_TESTER_HEADED),
  cookies: parseBooleanEnvironmentValue(process.env.BROWSER_TESTER_COOKIES),
});

const createSelection = (action: TestAction, commit?: CommitSummary): TestTargetSelection => {
  if (action === "select-commit") {
    return {
      action,
      commitHash: commit?.hash,
      commitShortHash: commit?.shortHash,
      commitSubject: commit?.subject,
    };
  }

  return { action };
};

export const generateBrowserPlan = async (
  options: GenerateBrowserPlanOptions,
): Promise<GenerateBrowserPlanResult> => {
  const target = resolveTestTarget({
    selection: createSelection(options.action, options.commit),
  });
  const environment = getBrowserEnvironment();
  const plan = await planBrowserFlow({
    target,
    userInstruction: options.userInstruction,
    environment,
  });

  return {
    target,
    plan,
    environment,
  };
};
