const PROTOCOL_REGEX = /^(https?|file|about|data|chrome|chrome-extension):/i;

export const normalizeUrl = (url: string): string => {
  if (PROTOCOL_REGEX.test(url)) return url;
  return `https://${url}`;
};
