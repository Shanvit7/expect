# Pre-Launch Checklist

Verify all items before ejecting:

## Code

- [ ] Core functionality works as described in PRD
- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm format:check` passes
- [ ] `pnpm build` produces clean output
- [ ] No TODO or FIXME comments remaining (or they're documented as known issues)

## Package

- [ ] `package.json` has correct name, description, keywords, license
- [ ] `package.json` has `files` field pointing to `dist/`
- [ ] `package.json` has `main`, `types`, and optionally `module` entry points
- [ ] `package.json` has `bin` field (if CLI tool)
- [ ] npm name is available (`npm search [name]`)

## Documentation

- [ ] README has: description, install instructions, usage example, API reference, license
- [ ] README has badges (npm version, license, build status)
- [ ] LICENSE file exists (MIT)
- [ ] CHANGELOG.md exists (can be empty for v1)

## Website

- [ ] Landing page exists and renders correctly
- [ ] Meta tags are correct (title, description, OG tags)
- [ ] Page is accessible (keyboard nav, screen reader friendly)
- [ ] Responsive on mobile

## Video

- [ ] Launch video renders cleanly (8–15s)
- [ ] Video uses real product components (1:1)
- [ ] Video demonstrates the core value proposition

## Launch

- [ ] X strategy drafted (launch thread, timing)
- [ ] GitHub repo description and topics set
- [ ] Vercel deployment configured
- [ ] npm publish config ready
