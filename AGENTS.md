# Agent Guidelines — Lean Developer Workflow

Use this repo as a professional SDLC Lean framework.

## Lean 6-step workflow

For code changes:

1. **Clarify** — ask 1-3 focused questions and classify:
   - Feature
   - Modify/Refactor
   - Fix Bug
   - Small Change
   - API Change
   - Business Logic Change
2. **Search** — use Graphify if available; fallback to repo search and report fallback.
3. **Impact Plan** — list files, side effects, tests, risk level, rollback.
4. **Approval Gate** — stop before non-trivial edits and wait for explicit approval.
5. **Code + Test + Build** — implement, run relevant validation, retry related build failures up to 3 times.
6. **Report** — changed files, tests/build, skipped checks, risks.

## Epic workflow (one folder per task)

Each task is an "epic" with its own brief and evidence files. With `--module` it nests under `work/<module>/<NNN>-<slug>/` (active pointer `work/<module>/.active`); without a module it stays flat in `work/<NNN>-<slug>/` (pointer `work/.active`).

If your agent has slash commands (Claude Code, Cursor), use `/sdlc-lean` and `/finish`. Otherwise call the CLI directly:

- **Detect the module**: if the request names a module/folder (e.g. "tại module elcom.vms.ups"), pass it via `--module`. Otherwise omit it.
- **Start a task**: `npx sdlc-workflow new --module <module> "Tôi muốn <goal> | Input <data> | Output <result>"`
  → creates `work/<module>/<NNN>-<slug>/`, sets it active (`NNN` resets per module). Then fill `epic-brief.md` and run the 6-step loop, writing evidence into that folder.
- **Continue**: stay in the same epic — no need to re-run `new`.
- **Finish**: `npx sdlc-workflow finish --module <module>` → marks the epic done, writes `SUMMARY.md`, clears that module's active pointer. Several modules can be active at once; with no module the CLI closes the only active epic or lists them.

Prompt rule: phrase the request as `Tôi muốn <goal> | Dữ liệu đầu vào <input> | Kết quả mong muốn <output>` so the goal, input and expected output are explicit.

## Small exact edits

For exact low-risk user-requested edits, use lightweight approval and keep scope minimal.

## Safety

- Do not merge, push, publish, delete, or perform irreversible actions unless explicitly requested.
- Do not hide skipped checks.
- Do not continue retry loops when failure is unrelated to the current change.

## IMPORTANT — Database safety (non-negotiable)

- **Không dùng raw SQL** để thao tác database. Luôn dùng ORM / query builder / repository layer.
- **Không dùng test, script, migration, seed hay bất kỳ cơ chế nào để DELETE / DROP / UPDATE / TRUNCATE** dữ liệu database của user.
- Thao tác chạm dữ liệu thật là irreversible → cấm trừ khi user yêu cầu rõ ràng từng lần.

## Useful docs

- `docs/workflow.md`
- `docs/change-types.md`
- `docs/feature-flow.md`
- `docs/onboarding.md`
- `docs/definition-of-done.md`
- `docs/risk-matrix.md`
- `templates/impact-analysis.md`
