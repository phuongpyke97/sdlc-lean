# Release Policy

## Release readiness

- merged PRs reviewed
- tests/build pass
- changelog/release notes prepared
- rollback path known
- owners available during rollout

## Versioning

Use semantic intent even if formal SemVer is not adopted:

- patch: bugfix/small safe change
- minor: feature/non-breaking API addition
- major: breaking API/data/business behavior change

## Rollback

Each release should know:

- how to revert code
- how to revert config
- how to handle data changes
- who approves rollback

## Post-release

Track incidents, escaped defects, and follow-up actions.
