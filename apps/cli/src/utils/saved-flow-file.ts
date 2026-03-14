import type {
  BrowserEnvironmentHints,
  BrowserFlowPlan,
  TestTarget,
} from "@browser-tester/supervisor";
import { z } from "zod";
import { SAVED_FLOW_FORMAT_VERSION } from "../constants.js";

export interface SavedFlowFileData {
  format_version: number;
  title: string;
  description: string;
  slug: string;
  saved_target_scope: TestTarget["scope"];
  saved_target_display_name: string;
  plan: BrowserFlowPlan;
  environment: BrowserEnvironmentHints;
}

const FLOW_FRONTMATTER_PATTERN = /^---\n([\s\S]*?)\n---/;
const FRONTMATTER_LINE_PATTERN = /^([a-z][a-z0-9_]*):\s*(.+)$/gm;

const savedFlowEnvironmentSchema: z.ZodType<BrowserEnvironmentHints> = z.object({
  baseUrl: z.string().min(1).optional(),
  headed: z.boolean().optional(),
  cookies: z.boolean().optional(),
});

const savedFlowPlanSchema: z.ZodType<BrowserFlowPlan> = z.object({
  title: z.string().min(1),
  rationale: z.string().min(1),
  targetSummary: z.string().min(1),
  userInstruction: z.string().min(1),
  assumptions: z.array(z.string().min(1)),
  riskAreas: z.array(z.string().min(1)),
  targetUrls: z.array(z.string().min(1)),
  cookieSync: z.object({
    required: z.boolean(),
    reason: z.string().min(1),
  }),
  steps: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      instruction: z.string().min(1),
      expectedOutcome: z.string().min(1),
      routeHint: z.string().min(1).optional(),
      changedFileEvidence: z.array(z.string().min(1)).optional(),
    }),
  ),
});

const savedFlowFileSchema: z.ZodType<SavedFlowFileData> = z.object({
  format_version: z.literal(SAVED_FLOW_FORMAT_VERSION),
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  saved_target_scope: z.enum(["unstaged", "branch", "commit"]),
  saved_target_display_name: z.string().min(1),
  plan: savedFlowPlanSchema,
  environment: savedFlowEnvironmentSchema,
});

export const formatSavedFlowFrontmatter = (savedFlowFileData: SavedFlowFileData): string =>
  [
    "---",
    `format_version: ${JSON.stringify(savedFlowFileData.format_version)}`,
    `title: ${JSON.stringify(savedFlowFileData.title)}`,
    `description: ${JSON.stringify(savedFlowFileData.description)}`,
    `slug: ${JSON.stringify(savedFlowFileData.slug)}`,
    `saved_target_scope: ${JSON.stringify(savedFlowFileData.saved_target_scope)}`,
    `saved_target_display_name: ${JSON.stringify(savedFlowFileData.saved_target_display_name)}`,
    `plan: ${JSON.stringify(savedFlowFileData.plan)}`,
    `environment: ${JSON.stringify(savedFlowFileData.environment)}`,
    "---",
  ].join("\n");

export const parseSavedFlowFile = (content: string): SavedFlowFileData | null => {
  const frontmatterMatch = content.match(FLOW_FRONTMATTER_PATTERN);
  if (!frontmatterMatch) return null;

  const frontmatterValues: Record<string, unknown> = {};

  for (const match of frontmatterMatch[1].matchAll(FRONTMATTER_LINE_PATTERN)) {
    const key = match[1];
    const rawValue = match[2];

    try {
      frontmatterValues[key] = JSON.parse(rawValue);
    } catch {
      return null;
    }
  }

  const parsedSavedFlow = savedFlowFileSchema.safeParse(frontmatterValues);
  if (!parsedSavedFlow.success) {
    return null;
  }

  return parsedSavedFlow.data;
};
