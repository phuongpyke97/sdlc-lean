# Risk Matrix

| Risk | Examples | Required gate |
|---|---|---|
| Low | docs, copy, isolated config, small non-prod logic | 1 reviewer, smoke check |
| Medium | feature slice, bugfix in shared module, non-breaking API | impact plan, tests, 1-2 reviewers |
| High | auth, payments, data migration, breaking API, security, business-critical logic | tech lead approval, stronger tests, rollback plan |

## Escalate risk when

- affects auth/permissions/data privacy
- changes API contract
- changes business rules
- impacts many modules
- no automated tests exist
- rollback is hard
