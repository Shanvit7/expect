import { useMemo, useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import { COLORS } from "./constants.js";
import type { BrowserFlowPlan } from "@browser-tester/orchestrator";

interface PlanReviewScreenProps {
  plan: BrowserFlowPlan;
  onApprove: (plan: BrowserFlowPlan) => void;
  onChange: (plan: BrowserFlowPlan) => void;
}

export const PlanReviewScreen = ({ plan, onApprove, onChange }: PlanReviewScreenProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const selectedStep = useMemo(() => plan.steps[selectedIndex] ?? null, [plan.steps, selectedIndex]);
  const editingStep = editingIndex === null ? null : plan.steps[editingIndex] ?? null;

  useInput((input, key) => {
    if (editingStep) {
      if (key.escape) {
        setEditingIndex(null);
        setEditingValue("");
      }
      if (key.return && editingValue.trim()) {
        onChange({
          ...plan,
          steps: plan.steps.map((step, index) =>
            index === editingIndex ? { ...step, instruction: editingValue.trim() } : step,
          ),
        });
        setEditingIndex(null);
        setEditingValue("");
      }
      return;
    }

    if (key.downArrow || input === "j" || (key.ctrl && input === "n")) {
      setSelectedIndex((previous) => Math.min(plan.steps.length - 1, previous + 1));
    }
    if (key.upArrow || input === "k" || (key.ctrl && input === "p")) {
      setSelectedIndex((previous) => Math.max(0, previous - 1));
    }
    if (input === "e" && selectedStep) {
      setEditingIndex(selectedIndex);
      setEditingValue(selectedStep.instruction);
    }
    if (input === "a") {
      onApprove(plan);
    }
  });

  return (
    <Box flexDirection="column" width="100%" paddingX={2} paddingY={1}>
      <Text bold color={COLORS.TEXT}>
        Review browser plan
      </Text>
      <Text color={COLORS.DIM}>{plan.title}</Text>

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
        <Text color={COLORS.TEXT}>{plan.rationale}</Text>
        <Text color={COLORS.DIM}>Target: {plan.targetSummary}</Text>
      </Box>

      {plan.assumptions.length > 0 ? (
        <Box flexDirection="column" marginTop={1}>
          <Text color={COLORS.YELLOW}>Assumptions</Text>
          {plan.assumptions.map((assumption) => (
            <Text key={assumption} color={COLORS.DIM}>
              - {assumption}
            </Text>
          ))}
        </Box>
      ) : null}

      <Box flexDirection="column" marginTop={1}>
        {plan.steps.map((step, index) => (
          <Text key={step.id} color={index === selectedIndex ? COLORS.SELECTION : COLORS.TEXT}>
            {index === selectedIndex ? "➤" : " "} {step.id} {step.title}
          </Text>
        ))}
      </Box>

      {selectedStep ? (
        <Box
          flexDirection="column"
          marginTop={1}
          borderStyle="round"
          borderColor={COLORS.BORDER}
          paddingX={1}
        >
          <Text color={COLORS.TEXT}>Instruction: {selectedStep.instruction}</Text>
          <Text color={COLORS.DIM}>Expected: {selectedStep.expectedOutcome}</Text>
          {selectedStep.routeHint ? (
            <Text color={COLORS.DIM}>Route: {selectedStep.routeHint}</Text>
          ) : null}
        </Box>
      ) : null}

      {editingStep ? (
        <Box flexDirection="column" marginTop={1}>
          <Text color={COLORS.YELLOW}>Edit instruction for {editingStep.id}</Text>
          <Box borderStyle="round" borderColor={COLORS.BORDER} paddingX={2}>
            <TextInput focus value={editingValue} onChange={setEditingValue} />
          </Box>
          <Text color={COLORS.DIM}>Enter save · Esc cancel</Text>
        </Box>
      ) : (
        <Box marginTop={1}>
          <Text color={COLORS.DIM}>↑/↓ navigate · e edit step · a approve and run · Esc back</Text>
        </Box>
      )}
    </Box>
  );
};
