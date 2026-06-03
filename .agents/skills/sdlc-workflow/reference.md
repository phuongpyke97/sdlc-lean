# Lean Developer Workflow — Reference

A lightweight, dev-team-only workflow for AI-assisted code changes.

## Workflow & policies (docs/)
- `docs/workflow.md` — the 6-step loop.
- `docs/change-types.md` — Feature / Bugfix / Small change / API change / Business logic / Refactor.
- `docs/graphify-protocol.md` — how to search related code (Graphify optional, repo search fallback).
- `docs/approval-policy.md`, `docs/definition-of-done.md`, `docs/risk-matrix.md` — gates.
- `docs/*-flow.md` — per change-type flows (feature, bugfix, api-change, business-logic, refactor, small-change).
- Checklists: `docs/review-checklist.md`, `docs/test-strategy.md`, `docs/security-checklist.md`, `docs/performance-checklist.md`, `docs/observability-checklist.md`.

## Planning & evidence templates (templates/)
- `templates/requirement-brief.md`, `templates/impact-analysis.md`, `templates/agent-impact-plan.md`.
- `templates/build-evidence.md`, `templates/test-evidence.md`, `templates/review-evidence.md`, `templates/rollback-plan.md`, `templates/adr.md`.

## Issue / PR templates (.github/)
- `.github/ISSUE_TEMPLATE/` — one per change type.
- `.github/PULL_REQUEST_TEMPLATE.md` — change type, search evidence, impact, tests, rollback.
