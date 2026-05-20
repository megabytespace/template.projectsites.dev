# AGENTS.md — scripts/

> Scoped conventions for `scripts/`. Inherits from root `AGENTS.md`.

## Purpose

`scripts/` holds Node-based developer tools that are NOT part of the runtime bundle. They run via `node scripts/<name>.mjs` or `npm run <script-name>`.

## Conventions

- **`.mjs` extension** — ESM only, no TypeScript build step needed
- **No deps beyond what's already in `package.json`** (avoid adding script-only deps)
- **Self-documenting** — every script starts with a JSDoc block that shows usage examples
- **Exit codes** — `0` success, `1` validation failure, `2` IO failure, follow the convention
- **Output** — use ANSI colors sparingly via inline escape codes; no chalk dep
- **Input** — accept positional args; offer interactive mode when no args given
- **Idempotent** — running the same command twice should produce the same result

## Current scripts

| Script | Purpose | npm shortcut |
| --- | --- | --- |
| `validate-brand.mjs` | Validates `_brand.json` against the Zod schema + soft lint | `npm run validate:brand` |
| `swap-brand.mjs` | Swap `_brand.json` for an `examples/` preset (with validation + backup) | `npm run brand:swap` |
| `og-image.mjs` | Generate `public/og-image.png` from brand colors (1200×630 branded card) | `npm run og` |

## Adding a new script

1. Create `scripts/my-script.mjs` with a JSDoc usage block at the top
2. Default to interactive mode if no args provided
3. Add to `package.json` `scripts.<short-name>` so users can run via `npm run`
4. Add a row to the table above
5. If the script writes files outside `dist/`, add a `--dry-run` flag

## What scripts MUST NOT do

- ❌ Modify files outside the repo
- ❌ Commit / push automatically
- ❌ Make network calls without consent (no auto-update checks, no telemetry)
- ❌ Require system-level deps (no `apt install`, no global Node packages)
- ❌ Print credentials / secrets to stdout

## Testing scripts

Scripts run in CI via `.github/workflows/ci.yml`. Add a test job for any script that mutates state.
