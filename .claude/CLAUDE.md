# Lean Developer Workflow (Graphify Enabled)

This project uses SDLC Lean as a lightweight AI-assisted development workflow.

## Epic workflow (one folder per task)

Each task is an "epic" under `work/<NNN>-<slug>/` with its own brief + evidence files; the active epic is tracked in `work/.active`.

- `/sdlc-lean <request>` (or `node bin/cli.js new "<request>"`) → creates a new epic, sets it active, then run the 6-step loop below, writing evidence into the epic folder.
- While an epic is active, keep working in it — the user does not re-run `/sdlc-lean`.
- `/finish` (or `node bin/cli.js finish`) → marks the epic done, writes `SUMMARY.md`, clears the active pointer. A new request starts a new epic.

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
