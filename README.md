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

1. Read `docs/workflow.md`.
2. Pick the matching change-flow doc.
3. Fill `templates/requirement-brief.md` or issue template.
4. Run Graphify/code search and fill `templates/impact-analysis.md`.
5. Get approval.
6. Implement and attach test/build evidence.
7. Open PR using `.github/PULL_REQUEST_TEMPLATE.md`.

## Epics (CLI)

Each task is an "epic" under `work/<NNN>-<slug>/` with its own brief + evidence files; the active epic is tracked in `work/.active`.

```powershell
sdlc-workflow init                      # scaffold workflow into the current project
sdlc-workflow new "auth: login API"     # create work/001-auth-login-api/ and set it active
sdlc-workflow finish                    # mark active epic done + write SUMMARY.md
```

### Module convention (prefix slug)

When a project has multiple modules, prefix the request with the module name so it lands in the epic slug:

- `sdlc-workflow new "auth: login API"` → `001-auth-login-api`
- `sdlc-workflow new "billing: invoice pdf"` → `002-billing-invoice-pdf`

Rules:

- Module name first, single word (`auth`, `billing`), no internal hyphen → groups cleanly.
- Use a consistent separator (`module: ...`); slugify strips the punctuation, leaving `<NNN>-<module>-<slug>`.
- `NNN` stays global (not per-module); the module lives right after the number.
- Folders stay flat and `.active` holds one epic → no parallel epics across modules.

List one module / group all:

```powershell
Get-ChildItem work -Directory | Where-Object Name -match '^\d+-auth-'
Get-ChildItem work -Directory | Group-Object { ($_.Name -replace '^\d+-','') -replace '-.*','' } | Select-Object Name, Count
```

## Repository map

```text
docs/                         SDLC policies, flow docs, checklists
templates/                    Reusable planning/evidence templates
adr/                          Architecture decision records
.github/                      PR/issue templates + validation workflow
scripts/validate-workflow.ps1 Lightweight structure/PR validation
.claude/CLAUDE.md             Claude Code project instructions
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
