export interface Colors {
  TEXT: string;
  DIM: string;
  GREEN: string;
  PRIMARY: string;
  SELECTION: string;
  RED: string;
  BORDER: string;
  DIVIDER: string;
  YELLOW: string;
  PURPLE: string;
  CYAN: string;
}

export const theme = {
  primary: "white",
  secondary: "gray",
  accent: "white",
  error: "red",
  warning: "yellow",
  success: "green",
  info: "gray",
  text: "white",
  textMuted: "gray",
  border: "gray",
  borderActive: "white",
  borderSubtle: "blackBright",
  shimmerBase: "#555555",
  shimmerHighlight: "#ffffff",
};

export const COLORS: Colors = {
  TEXT: theme.text,
  DIM: theme.textMuted,
  GREEN: theme.success,
  PRIMARY: theme.primary,
  SELECTION: theme.accent,
  RED: theme.error,
  BORDER: theme.border,
  DIVIDER: theme.borderSubtle,
  YELLOW: theme.warning,
  PURPLE: theme.secondary,
  CYAN: theme.info,
};

export const useColors = (): Colors => COLORS;
