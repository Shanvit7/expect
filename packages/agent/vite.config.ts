import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    deps: {
      neverBundle: ["@anthropic-ai/claude-agent-sdk"],
    },
    sourcemap: true,
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
