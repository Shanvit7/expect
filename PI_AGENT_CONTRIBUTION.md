# Pi Agent Support — Contribution Proposal

## Overview

This document describes the implementation of [Pi](https://github.com/mariozechner/pi-coding-agent) (`pi` / `omegon`) as a supported agent backend for `expect`, alongside the existing claude, codex, copilot, gemini, cursor, opencode, and droid backends.

The work is **complete, tested, and ready to merge**.

- **Branch:** https://github.com/Shanvit7/expect/tree/feat/pi-agent-support-pr  
- **Draft PR:** https://github.com/Shanvit7/expect/pull/1  
- **Upstream Issue:** https://github.com/millionco/expect/issues/87

> PR creation is restricted to collaborators on `millionco/expect`. This document serves as a full description of the change for maintainer review.

---

## What is Pi?

Pi is a terminal coding agent (distributed as `pi` / `omegon`) that supports the Agent Client Protocol (ACP). It uses extended thinking to reason deeply before emitting output — similar in capability to Claude Code but with a different model routing and provider setup.

Install: `npm install -g @mariozechner/pi-coding-agent`

---

## Usage

```bash
# explicit mission
expect -a pi -m "smoke test the homepage" -u http://localhost:3000

# auto-generate plan from git diff
expect -a pi -u http://localhost:3000
```

---

## Files Changed

| File | Change |
|------|--------|
| `packages/agent/src/detect-agents.ts` | Registers `pi` with binaries `["pi", "omegon"]` and skill dir `.pi/skills` |
| `packages/agent/src/acp-client.ts` | Adds `AcpAdapter.layerPi` — auth check, adapter resolution, per-adapter timeout |
| `packages/agent/src/agent.ts` | Wires `Agent.layerPi`, adds `"pi"` to `AgentBackend` union |
| `packages/shared/src/models.ts` | Adds `"pi"` to `AgentProvider` literals and display names |
| `packages/shared/src/launched-from.ts` | Adds `PI_CODING_AGENT_DIR` env var for auto-detection |
| `apps/cli/src/data/config-options.ts` | Adds `pi: []` to `agentConfigOptionsAtom` record |
| `apps/cli/src/stores/use-preferences.ts` | Adds `pi: undefined` to `modelPreferences` record |
| `.changeset/pi-agent-support.md` | Changeset for `@expect/agent` minor bump |

**3 commits · 8 files · ~160 lines added**

---

## Design Decisions

### Auth check

Pi stores provider credentials at `~/.pi/agent/auth.json`. The adapter reads and validates this file at layer construction time — same pattern used by other agents (claude checks for `ANTHROPIC_API_KEY`, droid checks `FACTORY_API_KEY`, etc.).

```ts
// ~/.pi/agent/auth.json must exist and be a non-empty object
const auth = yield* fileSystem.readFileString(authPath).pipe(
  Effect.flatMap(Schema.decodeEffect(Schema.fromJsonString(Schema.Record(...)))),
  Effect.flatMap((auth) =>
    Object.keys(auth).length > 0
      ? Effect.void
      : new AcpProviderUnauthenticatedError({ provider: "pi" }).asEffect(),
  ),
);
```

### Per-adapter inactivity timeout

All existing agents stream tokens quickly and fire within 3 minutes. Pi uses extended thinking — it can silently reason for several minutes before emitting its first output token, causing the existing 180s inactivity watchdog to fire prematurely.

The fix adds an optional `inactivityTimeoutMs` field to `AcpAdapter`. Existing adapters don't set it so they get the unchanged 3-minute default. Pi is set to 10 minutes.

```ts
// Fully backwards-compatible — existing adapters unaffected
const inactivityTimeoutMs = adapter.inactivityTimeoutMs ?? ACP_STREAM_INACTIVITY_TIMEOUT_MS;
```

### Runtime dependency

Uses the published `pi-acp` npm package (`^0.0.24`) loaded via `require.resolve` at runtime — identical to how `@zed-industries/codex-acp` and other adapters are loaded. No bundling changes needed.

---

## Test Results

### Unit tests

```
Test Files  2 passed (2)
Tests       38 passed (38)
Duration    4.26s
```

Covers:
- `detect-agents.test.ts` — detects `pi` via `pi` binary, detects via `omegon` fallback
- `acp-adapter.test.ts` — `layerPi` resolves adapter, correct unauthenticated/not-installed error messages

### Live integration

Ran against a real Next.js project (`testmu-ai-nextjs`) with staged git changes and no `-m` flag — plan generated entirely from the diff.

```
Tests  8 passed | 7 failed (15 steps)
Time   3m 53s
```

Pi read the diff across `page.tsx`, `api.ts`, `layout.tsx`, `providers.tsx`, `use-submit-task.ts` and generated a 15-step test plan covering form validation, API error handling, env guards, MIME type checks, accessibility, font loading, and performance. The 7 failures were genuine app bugs (whitespace-only form submission, raw HTML error messages, missing `aria-live`, font-family override in globals.css) — not test infra issues.

A session replay was generated at `http://localhost:52197/replay`.

### `pnpm check`

```
Tasks:    7 successful, 7 total
```

Format, lint, and type checks all pass across all 8 packages.

---

## Checklist

- [x] Follows existing agent adapter pattern exactly (no new abstractions)
- [x] `pnpm check` passes (format + lint + typecheck)
- [x] Unit tests pass (38 tests)
- [x] Live integration tested against a real Next.js project
- [x] Changeset added (`@expect/agent` minor bump)
- [x] `pi-acp` is published on npm (`pi-acp@0.0.24`)
- [x] No existing agent functionality affected (all changes are additive)
- [x] Per-adapter timeout is backwards-compatible (existing agents unchanged)
