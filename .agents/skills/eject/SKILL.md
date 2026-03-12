# Eject — Move a Package to Its Own Repo

Eject a completed package from the monorepo into a standalone GitHub repository for launch. New repos get significantly more visibility than monorepo packages.

## When to Use

Use this skill when a tool is fully implemented, has a website page, launch video, and X strategy ready.

## Steps

1. **Pre-launch check** — Follow `rules/checklist.md`. Verify everything is in place.
2. **Create the repo** — Follow `rules/process.md`. Use `gh repo create` to create a new public repo.
3. **Copy contents** — Move package files to the new repo. Adapt package.json for standalone use.
4. **Set up CI** — Add GitHub Actions workflow for lint, build, and publish.
5. **Deploy** — Set up Vercel for the website (if applicable). Configure npm publish via changesets.
6. **Push and launch** — Push to the new repo, deploy, publish to npm.
7. **Update scratchpad** — Mark as launched.

## Output

- New public GitHub repo with the tool
- CI/CD configured (GitHub Actions)
- Deployed website (Vercel)
- Published to npm
- `scratchpad.md` updated

## Rules

- `rules/process.md` — Step-by-step eject process
- `rules/checklist.md` — Pre-launch verification checklist
