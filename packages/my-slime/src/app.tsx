import { useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import {
  COLORS,
  CURRENT_BRANCH_INDEX,
  LOCAL_BRANCH_INDEX,
  MENU_OPTIONS,
  NUMBER_OPTION_GAP,
  PROMPT_TEXT,
  REMOTE_BRANCH_INDEX,
  SOMETHING_ELSE_INDEX,
  TYPEWRITER_SHADES,
  TYPEWRITER_TICK_MS,
} from "./constants.js";
import { useTypewriter } from "./utils/use-typewriter.js";
import { MenuItem } from "./menu-item.js";
import { LocalBranchScreen } from "./local-branch-screen.js";
import { RemoteBranchScreen } from "./remote-branch-screen.js";
import { ColoredLogo } from "./colored-logo.js";

type Screen = "main" | "local-branch" | "remote-branch";

export const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [screen, setScreen] = useState<Screen>("main");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedRemoteBranch, setSelectedRemoteBranch] = useState<string | null>(null);
  const [somethingElseValue, setSomethingElseValue] = useState("");
  const [includeUnstaged, setIncludeUnstaged] = useState(false);

  const promptChars = useTypewriter(PROMPT_TEXT, TYPEWRITER_SHADES, TYPEWRITER_TICK_MS);

  useInput((input, key) => {
    if (screen !== "main") {
      if (key.escape) {
        setScreen("main");
      }
      return;
    }

    if (key.downArrow) {
      setSelectedIndex((previous) => Math.min(MENU_OPTIONS.length - 1, previous + 1));
    }
    if (key.upArrow) {
      setSelectedIndex((previous) => Math.max(0, previous - 1));
    }

    if (selectedIndex === SOMETHING_ELSE_INDEX) return;

    if (input === "k") {
      setSelectedIndex((previous) => Math.max(0, previous - 1));
    }
    if (input === "j") {
      setSelectedIndex((previous) => Math.min(MENU_OPTIONS.length - 1, previous + 1));
    }
    const numberPressed = Number(input);
    if (numberPressed >= 1 && numberPressed <= MENU_OPTIONS.length) {
      setSelectedIndex(numberPressed - 1);
    }
    if (selectedIndex === CURRENT_BRANCH_INDEX && input === " ") {
      setIncludeUnstaged((previous) => !previous);
    }
    if (key.return) {
      if (selectedIndex === LOCAL_BRANCH_INDEX) {
        setScreen("local-branch");
      }
      if (selectedIndex === REMOTE_BRANCH_INDEX) {
        setScreen("remote-branch");
      }
    }
  });

  const handleLocalBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
    setScreen("main");
  };

  const handleRemoteBranchSelect = (branch: string) => {
    setSelectedRemoteBranch(branch);
    setScreen("main");
  };

  if (screen === "local-branch") {
    return <LocalBranchScreen onSelect={handleLocalBranchSelect} />;
  }

  if (screen === "remote-branch") {
    return <RemoteBranchScreen onSelect={handleRemoteBranchSelect} />;
  }

  return (
    <Box
      flexDirection="column"
      width="100%"
      paddingX={2}
      paddingY={1}
    >
      <ColoredLogo />

      <Box flexDirection="row" marginTop={2} alignItems="flex-end">
        <Text color={COLORS.ORANGE}>{"(•‿•)"}</Text>
        <Box flexDirection="column" marginLeft={1}>
          <Box
            borderStyle="round"
            borderColor={COLORS.ORANGE}
            paddingX={1}
          >
            <Text>
              {promptChars.map((charState, index) => (
                <Text key={index} color={charState.color}>{charState.char}</Text>
              ))}
            </Text>
          </Box>
          <Text color={COLORS.ORANGE}>{"──╯"}</Text>
        </Box>
      </Box>

      <Box flexDirection="column" marginTop={2} gap={1}>
        {MENU_OPTIONS.map((option, index) => {
          let detail: string = option.detail;
          if (index === LOCAL_BRANCH_INDEX && selectedBranch) {
            detail = `(${selectedBranch})`;
          }
          if (index === REMOTE_BRANCH_INDEX && selectedRemoteBranch) {
            detail = `(${selectedRemoteBranch})`;
          }
          return (
            <Box key={index} flexDirection="column" gap={"separated" in option ? 0 : 1}>
              {"separated" in option && option.separated && (
                <Box
                  borderStyle="single"
                  borderTop
                  borderBottom={false}
                  borderLeft={false}
                  borderRight={false}
                  borderColor={COLORS.DIVIDER}
                />
              )}
              {index === SOMETHING_ELSE_INDEX ? (
                <Box flexDirection="row">
                  <Text color={index === selectedIndex ? COLORS.SELECTION : COLORS.TEXT}>
                    {index === selectedIndex ? `➤ ${index + 1}${NUMBER_OPTION_GAP}` : `  ${index + 1}${NUMBER_OPTION_GAP}`}
                  </Text>
                  <TextInput
                    focus={index === selectedIndex}
                    placeholder={option.label}
                    value={somethingElseValue}
                    onChange={setSomethingElseValue}
                  />
                </Box>
              ) : (
                <Box flexDirection="column">
                  <MenuItem
                    index={index}
                    label={option.label}
                    detail={detail}
                    isSelected={index === selectedIndex}
                  />
                  {index === CURRENT_BRANCH_INDEX && index === selectedIndex && (
                    <Text color={COLORS.DIM}>
                      {"     "}
                      <Text color={includeUnstaged ? COLORS.GREEN : COLORS.DIM}>
                        {includeUnstaged ? "[" : "[ ]"}
                      </Text>
                      {includeUnstaged && <Text color={COLORS.WHITE}>{"x"}</Text>}
                      {includeUnstaged && <Text color={COLORS.GREEN}>{"]"}</Text>}
                      <Text> include unstaged changes </Text>
                      <Text color={COLORS.DIM}>(space to toggle)</Text>
                    </Text>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      <Box
        marginTop={2}
        borderStyle="single"
        borderTop
        borderBottom={false}
        borderLeft={false}
        borderRight={false}
        borderColor={COLORS.DIVIDER}
      />

      <Text color={COLORS.DIM}>
        ↑/↓ to navigate · Enter to select
      </Text>
    </Box>
  );
};
