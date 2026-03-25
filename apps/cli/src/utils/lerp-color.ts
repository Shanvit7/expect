const ANSI_TO_HEX: Record<string, string> = {
  black: "#000000",
  red: "#cc0000",
  green: "#4e9a06",
  yellow: "#c4a000",
  blue: "#3465a4",
  magenta: "#75507b",
  cyan: "#06989a",
  white: "#ffffff",
  gray: "#808080",
  grey: "#808080",
  blackBright: "#555555",
  redBright: "#ef2929",
  greenBright: "#8ae234",
  yellowBright: "#fce94f",
  blueBright: "#729fcf",
  magentaBright: "#ad7fa8",
  cyanBright: "#34e2e2",
  whiteBright: "#ffffff",
};

const supportsTruecolor =
  process.env["COLORTERM"] === "truecolor" || process.env["COLORTERM"] === "24bit";

const isHex = (color: string): boolean => color.startsWith("#");

const resolveToHex = (color: string): string => ANSI_TO_HEX[color] ?? color;

const parseHex = (hex: string): [number, number, number] => {
  const cleaned = hex.replace("#", "");
  return [
    parseInt(cleaned.slice(0, 2), 16),
    parseInt(cleaned.slice(2, 4), 16),
    parseInt(cleaned.slice(4, 6), 16),
  ];
};

const rgbToHex = (red: number, green: number, blue: number): string =>
  `#${[red, green, blue].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`;

const lerp = (start: number, end: number, factor: number): number => start + (end - start) * factor;

export const lerpColor = (from: string, to: string, factor: number): string => {
  if (!supportsTruecolor && !isHex(from)) {
    return factor > 0.5 ? to : from;
  }

  const [fromRed, fromGreen, fromBlue] = parseHex(resolveToHex(from));
  const [toRed, toGreen, toBlue] = parseHex(resolveToHex(to));
  return rgbToHex(
    lerp(fromRed, toRed, factor),
    lerp(fromGreen, toGreen, factor),
    lerp(fromBlue, toBlue, factor),
  );
};
