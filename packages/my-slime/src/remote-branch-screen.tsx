import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import {
  BRANCH_COUNT,
  COLORS,
  FETCH_DELAY_MS,
  MENU_OPTIONS,
  REMOTE_BRANCH_INDEX,
  REMOTE_NAME,
  SEARCH_PLACEHOLDER,
} from "./constants.js";
import { generateRemoteBranches, type RemoteBranch } from "./utils/generate-remote-branches.js";
import { Spinner } from "./spinner.js";
import { PrFilterBar, PR_FILTERS, type PrFilter } from "./pr-filter.js";

interface RemoteBranchScreenProps {
  onSelect: (branch: string) => void;
}

const PrBadge = ({ branch }: { branch: RemoteBranch }) => {
  if (!branch.prNumber || !branch.prStatus) return null;

  const colorMap = {
    open: COLORS.GREEN,
    draft: COLORS.DIM,
    merged: COLORS.PURPLE,
  } as const;

  return (
    <Text color={colorMap[branch.prStatus]}>
      {` PR #${branch.prNumber} (${branch.prStatus})`}
    </Text>
  );
};

const matchesFilter = (branch: RemoteBranch, filter: PrFilter): boolean => {
  if (filter === "all") return true;
  if (filter === "no-pr") return branch.prStatus === null;
  return branch.prStatus === filter;
};

export const RemoteBranchScreen = ({ onSelect }: RemoteBranchScreenProps) => {
  const option = MENU_OPTIONS[REMOTE_BRANCH_INDEX];
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState<RemoteBranch[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<PrFilter>("all");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBranches(generateRemoteBranches(BRANCH_COUNT));
      setIsLoading(false);
    }, FETCH_DELAY_MS);
    return () => clearTimeout(timeout);
  }, []);

  const filteredBranches = useMemo(() => {
    let result = branches.filter((branch) => matchesFilter(branch, activeFilter));
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter((branch) => branch.name.toLowerCase().includes(lower));
    }
    return result;
  }, [branches, searchQuery, activeFilter]);

  const maxBranchWidth = useMemo(
    () => Math.max(...filteredBranches.map((branch) => branch.name.length), 0),
    [filteredBranches],
  );

  const maxAuthorWidth = useMemo(
    () => Math.max(...filteredBranches.map((branch) => branch.author.length), 0),
    [filteredBranches],
  );

  const handleInput = useCallback((value: string) => {
    setSearchQuery(value);
    setHighlightedIndex(0);
  }, []);

  const cycleFilter = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = PR_FILTERS.indexOf(activeFilter);
      const nextIndex = (currentIndex + direction + PR_FILTERS.length) % PR_FILTERS.length;
      setActiveFilter(PR_FILTERS[nextIndex]);
      setHighlightedIndex(0);
    },
    [activeFilter],
  );

  useInput((_input, key) => {
    if (isLoading) return;
    if (key.downArrow) {
      setHighlightedIndex((previous) => Math.min(filteredBranches.length - 1, previous + 1));
    }
    if (key.upArrow) {
      setHighlightedIndex((previous) => Math.max(0, previous - 1));
    }
    if (key.tab || key.rightArrow) {
      cycleFilter(1);
    }
    if (key.shift && key.tab) {
      cycleFilter(-1);
    }
    if (key.leftArrow) {
      cycleFilter(-1);
    }
    if (key.return && filteredBranches.length > 0) {
      onSelect(filteredBranches[highlightedIndex].name);
    }
  });

  return (
    <Box
      flexDirection="column"
      width="100%"
      paddingX={2}
      paddingY={1}
    >
      <Box flexDirection="row" justifyContent="space-between" width="100%">
        <Text color={COLORS.TEXT}>
          <Text bold>{`${REMOTE_BRANCH_INDEX + 1}. ${option.label}`}</Text>
        </Text>
        <Text color={COLORS.DIM}>{REMOTE_NAME}</Text>
      </Box>

      <Box
        marginTop={1}
        borderStyle="single"
        borderTop
        borderBottom={false}
        borderLeft={false}
        borderRight={false}
        borderColor={COLORS.DIVIDER}
      />

      {isLoading ? (
        <Box marginTop={1}>
          <Spinner message={`fetching remote branches from ${REMOTE_NAME}`} />
        </Box>
      ) : (
        <Box flexDirection="column" marginTop={1}>
          <PrFilterBar activeFilter={activeFilter} />

          <Box flexDirection="column" marginTop={1}>
            {filteredBranches.map((branch, index) => (
              <Text key={index} color={index === highlightedIndex ? COLORS.SELECTION : COLORS.TEXT}>
                {index === highlightedIndex ? "➤ " : "  "}
                {branch.name.padEnd(maxBranchWidth + 2)}
                <Text color={COLORS.YELLOW}>{branch.author.padEnd(maxAuthorWidth + 2)}</Text>
                <PrBadge branch={branch} />
              </Text>
            ))}
            {filteredBranches.length === 0 && <Text color={COLORS.DIM}>No matching branches</Text>}
          </Box>
        </Box>
      )}

      {!isLoading && (
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
      )}

      <Text color={COLORS.DIM}>
        {isLoading ? "Esc to go back" : "↑/↓ navigate · ←/→ filter · Enter select · Esc back"}
      </Text>
    </Box>
  );
};
