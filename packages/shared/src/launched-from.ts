export type LaunchedFrom = "cli" | "ci" | "agent";

const CI_ENVIRONMENT_VARIABLES = ["GITHUB_ACTIONS", "GITHUB_RUN_ID", "CI"];

const AGENT_ENVIRONMENT_VARIABLES = [
  "CLAUDECODE",
  "CURSOR_AGENT",
  "CODEX_CI",
  "OPENCODE",
  "AMP_HOME",
  "AMI",
  "PI_CODING_AGENT_DIR",
];

export const detectLaunchedFrom = (): LaunchedFrom => {
  if (CI_ENVIRONMENT_VARIABLES.some((envVariable) => Boolean(process.env[envVariable])))
    return "ci";
  if (AGENT_ENVIRONMENT_VARIABLES.some((envVariable) => Boolean(process.env[envVariable])))
    return "agent";
  return "cli";
};

export const isRunningInAgent = (): boolean =>
  [...CI_ENVIRONMENT_VARIABLES, ...AGENT_ENVIRONMENT_VARIABLES].some((envVariable) =>
    Boolean(process.env[envVariable]),
  );
