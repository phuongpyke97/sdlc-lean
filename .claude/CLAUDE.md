# Lean Developer Workflow (Graphify Enabled)

This project uses SDLC Lean as a lightweight AI-assisted development workflow.

## Epic workflow (one folder per task)

Each task is an "epic" with its own brief + evidence files. With `--module` it nests under `work/<module>/<NNN>-<slug>/` (active pointer `work/<module>/.active`); without a module it stays flat in `work/<NNN>-<slug>/` (pointer `work/.active`).

- `/sdlc-lean <request>` (or `node bin/cli.js new [--module <name>] "<request>"`) → creates a new epic, sets it active, then run the 6-step loop below, writing evidence into the epic folder.
- While an epic is active, keep working in it — the user does not re-run `/sdlc-lean`.
- `/finish` (or `node bin/cli.js finish [--module <name>]`) → marks the epic done, writes `SUMMARY.md`, clears that module's active pointer. A new request starts a new epic.

### Module convention (nested folders)

When a project has multiple modules, group epics by module with `--module`. Epics nest under `work/<module>/<NNN>-<slug>/`:

- `node bin/cli.js new --module elcom.vms.ups "tim component A"` → `work/elcom.vms.ups/001-tim-component-a/`
- `node bin/cli.js new --module billing "invoice pdf"` → `work/billing/001-invoice-pdf/`

Rules:
- The module name is kept as-is (e.g. `elcom.vms.ups`); only path-hostile characters are stripped.
- `NNN` resets per module — each module counts from `001`.
- The active pointer is per module (`work/<module>/.active`), so several modules can have an active epic at the same time.
- `finish --module <name>` closes that module's active epic. With no module: closes the only active epic, or lists modules if several are active.
- Without `--module`, epics stay flat in `work/<NNN>-<slug>/` with a global `work/.active`.
- List one module: `Get-ChildItem work/elcom.vms.ups -Directory`
- List all modules: `Get-ChildItem work -Directory`

## Workflow for code changes

When asked to modify or add code:

1. **Clarify** — ask 1-3 focused questions and classify the work:
   - `[1]` New Feature
   - `[2]` Modify/Refactor
   - `[3]` Fix Bug
   - `[4]` Small Change
   - `[5]` API Change
   - `[6]` Business Logic Change

2. **Search** — use Graphify to locate related files, functions, APIs, dependencies, and tests.
   - If Graphify is unavailable, state it clearly and use repository search as fallback.

3. **Impact Plan** — list:
   - files to change
   - intended changes
   - side effects
   - tests/build to run
   - risk level
   - rollback path

4. **Approval Gate** — stop before non-trivial edits and wait for explicit approval.

5. **Code + Test + Build** — implement the approved plan.
   - Run relevant tests/build/validation.
   - Retry only current-change-related build failures.
   - Stop after 3 failed attempts and report the blocker.

6. **Report** — summarize:
   - modified files
   - test status
   - build/validation status
   - skipped checks
   - remaining risks

## Small exact edits

For exact low-risk user-requested edits, use lightweight approval and keep scope minimal.

## Rules

- Keep changes lean and scoped.
- Do not hide skipped Graphify/test/build checks.
- Do not continue retry loops for unrelated failures.
- Do not merge, push, publish, delete, or perform irreversible actions unless explicitly requested.
- Use repo docs/templates for plans, evidence, PRs, and reviews.

## IMPORTANT — Database safety (non-negotiable)

- **Không dùng raw SQL** để thao tác database. Luôn dùng ORM / query builder / repository layer của project.
- **Không dùng test, script, migration, seed hay bất kỳ cơ chế nào để DELETE / DROP / UPDATE / TRUNCATE** dữ liệu database của user.
- Mọi thao tác chạm tới dữ liệu thật là irreversible action → cấm trừ khi user yêu cầu rõ ràng từng lần.
