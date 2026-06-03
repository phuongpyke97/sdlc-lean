# ADR 0001: Use SDLC Lean Workflow

- Status: Accepted
- Date: 2026-06-02
- Owners: Development team

## Context

The team needs a lightweight, repeatable workflow for AI-assisted development across features, bugfixes, API changes, business logic changes, and small edits.

## Decision

Adopt SDLC Lean Workflow:

1. Clarify
2. Search with Graphify
3. Impact plan
4. Approval gate
5. Code + test + build
6. Report

## Consequences

### Positive

- Better traceability
- Safer AI-assisted edits
- Consistent review evidence
- Lower risk for API/business logic changes

### Trade-offs

- More upfront planning than ad hoc edits
- Requires team discipline
- Automation initially validates structure/process more than app behavior

## Follow-up

- Add app-specific CI/test/build gates when this framework is installed into a real project.
