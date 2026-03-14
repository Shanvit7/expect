import type { TestAction } from "./browser-agent.js";

export interface EnvironmentOverrides {
  baseUrl?: string;
  headed?: boolean;
  cookies?: boolean;
}

export interface TestRunConfig {
  action: TestAction;
  commitHash?: string;
  message?: string;
  flowSlug?: string;
  autoRun?: boolean;
  environmentOverrides?: EnvironmentOverrides;
}

interface CommanderGlobalOptions {
  message?: string;
  flow?: string;
  yes?: boolean;
  baseUrl?: string;
  headed?: boolean;
  cookies?: boolean;
}

export const resolveTestRunConfig = (
  action: TestAction,
  commanderOptions: CommanderGlobalOptions,
  commitHash?: string,
): TestRunConfig => {
  const { baseUrl, headed, cookies } = commanderOptions;
  const hasEnvironmentOverrides =
    baseUrl !== undefined || headed !== undefined || cookies !== undefined;

  return {
    action,
    commitHash,
    message: commanderOptions.message,
    flowSlug: commanderOptions.flow,
    autoRun: commanderOptions.yes,
    environmentOverrides: hasEnvironmentOverrides ? { baseUrl, headed, cookies } : undefined,
  };
};
