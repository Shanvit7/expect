import { Box, Text } from "ink";
import { useStdoutDimensions } from "../hooks/use-stdout-dimensions.js";
import stringWidth from "string-width";
import { useThemeContext } from "./theme-context.js";
import { STATUSBAR_BRANCH_PADDING, STATUSBAR_TRAILING_PADDING } from "../constants.js";
import { useAppStore, type Screen } from "../store.js";

interface KeyHint {
  key: string;
  label: string;
}

const SCREEN_HINTS: Record<Screen, KeyHint[]> = {
  main: [
    { key: "t", label: "theme" },
    { key: "b", label: "branch" },
    { key: "↑↓", label: "nav" },
  ],
  "switch-branch": [
    { key: "↑↓", label: "nav" },
    { key: "tab", label: "local/remote" },
    { key: "/", label: "search" },
    { key: "enter", label: "select" },
    { key: "esc", label: "back" },
  ],
  "select-commit": [
    { key: "↑↓", label: "nav" },
    { key: "enter", label: "select" },
    { key: "/", label: "search" },
    { key: "esc", label: "back" },
  ],
  "saved-flow-picker": [
    { key: "↑↓", label: "nav" },
    { key: "enter", label: "select" },
    { key: "esc", label: "back" },
  ],
  "flow-input": [
    { key: "enter", label: "submit" },
    { key: "esc", label: "back" },
  ],
  planning: [{ key: "esc", label: "cancel" }],
  "review-plan": [
    { key: "↑↓", label: "nav" },
    { key: "tab", label: "fold" },
    { key: "e", label: "edit" },
    { key: "s", label: "save" },
    { key: "a", label: "approve" },
    { key: "esc", label: "back" },
  ],
  testing: [],
  theme: [
    { key: "↑↓", label: "nav" },
    { key: "tab", label: "light/dark" },
    { key: "enter", label: "select" },
    { key: "esc", label: "cancel" },
  ],
};

const MAIN_HINTS_WITH_REUSE: KeyHint[] = [
  { key: "t", label: "theme" },
  { key: "b", label: "branch" },
  { key: "r", label: "reuse flow" },
  { key: "↑↓", label: "nav" },
];

const hintsToString = (hints: KeyHint[]): string =>
  hints.map((hint) => `${hint.key} ${hint.label}`).join("   ");

export const Modeline = () => {
  const [columns] = useStdoutDimensions();
  const { theme } = useThemeContext();
  const gitState = useAppStore((state) => state.gitState);
  const screen = useAppStore((state) => state.screen);
  const savedFlowSummaries = useAppStore((state) => state.savedFlowSummaries);

  if (!gitState) return null;

  const hints =
    screen === "main" && savedFlowSummaries.length > 0
      ? MAIN_HINTS_WITH_REUSE
      : (SCREEN_HINTS[screen] ?? []);

  const hintsString = hintsToString(hints);
  const usedWidth =
    STATUSBAR_BRANCH_PADDING +
    stringWidth(gitState.currentBranch) +
    (hints.length > 0 ? 1 + stringWidth(hintsString) : 0);
  const trailingPad = Math.max(0, columns - usedWidth - STATUSBAR_TRAILING_PADDING);

  return (
    <Box>
      <Text backgroundColor={theme.primary} color="#000000" bold>
        {" "}
        {gitState.currentBranch}{" "}
      </Text>
      <Text backgroundColor={theme.border}>
        {hints.length > 0 ? " " : ""}
        {hints.map((hint, index) => (
          <Text key={hint.key + hint.label}>
            {index > 0 ? "   " : ""}
            <Text color={theme.text} bold>
              {hint.key}
            </Text>
            <Text color={theme.textMuted}> {hint.label}</Text>
          </Text>
        ))}
        {" ".repeat(trailingPad)}
      </Text>
    </Box>
  );
};
