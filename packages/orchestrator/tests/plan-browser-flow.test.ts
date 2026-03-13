import { describe, expect, it } from "vitest";
import type { LanguageModelV3, LanguageModelV3CallOptions } from "@ai-sdk/provider";
import { planBrowserFlow } from "../src/plan-browser-flow.js";
import type { TestTarget } from "../src/types.js";

const createPlannerModel = (
  callback: (options: LanguageModelV3CallOptions) => void,
): LanguageModelV3 => ({
  specificationVersion: "v3",
  provider: "test",
  modelId: "planner",
  supportedUrls: {},
  async doGenerate(options) {
    callback(options);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            title: "Onboarding import regression plan",
            rationale: "The changes affect onboarding and project import behavior.",
            targetSummary: "Exercise the onboarding import flow.",
            assumptions: ["The user can access onboarding."],
            riskAreas: ["Project import", "Onboarding progression"],
            targetUrls: ["/onboarding"],
            steps: [
              {
                title: "Open onboarding",
                instruction: "Navigate to onboarding.",
                expectedOutcome: "The onboarding screen loads.",
                routeHint: "/onboarding",
                changedFileEvidence: ["src/onboarding.tsx"],
              },
            ],
          }),
        },
      ],
      finishReason: { unified: "stop", raw: undefined },
      usage: {
        inputTokens: { total: undefined, noCache: undefined, cacheRead: undefined, cacheWrite: undefined },
        outputTokens: { total: undefined, text: undefined, reasoning: undefined },
      },
      warnings: [],
      request: { body: "" },
      response: {
        id: "response-id",
        timestamp: new Date(),
        modelId: "planner",
      },
    };
  },
  async doStream() {
    throw new Error("doStream not implemented for planner tests");
  },
});

const baseTarget: TestTarget = {
  scope: "branch",
  cwd: "/tmp/repo",
  branch: {
    current: "feature/onboarding",
    main: "main",
  },
  displayName: "branch feature/onboarding",
  diffStats: {
    additions: 12,
    deletions: 3,
    filesChanged: 4,
  },
  branchDiffStats: {
    additions: 12,
    deletions: 3,
    filesChanged: 4,
  },
  changedFiles: [
    { status: "M", path: "src/onboarding.tsx" },
    { status: "A", path: "src/import-projects.tsx" },
  ],
  recentCommits: [{ hash: "abc123", shortHash: "abc123", subject: "Improve onboarding flow" }],
  diffPreview: "src/onboarding.tsx | 4 ++--",
};

describe("planBrowserFlow", () => {
  it("builds a scope-aware planning prompt and normalizes step ids", async () => {
    let promptText = "";

    const plan = await planBrowserFlow({
      target: baseTarget,
      userInstruction:
        "Go through onboarding at /onboarding and click Import Projects after selecting a workspace.",
      environment: {
        baseUrl: "http://localhost:3000",
        cookies: true,
        headed: true,
      },
      model: createPlannerModel((options) => {
        promptText =
          options.prompt[0].role === "user" && options.prompt[0].content[0].type === "text"
            ? options.prompt[0].content[0].text
            : "";
      }),
    });

    expect(promptText).toContain("Scope: branch");
    expect(promptText).toContain("Go through onboarding at /onboarding");
    expect(promptText).toContain("src/onboarding.tsx");
    expect(promptText).toContain("Base URL: http://localhost:3000");
    expect(plan.steps[0].id).toBe("step-01");
    expect(plan.userInstruction).toContain("Import Projects");
  });
});
