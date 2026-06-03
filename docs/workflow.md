# SDLC Lean Workflow

## Purpose

Provide a repeatable, low-ceremony workflow for team development with AI assistance.

## Flow

1. Clarify request.
2. Classify change type.
3. Search related code with Graphify.
4. Produce impact plan.
5. Wait for approval.
6. Implement.
7. Test/build/validate.
8. Report evidence.
9. Review and merge.

## Flow map

```mermaid
flowchart TD
    A[User asks to change code] --> B[1. Clarify + classify change type]
    B --> T{Change type?}
    T -->|"[1] Feature"| F[docs/feature-flow.md]
    T -->|"[2] Refactor"| RF[docs/refactor-flow.md]
    T -->|"[3] Bugfix"| BF[docs/bugfix-flow.md]
    T -->|"[4] Small change"| SM[docs/small-change-flow.md]
    T -->|"[5] API change"| AP[docs/api-change-flow.md]
    T -->|"[6] Business logic"| BL[docs/business-logic-flow.md]
    F & RF & BF & SM & AP & BL --> C[2. Search related code - Graphify or repo search]
    C --> D[3. Impact plan - files, side effects, tests, risk, rollback]
    D --> E{4. Approval gate}
    E -->|Rejected / needs changes| D
    E -->|Approved| G[5. Code + test + build - retry current-change failures up to 3x]
    G --> H[6. Report - files, tests, build, skipped, risks]
    H --> I[Open PR + check Definition of Done]
```

- **Approval gate** is the hard stop: no non-trivial edits before approval. Risk level (`docs/risk-matrix.md`) decides approval strength.
- The per-type flow doc (`docs/*-flow.md`) refines steps 2-6 for that change type.
- Closing checks: `docs/definition-of-done.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `scripts/validate-workflow.ps1`.

## Required outputs

| Step | Output |
|---|---|
| Clarify | change type, scope, acceptance criteria |
| Search | related files/functions/tests |
| Impact | files, side effects, risk, rollback |
| Approval | explicit approval before edits |
| Execution | code + tests/build |
| Report | evidence, skipped checks, risks |

## Non-negotiables

- No non-trivial code edits before approval.
- No merge without review evidence.
- No hidden skipped checks.
- High-risk changes need stronger approval.
