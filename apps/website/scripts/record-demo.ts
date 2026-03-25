import { chromium } from "playwright";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RUNTIME_SCRIPT_PATH = join(
  __dirname,
  "..",
  "..",
  "..",
  "packages",
  "browser",
  "src",
  "generated",
  "runtime-script.ts",
);
const RUNTIME_MODULE = readFileSync(RUNTIME_SCRIPT_PATH, "utf-8");
const exportPrefix = "export const RUNTIME_SCRIPT =\n  ";
if (!RUNTIME_MODULE.startsWith(exportPrefix))
  throw new Error("Failed to parse RUNTIME_SCRIPT from generated file");
const RUNTIME_SCRIPT: string = new Function(
  `return ${RUNTIME_MODULE.slice(exportPrefix.length)}`,
)();

const TARGET_URL = process.argv[2] ?? "https://expect.dev";
const OUTPUT_PATH = join(__dirname, "..", "lib", "recorded-demo-events.json");
const POLL_INTERVAL_MS = 500;

const waitForEnter = (prompt: string): Promise<void> => {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    readline.question(prompt, () => {
      readline.close();
      resolve();
    });
  });
};

const run = async () => {
  console.log(`Recording rrweb events from: ${TARGET_URL}`);
  console.log(`Output: ${OUTPUT_PATH}\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  await context.addInitScript(RUNTIME_SCRIPT);

  const page = await context.newPage();
  await page.goto(TARGET_URL, { waitUntil: "load" });

  await page.evaluate(() => {
    const runtime = Reflect.get(globalThis, "__EXPECT_RUNTIME__");
    if (runtime?.startRecording) runtime.startRecording();
  });

  console.log("Recording started. Interact with the browser.");
  console.log("Press Enter when done to save the events.\n");

  const allEvents: unknown[] = [];
  const pollTimer = setInterval(async () => {
    try {
      const events = await page.evaluate(() => {
        const runtime = Reflect.get(globalThis, "__EXPECT_RUNTIME__");
        return runtime?.getEvents?.() ?? [];
      });
      if (Array.isArray(events) && events.length > 0) {
        allEvents.push(...events);
        process.stdout.write(`\r  Collected ${allEvents.length} events so far...`);
      }
    } catch {
      // page might be navigating
    }
  }, POLL_INTERVAL_MS);

  await waitForEnter("");

  clearInterval(pollTimer);

  try {
    const finalEvents = await page.evaluate(() => {
      const runtime = Reflect.get(globalThis, "__EXPECT_RUNTIME__");
      runtime?.stopRecording?.();
      return runtime?.getAllEvents?.() ?? [];
    });
    if (Array.isArray(finalEvents) && finalEvents.length > 0) {
      allEvents.push(...finalEvents);
    }
  } catch {
    // page already closed
  }

  await browser.close();

  console.log(`\n\nTotal events captured: ${allEvents.length}`);

  if (allEvents.length === 0) {
    console.log("No events recorded. Exiting.");
    return;
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(allEvents, undefined, 2));
  console.log(`Saved to: ${OUTPUT_PATH}`);
};

run().catch((error) => {
  console.error("Recording failed:", error);
  process.exit(1);
});
