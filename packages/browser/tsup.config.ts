import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/mcp.ts", "src/mcp-start.ts", "src/mcp-server.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["playwright", "@browser-tester/cookies", "@modelcontextprotocol/sdk", "zod"],
});
