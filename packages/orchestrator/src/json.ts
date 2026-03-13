export const extractJsonObject = (input: string): string => {
  const firstBraceIndex = input.indexOf("{");
  const lastBraceIndex = input.lastIndexOf("}");

  if (firstBraceIndex === -1 || lastBraceIndex === -1 || lastBraceIndex <= firstBraceIndex) {
    throw new Error("The model did not return a JSON object.");
  }

  return input.slice(firstBraceIndex, lastBraceIndex + 1);
};
