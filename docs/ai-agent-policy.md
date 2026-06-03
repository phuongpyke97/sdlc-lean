# AI Agent Policy

AI agents may assist with planning, code search, implementation, tests, review, and reporting.

## Required behavior

- Clarify before non-trivial work.
- Use Graphify or repository search before planning changes.
- Produce an impact plan before editing.
- Stop for approval before code changes.
- Run relevant tests/build/validation when available.
- Report skipped checks honestly.
- Do not merge, push, publish, delete, or perform irreversible actions unless explicitly requested.

## Agent output format

For implementation tasks, final report must include:

- files changed
- tests run
- build/validation status
- skipped checks
- risks/rollback

## Human responsibility

Humans remain accountable for approval, security-sensitive decisions, merge, release, and production impact.
