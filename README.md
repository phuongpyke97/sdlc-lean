# SDLC Lean Workflow

Professional Lean Developer Workflow framework for AI-assisted software teams.

Use this repo as a reusable SDLC template for:

- new feature delivery
- bug fixing
- small API/business logic edits
- refactor/modification work
- AI-agent assisted development with Graphify impact search

## Core principle

Every change must be small, traceable, reviewed, tested, and reported.

## 6-step workflow

1. **Clarify** — classify work type and ask 1-3 focused questions.
2. **Search with Graphify** — locate related code, APIs, functions, dependencies.
3. **Impact plan** — list files, side effects, tests, risk, rollback.
4. **Approval gate** — stop before editing; wait for approval.
5. **Code + test + build** — implement, verify, retry build failures up to 3 times.
6. **Report** — modified files, test/build status, skipped checks, remaining risks.

## Change types

| Type | Use when | Required docs |
|---|---|---|
| Feature | New capability | requirement brief, impact plan, tests |
| Bugfix | Defect fix | repro, root cause, regression test |
| Small change | Safe minor edit | short impact note, smoke test |
| API change | Endpoint/contract change | compatibility, contract note, integration test |
| Business logic | Rule/decision change | rule source, edge cases, business tests |
| Refactor | Internal structure change | no behavior-change evidence |

See `docs/change-types.md`.

## Quickstart for a team

Full Vietnamese setup/use guide: `docs/huong-dan-cai-dat-va-su-dung.md`.

1. Read `docs/workflow.md`.
2. Pick the matching change-flow doc.
3. Fill `templates/requirement-brief.md` or issue template.
4. Run Graphify/code search and fill `templates/impact-analysis.md`.
5. Get approval.
6. Implement and attach test/build evidence.
7. Open PR using `.github/PULL_REQUEST_TEMPLATE.md`.

## Epics (CLI)

Each task is an "epic" with its own brief + evidence files. With `--module` it nests under `work/<module>/<NNN>-<slug>/` (active pointer `work/<module>/.active`); without a module it stays flat in `work/<NNN>-<slug>/` (pointer `work/.active`).

```powershell
sdlc-workflow init                                       # scaffold workflow into the current project
sdlc-workflow new "auth login API"                       # flat epic → work/001-auth-login-api/
sdlc-workflow new --module elcom.vms.ups "tim comp A"    # → work/elcom.vms.ups/001-tim-comp-a/
sdlc-workflow finish --module elcom.vms.ups              # close that module's active epic
sdlc-workflow finish                                     # close the only active epic (errors if several)
```

### Module convention (nested folders)

When a project has multiple modules, group epics by module with `--module`. Epics nest under `work/<module>/<NNN>-<slug>/`:

- `sdlc-workflow new --module elcom.vms.ups "tim component A"` → `work/elcom.vms.ups/001-tim-component-a/`
- `sdlc-workflow new --module billing "invoice pdf"` → `work/billing/001-invoice-pdf/`

Rules:

- The module name is kept as-is (e.g. `elcom.vms.ups`); only path-hostile characters are stripped.
- `NNN` resets per module — each module counts from `001`.
- The active pointer is per module (`work/<module>/.active`), so several modules can have an active epic at the same time.
- `finish --module <name>` closes that module's active epic; with no module it closes the only active one, or lists modules if several are active.
- Without `--module`, epics stay flat in `work/<NNN>-<slug>/` with a global `work/.active`.

List one module / all modules:

```powershell
Get-ChildItem work/elcom.vms.ups -Directory
Get-ChildItem work -Directory
```

### Figma references (per epic)

Every epic gets its own `figma/` folder (`work/<module>/<NNN>-<slug>/figma/`). For UI
work, export the frames from Figma (PNG 2x; add SVG for vector assets) and drop them
there, then ask the agent to design from the figma folder in that task:

```text
/sdlc-lean design the ABC screen from the figma folder in this task
```

The agent reads every image in that epic's `figma/`, extracts a design spec (layout,
colors, spacing, typography, components), confirms the UI stack, then builds it.
A PNG is **pixel-approximate**, not pixel-perfect — for higher fidelity also drop
exact hex colors + font names (or `tokens.json`), SVG for icons/logos, and
"Copy as CSS" snippets. Static images can't show hover/animation/responsive, so
call those out in the request.

## Repository map

```text
docs/                         SDLC policies, flow docs, checklists
templates/                    Reusable planning/evidence templates
adr/                          Architecture decision records
.github/                      PR/issue templates + validation workflow
scripts/validate-workflow.ps1 Lightweight structure/PR validation
.claude/CLAUDE.md             Claude Code project instructions
work/[<module>/]<NNN>-<slug>/ Per-epic brief + evidence + figma/ references
```

## Minimum Definition of Done

- requirement is clear
- change type selected
- Graphify/code search completed or explicitly skipped
- impact plan approved
- tests/build run or skipped with reason
- PR includes evidence and rollback note
- reviewer approval obtained per risk level

## Automation

Run locally:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate-workflow.ps1
```

GitHub Actions runs the same validation on push/PR via `.github/workflows/workflow-validation.yml`.

## Adoption levels

| Level | Meaning |
|---|---|
| Basic | Use docs + PR template manually |
| Team | Enforce issue/PR templates + validation script |
| Professional | Add branch protection, CODEOWNERS, real app CI/test/build gates |

## License

MIT
