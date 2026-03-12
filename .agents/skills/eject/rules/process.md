# Eject Process

## Step-by-Step

### 1. Create the Repo

```bash
gh repo create [tool-name] --public --description "[one-liner]"
```

### 2. Initialize the Repo

```bash
git clone https://github.com/[owner]/[tool-name].git /tmp/[tool-name]
cd /tmp/[tool-name]
```

### 3. Copy Package Contents

Copy from `packages/[tool-name]/` to the new repo root:

- All `src/` files
- `package.json` (adapt for standalone — remove workspace references, add publishConfig)
- `tsconfig.json` (make standalone, don't extend root)
- `README.md`

### 4. Add Standalone Files

- `LICENSE` — Copy from monorepo root
- `.gitignore` — Standard Node.js gitignore + dist/
- `.github/workflows/ci.yml` — Lint + build + test on push/PR
- `.github/workflows/publish.yml` — Publish to npm on release
- `.changeset/config.json` — Changeset config for the standalone repo

### 5. Adapt package.json

```json
{
  "name": "[tool-name]",
  "version": "0.1.0",
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/[owner]/[tool-name].git"
  },
  "homepage": "https://[tool-name].dev"
}
```

### 6. Copy Website (if applicable)

If the tool has a landing page in `packages/website/`:

- Extract the relevant page/route
- Set up as a standalone Next.js app or static site
- Configure Vercel deployment

### 7. Push

```bash
git add .
git commit -m "initial release"
git push -u origin main
```

### 8. Deploy & Publish

- Connect to Vercel for website deployment
- Run `npx changeset` and `npx changeset publish` for npm
