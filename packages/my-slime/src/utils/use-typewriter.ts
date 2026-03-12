import { useEffect, useRef, useState } from "react";

interface TypewriterChar {
  char: string;
  color: string;
}

const CHAR_STAGGER = 2;

const getMaxProgress = (textLength: number, shadeCount: number): number =>
  Math.max(0, (textLength - 1) * CHAR_STAGGER + shadeCount - 1);

export const useTypewriter = (
  text: string,
  shadeColors: readonly string[],
  tickIntervalMs: number,
): TypewriterChar[] => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"in" | "out" | "idle">("in");
  const [displayText, setDisplayText] = useState(text);
  const pendingTextRef = useRef(text);

  useEffect(() => {
    if (text === pendingTextRef.current) return;
    pendingTextRef.current = text;
    if (phase === "idle") {
      setPhase("out");
    }
  }, [text, phase]);

  useEffect(() => {
    if (phase === "idle") return;

    const maxProgress = getMaxProgress(displayText.length, shadeColors.length);

    const interval = setInterval(() => {
      setProgress((previous) => {
        if (phase === "in") {
          return Math.min(maxProgress, previous + 1);
        }
        return Math.max(0, previous - 2);
      });
    }, tickIntervalMs);

    return () => clearInterval(interval);
  }, [phase, displayText, tickIntervalMs, shadeColors.length]);

  useEffect(() => {
    const maxProgress = getMaxProgress(displayText.length, shadeColors.length);
    if (phase === "in" && progress >= maxProgress) {
      setPhase("idle");
    }
    if (phase === "out" && progress <= 0) {
      setDisplayText(pendingTextRef.current);
      setPhase("in");
    }
  }, [phase, progress, displayText, shadeColors.length]);

  const chars: TypewriterChar[] = [];
  for (let index = 0; index < displayText.length; index++) {
    const charProgress = progress - index * CHAR_STAGGER;
    if (charProgress < 0) break;
    const shadeIndex = Math.min(shadeColors.length - 1, charProgress);
    chars.push({ char: displayText[index], color: shadeColors[shadeIndex] });
  }

  return chars;
};

export type { TypewriterChar };
