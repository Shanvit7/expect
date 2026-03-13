import { homedir, platform } from "node:os";
import path from "node:path";
import { execCommand, isRecord } from "@browser-tester/utils";
import {
  BUNDLE_ID_TO_BROWSER,
  DARWIN_LAUNCH_SERVICES_PLIST,
  DESKTOP_FILE_TO_BROWSER,
  PROG_ID_PREFIX_TO_BROWSER,
  WINDOWS_HTTPS_REGISTRY_PATH,
} from "../constants.js";
import type { Browser } from "../types.js";

const detectDarwin = (): Browser | null => {
  const plistPath = path.join(homedir(), DARWIN_LAUNCH_SERVICES_PLIST);
  const output = execCommand(`plutil -convert json -o - "${plistPath}"`);
  if (!output) return null;

  try {
    const parsed: unknown = JSON.parse(output);
    if (!isRecord(parsed)) return null;

    const handlers = parsed["LSHandlers"];
    if (!Array.isArray(handlers)) return null;

    const bundleId = handlers.find(
      (handler): handler is Record<string, unknown> =>
        isRecord(handler) &&
        typeof handler["LSHandlerURLScheme"] === "string" &&
        handler["LSHandlerURLScheme"].toLowerCase() === "https"
    )?.["LSHandlerRoleAll"];

    return typeof bundleId === "string"
      ? (BUNDLE_ID_TO_BROWSER[bundleId.toLowerCase()] ?? null)
      : null;
  } catch {
    return null;
  }
};

const detectLinux = (): Browser | null => {
  const output = execCommand("xdg-settings get default-web-browser");
  if (!output) return null;
  return (
    DESKTOP_FILE_TO_BROWSER[output.replace(/\.desktop$/i, "").toLowerCase()] ??
    null
  );
};

const detectWindows = (): Browser | null => {
  const output = execCommand(
    `reg query "${WINDOWS_HTTPS_REGISTRY_PATH}" /v ProgId`
  );
  const progId = output?.match(/ProgId\s+REG_SZ\s+(\S+)/)?.[1];
  if (!progId) return null;

  return (
    Object.entries(PROG_ID_PREFIX_TO_BROWSER).find(([prefix]) =>
      progId.startsWith(prefix)
    )?.[1] ?? null
  );
};

const PLATFORM_DETECTORS: Record<string, () => Browser | null> = {
  darwin: detectDarwin,
  linux: detectLinux,
  win32: detectWindows,
};

export const detectDefaultBrowser = (): Browser | null =>
  PLATFORM_DETECTORS[platform()]?.() ?? null;
