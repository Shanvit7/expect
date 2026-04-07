---
"@expect/agent": minor
---

Add Pi coding agent support (`-a pi`)

Pi (`pi` / `omegon` binary) can now be used as the agent backend for browser test runs.

- Detects `pi` and `omegon` binaries via PATH
- Reads `~/.pi/agent/auth.json` to verify authentication before running
- Uses the `pi-acp` adapter package for ACP communication
- Per-adapter inactivity timeout: pi's extended-thinking mode silently reasons for several minutes before emitting output, so its inactivity window is raised to 10 minutes (vs the default 3 minutes for other agents)

```bash
expect -a pi -m "smoke test the homepage" -u http://localhost:3000
```
