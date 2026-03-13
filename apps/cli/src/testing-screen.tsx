import { useEffect, useRef, useState } from "react";
import { Box, Text, useInput } from "ink";
import type { BrowserEnvironmentHints, BrowserFlowPlan, BrowserRunEvent, TestTarget } from "@browser-tester/orchestrator";
import { COLORS } from "./constants.js";
import { Spinner } from "./spinner.js";
import { executeApprovedPlan } from "./utils/browser-agent.js";

interface TestingScreenProps {
  target: TestTarget;
  plan: BrowserFlowPlan;
  environment: BrowserEnvironmentHints;
  onExit: () => void;
}

const formatRunEvent = (event: BrowserRunEvent): string | null => {
  switch (event.type) {
    case "run-started":
      return `Starting ${event.planTitle}`;
    case "step-started":
      return `→ ${event.stepId} ${event.title}`;
    case "step-completed":
      return `  ✓ ${event.stepId} ${event.summary}`;
    case "assertion-failed":
      return `  ✗ ${event.stepId} ${event.message}`;
    case "browser-log":
      return `    browser:${event.action} ${event.message}`;
    case "text":
      return event.text;
    case "error":
      return `Error: ${event.message}`;
    case "run-completed":
      return `Run ${event.status}: ${event.summary}`;
    default:
      return null;
  }
};

export const TestingScreen = ({ target, plan, environment, onExit }: TestingScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const run = async () => {
      try {
        for await (const event of executeApprovedPlan({
          target,
          plan,
          environment,
          signal: abortController.signal,
        })) {
          const line = formatRunEvent(event);
          if (line) {
            setLines((previous) => [...previous, line]);
          }
          if (abortController.signal.aborted) {
            break;
          }
        }
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === "AbortError") {
          setLines((previous) => [...previous, "Cancelled."]);
        } else {
          const errorMessage = caughtError instanceof Error ? caughtError.message : "Unknown error";
          setError(errorMessage);
        }
      } finally {
        setRunning(false);
      }
    };

    run();

    return () => {
      abortController.abort();
    };
  }, [environment, plan, target]);

  useInput((_input, key) => {
    if (key.escape) {
      abortControllerRef.current?.abort();
      onExit();
    }
  });

  return (
    <Box flexDirection="column" width="100%" paddingX={2} paddingY={1}>
      <Text bold color={COLORS.TEXT}>
        Executing browser plan
      </Text>
      <Text color={COLORS.DIM}>{target.displayName}</Text>

      <Box
        marginTop={1}
        borderStyle="single"
        borderTop
        borderBottom={false}
        borderLeft={false}
        borderRight={false}
        borderColor={COLORS.DIVIDER}
      />

      <Box flexDirection="column" marginTop={1}>
        {lines.map((line, index) => (
          <Text key={index} color={line.startsWith("  ✓") ? COLORS.GREEN : COLORS.TEXT}>
            {line}
          </Text>
        ))}
      </Box>

      {running && (
        <Box marginTop={1}>
          <Spinner message="Agent is working..." />
        </Box>
      )}

      {!running && !error && (
        <Box marginTop={1}>
          <Text color={COLORS.GREEN} bold>
            Done
          </Text>
        </Box>
      )}

      {error && (
        <Box marginTop={1}>
          <Text color={COLORS.RED}>Error: {error}</Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text color={COLORS.DIM}>Esc to {running ? "cancel" : "go back"}</Text>
      </Box>
    </Box>
  );
};
