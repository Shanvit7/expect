# browser-tester-cli

Browser automation CLI using ARIA snapshots and element refs.

## Install

```bash
bun install
bun run build
```

## Quick Start

```bash
# Take a snapshot
bun ./dist/cli.js snapshot example.com

# Snapshot with filters
bun ./dist/cli.js snapshot example.com -i -c       # interactive + compact
bun ./dist/cli.js snapshot example.com -s "#main"   # scoped to selector
bun ./dist/cli.js snapshot example.com --cursor      # include cursor-interactive elements

# Interact by ref
bun ./dist/cli.js click example.com e2
bun ./dist/cli.js fill example.com e3 "test@example.com"
bun ./dist/cli.js type example.com e3 "hello"
bun ./dist/cli.js select example.com e4 "option-value"
bun ./dist/cli.js hover example.com e5

# Screenshots
bun ./dist/cli.js screenshot example.com page.png
bun ./dist/cli.js screenshot example.com page.png --annotate   # numbered labels on elements

# Diff two snapshots
bun ./dist/cli.js diff before.txt after.txt
```

## Commands

| Command      | Usage                        | Description                      |
| ------------ | ---------------------------- | -------------------------------- |
| `snapshot`   | `snapshot <url>`             | Take an ARIA snapshot            |
| `click`      | `click <url> <ref>`          | Click an element by ref          |
| `fill`       | `fill <url> <ref> <value>`   | Clear and fill an input by ref   |
| `type`       | `type <url> <ref> <text>`    | Type text keystroke-by-keystroke |
| `select`     | `select <url> <ref> <value>` | Select a dropdown option         |
| `hover`      | `hover <url> <ref>`          | Hover over an element            |
| `screenshot` | `screenshot <url> <path>`    | Save a screenshot (.png, .jpg)   |
| `diff`       | `diff <before> <after>`      | Diff two snapshot text files     |

## Snapshot Options

| Flag                   | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| `-i, --interactive`    | Only interactive elements (buttons, links, inputs)                      |
| `-c, --compact`        | Remove empty structural elements                                        |
| `-d, --max-depth <n>`  | Limit tree depth                                                        |
| `-s, --selector <css>` | Scope to a CSS selector                                                 |
| `--cursor`             | Include cursor-interactive elements (cursor:pointer, onclick, tabindex) |

## Shared Options

Available on all commands:

| Flag                       | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| `-t, --timeout <ms>`       | Snapshot timeout in milliseconds                         |
| `--headed`                 | Show the browser window                                  |
| `--cookies`                | Inject cookies from local browsers                       |
| `--executable-path <path>` | Custom browser executable                                |
| `--json`                   | Output as structured JSON                                |
| `--wait-until <state>`     | Wait strategy: `load`, `domcontentloaded`, `networkidle` |
| `--video <path>`           | Record video and save to path (.webm)                    |
| `--diff`                   | Show before/after diff on action commands                |
| `--content-boundaries`     | Wrap output in boundary markers for LLM safety           |
| `--max-output <chars>`     | Truncate output to N characters                          |

## URL Handling

URLs without a protocol are automatically prefixed with `https://`:

```bash
bun ./dist/cli.js snapshot example.com        # -> https://example.com
bun ./dist/cli.js snapshot http://localhost:3000  # kept as-is
```

## JSON Output

Use `--json` on any command for machine-readable output:

```bash
bun ./dist/cli.js snapshot example.com --json
```

```json
{
  "tree": "- heading \"Example Domain\" [ref=e1]\n- link \"More information...\" [ref=e2]",
  "refs": {
    "e1": { "role": "heading", "name": "Example Domain" },
    "e2": { "role": "link", "name": "More information..." }
  },
  "stats": {
    "lines": 2,
    "characters": 78,
    "estimatedTokens": 20,
    "totalRefs": 2,
    "interactiveRefs": 1
  }
}
```

## Annotated Screenshots

Overlay numbered labels on interactive elements:

```bash
bun ./dist/cli.js screenshot example.com page.png --annotate
# Annotated screenshot saved to page.png
#   [1] @e1 heading "Example Domain"
#   [2] @e2 link "More information..."
```

## Diffing

Show what changed between two snapshots:

```bash
# Save snapshots, then diff
bun ./dist/cli.js snapshot example.com > before.txt
# ... page changes ...
bun ./dist/cli.js snapshot example.com > after.txt
bun ./dist/cli.js diff before.txt after.txt
```

Or use `--diff` on action commands to see changes inline:

```bash
bun ./dist/cli.js click example.com e2 --diff
```

## Video Recording

Record the browser session as a .webm video:

```bash
bun ./dist/cli.js click example.com e2 --video recording.webm
# Video saved to recording.webm
```
