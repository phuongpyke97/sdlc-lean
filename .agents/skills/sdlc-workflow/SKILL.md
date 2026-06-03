---
name: lean-developer-workflow
description: Lean Developer Workflow (Graphify Enabled). Use this when tasked with modifying code, fixing bugs, or implementing new features.
---

# Lean Developer Workflow (Graphify Enabled)

Strictly follow the 6-step development process:
1. **Clarify**: Ask 1-3 questions and classify the work — [1] New Feature, [2] Modify/Refactor, [3] Fix Bug, [4] Small Change, [5] API Change, [6] Business Logic Change.
2. **Search**: Use Graphify if available to locate relevant files and symbols; otherwise fall back to repo/IDE search and say so.
3. **Impact Plan**: List files to change, side effects, tests/build, risk and rollback.
4. **Approve Gate**: **STOP** and wait for the user to approve the plan.
5. **Implement & Build**: Edit files, run tests, build the project (retry only current-change failures, up to 3 times).
6. **Report**: Report modified files, test status, build status, skipped checks and risks.
