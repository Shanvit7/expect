import type { LanguageModelV3 } from "@ai-sdk/provider";
import { createClaudeModel } from "@browser-tester/agent";
import { z } from "zod";
import { PLANNER_MAX_STEP_COUNT, STEP_ID_PAD_LENGTH } from "./constants.js";
import { extractJsonObject } from "./json.js";
import type { BrowserFlowPlan, PlanBrowserFlowOptions, PlanStep, TestTarget } from "./types.js";

const planStepSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  instruction: z.string().min(1),
  expectedOutcome: z.string().min(1),
  routeHint: z.string().min(1).optional(),
  changedFileEvidence: z.array(z.string().min(1)).default([]),
});

const browserFlowPlanSchema = z.object({
  title: z.string().min(1),
  rationale: z.string().min(1),
  targetSummary: z.string().min(1),
  assumptions: z.array(z.string().min(1)).default([]),
  riskAreas: z.array(z.string().min(1)).default([]),
  targetUrls: z.array(z.string().min(1)).default([]),
  steps: z.array(planStepSchema).min(1).max(PLANNER_MAX_STEP_COUNT),
});

const createPlannerModel = (
  options: Pick<PlanBrowserFlowOptions, "model" | "providerSettings" | "target">,
): LanguageModelV3 =>
  options.model ??
  createClaudeModel({
    cwd: options.target.cwd,
    ...(options.providerSettings ?? {}),
  });

const formatDiffStats = (target: TestTarget): string =>
  target.diffStats
    ? `${target.diffStats.filesChanged} files changed, +${target.diffStats.additions} / -${target.diffStats.deletions}`
    : "No diff stats available";

const formatChangedFiles = (target: TestTarget): string =>
  target.changedFiles.length > 0
    ? target.changedFiles.map((file) => `- [${file.status}] ${file.path}`).join("\n")
    : "- No changed files detected";

const formatRecentCommits = (target: TestTarget): string =>
  target.recentCommits.length > 0
    ? target.recentCommits.map((commit) => `- ${commit.shortHash} ${commit.subject}`).join("\n")
    : "- No recent commits available";

const buildPlanningPrompt = (options: PlanBrowserFlowOptions): string => {
  const { target, userInstruction, environment } = options;

  return [
    "You are planning a browser-based regression test flow for a developer.",
    "Return JSON only and make the plan directly editable by a human reviewer.",
    "",
    "Testing target:",
    `- Scope: ${target.scope}`,
    `- Display name: ${target.displayName}`,
    `- Current branch: ${target.branch.current}`,
    `- Main branch: ${target.branch.main ?? "unknown"}`,
    `- Diff stats: ${formatDiffStats(target)}`,
    "",
    "Changed files:",
    formatChangedFiles(target),
    "",
    "Recent commits:",
    formatRecentCommits(target),
    "",
    "Diff preview:",
    target.diffPreview || "No diff preview available",
    "",
    "User-requested browser journey:",
    userInstruction,
    "",
    "Environment hints:",
    `- Base URL: ${environment?.baseUrl ?? "not provided"}`,
    `- Headed mode: ${environment?.headed === true ? "yes" : "no or not specified"}`,
    `- Reuse browser cookies: ${environment?.cookies === true ? "yes" : "no or not specified"}`,
    "",
    "Requirements:",
    "- Make the plan meaningfully different depending on whether the target is unstaged, branch, or commit.",
    "- Blend the requested journey with code-change-derived risk areas.",
    "- Focus on realistic browser steps that a browser agent can execute.",
    "- Include assumptions when the journey depends on unknown data or authentication.",
    "- Keep the plan concise and high signal.",
    "- Use a maximum of 8 steps.",
    "",
    "Return a JSON object with this exact shape:",
    '{"title":"string","rationale":"string","targetSummary":"string","assumptions":["string"],"riskAreas":["string"],"targetUrls":["string"],"steps":[{"id":"optional string","title":"string","instruction":"string","expectedOutcome":"string","routeHint":"optional string","changedFileEvidence":["string"]}]}',
  ].join("\n");
};

const normalizeSteps = (steps: z.infer<typeof planStepSchema>[]): PlanStep[] =>
  steps.map((step, index) => ({
    ...step,
    id: step.id || `step-${String(index + 1).padStart(STEP_ID_PAD_LENGTH, "0")}`,
  }));

export const planBrowserFlow = async (options: PlanBrowserFlowOptions): Promise<BrowserFlowPlan> => {
  const prompt = buildPlanningPrompt(options);
  const model = createPlannerModel(options);
  const response = await model.doGenerate({
    prompt: [{ role: "user", content: [{ type: "text", text: prompt }] }],
  });

  const text = response.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n");
  const parsedPlan = browserFlowPlanSchema.parse(JSON.parse(extractJsonObject(text)));

  return {
    ...parsedPlan,
    userInstruction: options.userInstruction,
    steps: normalizeSteps(parsedPlan.steps),
  };
};
