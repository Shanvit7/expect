import { useCallback, useMemo, useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import { BRANCH_COUNT, COLORS, LOCAL_BRANCH_INDEX, MENU_OPTIONS, SEARCH_PLACEHOLDER } from "./constants.js";
import { generateBranches } from "./utils/generate-branches.js";

interface LocalBranchScreenProps {
  onSelect: (branch: string) => void;
}

export const LocalBranchScreen = ({ onSelect }: LocalBranchScreenProps) => {
  const option = MENU_OPTIONS[LOCAL_BRANCH_INDEX];
  const [searchQuery, setSearchQuery] = useState("");
  const [branches] = useState(() => generateBranches(BRANCH_COUNT));
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredBranches = useMemo(() => {
    if (!searchQuery) return branches;
    const lower = searchQuery.toLowerCase();
    return branches.filter((branch) => branch.toLowerCase().includes(lower));
  }, [branches, searchQuery]);

  const handleInput = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setHighlightedIndex(0);
    },
    [],
  );

  useInput((_input, key) => {
    if (key.downArrow) {
      setHighlightedIndex((previous) => Math.min(filteredBranches.length - 1, previous + 1));
    }
    if (key.upArrow) {
      setHighlightedIndex((previous) => Math.max(0, previous - 1));
    }
    if (key.return && filteredBranches.length > 0) {
      onSelect(filteredBranches[highlightedIndex]);
    }
  });

  return (
    <Box
      flexDirection="column"
      width="100%"
      paddingX={2}
      paddingY={1}
    >
      <Text color={COLORS.TEXT}>
        <Text bold>{`${LOCAL_BRANCH_INDEX + 1}. ${option.label}`}</Text>
        <Text color={COLORS.DIM}>{` (${filteredBranches.length})`}</Text>
      </Text>

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
        {filteredBranches.map((branch, index) => (
          <Text key={index} color={index === highlightedIndex ? COLORS.SELECTION : COLORS.TEXT}>
            {index === highlightedIndex ? `➤ ${branch}` : `  ${branch}`}
          </Text>
        ))}
        {filteredBranches.length === 0 && <Text color={COLORS.DIM}>No matching branches</Text>}
      </Box>

      <Box
        marginTop={2}
        borderStyle="round"
        borderColor={COLORS.BORDER}
        paddingX={2}
      >
        <TextInput
          focus
          placeholder={SEARCH_PLACEHOLDER}
          value={searchQuery}
          onChange={handleInput}
        />
      </Box>

      <Text color={COLORS.DIM}>
        ↑/↓ to navigate · Enter to select · Esc to go back
      </Text>
    </Box>
  );
};
