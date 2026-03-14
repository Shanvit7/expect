import { readFile } from "node:fs/promises";
import type { BrowserEnvironmentHints, BrowserFlowPlan } from "@browser-tester/supervisor";
import type { SavedFlowSummary } from "./list-saved-flows.js";
import { listSavedFlows } from "./list-saved-flows.js";
import { parseSavedFlowFile } from "./saved-flow-file.js";

export interface LoadedSavedFlow extends SavedFlowSummary {
  plan: BrowserFlowPlan;
  environment: BrowserEnvironmentHints;
}

export const loadSavedFlow = async (filePath: string): Promise<LoadedSavedFlow> => {
  const fileContent = await readFile(filePath, "utf8");
  const savedFlowFileData = parseSavedFlowFile(fileContent);
  if (!savedFlowFileData) throw new Error("Saved flow file is invalid.");

  return {
    title: savedFlowFileData.title,
    description: savedFlowFileData.description,
    slug: savedFlowFileData.slug,
    filePath,
    savedTargetScope: savedFlowFileData.saved_target_scope,
    savedTargetDisplayName: savedFlowFileData.saved_target_display_name,
    environment: savedFlowFileData.environment,
    plan: savedFlowFileData.plan,
  };
};

export const loadSavedFlowBySlug = async (slug: string): Promise<LoadedSavedFlow | null> => {
  const savedFlows = await listSavedFlows();
  const matchingFlow = savedFlows.find((flow) => flow.slug === slug);
  if (!matchingFlow) return null;
  return loadSavedFlow(matchingFlow.filePath);
};
