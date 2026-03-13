import { Text } from "ink";
import { COLORS, NUMBER_OPTION_GAP, SELECTED_INDICATOR } from "./constants.js";

interface MenuItemProps {
  index: number;
  label: string;
  detail: string;
  isSelected: boolean;
}

export const MenuItem = ({ index, label, detail, isSelected }: MenuItemProps) => {
  const number = `${index + 1}`;

  if (isSelected && index === 0) {
    return (
      <Text color={COLORS.TEXT}>
        <Text color={COLORS.SELECTION}>{SELECTED_INDICATOR} </Text>
        <Text>{number}{NUMBER_OPTION_GAP}</Text>
        <Text color={COLORS.SELECTION}>{label}</Text>
        <Text color={COLORS.TEXT}> [ </Text>
        <Text color={COLORS.GREEN}>+44</Text>
        <Text color={COLORS.TEXT}> </Text>
        <Text color={COLORS.RED}>-23</Text>
        <Text color={COLORS.TEXT}> · 2 files ]</Text>
      </Text>
    );
  }

  return (
    <Text color={COLORS.TEXT}>
      <Text color={isSelected ? COLORS.SELECTION : COLORS.TEXT}>
        {isSelected ? `${SELECTED_INDICATOR} ` : "  "}
      </Text>
      <Text>{number}{NUMBER_OPTION_GAP}</Text>
      <Text color={isSelected ? COLORS.SELECTION : COLORS.TEXT}>{label}</Text>
      {isSelected && detail ? <Text color={COLORS.DIM}> {detail}</Text> : null}
    </Text>
  );
};
