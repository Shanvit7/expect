import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import { COLORS } from "./constants.js";

const STEP_INTERVAL_MS = 150;
const RESULTS = [true, true, false, true, true, true, false];

export const ColoredLogo = () => {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (revealedCount >= RESULTS.length) return;

    const timer = setTimeout(() => {
      setRevealedCount((previous) => previous + 1);
    }, STEP_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [revealedCount]);

  return (
    <Box flexDirection="row" gap={1}>
      {RESULTS.map((passed, index) => {
        if (index >= revealedCount) {
          return <Text key={index} color={COLORS.DIM}>·</Text>;
        }

        return (
          <Text key={index} color={passed ? COLORS.GREEN : COLORS.RED}>
            {passed ? "✓" : "✗"}
          </Text>
        );
      })}
    </Box>
  );
};
