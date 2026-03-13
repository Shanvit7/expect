import { Box, Text } from "ink";
import { COLORS } from "./constants.js";
import { Spinner } from "./spinner.js";

interface PlanningScreenProps {
  userInstruction: string;
}

export const PlanningScreen = ({ userInstruction }: PlanningScreenProps) => (
  <Box flexDirection="column" width="100%" paddingX={2} paddingY={1}>
    <Text bold color={COLORS.TEXT}>
      Generating browser plan
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
    <Box marginTop={1}>
      <Text color={COLORS.DIM}>{userInstruction}</Text>
    </Box>
    <Box marginTop={1}>
      <Spinner message="Planning with scope-aware git context..." />
    </Box>
  </Box>
);
